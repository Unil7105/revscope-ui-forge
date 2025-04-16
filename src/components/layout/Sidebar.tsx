
import React from "react";
import { 
  BarChart, 
  Users, 
  ShoppingCart, 
  Target, 
  Settings, 
  LifeBuoy, 
  Home,
  PieChart,
  Bell,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  to,
  active = false,
  onClick 
}) => {
  return (
    <li className="relative">
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center w-full gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-300",
          active 
            ? "bg-gradient-to-r from-rs-blue to-rs-indigo text-white shadow-md shadow-rs-blue/20 relative" 
            : "text-gray-700 hover:bg-gray-100/70 hover:translate-x-0.5",
          active && "after:absolute after:inset-0 after:opacity-20 after:animate-pulse-soft after:bg-white after:rounded-md"
        )}
      >
        <div className={cn(
          "relative",
          active && "after:absolute after:inset-0 after:rounded-full after:animate-ping after:bg-white/40 after:opacity-75"
        )}>
          <Icon size={18} className={cn(
            active ? "text-white animate-pulse-soft" : "text-gray-500",
            "transition-colors duration-300"
          )} />
        </div>
        <span className={cn(
          active ? "font-medium" : "",
          "transition-all duration-300"
        )}>{label}</span>
        {active && (
          <span className="absolute right-2 w-1 h-1 rounded-full bg-white animate-pulse"></span>
        )}
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 border-r border-slate-200/70 w-60 flex flex-col overflow-hidden shadow-sm">
      {/* Logo */}
      <div className="p-4 border-b border-slate-200/70">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-rs-blue to-rs-indigo text-white p-1.5 rounded-md shadow-sm group-hover:shadow-md group-hover:shadow-rs-blue/20 transition-all duration-300">
            <BarChart size={20} className="group-hover:animate-bounce transition-all duration-100" />
          </div>
          <h1 className="font-semibold text-lg bg-gradient-to-r from-rs-text to-rs-indigo bg-clip-text text-transparent group-hover:from-rs-indigo group-hover:to-rs-blue transition-all duration-300">RevScope</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          Dashboard
        </div>
        <ul className="space-y-1.5 mb-8">
          <SidebarItem icon={Home} label="Overview" to="/" active={currentPath === "/"} />
          <SidebarItem icon={BarChart} label="Analytics" to="/analytics" active={currentPath === "/analytics"} />
          <SidebarItem icon={PieChart} label="Reports" to="/reports" active={currentPath === "/reports"} />
          <SidebarItem icon={Bell} label="Alerts" to="/alerts" active={currentPath === "/alerts"} />
        </ul>

        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          Sales
        </div>
        <ul className="space-y-1.5 mb-8">
          <SidebarItem icon={ShoppingCart} label="Orders" to="/orders" active={currentPath === "/orders"} />
          <SidebarItem icon={Users} label="Customers" to="/customers" active={currentPath === "/customers"} />
          <SidebarItem icon={Target} label="Pipelines" to="/pipelines" active={currentPath === "/pipelines"} />
        </ul>

        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          System
        </div>
        <ul className="space-y-1.5">
          <SidebarItem icon={Settings} label="Settings" to="/settings" active={currentPath === "/settings"} />
          <SidebarItem icon={LifeBuoy} label="Support" to="/support" active={currentPath === "/support"} />
        </ul>
      </nav>

      {/* User account section */}
      <div className="p-4 border-t border-slate-200/70 bg-white/50 transition-colors duration-300 hover:bg-white/80">
        <button className="flex items-center w-full gap-2 px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-200 group">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rs-blue/10 to-rs-indigo/10 border border-rs-blue/20 flex items-center justify-center text-gray-700 font-medium shadow-sm group-hover:border-rs-blue/40 transition-colors group-hover:shadow-md">
            JS
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium">John Smith</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <LogOut size={16} className="text-gray-400 group-hover:text-rs-red transition-colors group-hover:translate-x-0.5 transform transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
