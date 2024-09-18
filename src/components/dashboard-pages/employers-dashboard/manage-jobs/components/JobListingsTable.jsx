{/*import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { Constant } from "@/utils/constant/constant";

const token = localStorage.getItem(Constant.USER_TOKEN);

const JobListingsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }

        const result = await response.json();
        setData(result.data); // Set the `data` from the response
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, []);

  return (

    <div className="tabs-box">

      
      <div className="widget-title">
        <h4>My Job Listings</h4>
        <div className="chosen-outer">
          {/* Filter and sort options 
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
       
          </select>

          <select className="ml-2 chosen-single form-select">
            <option>Sort by: Select</option>
            <option>Magic Sort (Relevance)</option>
    
          </select>
        </div>
      </div>

     
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Category</th>
                <th>Company</th>
                <th>Location</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="5">Error loading jobs</td>
                </tr>
              ) : (
                <tr key={data.s_no}>
                  <td>{data?.job_detail?.job_title || "N/A"}</td>
                  <td>{data?.job_category?.name || "N/A"}</td>
                  <td>{data?.companies?.company_name || "N/A"}</td>
                  <td>
                    {data?.cities?.name}, {data?.states?.name}, {data?.countries?.name}
                  </td>
                  <td>
                    {moment(data?.job_detail?.created_at).format("MMM Do YYYY")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
 */}


 import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FaDoorClosed, FaFacebook, FaFolder, FaLinkedinIn, FaPen } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';
import moment from 'moment';

export default function JobListingsTable() {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Single job object
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }

        const result = await response.json();
        setData(result.data); // Set the job object
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  const handleEditClick = (id) => {
    setSelectedJobId(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJobId(null);
  };

  return (
    <div className="min-h-screen bg-white p-2">
      {showPopup && <PopupForm jobId={selectedJobId} onClose={closePopup} />}
      <div className="flex">
        <main className="flex-1 pe-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Job Details</h1>
            <Link to={"/employers-dashboard/post-jobs"}>
              <Button className="bg-violet-900 text-white">Post Job</Button>
            </Link>
          </div>
          <div className="overflow-x-auto border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-violet-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">CREATED ON</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">JOB TITLE</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ENGAGEMENT</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data ? (
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-500">{moment(data.job_detail.created_at).format("MMM Do YYYY")}</td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">
                      <a href="#">{data.job_detail.job_title || "N/A"}</a>
                      <div className="text-sm text-gray-500">{data.job_detail.experience_id_min || "0"} - {data.job_detail.experience_id_min || "0"} year • {data.cities?.name}, {data.states?.name}, {data.countries?.name}</div>
                      <div className="text-sm text-gray-500">Auto Interview Scheduler: <span className="text-green-600">Enabled</span></div>
                      <a href="#" className="text-sm text-blue-600">View Recommended Candidates</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">Published</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>4571 Views</div>
                      <Link to={"/employers-list"}><button className='underline text-blue-600'>2143 Applied</button></Link>
                      <div>69 Follow Up</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <FaPen className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => handleEditClick(data.job_detail.id)} />
                        <FaBookBookmark className="w-4 h-4 text-gray-500" />
                        <FaFolder className="w-4 h-4 text-gray-500" />
                        <FaDoorClosed className="w-4 h-4 text-gray-500" />
                        <FaLinkedinIn className="w-4 h-4 text-gray-500" />
                        <FaFacebook className="w-4 h-4 text-gray-500" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">No job details available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

// Popup form component
const PopupForm = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-post/${jobId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const result = await response.json();
        setFormData(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message || "Failed to load job details");
      }
    };

    fetchJobData();
  }, [jobId]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form>
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            {/* Form fields based on formData */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={formData?.job_title || ''}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            {/* Add other form fields as needed */}
            <div className="flex justify-end">
              <Button type="button" onClick={onClose} className="mr-2">Cancel</Button>
              <Button type="submit" className="bg-violet-900 text-white">Save</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
