import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Autocomplete from './Autocomplete';
import DistrictAutocomplete from './DistrictAutocomplete';
import DistrictFilteredAutocomplete from './DistrictFilteredAutocomplete';
import { useRollsUsageSummary } from '../../hooks/UseRollsUsage';

// Field types
export type FieldType = 'text' | 'number' | 'date' | 'email' | 'password' | 'select' | 'autocomplete' | 'district-autocomplete' | 'district-filtered-autocomplete';

// Field configuration interface
export interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For select fields
  defaultValue?: string;
  required?: boolean;
  validation?: (value: string, formData?: Record<string, string>) => string | null; // Returns error message or null
  min?: string; // For date fields - minimum date
}

// Dialog configuration interface
export interface DialogConfig {
  title: string;
  fields: FieldConfig[];
  submitButtonText: string;
  onSubmit: (data: Record<string, string>) => void;
  onClose: () => void;
  isOpen: boolean;
  width?: string;
  height?: string;
  isLoading?: boolean;
  message?: {
    type: 'success' | 'error';
    text: string;
  };
}

// Reusable floating-label text input
const FloatingInput: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  min?: string;
}> = ({ id, label, value, onChange, type = 'text', placeholder = '', error, min }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ' '}
        min={min}
        className={`peer w-full px-3 pt-4 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-sm transition-all px-1
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] peer-focus:px-1 ` +
          (isFilled 
            ? '-top-3 left-4 text-sm text-[#334155] px-1' 
            : 'top-4 left-4 text-base text-[#6B778C] px-0'
          )
        }
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// Reusable floating-label select
const FloatingSelect: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}> = ({ id, label, value, onChange, options, error }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full px-3 pt-4 pb-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      >
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-sm transition-all px-1
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] peer-focus:px-1 ` +
          (isFilled 
            ? '-top-3 left-4 text-sm text-[#334155] px-1' 
            : 'top-4 left-4 text-base text-[#6B778C] px-0'
          )
        }
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// Reusable floating-label autocomplete wrapper
const FloatingAutocomplete: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}> = ({ id, label, value, onChange, placeholder = '', error }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <Autocomplete
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        className={`peer w-full px-3 pt-4 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-sm transition-all px-1
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] peer-focus:px-1 ` +
          (isFilled 
            ? '-top-3 left-4 text-sm text-[#334155] px-1' 
            : 'top-4 left-4 text-base text-[#6B778C] px-0'
          )
        }
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// Reusable floating-label district autocomplete wrapper
const FloatingDistrictAutocomplete: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}> = ({ id, label, value, onChange, placeholder = '', error }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <DistrictAutocomplete
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        className={`peer w-full px-3 pt-4 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-sm transition-all px-1
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] peer-focus:px-1 ` +
          (isFilled 
            ? '-top-3 left-4 text-sm text-[#334155] px-1' 
            : 'top-4 left-4 text-base text-[#6B778C] px-0'
          )
        }
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// Reusable floating-label district filtered autocomplete wrapper
const FloatingDistrictFilteredAutocomplete: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  selectedDistrict?: string;
}> = ({ id, label, value, onChange, placeholder = '', error, selectedDistrict }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative">
      <DistrictFilteredAutocomplete
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        className={`peer w-full px-3 pt-4 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        selectedDistrict={selectedDistrict}
      />
      <label
        htmlFor={id}
        className={
          `absolute left-4 font-normal -top-3 bg-white text-sm transition-all px-1
           peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B778C] peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0
           peer-focus:-top-3 peer-focus:left-4 peer-focus:text-sm peer-focus:text-[#334155] peer-focus:px-1 ` +
          (isFilled 
            ? '-top-3 left-4 text-sm text-[#334155] px-1' 
            : 'top-4 left-4 text-base text-[#6B778C] px-0'
          )
        }
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// Main reusable dialog component
const CommonDialog: React.FC<DialogConfig> = ({
  title,
  fields,
  submitButtonText,
  onSubmit,
  onClose,
  isOpen,
  width = '800px',
  height = 'auto',
  isLoading = false,
  message
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isInitializedRef = useRef(false);
  
  // Get rolls usage data for owner-to-district lookup
  const { data: rollsUsageData } = useRollsUsageSummary();

  // Initialize form data when dialog opens for the first time
  useEffect(() => {
    if (isOpen && !isInitializedRef.current) {
      const initialData: Record<string, string> = {};
      fields.forEach(field => {
        initialData[field.id] = field.defaultValue || '';
      });
      setFormData(initialData);
      setErrors({});
      isInitializedRef.current = true;
    } else if (!isOpen) {
      isInitializedRef.current = false;
    }
  }, [isOpen, fields]);

  // Clear form data only when success message is shown
  useEffect(() => {
    if (message && message.type === 'success') {
      const initialData: Record<string, string> = {};
      fields.forEach(field => {
        initialData[field.id] = field.defaultValue || '';
      });
      setFormData(initialData);
      setErrors({});
    }
  }, [message, fields]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [fieldId]: value
      };

      // If district field changes, clear the owner field
      if (fieldId === 'district') {
        newData.ownerName = '';
      }

      // If owner name is selected and district is empty, auto-fill district
      if (fieldId === 'ownerName' && value && !prev.district && rollsUsageData?.data?.owners) {
        const owners = rollsUsageData.data.owners;
        const matchingOwners = owners.filter((owner: any) => owner.owner_name === value);
        
        // Only auto-fill if there's exactly one matching owner (no duplicates)
        if (matchingOwners.length === 1) {
          newData.district = matchingOwners[0].district_name;
        }
        // If there are multiple owners with the same name from different districts, don't auto-fill
      }

      // If start date changes, only update end date if it becomes invalid
      if (fieldId === 'startDate') {
        const currentEndDate = prev.endDate;
        if (currentEndDate) {
          const startDate = new Date(value);
          const endDate = new Date(currentEndDate);
          
          // Only update end date if it's before the new start date
          if (endDate < startDate) {
            newData.endDate = value;
          }
        } else {
          // If no end date is set, set it to the start date
          newData.endDate = value;
        }
      }

      return newData;
    });

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.id] || '';
      
      // Required field validation
      if (field.required && !value.trim()) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      // Custom validation (now supports cross-field validation)
      if (field.validation && value) {
        const validationError = field.validation(value, formData);
        if (validationError) {
          newErrors[field.id] = validationError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-2xl shadow-xl p-8 ml-8 font-inter"
        style={{ width, height: height === 'auto' ? 'auto' : height }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Form */}
        <div className="space-y-4">
          {/* Render fields in pairs for 2-column layout */}
          {Array.from({ length: Math.ceil(fields.length / 2) }, (_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 gap-4">
              {fields.slice(rowIndex * 2, rowIndex * 2 + 2).map((field) => {
                if (field.type === 'select') {
                  return (
                    <FloatingSelect
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      value={formData[field.id] || ''}
                      onChange={(value) => handleFieldChange(field.id, value)}
                      options={field.options || []}
                      error={errors[field.id]}
                    />
                  );
                } else if (field.type === 'autocomplete') {
                  return (
                    <FloatingAutocomplete
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      value={formData[field.id] || ''}
                      onChange={(value) => handleFieldChange(field.id, value)}
                      placeholder={field.placeholder}
                      error={errors[field.id]}
                    />
                  );
                } else if (field.type === 'district-autocomplete') {
                  return (
                    <FloatingDistrictAutocomplete
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      value={formData[field.id] || ''}
                      onChange={(value) => handleFieldChange(field.id, value)}
                      placeholder={field.placeholder}
                      error={errors[field.id]}
                    />
                  );
                } else if (field.type === 'district-filtered-autocomplete') {
                  return (
                    <FloatingDistrictFilteredAutocomplete
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      value={formData[field.id] || ''}
                      onChange={(value) => handleFieldChange(field.id, value)}
                      placeholder={field.placeholder}
                      error={errors[field.id]}
                      selectedDistrict={formData.district}
                    />
                  );
                } else {
                  // For end date field, set min to start date if available
                  const minValue = field.id === 'endDate' && formData.startDate 
                    ? formData.startDate 
                    : field.min;
                  
                  return (
                    <FloatingInput
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      value={formData[field.id] || ''}
                      onChange={(value) => handleFieldChange(field.id, value)}
                      type={field.type}
                      placeholder={field.placeholder}
                      error={errors[field.id]}
                      min={minValue}
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className={`w-5 h-5 mr-3 ${
              message.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {message.type === 'success' ? (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Only show submit button if there's no success message */}
        {!message || message.type !== 'success' ? (
          <div className={`flex justify-end ${message ? 'mt-4' : 'mt-12'}`}>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`font-medium rounded-lg w-[232px] h-[48px] flex items-center justify-center ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submitButtonText}
            </button>
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg w-[232px] h-[48px]"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonDialog;