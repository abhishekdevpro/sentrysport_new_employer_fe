"use client"

const SearchFilters = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 mb-6">
      <input
        type="text"
        placeholder="Search keyword or candidates"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-blue-900 px-4 py-2 rounded-lg w-full lg:w-72"
      />
      <div className="flex flex-wrap gap-4">
        <button className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
          Filter
        </button>
        <select className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
          <option>Magic Sort (Relevance)</option>
        </select>
        <select className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
          <option>Diversity Candidates</option>
        </select>
        <select className="bg-white border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50">
          <option>All Candidates</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilters

