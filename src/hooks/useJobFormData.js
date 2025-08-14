// hooks/useJobFormData.js
import JobService from "@/store/slices/service/JobService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useJobFormData() {
  const [experienceYears, setExperienceYears] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  // salaryTypes, jobTypes come from redux
  const { salaryTypes, jobTypes } = useSelector((state) => state.data);

  useEffect(() => {
    async function load() {
      const [exp, ind, fa, jc] = await Promise.all([
        JobService.getExperienceLevels(),
        JobService.getIndustries(),
        JobService.getFunctionalAreas(),
        JobService.getJobCategories(),
      ]);
      setExperienceYears(exp);
      setIndustries(ind);
      setFunctionalAreas(fa);
      setJobCategories(jc);
    }
    load();
  }, []);

  return { experienceYears, industries, functionalAreas, jobCategories, salaryTypes, jobTypes };
}
