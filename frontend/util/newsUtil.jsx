export const fetchBusinessNews = () => (
    $.ajax({
        url: '/api/news'
    })
)