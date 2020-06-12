import React from 'react'


export default ({ownedStock, stocks}) => {
    debugger


    return (
        <>
            <li>
                <div className="symbol-numshares">
                    <span className="symbol">{ownedStock[1].symbol}</span>
                    <span className="num-shares">{ownedStock[1].num_shares}</span>
                </div>
                <div className="stock-info">
                    <span className="dollar-change">{stocks[ownedStock[1].symbol].dollarChange}</span>
                    <span className="percentage-change">{ownedStock[1].num_shares}</span>
                </div>
            </li>
        </>
    )
};