'use client'

import { store } from '@/lib/store'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import PriceFormat from './PriceFormat';
import AddToCartBtn from './AddToCartBtn';


const FavoriteProducts = () => {
    const {favoriteProduct} = store();
    console.log(favoriteProduct);
  return (
   <div className='mt-5'>
    <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
            <thead>
                <tr className='bg-amazonLight/10 rounded-md'>
                    <th className='p-2 text-left'>Product Info</th>
                    <th className='p-2 text-left hidden md:table-cell'>Category</th>
                    <th className='p-2 text-left hidden md:table-cell'>Brand</th>
                    <th className='p-2 text-left hidden md:table-cell'>Status</th>
                    <th className='p-2 text-left'>Price</th>
                    <th className='p-2 text-left'>Action</th>
                </tr>
            </thead>
            <tbody>
                {favoriteProduct.map((product) => (
                    <tr key={product?.id} className='border-b'>
                        <td className='p-2 flex items-center gap-2'>
                        <Link href={{pathname:`/product/${product?.id}`,query:{id:product?.id}}}
                        className='border rounded-md group hidden md:inline-flex'
                        >
                        <Image src={product?.images[0]} alt={product?.title} width={80} height={80} 
                        className='rounded-md group-hover:scale-110 hoverEffect h-20 w-20 object-contain'/>
                        </Link>
                        <p className='line-clamp-1 font-medium'>{product?.title}</p>
                        </td>
                        <td className='p-2 capitalize hidden md:table-cell'>{product?.category}</td>
                        <td className='p-2 capitalize hidden md:table-cell'>{product?.brand}</td>
                        <td className={`p-2 ${product?.availabilityStatus === 'In Stock' ? 'text-green-500' : 'text-red-500'} font-medium text-sm hidden md:table-cell`}>{product?.availabilityStatus}</td>
                        <td className='p-2'><PriceFormat amount={product?.quantity? product?.quantity * product?.price : product?.price} /></td>
                        <td className='p-2'><AddToCartBtn product={product} showSubTotal={false} className='w-full'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  )
};

export default FavoriteProducts
