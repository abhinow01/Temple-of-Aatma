"use client";
import { useState } from "react";
import { toast } from "sonner";
import { forgotPassword } from "@/server/actions/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await forgotPassword({ email });

    setLoading(false);
    if (response.success) {
      toast.success(response.message);
      closeModal();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <DialogTitle className="text-xl font-semibold">Reset Password</DialogTitle>
      <DialogDescription className="text-sm text-gray-600">
        Enter your email to receive a password reset link.
      </DialogDescription>

      <form  className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <Button type="button" className="w-full" disabled={loading} onClick={handleSubmit}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
