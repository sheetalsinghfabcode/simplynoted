import React, { useState } from 'react';

function WalletAccordion({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div
        className="flex justify-between items-center cursor-pointer w-full min-h-[40px] uppercase py-[5px] "
        onClick={toggleAccordion}
      >
        <span className="text-[17px] font-kaa text-[#001a5f] !font-bold uppercase pl-4">
          {title}
        </span>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <div className="bg-white p-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default WalletAccordion;
