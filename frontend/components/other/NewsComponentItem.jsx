import React from "react";

export default function NewsComponentItem({ newsItem }) {
  return (
    <>
      <div className="dashboard-news-item">
        <a target="_blank" href={newsItem.url}>
          <div className="left">
            <p className="source">{newsItem.source.name}</p>
            <h3 className="title">{newsItem.title}</h3>
          </div>
          {newsItem.urlToImage && <img src={newsItem.urlToImage} />}
        </a>
      </div>
    </>
  );
}
