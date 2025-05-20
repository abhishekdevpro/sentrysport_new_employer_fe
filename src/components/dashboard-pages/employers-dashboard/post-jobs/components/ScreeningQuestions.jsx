import React, { useState, useEffect, useRef } from 'react';

const ScreeningQuestionsForm = ({ onQuestionsChange = () => {} }) => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const dropdownRef = useRef(null);

  const questionTypes = [
    "Multi choice",
    "Single choice",
    "Yes / No Question",
    "Short Answer"
  ];

  // Notify parent component when questions change
  useEffect(() => {
    if (typeof onQuestionsChange === 'function') {
      const formattedQuestions = questions.map(q => ({
        question: q.questionText,
        type: q.type,
        mandatory: q.mandatory,
        options: q.options || []
      }));
      console.log('ScreeningQuestions - Sending to parent:', formattedQuestions);
      onQuestionsChange(formattedQuestions);
    }
  }, [questions, onQuestionsChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const QuestionForm = () => {
    const [questionType, setQuestionType] = useState(questionTypes[0]);
    const [mandatory, setMandatory] = useState(false);
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleAddOption = () => {
      setOptions([...options, ""]);
    };

    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    };

    const handleQuestionTextChange = (e) => {
      setQuestionText(e.target.value);
    };

    const handleSubmit = () => {
      if (!questionText.trim()) {
        alert("Please enter a question text");
        return;
      }

      if (questionType.includes("choice") && options.filter(opt => opt.trim() !== "").length < 2) {
        alert("Please add at least two options for choice questions");
        return;
      }

      const newQuestion = {
        type: questionType,
        mandatory,
        questionText,
        options: questionType.includes("choice") ? options.filter(opt => opt.trim() !== "") : []
      };
      setQuestions([...questions, newQuestion]);
      setShowForm(false);
      // Reset form
      setQuestionType(questionTypes[0]);
      setMandatory(false);
      setQuestionText("");
      setOptions(["", ""]);
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4 mt-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          {/* Question Type Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border border-gray-300 rounded-md px-4 py-2 w-48 text-left flex justify-between items-center bg-white hover:bg-gray-50"
            >
              <span>{questionType}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="absolute z-10 w-48 bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                {questionTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setQuestionType(type);
                      setDropdownOpen(false);
                      // Reset options if switching to non-choice type
                      if (!type.includes("choice")) {
                        setOptions([]);
                      } else if (options.length === 0) {
                        setOptions(["", ""]);
                      }
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mandatory Toggle */}
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Mandatory</span>
            <button
              type="button"
              onClick={() => setMandatory(!mandatory)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mandatory ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  mandatory ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Question Text*</label>
          <textarea
            value={questionText}
            onChange={handleQuestionTextChange}
            className="w-full border border-gray-300 rounded-md p-2 min-h-[100px] focus:ring-blue-500 focus:border-blue-500 resize-y"
            placeholder="What would you like to ask?"
            style={{ minHeight: '100px' }}
          />
        </div>

        {/* Options (for Multi/Single choice) */}
        {questionType.includes("choice") && (
          <div className="mb-4">
            {options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add option
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 text-sm font-medium"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-600 px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!showForm && questions.length < 10 && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Question
        </button>
      )}
      
      {showForm && <QuestionForm />}
      
      {/* Display added questions */}
      {questions.length > 0 && (
        <div className="mt-6 space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm text-gray-700">{question.type}</span>
                <span className={`text-sm ${question.mandatory ? "text-blue-600" : "text-gray-500"}`}>
                  {question.mandatory ? "Mandatory" : "Optional"}
                </span>
              </div>
              <p className="text-gray-800">{question.questionText}</p>
              {question.options.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {question.options.map((option, idx) => (
                    <li key={idx} className="ml-4 text-sm text-gray-600">• {option}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScreeningQuestionsForm;