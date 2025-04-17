
import React, { useState } from "react";
import { FileText, Download, Filter, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState("financial");
  
  // Sample report data
  const financialReports = [
    { id: 1, name: "Q1 Revenue Analysis", date: "2025-01-15", type: "Financial", status: "Final" },
    { id: 2, name: "Q2 Profit & Loss", date: "2025-04-15", type: "Financial", status: "Draft" },
    { id: 3, name: "Annual Budget Review", date: "2025-03-01", type: "Financial", status: "Final" },
    { id: 4, name: "Cash Flow Forecast", date: "2025-04-10", type: "Financial", status: "In Review" },
    { id: 5, name: "Tax Summary Report", date: "2025-04-05", type: "Financial", status: "Final" },
  ];
  
  const salesReports = [
    { id: 1, name: "Q1 Sales Performance", date: "2025-01-20", type: "Sales", status: "Final" },
    { id: 2, name: "Regional Sales Analysis", date: "2025-03-15", type: "Sales", status: "Final" },
    { id: 3, name: "Product Sales Comparison", date: "2025-04-05", type: "Sales", status: "In Review" },
    { id: 4, name: "Sales Team Performance", date: "2025-04-12", type: "Sales", status: "Draft" },
    { id: 5, name: "Market Penetration Analysis", date: "2025-03-28", type: "Sales", status: "Final" },
  ];
  
  const operationalReports = [
    { id: 1, name: "Inventory Status Report", date: "2025-04-01", type: "Operational", status: "Final" },
    { id: 2, name: "Supply Chain Analysis", date: "2025-03-25", type: "Operational", status: "Final" },
    { id: 3, name: "Warehouse Efficiency", date: "2025-04-08", type: "Operational", status: "Draft" },
    { id: 4, name: "Logistics Performance", date: "2025-04-10", type: "Operational", status: "In Review" },
    { id: 5, name: "Production Line Metrics", date: "2025-03-20", type: "Operational", status: "Final" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Final":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "In Review":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600">Access and manage all your business reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={16} />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw size={16} />
            Refresh
          </Button>
          <Button size="sm" className="gap-1">
            <FileText size={16} />
            New Report
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Report Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="financial" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
            </TabsList>
            <TabsContent value="financial" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{formatDate(report.date)}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="sales" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{formatDate(report.date)}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="operational" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operationalReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{formatDate(report.date)}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Report Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Total Reports</span>
                <span className="font-semibold">15</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Final Reports</span>
                <span className="font-semibold">9</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Draft Reports</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">In Review</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 py-2 border-b">
                <span className="text-sm font-medium">Q2 Profit & Loss updated</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex flex-col gap-1 py-2 border-b">
                <span className="text-sm font-medium">Sales Team Performance created</span>
                <span className="text-xs text-gray-500">Yesterday</span>
              </div>
              <div className="flex flex-col gap-1 py-2 border-b">
                <span className="text-sm font-medium">Logistics Performance submitted for review</span>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="flex flex-col gap-1 py-2">
                <span className="text-sm font-medium">Tax Summary Report finalized</span>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 py-2 border-b">
                <span className="text-sm font-medium">Monthly Sales Performance</span>
                <span className="text-xs text-gray-500">Next run: April 30, 2025</span>
              </div>
              <div className="flex flex-col gap-1 py-2 border-b">
                <span className="text-sm font-medium">Weekly Inventory Status</span>
                <span className="text-xs text-gray-500">Next run: April 22, 2025</span>
              </div>
              <div className="flex flex-col gap-1 py-2 border-b">
                <span className="text-sm font-medium">Quarterly Financial Summary</span>
                <span className="text-xs text-gray-500">Next run: June 30, 2025</span>
              </div>
              <div className="flex flex-col gap-1 py-2">
                <span className="text-sm font-medium">Daily Sales Recap</span>
                <span className="text-xs text-gray-500">Next run: Tomorrow</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
