import {useState} from 'react';
import arrowdown from '../../assets/Image/arrow-down.png';

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
        <span className="lg:text-[16px] text-[13px] font-karla text-[#001a5f] !font-bold uppercase">
          {title}
        </span>
        <img
          className={`w-[12px] h-[12px] transform -translate-y-1/2 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          src={arrowdown}
        />
      </div>
      <div
        className={`overflow-hidden  ${
          isExpanded ? 'max-h-screen transition-max-h duration-800 ease-in-out' : 'transition-max-h max-h-0'
        }`}
      >
        <div className="bg-white border-b-2 border-solid border-[#e6edf8] p-[8px] border border-solid border-[#e6edf8]">{children}</div>
      </div>
    </div>
  );
}

export default WalletAccordion;
