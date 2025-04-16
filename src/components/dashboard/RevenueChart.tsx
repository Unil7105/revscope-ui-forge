
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
  TrendingUp,
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

// Mini pill legend component
const MiniLegendPill = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity">
    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
    <span>{label}</span>
  </div>
);

const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState<ChartType>("area");
  const [isHovering, setIsHovering] = useState(false);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-slate-200/60 transition-all duration-200 animate-in fade-in-50 zoom-in-95">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <div className="mt-2 space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2.5">
                <div 
                  className="h-3 w-3 rounded-full" 
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

  // Custom Legend component
  const CustomLegend = ({ payload }: any) => {
    if (!payload) return null;
    
    return (
      <div className="flex items-center justify-center gap-6 pt-3">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 group">
            <div 
              className="h-3 w-3 rounded-full transition-transform group-hover:scale-125" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card 
      className={`w-full transition-all duration-300 hover:shadow-lg bg-white/95 backdrop-blur-sm border border-slate-200/60 ${isHovering ? 'shadow-md scale-[1.005]' : 'shadow-sm'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">
            Revenue Trend
          </CardTitle>
          <CardDescription className="text-gray-500">Daily revenue vs target</CardDescription>
          
          {/* Mini legend pills */}
          <div className="flex gap-2 mt-2 animate-in fade-in-50">
            <MiniLegendPill color="#6366F1" label="Revenue" />
            <MiniLegendPill color="#EF4444" label="Target" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-slate-200 p-1 bg-white/90 shadow-sm">
            <Button 
              size="sm" 
              variant={chartType === "area" ? "default" : "ghost"} 
              className={`h-8 rounded-sm px-2 transition-all duration-200 ${
                chartType === "area" 
                  ? "bg-indigo-500 text-white shadow-indigo-200 shadow-sm hover:bg-indigo-600" 
                  : "text-gray-500 hover:text-indigo-500 hover:bg-indigo-50"
              }`}
              onClick={() => setChartType("area")}
            >
              <TrendingUp size={16} className="transition-transform hover:scale-110" />
            </Button>
            <Button 
              size="sm" 
              variant={chartType === "line" ? "default" : "ghost"} 
              className={`h-8 rounded-sm px-2 transition-all duration-200 ${
                chartType === "line" 
                  ? "bg-indigo-500 text-white shadow-indigo-200 shadow-sm hover:bg-indigo-600" 
                  : "text-gray-500 hover:text-indigo-500 hover:bg-indigo-50"
              }`}
              onClick={() => setChartType("line")}
            >
              <LineChartIcon size={16} className="transition-transform hover:scale-110" />
            </Button>
            <Button 
              size="sm" 
              variant={chartType === "bar" ? "default" : "ghost"} 
              className={`h-8 rounded-sm px-2 transition-all duration-200 ${
                chartType === "bar" 
                  ? "bg-indigo-500 text-white shadow-indigo-200 shadow-sm hover:bg-indigo-600" 
                  : "text-gray-500 hover:text-indigo-500 hover:bg-indigo-50"
              }`}
              onClick={() => setChartType("bar")}
            >
              <BarChart2 size={16} className="transition-transform hover:scale-110" />
            </Button>
          </div>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="border-gray-200 shadow-md animate-in slide-in-from-top-1 zoom-in-95">
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
            {chartType === "area" ? (
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
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
                  content={<CustomLegend />}
                  iconType="circle"
                  iconSize={8}
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
                  animationDuration={1000}
                  animationEasing="ease-out"
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
                  animationDuration={1200}
                  animationEasing="ease-out"
                  animationBegin={300}
                />
              </AreaChart>
            ) : chartType === "line" ? (
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
                  content={<CustomLegend />}
                  iconType="circle"
                  iconSize={8}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  activeDot={{ r: 8, stroke: '#6366F1', strokeWidth: 2, fill: 'white' }}
                  strokeWidth={3}
                  name="Revenue"
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-out"
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
                  animationDuration={1200}
                  animationEasing="ease-out"
                  animationBegin={300}
                />
              </LineChart>
            ) : (
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
                  content={<CustomLegend />}
                  iconType="circle" 
                  iconSize={8}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#6366F1" 
                  radius={[6, 6, 0, 0]} 
                  name="Revenue"
                  className="hover:opacity-90 transition-opacity cursor-pointer"
                  fillOpacity={0.85}
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="target" 
                  fill="#EF4444" 
                  radius={[6, 6, 0, 0]} 
                  name="Target"
                  className="hover:opacity-90 transition-opacity cursor-pointer"
                  fillOpacity={0.85}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-out"
                  animationBegin={200}
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
