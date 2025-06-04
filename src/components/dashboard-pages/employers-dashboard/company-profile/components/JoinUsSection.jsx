"use client"

import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const JoinUsSection = ({ companyData }) => {
  const { watch, setValue, formState: { errors }, register } = useFormContext()
  const [quillValue, setQuillValue] = useState("")
  
  // Initialize with company data if available
  useEffect(() => {
    if (companyData && companyData.join_us) {
      setQuillValue(companyData.join_us)
      setValue("join_us", companyData.join_us, {
        shouldValidate: true
      })
    }
  }, [companyData, setValue])

  const handleJoinUsChange = (value) => {
    setQuillValue(value)
    setValue("join_us", value, {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  // Register the field for validation
  useEffect(() => {
    register("join_us", {
      required: "Career opportunities description is required",
      validate: (value) => {
        // Remove HTML tags for length validation
        const plainText = value.replace(/<[^>]*>/g, '')
        if (plainText.trim().length < 50) {
          return "Description must be at least 50 characters"
        }
        if (plainText.length > 2000) {
          return "Description must not exceed 2000 characters"
        }
        return true
      }
    })
  }, [register])

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Career Opportunities <span className="text-red-500">*</span>
      </label>
      <div className={`relative ${errors.join_us ? 'border-2 border-red-500 rounded-lg' : ''}`}>
        <ReactQuill 
          theme="snow" 
          value={quillValue} 
          onChange={handleJoinUsChange} 
          className="h-48"
          placeholder="Describe career opportunities at your company..."
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ]
          }}
        />
      </div>
      {errors.join_us && (
        <div className="mt-2 mb-4">
          <p className="text-sm font-medium text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.join_us.message}
          </p>
        </div>
      )}
      {!errors.join_us && <div className="h-8" />} {/* Spacer to maintain consistent layout */}
    </div>
  )
}

export default JoinUsSection