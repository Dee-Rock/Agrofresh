
import { useState } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin/AdminLayout";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "#1234",
      crop: "Fresh Tomatoes",
      farmer: "Kwame Asante",
      vendor: "Golden Palace Restaurant",
      quantity: "25kg",
      amount: "GHS 125",
      status: "Completed",
      orderDate: "2024-06-07",
      deliveryDate: "2024-06-08"
    },
    {
      id: "#1235",
      crop: "Green Peppers",
      farmer: "Kofi Osei",
      vendor: "University Hostel",
      quantity: "15kg",
      amount: "GHS 120",
      status: "In Transit",
      orderDate: "2024-06-08",
      deliveryDate: "2024-06-09"
    },
    {
      id: "#1236",
      crop: "Sweet Potatoes",
      farmer: "Ama Boateng",
      vendor: "Local Market",
      quantity: "50kg",
      amount: "GHS 150",
      status: "Pending",
      orderDate: "2024-06-08",
      deliveryDate: "2024-06-10"
    },
    {
      id: "#1237",
      crop: "Plantains",
      farmer: "Yaw Mensah",
      vendor: "Mama's Kitchen",
      quantity: "40 pieces",
      amount: "GHS 80",
      status: "Cancelled",
      orderDate: "2024-06-06",
      deliveryDate: "-"
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-primary text-primary-foreground";
      case "In Transit":
        return "bg-accent text-accent-foreground";
      case "Pending":
        return "bg-secondary text-secondary-foreground";
      case "Cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "In Transit":
        return <Package className="h-4 w-4" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
            <p className="text-muted-foreground">Track and manage all orders on the platform</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders, crops, farmers, or vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">156</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">23</div>
              <p className="text-sm text-muted-foreground">In Transit</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">45</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">8</div>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>Monitor all order activity on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.crop}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="font-medium">{order.farmer}</p>
                      <p className="text-sm text-muted-foreground">Farmer</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium">{order.vendor}</p>
                      <p className="text-sm text-muted-foreground">Vendor</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium">{order.quantity}</p>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium">{order.amount}</p>
                      <p className="text-sm text-muted-foreground">Amount</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center space-x-1 justify-center">
                        {getStatusIcon(order.status)}
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{order.orderDate}</p>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orders;
