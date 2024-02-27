import { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

function FaqAccordion({ title, children, className, accordion = false }) {
  const [isExpanded, setIsExpanded] = useState(accordion);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="faq-accordion">
      <div
        className={`cursor-pointer  min-h-[40px] ${className}`}
        onClick={toggleAccordion}
      >
        <div className='flex w-full justify-between gap-[10px] items-center font-karla py-[5px]'>
          <span className="md:text-[20px] sm:text-[15px] text-[13px] font-karla text-black font-bold">
            {title}
          </span>
          <span className="flex justify-center sm:mr-[20px] mr-2">
              <IoIosArrowForward className={`relative sm:text-[20px] text-[14px] icon-transition transform ${ isExpanded ? 'rotate-90' : ''} `} />
          </span>
        </div>
      </div>

      <div
          className={`overflow-hidden transition-max-height ${
            isExpanded ? 'max-h-[1000px] ' : 'max-h-0 closing'
          }`}
      >
        <div className="px-[1.5rem] py-5 bg-white sm:text-[14px] text-[12px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FaqAccordion;