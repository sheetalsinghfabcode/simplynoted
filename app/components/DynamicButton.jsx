import React from 'react';

const DynamicButton = ({ className, text, onClickFunction,disabled }) => {
  return (
    <button
      onClick={onClickFunction}
      className={`text-white font-bold py-2 px-4 rounded tracking-[1px] focus:outline-none focus:shadow-outline ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default DynamicButton;

