import React, { useId } from 'react';

const SelectInput = React.forwardRef(function SelectInput({
  label,
  options = [],
  className = "",
  error,
  placeholder,
  valueProperty = "id",
  textProperty = "name",
  ...props
}, ref) {
  const id = useId();
  
  return (
    <div className='w-full flex flex-col gap-2'>
      {label && (
        <label
          className='text-sm font-medium text-gray-700'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      
      <select
        className={`border text-black border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        ref={ref}
        {...props}
        id={id}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        
        {options.map((option) => (
          <option 
            key={option[valueProperty]} 
            value={option[valueProperty]}
          >
            {option[textProperty]}
          </option>
        ))}
      </select>
      
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
});

export default SelectInput;