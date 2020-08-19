import React from 'react';
import NewsComponent from '../other/NewsComponent'
import GraphComponent from '../other/graph_component_container'
import _ from 'lodash'
import Loader from '../other/loader'
import {useSelector} from 'react-redux'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        // this.props.fetchBusinessNews();
    }

    formatMoney(number, decPlaces, decSep, thouSep) {
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
        thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
        var j = (j = i.length) > 3 ? j % 3 : 0;
        
        return sign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    }



    render() {
        const { stocks, user, portfolios, stockLoader } = this.props;

        if (!Object.keys(stocks).length || !portfolios || !user) return null;

        const history = portfolios.history;
        if (stockLoader) return <Loader />
        if (!stocks || !portfolios) return null

        // the below variables and blocks set the chart used for DAILY portfolio values
        let ownedStockSymbols;
        if (portfolios.stocks){
            ownedStockSymbols = Object.values(portfolios.stocks).map(stock => stock.symbol)
        }
        const combinedStats = {};
        let portfolioValue = 0;
        if (history){
            Object.values(history).forEach((historyItem, idx) => {
                if (idx == 0) {
                    combinedStats['chart'] = _.cloneDeep(stocks[historyItem.symbol].chart)
                    combinedStats['chart'].forEach((item, csIdx) => combinedStats.chart[csIdx].average = 0)
                }
                combinedStats['chart'].forEach((dataPoint, idx) => {
                    let year = dataPoint.date.slice(0,4);
                    let month = parseInt(dataPoint.date.slice(5,7)) - 1;
                    let day = dataPoint.date.slice(8,10);
                    let hour = dataPoint.minute.slice(0,2);
                    let minute = dataPoint.minute.slice(3,5);
                    let date = new Date(year,month,day,hour,minute);
                    if (new Date(historyItem.created_at) <= date) {
                        combinedStats.chart[idx].average += stocks[historyItem.symbol].chart[idx].average * historyItem.num_shares
                    }
                });

                // combinedStats['price'] = parseFloat(portfolios.portfolioValue.toFixed(2));
                portfolioValue += historyItem.num_shares * stocks[historyItem.symbol].chart[stocks[historyItem.symbol].chart.length - 1].average
            
                let combinedChart = combinedStats['chart'];
                let last = combinedChart[combinedChart.length - 1];
                let first = combinedChart[0];
                combinedStats['percentageChange'] = ((last.average / first.average - 1 ) * 100).toFixed(2);
                combinedStats['dollarChange'] = (last.average - first.average).toFixed(2);
            })
            combinedStats['price'] = portfolios.portfolioValue;
            combinedStats['chart'][combinedStats['chart'].length-1].average = portfolios.portfolioValue;
            // document.getElementById('dashboard-nav-pv').innerHTML = '$' + this.formatMoney(portfolioValue, 2, ".", ",");
        }

        if (stockLoader) return <Loader />
        return (
            <>
                <GraphComponent stock={combinedStats} />
                <NewsComponent />
            </>
        )
    }
}
export default Dashboard;