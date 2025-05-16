import * as zod from "zod";
import { phoneSchema } from "./CommonSchema";

// Define the validation schema using Zod
const PersonalDetailSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  phone: phoneSchema,
  email: zod.string().min(1, "Email is required").email("Email is invalid"),
  designation: zod.string().min(1, "Designation is required"),
  organization: zod.string().min(1, "Organization is required"),
  website: zod.string().min(1, "website link is required"),
  recuiter_type: zod.string().min(1, "Recuiter Type is required"),
  organization_location: zod
    .string()
    .min(1, "Organization location is required"),
  about: zod.string().min(1, "Company description is required"),
});

export { PersonalDetailSchema };
