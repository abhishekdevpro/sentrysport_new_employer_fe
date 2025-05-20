// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { LoginSchema } from "@/schema/LoginSchema";
// import { toggleSignupDialog } from "@/store/slices/auth";
// import { userLogin } from "@/store/slices/auth/actions";
// import ActionLoader from "../loader/ActionLoader";
// import { FcGoogle } from "react-icons/fc";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { BASE_URL } from "@/utils/constant/endPoints";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setIsLogin }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const { loading, userInfo, userToken, error, success, message } = useSelector(
//     (state) => state.auth
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(LoginSchema), // Connect Zod validation schema
//   });

//   // const submitHandler = async (e) => {
//   //   const { email, password } = e;
//   //   if (password && email) {
//   //     dispatch(
//   //       userLogin({
//   //         email,
//   //         password,
//   //       })
//   //     );
//   //   } else toast.error("please fill all the fields");
//   // };
   
//   const handleLogin = async(e)=>{
//     const {email} = e;
//     console.log(e);
//     if(!email){
//       return;
//     }
//     try {
//       const response = await axios.post(`${BASE_URL}/api/user/auth/login-otp`,{
//         email
//       })
//       if(response.status == 200){
//         toast.success(response.data.message || " Otp sent to your email.");
//         localStorage.setItem("userEmail", email);
//         // navigate("/login/login-code");
//       }
//       else{
//         toast.error(response.data.message || "Failed to Send OTP")
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   }
  
//   const handleGoogleSignin = async () => {
//     const url = `${BASE_URL}/api/user/auth/google`;

//     try {
//       const response = await axios.get(
//         url,
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         console.log("Google sign-in token: ", response.data.data);
//         window.open(response.data.data);
//       } else {
//         toast.error("Google sign-in failed.");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
//     }
//   };
//   return (
//     <Card className="w-[350px] sm:w-[400px] p-2 m-auto shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-3xl text-left font-ubuntu">
//           Get started for Free
//         </CardTitle>
//         {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
//       </CardHeader>
//       <CardContent>
//       <button
//             onClick={handleGoogleSignin}
//             type="button"
//             className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4 shadow-sm hover:bg-gray-100 focus:outline-none"
//           >
//             <FcGoogle className="h-6 w-6 mr-2" />
//             Continue with Google
//           </button>
//           <div className="p-4 flex justify-center items-center">
//             <p> OR</p>
//           </div>
//         <form
//           className="flex justify-between space-x-2 flex-wrap gap-4"
//           onSubmit={handleSubmit(handleLogin)}
//         >
//           <div className="flex flex-col w-full  gap-2">
//             <Label htmlFor="email" className="text-left">
//               Email
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               {...register("email")}
//               placeholder="Email"
//               className={`${errors.email && " !border-red-500"}`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>
//           {/* <div className="flex flex-col w-full  gap-2  ">
//             <Label htmlFor="password" className="text-left">
//               Password
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               {...register("password")}
//               placeholder="Password"
//               className={`${errors.password && " !border-red-500"}`}
//               onFocus={() => setShowTooltip(true)}
//               onBlur={() => setShowTooltip(false)}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//             <div className="flex justify-end">
//               <span
//                 className="cursor-pointer text-blue-900"
//                 onClick={setIsLogin}
//               >
//                 Forgot Password
//               </span>
//             </div>
//           </div> */}
//           <Button
//             type="submit"
//             size="sm"
//             className="px-3 py-4 w-full duration-300 bg-[#2d1f89] hover:bg-blue-800"
//           >
//             {loading ? <ActionLoader /> : "Send OTP"}
//           </Button>
//         </form>
//         <div className="mt-4">
//           <p className="text-center">
//             Don't have an account?{" "}
//             <span
//               className="cursor-pointer text-violet-500"
//               onClick={() => {
//                 dispatch(toggleSignupDialog());
//               }}
//             >
//               Register
//             </span>
//           </p>
//         </div>
//       </CardContent>
//       {/* <CardFooter className="flex justify-between">
//         <Button variant="outline">Cancel</Button>
//         <Button>Deploy</Button>
//       </CardFooter> */}
//     </Card>
//   );
// };

