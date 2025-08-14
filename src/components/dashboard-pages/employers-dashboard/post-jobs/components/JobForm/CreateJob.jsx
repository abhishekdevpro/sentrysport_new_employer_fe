import { toast } from "react-toastify";
import { useState } from "react";
import JobService from "@/store/slices/service/JobService";
import JobForm from "./JobForm";

export default function CreateJob() {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => formData.append(k, v));
      await JobService.createJob(formData);
      toast.success("Job posted successfully!");
    } catch (error) {
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return <JobForm mode="create" onSubmit={handleCreate} loading={loading} />;
}
