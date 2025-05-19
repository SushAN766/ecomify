
import axios from 'axios';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// Using the fake store API for product data
const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
