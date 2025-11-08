"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ clientSecret, bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      alert(error.message);
    } else {
      window.location.href = `/success?booking=${bookingId}`; // ✅ fixed string template
    }
  };

  return (
    <div className="max-w-md mx-auto border p-4 rounded-xl bg-white shadow">
      <p className="text-center text-lg mb-4">
        ⏳ Time left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>
      <form onSubmit={handleSubmit}>
        <CardElement className="p-3 border rounded-lg" />
        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
          disabled={!stripe}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default function CheckoutWrapper({ clientSecret, bookingId }) {
  const options = { clientSecret }; // ✅ fix malformed JSX
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm clientSecret={clientSecret} bookingId={bookingId} />
    </Elements>
  );
}
