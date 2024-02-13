import React from 'react';

function CardComponent({ imgSrc, title, description, buttonText, showDownloadButton, onDownload, onClick, downloadButtonText }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <img
        src={imgSrc}
        className="w-[48px] h-[48px]"
        alt="send-card"
      />
      <div className="flex flex-col gap-[12px]">
        <h4 className="text-[16px] text-[#191919] leading-[22px] font-medium">
          {title}
        </h4>
        <p className="text-[14px] text-[#191919] leading-[22px] font-medium">
          {description}
        </p>
        {showDownloadButton && (
          <p className="text-[#265594] cursor-pointer text-[14px] leading-[22px] font-normal underline" onClick={onDownload}>
            {downloadButtonText}
          </p>
        )}
      </div>
      <button onClick={onClick} className="flex bg-[#192C6A] mt-auto text-white items-center justify-center w-full max-w-[100px] p-[10px] gap-[10px] rounded-[8px]">
        {buttonText}
      </button>
    </div>
  );
}

export default CardComponent;
