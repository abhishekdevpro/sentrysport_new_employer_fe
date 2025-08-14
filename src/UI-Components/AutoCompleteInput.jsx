import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import Input from "@/UI-Components/Input";

const AutocompleteInput = ({
  label,
  name,
  defaultValue = "",
  apiUrl,
  dataExtractor,
  onSelectFormat,
  register,
  setValue,
  minChars = 1
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Keep query in sync with defaultValue
  useEffect(() => {
    if (defaultValue && defaultValue !== query) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  // Debounced API fetch
  const fetchItems = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm || searchTerm.length < minChars) {
        setItems([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get(
          typeof apiUrl === "function" ? apiUrl(searchTerm) : apiUrl
        );
        const list = dataExtractor(response);
        setItems(list);
        setShowDropdown(list.length > 0);
      } catch (error) {
        console.error(`Error fetching data for ${label}:`, error);
        setItems([]);
        setShowDropdown(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setValue(name, value);
    fetchItems(value);
  };

  const handleSelect = (item) => {
    const formattedValue = onSelectFormat(item);
    setQuery(formattedValue);
    setValue(name, formattedValue);
    setShowDropdown(false);
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light relative">
      <Input
        label={label}
        {...register(name)}
        type="text"
        id={name}
        name={name}
        value={query}
        onChange={handleInputChange}
        className="border rounded-none mb-4 w-full px-2 py-1"
        placeholder={`Enter ${label}`}
        autoComplete="off"
      />
      {showDropdown && items.length > 0 && (
        <ul className="border app-light-bg mt-1 max-h-48 overflow-y-auto rounded-md shadow-md absolute z-10 w-full">
          {items.map((item, index) => (
            <li
              key={item.id || index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {onSelectFormat(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
