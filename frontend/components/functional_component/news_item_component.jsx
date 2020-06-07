import React from 'react'

export default ({article}) => {
    return (
        <li>
            <p>{article.source}</p>
            <p>{article.headline}</p>
            <p>{article.summary}</p>
            <img src={window.stockThree} />
        </li>
    )
};