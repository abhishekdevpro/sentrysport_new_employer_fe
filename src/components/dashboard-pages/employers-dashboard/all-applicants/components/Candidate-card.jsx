<<<<<<< HEAD
"use client"
import { Link } from "react-router-dom"
import moment from "moment"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Constant } from "@/utils/constant/constant"
import toast from "react-hot-toast"

const CandidateCard = ({ candidate, onShortlistReject, onSave, onReview, onMessage }) => {
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [message, setMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const { userInfo } = useSelector((state) => (state.auth))

  useEffect(() => {
    if (showMessageModal) {
      const ws = new WebSocket('wss://api.sentryspot.co.uk/ws')

      ws.onopen = () => {
        console.log('WebSocket connection opened')
      }

      ws.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data)
        console.log('Message received:', incomingMessage)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        toast.error('Failed to connect to messaging service')
      }

      ws.onclose = () => {
        console.log('WebSocket connection closed')
      }

      setSocket(ws)

      return () => {
        ws.close()
      }
    }
  }, [showMessageModal])

  const handleSendMessage = () => {
    if (message.trim() === '' || !userInfo?.id) {
      toast.error('Please enter a message')
      return
    }

    const data = {
      message: message,
      receiver_id: candidate?.id,
      sender_id: userInfo.id
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
      console.log('Message sent:', data)
      toast.success('Message sent successfully')
      setMessage("")
      setShowMessageModal(false)
    } else {
      console.error('WebSocket is not open')
      toast.error('Failed to send message. Please try again.')
    }
  }

  const handleShortlistReject = (id, shortlist, reject) => {
    onShortlistReject(id, shortlist, reject)
    if (shortlist === 1) {
      toast.success('Candidate shortlisted successfully')
    } else if (reject === 1) {
      toast.success('Candidate rejected successfully')
    }
  }

  const handleSave = (id) => {
    onSave(id)
    toast.success('Candidate saved successfully')
  }

  const handleReview = (id) => {
    onReview(id)
    toast('Opening candidate review', {
      icon: '📋',
    })
  }

  return (
    <>
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
                onClick={() => handleShortlistReject(candidate?.id, 1, 0)}
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
                onClick={() => handleShortlistReject(candidate?.id, 0, 1)}
                disabled={candidate?.job_seeker_rejected !== 0}
              >
                {candidate?.job_seeker_rejected === 0 ? "Reject" : "Rejected"}
              </button>
            </div>

            {/* Message Button */}
            <button
              onClick={() => setShowMessageModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg w-full my-2"
            >
              Message
            </button>

            <button
              onClick={() => handleSave(candidate?.id)}
              className={`${
                candidate?.job_seeker_fav_id === 0 ? "bg-blue-700 hover:bg-blue-900" : "bg-gray-400"
              } text-white px-4 py-1 rounded-lg w-full my-2`}
              disabled={candidate?.job_seeker_fav_id !== 0}
            >
              {candidate?.job_seeker_fav_id === 0 ? "Save" : "Saved"}
            </button>

            <button
              className="bg-white border border-blue-900 text-blue-900 w-full px-4 py-1 rounded-lg hover:bg-blue-50"
              onClick={() => handleReview(candidate?.id)}
            >
              Review
            </button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Message to {candidate?.first_name} {candidate?.last_name}
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your message here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CandidateCard

=======
"use client"
import { Link } from "react-router-dom"
import moment from "moment"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Constant } from "@/utils/constant/constant"

const CandidateCard = ({ candidate, onShortlistReject, onSave, onReview, onMessage }) => {
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [message, setMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const { userInfo } = useSelector((state) => (state.auth))

  useEffect(() => {
    if (showMessageModal) {
      const ws = new WebSocket('wss://api.sentryspot.co.uk/ws')

      ws.onopen = () => {
        console.log('WebSocket connection opened')
      }

      ws.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data)
        console.log('Message received:', incomingMessage)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      ws.onclose = () => {
        console.log('WebSocket connection closed')
      }

      setSocket(ws)

      return () => {
        ws.close()
      }
    }
  }, [showMessageModal])

  const handleSendMessage = () => {
    if (message.trim() === '' || !userInfo?.id) return

    const data = {
      message: message,
      receiver_id: candidate?.id,
      sender_id: userInfo.id
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
      console.log('Message sent:', data)
      setMessage("")
      setShowMessageModal(false)
    } else {
      console.error('WebSocket is not open')
    }
  }

  return (
    <>
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
              onClick={() => setShowMessageModal(true)}
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

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Message to {candidate?.first_name} {candidate?.last_name}
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your message here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CandidateCard

>>>>>>> f1e11fa754775f591e317ea543474d0206a0e978
