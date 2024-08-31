import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import { Switch } from "@/components/ui/switch";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const index = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Personal Details",
      component: <MyProfile onNext={() => setCurrentStep(1)} />,
    },

    {
      id: 2,
      title: "Company Details",
      component: <SocialNetworkBox onNext={() => setCurrentStep(2)} />,
    },
  ];
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
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile!!!!! " />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="w-full rounded-t-lg">
            <div className="flex justify-around">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative cursor-pointer py-2 w-full mx-2 text-center font-medium transition-colors duration-300 ${
                    currentStep === step.id
                      ? "text-blue-900 text-xs border rounded-3xl bg-white"
                      : "hover:bg-blue-300 hover:text-blue-800 bg-blue-800 text-xs text-white rounded-3xl"
                  }`}
                >
                  {step.title}
                  {index < steps.length - 1 && (
                    <span
                      className={`absolute top-1 -right-6 h-2 mt-2.5 w-[24px] border-y bg-blue-800 ${
                        currentStep === step.id ? "bg-white" : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 mt-2 ">
            <h4 className="text-lg ps-3 bg-blue-900 rounded-t-md w-full p-2 text-white">
              {steps[currentStep - 1].title}
            </h4>
            <div className="bg-white p-6 shadow-lg border-2 border-blue-900">
              <div className="flex justify-between items-center mb-4">
                {currentStep === 1 && (
                  <div className="flex items-center space-x-2">
                    <label htmlFor="visibility" className="font-bold">
                      Profile and CV Visibility
                    </label>
                    <Switch
                      id="visibility"
                      className="rounded-xl data-[state=checked]:bg-[#1502e6]"
                    />
                  </div>
                )}
              </div>
              {steps[currentStep - 1].component}
            </div>
          </div>

          {/* <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profilllle</h4>
                  </div>
                  <MyProfile />
                </div>
              </div> */}
          {/* <!-- Ls widget --> */}

          {/* <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Social Network</h4>
                  </div> */}
          {/* End .widget-title */}
          {/* <div className="widget-content">
                    <SocialNetworkBox />
                  </div>
                </div>
              </div> */}
          {/* <!-- Ls widget --> */}

          {/* <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Contact Information</h4>
                  </div> */}
          {/* End .widget-title */}

          {/* <div className="widget-content">
                    <ContactInfoBox />
                  </div> */}
          {/* </div>
              </div> */}
          {/* <!-- Ls widget --> */}
          {/* </div>
          </div> */}
          {/* End .row */}
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
