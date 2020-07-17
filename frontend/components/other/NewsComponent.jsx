import {useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import NewsComponentItem from './NewsComponentItem'
import {useDispatch} from 'react-redux'
import {fetchBusinessNews} from '../../actions/newsActions'


export default (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.id);
    useEffect( () => {
        dispatch(fetchBusinessNews())
    }, []);
    const news = useSelector(state => state.entities.news);
    if (!currentUser || !Object.keys(news).length) return null
    debugger
    return (
        <>
            <div className="dashboard-news">
                <h1>Today's Top Business News</h1>
                {Object.values(news).map(newsItem => <NewsComponentItem newsItem={newsItem} />)}
            </div>
        </>
    )
};