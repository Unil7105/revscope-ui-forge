import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus, MoreHorizontal, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                className="pl-9 w-full"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 space-y-0">
                <CardTitle>Order List</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Amount</SelectItem>
                      <SelectItem value="lowest">Lowest Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Order ID</th>
                        <th className="py-3 px-4 text-left font-medium">Customer</th>
                        <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Date</th>
                        <th className="py-3 px-4 text-right font-medium">Amount</th>
                        <th className="py-3 px-4 text-center font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium w-[80px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4 hidden md:table-cell">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-right font-mono">${order.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge 
                              variant={
                                order.status === "Completed" ? "default" : 
                                order.status === "Processing" ? "secondary" : 
                                order.status === "Pending" ? "warning" : 
                                "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 124 orders
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
