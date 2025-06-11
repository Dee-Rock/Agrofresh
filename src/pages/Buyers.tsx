
import { useState } from "react";
import { Search, ShoppingCart, MapPin, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Crop {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
  farmer: string;
  location: string;
  harvestDate: string;
  expiryDate: string;
  image?: string;
}

const Buyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Array<{crop: Crop, quantity: number}>>([]);
  
  const [crops] = useState<Crop[]>([
    {
      id: "1",
      name: "Fresh Tomatoes",
      quantity: 50,
      unit: "kg",
      price: 8.50,
      description: "Fresh organic tomatoes, perfect for cooking",
      farmer: "Kwame Asante",
      location: "Kumasi, Ashanti",
      harvestDate: "2024-01-15",
      expiryDate: "2024-01-22"
    },
    {
      id: "2",
      name: "Red Onions",
      quantity: 30,
      unit: "kg",
      price: 6.00,
      description: "Premium red onions, well dried and stored",
      farmer: "Ama Serwaa",
      location: "Techiman, Brong Ahafo",
      harvestDate: "2024-01-10",
      expiryDate: "2024-01-17"
    },
    {
      id: "3",
      name: "Green Pepper",
      quantity: 25,
      unit: "kg",
      price: 12.00,
      description: "Fresh green bell peppers",
      farmer: "Kofi Mensah",
      location: "Accra, Greater Accra",
      harvestDate: "2024-01-14",
      expiryDate: "2024-01-21"
    },
    {
      id: "4",
      name: "Cassava",
      quantity: 100,
      unit: "kg",
      price: 3.50,
      description: "Fresh cassava tubers",
      farmer: "Akosua Boateng",
      location: "Cape Coast, Central",
      harvestDate: "2024-01-12",
      expiryDate: "2024-01-19"
    }
  ]);

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           crop.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const addToCart = (crop: Crop, quantity: number) => {
    const existingItem = cart.find(item => item.crop.id === crop.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.crop.id === crop.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { crop, quantity }]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.crop.price * item.quantity), 0);
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Fresh Produce Marketplace</h1>
            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="text-sm">- GH₵ {getTotalPrice().toFixed(2)}</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tomato">Tomatoes</SelectItem>
                <SelectItem value="onion">Onions</SelectItem>
                <SelectItem value="pepper">Peppers</SelectItem>
                <SelectItem value="cassava">Cassava</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => {
            const daysUntilExpiry = getDaysUntilExpiry(crop.expiryDate);
            
            return (
              <Card key={crop.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{crop.name}</CardTitle>
                      <CardDescription className="text-sm">{crop.description}</CardDescription>
                    </div>
                    {daysUntilExpiry <= 2 && (
                      <Badge variant="destructive" className="text-xs">
                        Expires in {daysUntilExpiry} days
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        GH₵ {crop.price}
                      </span>
                      <span className="text-sm text-muted-foreground">per {crop.unit}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{crop.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>Expires: {crop.expiryDate}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Farmer: {crop.farmer}
                      </div>
                      <div className="text-muted-foreground">
                        Available: {crop.quantity} {crop.unit}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Input 
                        type="number" 
                        placeholder="Qty" 
                        className="w-20" 
                        min="1" 
                        max={crop.quantity}
                        id={`quantity-${crop.id}`}
                      />
                      <Button 
                        className="flex-1 gap-2" 
                        onClick={() => {
                          const quantityInput = document.getElementById(`quantity-${crop.id}`) as HTMLInputElement;
                          const quantity = parseInt(quantityInput?.value || "1");
                          if (quantity > 0 && quantity <= crop.quantity) {
                            addToCart(crop, quantity);
                            quantityInput.value = "";
                          }
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No crops found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buyers;
