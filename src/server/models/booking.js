// models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    yatraId: { type: mongoose.Schema.Types.ObjectId, ref: "Yatra", required: true },
    slug: { type: String },                     // convenience
    name: { type: String },                     // guest name (optional if you don't store PII)
    email: { type: String },                    // optional (store if you want to email)
    phone: { type: String },                    // optional
    quantity: { type: Number, default: 1 },     // seats booked
    status: {
      type: String,
      enum: ["pending", "reserved", "confirmed", "failed", "cancelled", "refunded"],
      default: "pending",
    },
    amount: { type: Number, required: true },   // amount in smallest currency unit? (we store full float)
    currency: { type: String, default: "INR" },
    paymentProvider: { type: String, default: "stripe" },
    paymentIntentId: { type: String },          // Stripe PaymentIntent / Checkout session id
    paymentMethod: { type: String },
    meta: { type: mongoose.Schema.Types.Mixed },

    // reservation / timeout
    reservedUntil: { type: Date },              // when a reservation expires (if pending/reserved)
    createdByIp: { type: String },

    // Admin & audit
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  },
  { timestamps: true }
);

BookingSchema.index({ yatraId: 1 });
BookingSchema.index({ paymentIntentId: 1 }, { unique: true, sparse: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
