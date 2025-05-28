import * as zod from "zod";
import { passwordSchema, phoneSchema } from "./CommonSchema";

// Define the validation schema using Zod
const signUpSchema = zod.object({
  first_name: zod.string().min(1, "First name is required"),
  last_name: zod.string().min(1, "Last name is required"),
  email: zod.string().min(1, "Email is required").email("Email is invalid"),
  phone: phoneSchema,
  organization: zod.string().min(1, "Organization is required"),
  designation: zod.string().min(1, "Designation is required"),
  password: passwordSchema,
  confirm_password: passwordSchema,
});

export { signUpSchema };
