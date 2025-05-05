
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import moment from "moment";
// import { Constant } from "@/utils/constant/constant";
// import { toast } from "react-toastify";

// const WidgetContentBox = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const navigate = useNavigate();

//   // Existing fetch and handler functions remain the same
//   const fetchData = async (queryParams) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `https://api.sentryspot.co.uk/api/employeer/job-seekers?${queryParams}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch job seekers");
//       }

//       const result = await response.json();
//       setData(result.data || []);
//       setIsLoading(false);
//     } catch (error) {
//       setIsError(true);
//       setIsLoading(false);
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     const params = searchQuery ? `title_keywords=${searchQuery}` : "";
//     switch (activeTab) {
//       case "unread":
//         fetchData(`${params}${params ? "&" : ""}is_unread=1`);
//         break;
//       case "reviewed":
//         fetchData(`${params}${params ? "&" : ""}is_reviewed=1`);
//         break;
//       case "shortlisted":
//         fetchData(`${params}${params ? "&" : ""}is_shortlist=1`);
//         break;
//       case "rejected":
//         fetchData(`${params}${params ? "&" : ""}is_rejected=1`);
//         break;
//       case "saved":
//         fetchData(`${params}${params ? "&" : ""}is_saved=1`);
//         break;
//       default:
//         fetchData(params);
//     }
//   }, [activeTab, searchQuery, token]);

//   const handleShortlistReject = async (jobSeekerId, isShortlist, isRejected) => {
//     try {
//       const response = await fetch(
//         "https://api.sentryspot.co.uk/api/employeer/jobseeker-shortlist",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({
//             job_seeker_id: jobSeekerId,
//             is_shortlist: isShortlist,
//             is_rejected: isRejected,
//           }),
//         }
//       );
//       console.log(response,"shortlist");

//       if (!response.ok) {
//         throw new Error("Failed to update job seeker status");
//       }

