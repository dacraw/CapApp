import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default (props) => {
    const watchlists = useSelector(state => state.entities.watchlists)
    if (!Object.values(watchlists).length) return null

    debugger
    const watchedStocks = watchlists[props.match.params.id].watchedStocks
    console.log(watchedStocks)
    return (
        <>
        <ul>
            {Object.values(watchedStocks).map(stock=><li>{stock.symbol}</li>)}
        </ul>
        </>
    )
}