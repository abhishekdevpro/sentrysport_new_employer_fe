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
import { userLogin } from "@/store/slices/auth/actions";
import ActionLoader from "../loader/ActionLoader";

const Login = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema), // Connect Zod validation schema
  });

  const submitHandler = async (e) => {
    const { email, password } = e;
    if (password && email) {
      dispatch(
        userLogin({
          email,
          password,
        })
      );
    } else toast.error("please fill all the fields");
  };
  return (
    <Card className="w-[350px] sm:w-[400px] m-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl text-left font-ubuntu">
          Get started for Free
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form
          className="flex justify-between space-x-2 flex-wrap gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col w-full  gap-2">
            <Label htmlFor="email" className="text-left">
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
          <div className="flex flex-col w-full  gap-2  ">
            <Label htmlFor="password" className="text-left">
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
            <div className="flex justify-end">
              <span
                className="cursor-pointer text-blue-900"
                onClick={setIsLogin}
              >
                Forgot Password
              </span>
            </div>
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3 py-4 w-full duration-300 bg-[#51366c] hover:bg-[#e60278]"
          >
            {loading ? <ActionLoader /> : "Login"}
          </Button>
        </form>
        <div className="mt-4">
          <p className="text-center">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-violet-500"
              onClick={() => {
                dispatch(toggleSignupDialog());
              }}
            >
              Register
            </span>
          </p>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
};

export default Login;
