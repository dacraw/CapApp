import {useSelector} from 'react-redux'
import React from 'react'
import NewsComponentItem from './NewsComponentItem'


export default (props) => {
    const currentUser = useSelector(state => state.session.id);
    const news = useSelector(state => state.entities.users[currentUser].news);
    if (!currentUser || !news) return null
    return (
        <>
            <div className="dashboard-news">
                <h1>Today's Top Business News</h1>
                {news.map(newsItem => <NewsComponentItem newsItem={newsItem} />)}
            </div>
        </>
    )
};