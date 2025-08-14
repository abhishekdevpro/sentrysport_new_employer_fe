import { useFormContext } from "react-hook-form";
import useJobFormData from "@/hooks/useJobFormData";
import AutocompleteInput from "@/UI-Components/AutoCompleteInput";
import TextEditor from "@/UI-Components/TextEditor";
import SelectInput from "@/UI-Components/SelectInput";
import {
  Briefcase,
  CheckIcon,
  Clock1Icon,
  Folder,
  HandIcon,
  Loader2,
  User2Icon,
} from "lucide-react";
import { FaPerson, FaUserGroup } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

export default function JobFormFields() {
  const {
    register,
    setValue,
    formState: { errors },
    watch
  } = useFormContext();
  const {
    experienceYears,
    industries,
    functionalAreas,
    jobCategories,
    salaryTypes,
    jobTypes,
  } = useJobFormData();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN)
  const handleAiAssist = async () => {
      const jobTitle = watch("job_title");
      const location = watch("location");
  
      console.log(jobTitle, location, "from Ai assist");
  
      if (!jobTitle || !location) {
        toast.warn("Please enter job title and location first");
        return;
      }
  
      setLoading(true);
      try {
        const response = await axios.post(
          "https://api.sentryspot.co.uk/api/employeer/ai-job-description",
          {
            keyword: "Job Description",
            title: jobTitle.trim(),
            location: location.trim(),
          },
          {
            headers: { Authorization: token },
          }
        );
  
        if (response.data.code === 200) {
          setValue("description", response.data.data.description);
        } else {
          toast.error("Failed to generate description");
        }
      } catch (error) {
        console.error("AI Assist Error:", error);
        toast.error("Failed to generate description");
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <AutocompleteInput
        label="Job Title"
        name="job_title"
        // defaultValue={userInfo.job_title}
        apiUrl={(term) =>
          `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
            term
          )}`
        }
        dataExtractor={(res) => res.data?.data || []}
        onSelectFormat={(item) => item.name}
        register={register}
        setValue={setValue}
      />
      <AutocompleteInput
        label="Location"
        name="location"
        // defaultValue={userInfo.location_name}
        apiUrl={(term) =>
          `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(
            term
          )}`
        }
        dataExtractor={(res) => res.data?.data?.location_names || []}
        onSelectFormat={(item) => (typeof item === "string" ? item : item.name)}
        register={register}
        setValue={setValue}
      />
      {/* <TextEditor
        label="Job Description"
        name="description"
        rules={{ required: "Description is required" }}
      /> */}
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <label className="app-text-label">Job Description</label>
          <Button
            type="button"
            onClick={handleAiAssist}
            disabled={loading}
            // variant="outline"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "AI Assist"
            )}
          </Button>
        </div>

        <TextEditor
          name="description"
          rules={{
            required: "Description is required",
            minLength: {
              value: 50,
              message: "Description must be at least 50 characters",
            },
          }}
          maxLength={5000}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label="Minimum Experience"
          name="experience_year"
          options={experienceYears}
          {...register("experience_year", { required: "Required" })}
        />
        <SelectInput
          label="Maximum Experience"
          name="expected_experience_year"
          options={experienceYears}
          {...register("expected_experience_year", { required: "Required" })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput label="Industry" name="industry_id" options={industries}
        {...register("industry_id", { required: "Required" })} />
        <SelectInput
          label="Functional Area"
          name="functional_area_id"
          options={functionalAreas}
          {...register("functional_area_id", { required: "Required" })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label="Current Salary"
          name="salary_type"
          options={salaryTypes}
          {...register("salary_type", { required: "Required" })}
        />
        <SelectInput
          label="Expected Salary"
          name="expected_salary_type"
          options={salaryTypes}
          {...register("expected_salary_type", { required: "Required" })}
        />
      </div>

      <SelectInput
        label="Job category"
        name="category_id"
        options={jobCategories}
        {...register("category_id", { required: "Required" })}
      />

      {/* Job Type selection */}
      {/* <div>
        <label className="block font-medium">Job Type</label>
        <div className="flex flex-wrap gap-4">
          {jobTypes.map((jobType) => (
            <div
              key={jobType.id}
              className="p-2 border rounded cursor-pointer"
              onClick={() => {
                setValue("job_type_id", [jobType.id]);
              }}
            >
              {jobType.name}
            </div>
          ))}
        </div>
      </div> */}
      <div className="form-group mt-6">
        <label className="app-text-label font-medium text-blue-900">
          Job Type <span className="text-red-500">*</span>
        </label>
        <div
          className={`flex flex-wrap gap-4 mt-2 ${
            errors.job_type_id?.message
              ? "border border-red-500 rounded-md p-2"
              : ""
          }`}
        >
          {jobTypes.map((jobType) => (
            <div
              key={jobType.id}
              className={`relative cursor-pointer p-2 rounded-lg flex flex-col items-center justify-center w-40 h-36 text-center 
                ${
                  selectedTypes.includes(jobType.id)
                    ? "shadow-inner shadow-blue-700 border-2 border-blue-700"
                    : "border"
                }`}
              onClick={() => {
                const newTypes = selectedTypes.includes(jobType.id)
                  ? selectedTypes.filter((id) => id !== jobType.id)
                  : [...selectedTypes, jobType.id];
                setSelectedTypes(newTypes);
                setValue("job_type_id", newTypes);
              }}
            >
              <div className="text-center">
                {(() => {
                  switch (jobType.name.toLowerCase()) {
                    case "full-time":
                      return <Briefcase className="w-8 h-8" />;
                    case "part-time":
                      return <Clock1Icon className="w-8 h-8" />;
                    case "contract":
                      return <Folder className="w-8 h-8" />;
                    case "temporary":
                      return <Clock1Icon className="w-8 h-8 text-yellow-500" />;
                    case "other":
                      return <FaPerson className="w-8 h-8" />;
                    case "volunteer":
                      return <HandIcon className="w-8 h-8" />;
                    case "internship":
                      return <FaUserGroup className="w-8 h-8" />;
                    default:
                      return <User2Icon className="w-8 h-8" />;
                  }
                })()}
              </div>
              <p className="text-sm mt-2">{jobType.name}</p>
              {selectedTypes.includes(jobType.id) && (
                <CheckIcon className="absolute -top-2 -right-1 rounded-full border-2 border-blue-700 w-7 h-7 text-blue-700 bg-white" />
              )}
            </div>
          ))}
        </div>
        {errors.job_type_id?.message && (
          <p className="text-sm text-red-600 mt-1">
            {errors.job_type_id.message}
          </p>
        )}
      </div>
    </>
  );
}
