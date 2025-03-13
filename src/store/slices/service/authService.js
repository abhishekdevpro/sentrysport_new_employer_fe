import axiosInstance from "./axiosInstance";

// Function to send OTP to the user's email
export const handleSendOTP = async (email) => {
   try {
      const response = await axiosInstance.post("/user/auth/login-otp", { email });

      return response; // Return only the response data
   } catch (error) {
      throw new Error(error.response?.data?.message || "Error while sending OTP.");
   }
};

// Function to verify OTP login
export const verifyOtpLogin = async (email, otp) => {
   try {
      const response = await axiosInstance.post("/user/auth/login-verify-otp", { email, otp });

      return response; // Return the token if available
   } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid OTP. Please try again.");
   }
};

// Function to resend OTP
export const resendOtp = async (email) => {
   try {
      const response = await axiosInstance.post("/user/auth/login-otp", { email });

      return response; // Return only response data for consistency
   } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to resend OTP.");
   }
};

// export const handleGoogleSignIn = async()=>{
//    try {
//       const response = await axiosInstance.get('/user/auth/google')
//       if (response.status === 200) {
//          console.log("Google sign-in token:", response.data.data);
//          window.open(response.data.data, "_self"); // Open in same tab
//          return response.data;
//       } else {
//          throw new Error("Google sign-in failed.");
//       }
//    } catch (error) {
//       console.error("Google sign-in error:", error);
//       throw new Error(error.response?.data?.message || "Google sign-in failed.");
//    }
// }
