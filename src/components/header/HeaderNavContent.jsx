import React, { useState } from "react";
import SearchResumePopup from "./SearchResumePopup";
import { Link, useLocation } from "react-router-dom";
import { isActiveParent } from "../../utils/linkActiveChecker";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";

const HeaderNavContent = () => {
  const { pathname } = useLocation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };
  const handleSearchClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <nav className="nav main-menu " >
        <ul className="navigation" id="navbar">
          <li className="text-blue-900">
            <Link to="/employers-dashboard/dashboard" className="text-blue-900 p-0">Dashboard</Link>
          </li>
          <li
            className={`${
              isActiveParent(employerItems, pathname) || pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span className="text-blue-900">Jobs</span>
            <ul>
              <li className={pathname?.includes("/employers-dashboard") ? "current" : ""}>
                <Link to="/employers-list-v2">My Job</Link>
              </li>
              <li className={pathname?.includes("/employers-dashboard") ? "current" : ""}>
                <Link to="/employers-dashboard/post-jobs">Post Job</Link>
              </li>
              <li className={pathname?.includes("/employers-dashboard") ? "current" : ""}>
                <Link to="/employers-list-v3">Tagged Candidates</Link>
              </li>
              <li className={pathname?.includes("/employers-dashboard") ? "current" : ""}>
                <Link to="/employers-list-v1">Shortlisted/Saved Candidates</Link>
              </li>
            </ul>
          </li>
          <li className="text-blue-900">
            <button onClick={handleSearchClick} className="text-blue-900 font-semibold">Search Resume</button>
          </li>
          
          <li
            className={`${
              isActiveParent(candidateItems, pathname) ||
              pathname?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
                ? "current"
                : ""
            } dropdown`}
          >
            <Link className="text-blue-900" to="/showcase/org">View</Link>
            </li>
          <li className="border h-[80%] p-0 m-0"></li>
          <li className="hover:bg-slate-200  rounded-md ml-2">
            <Link to="/employers-dashboard/post-jobs" className="text-blue-900">
              <span className="font-light text-blue-900"> </span> Post a job
            </Link>
          </li>
          <li className="text-blue-900">
            <button onClick={handleDropdownToggle} className="text-blue-900 font-semibold">Contact Us</button>
          </li>
        </ul>
      </nav>

      {isPopupOpen && <SearchResumePopup onClose={closePopup} />}
      {dropdownOpen && (
                  <div className="absolute top-12 right-40 mt-2 w-62 bg-white shadow-lg rounded-lg  z-50">
                    <div className="px-4 pb-2 pt-2 bg-blue-900 rounded-t-lg border-b border-gray-200">
                      <p className="font-bold text-blue-900">Connect with our Sales Team</p>
                     
                    </div>
                    
                    

                    <div className="px-4 ">


                      <p className="text-lg text-gray-700 mt-2 font-semibold">Sales Enquiries</p>
                      <p className="text-sm text-gray-700 my-2">1000-100-7044
                        </p>
                      <p className="text-sm text-gray-700">sales@Sentryspot.tech</p>
                    </div>

                    <div className="px-4 py-3">


<p className="text-lg text-gray-700 mt-2 font-semibold">Customer Support</p>
<p className="text-sm text-gray-700 mt-2">sales@Sentryspot.tech</p>
</div>
                  </div>
                )}
    </>
  );
};

export default HeaderNavContent;
