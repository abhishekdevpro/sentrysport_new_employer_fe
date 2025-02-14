// import React, { useState } from "react";

// // Define the new component to show after clicking "Buy Credits"
// function BuyCreditsComponent() {
//   return (
//     <section className="bg dark:bg-gray-900">
//     <div className="w-4/5 ">
//       <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
//         <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
//         <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
//       </div>
//       <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
//         {/* Pricing Card */}
//         <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//           <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
//           <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use &amp; for your next project.</p>
//           <div className="flex justify-center items-baseline my-8">
//             <span className="mr-2 text-5xl font-extrabold">$29</span>
//             <span className="text-gray-500 dark:text-gray-400">/month</span>
//           </div>
//           {/* List */}
//           <ul role="list" className="mb-8 space-y-4 text-left">
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Individual configuration</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>No setup, or hidden fees</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Team size: <span className="font-semibold">1 developer</span></span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Premium support: <span className="font-semibold">6 months</span></span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Free updates: <span className="font-semibold">6 months</span></span>
//             </li>
//           </ul>
//           <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white bg-blue-900  dark:focus:ring-primary-900">Get started</a>
//         </div>
//         {/* Pricing Card */}
//         <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//           <h3 className="mb-4 text-2xl font-semibold">Company</h3>
//           <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended &amp; premium support.</p>
//           <div className="flex justify-center items-baseline my-8">
//             <span className="mr-2 text-5xl font-extrabold">$99</span>
//             <span className="text-gray-500 dark:text-gray-400">/month</span>
//           </div>
//           {/* List */}
//           <ul role="list" className="mb-8 space-y-4 text-left">
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Individual configuration</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>No setup, or hidden fees</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Team size: <span className="font-semibold">10 developers</span></span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Premium support: <span className="font-semibold">24 months</span></span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Free updates: <span className="font-semibold">24 months</span></span>
//             </li>
//           </ul>
//           <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white bg-blue-900 dark:focus:ring-primary-900">Get started</a>
//         </div>
//         {/* Pricing Card */}
//         <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//           <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
//           <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
//           <div className="flex justify-center items-baseline my-8">
//             <span className="mr-2 text-5xl font-extrabold">$499</span>
//             <span className="text-gray-500 dark:text-gray-400">/month</span>
//           </div>
//           {/* List */}
//           <ul role="list" className="mb-8 space-y-2 text-left">
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Individual configuration</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>No setup, or hidden fees</span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Team size: <span className="font-semibold">100+ developers</span></span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Premium support: <span className="font-semibold">36 months</span></span>
//             </li>
//             <li className="flex items-center space-x-3">
//               {/* Icon */}
//               <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//               <span>Free updates: <span className="font-semibold">36 months</span></span>
//             </li>
//           </ul>
//           <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  bg-blue-900 dark:focus:ring-primary-900">Get started</a>
//         </div>
//       </div>
//     </div>
//   </section>
//   );
// }

// function PackageDataTable() {
//   const [isBuyingCredits, setIsBuyingCredits] = useState(false);

//   const handleBuyCreditsClick = () => {
//     setIsBuyingCredits(true);
//   };

//   return (
//     <div className="container break-all p-4">
//       {/* Conditionally render the current page or the BuyCreditsComponent */}
//       {isBuyingCredits ? (
//         <BuyCreditsComponent />
//       ) : (
//         <>
//           <header className="mb-4">{/* Add your stylized graphic here */}</header>

//           <main className="bg-white rounded-lg shadow-md text-center p-6 w-4/5">
//             <h1 className="text-2xl font-bold mb-2 break-all">
//               Looks like you don't have any credits
//             </h1>

//             <p className="text-gray-600 mb-4 break-all">
//               All available credits & usage will be shown here. Buy credits to start
//               hiring for your organisation.
//             </p>

//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded break-all"
//               onClick={handleBuyCreditsClick}
//             >
//               Buy Credits
//             </button>

//             <a href="#" className="block mt-2 text-blue-500 break-all">
//               Learn more about credits
//             </a>
//           </main>

