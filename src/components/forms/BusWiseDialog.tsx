import React, { useState, useEffect } from "react";
import CommonDialog, { DialogConfig } from "./CommonDialog";

interface BusWiseDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitData: (data: Record<string, string>) => void; // callback for form submission
}

const BusWiseDataDialog: React.FC<BusWiseDataDialogProps> = ({
  isOpen,
  onClose,
  onSubmitData,
}) => {
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | undefined
  >();

  // Clear message when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setMessage(undefined);
    }
  }, [isOpen]);

  // Helper: format current date as YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      console.log("Bus Wise Data Form Submitted:", data);

      // Call parent callback
      onSubmitData(data);

      setMessage({ type: "success", text: "Bus Wise Data retrieved!" });

      // Close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error("Error:", err);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const dialogConfig: DialogConfig = {
    title: "Bus Wise Data",
    isOpen,
    onClose,
    onSubmit: handleSubmit,
    submitButtonText: "View Data",
    isLoading: false,
    message: message,
    width: "900px",
    fields: [
      {
        id: "district",
        label: "District",
        type: "select",
        required: true,
        options: [
          { value: "Alappuzha", label: "Alappuzha" },
          { value: "Thrissur", label: "Thrissur" },
          { value: "Kozhikode", label: "Kozhikode" },
          { value: "Kollam", label: "Kollam" },
          { value: "Kannur", label: "Kannur" },
          { value: "Pathanamthitta", label: "Pathanamthitta" },
          { value: "Kottayam", label: "Kottayam" },
          { value: "Idukki", label: "Idukki" },
          { value: "Ernakulam", label: "Ernakulam" },
          { value: "Thiruvananthapuram", label: "Thiruvananthapuram" },
          { value: "Palakkad", label: "Palakkad" },
          { value: "Malappuram", label: "Malappuram" },
          { value: "Wayanad", label: "Wayanad" },
          { value: "Kasaragod", label: "Kasaragod" },
        ],
      },
      {
        id: "ownerName",
        label: "Owner Name",
        type: "autocomplete",
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
      },
    ],
  };

  return <CommonDialog {...dialogConfig} />;
};

export default BusWiseDataDialog;