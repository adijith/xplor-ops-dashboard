import React, { useState, useRef, useEffect } from 'react';
import EditIcon from '../../assets/icons/edit.svg';

const PurchaseOrderTable = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const data = [
    {
      purchaseOrderName: 'Anil Kumar',
      noRolls: 80,
      district: 'Kozhikode',
      receivedDate: '09/10/2025',
      netRolls: 650,
      netRollsStatus: 'Dispatched',
      status: 'Active'
    },
    {
      purchaseOrderName: 'Rajesh Menon',
      noRolls: 95,
      district: 'Kochi',
      receivedDate: '08/10/2025',
      netRolls: 50,
      netRollsStatus: 'Delivered',
      status: 'Pending'
    },
    {
      purchaseOrderName: 'Sanjay Nair',
      noRolls: 60,
      district: 'Thiruvananthapuram',
      receivedDate: '07/10/2025',
      netRolls: 500,
      netRollsStatus: 'Assigned',
      status: 'Completed'
    },
    {
      purchaseOrderName: 'Deepak Varma',
      noRolls: 120,
      district: 'Kannur',
      receivedDate: '06/10/2025',
      netRolls: 750,
      netRollsStatus: 'Assigned',
      status: 'In Progress'
    },
    {
      purchaseOrderName: 'Vinod Kumar',
      noRolls: 110,
      district: 'Palakkad',
      receivedDate: '05/10/2025',
      netRolls: 920,
      netRollsStatus: 'Delivered',
      status: 'On Hold'
    },
    {
      purchaseOrderName: 'Ashok Pillai',
      noRolls: 75,
      district: 'Kollam',
      receivedDate: '04/10/2025',
      netRolls: 680,
      netRollsStatus: 'Dispatched',
      status: 'Approved'
    },
    {
      purchaseOrderName: 'Mohanan Das',
      noRolls: 85,
      district: 'Thrissur',
      receivedDate: '03/10/2025',
      netRolls: 720,
      netRollsStatus: 'Dispatched',
      status: 'Under Review'
    },
    {
      purchaseOrderName: 'Krishnan Nair',
      noRolls: 100,
      district: 'Malappuram',
      receivedDate: '02/10/2025',
      netRolls: 850,
      netRollsStatus: 'Dispatched',
      status: 'Cancelled'
    },
    {
      purchaseOrderName: 'Babu Thomas',
      noRolls: 130,
      district: 'Kottayam',
      receivedDate: '01/10/2025',
      netRolls: 950,
      netRollsStatus: 'Delivered',
      status: 'Processing'
    },
    {
      purchaseOrderName: 'Raman Kutty',
      noRolls: 45,
      district: 'Idukki',
      receivedDate: '30/09/2025',
      netRolls: 420,
      netRollsStatus: 'Assigned',
      status: 'Expired'
    },
    {
      purchaseOrderName: 'Gopal Krishna',
      noRolls: 70,
      district: 'Wayanad',
      receivedDate: '29/09/2025',
      netRolls: 580,
      netRollsStatus: 'Dispatched',
      status: 'Draft'
    },
    {
      purchaseOrderName: 'Manoj Kumar',
      noRolls: 82,
      district: 'Kasaragod',
      receivedDate: '28/09/2025',
      netRolls: 720,
      netRollsStatus: 'Delivered',
      status: 'Rejected'
    },
    {
      purchaseOrderName: 'Sudhir Menon',
      noRolls: 105,
      district: 'Alappuzha',
      receivedDate: '27/09/2025',
      netRolls: 780,
      netRollsStatus: 'Assigned',
      status: 'Validated'
    },
    {
      purchaseOrderName: 'Radhakrishnan',
      noRolls: 55,
      district: 'Pathanamthitta',
      receivedDate: '26/09/2025',
      netRolls: 620,
      netRollsStatus: 'Dispatched',
      status: 'Suspended'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-orange-100 text-orange-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Assigned':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRandomStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-800';
      case 'On Hold':
        return 'bg-red-100 text-red-800';
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'Processing':
        return 'bg-cyan-100 text-cyan-800';
      case 'Expired':
        return 'bg-rose-100 text-rose-800';
      case 'Draft':
        return 'bg-slate-100 text-slate-800';
      case 'Rejected':
        return 'bg-red-200 text-red-900';
      case 'Validated':
        return 'bg-teal-100 text-teal-800';
      case 'Suspended':
        return 'bg-orange-200 text-orange-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement;
    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check initial state
      const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      setIsAtBottom(isBottom);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
          border: none;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>
      
      {/* Table Container with Fixed Height and Scrolling */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`overflow-auto max-h-[calc(100vh-350px)] custom-scrollbar ${isAtBottom ? 'border border-gray-200' : 'border-t border-l border-r border-gray-200'} rounded-lg`}
      >
        <table className="w-full">
          {/* Sticky Header */}
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
                Purchase Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
                No of Rolls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
                District
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
                Recieved Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
                Net Rolls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
              
              </th>
            </tr>
          </thead>
          {/* Scrollable Body */}
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.purchaseOrderName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.noRolls}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.district}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.receivedDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
  <div className="flex items-center">
    <span className="flex-1" style={{ color: row.netRolls <= 50 ? '#E7164C' : 'inherit' }}>{row.netRolls}</span>
    {row.netRolls <= 50 && (
       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full min-w-[80px] justify-center" 
             style={{ backgroundColor: '#FDE8ED', color: '#E7164C' }}>
         Count Low
       </span>
    )}
  </div>
</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <img src={EditIcon} alt="Edit" className="w-4 h-4 cursor-pointer" />
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrderTable;