

export const fetchStocks = () => (
    $.ajax({
        url: '/api/stocks',
    })
)

export const fetchStock = symbol => {
    
    return (
        $.ajax({
            url: `/api/stocks/${symbol}`
        })
    )
}

