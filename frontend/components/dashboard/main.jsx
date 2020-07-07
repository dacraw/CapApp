import React from 'react';
import NewsComponent from '../other/NewsComponent'
import GraphContainer from '../other/graph_component_container'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const { stocks, user: {ownedStocks} } = this.props;
        debugger

        if (!stocks || !ownedStocks) return null;

        const symbols = Object.keys(ownedStocks);
        
        const combinedStats = {};
        symbols.forEach( (symbol, idx) => {
            stocks[symbol].chart.forEach( (dataPoint, chartIdx) => {
                if (combinedStats[dataPoint.label] === undefined) combinedStats[dataPoint.label] = 0;

                let value = dataPoint.average;
                if (value === null){
                    value = stocks[symbol].chart[stocks[symbol].chart.length - 1].average;
                }
                combinedStats[dataPoint.label] += value;
            });
        });
        console.log(combinedStats);



        return (
            <>
                {/* <GraphContainer /> */}
                <NewsComponent />
            </>
        )
    }
}
export default Dashboard;