import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDB } from "../../../../firebase-admin";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      {
        error: "No Signature",
      },
      { status: 400 }
    );
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      {
        error: "Stripe webhook secret key is not set",
      },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.log("Webhook signature verification failed", error);
    return NextResponse.json(
      {
        error: `Webhook Error: ${error}`,
      },
      { status: 400 }
    );
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;
    const invoice_data = {
      id: invoice?.id,
      invoice_url: invoice?.hosted_invoice_url,
      invoice_pdf: invoice?.invoice_pdf,
    };
    try {
        // Get line items with product details
        const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(session?.id,{expand:['data.price.product']});
        const sessionProducts = lineItemsWithProduct?.data?.map((item) =>({
            id : item?.id,
            name : item?.description,
            product_details : item?.price?.product,
            quantity:item?.quantity,
            price: (item?.price?.unit_amount as number) / 100,
        }));
        const totalAmount = lineItemsWithProduct?.data?.reduce((total,item) => total+item?.amount_total/100,0
    );
    const orderItem={
        amount:totalAmount,
        items: sessionProducts || [],
        invoice: invoice_data,
    };
    if(sessionProducts?.length){
      const userOrdersRef=adminDB.collection('users').doc(
        session?.customer_email as string
      ).collection('orders').doc(session?.id);
      const userDoc = await userOrdersRef.get();
      if(!userDoc?.exists){
        await userOrdersRef.set({
          email:session?.customer_email
        });
      }
      await userOrdersRef.set({value:orderItem},{merge:true});

    }
        
    } catch (error) {
        console.log('Error creating order Firebase',error);
        return NextResponse.json({
            error: `Error creating order ${error}`,
        },{status:400});
        
    }
  }
  return NextResponse.json({received:true}) 
}
