
import React from "react";
import { cn } from "@/lib/utils";

interface LegendPillProps {
  color: string;
  label: string;
  className?: string;
}

const LegendPill: React.FC<LegendPillProps> = ({ color, label, className }) => {
  return (
    <div className={cn("legend-pill group", className)}>
      <div 
        className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125" 
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
};

export default LegendPill;
