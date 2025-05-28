import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, MapPin, DollarSign, FileText, Calendar, Award, GraduationCap, Brain, Star, CheckCircle, XCircle } from 'lucide-react';

const ApplicantDetails = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await fetch(`https://api.sentryspot.co.uk/api/jobseeker/public/user-profile/${id}`);
        const data = await response.json();
        setApplicant(data.data);
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

  if (!applicant || !applicant.personal_details) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Applicant Not Found</h2>
          <p className="mt-2 text-gray-600">We couldn't find the applicant details you're looking for.</p>
        </div>
      </div>
    );
  }

  const personalDetails = applicant.personal_details;
  const aiResumeData = personalDetails.ai_resume_parse_data;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6">
        {/* Header Section with Profile Summary */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-3xl font-bold">{`${personalDetails.first_name} ${personalDetails.last_name}`}</h1>
                <p className="text-lg text-blue-100 mt-1">{personalDetails.proffesional_title || 'Applicant'}</p>
                <div className="flex items-center mt-3 text-sm">
                  <MapPin size={16} className="mr-1" />
                  <span>{personalDetails.current_location || 'Location not specified'}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    src={personalDetails.photo ? `https://api.sentryspot.co.uk${personalDetails.photo}` : '/api/placeholder/150/150'}
                    alt={`${personalDetails.first_name} ${personalDetails.last_name}`}
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
              <span className="text-gray-700">{personalDetails.email || 'Email not provided'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm">
              <Phone className="text-blue-600" size={18} />
              <span className="text-gray-700">{personalDetails.phone || 'Phone not provided'}</span>
            </div>
            {personalDetails.resume && (
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm">
                <FileText className="text-blue-600" size={18} />
                <a 
                  href={personalDetails.resume} 
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
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="mr-2 text-blue-600" />
                About Candidate
              </h2>
              <div className="prose max-w-none text-gray-600">
                {personalDetails.description ? (
                  <p>{personalDetails.description}</p>
                ) : (
                  <p className="italic text-gray-400">No description provided</p>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <GraduationCap className="mr-2 text-blue-600" />
                Education
              </h2>
              {applicant.education_details && applicant.education_details.length > 0 ? (
                <div className="space-y-4">
                  {applicant.education_details.map((edu, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                      <h3 className="font-medium text-gray-800">{edu.degree || 'Degree not specified'}</h3>
                      <p className="text-sm text-gray-600">{edu.institution || 'Institution not specified'}</p>
                      <p className="text-sm text-gray-500">{edu.year || 'Year not specified'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-400">No education details provided</p>
              )}
            </div>

            {/* Professional Experience Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="mr-2 text-blue-600" />
                Professional Experience
              </h2>
              {applicant.professional_details && applicant.professional_details.length > 0 ? (
                <div className="space-y-4">
                  {applicant.professional_details.map((exp, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                      <h3 className="font-medium text-gray-800">{exp.job_title || 'Position not specified'}</h3>
                      <p className="text-sm text-gray-600">{exp.company || 'Company not specified'}</p>
                      <p className="text-sm text-gray-500">
                        {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : 'Start date not specified'} - 
                        {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{exp.description || 'No description provided'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-400">No professional experience provided</p>
              )}
            </div>

            {/* AI Resume Analysis Section */}
            {aiResumeData && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Brain className="mr-2 text-blue-600" />
                  AI Resume Analysis
                </h2>
                
                {/* Resume Strength */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Resume Strength</h3>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-2" size={20} />
                    <span className="text-gray-800">{aiResumeData.resume_strenght_details.resume_strenght || 'Not analyzed'}</span>
                  </div>
                </div>

                {/* ATS Analysis */}
                {aiResumeData.resume_strenght_details.ats_strenght && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">ATS Compatibility</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-600 w-40">ATS Score:</span>
                        <span className="text-gray-800">{aiResumeData.resume_strenght_details.ats_strenght.ats_friendly_score || 'N/A'}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-600">Formatting:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(aiResumeData.resume_strenght_details.ats_strenght.formatting).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                              {value ? <CheckCircle className="text-green-500 mr-1" size={16} /> : <XCircle className="text-red-500 mr-1" size={16} />}
                              <span className="text-sm text-gray-700">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {aiResumeData.resume_strenght_details.ats_strenght.areas_for_improvement && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600 mb-1">Areas for Improvement:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {Object.entries(aiResumeData.resume_strenght_details.ats_strenght.areas_for_improvement).map(([key, value]) => (
                              value && <li key={key}>{value}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills Analysis */}
                {aiResumeData.resume_strenght_details.Skills_strenght && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-600 w-40">Skills Score:</span>
                        <span className="text-gray-800">{aiResumeData.resume_strenght_details.skills_score || 'N/A'}</span>
                      </div>
                      {aiResumeData.resume_strenght_details.Skills_strenght.suggestions && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600 mb-1">Suggestions:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {aiResumeData.resume_strenght_details.Skills_strenght.suggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="mr-2 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-32">Job Seeker ID:</span>
                    <span className="text-gray-800">{personalDetails.job_seeker_uuid || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-32">Job Title:</span>
                    <span className="text-gray-800">{personalDetails.job_title || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-32">Languages:</span>
                    <span className="text-gray-800">{personalDetails.languages || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-32">Age:</span>
                    <span className="text-gray-800">{personalDetails.age || 'Not specified'}</span>
                  </div>
                </div>

                {/* Work Preferences */}
                {personalDetails.additional_info && (
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Work Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" checked={personalDetails.additional_info.willing_to_relocate} readOnly className="mr-2" />
                        <span className="text-sm text-gray-700">Willing to relocate</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked={personalDetails.additional_info.willingness_to_travel} readOnly className="mr-2" />
                        <span className="text-sm text-gray-700">Willing to travel</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked={personalDetails.additional_info.work_permit_usa} readOnly className="mr-2" />
                        <span className="text-sm text-gray-700">Has US work permit</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked={personalDetails.additional_info.is_veteran_or_ex_military} readOnly className="mr-2" />
                        <span className="text-sm text-gray-700">Veteran/Ex-Military</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked={personalDetails.additional_info.is_reasonable_adjustments} readOnly className="mr-2" />
                        <span className="text-sm text-gray-700">Needs reasonable adjustments</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Information */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
                  <div className="flex items-center">
                    <MapPin className="mr-1 text-blue-600" size={16} />
                    <span className="text-gray-800">
                      {personalDetails.current_location || 'Location not specified'}
                    </span>
                  </div>
                  {personalDetails.preferred_location && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">Preferred Location: </span>
                      <span className="text-gray-800">{personalDetails.preferred_location}</span>
                    </div>
                  )}
                </div>

                {/* Account Information */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Account Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-32">Account Status:</span>
                      <span className={`text-sm ${personalDetails.is_active ? 'text-green-600' : 'text-red-600'}`}>
                        {personalDetails.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-32">Plan:</span>
                      <span className="text-gray-800">{personalDetails.plan_name || 'No plan'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-32">Member Since:</span>
                      <span className="text-gray-800">
                        {personalDetails.created_at ? new Date(personalDetails.created_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
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