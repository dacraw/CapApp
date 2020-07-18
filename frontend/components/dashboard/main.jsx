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
        if (!stocks || !portfolios.stocks) return null

        // the below variables and blocks set the chart used for DAILY portfolio values
        const ownedStockSymbols = Object.values(portfolios.stocks).map(stock => stock.symbol)
        const combinedStats = {};
        combinedStats['chart'] = _.cloneDeep(stocks[ownedStockSymbols[0]].chart);
        combinedStats['chart'].forEach(chartItem => chartItem.average = 0)

        ownedStockSymbols.forEach( (symbol, idx) => {

            stocks[symbol].chart.forEach( (dataPoint, chartIdx) => {
                // if (chartIdx == 0) stocks[symbol].chart.average = 0
                // if (idx !== 0){
                    let year = dataPoint.date.slice(0,4);
                    let month = parseInt(dataPoint.date.slice(5,7)) - 1;
                    let day = dataPoint.date.slice(8,10);
                    let hour = dataPoint.minute.slice(0,2);
                    let minute = dataPoint.minute.slice(3,5);
                    let date = new Date(year,month,day,hour,minute);
                    
                    let stocklist = Object.values(history).filter(historyItem => new Date(historyItem.created_at) <= date && historyItem.symbol === symbol)
                    
                    // combinedStats.chart[chartIdx].average = 0;
                    stocklist.forEach(stock => {
                        combinedStats.chart[chartIdx].average += dataPoint.average * stock.num_shares
                    })

                    // if (combinedStats.chart[chartIdx].average === undefined) combinedStats.chart[chartIdx].average = 0;

                    // let value = dataPoint.average;
                    // if (value === null){
                    //     value = stocks[symbol].chart[stocks[symbol].chart.length - 1].average;
                    // }
                    
                // }
            });

        });
        combinedStats['price'] = parseFloat(portfolios.portfolioValue.toFixed(2));
        // combinedStats['price'] = parseFloat(portfolios.portfolioValue.replace(/\$|,/g, ''));
    
        let combinedChart = combinedStats['chart'];
        let last = combinedChart[combinedChart.length - 1];
        let first = combinedChart[0];
        combinedStats['chart'][combinedStats['chart'].length-1].average = combinedStats['price'];
        combinedStats['percentageChange'] = ((last.average / first.average - 1 ) * 100).toFixed(2);
        combinedStats['dollarChange'] = (last.average - first.average).toFixed(2);
        console.log(combinedChart)


        // this block combines the averages for all of the user's portfolios; 
        // please note that for demo purposes, the data is pulled from a sample chart that does not use up-to-date info

        // structure matching graphcomponent
        // let combinedStats = {};
        // combinedStats['chart'];
        // combinedStats['price'];
        // combinedStats['percentageChange'];
        // combinedStats['dollarChange'];
        // symbols.forEach( (symbol, idx) => {
        //     if (idx == 0) {
        //         combinedStats['chart'] = _.cloneDeep(stocks[symbol].chart);
        //     }
        //     stocks[symbol].chart.forEach( (dataPoint, chartIdx) => {
        //         if (idx !== 0){
        //             if (combinedStats.chart[chartIdx].average === undefined) combinedStats.chart[chartIdx].average = 0;

        //             let value = dataPoint.average;
        //             if (value === null){
        //                 value = stocks[symbol].chart[stocks[symbol].chart.length - 1].average;
        //             }
        //             combinedStats.chart[chartIdx].average += value * ownedStocks[symbol].num_shares;
        //         }
        //     });

        // });
        // combinedStats['price'] = parseFloat(user.portfolioValue.replace(/\$|,/g, ''));
    
        // let combinedChart = combinedStats['chart'];
        // let last = combinedChart[combinedChart.length - 1];
        // let first = combinedChart[0];
        // combinedStats['chart'][combinedStats['chart'].length-1].average = combinedStats['price'];
        // combinedStats['percentageChange'] = ((last.average / first.average - 1 ) * 100).toFixed(2);
        // combinedStats['dollarChange'] = (last.average - first.average).toFixed(2);

        // if (stockLoader) return <Loader />
        return (
            <>
                <GraphComponent stock={combinedStats} />
                <NewsComponent />
            </>
        )
    }
}
export default Dashboard;