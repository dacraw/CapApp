

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

export const createUserStock = user_stock => (
    $.ajax({
        method: 'POST',
        url: 'api/user_stocks',
        data: { user_stock }
    })
)

export const fetchUserStocks = () => (
    $.ajax({
        url: 'api/user_stocks',
    })
)