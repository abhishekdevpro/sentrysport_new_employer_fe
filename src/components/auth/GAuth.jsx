
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Constant } from '@/utils/constant/constant';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';

const Gauth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  
  useEffect(() => {
    const authenticate = async () => {
      try {
        // Function to extract query parameters from the URL
        const getQueryParams = (url) => {
          const params = new URLSearchParams(new URL(url).search);
          return Object.fromEntries(params.entries());
        };

        // Extract the code from the URL
        const queryParams = getQueryParams(window.location.href);
        const code = queryParams.code;

        if (code) {
          // Dispatch the authenticateUser thunk to authenticate the user
          const response = await dispatch(authenticateUser(code)).unwrap();
          console.log(response,"callback");
           if(response){
                  toast.success(response.message || "Login Successfull!")
                  navigate("/employers-dashboard/my-profile")
                }
               
        } else {
          console.error('Code parameter is missing in the URL');
          setLoading(false);
          navigate('/'); // Redirect to login page if code is missing
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Authentication failed");
        navigate('/'); // Redirect to login page on error
      }
    };

    authenticate();
  }, [dispatch,navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading, please wait...</p>
        </div>
      ) : (
        <div className="text-gray-600">Redirecting...</div>
      )}
    </div>
  );
};

export default Gauth;
