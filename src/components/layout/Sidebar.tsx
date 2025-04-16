
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
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          active 
            ? "bg-rs-blue text-white" 
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="bg-white border-r border-border w-60 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-rs-blue text-white p-1 rounded-md">
            <BarChart size={20} />
          </div>
          <h1 className="font-semibold text-lg">RevScope</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          Dashboard
        </div>
        <ul className="space-y-1 mb-6">
          <SidebarItem icon={Home} label="Overview" to="/" active={currentPath === "/"} />
          <SidebarItem icon={BarChart} label="Analytics" to="/analytics" active={currentPath === "/analytics"} />
          <SidebarItem icon={PieChart} label="Reports" to="/reports" active={currentPath === "/reports"} />
          <SidebarItem icon={Bell} label="Alerts" to="/alerts" active={currentPath === "/alerts"} />
        </ul>

        <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
          Sales
        </div>
        <ul className="space-y-1 mb-6">
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

      {/* User account section */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center w-full gap-2 px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
            JS
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium">John Smith</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
