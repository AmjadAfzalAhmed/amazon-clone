import { auth } from '@/auth'
import CartProducts from '@/components/CartProducts'
import Container from '@/components/Container'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Cart | Amazon Online Store",
  description: "Amazon clone for learning purpose",
};
const CartPage = async () => {
    const session = await auth();
    if(!session) return redirect('/login');

  return (
    <Container className='py-10'>
        <CartProducts />
    </Container>
  )
}

export default CartPage
