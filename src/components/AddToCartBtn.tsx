'use client'

import { store } from '@/lib/store'
import { cn } from '@/lib/utils';
import { Product } from '@/type';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaPlus,FaMinus } from "react-icons/fa";
import PriceFormat from './PriceFormat';
import { Button } from './ui/button';

interface Props {
    product: Product;
    className?: string;
    showSubTotal?: boolean;
}

const AddToCartBtn = ({ product, className, showSubTotal }: Props) => {
        const {addToCart,cartProduct,decreaseQuantity} =store();
        const [existingProduct, setExistingProduct] = useState<Product | null>(null);
    
        useEffect(() => {
            const availableItem = cartProduct?.find(
                (item) => item?.id === product?.id);
                setExistingProduct(availableItem || null)
        },[product,cartProduct]);
        
        const handleAddToCart = () => {
            if(product){
                addToCart(product);
                toast.success(`${product?.title.substring(0,10)}...added successfully!`)
            }
        };

        const handleDeleteProduct = () => {
            if(existingProduct){
                if((existingProduct?.quantity as number) > 1 ){
                    decreaseQuantity(existingProduct?.id)
                    toast.success(`${product?.title?.substring(0,10)} decreased successfully`);
                }else{
                    toast.error('You cannot decrease less than 1')
                }
            }
        }

    return (
        <>
        {existingProduct?
        <div className='flex items-center justify-between'>
            <div className='flex self-start items-center justify-center gap-2 py-2 mb-2'>
                <Button 
                disabled={(existingProduct?.quantity as number) <= 1}
                onClick={handleDeleteProduct} className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 border-skyText rounded-full text-sm hover:bg-white hoverEffect disabled:text-gray-300 disabled:hover:bg-[#f7f7f7]'><FaMinus /></Button>
                <p>{existingProduct?.quantity}</p>
                <Button onClick={handleAddToCart} className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 border-skyText rounded-full text-sm hover:bg-white hoverEffect disabled:text-gray-300 disabled:hover:bg-[#f7f7f7]' ><FaPlus /></Button>
                {existingProduct && showSubTotal && 
                <div>
                <p>Subtotal:</p>
                <PriceFormat amount={(existingProduct?.quantity as number) * existingProduct?.price} />
                </div>}
            </div>
        </div>
        :<Button className={cn(
            'text-sm tracking-wide font-medium mb-2 border border-amazonBlue/50 py-2 w-full rounded-full bg-amazonLight/10 hover:bg-amazonYellowDark hoverEffect',
            className)} onClick={handleAddToCart}>Add to Cart</Button>}            
        </>
    )
}

export default AddToCartBtn