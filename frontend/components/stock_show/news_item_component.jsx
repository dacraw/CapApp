import React from "react";

export default function NewsItemComponent({ article }) {
  return (
    <li className="news-item">
      <a target="_blank" href={article.url}>
        <div>
          <h2>{article.source.name}</h2>
          <h3>{article.title}</h3>
          <h4>{article.description}</h4>
        </div>
        {article.urlToImage && <img src={article.urlToImage} />}
      </a>
    </li>
  );
}
