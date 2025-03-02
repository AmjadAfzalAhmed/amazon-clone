'use client'

import { store } from '@/lib/store'
import { Product } from '@/type'
import Link from 'next/link'
import CartProduct from './CartProduct'
import CartSummary from './CartSummary'

const CartProducts = () => {
    const { cartProduct } = store()
    console.log(cartProduct)
    return (
        <div>
            {cartProduct?.length > 0 ? (
                <>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <div className='mt-10 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start'>
                        <section className='lg:col-span-7'>
                            <div className='divide-y divide-gray-200 border-b border-t border-gray-200 last:border-b-0'>
                                {cartProduct.map((product: Product) => (
                                    <CartProduct key={product?.id} product={product} />
                                ))}
                            </div>                            
                        </section>
                        <CartSummary />
                    </div>
                </>
            ) : (
                <div className="bg-white h-96 my-10 flex flex-col gap-4 items-center justify-center py-5 rounded-lg drop-shadow-2xl border border-gray-200">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <p className='text-base max-w-[700px] text-center text-gray-600 tracking-wide leading-6'>
                        Your cart is empty. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Quia possimus nesciunt quo quam aliquid numquam earum sint sit
                        nisi, repudiandae at ducimus quod eius, dignissimos laborum, ipsam
                        dolores architecto deserunt!
                    </p>
                    <Link
                        href="/"
                        className="bg-gray-800 text-gray-200 px-8 py-2 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>

    )
}

export default CartProducts
