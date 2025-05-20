
import JobList from "@/components/job-listing-pages/job-list-v14";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V14 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
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
