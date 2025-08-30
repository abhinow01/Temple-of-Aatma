"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { login } from "@/server/actions/login";
// import { revalidatePath } from "next/cache";
import { RevalidatePath } from "@/server/actions/revalidate-path";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ForgotPasswordModal from "./ForgotPasswordModal";
export default function LoginPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const resp = await login({ email, password });
    console.log("RESP" , resp)

    if (resp) {
      toast.success("Login successful");
      RevalidatePath("/admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-1/2 px-10 bg-white">
        <h1 className="text-4xl font-bold text-primary">
          Hey Sanya !
        </h1>
        {/* <p className="mt-4 text-2xl font-semibold text-gray-700">
          The leading exhibit display design studio in usa
        </p> */}
        <p className="mt-2 text-sm text-gray-500">
          Welcome back! Please login to your admin panel.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 text-sm text-gray-700"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                className="rounded border-gray-300"
              />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <Dialog>
            <DialogTrigger asChild>
            <Link href="#" className="text-primary hover:underline">
              Forgot Password?
            </Link>
            </DialogTrigger>
            <DialogContent className="h-[350px] overflow-auto">
            <ForgotPasswordModal />
          </DialogContent>
            </Dialog>
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-black/90"
          >
            Login
          </Button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <Image
loading="eager"
          src="/admin-login.svg"
          alt="Biker"
          width={400}
          height={400}
          className="h-auto"
        />
      </div>
    </div>
  );
}
