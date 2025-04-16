
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Info,
  BarChart,
  ChevronRight
} from "lucide-react";

interface AlertItemProps {
  title: string;
  description: string;
  timestamp: string;
  type: "warning" | "info" | "success" | "error";
}

const AlertItem: React.FC<AlertItemProps> = ({ 
  title, 
  description, 
  timestamp, 
  type 
}) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="text-amber-500" size={18} />;
      case "info":
        return <Info className="text-rs-blue" size={18} />;
      case "success":
        return <TrendingUp className="text-rs-green" size={18} />;
      case "error":
        return <TrendingDown className="text-rs-red" size={18} />;
      default:
        return <Info className="text-rs-blue" size={18} />;
    }
  };

  const getBadge = () => {
    switch (type) {
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "info":
        return <Badge className="bg-rs-blue">Insight</Badge>;
      case "success":
        return <Badge className="bg-rs-green">Positive</Badge>;
      case "error":
        return <Badge className="bg-rs-red">Alert</Badge>;
      default:
        return <Badge className="bg-rs-blue">Info</Badge>;
    }
  };

  return (
    <div className="flex gap-3 p-3 border-b border-border hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="font-medium">{title}</div>
          {getBadge()}
        </div>
        <p className="text-sm text-gray-600 mb-1">{description}</p>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

const AlertsPanel: React.FC = () => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Card 
      className={`w-full transition-all duration-300 hover:shadow-lg border border-slate-200/60 ${isHovering ? 'shadow-md translate-y-[-2px]' : 'shadow-sm'}`} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-slate-100 transition-colors">
              <BarChart size={14} className="text-gray-700" />
            </div>
            <span className="bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">
              Alerts & Insights
            </span>
          </CardTitle>
          <CardDescription>Key notifications requiring attention</CardDescription>
        </div>
        <Badge className="bg-rs-red">3 New</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto">
          <AlertItem
            title="Sales Drop Detected"
            description="Software category sales have dropped 15% below target in the EMEA region."
            timestamp="15 minutes ago"
            type="error"
          />
          <AlertItem
            title="New High-Value Lead"
            description="Acme Corp ($2.5M potential) has requested a demo."
            timestamp="1 hour ago"
            type="success"
          />
          <AlertItem
            title="Conversion Rate Improving"
            description="Website conversion rate up 2.3% this week."
            timestamp="3 hours ago"
            type="success"
          />
          <AlertItem
            title="Inventory Warning"
            description="Premium hardware SKU-2974 is running low (5 units remaining)."
            timestamp="Yesterday"
            type="warning"
          />
          <AlertItem
            title="Customer Satisfaction"
            description="NPS score has improved to 72 (up from 68 last quarter)."
            timestamp="2 days ago"
            type="info"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
