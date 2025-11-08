// server/actions/bookings.js
"use server";
import dbConnect from "@/config/db-connect";
import Yatra from "@/models/Yatra";
import Booking from "@/models/Booking";
import { getActionSuccessResponse, getActionFailureResponse } from "@/utils";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createBooking = async ({ yatraId, quantity = 1, customer = {}, currency = "INR", returnUrl }) => {
  try {
    await dbConnect();

    if (!yatraId || !mongoose.Types.ObjectId.isValid(yatraId)) {
      return getActionFailureResponse("Invalid yatra id", "toast");
    }
    quantity = Number(quantity) || 1;
    if (quantity <= 0) return getActionFailureResponse("Invalid quantity", "toast");

    // 1) Read yatra
    const yatra = await Yatra.findById(yatraId).lean();
    if (!yatra) return getActionFailureResponse("Yatra not found", "toast");

    // 2) Atomic decrement of seats
    const updatedYatra = await Yatra.findOneAndUpdate(
      { _id: yatraId, seatsAvailable: { $gte: quantity } },
      { $inc: { seatsAvailable: -quantity } },
      { new: true }
    );

    if (!updatedYatra) {
      return getActionFailureResponse("Not enough seats available", "toast");
    }

    // 3) create booking (reserved)
    const amount = Number(yatra.price) * quantity; // store as float; for Stripe pass in smallest currency unit
    const reservedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const booking = await Booking.create({
      yatraId,
      slug: yatra.slug,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      quantity,
      status: "reserved",
      amount,
      currency,
      reservedUntil,
    });

    // 4) Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: currency.toLowerCase(),
          product_data: { name: `${yatra.title} — ${quantity} seat(s)` },
          unit_amount: Math.round(amount * 100), // in cents/paise
        },
        quantity: 1,
      }],
      metadata: {
        bookingId: String(booking._id),
        yatraId: String(yatra._id),
      },
      success_url: `${returnUrl || process.env.APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl || process.env.APP_URL}/booking/cancel?bookingId=${booking._id}`,
    });

    // store paymentIntent/session id
    booking.paymentIntentId = session.payment_intent || session.id;
    await booking.save();

    return getActionSuccessResponse({ sessionUrl: session.url, sessionId: session.id, bookingId: booking._id });
  } catch (err) {
    console.error("createBooking error:", err);
    return getActionFailureResponse(err.message || "Error", "toast");
  }
};
