"use client"
import Input from "@/UI-Components/Input"
import { useFormContext } from "react-hook-form"

const BasicInformation = () => {
  const { register } = useFormContext()

  return (
    <div className="grid gap-6">
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <Input
          type="text"
          {...register("company_name")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter company name"
        />
      </div>
    </div>
  )
}

export default BasicInformation

