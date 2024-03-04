import { useState, useEffect } from 'react';

const CircularLoader = ({ color = '#ef6e6e', title, height = '48px', width = '48px', textColor="" }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation(rotation => (rotation + 45) % 360);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-[48px] h-[48px] mb-2">
        <div
          className="absolute inset-0 flex items-center justify-center border-4 border-gray-200 rounded-full animate-spin"
          style={{
            borderTopColor: color,
            height,
            width,
            transform: `rotate(${rotation}deg)`
          }}
        ></div>
      </div>
      {title && (
        <h4 className={`text-lg ${textColor}   font-bold font-karla`}>{title}</h4>
      )}
    </div>
  );
};

export default CircularLoader;
