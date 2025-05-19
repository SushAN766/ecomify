import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getProduct, getProducts } from '@/api/products';
import { ShoppingCart, Heart, Share, Star, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id)),
    enabled: !!id,
  });
  
  
  const { data: similarProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title || 'Product',
        text: product?.description || '',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ebazaar-primary"></div>
        </div>
      </Layout>
    );
  }
  
  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });
  };
  
  // If addToCart expects CartItem with quantity:


  const random4Products = similarProducts
    ?.filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-sm h-full flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-[400px] w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <nav className="flex text-gray-500 text-sm mb-4">
              <a href="/" className="hover:text-ebazaar-primary">Home</a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <a href="/shop" className="hover:text-ebazaar-primary">Shop</a>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span>{product.category}</span>
            </nav>
            
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current"
                    fill={i < Math.floor(product.rating.rate) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
            
            <div className="text-3xl font-bold text-ebazaar-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="font-semibold mb-2">Quantity</div>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button 
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-ebazaar-primary hover:bg-ebazaar-primary/90 flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>SKU: PR-{product.id.toString().padStart(4, '0')}</div>
                <div>Category: <span className="capitalize">{product.category}</span></div>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {random4Products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
