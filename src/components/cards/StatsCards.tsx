import React from 'react';
import TotalOwnersIcon from '../../assets/icons/total_owners.svg';
import ReqRollsIcon from '../../assets/icons/req_rolls.svg';
import NoReqRollsIcon from '../../assets/icons/no-req-rolls.svg';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Owners',
      value: '20',
      icon: TotalOwnersIcon,
      bgColor: 'bg-[#1E3A8A]',
      iconColor: 'text-white',
    },
    {
      title: 'Owners that requires rolls',
      value: '16',
      icon: ReqRollsIcon,
      bgColor: 'bg-[#1E3A8A]',
      iconColor: 'text-white',
    },
    {
      title: "Owners that doesn't require rolls",
      value: '16',
      icon: NoReqRollsIcon,
      bgColor: 'bg-[#1E3A8A]',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <img src={stat.icon} alt={stat.title} className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;