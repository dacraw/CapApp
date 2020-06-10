import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { chart, stocks } = this.props;
        if (!chart || !stocks) return null;
        debugger

        const data = chart;

        return (
            <section className="stock-graph">
                <h1 className="company-name">
                {stocks[this.props.match.params.symbol.toUpperCase()].about.companyName}
                </h1>
                <h1 className="current-price">
                    {/* {stock.price} */}
                </h1>
                <h1 className="percentage-change">
                    {/* {stock.dayChange} */}
                </h1>

                <LineChart width={710} height={200} data={data}>
                    <Line type="monotone" dataKey="average" stroke="#8884d8" dot={false} />
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                    <Tooltip />
                </LineChart>
            </section>  
        )
    }
}

export default GraphComponent;