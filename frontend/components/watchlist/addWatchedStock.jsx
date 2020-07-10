import React, {useState} from 'react'
import {createWatchedStock} from '../../actions/watchlistActions'

export default (props) => {
    const [symbol, setSymbol] = useState("");
    return (
        <>
            <tr>
                <form onSubmit={handleSubmit}>
                    <Label>Stock Symbol:
                        <input type="text" value={symbol} onChange={(e) => setSymbol(e.currentTarget.value)}/>
                    </Label>
                    <input type="submit" value="Add Stock to List" />
                </form>
            </tr>
        </>
    )
};