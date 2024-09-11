import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import logo from "../../Images/logo.png";
import { useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground); // Cleanup listener
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header
      style={{ backgroundColor: "#4C3957" }}
      className={`main-header header-shadow z-10 ${navbar ? "fixed-header" : ""}`}
    >
      <div className="container-fluid">
        <div className="main-box ">
          <div className="nav-outer ">
            <div className="logo-box">
              <div className="me-10">
                <Link to="/">
                  <img alt="brand" src={logo} className="h-16 p-2" />
                </Link>
              </div>
            </div>

            <HeaderNavContent />

            <div className="outer-box float-end ">
              <button className="menu-btn">
                <span className="count">1</span>
                <span className="icon la la-heart-o"></span>
              </button>

              <button className="menu-btn mx-3">
                <span className="icon la la-bell"></span>
              </button>

              {/* Dropdown for Account */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-white"
                  onClick={handleDropdownToggle}
                >
                  <img
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                    src="/images/resource/company-6.png"
                  />
             
                  <i className={`la la-angle-down ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg  z-50">
                    <div className="px-4 pb-4 pt-2 bg-purple-700 rounded-t-lg">
                      <p className="font-bold text-white">User</p>
                      <p className="text-sm text-white">User@cUser.com</p>
                      <Link to="/public-profile" className="text-white text-sm hover:underline">
                        View Public Profile
                      </Link>
                    </div>
                    
                    <div className="px-3 flex justify-between py-1 text-white bg-violet-900">
                      <p className="text-xs text-white">Viewed: 0 times</p>
                      <p className="text-xs text-white">Last Login: Sep 9, 2024</p>
                    </div>

                    <div className="px-2 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-700 mt-2">Basic Postings: Unlimited</p>
                      <p className="text-sm text-gray-700 my-2">Premium Postings: 0 Credits    <Link to="/buy-credits" className="text-indigo-600 text-xs border-1 p-0.5 rounded-sm border-blue-600 hover:underline">
                        Buy Credits
                      </Link></p>
                      <p className="text-sm text-gray-700">Global Postings: 0 Credits</p>
                    </div>


                    <div className="px-4 py-2">
                      <Link to="/account-settings" className="block text-sm text-gray-800 hover:bg-gray-100 py-2 rounded-lg">
                        Account Settings
                      </Link>
                      <button
                        onClick={() => {
                          // Add your logout logic here
                        }}
                        className="block w-full text-left text-sm text-gray-800 hover:bg-gray-100 py-2 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
