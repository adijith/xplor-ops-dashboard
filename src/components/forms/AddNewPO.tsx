import React, { useState, useEffect } from 'react';
import CommonDialog, { DialogConfig } from './CommonDialog';
import { useCreatePurchaseOrder } from "../../hooks/UsePurchaseOrders";


interface AddNewPODialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom validation functions
const validatePONumber = (value: string): string | null => {
  if (value.length < 3) {
    return 'PO Number must be at least 3 characters';
  }
  return null;
};

const validateRollCount = (value: string): string | null => {
  const num = parseInt(value);
  if (isNaN(num) || num <= 0) {
    return 'Number of rolls must be a positive number';
  }
  return null;
};

const validateReceivedDate = (value: string): string | null => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return 'Received Date must be a valid date';
  }
  return null;
};

const AddNewPODialog: React.FC<AddNewPODialogProps> = ({ isOpen, onClose }) => {
  const createPurchaseOrderMutation = useCreatePurchaseOrder();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | undefined>();
  
  // Clear message when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setMessage(undefined);
    }
  }, [isOpen]);
  
  // Get current date in YYYY-MM-DD format for HTML date input
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  const getDistrictId = (districtName: string): string => {
    const districtMap: Record<string, string> = {
      'Alappuzha': '4',
      'Thrissur': '8',
      'Kozhikode': '11',
      'Kollam': '2',
      'Kannur': '13',
      'Pathanamthitta': '3',
      'Kottayam': '5',
      'Idukki': '6',
      'Ernakulam': '7',
      'Thiruvananthapuram': '1',
      'Palakkad': '9',
      'Malappuram': '10',
      'Wayanad': '12',
      'Kasaragod': '14',
    };
    return districtMap[districtName] || districtName;
  };
  
  const handleSubmit = async (data: Record<string, string>) => {
    // Clear any previous messages
    setMessage(undefined);
    
    try {
      // Build payload to match API contract
      const payload = {
        po_no: data.purchaseOrderNumber,
        district_id: Number(getDistrictId(data.district)), // ✅ convert district name → ID
        purchased_count: Number(data.numberOfRolls),   // ✅ ensure number
        received_date: data.receivedDate ,  // optional if backend supports
      };
  
      console.log("Creating new PO...", payload);
  
      // Use mutation hook - this will automatically refetch data on success
      const response = await createPurchaseOrderMutation.mutateAsync(payload);

      console.log("Response...", response);
  
      if (response.message === "Purchase order created successfully" || response.data) {
        setMessage({ type: 'success', text: 'Purchase order created successfully!' });
        // Close dialog after 2 seconds on success
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        setMessage({ type: 'error', text: 'Failed to create purchase order: ' + response.message });
      }
    } catch (err: any) {
      console.error("Error creating purchase order:", err);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  // Dialog configuration for Add New Purchase Order
  const dialogConfig: DialogConfig = {
    title: 'Add New Purchase Order',
    isOpen,
    onClose,
    onSubmit: handleSubmit,
    submitButtonText: createPurchaseOrderMutation.isPending ? 'Saving...' : 'Save',
    isLoading: createPurchaseOrderMutation.isPending,
    message: message,
    width: '800px',
    height: '361px',
    fields: [
      {
        id: 'purchaseOrderNumber',
        label: 'Purchase Order Number',
        type: 'text',
        required: true,
        validation: validatePONumber,
      },
      {
        id: 'district',
        label: 'District',
        type: 'select',
        required: true,
        defaultValue: 'Alappuzha',
        options: [
          { value: 'Alappuzha', label: 'Alappuzha' },
          { value: 'Thrissur', label: 'Thrissur' },
          { value: 'Kozhikode', label: 'Kozhikode' },
          { value: 'Kollam', label: 'Kollam' },
          { value: 'Kannur', label: 'Kannur' },
          { value: 'Pathanamthitta', label: 'Pathanamthitta' },
          { value: 'Kottayam', label: 'Kottayam' },
          { value: 'Idukki', label: 'Idukki' },
          { value: 'Ernakulam', label: 'Ernakulam' },
          { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' },
          { value: 'Palakkad', label: 'Palakkad' },
          { value: 'Malappuram', label: 'Malappuram' },
          { value: 'Wayanad', label: 'Wayanad' },
          { value: 'Kasaragod', label: 'Kasaragod' },
        ],
        
      },
      {
        id: 'numberOfRolls',
        label: 'Number of Rolls',
        type: 'number',
        required: true,
        validation: validateRollCount,
      },
      {
        id: 'receivedDate',
        label: 'Received Date',
        type: 'date',
        required: true,
        defaultValue: getCurrentDate(),
        validation: validateReceivedDate,
      },
    ],
  };

  return <CommonDialog {...dialogConfig} />;
};

export default AddNewPODialog;  