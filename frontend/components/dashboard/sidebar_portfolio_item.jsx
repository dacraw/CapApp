import React from 'react'
import {Link} from 'react-router-dom'
import DashMainSidebarGraph from './DashMainSidebarGraph'
import { useSelector } from 'react-redux'


export default ({ownedStock, stocks}) => {
    if (!(ownedStock[1].symbol in stocks)) return null;
    const dollarChangeStyle = (stocks[ownedStock[1].symbol].percentageChange <= 0) ? "negative" : "";
    const chart = useSelector(state => {
        return state.entities.stocks[ownedStock[1].symbol].chart;
    });
    
    return (
        <>
            <li className="owned-stocks">
                <Link className="stock-link" to={`/stocks/${ownedStock[1].symbol}`}> 
                    <div className="symbol-numshares">
                        <div className="symbol">{ownedStock[1].symbol}</div>
                        <div className="num-shares">{ownedStock[1].num_shares} shares</div>
                    </div>
                    <div className="stock-mini-graph">
                        <DashMainSidebarGraph data={chart} symbol={ownedStock[1].symbol} />
                    </div>
                    <div className="stock-info">
                        <div className="price">{stocks[ownedStock[1].symbol].price}</div>
                        <div className={`percentage-change ${dollarChangeStyle}`}>{stocks[ownedStock[1].symbol].percentageChange}%</div>
                    </div>
                </Link>
            </li>
        </>
    )
};