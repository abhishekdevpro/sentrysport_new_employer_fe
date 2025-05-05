"use client"

const MainTabs = ({ activeTab, setActiveTab, applicationCount }) => {
  const tabs = [
    { id: "recommended", label: "Recommended Candidates", count: applicationCount },
    { id: "applications", label: "Applications", count: applicationCount },
  ]

  return (
    <div className="border-b border-gray-300 flex flex-col justify-start items-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`text-base lg:text-lg font-medium pb-2 whitespace-nowrap ${
            activeTab === tab.id ? "border-b-2 border-blue-700 text-blue-900" : "text-gray-500"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  )
}

export default MainTabs

