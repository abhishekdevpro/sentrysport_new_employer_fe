// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TitleAutocomplete = () => {
//   const [query, setQuery] = useState(""); // Stores user input
//   const [titles, setTitles] = useState([]); // Stores job titles
//   const [filteredTitles, setFilteredTitles] = useState([]); // Stores filtered titles
//   const [showDropdown, setShowDropdown] = useState(false); // Toggles dropdown visibility

//   useEffect(() => {
//     const fetchTitles = async () => {
//       try {
//         const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-title");
//         setTitles(response.data.data); // Assuming API returns an array of objects with "id" and "name"
//       } catch (error) {
//         console.error("Error fetching job titles:", error);
//       }
//     };

//     fetchTitles();
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     // Filter titles based on the query
//     if (value.trim()) {
//       const results = titles.filter((title) =>
//         title.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredTitles(results);
//       setShowDropdown(true);
//     } else {
//       setFilteredTitles([]);
//       setShowDropdown(false);
//     }
//   };

//   const handleSelect = (title) => {
//     setQuery(title.name); // Update input with selected title
//     setShowDropdown(false); // Close dropdown
//   };

//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label htmlFor="job-title">Designation </label>
//       <input
//         type="text"
//         id="job-title"
//         name="job_title"
//         required
//         value={query}
//         onChange={handleInputChange}
//         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
//         placeholder="Type a job title"
//         autoComplete="off"
//       />
//       {showDropdown && filteredTitles.length > 0 && (
//         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
//           {filteredTitles.map((title) => (
//             <li
//               key={title.id}
//               onClick={() => handleSelect(title)}
//               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//             >
//               {title.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TitleAutocomplete;

// const TitleAutocomplete = ({ setFormValues }) => {
//   const [query, setQuery] = useState("");
//   const [titles, setTitles] = useState([]);
//   const [filteredTitles, setFilteredTitles] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const fetchTitles = async () => {
//       try {
//         const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-title");
//         setTitles(response.data.data);
//       } catch (error) {
//         console.error("Error fetching job titles:", error);
//       }
//     };

//     fetchTitles();
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.trim()) {
//       const results = titles.filter((title) =>
//         title.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredTitles(results);
//       setShowDropdown(true);
//     } else {
//       setFilteredTitles([]);
//       setShowDropdown(false);
//     }
//   };

//   const handleSelect = (title) => {
//     setQuery(title.name);
//     setFormValues((prev) => ({ ...prev, designation: title.name })); // Update designation
//     setShowDropdown(false);
//   };

//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label htmlFor="job-title">Designation</label>
//       <input
//         type="text"
//         id="job-title"
//         name="job_title"
//         required
//         value={query}
//         onChange={handleInputChange}
//         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
//         placeholder="Type a job title"
//         autoComplete="off"
//       />
//       {showDropdown && filteredTitles.length > 0 && (
//         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
//           {filteredTitles.map((title) => (
//             <li
//               key={title.id}
//               onClick={() => handleSelect(title)}
//               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//             >
//               {title.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TitleAutocomplete;
import React, { useState, useEffect } from "react";
import axios from "axios";

const TitleAutocomplete = ({ register, setValue, defaultValue }) => {
  const [query, setQuery] = useState(defaultValue || "");
  const [titles, setTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Initialize with the default value if provided
  useEffect(() => {
    if (defaultValue && defaultValue !== query) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-title");
        setTitles(response.data.data);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };

    fetchTitles();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setValue("designation", value); // Update the form value

    if (value.trim()) {
      const results = titles.filter((title) =>
        title.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTitles(results);
      setShowDropdown(true);
    } else {
      setFilteredTitles([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (title) => {
    setQuery(title.name);
    setValue("designation", title.name); // Update the form value
    setShowDropdown(false);
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label htmlFor="designation">Designation</label>
      <input
        {...register("designation")}
        type="text"
        id="designation"
        name="designation"
        value={query}
        onChange={handleInputChange}
        className="border font-normal rounded-none mb-4 w-full px-2 py-1"
        placeholder="Type a job title"
        autoComplete="off"
      />
      {showDropdown && filteredTitles.length > 0 && (
        <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md absolute z-10 w-full">
          {filteredTitles.map((title) => (
            <li
              key={title.id}
              onClick={() => handleSelect(title)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {title.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TitleAutocomplete;