import React, { useEffect, useState } from "react";
import { getOwnerVehicleUsage } from "../../api/RollsUsage";

interface VehicleData {
  vehicle_id: number;
  vehicle_number: string;
  vehicle_name: string;
  tickets_printed: number;
  tickets_expected: number;
  rolls_used: number;
  net_rolls: number;
  remaining_rolls: number;
  usage_percentage: number;
  safe_zone: boolean;
  needs_rolls: boolean;
  urgency_level: string;
}

interface RollsUsageTableByOwnerProps {
  ownerId: number | null; // passed from parent
}

const RollsUsageTableByOwner: React.FC<RollsUsageTableByOwnerProps> = ({ ownerId }) => {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOwnerVehicleUsage(ownerId);
        if (response.message === "Vehicle-wise data retrieved successfully" && response.data?.vehicles) {
          setVehicles(response.data.vehicles);
        } else {
          setError(response.message || "Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message || "Error fetching vehicle usage");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ownerId]);

  if (!ownerId) {
    return <p className="text-center text-gray-500">Select an owner to view vehicle data</p>;
  }

  if (loading) return <p>Loading vehicle usage...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <div className="overflow-auto max-h-[calc(100vh-350px)] border rounded-lg">
        <table className="w-full">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">Bus Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">Rolls Used / Rolls Supplied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">Remaining Rolls</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">Tickets Printed / Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#A0AEC0] border-b">Usage %</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {vehicles.map((v) => (
              <tr key={v.vehicle_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{v.vehicle_number}</td>
                <td className="px-6 py-4 text-sm">
                  {v.rolls_used} / {v.net_rolls}
                </td>
                <td className="px-6 py-4 text-sm">{v.remaining_rolls}</td>
                <td className="px-6 py-4 text-sm">
                  {v.tickets_printed} / {v.tickets_expected}
                </td>
                <td className="px-6 py-4 text-sm">{v.usage_percentage}%</td>
              </tr>
            ))}

            {vehicles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No vehicle data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RollsUsageTableByOwner;
