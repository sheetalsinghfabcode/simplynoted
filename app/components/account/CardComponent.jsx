import React from 'react';

function CardComponent({ imgSrc, title, description, buttonText, showDownloadButton, onDownload, onClick, downloadButtonText,showBorder=true }) {
  return (
    <div className="flex flex-col items-center md:items-start sm:pt-[0px] pt-[20px] flex-1 gap-[12px] justify-center relative">
    <img
      src={imgSrc}
      className="w-[48px] h-[48px]"
      alt="send-card"
    />
    <div className="flex flex-col items-center md:items-start max-w-[182px] gap-[12px]">
      <h4 className="text-[16px] text-[#191919] leading-[22px] font-medium">
        {title}
      </h4>
      <p className="text-[14px] text-center md:text-start text-[#191919] leading-[22px] font-medium">
        {description}
      </p>
      {showDownloadButton && (
        <p className="text-[#265594] cursor-pointer text-[14px] leading-[22px] font-normal underline" onClick={onDownload}>
          {downloadButtonText}
        </p>
      )}
    </div>

    {showBorder &&
    <div className="hidden xl:block absolute h-[calc(100%-60px)] right-0 top-[30px]  w-[1px] bg-[#DDDDDD]"/>}

    <button onClick={onClick} className="flex bg-[#192C6A] hover:bg-[#EF6E6E] mt-auto text-white items-center justify-center w-full max-w-[100px] p-[10px] gap-[10px] rounded-[8px]">
      <span className='text-[14px]  leading-[22px] font-semibold'>{buttonText}</span>
    </button>
  </div>
  
  );
}

export default CardComponent;
