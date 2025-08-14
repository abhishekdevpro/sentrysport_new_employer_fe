import { Link, useNavigate } from "react-router-dom";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "@/store/slices/auth";
import { Constant } from "@/utils/constant/constant";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const DashboardEmployerSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // Menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Logout handler
  const logoutHandler = () => {
    // localStorage.removeItem(Constant.USER_INFO);
    dispatch(logout());
    navigate("/");
    // window.location.href = "/login";
  };

  // const user = JSON.parse(localStorage.getItem(Constant.USER_INFO));
  // console.log(userInfo,"userInfo");
  return (
    <div
      className={`user-sidebar ${menu ? "sidebar_open" : ""} app-light-bg `}
      style={{
        top: "calc(70px)",
      }}
      // style={{ minHeight: `calc(100vh - 100px)` }}
    >
      {/* Sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        <div className="app-gradient-bg flex flex-col gap-2 justify-center items-center p-2 border border-gray-200 mb-2 rounded-lg app-light-bg text-black ">
          <div className="w-auto">
            <img
              src={
                userInfo?.photo
                  ? `https://api.sentryspot.co.uk${userInfo?.photo}`
                  : "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
              }
              alt="User Avatar"
              className="rounded-full w-20 h-20 object-cover"
            />
          </div>
          <div className=" flex-col justify-center items-center gap-2">
            <p className="app-text-p text-center">{userInfo?.first_name} </p>
            <p className="app-text-p text-center">
              {userInfo?.job_title || "Employer"}
            </p>
            <Button
              onClick={() => navigate("/showcase/org")}
              className="w-full w-100"
              variant="link"
            >
              view{" "}
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="navigation space-y-2">
          {employerMenuData.map((item) => (
            <li
              key={item.id}
              className={`font-bold ${
                isActiveLink(item.routePath, pathname) ? "active" : ""
              }`}
              onClick={menuToggleHandler}
            >
              <Link
                to={item.routePath}
                className="flex items-center px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <i className={`la ${item.icon} mr-3`}></i> {item.name}
              </Link>
            </li>
          ))}

          {/* Divider */}
          <div className="my-4 border-t border-gray-200"></div>

          {/* Contact Us Button */}
          <li>
            <button
              className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() =>
                (window.location.href =
                  "mailto:jobseeker@sentryspot.co.uk?subject=Job%20Inquiry&body=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20this%20job%20opportunity.")
              }
            >
              Contact Us
            </button>
          </li>

          {/* Logout Button */}
          <li>
            <button
              className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
