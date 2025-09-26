import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRollsUsageSummary } from '../../hooks/UseRollsUsage';

interface DistrictFilteredAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  selectedDistrict?: string;
}

const DistrictFilteredAutocomplete: React.FC<DistrictFilteredAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Type to search...",
  className = "",
  selectedDistrict,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useRollsUsageSummary();
  const owners = data?.data?.owners || [];
  
  // Memoize filtered owners and owner names to prevent unnecessary re-renders
  const ownerNames = useMemo(() => {
    const filteredOwners = selectedDistrict 
      ? owners.filter((owner: any) => owner.district_name === selectedDistrict)
      : owners;
    
    return filteredOwners.map((owner: any) => owner.owner_name);
  }, [owners, selectedDistrict]);

  useEffect(() => {
    if (value) {
      const filtered = ownerNames.filter((name: string) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(ownerNames);
    }
  }, [value, ownerNames]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full ${className}`}
        autoComplete="off"
      />
      
      {isOpen && isLoading && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="px-3 py-2 text-sm"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && !isLoading && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      
      {isOpen && !isLoading && filteredOptions.length === 0 && value && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <div className="px-3 py-2 text-sm text-gray-500">
            {selectedDistrict ? `No owners found in ${selectedDistrict}` : 'No owners found'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictFilteredAutocomplete;