import { cn } from '@/lib/utils';
import { Product } from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductIcon from './ProductIcon';
import PriceFormat from './PriceFormat';
import AddToCartBtn from './AddToCartBtn';

const ProductCard = ({ product, className }: { product: Product; className?: string }) => {
  return (
    <div className={cn("border border-gray-200 hover:border-amazonLight/30 rounded-md bg-white overflow-hidden z-10 hoverEffect",className)}>
      <div className='relative group overflow-hidden h-72 w-full'>
        <Link href={`/product/${product?.id}`}>
          <Image src={product?.thumbnail}
            alt={product?.title}
            width={600} height={600}
            loading="lazy"
            className='w-full h-full object-contain bg-[#f8f8f8] group-hover:scale-110 overflow-hidden hoverEffect '
          />
          <ProductIcon product={product} />
        </Link>
      </div>
      <div className='px-4 py-2 space-y-2'>
        <div className='space-y-1 h-36'>
          <h2 className='line-clamp-1'>{product?.title}</h2>
          <p className='text-sm text-amazonBlue/90 line-clamp-3'>{product?.description}</p>
          <PriceFormat amount={product?.price}/>
          <p className='text-sm'>Category:<span className='font-semibold'>{product?.category}</span></p>
        </div>
        <AddToCartBtn product={product} />
      </div>
    </div>
  )
}

export default ProductCard