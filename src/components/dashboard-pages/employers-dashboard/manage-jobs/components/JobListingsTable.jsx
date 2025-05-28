<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6d7632ffe52acddb269f40cae16dfe9b4aeaf5ac
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FaDoorClosed, FaFacebook, FaFolder, FaLinkedinIn, FaPen, FaTrashAlt, FaCheckCircle, FaBan } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';
import moment from 'moment';

export default function JobListingsTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
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
        setData(result.data || []); // Set the job array, default to an empty array
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

  const handleDeleteJob = async () => {
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-post/${jobToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      toast.success('Job deleted successfully');
      // Re-fetch the job listings after successful deletion
      const updatedData = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
        headers: {
          Authorization: token,
        },
      }).then(res => res.json());

      setData(updatedData.data || []);
    } catch (error) {
      toast.error(error.message || 'Error deleting job');
    } finally {
      setShowDeleteConfirm(false);
      setJobToDelete(null);
    }
  };

  const confirmDeleteJob = (id) => {
    setJobToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handlePublishJob = async (id, currentStatus) => {
    const jobStatusId = currentStatus === 0 ? 1 : 0; // Toggle job_status_id (1 for publish, 0 for unpublish)
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-status/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_status_id: jobStatusId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${currentStatus === 0 ? 'publish' : 'unpublish'} job`);
      }

      toast.success(`Job ${currentStatus === 0 ? 'published' : 'unpublished'} successfully`);
      // Re-fetch the job listings after successful publish/unpublish
      const updatedData = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
        headers: {
          Authorization: token,
        },
      }).then(res => res.json());

      setData(updatedData.data || []);
    } catch (error) {
      toast.error(error.message || `Error ${currentStatus === 0 ? 'publishing' : 'unpublishing'} job`);
    }
  };

  const shareJob = (jobId) => {
    const jobUrl = `https://yourwebsite.com/job/${jobId}`; // Update with your actual job link
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;

    window.open(facebookShareUrl, '_blank');
    // Uncomment to share on LinkedIn
    // window.open(linkedinShareUrl, '_blank');
  };

  return (
    // <div className="min-h-screen bg-white p-2 relative">
    //   <div className="flex">
        
    //     <main className="flex-1 pe-2">
    //       <div className="flex justify-between items-center mb-4">
    //         <h1 className="text-2xl font-bold">Job Details</h1>
    //         <Link to={"/employers-dashboard/post-jobs"}>
    //           <Button className="bg-blue-900 text-white">Post Job</Button>
    //         </Link>
    //       </div>
    //       <div className="overflow-x-auto border">
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-blue-100">
    //             <tr>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">CREATED ON</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">JOB TITLE</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ENGAGEMENT</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
    //             </tr>
    //           </thead>
    //           <tbody className="bg-white divide-y divide-gray-200">
    //             {data.length > 0 ? (
    //               data.map((job) => (
    //                 <tr key={job.job_detail.id}>
    //                   <td className="px-6 py-4 text-sm text-gray-500">{moment(job.job_detail.created_at).format("MMM Do YYYY")}</td>
    //                   <td className="px-6 py-4 text-sm font-medium text-green-600">
    //                     <a href="#">{job.job_detail.job_title || "N/A"}</a>
    //                     <div className="text-sm text-gray-500">{job.job_detail.experience_id_min || "0"} - {job.job_detail.experience_id_min || "0"} year • {job.cities?.name}, {job.states?.name}, {job.countries?.name}</div>
    //                   </td>
    //                   <td className="px-6 py-4 text-sm text-gray-500 "><p className='bg-pink-200 px-2 p-1 rounded-3xl'>{job.job_detail.job_status_id === 1 ? `Published 🖋️` : `Unpublished 🖊`}</p></td>
    //                   <td className="px-6 py-4 text-sm text-gray-500">
    //                     <div>4571 Views</div>
    //                     <Link to={"/employers-list"}><button className='underline text-blue-600'>2143 Applied</button></Link>
    //                   </td>
    //                   <td className="px-6 py-4 text-sm font-medium">
    //                     <div className="flex space-x-2">
    //                       <FaPen className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => handleEditClick(job.job_detail.id)} />
                        
    //                       <FaTrashAlt className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => confirmDeleteJob(job.job_detail.id)} />
    //                       {job.job_detail.job_status_id === 0 ? (
    //                         <FaCheckCircle className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => handlePublishJob(job.job_detail.id, 0)} />
    //                       ) : (
    //                         <FaBan className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => handlePublishJob(job.job_detail.id, 1)} />
    //                       )}
    //                       <FaLinkedinIn className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => shareJob(job.job_detail.id)} />
    //                       <FaFacebook className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => shareJob(job.job_detail.id)} />
    //                     </div>
    //                   </td>
    //                 </tr>
    //               ))
    //             ) : (
    //               <tr>
    //                   <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">No job details available</td>
    //               </tr>
    //             )}
    //           </tbody>
    //         </table>
    //       </div>
    //       {showPopup && (
    //         <PopupForm
    //           jobId={selectedJobId}
    //           onClose={closePopup}
    //           title={data.find(job => job.job_detail.id === selectedJobId)?.job_detail.job_title}
    //           cities={data.find(job => job.job_detail.id === selectedJobId)?.cities?.name}
    //           states={data.find(job => job.job_detail.id === selectedJobId)?.states?.name}
    //           countries={data.find(job => job.job_detail.id === selectedJobId)?.countries?.name}
    //         />
    //       )}

    //       {showDeleteConfirm && (
    //         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    //           <div className="bg-white p-6 rounded shadow-md">
    //             <h2 className="text-lg font-bold">Confirm Deletion</h2>
    //             <p>Are you sure you want to delete this job?</p>
    //             <div className="flex justify-end space-x-2 mt-4">
    //               <Button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300">Cancel</Button>
    //               <Button onClick={handleDeleteJob} className="bg-red-600 text-white">Delete</Button>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </main>
    //   </div>
    // </div>
    <div className="min-h-screen bg-white p-2 relative">
    <div className="flex flex-col lg:flex-row">
      <main className="flex-1 pe-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
          <h1 className="text-2xl font-bold">Job Details</h1>
          <Link to={"/employers-dashboard/post-jobs"}>
            <Button className="bg-blue-900 text-white">Post Job</Button>
          </Link>
        </div>
        
        <div className="w-full overflow-x-auto border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase whitespace-nowrap">CREATED ON</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">JOB TITLE</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ENGAGEMENT</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((job) => (
                  <tr key={job.job_detail.id}>
                    <td className="px-6 py-4 text-md text-black font-medium whitespace-nowrap">
                      {moment(job.job_detail.created_at).format("MMM Do YYYY")}
                    </td>
                    <td className="px-6 py-4 text-md font-medium text-green-600">
                      <a href="#">{job.job_detail.job_title || "N/A"}</a>
                      <div className="text-md text-gray-500">
                        {job.job_detail.experience_id_min || "0"} - {job.job_detail.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-md text-gray-500">
                      <p className='bg-pink-200 px-2 p-1 rounded-3xl text-center whitespace-nowrap'>
                        {job.job_detail.job_status_id === 1 ? `Published 🖋️` : `Unpublished 🖊`}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-md text-gray-700 whitespace-nowrap">
                      <div>4571 Views</div>
                      <Link to={"/employers-list"}>
                        <button className=' text-md underline text-blue-700'>2143 Applied</button>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-2">
                        <FaPen 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => handleEditClick(job.job_detail.id)} 
                        />
                        <FaTrashAlt 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => confirmDeleteJob(job.job_detail.id)} 
                        />
                        {job.job_detail.job_status_id === 0 ? (
                          <FaCheckCircle 
                            className="w-4 h-4 text-blue-700 cursor-pointer" 
                            onClick={() => handlePublishJob(job.job_detail.id, 0)} 
                          />
                        ) : (
                          <FaBan 
                            className="w-4 h-4 text-red-500 cursor-pointer" 
                            onClick={() => handlePublishJob(job.job_detail.id, 1)} 
                          />
                        )}
                        <FaLinkedinIn 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => shareJob(job.job_detail.id)} 
                        />
                        <FaFacebook 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => shareJob(job.job_detail.id)} 
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">
                    No job details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showPopup && (
          <PopupForm
            jobId={selectedJobId}
            onClose={closePopup}
            title={data.find(job => job.job_detail.id === selectedJobId)?.job_detail.job_title}
            cities={data.find(job => job.job_detail.id === selectedJobId)?.cities?.name}
            states={data.find(job => job.job_detail.id === selectedJobId)?.states?.name}
            countries={data.find(job => job.job_detail.id === selectedJobId)?.countries?.name}
          />
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this job?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleDeleteJob} className="bg-red-600 text-white">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
  );
}




