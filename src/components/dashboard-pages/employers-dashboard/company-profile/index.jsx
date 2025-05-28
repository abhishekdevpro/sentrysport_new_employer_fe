
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import SocialNetworkBox from "./components/SocialNetworkBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard bg-blue-50">
        <div className="dashboard-outer">
          <BreadCrumb title="Company Profile" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}
          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              {/* <div className="ls-widget"> */}
                {/* <div className="tabs-box"> */}
                  {/* <div className="widget-title">
                    <h4>Company Profileeee</h4>
                  </div> */}

                  <div className="widget-content">
                    <SocialNetworkBox />
                  </div>
                {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
  );
};

export default index;
