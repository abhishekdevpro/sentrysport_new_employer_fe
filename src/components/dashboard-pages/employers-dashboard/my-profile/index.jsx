import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components";

import MenuToggler from "../../MenuToggler";
import DashboardEmployeeHeader from "@/components/header/mobile-sidebar/DashBoardEmployeeHeader";

const MyProfileEmploeeDBPage = () => {
  return (
    <div className="page-wrapper dashboard app-gradient-bg">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <div className="hidden md:block">
        <DashboardEmployeeHeader />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard  ">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          {/* <MyProfile onNext={() => setCurrentStep(1)} />
           */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget app-light-bg">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>

                  <div className="widget-content ">
                    <MyProfile />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
  );
};

export default MyProfileEmploeeDBPage;