import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList,MultiSelectorTrigger } from "@/components/ui/multiSelector";
import { BriefcaseIcon, CheckIcon, ClockIcon, HandIcon, UserIcon } from "lucide-react";
import { IoDocument } from "react-icons/io5";
import { FaPennyArcade } from "react-icons/fa";
import { FaPerson, FaUserGroup } from "react-icons/fa6";
import { IoFemale, IoShieldOutline } from "react-icons/io5";
import { SlUserFemale } from "react-icons/sl";
import { BiHandicap } from "react-icons/bi";
import { Switch } from "@/components/ui/switch";


const tags = [
  { value: "Banking", label: "Banking" },
  { value: "Digital & Creative", label: "Digital & Creative" },
  { value: "Retail", label: "Retail" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Management", label: "Management" },
  { value: "Accounting & Finance", label: "Accounting & Finance" },
  { value: "Digital", label: "Digital" },
  { value: "Creative Art", label: "Creative Art" },
];

const PopupForm = ({ isOpen, onClose, jobId ,title,cities,states,countries}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [experienceYears, setExperienceYears] = useState([]);
  const [expectedExperienceYears, setExpectedExperienceYears] = useState([]);
  const [categories, setCategories] = useState([]);
  const [functionalTypes, setFunctionalTypes] = useState([]);
  const [salaryTypes, setSalaryTypes] = useState([]);
  const [expectedSalaryTypes, setExpectedSalaryTypes] = useState([]);
  const [batchTypes, setBatchTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  
  const [keywords, setKeywords] = useState({ job: "", location: "" });
  const [dropdownVisibility, setDropdownVisibility] = useState({
    job: false,
    location: false,
  });

  useEffect(() => {
    if (jobId) {
      fetchJobDataById(jobId);
    }
  }, [jobId]);

  const getCommaSeparatedTags = () => {
    if (selectedTags.length === 0) {
      return "";
    }
    return Array.isArray(selectedTags) ? selectedTags.join(', ') : "";
  };
  
  
  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    description: "",
    category_id: "",
    functional_area_id: "",
    experience_year: "",
    expected_experience_year: "",
    salary_type: "",
    expected_salary_type: "",
    batch_start_year: "",
    batch_end_year: "",
    Skills: getCommaSeparatedTags(),
  });
  const [videoFile, setVideoFile] = useState(null);

  const baseurl = "https://api.sentryspot.co.uk/api/employeer/";
  const token = localStorage.getItem(Constant.USER_TOKEN); // Replace with your actual token

  
  
  

 const fetchJobDataById = async (jobId) => {
    try {
      const response = await axios.get(`${baseurl}job-post`, {
        headers: { Authorization: token },
      });

      if (response.data) {
        const jobData = response.data.data;
        setFormData({
          job_title: jobData.job_title || "",
          location: `${jobData.city}, ${jobData.state}, ${jobData.country}` || "",
          description: jobData.description || "",
          category_id: jobData.category_id || "",
          functional_area_id: jobData.functional_area_id || "",
          experience_year: jobData.experience_year || "",
          expected_experience_year: jobData.expected_experience_year || "",
          salary_type: jobData.salary_type || "",
          expected_salary_type: jobData.expected_salary_type || "",
          batch_start_year: jobData.batch_start_year || "",
          batch_end_year: jobData.batch_end_year || "",
          Skills: jobData.skills || "",
        });

        // Set location-related state
        setCountryId(jobData.country_id);
        setStateId(jobData.state_id);
        setCityId(jobData.city_id);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast.error("Failed to fetch job data.");
    }
  };


  useEffect(() => {
    if (isOpen) {
      setKeywords({
        job: formData.job_title || "",
        location: formData.location || "",
      });
    }
  }, [isOpen, formData]);

  useEffect(() => {
    axios
      .get(`${baseurl}experience`, { headers: { Authorization: token } })
      .then((response) => setExperienceYears(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}experience`, { headers: { Authorization: token } })
      .then((response) => setExpectedExperienceYears(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}job-categories`, { headers: { Authorization: token } })
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}functional-area`, { headers: { Authorization: token } })
      .then((response) => setFunctionalTypes(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}salary-range`, { headers: { Authorization: token } })
      .then((response) => setSalaryTypes(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}salary-range`, { headers: { Authorization: token } })
      .then((response) => setExpectedSalaryTypes(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}years`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBatchTypes(response.data.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.sentryspot.co.uk/api/employeer/job-types', {
        headers: {
          Authorization: token,
        },
      })
      .then(response => setJobTypes(response.data.data))
      .catch(error => console.error("Error fetching job types:", error));
  }, []);

  const fetchData = async (url, setData, dropdownKey) => {
    try {
      const response = await axios.get(url);
      setData(response.data.data || []);
      setDropdownVisibility((prev) => ({ ...prev, [dropdownKey]: true }));
    } catch (error) {
      console.error(`Error fetching ${dropdownKey}:`, error);
    }
  };

  useEffect(() => {
    if (keywords.job.length > 1)
      fetchData(
        `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${keywords.job}`,
        setJobTitles,
        "job"
      );
    else setDropdownVisibility((prev) => ({ ...prev, job: false }));
  }, [keywords.job]);

  useEffect(() => {
    if (keywords.location.length > 1)
      fetchData(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${keywords.location}`,
        (data) => {
          const countries = data.countries || [];
          const states = countries.flatMap((c) => c.states) || [];
          const cities = states.flatMap((s) => s.cities) || [];
          const locationsData = cities.map((city) => {
            const state = states.find((s) => s.cities.some((c) => c.id === city.id));
            const country = countries.find((c) => c.states.some((s) => s.id === state.id));
  
            return {
              city: city.name,
              state: state?.name,
              country: country?.name,
              country_id: country?.id,
              state_id: state?.id,
              city_id: city.id
            };
          });
          setLocations(locationsData);
        },
        "location"
      );
    else setDropdownVisibility((prev) => ({ ...prev, location: false }));
  }, [keywords.location]);
  
  

 // const handleChange = (key) => (e) =>
    //setKeywords({ ...keywords, [key]: e.target.value });


 const handleSelect = (key, selectedItem) => {
  if (key === "job") {
    setKeywords((prevKeywords) => ({
      ...prevKeywords,
      [key]: selectedItem // Assuming selectedItem is a string
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      job_title: selectedItem // Ensure selectedItem contains the correct job title
    }));
  } else if (key === "location") {
    setKeywords((prevKeywords) => ({
      ...prevKeywords,
      [key]: `${selectedItem.city}, ${selectedItem.state}, ${selectedItem.country}`
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: `${selectedItem.city}, ${selectedItem.state}, ${selectedItem.country}`
    }));
    setCountryId(selectedItem.country_id);
    setStateId(selectedItem.state_id);
    setCityId(selectedItem.city_id);
  }

  setDropdownVisibility((prevVisibility) => ({
    ...prevVisibility,
    [key]: false
  }));
};

  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

 // Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Strip HTML tags from description
  const strippedDescription = stripHtmlTags(formData.description);

  // Validate required fields
  if (!strippedDescription.trim()) {
    alert("Please enter a job description.");
    return;
  }

   // Get comma-separated tags
   const skills = getCommaSeparatedTags();
   if (!skills) {
     alert("Please select at least one skill.");
     return;
   }
    

  try {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("job_title", formData.job_title);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("job_description", strippedDescription); // Strip HTML tags
    formDataToSubmit.append("category_id", formData.category_id);
    formDataToSubmit.append("functional_area_id", formData.functional_area_id);
    formDataToSubmit.append("experience_year", formData.experience_year);
    formDataToSubmit.append("expected_experience_year", formData.expected_experience_year);
    formDataToSubmit.append("salary_type", formData.salary_type);
    formDataToSubmit.append("expected_salary_type", formData.expected_salary_type);
    formDataToSubmit.append("batch_start_year", formData.batch_start_year);
    formDataToSubmit.append("batch_end_year", formData.batch_end_year);
    formDataToSubmit.append("skills", skills);
    formDataToSubmit.append("country_id", countryId || "");
    formDataToSubmit.append("state_id", stateId || "");
    formDataToSubmit.append("city_id", cityId || "");

    if (videoFile) {
      formDataToSubmit.append("video_jd_file", videoFile);
    }

    console.log("Submitting form data:", Object.fromEntries(formDataToSubmit));

    const response = await axios.put(`${baseurl}job-post/${jobId}`,     formDataToSubmit,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    toast.success("Job posted successfully:", response.data);
  } catch (error) {
    if (error.response) {
      toast.error("Error details:", error.response.data);
    } else {
      toast.error("Error posting job:", error);
    }
  }
};

console.log("Selected Tags:", selectedTags);
console.log("Comma-Separated Tags:", getCommaSeparatedTags());


  const handleTypeClick = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };
  
  const getIcon = (jobTypeName) => {
    switch (jobTypeName.toLowerCase()) {
      case "full-time":
        return <BriefcaseIcon className="w-8 h-8" />;
      case "part-time":
        return <ClockIcon className="w-8 h-8" />;
      case "contract":
        return <IoDocument className="w-8 h-8" />;
      case "temporary":
        return <ClockIcon className="w-8 h-8 text-yellow-500" />;
      case "other":
        return <FaPerson className="w-8 h-8" />;
      case "volunteer":
        return <HandIcon className="w-8 h-8" />;
      case "internship":
        return <FaUserGroup className="w-8 h-8" />;
      default:
        return <UserIcon className="w-8 h-8" />;
    }
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [makesUsUnique, setMakesUsUnique] = useState([
    {
      title: "Save time to automating your hiring workflow",
      Description_title: "Rejection email preview",
      Description: "Applicant will recive this message",
      key: "health_insurance",
      toogle: true,
      value: "",
    },
  ]);

  const Dhiring = [
    { icon: <IoFemale size={30} color="gray" />, label: "female Candidate" },
    {
      icon: <SlUserFemale size={30} color="gray" />,
      label: "women joining back the work force",
    },
    {
      icon: <IoShieldOutline size={30} color="gray" />,
      label: "Ex-Defence personnel",
    },
    {
      icon: <BiHandicap size={30} color="gray" />,
      label: " Differently abled candidates",
    },
    { icon: <SlUserFemale size={30} color="gray" />, label: "work from home" },
  ];
  const handleSelect1 = (id) => {
    setSelectedItem(id);
  };

  const handleAiAssist = async () => {
    const { job_title, location } = formData;
  
    // Check if both job_title and location are provided
    if (!job_title || !location) {
      alert("Please select a job title and location before proceeding.");
      return;
    }
  
    // Ensure values are clean and formatted as strings
    const cleanJobTitle = String(job_title).trim();
    const cleanLocation = String(location).trim();
  
    // Construct the request body as a string
    const requestBody = {
      keyword: "Job Description",
      title: cleanJobTitle,
      company: "SVAP Infotech",
      location: cleanLocation,
    };
  
    console.log("Request Body for AI Assist:", JSON.stringify(requestBody));
  
    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/employeer/ai-job-description",
        requestBody, {
          headers: {
            
            Authorization: token,
          },
        }
      );
      console.log("AI Assist Response:", response.data);
      if (response.data.code === 200) {
        // Update the job description with the AI response
        setFormData({
          ...formData,
          description: response.data.data.description,
        });
      } else {
        alert("Failed to get job description from AI. Please try again.");
      }
    } catch (error) {
      console.error("Error with AI Assist:", error);
      alert("Failed to fetch AI job description. Please try again.");
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
  
    // Clear the title if the user backspaces and clears the field
    if (field === "job" && value === "") {
      setTitle("");
    }
  
    setKeywords({ ...keywords, [field]: value });
  };
  

  return (
    <div className="absolute top-0   items-center justify-center col-lg-12 bg-blue-800 overflow-y-auto h-4/5 p-2 rounded-xl">
     <h1 className='text-2xl font-semibold m-2 text-white'> Edit job</h1>
     <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white border-2 rounded-full p-2  hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 9.293l4.707-4.707a1 1 0 00-1.414-1.414L10 7.586 5.707 3.293A1 1 0 104.293 4.707L8.586 9l-4.293 4.293a1 1 0 001.414 1.414L10 10.414l4.293 4.293a1 1 0 001.414-1.414L10 9.293z" clipRule="evenodd" />
        </svg>
      </button>
   <div className='bg-slate-100  p-5 rounded-xl '>

   <form className="default-form" onSubmit={handleSubmit}>
      <div className="form-group col-lg-12 col-md-12  mt-4">
        <label htmlFor="job" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="job"
          placeholder="Type job title"
          onChange={handleChange("job")}
          value={keywords.job || title }
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {dropdownVisibility.job && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {jobTitles.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect("job", item.name)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-group col-lg-12 col-md-12 relative mt-4">
  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
    Location
  </label>
  <input
    type="text"
    name="location"
    placeholder="Type location"
    onChange={handleChange("location")}
    value={keywords.location || (cities,states,countries)}
    required
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
  {dropdownVisibility.location && (
    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
      {locations.map((item, index) => (
        <li
          key={index}
          onClick={() => handleSelect("location", item)}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
        >
          {item.city}, {item.state}, {item.country}
        </li>
      ))}
    </ul>
  )}
</div>

{/* Description Editor */}
<div className="form-group col-lg-12 col-md-12 mt-4">
  <div className="flex justify-between">
    <label htmlFor="description" className="pt-4 font-semibold">
      Job Description
    </label>
    <button
      className="border-1 border-violet-700 rounded-md py-2 px-2 m-2 font-semibold"
      onClick={handleAiAssist}
    >
      AI Assist +
    </button>
  </div>
  <ReactQuill
    value={formData.description}
    onChange={handleDescriptionChange}
    className={`mt-1 border border-gray-300 h- rounded-md shadow-sm ${!formData.description ? 'border-red-500' : ''}`}
    placeholder="Enter job description..."
  />
  {!formData.description && (
    <p className="text-red-500 text-sm mt-1">Job description is required.</p>
  )}
</div>


      {/* Experience Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="experience_year" className="block text-sm font-medium text-gray-700">
        Min Experience Year
        </label>
        <select
          name="experience_year"
          value={formData.experience_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Min Experience Year</option>
          {experienceYears.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Expected Experience Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="expected_experience_year" className="block text-sm font-medium text-gray-700">
          Max Experience Year
        </label>
        <select
          name="expected_experience_year"
          value={formData.expected_experience_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value=""> Max Experience Year</option>
          {expectedExperienceYears.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
          Job Category
        </label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleFormChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Job Category</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Functional Area Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="functional_area_id" className="block text-sm font-medium text-gray-700">
          Functional Area
        </label>
        <select
          name="functional_area_id"
          value={formData.functional_area_id}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Functional Area</option>
          {functionalTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Type Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="salary_type" className="block text-sm font-medium text-gray-700">
          Salary Type
        </label>
        <select
          name="salary_type"
          value={formData.salary_type}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Salary Type</option>
          {salaryTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Expected Salary Type Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="expected_salary_type" className="block text-sm font-medium text-gray-700">
          Expected Salary Type
        </label>
        <select
          name="expected_salary_type"
          value={formData.expected_salary_type}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Expected Salary Type</option>
          {expectedSalaryTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Batch Start Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="batch_start_year" className="block text-sm font-medium text-gray-700">
          Batch Start Year
        </label>
        <select
          name="batch_start_year"
          value={formData.batch_start_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Batch Start Year</option>
          {batchTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Batch End Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="batch_end_year" className="block text-sm font-medium text-gray-700">
          Batch End Year
        </label>
        <select
          name="batch_end_year"
          value={formData.batch_end_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Batch End Year</option>
          {batchTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Video Upload */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
          Upload Video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      


      <div className="form-group col-lg-12 col-md-12 mt-4">
        <div className="flex justify-between">
          <label htmlFor="tags" className="pt-4 font-semibold">
            Skills
          </label>
          <button className="border-1 border-violet-700 rounded-md py-2 px-2 m-2 font-semibold">
            AI Assist +
          </button>
        </div>
        <MultiSelector
  values={selectedTags}
  onValuesChange={(e) => {
    // Debugging to check how values are updated
    console.log("Updated Tags:", e);
    setSelectedTags(e);
  }}
  className="w-full relative"
  name="tags"
>
  <MultiSelectorTrigger className="bg-blue-200">
    <MultiSelectorInput
      placeholder="Select tags"
      className="bg-blue-500"
    />
  </MultiSelectorTrigger>
  <MultiSelectorContent>
    <MultiSelectorList className="bg-white absolute z-10">
      {tags.map((item) => (
        <MultiSelectorItem value={item.value} key={item.value}>
          {item.label}
        </MultiSelectorItem>
      ))}
    </MultiSelectorList>
  </MultiSelectorContent>
</MultiSelector>

      </div>

 {/* Course Type Section */}
 <div className="form-group col-lg-12 col-md-12">
  <label htmlFor="job_type">Course Type</label>
  <div className="flex flex-wrap gap-4 mt-2">
    {jobTypes.map((jobType) => (
      <div
        key={jobType.id}
        className={`relative cursor-pointer p-2 rounded-lg flex flex-col items-center justify-center w-40 h-36 text-center 
          ${selectedTypes.includes(jobType.id)
            ? "shadow-inner shadow-indigo-700 border-2 border-violet-700"
            : "border "}`}
        onClick={() => handleTypeClick(jobType.id)}
      >
        <div className="text-center">
          <div>{getIcon(jobType.name)}</div>
        </div>
        <p className="text-sm mt-2">{jobType.name}</p>
        {selectedTypes.includes(jobType.id) && (
          <CheckIcon className="absolute -top-2 -right-1 rounded-full border-2 border-violet-700 w-7 h-7 text-violet-700 bg-white" />
        )}
      </div>
    ))}
  </div>
</div>


 <div className="form-group col-lg-12 col-md-12 my-3">
          <label htmlFor="email">Add Screening Questions</label> <br />
          Candidates will be asked to answer these question before they submit
          their application. You can add up to 10 questions.
          <br />
          <button className="border-1 rounded-md py-2 my-5 border-violet-500">
            Add Question
          </button>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="diversity_hiring">Diversity hiring !</label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Dhiring?.map((item, id) => (
              <div
                key={id}
                className={`relative flex flex-col items-center justify-center border  p-2 text-center cursor-pointer ${
                  selectedItem === id
                    ? "  border-blue-500 border-4"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelect1(id)}
              >
                {selectedItem === id && (
                  <FaCheckCircle className="absolute top-0 right-0 text-blue-500 m-1" />
                )}
                <div className="text-xl mb-1 flex justify-center items-center">
                  {item?.icon}
                </div>
                <p className="text-sm font-medium">{item?.label}</p>
              </div>
            ))}
          </div>
        </div>

        {makesUsUnique?.map((item, index) => (
          <div className="form-group col-lg-12 col-md-12 " key={index}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[15px] font-semibold">{item?.title}</label>

              <Switch
                className="rounded-xl data-[state=checked]:bg-[#0292e6]"
                checked={item?.toogle}
                onCheckedChange={(e) => {
                  setMakesUsUnique((prev) => {
                    return prev.map((val) => {
                      if (val?.key === item?.key) {
                        return { ...item, toogle: e };
                      }
                      return val;
                    });
                  });
                }}
              />
            </div>
            <h3 className="my-4 mt-10 ">{item?.Description}</h3>
            <h3 className="mb-2">{item?.Description_title}</h3>
            {item?.toogle && (
              <input
                type="text"
                className="h-40 "
                style={{ height: "200px" }}
                placeholder={item?.title}
              />
            )}
          </div>
        ))}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one" type="submit" >
           
          </button>
        </div>
      


      <button
        type="submit"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
   </div>
    </div>
  );
};


