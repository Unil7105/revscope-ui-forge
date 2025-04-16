
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Users, Filter, RefreshCw, ChevronDown, X } from "lucide-react";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Filter Tag Component
interface FilterTagProps {
  label: string;
  value: string;
  onRemove: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ label, value, onRemove }) => {
  return (
    <div className="flex items-center gap-1 text-xs bg-slate-100 text-gray-700 px-2 py-1 rounded-full group hover:bg-slate-200 transition-colors">
      <span className="font-medium capitalize">{label}:</span> {value}
      <button 
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700 group-hover:bg-slate-300/50 rounded-full h-4 w-4 flex items-center justify-center transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={10} />
      </button>
    </div>
  );
};

const FilterPanel: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({
    category: "All Categories",
    region: "All Regions"
  });
  const [isHovering, setIsHovering] = useState(false);

  const removeFilter = (key: string) => {
    const updatedFilters = {...activeFilters};
    delete updatedFilters[key];
    setActiveFilters(updatedFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <Card 
      className={`w-full transition-all duration-300 hover:shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200/60 ${isHovering ? 'shadow-md translate-y-[-2px]' : 'shadow-sm'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <Filter size={14} className="text-gray-700" />
            </div>
            <span className="bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">
              Filter Dashboard
            </span>
          </CardTitle>
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CollapsibleTrigger 
              className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${filtersOpen ? '' : 'transform rotate-180'}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="animate-in slide-in-from-top-1 duration-200">
              <CardContent className="space-y-4 pt-0">
                {/* Active Filters */}
                {Object.keys(activeFilters).length > 0 && (
                  <div className="flex flex-wrap gap-2 pb-2 animate-in fade-in-50">
                    {Object.entries(activeFilters).map(([key, value]) => (
                      <FilterTag 
                        key={key}
                        label={key}
                        value={value}
                        onRemove={() => removeFilter(key)}
                      />
                    ))}
                    <button 
                      onClick={clearAllFilters}
                      className="text-xs text-gray-500 hover:text-indigo-500 underline transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* Date Range */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-medium text-gray-700">Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white shadow-sm border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors group"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-indigo-500 transition-colors" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 shadow-lg border border-gray-100 animate-in fade-in-50 zoom-in-95">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Product Category */}
                <div className="space-y-2">
                  <Label htmlFor="product" className="text-xs font-medium text-gray-700">Product Category</Label>
                  <Select 
                    defaultValue="all" 
                    onValueChange={(value) => setActiveFilters({...activeFilters, category: value === 'all' ? 'All Categories' : value})}
                  >
                    <SelectTrigger id="product" className="bg-white shadow-sm border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-md animate-in slide-in-from-top-1 zoom-in-95">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-xs font-medium text-gray-700">Region</Label>
                  <Select 
                    defaultValue="all"
                    onValueChange={(value) => setActiveFilters({...activeFilters, region: value === 'all' ? 'All Regions' : value})}
                  >
                    <SelectTrigger id="region" className="bg-white shadow-sm border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-md animate-in slide-in-from-top-1 zoom-in-95">
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="apac">Asia Pacific</SelectItem>
                      <SelectItem value="latam">Latin America</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sales Rep */}
                <div className="space-y-2">
                  <Label htmlFor="sales-rep" className="flex items-center gap-1 text-xs font-medium text-gray-700">
                    <Users size={14} className="text-gray-600" />
                    Sales Representative
                  </Label>
                  <Select 
                    defaultValue="all"
                    onValueChange={(value) => setActiveFilters({...activeFilters, rep: value === 'all' ? 'All Representatives' : value})}
                  >
                    <SelectTrigger id="sales-rep" className="bg-white shadow-sm border-gray-200 hover:border-gray-300 transition-colors">
                      <SelectValue placeholder="Select sales rep" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-md animate-in slide-in-from-top-1 zoom-in-95">
                      <SelectItem value="all">All Representatives</SelectItem>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="emily">Emily Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="sarah">Sarah Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search by Order ID */}
                <div className="space-y-2">
                  <Label htmlFor="order-id" className="text-xs font-medium text-gray-700">Order ID</Label>
                  <Input 
                    id="order-id" 
                    placeholder="Enter order ID" 
                    className="bg-white shadow-sm border-gray-200 focus:border-rs-blue/50 focus:ring-1 focus:ring-rs-blue/30 transition-colors" 
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-rs-blue to-rs-indigo hover:opacity-90 shadow-sm hover:shadow-md transition-all text-white active:scale-[0.98] duration-200">
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1 bg-white shadow-sm border-gray-200 hover:bg-gray-50 active:scale-95 transition-all duration-150"
                  >
                    <RefreshCw size={14} className="animate-spin-slow" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <CardDescription>Refine the data view</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FilterPanel;
