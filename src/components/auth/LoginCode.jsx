import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Constant } from "@/utils/constant/constant";

const LoginCode = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "https://api.sentryspot.co.uk";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to login if no email found
      toast.error("Email not found. Please login again.");
    //   navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const { otp } = data;
    
    if (otp.length !== 6) {
      setError("otp", { 
        type: "manual", 
        message: "Please enter a valid 6-digit OTP." 
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/auth/login-verify-otp`,
        { email, otp }
      );

      const token = response.data?.data?.token;
      
      if (token) {
        localStorage.setItem(Constant.USER_TOKEN, token);
        toast.success("Login successful!");
        navigate("/employers-dashboard/my-profile");
      } else {
        toast.error("Invalid response from server. Token not found.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      // Do not redirect on error, allow the user to try again
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/user/auth/login-otp`,
        { email }
      );
      
      if (response.status === 200) {
        toast.success("New OTP sent to your email.");
      } else {
        toast.error("Failed to send new OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/"
          className="text-blue-600 flex items-center mb-6 hover:text-blue-700"
        >
          <span className="mr-2">←</span> Back
        </Link>

        {/* Logo (Replace with your import or img tag) */}
        <div className="flex justify-center mb-6">
          <img
            src="https://htmlsentryspot.vercel.app/img/company_logo.png" 
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Sign in with login code
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We have sent your one-time passcode to <br />
          <strong className="text-blue-700">{email}</strong>. This passcode will
          expire after 5 minutes.
        </p>

        {/* Form with react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Input */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Enter 6-digit code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("otp", { 
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit OTP"
                }
              })}
              maxLength={6}
              className="w-full text-center text-xl py-2 px-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="______"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center mt-4 space-y-2">
          <button 
            onClick={handleResendCode}
            className="text-blue-600 font-semibold hover:text-blue-700 text-sm"
            disabled={loading}
          >
            Resend verification code
          </button>
          <p>
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 text-sm">
              Don't have access to this email?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCode;