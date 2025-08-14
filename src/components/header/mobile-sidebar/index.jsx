

// import {

//   Sidebar,
//   Menu,
//   MenuItem,
//   SubMenu,
// } from "react-pro-sidebar";

// import mobileMenuData from "../../../data/mobileMenuData";
// import SidebarFooter from "./SidebarFooter";
// import SidebarHeader from "./SidebarHeader";
// import {
//   isActiveLink,
//   isActiveParentChaild,
// } from "../../../utils/linkActiveChecker";

// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const Index = () => {
//   const { pathname } = useLocation();

//   const navigate = useNavigate();


//   return (
//     <div
//       className="offcanvas offcanvas-start mobile_menu-contnet"
//       tabIndex="-1"
//       id="offcanvasMenu"
//       data-bs-scroll="true"
//     >
//       <SidebarHeader />
//       {/* End pro-header */}

      
//         <Sidebar>
//           <Menu>
//             {mobileMenuData.map((item) => (
//               <SubMenu
//                 className={
//                   isActiveParentChaild(item.items, pathname)
//                     ? "menu-active"
//                     : ""
//                 }
//                 label={item.label}
//                 key={item.id}
//               >
//                 {item.items.map((menuItem, i) => (
//                   <MenuItem

//                   onClick={()=>navigate(menuItem.routePath)}
//                     className={
//                       isActiveLink(menuItem.routePath, pathname)
//                         ? "menu-active-link"
//                         : ""
//                     }
//                     key={i}
//                     // routerLink={<Link to={menuItem.routePath} />}
//                   >
//                     {menuItem.name}
//                   </MenuItem>
//                 ))}
//               </SubMenu>
//             ))}
//           </Menu>
//         </Sidebar>


//       {/* <SidebarFooter /> */}
//     </div>
//   );
// };

// export default Index;
// import React from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import SidebarHeader from "./SidebarHeader";
// import { Constant } from "@/utils/constant/constant";
// import { logout } from "@/store/slices/authSlice";
// import {HomeIcon,LayoutDashboard,User} from "lucide-react"

// const Index = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
  
//   // Get user token from Redux store
//   const userToken = localStorage.getItem(Constant.USER_TOKEN);

//   // Define menu items based on authentication status
//   const menuItems = userToken
//     ? [
//         { name: "Home", routePath: "/",icon:"HomeIcon" },
//         { name: "Dashboard", routePath: "/employers-dashboard/dashboard",icon:"LayoutDashboard" },
//         { name: "Community", routePath: "/community",icon:"User" },
//       ]
//     : [
//         { name: "Home", routePath: "/" },
//         { name: "Login", routePath: "/" },
//         { name: "Register", routePath: "/" },
//       ];

//   // Check if link is active
//   const isActiveLink = (routePath) => pathname === routePath;

//   // Handle logout
//   const handleLogout = () => {
//     // Dispatch logout action here (e.g., dispatch(logout()));
//     // navigate("/login");
//     dispatch(logout());

//   };

//   return (
//     <div
//       className="offcanvas offcanvas-start mobile_menu-contnet app-light-bg"
//       tabIndex="-1"
//       id="offcanvasMenu"
//       data-bs-scroll="true"
//     >
//       <SidebarHeader />
//       <Sidebar className=" app-light-bg"> 
//         <Menu className="app-light-bg">
//           {menuItems.map((menuItem, index) => (
//             <MenuItem
//               key={index}
//               onClick={() => navigate(menuItem.routePath)}
//               className={isActiveLink(menuItem.routePath) ? "menu-active-link" : "text-blue-900 font-medium"}
//             > 
//             <menuItem.icon />
//               {menuItem.name}
//             </MenuItem>
//           ))}

//           {/* "Post a Job" as a Button */}
//          <div className="flex flex-col gap-2 px-2">
//          {userToken && (
//             <button
//               onClick={() => navigate("/post-job")}
//               className=" px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md"
//             >
//               Post a Job
//             </button>
//           )}

//           {/* Logout button for authenticated users */}
//           {userToken && (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 text-white  text-lg font-semibold rounded-md"
//             >
//               Logout
//             </button>
//           )}
//          </div>
//         </Menu>
//       </Sidebar>
//     </div>
//   );
// };

// export default Index;

import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SidebarHeader from "./SidebarHeader";
import { Constant } from "@/utils/constant/constant";
import { logout } from "@/store/slices/authSlice";
import { HomeIcon, LayoutDashboard, User } from "lucide-react";

const Index = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user token from local storage
  const userToken = localStorage.getItem(Constant.USER_TOKEN);

  // Define menu items with actual icon components, not strings
  const menuItems = userToken
    ? [
        { name: "Home", routePath: "/", icon: HomeIcon },
        { name: "Dashboard", routePath: "/employers-dashboard/dashboard", icon: LayoutDashboard },
        { name: "Community", routePath: "/community", icon: User },
      ]
    : [
        { name: "Home", routePath: "/", icon: HomeIcon },
        { name: "Login", routePath: "/", icon: User },
        { name: "Register", routePath: "/", icon: User },
      ];

  // Check if link is active
  const isActiveLink = (routePath) => pathname === routePath;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet app-light-bg"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      <Sidebar className="app-light-bg">
        <Menu className="app-light-bg">
          {menuItems.map((menuItem, index) => {
            const IconComponent = menuItem.icon;
            return (
              <MenuItem
                key={index}
                onClick={() => navigate(menuItem.routePath)}
                className={
                  isActiveLink(menuItem.routePath)
                    ? "menu-active-link"
                    : "text-blue-900 font-medium"
                }
                icon={<IconComponent size={18} />}
              >
                {menuItem.name}
              </MenuItem>
            );
          })}

          {/* "Post a Job" as a Button */}
          <div className="flex flex-col gap-2 px-2 mt-4">
            {userToken && (
              <button
                onClick={() => navigate("/post-job")}
                className="px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md"
              >
                Post a Job
              </button>
            )}

            {/* Logout button for authenticated users */}
            {userToken && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
