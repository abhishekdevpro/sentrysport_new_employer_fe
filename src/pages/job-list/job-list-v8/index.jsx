
import JobList from "@/components/job-listing-pages/job-list-v8";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V8 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const JobListPage8 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage8
