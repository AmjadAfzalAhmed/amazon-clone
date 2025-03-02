'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import PriceFormat from './PriceFormat';
import { calculateCartTotals } from '@/lib/utils';
import { store } from '@/lib/store';


const CartSummary = () => {
  const {data: session} = useSession();
  const {cartProduct} = store()
  const {totalAmt} = calculateCartTotals();
  const [loading,setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartProduct,
          email: session?.user?.email,
        }),
      });
      const result = await response.json()
      const checkoutUrl = await result?.url
      if(checkoutUrl){
        window.location.href = checkoutUrl
      }
      if(result?.error){
        alert(result?.error.message)
      }
    } catch (error) {
      console.log("Error in payment", error);
      setLoading(false);
    }
};

  return (
    <section className='mt-16 lg:mt-0 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8'>
      <div>
        <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
        <dl className='mt-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <dt className='text-sm text-gray-900'>Subtotal</dt>
            <dd>
              <PriceFormat amount={totalAmt.regular} /> 
            </dd>
          </div>
          <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
            <dt className='text-sm text-gray-900'>
              Total Discount
            </dt>
            <dd>
              <PriceFormat amount={totalAmt.discounted} />
            </dd>
          </div>
          <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
            <dt>
              Payable Amount
            </dt>
            <dd>
              <PriceFormat amount={totalAmt.regular - totalAmt.discounted} className='text-lg font-bold'/>
            </dd>
          </div>
        </dl>
      </div>
      <button type='submit'
      disabled={!session?.user ||  loading}
      onClick={handlePayment}
      className='w-full rounded-md mt-6 border border-transparent bg-amazonLight px-4 py-3 
      text-base font-medium text-white shadow-sm hover:bg-amazonBlue
      hoverEffect focus:outline-none focus:ring-2 focus:ring-amazonOrangeDark disabled:bg-gray-400 disabled:cursor-not-allowed'>
        Checkout
      </button>
    </section>
  )
}

export default CartSummary
