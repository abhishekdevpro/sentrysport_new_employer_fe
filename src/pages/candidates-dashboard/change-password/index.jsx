
import ChangePassword from "@/components/dashboard-pages/candidates-dashboard/change-password";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Change Password || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const ChangePasswordPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordPage
