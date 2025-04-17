
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children
}) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-red-950 antialiased text-white relative overflow-hidden">
      {/* Nebula background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[60%] rounded-full bg-purple-800/30 blur-3xl"></div>
        <div className="absolute top-[40%] left-[60%] w-[60%] h-[50%] rounded-full bg-red-800/40 blur-3xl"></div>
        <div className="absolute top-[10%] left-[40%] w-[30%] h-[30%] rounded-full bg-pink-800/20 blur-3xl"></div>
        <div className="absolute top-[70%] left-[10%] w-[40%] h-[40%] rounded-full bg-red-600/20 blur-3xl"></div>
      </div>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block transition-all duration-300 animate-in slide-in-from-left-1 h-full shadow-lg z-20">
          <Sidebar />
        </div>
      )}
      
      {/* Mobile Sidebar (Sheet) */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[250px] bg-gradient-to-b from-red-950 to-purple-950 border-red-800/50">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Bar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content Area with Scrolling */}
        <main className={cn(
          "flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 transition-opacity duration-500 backdrop-blur-sm", 
          mounted ? "opacity-100" : "opacity-0"
        )}>
          <div className="container mx-auto max-w-7xl animate-in fade-in-50 slide-in-from-bottom-2 duration-500 h-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global toast container */}
      <Toaster position="top-right" />
    </div>
  );
};

export default DashboardLayout;
