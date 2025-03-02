'use client'

import { db } from '@/lib/firebase';
import { Order } from '@/type';
import { collection, query, deleteDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import OrderLoader from './OrderLoader';
import Title from './Title';
import { Card, CardContent } from './ui/card';
import PriceFormat from './PriceFormat';
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { MdClose, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { FileX } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Orders = () => {
    const { data: session } = useSession();
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [orderLoading, setOrderLoading] = useState(false);

    const toggoleDetails = (orderId: string) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    const handleDeleteOrder = async (id: string) => {
        const confirmed = window.confirm('Are you sure to delete this order?');
        if (confirmed) {
            setOrderLoading(true);
            try {
                await deleteDoc(doc(db, 'users', session?.user?.email as string, 'orders', id));
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error('An error occurred while deleting the order');
                }
            } finally {
                toast.success('Order deleted successfully!');
                setOrderLoading(false);
            }
        }
    };

    const [ordersSnapshot, loading] = useCollection(
        session?.user &&
        query(collection(db, "users", session?.user?.email as string, "orders"))
    );

    const orders = ordersSnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Order[];

    return (
        <div>
            {loading || orderLoading ? <OrderLoader /> : (
                <div>
                    {orders?.length > 0 && <Title>My Orders List: </Title>}
                </div>
            )}
            {orders?.length ? (
                orders?.map((item) => (
                    <div key={item?.id}>
                        <Card
                            className={
                                expandedOrderId === item.id
                                    ? "border-amazonOrangeDark/30"
                                    : ""
                            }
                        >
                            <CardContent className='p-2'>
                                <div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center'>
                                    <div>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            Order Id
                                        </p>
                                        <p className='text-base font-semibold'>
                                            {item.id.slice(-10)}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        Total Amount
                                    </p>
                                    <PriceFormat amount={item?.value?.amount} className='text-lg font-semibold' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        Payment Status
                                    </p>
                                    <Badge variant='default'>Paid</Badge>
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        Order Date
                                    </p>
                                    <p className='text-base'>
                                        {format(new Date(item?.createdAt), "MMM dd, yyyy")}
                                    </p>
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant='outline' size='icon' onClick={() => toggoleDetails(item.id)}>
                                                    {expandedOrderId ? (
                                                        <MdExpandLess size={20} />
                                                    ) : (
                                                        <MdExpandMore size={20} />
                                                    )}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {expandedOrderId
                                                        ? "Hide Details"
                                                        : "Show Details"
                                                    }
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant='destructive'
                                                size='icon'
                                                onClick={() => handleDeleteOrder(item?.id)}
                                            >
                                                <MdClose size={20} />
                                            </Button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))
            ) : (
                <div className='flex flex-col items-center justify-center py-5 md:py-10 px-4'>
                    <FileX className='h-24 w-24 text-gray-400 mb-4' />
                    <Title className='text-amazonBlue'>No Orders Found</Title>
                    <p className='text-sm text-gray-600 mt-2 text-center max-w-md'>
                        It looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here!
                    </p>
                    <Button asChild className='mt-6'>
                        <Link href={'/'}>Browse Products</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Orders;