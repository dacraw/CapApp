import React from 'react'


export default ({ownedStock, stocks}) => {
    if (!stocks) return null;

    return (
        <>
            <li className="owned-stocks">
                <div className="symbol-numshares">
                    <div className="symbol">{ownedStock[1].symbol}</div>
                    <div className="num-shares">{ownedStock[1].num_shares}</div>
                </div>
                <div className="stock-info">
                    <div className="price">{stocks[ownedStock[1].symbol].price}</div>
                    <div className="percentage-change">{stocks[ownedStock[1].symbol].percentageChange}</div>
                </div>
            </li>
        </>
    )
};