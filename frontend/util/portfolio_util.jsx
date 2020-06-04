export const createPortfolio = () => (
    $.ajax({
        method: 'POST',
        url: '/api/portfolios',
    })
)