import React from 'react'

export default ({article}) => {
    return (
        <li className="news-item">
            <div>
                <h2>{article.source}</h2>
                <h3>{article.headline}</h3>
                <h4>{article.summary.slice(0,20)}...</h4>
            </div>
            <img src={window.stockThree} />
        </li>
    )
};