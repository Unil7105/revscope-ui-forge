
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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Filter size={16} />
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
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Product Category */}
        <div className="space-y-2">
          <Label htmlFor="product">Product Category</Label>
          <Select defaultValue="all">
            <SelectTrigger id="product">
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
            <SelectTrigger id="region">
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
            <Users size={14} />
            Sales Representative
          </Label>
          <Select defaultValue="all">
            <SelectTrigger id="sales-rep">
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
          <Input id="order-id" placeholder="Enter order ID" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-rs-blue hover:bg-rs-blue/90">Apply Filters</Button>
          <Button variant="outline" className="flex items-center gap-1">
            <RefreshCw size={14} />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
