export const createPortfolio = portfolio => (
    $.ajax({
        method: 'POST',
        url: 'api/portfolios',
        data: { portfolio }
    })
)

export const fetchPortfolios = currentUser => (
    $.ajax({
        url: `api/users/${currentUser}/portfolios`,
    })
)

export const updatePortfolio = portfolio => {
    debugger
    $.ajax({
        method: 'PATCH',
        url: `/api/users/${portfolio.user_id}/portfolios/${portfolio.symbol}`,
        data: { portfolio },
    })
}