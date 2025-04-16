import React, { useState } from "react";
import { Bell, Search, Calendar, ChevronDown, Filter, X, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
interface NotificationProps {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}
const notifications: NotificationProps[] = [{
  id: 1,
  title: "New order received",
  description: "Acme Corporation placed an order for $2,500",
  time: "5 minutes ago",
  read: false,
  type: "info"
}, {
  id: 2,
  title: "Sales target achieved",
  description: "Q2 sales target has been reached ahead of schedule",
  time: "2 hours ago",
  read: false,
  type: "success"
}, {
  id: 3,
  title: "Customer feedback alert",
  description: "Global Enterprises submitted negative feedback",
  time: "Yesterday",
  read: true,
  type: "warning"
}];
const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date().toLocaleDateString('en-US', options);
};
const NotificationItem: React.FC<{
  notification: NotificationProps;
}> = ({
  notification
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return <div className={cn("p-3 border-b last:border-0 flex gap-3 items-start transition-colors duration-200 hover:bg-gray-50", !notification.read && "bg-blue-50/80 hover:bg-blue-50", isHovering && "shadow-sm translate-x-[2px]")} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={cn("h-2 w-2 mt-1.5 rounded-full flex-shrink-0 transition-transform duration-200", isHovering && "scale-125", notification.type === "info" && "bg-blue-500", notification.type === "warning" && "bg-amber-500", notification.type === "success" && "bg-green-500")} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{notification.title}</div>
        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{notification.description}</p>
        <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
      </div>
    </div>;
};
const TopBar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter(n => !n.read).length;
  return <div className="bg-white border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between p-4">
        {/* Left: Page Title & Date */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2 hover:bg-gray-100 transition-colors active:scale-95">
                <Menu size={20} />
                <span className="sr-only">Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-auto border-r border-gray-200 shadow-xl">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div>
            <h1 className="text-xl font-semibold text-rs-text bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">
              Sales Dashboard
            </h1>
            <div className="text-sm text-gray-500">{getFormattedDate()}</div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200", searchOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
          <Card className="w-full max-w-2xl mx-4 border-gray-200 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-2">
              <div className="flex items-center border rounded-lg p-1 bg-gray-50/50 backdrop-blur-sm hover:bg-white/90 transition-colors duration-200 focus-within:ring-2 focus-within:ring-rs-blue/40 focus-within:border-rs-blue/50 shadow-inner">
                <Search className="h-5 w-5 text-gray-400 mx-2" />
                <input type="text" placeholder="Search orders, customers, reports..." className="flex-1 py-2 px-2 bg-transparent focus:outline-none text-gray-800" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full h-7 w-7 transition-all hover:scale-105 active:scale-95">
                  <X size={18} />
                </Button>
              </div>
              {searchQuery && <div className="mt-2 border-t pt-2 animate-in fade-in-50 slide-in-from-top-2">
                  <p className="text-sm text-gray-500 p-2 font-medium">Quick Results</p>
                  <ul className="space-y-1">
                    <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150 hover:translate-x-1">
                      <p className="font-medium">Order: #{searchQuery}123</p>
                      <p className="text-xs text-gray-500">Order details match your search</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150 hover:translate-x-1">
                      <p className="font-medium">Customer: Acme {searchQuery}</p>
                      <p className="text-xs text-gray-500">Customer details match your search</p>
                    </li>
                  </ul>
                </div>}
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
          <div className="absolute left-3 text-gray-400 z-10">
            <Search size={18} />
          </div>
          <input type="text" placeholder="Search orders, customers..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rs-blue focus:border-transparent bg-white/80 hover:bg-white/95 focus:bg-white backdrop-blur-sm transition-all duration-200 shadow-sm hover:scale-[1.01]" onClick={() => setSearchOpen(true)} readOnly />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <Button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 active:scale-95 transition-all duration-150 group hover:shadow-sm hover:border-gray-300" variant="outline">
            <Filter size={16} className="text-gray-500 group-hover:text-rs-blue transition-colors duration-200" />
            <span className="hidden sm:inline-block">Filters</span>
          </Button>
          
          {/* Date Range Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="hidden md:flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 active:scale-95 transition-all duration-150 group hover:shadow-sm hover:border-gray-300" variant="outline">
                <Calendar size={16} className="text-gray-500 group-hover:text-rs-blue transition-colors duration-200" />
                <span>Last 30 days</span>
                <ChevronDown size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 border-gray-200 shadow-md animate-in fade-in-50 zoom-in-95" align="end">
              <div className="grid gap-1">
                <Button variant="ghost" className="justify-start font-normal text-left group hover:bg-gray-50" size="sm">
                  <span className="group-hover:translate-x-0.5 transition-transform">Today</span>
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left group hover:bg-gray-50" size="sm">
                  <span className="group-hover:translate-x-0.5 transition-transform">Last 7 days</span>
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left bg-gray-100/70 group hover:bg-gray-100" size="sm">
                  <span className="group-hover:translate-x-0.5 transition-transform">Last 30 days</span>
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left group hover:bg-gray-50" size="sm">
                  <span className="group-hover:translate-x-0.5 transition-transform">This month</span>
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left group hover:bg-gray-50" size="sm">
                  <span className="group-hover:translate-x-0.5 transition-transform">Last quarter</span>
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left group hover:bg-gray-50" size="sm">
                  <span className="group-hover:translate-x-0.5 transition-transform">Custom range...</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full active:scale-95 transition-all duration-150 group hover:text-rs-indigo" variant="ghost" size="icon">
                <Bell size={20} className="group-hover:animate-bounce transition-all duration-300" />
                {unreadCount > 0 && <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-rs-red text-white text-xs animate-pulse">
                    {unreadCount}
                  </Badge>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-gray-200 shadow-lg animate-in fade-in-50 zoom-in-95" align="end">
              <div className="border-b px-4 py-3 font-medium flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="text-xs h-auto hover:text-rs-blue transition-colors hover:bg-blue-50/50">
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {notifications.map(notification => <NotificationItem key={notification.id} notification={notification} />)}
              </div>
              <div className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full text-center text-sm hover:text-rs-blue transition-colors hover:bg-blue-50/50">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu - Small Device Only */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-150">
              <Avatar className="h-8 w-8 ring-2 ring-white hover:ring-rs-blue/30 transition-all">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-rs-blue/20 to-rs-indigo/20 text-gray-700">JS</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default TopBar;