"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { getSingleYatra } from "@/server/actions/yatras";

export default function BookingPage({ params }) {
  const router = useRouter();
  const { yatraId } = use(params);

  const [yatra, setYatra] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
  });

  useEffect(() => {
    async function fetchYatra() {
      const res = await getSingleYatra({ _id: yatraId });
      if (res?.success) setYatra(res?.data);
    }
    fetchYatra();
  }, [yatraId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.phone) {
    toast.error("Please fill all fields");
    return;
  }

  toast.success("Redirecting to Stripe...");

  try {
    const res = await fetch("/api/bookings/yatra/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        yatraId,
        ...form,
        currency: "inr",
      }),
    });

    const data = await res.json();
    if (res.ok && data.url) {
      // ✅ Redirect user to Stripe hosted checkout page
      window.location.href = data.url;
    } else {
      toast.error(data.error || "Something went wrong while creating checkout.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Payment initialization failed.");
  }
};

  const total = (yatra?.price || 0) * Number(form.quantity || 1);
  // Create initials for fallback
  const getInitials = (str = "") =>
    str
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
const img = yatra?.images?.[0];

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-500 text-white py-16 shadow-xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold drop-shadow-md">{yatra?.title}</h1>
          <p className="mt-3 text-lg text-amber-100">Booking Form</p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-16">
        
        {/* Left Image */}
        <div className="w-full h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg">
          {img ? (
            <Image
              src={img}
              alt={yatra.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-amber-400 flex items-center justify-center text-white text-6xl font-bold">
              {yatra?.title?.[0] || "Y"}
            </div>
          )}
        </div>

        {/* Right Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Book Your Yatra</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              name="quantity"
              type="number"
              min="1"
              className="w-full p-3 border rounded-lg"
              value={form.quantity}
              onChange={handleChange}
            />

            {/* Total */}
            <div className="text-right text-lg font-semibold text-green-700">
              Total: ₹{total.toLocaleString("en-IN")}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
    );
}
