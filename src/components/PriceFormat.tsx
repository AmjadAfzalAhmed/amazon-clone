import { cn } from '@/lib/utils';
import React from 'react'


interface Props{
    amount:number;
    className?:string
}
const PriceFormat = ({amount,className}:Props) => {
    const formattedPrice = new Number(amount).toLocaleString('en-Us',{
        style:'currency',
        currency:'USd',
        minimumFractionDigits: 2,
    })
  return (
    <p className={cn('text-base font-semibold',className)}>{formattedPrice}</p>
  )
}

export default PriceFormat