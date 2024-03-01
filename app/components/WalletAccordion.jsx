import {useState} from 'react';
import { IoIosArrowDown } from "react-icons/io";

function WalletAccordion({title, children, className,  accordion = false}) {
  const [isExpanded, setIsExpanded] = useState(accordion);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className="w-full">
      <div
        className={`flex justify-between mt-[8px] items-center cursor-pointer w-full min-h-[40px] border-b-2 border-solid border-[#e6edf8] uppercase py-[5px] ${className}`}
        onClick={toggleAccordion}
      >
        <span className="lg:text-[16px] text-[15px] font-karla text-[#001a5f] font-bold uppercase">
          {title}
        </span>
        <span className="flex justify-center mr-[20px]">
        <IoIosArrowDown className={`relative text-[16px] icon-transition transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </span>
      </div>
      <div
        className={`overflow-hidden  transition-max-height ${
          isExpanded ? 'max-h-[1000px] ' : 'max-h-0 closing'
        }`}
      >
        <div className="bg-white border-b-2 border-solid border-[#e6edf8] p-[8px] border ">{children}</div>
      </div>
    </div>
  );
}

export default WalletAccordion;
