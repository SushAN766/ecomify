
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Shopping Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button onClick={() => navigate('/shop')} className="bg-ebazaar-primary hover:bg-ebazaar-primary/90">
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
                  <Button 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-6 border-b flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="sm:w-24 h-24 bg-gray-50 p-2 rounded">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="font-medium text-gray-800 hover:text-ebazaar-primary"
                    >
                      {item.name}
                    </Link>
                    <div className="text-gray-500 text-sm mt-1">
                      Item #: {item.id}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <button 
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l-md"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 h-8 border-t border-b border-gray-300 text-center"
                    />
                    <button 
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r-md"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="font-semibold text-lg w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cart Total */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Cart Total</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b">
                  <span>Shipping</span>
                  <div className="text-right">
                    <div className="font-semibold">Free</div>
                    <div className="text-sm text-gray-500">Free standard shipping</div>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-ebazaar-primary hover:bg-ebazaar-primary/90"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-center">
                <Link 
                  to="/shop" 
                  className="text-ebazaar-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
