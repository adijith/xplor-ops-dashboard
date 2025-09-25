import React from "react";
import EditIcon from "../../assets/icons/edit.svg";
import { useQuery } from "@tanstack/react-query";
import { listPurchaseOrders } from "../../api/PurchaseOrder";

interface PurchaseOrderTableProps {
  searchQuery?: string;
}

const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
  searchQuery = "",
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: () => listPurchaseOrders({ page: 1, limit: 25 }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load purchase orders</p>;

  const orders = data.data.purchase_orders || [];

  // ✅ Apply search filter (PO number, district, date)
  const filteredOrders = orders.filter((o: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    return (
      o.po_no.toLowerCase().includes(query) || // match PO number
      o.district_name.toLowerCase().includes(query) || // match district
      o.received_date.toLowerCase().includes(query) // match date (YYYY-MM-DD)
    );
  });

  return (
    <div className="w-full">
      <div className="overflow-auto max-h-[calc(100vh-350px)] border rounded-lg">
        <table className="w-full">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                Purchase Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                No of Rolls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                District
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                Received Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">
                Net Rolls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredOrders.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{row.po_no}</td>
                <td className="px-6 py-4 text-sm">{row.purchased_count}</td>
                <td className="px-6 py-4 text-sm">{row.district_name}</td>
                <td className="px-6 py-4 text-sm">{row.received_date}</td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{
                    color: row.stock_percentage <= 25 ? "#E7164C" : "inherit",
                  }}
                >
                  {row.count}
                  {row.stock_percentage <= 25 && (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-[#E7164C] ml-4"
                      style={{ backgroundColor: "#FDE8ED" }}
                    >
                      Count Low
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <img
                    src={EditIcon}
                    alt="Edit"
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-gray-500"
                >
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

export default PurchaseOrderTable;
