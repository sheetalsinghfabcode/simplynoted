import React from 'react';
import DynamicButton from './DynamicButton';
import {useNavigate} from '@remix-run/react';

const DynamicTitle = ({title, title2, dynamicButton,text,setOrderHisory}) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="flex justify-center items-center mt-[2.5rem] mb-[3rem]">
      <div className="flex items-center w-full">
        {dynamicButton && (
          <div>
            <DynamicButton
              className="bg-[#EF6E6E]  md:text-[15px] text-[11px]   w-full max-w-[150px]"
              text={text ? text : "Go Back"}
              backArrow={true}
            onClickFunction={()=>{
              goBack() 
            }}
            />
          </div>
        )}
        <div className="flex items-center justify-center w-full">
        <h2 className="titleImage text-[20px] md:text-[35px] lg:text-[50px] font-bold text-[#001a5f] font-karla leading-[100%] pb-[10px]">            
        {title}
            <span className="font-beauty text-[35px] md:text-[50px] lg:text-[80px] ">
              {title2}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default DynamicTitle;
