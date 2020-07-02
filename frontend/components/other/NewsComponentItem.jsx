import React from 'react'
import {useSelector} from 'react-redux'

export default ({newsItem}) => {

    return (
        <>
            <div className="dashboard-news-item">
                <a target="_blank" href={newsItem.url}>
                    <div className="row">
                        {/* <i className="fas fa-dollar-sign"></i> */}
                        <p className="source">{newsItem.source.name}</p>
                    </div>
                    <div className="row">
                        <h3 className="title">{newsItem.title}</h3>
                        <img src={newsItem.urlToImage} />
                    </div>
                </a>
            </div>
        </>
    )
};