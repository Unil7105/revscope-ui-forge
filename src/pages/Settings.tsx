
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="pt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="Smith" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="Sales Manager" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="sales">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Write a short bio..." 
                    defaultValue="Experienced sales manager with a track record of exceeding targets and building strong client relationships."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="pt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select defaultValue="america-new_york">
                    <SelectTrigger id="timeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                      <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="two-factor" />
                    <Label htmlFor="two-factor">Enable two-factor authentication</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-orders">Order updates</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about order status changes</p>
                    </div>
                    <Switch id="email-orders" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-customers">Customer activity</Label>
                      <p className="text-sm text-muted-foreground">Notifications about new customers and activity</p>
                    </div>
                    <Switch id="email-customers" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-reports">Weekly reports</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                    </div>
                    <Switch id="email-reports" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-mentions">@Mentions</Label>
                      <p className="text-sm text-muted-foreground">Notify when someone mentions you</p>
                    </div>
                    <Switch id="app-mentions" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-alerts">System alerts</Label>
                      <p className="text-sm text-muted-foreground">Important system notifications and updates</p>
                    </div>
                    <Switch id="app-alerts" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how RevScope looks for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-3 cursor-pointer bg-white text-center hover:border-primary">
                      <div className="h-12 bg-white border rounded mb-2"></div>
                      <span className="text-sm font-medium">Light</span>
                    </div>
                    <div className="border rounded-lg p-3 cursor-pointer bg-gray-950 text-center hover:border-primary">
                      <div className="h-12 bg-gray-900 border rounded mb-2"></div>
                      <span className="text-sm font-medium text-white">Dark</span>
                    </div>
                    <div className="border rounded-lg p-3 cursor-pointer bg-gradient-to-r from-white to-gray-900 text-center hover:border-primary">
                      <div className="h-12 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
                      <span className="text-sm font-medium">System</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dashboard Layout</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                      <div className="flex h-24">
                        <div className="w-1/4 bg-gray-200 h-full"></div>
                        <div className="w-3/4 p-1">
                          <div className="bg-gray-200 h-1/3 mb-1 rounded"></div>
                          <div className="bg-gray-200 h-2/3 rounded"></div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-center mt-2">Standard</p>
                    </div>
                    <div className="border rounded-lg p-3 cursor-pointer hover:border-primary">
                      <div className="flex h-24">
                        <div className="w-1/5 bg-gray-200 h-full"></div>
                        <div className="w-3/5 p-1">
                          <div className="bg-gray-200 h-1/3 mb-1 rounded"></div>
                          <div className="bg-gray-200 h-2/3 rounded"></div>
                        </div>
                        <div className="w-1/5 bg-gray-200 h-full"></div>
                      </div>
                      <p className="text-sm font-medium text-center mt-2">Centered</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <Switch id="compact-mode" />
                  </div>
                  <p className="text-sm text-muted-foreground">Show more data with reduced spacing</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Interface Animations</Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Appearance</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect RevScope with other tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-blue-500 flex items-center justify-center text-white font-bold">S</div>
                      <div>
                        <h4 className="text-base font-medium">Slack</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications in your Slack channels</p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold">Z</div>
                      <div>
                        <h4 className="text-base font-medium">Zoom</h4>
                        <p className="text-sm text-muted-foreground">Schedule customer calls from RevScope</p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-green-600 flex items-center justify-center text-white font-bold">Q</div>
                      <div>
                        <h4 className="text-base font-medium">QuickBooks</h4>
                        <p className="text-sm text-muted-foreground">Sync financial data between systems</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-green-600 mr-3">Connected</span>
                      <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-blue-700 flex items-center justify-center text-white font-bold">G</div>
                      <div>
                        <h4 className="text-base font-medium">Google Workspace</h4>
                        <p className="text-sm text-muted-foreground">Access Google Docs, Calendar and Drive</p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
