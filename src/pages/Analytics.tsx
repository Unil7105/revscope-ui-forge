
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SalesPerformanceChart from "@/components/dashboard/SalesPerformanceChart";
import SalesByRegionChart from "@/components/dashboard/SalesByRegionChart";
import KpiCardGrid from "@/components/dashboard/KpiCardGrid";
import { ArrowUpRight, TrendingUp, Activity, Calendar } from "lucide-react";

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

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200/60">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <div className="mt-2 space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="h-2 w-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
              <span className="text-sm font-medium">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState("thisYear");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Track your business performance and metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-white px-3 py-1.5 text-xs flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-500" />
              Last updated: April 16, 2025
            </Badge>
            <Select 
              defaultValue="thisYear"
              onValueChange={(value) => {
                setIsLoading(true);
                setPeriod(value);
                setTimeout(() => setIsLoading(false), 800);
              }}
            >
              <SelectTrigger className="w-[180px] bg-white border-slate-200">
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

        <KpiCardGrid />

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="performance" className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="regions" className="flex items-center gap-1.5">
              <Activity className="h-4 w-4" />
              Regions
            </TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="pt-4 space-y-6">
            {isLoading ? (
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[400px] w-full" />
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <RevenueChart />
                  <SalesPerformanceChart />
                </div>
                <Card className="bg-white/90 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>Revenue Performance</span>
                      <Badge variant="outline" className="ml-2 bg-indigo-50 text-indigo-600 border-indigo-100">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+15.3%</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Compare actual revenue against targets and last year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis 
                              tickFormatter={(value) => `$${value / 1000}k`}
                              width={80}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend content={<ChartLegend />} />
                            <Bar dataKey="revenue" fill="#1E90FF" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="target" fill="#5C6BC0" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="lastYear" fill="#2C3E50" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="regions" className="pt-4">
            {isLoading ? (
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <SalesByRegionChart />
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Regional Growth</CardTitle>
                    <CardDescription>Year-over-year growth by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionData.map((region) => (
                        <div key={region.name} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-indigo-500" />
                            <span>{region.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{region.value}%</span>
                            <Badge variant={region.value > 20 ? "default" : "destructive"} className="text-xs">
                              {region.value > 20 ? "↑" : "↓"} {Math.round(region.value * 0.1)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="channels" className="pt-4">
            {isLoading ? (
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Channel Performance</CardTitle>
                    <CardDescription>Sales performance by distribution channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {channelData.map((channel) => (
                        <div key={channel.name} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-emerald-500" />
                            <span>{channel.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{channel.value}%</span>
                            <Badge variant={channel.name === "E-commerce" || channel.name === "Referrals" ? "default" : "secondary"} className="text-xs">
                              {channel.name === "E-commerce" || channel.name === "Referrals" ? "↑" : "−"} {Math.round(channel.value * 0.1)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Channel Insights</CardTitle>
                    <CardDescription>Key metrics by sales channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-60">
                      <div className="text-center">
                        <Activity className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Channel insights and metrics visualization coming soon
                        </p>
                        <Badge variant="outline" className="mt-4 bg-indigo-50 text-indigo-600 border-indigo-100">
                          In Development
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trends" className="pt-4">
            <Card className="bg-gradient-to-br from-white to-blue-50/30 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Long-term performance trends and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Trend analysis charts and data tables would be displayed here
                    </p>
                    <Badge variant="outline" className="mt-4 bg-blue-50 text-blue-600 border-blue-100">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
