// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import { Link } from "react-router-dom";
// export default function Subscription() {
//   const { register, setValue } = useForm();
//   const [accountId, setAccountId] = useState("");

//   useEffect(() => {
//     setAccountId(localStorage.getItem("ID") || "618744350");
//   }, []);

//   return (
//     <>
//       <div className="p-4 md:p-10 max-w-5xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

//         <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">

//           <div className="w-full ">
//             <div className="p-6 bg-white">
//               <h3 className="text-xl font-semibold mb-6">Subscription</h3>

//               {/* Help & Support */}
//               <div className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
//                 <div className="w-full md:w-1/2">
//                   <p className="font-semibold text-gray-800">
//                     Need help or want to change your subscription?
//                   </p>
//                   <p className="mt-2 text-gray-700">Contact us at:</p>
//                   <ul className="list-disc ml-5 text-gray-700">
//                     <li className="text-[15px]">
//                       📧 customersupport@sentryspot.co.uk
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="hidden md:block border-l border-gray-300 h-24 mx-6"></div>
//                 <div className="w-full md:w-1/2 mt-4 md:mt-0">
//                   <p className="font-semibold text-gray-800">Available:</p>
//                   <ul className="list-disc ml-5 text-gray-700">
//                     <li>Monday-Friday: 8 AM - 8 PM (GMT)</li>
//                     <li>Saturday: 8 AM - 5 PM (GMT)</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Account ID */}
//               <div className="py-4 border-b border-gray-300">
//                 <p className="font-semibold text-gray-900">
//                   Account ID:{" "}
//                   <span className="text-gray-600 font-medium">{accountId}</span>
//                 </p>
//               </div>

//               {/* Subscription Details */}
//               <div className="mt-6">
//                 <h4 className="text-lg font-semibold text-gray-900">
//                   Subscription details
//                 </h4>
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3">
//                   <p className="text-gray-700">
//                     Status:{" "}
//                     <span className="font-medium text-gray-900">Inactive</span>
//                   </p>
//                   <Link href="/payment">
//                     <button className="mt-3 md:mt-0 text-blue-600 font-medium underline">
//                       Subscribe
//                     </button>
//                   </Link>
//                 </div>
//                 <p className="mt-4 text-gray-700">
//                   For more info, contact{" "}
//                   <span className="text-blue-600 cursor-pointer">
//                     customersupport@sentryspot.co.uk
//                   </span>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Subscription() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="app-light-bg px-2 md:px-4 py-8">
      <div className=" rounded-lg  mx-auto">
        <div className="px-2 md:px-4 py-3">
          {/* Section Title */}
          <h3 className="app-text-h3 mb-2 border-b pb-2">Subscription</h3>

          {/* Help & Support */}
          <div className="p-2 md:p-4 border border-gray-200 rounded-md app-light-bg mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Column */}
            <div className="flex-1">
              <p className="app-text-p">
                Need help or want to change your subscription?
              </p>
              <p className="mt-1 app-text-p">Contact us at:</p>
              <span className="app-text-sm break-words">
                <a
                  href="mailto:customersupport@sentryspot.co.uk"
                  className="cursor-pointer"
                >
                  customersupport@sentryspot.co.uk
                </a>
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block border-l border-gray-300 h-20"></div>

            {/* Right Column */}
            <div className="flex-1">
              <p className="app-text-p">Available:</p>
              <ul className="app-text-p list-disc ml-5 text-gray-700">
                <li>Monday-Friday: 8 AM - 8 PM (GMT)</li>
                <li>Saturday: 8 AM - 5 PM (GMT)</li>
              </ul>
            </div>
          </div>

          {/* Account ID */}
          <div className="py-4 border-b border-gray-200">
            <p className="app-text-p">
              Account ID:{" "}
              <span className="app-text-p break-all">
                {userInfo?.employeer_uuid || "N/A"}
              </span>
            </p>
          </div>

          {/* Subscription Details */}
          <div className="mt-2">
            <h4 className="app-text-h2">Subscription Details</h4>
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <p className="app-text-p ">
                Status:{" "}
                <span className="app-text-p !text-red-500">Inactive</span>
              </p>
              <Link to="/payment">
                <Button variant="primary" className="w-full md:w-auto">
                  Subscribe
                </Button>
              </Link>
            </div>
            <p className="app-text-sm ">
              For more info, contact{" "}
              <span className=" cursor-pointer">
                <a
                  href="mailto:customersupport@sentryspot.co.uk"
                  className="cursor-pointer"
                >
                  customersupport@sentryspot.co.uk
                </a>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
