import React from 'react';

const SuccessfullLoader = ({successfullMessage}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center  items-center bg-black bg-opacity-80 z-50">
      <div className="content   p-6 flex flex-col items-center justify-center rounded-lg shadow-xl">
        <h4 className="text-[16px] md:text-[24px] lg:text-[36px] text-white font-bold text-center font-karla mb-6">
          {successfullMessage}
        </h4>
        <svg className="mx-auto" width="300" height="300">
          <circle
            fill="none"
            stroke="#68E534"
            strokeWidth="20"
            cx="150"
            cy="150"
            r="140"
            strokeLinecap="round"
            transform="rotate(-90 150 150)"
            className="circle"
          />
          <polyline
            fill="none"
            stroke="#68E534"
            points="65,164 130,224 228,98"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tick"
          />
        </svg>
      </div>
    </div>
  );
};

export default SuccessfullLoader;
