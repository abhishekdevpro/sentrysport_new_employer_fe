"use client"
import { Link } from "react-router-dom"
import moment from "moment"

const CandidateCard = ({ candidate, onShortlistReject, onSave, onReview, onMessage }) => {
  return (
    <div className="bg-blue-50 shadow-md rounded-md py-4 mb-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-2 md:px-4 lg:px-10 w-full gap-4">
        {/* Profile and Details */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <img
            src={`https://api.sentryspot.co.uk${candidate?.photo}`}
            alt="Profile"
            className="rounded-full h-20 w-20 object-cover"
          />
          <Link to={`/applicants/${candidate?.id}`}>
            <div>
              <h3 className="font-semibold text-lg">
                {candidate?.first_name} {candidate?.last_name}
              </h3>
              <p className="text-gray-500">
                Experience: 2y 9m <br />
                Location: {candidate?.cities?.name}, {candidate?.states?.name}, {candidate?.countries?.name}
              </p>
              <p className="text-gray-500">
                Applied on: {moment(candidate?.created_at).format("MMM Do YYYY")} <br />
                Notice Period: 1 month
              </p>
              <p className="text-blue-700 cursor-pointer hover:text-blue-900">Cover letter</p>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="w-full lg:w-auto min-w-[200px]">
          <div className="flex gap-2">
            <button
              className={`px-4 py-1 rounded-lg w-1/2 ${
                candidate?.job_seeker_shortlisted === 0
                  ? "bg-blue-700 text-white hover:bg-blue-900"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              onClick={() => onShortlistReject(candidate?.id, 1, 0)}
              disabled={candidate?.job_seeker_shortlisted !== 0}
            >
              {candidate?.job_seeker_shortlisted === 0 ? "Shortlist" : "Shortlisted"}
            </button>
            <button
              className={`px-4 py-1 rounded-lg w-1/2 ${
                candidate?.job_seeker_rejected === 0
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              onClick={() => onShortlistReject(candidate?.id, 0, 1)}
              disabled={candidate?.job_seeker_rejected !== 0}
            >
              {candidate?.job_seeker_rejected === 0 ? "Reject" : "Rejected"}
            </button>
          </div>

          {/* Message Button */}
          <button
            onClick={() => onMessage(candidate?.id, candidate?.first_name, candidate?.last_name)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg w-full my-2"
          >
            Message
          </button>

          <button
            onClick={() => onSave(candidate?.id)}
            className={`${
              candidate?.job_seeker_fav_id === 0 ? "bg-blue-700 hover:bg-blue-900" : "bg-gray-400"
            } text-white px-4 py-1 rounded-lg w-full my-2`}
            disabled={candidate?.job_seeker_fav_id !== 0}
          >
            {candidate?.job_seeker_fav_id === 0 ? "Save" : "Saved"}
          </button>

          <button
            className="bg-white border border-blue-900 text-blue-900 w-full px-4 py-1 rounded-lg hover:bg-blue-50"
            onClick={() => onReview(candidate?.id)}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard

