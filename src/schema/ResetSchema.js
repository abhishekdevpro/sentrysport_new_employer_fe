import * as zod from "zod";

// Define the validation schema using Zod
const ResetSchema = zod.object({
  email: zod.string().min(1, "Email is required").email("Email is invalid"),
});

export { ResetSchema };
