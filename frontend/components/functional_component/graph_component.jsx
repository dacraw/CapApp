import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleEnter(){

    }

    getIntroOfPage(label) {
        // if (label === 'Page A') {
        //   return 'Page A is about men's clothing';
        // }
        return `${label}`
      }
    
    render() {
        
        const { stocks, match: { params: { symbol }}}= this.props;
        
        const sym = symbol.toUpperCase();
        const stock = stocks[sym];

        if (!stocks || !stock || !stock.about) return null;

        const data = stock.chart;



          
          function CustomTooltip({ payload, label, active }) {
            if (active) {
              return (
                <div className="custom-tooltip">
                  <p className="label">{`${label} : ${payload[0].value}`}</p>
                  <p className="intro">{getIntroOfPage(label)}</p>
                  <p className="desc">Anything you want can be displayed here.</p>
                </div>
              );
            }
          
            return null;
          }
        // debugger
        return (
            <section className="stock-graph">
                <h1 className="company-name">
                {stock.about.companyName}
                </h1>
                <h1 className="current-price">
                    {stock.price}
                </h1>
                <h1 className="percentage-change">
                    { (((stock.price / stock.chart[0].average) - 1 ) * 100).toFixed(2) /* current price vs opening */} % 
                </h1>

                <LineChart onMouseEnter={this.handleEnter} width={710} height={200} data={data}>
                    <Line type="monotone" dataKey="average" stroke="#8884d8" dot={false} />
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                    <Tooltip payload={[{ name: "label", value: "average" }]} />
                </LineChart>
            </section>  
        )
    }
}

export default GraphComponent;