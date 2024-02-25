import React from 'react';

const SuccessfullLoader = ({ successfullMessage }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="content max-w-screen-lg w-5/6 p-6 flex flex-col items-center justify-center rounded-lg shadow-xl">
        <h4 className="text-[16px] md:text-[24px] lg:text-[36px] text-white font-bold text-center font-karla mb-6">{successfullMessage}</h4>
        <svg className='mx-auto' width="400" height="400">
          <circle
            fill="none"
            stroke="#68E534"
            strokeWidth="20"
            cx="200"
            cy="200"
            r="190"
            strokeLinecap="round"
            transform="rotate(-90 200 200)"
            className="circle"
          />
          <polyline
            fill="none"
            stroke="#68E534"
            points="88,214 173,284 304,138"
            strokeWidth="24"
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
