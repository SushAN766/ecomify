import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/api/products';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSelectedCategory('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="mr-2"
                  />
                  <span>All Categories</span>
                </label>
                
                {categoriesLoading ? (
                  <div>Loading categories...</div>
                ) : (
                  categories?.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Price Range</h3>
                <span>${priceRange[0]} - ${priceRange[1]}</span>
              </div>
              <div className="px-2 py-4">
                <Slider
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Products */}
          <div className="lg:col-span-3">
            {productsLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ebazaar-primary"></div>
              </div>
            ) : filteredProducts?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">Showing {filteredProducts?.length} products</p>
                  
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
