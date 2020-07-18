import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createWatchedStock} from '../../actions/watchedStockActions'
import {useParams} from 'react-router-dom'

export default (props) => {
    
    const [symbol, setSymbol] = useState("");
    const stocks = useSelector(state => state.entities.stocks)

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
        if (stocks[symbol.toUpperCase()]){
            dispatch(createWatchedStock({stock_id: stocks[symbol.toUpperCase()].id, watchlist_id: props.params.id}))
        }
        
        // createWatchedStock(stockID)
    }
    return (
        <tr>
            <td colSpan="5">
            <form className="add-watched-stock" onSubmit={handleSubmit}>
                    <label htmlFor="add-watched-stock-symbol">Stock Symbol:</label>
                    <input id="add-watched-stock-symbol" type="text" value={symbol} onChange={(e) => setSymbol(e.currentTarget.value)}/>
                    <input type="submit" value="Add Stock to List" />
            </form>
            </td>
        </tr>
    )
};