// "use client"
// import { useFormContext } from "react-hook-form"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"

// const JoinUsSection = ({companyData}) => {
//   const { watch, setValue } = useFormContext()
//   const joinUs = watch("join_us")

//   const handleJoinUsChange = (value) => {
//     setValue("join_us", value)
//   }

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
//       <ReactQuill theme="snow" value={joinUs || ""} onChange={handleJoinUsChange} className="h-48 mb-12" />
//     </div>
//   )
// }

// export default JoinUsSection

"use client"

import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const JoinUsSection = ({ companyData }) => {
  const { watch, setValue } = useFormContext()
  const [quillValue, setQuillValue] = useState("")
  
  // Initialize with company data if available
  useEffect(() => {
    if (companyData && companyData.join_us) {
      setQuillValue(companyData.join_us)
      setValue("join_us", companyData.join_us)
    }
  }, [companyData, setValue])

  const handleJoinUsChange = (value) => {
    setQuillValue(value)
    setValue("join_us", value)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
      <ReactQuill 
        theme="snow" 
        value={quillValue} 
        onChange={handleJoinUsChange} 
        className="h-48 mb-12" 
        placeholder="Describe career opportunities at your company..."
      />
    </div>
  )
}

export default JoinUsSection