
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    spent: 12500,
    status: "Active",
    lastPurchase: "2025-04-02",
    avatar: ""
  },
  {
    id: 2,
    name: "TechNova Solutions",
    contact: "Sarah Johnson",
    email: "sarah@technova.com",
    spent: 8750,
    status: "Active",
    lastPurchase: "2025-04-10",
    avatar: ""
  },
  {
    id: 3,
    name: "Global Enterprises",
    contact: "David Wilson",
    email: "david@globalent.com",
    spent: 21300,
    status: "At Risk",
    lastPurchase: "2025-03-01",
    avatar: ""
  },
  {
    id: 4,
    name: "Infinite Innovations",
    contact: "Michael Brown",
    email: "michael@infiniteinnovations.com",
    spent: 5200,
    status: "Inactive",
    lastPurchase: "2025-02-15",
    avatar: ""
  },
  {
    id: 5,
    name: "Summit Industries",
    contact: "Emily Davis",
    email: "emily@summit.com",
    spent: 9800,
    status: "Active",
    lastPurchase: "2025-04-08",
    avatar: ""
  }
];

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
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
              Add Customer
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none">
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="at-risk">At Risk</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            <Card>
              <CardHeader className="px-6 py-5">
                <div className="flex justify-between">
                  <CardTitle>Customer List</CardTitle>
                  <CardDescription>
                    Showing {customers.length} out of {customers.length} customers
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Customer</th>
                        <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">Contact</th>
                        <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Last Purchase</th>
                        <th className="py-3 px-4 text-right font-medium">Total Spent</th>
                        <th className="py-3 px-4 text-center font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium w-[80px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={customer.avatar} alt={customer.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {customer.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-xs text-muted-foreground hidden md:block">{customer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">{customer.contact}</td>
                          <td className="py-3 px-4 hidden lg:table-cell">{new Date(customer.lastPurchase).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-right font-mono">${customer.spent.toLocaleString()}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge 
                              variant={
                                customer.status === "Active" ? "default" : 
                                customer.status === "At Risk" ? "destructive" : 
                                "outline"
                              }
                            >
                              {customer.status}
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
                    Showing page 1 of 1
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Customers</CardTitle>
                <CardDescription>
                  All currently active customer accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  Active customers would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="at-risk" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>At Risk Customers</CardTitle>
                <CardDescription>
                  Customers who may need engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  At-risk customers would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Customers</CardTitle>
                <CardDescription>
                  Customers who haven't made purchases recently
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-center py-12 text-gray-500">
                  Inactive customers would be displayed here with filtering applied
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
