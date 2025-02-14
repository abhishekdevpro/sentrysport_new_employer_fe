import { Link } from "react-router-dom";
import MobileSidebar from "./mobile-sidebar";
// import logo from "../../Images/image.png";
import logo from "../../Images/image.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSignupDialog } from "@/store/slices/auth";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );
  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile z-10"  >
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box border-white border-2">
              <div className="me-10">
                <Link to="/">
                  <img alt="brand" src={logo} className="h-14 w-28" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="login-box">
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
            </div>
            {/* login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
