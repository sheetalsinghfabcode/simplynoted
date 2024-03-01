import React, { useState, useEffect } from 'react';

const SuccessfullLoader = ({ successfullMessage, circle }) => {
  const [ellipsisVisible, setEllipsisVisible] = useState(true);
  const [message, setMessage] = useState(successfullMessage);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisVisible((prev) => !prev);
    }, 1000); // Toggle visibility every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessage(successfullMessage);
  }, [successfullMessage]);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
        <div className="content p-6 flex min-h-screen flex-col items-center justify-center rounded-lg">
          <>
            <h4
              className={`text-[24px] lg:text-[36px] text-white font-bold text-center fixed top-[15rem] md:top-[16rem] font-karla mb-6 transition-opacity duration-300 ${
                ellipsisVisible ? 'opacity-100' : 'opacity-0'
              }`}
             
            >
              {message}
              <span className="inline-block animate-bounce">...</span>
            </h4>

            {circle && (
              <svg className="mx-auto" width="250" height="250">
                <circle
                  fill="none"
                  stroke="#68E534"
                  strokeWidth="20"
                  cx="125"
                  cy="125"
                  r="115"
                  strokeLinecap="round"
                  transform="rotate(-90 125 125)"
                  className="circle"
                />
                <polyline
                  fill="none"
                  stroke="#68E534"
                  points="53,138 104,188 197,94"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tick"
                />
              </svg>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullLoader;
