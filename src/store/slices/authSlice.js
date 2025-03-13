import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleSendOTP, resendOtp, verifyOtpLogin } from "./service/authService";

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

const initialState = {
   userInfo: null,
   userToken: null,
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
         localStorage.removeItem("token");
      },
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
            state.loading = false;
            state.userToken = action.payload;
            state.status = true;
            localStorage.setItem("usertoken", action.payload);
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
         });
   },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
