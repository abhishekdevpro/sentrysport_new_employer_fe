

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Input from "@/UI-Components/Input";
import debounce from "lodash/debounce";

const TitleAutocomplete = ({ register, setValue, defaultValue }) => {
  const [query, setQuery] = useState(defaultValue || "");
  const [titles, setTitles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Initialize with defaultValue when it changes
  useEffect(() => {
    if (defaultValue && defaultValue !== query) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  // Debounced API fetch
  const fetchTitles = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm.trim()) {
        setTitles([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(searchTerm)}`
        );
        setTitles(response.data.data || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    }, 500), // 500ms debounce
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setValue("designation", value); // update react-hook-form value
    fetchTitles(value); // call debounced API
  };

  const handleSelect = (title) => {
    setQuery(title.name);
    setValue("designation", title.name);
    setShowDropdown(false);
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light relative">
      <Input
        label="Designation"
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

      {showDropdown && titles.length > 0 && (
        <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md absolute z-10 w-full">
          {titles.map((title) => (
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


// TODO

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import Input from "@/UI-Components/Input";
// import debounce from "lodash/debounce";
// import { useFormContext } from "react-hook-form";

// const TitleAutocomplete = ({ name = "job_title", defaultValue = "" }) => {
//   const { setValue, watch } = useFormContext();
//   const currentValue = watch(name) || "";

//   const [query, setQuery] = useState(defaultValue || currentValue);
//   const [titles, setTitles] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Sync query when form value changes
//   useEffect(() => {
//     if (currentValue !== query) {
//       setQuery(currentValue);
//     }
//   }, [currentValue]);

//   // Debounced API fetch
//   const fetchTitles = useCallback(
//     debounce(async (searchTerm) => {
//       if (!searchTerm.trim()) {
//         setTitles([]);
//         setShowDropdown(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(searchTerm)}`
//         );
//         setTitles(response.data.data || []);
//         setShowDropdown(true);
//       } catch (error) {
//         console.error("Error fetching job titles:", error);
//       }
//     }, 500),
//     []
//   );

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setValue(name, value); // update react-hook-form value
//     fetchTitles(value);
//   };

//   const handleSelect = (title) => {
//     setQuery(title.name);
//     setValue(name, title.name);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="w-full font-light relative">
//       <Input
//         label="Job Title"
//         name={name}
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Type a job title"
//         autoComplete="off"
//       />

//       {showDropdown && titles.length > 0 && (
//         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md absolute z-10 w-full">
//           {titles.map((title) => (
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
