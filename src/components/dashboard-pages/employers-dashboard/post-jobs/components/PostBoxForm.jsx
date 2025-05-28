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

  const validateForm = () => {
    const newErrors = {};
    
    // Job Title validation
    if (!formData.job_title.trim()) {
      newErrors.job_title = 'Job title is required';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    // Experience validation
    if (!formData.experience_year) {
      newErrors.experience_year = 'Minimum experience is required';
    }
    if (!formData.expected_experience_year) {
      newErrors.expected_experience_year = 'Maximum experience is required';
    }
    if (formData.experience_year && formData.expected_experience_year) {
      if (parseInt(formData.experience_year) > parseInt(formData.expected_experience_year)) {
        newErrors.experience_year = 'Minimum experience cannot be greater than maximum experience';
      }
    }

    // Industry validation
    if (!formData.industry_id) {
      newErrors.industry_id = 'Industry is required';
    }

    // Functional Area validation
    if (!formData.functional_area_id) {
      newErrors.functional_area_id = 'Functional area is required';
    }

    // Job Categories validation
    if (selectedCategories.length === 0) {
      newErrors.category_id = 'At least one job category is required';
    }

    // Job Types validation
    if (selectedTypes.length === 0) {
      newErrors.job_type = 'At least one job type is required';
    }

    // Skills validation
    if (selectedTags.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      toast.error('Please fill in all required fields correctly');
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

      console.log('Current screening questions:', screeningQuestions);

      // Add screening questions to the payload
      if (screeningQuestions && screeningQuestions.length > 0) {
        const formattedQuestions = screeningQuestions.map(q => ({
          question: q.questionText,
          options: q.type.includes("choice") ? q.options : ["Yes", "No"]
        }));
        console.log('Formatted questions for payload:', formattedQuestions);
        formDataToSend.append('screening_questions', JSON.stringify(formattedQuestions));
      }

      // Log all FormData entries
      console.log('FormData entries:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Add video file if exists
      if (videoFile) {
        formDataToSend.append('video_jd_file', videoFile);
      }

      const response = await axios.post(
        'https://api.sentryspot.co.uk/api/employer/job-post',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 200) {
        toast.success('Job posted successfully!');
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
          htmlFor="job"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="job"
          placeholder="Type job title"
          onChange={handleChange("job")}
          value={keywords.job}
          required
          className={`mt-1 block w-full px-3 py-3 bg-white border ${
            errors.job_title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.job_title && (
          <p className="mt-1 text-sm text-red-600">{errors.job_title}</p>
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
          onChange={handleChange("location")}
          value={keywords.location}
          required
          className={`mt-1 block w-full p-2 border ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location}</p>
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
      <div>
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
          className={`mt-1 block w-full ${
            errors.description ? 'border-red-500' : ''
          }`}
          theme="snow"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description}</p>
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
            className={`mt-1 block w-full p-3 border-3 ${
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
            <p className="mt-1 text-sm text-red-600">{errors.experience_year}</p>
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
            className={`mt-1 block w-full p-3 border-3 ${
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
            <p className="mt-1 text-sm text-red-600">{errors.expected_experience_year}</p>
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
            <p className="mt-1 text-sm text-red-600">{errors.industry_id}</p>
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
            <p className="mt-1 text-sm text-red-600">{errors.functional_area_id}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
        )}
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
            Skills <span className="text-red-500">*</span>
          </label>
        </div>
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
                  className="px-4 py-2 hover:bg-blue-100  cursor-pointer"
                >
                  {item.label}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
        )}
      </div>

      <div className="form-group col-lg-12 col-md-12">
        <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">
          Job Type <span className="text-red-500">*</span>
        </label>
        <div className={`flex flex-wrap gap-4 mt-2 ${errors.job_type ? 'border-red-500' : ''}`}>
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
        {errors.job_type && (
          <p className="mt-1 text-sm text-red-600">{errors.job_type}</p>
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
