import React, { useState } from 'react';
import AddNewPO from '../forms/AddNewPO';
import BusWiseDialog from '../forms/BusWiseDialog';
import PaperRollDialog from '../forms/PaperRollData';
import { downloadPurchaseOrdersExcel, downloadHandoverDetailsExcel } from '../../api/PurchaseOrder';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

interface TicketCountData {
  owner_id: number;
  owner_name: string;
  date_range: {
    from_date: string;
    to_date: string;
  };
  total_tickets: number;
  total_vehicles: number;
  vehicle_breakdown: Array<{
    vehicle_id: number;
    vehicle_number: string;
    vehicle_name: string;
    ticket_count: number;
  }>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, setSearchQuery }) => {
  const [isAddPODialogOpen, setIsAddPODialogOpen] = useState(false);
  const [isBusWiseDialogOpen, setIsBusWiseDialogOpen] = useState(false);
  const [isPaperRollDialogOpen, setIsPaperRollDialogOpen] = useState(false);
  const [paperRollData, setPaperRollData] = useState<TicketCountData | undefined>();
  const [isExportingPO, setIsExportingPO] = useState(false);
  const [isExportingHandover, setIsExportingHandover] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const tabs = [
    { id: 'purchase-order', label: 'Purchase Order' },
    { id: 'rolls-usage', label: 'Rolls Usage' },
    // More tabs as needed
  ];

  // ✅ Handle Excel download
    const handleExport = async () => {
      setIsExportingPO(true);
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
      } finally {
        setIsExportingPO(false);
      }
    };

    const handleExportHandOver = () => {
      setIsDatePickerOpen(true);
    };

    const handleDatePickerSubmit = async () => {
      if (!fromDate || !toDate) {
        alert("Please select both start and end dates.");
        return;
      }
      
      setIsDatePickerOpen(false);
      setIsExportingHandover(true);
      try {
        const blob = await downloadHandoverDetailsExcel(fromDate, toDate);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "handover_data.xlsx"); // file name
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (err) {
        console.error("Failed to download Excel:", err);
        alert("Failed to export data. Please try again.");
      } finally {
        setIsExportingHandover(false);
        setFromDate('');
        setToDate('');
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
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery(''); // Clear search when switching tabs
                }}
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
                  disabled={isExportingPO}
                  className={`px-4 py-2 text-white text-xs font-regular rounded-lg flex items-center space-x-2 ${
                    isExportingPO 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {isExportingPO && (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isExportingPO ? 'Exporting...' : 'Export PO Data'}</span>
                </button>
                <button
                  onClick={handleExportHandOver} // ✅ Export Data download
                  disabled={isExportingHandover}
                  className={`px-4 py-2 text-white text-xs font-regular rounded-lg flex items-center space-x-2 ${
                    isExportingHandover 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {isExportingHandover && (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isExportingHandover ? 'Exporting...' : 'Export Hand Over Data'}</span>
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
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsBusWiseDialogOpen(true)}
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-regular rounded-lg hover:bg-gray-700"
                >
                  View Bus Wise Data
                </button>
        
              </div>
            </div>
          )}
        </div>
      </div>

      <AddNewPO isOpen={isAddPODialogOpen} onClose={() => setIsAddPODialogOpen(false)} />
      <BusWiseDialog 
        isOpen={isBusWiseDialogOpen} 
        onClose={() => setIsBusWiseDialogOpen(false)}
        onSubmitData={(data: TicketCountData) => {
          console.log('Bus wise data submitted:', data);
          setPaperRollData(data);
          setIsPaperRollDialogOpen(true);
        }}
      />
      
      <PaperRollDialog 
        isOpen={isPaperRollDialogOpen}
        onClose={() => {
          setIsPaperRollDialogOpen(false);
          setPaperRollData(undefined);
        }}
        data={paperRollData}
      />

      {/* Date Picker Dialog for Handover Export */}
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  min={fromDate || undefined}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsDatePickerOpen(false);
                  setFromDate('');
                  setToDate('');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDatePickerSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabNavigation;
