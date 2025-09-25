import React, { useState, useEffect } from "react";
import CommonDialog, { DialogConfig } from "./CommonDialog";
import { getOwnerTicketCount } from "../../api/RollsUsage";
import { useRollsUsageSummary } from "../../hooks/UseRollsUsage";

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

interface BusWiseDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitData: (data: TicketCountData) => void; // callback for form submission with API data
}

const BusWiseDataDialog: React.FC<BusWiseDataDialogProps> = ({
  isOpen,
  onClose,
  onSubmitData,
}) => {
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: rollsUsageData } = useRollsUsageSummary();

  // Clear message and loading state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setMessage(undefined);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Helper: format current date as YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Validation function for end date
  const validateEndDate = (value: string, formData?: Record<string, string>) => {
    if (!value || !formData?.startDate) return null;
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(value);
    
    if (endDate < startDate) {
      return "End date must be on or after start date";
    }
    
    return null;
  };

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      setIsLoading(true);
      setMessage(undefined); // Clear any previous messages
      
      console.log("Bus Wise Data Form Submitted:", data);

      // Find owner ID by matching owner name
      const owners = rollsUsageData?.data?.owners || [];
      const selectedOwner = owners.find((owner: any) => owner.owner_name === data.ownerName);
      
      if (!selectedOwner) {
        throw new Error("Owner not found");
      }

      const ownerId = selectedOwner.owner_id;

      // Call the API
      const response = await getOwnerTicketCount(ownerId, data.startDate, data.endDate);
      
      // Debug: Log the response structure
      console.log("API Response:", response);
      
      // Check if response has data (success case)
      if (response && response.data) {
        // Call parent callback with API data
        onSubmitData(response.data);
        
        setMessage({ type: "success", text: "Bus Wise Data retrieved successfully!" });

        // Close immediately after success
        onClose();
      } else {
        // Handle error case - check if response has error information
        const errorMessage = response?.message || response?.error || "Failed to retrieve data";
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error:", err);
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dialogConfig: DialogConfig = {
    title: "Bus Wise Data",
    isOpen,
    onClose,
    onSubmit: handleSubmit,
    submitButtonText: "View Data",
    isLoading: isLoading,
    message: message,
    width: "900px",
    fields: [
      {
        id: "district",
        label: "District",
        type: "district-autocomplete",
        required: true,
        placeholder: "     ",
      },
      {
        id: "ownerName",
        label: "Owner Name",
        type: "district-filtered-autocomplete",
        placeholder: "     ",
        required: true,
      },
      {
        id: "startDate",
        label: "Starting Date",
        type: "date",
        required: true,
        defaultValue: getCurrentDate(),
      },
      {
        id: "endDate",
        label: "Ending Date",
        type: "date",
        required: true,
        defaultValue: getCurrentDate(),
        validation: validateEndDate,
      },
    ],
  };

  return <CommonDialog {...dialogConfig} />;
};

export default BusWiseDataDialog;