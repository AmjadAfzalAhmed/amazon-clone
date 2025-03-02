import React from 'react'
import PriceFormat from './PriceFormat';

interface Props {
    regularPrice?:number;
    discountedPrice?:number;
    className?:string
}

const PriceTag = ({regularPrice}:Props) => {
  return (
    <div>
        <PriceFormat amount={regularPrice || 0}  />
    </div>
  )
}

export default PriceTag