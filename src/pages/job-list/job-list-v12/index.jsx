
import JobList from "@/components/job-listing-pages/job-list-v12";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V12 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const JobListPage12 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage12
