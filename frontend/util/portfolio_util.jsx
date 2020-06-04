export const createPortfolio = ( portfolio ) => (
    $.ajax({
        method: 'POST',
        url: '/api/portfolios',
        data: { portfolio }
    })
)