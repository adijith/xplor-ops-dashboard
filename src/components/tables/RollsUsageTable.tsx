import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useRollsUsageSummary } from "../../hooks/UseRollsUsage";

interface RollsUsageTableProps {
  setActiveTab?: (tab: string) => void;
  searchQuery?: string;
  setSelectedOwnerData?: (data: { owner_id: string; }) => void;
}

const RollsUsageTable: React.FC<RollsUsageTableProps> = ({
  setActiveTab,
  searchQuery = "",
  setSelectedOwnerData,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  
  const { data, isLoading, isError } = useRollsUsageSummary();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement;
    const isBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
    setIsAtBottom(isBottom);
  };

  const getWastageColor = (wastage: number) => {
    if (wastage < 20) {
      return "bg-[#FDE8ED] text-[#E7164C]"; // low wastage
    } else {
      return "bg-[#E7FDF8] text-[#13A579]"; // higher usage
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      setIsAtBottom(isBottom);
    }
  }, []);

  
  if (isLoading) return <p>Loading rolls usage...</p>;
  if (isError) return <p>Failed to fetch rolls usage</p>;

  // ✅ Extract owners from API response
  const owners = data?.data?.owners || [];

  // ✅ District list (for classification)
  const districts = [
    "Thiruvananthapuram",
    "Kochi",
    "Ernakulam",
    "Kozhikode",
    "Kannur",
    "Palakkad",
    "Kollam",
    "Thrissur",
    "Malappuram",
    "Kottayam",
    "Idukki",
    "Wayanad",
    "Kasaragod",
    "Alappuzha",
    "Pathanamthitta",
  ];

  // ✅ Apply search filter
  const filteredOwners = owners.filter((o: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    if (districts.some((d) => d.toLowerCase().includes(query))) {
      return o.district_name.toLowerCase().includes(query);
    }
    return o.owner_name.toLowerCase().includes(query);
  });

  return (
    <div className="w-full">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`overflow-auto max-h-[calc(100vh-350px)] custom-scrollbar ${
          isAtBottom
            ? "border border-gray-200"
            : "border-t border-l border-r border-gray-200"
        } rounded-lg`}
      >
        <table className="w-full">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                Bus Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                District
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                No Of Buses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                Rolls Used / Net Rolls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                Tickets Printed / Expected
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
               
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredOwners.map((row: any, index: number) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  if (setSelectedOwnerData) {
                    setSelectedOwnerData({
                      owner_id: row.owner_id,
                    });
                  }
                  setActiveTab && setActiveTab("rolls-usage-by-owner");
                }}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {row.owner_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.district_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.total_buses}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.total_rolls_used} / {row.total_net_rolls}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center justify-between">
                    <span>
                      {row.total_tickets_printed} / {row.total_tickets_expected}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full min-w-[80px] justify-center ${getWastageColor(
                        row.avg_usage_percentage
                      )}`}
                    >
                      Usage: {row.avg_usage_percentage}%
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-gray-900">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <ChevronRight size={20} className="text-[#1F80FF]" />
                  </div>
                </td>
              </tr>
            ))}

            {filteredOwners.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RollsUsageTable;
