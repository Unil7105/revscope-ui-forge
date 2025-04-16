
import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShoppingCart,
  BarChart,
  CreditCard
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface KpiCardProps {
  title: string;
  value: string;
  trend: number;
  chartData: { value: number }[];
  type: "revenue" | "orders" | "conversion" | "aov";
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  trend, 
  chartData,
  type
}) => {
  const isTrendPositive = trend >= 0;
  
  const getIcon = () => {
    switch (type) {
      case "revenue":
        return <DollarSign className="text-rs-blue" size={20} />;
      case "orders":
        return <ShoppingCart className="text-rs-indigo" size={20} />;
      case "conversion":
        return <BarChart className="text-rs-green" size={20} />;
      case "aov":
        return <CreditCard className="text-rs-red" size={20} />;
      default:
        return <DollarSign className="text-rs-blue" size={20} />;
    }
  };
  
  const getChartColor = () => {
    switch (type) {
      case "revenue":
        return "#1E90FF";
      case "orders":
        return "#5C6BC0";
      case "conversion":
        return "#2ECC71";
      case "aov":
        return "#E74C3C";
      default:
        return "#1E90FF";
    }
  };

  return (
    <div className="rs-card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-500 text-sm">{title}</div>
        {getIcon()}
      </div>
      
      <div className="rs-stat-value">{value}</div>
      
      <div className="flex items-center gap-1 mt-1">
        {isTrendPositive ? (
          <ArrowUpRight className="text-rs-green" size={16} />
        ) : (
          <ArrowDownRight className="text-rs-red" size={16} />
        )}
        <span
          className={isTrendPositive ? "rs-trend-positive" : "rs-trend-negative"}
        >
          {Math.abs(trend)}%
        </span>
        <span className="text-sm text-gray-500">vs last period</span>
      </div>
      
      <div className="rs-mini-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.3} />
                <stop offset="95%" stopColor={getChartColor()} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={getChartColor()}
              fillOpacity={1}
              fill={`url(#gradient-${type})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KpiCard;
