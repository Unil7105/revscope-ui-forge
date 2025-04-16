
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

const SalesPerformanceChart: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Revenue by product category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              barGap={8}
            >
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
              <Bar 
                dataKey="revenue" 
                fill="#1E90FF" 
                radius={[4, 4, 0, 0]} 
                name="Revenue"
              />
              <Bar 
                dataKey="target" 
                fill="#5C6BC0" 
                radius={[4, 4, 0, 0]} 
                name="Target"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceChart;
