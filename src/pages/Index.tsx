
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KpiCardGrid from "@/components/dashboard/KpiCardGrid";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SalesPerformanceChart from "@/components/dashboard/SalesPerformanceChart";
import SalesByRegionChart from "@/components/dashboard/SalesByRegionChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import FilterPanel from "@/components/dashboard/FilterPanel";

const Index = () => {
  return (
    <DashboardLayout>
      {/* KPI Cards */}
      <section className="rs-section">
        <KpiCardGrid />
      </section>

      {/* Main Content - Two Column Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Charts Section - 3 columns on large screens */}
        <div className="lg:col-span-3 space-y-6">
          {/* Revenue Chart */}
          <section className="rs-section">
            <RevenueChart />
          </section>

          {/* Sales Charts Row */}
          <section className="rs-section grid grid-cols-1 md:grid-cols-2 gap-6">
            <SalesPerformanceChart />
            <SalesByRegionChart />
          </section>
        </div>

        {/* Right Sidebar - 1 column on large screens */}
        <div className="space-y-6">
          {/* Filter Panel */}
          <section className="rs-section">
            <FilterPanel />
          </section>

          {/* Alerts Panel */}
          <section className="rs-section">
            <AlertsPanel />
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
