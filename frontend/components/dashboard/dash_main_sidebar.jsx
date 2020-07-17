import React, {Component} from 'react'
import SidebarPortfolioItem from './sidebar_portfolio_item'
import SidebarWatchlists from './SidebarWatchlists'
import SideBarNewWatchlistComponent from './SidebarNewWatchlistComponentContainer'

class DashMainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    newWatchlist() {
        document.querySelector('#add-new-watchlist').style.display = "flex";
    }
    
    render() {
        const { stocks, portfolios, watchlists } = this.props;

        if (!stocks || !portfolios || !watchlists) return null;
        const portfolioStocks = portfolios.stocks;
        return (
            <>
                <div className="sidebar-header">
                    <h1 className="stocks-title title">Stocks</h1>
                </div>
                <div>
                    {Object.values(portfolioStocks).map((stock, i) => <SidebarPortfolioItem key={i} ownedStock={stock} stocks={stocks} />)}
                </div>
                <div className="sidebar-header">
                    <h1 className="title">Watchlists:</h1>
                    <i onClick={this.newWatchlist} className="far fa-plus-square"></i>
                </div>
                <SideBarNewWatchlistComponent watchlists={watchlists} />
                <SidebarWatchlists />
            </>
        )
    }
}

export default DashMainSidebar;