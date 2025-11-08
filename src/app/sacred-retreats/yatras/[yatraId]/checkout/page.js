"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutWrapper from "@/components/_components/CheckoutForm";
export default function CheckoutPage({ params }) {
  const { yatraId } = use(params);
  const searchParams = useSearchParams();
  const [checkoutData, setCheckoutData] = useState(null);
  console.log("search params" , searchParams.get("name"))
  useEffect(() => {
    async function initCheckout() {
      const body = {
        yatraId: yatraId,
        name: searchParams.get("name"),
        email: searchParams.get("email"),
        phone: searchParams.get("phone"),
        quantity: Number(searchParams.get("quantity")) || 1,
        currency: "inr",
      };

      const res = await fetch("/api/bookings/yatra/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log("data" , data)
      if (res.ok) setCheckoutData(data);
    }
    initCheckout();
  }, [yatraId, searchParams]);

  if (!checkoutData) return <p>Loading checkout...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-center">Complete Your Booking</h1>
      <CheckoutWrapper
        clientSecret={checkoutData.clientSecret}
        bookingId={checkoutData.bookingId}
      />
    </div>
  );
}
