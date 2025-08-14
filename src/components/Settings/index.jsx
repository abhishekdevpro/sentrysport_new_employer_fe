
import { Outlet } from "react-router-dom";
import DashboardEmployeeHeader from "../header/mobile-sidebar/DashBoardEmployeeHeader";
import Sidebar from "./Sidebar";

export default function SettingsLayout() {
  const headerHeight = 70; // Adjust if your header is taller

  return (
    <div className="flex flex-col justify-center items-center min-h-screen app-gradient-bg">
      {/* Fixed Navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow"
        style={{ height: headerHeight }}
      >
        {/* <DashboardEmployeeHeader /> */}
      </div>

      {/* Main Content */}
      <div
        className="flex flex-1 flex-col justify-center items-center w-full " // push content down equal to header height
        // style={{ minHeight: `calc(100vh - 80px)` }}
      >
        {/* Sidebar (desktop) */}
        <div className="hidden md:block w-auto app-light-bg border-r border-gray-200 shadow-sm overflow-y-auto mt-5 ">
          <Sidebar />
        </div>

        {/* Outlet */}
        <div className="flex-1 overflow-y-auto p-2">
         <div className="w-full max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
