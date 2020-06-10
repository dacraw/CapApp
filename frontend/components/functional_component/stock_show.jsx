import React, {Component} from 'react'
import GraphComponent from './graph_component_container'
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
        
        this.props.fetchStock(this.props.match.params.symbol.toUpperCase());
        

    }

    componentDidUpdate(prevProps){
       
        // check if the hash has changed; if so, fetch single stock info UNLESS already in the state
        // currently only fetching 1d graph
        
        if (this.props.match.params.symbol !== prevProps.match.params.symbol && !!this.props.stocks[this.props.match.params.symbol.toUpperCase()] && !this.props.stocks[this.props.match.params.symbol.toUpperCase()].chart ){
            this.props.fetchStock(this.props.match.params.symbol.toUpperCase());
            
        }
    }

    showStocks(e){
        e.preventDefault();
        // debugger
        e.currentTarget.nextSibling.classList.toggle('show');
    }
    
    updateColors(){

            // $('.functional-component-container aside .buy-sell li').css('border','5px solid red')
            console.log('hi');

    }

    render() {

        // this.props.fetchStock(this.props.match.params.symbol.toUpperCase())
        const { stockSym } = this.props;
        
        if (!stockSym || !stockSym.about) return null

        // add css class 'stock-negative' for negative change; default is green for positive

        
        return (
            <main className="stock-show-container">
                <section className="stock-list" id="stock-list">
                    <h3 onClick={this.showStocks} className="stock-list-toggle">Select A Stock:</h3>
                    <ul>
                        {Object.keys(this.props.stocks).sort().map( (stock, idx) => <li key={idx}><Link to={`/stocks/${stock.toLowerCase()}`}>{stock}</Link></li>)}
                    </ul>    
                </section>
  
                <GraphComponent />
                <AboutComponent about={stockSym.about} />
                <NewsComponent news={stockSym.news} />

            </main>

        )
    }
}

export default StockShow;