
import { useState } from "react";
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Crop {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
  harvestDate: string;
  expiryDate: string;
  status: "available" | "sold" | "expired";
}

const Farmers = () => {
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: "1",
      name: "Tomatoes",
      quantity: 50,
      unit: "kg",
      price: 8.50,
      description: "Fresh organic tomatoes",
      harvestDate: "2024-01-15",
      expiryDate: "2024-01-22",
      status: "available"
    },
    {
      id: "2",
      name: "Onions",
      quantity: 30,
      unit: "kg",
      price: 6.00,
      description: "Red onions, well dried",
      harvestDate: "2024-01-10",
      expiryDate: "2024-01-17",
      status: "available"
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    price: "",
    description: "",
    harvestDate: "",
  });

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.quantity && newCrop.price) {
      const expiryDate = new Date(newCrop.harvestDate);
      expiryDate.setDate(expiryDate.getDate() + 7);
      
      const crop: Crop = {
        id: Date.now().toString(),
        name: newCrop.name,
        quantity: Number(newCrop.quantity),
        unit: newCrop.unit,
        price: Number(newCrop.price),
        description: newCrop.description,
        harvestDate: newCrop.harvestDate,
        expiryDate: expiryDate.toISOString().split('T')[0],
        status: "available"
      };
      
      setCrops([...crops, crop]);
      setNewCrop({
        name: "",
        quantity: "",
        unit: "kg",
        price: "",
        description: "",
        harvestDate: "",
      });
      setShowAddForm(false);
    }
  };

  const deleteCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your crops and track sales</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crops.filter(c => c.status === "available").length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GH₵ 1,240</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Crop Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Crop
          </Button>
        </div>

        {/* Add Crop Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Crop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Crop Name</Label>
                  <Input
                    id="name"
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    placeholder="e.g., Tomatoes"
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newCrop.quantity}
                    onChange={(e) => setNewCrop({...newCrop, quantity: e.target.value})}
                    placeholder="e.g., 50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={newCrop.unit} onValueChange={(value) => setNewCrop({...newCrop, unit: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                      <SelectItem value="pieces">Pieces</SelectItem>
                      <SelectItem value="bunches">Bunches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price">Price per Unit (GH₵)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newCrop.price}
                    onChange={(e) => setNewCrop({...newCrop, price: e.target.value})}
                    placeholder="e.g., 8.50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={newCrop.harvestDate}
                    onChange={(e) => setNewCrop({...newCrop, harvestDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newCrop.description}
                    onChange={(e) => setNewCrop({...newCrop, description: e.target.value})}
                    placeholder="Brief description of the crop"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddCrop}>Add Crop</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Crops List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <Card key={crop.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                    <CardDescription>{crop.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(crop.status)}>
                    {crop.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{crop.quantity} {crop.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-medium">GH₵ {crop.price}/{crop.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Harvest:</span>
                    <span className="font-medium">{crop.harvestDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <span className="font-medium">{crop.expiryDate}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => deleteCrop(crop.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Farmers;
