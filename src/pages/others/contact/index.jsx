

import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Contact || Abroadium - Job Borad ReactJs Template',
  description:
    'Abroadium - Job Borad ReactJs Template',
  
}



const ContactPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Contact />
    </>
  );
};

export default ContactPage
