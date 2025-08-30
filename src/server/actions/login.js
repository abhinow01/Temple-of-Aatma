"use server";

import { jwtFuncs } from "@/utils";
import { cookies } from "next/headers";
import User from "../models/user"
import { getActionFailureResponse , getActionSuccessResponse } from "@/utils";
import { toast } from "sonner";
import crypto from "crypto";
// import { EmailService } from "../services/mailer/email-service";
import dbConnect from "@/config/db-connect";
const BASE_URL = process.env.BASE_URL || "http://localhost:10001"
 dbConnect();

const users = [
  {
    email: "admin@chronicles.com",
    password: "Chronicle@22"
  },
  {
    email: "rohit@chronicleexhibits.com",
    password: "Rohit@chronicles22"
  }
]

export const login = async ({ email, password }) => {
//   await dbConnect();
  // Mock authentication logic
  console.log("creds" , email , password)
  const user =  users.find(user => user.email === email); // add await 
  console.log("email from list " , user)
  if (!user.email) {
    return false;
  }

  if (user.password !== password) {
    return false;
  }
  const token = jwtFuncs.signJWT({ email }); // Sign the JWT

  // Set the JWT in cookies
  cookies().set({
    name: "authorization",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    path: "/",
    maxAge: 60 * 60 * 48,
  });

  return true;
};

export const logout = async () => {
  cookies().set({
    name: "authorization",
    value: "",
    path: "/",
    maxAge: -1
  })
  return true;
}

export const forgotPassword = async ({ email }) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found!" };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 15);
    user.token = resetToken;
    user.tokenExpiry = expiryTime; 
    console.log("user" , user)
    await user.save();
    console.log("user after saving " , user)
    const resetLink = `${BASE_URL}/reset-password?token=${resetToken}`;
    console.log("forgot password reset link " , resetLink)
    const emailSent = await sendResetLink({email : user.email, resetLink});

    if (!emailSent) {
      return { success: false, message: "Failed to send reset email" };
    }

    return { success: true, message: "Reset email sent successfully" };
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return { success: false, message: "Something went wrong!" };
  }
};


export const resetPassword = async ({token , newPassword}) =>{
  await dbConnect();
  const user = await User.findOne({token});
  if(!user){
    return getActionFailureResponse("user not found! ", "toast");
  }
  if(user.tokenExpiry && new Date() > user.tokenExpiry){
    user.token = null;
    user.tokenExpiry = null;
    await user.save();
    return { success: false, message: "Password reset link has expired. Request a new one!" }; // on page load , dont show ui if token is expired 
  }

  user.password = newPassword;
  user.token = null;
  user.tokenExpiry = null;
  await user.save();
  // send user to login page 
  return { success: true, message: "Password updated successfully  " };
}

export const sendResetLink = async ({email , resetLink}) =>{
  await dbConnect();
try{
  const mail = new EmailService("admin", "forgot-password");
  console.log("link",resetLink);
  const resp =  await mail.send({ resetLink }, "Password Reset Request");
  console.log("email response" , resp)
  return getActionSuccessResponse(resp);
}catch(error){
  return getActionFailureResponse(error);
}
}
export const checkIfTokenIsExpired = async (token) => {
  await dbConnect();
  const user = await User.findOne({ token });

  if (!user || !user.tokenExpiry) {
    return { success: true, message: "Invalid or expired token" };
  }
  if (new Date() > user.tokenExpiry) {
    return { success: true, message: "Token is expired" };
  }

  return { success: false, message: "Token is valid" };
};
