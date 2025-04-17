
import React, { useState } from "react";
import { Target, Plus, ChevronDown, Users, Clock, DollarSign, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Stage = {
  id: number;
  name: string;
  count: number;
  value: number;
  color: string;
};

type Deal = {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: string;
  owner: string;
  lastUpdated: string;
  progress: number;
};

const Pipelines: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  // Sample pipeline stages
  const stages: Stage[] = [
    { id: 1, name: "Lead Qualification", count: 24, value: 85000, color: "bg-blue-500" },
    { id: 2, name: "Initial Contact", count: 18, value: 142000, color: "bg-indigo-500" },
    { id: 3, name: "Meeting Scheduled", count: 12, value: 195000, color: "bg-purple-500" },
    { id: 4, name: "Proposal Sent", count: 8, value: 320000, color: "bg-pink-500" },
    { id: 5, name: "Negotiation", count: 5, value: 275000, color: "bg-orange-500" },
    { id: 6, name: "Closed Won", count: 3, value: 180000, color: "bg-green-500" },
  ];

  // Sample deals
  const deals: Deal[] = [
    {
      id: 1,
      name: "Enterprise SaaS Implementation",
      company: "Acme Corporation",
      value: 45000,
      stage: "Proposal Sent",
      owner: "Sarah Johnson",
      lastUpdated: "2 days ago",
      progress: 65,
    },
    {
      id: 2,
      name: "Data Security Upgrade",
      company: "TechGlobal Inc.",
      value: 78000,
      stage: "Meeting Scheduled",
      owner: "Michael Chen",
      lastUpdated: "1 day ago",
      progress: 40,
    },
    {
      id: 3,
      name: "Cloud Migration Project",
      company: "Oceanic Partners",
      value: 125000,
      stage: "Negotiation",
      owner: "Emily Rodriguez",
      lastUpdated: "4 hours ago",
      progress: 80,
    },
    {
      id: 4,
      name: "Annual Support Contract",
      company: "Northern Systems",
      value: 36000,
      stage: "Closed Won",
      owner: "David Kim",
      lastUpdated: "Yesterday",
      progress: 100,
    },
    {
      id: 5,
      name: "Hardware Refresh",
      company: "Meridian Healthcare",
      value: 92000,
      stage: "Initial Contact",
      owner: "James Wilson",
      lastUpdated: "3 days ago",
      progress: 25,
    },
  ];

  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get progress color based on value
  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-blue-500";
    if (progress < 60) return "bg-orange-500";
    if (progress < 100) return "bg-amber-500";
    return "bg-green-500";
  };

  // Get badge color based on stage
  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case "Lead Qualification":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Initial Contact":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      case "Meeting Scheduled":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Proposal Sent":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200";
      case "Negotiation":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Closed Won":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const toggleStage = (stageId: number) => {
    if (activeStage === stageId) {
      setActiveStage(null);
    } else {
      setActiveStage(stageId);
    }
  };

  // Calculate total pipeline value
  const totalPipelineValue = stages.reduce((sum, stage) => sum + stage.value, 0);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Pipelines</h1>
          <p className="text-gray-600">Track and manage your sales opportunities</p>
        </div>
        <Button className="gap-1">
          <Plus size={16} />
          New Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">{formatCurrency(totalPipelineValue)}</div>
            <div className="space-y-4">
              {stages.map((stage) => (
                <div key={stage.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{stage.name}</span>
                    <span className="font-medium">{formatCurrency(stage.value)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full ${stage.color}`}
                      style={{ width: `${(stage.value / totalPipelineValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Deal Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-gray-500" />
                <span className="text-sm font-medium">Total Deals</span>
              </div>
              <span className="font-bold">{stages.reduce((sum, stage) => sum + stage.count, 0)}</span>
            </div>
            <div className="space-y-3">
              {stages.map((stage) => (
                <div key={stage.id} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <span className="text-sm">{stage.name}</span>
                  </div>
                  <Badge variant="outline">{stage.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Deal closed with Oceanic Partners</p>
                  <p className="text-xs text-gray-500">Today at 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <Users size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Meeting scheduled with TechGlobal Inc.</p>
                  <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                  <DollarSign size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Proposal updated for Meridian Healthcare</p>
                  <p className="text-xs text-gray-500">April 15, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                  <Clock size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Follow-up reminder for Acme Corporation</p>
                  <p className="text-xs text-gray-500">April 14, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Active Deals</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Deal</div>
                <div>Stage</div>
                <div>Value</div>
                <div>Owner</div>
                <div>Progress</div>
              </div>
              <div className="divide-y">
                {deals.map((deal) => (
                  <div key={deal.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-muted/60 transition-colors cursor-pointer">
                    <div className="col-span-2">
                      <div className="font-medium">{deal.name}</div>
                      <div className="text-sm text-gray-500">{deal.company}</div>
                    </div>
                    <div>
                      <Badge variant="outline" className={getStageBadgeColor(deal.stage)}>
                        {deal.stage}
                      </Badge>
                    </div>
                    <div className="font-medium">{formatCurrency(deal.value)}</div>
                    <div className="text-sm">{deal.owner}</div>
                    <div className="flex flex-col gap-1">
                      <Progress 
                        value={deal.progress} 
                        className="h-2" 
                        indicatorClassName={getProgressColor(deal.progress)} 
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{deal.progress}%</span>
                        <span>{deal.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stages.map((stage) => (
              <div key={stage.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/60 transition-colors"
                  onClick={() => toggleStage(stage.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                    <h3 className="font-medium">{stage.name}</h3>
                    <Badge variant="outline">{stage.count}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{formatCurrency(stage.value)}</span>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${activeStage === stage.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </div>
                {activeStage === stage.id && (
                  <div className="p-4 border-t bg-muted/30">
                    <div className="text-sm text-gray-600 mb-2">
                      {stage.count} deals in this stage, totaling {formatCurrency(stage.value)}
                    </div>
                    {deals
                      .filter(d => d.stage === stage.name)
                      .map(deal => (
                        <div key={deal.id} className="flex items-center justify-between p-2 hover:bg-muted/60 rounded-md cursor-pointer">
                          <div>
                            <div className="font-medium">{deal.name}</div>
                            <div className="text-sm text-gray-500">{deal.company}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(deal.value)}</div>
                            <div className="text-xs text-gray-500">Updated {deal.lastUpdated}</div>
                          </div>
                        </div>
                      ))}
                    {deals.filter(d => d.stage === stage.name).length === 0 && (
                      <div className="text-center py-4 text-sm text-gray-500">
                        No deals in this stage
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Pipelines;
