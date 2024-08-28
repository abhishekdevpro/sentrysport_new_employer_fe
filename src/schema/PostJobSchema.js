import * as zod from "zod";
import { passwordSchema, phoneSchema } from "./CommonSchema";

// Define the validation schema using Zod
const PostJobSchema = zod.object({
  job_title: zod.string().min(1, "Job title is required"),
  location: zod.string().min(1, "Location is required"),
  min_year_of_experience: zod.string().min(1, "Min Experience is required"),
  max_year_of_experience: zod.string().min(1, "Max Experience is required"),

  job_description: zod.string().min(1, "Job description is required"),
  video_jd: zod.string(),
  category: zod.string().min(1, "Category is required"),
  function_area: zod.string().min(1, "functin_area"),
  annual_salary: zod.string().min(1, "Salary range is required"),
  annual_salary_max: zod.string().min(1, "Salary range is required"),
  graduation_year_min: zod.string().min(1, "years of gradution"),
  graduation_year_max: zod.string().min(1, "last years  of gradution"),
  //   tags: zod.string(),
  job_type: zod.string().min(1, "Job type is required"),
  email: zod.string().min(1, "Email is required").email("Email is invalid"),
  diversity_hiring: zod.string().min(1, "Diversity hiring are required"),

  //   qualifications: zod.string().min(1, "Qualifications are required"),
  //   benefits: zod.string().min(1, "Benefits are required"),
  //   company_description: zod.string().min(1, "Company description is required"),

  //   first_name: zod.string().min(1, "First name is required"),
  //   last_name: zod.string().min(1, "Last name is required"),
  //   phone: phoneSchema,
  //   organization: zod.string().min(1, "Organization is required"),
  //   designation: zod.string().min(1, "Designation is required"),
});

export { PostJobSchema };
