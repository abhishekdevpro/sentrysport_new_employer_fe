import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schema/LoginSchema";
import { toggleSignupDialog } from "@/store/slices/auth";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { ResetSchema } from "@/schema/ResetSchema";
const ResetPassword = ({ setIsLogin }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetSchema), // Connect Zod validation schema
  });

  const submitHandler = async (e) => {
    // e.preventDefault();
  };
  return (
    <Card className="w-[350px] sm:w-[400px] m-auto shadow-lg">
      <CardHeader>
        <span
          className="flex items-center gap-2 cursor-pointer mb-4"
          onClick={setIsLogin}
        >
          <IoArrowBackCircleOutline size={20} />
          <span>Back to login</span>
        </span>
        <CardTitle className="text-3xl">Reset your password</CardTitle>
        <CardDescription className="text-md mb-2">
          To obtain a new password, please enter your e-mail address and a link
          will be emailed to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex justify-between space-x-2 flex-wrap gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col w-full  gap-2 mb-4 ">
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

          <Button type="submit" size="sm" className="px-3 py-4 w-full">
            Send Reset Email
          </Button>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
};

export default ResetPassword;
