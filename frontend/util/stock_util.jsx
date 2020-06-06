

export const fetchStocks = () => (
    $.ajax({
        url: 'api/stocks',
    })
)

export const fetchStock = symbol => (
    $.ajax({
        url: `api/stocks/${symbol}`
    })
)