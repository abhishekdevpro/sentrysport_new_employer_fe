import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, MapPin, DollarSign, FileText, Calendar, Award } from 'lucide-react';

const ApplicantDetails = () => {
  const { id } = useParams(); // Get the applicant's ID from the URL
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await fetch(`https://api.sentryspot.co.uk/api/employeer/job-seekers/${id}`);
        const data = await response.json();
        setApplicant(data.data.jobskkers_detail);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchApplicantData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading applicant data...</p>
        </div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Applicant Not Found</h2>
          <p className="mt-2 text-gray-600">We couldn't find the applicant details you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6">
        {/* Header Section with Profile Summary */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-3xl font-bold">{`${applicant.first_name} ${applicant.last_name}`}</h1>
                <p className="text-lg text-blue-100 mt-1">{applicant.proffesional_title || 'Applicant'}</p>
                <div className="flex items-center mt-3 text-sm">
                  <MapPin size={16} className="mr-1" />
                  <span>{applicant.cities.name}, {applicant.states.name || 'State Not Available'}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    src={applicant.photo ? `https://api.sentryspot.co.uk${applicant.photo}` : '/api/placeholder/150/150'}
                    alt={`${applicant.first_name} ${applicant.last_name}`}
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm">
              <Mail className="text-blue-600" size={18} />
              <span className="text-gray-700">{applicant.email || 'Email not provided'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm">
              <Phone className="text-blue-600" size={18} />
              <span className="text-gray-700">{applicant.phone || 'Phone not provided'}</span>
            </div>
            {applicant.resume_file_path && (
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm">
                <FileText className="text-blue-600" size={18} />
                <a 
                  href={applicant.resume_file_path} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="mr-2 text-blue-600" />
                About Candidate
              </h2>
              <div className="prose max-w-none text-gray-600">
                {applicant.description ? (
                  <p>{applicant.description}</p>
                ) : (
                  <p className="italic text-gray-400">No description provided</p>
                )}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="mr-2 text-blue-600" />
                Experience
              </h2>
              <div className="flex items-center">
                <Calendar className="mr-2 text-blue-600" size={20} />
                <div>
                  <span className="font-medium text-gray-800">
                    {Math.floor(applicant.experience_in_month / 12)} years, {applicant.experience_in_month % 12} months
                  </span>
                  <p className="text-sm text-gray-500">Total Professional Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Additional Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="mr-2 text-blue-600" />
                Candidate Details
              </h2>
              
              <div className="space-y-4">
                {/* Salary Information */}
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-medium text-gray-500">Current Salary</h3>
                  <div className="flex items-center mt-1">
                    <DollarSign className="mr-1 text-green-600" size={16} />
                    <span className="text-gray-800 font-medium">
                      {applicant.current_salary || 'Not provided'}
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-medium text-gray-500">Expected Salary</h3>
                  <div className="flex items-center mt-1">
                    <DollarSign className="mr-1 text-green-600" size={16} />
                    <span className="text-gray-800 font-medium">
                      {applicant.expected_salary || 'Not provided'}
                    </span>
                  </div>
                </div>
                
                {/* Location Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="mr-1 text-blue-600" size={16} />
                    <span className="text-gray-800">
                      {applicant.cities.name}, {applicant.states.name || 'State Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md transition-colors">
                Contact Candidate
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 py-3 rounded-lg font-medium shadow-sm transition-colors">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;