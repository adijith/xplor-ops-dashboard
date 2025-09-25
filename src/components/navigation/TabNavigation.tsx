import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import AddNewPO from '../forms/AddNewPO';
import { downloadPurchaseOrdersExcel } from '../../api/PurchaseOrder';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, setSearchQuery }) => {
  const [isAddPODialogOpen, setIsAddPODialogOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const tabs = [
    { id: 'purchase-order', label: 'Purchase Order' },
    { id: 'rolls-usage', label: 'Rolls Usage' },
    // More tabs as needed
  ];

  // ✅ Handle Excel download
  const handleExport = async () => {
    try {
      const blob = await downloadPurchaseOrdersExcel();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "purchase_orders.xlsx"); // file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download Excel:", err);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <>
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-[#A0AEC0] hover:text-[#A0AEC0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'purchase-order' ? (
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Purchase Order Number, District, Received Date"
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="w-[488px] pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleExport} // ✅ Export Data download
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-regular rounded-lg hover:bg-gray-700"
                >
                  Export Data
                </button>
                <button
                  onClick={() => setIsAddPODialogOpen(true)}
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-regular rounded-lg hover:bg-blue-700"
                >
                  Add new PO
                </button>
              </div>
            </div>
          ) : activeTab === 'rolls-usage-by-owner' ? (
            // ... keep your date picker UI here ...
            <div className="flex items-center space-x-6">
              {/* date picker stuff */}
            </div>
          ) : activeTab === "rolls-usage" && (
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Bus Owner, District"
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="w-[488px] pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddNewPO isOpen={isAddPODialogOpen} onClose={() => setIsAddPODialogOpen(false)} />
    </>
  );
};

export default TabNavigation;
