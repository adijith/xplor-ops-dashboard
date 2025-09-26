import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
