
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, Users, TrendingUp, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundSlideshow />
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to AgroFresh GH</h1>
            <p className="text-muted-foreground">Choose your role to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Farmer Dashboard
                </CardTitle>
                <CardDescription>
                  Manage your crops, set prices, and track sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/farmers">Go to Farmer Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Buyer Marketplace
                </CardTitle>
                <CardDescription>
                  Browse fresh produce and place orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/buyers">Browse Marketplace</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  Manage users, crops, and system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin">Admin Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-card/40 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-muted-foreground">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2,500+</div>
                <div className="text-muted-foreground">Fresh Crops Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">800+</div>
                <div className="text-muted-foreground">Happy Buyers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-muted-foreground">Waste Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
