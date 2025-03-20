"use client"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const JoinUsSection = () => {
  const { watch, setValue } = useFormContext()
  const joinUs = watch("join_us")

  const handleJoinUsChange = (value) => {
    setValue("join_us", value)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
      <ReactQuill theme="snow" value={joinUs || ""} onChange={handleJoinUsChange} className="h-48 mb-12" />
    </div>
  )
}

export default JoinUsSection

