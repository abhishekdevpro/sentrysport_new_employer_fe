// services/jobService.js
import { Constant } from "@/utils/constant/constant";
import axios from "axios";

const token = () => localStorage.getItem(Constant.USER_TOKEN);

export default {
  // CRUD
  createJob: (formData) =>
    axios.post(
      "https://api.sentryspot.co.uk/api/employeer/job-post",
      formData,
      { headers: { Authorization: token(), "Content-Type": "multipart/form-data" } }
    ),

  updateJob: (id, formData) =>
    axios.post(
      `https://api.sentryspot.co.uk/api/employeer/job-post/${id}`,
      formData,
      { headers: { Authorization: token(), "Content-Type": "multipart/form-data" } }
    ),

  getJobById: (id) =>
    axios.get(
     `https://api.sentryspot.co.uk/api/employeer/job?job_id=${id}`,
      { headers: { Authorization: token() } }
    ).then(res => res.data.data),

  // Dropdown data
  getExperienceLevels: () =>
    axios.get("https://api.sentryspot.co.uk/api/jobseeker/experience-level")
      .then(r => r.data.data || []),

  getIndustries: () =>
    axios.get("https://api.sentryspot.co.uk/api/jobseeker/industries")
      .then(r => r.data.data || []),

  getFunctionalAreas: () =>
    axios.get("https://api.sentryspot.co.uk/api/jobseeker/functional-area")
      .then(r => r.data.data || []),

  getJobCategories: () =>
    axios.get("https://api.sentryspot.co.uk/api/employeer/job-categories")
      .then(r => r.data.data || []),
};
