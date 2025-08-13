// import { IoLogOutOutline } from "react-icons/io5";

// import logo from "../../Images/image.png";

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderNavContent from "./HeaderNavContent";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, toggleSignupDialog } from "@/store/slices/auth";

// const DefaulHeader2 = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, userInfo, userToken, error, success, message } = useSelector(
//     (state) => state.auth
//   );
//   const [navbar, setNavbar] = useState(false);

//   const changeBackground = () => {
//     if (window.scrollY >= 10) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   const handleCheck = (type) => {
//     switch (type) {
//       case "job-post":
//         if (!userToken) dispatch(toggleSignupDialog());
//         else navigate("/employers-dashboard/post-jobs");
//         break;

//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", changeBackground);
//   }, []);

//   return (
//     // <!-- Main Header-->
//     <header 
//       className={`main-header font-bold border z-10 ${
//         navbar ? "fixed-header animated slideInDown   " : ""
//       }`}
//     >
//       {/* <!-- Main box --> */}
//       <div className="main-box ">
//         {/* <!--Nav Outer --> */}
//         <div className="nav-outer">
//           <div className="logo-box">
//             <div className="me-10">
//               <Link to="/">
//                 <img
//                   alt="brand"
//                   src={logo}
//                   className="h-16 p-2 "
//                 />
//               </Link>
//             </div>
//           </div>
//           {/* End .logo-box */}

//           <HeaderNavContent />
//           {/* <!-- Main Menu End--> */}
//         </div>
//         {/* End .nav-outer */}

//         <div className="outer-box">
//           {/* <!-- Add Listing --> */}
//           {/* <Link
//             to="/candidates-dashboard/cv-manager"
//             className="upload-cv text-blue-950"
//           >
//             Upload your CV
//           </Link> */}
//           {/* <!-- Login/Register --> */}
//           <div className="btn-box">
//             {userToken ? (
//               <Button
//                 className="bg-gray-500 p-3 ml-2 duration-500 hover:bg-[#E60278]"
//                 title="logout"
//                 onClick={() => {
//                   dispatch(logout());
//                 }}
//               >
//                 <IoLogOutOutline size={24} className="" />
//               </Button>
//             ) : (
//               <button
//                 className="theme-btn btn-style-three call-modal p-2 text-blue-950 text-lg px-3 font-light"
//                 onClick={() => {
//                   dispatch(toggleSignupDialog());
//                 }}
//               >
//                 Sign Up
//               </button>
//             )}
//             <button
//               className="theme-btn btn-style-one bg-blue-950 text-white ml-4"
//               onClick={() => {
//                 handleCheck("job-post");
//               }}
//             >
//               Job Post
//             </button>
//             {/* <Link
//               to="/employers-dashboard/post-jobs"
//               className="theme-btn btn-style-one bg-blue-950 text-white"
//             >
//               Job Post
//             </Link> */}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DefaulHeader2;
// import { IoLogOutOutline } from "react-icons/io5";
// import logo from "../../Images/image.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderNavContent from "./HeaderNavContent";
// // import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// // import { logout, toggleSignupDialog } from "@/store/slices/authSlice";
// import { Button } from "../ui/button";
// import { logout } from "@/store/slices/authSlice";
// import { toggleSignupDialog } from "@/store/slices/auth";

// const DefaultHeader2 = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [navbar, setNavbar] = useState(false);
//   const { userToken } = useSelector((state) => state.auth);

//   const changeBackground = () => {
//     if (window.scrollY >= 10) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", changeBackground);
//     return () => window.removeEventListener("scroll", changeBackground);
//   }, []);

//   const handleCheck = (type) => {
//     switch (type) {
//       case "job-post":
//         if (!userToken) dispatch(toggleSignupDialog());
//         else navigate("/employers-dashboard/post-jobs");
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <header className={`main-header header-shadow ${navbar ? "fixed-header" : ""} mb-10`}>
//       <div className="header">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-3">
//             {/* Logo and Navigation */}
//             <div className="header-logo flex items-center">
//               <Link to="/">
//                 <img src={logo} alt="Company Logo" className="h-10 w-auto" />
//               </Link>
//               <div className="ms-4 hidden md:flex">
//                 <ul className="flex space-x-4">
//                   <li>
//                     <Link to="/ai-services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
//                       AI Services
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/hiring-advice" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
//                       Hiring Advice
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/companies-list" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
//                       Companies
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/job-list-v3" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base py-2 px-1">
//                       Jobs
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Right Side Menu */}
//             <div className="flex items-center space-x-4">
//               {/* Sign Up Button */}
//               {!userToken && (
//                 <button
//                   className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                   onClick={() => dispatch(toggleSignupDialog())}
//                 >
//                   Sign Up
//                 </button>
//               )}

//               {/* Post Job Button */}
//               <button
//                 className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 onClick={() => handleCheck("job-post")}
//               >
//                 Post a Job
//               </button>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//                 onClick={() => dispatch(toggleSignupDialog())}
//               >
//                 <span className="sr-only">Open menu</span>
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>

//               {/* Logout Button (if logged in) */}
//               {userToken && (
//                 <Button
//                   className="bg-gray-500 p-2 duration-500 hover:bg-red-600 flex items-center"
//                   onClick={() => dispatch(logout())}
//                 >
//                   <IoLogOutOutline size={24} />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DefaultHeader2;


