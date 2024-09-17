import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import AlertDataTable from "./components/AlertDataTable";
import MenuToggler from "../../MenuToggler";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header"></span>
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
      <section className="user-dashboard bg-violet-50 ">
        <div className="dashboard-outer">
        {/*  <BreadCrumb title="Resume Alerts!" />
           breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col">
            <AlertDataTable />
              <div className="ls-widget">
                <div className="tabs-box">
                  
                  {/* End widget-title */}

                  <div className="widget-ontent">
                    <div className="table-">
                     
                    </div>
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
