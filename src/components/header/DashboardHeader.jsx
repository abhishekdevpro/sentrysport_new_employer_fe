// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderNavContent from "./HeaderNavContent";
// import logo from "../../Images/image.png";
// import { useLocation } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { Constant } from "@/utils/constant/constant";
// import { useSelector } from "react-redux";
// import { logout } from "@/store/slices/auth";

// const DashboardHeader = () => {
//   const { pathname } = useLocation();
//   const [navbar, setNavbar] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const {userInfo} = useSelector((state)=>(state.auth))
//   const userData = JSON.parse(localStorage.getItem(Constant.USER_INFO))

//   const changeBackground = () => {
//     if (window.scrollY >= 0) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", changeBackground);
//     return () => window.removeEventListener("scroll", changeBackground); // Cleanup listener
//   }, []);

//   const handleDropdownToggle = () => {
//     setDropdownOpen((prev) => !prev);
//   };
//   const logoutHandler = () => {
//     dispatch(logout())
//     navigate('/')
//   };

//   return (
//     <header
   
//       className={`main-header header-shadow z-10 ${navbar ? "fixed-header" : ""}`}
//     >
//       <div className="container-fluid">
//         <div className="main-box ">
//           <div className="nav-outer ">
//             <div className="logo-box">
//               <div className="me-10">
//                 <Link to="/">
//                   <img alt="brand" src={logo} className="h-16 w-auto " />
//                 </Link>
//               </div>
//             </div>

//             <HeaderNavContent />

//             <div className="outer-box float-end ">
//               <button className="menu-btn">
//                 <span className="count">1</span>
//                 <span className="icon la la-heart-o"></span>
//               </button>

//               <button className="menu-btn mx-3">
//                 <span className="icon la la-bell"></span>
//               </button>

//               {/* Dropdown for Account */}
//               <div className="relative">
//                 {/* <button
//                   className="flex items-center space-x-2 text-white"
//                   onClick={handleDropdownToggle}
//                 >
//                   <img
//                     alt="avatar"
//                     className="w-8 h-8 rounded-full"
//                     src="/images/resource/company-6.png"
//                   />
             
//                   <i className={`la la-angle-down ${dropdownOpen ? 'rotate-180' : ''}`}></i>
//                 </button> */}

// <button
//                 className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50"
//                 onClick={handleDropdownToggle}
//               >
//                 <img
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full border-2 border-blue-600"
//                   src={userInfo.photo?userInfo.photo:"https://th.bing.com/th/id/OIP.w-L3HP_7QYalYXw7apT2tAHaHx?rs=1&pid=ImgDetMain"}
//                 />
//                 <p>{userInfo.first_name}</p>
//                 <ChevronDown className={`h-4 w-4 text-blue-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
//               </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg  z-50">
//                     <div className="px-4 pb-4 pt-2 bg-blue-700 rounded-t-lg">
//                       <p className="font-bold text-white">{userInfo.first_name}{" "}{userInfo.last_name}</p>
//                       <p className="text-sm text-white">{userInfo.email}</p>
//                       <Link to="/public-profile" className="text-white text-sm hover:underline">
//                         View Public Profile
//                       </Link>
//                     </div>
                    
//                     <div className="px-3 flex justify-between py-1 text-white bg-blue-900">
//                       <p className="text-xs text-white">Viewed: 0 times</p>
//                       <p className="text-xs text-white">Last Login: Sep 9, 2024</p>
//                     </div>

//                     <div className="px-2 py-2 border-b border-gray-200">
//                       <p className="text-sm text-gray-700 mt-2">Basic Postings: Unlimited</p>
//                       <p className="text-sm text-gray-700 my-2">Premium Postings: 0 Credits    <Link to="/buy-credits" className="text-indigo-600 text-xs border-1 p-0.5 rounded-sm border-blue-600 hover:underline">
//                         Buy Credits
//                       </Link></p>
//                       <p className="text-sm text-gray-700">Global Postings: 0 Credits</p>
//                     </div>


//                     <div className="px-4 py-2">
//                       <Link to="/account-settings" className="block text-sm text-gray-800 hover:bg-gray-100 py-2 rounded-lg">
//                         Account Settings
//                       </Link>
//                       <button
//                         onClick={logoutHandler}
//                         className="block w-full text-left text-sm text-gray-800 hover:bg-gray-100 py-2 rounded-lg"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderNavContent from "./HeaderNavContent";
import logo from "../../Images/image.png";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Constant } from "@/utils/constant/constant";
import { logout } from "@/store/slices/auth";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const userData = JSON.parse(localStorage.getItem(Constant.USER_INFO));

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

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className={`main-header header-shadow z-10 ${navbar ? "fixed-header" : ""}`}>
      <div className="container-fluid">
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="me-10">
                <Link >
                  <img alt="brand" src={logo} className="h-16 w-auto" />
                </Link>
              </div>
            </div>

            <HeaderNavContent />

            <div className="outer-box float-end">
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
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50"
                  onClick={handleDropdownToggle}
                >
                  <img
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-blue-600"
                    src={userInfo?.photo || "https://th.bing.com/th/id/OIP.w-L3HP_7QYalYXw7apT2tAHaHx?rs=1&pid=ImgDetMain"}
                  />
                  <p>{userInfo?.first_name || "User"}</p>
                  <ChevronDown className={`h-4 w-4 text-blue-600 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
                    <div className="px-4 pb-4 pt-2 bg-blue-700 rounded-t-lg">
                      <p className="font-bold text-white">
                        {userInfo?.first_name} {userInfo?.last_name}
                      </p>
                      <p className="text-sm text-white">{userInfo?.email}</p>
                      <Link to="/public-profile" className="text-white text-sm hover:underline">
                        View Public Profile
                      </Link>
                    </div>

                    <div className="px-3 flex justify-between py-1 text-white bg-blue-900">
                      <p className="text-xs text-white">Viewed: 0 times</p>
                      <p className="text-xs text-white">Last Login: Sep 9, 2024</p>
                    </div>

                    <div className="px-2 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-700 mt-2">Basic Postings: Unlimited</p>
                      <p className="text-sm text-gray-700 my-2">
                        Premium Postings: 0 Credits{" "}
                        <Link
                          to="/buy-credits"
                          className="text-indigo-600 text-xs border-1 p-0.5 rounded-sm border-blue-600 hover:underline"
                        >
                          Buy Credits
                        </Link>
                      </p>
                      <p className="text-sm text-gray-700">Global Postings: 0 Credits</p>
                    </div>

                    <div className="px-4 py-2">
                      <Link to="/account-settings" className="block text-sm text-gray-800 hover:bg-gray-100 py-2 rounded-lg">
                        Account Settings
                      </Link>
                      <button
                        onClick={logoutHandler}
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
