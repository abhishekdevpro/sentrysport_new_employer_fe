"use client"
import { useFormContext } from "react-hook-form"

const SocialMediaLinks = () => {
  const { register } = useFormContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
        <input
          type="text"
          {...register("facebook_link")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Facebook profile URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
        <input
          type="text"
          {...register("linkedin_link")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="LinkedIn profile URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
        <input
          type="text"
          {...register("twitter_link")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Twitter profile URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <input
          type="text"
          {...register("website_link")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Company website URL"
        />
      </div>
    </div>
  )
}

export default SocialMediaLinks

