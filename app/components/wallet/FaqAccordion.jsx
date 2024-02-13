import {useState} from 'react';

function FaqAccordion({title, children, className, accordion = false}) {
  const [isExpanded, setIsExpanded] = useState(accordion);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center cursor-pointer w-full min-h-[40px] border-b-2 border-solid border-[#e6edf8] uppercase py-[5px] ${className}`}
        onClick={toggleAccordion}
      >
        <span className="text-[17px] font-kaa text-black font-bold ">
          {title}
        </span>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      <div className="border-b border-solid border-blue-500"></div>

      {isExpanded && <div className="bg-white ">{children}</div>}
    </div>
  );
}

export default FaqAccordion;
