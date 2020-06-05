export const fetchStock = stockSymbol => (
    $.ajax({
        url: `api/stocks/${stockSymbol}`
    })
)

export const fetchStocks = () => (
    $.ajax({
        url: 'api/stocks',
    })
)