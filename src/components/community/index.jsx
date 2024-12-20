
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import FeedSection from "./FeedSection";
import LoginPopup from "../common/form/login/LoginPopup";
import CopyrightFooter from "../dashboard-pages/CopyrightFooter";
import FilterSidebar from "./FilterSidebar";
import FilterleftSidebar from "./FilterleftSidebar";
import DashboardHeader from "../header/DashboardHeader";
import MobileMenu from "../header/MobileMenu";
const Index = () => {

  return (
    <>
      <LoginPopup />
      <DashboardHeader />
      {/* End Header */}
      <MobileMenu />
      <section className="ls-section bg-stone-200">
        <div className="auto-container py-8">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>

            <div className="filters-column hidden-1023 w-1/5 col-md-8 col-sm-8 ms-20">
              <FilterSidebar />
            </div>

                       <FeedSection />
            <div className="filters-column hidden-1023 w-1/4 col-md-8 col-sm-8">
              <FilterleftSidebar />
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </>
  );
};

export default Index;