<<<<<<< HEAD
=======
=======
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FaDoorClosed, FaFacebook, FaFolder, FaLinkedinIn, FaPen, FaTrashAlt, FaCheckCircle, FaBan } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';
import moment from 'moment';

export default function JobListingsTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
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
        setData(result.data || []); // Set the job array, default to an empty array
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

  const handleDeleteJob = async () => {
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-post/${jobToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      toast.success('Job deleted successfully');
      // Re-fetch the job listings after successful deletion
      const updatedData = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
        headers: {
          Authorization: token,
        },
      }).then(res => res.json());

      setData(updatedData.data || []);
    } catch (error) {
      toast.error(error.message || 'Error deleting job');
    } finally {
      setShowDeleteConfirm(false);
      setJobToDelete(null);
    }
  };

  const confirmDeleteJob = (id) => {
    setJobToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handlePublishJob = async (id, currentStatus) => {
    const jobStatusId = currentStatus === 0 ? 1 : 0; // Toggle job_status_id (1 for publish, 0 for unpublish)
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-status/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_status_id: jobStatusId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${currentStatus === 0 ? 'publish' : 'unpublish'} job`);
      }

      toast.success(`Job ${currentStatus === 0 ? 'published' : 'unpublished'} successfully`);
      // Re-fetch the job listings after successful publish/unpublish
      const updatedData = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
        headers: {
          Authorization: token,
        },
      }).then(res => res.json());

      setData(updatedData.data || []);
    } catch (error) {
      toast.error(error.message || `Error ${currentStatus === 0 ? 'publishing' : 'unpublishing'} job`);
    }
  };

  const shareJob = (jobId) => {
    const jobUrl = `https://yourwebsite.com/job/${jobId}`; // Update with your actual job link
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;

    window.open(facebookShareUrl, '_blank');
    // Uncomment to share on LinkedIn
    // window.open(linkedinShareUrl, '_blank');
  };

  return (
    // <div className="min-h-screen bg-white p-2 relative">
    //   <div className="flex">
        
    //     <main className="flex-1 pe-2">
    //       <div className="flex justify-between items-center mb-4">
    //         <h1 className="text-2xl font-bold">Job Details</h1>
    //         <Link to={"/employers-dashboard/post-jobs"}>
    //           <Button className="bg-blue-900 text-white">Post Job</Button>
    //         </Link>
    //       </div>
    //       <div className="overflow-x-auto border">
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-blue-100">
    //             <tr>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">CREATED ON</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">JOB TITLE</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ENGAGEMENT</th>
    //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
    //             </tr>
    //           </thead>
    //           <tbody className="bg-white divide-y divide-gray-200">
    //             {data.length > 0 ? (
    //               data.map((job) => (
    //                 <tr key={job.job_detail.id}>
    //                   <td className="px-6 py-4 text-sm text-gray-500">{moment(job.job_detail.created_at).format("MMM Do YYYY")}</td>
    //                   <td className="px-6 py-4 text-sm font-medium text-green-600">
    //                     <a href="#">{job.job_detail.job_title || "N/A"}</a>
    //                     <div className="text-sm text-gray-500">{job.job_detail.experience_id_min || "0"} - {job.job_detail.experience_id_min || "0"} year • {job.cities?.name}, {job.states?.name}, {job.countries?.name}</div>
    //                   </td>
    //                   <td className="px-6 py-4 text-sm text-gray-500 "><p className='bg-pink-200 px-2 p-1 rounded-3xl'>{job.job_detail.job_status_id === 1 ? `Published 🖋️` : `Unpublished 🖊`}</p></td>
    //                   <td className="px-6 py-4 text-sm text-gray-500">
    //                     <div>4571 Views</div>
    //                     <Link to={"/employers-list"}><button className='underline text-blue-600'>2143 Applied</button></Link>
    //                   </td>
    //                   <td className="px-6 py-4 text-sm font-medium">
    //                     <div className="flex space-x-2">
    //                       <FaPen className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => handleEditClick(job.job_detail.id)} />
                        
    //                       <FaTrashAlt className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => confirmDeleteJob(job.job_detail.id)} />
    //                       {job.job_detail.job_status_id === 0 ? (
    //                         <FaCheckCircle className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => handlePublishJob(job.job_detail.id, 0)} />
    //                       ) : (
    //                         <FaBan className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => handlePublishJob(job.job_detail.id, 1)} />
    //                       )}
    //                       <FaLinkedinIn className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => shareJob(job.job_detail.id)} />
    //                       <FaFacebook className="w-4 h-4 text-blue-700 cursor-pointer" onClick={() => shareJob(job.job_detail.id)} />
    //                     </div>
    //                   </td>
    //                 </tr>
    //               ))
    //             ) : (
    //               <tr>
    //                   <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">No job details available</td>
    //               </tr>
    //             )}
    //           </tbody>
    //         </table>
    //       </div>
    //       {showPopup && (
    //         <PopupForm
    //           jobId={selectedJobId}
    //           onClose={closePopup}
    //           title={data.find(job => job.job_detail.id === selectedJobId)?.job_detail.job_title}
    //           cities={data.find(job => job.job_detail.id === selectedJobId)?.cities?.name}
    //           states={data.find(job => job.job_detail.id === selectedJobId)?.states?.name}
    //           countries={data.find(job => job.job_detail.id === selectedJobId)?.countries?.name}
    //         />
    //       )}

    //       {showDeleteConfirm && (
    //         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    //           <div className="bg-white p-6 rounded shadow-md">
    //             <h2 className="text-lg font-bold">Confirm Deletion</h2>
    //             <p>Are you sure you want to delete this job?</p>
    //             <div className="flex justify-end space-x-2 mt-4">
    //               <Button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300">Cancel</Button>
    //               <Button onClick={handleDeleteJob} className="bg-red-600 text-white">Delete</Button>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </main>
    //   </div>
    // </div>
    <div className="min-h-screen bg-white p-2 relative">
    <div className="flex flex-col lg:flex-row">
      <main className="flex-1 pe-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
          <h1 className="text-2xl font-bold">Job Details</h1>
          <Link to={"/employers-dashboard/post-jobs"}>
            <Button className="bg-blue-900 text-white">Post Job</Button>
          </Link>
        </div>
        
        <div className="w-full overflow-x-auto border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase whitespace-nowrap">CREATED ON</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">JOB TITLE</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ENGAGEMENT</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((job) => (
                  <tr key={job.job_detail.id}>
                    <td className="px-6 py-4 text-md text-black font-medium whitespace-nowrap">
                      {moment(job.job_detail.created_at).format("MMM Do YYYY")}
                    </td>
                    <td className="px-6 py-4 text-md font-medium text-green-600">
                      <a href="#">{job.job_detail.job_title || "N/A"}</a>
                      <div className="text-md text-gray-500">
                        {job.job_detail.experience_id_min || "0"} - {job.job_detail.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-md text-gray-500">
                      <p className='bg-pink-200 px-2 p-1 rounded-3xl text-center whitespace-nowrap'>
                        {job.job_detail.job_status_id === 1 ? `Published 🖋️` : `Unpublished 🖊`}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-md text-gray-700 whitespace-nowrap">
                      <div>4571 Views</div>
                      <Link to={"/employers-list"}>
                        <button className=' text-md underline text-blue-700'>2143 Applied</button>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-2">
                        <FaPen 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => handleEditClick(job.job_detail.id)} 
                        />
                        <FaTrashAlt 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => confirmDeleteJob(job.job_detail.id)} 
                        />
                        {job.job_detail.job_status_id === 0 ? (
                          <FaCheckCircle 
                            className="w-4 h-4 text-blue-700 cursor-pointer" 
                            onClick={() => handlePublishJob(job.job_detail.id, 0)} 
                          />
                        ) : (
                          <FaBan 
                            className="w-4 h-4 text-red-500 cursor-pointer" 
                            onClick={() => handlePublishJob(job.job_detail.id, 1)} 
                          />
                        )}
                        <FaLinkedinIn 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => shareJob(job.job_detail.id)} 
                        />
                        <FaFacebook 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => shareJob(job.job_detail.id)} 
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">
                    No job details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showPopup && (
          <PopupForm
            jobId={selectedJobId}
            onClose={closePopup}
            title={data.find(job => job.job_detail.id === selectedJobId)?.job_detail.job_title}
            cities={data.find(job => job.job_detail.id === selectedJobId)?.cities?.name}
            states={data.find(job => job.job_detail.id === selectedJobId)?.states?.name}
            countries={data.find(job => job.job_detail.id === selectedJobId)?.countries?.name}
          />
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this job?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleDeleteJob} className="bg-red-600 text-white">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
  );
}




