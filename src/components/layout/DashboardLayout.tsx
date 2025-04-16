import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children
}) => {
  const [mounted, setMounted] = useState(false);

  // Add a small animation delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <div className="flex h-screen bg-rs-bg antialiased text-rs-text">
      {/* Sidebar - Hidden on Mobile */}
      <div className="hidden md:block transition-all duration-300 animate-in slide-in-from-left-1">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />
        
        {/* Main Content Area with Scrolling */}
        <main className={cn("flex-1 overflow-y-auto p-4 md:p-6 transition-opacity duration-500", mounted ? "opacity-100" : "opacity-0")}>
          <div className="container mx-auto max-w-7xl animate-in fade-in-50 slide-in-from-bottom-2 duration-500 h-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global toast container */}
      <Toaster position="top-right" />
    </div>;
};
export default DashboardLayout;