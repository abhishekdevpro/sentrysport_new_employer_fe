
import MyResume from "@/components/dashboard-pages/candidates-dashboard/my-resume";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Resume || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const MyResumePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyResume />
    </>
  );
};

export default MyResumePage
