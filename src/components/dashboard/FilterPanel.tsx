
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Users, Filter, RefreshCw } from "lucide-react";
import { format } from "date-fns";

const FilterPanel: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="w-full hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-gray-100">
            <Filter size={14} className="text-gray-700" />
          </div>
          Filter Dashboard
        </CardTitle>
        <CardDescription>Refine the data view</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Label htmlFor="date">Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white shadow-sm border-gray-200 hover:bg-gray-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-lg border border-gray-100">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Product Category */}
        <div className="space-y-2">
          <Label htmlFor="product">Product Category</Label>
          <Select defaultValue="all">
            <SelectTrigger id="product" className="bg-white shadow-sm border-gray-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select defaultValue="all">
            <SelectTrigger id="region" className="bg-white shadow-sm border-gray-200">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="na">North America</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="apac">Asia Pacific</SelectItem>
              <SelectItem value="latam">Latin America</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sales Rep */}
        <div className="space-y-2">
          <Label htmlFor="sales-rep" className="flex items-center gap-1">
            <Users size={14} className="text-gray-600" />
            Sales Representative
          </Label>
          <Select defaultValue="all">
            <SelectTrigger id="sales-rep" className="bg-white shadow-sm border-gray-200">
              <SelectValue placeholder="Select sales rep" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Representatives</SelectItem>
              <SelectItem value="john">John Smith</SelectItem>
              <SelectItem value="emily">Emily Johnson</SelectItem>
              <SelectItem value="michael">Michael Chen</SelectItem>
              <SelectItem value="sarah">Sarah Williams</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search by Order ID */}
        <div className="space-y-2">
          <Label htmlFor="order-id">Order ID</Label>
          <Input id="order-id" placeholder="Enter order ID" className="bg-white shadow-sm border-gray-200" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-rs-blue hover:bg-rs-blue/90 shadow-sm shadow-blue-200/50 hover:shadow-md transition-all">Apply Filters</Button>
          <Button variant="outline" className="flex items-center gap-1 bg-white shadow-sm border-gray-200 hover:bg-gray-50">
            <RefreshCw size={14} />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
