import React, {useState} from 'react'

export default (props) => {
    const [symbol, setSymbol] = useState("");
    return (
        <>
            <tr>
                <form>
                    <Label>Stock Symbol:
                        <input type="text" value={symbol} onChange={(e) => setSymbol(e.currentTarget.value)}/>
                    </Label>
                    <input type="submit" value="Add Stock to List" />
                </form>
            </tr>
        </>
    )
};