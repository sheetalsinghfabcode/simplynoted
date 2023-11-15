import React from 'react';

const CircularLoader = ({ color,title }) => {

  return (
    <div className="flex flex-col gap-[8px] justify-center items-center ">
        <span>{title}</span>
    <div className="custom-spinner border-4 border-t-4 border-gray-200 rounded-full h-12 w-12 mb-4" style={{ borderTopColor: color }}></div>
  </div>
  );
};

export default CircularLoader;
