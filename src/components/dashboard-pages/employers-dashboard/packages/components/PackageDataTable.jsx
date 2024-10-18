import React, { useState } from "react";

// Define the new component to show after clicking "Buy Credits"
function BuyCreditsComponent() {
  return (
    <section className="bg dark:bg-gray-900">
    <div className="w-4/5 ">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        {/* Pricing Card */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
          <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use &amp; for your next project.</p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$29</span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Individual configuration</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>No setup, or hidden fees</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Team size: <span className="font-semibold">1 developer</span></span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Premium support: <span className="font-semibold">6 months</span></span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Free updates: <span className="font-semibold">6 months</span></span>
            </li>
          </ul>
          <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white bg-blue-900  dark:focus:ring-primary-900">Get started</a>
        </div>
        {/* Pricing Card */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 className="mb-4 text-2xl font-semibold">Company</h3>
          <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended &amp; premium support.</p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$99</span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Individual configuration</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>No setup, or hidden fees</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Team size: <span className="font-semibold">10 developers</span></span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Premium support: <span className="font-semibold">24 months</span></span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Free updates: <span className="font-semibold">24 months</span></span>
            </li>
          </ul>
          <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white bg-blue-900 dark:focus:ring-primary-900">Get started</a>
        </div>
        {/* Pricing Card */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
          <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$499</span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-2 text-left">
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Individual configuration</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>No setup, or hidden fees</span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Team size: <span className="font-semibold">100+ developers</span></span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Premium support: <span className="font-semibold">36 months</span></span>
            </li>
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              <span>Free updates: <span className="font-semibold">36 months</span></span>
            </li>
          </ul>
          <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  bg-blue-900 dark:focus:ring-primary-900">Get started</a>
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
    <div className="container break-all p-4">
      {/* Conditionally render the current page or the BuyCreditsComponent */}
      {isBuyingCredits ? (
        <BuyCreditsComponent />
      ) : (
        <>
          <header className="mb-4">{/* Add your stylized graphic here */}</header>

          <main className="bg-white rounded-lg shadow-md text-center p-6 w-4/5">
            <h1 className="text-2xl font-bold mb-2 break-all">
              Looks like you don't have any credits
            </h1>

            <p className="text-gray-600 mb-4 break-all">
              All available credits & usage will be shown here. Buy credits to start
              hiring for your organisation.
            </p>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded break-all"
              onClick={handleBuyCreditsClick}
            >
              Buy Credits
            </button>

            <a href="#" className="block mt-2 text-blue-500 break-all">
              Learn more about credits
            </a>
          </main>

          {/* Notification Banner */}
          <div
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-1 mt-4 w-4/5"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-blue-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">New Update!</p>
                <p className="text-sm">
                  The Transaction history is now cleaner with all credit and debit
                  related transactions from your apna account. To view your future
                  payment-related information and invoices, go to{" "}
                  <a href="#" className="font-bold">
                    Billing
                  </a>{" "}
                  section.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mt-4">
            <nav className="-mb-px flex">
              <a
                href="#"
                className="border-b-2 border-indigo-500 py-4 px-1 text-sm font-medium text-indigo-600"
              >
                Credits
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Previous coins
              </a>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default PackageDataTable;
