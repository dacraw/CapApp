import React from 'react'

export default ({article}) => {
    return (
        <li className="news-item">
            <a target="_blank" href={article.url}>
                <div>
                    <h2>{article.source.name}</h2>
                    <h3>{article.title}</h3>
                    <h4>{article.description}</h4>
                </div>
                <img src={article.urlToImage} />
            </a>
        </li>
    )
};