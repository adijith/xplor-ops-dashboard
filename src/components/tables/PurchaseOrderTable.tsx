import React, { useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import {
  usePurchaseOrders,
  useUpdatePurchaseOrder,
} from "../../hooks/UsePurchaseOrders";

interface PurchaseOrderTableProps {
  searchQuery?: string;
}

const districts = [
  { id: 1, name: "Thiruvananthapuram" },
  { id: 7, name: "Ernakulam" },
  { id: 11, name: "Kozhikode" },
  { id: 13, name: "Kannur" },
  { id: 9, name: "Palakkad" },
  { id: 2, name: "Kollam" },
  { id: 8, name: "Thrissur" },
  { id: 10, name: "Malappuram" },
  { id: 5, name: "Kottayam" },
  { id: 6, name: "Idukki" },
  { id: 12, name: "Wayanad" },
  { id: 14, name: "Kasaragod" },
  { id: 4, name: "Alappuzha" },
  { id: 3, name: "Pathanamthitta" },
];

const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
  searchQuery = "",
}) => {
  const { data, isLoading, isError } = usePurchaseOrders({ page: 1, limit: 25 });
  const updatePO = useUpdatePurchaseOrder();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load purchase orders</p>;

  const orders = data?.data?.purchase_orders || [];

  // ✅ Search filter
  const filteredOrders = orders.filter((o: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      o.po_no.toLowerCase().includes(query) ||
      o.district_name.toLowerCase().includes(query) ||
      (o.received_date || "").toLowerCase().includes(query)
    );
  });

  // ✅ Start editing row
  const handleEditClick = (row: any) => {
    setEditingId(row.id);
    setFormData({
      po_no: row.po_no,
      district_id: row.district_id,
      purchased_count: row.purchased_count,
      received_date: row.received_date,
    });
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  // ✅ Save row updates
  const handleSave = async (id: number) => {
    try {
      const payload = {
        po_no: formData.po_no,
        district_id: formData.district_id,
        purchased_count: Number(formData.purchased_count),
        received_date: formData.received_date,
      };

      await updatePO.mutateAsync({ id, data: payload });
      alert("Purchase order updated successfully!");
      setEditingId(null);
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

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
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredOrders.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {/* PO Number */}
                <td className="px-6 py-4 text-sm font-medium">
                  {editingId === row.id ? (
                    <input
                      type="text"
                      value={formData.po_no}
                      onChange={(e) =>
                        setFormData({ ...formData, po_no: e.target.value })
                      }
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    row.po_no
                  )}
                </td>

                {/* Purchased Count */}
                <td className="px-6 py-4 text-sm">
                  {editingId === row.id ? (
                    <input
                      type="number"
                      value={formData.purchased_count}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          purchased_count: Number(e.target.value),
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    row.purchased_count
                  )}
                </td>

                {/* District */}
                <td className="px-6 py-4 text-sm">
                  {editingId === row.id ? (
                    <select
                      value={formData.district_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          district_id: Number(e.target.value),
                        })
                      }
                      className="border px-2 py-1 rounded"
                    >
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.district_name
                  )}
                </td>

                {/* Received Date */}
                <td className="px-6 py-4 text-sm">
                  {editingId === row.id ? (
                    <input
                      type="date"
                      value={formData.received_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          received_date: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    row.received_date
                  )}
                </td>

                {/* Net Rolls (read-only) */}
                <td className="px-6 py-4 text-sm">
                  <span
                    style={{
                      color: row.stock_percentage <= 25 ? "#E7164C" : "inherit",
                    }}
                  >
                    {row.count}
                  </span>
                  {row.stock_percentage <= 25 && (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-[#E7164C] ml-4"
                      style={{ backgroundColor: "#FDE8ED" }}
                    >
                      Count Low
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-sm">
                  {editingId === row.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(row.id)}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded"
                        disabled={updatePO.isPending}
                      >
                        OK
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-300 text-black text-xs rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleEditClick(row)}
                    />
                  )}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
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

export default PurchaseOrderTable;
