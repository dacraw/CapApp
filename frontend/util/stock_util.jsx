export const fetchStock = stockSymbol => (
    $.ajax({
        url: `api/stocks/${stockSymbol}`
    })
)