import React, { useState } from 'react';

const SalarySection = () => {
  const [salaryType, setSalaryType] = useState('per_annum');
  const [formData, setFormData] = useState({
    min_salary: '',
    max_salary: '',
    hide_salary: false,
    salary_type: '',
  });
  const [errors, setErrors] = useState({});

  const minimumSalaries = {
    per_annum: 8000,
    per_day: 30,
    per_hour: 5
  };

  const handleSalaryTypeChange = (e) => {
    const newType = e.target.value;
    setSalaryType(newType);
    setFormData(prev => ({
      ...prev,
      min_salary: '',
      max_salary: ''
    }));
    setErrors({});
  };

  const validateSalary = (value, type) => {
    if (!value) return 'Salary is required';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    
    if (numValue < minimumSalaries[type]) {
      return `Minimum salary for ${type === 'per_annum' ? 'annual' : type === 'per_day' ? 'daily' : 'hourly'} rate must be £${minimumSalaries[type].toLocaleString()}`;
    }
    
    return '';
  };

  const handleFormChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    
    if (name === 'min_salary' || name === 'max_salary') {
      // Allow only numbers and decimal point
      const sanitizedValue = value.replace(/[^0-9.]/g, '');
      
      // Validate salary
      if (name === 'min_salary') {
        const error = validateSalary(sanitizedValue, salaryType);
        setErrors(prev => ({
          ...prev,
          min_salary: error
        }));
      }

      // Validate max salary is greater than min salary
      if (name === 'max_salary' && formData.min_salary) {
        const maxVal = parseFloat(sanitizedValue);
        const minVal = parseFloat(formData.min_salary);
        
        if (!isNaN(maxVal) && !isNaN(minVal) && maxVal <= minVal) {
          setErrors(prev => ({
            ...prev,
            max_salary: 'Maximum salary must be greater than minimum salary'
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            max_salary: ''
          }));
        }
      }

      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: inputType === 'checkbox' ? checked : value
      }));
    }
  };

  const salaryTypes = [
    { id: 'per_annum', name: 'Per annum' },
    { id: 'per_day', name: 'Per day' },
    { id: 'per_hour', name: 'Per hour' }
  ];

  return (
    <div className="w-full  bg-white p-6 rounded-lg shadow-sm mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Salary Details</h2>
      
      <div className="mb-6">
        <div className="flex gap-6">
          {salaryTypes.map((type) => (
            <label key={type.id} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="salary_type"
                value={type.id}
                checked={salaryType === type.id}
                onChange={handleSalaryTypeChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                {type.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Salary
          </label>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
              <span className="text-gray-500 font-medium">£</span>
            </div>
            <input
              type="text"
              name="min_salary"
              value={formData.min_salary}
              onChange={handleFormChange}
              className={`block w-full pl-8 p-2.5 border ${
                errors.min_salary 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } rounded-md shadow-sm focus:outline-none`}
              placeholder={`Min ${minimumSalaries[salaryType].toLocaleString()}`}
            />
          </div>
          {errors.min_salary && (
            <p className="mt-1.5 text-sm text-red-600 font-medium">
              {errors.min_salary}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Salary <span className="text-gray-500">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
              <span className="text-gray-500 font-medium">£</span>
            </div>
            <input
              type="text"
              name="max_salary"
              value={formData.max_salary}
              onChange={handleFormChange}
              className={`block w-full pl-8 p-2.5 border ${
                errors.max_salary 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } rounded-md shadow-sm focus:outline-none`}
              placeholder="Enter maximum salary"
            />
          </div>
          {errors.max_salary && (
            <p className="mt-1.5 text-sm text-red-600 font-medium">
              {errors.max_salary}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            name="hide_salary"
            checked={formData.hide_salary}
            onChange={handleFormChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
            Hide salary on job advert
          </span>
        </label>
      </div>
    </div>
  );
};

export default SalarySection;