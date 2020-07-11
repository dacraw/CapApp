import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {deleteWatchedStock} from '../../actions/watchedStockActions'

export default ({watchedStock}) => {
    const stockInfo = useSelector(state => state.entities.stocks[watchedStock.symbol])
    if (!stockInfo) return null

    const dispatch = useDispatch();

    return (
        <tr className="watchlist-stock">
            <td>{stockInfo.symbol}</td>
            <td>{stockInfo.company}</td>
            <td>{stockInfo.price}</td>
            <td>{stockInfo.percentageChange}</td>
            <td><button onClick={() => dispatch(deleteWatchedStock(watchedStock.id))} type="button">X</button></td>
        </tr>
    )
};