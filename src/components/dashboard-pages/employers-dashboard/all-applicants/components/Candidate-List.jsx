import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CandidateCard from "./Candidate-card"

const CandidateList = ({ data, isLoading, isError, activeTab, onShortlistReject, onSave, onReview }) => {
  const navigate = useNavigate()

  const handleMessage = (jobSeekerId, firstName, lastName) => {
    try {
      navigate(`/messages/${jobSeekerId}`, {
        state: {
          jobSeekerId,
          recipientName: `${firstName} ${lastName}`,
        },
      })
    } catch (error) {
      toast.error("Failed to open messaging interface")
    }
  }

  if (isLoading) return <p className="text-center py-4">Loading...</p>
  if (isError) return <p className="text-center py-4 text-red-500">Error loading candidates</p>
  if (!data.length) return <p className="text-center py-4">No candidates found.</p>

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <CandidateCard
          key={index}
          candidate={item.jobskkers_detail}
          onShortlistReject={onShortlistReject}
          onSave={onSave}
          onReview={onReview}
          onMessage={handleMessage}
        />
      ))}
    </div>
  )
}

export default CandidateList