import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList,MultiSelectorTrigger } from "@/components/ui/multiSelector";
import { BriefcaseIcon, CheckIcon, ClockIcon, HandIcon, UserIcon } from "lucide-react";
import { IoDocument } from "react-icons/io5";
import { FaPennyArcade } from "react-icons/fa";
import { FaPerson, FaUserGroup } from "react-icons/fa6";
import { IoFemale, IoShieldOutline } from "react-icons/io5";
import { SlUserFemale } from "react-icons/sl";
import { BiHandicap } from "react-icons/bi";
import { Switch } from "@/components/ui/switch";


const tags = [
  { value: "Banking", label: "Banking" },
  { value: "Digital & Creative", label: "Digital & Creative" },
  { value: "Retail", label: "Retail" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Management", label: "Management" },
  { value: "Accounting & Finance", label: "Accounting & Finance" },
  { value: "Digital", label: "Digital" },
  { value: "Creative Art", label: "Creative Art" },
];

const PopupForm = ({ isOpen, onClose, jobId ,title,cities,states,countries}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [experienceYears, setExperienceYears] = useState([]);
  const [expectedExperienceYears, setExpectedExperienceYears] = useState([]);
  const [categories, setCategories] = useState([]);
  const [functionalTypes, setFunctionalTypes] = useState([]);
  const [salaryTypes, setSalaryTypes] = useState([]);
  const [expectedSalaryTypes, setExpectedSalaryTypes] = useState([]);
  const [batchTypes, setBatchTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  
  const [keywords, setKeywords] = useState({ job: "", location: "" });
  const [dropdownVisibility, setDropdownVisibility] = useState({
    job: false,
    location: false,
  });

  useEffect(() => {
    if (jobId) {
      fetchJobDataById(jobId);
    }
  }, [jobId]);

  const getCommaSeparatedTags = () => {
    if (selectedTags.length === 0) {
      return "";
    }
    return Array.isArray(selectedTags) ? selectedTags.join(', ') : "";
  };
  
  
  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    description: "",
    category_id: "",
    functional_area_id: "",
    experience_year: "",
    expected_experience_year: "",
    salary_type: "",
    expected_salary_type: "",
    batch_start_year: "",
    batch_end_year: "",
    Skills: getCommaSeparatedTags(),
  });
  const [videoFile, setVideoFile] = useState(null);

  const baseurl = "https://api.sentryspot.co.uk/api/employeer/";
  const token = localStorage.getItem(Constant.USER_TOKEN); // Replace with your actual token

  
  
  

 const fetchJobDataById = async (jobId) => {
    try {
      const response = await axios.get(`${baseurl}job-post`, {
        headers: { Authorization: token },
      });

      if (response.data) {
        const jobData = response.data.data;
        setFormData({
          job_title: jobData.job_title || "",
          location: `${jobData.city}, ${jobData.state}, ${jobData.country}` || "",
          description: jobData.description || "",
          category_id: jobData.category_id || "",
          functional_area_id: jobData.functional_area_id || "",
          experience_year: jobData.experience_year || "",
          expected_experience_year: jobData.expected_experience_year || "",
          salary_type: jobData.salary_type || "",
          expected_salary_type: jobData.expected_salary_type || "",
          batch_start_year: jobData.batch_start_year || "",
          batch_end_year: jobData.batch_end_year || "",
          Skills: jobData.skills || "",
        });

        // Set location-related state
        setCountryId(jobData.country_id);
        setStateId(jobData.state_id);
        setCityId(jobData.city_id);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast.error("Failed to fetch job data.");
    }
  };


  useEffect(() => {
    if (isOpen) {
      setKeywords({
        job: formData.job_title || "",
        location: formData.location || "",
      });
    }
  }, [isOpen, formData]);

  useEffect(() => {
    axios
      .get(`${baseurl}experience`, { headers: { Authorization: token } })
      .then((response) => setExperienceYears(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}experience`, { headers: { Authorization: token } })
      .then((response) => setExpectedExperienceYears(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}job-categories`, { headers: { Authorization: token } })
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}functional-area`, { headers: { Authorization: token } })
      .then((response) => setFunctionalTypes(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}salary-range`, { headers: { Authorization: token } })
      .then((response) => setSalaryTypes(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}salary-range`, { headers: { Authorization: token } })
      .then((response) => setExpectedSalaryTypes(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseurl}years`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBatchTypes(response.data.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.sentryspot.co.uk/api/employeer/job-types', {
        headers: {
          Authorization: token,
        },
      })
      .then(response => setJobTypes(response.data.data))
      .catch(error => console.error("Error fetching job types:", error));
  }, []);

  const fetchData = async (url, setData, dropdownKey) => {
    try {
      const response = await axios.get(url);
      setData(response.data.data || []);
      setDropdownVisibility((prev) => ({ ...prev, [dropdownKey]: true }));
    } catch (error) {
      console.error(`Error fetching ${dropdownKey}:`, error);
    }
  };

  useEffect(() => {
    if (keywords.job.length > 1)
      fetchData(
        `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${keywords.job}`,
        setJobTitles,
        "job"
      );
    else setDropdownVisibility((prev) => ({ ...prev, job: false }));
  }, [keywords.job]);

  useEffect(() => {
    if (keywords.location.length > 1)
      fetchData(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${keywords.location}`,
        (data) => {
          const countries = data.countries || [];
          const states = countries.flatMap((c) => c.states) || [];
          const cities = states.flatMap((s) => s.cities) || [];
          const locationsData = cities.map((city) => {
            const state = states.find((s) => s.cities.some((c) => c.id === city.id));
            const country = countries.find((c) => c.states.some((s) => s.id === state.id));
  
            return {
              city: city.name,
              state: state?.name,
              country: country?.name,
              country_id: country?.id,
              state_id: state?.id,
              city_id: city.id
            };
          });
          setLocations(locationsData);
        },
        "location"
      );
    else setDropdownVisibility((prev) => ({ ...prev, location: false }));
  }, [keywords.location]);
  
  

 // const handleChange = (key) => (e) =>
    //setKeywords({ ...keywords, [key]: e.target.value });


 const handleSelect = (key, selectedItem) => {
  if (key === "job") {
    setKeywords((prevKeywords) => ({
      ...prevKeywords,
      [key]: selectedItem // Assuming selectedItem is a string
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      job_title: selectedItem // Ensure selectedItem contains the correct job title
    }));
  } else if (key === "location") {
    setKeywords((prevKeywords) => ({
      ...prevKeywords,
      [key]: `${selectedItem.city}, ${selectedItem.state}, ${selectedItem.country}`
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: `${selectedItem.city}, ${selectedItem.state}, ${selectedItem.country}`
    }));
    setCountryId(selectedItem.country_id);
    setStateId(selectedItem.state_id);
    setCityId(selectedItem.city_id);
  }

  setDropdownVisibility((prevVisibility) => ({
    ...prevVisibility,
    [key]: false
  }));
};

  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

 // Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Strip HTML tags from description
  const strippedDescription = stripHtmlTags(formData.description);

  // Validate required fields
  if (!strippedDescription.trim()) {
    alert("Please enter a job description.");
    return;
  }

   // Get comma-separated tags
   const skills = getCommaSeparatedTags();
   if (!skills) {
     alert("Please select at least one skill.");
     return;
   }
    

  try {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("job_title", formData.job_title);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("job_description", strippedDescription); // Strip HTML tags
    formDataToSubmit.append("category_id", formData.category_id);
    formDataToSubmit.append("functional_area_id", formData.functional_area_id);
    formDataToSubmit.append("experience_year", formData.experience_year);
    formDataToSubmit.append("expected_experience_year", formData.expected_experience_year);
    formDataToSubmit.append("salary_type", formData.salary_type);
    formDataToSubmit.append("expected_salary_type", formData.expected_salary_type);
    formDataToSubmit.append("batch_start_year", formData.batch_start_year);
    formDataToSubmit.append("batch_end_year", formData.batch_end_year);
    formDataToSubmit.append("skills", skills);
    formDataToSubmit.append("country_id", countryId || "");
    formDataToSubmit.append("state_id", stateId || "");
    formDataToSubmit.append("city_id", cityId || "");

    if (videoFile) {
      formDataToSubmit.append("video_jd_file", videoFile);
    }

    console.log("Submitting form data:", Object.fromEntries(formDataToSubmit));

    const response = await axios.put(`${baseurl}job-post/${jobId}`,     formDataToSubmit,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    toast.success("Job posted successfully:", response.data);
  } catch (error) {
    if (error.response) {
      toast.error("Error details:", error.response.data);
    } else {
      toast.error("Error posting job:", error);
    }
  }
};

console.log("Selected Tags:", selectedTags);
console.log("Comma-Separated Tags:", getCommaSeparatedTags());


  const handleTypeClick = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };
  
  const getIcon = (jobTypeName) => {
    switch (jobTypeName.toLowerCase()) {
      case "full-time":
        return <BriefcaseIcon className="w-8 h-8" />;
      case "part-time":
        return <ClockIcon className="w-8 h-8" />;
      case "contract":
        return <IoDocument className="w-8 h-8" />;
      case "temporary":
        return <ClockIcon className="w-8 h-8 text-yellow-500" />;
      case "other":
        return <FaPerson className="w-8 h-8" />;
      case "volunteer":
        return <HandIcon className="w-8 h-8" />;
      case "internship":
        return <FaUserGroup className="w-8 h-8" />;
      default:
        return <UserIcon className="w-8 h-8" />;
    }
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [makesUsUnique, setMakesUsUnique] = useState([
    {
      title: "Save time to automating your hiring workflow",
      Description_title: "Rejection email preview",
      Description: "Applicant will recive this message",
      key: "health_insurance",
      toogle: true,
      value: "",
    },
  ]);

  const Dhiring = [
    { icon: <IoFemale size={30} color="gray" />, label: "female Candidate" },
    {
      icon: <SlUserFemale size={30} color="gray" />,
      label: "women joining back the work force",
    },
    {
      icon: <IoShieldOutline size={30} color="gray" />,
      label: "Ex-Defence personnel",
    },
    {
      icon: <BiHandicap size={30} color="gray" />,
      label: " Differently abled candidates",
    },
    { icon: <SlUserFemale size={30} color="gray" />, label: "work from home" },
  ];
  const handleSelect1 = (id) => {
    setSelectedItem(id);
  };

  const handleAiAssist = async () => {
    const { job_title, location } = formData;
  
    // Check if both job_title and location are provided
    if (!job_title || !location) {
      alert("Please select a job title and location before proceeding.");
      return;
    }
  
    // Ensure values are clean and formatted as strings
    const cleanJobTitle = String(job_title).trim();
    const cleanLocation = String(location).trim();
  
    // Construct the request body as a string
    const requestBody = {
      keyword: "Job Description",
      title: cleanJobTitle,
      company: "SVAP Infotech",
      location: cleanLocation,
    };
  
    console.log("Request Body for AI Assist:", JSON.stringify(requestBody));
  
    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/employeer/ai-job-description",
        requestBody, {
          headers: {
            
            Authorization: token,
          },
        }
      );
      console.log("AI Assist Response:", response.data);
      if (response.data.code === 200) {
        // Update the job description with the AI response
        setFormData({
          ...formData,
          description: response.data.data.description,
        });
      } else {
        alert("Failed to get job description from AI. Please try again.");
      }
    } catch (error) {
      console.error("Error with AI Assist:", error);
      alert("Failed to fetch AI job description. Please try again.");
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
  
    // Clear the title if the user backspaces and clears the field
    if (field === "job" && value === "") {
      setTitle("");
    }
  
    setKeywords({ ...keywords, [field]: value });
  };
  

  return (
    <div className="absolute top-0   items-center justify-center col-lg-12 bg-blue-800 overflow-y-auto h-4/5 p-2 rounded-xl">
     <h1 className='text-2xl font-semibold m-2 text-white'> Edit job</h1>
     <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white border-2 rounded-full p-2  hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 9.293l4.707-4.707a1 1 0 00-1.414-1.414L10 7.586 5.707 3.293A1 1 0 104.293 4.707L8.586 9l-4.293 4.293a1 1 0 001.414 1.414L10 10.414l4.293 4.293a1 1 0 001.414-1.414L10 9.293z" clipRule="evenodd" />
        </svg>
      </button>
   <div className='bg-slate-100  p-5 rounded-xl '>

   <form className="default-form" onSubmit={handleSubmit}>
      <div className="form-group col-lg-12 col-md-12  mt-4">
        <label htmlFor="job" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="job"
          placeholder="Type job title"
          onChange={handleChange("job")}
          value={keywords.job || title }
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {dropdownVisibility.job && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {jobTitles.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect("job", item.name)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-group col-lg-12 col-md-12 relative mt-4">
  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
    Location
  </label>
  <input
    type="text"
    name="location"
    placeholder="Type location"
    onChange={handleChange("location")}
    value={keywords.location || (cities,states,countries)}
    required
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
  {dropdownVisibility.location && (
    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
      {locations.map((item, index) => (
        <li
          key={index}
          onClick={() => handleSelect("location", item)}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
        >
          {item.city}, {item.state}, {item.country}
        </li>
      ))}
    </ul>
  )}
</div>

{/* Description Editor */}
<div className="form-group col-lg-12 col-md-12 mt-4">
  <div className="flex justify-between">
    <label htmlFor="description" className="pt-4 font-semibold">
      Job Description
    </label>
    <button
      className="border-1 border-violet-700 rounded-md py-2 px-2 m-2 font-semibold"
      onClick={handleAiAssist}
    >
      AI Assist +
    </button>
  </div>
  <ReactQuill
    value={formData.description}
    onChange={handleDescriptionChange}
    className={`mt-1 border border-gray-300 h- rounded-md shadow-sm ${!formData.description ? 'border-red-500' : ''}`}
    placeholder="Enter job description..."
  />
  {!formData.description && (
    <p className="text-red-500 text-sm mt-1">Job description is required.</p>
  )}
</div>


      {/* Experience Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="experience_year" className="block text-sm font-medium text-gray-700">
        Min Experience Year
        </label>
        <select
          name="experience_year"
          value={formData.experience_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Min Experience Year</option>
          {experienceYears.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Expected Experience Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="expected_experience_year" className="block text-sm font-medium text-gray-700">
          Max Experience Year
        </label>
        <select
          name="expected_experience_year"
          value={formData.expected_experience_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value=""> Max Experience Year</option>
          {expectedExperienceYears.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
          Job Category
        </label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleFormChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Job Category</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Functional Area Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="functional_area_id" className="block text-sm font-medium text-gray-700">
          Functional Area
        </label>
        <select
          name="functional_area_id"
          value={formData.functional_area_id}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Functional Area</option>
          {functionalTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Type Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="salary_type" className="block text-sm font-medium text-gray-700">
          Salary Type
        </label>
        <select
          name="salary_type"
          value={formData.salary_type}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Salary Type</option>
          {salaryTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Expected Salary Type Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="expected_salary_type" className="block text-sm font-medium text-gray-700">
          Expected Salary Type
        </label>
        <select
          name="expected_salary_type"
          value={formData.expected_salary_type}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Expected Salary Type</option>
          {expectedSalaryTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Batch Start Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="batch_start_year" className="block text-sm font-medium text-gray-700">
          Batch Start Year
        </label>
        <select
          name="batch_start_year"
          value={formData.batch_start_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Batch Start Year</option>
          {batchTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Batch End Year Dropdown */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="batch_end_year" className="block text-sm font-medium text-gray-700">
          Batch End Year
        </label>
        <select
          name="batch_end_year"
          value={formData.batch_end_year}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Batch End Year</option>
          {batchTypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Video Upload */}
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
          Upload Video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      


      <div className="form-group col-lg-12 col-md-12 mt-4">
        <div className="flex justify-between">
          <label htmlFor="tags" className="pt-4 font-semibold">
            Skills
          </label>
          <button className="border-1 border-violet-700 rounded-md py-2 px-2 m-2 font-semibold">
            AI Assist +
          </button>
        </div>
        <MultiSelector
  values={selectedTags}
  onValuesChange={(e) => {
    // Debugging to check how values are updated
    console.log("Updated Tags:", e);
    setSelectedTags(e);
  }}
  className="w-full relative"
  name="tags"
>
  <MultiSelectorTrigger className="bg-blue-200">
    <MultiSelectorInput
      placeholder="Select tags"
      className="bg-blue-500"
    />
  </MultiSelectorTrigger>
  <MultiSelectorContent>
    <MultiSelectorList className="bg-white absolute z-10">
      {tags.map((item) => (
        <MultiSelectorItem value={item.value} key={item.value}>
          {item.label}
        </MultiSelectorItem>
      ))}
    </MultiSelectorList>
  </MultiSelectorContent>
</MultiSelector>

      </div>

 {/* Course Type Section */}
 <div className="form-group col-lg-12 col-md-12">
  <label htmlFor="job_type">Course Type</label>
  <div className="flex flex-wrap gap-4 mt-2">
    {jobTypes.map((jobType) => (
      <div
        key={jobType.id}
        className={`relative cursor-pointer p-2 rounded-lg flex flex-col items-center justify-center w-40 h-36 text-center 
          ${selectedTypes.includes(jobType.id)
            ? "shadow-inner shadow-indigo-700 border-2 border-violet-700"
            : "border "}`}
        onClick={() => handleTypeClick(jobType.id)}
      >
        <div className="text-center">
          <div>{getIcon(jobType.name)}</div>
        </div>
        <p className="text-sm mt-2">{jobType.name}</p>
        {selectedTypes.includes(jobType.id) && (
          <CheckIcon className="absolute -top-2 -right-1 rounded-full border-2 border-violet-700 w-7 h-7 text-violet-700 bg-white" />
        )}
      </div>
    ))}
  </div>
</div>


 <div className="form-group col-lg-12 col-md-12 my-3">
          <label htmlFor="email">Add Screening Questions</label> <br />
          Candidates will be asked to answer these question before they submit
          their application. You can add up to 10 questions.
          <br />
          <button className="border-1 rounded-md py-2 my-5 border-violet-500">
            Add Question
          </button>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="diversity_hiring">Diversity hiring !</label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Dhiring?.map((item, id) => (
              <div
                key={id}
                className={`relative flex flex-col items-center justify-center border  p-2 text-center cursor-pointer ${
                  selectedItem === id
                    ? "  border-blue-500 border-4"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelect1(id)}
              >
                {selectedItem === id && (
                  <FaCheckCircle className="absolute top-0 right-0 text-blue-500 m-1" />
                )}
                <div className="text-xl mb-1 flex justify-center items-center">
                  {item?.icon}
                </div>
                <p className="text-sm font-medium">{item?.label}</p>
              </div>
            ))}
          </div>
        </div>

        {makesUsUnique?.map((item, index) => (
          <div className="form-group col-lg-12 col-md-12 " key={index}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[15px] font-semibold">{item?.title}</label>

              <Switch
                className="rounded-xl data-[state=checked]:bg-[#0292e6]"
                checked={item?.toogle}
                onCheckedChange={(e) => {
                  setMakesUsUnique((prev) => {
                    return prev.map((val) => {
                      if (val?.key === item?.key) {
                        return { ...item, toogle: e };
                      }
                      return val;
                    });
                  });
                }}
              />
            </div>
            <h3 className="my-4 mt-10 ">{item?.Description}</h3>
            <h3 className="mb-2">{item?.Description_title}</h3>
            {item?.toogle && (
              <input
                type="text"
                className="h-40 "
                style={{ height: "200px" }}
                placeholder={item?.title}
              />
            )}
          </div>
        ))}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one" type="submit" >
           
          </button>
        </div>
      


      <button
        type="submit"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
   </div>
    </div>
  );
};


>>>>>>> f1e11fa754775f591e317ea543474d0206a0e978
>>>>>>> 6d7632ffe52acddb269f40cae16dfe9b4aeaf5ac
