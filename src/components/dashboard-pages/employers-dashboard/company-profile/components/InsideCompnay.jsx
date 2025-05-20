
import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"

const InsideCompanyImages = ({ token, BASE_IMAGE_URL, companyData }) => {
  const { watch } = useFormContext()

  // State for new images to be uploaded
  const [newCultureImages, setNewCultureImages] = useState([])
  const [newWorkplaceImages, setNewWorkplaceImages] = useState([])
  const [newPeopleImages, setNewPeopleImages] = useState([])
  const [existingIndex,setExistingIndex] = useState({})
  const [loadingtype,setLoadingType] = useState(null)
  
  // State for existing images from companyData
  const [existingCultureImages, setExistingCultureImages] = useState([])
  const [existingWorkplaceImages, setExistingWorkplaceImages] = useState([])
  const [existingPeopleImages, setExistingPeopleImages] = useState([])

  // Initialize with company data if available
  useEffect(() => {
    if (companyData) {
      // Set existing culture images
      if (companyData.inside_culture_images && Array.isArray(companyData.inside_culture_images)) {
        setExistingCultureImages(companyData.inside_culture_images)
      }
      
      // Set existing workplace images
      if (companyData.inside_workplace_images && Array.isArray(companyData.inside_workplace_images)) {
        setExistingWorkplaceImages(companyData.inside_workplace_images)
      }
      
      // Set existing people images
      if (companyData.inside_people_images && Array.isArray(companyData.inside_people_images)) {
        setExistingPeopleImages(companyData.inside_people_images)
      }
    }
  }, [companyData])

  // Handle image upload for different sections
  const handleInsideImageUpload = (e, type) => {
    const files = Array.from(e.target.files)
    let existingImages = []
    
    // Get existing images count for the specified type
    switch (type) {
      case "culture":
        existingImages = existingCultureImages
        break
      case "workplace":
        existingImages = existingWorkplaceImages
        break
      case "people":
        existingImages = existingPeopleImages
        break
      default:
        break
    }
    
    // Check if adding new images would exceed the limit of 3
    const totalImages = existingImages.length + files.length
    if (totalImages > 3) {
      toast.error(`You can only have up to 3 ${type} images total`)
      return
    }
    
    // Set new images for upload
    switch (type) {
      case "culture":
        setNewCultureImages(prevImages => [...prevImages, ...files])
        break
      case "workplace":
        setNewWorkplaceImages(prevImages => [...prevImages, ...files])
        break
      case "people":
        setNewPeopleImages(prevImages => [...prevImages, ...files])
        break
      default:
        break
    }
  }

  // Remove new image from a specific section
  const removeNewImage = (index, type) => {
    switch (type) {
      case "culture":
        setNewCultureImages(prev => prev.filter((_, i) => i !== index))
        break
      case "workplace":
        setNewWorkplaceImages(prev => prev.filter((_, i) => i !== index))
        break
      case "people":
        setNewPeopleImages(prev => prev.filter((_, i) => i !== index))
        break
      default:
        break
    }
  }
  
  // Remove existing image from a specific section
  const removeExistingImage = (index, type) => {
    // console.log(index,type,"removeExistingImageindex")
    setExistingIndex((prev) => ({
      ...prev,
      [type]: index,
    }));
    switch (type) {
      case "culture":
        setExistingCultureImages(prev => prev.filter((_, i) => i !== index))
        break
      case "workplace":
        setExistingWorkplaceImages(prev => prev.filter((_, i) => i !== index))
        break
      case "people":
        setExistingPeopleImages(prev => prev.filter((_, i) => i !== index))
        break
      default:
        break
    }
  }
  // console.log(existingIndex,"existingIndex");
  // Save images for a specific section
  const handleInsideImagesSave = async (type) => {
    const formData = new FormData()
    let newImages, existingImages, endpoint, uploadKey, existingKey
    setLoadingType(type)
    switch (type) {
      case "culture":
        newImages = newCultureImages
        existingImages = existingCultureImages
        endpoint = "/company-inside-culture"
        uploadKey = "inside_culture_images_upload"
        existingKey = "inside_culture_images"
        break
      case "workplace":
        newImages = newWorkplaceImages
        existingImages = existingWorkplaceImages
        endpoint = "/company-inside-workplace"
        uploadKey = "inside_workplace_images_upload"
        existingKey = "inside_workplace_images"
        break
      case "people":
        newImages = newPeopleImages
        existingImages = existingPeopleImages
        endpoint = "/company-inside-people"
        uploadKey = "inside_people_images_upload"
        existingKey = "inside_people_images"
        break
      default:
        return
    }
    
    // Add new images to upload
    newImages.forEach((image, index) => {
      formData.append(uploadKey, image)
      const deletedIndex = existingIndex[type];
    console.log(deletedIndex,"deletedIndex");
      // We use the deleted index only for the first new image if it exists
      if (deletedIndex !== undefined && index === 0) {
        formData.append("image_indexes", deletedIndex);
      } else {
        formData.append("image_indexes", index);
      }
    })
    
    // Add existing images to keep
    // existingImages.forEach((image) => {
    //   formData.append(existingKey, image)
    // })

    try {
      const response = await axios.patch(`https://api.sentryspot.co.uk/api/employeer${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })

      if (response.status === 200) {
        toast.success(`${type} images updated successfully!`)
        
        // Clear new images after successful upload
        switch (type) {
          case "culture":
            setNewCultureImages([])
            break
          case "workplace":
            setNewWorkplaceImages([])
            break
          case "people":
            setNewPeopleImages([])
            break
          default:
            break
        }
        
        // Update existing images with the response data if available
        if (response.data && response.data.data) {
          const updatedData = response.data.data
          switch (type) {
            case "culture":
              if (updatedData.inside_culture_images) {
                setExistingCultureImages(updatedData.inside_culture_images)
              }
              break
            case "workplace":
              if (updatedData.inside_workplace_images) {
                setExistingWorkplaceImages(updatedData.inside_workplace_images)
              }
              break
            case "people":
              if (updatedData.inside_people_images) {
                setExistingPeopleImages(updatedData.inside_people_images)
              }
              break
            default:
              break
          }
        }
      } else {
        toast.error(`Failed to update ${type} images. Please try again.`)
      }
    } catch (error) {
      console.error(`Error updating ${type} images:`, error)
      toast.error("An error occurred. Please try again.")
    }finally{
      setLoadingType(null)
    }
  }

  // Image section component
  const ImageSection = ({ title, type }) => {
    // Determine which arrays to use based on type
    let existingImages, newImages
    
    switch (type) {
      case "culture":
        existingImages = existingCultureImages
        newImages = newCultureImages
        break
      case "workplace":
        existingImages = existingWorkplaceImages
        newImages = newWorkplaceImages
        break
      case "people":
        existingImages = existingPeopleImages
        newImages = newPeopleImages
        break
      default:
        existingImages = []
        newImages = []
    }
    
    return (
      <div className="mb-8">
        <h5 className="text-lg font-medium text-gray-900 mb-4">{title}</h5>
        
        {/* Display existing images */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Existing Images:</p>
            <div className="flex items-center space-x-4 mb-4">
              {existingImages.map((image, index) => (
                <div key={`existing-${type}-${index}`} className="relative w-24 h-24">
                  <img
                    src={`${BASE_IMAGE_URL}/${image}`}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index, type)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display newly uploaded images */}
        {newImages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">New Images:</p>
            <div className="flex items-center space-x-4 mb-4">
              {newImages.map((image, index) => (
                <div key={`new-${type}-${index}`} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`${title} Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index, type)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Show upload button only if total images is less than 3 */}
        {existingImages.length + newImages.length < 3 && (
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleInsideImageUpload(e, type)} 
            className="mb-4" 
            multiple 
          />
        )}
        {/* {console.log(existingImages.length)} */}
        <button
          type="button"
          onClick={() => handleInsideImagesSave(type)}
          disabled={loadingtype == type || existingImages.length===3  }
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            loadingtype === type || existingImages.length === 3
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
         {loadingtype == type ?"Saving..."  :`Save ${title}`}
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Inside Culture Images */}
      <ImageSection
        title="Inside Culture Images"
        type="culture"
      />

      {/* Inside Workplace Images */}
      <ImageSection
        title="Inside Workplace Images"
        type="workplace"
      />

      {/* Inside People Images */}
      <ImageSection
        title="Inside People Images"
        type="people"
      />
    </>
  )
}

export default InsideCompanyImages