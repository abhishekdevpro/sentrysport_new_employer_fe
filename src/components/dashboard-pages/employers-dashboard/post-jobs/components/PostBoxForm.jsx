import Map from "../../../Map";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostJobSchema } from "@/schema/PostJobSchema";
import {
  useCreatePostMutation,
  useGetJobTypeQuery,
  useGetJobCategoryQuery,
  useGetExperienceLevelQuery,
  useGetSalaryQuery,
  useGetFunctionalAreaQuery,
  useGetYearQuery,
  useGetStateQuery,
} from "@/store/slices/service/index";
import ActionLoader from "@/components/loader/ActionLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddScreeningQuestion from "./AddScreeningQuestion";
import { Button } from "@/components/ui/button";
import { Constant } from "@/utils/constant/constant";
import ReactQuill from "react-quill";
import { BiHandicap } from "react-icons/bi";
import { SlUserFemale } from "react-icons/sl";
import { IoFemale, IoShieldOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
// import {  } from "react-icons/io5";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiSelector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX } from "lucide-react";

const tags = [
  { value: "Banking", label: "Banking" },
  { value: "Digital & Creative", label: "Digital & Creative" },
  { value: "Retail", label: "Retail" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Managemnet", label: "Managemnet" },
  { value: "Accounting & Finance", label: "Accounting & Finance" },
  { value: "Digital", label: "Digital" },
  { value: "Creative Art", label: "Creative Art" },
];
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: ["red", "#785412"] }],
    [{ background: ["red", "#785412"] }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "font",
];

const locationOption = [
  {
    label: "--Anywhere--",
    arr: ["Metros", "Any Location"],
  },
  {
    label: "--National Locations--",
    arr: ["Scotland", "Other"],
  },
];

