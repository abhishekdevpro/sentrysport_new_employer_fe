import React, { useState } from 'react';

const ScreeningQuestionsForm = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const questionTypes = [
    "Multi choice",
    "Single choice",
    "Yes / No Question",
    "Short Answer"
  ];

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

    const handleSubmit = () => {
      const newQuestion = {
        type: questionType,
        mandatory,
        questionText,
        options: questionType.includes("choice") ? options : []
      };
      setQuestions([...questions, newQuestion]);
      setShowForm(false);
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          {/* Question Type Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border border-gray-300 rounded-md px-4 py-2 w-48 text-left flex justify-between items-center"
            >
              {questionType}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="absolute z-10 w-48 bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                {questionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setQuestionType(type);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mandatory Toggle */}
          <div className="flex items-center">
            <span className="mr-2">Mandatory</span>
            <button
              onClick={() => setMandatory(!mandatory)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mandatory ? 'bg-violet-500' : 'bg-gray-200'
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
          <label className="block mb-2">Question Text*</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
            placeholder="What would you like to ask?"
          />
        </div>

        {/* Options (for Multi/Single choice) */}
        {questionType.includes("choice") && (
          <div className="mb-4">
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <button
              onClick={handleAddOption}
              className="text-violet-500 hover:text-violet-600"
            >
              Add option
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
          >
            Add
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-600 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="form-group col-lg-12 col-md-12 my-3">
      <label htmlFor="email">Add Screening Questions</label>
      <br />
      <div className="text-sm text-gray-600">
        Candidates will be asked to answer these question before they submit
        their application. You can add up to 10 questions.
      </div>
      <br />
      {!showForm && questions.length < 10 && (
        <button
          onClick={() => setShowForm(true)}
          className="border border-violet-500 rounded-md py-2 px-4  text-violet-500 hover:bg-violet-50"
        >
          Add Question
        </button>
      )}
      
      {showForm && <QuestionForm />}
      
      {/* Display added questions */}
      {questions.map((question, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{question.type}</span>
            <span className={question.mandatory ? "text-violet-500" : "text-gray-500"}>
              {question.mandatory ? "Mandatory" : "Optional"}
            </span>
          </div>
          <p>{question.questionText}</p>
          {question.options.length > 0 && (
            <ul className="mt-2">
              {question.options.map((option, idx) => (
                <li key={idx} className="ml-4">• {option}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScreeningQuestionsForm;