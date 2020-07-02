export const fetchBusinessNews = () => (
    $.ajax({
        url: '/news/business'
    })
)