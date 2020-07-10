import React from 'react'
import {useSelector} from 'react-redux'

export default ({watchedStock}) => {
    const stockInfo = useSelector(state => state.entities.stocks[watchedStock.symbol])
    if (!stockInfo) return null

    return (
        <tr className="watchlist-stock">
            <td>{stockInfo.symbol}</td>
            <td>{stockInfo.company}</td>
            <td>{stockInfo.price}</td>
            <td>{stockInfo.percentageChange}</td>
        </tr>
    )
};