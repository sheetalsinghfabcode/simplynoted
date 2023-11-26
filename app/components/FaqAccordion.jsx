import {useState} from 'react';
import arrow_rights from '../../assets/Image/arrow-right-faq.png';
import arrow_down from '../../assets/Image/arrow-down.png';

function FaqAccordion({title, children, className, accordion = false}) {
  const [isExpanded, setIsExpanded] = useState(accordion);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mx-8 faq-accordion">
      <div
        className={`flex justify-between gap-[10px] items-center cursor-pointer w-full min-h-[40px] font-karla  py-[5px] ${className}`}
        onClick={toggleAccordion}
      >
        <span className="md:text-[20px] text-[15px] font-karla text-black !font-bold ">
          {title}
        </span>
        <span className="flex justify-center mr-[20px] mt-[-15px]">
          {isExpanded ? (
            <img
              className="sm:w-[1.2%] w-[2%] absolute"
              src={arrow_down}
              alt="arrow_down"
            />
          ) : (
            <img
              className="sm:w-[1.2%] w-[2%] absolute"
              src={arrow_rights}
              alt="right-arrow"
            />
          )}
        </span>
      </div>
      {isExpanded && (
        <div className="md:text-[16px] text-[12px] bg-white px-[1.3rem] pt-4 pb-5 faq-transition">
          {children}
        </div>
      )}
    </div>
  );
}

export default FaqAccordion;
