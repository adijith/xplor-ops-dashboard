import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Reusable floating-label text input */
const FloatingInput: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}> = ({ id, label, value, onChange, type = 'text', placeholder = '' }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ' '}
        className="peer w-full px-3 pt-4 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center"
      />
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-[#334155] text-sm transition-all
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] ` +
          (isFilled ? '-top-3 left-4 text-sm text-[#334155]' : 'top-4 left-4 text-base text-[#6B778C]')
        }
      >
        {label}
      </label>
    </div>
  );
};

/** Reusable floating-label select */
const FloatingSelect: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode; // <option>...</option>
}> = ({ id, label, value, onChange, children }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full px-3 pt-4 pb-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center"
      >
        {/* Empty option to support placeholder state if you ever pass empty string */}
        <option value="" disabled hidden></option>
        {children}
      </select>
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-[#334155] text-sm transition-all
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] ` +
          (isFilled ? '-top-3 left-4 text-sm text-[#334155]' : 'top-4 left-4 text-base text-[#6B778C]')
        }
      >
        {label}
      </label>
    </div>
  );
};

const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState('12/12/2025');
  const [endDate, setEndDate] = useState('12/12/2025');
  const [district, setDistrict] = useState('Kannur');
  const [owner, setOwner] = useState('Sathish Lal');

  useEffect(() => {
    if (isOpen) {
      setStartDate('12/12/2025');
      setEndDate('12/12/2025');
      setDistrict('Kannur');
      setOwner('Sathish Lal');
    }
  }, [isOpen]);

  const handleExport = () => {
    console.log('Exporting data...', { startDate, endDate, district, owner });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[800px] h-[361px] p-8 ml-8 font-inter">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Export data to Excel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              id="startDate"
              label="Select Starting Date"
              value={startDate}
              onChange={setStartDate}
              type="text"
            />
            <FloatingInput
              id="endDate"
              label="Select Ending Date"
              value={endDate}
              onChange={setEndDate}
              type="text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FloatingSelect
              id="district"
              label="Select District"
              value={district}
              onChange={setDistrict}
            >
              <option value="Kannur">Kannur</option>
              <option value="Kochi">Kochi</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Kozhikode">Kozhikode</option>
            </FloatingSelect>

            <FloatingSelect
              id="owner"
              label="Owner Name"
              value={owner}
              onChange={setOwner}
            >
              <option value="Sathish Lal">Sathish Lal</option>
              <option value="Rajesh Kumar">Rajesh Kumar</option>
              <option value="Priya Nair">Priya Nair</option>
              <option value="Anil Menon">Anil Menon</option>
            </FloatingSelect>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg w-[232px] h-[48px]"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
