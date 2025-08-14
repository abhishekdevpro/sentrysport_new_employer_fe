// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { User, Bell, CreditCard, Menu, X } from "lucide-react";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const getLinkClassName = (path) => {
//     return location.pathname === path
//       ? "flex items-center p-2 bg-blue-900 text-white font-semibold rounded-lg"
//       : "flex items-center p-2 hover:bg-blue-900 hover:text-white text-gray-800 rounded-lg";
//   };

//   return (
//     <>
//       {/* Mobile Sidebar Toggle Button */}
//       {!isOpen && (
//         <button
//           className="md:hidden fixed top-[5rem] left-4 z-50 bg-blue-900 text-white p-2 rounded-full"
//           onClick={toggleSidebar}
//         >
//           <Menu size={24} />
//         </button>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-auto w-64 p-4 shadow-md border-r transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 app-light-bg`}
//       >
//         {/* Close Button for Mobile */}
//         <button
//           className="md:hidden absolute top-4 right-4 text-gray-600"
//           onClick={toggleSidebar}
//         >
//           <X size={24} />
//         </button>

//         {/* Sidebar Links */}
//         <ul className="space-y-4 mt-6">
//           <li>
//             <Link to="/settings/account" className={getLinkClassName("/settings/account")} onClick={toggleSidebar}>
//               <User className="mr-2" size={20} />
//               <span>Account</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/settings/notification" className={getLinkClassName("/settings/notification")} onClick={toggleSidebar}>
//               <Bell className="mr-2" size={20} />
//               <span>Notification</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/settings/subscription" className={getLinkClassName("/settings/subscription")} onClick={toggleSidebar}>
//               <CreditCard className="mr-2" size={20} />
//               <span>Subscription</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { User, Bell, CreditCard, Menu, X } from "lucide-react";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const getLinkClassName = (path) => {
//     const isActive = location.pathname === path;
//     return `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
//       isActive
//         ? "bg-blue-900 text-white shadow-md"
//         : "text-gray-700 hover:bg-blue-900 hover:text-white"
//     }`;
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       {!isOpen && (
//         <button
//           className="md:hidden fixed top-10 left-4 z-50 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <Menu size={24} />
//         </button>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg border-r transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Close Button for Mobile */}
//         <button
//           className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <X size={24} />
//         </button>

//         {/* Sidebar Header */}
//         <div className="mb-8 text-center">
//           <h2 className="text-xl font-bold text-blue-900">Settings</h2>
//           <p className="text-gray-500 text-sm">Manage your account</p>
//         </div>

//         {/* Sidebar Links */}
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/settings/account"
//               className={getLinkClassName("/settings/account")}
//               onClick={toggleSidebar}
//             >
//               <User size={20} />
//               <span>Account</span>
//             </Link>
//           </li>
//           {/* <li>
//             <Link
//               to="/settings/notification"
//               className={getLinkClassName("/settings/notification")}
//               onClick={toggleSidebar}
//             >
//               <Bell size={20} />
//               <span>Notification</span>
//             </Link>
//           </li> */}
//           <li>
//             <Link
//               to="/settings/subscription"
//               className={getLinkClassName("/settings/subscription")}
//               onClick={toggleSidebar}
//             >
//               <CreditCard size={20} />
//               <span>Subscription</span>
//             </Link>
//           </li>
//         </ul>

//         {/* Footer */}
        
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import { User, CreditCard } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const getLinkClassName = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium whitespace-nowrap ${
      isActive
        ? "bg-blue-900 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-900 hover:text-white"
    }`;
  };

  return (
    <nav className="flex overflow-x-auto scrollbar-hide app-light-bg border-b border-gray-200 shadow-sm px-2 py-3  gap-2">
      <Link to="/settings/account" className={getLinkClassName("/settings/account")}>
        <User size={20} />
        <span>Account</span>
      </Link>

      <Link to="/settings/subscription" className={getLinkClassName("/settings/subscription")}>
        <CreditCard size={20} />
        <span>Subscription</span>
      </Link>
    </nav>
  );
};

export default Sidebar;
