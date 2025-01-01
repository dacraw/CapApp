import React from "react";

const items = Array.from({ length: 5 }, (_, i) => i);

const NewsComponentItemSkeleton = () => {
  return (
    <div className="dashboard-news-item">
      <a target="_blank" className="">
        <div className="left">
          <p className="source skeleton"></p>
          <h3 className="title skeleton" style={{ height: "3em" }}></h3>
        </div>
        <p className="skeleton" style={{ width: "20%", height: "5em" }}></p>
      </a>
    </div>
  );
};

export default function NewsComponentSkeleton() {
  return (
    <div>
      {items.map((i) => (
        <NewsComponentItemSkeleton key={i} />
      ))}
      <p>hey</p>
    </div>
  );
}
