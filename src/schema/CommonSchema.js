import * as zod from "zod";

export const phoneSchema = zod
  .string()
  .min(10, { message: "Phone number must be at least 10 digits long" })
  .max(15, { message: "Phone number must be no more than 15 digits long" }) // Allows for country code, etc.
  .regex(/^\d+$/, { message: "Phone number must contain only digits" });

// Define the strong password validation schema
export const passwordSchema = zod
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be no more than 32 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character",
  });
