import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Bell, CreditCard, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "flex items-center p-2 bg-blue-900 text-white font-semibold rounded-lg"
      : "flex items-center p-2 hover:bg-blue-900 hover:text-white text-gray-800 rounded-lg";
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-[5rem] left-4 z-50 bg-blue-900 text-white p-2 rounded-full"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white p-4 shadow-md border-r transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600"
          onClick={toggleSidebar}
        >
          <X size={24} />
        </button>

        {/* Sidebar Links */}
        <ul className="space-y-4 mt-6">
          <li>
            <Link to="/settings/account" className={getLinkClassName("/settings/account")} onClick={toggleSidebar}>
              <User className="mr-2" size={20} />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <Link to="/settings/notification" className={getLinkClassName("/settings/notification")} onClick={toggleSidebar}>
              <Bell className="mr-2" size={20} />
              <span>Notification</span>
            </Link>
          </li>
          <li>
            <Link to="/settings/subscription" className={getLinkClassName("/settings/subscription")} onClick={toggleSidebar}>
              <CreditCard className="mr-2" size={20} />
              <span>Subscription</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
