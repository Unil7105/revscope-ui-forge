
import React from "react";
import { Bell, Search, Menu, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopBarProps {
  onMenuClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative bg-gradient-to-r from-red-900/90 to-purple-900/90 border-b border-red-800/30 h-16 flex items-center px-4 md:px-6 backdrop-blur-sm z-10 shadow-md">
      {/* Nebula effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <Sparkles className="absolute text-pink-300 h-6 w-6 top-2 left-[15%] animate-pulse" />
        <Star className="absolute text-yellow-300 h-4 w-4 top-8 left-[25%] animate-pulse-soft" />
        <Star className="absolute text-orange-300 h-3 w-3 top-3 left-[45%] animate-pulse-soft" />
        <Sparkles className="absolute text-red-300 h-5 w-5 top-6 left-[65%] animate-pulse" />
        <Star className="absolute text-pink-300 h-4 w-4 top-2 left-[85%] animate-pulse-soft" />
      </div>

      <div className="flex items-center gap-4 w-full relative z-10">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-red-100 hover:bg-red-800/30 hover:text-white" 
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-red-300" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-9 h-9 md:w-[240px] lg:w-[300px] bg-red-950/50 border-red-800/50 text-white placeholder:text-red-200/70 focus-visible:bg-red-950/70" 
          />
        </div>
        
        <div className="flex items-center ml-auto gap-2">
          <Button variant="ghost" size="icon" className="relative text-red-100 hover:bg-red-800/30 hover:text-white">
            <Bell size={18} />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
