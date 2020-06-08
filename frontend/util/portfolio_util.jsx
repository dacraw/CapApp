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