//           {/* Notification Banner */}
//           <div
//             className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-1 mt-4 w-4/5"
//             role="alert"
//           >
//             <div className="flex">
//               <div className="py-1">
//                 <svg
//                   className="fill-current h-6 w-6 text-blue-500 mr-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-bold">New Update!</p>
//                 <p className="text-sm">
//                   The Transaction history is now cleaner with all credit and debit
//                   related transactions from your apna account. To view your future
//                   payment-related information and invoices, go to{" "}
//                   <a href="#" className="font-bold">
//                     Billing
//                   </a>{" "}
//                   section.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-b border-gray-200 mt-4">
//             <nav className="-mb-px flex">
//               <a
//                 href="#"
//                 className="border-b-2 border-indigo-500 py-4 px-1 text-sm font-medium text-indigo-600"
//               >
//                 Credits
//               </a>
//               <a
//                 href="#"
//                 className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               >
//                 Previous coins
//               </a>
//             </nav>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default PackageDataTable;
import React, { useState } from "react";

function BuyCreditsComponent() {
  return (
    <section className="bg-white min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 text-gray-500 sm:text-xl max-w-3xl mx-auto">
            Here we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {/* Starter Plan */}
          <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Starter</h3>
            <p className="font-light text-gray-500 sm:text-lg mb-8">Best option for personal use & for your next project.</p>
            <div className="flex justify-center items-baseline my-8">
              <span className="text-5xl font-extrabold text-blue-900">$29</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              {[
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 1 developer",
                "Premium support: 6 months",
                "Free updates: 6 months"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-blue-900 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200">
              Get started
            </button>
          </div>

          {/* Company Plan */}
          <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Company</h3>
            <p className="font-light text-gray-500 sm:text-lg mb-8">Relevant for multiple users, extended & premium support.</p>
            <div className="flex justify-center items-baseline my-8">
              <span className="text-5xl font-extrabold text-blue-900">$99</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              {[
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 10 developers",
                "Premium support: 24 months",
                "Free updates: 24 months"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-blue-900 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200">
              Get started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Enterprise</h3>
            <p className="font-light text-gray-500 sm:text-lg mb-8">Best for large scale uses and extended redistribution rights.</p>
            <div className="flex justify-center items-baseline my-8">
              <span className="text-5xl font-extrabold text-blue-900">$499</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              {[
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 100+ developers",
                "Premium support: 36 months",
                "Free updates: 36 months"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-blue-900 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200">
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageDataTable() {
  const [isBuyingCredits, setIsBuyingCredits] = useState(false);

  const handleBuyCreditsClick = () => {
    setIsBuyingCredits(true);
  };

  return (
    <div className="min-h-screen ">
      {isBuyingCredits ? (
        <BuyCreditsComponent />
      ) : (
        <div className="max-w-8xl mx-auto md:px-4 lg:px-8 py-8">
          <main className="bg-white rounded-lg shadow-lg p-6 md:p-8 mx-auto max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-900">
              Looks like you don't have any credits
            </h1>

            <p className="text-gray-600 mb-6 text-center text-lg">
              All available credits & usage will be shown here. Buy credits to start
              hiring for your organisation.
            </p>

            <div className="flex flex-col items-center space-y-4">
              <button
                className="w-full sm:w-auto bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200 focus:ring-4 focus:ring-blue-300"
                onClick={handleBuyCreditsClick}
              >
                Buy Credits
              </button>

              <a href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                Learn more about credits
              </a>
            </div>
          </main>

          <div className="max-w-3xl mx-auto mt-8 bg-blue-50 border-l-4 border-blue-900 p-4 rounded-r-lg">
            <div className="flex items-start space-x-4">
              <svg
                className="w-6 h-6 text-blue-900 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-bold text-blue-900">New Update!</p>
                <p className="text-blue-800">
                  The Transaction history is now cleaner with all credit and debit
                  related transactions from your account. To view your future
                  payment-related information and invoices, go to{" "}
                  <a href="#" className="font-bold hover:underline">
                    Billing
                  </a>{" "}
                  section.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 border-b border-gray-200">
            <nav className="flex space-x-8">
              <a
                href="#"
                className="border-b-2 border-blue-900 pb-4 px-1 text-sm font-medium text-blue-900"
              >
                Credits
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Previous coins
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default PackageDataTable;