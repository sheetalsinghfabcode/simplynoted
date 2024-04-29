
import React from 'react';

const CustomDropdown = ({ options, value, onChange }) => {
  const renderOptions = (options) => {
    return options.map((option, index) => {
      if (Array.isArray(option)) {
        // Render nested options
        return (
          <optgroup key={index} className='text-[16px]' label={option.label}>
            {option.map((nestedOption, nestedIndex) => (
              <option
                key={nestedIndex}
                style={nestedOption.style ? nestedOption.style : {fontSize:"16px"}}
                className={`${nestedOption.className}`}
                value={nestedOption.value}
              >
                {nestedOption.label}
              </option>
            ))}
          </optgroup>
        );
      } else {
        // Render regular options
        return (
          <option
            key={index}
            style={option.style}
            className={`${option.className}`}
            value={option.value}
          >
            {option.label}
          </option>
        );
      }
    });
  };

  return (
    <div className="relative">
      <select
        className="appearance-none h-[40px] highlight-none cursor-pointer font-bold text-[14px] rounded border-0 border-black w-full font-inter text-sm text-[#737373]"
        value={value}
        onChange={onChange}
      >
        {renderOptions(options)}
      </select>
    </div>
  );
};

export default CustomDropdown;
