
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  // Add a small animation delay for better UX
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-rs-bg antialiased text-rs-text">
      {/* Sidebar - Hidden on Mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />
        
        {/* Main Content Area with Scrolling */}
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 transition-opacity duration-300",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="container mx-auto max-w-7xl">
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
