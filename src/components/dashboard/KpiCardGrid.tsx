
import React from "react";
import KpiCard from "./KpiCard";

// Sample data for the KPI cards
const revenueData = [
  { value: 1000 },
  { value: 1200 },
  { value: 900 },
  { value: 1500 },
  { value: 1800 },
  { value: 2000 },
  { value: 1800 },
  { value: 2200 },
];

const ordersData = [
  { value: 80 },
  { value: 90 },
  { value: 85 },
  { value: 95 },
  { value: 100 },
  { value: 110 },
  { value: 120 },
  { value: 130 },
];

const conversionData = [
  { value: 15 },
  { value: 14 },
  { value: 16 },
  { value: 17 },
  { value: 15 },
  { value: 18 },
  { value: 19 },
  { value: 20 },
];

const aovData = [
  { value: 120 },
  { value: 125 },
  { value: 130 },
  { value: 140 },
  { value: 135 },
  { value: 145 },
  { value: 150 },
  { value: 155 },
];

const KpiCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="Total Revenue"
        value="$42,890"
        trend={12.5}
        chartData={revenueData}
        type="revenue"
      />
      <KpiCard
        title="Orders"
        value="923"
        trend={3.2}
        chartData={ordersData}
        type="orders"
      />
      <KpiCard
        title="Conversion Rate"
        value="19.5%"
        trend={1.8}
        chartData={conversionData}
        type="conversion"
      />
      <KpiCard
        title="Avg Order Value"
        value="$146.35"
        trend={-2.4}
        chartData={aovData}
        type="aov"
      />
    </div>
  );
};

export default KpiCardGrid;
