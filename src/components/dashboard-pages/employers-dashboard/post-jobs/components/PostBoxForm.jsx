import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { Constant } from "@/utils/constant/constant";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiSelector";
import {
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  HandIcon,
  Loader2,
  UserIcon,
} from "lucide-react";
import { IoDocument } from "react-icons/io5";
import { FaPennyArcade } from "react-icons/fa";
import { FaPerson, FaUserGroup } from "react-icons/fa6";
import { IoFemale, IoShieldOutline } from "react-icons/io5";
import { SlUserFemale } from "react-icons/sl";
import { BiHandicap } from "react-icons/bi";
import { Switch } from "@/components/ui/switch";
import { FaCheckCircle } from "react-icons/fa";
import { toast} from "react-toastify";
import SalarySection from "./SalarySection";
import ScreeningQuestionsForm from "./ScreeningQuestions";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobTypes } from "@/store/slices/dataSlice";
import { createJobPost } from "@/store/slices/JobPostSlice";
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

const PostBoxForm = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [experienceYears, setExperienceYears] = useState([]);
  const [expectedExperienceYears, setExpectedExperienceYears] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [industry, setIndustry] = useState([]);
  // const [functionalTypes, setFunctionalTypes] = useState([]);
  // const [salaryTypes, setSalaryTypes] = useState([]);
  const [expectedSalaryTypes, setExpectedSalaryTypes] = useState([]);
  const [batchTypes, setBatchTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const [keywords, setKeywords] = useState({ job: "", location: "" });
  const [dropdownVisibility, setDropdownVisibility] = useState({
    job: false,
    location: false,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);

  const getCommaSeparatedTags = () => {
    if (selectedTags.length === 0) {
      return "";
    }
    return Array.isArray(selectedTags) ? selectedTags.join(", ") : "";
  };

  const getCommaSeparatedCategories = () => {
    if (selectedCategories.length === 0) {
      return "";
    }
    return Array.isArray(selectedCategories) ? selectedCategories.join(", ") : "";
  };

  const { 
    salaryTypes,
    status,
    error,
    jobTypes
  } = useSelector((state) => state.data);
  const [industries, setIndustries] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
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
  const token = localStorage.getItem(Constant.USER_TOKEN); // Replace with your actual token
 
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
    if (keywords.location && keywords.location.length > 1) {
      fetchData(
        `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${keywords.location}`,
        (data) => {
           
          const locationsData = data.location_names;
  
          setLocations(locationsData);
        },
        "location"
      );
    } else {
      setDropdownVisibility((prev) => ({ ...prev, location: false }));
    }
  }, [keywords.location]);
  
  const handleSelect = (key, selectedItem) => {
    if (key === "job") {
      setKeywords((prevKeywords) => ({
        ...prevKeywords,
        [key]: selectedItem, // Assuming selectedItem is a string
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        job_title: selectedItem, // Ensure selectedItem contains the correct job title
      }));
    } else if (key === "location") {
      setKeywords((prevKeywords) => ({
        ...prevKeywords,
        [key]: selectedItem,
      }));
      // {console.log(selectedItem,">>>")}
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: selectedItem,
      }));
      
    }

    setDropdownVisibility((prevVisibility) => ({
      ...prevVisibility,
      [key]: false,
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
    const doc = new DOMParser().parseFromString(html, "text/html");
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

    // Validate categories
    if (selectedCategories.length === 0) {
      alert("Please select at least one job category.");
      return;
    }

    // Validate job types
    if (selectedTypes.length === 0) {
      alert("Please select at least one job type.");
      return;
    }

    // Prepare form data
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("job_title", formData.job_title);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("job_description", strippedDescription);
    
    // Append categories as a single array
    formDataToSubmit.append("category_id", JSON.stringify(selectedCategories));
    
    // Append job types as a single array
    formDataToSubmit.append("job_type_id", JSON.stringify(selectedTypes));

    formDataToSubmit.append("functional_area_id", formData.functional_area_id);
    formDataToSubmit.append("experience_year", formData.experience_year);
    formDataToSubmit.append("expected_experience_year", formData.expected_experience_year);
    formDataToSubmit.append("salary_type", formData.salary_type);
    formDataToSubmit.append("expected_salary_type", formData.expected_salary_type);
    formDataToSubmit.append("batch_start_year", formData.batch_start_year);
    formDataToSubmit.append("batch_end_year", formData.batch_end_year);
    formDataToSubmit.append("skills", skills);
    
    if (videoFile) {
      formDataToSubmit.append("video_jd_file", videoFile);
    }

    // Log the form data in a readable format
    const formDataObj = {
      job_title: formData.job_title,
      location: formData.location,
      job_description: strippedDescription,
      category_id: selectedCategories,
      job_type_id: selectedTypes,
      functional_area_id: formData.functional_area_id,
      experience_year: formData.experience_year,
      expected_experience_year: formData.expected_experience_year,
      salary_type: formData.salary_type,
      expected_salary_type: formData.expected_salary_type,
      batch_start_year: formData.batch_start_year,
      batch_end_year: formData.batch_end_year,
      skills: skills
    };

    console.log('Form Data:', formDataObj);

    // Dispatch the create job post action
    
    try {
      dispatch(createJobPost(formDataToSubmit));
    } catch (error) {
      toast.error("Error posting job: " + error.message);
    }
  };
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
      toast.warn("Please select a job title and location before proceeding.");
      return;
    }

    // Ensure values are clean and formatted as strings
    const cleanJobTitle = String(job_title).trim();
    const cleanLocation = String(location).trim();

    // Construct the request body as a string
    setLoading(true); 
    const requestBody = {
      keyword: "Job Description",
      title: cleanJobTitle,
      // company: "SVAP Infotech",
      location: cleanLocation,
    };

    // console.log("Request Body for AI Assist:", JSON.stringify(requestBody));

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/employeer/ai-job-description",
        requestBody,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log("AI Assist Response:", response.data);
      if (response.data.code === 200) {
        // Update the job description with the AI response
        setFormData({
          ...formData,
          description: response.data.data.description,
        });
      } else {
        toast.error("Failed to get job description from AI. Please try again.");
      }
    } catch (error) {
      console.error("Error with AI Assist:", error);
      toast.error("Failed to fetch AI job description. Please try again.");
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (key) => (e) => {
    setKeywords({ ...keywords, [key]: e.target.value });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch experience levels
        const experienceResponse = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/experience-level');
        if (experienceResponse.data && experienceResponse.data.data) {
          setExperienceYears(experienceResponse.data.data);
          setExpectedExperienceYears(experienceResponse.data.data);
        }

        // Fetch industries
        const industriesResponse = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/industries');
        if (industriesResponse.data && industriesResponse.data.data) {
          setIndustries(industriesResponse.data.data);
        }

        // Fetch functional areas
        const functionalAreasResponse = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/functional-area');
        if (functionalAreasResponse.data && functionalAreasResponse.data.data) {
          setFunctionalAreas(functionalAreasResponse.data.data);
        }

        // Fetch job categories
        const jobCategoriesResponse = await axios.get('https://api.sentryspot.co.uk/api/employeer/job-categories');
        if (jobCategoriesResponse.data && jobCategoriesResponse.data.data) {
          setJobCategories(jobCategoriesResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch some data');
      }
    };

    fetchAllData();
  }, []);

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      {/* <div className="form-group col-lg-12 col-md-12  mt-4">
        <label htmlFor="job" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="job"
          placeholder="Type job title"
          onChange={handleChange("job")}
          value={keywords.job}
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
      </div> */}
      <div className="form-group col-lg-12 col-md-12 relative mt-4">
        <label
          htmlFor="job"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          type="text"
          name="job"
          placeholder="Type job title"
          onChange={handleChange("job")}
          value={keywords.job}
          required
          className="mt-1 block w-full px-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {dropdownVisibility.job && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
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
    placeholder="+ Add location"
    onChange={handleChange("location")}
    value={keywords.location}
    required
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
  {dropdownVisibility.location && (
    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
      {/* {console.log(locations,">>>locations")} */}
      {locations?.length > 0 && (
  <ul>
    {locations.map((item, index) => (
      <li
        key={index}
        onClick={() => handleSelect("location", item)}
        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
      >
        {item}
      </li>
    ))}
  </ul>
)}
    </ul>
  )}
