import React from 'react';
import { X } from 'lucide-react';

interface VehicleBreakdown {
  vehicle_id: number;
  vehicle_number: string;
  vehicle_name: string;
  ticket_count: number;
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
  vehicle_breakdown: VehicleBreakdown[];
}

interface PaperRollDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data?: TicketCountData;
}

const PaperRollDialog: React.FC<PaperRollDialogProps> = ({ isOpen, onClose, data }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Content */}
        <div className="px-6 pt-4 pb-6">
          {/* Note with close button */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-black">
              *Full reports and trip reports are not included.
            </p>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4 px-4 py-3">
                <div className="text-sm font-medium text-gray-700">Bus Number</div>
                <div className="text-sm font-medium text-gray-700">Tickets Printed</div>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {data?.vehicle_breakdown?.map((vehicle, index) => (
                <div
                  key={vehicle.vehicle_id}
                  className={`grid grid-cols-2 gap-4 px-4 py-3 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="text-sm text-gray-900">{vehicle.vehicle_number}</div>
                  <div className="text-sm text-gray-900">{vehicle.ticket_count}</div>
                </div>
              )) || (
                <div className="px-4 py-8 text-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperRollDialog;