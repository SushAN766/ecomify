import React from 'react';
import Layout from '@/components/Layout';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleGoToShop = () => {
    navigate('/shop');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
            <Button onClick={handleGoToShop}>Browse Products</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-col items-center shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 text-center">
                  {item.name}
                </h2>
                <p className="text-ebazaar-primary font-bold text-xl mb-4">
                  ${item.price.toFixed(2)}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
