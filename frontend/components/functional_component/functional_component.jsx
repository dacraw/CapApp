import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import StockShowSidebarContainer from '../stock_show/stock_show_sidebar_container'
import DashMainSidebar from '../dashboard/dash_main_sidebar_container'
import StockShowContainer from '../stock_show/stock_show_container'
import Dashboard from '../dashboard/main_container'
import Loading from '../other/loader'
import WatchlistShow from '../watchlist/watchlistShow'
import Loader from '../other/loader'


class FunctionalComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        
        this.props.fetchStocks();
        this.props.fetchPortfolios(this.props.currentUser);
    }

    
    render() {
        // const { loading } = this.props;
        // if (loading) return <Loading />
        const { currentUser, stocks, stockLoader } = this.props;
        if (!currentUser || !Object.keys(stocks).length) return null;
        
        return (
            <main className="functional-component-container">
                <section className="main">
                    {(stockLoader) ? <Loader /> : ""}
                    <Route path='/stocks/:symbol' component={StockShowContainer} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/watchlist/:id' component={WatchlistShow} />
                </section>
                <div className="stock-sidebar-container">
                    <aside>
                        <Route path='/stocks/:symbol' component={StockShowSidebarContainer} />
                        <Route path={['/dashboard', '/watchlist/:id']} component={DashMainSidebar} />
                    </aside>
                </div>
            </main>
        )
    }
}

export default FunctionalComponent;