
import AllProducts from '@/components/AllProducts';
import { fetchData } from '@/hooks/fetchData';
import React from 'react'

const AllProductsPage = async () => {
    const endpoint = 'https://dummyjson.com/products/category-list';
    const categories = await fetchData(endpoint);
        
  return (
    <div>
      <AllProducts categories={categories} />
    </div>
  )
}

export default AllProductsPage;
