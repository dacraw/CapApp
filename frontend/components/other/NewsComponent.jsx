import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import NewsComponentItem from "./NewsComponentItem";
import { useDispatch } from "react-redux";
import { fetchBusinessNews } from "../../actions/newsActions";
import NewsComponentSkeleton from "./newsComponentSkeleton";

export default function NewsComponent(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const newsLoading = useSelector((state) => state.loading.newsLoader);

  useEffect(() => {
    dispatch(fetchBusinessNews());
  }, []);

  const news = useSelector((state) => state.entities.news);
  return (
    <div className="dashboard-news">
      <h1>Today's Top Business News</h1>
      {!currentUser || !Object.keys(news).length || newsLoading ? (
        <NewsComponentSkeleton />
      ) : (
        Object.values(news).map((newsItem, idx) => (
          <NewsComponentItem key={idx} newsItem={newsItem} />
        ))
      )}
    </div>
  );
}
