
import EmployersList from "@/components/employers-listing-pages/employers-list-v2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V2 || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const EmployerListPage2 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage2
