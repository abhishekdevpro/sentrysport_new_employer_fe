import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import PostJobSteps from "./components/PostJobSteps";
import PostBoxForm from "./components/PostBoxForm";
import MenuToggler from "../../MenuToggler";
import DashboardEmployeeHeader from "@/components/header/mobile-sidebar/DashBoardEmployeeHeader";
import { useParams } from "react-router-dom";
import CreateJob from "./components/JobForm/CreateJob";
import EditJob from "./components/JobForm/EditJob";

const index = () => {
  const {id} = useParams()
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
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard ">
        <div className="dashboard-outer">
          <BreadCrumb  title={id ? "Edit Your Job!"  : "Post a New Job!"} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget app-light-bg">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4 className="app-text-h2 !text-blue-900">{id? "Edit Job" : "Post Job"}</h4>
                  </div>

                  <div className="widget-content ">
                    {/* <PostJobSteps /> */}
                    {/* End job steps form */}
                    {/* <PostBoxForm /> */}
                    {id ? <EditJob /> : <CreateJob />}
                    {/* End post box form */}
                  </div>
                </div>
              </div>
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
