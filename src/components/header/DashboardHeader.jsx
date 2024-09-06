import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import logo from "../../Images/logo.png";
import { useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);

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

  return (
    <header
      style={{ backgroundColor: "#4C3957" }}
      className={`main-header header-shadow z-10 ${navbar ? "fixed-header" : ""}`}
    >
      <div className="container-fluid">
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="me-10">
                <Link to="/">
                  <img alt="brand" src={logo} className="h-16  *: p-2" />
                </Link>
              </div>
            </div>

            <HeaderNavContent />

            <div className="outer-box">
              <button className="menu-btn">
                <span className="count">1</span>
                <span className="icon la la-heart-o"></span>
              </button>

              <button className="menu-btn">
                <span className="icon la la-bell"></span>
              </button>

              <div className="dropdown dashboard-option">
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    alt="avatar"
                    className="thumb"
                    src="/images/resource/company-6.png"
                  />
                  <span className="name text-white">My Account</span>
                </a>

                <ul className="dropdown-menu">
                  {employerMenuData.map((item) => (
                    <li
                      className={`${
                        isActiveLink(item.routePath, pathname)
                          ? "active bg-violet-300 rounded-lg"
                          : ""
                      } mb-1`}
                      key={item.id}
                    >
                      <Link to={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
