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

// const DashboardEmployerSidebar = () => {
//   const { pathname } = useLocation();
//   const { menu } = useSelector((state) => state.toggle);

//   const dispatch = useDispatch();
//   // menu toggle handler
//   const menuToggleHandler = () => {
//     dispatch(menuToggle());
//   };

//   return (
//     <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
//       {/* Start sidebar close icon */}
//       <div className="pro-header text-end pb-0 mb-0 show-1023">
//         <div className="fix-icon" onClick={menuToggleHandler}>
//           <span className="flaticon-close"></span>
//         </div>
//       </div>
//       {/* End sidebar close icon */}

//       <div className="sidebar-inner">
//         <ul className="navigation">
//           {employerMenuData.map((item) => (
//             <li
//               className={`mb-1 transition-transform duration-200 ease-in-out ${
//                 isActiveLink(item.routePath, pathname)
//                   ? "bg-blue-200 text-white rounded-lg"
//                   : "hover:scale-125 hover:bg-sky-300 hover:text-white rounded-lg"
//               }`}
//               key={item.id}
//               onClick={menuToggleHandler}
//             >
//               {item?.name === "Logout" ? (
//                 <Button
//                   title="logout"
//                   className="bg-transparent default_Black_Text px-4 w-full text-md flex justify-start outline-none"
//                   onClick={() => {
//                     console.log("logout");
//                     dispatch(logout());
//                   }}
//                 >
//                   <AiOutlineLogout className="pr-2 text-3xl mr-2" /> Logout
//                 </Button>
//               ) : (
//                 <Link to={item.routePath}>
//                   <i className={`default_Black_Text la ${item.icon}`}></i>{" "}
//                   {item.name}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
const DashboardEmployerSidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const {userInfo} =  useSelector(state =>(state.auth))
  // Menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Logout handler
  const logoutHandler = () => {
    // localStorage.removeItem(Constant.USER_INFO);
    dispatch(logout())
    navigate('/')
    // window.location.href = "/login";
  };

  // const user = JSON.parse(localStorage.getItem(Constant.USER_INFO));
// console.log(userInfo,"userInfo");
  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        {/* Dynamic User Profile */}
        <Link to="/employers-dashboard/my-profile">
          <div className="flex gap-4 justify-center items-center p-4 border border-gray-200 mb-2 rounded-lg bg-blue-700 text-white">
            <div className=" w-auto">
              <img
                src="https://th.bing.com/th/id/OIP.w-L3HP_7QYalYXw7apT2tAHaHx?rs=1&pid=ImgDetMain"
                alt="User Avatar"
                className="rounded-full h-full"
              />
            </div>
            <div className="text-white flex-1 flex-col">
              <p className="text-white">{userInfo?.first_name || "Anonymous"}</p>
              <p className="text-white">{userInfo?.profile || "Employer"}</p>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <ul className="navigation">
          {employerMenuData.map((item) => (
            <>
              <li
                className={`font-bold ${
                  isActiveLink(item.routePath, pathname) ? "active" : ""
                } mb-1`}
                key={item.id}
                onClick={menuToggleHandler}
              >
                <Link to={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
              {item.id === 15 && (
                <div
                  className="my-4 w-full h-1 bg-gray-400"
                  style={{
                    height: "2px", // Adjust thickness
                    backgroundColor: "#333", // Dark gray line
                  }}
                ></div>
              )}
              
            </>
          ))}
           {
               <button
               className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
               onClick={() => window.location.href = "mailto:jobseeker@sentryspot.co.uk?subject=Job%20Inquiry&body=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20this%20job%20opportunity."}
             >
               Contact Us
             </button>
             
              }
          {
                <button
                  className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              }
         
        </ul>

  
       
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
