import React, { useState } from 'react';

const CustomDropdown = ({ id, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="h-[40px] highlight-none bg-white flex items-center justify-between  px-4 cursor-pointer font-bold text-[14px] rounded border-0 border-black w-full font-inter text-sm text-[#737373]"
          id={id}
          onClick={toggleDropdown}
        >
          {value}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={id}
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <div
                key={index}
                style={option?.style}
                className={`block px-4 py-2 ${option?.className}  text-sm text-gray-700 hover:bg-gray-100 cursor-pointer`}
                onClick={() => handleOptionClick(option.value)}
                role="menuitem"
              >
                {option?.label}
              </div>
            ))}
          
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
