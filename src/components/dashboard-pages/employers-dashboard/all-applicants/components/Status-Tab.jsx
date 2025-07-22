// // "use client"

// // const StatusTabs = ({ activeTab, setActiveTab, counts }) => {
// //   const tabs = [
// //     { id: "all", label: "All" },
// //     { id: "unread", label: "Unread" },
// //     { id: "reviewed", label: "Reviewed" },
// //     { id: "shortlisted", label: "Shortlisted" },
// //     { id: "rejected", label: "Rejected" },
// //     { id: "saved", label: "Saved" },
// //   ]

// //   return (
// //     <div className="border-b border-gray-300 flex flex-nowrap overflow-x-auto space-x-6 mb-6">
// //       {tabs.map((tab) => (
// //         <button
// //           key={tab.id}
// //           onClick={() => setActiveTab(tab.id)}
// //           className={`text-sm font-medium pb-2 whitespace-nowrap ${
// //             activeTab === tab.id ? "border-b-2 border-blue-700 text-blue-900" : "text-gray-500"
// //           }`}
// //         >
// //           {tab.label} ({counts[tab.id] || 0})
// //         </button>
// //       ))}
// //     </div>
// //   )
// // }

// // export default StatusTabs

// const StatusTabs = ({ activeTab, setActiveTab, counts }) => {
//   const countBadges = [
//     { label: "All", key: "all" },
//     { label: "Reviewing", key: "review" },
//     { label: "Hold", key: "hold" },
//     { label: "Rejected", key: "reject" },
//     { label: "Shortlisted", key: "shortlist" },
//     { label: "Interviewing", key: "interview" },
//     { label: "Hired", key: "hired" },
//   ];

//   return (
//     <div className="border-b border-gray-300 flex flex-nowrap overflow-x-auto space-x-6 mb-6">
//       {countBadges.map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => setActiveTab(tab.key)}
//           className={`text-sm font-medium pb-2 whitespace-nowrap ${
//             activeTab === tab.key
//               ? "border-b-2 border-blue-700 text-blue-900"
//               : "text-gray-500"
//           }`}
//         >
//           {tab.label} ({counts?.[tab.key] || 0})
//         </button>
//       ))}
//     </div>
//   );
// };

// export default StatusTabs;


"use client";

const StatusTabs = ({ activeTab, setActiveTab, counts, countBadges }) => {
  return (
    <div className="border-b border-gray-300 flex flex-nowrap overflow-x-auto space-x-6 mb-6">
      {countBadges.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`text-sm font-medium pb-2 whitespace-nowrap ${
            activeTab === tab.key
              ? "border-b-2 border-blue-700 text-blue-900"
              : "text-gray-500"
          }`}
        >
          {tab.label} ({counts?.[tab.key] || 0})
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;

