import React from 'react'

export default ({article}) => {
    return (
        <li className="news-item">
            <div>
                <h2>{article.source.name}</h2>
                <h3>{article.title}</h3>
                <h4>{article.description.slice(0,20)}...</h4>
            </div>
            <img src={window.stockThree} />
        </li>
    )
};