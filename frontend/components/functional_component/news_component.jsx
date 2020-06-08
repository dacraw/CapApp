import React from 'react'
import NewsItemComponent from './news_item_component'

export default ({ news }) => {
    
    if (!news) return null
    return (
        <section className="news">
            <h1>News</h1>
            <ul>
                {news.map((article, idx) => <NewsItemComponent article={article} key={idx} />)}
            </ul>
        </section>
    )
};