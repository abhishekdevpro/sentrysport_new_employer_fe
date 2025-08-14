import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import logo from "../../../public/company_logo.png";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { Bell, Building, Folder, User } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";

const DashboardEmployeeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#user-dropdown-mobile")) {
        setIsOpen(false);
      }
      if (!event.target.closest("#notification-dropdown")) {
        setIsNotificationModalOpen(false);
      }
      if (!event.target.closest("#user-dropdown-desktop")) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Navbar background change on scroll
  const changeBackground = () => {
    setNavbar(window.scrollY >= 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    fetchNotifications();
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/employer/notifications"
      );
      if (response.data.status === "success" || response.data.code === 200) {
        setNotifications(response.data.data || []);
        setNotificationCount(response.data.data?.length || 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className={`main-header header-shadow ${navbar ? "fixed-header" : ""}`}>
      <div className="header app-light-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo and Navigation */}
            <div className="header-logo flex items-center">
              <Link to={"/"}>
                <img src="https://htmlsentryspot.vercel.app/img/company_logo.png" alt="Company Logo" className="h-10 w-auto" />
              </Link>
              <div className="ms-4 hidden md:flex">
                <ul className="flex space-x-4">
                  <li>
                    <Link to="/employers-dashboard/post-jobs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link to="/showcase/org" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
                      view
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side Menu */}
            <div className="side-menu flex items-center">
              {/* Notifications Dropdown */}
              <div id="notification-dropdown" className="relative">
                <div className="icon la la-bell hidden md:block text-3xl text-blue-900 cursor-pointer"
                  onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}>
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </div>
                {isNotificationModalOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 px-4 py-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Recent Notifications
                    </h3>
                    {notifications.length > 0 ? (
                      <ul className="space-y-3">
                        {notifications.slice(0, 5).map((notification, index) => (
                          <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer">
                            <div className="text-blue-600 flex-shrink-0">
                              <Bell className="h-6 w-6" />
                            </div>
                            <div className="flex-grow">
                              <div className="text-sm text-start font-medium text-gray-700">
                                {notification.message}
                              </div>
                              <div className="text-xs text-start text-gray-500 mt-1">
                                {formatDate(notification.created_at)}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 text-center">
                        No recent notifications
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Messages Link */}
              <Link to="/employers-dashboard/messages">
                <i className="las la-comment hidden md:block text-3xl mx-4 text-blue-900"></i>
              </Link>

              {/* Desktop User Dropdown */}
              <div id="user-dropdown-desktop" className="hidden md:block relative me-4">
                <Button
                variant="default"
                  // className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none transition duration-200"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <User size={20} className="mr-2" />
                  {userInfo?.company_name || userInfo?.first_name || "User"}
                </Button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 text-left">
                    <div className="px-4 pt-4 pb-2 border-b border-gray-100">
                      <div className="text-sm text-gray-600">
                        Current Plan: <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">
                          Free
                        </span>
                      </div>
                    </div>
                    <ul className="py-2 text-base text-gray-700">
                      <li>
                        <Link to="/employers-dashboard/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100">
                         <User size={20} className="mr-2" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/employers-dashboard/company-profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <Building size={20} className="mr-2" />
                          Company Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/employers-dashboard/post-jobs" className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <Folder size={20} className="mr-2" />
                          Post a Job
                        </Link>
                      </li>
                      <li>
                        <Button
                          variant="destructive"
                          // className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                          
                          onClick={logoutHandler}
                          className="w-full px-3"
                        >
                          <span className="mr-2">
                            <IoLogOutOutline size={20} />
                          </span>
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <div id="user-dropdown-mobile" className="md:hidden">
                <i
                  className="las la-user text-3xl text-blue-900 me-3 flex items-center focus:outline-none cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                ></i>
                {isOpen && (
                  <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link to="/employers-dashboard" className="block px-4 py-2 hover:bg-gray-100">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/post-jobs" className="block px-4 py-2 hover:bg-gray-100">
                          Post a Job
                        </Link>
                      </li>
                      <li>
                        <Link to="/employers-dashboard/company-profile" className="block px-4 py-2 hover:bg-gray-100">
                          Company Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/employers-dashboard/manage-jobs" className="block px-4 py-2 hover:bg-gray-100">
                          Manage Jobs
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <div className="btn-box">
                {userToken ? (
                  <Button
                  variant="destructive"
                    // className="bg-gray-500 p-2 duration-500 hover:bg-red-600 flex items-center"
                    onClick={logoutHandler}
                    className="p-2"
                  >
                    <IoLogOutOutline size={24}  />
                  </Button>
                ) : (
                  <Link to="/login" className="text-gray-700 hover:text-blue-600">
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardEmployeeHeader;