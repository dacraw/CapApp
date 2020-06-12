import React, {Component} from 'react'
import GraphComponent from './graph_component_container'
import AboutComponent from './about_component'
import NewsComponent from './news_component'
import {Link} from 'react-router-dom'
import Loading from '../other/loader'


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
    //    debugger;
        const { fetchStock, stocks, match: { params: { symbol } } } = this.props;
        const sym = symbol.toUpperCase();

        if (sym !== prevProps.match.params.symbol.toUpperCase() && !!stocks[sym.toUpperCase()] && !stocks[sym].about){ 
            fetchStock(sym);
        }
    }



    render() {

        // this.props.fetchStock(sym.toUpperCase())
        const { stockSym, loading } = this.props;
        
        if (loading) return <Loading />
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