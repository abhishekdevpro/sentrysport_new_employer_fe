"use client"
import Input from "@/UI-Components/Input"
import { useFormContext } from "react-hook-form"

const BasicInformation = () => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="grid gap-6">
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <Input
          type="text"
          {...register("company_name", {
            required: "Company name is required",
            minLength: {
              value: 2,
              message: "Company name must be at least 2 characters"
            },
            maxLength: {
              value: 100,
              message: "Company name must not exceed 100 characters"
            }
          })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter company name"
        />
        {errors.company_name && (
          <p className="mt-1 text-sm text-red-600">{errors.company_name.message}</p>
        )}
      </div>
    </div>
  )
}

export default BasicInformation

