import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleSendOTP, resendOtp, sendAuthCode, verifyOtpLogin } from "./service/authService";
import { Constant } from "@/utils/constant/constant";
import axiosInstance from "@/utils/axiosInterceptor";
import { useNavigate } from "react-router-dom";

// Async thunk to send OTP
export const sendOtp = createAsyncThunk("auth/sendOtp", async (email, { rejectWithValue }) => {
   try {
      const response = await handleSendOTP(email);
      return response; // API response data
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

// Async thunk to verify OTP
export const loginWithOtp = createAsyncThunk("auth/loginWithOtp", async ({ email, otp }, { rejectWithValue }) => {
   try {
      const response = await verifyOtpLogin(email, otp);
      console.log(response,"Api response");
      return response;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

// Async thunk to resend OTP
export const resendOtpAction = createAsyncThunk("auth/resendOtp", async (email, { rejectWithValue }) => {
   try {
      const response = await resendOtp(email);
      return response;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const authenticateUser = createAsyncThunk("auth/authenticateUser", async (code, { rejectWithValue }) => {
   try {
     const userData = await sendAuthCode(code);
   //   console.log(userData,"LLLLL");
     return userData; // Return user data to be stored in Redux
   } catch (error) {
     return rejectWithValue(error.message); // Handle errors
   }
});

// New thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
   "auth/updateUserProfile",
   async (formData, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(
            "https://api.sentryspot.co.uk/api/employeer/profile",
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            }
         );
         console.log(response.data.data,"updated user");
         return response.data.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   }
);

const initialState = {
   userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
   userToken: localStorage.getItem(Constant.USER_TOKEN) || null,
   status: false,
   loading: false,
   error: null,
};
const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logout: (state) => {
         state.userInfo = null;
         state.userToken = null;
         state.status = false;
         localStorage.removeItem("userInfo");
         localStorage.removeItem(Constant.USER_INFO);
         localStorage.removeItem(Constant.USER_TOKEN);
      },
      clearAuth: (state) => {
         state.userInfo = null;
         state.userToken = null;
         state.status = false;
         localStorage.removeItem("userInfo");
         localStorage.removeItem(Constant.USER_INFO);
         localStorage.removeItem(Constant.USER_TOKEN);
      }
   },
   extraReducers: (builder) => {
      builder
         // Send OTP
         .addCase(sendOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(sendOtp.fulfilled, (state) => {
            state.loading = false;
            state.status = true; // OTP Sent Successfully
         })
         .addCase(sendOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Verify OTP & Login
         .addCase(loginWithOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(loginWithOtp.fulfilled, (state, action) => {
            console.log(action.payload,"payload");
            state.loading = false;
            state.userInfo = action.payload.data; // ✅ Store user data
            state.userToken = action.payload.data.token; // ✅ Store token in state
            state.status = true;
            localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
            localStorage.setItem(Constant.USER_TOKEN, action.payload.data.token);
        })
         .addCase(loginWithOtp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Resend OTP
         .addCase(resendOtpAction.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(resendOtpAction.fulfilled, (state) => {
            state.loading = false;
         })
         .addCase(resendOtpAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         
         // Authenticate user
         .addCase(authenticateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload; // Store user data
            state.userToken = action.payload.token; // Store token
            state.status = true;
 
            // Save user data and token in localStorage
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            // localStorage.setItem("usertoken", action.payload.token);
         })
         .addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         
         // Update user profile
         .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            
            // Update the userInfo with the new data
            if (action.payload) {
               state.userInfo = {
                  ...state.userInfo,
                  ...action.payload
               };
               
               // Update localStorage
               localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
            }
         })
         .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { logout, clearAuth } = authSlice.actions;
export default authSlice.reducer;
