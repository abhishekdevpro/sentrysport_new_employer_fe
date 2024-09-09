

import Faq from "@/components/pages-menu/faq";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Faq || Abroadium - Job Borad ReactJs Template',
  description:
    'Abroadium - Job Borad ReactJs Template',
  
}



const FaqPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Faq />
    </>
  );
};

export default FaqPage
