import React, { useState } from "react";

const SearchResumePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    
        
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full ">
      <button  onClick={onClose} className="font-bold absolute right-96 top-20 bg-white p-3 px-4  border rounded-full"> X</button>
      <h2 className="text-2xl font-bold text-center">Search Resume</h2>
        <p className="text-center">Find from Best Talent Pool</p>
        <br/>

     <div className="flex justify-around">
     <div className="">
      

      <p>Source the Best Management Professionals quickly<br/> with our Premium Search Tool</p>
      <br/>
      <p className="text-xs my-2">✔️ 4 out 5 candidates from IIMs are registered with us</p>
      <p className="text-xs mb-2"> ✔️ Search using smart search filters</p>
      <p className="text-xs">✔️ Instantly connect with your preferred candidate</p>
      
<div className="w-96 h-0.5 bg-gray-300 mt-5"></div>

      <h3 className="my-4 font-semibold">Share below details</h3>
    
      <select className="border p-1 mt-1 w-96 rounded-2xl">
        <option value="">Select Company Size</option>
        <option value="small">1-50 Employees</option>
        <option value="medium">51-200 Employees</option>
        <option value="large">201+ Employees</option>
      </select>

      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-3 rounded-3xl font-semibold w-96" onClick={onClose}>
          Request a Callback
        </button>
      </div>
     </div>

      <div className="">
        <img src="" className="h-80  border"/>
        <p className="text-xs">Connect with us at:</p>
        <p className="text-xs">sales@Abrodium.com</p>
        <p className="text-xs">Toll Free No.: 1800-103-7344</p>
      </div>
     </div>
      </div>
    </div>
  );
};

export default SearchResumePopup;
