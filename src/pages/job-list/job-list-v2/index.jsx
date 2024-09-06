
import JobList from "@/components/job-listing-pages/job-list-v2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V2 || Abrodium - Job Borad ReactJs Template",
  description: "Abrodium - Job Borad ReactJs Template",
};

const JobListPage2 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage2
