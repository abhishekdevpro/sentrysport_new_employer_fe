import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SubscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const { email } = data;
  
    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/user/user-subscribe",
        { email }
      );
  
      if (response.status === 200) {
        toast.success(response.data.message || "Email Subscribed Successfully!");
        reset(); // Reset form only on success
      } else {
        toast.error(response.data.message || "Error while Subscribing!");
      }
    } catch (error) {
      console.error("Subscription Error:", error);
  
      // Handle network/server errors
      toast.error(
        error.response?.data?.message || "Something went wrong! Please try again."
      );
      reset()
    }
  };

  return (
    <div className="w-full md:w-auto mb-6 md:mb-0">
      <h2 className="text-lg font-semibold text-white">Get Our Weekly</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {/* Email Input */}
        <input
          type="email"
          placeholder="Type your email..."
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          })}
          className="p-1 rounded text-black border border-gray-300"
        />
        
        {/* Subscribe Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="md:px-4 md:py-1 p-1 rounded-md bg-blue-600 text-white hover:bg-blue-300 transition duration-300"
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {/* Error Message */}
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}

      {/* Success Message */}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
};

export default SubscriptionForm;
