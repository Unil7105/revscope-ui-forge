
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

const notifications: NotificationProps[] = [
  {
    id: 1,
    title: "New order received",
    description: "Acme Corporation placed an order for $2,500",
    time: "5 minutes ago",
    read: false,
    type: "info"
  },
  {
    id: 2,
    title: "Sales target achieved",
    description: "Q2 sales target has been reached ahead of schedule",
    time: "2 hours ago",
    read: false,
    type: "success"
  },
  {
    id: 3,
    title: "Customer feedback alert",
    description: "Global Enterprises submitted negative feedback",
    time: "Yesterday",
    read: true,
    type: "warning"
  }
];

const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const NotificationItem: React.FC<{ notification: NotificationProps }> = ({ notification }) => {
  return (
    <div className={cn(
      "p-3 border-b last:border-0 flex gap-3 items-start",
      !notification.read && "bg-blue-50"
    )}>
      <div className={cn(
        "h-2 w-2 mt-1.5 rounded-full flex-shrink-0",
        notification.type === "info" && "bg-blue-500",
        notification.type === "warning" && "bg-amber-500",
        notification.type === "success" && "bg-green-500"
      )} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{notification.title}</div>
        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{notification.description}</p>
        <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
      </div>
    </div>
  );
};

const TopBar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        {/* Left: Page Title & Date */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu size={20} />
                <span className="sr-only">Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div>
            <h1 className="text-xl font-semibold text-rs-text">Sales Dashboard</h1>
            <div className="text-sm text-gray-500">{getFormattedDate()}</div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className={cn(
          "fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity",
          searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-2">
              <div className="flex items-center border rounded-lg p-1 bg-gray-50">
                <Search className="h-5 w-5 text-gray-400 mx-2" />
                <input
                  type="text"
                  placeholder="Search orders, customers, reports..."
                  className="flex-1 py-2 px-2 bg-transparent focus:outline-none text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </Button>
              </div>
              {searchQuery && (
                <div className="mt-2 border-t pt-2">
                  <p className="text-sm text-gray-500 p-2">Quick Results</p>
                  <ul className="space-y-1">
                    <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <p className="font-medium">Order: #{searchQuery}123</p>
                      <p className="text-xs text-gray-500">Order details match your search</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <p className="font-medium">Customer: Acme {searchQuery}</p>
                      <p className="text-xs text-gray-500">Customer details match your search</p>
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rs-blue focus:border-transparent"
            onClick={() => setSearchOpen(true)}
            readOnly
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <Button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50" variant="outline">
            <Filter size={16} />
            <span className="hidden sm:inline-block">Filters</span>
          </Button>
          
          {/* Date Range Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="hidden md:flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50" variant="outline">
                <Calendar size={16} />
                <span>Last 30 days</span>
                <ChevronDown size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="grid gap-1">
                <Button variant="ghost" className="justify-start font-normal text-left" size="sm">
                  Today
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left" size="sm">
                  Last 7 days
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left bg-gray-100" size="sm">
                  Last 30 days
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left" size="sm">
                  This month
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left" size="sm">
                  Last quarter
                </Button>
                <Button variant="ghost" className="justify-start font-normal text-left" size="sm">
                  Custom range...
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full" variant="ghost" size="icon">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-rs-red text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b px-4 py-3 font-medium flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="text-xs h-auto">Mark all as read</Button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
              <div className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full text-center text-sm">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu - Small Device Only */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
