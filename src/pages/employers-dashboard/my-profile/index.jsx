import SocialNetworkBox from "@/components/dashboard-pages/employers-dashboard/my-profile/index";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const MyProfileEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <CompanyProfile /> */}
      <SocialNetworkBox />
    </>
  );
};

export default MyProfileEmploeeDBPage;