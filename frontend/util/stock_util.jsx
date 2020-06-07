

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

export const createUserStock = userStock => (
    $.ajax({
        method: 'POST',
        url: 'api/user_stocks',
        data: { userStock }
    })
)

export const fetchUserStocks = () => (
    $.ajax({
        url: 'api/user_stocks',
    })
)