</div>
      {/* <div className="relative mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          name="location"
          placeholder="+ Add location"
          onChange={handleChange("location")}
          value={keywords.location}
          required
          className="mt-1 block w-full px-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {dropdownVisibility.location && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
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
      </div> */}

      {/* Description Editor */}
      {/* <div className="form-group col-lg-12 col-md-12 mt-4">
  <div className="flex justify-between">
    <label htmlFor="description" className="pt-4 font-semibold">
      Job Description
    </label>
    <button
      className="border-1 border-blue-700 rounded-md py-2 px-2 m-2 font-semibold"
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
</div> */}
      <div>
        <div className="flex justify-between items-center">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          {/* <button
            type="button"
            onClick={handleAiAssist}
            className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            AI Assist +
          </button> */}
           <button
      type="button"
      onClick={handleAiAssist}
      disabled={loading}
      className={`px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md 
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin" /> {/* Lucide Loader */}
          <span>Loading...</span>
        </div>
      ) : (
        "AI Assist +"
      )}
    </button>
        </div>
        <ReactQuill
          value={formData.description}
          onChange={handleDescriptionChange}
          className="mt-1 block w-full"
          theme="snow"
        />
        {!formData.description && (
          <p className="mt-2 text-sm text-red-600">
            Job description is required.
          </p>
        )}
      </div>


      <div className="flex flex-wrap gap-4 mt-4">
        {/* Min Experience Year Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="experience_year"
            className="block text-sm font-medium text-gray-700"
          >
            Min Experience Year
          </label>
          <select
            name="experience_year"
            value={formData.experience_year}
            onChange={handleFormChange}
            className="mt-1 block w-full p-3 border-3 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Min Experience Year</option>
            {experienceYears.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Max Experience Year Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="expected_experience_year"
            className="block text-sm font-medium text-gray-700"
          >
            Max Experience Year
          </label>
          <select
            name="expected_experience_year"
            value={formData.expected_experience_year}
            onChange={handleFormChange}
            className="mt-1 block w-full p-3 border-3 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Max Experience Year</option>
            {expectedExperienceYears.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {/* Job Industry dropdown */}
        <div className="flex-1">
          <label
            htmlFor="industry_id"
            className="block text-sm font-medium text-gray-700"
          >
            Industry
          </label>
          <select
            name="industry_id"
            value={formData.industry_id}
            onChange={handleFormChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Industry</option>
            {industries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

       

        {/* Functional Area Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="functional_area_id"
            className="block text-sm font-medium text-gray-700"
          >
            Functional Area
          </label>
          <select
            name="functional_area_id"
            value={formData.functional_area_id}
            onChange={handleFormChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Functional Area</option>
            {functionalAreas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
     
      {/* Job Category Dropdown */}
      <div className="flex-1">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-700"
          >
            Job Category
          </label>
          <MultiSelector
            values={selectedCategoryNames}
            onValuesChange={(selectedNames) => {
              setSelectedCategoryNames(selectedNames);
              // Map the selected names back to their IDs
              const selectedIds = selectedNames.map(name => {
                const category = jobCategories.find(cat => cat.name === name);
                return category ? category.id : null;
              }).filter(id => id !== null);
              setSelectedCategories(selectedIds);
            }}
            className="w-full relative"
            name="category_id"
          >
            <MultiSelectorTrigger className="w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <MultiSelectorInput placeholder="Select job categories" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList className="bg-white absolute z-10 w-full mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {jobCategories.map((item) => (
                  <MultiSelectorItem
                    value={item.name}
                    key={item.id}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {item.name}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
        </div>
      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label
          htmlFor="video"
          className="block text-sm font-medium text-gray-700"
        >
          Audio/Video JD
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Add a video to tell your brand's story
        </p>
        <div className="flex gap-4">
          {" "}
          {/* Flex container with gap between inputs */}
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
            className="mt-1 flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
          />
          <input
            type="text"
            placeholder="Paste a YouTube link here"
            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          />
        </div>
      </div>

      
      <div>
        <div className="flex justify-between items-center">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          {/* <button
            type="button"
            className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            AI Assist +
          </button> */}
        </div>
        <MultiSelector
          values={selectedTags}
          onValuesChange={(e) => {
            // console.log("Updated Tags:", e);
            setSelectedTags(e);
          }}
          className="w-full relative "
          name="tags"
        >
          <MultiSelectorTrigger className="w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <MultiSelectorInput placeholder="Select tags" />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList className="bg-white absolute z-10 w-full mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {tags.map((item) => (
                <MultiSelectorItem
                  value={item.value}
                  key={item.value}
                  className="px-4 py-2 hover:bg-blue-100  cursor-pointer"
                >
                  {item.label}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>

      {/* Course Type Section */}
      <div className="form-group col-lg-12 col-md-12">
        <label htmlFor="job_type">Job Type</label>
        <div className="flex flex-wrap gap-4 mt-2">
          {jobTypes.map((jobType) => (
            <div
              key={jobType.id}
              className={`relative cursor-pointer p-2 rounded-lg flex flex-col items-center justify-center w-40 h-36 text-center 
          ${
            selectedTypes.includes(jobType.id)
              ? "shadow-inner shadow-blue-700 border-2 border-blue-700"
              : "border "
          }`}
              onClick={() => handleTypeClick(jobType.id)}
            >
              <div className="text-center">
                <div>{getIcon(jobType.name)}</div>
              </div>
              <p className="text-sm mt-2">{jobType.name}</p>
              {selectedTypes.includes(jobType.id) && (
                <CheckIcon className="absolute -top-2 -right-1 rounded-full border-2 border-blue-700 w-7 h-7 text-blue-700 bg-white" />
              )}
            </div>
          ))}
        </div>
      </div>

  
      <ScreeningQuestionsForm />
      
      <button
        type="submit"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default PostBoxForm;
