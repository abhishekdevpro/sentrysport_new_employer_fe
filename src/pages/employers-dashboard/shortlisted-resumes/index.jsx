
import ShortlistedResumes from "@/components/dashboard-pages/employers-dashboard/shortlisted-resumes";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shortlisted Resumes || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const ShortListedResumeEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShortlistedResumes />
    </>
  );
};

export default ShortListedResumeEmploeeDBPage
