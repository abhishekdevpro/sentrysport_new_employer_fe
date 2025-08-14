import JobService from "@/store/slices/service/JobService";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import JobForm from "./JobForm";
import toast from "react-hot-toast";

export default function EditJob() {
  const { jobId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const data = await JobService.getJobById(jobId);
        setInitialValues({
          job_title: data.title,
          location: data.location,
          description: data.description,
          category_id: data.category_id,
          functional_area_id: data.functional_area_id,
          experience_year: data.experience_year,
          expected_experience_year: data.expected_experience_year,
          salary_type: data.salary_type,
          expected_salary_type: data.expected_salary_type,
          industry_id: data.industry_id,
          skills: data.skills?.split(",") || [],
        });
      } catch {
        toast.error("Failed to load job data");
      }
    }
    fetchJob();
  }, [jobId]);

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => formData.append(k, v));
      await JobService.updateJob(jobId, formData);
      toast.success("Job updated successfully!");
    } catch (error) {
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues.job_title) return <p>Loading...</p>;

  return <JobForm mode="edit" initialValues={initialValues} onSubmit={handleUpdate} loading={loading} />;
}
