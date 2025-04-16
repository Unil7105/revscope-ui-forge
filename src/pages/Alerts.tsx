
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellPlus, BellRing } from "lucide-react";

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-rs-text to-rs-indigo/90 bg-clip-text text-transparent">Alerts Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your notifications and system alerts</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-rs-indigo" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              View and manage your recent system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <Bell className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No alerts at this time</h3>
              <p className="text-gray-500 max-w-md mt-2">
                Your system alerts and notifications will appear here when available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
