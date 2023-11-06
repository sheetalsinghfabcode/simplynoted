import React from 'react';

const DynamicButton = ({ className, text, onClickFunction,disabled,type}) => {
  return (
    <button
      onClick={onClickFunction}
      disabled={disabled}
      type={type}
      className={`text-white font-bold py-2 px-4 rounded tracking-[1px] focus:outline-none focus:shadow-outline ${className}`}
    >
      {text}
    </button>
  );
};

export default DynamicButton;

