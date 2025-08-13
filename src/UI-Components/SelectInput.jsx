// import React, { useId } from 'react';
// import { ChevronDown } from 'lucide-react';

// const SelectInput = React.forwardRef(function SelectInput({
//   label,
//   options = [],
//   className = "",
//   error,
//   placeholder,
//   valueProperty = "id",
//   textProperty = "name",
//   ...props
// }, ref) {
//   const id = useId();
  
//   return (
//     <div className='w-full flex flex-col gap-2 mb-4'>
//       {label && (
//         <label
//           className='text-sm font-medium text-gray-700 mb-1'
//           htmlFor={id}
//         >
//           {label}
//         </label>
//       )}
      
//       <div className="relative">
//         <select
//           className={`w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
//           ref={ref}
//           {...props}
//           id={id}
//         >
//           {placeholder && (
//             <option value="" disabled>{placeholder}</option>
//           )}
          
//           {options.map((option) => (
//             <option
//               key={option[valueProperty]}
//               value={option[valueProperty]}
//             >
//               {option[textProperty]}
//             </option>
//           ))}
//         </select>
        
//         {/* Lucide icon for dropdown arrow */}
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//           <ChevronDown size={18} />
//         </div>
//       </div>
      
//       {error && (
//         <span className="text-red-500 text-sm mt-1">{error}</span>
//       )}
//     </div>
//   );
// });

// export default SelectInput;
import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

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
          className='app-text-label font-medium text-blue-900'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          className={`w-full appearance-none text-blue-900 border border-blue-300 rounded-none px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
          ref={ref}
          {...props}
          id={id}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
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
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-900">
          <ChevronDown size={18} />
        </div>
      </div>
      
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
});

export default SelectInput;