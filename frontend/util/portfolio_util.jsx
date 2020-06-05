export const fetchPortfolio = userId => (
    $.ajax({
        url: `/api/users/${userId}/portfolios`,
    })
)