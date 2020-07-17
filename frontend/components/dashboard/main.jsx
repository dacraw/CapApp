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
        this.props.fetchBusinessNews();
    }


    render() {
        const { stocks, user, portfolios, stockLoader } = this.props;

        if (!Object.keys(stocks).length || !portfolios || !user) return null;
        debugger
        const history = Object.values(portfolios.history);
        const structureStock = _.cloneDeep(stocks[history[0].symbol].chart) // this is the key of the first portfolio, used to structure the graph by time
        const combinedStats = structureStock;
        
        if (!stocks) return null
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