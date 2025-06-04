"use client"
import { useFormContext } from "react-hook-form"

const SocialMediaLinks = () => {
  const { register, formState: { errors } } = useFormContext()

  const validateUrl = (value) => {
    if (!value) return true // Skip validation if empty
    try {
      new URL(value)
      return true
    } catch {
      return "Please enter a valid URL"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Facebook <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          {...register("facebook_link", {
            required: "Facebook link is required",
            validate: validateUrl
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.facebook_link ? 'border-red-500' : ''
          }`}
          placeholder="Facebook profile URL"
        />
        {errors.facebook_link && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.facebook_link.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          {...register("linkedin_link", {
            required: "LinkedIn link is required",
            validate: validateUrl
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.linkedin_link ? 'border-red-500' : ''
          }`}
          placeholder="LinkedIn profile URL"
        />
        {errors.linkedin_link && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.linkedin_link.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Twitter <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          {...register("twitter_link", {
            required: "Twitter link is required",
            validate: validateUrl
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.twitter_link ? 'border-red-500' : ''
          }`}
          placeholder="Twitter profile URL"
        />
        {errors.twitter_link && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.twitter_link.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          {...register("website_link", {
            required: "Website link is required",
            validate: validateUrl
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.website_link ? 'border-red-500' : ''
          }`}
          placeholder="Company website URL"
        />
        {errors.website_link && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.website_link.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default SocialMediaLinks

