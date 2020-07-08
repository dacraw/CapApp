import React, {Component} from 'react'
import SidebarPortfolioItem from './sidebar_portfolio_item'
import SidebarWatchlists from './SidebarWatchlists'

class DashMainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { stocks, user: {ownedStocks} } = this.props;

        if (!stocks || !ownedStocks) return null;
        return (
            <>
                <ul>
                    <li className="stocks-title title">Stocks</li>
                    {Object.entries(ownedStocks).map((stock, i) => <SidebarPortfolioItem key={i} ownedStock={stock} stocks={stocks} />)}
                </ul>
                <SidebarWatchlists />
            </>
        )
    }
}

export default DashMainSidebar;