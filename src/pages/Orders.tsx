import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus, MoreHorizontal, Eye, CheckSquare, ArrowUpDown, ChevronDown, ChevronUp, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

const orders = [
  {
    id: "ORD-2025-1001",
    customer: "Acme Corporation",
    date: "2025-04-10",
    amount: 2345.50,
    status: "Completed",
    items: 12,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2025-1002",
    customer: "TechNova Solutions",
    date: "2025-04-09",
    amount: 1287.75,
    status: "Processing",
    items: 5,
    paymentMethod: "Bank Transfer"
  },
  {
    id: "ORD-2025-1003",
    customer: "Global Enterprises",
    date: "2025-04-08",
    amount: 4532.00,
    status: "Completed",
    items: 24,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2025-1004",
    customer: "Infinite Innovations",
    date: "2025-04-07",
    amount: 876.25,
    status: "Pending",
    items: 3,
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-2025-1005",
    customer: "Summit Industries",
    date: "2025-04-05",
    amount: 3219.80,
    status: "Cancelled",
    items: 16,
    paymentMethod: "Credit Card"
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  const handleRowClick = (orderId: string) => {
    console.log(`Navigating to order details for ${orderId}`);
    // navigate(`/orders/${orderId}`);
  };

  const handleSelectRow = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    setSelectedRows(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === orders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map(order => order.id));
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 mr-1" />;
      case "Processing":
        return <Clock className="h-3.5 w-3.5 text-slate-600 mr-1" />;
      case "Pending":
        return <AlertCircle className="h-3.5 w-3.5 text-yellow-600 mr-1" />;
      case "Cancelled":
        return <XCircle className="h-3.5 w-3.5 text-red-600 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Processing":
        return "processing";
      case "Pending":
        return "pending";
      case "Cancelled":
        return "cancelled";
      default:
        return "default";
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => {
      if (prev === "newest") return "oldest";
      if (prev === "oldest") return "highest";
      if (prev === "highest") return "lowest";
      return "newest";
    });
  };

  const getSortIcon = () => {
    if (sortOrder === "newest" || sortOrder === "highest") {
      return <ChevronDown className="h-4 w-4 ml-1" />;
    }
    return <ChevronUp className="h-4 w-4 ml-1" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="h-9">
                <Plus className="h-4 w-4 mr-2" />
                {!isMobile && "New Order"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-roboto-mono">124</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-roboto-mono">8</div>
              <p className="text-xs text-muted-foreground">-2 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-roboto-mono">$1,842</div>
              <p className="text-xs text-muted-foreground">+$120 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Fulfillment Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-roboto-mono">96.8%</div>
              <p className="text-xs text-muted-foreground">+0.6% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="overflow-x-auto -mx-2 px-2">
            <TabsList className="w-full sm:w-auto inline-flex flex-nowrap">
              <TabsTrigger value="all" className="flex-shrink-0">All Orders</TabsTrigger>
              <TabsTrigger value="recent" className="flex-shrink-0">Recent</TabsTrigger>
              <TabsTrigger value="pending" className="flex-shrink-0">Pending</TabsTrigger>
              <TabsTrigger value="completed" className="flex-shrink-0">Completed</TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-shrink-0">Cancelled</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="pt-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-5 space-y-3 sm:space-y-0">
                <CardTitle>Order List</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedRows.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="mr-2 h-8">
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Bulk
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Processing</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel Orders</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleSortOrder}
                    className="flex items-center h-8"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {isMobile ? getSortIcon() : (
                      <>
                        Sort: {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
                        {getSortIcon()}
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-2">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]">
                            <Checkbox 
                              checked={selectedRows.length === orders.length && orders.length > 0}
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all"
                            />
                          </TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right w-[60px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow 
                            key={order.id} 
                            onClick={() => handleRowClick(order.id)}
                          >
                            <TableCell className="py-2">
                              <Checkbox 
                                checked={selectedRows.includes(order.id)}
                                onCheckedChange={() => {
                                  setSelectedRows(prev => 
                                    prev.includes(order.id) 
                                      ? prev.filter(id => id !== order.id) 
                                      : [...prev, order.id]
                                  );
                                }}
                                aria-label={`Select order ${order.id}`}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </TableCell>
                            <TableCell className="py-2 font-medium">
                              <Badge variant="id" className="font-mono text-xs">{order.id}</Badge>
                            </TableCell>
                            <TableCell className="py-2 max-w-[120px] sm:max-w-none truncate">{order.customer}</TableCell>
                            <TableCell className="py-2 hidden md:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell className="py-2 text-right font-mono">${order.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            <TableCell className="py-2 text-center">
                              <Badge 
                                variant={getStatusVariant(order.status)}
                                className="inline-flex items-center whitespace-nowrap"
                              >
                                {getStatusIcon(order.status)}
                                <span className="hidden xs:inline">{order.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(order.id);
                                  }}>
                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    Edit Order
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Cancel Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredOrders.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No orders found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 sm:px-6 py-4 border-t flex-col sm:flex-row">
                <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-3">
                  <div className="text-sm text-muted-foreground">
                    {selectedRows.length > 0 
                      ? `${selectedRows.length} selected of ${orders.length} orders` 
                      : `Showing ${filteredOrders.length} of ${orders.length} orders`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="recent" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Orders placed in the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  Recent orders would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>
                  Orders that need processing
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  Pending orders would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Orders</CardTitle>
                <CardDescription>
                  Successfully fulfilled orders
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  Completed orders would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cancelled" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Orders</CardTitle>
                <CardDescription>
                  Orders that were cancelled
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  Cancelled orders would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
