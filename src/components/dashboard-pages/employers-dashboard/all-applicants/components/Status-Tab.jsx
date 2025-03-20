"use client"

const StatusTabs = ({ activeTab, setActiveTab, counts }) => {
  const tabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "reviewed", label: "Reviewed" },
    { id: "shortlisted", label: "Shortlisted" },
    { id: "rejected", label: "Rejected" },
    { id: "saved", label: "Saved" },
  ]

  return (
    <div className="border-b border-gray-300 flex flex-nowrap overflow-x-auto space-x-6 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`text-sm font-medium pb-2 whitespace-nowrap ${
            activeTab === tab.id ? "border-b-2 border-blue-700 text-blue-900" : "text-gray-500"
          }`}
        >
          {tab.label} ({counts[tab.id] || 0})
        </button>
      ))}
    </div>
  )
}

export default StatusTabs

