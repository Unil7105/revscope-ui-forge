
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Sample data for the pie chart
const data = [
  { name: "North America", value: 42, color: "#1E90FF" },
  { name: "Europe", value: 28, color: "#5C6BC0" },
  { name: "Asia Pacific", value: 18, color: "#2ECC71" },
  { name: "Latin America", value: 8, color: "#E74C3C" },
  { name: "Africa", value: 4, color: "#F1C40F" },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent 
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SalesByRegionChart: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales by Region</CardTitle>
        <CardDescription>Revenue distribution by geographic region</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, undefined]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #eee", 
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                // Remove the itemStyle prop which is causing the error
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesByRegionChart;
