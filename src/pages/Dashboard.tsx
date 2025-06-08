
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, TrendingUp, Clock, Plus } from "lucide-react";

const Dashboard = () => {
  const userStats = [
    {
      title: "Active Listings",
      value: "12",
      change: "+3 this week",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Total Orders",
      value: "45",
      change: "+8 this month",
      icon: ShoppingCart,
      color: "text-accent"
    },
    {
      title: "Revenue (GHS)",
      value: "2,340",
      change: "+15% from last month",
      icon: TrendingUp,
      color: "text-secondary"
    },
    {
      title: "Avg. Delivery Time",
      value: "18hrs",
      change: "2hrs faster",
      icon: Clock,
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your crops.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Listings</CardTitle>
              <CardDescription>Your latest crop listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Fresh Tomatoes</h4>
                    <p className="text-sm text-muted-foreground">50kg - GHS 5/kg</p>
                  </div>
                  <span className="text-sm text-primary">Active</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Green Peppers</h4>
                    <p className="text-sm text-muted-foreground">30kg - GHS 8/kg</p>
                  </div>
                  <span className="text-sm text-primary">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest order activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Order #1234</h4>
                    <p className="text-sm text-muted-foreground">25kg Tomatoes</p>
                  </div>
                  <span className="text-sm text-accent">Delivered</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Order #1235</h4>
                    <p className="text-sm text-muted-foreground">15kg Peppers</p>
                  </div>
                  <span className="text-sm text-secondary">In Transit</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
