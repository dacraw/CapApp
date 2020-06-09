import React, {Component} from 'react'
import GraphComponent from './graph_component'
import AboutComponent from './about_component'
import NewsComponent from './news_component'
import {Link} from 'react-router-dom'

class StockShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        debugger
       this.props.fetchStock(this.props.match.params.symbol.toUpperCase())
    }

    componentDidUpdate(prevProps){
       
        // check if the hash has changed; if so, fetch single stock info UNLESS already in the state
        // currently only fetching 1d graph
        
        if (this.props.match.params.symbol !== prevProps.match.params.symbol && !!this.props.stocks[this.props.match.params.symbol.toUpperCase()] && !this.props.stocks[this.props.match.params.symbol.toUpperCase()].chart ){
            this.props.fetchStock(this.props.match.params.symbol)
        }
    }

    showStocks(e){
        e.preventDefault();
        // debugger
        e.currentTarget.nextSibling.classList.toggle('show');
    }
    
    render() {
        const { stock } = this.props;
        
        if (!stock) return null
        if (!stock.chart) return null;
        
        return (
            <main className="stock-show-container">
                <section className="stock-list">
                    <h3 onClick={this.showStocks} className="stock-list-toggle">Select A Stock:</h3>
                    <ul>
                        {Object.keys(this.props.stocks).map( (stock, idx) => <li key={idx}><Link to={`/stocks/${stock.toLowerCase()}`}>{stock}</Link></li>)}
                    </ul>    
                </section>
                <h1 className="company-name">
                    {stock.about.companyName}
                </h1>
                <h1 className="current-price">
                    {stock.price}
                </h1>
                <h1 className="percentage-change">
                    {stock.dayChange}
                </h1>
                <GraphComponent chart={stock.chart} />
                <AboutComponent about={stock.about} />
                <NewsComponent news={stock.news} />

            </main>

        )
    }
}

export default StockShow;