//       const result = await response.json();
//       console.log(result,"Shoristed");
//       toast.success(result.message || "Action successful");
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   const handleSave = async (jobSeekerId) => {
//     try {
//       const response = await fetch(
//         "https://api.sentryspot.co.uk/api/employeer/jobseeker-save",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ job_seeker_id: jobSeekerId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to save job seeker");
//       }

//       const result = await response.json();
//       toast.success(result.message || "Job seeker saved successfully");
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   const handleReview = async (jobSeekerId) => {
//     try {
//       const response = await fetch(
//         "https://api.sentryspot.co.uk/api/employeer/jobseeker-reviewed",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ job_seeker_id: jobSeekerId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to review job seeker");
//       }

//       const result = await response.json();
//       toast.success(result.message || "Job seeker reviewed successfully");
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   // New function to handle messaging a job seeker
//   const handleMessage = (jobSeekerId, firstName, lastName) => {
//     try {
//       // Navigate to messaging page or open a messaging modal
//       navigate(`/messages/${jobSeekerId}`, { 
//         state: { 
//           jobSeekerId,
//           recipientName: `${firstName} ${lastName}`
//         } 
//       });
      
//       // Alternatively, you could implement an API call here if you want to 
//       // initiate a conversation thread before navigating
//     } catch (error) {
//       toast.error("Failed to open messaging interface");
//     }
//   };

//   const renderTabContent = () => {
//     if (isLoading) return <p className="text-center py-4">Loading...</p>;
//     if (isError) return <p className="text-center py-4 text-red-500">Error loading candidates</p>;
//     if (!data.length) return <p className="text-center py-4">No candidates found.</p>;

//     return data.map((item, index) => (
//       <div key={index} className="bg-blue-50 shadow-md rounded-md py-4 mb-4">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-2 md:px-4 lg:px-10 w-full gap-4">
//           {/* Profile and Details */}
//           <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//             <img
//               src={`https://api.sentryspot.co.uk${item?.jobskkers_detail?.photo}`}
//               alt="Profile"
//               className="rounded-full h-20 w-20 object-cover"
//             />
//             <Link to={`/applicants/${item?.jobskkers_detail?.id}`}>
//             <div>
//               <h3 className="font-semibold text-lg">
//                 {item?.jobskkers_detail?.first_name} {item?.jobskkers_detail?.last_name}
//               </h3>
//               <p className="text-gray-500">
//                 Experience: 2y 9m <br />
//                 Location: {item?.jobskkers_detail?.cities?.name}, {item?.jobskkers_detail?.states?.name}, {item?.jobskkers_detail?.countries?.name}
//               </p>
//               <p className="text-gray-500">
//                 Applied on: {moment(item?.jobskkers_detail?.created_at).format("MMM Do YYYY")} <br />
//                 Notice Period: 1 month
//               </p>
//               <p className="text-blue-700 cursor-pointer hover:text-blue-900">Cover letter</p>
//             </div>
//             </Link>
//           </div>

//           {/* Action Buttons */}
//           <div className="w-full lg:w-auto min-w-[200px]">
//             <div className="flex gap-2">
//               <button
//                 className={`px-4 py-1 rounded-lg w-1/2 ${
//                   item?.jobskkers_detail?.job_seeker_shortlisted === 0
//                     ? "bg-blue-700 text-white hover:bg-blue-900"
//                     : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                 }`}
//                 onClick={() => handleShortlistReject(item?.jobskkers_detail?.id, 1, 0)}
//                 disabled={item?.jobskkers_detail?.job_seeker_shortlisted !== 0}
//               >
//                 {item?.jobskkers_detail?.job_seeker_shortlisted === 0 ? "Shortlist" : "Shortlisted"}
//               </button>
//               <button
//                 className={`px-4 py-1 rounded-lg w-1/2 ${
//                   item?.jobskkers_detail?.job_seeker_rejected === 0
//                     ? "bg-red-600  text-white hover:bg-red-700"
//                     : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                 }`}
//                 onClick={() => handleShortlistReject(item?.jobskkers_detail?.id, 0, 1)}
//                 disabled={item?.jobskkers_detail?.job_seeker_rejected !== 0}
//               >
//                 {item?.jobskkers_detail?.job_seeker_rejected === 0 ? "Reject" : "Rejected"}
//               </button>
//             </div>
            
//             {/* Message Button */}
//             <button
//               onClick={() => handleMessage(
//                 item?.jobskkers_detail?.id,
//                 item?.jobskkers_detail?.first_name,
//                 item?.jobskkers_detail?.last_name
//               )}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg w-full my-2"
//             >
//               Message
//             </button>
            
//             <button
//               onClick={() => handleSave(item?.jobskkers_detail?.id)}
//               className={`${
//                 item?.jobskkers_detail?.job_seeker_fav_id === 0
//                   ? "bg-blue-700 hover:bg-blue-900"
//                   : "bg-gray-400"
//               } text-white px-4 py-1 rounded-lg w-full my-2`}
//               disabled={item?.jobskkers_detail?.job_seeker_fav_id !== 0}
//             >
//               {item?.jobskkers_detail?.job_seeker_fav_id === 0 ? "Save" : "Saved"}
//             </button>
            
//             <button
//               className="bg-white border border-blue-900 text-blue-900 w-full px-4 py-1 rounded-lg hover:bg-blue-50"
//               onClick={() => handleReview(item.jobskkers_detail.id)}
//             >
//               Review
//             </button>
//           </div>
//         </div>
//       </div>
//     ));
//   };
//   return (
//     <div className="bg-white ">
//       <div className="border border-white rounded-lg p-3 bg-blue-50">
//         {/* Top Navigation */}
//         <div className="border-b border-gray-300 flex flex-col justify-start items-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mb-6 overflow-x-auto">
//           <button
//             onClick={() => setActiveTab("recommended")}
//             className={`text-base lg:text-lg font-medium pb-2 whitespace-nowrap ${
//               activeTab === "recommended"
//                 ? "border-b-2 border-blue-700 text-blue-900"
//                 : "text-gray-500"
//             }`}
//           >
//             Recommended Candidates (0)
//           </button>
//           <button
//             onClick={() => setActiveTab("applications")}
//             className={`text-base lg:text-lg font-medium pb-2 whitespace-nowrap ${
//               activeTab === "applications"
//                 ? "border-b-2 border-blue-700 text-blue-900"
//                 : "text-gray-500"
//             }`}
//           >
//             Applications ({data.length})
//           </button>
//         </div>

//         {/* Content Areas */}
//         {activeTab === "recommended" ? (
//           <div className="text-center text-gray-500 py-4">
//             No recommended candidates available.
//           </div>
//         ) : (
//           <div>
//             {/* Search and Filters */}
//             <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Search keyword or candidates"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="border border-blue-900 px-4 py-2 rounded-lg w-full lg:w-72"
//               />
//               <div className="flex flex-wrap gap-4">
//                 <button className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
//                   Filter
//                 </button>
//                 <select className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
//                   <option>Magic Sort (Relevance)</option>
//                 </select>
//                 <select className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
//                   <option>Diversity Candidates</option>
//                 </select>
//                 <select className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
//                   <option>All Candidates</option>
//                 </select>
//               </div>
//             </div>

//             {/* Status Tabs */}
//             <div className="p-3 bg-white rounded-lg ">
//               <div className="border-b border-gray-300 flex flex-nowrap overflow-x-auto space-x-6 mb-6 ">
//                 {[
//                   ["all", "All"],
//                   ["unread", "Unread"],
//                   ["reviewed", "Reviewed"],
//                   ["shortlisted", "Shortlisted"],
//                   ["rejected", "Rejected"],
//                   ["saved", "Saved"],
//                 ].map(([tab, label]) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`text-sm font-medium pb-2 whitespace-nowrap ${
//                       activeTab === tab
//                         ? "border-b-2 border-blue-700 text-blue-900"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {label} ({tab === "all" ? data?.length : 
//                       data?.filter(candidate => {
//                         switch(tab) {
//                           case "unread": return candidate?.jobskkers_detail?.is_unread;
//                           case "reviewed": return candidate?.jobskkers_detail?.is_reviewed;
//                           case "shortlisted": return candidate?.jobskkers_detail?.job_seeker_shortlisted;
//                           case "rejected": return candidate?.jobskkers_detail?.job_seeker_rejected;
//                           case "saved": return candidate?.jobskkers_detail?.job_seeker_fav_id;
//                           default: return false;
//                         }
//                       }).length || 0})
//                   </button>
//                 ))}
//               </div>

//               {/* Candidate Cards */}
//               {renderTabContent()}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WidgetContentBox;

"use client"

import { useState, useEffect } from "react"
import { Constant } from "@/utils/constant/constant"
import { toast } from "react-toastify"

import { fetchJobSeekers, handleShortlistReject, handleSave, handleReview } from "@/store/slices/service/Job-seekerService"
import MainTabs from "./Main_tab"
import SearchFilters from "./Filter"
import StatusTabs from "./Status-Tab"
import CandidateList from "./Candidate-List"

const WidgetContentBox = () => {
  const [activeMainTab, setActiveMainTab] = useState("applications")
  const [activeStatusTab, setActiveStatusTab] = useState("all")
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const token = localStorage.getItem(Constant.USER_TOKEN)

  // Update the useEffect to handle both tabs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const params = searchQuery ? `title_keywords=${searchQuery}` : ""
        let queryParams = params

        // Only apply status filters if we're in the applications tab
        if (activeMainTab === "applications") {
          switch (activeStatusTab) {
            case "unread":
              queryParams = `${params}${params ? "&" : ""}is_unread=1`
              break
            case "reviewed":
              queryParams = `${params}${params ? "&" : ""}is_reviewed=1`
              break
            case "shortlisted":
              queryParams = `${params}${params ? "&" : ""}is_shortlist=1`
              break
            case "rejected":
              queryParams = `${params}${params ? "&" : ""}is_rejected=1`
              break
            case "saved":
              queryParams = `${params}${params ? "&" : ""}is_saved=1`
              break
            default:
              queryParams = params
          }
        }

        // Always fetch from the same API endpoint, regardless of tab
        const result = await fetchJobSeekers(queryParams, token)
        setData(result.data || [])
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
        toast.error(error.message || "Something went wrong")
      }
    }

    fetchData()
  }, [activeMainTab, activeStatusTab, searchQuery, token])

  // Handler functions that call the service functions
  const onShortlistReject = async (jobSeekerId, isShortlist, isRejected) => {
    try {
      await handleShortlistReject(jobSeekerId, isShortlist, isRejected, token)
      // Refresh data after action
      const params = searchQuery ? `title_keywords=${searchQuery}` : ""
      const result = await fetchJobSeekers(params, token)
      setData(result.data || [])
    } catch (error) {
      toast.error(error.message || "Action failed")
    }
  }

  const onSave = async (jobSeekerId) => {
    try {
      await handleSave(jobSeekerId, token)
      // Refresh data after action
      const params = searchQuery ? `title_keywords=${searchQuery}` : ""
      const result = await fetchJobSeekers(params, token)
      setData(result.data || [])
    } catch (error) {
      toast.error(error.message || "Save failed")
    }
  }

  const onReview = async (jobSeekerId) => {
    try {
      await handleReview(jobSeekerId, token)
      // Refresh data after action
      const params = searchQuery ? `title_keywords=${searchQuery}` : ""
      const result = await fetchJobSeekers(params, token)
      setData(result.data || [])
    } catch (error) {
      toast.error(error.message || "Review failed")
    }
  }

  // Calculate counts for each tab
  const getCounts = () => {
    return {
      all: data.length,
      unread: data.filter((item) => item?.jobskkers_detail?.is_unread).length,
      reviewed: data.filter((item) => item?.jobskkers_detail?.is_reviewed).length,
      shortlisted: data.filter((item) => item?.jobskkers_detail?.job_seeker_shortlisted).length,
      rejected: data.filter((item) => item?.jobskkers_detail?.job_seeker_rejected).length,
      saved: data.filter((item) => item?.jobskkers_detail?.job_seeker_fav_id).length,
    }
  }

  // Replace the Content Areas section with this updated version
  return (
    <div className="bg-white">
      <div className="border border-white rounded-lg p-3 bg-blue-50">
        {/* Main Tabs (Recommended/Applications) */}
        <MainTabs activeTab={activeMainTab} setActiveTab={setActiveMainTab} applicationCount={data.length} />

        {/* Content Areas */}
        <div>
          {/* Search and Filters - Show for both tabs */}
          <SearchFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Status Tabs - Only show for Applications tab */}
          <div className="p-3 bg-white rounded-lg">
            {activeMainTab === "applications" && (
              <StatusTabs activeTab={activeStatusTab} setActiveTab={setActiveStatusTab} counts={getCounts()} />
            )}

            {/* Candidate List - Show for both tabs */}
            <CandidateList
              data={data}
              isLoading={isLoading}
              isError={isError}
              activeTab={activeStatusTab}
              onShortlistReject={onShortlistReject}
              onSave={onSave}
              onReview={onReview}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WidgetContentBox

