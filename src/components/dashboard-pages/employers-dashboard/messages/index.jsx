

import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import ChatBox from "./components";
import MenuToggler from "../../MenuToggler";
import { useSelector } from "react-redux";
import DashboardEmployeeHeader from "@/components/header/mobile-sidebar/DashBoardEmployeeHeader";

const Index = () => {
  const { chatSidebar } = useSelector((state) => state.toggle);
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
      <section className="user-dashboard ">
        <div className="dashboard-outer">
          <BreadCrumb title="Messages!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div
              className={`col-lg-12 ${
                chatSidebar ? "active-chat-contacts" : ""
              }`}
            >
              <div className="chat-widget app-light-bg">
                <div className="widget-content">
                  <ChatBox />
                </div>
              </div>
              {/* <!-- Chat Widget --> */}
            </div>
          </div>
          {/* End row */}
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

export default Index;
