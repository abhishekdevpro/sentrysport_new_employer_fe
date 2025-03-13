"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }

        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success" && response.data.data?.personal_details) {
          setUserData(response.data.data.personal_details);
        } else {
          throw new Error("Failed to load user data.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Ensure no crash when accessing userData
  const safeUserData = userData || { account_id: "N/A", email: "N/A", phone: "N/A" };

  // Store account ID in localStorage only if data is available
  useEffect(() => {
    if (safeUserData.account_id && safeUserData.account_id !== "N/A") {
      localStorage.setItem("ID", safeUserData.account_id);
    }
  }, [safeUserData.account_id]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account information and settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
          
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Account ID</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-gray-800 font-medium">{safeUserData.account_id}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Email Address</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-gray-800 font-medium">{safeUserData.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-gray-800 font-medium">{safeUserData.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Security</h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex justify-between items-center">
              <span className="font-medium">Change Password</span>
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex justify-between items-center">
              <span className="font-medium">Two-Factor Authentication</span>
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;