
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: 'Jan', revenue: 5400, target: 4000, lastYear: 3200 },
  { month: 'Feb', revenue: 6100, target: 4200, lastYear: 3800 },
  { month: 'Mar', revenue: 5900, target: 4500, lastYear: 4100 },
  { month: 'Apr', revenue: 7200, target: 5000, lastYear: 4500 },
  { month: 'May', revenue: 8100, target: 5200, lastYear: 5000 },
  { month: 'Jun', revenue: 9500, target: 5500, lastYear: 5200 },
  { month: 'Jul', revenue: 8900, target: 6000, lastYear: 5800 },
  { month: 'Aug', revenue: 9800, target: 6200, lastYear: 6100 },
  { month: 'Sep', revenue: 10500, target: 6500, lastYear: 6300 },
  { month: 'Oct', revenue: 11200, target: 7000, lastYear: 6800 },
  { month: 'Nov', revenue: 10800, target: 7200, lastYear: 7500 },
  { month: 'Dec', revenue: 12500, target: 8000, lastYear: 8200 },
];

const regionData = [
  { name: 'North America', value: 42 },
  { name: 'Europe', value: 28 },
  { name: 'Asia Pacific', value: 18 },
  { name: 'Latin America', value: 8 },
  { name: 'Middle East', value: 4 },
];

const channelData = [
  { name: 'Direct Sales', value: 35 },
  { name: 'Partners', value: 25 },
  { name: 'E-commerce', value: 20 },
  { name: 'Referrals', value: 15 },
  { name: 'Other', value: 5 },
];

const chartConfig = {
  revenue: { 
    label: "Revenue", 
    color: "#1E90FF" 
  },
  target: { 
    label: "Target", 
    color: "#5C6BC0" 
  },
  lastYear: { 
    label: "Last Year", 
    color: "#2C3E50" 
  },
};

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
          <div className="flex items-center gap-4">
            <Select defaultValue="thisYear">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
                <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                <SelectItem value="last6Months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>
                  Compare actual revenue against targets and last year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `$${value / 1000}k`}
                        width={80}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend content={<ChartLegend />} />
                      <Bar dataKey="revenue" fill="#1E90FF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="#5C6BC0" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="lastYear" fill="#2C3E50" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regions" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Region</CardTitle>
                <CardDescription>
                  Regional breakdown of sales performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">
                  Region analysis charts and data tables would be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="channels" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>
                  Sales performance by distribution channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">
                  Channel performance charts and data tables would be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Long-term performance trends and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-gray-500">
                  Trend analysis charts and data tables would be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
