
import React from "react";
import { X } from "lucide-react";

interface FilterTagProps {
  label: string;
  value: string;
  onRemove: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ label, value, onRemove }) => {
  return (
    <div className="filter-chip group">
      <span className="font-medium capitalize">{label}:</span> 
      <span className="text-gray-600">{value}</span>
      <button 
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700 hover:bg-gray-300/50 rounded-full h-4 w-4 flex items-center justify-center transition-colors group-hover:bg-gray-300/80"
        aria-label={`Remove ${label} filter`}
      >
        <X size={10} className="transition-transform hover:scale-110" />
      </button>
    </div>
  );
};

export default FilterTag;
