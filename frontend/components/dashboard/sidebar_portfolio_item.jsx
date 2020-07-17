import React from 'react'
import {Link} from 'react-router-dom'
import DashMainSidebarGraph from './DashMainSidebarGraph'
import { useSelector } from 'react-redux'


export default ({ownedStock, stocks}) => {
    if (!(ownedStock.symbol in stocks)) return null;
    const dollarChangeStyle = (stocks[ownedStock.symbol].percentageChange <= 0) ? "negative" : "";
    const chart = useSelector(state => {
        return state.entities.stocks[ownedStock.symbol].chart;
    });
    
    return (
        <>
            <li className="owned-stocks">
                <Link className="stock-link" to={`/stocks/${ownedStock.symbol}`}> 
                    <div className="symbol-numshares">
                        <div className="symbol">{ownedStock.symbol}</div>
                        <div className="num-shares">{ownedStock.num_shares} shares</div>
                    </div>
                    <div className="stock-mini-graph">
                        <DashMainSidebarGraph data={chart} symbol={ownedStock.symbol} />
                    </div>
                    <div className="stock-info">
                        <div className="price">{stocks[ownedStock.symbol].price}</div>
                        <div className={`percentage-change ${dollarChangeStyle}`}>{stocks[ownedStock.symbol].percentageChange}%</div>
                    </div>
                </Link>
            </li>
        </>
    )
};