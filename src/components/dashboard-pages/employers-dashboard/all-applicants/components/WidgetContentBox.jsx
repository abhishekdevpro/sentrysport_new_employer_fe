// "use client";

// import { useState, useEffect } from "react";
// import { Constant } from "@/utils/constant/constant";
// import { toast } from "react-toastify";

// import {
//   fetchJobSeekers,
//   handleShortlistReject,
//   handleSave,
//   handleReview,
// } from "@/store/slices/service/Job-seekerService";
// import MainTabs from "./Main_tab";
// import SearchFilters from "./Filter";
// import StatusTabs from "./Status-Tab";
// import CandidateList from "./Candidate-List";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const WidgetContentBox = () => {
//   const [activeMainTab, setActiveMainTab] = useState("applications");
//   const [activeStatusTab, setActiveStatusTab] = useState("all");
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const { jobId } = useParams();
//   const statusMap = {
//     all: "",
//     review: 1,
//     hold: 2,
//     reject: 3,
//     shortlist: 4,
//     interview: 5,
//     hired: 6,
//   };

//   const countBadges = [
//     { label: "All", key: "all" },
//     { label: "Reviewing", key: "review" },
//     { label: "Hold", key: "hold" },
//     { label: "Rejected", key: "reject" },
//     { label: "Shortlisted", key: "shortlist" },
//     { label: "Interviewing", key: "interview" },
//     { label: "Hired", key: "hired" },
//   ];
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setIsLoading(true);

//       let queryParams = `job_id=${jobId}&is_all_applicant=1`;

//       // Add search query if present
//       if (searchQuery) {
//         queryParams += `&title_keywords=${searchQuery}`;
//       }

//       // Use statusMap to send status as jobseeker_applied_status_id
//       const statusId = statusMap[activeStatusTab];
//       if (statusId) {
//         queryParams += `&jobseeker_applied_status_id=${statusId}`;
//       }

