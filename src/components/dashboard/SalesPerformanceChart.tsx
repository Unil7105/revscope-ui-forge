
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
    <Card className="w-full hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
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
              animationDuration={800}
              animationBegin={100}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `$${value / 1000}k`} 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                labelStyle={{ color: "#2C3E50", fontWeight: "600" }}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #eee", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(4px)"
                }}
                animationDuration={300}
              />
              <Legend />
              <Bar 
                dataKey="revenue" 
                fill="#1E90FF" 
                radius={[4, 4, 0, 0]} 
                name="Revenue"
                className="hover:opacity-90 transition-opacity"
                fillOpacity={0.9}
              />
              <Bar 
                dataKey="target" 
                fill="#5C6BC0" 
                radius={[4, 4, 0, 0]} 
                name="Target"
                className="hover:opacity-90 transition-opacity"
                fillOpacity={0.9}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceChart;
