// app/api/stripe/webhook/route.js 
import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/config/db-connect";
import Booking from "@/models/Booking";
import Yatra from "@/models/Yatra";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

    await dbConnect();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) return NextResponse.json({ received: true });

      const booking = await Booking.findById(bookingId);
      if (!booking) return NextResponse.json({ received: true });

      // idempotency: if already confirmed, ignore
      if (booking.status === "confirmed") {
        return NextResponse.json({ received: true });
      }

      // mark confirmed
      booking.status = "confirmed";
      booking.paymentIntentId = session.payment_intent || session.id;
      booking.meta = { stripeSession: session };
      await booking.save();

      // (You already decreased seats when reserving)
      // Optionally send confirmation email here

    } else if (event.type === "checkout.session.expired" || event.type === "payment_intent.payment_failed") {
      // release seats if any
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) return NextResponse.json({ received: true });

      const booking = await Booking.findById(bookingId);
      if (!booking) return NextResponse.json({ received: true });

      if (booking.status === "reserved" || booking.status === "pending") {
        // mark failed
        booking.status = "failed";
        await booking.save();

        // increment seats back
        await Yatra.findByIdAndUpdate(booking.yatraId, { $inc: { seatsAvailable: booking.quantity } });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook signature/processing error:", err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
