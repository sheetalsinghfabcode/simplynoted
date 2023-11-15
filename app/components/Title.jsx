import React from 'react';

const DynamicTitle = ({title,title2})=> {
    return(
        <div className="flex justify-center items-center mt-[2rem] mb-[4rem]">
            <h2 className="titleImage text-[20px] md:text=[35px] lg:text-[50px] font-bold text-[#001a5f] font-karla leading-[100%] pb-[10px]">
              {title}<span className='font-beauty text-[35px] md:text=[50px] lg:text-[80px] '>{title2}</span>
            </h2>
            
          </div>
    )
}
export default DynamicTitle