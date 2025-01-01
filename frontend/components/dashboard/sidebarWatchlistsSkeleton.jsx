import React from "react";

const items = Array.from({ length: 3 }, (_, i) => i);

export default function SidebarWatchlistsSkeleton() {
  return (
    <div>
      {items.map((i) => (
        <p key={i} className="skeleton"></p>
      ))}
    </div>
  );
}
