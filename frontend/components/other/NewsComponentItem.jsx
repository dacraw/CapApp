import React from 'react'
import {useSelector} from 'react-redux'

export default ({newsItem}) => {

    return (
        <>
            <div className="dashboard-news-item">
                <div className="row">
                    <i className="fas fa-dollar-sign"></i>
                    <p className="source">{newsItem.source.name}</p>
                </div>
            </div>
        </>
    )
};