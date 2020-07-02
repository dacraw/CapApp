import React from 'react'
import {useSelector} from 'react-redux'

export default ({newsItem}) => {

    return (
        <>
            <div className="dashboard-news-item">
                <a target="_blank" href={newsItem.url}>
                    <div className="left">
                        {/* <i className="fas fa-dollar-sign"></i> */}
                        <p className="source">{newsItem.source.name}</p>
                        <h3 className="title">{newsItem.title}</h3>
                    </div>
                    <img src={newsItem.urlToImage} />
                </a>
            </div>
        </>
    )
};