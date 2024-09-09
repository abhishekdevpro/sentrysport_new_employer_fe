
import Seo from "../../../components/common/Seo";
import AllApplicants from "../../../components/dashboard-pages/employers-dashboard/all-applicants";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'All Applicants || Abroadium - Job Borad ReactJs Template',
  description:
    'Abroadium - Job Borad ReactJs Template',
  
}



const AllApplicantsCandidatesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />

      <AllApplicants />
    </>
  );
};

export default AllApplicantsCandidatesPage
