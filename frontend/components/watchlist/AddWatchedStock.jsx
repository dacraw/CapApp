import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createWatchedStock} from '../../actions/watchedStockActions'
import {useParams} from 'react-router-dom'

export default (props) => {
    // debugger
    const [symbol, setSymbol] = useState("");
    const stocks = useSelector(state => state.entities.stocks)

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
        if (stocks[symbol]){
            dispatch(createWatchedStock({stock_id: stocks[symbol].id, watchlist_id: props.params.id}))
        }
        // debugger
        // createWatchedStock(stockID)
    }
    return (
        <tr>
            <td colSpan="5">
            <form onSubmit={handleSubmit}>
                    <label>Stock Symbol:
                        <input type="text" value={symbol} onChange={(e) => setSymbol(e.currentTarget.value)}/>
                    </label>
                    <input type="submit" value="Add Stock to List" />
            </form>
            </td>
        </tr>
    )
};