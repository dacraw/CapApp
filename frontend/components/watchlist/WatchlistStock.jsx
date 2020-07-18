import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {deleteWatchedStock} from '../../actions/watchedStockActions'

export default ({watchedStock}) => {
    const stockInfo = useSelector(state => state.entities.stocks[watchedStock.symbol])
    if (!stockInfo) return null
    const formatMoney = (number, decPlaces, decSep, thouSep) => {
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
        thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
        var j = (j = i.length) > 3 ? j % 3 : 0;
        
        return sign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    }
    const dispatch = useDispatch();
    return (
        <tr className="watchlist-stock">
            <td>{stockInfo.symbol}</td>
            <td>{stockInfo.company}</td>
            <td>${formatMoney(stockInfo.price,2,".",",")}</td>
            <td>{stockInfo.percentageChange}%</td>
            <td><button onClick={() => dispatch(deleteWatchedStock(watchedStock.id))} type="button">X</button></td>
        </tr>
    )
};