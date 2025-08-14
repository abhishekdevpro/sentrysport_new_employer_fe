// import MobileMenu from "../../../header/MobileMenu";
// import DashboardHeader from "../../../header/DashboardHeader";
// import LoginPopup from "../../../common/form/login/LoginPopup";
// import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
// import BreadCrumb from "../../BreadCrumb";
// import CopyrightFooter from "../../CopyrightFooter";
// import MenuToggler from "../../MenuToggler";
// import SettingsLayout from "@/components/Settings";

// const SettingsPage = () => {
//   return (
//     <div className="page-wrapper dashboard app-gradient-bg">
//       <span className="header-span"></span>
//       {/* <!-- Header Span for hight --> */}

//       <LoginPopup />
//       {/* End Login Popup Modal */}

//       <DashboardHeader />
//       {/* End Header */}

//       <MobileMenu />
//       {/* End MobileMenu */}

//       <DashboardEmployerSidebar />
//       {/* <!-- End User Sidebar Menu --> */}

//       {/* <!-- Dashboard --> */}
//       <section className="user-dashboard ">
//         <div className="dashboard-outer">
//           <BreadCrumb title="Packages!" />
//           {/* breadCrumb */}

//           <MenuToggler />
//           {/* Collapsible sidebar button */}

//           <div className="row">
//             <div className="col-lg-12">
//               <div className="ls-widget app-light-bg">
//                 <div className="tabs-box">
//                   <div className="widget-title">
//                     <h4>My Packages</h4>
//                   </div>
//                   {/* End widget-title */}

//                   <div className="widget-content">
//                      <SettingsLayout />
//                   </div>
//                   {/* End widget-content */}
//                 </div>
//               </div>
//               {/* <!-- Ls widget --> */}
//             </div>
//           </div>
//           {/* End .row */}
//         </div>
//         {/* End dashboard-outer */}
//       </section>
//       {/* <!-- End Dashboard --> */}

//       <CopyrightFooter />
//       {/* <!-- End Copyright --> */}
//     </div>
//     // End page-wrapper
//   );
// };

// export default SettingsPage;


// import React, { useState, useEffect } from "react";
// import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
// import DashboardCandidatesSidebar from "@/components/header/DashboardCandidatesSidebar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";
// import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
// import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
// import MenuToggler from "@/components/dashboard-pages/MenuToggler";
// import Account from "@/components/Settings/Account";
// import Subscription from "@/components/Settings/Subscribtion";
// import DashboardEmployeeHeader from "@/components/header/mobile-sidebar/DashBoardEmployeeHeader";
// import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";

// const SettingsPage = () => {
//   const [selectedTab, setSelectedTab] = useState("notification");
//   const navigate = useNavigate();
//   const [emailNotif, setEmailNotif] = useState(true);
//   const [smsNotif, setSmsNotif] = useState(true);
//   const [marketingNotif, setMarketingNotif] = useState(true);
//   const [account, setAccount] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notificationLoading, setNotificationLoading] = useState(false);
//   const { userInfo } = useSelector((state) => state.auth);

 


//   // 💡 This handles state-based updates
 
//   return (
//     <div className="page-wrapper dashboard min-h-screen app-gradient-bg ">
//       <DashboardEmployeeHeader />
//       <DashboardEmployerSidebar />
//       {/* <BreadCrumb title="Account Settings" className="mb-2" /> */}
//       <section className="user-dashboard">
//         <div className="dashboard-outer">
//           <BreadCrumb title="Account Settings" />
//           <MenuToggler />
//           <div className=" mb-4 px-2 md:px-0 flex justify-center">
//             <div className="w-full mx-auto flex flex-col  gap-4 md:gap-8">
       
//               <div className="w-full ">
//                 <div className="bg-blue-900 rounded-xl shadow p-0.5 flex justify-center gap-4 overflow-x-auto scrollbar-hide">
//                   {["account", "subscription"].map((tab) => (
//                     <button
//                       key={tab}
//                       className={`flex-shrink-0 text-left px-4 py-2 rounded-lg font-medium mb-1 transition-colors ${
//                         selectedTab === tab
//                           ? "app-light-bg text-blue-900"
//                           : "hover:bg-blue-800 text-white"
//                       }`}
//                       onClick={() => setSelectedTab(tab)}
//                     >
//                       {tab === "account" && "Account"}
//                       {tab === "notification" && "Notification"}
//                       {tab === "subscription" && "Subscription"}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Main Content */}
//               <div className="flex-1">
//                 <div className="app-light-bg rounded-xl shadow p-2 md:p-6 min-w-[280px]">
//                   {/* {selectedTab === "notification" && (
//                     <>
//                       <h2 className="text-xl font-bold mb-4 text-blue-900">
//                         Notifications
//                       </h2>
//                       {notificationLoading ? (
//                         <div className="text-gray-500 p-6">Loading...</div>
//                       ) : (
//                         <div>
//                           <div className="mb-4">
//                             <div className="font-semibold">
//                               Product Notifications
//                             </div>
//                             <div className="text-sm text-gray-600 mb-3">
//                               Get updates about job matches, applications, and
//                               new features.
//                             </div>

