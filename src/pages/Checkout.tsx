
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, MapPin, Phone, User } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  farmer: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    specialInstructions: ""
  });

  // Mock cart data - in real app this would come from context/state
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 8.50,
      quantity: 5,
      unit: "kg",
      farmer: "Kwame Asante"
    },
    {
      id: "2",
      name: "Red Onions",
      price: 6.00,
      quantity: 3,
      unit: "kg",
      farmer: "Ama Serwaa"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 15.00;
  const total = subtotal + deliveryFee;

  const handlePaymentSuccess = () => {
    // In real app, save order to database
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Review your order and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} {item.unit} × GH₵ {item.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        From: {item.farmer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>GH₵ {deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>GH₵ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Information
              </CardTitle>
              <CardDescription>
                Where should we deliver your fresh produce?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={deliveryInfo.fullName}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, fullName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0XX XXX XXXX"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <textarea
                    id="address"
                    placeholder="Enter your full delivery address including landmarks"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    className="w-full min-h-20 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <textarea
                    id="instructions"
                    placeholder="Any special delivery instructions..."
                    value={deliveryInfo.specialInstructions}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, specialInstructions: e.target.value})}
                    className="w-full min-h-16 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => setShowPaymentModal(true)}
                  disabled={!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address}
                >
                  Proceed to Payment - GH₵ {total.toFixed(2)}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={total}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Checkout;
