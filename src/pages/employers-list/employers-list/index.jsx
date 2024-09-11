
import EmployersList from "@/components/employers-listing-pages/employers-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V2 || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const EmployerList = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerList
