import React, { useState } from 'react';
import StatsCards from '../cards/StatsCards';
import TabNavigation from '../navigation/TabNavigation';
import RollsUsageTable from '../tables/RollsUsageTable';
import RollsUsageTableByOwner from '../tables/RollsUsageTableByOwner';
import PurchaseOrderTable from '../tables/PurchaseOrderTable';

interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, setActiveTab,}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOwnerData, setSelectedOwnerData] = useState<{
    owner_id: string;
  } | null>(null);
  
  const renderTable = () => {
    switch (activeTab) {
      case 'purchase-order':
        return <PurchaseOrderTable searchQuery={searchQuery}/>;
      case 'rolls-usage':
        return <RollsUsageTable setActiveTab={setActiveTab} searchQuery={searchQuery} setSelectedOwnerData={setSelectedOwnerData} />;
        case "rolls-usage-by-owner":
          return <RollsUsageTableByOwner ownerId={selectedOwnerData ? parseInt(selectedOwnerData.owner_id) : null} />;        
      default:
        return <PurchaseOrderTable />;
    }
  };

  return (
    <main className="flex-1 p-6 overflow-auto bg-[#EBF1FF]">
      <div className="max-w-7xl mx-auto space-y-6">
        <StatsCards />
        <div className="bg-white rounded-xl overflow-hidden">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} setSearchQuery={setSearchQuery} />
          <div className="pt-2 pb-8 px-6">
            {renderTable()}
          </div>
        </div>
      </div>
    </main>
  ); 
};

export default MainContent;