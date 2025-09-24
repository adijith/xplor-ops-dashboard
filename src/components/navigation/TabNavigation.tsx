import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import ExportDialog from '../forms/PurchaseOrderDialog';
import AddNewPO from '../forms/AddNewPO';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                  placeholder="Search by PO Number, Location"
                  className="w-[488px] pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsDialogOpen(true)}
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
            <div className="flex items-center space-x-6">

              {/* Date Picker Component */}
              <div className="relative">
                <div 
                  className="w-[280px] pl-10 pr-10 py-2 text-xs border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                >
                  <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedDate || 'Select date or date range'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>

                 {isDatePickerOpen && (
                   <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                     <div className="p-3">
                       {/* Month/Year Navigation */}
                       <div className="flex items-center justify-between mb-3">
                         <button
                           onClick={() => {
                             if (currentMonth === 0) {
                               setCurrentMonth(11);
                               setCurrentYear(currentYear - 1);
                             } else {
                               setCurrentMonth(currentMonth - 1);
                             }
                           }}
                           className="p-1 hover:bg-gray-100 rounded"
                         >
                           <ChevronDown className="h-4 w-4 text-gray-600 rotate-90" />
                         </button>
                         <span className="text-sm font-medium text-gray-900">
                           {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                         </span>
                         <button
                           onClick={() => {
                             if (currentMonth === 11) {
                               setCurrentMonth(0);
                               setCurrentYear(currentYear + 1);
                             } else {
                               setCurrentMonth(currentMonth + 1);
                             }
                           }}
                           className="p-1 hover:bg-gray-100 rounded"
                         >
                           <ChevronDown className="h-4 w-4 text-gray-600 -rotate-90" />
                         </button>
                       </div>

                       {/* Day Headers */}
                       <div className="grid grid-cols-7 gap-1 mb-2">
                         <div className="text-xs text-gray-500 text-center py-2">Sun</div>
                         <div className="text-xs text-gray-500 text-center py-2">Mon</div>
                         <div className="text-xs text-gray-500 text-center py-2">Tue</div>
                         <div className="text-xs text-gray-500 text-center py-2">Wed</div>
                         <div className="text-xs text-gray-500 text-center py-2">Thu</div>
                         <div className="text-xs text-gray-500 text-center py-2">Fri</div>
                         <div className="text-xs text-gray-500 text-center py-2">Sat</div>
                       </div>

                       {/* Calendar Days */}
                       <div className="grid grid-cols-7 gap-1">
                         {(() => {
                           const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
                           const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
                           const firstDayWeekday = firstDayOfMonth.getDay();
                           const daysInMonth = lastDayOfMonth.getDate();
                           const today = new Date();
                           const isCurrentMonthAndYear = currentMonth === today.getMonth() && currentYear === today.getFullYear();
                           
                           const days = [];
                           
                           // Previous month days
                           const prevMonth = new Date(currentYear, currentMonth - 1, 0);
                           const daysInPrevMonth = prevMonth.getDate();
                           for (let i = firstDayWeekday - 1; i >= 0; i--) {
                             const day = daysInPrevMonth - i;
                             days.push(
                               <button
                                 key={`prev-${day}`}
                                 className="h-8 w-8 text-xs rounded flex items-center justify-center hover:bg-gray-50 text-gray-300"
                                 onClick={() => {
                                   if (currentMonth === 0) {
                                     setCurrentMonth(11);
                                     setCurrentYear(currentYear - 1);
                                   } else {
                                     setCurrentMonth(currentMonth - 1);
                                   }
                                 }}
                               >
                                 {day}
                               </button>
                             );
                           }
                           
                           // Current month days
                           for (let day = 1; day <= daysInMonth; day++) {
                             const isToday = isCurrentMonthAndYear && day === today.getDate();
                             days.push(
                               <button
                                 key={day}
                                 className={`
                                   h-8 w-8 text-xs rounded flex items-center justify-center hover:bg-blue-50
                                   text-gray-900
                                   ${isToday ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                                 `}
                                 onClick={() => {
                                   const date = new Date(currentYear, currentMonth, day);
                                   setSelectedDate(date.toLocaleDateString('en-US', { 
                                     month: 'long', 
                                     day: 'numeric', 
                                     year: 'numeric' 
                                   }));
                                   setIsDatePickerOpen(false);
                                 }}
                               >
                                 {day}
                               </button>
                             );
                           }
                           
                           // Next month days to fill the grid
                           const remainingCells = 42 - days.length; // 6 rows × 7 days
                           for (let day = 1; day <= remainingCells; day++) {
                             days.push(
                               <button
                                 key={`next-${day}`}
                                 className="h-8 w-8 text-xs rounded flex items-center justify-center hover:bg-gray-50 text-gray-300"
                                 onClick={() => {
                                   if (currentMonth === 11) {
                                     setCurrentMonth(0);
                                     setCurrentYear(currentYear + 1);
                                   } else {
                                     setCurrentMonth(currentMonth + 1);
                                   }
                                 }}
                               >
                                 {day}
                               </button>
                             );
                           }
                           
                           return days;
                         })()}
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by PO Number, Location"
                    className="w-[488px] pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ExportDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <AddNewPO isOpen={isAddPODialogOpen} onClose={() => setIsAddPODialogOpen(false)} />
    </>
  );
};

export default TabNavigation;