const PostBoxForm = () => {
  const navigate = useNavigate();
  const formData = new FormData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostJobSchema), // Connect Zod validation schema
  });

  const [createpost, { data, isSuccess, isError, isLoading, error }] =
    useCreatePostMutation();

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
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (id) => {
    setSelectedItem(id);
  };

  const [isFileInput, setIsFileInput] = useState(false);

  const handleButtonClick = () => {
    setIsFileInput(!isFileInput);
  };

  const {
    data: jobTypeData,
    isSuccess: isJobTypeSuccess,
    isError: isJobTypeError,
    isLoading: isJobTypeLoading,
    error: jobTypeError,
  } = useGetJobTypeQuery();

  const {
    data: categoryTypeData,
    isSuccess: isCategoryTypeSuccess,
    isError: isCategoryTypeError,
    isLoading: isCategoryTypeLoading,
    error: categoryTypeError,
  } = useGetJobCategoryQuery();

  const {
    data: experienceLevelData,
    isLoading: isExperienceLoading,
    isError: isExperienceError,
    error: experienceError,
  } = useGetExperienceLevelQuery();
  const {
    data: salaryData,
    isLoading: isSalaryLoading,
    isError: isSalaryError,
    error: salaryError,
  } = useGetSalaryQuery();
  const {
    data: functionalAreaData,
    isLoading: isFunctionalAreaLoading,
    isError: isFunctionalAreaError,
    error: functionalAreaError,
  } = useGetFunctionalAreaQuery();
  const {
    data: yearData,
    isLoading: isYearLoading,
    isError: isYearError,
    error: yearError,
  } = useGetYearQuery();
  const {
    data: stateData,
    isLoading: isstateLoading,
    isError: isstateError,
    error: stateError,
  } = useGetStateQuery();

  const [openScreeningQuestionDialog, setOpenScreeningQuestionDialog] =
    useState(false);
  const [screeningQuestion, setScreeningQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const submitHandler = (e) => {
    const {
      job_title,
      // job_description,
      job_type,
      email,
      // location,
      min_year_of_experience,
      max_year_of_experience,
      graduation_year_min,
      graduation_year_max,
    } = e;

    console.log(
      // job_description,
      min_year_of_experience,
      // diversity_hiring,
      job_type,
      selectedLocations,
      code
    );
    return;
    // Create a jobData object with all necessary fields
    const jobData = {
      job_title: job_title,
      job_description: job_description,
      email_address: email,
      specialisms_id: 1,
      job_type_id: job_type,
      offered_salary_id: annual_salary,
      career_level_id: 1,
      experience_id: min_year_of_experience,
      industry_id: 1,
      qualification_id: 1,
      country_id: 2,
      state_id: 2,
      city_id: 2,
      complete_address: selectedLocations,
      latitude: 23.95,
      longitude: 12.45,
      status: 1,
      graduation_year_min: graduation_year_min,
      graduation_year_max: graduation_year_max,
      workplace_type_id: 2,
    };

    // Initialize a new FormData object
    const formData = new FormData();

    // Append each key-value pair from jobData to the FormData object
    for (const key in jobData) {
      if (jobData.hasOwnProperty(key)) {
        formData.append(key, jobData[key]);
      }
    }

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    // Call the createpost function with the FormData object
    createpost(formData);
  };
  const token = localStorage.getItem(Constant.USER_TOKEN) || "";

  const handleSaveQuestion = (question) => {
    setScreeningQuestion([...screeningQuestion, question]);
  };
  const removeQuestion = (item) => {
    let temp = JSON.parse(JSON.stringify(screeningQuestion));
    temp = temp.filter((question) => question.id != item.id);
    setScreeningQuestion(temp);
  };
  const handleEditQuestion = (data) => {
    let { old, newData } = data;
    let temp = JSON.parse(JSON.stringify(screeningQuestion));
    temp = temp.map((question) => {
      if (question.id == old.id) return newData;
      return question;
    });
    setScreeningQuestion(temp);
    setSelectedQuestion({});
  };
  const handleRemoveLocation = (item) => {
    let temp = JSON.parse(JSON.stringify(selectedLocations));
    temp = temp.filter(
      (location) => location?.toLowerCase() != item?.toLowerCase()
    );
    setSelectedLocations(temp);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("data is saved", data);

      toast.success("Job successfully Created");
      reset();
      // navigate(`/job-single-v3/${data?.id}`);
      navigate(`/employers-dashboard/manage-jobs`);
    }
    if (isError) toast.error(error?.error || error?.data?.message);
  }, [isSuccess, isError]);

  const [code, setCode] = useState("");
  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);
  };

  return (
    <form className="default-form" onSubmit={handleSubmit(submitHandler)}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="job_title">Job Title</label>
          <input
            type="text"
            name="job_title"
            placeholder="Title"
            {...register("job_title")}
          />
          {errors.job_title && (
            <p className="!text-red-500 text-sm">{errors.job_title.message}</p>
          )}
        </div>
        {/* location */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="location">Location</label>
          {/* <input
            type="text"
            name="location"
            placeholder="location"
            {...register("location")}
          />
          {errors.location && (
            <p className="!text-red-500 text-sm">{errors.location.message}</p>
          )} */}
          <div className="flex p-1n gap-2 mb-2">
            {selectedLocations?.map((item) => (
              <div className="flex items-center justify-between gap-2 bg-[#4fa995] text-white p-1 rounded-lg">
                <span className="">{item}</span>
                <span>
                  <CircleX
                    size={18}
                    className="cursor-pointer"
                    onClick={() => handleRemoveLocation(item)}
                  />
                </span>
              </div>
            ))}
          </div>
          <Select
            className="border w-full"
            value=""
            onValueChange={(e) =>
              setSelectedLocations((prev) => [...new Set([...prev, e])])
            }
            name="location"
          >
            <SelectTrigger className="w-full justify-start">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locationOption?.map((item, i) => (
                <SelectGroup key={i}>
                  <SelectLabel>{item?.label}</SelectLabel>
                  {item?.arr.map(
                    (opt, i) =>
                      !selectedLocations?.includes(opt) && (
                        <SelectItem value={opt} key={i}>
                          {opt}
                        </SelectItem>
                      )
                  )}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {/* {errors.location && (
            <p className="!text-red-500 text-sm">{errors.location.message}</p>
          )} */}
        </div>
        {/* experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="min_year_of_experience">Year of Experience*</label>
          <select
            className="chosen-single form-select"
            id="min_year_of_experience"
            name="min_year_of_experience"
            {...register("min_year_of_experience")}
          >
            <option value="" disabled>
              select Min
            </option>
            {Array.from({ length: 30 }, (_, i) => i).map((x, i) => (
              <option value={x}>{x}</option>
            ))}
            {/* {experienceLevelData?.data?.map((experieneItem) => (
              <option key={experieneItem?.id} value={experieneItem?.id}>
                {experieneItem?.name}
              </option>
            ))} */}
          </select>
          {errors.min_year_of_experience && (
            <p className="!text-red-500 text-sm">
              {errors.min_year_of_experience.message}
            </p>
          )}
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label className="text-white">l</label>
          <select
            className="chosen-single form-select "
            name="max_year_of_experience"
            {...register("max_year_of_experience")}
          >
            <option value="" disabled>
              select Max
            </option>
            {Array.from({ length: 30 }, (_, i) => i).map((x, i) => (
              <option value={x}>{x}</option>
            ))}
          </select>
          {errors.max_year_of_experience && (
            <p className="!text-red-500 text-sm">
              {errors.max_year_of_experience.message}
            </p>
          )}
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="job_description">Job Description *</label>
          {/* <textarea
            id="job_description"
            name="job_description"
            placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
            {...register("job_description")}
          ></textarea> */}

          <ReactQuill
            theme="snow"
            // modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
            placeholder="Job Description"
          />

          {/* {errors.job_description && (
            <p className="!text-red-500 text-sm">
              {errors.job_description.message}
            </p>
          )} */}
        </div>
        {/* videojd */}
        {/* <div className=" flex justify-between  gap-2 form-group col-lg-10 col-md-10">
          <div className="flex flex-col w-full">
            {" "}
            <label>Video JD</label>
            <input
              type="url"
              name="videoJD"
              placeholder="paste the Url"
              {...register("video_jd")}
            />
          </div>

          <div className="form-group col-lg-3 col-md-3">
            <label className="">For upload file</label>
            <Button>upload file </Button>{" "}
          </div>
          {errors.video_jd && (
            <p className="!text-red-500 text-sm">{errors.video_jd.message}</p>
          )}
        </div> */}
        <div
          className="flex justify-between gap-2 form-group col-lg-12
        col-md-12"
        >
          {/* Input field taking 10/12 of the width */}
          <div className="  flex flex-col w-10/12">
            <label htmlFor="videojd" className="text-md  font-medium">
              Video JD
            </label>
            {/* <input
              type={isFileInput ? "file" : "url"}
              name="videoJD"
              placeholder="Paste the URL"
              {...register("video_jd")}
              className={isFileInput ? "uploadButton" : ""}
            /> */}
            <input
              type={isFileInput ? "file" : "url"}
              name="videoJD"
              placeholder="Paste the URL"
              {...register("video_jd")}
              className={`p-2 ${
                isFileInput ? " bg-slate-100 rounded-lg h-[50px]" : ""
              }`}
            />
          </div>
          {/* Button taking 2/12 of the width */}
          <div className="flex items-end w-2/12">
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleButtonClick}
            >
              Upload File
            </button>
          </div>
        </div>

        {/* category */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="category">Category*</label>
          <select
            className="chosen-single form-select"
            id="category"
            name="category"
            {...register("category")}
          >
            <option value="">select</option>
            {categoryTypeData?.data?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}

            {/* <option value="software engineer">software Engineer</option>
<option value="frontend developer">Frontend Developer</option>
<option value="Backend Developer">Backend Developer</option>
<option value="DevOops Engineer">DevOops Engineer</option> */}
          </select>
          {errors.category && (
            <p className="!text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        {/* function area */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="function_area">Function Area*</label>
          <select
            id="function_area"
            name="function_area"
            className="chosen-single form-select"
            {...register("function_area")}
          >
            <option value="">select</option>
            {functionalAreaData?.data?.map((data) => (
              <option key={data?.id} value={data?.id}>
                {data?.name}
              </option>
            ))}
            {/* <option value="Development">Development</option>
<option value="Marketing">Marketing</option>
<option value="Automation/Testing">Automation/Testing</option>
<option value="Management">Management</option> */}
          </select>
          {errors.function_area && (
            <p className="!text-red-500 text-sm">
              {errors.function_area.message}
            </p>
          )}
        </div>
        {/* annual sallary */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="annual salary">Annual Salary *</label>
          <select
            name="annual_salary"
            id="annual_salary"
            className="chosen-single form-select"
            {...register("annual_salary")}
          >
            <option value="" disabled>
              min salary (in lakhs)
            </option>
            {/* {Array.from({ length: 101 }, (_, i) => i).map((x, i) => (
<option value={x}>{x}</option>
))} */}
            {salaryData?.data?.map((salary) => (
              <option key={salary?.id} value={salary?.id}>
                {salary?.name}
              </option>
            ))}
          </select>
          {errors.annual_salary && (
            <p className="!text-red-500 text-sm">
              {errors.annual_salary.message}
            </p>
          )}
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label className="text-white">l</label>

          <select
            name="annual_salary_max"
            id="annual_salary_max"
            className="chosen-single form-select"
            {...register("annual_salary_max")}
          >
            <option value="" disabled>
              max salary (in lakhs)
            </option>
            {Array.from({ length: 101 }, (_, i) => i).map((x, i) => (
              <option value={x}>{x}</option>
            ))}
          </select>
          {errors.annual_salary_max && (
            <p className="!text-red-500 text-sm">
              {errors.annual_salary_max.message}
            </p>
          )}
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <input type="checkbox" name="" placeholder="" />
          <label>Dont show to job seeker </label>
        </div>
        {/* gradutiuon */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="graduation_year_min">Graduating Year *</label>
          <select
            className="chosen-single form-select"
            name="graduation_year_min"
            {...register("graduation_year_min")}
          >
            <option value="">min Batch</option>
            {yearData?.data?.map((year) => (
              <option key={year?.id} value={year?.id}>
                {year?.name}
              </option>
            ))}
          </select>
          {errors.graduation_year_min && (
            <p className="!text-red-500 text-sm">
              {errors.graduation_year_min.message}
            </p>
          )}
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="graduation_year_max">Graduating Year *</label>
          <select
            className="chosen-single form-select"
            name="graduation_year_max"
            {...register("graduation_year_max")}
          >
            <option value="">max Batch</option>
            {yearData?.data?.map((year) => (
              <option key={year?.id} value={year?.id}>
                {year?.name}
              </option>
            ))}
          </select>
          {errors.graduation_year_max && (
            <p className="!text-red-500 text-sm">
              {errors.graduation_year_max.message}
            </p>
          )}
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="tags">Tags</label>
          <MultiSelector
            values={selectedTags || []}
            onValuesChange={(e) =>
              setSelectedTags(JSON.parse(JSON.stringify(e)))
            }
            className="w-full relative !border-none"
            name="tags"
            {...register("tags")}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select tags" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList className="bg-white absolute z-10">
                {tags?.map((item) => (
                  <MultiSelectorItem value={item?.value} key={item}>
                    {item?.label}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {/* {errors.job_type && (
            <p className="!text-red-500 text-sm">{errors.job_type.message}</p>
          )} */}
        </div>
        {/* tags */}
        {/* <div className="form-group col-lg-12 col-md-12">
<label htmlFor="tags">Tags </label>
<Select
defaultValue={[tags[2]]}
isMulti
name="tags"
options={tags}
className="basic-multi-select"
classNamePrefix="select"
{...register("tags")}
/>
{errors.tags && (
<p className="!text-red-500 text-sm">{errors.tags.message}</p>
)}
</div> */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="tags">Tags</label>
          <MultiSelector
            values={[]}
            // onValuesChange={(e) =>
            //   setTags(
            //     JSON.parse(
            //       JSON.stringify(e)
            //     )
            //   )
            // }
            className="w-full relative"
            name="tags"
            {...register("tags")}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select tags" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList className="bg-white absolute z-10">
                {["tag-1", "tag-2", "tag-3"]?.map((item) => (
                  <MultiSelectorItem value={item} key={item}>
                    {item}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {errors.job_type && (
            <p className="!text-red-500 text-sm">{errors.job_type.message}</p>
          )}
        </div> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="job_type">Job Type</label>
          <select
            name="job_type"
            className="chosen-single form-select"
            {...register("job_type")}
          >
            <option value="">Select type</option>
            {jobTypeData?.data?.map((jobType) => (
              <option key={jobType?.id} value={jobType?.id}>
                {jobType?.name}
              </option>
            ))}
          </select>
          {errors.job_type && (
            <p className="!text-red-500 text-sm">{errors.job_type.message}</p>
          )}
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="!text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="diversity_hiring">Diversity hiring !</label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Dhiring?.map((item, id) => (
              <div
                key={id}
                className={`relative flex flex-col items-center justify-center border  p-2 text-center cursor-pointer ${
                  selectedItem === id
                    ? " border border-blue-500 border-4"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelect(id)}
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
          {/* <select
            className="chosen-single form-select"
            name="diversity_hiring"
            {...register("diversity_hiring")}
          >
            <option value="">Select type</option>
            <option value="female candidate">female candidates</option>
            <option value="women joining">
              women joining back the work force
            </option>
            <option value="differently abled candidate">
              Differently abled candidates
            </option>
            <option value="work from home">work from home</option>
          </select> */}

          {errors.diversity_hiring && (
            <p className="!text-red-500 text-sm">
              {errors.diversity_hiring.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="mb-3">
            <p className="m-0 !text-lg text-black">Add Screening Questions</p>
            <p className="m-0">
              Candidates will be asked to answer these question before they
              submit their application. You can add up to 10 questions.
            </p>
          </div>

          <div className="mb-3">
            {screeningQuestion?.map((item) => (
              <div
                key={item?.id}
                className="flex justify-between w-full sm:w-[50%]"
              >
                <p>{item?.question}</p>
                <div className="flex gap-3">
                  <CiEdit
                    size={22}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedQuestion(item);
                      setOpenScreeningQuestionDialog(true);
                    }}
                  />
                  <MdOutlineDeleteOutline
                    size={22}
                    className="cursor-pointer"
                    onClick={() => removeQuestion(item)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => setOpenScreeningQuestionDialog(true)}
          >
            Add Question
          </Button>
          {openScreeningQuestionDialog && (
            <AddScreeningQuestion
              selectedQuestion={selectedQuestion}
              handleSaveQuestion={handleSaveQuestion}
              handleEditQuestion={handleEditQuestion}
              handleClose={() => {
                setOpenScreeningQuestionDialog(false);
                setSelectedQuestion({});
              }}
            />
          )}
        </div>
        {/* diversity hiring */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="diversity_hiring">Diversity hiring!</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Dhiring?.map((item, id) => (
              <div
                className="flex flex-col items-center justify-center border border-4 p-2 text-center h-auto"
                key={id}
                {...register("diversity_hiring")}
              >
                <div className="text-xl mb-1 flex justify-center items-center">
                  {item?.icon}
                </div>
                <p className="text-sm font-medium">{item?.label}</p>
              </div>
            ))}
            {errors.diversity_hiring && (
              <p className="!text-red-500 text-sm">
                {errors.diversity_hiring.message}
              </p>
            )}
          </div>
        </div> */}

        {/* <!-- Search Select --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Specialisms </label>
<Select
defaultValue={[specialisms[2]]}
isMulti
name="colors"
options={specialisms}
className="basic-multi-select"
classNamePrefix="select"
/>
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Offered Salary</label>
<select className="chosen-single form-select">
<option>Select</option>
<option>$1500</option>
<option>$2000</option>
<option>$2500</option>
<option>$3500</option>
<option>$4500</option>
<option>$5000</option>
</select>
</div> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Career Level</label>
<select className="chosen-single form-select">
<option>Select</option>
<option>Banking</option>
<option>Digital & Creative</option>
<option>Retail</option>
<option>Human Resources</option>
<option>Management</option>
</select>
</div> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Experience</label>
<select className="chosen-single form-select">
<option>Select</option>
<option>Banking</option>
<option>Digital & Creative</option>
<option>Retail</option>
<option>Human Resources</option>
<option>Management</option>
</select>
</div> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Gender</label>
<select className="chosen-single form-select">
<option>Select</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Industry</label>
<select className="chosen-single form-select">
<option>Select</option>
<option>Banking</option>
<option>Digital & Creative</option>
<option>Retail</option>
<option>Human Resources</option>
<option>Management</option>
</select>
</div> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Qualification</label>
<select className="chosen-single form-select">
<option>Select</option>
<option>Banking</option>
<option>Digital & Creative</option>
<option>Retail</option>
<option>Human Resources</option>
<option>Management</option>
</select>
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
<label>Application Deadline Date</label>
<input type="text" name="name" placeholder="06.04.2020" />
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Country</label>
<select className="chosen-single form-select">
<option>Australia</option>
<option>Pakistan</option>
<option>Chaina</option>
<option>Japan</option>
<option>India</option>
</select>
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>City</label>
<select className="chosen-single form-select">
<option>Melbourne</option>
<option>Pakistan</option>
<option>Chaina</option>
<option>Japan</option>
<option>India</option>
</select>
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
<label>Complete Address</label>
<input
type="text"
name="name"
placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
/>
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
<label>Find On Map</label>
<input
type="text"
name="name"
placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
/>
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
<label>Latitude</label>
<input type="text" name="name" placeholder="Melbourne" />
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
<label>Longitude</label>
<input type="text" name="name" placeholder="Melbourne" />
</div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
<button className="theme-btn btn-style-three">Search Location</button>
</div> */}
        <div className="form-group col-lg-12 col-md-12">
          <div className="map-outer">
            <div style={{ height: "420px", width: "100%" }}>
              <Map />
            </div>
          </div>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one" type="submit">
            {isLoading ? <ActionLoader /> : "job post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
