import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path as needed
import { LayoutGridIcon } from 'lucide-react';

export default function FilterTopBox() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Shortlisted & Saved Candidates</h1>
            
          </div>
          <div className='flex gap-4'>
            1 Candidates
          <select name="cars" id="cars">
  <option value="volvo">All Candidates</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>

<select name="cars" id="cars">
  <option value="volvo">All Jobs</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
             
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-500"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGb0KXZff72_aNYCOMxSo3wBXLUugcSQItw&s' className='w-20 rounded-full border' /></td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    <a href="#">React JS developer - Javascript/Redux</a>
                    <div className="text-sm text-gray-500">0 - 1 yrs • Jaipur</div>
                    <div className="text-sm text-gray-500">Auto Interview Scheduler: <span className="text-green-600">Enabled</span></div>
                    <a href="#" className="text-sm text-blue-600">View  Candidates</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>Leanpitch</div>
                    <div>Front End developer</div>
                    <div>March, 2021 to Present</div></td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>RVR & JC college of Engineering</div>
                    <div>B Tech / BE (Full Time)</div>
                    <div>2016 to 2020</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className=" rounded-lg border-2 text-center border-emerald-600 p-2 ">
                      Download Resume
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
     
      </div>
    </div>
  );
}

// Define the icon components
function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function DoorClosedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M12 4v16" />
      <path d="M6 8h6" />
      <path d="M6 12h6" />
      <path d="M6 16h6" />
    </svg>
  );
}

function FolderSyncIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 16l4-4-4-4" />
      <path d="M20 12H4" />
      <path d="M16 8l4 4-4 4" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 0-6 6v10H6V14h4v4a6 6 0 0 0 6-6V8h-4z" />
      <path d="M6 10h.01" />
      <path d="M12 12v4h4v-4h-4z" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5A8.5 8.5 0 1 0 12 3a8.5 8.5 0 0 0 9 8.5v7.7a1.3 1.3 0 0 1-1.3 1.3H4.3a1.3 1.3 0 0 1-1.3-1.3V11.5" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

