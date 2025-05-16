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

          if (response.data && response.data.data) {
            setLocations(response.data?.data?.location_names || []); // Ensure it's an array
            setShowDropdown(true);
          } else {
            setLocations([]); // Reset locations if data is missing
            setShowDropdown(false);
          }
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
    setValue("location_name", value); // Update the form value with consistent field name
  };

  const handleSelect = (location) => {
    setQuery(location);
    setValue("location_name", location); // Update the form value with consistent field name
    setShowDropdown(false);
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label htmlFor="location">Location</label>
      <input
        {...register("location_name")}
        type="text"
        id="location"
        name="location_name"
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