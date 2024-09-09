
import JobList from "@/components/job-listing-pages/job-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V3 || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const JobListPage3 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage3
