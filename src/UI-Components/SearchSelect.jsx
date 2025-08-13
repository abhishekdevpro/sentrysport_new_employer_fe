import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Input from "./Input";

const SearchSelect = ({
  label,
  placeholder,
  apiUrl,
  queryParam = "q",
  register,
  name,
  setValue,
  error,
  minLength = 2
}) => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOptions = async (term) => {
    if (term.length < minLength) {
      setOptions([]);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(apiUrl, {
        params: { [queryParam]: term }
      });
      console.log(data.data.location_names,"data from serch")
      setOptions(data.data ||data.data.location_names || []);
    } catch (err) {
      console.error("Error fetching options:", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchOptions, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedFetch(searchTerm);
    }
  }, [searchTerm, debouncedFetch]);

  const handleSelect = (value) => {
    setValue(name, value);
    setSearchTerm(value);
    setOptions([]);
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light relative">
      {/* {label && (
        <label className="app-text-label font-medium text-blue-900">
          {label}
        </label>
      )} */}

      <div className="relative">
        <Input
          label={label}
          type="text"
          placeholder={placeholder}
        //   className={`w-full border text-blue-900 border-blue-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        //     error ? "border-red-500 focus:ring-red-500" : ""
        //   }`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setValue(name, e.target.value); // Update form value
          }}
          // Spread register properties but override onChange and value
          {...register(name, {
            onChange: (e) => {
              setSearchTerm(e.target.value);
              setValue(name, e.target.value);
            },
            value: searchTerm,
          })}
        />

        {loading && (
          <p className="text-sm text-gray-400 mt-1">Loading...</p>
        )}

        {options.length > 0 && (
          <ul className="absolute w-full z-10 border border-blue-300 mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {options.map((option, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-blue-900"
                onClick={() => handleSelect(option.name || option)}
              >
                {option.name  || option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  );
};

export default SearchSelect;