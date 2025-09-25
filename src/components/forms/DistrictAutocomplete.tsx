import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRollsUsageSummary } from '../../hooks/UseRollsUsage';

interface DistrictAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DistrictAutocomplete: React.FC<DistrictAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Type to search...",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data } = useRollsUsageSummary();
  const owners = data?.data?.owners || [];
  
  // Extract unique district names from the owners data - memoized to prevent infinite re-renders
  const districtNames: string[] = useMemo(() => 
    Array.from(new Set(owners.map((owner: any) => owner.district_name))),
    [owners]
  );

  useEffect(() => {
    if (value) {
      const filtered = districtNames.filter((name: string) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(districtNames);
    }
  }, [value, districtNames]);

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
      
      {isOpen && filteredOptions.length > 0 && (
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
      
      {isOpen && filteredOptions.length === 0 && value && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <div className="px-3 py-2 text-sm text-gray-500">
            No districts found
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictAutocomplete;
