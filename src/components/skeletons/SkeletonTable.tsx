import React from 'react';

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ 
  rows = 5, 
  columns = 5, 
  className = "" 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-auto max-h-[calc(100vh-350px)] border rounded-lg">
        <table className="w-full">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;
