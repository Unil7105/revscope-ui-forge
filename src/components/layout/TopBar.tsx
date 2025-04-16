
import React from "react";
import { Bell, Search, Calendar, ChevronDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TopBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Left: Page Title & Date */}
        <div>
          <h1 className="text-xl font-semibold text-rs-text">Sales Dashboard</h1>
          <div className="text-sm text-gray-500">April 16, 2025</div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rs-blue focus:border-transparent"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Filter size={16} />
            <span>Filters</span>
          </button>
          
          {/* Date Range Selector */}
          <button className="hidden md:flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Calendar size={16} />
            <span>Last 30 days</span>
            <ChevronDown size={14} />
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-rs-red text-white text-xs">3</Badge>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