//                             {/* Email toggle
//                             <div className="flex items-center gap-3 mb-2">
//                               <button
//                                 type="button"
//                                 onClick={() => handleToggleChange("email")}
//                                 className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-200 ${
//                                   emailNotif ? "bg-blue-900" : "bg-gray-300"
//                                 }`}
//                               >
//                                 <span
//                                   className={`w-4 h-4 app-light-bg rounded-full shadow transform transition-transform duration-200 ${
//                                     emailNotif ? "translate-x-4" : ""
//                                   }`}
//                                 ></span>
//                               </button>
//                               <span className="text-blue-900 text-sm">
//                                 Email Notifications
//                               </span>
//                             </div>

//                             {/* SMS toggle 
//                             <div className="flex items-center gap-3 mb-2">
//                               <button
//                                 type="button"
//                                 onClick={() => handleToggleChange("sms")}
//                                 className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-200 ${
//                                   smsNotif ? "bg-blue-900" : "bg-gray-300"
//                                 }`}
//                               >
//                                 <span
//                                   className={`w-4 h-4 app-light-bg rounded-full shadow transform transition-transform duration-200 ${
//                                     smsNotif ? "translate-x-4" : ""
//                                   }`}
//                                 ></span>
//                               </button>
//                               <span className="text-blue-900 text-sm">
//                                 SMS Notifications
//                               </span>
//                             </div>
//                           </div>

//                           {/* Marketing notifications (disabled) 
//                           <div className="mt-6">
//                             <div className="font-semibold">
//                               Marketing Notifications
//                             </div>
//                             <div className="flex items-center gap-3 mt-2">
//                               <button
//                                 type="button"
//                                 className="w-10 h-6 flex items-center rounded-full p-1 bg-gray-300 cursor-not-allowed"
//                                 disabled
//                               >
//                                 <span className="w-4 h-4 app-light-bg rounded-full shadow"></span>
//                               </button>
//                               <span className="text-sm text-blue-900">
//                                 I am open to receive marketing communications.
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   )} */}
//                   {selectedTab === "account" && (
//                     // <>
//                     //   <h2 className="text-xl font-semibold mb-4">Account</h2>
//                     //   {loading ? (
//                     //     <div className="text-gray-500 p-6">Loading...</div>
//                     //   ) : error ? (
//                     //     <div className="text-red-500 p-6">{error}</div>
//                     //   ) : account ? (
//                     //     <div className="border rounded-lg overflow-hidden">
//                     //       <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 text-gray-500 text-sm font-medium">
//                     //         <div className="p-3">Account ID</div>
//                     //         <div className="p-3 md:col-span-2">
//                     //           {userInfo.job_seeker_uuid || "N/A"}
//                     //         </div>
//                     //       </div>
//                     //       <div className="grid grid-cols-1 md:grid-cols-3 border-t text-sm">
//                     //         <div className="p-3 text-gray-500 font-medium">
//                     //           Email Address
//                     //         </div>
//                     //         <div className="p-3 md:col-span-2">
//                     //           {userInfo.email || "N/A"}
//                     //         </div>
//                     //       </div>
//                     //       <div className="grid grid-cols-1 md:grid-cols-3 border-t text-sm">
//                     //         <div className="p-3 text-gray-500 font-medium">
//                     //           Name
//                     //         </div>
//                     //         <div className="p-3 md:col-span-2">
//                     //           {`${userInfo.first_name || ""} ${
//                     //             userInfo.last_name || ""
//                     //           }`.trim() || "N/A"}
//                     //         </div>
//                     //       </div>
//                     //     </div>
//                     //   ) : (
//                     //     <div className="text-gray-500 p-6">
//                     //       No account data found.
//                     //     </div>
//                     //   )}
//                     // </>
//                     <Account />
//                   )}
//                   {selectedTab === "subscription" && <Subscription />}

//                   {/* Add your Account and Subscription tabs below if needed */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SettingsPage;


import React, { useState } from "react";
import DashboardEmployeeHeader from "@/components/header/mobile-sidebar/DashBoardEmployeeHeader";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import Account from "@/components/Settings/Account";
import Subscription from "@/components/Settings/Subscribtion";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <div className="page-wrapper dashboard min-h-screen app-gradient-bg">
      {/* Fixed Header */}
     <div className="hidden md:block">
        <DashboardEmployeeHeader />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* Sidebar */}
      <DashboardEmployerSidebar />

      <section className="user-dashboard pt-[80px]"> {/* padding so content doesn't hide behind header */}
        <div className="dashboard-outer">
          <BreadCrumb title="Account Settings" />
          <MenuToggler />

          {/* Tab Buttons */}
          <div className="mb-4 md:px-0 flex justify-center">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
              <div className="w-full">
                <div className="bg-blue-900 rounded-xl shadow p-0.5 flex justify-center gap-4 overflow-x-auto scrollbar-hide">
                  {["account", "subscription"].map((tab) => (
                    <button
                      key={tab}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedTab === tab
                          ? "app-light-bg text-blue-900"
                          : "hover:bg-blue-800 text-white"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab === "account" && "Account"}
                      {tab === "subscription" && "Subscription"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="app-light-bg rounded-xl shadow p-2 md:p-6 min-w-[280px] w-full max-w-5xl mx-auto">
                  {selectedTab === "account" && <Account />}
                  {selectedTab === "subscription" && <Subscription />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
