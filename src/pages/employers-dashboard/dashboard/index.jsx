
import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employeers Dashboard || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const DashboardEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardEmploeeDBPage
