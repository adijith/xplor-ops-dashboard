import React from 'react';
import SkeletonStatsGrid from './SkeletonStatsGrid';
import SkeletonTable from './SkeletonTable';

const SkeletonPage: React.FC = () => {
  return (
    <main className="flex-1 p-6 overflow-auto bg-[#EBF1FF]">
      <div className="max-w-7xl mx-auto space-y-6">
        <SkeletonStatsGrid />
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="pt-2 pb-8 px-6">
            <SkeletonTable rows={8} columns={6} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkeletonPage;
