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



    render() {

        // this.props.fetchStock(this.props.match.params.symbol.toUpperCase())
        const { stockSym } = this.props;
        
        if (!stockSym || !stockSym.about) return null

        // add css class 'stock-negative' for negative change; default is green for positive

        
        return (
            <main className="stock-show-container">
 
                <GraphComponent />
                <AboutComponent about={stockSym.about} />
                <NewsComponent news={stockSym.news} />

            </main>

        )
    }
}

export default StockShow;