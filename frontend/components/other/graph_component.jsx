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
        
        const { stock, portfolios } = this.props;
        
        if (!stock) return null;
        const data = stock.chart;
        const noStocks = (
            <div className="no-stocks-dashboard">
                <p>Welcome to CapApp! This website is a stock trading project based on the popular investment trading website <a className="site-link" href="https://robinhood.com/" target="_blank">Robinhood</a>. Although <a href="https://iexcloud.io/" target="_blank" className="site-link">IEX Cloud API</a> is being used to produce real stock prices on this website, <strong>this website is purely for demonstrational purposes and the stocks traded here hold no tangible value.</strong></p>
                <p>On this site, you may buy/sell stocks, view individual stock information, maintain stock watchlists and stay up-to-date with relevant business/stock news.</p>
                <p>At the top is a ticker search - simply begin typing and a list will populate with the stocks available for trade on this website. At the right is a sidebar that changes depending on whether you're on the dashboard or stock show page. Use it to add watchlists through the dashboard, and trade stocks on the stock show page. </p>
                <p>I hope you enjoy this project! Please reach out to me at one of the following links and have a great day! <span>&#128513;</span></p>
                <div className="contact-links">
                    <a href="https://www.linkedin.com/in/doug-a-crawford/" target="_blank"><img src={window.linkedinLogo} /></a>
                    <a href="https://github.com/dacraw" target="_blank"><img src={window.githubLogo} /></a>
                </div>
            </div>
        )
        if (Object.keys(portfolios.history).length == 1 && this.props.location.pathname === "/dashboard") return noStocks 

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