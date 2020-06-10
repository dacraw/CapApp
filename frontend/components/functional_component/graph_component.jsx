import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.stock.price,
            dollarChange: this.props.stock.dollarChange,
            percentageChange: this.props.stock.percentageChange,
        }
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.symbol !== prevProps.match.params.symbol){
            this.setState({
                price: this.props.stock.price,
                dollarChange: this.props.stock.dollarChange,
                percentageChange: this.props.stock.percentageChange,
            })
        }
    }

    handleEnter(e){
       
        if (!e.activePayload) return null;
        this.setState({
            price: e.activePayload[0].value,
            dollarChange: (e.activePayload[0].value - this.props.stock.chart[0].average).toFixed(2),      
            percentageChange: (((e.activePayload[0].value / this.props.stock.chart[0].average) - 1 ) * 100).toFixed(2),      
        });
    }
    
    handleLeave(value){
        // debugger;
        this.setState({
            price: value,
            dollarChange: this.props.stock.dollarChange,
            percentageChange: this.props.stock.percentageChange,
        });
    }

    render() {
        
        const { stock } = this.props;
        
        if (!stock || !stock.about) return null;

        const data = stock.chart;

        function getIntroOfPage(label) {
            // if (label === 'Page A') {
            //   return 'Page A is about men's clothing';
            // }
            return `${label}`
        }

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

        
        return (
            <section className="stock-graph">
                <h2 className="company-name">
                {stock.about.companyName}
                </h2>
                <h2 className="current-price">
                    ${this.state.price}
                </h2>
                <h2 className="percentage-change">
                    <span className="dollar">${this.state.dollarChange}</span>
                    <span className="percentage">({this.state.percentageChange}%)</span>
                    <span className="timeframe">Today</span>
                </h2>

                <LineChart onMouseMove={this.handleEnter} onMouseLeave={() => this.handleLeave(stock.price)} width={710} height={200} data={data}>
                    <Line type="linear" dataKey={"average"} stroke="#8884d8" dot={false} strokeWidth="2.5" />
                    <XAxis hide={true} dataKey="label" />
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                    <Tooltip content={<CustomTooltip />} payload={[{ name: "label", value: "average" }]} />
                </LineChart>
            </section>  
        )
    }
}

export default GraphComponent;