
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-gray-600 mb-6">
            Your order has been received and is being processed. We've sent a confirmation email with your order details.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-gray-500">Order Number:</span>
                <div className="font-medium">{orderNumber}</div>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <div className="font-medium">{new Date().toLocaleDateString()}</div>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <div className="font-medium">customer@example.com</div>
              </div>
              <div>
                <span className="text-gray-500">Payment Method:</span>
                <div className="font-medium">Credit Card</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="w-full md:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="w-full md:w-auto bg-ebazaar-primary hover:bg-ebazaar-primary/90">
                <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
