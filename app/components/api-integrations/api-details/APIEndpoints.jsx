import { SERVER_BASE_URL } from "~/data/config";

const APIEndpoints = () => {
  return (
    <div className="">
      <h2 className="text-[#001a5f] mt-[37px] font-tiempos  font-bold ml-2 sm:text-[33px] text-[20px]">
        <span className="text-blue-500"> 1.</span> API ENDPOINTS
      </h2>
      <div className="text-[16px] leading-[27px] overflow-x-auto color-[black]">
        <p className=" mb-[7px] ml-[8px] font-thin mt-[23px]">
          The production API can be found at {" "}
          <a
            className="text-blue-500"
            href="https://hydrogen-simplynoted.vercel.app/pages/api-automation"
          >
            {`${SERVER_BASE_URL}/api`}
          </a>
        </p>
        <p className=" ml-[8px] font-thin mt-[20px] mb-[7px]">
          The test API can be found at
          <a
            className="text-blue-500"
            href="https://hydrogen-simplynoted.vercel.app/pages/api-automation"
          >
            <span className="text-red">
              {' '}
              https://testapi.simplynoted.com/api
            </span>
          </a>
        </p>
        <p className=" mt-[19px] font-thin ml-[8px]">
          All endpoints listed in this documentation refer to those base URLs
          and build off them. For example, the orders endpoint "/orders" can be
          found at the endpoint:{' '}
          <a
            className="text-blue-500"
            href="https://hydrogen-simplynoted.vercel.app/pages/api-automation"
          >
            {`${SERVER_BASE_URL}/api/orders`}
          </a>
        </p>
      </div>
    </div>
  );
};

export default APIEndpoints;
