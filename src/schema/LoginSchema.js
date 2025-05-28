import * as zod from "zod";
import { passwordSchema } from "./CommonSchema";

// Define the validation schema using Zod
const LoginSchema = zod.object({
  email: zod.string().min(1, "Email is required").email("Email is invalid"),
  password: zod.string().min(1, "Password is required"),
});

export { LoginSchema };
