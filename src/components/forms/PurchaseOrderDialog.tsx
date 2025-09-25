import React from 'react';
import CommonDialog, { DialogConfig } from './CommonDialog';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose }) => {
  
  const handleSubmit = (data: Record<string, string>) => {
    console.log('Exporting data...', {
      exportFormat: data.exportFormat,
      dateRange: data.dateRange,
      fileName: data.fileName,
      includeHeaders: data.includeHeaders
    });
    // Handle actual export logic here
    onClose();
  };

  // Dialog configuration for Export Data
  const dialogConfig: DialogConfig = {
    title: 'Export Data',
    isOpen,
    onClose,
    onSubmit: handleSubmit,
    submitButtonText: 'Export',
    width: '600px',
    height: 'auto',
    fields: [
      {
        id: 'exportFormat',
        label: 'Export Format',
        type: 'select',
        required: true,
        defaultValue: 'excel',
        options: [
          { value: 'excel', label: 'Excel (.xlsx)' },
          { value: 'csv', label: 'CSV (.csv)' },
          { value: 'pdf', label: 'PDF (.pdf)' },
        ],
      },
      {
        id: 'dateRange',
        label: 'Date Range',
        type: 'select',
        required: true,
        defaultValue: 'all',
        options: [
          { value: 'all', label: 'All Time' },
          { value: 'last30', label: 'Last 30 Days' },
          { value: 'last90', label: 'Last 90 Days' },
          { value: 'custom', label: 'Custom Range' },
        ],
      },
      {
        id: 'fileName',
        label: 'File Name',
        type: 'text',
        placeholder: 'Enter file name (optional)',
      },
      {
        id: 'includeHeaders',
        label: 'Include Headers',
        type: 'select',
        defaultValue: 'yes',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
  };

  return <CommonDialog {...dialogConfig} />;
};

export default ExportDialog;