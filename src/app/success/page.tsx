// SuccessPage.tsx
'use client'

import Container from '@/components/Container';
import { store } from '@/lib/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Suspense } from 'react';

const SuccessPageContent = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const router = useRouter();
    const { resetCart } = store();
    const { data: session } = useSession();

    useEffect(() => {
        if (!sessionId && !session?.user) {
            router.push("/");
        } else {
            resetCart();
            toast.success("Payment successful");
        }
    }, [sessionId, router, resetCart, session?.user]);

    return (
        <Container className='py-10'>
            <div className='min-h-[400px] flex flex-col items-center gap-y-5'>
                <h2 className='text-2xl font-bold md:text-4xl text-center text-amazonBlue tracking-tight'>Your payment has been accepted by Amazon.com</h2>
                <p>You can view your cart or continue shopping with us</p>
                <div className='flex items-center gap-x-5'>
                    <Link href={"/orders"}>
                        <button onClick={() => router.push("/orders")} className='bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300'>View Orders</button>
                    </Link>
                    <Link href={"/"}>
                        <button onClick={() => router.push("/")} className='bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300'>Continue Shopping</button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

const SuccessPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    );
};

export default SuccessPage;