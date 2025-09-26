import React from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonStatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default SkeletonStatsGrid;
