
import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Profile || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const MyProfilePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyProfile />
    </>
  );
};

export default MyProfilePage