// export default Login;
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schema/LoginSchema";
import { toggleSignupDialog } from "@/store/slices/auth";
import ActionLoader from "../loader/ActionLoader";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "@/utils/constant/endPoints";
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn, handleSendOTP } from "@/store/slices/service/authService";
import { sendOtp } from "@/store/slices/authSlice";

const Login = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    }
  });

  // const handleLogin = async (formData) => {
  //   console.log("Form submitted:", formData);
  //   const { email } = formData;
    
  //   if (!email) {
  //     toast.error("Please provide your email");
  //     return;
  //   }
    
  //   setSubmitting(true); // Show loading state
    
  //   try {
  //     console.log("Sending request to API with email:", email);
  //     const response = await axios.post(
  //       "https://api.sentryspot.co.uk/api/employeer/auth/send-loginotp", 
  //       { email },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
      
  //     console.log("API response:", response);
      
  //     if (response.status === 200) {
  //       toast.success(response.data.message || "OTP sent to your email.");
  //       localStorage.setItem("userEmail", email);
  //       navigate("/verify-otp");
  //     } else {
  //       toast.error(response.data.message || "Failed to Send OTP");
  //     }
  //   } catch (error) {
  //     console.error("API error:", error);
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   } finally {
  //     setSubmitting(false); // Hide loading state
  //   }
  // };
   
 const handleLogin = async(FormData)=>{
    const {email} = FormData
    if(!email) {
      toast.error("Email is Required")
    }
    try {
      const response = await dispatch(sendOtp(email)).unwrap()
      console.log(response.status,"component response");
      if(response.status == "success" || response.code ==200 ){
        toast.success(response.message || "OTP Send SuccessFully!")
        localStorage.setItem("userEmail", email);
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("SendOtp error:", error);
      toast.error(error || "Failed to send OTP");
    }
  }
  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log("Manual submit triggered");
    const email = document.getElementById("email").value;
    if (!email) {
      toast.error("Please provide your email");
      return;
    }
    
    handleLogin({ email });
  };
  
  // const handleGoogleSignin = async () => {
  //   const url = `https://api.sentryspot.co.uk/api/employeer/auth/google`;

  //   try {
  //     const response = await axios.get(url);

  //     if (response.status === 200) {
  //       console.log("Google sign-in token: ", response.data.data);
  //       window.open(response.data.data);
  //     } else {
  //       toast.error("Google sign-in failed.");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
  //   }
  // };
  const handleGoogleSignin = async () => {
    try {
      const data = await handleGoogleSignIn();
      console.log("Google sign-in successful, data:", data);
      toast.success(data.message ||" Google sign-in successful, data")
    } catch (err) {
      console.error("Error during Google sign-in:", err.message);
      toast.error(`${err.message || "Google sign-in failed"}`);
    }
  };
  return (
    <Card className="w-[350px] sm:w-[400px] p-2 m-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl text-left font-ubuntu">
          Get started for Free
        </CardTitle>
      </CardHeader>
      <CardContent>
        <button
          onClick={handleGoogleSignin}
          type="button"
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4 shadow-sm hover:bg-gray-100 focus:outline-none"
        >
          <FcGoogle className="h-6 w-6 mr-2" />
          Continue with Google
        </button>
        <div className="p-4 flex justify-center items-center">
          <p>OR</p>
        </div>

        <form
          className="flex justify-between space-x-2 flex-wrap gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="email" className="text-left text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`${errors.email && "!border-red-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3 py-4 w-full duration-300 bg-[#2d1f89] hover:bg-blue-800"
            onClick={handleManualSubmit}
          >
            {loading || submitting ? <ActionLoader /> : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;


 