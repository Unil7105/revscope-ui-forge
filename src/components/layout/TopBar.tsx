
import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopBarProps {
  onMenuClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white border-b border-slate-200/70 h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-4 w-full">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-9 h-9 md:w-[240px] lg:w-[300px] bg-gray-50 border-gray-200 focus-visible:bg-white" 
          />
        </div>
        
        <div className="flex items-center ml-auto gap-2">
          <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
            <Bell size={18} />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
