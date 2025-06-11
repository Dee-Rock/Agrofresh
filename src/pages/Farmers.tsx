import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Package, TrendingUp, DollarSign, Calendar, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";

interface Crop {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  expiryDate: string;
  imageUrl: string;
}

const initialCrops: Crop[] = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 500,
    price: 2.50,
    expiryDate: "2024-08-15",
    imageUrl: "https://images.unsplash.com/photo-1560807605-ba5a6bb7c24a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Carrots",
    category: "Vegetables",
    quantity: 300,
    price: 1.80,
    expiryDate: "2024-08-20",
    imageUrl: "https://images.unsplash.com/photo-1598148502549-5609c14c8652?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fycm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Bananas",
    category: "Fruits",
    quantity: 800,
    price: 0.90,
    expiryDate: "2024-08-10",
    imageUrl: "https://images.unsplash.com/photo-1587132172749-727532918f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
];

const Farmers = () => {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCrop, setNewCrop] = useState<Omit<Crop, "id">>({
    name: "",
    category: "Vegetables",
    quantity: 0,
    price: 0,
    expiryDate: "",
    imageUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCrop(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewCrop(prev => ({ ...prev, category: value }));
  };

  const handleAddCrop = () => {
    const newId = crops.length > 0 ? Math.max(...crops.map(crop => crop.id)) + 1 : 1;
    setCrops([...crops, { id: newId, ...newCrop }]);
    setNewCrop({ name: "", category: "Vegetables", quantity: 0, price: 0, expiryDate: "", imageUrl: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteCrop = (id: number) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundSlideshow />
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Your Farm Dashboard</h1>
                <p className="text-muted-foreground">Manage your crops and sales</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Crop
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Crop</DialogTitle>
                    <DialogDescription>
                      Add a new crop to your inventory.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" name="name" value={newCrop.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select onValueChange={handleSelectChange} defaultValue={newCrop.category} >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Grains">Grains</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input type="number" id="quantity" name="quantity" value={String(newCrop.quantity)} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input type="number" id="price" name="price" value={String(newCrop.price)} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expiryDate" className="text-right">
                        Expiry Date
                      </Label>
                      <Input type="date" id="expiryDate" name="expiryDate" value={newCrop.expiryDate} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="imageUrl" className="text-right">
                        Image URL
                      </Label>
                      <Input type="url" id="imageUrl" name="imageUrl" value={newCrop.imageUrl} onChange={handleInputChange} className="col-span-3" />
                    </div>
                  </div>
                  <Button type="submit" onClick={handleAddCrop}>Add Crop</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Total Crops</span>
                </CardTitle>
                <CardDescription>All your listed crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{crops.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Total Quantity</span>
                </CardTitle>
                <CardDescription>Total quantity of all crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{crops.reduce((acc, crop) => acc + crop.quantity, 0)}</div>
              </CardContent>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Average Price</span>
                </CardTitle>
                <CardDescription>Average price per crop</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {crops.length > 0 ? (crops.reduce((acc, crop) => acc + crop.price, 0) / crops.length).toFixed(2) : "0.00"}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Expiring Soon</span>
                </CardTitle>
                <CardDescription>Crops expiring in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {crops.filter(crop => {
                    const expiry = new Date(crop.expiryDate);
                    const now = new Date();
                    const diff = expiry.getTime() - now.getTime();
                    const days = Math.ceil(diff / (1000 * 3600 * 24));
                    return days <= 7;
                  }).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="secondary" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>View Sales Report</span>
              </Button>
              <Button variant="secondary" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Request Payment</span>
              </Button>
              <Button variant="secondary" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Update Availability</span>
              </Button>
            </div>
          </div>

          {/* Recent Crops */}
          <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Crops</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Expiry Date</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {crops.map((crop) => (
                    <tr key={crop.id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-2">
                            <img src={crop.imageUrl} alt={crop.name} className="object-cover w-full h-full" />
                          </div>
                          <div className="text-sm font-medium text-foreground">{crop.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{crop.category}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{crop.quantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{crop.price}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{crop.expiryDate}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteCrop(crop.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmers;
