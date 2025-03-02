import { auth } from '@/auth'
import Container from '@/components/Container';
import Orders from '@/components/Orders';
import { redirect } from 'next/navigation';
import React from 'react'

const OrdersPage = async () => {
    const session = await auth();
    if(!session?.user) return redirect('/');
    return <div className='py-10'>
        <Container>
            <Orders />
        </Container>
      
    </div>
  
}

export default OrdersPage
