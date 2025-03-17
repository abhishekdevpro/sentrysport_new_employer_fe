// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LocationSelector = ({ setFormValues }) => {
//   const [query, setQuery] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       if (query && query.length > 1) {
//         try {
//           const response = await axios.get(
//             `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${query}`
//           );
//           setLocations(response.data.location_names);
//           setShowDropdown(true);
//         } catch (error) {
//           console.error("Error fetching locations:", error);
//           setLocations([]);
//           setShowDropdown(false);
//         }
//       } else {
//         setLocations([]);
//         setShowDropdown(false);
//       }
//     };

//     // Add a slight delay to avoid making API calls on every keystroke
//     const timeoutId = setTimeout(() => {
//       fetchLocations();
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//   };

//   const handleSelect = (location) => {
//     setQuery(location);
//     setFormValues((prev) => ({ ...prev, location: location }));
//     setShowDropdown(false);
//   };

//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label htmlFor="location">Location</label>
//       <input
//         type="text"
//         id="location"
//         name="location"
//         required
//         value={query}
//         onChange={handleInputChange}
//         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
//         placeholder="Type a location"
//         autoComplete="off"
//       />
//       {showDropdown && locations.length > 0 && (
//         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
//           {locations.map((location, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelect(location)}
//               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//             >
//               {location}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LocationSelector = ({ setFormValues,register }) => {
//   const [query, setQuery] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       if (query && query.length > 1) {
//         try {
//           const response = await axios.get(
//             `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${query}`
//           );
//           // The API returns an array of location strings, not objects
//           setLocations(response.data.data.location_names);
//           setShowDropdown(true);
//         } catch (error) {
//           console.error("Error fetching locations:", error);
//           setLocations([]);
//           setShowDropdown(false);
//         }
//       } else {
//         setLocations([]);
//         setShowDropdown(false);
//       }
//     };

//     // Add a slight delay to avoid making API calls on every keystroke
//     const timeoutId = setTimeout(() => {
//       fetchLocations();
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
    
//   };

//   const handleSelect = (location) => {
//     setQuery(location);
    
//     setFormValues((prev) => ({ ...prev, location: location }));
//     setShowDropdown(false);
//   };

//   return (
//     <div className="form-group col-lg-12 col-md-12 font-light">
//       <label htmlFor="location">Location</label>
//       <input
//        {...register("location", { required: "Location is required" })}
//         type="text"
//         id="location"
//         name="location"
//         required
//         value={query}
//         onChange={handleInputChange}
//         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
//         placeholder="Enter Your Location"
//         autoComplete="off"
//       />
//       {showDropdown && locations.length > 0 && (
//         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md absolute z-10 w-full">
//           {locations.map((location, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelect(location)}
//               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//             >
//               {location}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;
import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = ({ register, setValue, defaultLocation }) => {
  const [query, setQuery] = useState(defaultLocation || "");
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Initialize with the default location if provided
  useEffect(() => {
    if (defaultLocation && defaultLocation !== query) {
      setQuery(defaultLocation);
    }
  }, [defaultLocation]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query && query.length > 1) {
        try {
          const response = await axios.get(
            `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${query}`
          );
          // The API returns an array of location strings, not objects
          setLocations(response.data.data.location_names);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocations([]);
          setShowDropdown(false);
        }
      } else {
        setLocations([]);
        setShowDropdown(false);
      }
    };
    // Add a slight delay to avoid making API calls on every keystroke
    const timeoutId = setTimeout(() => {
      fetchLocations();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setValue("location", value); // Update the form value
  };

  const handleSelect = (location) => {
    setQuery(location);
    setValue("location", location); // Update the form value
    setShowDropdown(false);
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label htmlFor="location">Location</label>
      <input
        {...register("location_name", { required: "Location is required" })}
        type="text"
        id="location"
        name="location"
        required
        value={query}
        onChange={handleInputChange}
        className="border font-normal rounded-none mb-4 w-full px-2 py-1"
        placeholder="Enter Your Location"
        autoComplete="off"
      />
      {showDropdown && locations.length > 0 && (
        <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md absolute z-10 w-full">
          {locations.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelect(location)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;