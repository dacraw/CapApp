export const fetchStock = stockSymbol => (
    $.ajax({
        url: `/stocks/${stockSymbol}`
    })
)