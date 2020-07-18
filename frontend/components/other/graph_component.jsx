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
        
        const { stock } = this.props;
        
        if (!stock) return null;
        const data = stock.chart;
        if (!data) return <div height={200} style={{width: '710px', height:'200px'}}>You currently have no invested stocks!</div>
        const expectedLength = 78;
        const dataLength = data.length
        if (dataLength < expectedLength){
            // SO THAT CHART LOOKS PRETTY
            // use the numIterations to push elements average in it (might need close and open)
            // this is so before the end of the day, the data points dont take up the whole width but look like ROBINHOOD
            // const numIterations = expectedLength - dataLength
        }

        


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
        return (
            <section className="stock-graph">
                <h2 className="company-name">
                {(stock.company) ? stock.company : ""}
                </h2>
                <h2 className="current-price">
                    ${this.formatMoney(this.state.price, 2, ".", ",")}
                </h2>
                <h2 className="percentage-change">
                    <span className="dollar">${this.formatMoney(this.state.dollarChange, 2, ".", ",")}</span>
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