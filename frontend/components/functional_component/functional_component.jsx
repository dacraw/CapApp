import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import StockShowSidebarContainer from './stock_show_sidebar_container'
import StockShowContainer from './stock_show_container'

class FunctionalComponent extends Component {
    constructor(props) {
        super(props);
 
        props.fetchStocks();
        props.fetchPortfolios(props.currentUser);
    }

    componentDidMount(){
    }

    
    render() {
        
        return (
            <main className="functional-component-container">
                <section className="main">
                    <Route path='/stocks/:symbol' component={StockShowContainer} />
                </section>
                <aside>
                    <Route path='/stocks/:symbol' component={StockShowSidebarContainer} />
                </aside>
            </main>
        )
    }
}

export default FunctionalComponent;