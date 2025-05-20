import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignupDialog } from "@/store/slices/auth";
import { signUpSchema } from "@/schema/SignupSchema";
import { userSignUp } from "@/store/slices/auth/actions";
import toast from "react-hot-toast";

const passwordCriteria = [
  "At least 8 characters long",
  "At least one uppercase letter",
  "At least one lowercase letter",
  "At least one number",
  "At least one special character",
];
const SignUpDialog = () => {
  const dispatch = useDispatch();
  const { loading, openSignupDialog } = useSelector((state) => state.auth);
  const [showTooltip, setShowTooltip] = useState(false);
  const [userType, setUserType] = useState("");
  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema), // Connect Zod validation schema
  });
  // Handle form submission
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data:", data);
  //   // Add your signup logic here, e.g., sending data to the server
  // };

  const submitHandler = async (e) => {
    // e.preventDefault();
    if (e.password == e.confirm_password) {
      const { first_name, last_name, email, phone, password, organization } = e;
      console.log(first_name, last_name, email, phone, password, organization);
      dispatch(
        userSignUp({
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          password: password,
          company_name: organization,
        })
      );
    } else toast.error("Match Password");
  };

  useEffect(() => {
    // Prevent scrolling on body when dialog is open
    if (openSignupDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSignupDialog]);

  if (!openSignupDialog) return null;

  return (
    <Dialog
      open={openSignupDialog}
      onOpenChange={() => dispatch(toggleSignupDialog())}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-semibold">
            Post a job for free
          </DialogTitle>
          <DialogDescription className="text-left">
            Register, post a job and easily find great talent for your company
            or clients!
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex justify-between space-x-2 flex-wrap gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col w-full sm:w-[45%] gap-2  ">
            <Button
              type="button"
              className={` border  ${
                userType == "company"
                  ? "bg-slate-800 text-white"
                  : "bg-transparent text-gray-700 hover:!bg-gray-200"
              }`}
              onClick={() => setUserType("company")}
            >
              I am a Company
            </Button>
            {/* {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )} */}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2">
            <Button
              type="button"
              className={` border ${
                userType == "consultant"
                  ? "bg-slate-800 text-white"
                  : "bg-transparent text-gray-700 hover:!bg-gray-200"
              }`}
              onClick={() => setUserType("consultant")}
            >
              I am a Consultant
            </Button>
            {/* {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )} */}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2  ">
            <Label htmlFor="first_name" className="">
              First Name
            </Label>
            <Input
              id="first_name"
              type="text"
              {...register("first_name")}
              placeholder="First Name"
              className={`${errors.first_name && " !border-red-500"}`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2 ">
            <Label htmlFor="last_name" className="">
              Last Name
            </Label>
            <Input
              id="last_name"
              type="text"
              {...register("last_name")}
              placeholder="Last Name"
              className={`${errors.last_name && " !border-red-500"}`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2  ">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`${errors.email && " !border-red-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2 ">
            <Label htmlFor="phone" className="">
              Phone
            </Label>
            <Input
              id="phone"
              type="text"
              {...register("phone")}
              placeholder="Phone"
              className={`${errors.phone && " !border-red-500"}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2 ">
            <Label htmlFor="organization" className="">
              Organization
            </Label>
            <Input
              id="organization"
              type="text"
              {...register("organization")}
              placeholder="Organization"
              className={`${errors.organization && " !border-red-500"}`}
            />
            {errors.organization && (
              <p className="text-red-500 text-sm">
                {errors.organization.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2 ">
            <Label htmlFor="designation" className="">
              Designation
            </Label>
            <Input
              id="designation"
              type="text"
              {...register("designation")}
              placeholder="Designation"
              className={`${errors.designation && " !border-red-500"}`}
            />
            {errors.designation && (
              <p className="text-red-500 text-sm">
                {errors.designation.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2 relative">
            <Label htmlFor="password" className="">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
              className={`${errors.password && " !border-red-500"}`}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {showTooltip && (
              <div className="absolute top-[-9rem] bg-gray-100 border border-gray-300 p-3 rounded-lg shadow-lg mt-2 w-full">
                <ul className="text-sm text-gray-700">
                  {passwordCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-center">
                      {/* <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg> */}
                      {index + 1}. {criteria}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-[45%] gap-2 ">
            <Label htmlFor="confirm_password" className="">
              Confirm Password
            </Label>
            <Input
              id="confirm_password"
              type="password"
              {...register("confirm_password")}
              placeholder="Confirm Password"
              className={`${errors.confirm_password && " !border-red-500"}`}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <Button type="submit" size="sm" className="px-3 py-4 w-full bg-blue-900">
            Register
          </Button>
        </form>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
