'use client'

import { db } from "@/lib/firebase";
import { Order } from "@/type";
import { collection, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const OrderBtn = () => {
  const { data: session } = useSession();
  const [orderSnapshot, loading, error] = useCollection(
    session?.user &&
      query(collection(db, "users", session.user.email as string, "orders"))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  const orders = orderSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  return (
    <Link
      href={"/orders"}
      className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
    >
      <p>Orders</p>
      <p className="text-white font-bold">& Itemlists</p>

      <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazonOrangeDark font-medium rounded-sm">
        {orders?.length ?? 0}
      </span>
    </Link>
  );
};

export default OrderBtn;