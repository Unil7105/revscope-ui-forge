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
    <li className="relative group">
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "sidebar-item relative overflow-hidden",
          active ? "sidebar-item-active" : "sidebar-item-inactive"
        )}
      >
        {active && (
          <div className="absolute left-0 top-1 bottom-1 w-1.5 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
        )}
        
        <div className={cn(
          "relative z-10 flex items-center gap-3",
        )}>
          <div className={cn(
            "flex items-center justify-center rounded-md w-7 h-7",
            active ? "bg-white/20 text-white" : "text-gray-500"
          )}>
            <Icon size={18} className={cn(
              "transition-transform duration-300",
              active ? "text-white" : "text-gray-500 group-hover:text-rs-blue",
            )} />
          </div>
          <span className={cn(
            "text-sm transition-all duration-300",
            active ? "font-semibold text-white" : "font-medium text-gray-700 group-hover:text-gray-900" 
          )}>
            {label}
          </span>
        </div>
        
        {active && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-rs-blue to-rs-indigo opacity-100"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/70 shadow-[0_0_5px_rgba(255,255,255,0.7)]"></div>
          </>
        )}
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="bg-white border-r border-slate-200/70 w-64 flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200/70">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-rs-blue to-rs-indigo text-white p-1.5 rounded-md shadow-sm group-hover:shadow-md group-hover:shadow-rs-blue/20 transition-all duration-300 group-hover:scale-105">
            <BarChart size={20} className="group-hover:animate-bounce transition-all duration-100" />
          </div>
          <h1 className="font-semibold text-lg bg-gradient-to-r from-rs-text to-rs-indigo bg-clip-text text-transparent group-hover:from-rs-indigo group-hover:to-rs-blue transition-all duration-300">RevScope</h1>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          Dashboard
        </div>
        <ul className="space-y-1 mb-8">
          <SidebarItem icon={Home} label="Overview" to="/" active={currentPath === "/"} />
          <SidebarItem icon={PieChart} label="Reports" to="/reports" active={currentPath === "/reports"} />
          <SidebarItem icon={Bell} label="Alerts" to="/alerts" active={currentPath === "/alerts"} />
        </ul>

        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          Sales
        </div>
        <ul className="space-y-1 mb-8">
          <SidebarItem icon={ShoppingCart} label="Orders" to="/orders" active={currentPath === "/orders"} />
          <SidebarItem icon={Users} label="Customers" to="/customers" active={currentPath === "/customers"} />
          <SidebarItem icon={Target} label="Pipelines" to="/pipelines" active={currentPath === "/pipelines"} />
        </ul>

        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          System
        </div>
        <ul className="space-y-1">
          <SidebarItem icon={Settings} label="Settings" to="/settings" active={currentPath === "/settings"} />
          <SidebarItem icon={LifeBuoy} label="Support" to="/support" active={currentPath === "/support"} />
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200/70 bg-white/50 transition-colors duration-300 hover:bg-white/80">
        <button className="flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:shadow-sm transition-all duration-200 group hover:scale-[1.02]">
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
