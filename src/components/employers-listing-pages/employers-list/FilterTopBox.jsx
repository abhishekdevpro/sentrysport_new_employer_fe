
import React, { useState } from 'react';

 const FilterTopBox = () => {
  const [activeTab, setActiveTab] = useState('applications'); // Set default tab


  return (
    <div className="p-2   bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">React JS Developer - Javascript/Redux</h1>
          <p className="text-gray-600">Jaipur • 0 - 1 yrs • Job Code: 1377021</p>
        </div>
        <div className="flex space-x-4">
          
          <select className='bg-white border text-black border-black px-2 py-2 rounded-sm hover:bg-gray-100'>
            <option> Default Calendar</option>
          </select>
          <select className='bg-white border text-black border-black px-2 py-2 rounded-sm hover:bg-gray-100'>
            <option> Set Default Assessment</option>
          </select>
          <select className='bg-white border text-black border-black px-2 py-2 rounded-sm hover:bg-gray-100'>
            <option>   Make Premium</option>
          </select>
         
        </div>
      </div>

      {/* Auto Interview Scheduler */}
      <div className="flex items-center mb-4 space-x-4">
        <div className="text-violet-600">Auto Interview Scheduler: ✔️  Enabled</div>
        <div>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-1">
            <option>Face To Face</option>
            <option>Online</option>
            <option>Phone</option>
          </select>
        </div>
        <button className="text-red-500">Disable</button>
      </div>

      <div className='border p-3 bg-white'>
{/* Tabs for Recommended Candidates and Applications */}
<div className="border-b border-gray-300  flex space-x-6 mb-6">
        <button
          onClick={() => setActiveTab('recommended')}
          className={`text-lg font-medium pb-2 ${
            activeTab === 'recommended' ? 'border-b-2 border-violet-500 text-violet-600' : 'text-gray-500'
          }`}
        >
          Recommended Candidates (0)
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`text-lg font-medium pb-2 ${
            activeTab === 'applications' ? 'border-b-2 border-violet-500 text-violet-600' : 'text-gray-500'
          }`}
        >
          Applications (2)
        </button>
      </div>

      {/* Content for Active Tab */}
      {activeTab === 'recommended' ? (
        <div>
          {/* Recommended Candidates List */}
          <p className="text-center text-gray-500">No recommended candidates available.</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search keyword or candidates"
            className="border border-black  px-4 py-2 w-80 "
          />
         
          <button className="bg-white border text-black border-black px-4 py-1 rounded-sm hover:bg-gray-100">
          Filter
          </button>
          <select className="bg-white border border-black text-black px-2 py-1 rounded-sm hover:bg-gray-100">
            <option> Magic Sort (Relevance)</option>
          </select>
          
          <select className="bg-white border border-black text-black px-2 py-2 rounded-sm hover:bg-gray-100">
            <option> Diversity Candidates</option>
          </select>
          
          <select className="bg-white border border-black text-black px-2 py-2 rounded-sm hover:bg-gray-100">
            <option> All Candidates</option>
          </select>
         
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex space-x-6 mb-6">
        <button className="text-gray-500 pb-2 border-b-2 border-green-500">All (2)</button>
        <button className="text-gray-500 pb-2">Unread (2)</button>
        <button className="text-gray-500 pb-2">Reviewed (20)</button>
        <button className="text-gray-500 pb-2">Shortlisted (1)</button>
        <button className="text-gray-500 pb-2">Rejected (5)</button>
        <button className="text-gray-500 pb-2">Saved (1)</button>
      </div>

      {/* Candidate Card 1 */}
      <div className="bg-white shadow-md rounded-md p-4  mb-4">
        <div className="flex justify-between items-center px-10">
          {/* Profile and Details */}
          <div className="flex space-x-4 gap-16">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="rounded-full h-20 w-20"
            />
            <div>
              <h3 className="font-semibold text-lg">abhinav</h3>
              <p className="text-gray-500">Experience: 2y 9m <br/> Location: Delhi</p>
              <p className="text-gray-500">Applied on: 01-05-2024  <br/> Notice Period: 1 month</p>
              <p className="text-blue-500 cursor-pointer">Cover letter</p>
            </div>
         
            <div className='w-44'>
              <h3 className="font-semibold text-sm"> Redcliffe Life science pvt. Ltd</h3>
              <p className="text-gray-500 text-xs">software developer May, 2022 to Present</p><br/>
              <h3 className="font-semibold text-sm"> Mogli labs India Pvt. Ltd.</h3>
              <p className="text-gray-500 text-xs">UI Developer Dec, 2021 to Present</p>
            
            </div>
            <div className='w-44'>
            <h3 className="font-semibold text-sm">Integral University, Lucknow</h3>
            <p className="text-gray-500 text-xs">software developer May, 2022 to Present</p>
              <p className="text-gray-500 text-xs">BCA (Full Time), 2018 to 2021</p>
           
            </div>
          </div>

          {/* Action Buttons */}
          <div className="">
           <div className='flex gap-2'>
           <button className="bg-green-700 text-white px-4 py-1 rounded-md hover:bg-green-500">
              Shortlist
            </button>
            <button className="bg-red-800 text-white px-4 py-1 rounded-md hover:bg-red-500">
              Reject
            </button>
            </div>
            <button className="bg-transparent my-3 border w-full border-green-500 text-green-500 px-4 py-1 rounded-md hover:bg-green-100">
              Call
            </button><br/>
            <button className="bg-white border w-full border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100">
              Other Actions
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Card 2 */}
      <div className="bg-white shadow-md rounded-md p-4  mb-4">
        <div className="flex justify-between items-center px-10">
          {/* Profile and Details */}
          <div className="flex space-x-4 gap-16">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="rounded-full h-20 w-20"
            />
            <div>
              <h3 className="font-semibold text-lg">Suraj Barole</h3>
              <p className="text-gray-500">Experience: 2y 9m <br/> Location: Delhi</p>
              <p className="text-gray-500">Applied on: 01-05-2024  <br/> Notice Period: 1 month</p>
              <p className="text-blue-500 cursor-pointer">Cover letter</p>
            </div>
         
            <div className='w-44'>
              <h3 className="font-semibold text-sm"> Redcliffe Life science pvt. Ltd</h3>
              <p className="text-gray-500 text-xs">software developer May, 2022 to Present</p><br/>
              <h3 className="font-semibold text-sm"> Mogli labs India Pvt. Ltd.</h3>
              <p className="text-gray-500 text-xs">UI Developer Dec, 2021 to Present</p>
            
            </div>
            <div className='w-44'>
            <h3 className="font-semibold text-sm">Integral University, Lucknow</h3>
            <p className="text-gray-500 text-xs">software developer May, 2022 to Present</p>
              <p className="text-gray-500 text-xs">BCA (Full Time), 2018 to 2021</p>
           
            </div>
          </div>

          {/* Action Buttons */}
          <div className="">
           <div className='flex gap-2'>
           <button className="bg-green-700 text-white px-4 py-1 rounded-md hover:bg-green-500">
              Shortlist
            </button>
            <button className="bg-red-800 text-white px-4 py-1 rounded-md hover:bg-red-500">
              Reject
            </button>
            </div>
            <button className="bg-transparent my-3 border w-full border-green-500 text-green-500 px-4 py-1 rounded-md hover:bg-green-100">
              Call
            </button><br/>
            <button className="bg-white border w-full border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100">
              Other Actions
            </button>
          </div>
        </div>
      </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default FilterTopBox