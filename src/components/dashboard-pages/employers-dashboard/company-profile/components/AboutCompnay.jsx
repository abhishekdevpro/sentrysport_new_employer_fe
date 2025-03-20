// "use client"

// import { useState } from "react"
// import { useFormContext } from "react-hook-form"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import axios from "axios"
// import { toast } from "react-toastify"
// import Input from "@/UI-Components/Input"

// const AboutCompany = ({ token, BASE_IMAGE_URL }) => {
//   const { register, watch, setValue } = useFormContext()
//   const [selectedImages, setSelectedImages] = useState([])
//   const [existingImages, setExistingImages] = useState([])

//   // Get values from form context
//   const title = watch("title")
//   const about = watch("about")
//   const summery = watch("summery")

//   // Set values for rich text editors
//   const handleSummaryChange = (value) => {
//     setValue("summery", value)
//   }

//   const handleAboutChange = (value) => {
//     setValue("about", value)
//   }

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     if (files.length + selectedImages.length > 3) {
//       toast.error("You can only upload up to 3 images")
//       return
//     }
//     setSelectedImages((prev) => [...prev, ...files])
//   }

//   // Remove image
//   const removeImage = (index) => {
//     setSelectedImages((prev) => prev.filter((_, i) => i !== index))
//   }

//   // Save about section
//   const handleAboutSave = async (event) => {
//     event.preventDefault()

//     if (selectedImages.length > 3) {
//       toast.error("Please ensure only 3 images are selected.")
//       return
//     }

//     const formData = new FormData()
//     formData.append("title", title)
//     formData.append("about", about)
//     formData.append("summery", summery)
//     selectedImages.forEach((image) => {
//       formData.append("about_images_upload", image)
//     })

//     try {
//       const response = await axios.patch("https://api.sentryspot.co.uk/api/employeer/company-about", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//       })

//       if (response.status === 200) {
//         toast.success("About section updated successfully!")
//       } else {
//         toast.error("Failed to update about section. Please try again.")
//       }
//     } catch (error) {
//       console.error("Error updating about section:", error)
//       toast.error("An error occurred. Please try again.")
//     }
//   }

//   return (
//     <div className="space-y-6 flex flex-col justify-between gap-4 md:gap-2">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Company Title</label>
//         <Input
//           type="text"
//           {...register("title")}
//           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter Company title"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
//         <ReactQuill theme="snow" value={summery || ""} onChange={handleSummaryChange} className="h-48 mb-12" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//         <ReactQuill theme="snow" value={about || ""} onChange={handleAboutChange} className="h-48 mb-12" />
//       </div>

//       <div className="">
//         <label className="block text-sm font-medium text-gray-700">Upload Images (Max: 3)</label>
//         <div className="flex items-center space-x-2">
//           {selectedImages.map((image, index) => (
//             <div key={index} className="relative w-24 h-24">
//               <img
//                 src={URL.createObjectURL(image) || "/placeholder.svg"}
//                 alt="Uploaded"
//                 className="w-full h-full object-cover rounded-lg"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//         {selectedImages.length < 3 && (
//           <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-4" multiple />
//         )}
//       </div>
//       <div className="flex justify-start">
//         <button
//           type="button"
//           onClick={handleAboutSave}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//         >
//           Save About Section
//         </button>
//       </div>
//     </div>
//   )
// }

// export default AboutCompany
"use client"

import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { toast } from "react-toastify"
import Input from "@/UI-Components/Input"

const AboutCompany = ({ token, BASE_IMAGE_URL }) => {
  const { register, setValue, getValues } = useFormContext()
  const [selectedImages, setSelectedImages] = useState([])
  const [quillSummary, setQuillSummary] = useState("")
  const [quillAbout, setQuillAbout] = useState("")

  // Initialize Quill editors with form values on component mount
  useEffect(() => {
    const values = getValues();
    if (values.summary) setQuillSummary(values.summary);
    if (values.about) setQuillAbout(values.about);
  }, [getValues]);

  // Set values for rich text editors
  const handleSummaryChange = (value) => {
    setQuillSummary(value)
    setValue("summary", value)
  }

  const handleAboutChange = (value) => {
    setQuillAbout(value)
    setValue("about", value)
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + selectedImages.length > 3) {
      toast.error("You can only upload up to 3 images")
      return
    }
    setSelectedImages((prev) => [...prev, ...files])
  }

  // Remove image
  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Save about section
  const handleAboutSave = async (event) => {
    event.preventDefault()

    if (selectedImages.length > 3) {
      toast.error("Please ensure only 3 images are selected.")
      return
    }

    const formData = new FormData()
    const values = getValues()
    
    formData.append("title", values.title)
    formData.append("about", values.about)
    formData.append("summary", values.summary) // Fixed spelling
    
    selectedImages.forEach((image) => {
      formData.append("about_images_upload", image)
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
    }
  }

  return (
    <div className="space-y-6 flex flex-col justify-between gap-4 md:gap-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Title</label>
        <Input
          type="text"
          {...register("title")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Company title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <div className="quill-container" style={{ minHeight: "200px" }}>
          <ReactQuill 
            theme="snow" 
            value={quillSummary} 
            onChange={handleSummaryChange} 
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
        <label className="block text-sm font-medium text-gray-700">Upload Images (Max: 3)</label>
        <div className="flex items-center space-x-2 mt-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(image) || "/placeholder.svg"}
                alt="Uploaded"
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
        {selectedImages.length < 3 && (
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-4" multiple />
        )}
      </div>
      <div className="flex justify-start mt-4">
        <button
          type="button"
          onClick={handleAboutSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save About Section
        </button>
      </div>
    </div>
  )
}

export default AboutCompany