// import { IoLogOutOutline } from "react-icons/io5";
// import logo from "../../Images/image.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "../ui/button";
// import { logout } from "@/store/slices/authSlice";
// import { toggleSignupDialog } from "@/store/slices/auth";

// const DefaultHeader2 = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [navbar, setNavbar] = useState(false);
//   const { userToken } = useSelector((state) => state.auth);

//   const changeBackground = () => {
//     if (window.scrollY >= 10) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", changeBackground);
//     return () => window.removeEventListener("scroll", changeBackground);
//   }, []);

//   const handleCheck = (type) => {
//     switch (type) {
//       case "job-post":
//         if (!userToken) {
//           dispatch(toggleSignupDialog());
//         } else {
//           navigate("/employers-dashboard/post-jobs");
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <header
//       className={`main-header header-shadow ${
//         navbar ? "fixed-header" : ""
//       } mb-10`}
//     >
//       <div className="header">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex justify-between items-center py-3">
//             {/* Logo and Navigation */}
//             <div className="header-logo flex items-center">
//               <Link to="/">
//                 <img src={logo} alt="Company Logo" className="h-10 w-auto" />
//               </Link>
//               <div className="ms-4">
//                 <ul className="flex space-x-6">
//                   <li>
//                     <Link
//                       to="/ai-services"
//                       className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
//                     >
//                       AI Services
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/hiring-advice"
//                       className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
//                     >
//                       Hiring Advice
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/companies-list"
//                       className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
//                     >
//                       Companies
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/job-list-v3"
//                       className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
//                     >
//                       Jobs
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Right Side Menu */}
//             <div className="flex items-center space-x-4">
//               {/* Sign Up Button */}
//               {!userToken && (
//                 <button
//                   className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                   onClick={() => dispatch(toggleSignupDialog())}
//                 >
//                   Sign Up
//                 </button>
//               )}

//               {/* Post Job Button */}
//               <button
//                 className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 onClick={() => handleCheck("job-post")}
//               >
//                 Post a Job
//               </button>

//               {/* Logout Button */}
//               {userToken && (
//                 <Button
//                   className="bg-gray-500 p-2 duration-500 hover:bg-red-600 flex items-center"
//                   onClick={() => dispatch(logout())}
//                 >
//                   <IoLogOutOutline size={24} />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DefaultHeader2;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../Images/image.png";
import MobileSidebar from "./mobile-sidebar";
import { Button } from "../ui/button";
import { logout } from "@/store/slices/authSlice";
import { toggleSignupDialog } from "@/store/slices/auth";
import { Constant } from "@/utils/constant/constant";

const DefaultHeader2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [navbar, setNavbar] = useState(false);

  // Redux store
  const { userToken } = useSelector((state) => state.auth);
  const localUserToken = localStorage.getItem(Constant.USER_TOKEN);

  // Change background on scroll (desktop)
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 10) setNavbar(true);
      else setNavbar(false);
    };
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const handleCheck = (type) => {
    if (type === "job-post") {
      if (!userToken && !localUserToken) {
        dispatch(toggleSignupDialog());
      } else {
        navigate("/employers-dashboard/post-jobs");
      }
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`hidden lg:block main-header header-shadow  ${
          navbar ? "fixed-header" : ""
        } `}
      >
        <div className="header">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-center py-3">
              {/* Logo and Navigation */}
              <div className="header-logo flex items-center">
                <Link to="/">
                  <img src={logo} alt="Company Logo" className="h-10 w-auto" />
                </Link>
                <div className="ms-4">
                  <ul className="flex space-x-6">
                    <li>
                      <Link
                        to="/ai-services"
                        className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
                      >
                        AI Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/hiring-advice"
                        className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
                      >
                        Hiring Advice
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/companies-list"
                        className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
                      >
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/job-list-v3"
                        className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base py-2"
                      >
                        Jobs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side Menu */}
              <div className="flex items-center space-x-4">
                {!userToken && !localUserToken && (
                  <button
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    onClick={() => dispatch(toggleSignupDialog())}
                  >
                    Sign Up
                  </button>
                )}

                <button
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  onClick={() => handleCheck("job-post")}
                >
                  Post a Job
                </button>

                {(userToken || localUserToken) && (
                  <Button
                    className="bg-gray-500 p-2 duration-500 hover:bg-red-600 flex items-center"
                    onClick={() => dispatch(logout())}
                  >
                    <IoLogOutOutline size={24} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="block lg:hidden main-header main-header-mobile z-10">
        <div className="auto-container">
          <div className="inner-box flex justify-between items-center">
            <div className="nav-outer flex items-center">
              <div className="logo-box border-white border-2 me-4">
                <Link to="/">
                  <img alt="brand" src={logo} className="h-14 w-28" />
                </Link>
              </div>
              <MobileSidebar />
            </div>

            <div className="outer-box flex items-center">
              {userToken || localUserToken ? (
                <Button
                  className="bg-gray-500 p-3 ml-2 duration-500 hover:bg-[#E60278]"
                  title="logout"
                  onClick={() => dispatch(logout())}
                >
                  <IoLogOutOutline size={24} />
                </Button>
              ) : (
                <button
                  className="theme-btn btn-style-three call-modal p-2 text-blue-950 text-lg px-3 font-light"
                  onClick={() => dispatch(toggleSignupDialog())}
                >
                  Sign Up
                </button>
              )}

              <a
                href="#"
                className="mobile-nav-toggler ml-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
              >
                <span className="flaticon-menu-1"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default DefaultHeader2;
