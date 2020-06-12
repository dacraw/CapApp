import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import StockShowSidebarContainer from '../stock_show//stock_show_sidebar_container'
import StockShowContainer from '../stock_show/stock_show_container'
import Loading from '../other/loader'

class FunctionalComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        
        this.props.fetchStocks();
        this.props.fetchPortfolios(this.props.currentUser);
    }

    
    render() {
        const { currentUser } = this.props;
        // if (loading) return <Loading />
        //debugger
        if (!currentUser) return null;

        return (
            <main className="functional-component-container">
                <section className="main">
                    <Route path='/stocks/:symbol' component={StockShowContainer} />
                </section>
                <div className="stock-sidebar-container">
                    <aside>
                        <Route path='/stocks/:symbol' component={StockShowSidebarContainer} />
                    </aside>
                </div>
            </main>
        )
    }
}

export default FunctionalComponent;