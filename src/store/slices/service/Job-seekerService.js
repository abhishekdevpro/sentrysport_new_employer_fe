import { toast } from "react-toastify"

// Fetch job seekers with optional query parameters
export const fetchJobSeekers = async (queryParams, token) => {
  try {
    const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-seekers?${queryParams}`, {
      headers: {
        Authorization: token,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch job seekers")
    }

    return await response.json()
  } catch (error) {
    throw new Error(error.message || "Something went wrong")
  }
}

// Handle shortlist or reject action
export const handleShortlistReject = async (jobSeekerId, isShortlist, isRejected, token) => {
  try {
    const response = await fetch("https://api.sentryspot.co.uk/api/employeer/jobseeker-shortlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        job_seeker_id: jobSeekerId,
        is_shortlist: isShortlist,
        is_rejected: isRejected,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to update job seeker status")
    }

    const result = await response.json()
    toast.success(result.message || "Action successful")
    return result
  } catch (error) {
    throw new Error(error.message || "Something went wrong")
  }
}

// Handle save action
export const handleSave = async (jobSeekerId, token) => {
  try {
    const response = await fetch("https://api.sentryspot.co.uk/api/employeer/jobseeker-save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ job_seeker_id: jobSeekerId }),
    })

    if (!response.ok) {
      throw new Error("Failed to save job seeker")
    }

    const result = await response.json()
    toast.success(result.message || "Job seeker saved successfully")
    return result
  } catch (error) {
    throw new Error(error.message || "Something went wrong")
  }
}

// Handle review action
export const handleReview = async (jobSeekerId, token) => {
  try {
    const response = await fetch("https://api.sentryspot.co.uk/api/employeer/jobseeker-reviewed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ job_seeker_id: jobSeekerId }),
    })

    if (!response.ok) {
      throw new Error("Failed to review job seeker")
    }

    const result = await response.json()
    toast.success(result.message || "Job seeker reviewed successfully")
    return result
  } catch (error) {
    throw new Error(error.message || "Something went wrong")
  }
}

