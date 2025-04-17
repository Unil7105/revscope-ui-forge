
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Sample product performance data
const productData = [
  { 
    id: 1, 
    name: "Premium Subscription", 
    category: "Software", 
    price: "$99.99", 
    sales: 256, 
    revenue: "$25,597.44", 
    trend: 12.3 
  },
  { 
    id: 2, 
    name: "Basic Subscription", 
    category: "Software", 
    price: "$49.99", 
    sales: 418, 
    revenue: "$20,895.82", 
    trend: 8.7 
  },
  { 
    id: 3, 
    name: "Pro Hardware Bundle", 
    category: "Hardware", 
    price: "$299.99", 
    sales: 89, 
    revenue: "$26,699.11", 
    trend: -2.4 
  },
  { 
    id: 4, 
    name: "Support Package", 
    category: "Services", 
    price: "$149.99", 
    sales: 152, 
    revenue: "$22,798.48", 
    trend: 0.3 
  },
  { 
    id: 5, 
    name: "Enterprise Solution", 
    category: "Software", 
    price: "$499.99", 
    sales: 67, 
    revenue: "$33,499.33", 
    trend: 15.8 
  },
];

const ProductPerformanceTable: React.FC = () => {
  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium">Product</TableHead>
            <TableHead className="font-medium">Category</TableHead>
            <TableHead className="font-medium text-right">Price</TableHead>
            <TableHead className="font-medium text-right">Sales</TableHead>
            <TableHead className="font-medium text-right">Revenue</TableHead>
            <TableHead className="font-medium text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`px-2 py-0.5 ${
                    product.category === "Software" 
                      ? "bg-blue-50 text-blue-700 border-blue-200" 
                      : product.category === "Hardware" 
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell className="text-right">{product.sales}</TableCell>
              <TableCell className="text-right font-medium">{product.revenue}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {product.trend > 5 ? (
                    <Badge className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-0 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {product.trend}%
                    </Badge>
                  ) : product.trend < -1 ? (
                    <Badge variant="outline" className="bg-red-100 hover:bg-red-200 text-red-700 border-0 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {Math.abs(product.trend)}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 flex items-center">
                      <Minus className="h-3 w-3 mr-1" />
                      {product.trend}%
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductPerformanceTable;
