"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"

const InsideCompanyImages = ({ token, BASE_IMAGE_URL }) => {
  const { watch } = useFormContext()

  const [insideCultureImages, setInsideCultureImages] = useState([])
  const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([])
  const [insidePeopleImages, setInsidePeopleImages] = useState([])

  // Handle image upload for different sections
  const handleInsideImageUpload = (e, type) => {
    const files = Array.from(e.target.files)
    if (files.length > 3) {
      toast.error(`You can only upload up to 3 ${type} images`)
      return
    }
    switch (type) {
      case "culture":
        setInsideCultureImages(files)
        break
      case "workplace":
        setInsideWorkplaceImages(files)
        break
      case "people":
        setInsidePeopleImages(files)
        break
      default:
        break
    }
  }

  // Remove image from a specific section
  const removeInsideImage = (index, type) => {
    switch (type) {
      case "culture":
        setInsideCultureImages((prev) => prev.filter((_, i) => i !== index))
        break
      case "workplace":
        setInsideWorkplaceImages((prev) => prev.filter((_, i) => i !== index))
        break
      case "people":
        setInsidePeopleImages((prev) => prev.filter((_, i) => i !== index))
        break
      default:
        break
    }
  }

  // Save images for a specific section
  const handleInsideImagesSave = async (type) => {
    const formData = new FormData()
    let images, endpoint, uploadKey

    switch (type) {
      case "culture":
        images = insideCultureImages
        endpoint = "/company-inside-culture"
        uploadKey = "inside_culture_images_upload"
        break
      case "workplace":
        images = insideWorkplaceImages
        endpoint = "/company-inside-workplace"
        uploadKey = "inside_workplace_images_upload"
        break
      case "people":
        images = insidePeopleImages
        endpoint = "/company-inside-people"
        uploadKey = "inside_people_images_upload"
        break
      default:
        return
    }

    images.forEach((image, index) => {
      formData.append(`${uploadKey}`, image)
      formData.append("image_indexes", index.toString())
    })

    try {
      const response = await axios.patch(`https://api.sentryspot.co.uk/api/employeer${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })

      if (response.status === 200) {
        toast.success(`${type} images updated successfully!`)
      } else {
        toast.error(`Failed to update ${type} images. Please try again.`)
      }
    } catch (error) {
      console.error(`Error updating ${type} images:`, error)
      toast.error("An error occurred. Please try again.")
    }
  }

  // Image section component
  const ImageSection = ({ title, images, type, handleUpload, handleRemove, handleSave }) => (
    <div className="mb-8">
      <h5 className="text-lg font-medium text-gray-900 mb-4">{title}</h5>
      <div className="flex items-center space-x-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={typeof image === "string" ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemove(index, type)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {images.length < 3 && (
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, type)} className="mb-4" multiple />
      )}
      <button
        type="button"
        onClick={() => handleSave(type)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Save {title}
      </button>
    </div>
  )

  return (
    <>
      {/* Inside Culture Images */}
      <ImageSection
        title="Inside Culture Images"
        images={insideCultureImages}
        type="culture"
        handleUpload={handleInsideImageUpload}
        handleRemove={removeInsideImage}
        handleSave={handleInsideImagesSave}
      />

      {/* Inside Workplace Images */}
      <ImageSection
        title="Inside Workplace Images"
        images={insideWorkplaceImages}
        type="workplace"
        handleUpload={handleInsideImageUpload}
        handleRemove={removeInsideImage}
        handleSave={handleInsideImagesSave}
      />

      {/* Inside People Images */}
      <ImageSection
        title="Inside People Images"
        images={insidePeopleImages}
        type="people"
        handleUpload={handleInsideImageUpload}
        handleRemove={removeInsideImage}
        handleSave={handleInsideImagesSave}
      />
    </>
  )
}

export default InsideCompanyImages

