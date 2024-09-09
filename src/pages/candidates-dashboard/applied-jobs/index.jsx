
import AppliedJobs from "@/components/dashboard-pages/candidates-dashboard/applied-jobs";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Applied Jobs || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const AppliedJobsPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <AppliedJobs />
    </>
  );
};

export default AppliedJobsPage
