import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { Constant } from "@/utils/constant/constant";

const WidgetContentBox = () => {
  const [activeTab, setActiveTab] = useState("all"); // Default to 'all'
  const [allData, setAllData] = useState([]);
  const [unreadData, setUnreadData] = useState([]);
  const [reviewedData, setReviewedData] = useState([]);
  const [shortlistedData, setShortlistedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.sentryspot.co.uk/api/employeer/job-seekers",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch job seekers");
        }

        const result = await response.json();
        const fetchedData = result.data;

        // Set data for each tab (this is for demonstration, adjust conditions as needed)
        setAllData(fetchedData);
        setUnreadData(fetchedData.filter((item) => item.is_unread)); // Assuming an 'is_unread' field
        setReviewedData(fetchedData.filter((item) => item.is_reviewed)); // Assuming an 'is_reviewed' field
        setShortlistedData(fetchedData.filter((item) => item.is_shortlisted)); // Assuming an 'is_shortlisted' field
        setRejectedData(fetchedData.filter((item) => item.is_rejected)); // Assuming an 'is_rejected' field
        setSavedData(fetchedData.filter((item) => item.is_saved)); // Assuming an 'is_saved' field

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  // Function to handle shortlisting or rejecting a candidate
  const handleShortlistReject = async (
    jobSeekerId,
    isShortlist,
    isRejected
  ) => {
    try {
      const response = await fetch(
        "https://api.sentryspot.co.uk/api/employeer/jobseeker-shortlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            job_seeker_id: jobSeekerId,
            is_shortlist: isShortlist,
            is_rejected: isRejected,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job seeker status");
      }

      const result = await response.json();
      toast.success(result.message || "Action successful");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleSave = async (jobSeekerId) => {
    try {
      const response = await fetch(
        "https://api.sentryspot.co.uk/api/employeer/jobseeker-save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ job_seeker_id: jobSeekerId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save job seeker");
      }

      const result = await response.json();
      toast.success(result.message || "Job seeker saved successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleReview = async (jobSeekerId) => {
    try {
      const response = await fetch('https://api.sentryspot.co.uk/api/employeer/jobseeker-reviewed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ job_seeker_id: jobSeekerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to review job seeker');
      }

      const result = await response.json();
      toast.success(result.message || 'Job seeker reviewed successfully');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };
  
  // Function to render the correct data based on the active tab
  const renderTabContent = () => {
    let tabData = [];
    switch (activeTab) {
      case "unread":
        tabData = unreadData;
        break;
      case "reviewed":
        tabData = reviewedData;
        break;
      case "shortlisted":
        tabData = shortlistedData;
        break;
      case "rejected":
        tabData = rejectedData;
        break;
      case "saved":
        tabData = savedData;
        break;
      default:
        tabData = allData;
    }

    return isLoading ? (
      <p>Loading...</p>
    ) : isError ? (
      <p>Error loading candidates</p>
    ) : (
      tabData?.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="flex justify-between items-center px-10 w-full">
            {/* Profile and Details */}
            <div className="flex space-x-4">
              <img
                src={`https://api.sentryspot.co.uk${item?.jobskkers_detail?.photo}`}
                alt="Profile"
                className="rounded-full h-20 w-20"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {item?.jobskkers_detail?.first_name}{" "}
                  {item?.jobskkers_detail?.last_name}
                </h3>
                <p className="text-gray-500">
                  Experience: 2y 9m <br />
                  Location: {item?.jobskkers_detail?.cities?.name},{" "}
                  {item?.jobskkers_detail?.states?.name},{" "}
                  {item?.jobskkers_detail?.countries?.name}
                </p>
                <p className="text-gray-500">
                  Applied on:{" "}
                  {moment(item?.jobskkers_detail?.created_at).format(
                    "MMM Do YYYY"
                  )}{" "}
                  <br />
                  Notice Period: 1 month
                </p>
                <p className="text-blue-500 cursor-pointer">Cover letter</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-1 rounded-md  w-1/2 ${
                    item?.jobskkers_detail?.job_seeker_shortlisted === 0

                      ? "bg-green-700 text-white hover:bg-green-500"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    handleShortlistReject(item?.jobskkers_detail?.id, 1, 0)
                  }
                  disabled={
                    item?.jobskkers_detail?.job_seeker_shortlisted !== 0  }   >
                  {item?.jobskkers_detail?.job_seeker_shortlisted === 0  ? "Shortlist" : "Shortlisted"} 
                  </button>

                <button
                  className={`px-4 py-1 rounded-md w-1/2 ${
                    item?.jobskkers_detail?.job_seeker_rejected === 0  ? "bg-red-800 text-white hover:bg-red-500" : "bg-gray-400 text-gray-200 cursor-not-allowed" }`}

                  onClick={() => handleShortlistReject(item?.jobskkers_detail?.id, 0, 1) }
                  disabled={item?.jobskkers_detail?.job_seeker_rejected !== 0  }
                >
                  {item?.jobskkers_detail?.job_seeker_rejected === 0
             
                    ? "Reject"
                    : "Rejected"}
                </button>
              </div>

              <button
                onClick={() => handleSave(item?.jobskkers_detail?.id)}
                className={`bg-${
                  item?.jobskkers_detail?.job_seeker_fav_id === 0
                    ? "blue-700"
                    : "blue-300"
                } text-white px-4 py-1 rounded-md w-full my-2 hover:bg-${
                  item?.jobskkers_detail?.job_seeker_fav_id === 0
                    ? "blue-500"
                    : "gray-400"
                }`}
                disabled={!(item?.jobskkers_detail?.job_seeker_fav_id === 0)}
              >
                {item?.jobskkers_detail?.job_seeker_fav_id === 0
                  ? "Save"
                  : "Saved"}
              </button>
              <button className="bg-white border w-full border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100"
                 onClick={() => handleReview(item.jobskkers_detail.id)}
              >
                 Review
              </button>
            </div>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="p-2 bg-gray-100">
      <div className="border p-3 bg-white">
        {/* Tabs for Recommended Candidates and Applications */}
        <div className="border-b border-gray-300  flex space-x-6 mb-6">
          <button
            onClick={() => setActiveTab("recommended")}
            className={`text-lg font-medium pb-2 ${
              activeTab === "recommended"
                ? "border-b-2 border-violet-500 text-violet-600"
                : "text-gray-500"
            }`}
          >
            Recommended Candidates (0)
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`text-lg font-medium pb-2 ${
              activeTab === "applications"
                ? "border-b-2 border-violet-500 text-violet-600"
                : "text-gray-500"
            }`}
          >
            Applications ({allData.length})
          </button>
        </div>

        {/* Content for Active Tab */}
        {activeTab === "recommended" ? (
          <div>
            {/* Recommended Candidates List */}
            <p className="text-center text-gray-500">
              No recommended candidates available.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search keyword or candidates"
                  className="border border-black  px-4 py-2 w-80 "
                />

                <button className="bg-white border text-black border-black px-4 py-1 rounded-sm hover:bg-gray-100">
                  Filter
                </button>
                <select className="bg-white border border-black text-black px-2 py-1 rounded-sm hover:bg-gray-100">
                  <option> Magic Sort (Relevance)</option>
                </select>

                <select className="bg-white border border-black text-black px-2 py-2 rounded-sm hover:bg-gray-100">
                  <option> Diversity Candidates</option>
                </select>

                <select className="bg-white border border-black text-black px-2 py-2 rounded-sm hover:bg-gray-100">
                  <option> All Candidates</option>
                </select>
              </div>
            </div>

            {/* Candidate Card 1 */}
            <div className="border p-3 bg-white">
              {/* Tabs for All, Unread, Reviewed, etc. */}
              <div className="border-b border-gray-300 flex space-x-6 mb-6">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`text-lg font-medium pb-2 ${
                    activeTab === "all"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  All ({allData.length})
                </button>
                <button
                  onClick={() => setActiveTab("unread")}
                  className={`text-lg font-medium pb-2 ${
                    activeTab === "unread"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Unread ({unreadData.length})
                </button>
                <button
                  onClick={() => setActiveTab("reviewed")}
                  className={`text-lg font-medium pb-2 ${
                    activeTab === "reviewed"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Reviewed ({reviewedData.length})
                </button>
                <button
                  onClick={() => setActiveTab("shortlisted")}
                  className={`text-lg font-medium pb-2 ${
                    activeTab === "shortlisted"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Shortlisted ({shortlistedData.length})
                </button>
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`text-lg font-medium pb-2 ${
                    activeTab === "rejected"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Rejected ({rejectedData.length})
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`text-lg font-medium pb-2 ${
                    activeTab === "saved"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  Saved ({savedData.length})
                </button>
              </div>

              {/* Content for Active Tab */}
              <div>{renderTabContent()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetContentBox;
