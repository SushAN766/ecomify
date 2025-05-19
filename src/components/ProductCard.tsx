
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/api/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image
    });
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-ebazaar-primary text-white text-xs px-2 py-1 rounded">
            Sale
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-800 line-clamp-2 h-12">{product.title}</h3>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-1">★</span>
              <span>{product.rating.rate} ({product.rating.count})</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-ebazaar-primary hover:bg-ebazaar-primary/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
