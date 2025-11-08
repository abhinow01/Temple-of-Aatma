// /app/api/bookings/create/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Booking from "@/server/models/booking";
import Yatra from "@/server/models/yatra";
import dbConnect from "@/config/db-connect";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia", // optional but recommended
});

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { yatraId, name, email, phone, quantity = 1, currency } = body;

    // 1️⃣ Validate Yatra
    const yatra = await Yatra.findById(yatraId);
    if (!yatra) {
      return NextResponse.json({ error: "Yatra not found" }, { status: 404 });
    }
        const updatedYatra = await Yatra.findOneAndUpdate(
          { _id: yatraId, seatsAvailable: { $gte: quantity } },
          { $inc: { seatsAvailable: -quantity } },
          { new: true }
        );
    if (!updatedYatra) {
      return getActionFailureResponse("Not enough seats available", "toast");
    }
    // 2️⃣ Check seat availability
    // if (yatra.availableSeats && yatra.availableSeats < quantity) {
    //   return NextResponse.json({ error: "Not enough seats available" }, { status: 400 });
    // }

    // 3️⃣ Create booking in "reserved" state
    const amount = Number(yatra.price) * quantity;
    const reservedUntil = new Date(Date.now() + 15 * 60 * 1000);

    const booking = await Booking.create({
      yatraId,
      slug: yatra.slug,
      name,
      email,
      phone,
      quantity,
      amount,
      status: "reserved",
      currency,
      paymentProvider: "stripe",
      reservedUntil,
      createdByIp: req.headers.get("x-forwarded-for") || "unknown",
    });

    // 4️⃣ Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: yatra.title },
            unit_amount: Math.round(yatra.price * 100),
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?booking=${booking._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?booking=${booking._id}`,
      metadata: {
        bookingId: booking._id.toString(),
        yatraId: yatra._id.toString(),
      },
    });
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100),
  currency: "inr",
  metadata: { bookingId: booking._id.toString(), yatraId: yatra._id.toString() },
});

// booking.paymentIntentId = paymentIntent.id;
// await booking.save();

// return NextResponse.json({
//   clientSecret: paymentIntent.client_secret,
//   bookingId: booking._id,
// });

    // 5️⃣ Store session ID for later reference
    booking.paymentIntentId = session.payment_intent || session.id;
    await booking.save();

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Booking create error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
