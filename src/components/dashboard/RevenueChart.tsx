
import React, { useState } from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Daily revenue vs target</CardDescription>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="quarter">Last quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1E90FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#E74C3C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `$${value / 1000}k`} 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                labelStyle={{ color: "#2C3E50" }}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #eee", 
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1E90FF"
                fill="url(#colorRevenue)"
                activeDot={{ r: 6 }}
                strokeWidth={2}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#E74C3C"
                fill="url(#colorTarget)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
