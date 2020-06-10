import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        debugger
        const { stocks, match: { params: { symbol }}}= this.props;
        
        const sym = symbol.toUpperCase();
        const stock = stocks[sym];

        if (!stocks || !stock || !stock.about) return null;

        const data = stock.chart;

        return (
            <section className="stock-graph">
                <h1 className="company-name">
                {stock.about.companyName}
                </h1>
                <h1 className="current-price">
                    {stock.price}
                </h1>
                <h1 className="percentage-change">
                    { stock.price / stock.chart.open}
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