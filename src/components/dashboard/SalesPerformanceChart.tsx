
import React from "react";
import { 
  Bar, 
  BarChart, 
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

// Sample data for the sales performance chart
const data = [
  { name: "Software", revenue: 25000, target: 22000 },
  { name: "Services", revenue: 18000, target: 20000 },
  { name: "Hardware", revenue: 12000, target: 15000 },
  { name: "Consulting", revenue: 20000, target: 18000 },
  { name: "Support", revenue: 15000, target: 14000 },
];

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

const SalesPerformanceChart: React.FC = () => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] bg-white/90 backdrop-blur-sm border border-slate-200/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">
          Sales Performance
        </CardTitle>
        <CardDescription className="text-gray-500">Revenue by product category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
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
                fill="#10B981" 
                radius={[6, 6, 0, 0]} 
                name="Target"
                className="hover:opacity-80 transition-opacity cursor-pointer"
                fillOpacity={0.85}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceChart;
