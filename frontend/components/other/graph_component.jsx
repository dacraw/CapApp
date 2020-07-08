import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

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
       
        if (!e.activePayload || !e.activePayload[0].value) return null;
        this.setState({
            price: e.activePayload[0].value.toFixed(2),
            dollarChange: (e.activePayload[0].value - this.props.stock.chart[0].average).toFixed(2),      
            percentageChange: (((e.activePayload[0].value / this.props.stock.chart[0].average) - 1 ) * 100).toFixed(2),      
        });
    }
    
    handleLeave(value){
        
        this.setState({
            price: value,
            dollarChange: this.props.stock.dollarChange,
            percentageChange: this.props.stock.percentageChange,
        });
    }

    render() {
        
        const { stock } = this.props;
        
        if (!stock) return null;

        const data = stock.chart;


        function CustomTooltip({ payload, label, active }) {
            if (active) {
                return (
                    <div className="custom-tooltip">
                        <p className="label">{`${label}`}</p>
                    </div>
                );
            }
        
            return null;
        }

        const strokeColor = (stock.dollarChange >= 0) ? "rgb(16, 197, 40)" : "#ff4f0b";
        const dollarChange = (stock.dollarChange >= 0) ? "" : "negative-change";
        debugger
        return (
            <section className="stock-graph">
                <h2 className="company-name">
                {(stock.company) ? stock.company : ""}
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
                    <Line isAnimationActive={false} connectNulls={true} type="linear" dataKey={"average"} stroke={strokeColor} dot={false} strokeWidth="2" />
                    <ReferenceLine y={data[0].open} stroke="rgb(184, 181, 181)" strokeDasharray="3 3" />
                    <XAxis hide={true} dataKey="label" />
                    <YAxis domain={['auto', 'auto']} hide={true} />
                    <Tooltip wrapperStyle={{left: -30, fontSize: '.8em'}}isAnimationActive={false} filterNull={true} position={{y: -20}} content={<CustomTooltip />} payload={[{ name: "label", value: "average" }]} />
                </LineChart>
                <ul className={`time-frame`}>
                    <li className={`selected ${dollarChange}`}>1D</li>
                </ul>
            </section>  
        )
    }
}

export default GraphComponent;