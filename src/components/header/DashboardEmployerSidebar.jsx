import { Link } from "react-router-dom";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "@/store/slices/auth";

const DashboardEmployerSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);

  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`} >
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => (
            <li
              className={`${ 
                isActiveLink(item.routePath, pathname) ? "active bg-purple-200 text-white rounded-lg" : ""
              } mb-1`}
              key={item.id}
              onClick={menuToggleHandler}
            >
              {item?.name == "Logout" ? (
                <Button
                  title="logout"
                  className="bg-transparent default_Black_Text px-4 w-full  text-md flex  justify-start  outline-none"
                  onClick={() => {
                    console.log("logout");
                    dispatch(logout());
                  }}
                >
                  {" "}
                  <AiOutlineLogout className=" pr-2 text-3xl mr-2" /> Logout{" "}
                </Button>
              ) : (
                <Link to={item.routePath}>
                  <i className={` default_Black_Text la ${item.icon}`}></i>{" "}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
