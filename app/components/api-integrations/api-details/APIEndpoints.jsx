import React from 'react';

const APIEndpoints = () => {
  return (
    <div>
      <h2 className="text-[#001a5f] font-tiempos  font-bold ml-2 text-[33px]">
        <span className="text-blue-500"> 1.</span> API ENDPOINTS
      </h2>
      <div className="text-[16px] leading-[27px] color-[black]">
        <p className=" mb-[7px] ml-[8px] font-thin mt-[23px]">
          The production API can be found at:{' '}
          <a
            className="text-blue-500"
            href="https://simplynoted.com/pages/api-automation"
          >
            https://api.simplynoted.com/api
          </a>
        </p>
        <p className=" ml-[8px] font-thin mt-[20px] mb-[7px]">
          The test API can be found at:
          <a
            className="text-blue-500"
            href="https://api.simplynoted.com/api "
          >
            <span className="text-red">
              https://api.simplynoted.com/api
            </span>
          </a>
        </p>
        <p className=" mt-[19px] font-thin ml-[8px]">
          All endpoints listed in this documentation refer to those base URLs
          and build off them. For example, the orders endpoint "/orders" can be
          found at the endpoint:{' '}
          <a
            className="text-blue-500"
            href="https://api.simplynoted.com/api/orders"
          >
            https://api.simplynoted.com/api/orders
          </a>
        </p>
      </div>
    </div>
  );
};

export default APIEndpoints;
