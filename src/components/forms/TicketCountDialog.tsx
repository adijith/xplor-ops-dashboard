import React from "react";
import { X } from "lucide-react";

interface TicketCountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: any;
}

const TicketCountDialog: React.FC<TicketCountDialogProps> = ({
  isOpen,
  onClose,
  ticketData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[600px] max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            *Full reports and trip reports are not included.
          </p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm text-gray-600">Bus Number</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Tickets Printed</th>
            </tr>
          </thead>
          <tbody>
            {ticketData.vehicle_breakdown.map((v: any) => (
              <tr key={v.vehicle_id} className="border-t">
                <td className="px-4 py-2 text-sm">{v.vehicle_number}</td>
                <td className="px-4 py-2 text-sm">{v.ticket_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketCountDialog;
