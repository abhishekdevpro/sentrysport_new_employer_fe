import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { toast } from "react-toastify"
import Input from "@/UI-Components/Input"
import { Button } from "@/components/ui/button"

const AboutCompany = ({ token, BASE_IMAGE_URL, companyData }) => {
  const { register, setValue, getValues, formState: { errors }, control } = useFormContext()
  const [selectedImages, setSelectedImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [existingImages, setExistingImages] = useState([])
  const [quillsummery, setQuillsummery] = useState("")
  const [quillAbout, setQuillAbout] = useState("")
  const [summaryError, setSummaryError] = useState("")
  const [aboutError, setAboutError] = useState("")

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  }

  // Initialize form with company data if available
  useEffect(() => {
    if (companyData) {
      if (companyData.title) {
        setValue("title", companyData.title)
      }
      if (companyData.summery) {
        setQuillsummery(companyData.summery)
        setValue("summery", companyData.summery)
      }
      if (companyData.about) {
        setQuillAbout(companyData.about)
        setValue("about", companyData.about)
      }
      
      if (companyData.about_images && Array.isArray(companyData.about_images)) {
        setExistingImages(companyData.about_images)
      }
    }
  }, [companyData, setValue])

  // Validate rich text content
  const validateRichText = (content, minLength, fieldName) => {
    const plainText = content.replace(/<[^>]*>/g, '').trim()
    if (!plainText) {
      return `${fieldName} is required`
    }
    if (plainText.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters`
    }
    return ""
  }

  // Set values for rich text editors
  const handlesummeryChange = (content) => {
    setQuillsummery(content)
    setValue("summery", content)
    const error = validateRichText(content, 50, "Summary")
    setSummaryError(error)
  }

  const handleAboutChange = (content) => {
    setQuillAbout(content)
    setValue("about", content)
    const error = validateRichText(content, 100, "Description")
    setAboutError(error)
  }

  // Register the rich text fields
  useEffect(() => {
    register("summery", {
      required: "Summary is required",
      validate: (value) => {
        const plainText = value.replace(/<[^>]*>/g, '')
        if (plainText.trim().length < 50) {
          return "Summary must be at least 50 characters"
        }
        return true
      }
    })

    register("about", {
      required: "Description is required",
      validate: (value) => {
        const plainText = value.replace(/<[^>]*>/g, '')
        if (plainText.trim().length < 100) {
          return "Description must be at least 100 characters"
        }
        return true
      }
    })
  }, [register])

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const totalImages = files.length + selectedImages.length + existingImages.length
    
    if (totalImages > 3) {
      toast.error("You can only have up to 3 images total")
      return
    }
    setSelectedImages((prev) => [...prev, ...files])
  }

  // Remove newly selected image
  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Remove existing image
  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Save about section
  const handleAboutSave = async (event) => {
    event.preventDefault()
    setLoading(true)

    // Validate all fields
    const titleError = !getValues("title") ? "Company title is required" : ""
    const summaryError = validateRichText(quillsummery, 50, "Summary")
    const aboutError = validateRichText(quillAbout, 100, "Description")
    const imageError = selectedImages.length + existingImages.length === 0 ? "At least one image is required" : ""

    if (titleError || summaryError || aboutError || imageError) {
      if (titleError) toast.error(titleError)
      if (summaryError) toast.error(summaryError)
      if (aboutError) toast.error(aboutError)
      if (imageError) toast.error(imageError)
      setLoading(false)
      return
    }

    const formData = new FormData()
    const values = getValues()
    
    formData.append("title", values.title || "")
    formData.append("about", values.about || "")
    formData.append("summery", values.summery || "")
    
    // Add new images to upload
    selectedImages.forEach((image) => {
      formData.append("about_images_upload", image)
    })
    
    // Add existing images to keep
    existingImages.forEach((image) => {
      formData.append("about_images", image)
    })

    try {
      const response = await axios.patch("https://api.sentryspot.co.uk/api/employeer/company-about", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })

      if (response.status === 200) {
        toast.success("About section updated successfully!")
      } else {
        toast.error("Failed to update about section. Please try again.")
      }
    } catch (error) {
      console.error("Error updating about section:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Company Title <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          {...register("title", {
            required: "Company title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters"
            },
            maxLength: {
              value: 100,
              message: "Title must not exceed 100 characters"
            }
          })}
          defaultValue={companyData?.title || ""}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : ''
          }`}
          placeholder="Enter Company title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Summary <span className="text-red-500">*</span>
          <span className="text-sm text-gray-500 ml-2">(Minimum 50 characters)</span>
        </label>
        <div className={`quill-container ${summaryError ? 'border-2 border-red-500 rounded-lg' : ''}`}>
          <ReactQuill 
            theme="snow" 
            value={quillsummery} 
            onChange={handlesummeryChange} 
            modules={modules}
            placeholder="Enter company summary..."
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </div>
        {summaryError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {summaryError}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
          <span className="text-sm text-gray-500 ml-2">(Minimum 100 characters)</span>
        </label>
        <div className={`quill-container ${aboutError ? 'border-2 border-red-500 rounded-lg' : ''}`}>
          <ReactQuill 
            theme="snow" 
            value={quillAbout} 
            onChange={handleAboutChange} 
            modules={modules}
            placeholder="Enter company description..."
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </div>
        {aboutError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {aboutError}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Images (Max: 3) <span className="text-red-500">*</span>
        </label>
        
        {/* Display existing images */}
        {existingImages.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Existing Images:</p>
            <div className="flex items-center gap-4">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="relative w-24 h-24">
                  <img
                    src={`${BASE_IMAGE_URL}${image}`}
                    alt="Company"
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg?height=150&width=150";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">No existing images</p>
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((_, index) => (
                <div key={`placeholder-${index}`} className="relative w-24 h-24">
                  <img
                    src="/placeholder.svg?height=150&width=150"
                    alt="Placeholder"
                    className="w-full h-full object-cover rounded-lg bg-gray-100"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display newly selected images */}
        {selectedImages.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">New Images:</p>
            <div className="flex items-center gap-4">
              {selectedImages.map((image, index) => (
                <div key={`new-${index}`} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Upload Preview"
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg?height=150&width=150";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Show file input only if total images is less than 3 */}
        {selectedImages.length + existingImages.length < 3 && (
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="mt-2" 
            multiple 
          />
        )}
        {selectedImages.length + existingImages.length === 0 && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            At least one image is required
          </p>
        )}
      </div>

      <div className="flex justify-start">
        <Button
          type="button"
          onClick={handleAboutSave}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save About Section"}
        </Button>
      </div>
    </div>
  )
}

export default AboutCompany