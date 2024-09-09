
import JobList from "@/components/job-listing-pages/job-list-v14";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V14 || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const JobListPage14 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage14
