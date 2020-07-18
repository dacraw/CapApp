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

                combinedStats['price'] = parseFloat(portfolios.portfolioValue.toFixed(2));
                // combinedStats['price'] = parseFloat(portfolios.portfolioValue.replace(/\$|,/g, ''));
            
                let combinedChart = combinedStats['chart'];
                let last = combinedChart[combinedChart.length - 1];
                let first = combinedChart[0];
                combinedStats['chart'][combinedStats['chart'].length-1].average = combinedStats['price'];
                combinedStats['percentageChange'] = ((last.average / first.average - 1 ) * 100).toFixed(2);
                combinedStats['dollarChange'] = (last.average - first.average).toFixed(2);
            })
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