import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {createWatchedStock} from '../../actions/watchlistActions'

export default (props) => {
    const [symbol, setSymbol] = useState("");
    const stocks = useSelector(state => state.entities.stocks)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (stocks[symbol]){
            console.log('hi')
        }
        debugger
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