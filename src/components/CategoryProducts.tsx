'use client'

import React, { useEffect, useState } from 'react'
import Title from './Title';
import { fetchData } from '@/hooks/fetchData';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductsList from './ProductsList';
import NoProductAvailable from './NoProductAvailable';

interface Props {
    id: string;
    categories: [string];
}

const CategoryProducts = ({ id, categories }: Props) => {
    const [currentCategory, setCurrentCategory] = useState(id);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const endpoint = `https://dummyjson.com/products/category/${currentCategory}`;
            setLoading(true);
            const data = await fetchData(endpoint);
            setProducts(data?.products);
            try {

            } catch (error) {
                console.log("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [id, currentCategory]);
    return (
        <div>
            <Title className='text-xl'>
                Products by Category: <span className='text-green-600 font-bold capitalize tracking-wider'>{currentCategory}</span>
            </Title>
            <div className='flex items-start gap-4 py-5'>
                <div className="flex flex-col gap-2 md:min-w-40 border border-amazonBlue/50">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant="outline"
                            className={`bg-transparent text-center text-amazonBlue/80 border-0 rounded-none capitalize hover:bg-amazonLight
                                 hover:text-white font-semibold hoverEffect border-b border-b-amazonBlue/50 ${currentCategory === category && "bg-amazonBlue text-white border-amazonBlue"}`}
                            onClick={() => setCurrentCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                {loading ?
                    <div className='flex flex-col gap-4 items-center justify-center py-10 min-h-80 space-y-4 text-center bg-amazonBlue/10 rounded-lg w-full'>
                        <div className='flex items-center space-x-2 text-amazonOrangeDark'>
                            <Loader2 className='animate-spin' />
                            <span className='text-lg font-semibold'>Loading products...</span>
                        </div>
                    </div>
                    : products.length ? <AnimatePresence><motion.div layout initial={{opacity:0.2}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                        <ProductsList products={products} className="px-0 flex-1" />
                    </motion.div></AnimatePresence>:<NoProductAvailable value={currentCategory} />}


            </div>
        </div>
    )
}



export default CategoryProducts
