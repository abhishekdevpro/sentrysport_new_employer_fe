
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  return (
    <div className="w-full  app-light-bg px-4 py-8">
      {/* Page Header */}
      {/* <div className="mb-8 text-left md:text-left">
        <h2 className="app-text-h2">Account Settings</h2>
        <p className="app-text-p mt-1">
          Manage your account information and settings
        </p>
      </div> */}

      {/* Card Container */}
      <div className=" mx-auto">
        <div className="p-6">
          <h3 className="app-text-h3 pb-3">
            Personal Information
          </h3>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Account ID */}
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <label className="app-text-label">
                Account ID
              </label>
              
                <p className="app-text-p break-all">
                  {userInfo?.employeer_uuid || "N/A"}
                </p>
             
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <label className="app-text-label mb-1">
                Email Address 
              </label>
              
                <span className="app-text-p break-all">
                  {userInfo?.email || "N/A"}
                </span>
              
            </div>

            {/* Phone */}
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <label className="app-text-label">
                Phone Number
              </label>
              
                <p className="app-text-p break-all">
                  {userInfo?.phone || "N/A"}
                </p>
              
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center md:justify-start">
            <Button 
            onClick={() => navigate(`/employer-dashboard/my-profile`)}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;


// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Constant } from "../../utils/constant/constant";
// import { useSelector } from "react-redux";

// const Account = () => {
//   // const [userData, setUserData] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   const {userInfo} = useSelector((state) => state.auth);
//   console.log(userInfo,"userInfo")
//   // useEffect(() => {
//   //   const fetchUserProfile = async () => {
//   //     try {
//   //       const token = localStorage.getItem(Constant.USER_TOKEN);
//   //       console.log("Token from localStorage:", token);
        
//   //       if (!token) {
//   //         throw new Error("Unauthorized. Please log in.");
//   //       }

//   //       console.log("Making API call to:", "https://api.sentryspot.co.uk/api/jobseeker/user-profile");
//   //       const response = await axios.get(
//   //         "https://api.sentryspot.co.uk/api/employeer/user-profile",
//   //         {
//   //           headers: { 
//   //             Authorization: token,
              
//   //           },
//   //         }
//   //       );
//   //       console.log("API Response:", response.data);

//   //       if (!response.data) {
//   //         throw new Error("No data received from the server");
//   //       }

//   //       if (response.data?.status === "success" && response.data.data?.personal_details) {
//   //         setUserData(response.data.data.personal_details);
//   //       } else {
//   //         throw new Error(response.data?.message || "Failed to load user data.");
//   //       }
//   //     } catch (err) {
//   //       console.error("Error fetching user profile:", err);
//   //       if (err.response) {
//   //         // The request was made and the server responded with a status code
//   //         // that falls out of the range of 2xx
//   //         setError(err.response.data?.message || `Server error: ${err.response.status}`);
//   //       } else if (err.request) {
//   //         // The request was made but no response was received
//   //         setError("No response from server. Please check your internet connection.");
//   //       } else {
//   //         // Something happened in setting up the request that triggered an Error
//   //         setError(err.message || "Failed to load user data.");
//   //       }
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUserProfile();
//   // }, []);

//   // Ensure no crash when accessing userData
//   // const safeUserData = userData || { account_id: "N/A", email: "N/A", phone: "N/A" };

//   // Store account ID in localStorage only if data is available


//   return (
//     <div className="w-full app-light-bg border-2 px-4 py-6">
//       <div className="mb-6">
//         <h2 className="app-text-h2">Account Settings</h2>
//         <p className="app-text-p mb-2">Manage your account information and settings</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-6">
//           <h2 className="app-text-h3 mb-4">Personal Information</h2>
          
         
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-500">Account ID</label>
//                   <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
//                     <p className="text-gray-800 font-medium">{userInfo.employeer_uuid}</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-500">Email Address</label>
//                   <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
//                     <p className="text-gray-800 font-medium">{userInfo.email}</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-500">Phone Number</label>
//                   <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
//                     <p className="text-gray-800 font-medium">{userInfo.phone}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="pt-4 border-t border-gray-200">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
//                   Edit Profile
//                 </button>
//               </div>
//             </div>
          
//         </div>
//       </div>
      
      
//     </div>
//   );
// };

// export default Account;


// // <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Security</h2>
//           <div className="space-y-4">
//             <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex justify-between items-center">
//               <span className="font-medium">Change Password</span>
//               <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </button>
            
//             <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex justify-between items-center">
//               <span className="font-medium">Two-Factor Authentication</span>
//               <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>