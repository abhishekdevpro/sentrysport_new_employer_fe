import { Outlet } from "react-router-dom";
import DashboardHeader from "../header/DashboardHeader";
import Sidebar from "./Sidebar";

export default function SettingsLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar (Header) */}
      <div className="border-b border-gray-200 shadow-sm mb-20">
      <DashboardHeader  />
      </div>

      {/* Main Content: Sidebar + Outlet */}
      <div className="container w-full mx-auto">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block overflow-y-auto" />
        
        {/* Mobile sidebar toggle button would go here */}
        
        {/* Outlet (Main Content Area) */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
      </div>
    </div>
  );
}