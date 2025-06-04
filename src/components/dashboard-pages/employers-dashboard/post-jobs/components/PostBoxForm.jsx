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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [showScreeningForm, setShowScreeningForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "Multi choice",
    mandatory: false,
    questionText: "",
    options: ["", ""]
  });

  const questionTypes = [
    "Multi choice",
    "Single choice",
    "Yes / No Question",
    "Short Answer"
  ];

  const handleAddScreeningQuestion = () => {
    if (!currentQuestion.questionText.trim()) {
      toast.error("Please enter a question text");
      return;
    }

    if (currentQuestion.type.includes("choice") && 
        currentQuestion.options.filter(opt => opt.trim() !== "").length < 2) {
      toast.error("Please add at least two options for choice questions");
      return;
    }

    const newQuestion = {
      ...currentQuestion,
      options: currentQuestion.type.includes("choice") 
        ? currentQuestion.options.filter(opt => opt.trim() !== "") 
        : []
    };

    console.log('Adding new question:', newQuestion);
    setScreeningQuestions(prev => {
      const updated = [...prev, newQuestion];
      console.log('Updated screening questions:', updated);
      return updated;
    });
    setShowScreeningForm(false);
    setCurrentQuestion({
      type: "Multi choice",
      mandatory: false,
      questionText: "",
      options: ["", ""]
    });
  };

  const handleAddOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, ""]
    }));
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  const handleQuestionTypeChange = (type) => {
    setCurrentQuestion(prev => ({
      ...prev,
      type,
      options: type.includes("choice") ? (prev.options.length ? prev.options : ["", ""]) : []
    }));
  };

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
        [key]: selectedItem,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        job_title: selectedItem,
      }));
    } else if (key === "location") {
      setKeywords((prevKeywords) => ({
        ...prevKeywords,
        [key]: selectedItem,
      }));
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFormChange = (e) => {
    handleFieldChange(e);
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
    if (errors.description) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.description;
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Utility function to strip HTML tags
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required Field Validation
    const requiredFields = {
      job_title: 'Job title',
      location: 'Location',
      description: 'Job description',
      experience_year: 'Minimum experience',
      expected_experience_year: 'Maximum experience',
      industry_id: 'Industry',
      functional_area_id: 'Functional area',
      salary_type: 'Salary type',
      expected_salary_type: 'Expected salary type',
      batch_start_year: 'Batch start year',
      batch_end_year: 'Batch end year'
    };

    // Check required fields
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${label} is required`;
      }
    });

    // Length Validation
    if (formData.job_title && formData.job_title.length < 3) {
      newErrors.job_title = 'Job title must be at least 3 characters long';
    }
    if (formData.job_title && formData.job_title.length > 100) {
      newErrors.job_title = 'Job title cannot exceed 100 characters';
    }

    // Data Type Validation for Numbers
    if (formData.batch_start_year) {
      const startYear = parseInt(formData.batch_start_year);
      if (isNaN(startYear)) {
        newErrors.batch_start_year = 'Batch start year must be a valid number';
      } else if (startYear < 1900 || startYear > new Date().getFullYear()) {
        newErrors.batch_start_year = `Batch start year must be between 1900 and ${new Date().getFullYear()}`;
      }
    }

    if (formData.batch_end_year) {
      const endYear = parseInt(formData.batch_end_year);
      if (isNaN(endYear)) {
        newErrors.batch_end_year = 'Batch end year must be a valid number';
      } else if (endYear < 1900 || endYear > new Date().getFullYear() + 10) {
        newErrors.batch_end_year = `Batch end year must be between 1900 and ${new Date().getFullYear() + 10}`;
      }
    }

    // Matching Fields Validation (Experience Years)
    if (formData.experience_year && formData.expected_experience_year) {
      const minExp = parseInt(formData.experience_year);
      const maxExp = parseInt(formData.expected_experience_year);
      if (minExp > maxExp) {
        newErrors.experience_year = 'Minimum experience cannot be greater than maximum experience';
        newErrors.expected_experience_year = 'Maximum experience must be greater than minimum experience';
      }
    }

    // Matching Fields Validation (Batch Years)
    if (formData.batch_start_year && formData.batch_end_year) {
      const startYear = parseInt(formData.batch_start_year);
      const endYear = parseInt(formData.batch_end_year);
      if (startYear > endYear) {
        newErrors.batch_start_year = 'Batch start year cannot be greater than end year';
        newErrors.batch_end_year = 'Batch end year must be greater than start year';
      }
    }

    // Pattern Validation for Location (alphanumeric with spaces and special characters)
    if (formData.location) {
      const locationPattern = /^[a-zA-Z0-9\s\-.,()]+$/;
      if (!locationPattern.test(formData.location)) {
        newErrors.location = 'Location contains invalid characters';
      }
    }

    // Description Length Validation
    if (formData.description) {
      const plainText = stripHtmlTags(formData.description);
      if (plainText.length < 50) {
        newErrors.description = 'Job description must be at least 50 characters long';
      }
      if (plainText.length > 5000) {
        newErrors.description = 'Job description cannot exceed 5000 characters';
      }
    }

    // Job Categories Validation
    if (!selectedCategories || selectedCategories.length === 0) {
      newErrors.category_id = 'At least one job category is required';
    }

    // Job Types Validation
    if (!selectedTypes || selectedTypes.length === 0) {
      newErrors.job_type = 'At least one job type is required';
    }

    // Skills Validation
    if (!selectedTags || selectedTags.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Clear previous errors
    setErrors({});

    // Validate form and get new errors
    const newErrors = validateForm();
    
    // Set errors immediately
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      // Show toast with number of errors
      const errorCount = Object.keys(newErrors).length;
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} in the form`);
      
      // Scroll to the first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('.border-red-500');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add basic form fields
      formDataToSend.append("job_title", formData.job_title);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("job_description", formData.description);
      formDataToSend.append("category_id", JSON.stringify(selectedCategories));
      formDataToSend.append("job_type_id", JSON.stringify(selectedTypes));
      formDataToSend.append("functional_area_id", formData.functional_area_id);
      formDataToSend.append("experience_year", formData.experience_year);
      formDataToSend.append("expected_experience_year", formData.expected_experience_year);
      formDataToSend.append("salary_type", formData.salary_type);
      formDataToSend.append("expected_salary_type", formData.expected_salary_type);
      formDataToSend.append("batch_start_year", formData.batch_start_year);
      formDataToSend.append("batch_end_year", formData.batch_end_year);
      formDataToSend.append("skills", getCommaSeparatedTags());

      // Add screening questions to the payload
      if (screeningQuestions && screeningQuestions.length > 0) {
        const formattedQuestions = screeningQuestions.map(q => ({
          question: q.questionText,
          options: q.type.includes("choice") ? q.options : ["Yes", "No"]
        }));
        formDataToSend.append('screening_questions', JSON.stringify(formattedQuestions));
      }

      // Add video file if exists
      if (videoFile) {
        formDataToSend.append('video_jd_file', videoFile);
      }

      const response = await axios.post(
        'https://api.sentryspot.co.uk/api/employeer/job-post',
        formDataToSend,
        {
          headers: {
            'Authorization': ` ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 200) {
        toast.success('Job posted successfully!');
        // Reset form after successful submission
        setFormData({
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
          Skills: "",
        });
        setSelectedTags([]);
        setSelectedCategories([]);
        setSelectedTypes([]);
        setScreeningQuestions([]);
        setVideoFile(null);
        setErrors({}); // Clear all errors
      } else {
        toast.error(response.data.message || 'Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
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
      <div className="form-group col-lg-12 col-md-12 relative mt-4">
        <label
          htmlFor="job_title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="job_title"
          placeholder="Type job title"
          onChange={(e) => {
            handleChange("job")(e);
            handleFormChange(e);
          }}
          value={formData.job_title}
          className={`mt-1 block w-full px-3 py-3 bg-white border ${
            errors.job_title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.job_title && (
          <div className="mt-1 text-sm text-red-600">{errors.job_title}</div>
        )}
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
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="location"
          placeholder="+ Add location"
          onChange={(e) => {
            handleChange("location")(e);
            handleFormChange(e);
          }}
          value={formData.location}
          className={`mt-1 block w-full p-2 border ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.location && (
          <div className="mt-1 text-sm text-red-600">{errors.location}</div>
        )}
        {dropdownVisibility.location && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description <span className="text-red-500">*</span>
          </label>
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
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              "AI Assist +"
            )}
          </button>
        </div>
        <div className={`mt-1 ${errors.description ? 'border border-red-500 rounded-md' : ''}`}>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            className="w-full"
            theme="snow"
          />
        </div>
        {errors.description && (
          <div className="mt-2 text-sm text-red-600">{errors.description}</div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1">
          <label
            htmlFor="experience_year"
            className="block text-sm font-medium text-gray-700"
          >
            Min Experience Year <span className="text-red-500">*</span>
          </label>
          <select
            name="experience_year"
            value={formData.experience_year}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.experience_year ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Min Experience Year</option>
            {experienceYears.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.experience_year && (
            <div className="mt-1 text-sm text-red-600">{errors.experience_year}</div>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="expected_experience_year"
            className="block text-sm font-medium text-gray-700"
          >
            Max Experience Year <span className="text-red-500">*</span>
          </label>
          <select
            name="expected_experience_year"
            value={formData.expected_experience_year}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.expected_experience_year ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Max Experience Year</option>
            {expectedExperienceYears.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.expected_experience_year && (
            <div className="mt-1 text-sm text-red-600">{errors.expected_experience_year}</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1">
          <label
            htmlFor="industry_id"
            className="block text-sm font-medium text-gray-700"
          >
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            name="industry_id"
            value={formData.industry_id}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.industry_id ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Industry</option>
            {industries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.industry_id && (
            <div className="mt-1 text-sm text-red-600">{errors.industry_id}</div>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="functional_area_id"
            className="block text-sm font-medium text-gray-700"
          >
            Functional Area <span className="text-red-500">*</span>
          </label>
          <select
            name="functional_area_id"
            value={formData.functional_area_id}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.functional_area_id ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Functional Area</option>
            {functionalAreas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.functional_area_id && (
            <div className="mt-1 text-sm text-red-600">{errors.functional_area_id}</div>
          )}
        </div>
      </div>

      <div className="flex-1 mt-4">
        <label
          htmlFor="category_id"
          className="block text-sm font-medium text-gray-700"
        >
          Job Category <span className="text-red-500">*</span>
        </label>
        <MultiSelector
          values={selectedCategoryNames}
          onValuesChange={(selectedNames) => {
            setSelectedCategoryNames(selectedNames);
            const selectedIds = selectedNames.map(name => {
              const category = jobCategories.find(cat => cat.name === name);
              return category ? category.id : null;
            }).filter(id => id !== null);
            setSelectedCategories(selectedIds);
            if (selectedIds.length > 0) {
              setErrors(prev => ({ ...prev, category_id: '' }));
            }
          }}
          className={`w-full relative ${errors.category_id ? 'border-red-500' : ''}`}
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
        {errors.category_id && (
          <div className="mt-1 text-sm text-red-600">{errors.category_id}</div>
        )}
      </div>

      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Skills <span className="text-red-500">*</span>
        </label>
        <MultiSelector
          values={selectedTags}
          onValuesChange={(e) => {
            setSelectedTags(e);
            if (e.length > 0) {
              setErrors(prev => ({ ...prev, skills: '' }));
            }
          }}
          className={`w-full relative ${errors.skills ? 'border-red-500' : ''}`}
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
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item.label}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
        {errors.skills && (
          <div className="mt-1 text-sm text-red-600">{errors.skills}</div>
        )}
      </div>

      <div className="form-group col-lg-12 col-md-12 mt-4">
        <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">
          Job Type <span className="text-red-500">*</span>
        </label>
        <div className={`flex flex-wrap gap-4 mt-2 ${errors.job_type ? 'border border-red-500 rounded-md p-2' : ''}`}>
          {jobTypes.map((jobType) => (
            <div
              key={jobType.id}
              className={`relative cursor-pointer p-2 rounded-lg flex flex-col items-center justify-center w-40 h-36 text-center 
                ${selectedTypes.includes(jobType.id)
                  ? "shadow-inner shadow-blue-700 border-2 border-blue-700"
                  : "border"
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
        {errors.job_type && (
          <div className="mt-1 text-sm text-red-600">{errors.job_type}</div>
        )}
      </div>

      <div className="form-group col-lg-12 col-md-12 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Screening Questions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add questions that candidates must answer when applying for this job
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {!showScreeningForm && screeningQuestions.length < 10 && (
            <button
              type="button"
              onClick={() => setShowScreeningForm(true)}
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Question
            </button>
          )}
          
          {showScreeningForm && (
            <div className="border border-gray-200 rounded-lg p-4 mt-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                {/* Question Type Dropdown */}
                <div className="relative">
                  <select
                    value={currentQuestion.type}
                    onChange={(e) => handleQuestionTypeChange(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-48 text-left bg-white hover:bg-gray-50"
                  >
                    {questionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Mandatory Toggle */}
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Mandatory</span>
                  <button
                    type="button"
                    onClick={() => setCurrentQuestion(prev => ({ ...prev, mandatory: !prev.mandatory }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      currentQuestion.mandatory ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        currentQuestion.mandatory ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Question Text*</label>
                <textarea
                  value={currentQuestion.questionText}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, questionText: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2 min-h-[100px] focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="What would you like to ask?"
                  style={{ minHeight: '100px' }}
                />
              </div>

              {/* Options (for Multi/Single choice) */}
              {currentQuestion.type.includes("choice") && (
                <div className="mb-4">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add option
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddScreeningQuestion}
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 text-sm font-medium"
                >
                  Add Question
                </button>
                <button
                  type="button"
                  onClick={() => setShowScreeningForm(false)}
                  className="text-gray-500 hover:text-gray-600 px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {/* Display added questions */}
          {screeningQuestions.length > 0 && (
            <div className="mt-6 space-y-4">
              {screeningQuestions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm text-gray-700">{question.type}</span>
                    <span className={`text-sm ${question.mandatory ? "text-blue-600" : "text-gray-500"}`}>
                      {question.mandatory ? "Mandatory" : "Optional"}
                    </span>
                  </div>
                  <p className="text-gray-800">{question.questionText}</p>
                  {question.options.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {question.options.map((option, idx) => (
                        <li key={idx} className="ml-4 text-sm text-gray-600">• {option}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1">
          <label
            htmlFor="salary_type"
            className="block text-sm font-medium text-gray-700"
          >
            Salary Type <span className="text-red-500">*</span>
          </label>
          <select
            name="salary_type"
            value={formData.salary_type}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.salary_type ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Salary Type</option>
            {salaryTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.salary_type && (
            <div className="mt-1 text-sm text-red-600">{errors.salary_type}</div>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="expected_salary_type"
            className="block text-sm font-medium text-gray-700"
          >
            Expected Salary Type <span className="text-red-500">*</span>
          </label>
          <select
            name="expected_salary_type"
            value={formData.expected_salary_type}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.expected_salary_type ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Expected Salary Type</option>
            {salaryTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.expected_salary_type && (
            <div className="mt-1 text-sm text-red-600">{errors.expected_salary_type}</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1">
          <label
            htmlFor="batch_start_year"
            className="block text-sm font-medium text-gray-700"
          >
            Batch Start Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="batch_start_year"
            value={formData.batch_start_year}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.batch_start_year ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter batch start year"
          />
          {errors.batch_start_year && (
            <div className="mt-1 text-sm text-red-600">{errors.batch_start_year}</div>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="batch_end_year"
            className="block text-sm font-medium text-gray-700"
          >
            Batch End Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="batch_end_year"
            value={formData.batch_end_year}
            onChange={handleFormChange}
            className={`mt-1 block w-full p-3 border ${
              errors.batch_end_year ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter batch end year"
          />
          {errors.batch_end_year && (
            <div className="mt-1 text-sm text-red-600">{errors.batch_end_year}</div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default PostBoxForm;
