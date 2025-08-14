import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  error,
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
      
      <input
        type={type}
        className={`border text-blue-900 border-blue-300  px-3 py-4 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
});

export default Input;