import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    saveInfo: false,
    paymentMethod: 'credit-card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order placement
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      });
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, saveInfo: checked as boolean })
                  }
                />
                <label
                  htmlFor="saveInfo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save this information for next time
                </label>
              </div>
              
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-ebazaar-primary focus:ring-ebazaar-primary"
                  />
                  <label htmlFor="credit-card" className="font-medium">Credit Card</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-ebazaar-primary focus:ring-ebazaar-primary"
                  />
                  <label htmlFor="paypal" className="font-medium">PayPal</label>
                </div>
              </div>
              
              {formData.paymentMethod === 'credit-card' && (
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required={formData.paymentMethod === 'credit-card'}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expDate">Expiration Date</Label>
                      <Input
                        id="expDate"
                        placeholder="MM/YY"
                        required={formData.paymentMethod === 'credit-card'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required={formData.paymentMethod === 'credit-card'}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full mt-4 bg-ebazaar-primary hover:bg-ebazaar-primary/90"
              >
                <Lock className="mr-2 h-4 w-4" /> Place Order
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 p-1 rounded">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium line-clamp-1">{item.name}</div>
                      <div className="text-gray-500 text-sm">
                        Qty: {item.quantity} x ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
