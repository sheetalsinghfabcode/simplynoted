import React from 'react';
import DynamicTitle from '~/components/Title';

const APIHeader = () => {
  return (
    <div className="sm:px-[40px] md:mt-[0px] my-[20px] px-[30px]">
      <div className="ml-[-22px]]">
        <DynamicTitle
          title="API Docs"
          className={' !text-[42px]'}
        />
      </div>
      <p className="text-[#001a5f] leading-[30px] max-w-[40rem]  font-bold mb-[28px] text-[21px] sm:text-center text-justify mx-auto">
        <div className="w-[100%]">
          <p>
            By using this API you will have full access to the same range of
            features found in our apps and website.
          </p>
        </div>
      </p>
    </div>
  );
};

export default APIHeader;
