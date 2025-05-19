
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/api/products';
import { Link } from 'react-router-dom';

const Index = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <Layout>
      <HeroCarousel />
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Products</h2>
          <div className="w-16 h-1 bg-ebazaar-primary mx-auto mb-8"></div>
          
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover our curated collection of high-quality products. From everyday essentials
            to unique finds, we've got something for everyone.
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ebazaar-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Error loading products. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button size="lg" className="bg-ebazaar-primary hover:bg-ebazaar-primary/90">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-gray-600 mb-6">
                At eBazaar, we pride ourselves on providing an exceptional shopping experience with:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-ebazaar-primary text-white p-2 rounded-full mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold">Quality Products</h3>
                    <p className="text-gray-600">Carefully selected items that meet our high standards</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-ebazaar-primary text-white p-2 rounded-full mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold">Fast Shipping</h3>
                    <p className="text-gray-600">Quick delivery to your doorstep</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-ebazaar-primary text-white p-2 rounded-full mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold">Easy Returns</h3>
                    <p className="text-gray-600">Hassle-free return policy for your peace of mind</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-ebazaar-primary text-white p-2 rounded-full mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold">Secure Payments</h3>
                    <p className="text-gray-600">Your transactions are protected with the latest security</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1700527220164-dff705ea3285?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fFNob3BwaW5nJTIwRXhwZXJpZW5jZXxlbnwwfHwwfHx8MA%3D%3D" 
                alt="Shopping Experience" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
