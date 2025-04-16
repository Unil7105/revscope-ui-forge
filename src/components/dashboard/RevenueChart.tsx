
import React, { useState } from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  LineChart as LineChartIcon, 
  TrendingUp
} from "lucide-react";

// Sample data for the revenue chart
const data = [
  { name: "Apr 10", revenue: 12000, target: 10000 },
  { name: "Apr 11", revenue: 15000, target: 10000 },
  { name: "Apr 12", revenue: 13000, target: 10000 },
  { name: "Apr 13", revenue: 18000, target: 12000 },
  { name: "Apr 14", revenue: 20000, target: 12000 },
  { name: "Apr 15", revenue: 19000, target: 12000 },
  { name: "Apr 16", revenue: 25000, target: 15000 },
];

type ChartType = "area" | "bar" | "line";

const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState<ChartType>("area");

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

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200/60">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">Revenue Trend</CardTitle>
          <CardDescription className="text-gray-500">Daily revenue vs target</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-slate-200 p-1 bg-white">
            <Button 
              size="sm" 
              variant={chartType === "area" ? "default" : "ghost"} 
              className={`h-8 rounded-sm px-2 ${chartType === "area" ? "bg-indigo-500 text-white" : "text-gray-500"}`}
              onClick={() => setChartType("area")}
            >
              <TrendingUp size={16} />
            </Button>
            <Button 
              size="sm" 
              variant={chartType === "line" ? "default" : "ghost"} 
              className={`h-8 rounded-sm px-2 ${chartType === "line" ? "bg-indigo-500 text-white" : "text-gray-500"}`}
              onClick={() => setChartType("line")}
            >
              <LineChartIcon size={16} />
            </Button>
            <Button 
              size="sm" 
              variant={chartType === "bar" ? "default" : "ghost"} 
              className={`h-8 rounded-sm px-2 ${chartType === "bar" ? "bg-indigo-500 text-white" : "text-gray-500"}`}
              onClick={() => setChartType("bar")}
            >
              <BarChart2 size={16} />
            </Button>
          </div>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 border-gray-200 bg-white shadow-sm">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" && (
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value / 1000}k`} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '15px' }}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs font-medium text-gray-700">{value}</span>}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  fill="url(#colorRevenue)"
                  activeDot={{ r: 8, stroke: '#6366F1', strokeWidth: 2, fill: 'white' }}
                  strokeWidth={3}
                  name="Revenue"
                  isAnimationActive={true}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#EF4444"
                  fill="url(#colorTarget)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2, fill: 'white' }}
                  name="Target"
                  isAnimationActive={true}
                />
              </AreaChart>
            )}

            {chartType === "line" && (
              <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value / 1000}k`} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '15px' }}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs font-medium text-gray-700">{value}</span>}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  activeDot={{ r: 8, stroke: '#6366F1', strokeWidth: 2, fill: 'white' }}
                  strokeWidth={3}
                  name="Revenue"
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2, fill: 'white' }}
                  name="Target"
                  isAnimationActive={true}
                />
              </LineChart>
            )}

            {chartType === "bar" && (
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value / 1000}k`} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '15px' }}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs font-medium text-gray-700">{value}</span>}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#6366F1" 
                  radius={[6, 6, 0, 0]} 
                  name="Revenue"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  fillOpacity={0.85}
                  isAnimationActive={true}
                />
                <Bar 
                  dataKey="target" 
                  fill="#EF4444" 
                  radius={[6, 6, 0, 0]} 
                  name="Target"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  fillOpacity={0.85}
                  isAnimationActive={true}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
