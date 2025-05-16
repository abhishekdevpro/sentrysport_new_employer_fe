
import JobList from "@/components/job-listing-pages/job-list-v13";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V13 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const JobListPage13 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage13
