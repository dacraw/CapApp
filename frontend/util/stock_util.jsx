

export const fetchStocks = () => (
    $.ajax({
        url: '/api/stocks',
    })
)

export const fetchStock = symbol => {
    debugger;
    return (
        $.ajax({
            url: `/api/stocks/${symbol}`
        })
    )
}

