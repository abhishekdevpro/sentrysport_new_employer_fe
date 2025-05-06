
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { toast } from "react-toastify"
import Input from "@/UI-Components/Input"

const AboutCompany = ({ token, BASE_IMAGE_URL, companyData }) => {
  const { register, setValue, getValues } = useFormContext()
  const [selectedImages, setSelectedImages] = useState([])
  const [loading,setLoading] = useState(false)
  const [existingImages, setExistingImages] = useState([])
  const [quillsummery, setQuillsummery] = useState("")
  const [quillAbout, setQuillAbout] = useState("")

  // Initialize form with company data if available
  useEffect(() => {
    // Set form values from companyData if available
    if (companyData) {
      if (companyData.title) {
        setValue("title", companyData.title)
      }
      if (companyData.summery) {
        setValue("summery", companyData.summery)
        setQuillsummery(companyData.summery)
      }
      if (companyData.about) {
        setValue("about", companyData.about)
        setQuillAbout(companyData.about)
      }
      
      // Set existing images if available
      if (companyData.about_images && Array.isArray(companyData.about_images)) {
        setExistingImages(companyData.about_images)
      }
    }
  }, [companyData, setValue])

  // Set values for rich text editors
  const handlesummeryChange = (value) => {
    setQuillsummery(value)
    setValue("summery", value)
  }

  const handleAboutChange = (value) => {
    setQuillAbout(value)
    setValue("about", value)
  }

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
    const totalImages = selectedImages.length + existingImages.length
    if (totalImages > 3) {
      toast.error("Please ensure only 3 images are selected in total.")
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
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 flex flex-col justify-between gap-4 md:gap-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Title</label>
        <Input
          type="text"
          {...register("title")}
          defaultValue={companyData?.title || ""}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Company title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">summery</label>
        <div className="quill-container" style={{ minHeight: "200px" }}>
          <ReactQuill 
            theme="snow" 
            value={quillsummery} 
            onChange={handlesummeryChange} 
            className="h-auto mb-6" 
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <div className="quill-container" style={{ minHeight: "200px" }}>
          <ReactQuill 
            theme="snow" 
            value={quillAbout} 
            onChange={handleAboutChange} 
            className="h-auto mb-6" 
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Images (Max: 3)</label>
        
        {/* Display existing images */}
        {existingImages.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Existing Images:</p>
            <div className="flex items-center space-x-2 mb-4">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="relative w-24 h-24">
              
                  <img
                    src={`${BASE_IMAGE_URL}${image}`}
                    alt="Company"
                    className="w-full h-full object-cover rounded-lg"
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
        )}
        
        {/* Display newly selected images */}
        {selectedImages.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">New Images:</p>
            <div className="flex items-center space-x-2">
              {selectedImages.map((image, index) => (
                <div key={`new-${index}`} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Upload Preview"
                    className="w-full h-full object-cover rounded-lg"
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
            className="mt-4" 
            multiple 
          />
        )}
      </div>
      <div className="flex justify-start mt-4">
        <button
          type="button"
          onClick={handleAboutSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
         {loading ?"Saving...":" Save About Section"}
        </button>
      </div>
    </div>
  )
}

export default AboutCompany