//       const result = await fetchJobSeekers(queryParams, token);
//       setData(result.data || []);
//       setIsLoading(false);
//     } catch (error) {
//       setIsError(true);
//       setIsLoading(false);
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   if (jobId && token) {
//     fetchData();
//   }
// }, [activeMainTab, activeStatusTab, searchQuery, token, jobId]);

//   // Update the useEffect to handle both tabs
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       setIsLoading(true);

//   //       let queryParams = `job_id=${jobId}&is_all_applicant=1`;

//   //       // Add search query if present
//   //       if (searchQuery) {
//   //         queryParams += `&title_keywords=${searchQuery}`;
//   //       }

//   //       // Add filters based on active status tab
//   //       if (activeMainTab === "applications") {
//   //         switch (activeStatusTab) {
//   //           case "unread":
//   //             queryParams += "&is_unread=1";
//   //             break;
//   //           case "reviewed":
//   //             queryParams += "&is_reviewed=1";
//   //             break;
//   //           case "shortlisted":
//   //             queryParams += "&is_shortlist=1";
//   //             break;
//   //           case "rejected":
//   //             queryParams += "&is_rejected=1";
//   //             break;
//   //           case "saved":
//   //             queryParams += "&is_saved=1";
//   //             break;
//   //           default:
//   //             break;
//   //         }
//   //       }
//   //       console.log("Query Params:", queryParams);
//   //       // Call your API with full query string
//   //       const result = await fetchJobSeekers(queryParams, token);
//   //       setData(result.data || []);
//   //       setIsLoading(false);
//   //     } catch (error) {
//   //       setIsError(true);
//   //       setIsLoading(false);
//   //       toast.error(error.message || "Something went wrong");
//   //     }
//   //   };

//   //   if (jobId && token) {
//   //     fetchData();
//   //   }
//   // }, [activeMainTab, activeStatusTab, searchQuery, token, jobId]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       setIsLoading(true);
//   //       const params = searchQuery ? `title_keywords=${searchQuery}` : "";
//   //       let queryParams = params;

//   //       // Only apply status filters if we're in the applications tab
//   //       if (activeMainTab === "applications") {
//   //         switch (activeStatusTab) {
//   //           case "unread":
//   //             queryParams = `${params}${params ? "&" : ""}is_unread=1`;
//   //             break;
//   //           case "reviewed":
//   //             queryParams = `${params}${params ? "&" : ""}is_reviewed=1`;
//   //             break;
//   //           case "shortlisted":
//   //             queryParams = `${params}${params ? "&" : ""}is_shortlist=1`;
//   //             break;
//   //           case "rejected":
//   //             queryParams = `${params}${params ? "&" : ""}is_rejected=1`;
//   //             break;
//   //           case "saved":
//   //             queryParams = `${params}${params ? "&" : ""}is_saved=1`;
//   //             break;
//   //           default:
//   //             queryParams = params;
//   //         }
//   //       }

//   //       // Always fetch from the same API endpoint, regardless of tab
//   //       const result = await fetchJobSeekers(jobId,queryParams, token);
//   //       setData(result.data || []);
//   //       setIsLoading(false);
//   //     } catch (error) {
//   //       setIsError(true);
//   //       setIsLoading(false);
//   //       toast.error(error.message || "Something went wrong");
//   //     }
//   //   };

//   //   fetchData();
//   // }, [activeMainTab, activeStatusTab, searchQuery, token]);

//   // Handler functions that call the service functions
//   const onShortlistReject = async (jobSeekerId, isShortlist, isRejected) => {
//     try {
//       await handleShortlistReject(jobSeekerId, isShortlist, isRejected, token);
//       // Refresh data after action
//       const params = searchQuery ? `title_keywords=${searchQuery}` : "";
//       const result = await fetchJobSeekers(params, token);
//       setData(result.data || []);
//     } catch (error) {
//       toast.error(error.message || "Action failed");
//     }
//   };

//   const onSave = async (jobSeekerId) => {
//     try {
//       await handleSave(jobSeekerId, token);

//       const params = searchQuery ? `title_keywords=${searchQuery}` : "";
//       const result = await fetchJobSeekers(params, token);
//       setData(result.data || []);
//     } catch (error) {
//       toast.error(error.message || "Save failed");
//     }
//   };

//   const onReview = async (jobSeekerId) => {
//     try {
//       await handleReview(jobSeekerId, token);
//       // Refresh data after action
//       const params = searchQuery ? `title_keywords=${searchQuery}` : "";
//       const result = await fetchJobSeekers(params, token);
//       setData(result.data || []);
//     } catch (error) {
//       toast.error(error.message || "Review failed");
//     }
//   };
//   // const jobId = 63;
//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.sentryspot.co.uk/api/employeer/jobs-applied-counts/${jobId}`,
//           {
//             headers: {
//               Authorization: token, // optional
//             },
//           }
//         );

//         setCounts(res.data.data); // assuming API returns the correct structure
//       } catch (error) {
//         console.error("Error fetching job counts:", error);
//       }
//     };

//     if (jobId) {
//       fetchCounts();
//     }
//   }, [jobId]);
//   console.log("Counts:", counts);

//   // Calculate counts for each tab
//   const getCounts = () => {
//     return {
//       all: counts?.all,
//       unread: counts?.unread,
//       reviewed: counts?.reviewed,
//       shortlisted: counts?.shortlisted,
//       rejected: counts?.rejected,
//       saved: counts?.saved,
//     };
//   };

//   // Replace the Content Areas section with this updated version
//   return (
//     <div className="bg-white">
//       <div className="border border-white rounded-lg p-3 bg-blue-50">
//         {/* Main Tabs (Recommended/Applications) */}
//         <MainTabs
//           activeTab={activeMainTab}
//           setActiveTab={setActiveMainTab}
//           applicationCount={data.length}
//         />

//         {/* Content Areas */}
//         <div>
//           {/* Search and Filters - Show for both tabs */}
//           <SearchFilters
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />

//           {/* Status Tabs - Only show for Applications tab */}
//           <div className="p-3 bg-white rounded-lg">
//             {activeMainTab === "applications" && (
//               <StatusTabs
//                 activeTab={activeStatusTab}
//                 setActiveTab={setActiveStatusTab}
//                 counts={getCounts()}
//               />
//             )}

//             {/* Candidate List - Show for both tabs */}
//             <CandidateList
//               data={data}
//               isLoading={isLoading}
//               isError={isError}
//               activeTab={activeStatusTab}
//               onShortlistReject={onShortlistReject}
//               onSave={onSave}
//               onReview={onReview}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WidgetContentBox;

"use client";

import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-toastify";
import {
  fetchJobSeekers,
  handleShortlistReject,
  handleSave,
  handleReview,
} from "@/store/slices/service/Job-seekerService";
import MainTabs from "./Main_tab";
import SearchFilters from "./Filter";
import StatusTabs from "./Status-Tab";
import CandidateList from "./Candidate-List";
import axios from "axios";
import { useParams } from "react-router-dom";

// Map tab key to status ID for API filtering
const statusMap = {
  all: "",
  review: 1,
  hold: 2,
  reject: 3,
  shortlist: 4,
  interview: 5,
  hired: 6,
};

// Tabs for display and count mapping
const countBadges = [
  { label: "All", key: "all" },
  { label: "Reviewing", key: "review" },
  { label: "Hold", key: "hold" },
  { label: "Rejected", key: "reject" },
  { label: "Shortlisted", key: "shortlist" },
  { label: "Interviewing", key: "interview" },
  { label: "Hired", key: "hired" },
];

const WidgetContentBox = () => {
  const [activeMainTab, setActiveMainTab] = useState("applications");
  const [activeStatusTab, setActiveStatusTab] = useState("all");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const { jobId } = useParams();
  const [counts, setCounts] = useState({
    all: 0,
    review: 0,
    hold: 0,
    reject: 0,
    shortlist: 0,
    interview: 0,
    hired: 0,
  });

  // Fetch job seeker data with status filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        let queryParams = `job_id=${jobId}&is_all_applicant=1`;

        if (searchQuery) {
          queryParams += `&title_keywords=${searchQuery}`;
        }

        const statusId = statusMap[activeStatusTab];
        if (statusId) {
          queryParams += `&jobseeker_applied_status_id=${statusId}`;
        }

        const result = await fetchJobSeekers(queryParams, token);
        setData(result.data || []);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        toast.error(error.message || "Something went wrong");
      }
    };

    if (jobId && token) {
      fetchData();
    }
  }, [activeMainTab, activeStatusTab, searchQuery, token, jobId]);

  // Fetch counts for each status
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          `https://api.sentryspot.co.uk/api/employeer/jobs-applied-counts/${jobId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCounts(res.data.data || {});
      } catch (error) {
        console.error("Error fetching job counts:", error);
      }
    };

    if (jobId) {
      fetchCounts();
    }
  }, [jobId]);

  // Action handlers
  const onShortlistReject = async (jobSeekerId, isShortlist, isRejected) => {
    try {
      await handleShortlistReject(jobSeekerId, isShortlist, isRejected, token);
      refreshData();
    } catch (error) {
      toast.error(error.message || "Action failed");
    }
  };

  const onSave = async (jobSeekerId) => {
    try {
      await handleSave(jobSeekerId, token);
      refreshData();
    } catch (error) {
      toast.error(error.message || "Save failed");
    }
  };

  const onReview = async (jobSeekerId) => {
    try {
      await handleReview(jobSeekerId, token);
      refreshData();
    } catch (error) {
      toast.error(error.message || "Review failed");
    }
  };

  const refreshData = async () => {
    const statusId = statusMap[activeStatusTab];
    let queryParams = `job_id=${jobId}&is_all_applicant=1`;
    if (searchQuery) {
      queryParams += `&title_keywords=${searchQuery}`;
    }
    if (statusId) {
      queryParams += `&jobseeker_applied_status_id=${statusId}`;
    }

    const result = await fetchJobSeekers(queryParams, token);
    setData(result.data || []);
  };

  return (
    <div className="bg-white">
      <div className="border border-white rounded-lg p-3 bg-blue-50">
        {/* Main Tabs */}
        <MainTabs
          activeTab={activeMainTab}
          setActiveTab={setActiveMainTab}
          applicationCount={data.length}
        />

        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Status Tabs (only for Applications) */}
        <div className="p-3 bg-white rounded-lg">
          {activeMainTab === "applications" && (
            <StatusTabs
              activeTab={activeStatusTab}
              setActiveTab={setActiveStatusTab}
              counts={counts}
              countBadges={countBadges}
            />
          )}

          {/* Candidate List */}
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
  );
};

export default WidgetContentBox;

