

import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Candidates List V2 || Sentryspot - Job Borad ReactJs Template',
  description:
    'Sentryspot - Job Borad ReactJs Template',
  
}


const CandidateListPage2 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
     
      <CandidatesList />
    </>
  );
};

export default CandidateListPage2
