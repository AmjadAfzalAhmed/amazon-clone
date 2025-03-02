'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Product } from '@/type';
import Container from './Container';
import Title from './Title';
import { Card, CardContent } from './ui/card';
import ProductFilters from './ProductFilters';
import { fetchData } from '@/hooks/fetchData';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';


const AllProducts = ({ categories }: { categories: string[] }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [priceFilter, setPriceFilter] = useState("");
    const [priceValue, setPriceValue] = useState(0);
    const maxPrice = 40000;
    const defaultPrice = 0;
    const perPage = 12;
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMoreProducts = useCallback(async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;
        setLoading(true);

        const categoryFilter = selectedCategory
            ? `/category/${selectedCategory}`
            : "";
        const filterPrice = priceFilter ? `sortBy=price&order=${priceFilter}` : "";
        const endpoint = `https://dummyjson.com/products${categoryFilter}?${filterPrice}&limit=${perPage}&skip=${reset ? 0 : (currentPage - 1) * perPage
            }`;

        try {
            const data = await fetchData(endpoint);
            if (reset) {
                setProducts(data?.products || []);
                setHasMore(data?.products.length > 0);
                setCurrentPage(1);
            } else if (data?.products?.length > 0) {
                setProducts((prev) => [...prev, ...data.products]);
                setHasMore(data.products.length === perPage);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, selectedCategory, priceFilter, currentPage, perPage]);

    // Load more when currentPage changes
    useEffect(() => {
        if (currentPage > 1) loadMoreProducts();
    }, [currentPage, loadMoreProducts]);

    // Reset when filters change
    useEffect(() => {
        loadMoreProducts(true);
    }, [selectedCategory, priceFilter, loadMoreProducts]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore) {
                setCurrentPage((prev) => prev + 1);
            }
        }, {
            threshold: 1.0
        });

        const currentRef = observerRef.current; // Store the current ref in a variable

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef); // Use the stored ref for cleanup
            }
        };
    }, [hasMore]);

    return (
        <Container className='py-10 max-w-screen-2xl'>
            <Title className='text-center text-4xl font-bold mb-5'>Discover our Exquisite Collection</Title>

            <Card className='mb-8'>
                <CardContent className='p-6 flex flex-col sm:flex-row items-start gap-4'>
                    <div className='flex flex-col sm:flex-row self-start gap-4 mb-6 w-auto md:min-w-40'>
                        <ProductFilters
                            categories={categories}
                            setSelectedCategory={setSelectedCategory}
                            selectedCategory={selectedCategory}
                            priceFilter={priceFilter}
                            setPriceFilter={setPriceFilter}
                            priceValue={priceValue}
                            setPriceValue={setPriceValue}
                            defaultPrice={defaultPrice}
                            maxPrice={maxPrice}
                        />
                    </div>
                    <div className='flex-1'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {products.map((product, index) => (
                                <ProductCard key={index.toString()} product={product} />
                            ))}
                        </div>
                        <div ref={observerRef}>
                            {!loading && (
                                <div className='w-full flex justify-center items-center py-10 mt-10 bg-amazonBlue/5'>
                                    <Loader2 className='w-10 h-10 animate-spin text-amazonOrangeDark' />
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default AllProducts
