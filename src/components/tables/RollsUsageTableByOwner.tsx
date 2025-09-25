import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface RollsUsageTableByOwnerProps {
  selectedOwnerData?: {
    owner_id: string;
  } | null;
}

const RollsUsageTableByOwner: React.FC<RollsUsageTableByOwnerProps> = ({ selectedOwnerData }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  // Log the received data for debugging
  useEffect(() => {
    if (selectedOwnerData) {
      console.log('Selected Owner Data:', selectedOwnerData);
      console.log('Owner ID:', selectedOwnerData.owner_id);
    }
  }, [selectedOwnerData]);

  const data = [
    {
      busOwner: 'Anil Kumar',
      location: 'Kozhikode',
      noBuses: 12,
      rollsUsed: '12 / 70',
      ticketsPrinted: '1220 / 25000',
      wastage: 10
    },
    {
      busOwner: 'Babu Kumar',
      location: 'Kochi',
      noBuses: 15,
      rollsUsed: '20 / 85',
      ticketsPrinted: '1850 / 30000',
      wastage: 10
    },
    {
      busOwner: 'Rajesh Menon',
      location: 'Thiruvananthapuram',
      noBuses: 18,
      rollsUsed: '25 / 90',
      ticketsPrinted: '2100 / 32000',
      wastage: 12
    },
    {
      busOwner: 'Sanjay Nair',
      location: 'Kannur',
      noBuses: 10,
      rollsUsed: '15 / 60',
      ticketsPrinted: '980 / 18000',
      wastage: 45
    },
    {
      busOwner: 'Deepak Varma',
      location: 'Palakkad',
      noBuses: 22,
      rollsUsed: '30 / 110',
      ticketsPrinted: '2800 / 40000',
      wastage: 42
    },
    {
      busOwner: 'Vinod Kumar',
      location: 'Kollam',
      noBuses: 14,
      rollsUsed: '18 / 75',
      ticketsPrinted: '1650 / 28000',
      wastage: 15
    },
    {
      busOwner: 'Ashok Pillai',
      location: 'Thrissur',
      noBuses: 16,
      rollsUsed: '22 / 80',
      ticketsPrinted: '1920 / 29000',
      wastage: 38
    },
    {
      busOwner: 'Mohanan Das',
      location: 'Malappuram',
      noBuses: 20,
      rollsUsed: '28 / 95',
      ticketsPrinted: '2400 / 35000',
      wastage: 50
    },
    {
      busOwner: 'Krishnan Nair',
      location: 'Kottayam',
      noBuses: 8,
      rollsUsed: '10 / 50',
      ticketsPrinted: '750 / 15000',
      wastage: 16
    },
    {
      busOwner: 'Babu Thomas',
      location: 'Idukki',
      noBuses: 12,
      rollsUsed: '16 / 65',
      ticketsPrinted: '1300 / 24000',
      wastage: 25
    },
    {
      busOwner: 'Raman Kutty',
      location: 'Wayanad',
      noBuses: 9,
      rollsUsed: '12 / 55',
      ticketsPrinted: '890 / 16500',
      wastage: 48
    },
    {
      busOwner: 'Gopal Krishna',
      location: 'Kasaragod',
      noBuses: 11,
      rollsUsed: '14 / 60',
      ticketsPrinted: '1100 / 20000',
      wastage: 22
    },
    {
      busOwner: 'Manoj Kumar',
      location: 'Alappuzha',
      noBuses: 17,
      rollsUsed: '24 / 85',
      ticketsPrinted: '2050 / 31000',
      wastage: 35
    },
    {
      busOwner: 'Sudhir Menon',
      location: 'Pathanamthitta',
      noBuses: 13,
      rollsUsed: '17 / 70',
      ticketsPrinted: '1450 / 25500',
      wastage: 18
    }
  ];


  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement;
    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
    setIsAtBottom(isBottom);
  };


  
  useEffect(() => {
    const container = scrollContainerRef.current as HTMLDivElement | null;
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
                Bus Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] tracking-wider border-b border-gray-200">
                Rolls Used / Rolls Supplied
              </th>
            </tr>
          </thead>
          {/* Scrollable Body */}
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.busOwner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.rollsUsed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RollsUsageTableByOwner;