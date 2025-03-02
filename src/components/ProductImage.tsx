'use client';

import { Product } from '@/type';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductImage = ({ product }: { product: Product }) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        setImgUrl(product?.images[0])
    }, [product])

    return (
        <div>
            <div className='flex items-start'>
                <div>
                    {product?.images?.map((item, index) => (
                        <Image src={item} key={index} width={200} height={200} alt="subImage" priority
                        className={`w-24 max-h-24 object-contain cursor-pointer opacity-80 hover:opacity-100
                        hoverEffect border border-gray-200 mb-1 ${imgUrl === item && 'border-gray-500 rounded-sm opacity-100'}`}
                        onClick={() => {setImgUrl(item)}} />
                    ))}
                </div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3}} className='bg-gray-200 rounded-md ml-5 w-full max-h-[550px]'>
                    {imgUrl && (
                        <Image
                            src={imgUrl}
                            width={400}
                            height={400}
                            alt="product image"
                            priority
                            className="w-full max-h-[550px] object-contain"
                        />
                    )}
                </motion.div>
            </div >
        </div>
    );
};

export default ProductImage;
