

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
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarHeader from "./SidebarHeader";

const Index = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  // Get user token from Redux store
  const userToken = useSelector((state) => state.auth.userToken);

  // Define menu items based on authentication status
  const menuItems = userToken
    ? [
        { name: "Home", routePath: "/" },
        { name: "Dashboard", routePath: "/employers-dashboard/dashboard" },
        { name: "Community", routePath: "/community" },
      ]
    : [
        { name: "Home", routePath: "/" },
        { name: "Login", routePath: "/" },
        { name: "Register", routePath: "/" },
      ];

  // Check if link is active
  const isActiveLink = (routePath) => pathname === routePath;

  // Handle logout
  const handleLogout = () => {
    // Dispatch logout action here (e.g., dispatch(logout()));
    navigate("/login");
  };

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      <Sidebar>
        <Menu>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              onClick={() => navigate(menuItem.routePath)}
              className={isActiveLink(menuItem.routePath) ? "menu-active-link" : ""}
            >
              {menuItem.name}
            </MenuItem>
          ))}

          {/* "Post a Job" as a Button */}
          {userToken && (
            <button
              onClick={() => navigate("/post-job")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white w-full text-lg font-semibold rounded-md"
            >
              Post a Job
            </button>
          )}

          {/* Logout button for authenticated users */}
          {userToken && (
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white w-full text-lg font-semibold rounded-md"
            >
              Logout
            </button>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;

