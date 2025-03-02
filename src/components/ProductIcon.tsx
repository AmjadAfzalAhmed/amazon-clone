'use client'

import { store } from '@/lib/store'
import { Product } from '@/type'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

const ProductIcon = ({product}:{product:Product}) => {
    const {favoriteProduct, addToFavorite} =store();
    const [existingProduct, setExistingProduct] = useState<Product | null>(null);

    useEffect(() => {
        const availableItem = favoriteProduct?.find(
            (item) => item?.id === product?.id);
            setExistingProduct(availableItem || null)
    },[product,favoriteProduct])

    const handleFavorite = (e:React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        if(product){
            addToFavorite(product).then(() =>{
                toast.success(existingProduct?`${product?.title.substring(0,10)} removed successfully!`
                :`${product?.title.substring(0,10)} added successfully!`)
            })
        }
    }
  return (
    <div className='absolute top-2 right-2 flex items-center gap-2'>
        <p className='bg-transparent text-amazonBlue border border-amazonBlue group-hover:bg-amazonBlue
        group-hover:text-white text-xs rounded-full py-1 px-2 hoverEffect'>
            {product?.discountPercentage}%</p>
        <span className='text-xl z-40' onClick={handleFavorite}>
            {existingProduct? <MdFavorite />: <MdFavoriteBorder/>}</span>
    </div>
  )
}

export default ProductIcon