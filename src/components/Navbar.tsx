import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-semibold text-[#5955ff]"></span>
          <img 
            src="https://ebazaar.com.sg/wp-content/uploads/2020/08/Main-File-2-e1598507600784.png" 
            alt="eBazaar Logo" 
            className="h-10 ml-2 rounded-full" 
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-ebazaar-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-ebazaar-primary transition-colors">
            Shop
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-ebazaar-primary transition-colors">
            Categories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-ebazaar-primary text-white rounded-full text-xs px-1.5">
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
