import {useState} from 'react';
import arrowdown from '../../assets/Image/arrow-down.png';

function WalletAccordion({title, children,className, accordion = false}) {
  const [isExpanded, setIsExpanded] = useState(accordion);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div
        className={`flex justify-between items-center cursor-pointer w-full min-h-[40px] uppercase py-[5px] ${className}`}
        onClick={toggleAccordion}
      >
         <span className="lg:text-[18px] text-[13px] font-karla text-[#001a5f] !font-bold uppercase pl-4">
          {title}
        </span>
        <img
          className={`w-[12px] h-[12px] transform -translate-y-1/2 ${ isExpanded ? 'rotate-180' : '' }`}
          src={arrowdown}
        />
      </div>
      {isExpanded && <div className="bg-white p-2">{children}</div>}
    </div>
  );
}

export default WalletAccordion;
