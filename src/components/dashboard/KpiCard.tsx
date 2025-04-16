
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
        return <DollarSign className="text-rs-blue" size={18} />;
      case "orders":
        return <ShoppingCart className="text-rs-indigo" size={18} />;
      case "conversion":
        return <BarChart className="text-rs-green" size={18} />;
      case "aov":
        return <CreditCard className="text-rs-red" size={18} />;
      default:
        return <DollarSign className="text-rs-blue" size={18} />;
    }
  };
  
  const getChartColor = () => {
    switch (type) {
      case "revenue":
        return "#6366F1"; // Indigo
      case "orders":
        return "#5C6BC0"; // Original Indigo
      case "conversion":
        return "#10B981"; // Emerald
      case "aov":
        return "#EF4444"; // Red
      default:
        return "#6366F1";
    }
  };

  const getBgGradient = () => {
    switch (type) {
      case "revenue":
        return "from-white to-indigo-50/50";
      case "orders":
        return "from-white to-blue-50/50";
      case "conversion":
        return "from-white to-emerald-50/50";
      case "aov":
        return "from-white to-red-50/50";
      default:
        return "from-white to-indigo-50/50";
    }
  };

  const getIconBg = () => {
    switch (type) {
      case "revenue":
        return "bg-indigo-100";
      case "orders":
        return "bg-blue-100";
      case "conversion":
        return "bg-emerald-100";
      case "aov":
        return "bg-red-100";
      default:
        return "bg-indigo-100";
    }
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] p-4 bg-gradient-to-br ${getBgGradient()}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-500 text-sm font-medium">{title}</div>
        <div className={`p-2 rounded-full shadow-sm ${getIconBg()}`}>
          {getIcon()}
        </div>
      </div>
      
      <div className="text-2xl font-semibold font-roboto-mono">{value}</div>
      
      <div className="flex items-center gap-1 mt-1">
        {isTrendPositive ? (
          <ArrowUpRight className="text-emerald-500" size={16} />
        ) : (
          <ArrowDownRight className="text-red-500" size={16} />
        )}
        <span
          className={isTrendPositive ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}
        >
          {Math.abs(trend)}%
        </span>
        <span className="text-sm text-gray-500">vs last period</span>
      </div>
      
      <div className="h-10 w-full mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.4} />
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
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KpiCard;
