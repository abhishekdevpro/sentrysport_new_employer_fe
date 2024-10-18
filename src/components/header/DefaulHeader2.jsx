import { IoLogOutOutline } from "react-icons/io5";

import logo from "../../Images/logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSignupDialog } from "@/store/slices/auth";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleCheck = (type) => {
    switch (type) {
      case "job-post":
        if (!userToken) dispatch(toggleSignupDialog());
        else navigate("/employers-dashboard/post-jobs");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header style={{backgroundColor:"#224194"}}
      className={`main-header font-bold border z-10 ${
        navbar ? "fixed-header animated slideInDown   " : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box ">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="me-10">
              <Link to="/">
                <img
                  alt="brand"
                  src={logo}
                  className="h-16 p-2 "
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          {/* <Link
            to="/candidates-dashboard/cv-manager"
            className="upload-cv text-blue-950"
          >
            Upload your CV
          </Link> */}
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            {userToken ? (
              <Button
                className="bg-gray-500 p-3 ml-2 duration-500 hover:bg-[#E60278]"
                title="logout"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <IoLogOutOutline size={24} className="" />
              </Button>
            ) : (
              <button
                className="theme-btn btn-style-three call-modal p-2 text-blue-950 text-lg px-3 font-light"
                onClick={() => {
                  dispatch(toggleSignupDialog());
                }}
              >
                Sign Up
              </button>
            )}
            <button
              className="theme-btn btn-style-one bg-blue-950 text-white ml-4"
              onClick={() => {
                handleCheck("job-post");
              }}
            >
              Job Post
            </button>
            {/* <Link
              to="/employers-dashboard/post-jobs"
              className="theme-btn btn-style-one bg-blue-950 text-white"
            >
              Job Post
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
