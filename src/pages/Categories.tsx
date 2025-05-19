import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock category data
const categories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Laptops, Smartphones, Tablets, and more',
    image: 'https://images.unsplash.com/photo-1515940279136-2f419eea8051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEdhZGdldHN8ZW58MHx8MHx8fDA%3D',
    link: '/shop?category=electronics'
  },
  {
    id: 2,
    name: 'Clothing',
    description: 'T-shirts, Jeans, Dresses, and more',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop?category=clothing'
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    description: 'Furniture, Appliances, Cookware, and more',
    image: 'https://images.unsplash.com/photo-1514237487632-b60bc844a47d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG9tZSUyMGFuZCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D',
    link: '/shop?category=home-kitchen'
  },
  {
    id: 4,
    name: 'Books',
    description: 'Fiction, Non-fiction, Education, and more',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qm9va3N8ZW58MHx8MHx8fDA%3D',
    link: '/shop?category=books'
  },
  {
    id: 5,
    name: 'Sports & Outdoors',
    description: 'Sports Equipment, Outdoor Gear, and more',
    image: 'https://plus.unsplash.com/premium_photo-1682435566673-cedb75cd7459?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3BvcnRzJTIwRXF1aXBtZW50fGVufDB8fDB8fHww',
    link: '/shop?category=sports-outdoors'
  },
  {
    id: 6,
    name: 'Beauty & Personal Care',
    description: 'Skincare, Makeup, Haircare, and more',
    image: 'https://images.unsplash.com/photo-1621553845587-dd7094ef9c03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEJlYXV0eSUyMCUyNiUyMFBlcnNvbmFsJTIwQ2FyZSUyMGVxdWlwbW5ldHN8ZW58MHx8MHx8fDA%3D',
    link: '/shop?category=beauty-personal-care'
  }
];

const Categories: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Shop by Categories</h1>
        <div className="w-16 h-1 bg-ebazaar-primary mx-auto mb-8"></div>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Browse our wide range of products by category. Find exactly what you're looking for!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="no-underline">
              <Card className="h-full transition-all duration-300 hover:shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="text-sm text-blue-600 font-medium hover:underline">
                    Browse Products →
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
