import React from 'react';
import DynamicButton from './DynamicButton';
import {useNavigate} from '@remix-run/react';

const DynamicTitle = ({title, title2, dynamicButton,text,setOrderHisory,className}) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="flex justify-center items-center sm:mt-[2.5rem] sm:mb-[3rem] mt-[1rem] mb-[1rem]">
      <div className="grid items-center w-full">
        {dynamicButton && (
          <div>
            <DynamicButton
              className="bg-[#EF6E6E]  md:text-[15px] text-[11px]   w-full sm:max-w-[130px] max-w-[95px]"
              text={text ? text : "Go Back"}
              backArrow={true}
            onClickFunction={()=>{
              goBack() 
            }}
            />
          </div>
        )}
        <div className="flex items-center justify-center w-full sm:mt-0 mt-[10px]">
        <h2 className={`titleImage md:text-[30px] text-[28px] font-bold text-[#001a5f] font-karla leading-[100%] pb-[10px] ${className} `}>            
        {title}
            <span className="font-beauty text-[60px] md:text-[70px] lg:text-[80px] ">
              {title2}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default DynamicTitle;
