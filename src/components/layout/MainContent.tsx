import React from 'react';
import StatsCards from '../cards/StatsCards';
import TabNavigation from '../navigation/TabNavigation';
import DeliveryStatusTable from '../tables/PurchaseOrderTable';
import RollsUsageTable from '../tables/RollsUsageTable';
import RollsUsageTableByOwner from '../tables/RollsUsageTableByOwner';
import PurchaseOrderTable from '../tables/PurchaseOrderTable';

interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, setActiveTab }) => {
  const renderTable = () => {
    switch (activeTab) {
      case 'purchase-order':
        return <PurchaseOrderTable />;
      case 'rolls-usage':
        return <RollsUsageTable setActiveTab={setActiveTab} />;
      case 'rolls-usage-by-owner':
        return <RollsUsageTableByOwner />;
      default:
        return <PurchaseOrderTable />;
    }
  };

  return (
    <main className="flex-1 p-6 overflow-auto bg-[#EBF1FF]">
      <div className="max-w-7xl mx-auto space-y-6">
        <StatsCards />
        <div className="bg-white rounded-xl overflow-hidden">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="pt-2 pb-8 px-6">
            {renderTable()}
          </div>
        </div>
      </div>
    </main>
  ); 
};

export default MainContent;