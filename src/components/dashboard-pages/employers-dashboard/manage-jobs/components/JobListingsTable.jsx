import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FaDoorClosed, FaFacebook, FaFolder, FaLinkedinIn, FaPen, FaTrashAlt, FaCheckCircle, FaBan } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';
import moment from 'moment';

export default function JobListingsTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }

        const result = await response.json();
        setData(result.data || []); // Set the job array, default to an empty array
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  const handleEditClick = (id) => {
    setSelectedJobId(id);
    // setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJobId(null);
  };

  const handleDeleteJob = async () => {
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-post/${jobToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      toast.success('Job deleted successfully');
      // Re-fetch the job listings after successful deletion
      const updatedData = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
        headers: {
          Authorization: token,
        },
      }).then(res => res.json());

      setData(updatedData.data || []);
    } catch (error) {
      toast.error(error.message || 'Error deleting job');
    } finally {
      setShowDeleteConfirm(false);
      setJobToDelete(null);
    }
  };

  const confirmDeleteJob = (id) => {
    setJobToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handlePublishJob = async (id, currentStatus) => {
    const jobStatusId = currentStatus === 0 ? 1 : 0; // Toggle job_status_id (1 for publish, 0 for unpublish)
    try {
      const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-status/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_status_id: jobStatusId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${currentStatus === 0 ? 'publish' : 'unpublish'} job`);
      }

      toast.success(`Job ${currentStatus === 0 ? 'published' : 'unpublished'} successfully`);
      // Re-fetch the job listings after successful publish/unpublish
      const updatedData = await fetch("https://api.sentryspot.co.uk/api/employeer/job-post", {
        headers: {
          Authorization: token,
        },
      }).then(res => res.json());

      setData(updatedData.data || []);
    } catch (error) {
      toast.error(error.message || `Error ${currentStatus === 0 ? 'publishing' : 'unpublishing'} job`);
    }
  };

  const shareJob = (jobId) => {
    const jobUrl = `https://yourwebsite.com/job/${jobId}`; // Update with your actual job link
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;

    window.open(facebookShareUrl, '_blank');
    // Uncomment to share on LinkedIn
    // window.open(linkedinShareUrl, '_blank');
  };

  return (
    
    <div className="min-h-screen p-2 relative">
    <div className="flex flex-col lg:flex-row">
      <main className="flex-1 pe-2">
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
          <h1 className="text-2xl font-bold">Job Details</h1>
          <Link to={"/employers-dashboard/post-jobs"}>
            <Button className="bg-blue-900 text-white">Post Job</Button>
          </Link>
        </div>
         */}
        <div className="w-full overflow-x-auto border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="app-light-bg">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase whitespace-nowrap">CREATED ON</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">JOB TITLE</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ENGAGEMENT</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((job) => (
                  <tr key={job.job_detail.id}>
                    <td className="px-6 py-4 text-md text-black font-medium whitespace-nowrap">
                      {moment(job.job_detail.created_at).format("MMM Do YYYY")}
                    </td>
                    <td className="px-6 py-4 text-md font-medium text-green-600">
                      <a href="#">{job.job_detail.job_title || "N/A"}</a>
                      <div className="text-md text-gray-500">
                        {job.job_detail.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-md text-gray-500">
                      <p className='bg-pink-200 px-2 p-1 rounded-3xl text-center whitespace-nowrap'>
                        {job.job_detail.job_status_id === 1 ? `Published 🖋️` : `Unpublished 🖊`}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-md text-gray-700 whitespace-nowrap">
                      <div>4571 Views</div>
                      <Link to={"/employers-list"}>
                        <button className=' text-md underline text-blue-700'>2143 Applied</button>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-2">
                        <FaPen 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          // onClick={() => handleEditClick(job.job_detail.id)} 
                          onClick={()=>navigate(`/employers-dashboard/post-jobs/${job.job_detail.id}`)}
                        />
                        <FaTrashAlt 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => confirmDeleteJob(job.job_detail.id)} 
                        />
                        {job.job_detail.job_status_id === 0 ? (
                          <FaCheckCircle 
                            className="w-4 h-4 text-blue-700 cursor-pointer" 
                            onClick={() => handlePublishJob(job.job_detail.id, 0)} 
                          />
                        ) : (
                          <FaBan 
                            className="w-4 h-4 text-red-500 cursor-pointer" 
                            onClick={() => handlePublishJob(job.job_detail.id, 1)} 
                          />
                        )}
                        <FaLinkedinIn 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => shareJob(job.job_detail.id)} 
                        />
                        <FaFacebook 
                          className="w-4 h-4 text-blue-700 cursor-pointer" 
                          onClick={() => shareJob(job.job_detail.id)} 
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">
                    No job details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

       

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this job?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleDeleteJob} className="bg-red-600 text-white">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
  );
}


