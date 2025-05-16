
import CvManager from "@/components/dashboard-pages/candidates-dashboard/cv-manager";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "CV Manager || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const CVMannagerPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <CvManager />
    </>
  );
};

export default CVMannagerPage
