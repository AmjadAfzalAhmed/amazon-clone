import { Product } from '@/type'
import React from 'react'
import ProductImage from './ProductImage'
import PriceFormat from './PriceFormat'
import { MdStar } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa'
import AddToCartBtn from './AddToCartBtn'
import { paymentImage } from '@/assets'
import Image from 'next/image'

const SingleProduct = ({ product }: { product: Product }) => {
  return (
    <div className='grid gird-cols-1 md:grid-cols-2 gap-10'>
      <ProductImage product={product} />
      <div className='text-2xl font-bold gap-3'>
        {product?.title}
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <PriceFormat amount={product?.price + product?.discountPercentage / 100} className='line-through font-medium text-gray-500 text-xl' />
            <PriceFormat amount={product?.price} className='text-amazonBlue font-bold text-xl' />
          </div>
          <div>
            <div className='text-base text-lightText flex items-center'>
              {Array?.from({ length: 5 })?.map((_, index) => {
                const filled = index + 1 <= Math.floor(product?.rating)
                const halfFilled = index + 1 > Math.floor(product?.rating) &&
                  index < Math.ceil(product?.rating)
                return <MdStar key={index} className={`${filled ? 'text-amazonOrangeDark' : halfFilled ? 'text-amazonYellowDark' : 'text-lightText'}`} />
              })}
            </div>
            <p className='text-sm'>{`(${product?.rating?.toFixed(1)}) reviews`}</p>
          </div>          
        </div>

        <p className='flex items-center text-xl font-medium gap-2 mt-2'>
          <FaRegEye/> <span>250+ <span className='text-gray-500'>people are viewing this product</span>
        </span></p>

        <p className='text-xl flex items-center gap-1 mt-2'>
          You are saving <PriceFormat amount={product?.discountPercentage / 100 } className='text-gray-500'/>
          <span>upon purchase</span>
        </p>

        <div className='description gap-3 text-justify'>
          <p className='text-sm tracking-wide'>
            {product?.description}
          </p>

          <p className='text-base'>
            {product?.warrantyInformation}
          </p>

          <p className='text-base mt-3'>
            Brand: <span className='text-gray-500'>{product?.brand}</span>
          </p>

          <p className='text-base mt-2'>
            Category: <span className='text-gray-500'>{product?.category}</span>
          </p>

          <p className='text-xl font-medium mt-2'>Tags: {product?.tags?.map((item,index) =>(
            <span key={index} className='text-gray-500'>{item}
            {index <product?.tags?.length -1 && ','}
            </span>
          ))}</p>

          <div>
            <AddToCartBtn product={product} />
          </div>

          <div className='bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2'>
            <Image src={paymentImage} alt='paymentImage' className="w-auto object-cover" /> 
            <p className='font-semibold text-xl'>Guaranteed safe & secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct