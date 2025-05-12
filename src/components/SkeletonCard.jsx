import React from "react";

const SkeletonCard = ({ lines = 3 }) => {
  <div className="p-4 border rounded-lg bg-orange-500 animate-pulse space-y-2">
    <div className="h-6 bg-gray-200 rounded w-3/4" />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded" />
    ))}
    <div className="h-32 bg-gray-200 rounded" />
  </div>;
};

export default SkeletonCard;
