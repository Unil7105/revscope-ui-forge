
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
    <div className="flex h-screen bg-rs-bg antialiased text-rs-text">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block transition-all duration-300 animate-in slide-in-from-left-1 h-full shadow-lg z-20">
          <Sidebar />
        </div>
      )}
      
      {/* Mobile Sidebar (Sheet) */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[250px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content Area with Scrolling */}
        <main className={cn(
          "flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 transition-opacity duration-500", 
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
