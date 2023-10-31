import DynamicButton from '../../components/DynamicButton';
import {useState, useEffect} from 'react';
import {Link} from '../../components/Link';
import { useNavigate} from '@remix-run/react';

const data = [
  {
    feature: 'Discounts / Savings',
  },
  {
    feature: 'Reccomended for',
  },
  {
    feature: 'Global Leading Technology',
  },
  {
    feature: 'Send 1',
  },
  {
    feature: 'Send 1,000s',
  },
  {
    feature: 'Schedule Sends',
  },
  {
    feature: 'Custom Card Creator',
  },
  {
    feature: 'Birthday & Anniversary Automation',
  },
  {
    feature: 'Note Only Option (Built In)',
  },
  {
    feature: 'Gift Cards',
  },
  {
    feature: 'QR Codes',
  },
  {
    feature: 'API',
  },
  {
    feature: 'A.I. Message Builder',
  },
  {
    feature: 'U.S. & International Shipping',
  },
  {
    feature: 'Drop Shipping (Back to You)',
  },
  {
    feature: 'Zapier',
  },
  {
    feature: 'Priority Production',
  },
  {
    feature: 'Affiliate Program',
  },
  {
    feature: 'Dedicated Full Time Account Manager',
  },
  {
    feature: 'Custom Inserts (Personal Items)',
  },
  {
    feature: 'Custom Handwriting Conversion',
  },
  {
    feature: 'Custom Signature Conversion',
  },
  {
    feature: 'Dedicated Account Manager',
  },
  {
    feature: 'Agency & Reseller',
  },
  {
    feature: '3PL Support',
  },
  {
    feature: 'Lowest Pricing',
  },
];

const WalletTable = ({pricePerCard, setWalletPlan,stripeCollection}) => {

  console.log("wallet components stripeCollection",stripeCollection)
 
  const getSubscriptionType = (stripeCollection) => {
    if (stripeCollection) {
      const subscription = stripeCollection.stripe?.subscription || "free";
      if (subscription === "team") {
        return "team";
      } else if (subscription === "business") {
        return "business";
      }
    }
    return "free";
  };


  const navigate = useNavigate();
  
  const subscriptionType = getSubscriptionType(stripeCollection);
  const subscribeTeam = subscriptionType === "team";
  const subscribeBusiness = subscriptionType === "business";
  const subscribeFree = subscriptionType === "free";
  
  
  return (
  <div>
    <div className="w-full  max-w-[1366px] p-[20px] mx-auto">
      <h2 className='text-[50px] leading-[130%] my-[10px] text-center font-semibold text-[#1b5299]'>Simply Noted Plan</h2>
      <table className="mx-auto table bg-white  ">
        <thead>
          <tr className="h-[190px] flex">
            <th className="flex flex-col invisible py-[10px] px-[20px]">
              <span className="text-[18px] text-[#000] uppercase">Free</span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                As low as
              </span>
              <span className="text-[36px] font-bold text-[#000]">
                {pricePerCard[0]}
              </span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                per card
              </span>
            </th>
            <th className="flex flex-col py-[10px] px-[20px]">
              <span className="text-[18px] text-[#000] uppercase">Free</span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                As low as
              </span>
              <span className="text-[36px] font-bold text-[#000]">
                {pricePerCard[0]}
              </span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                per card
              </span>
              {subscribeFree && (
                <DynamicButton
                  onClickFunction={() => setWalletPlan(true)}
                  className="bg-[#1b5299] mt-[10px] whitespace-nowrap rounded-[100px]  h-[60px] w-full xl:min-w-[180px] max-w-[200px]"
                  text="Purchase Package"
                />
              )}
            </th>
            <th className="flex flex-col py-[10px] px-[20px]">
              <span className="text-[18px] text-[#000] uppercase">Team</span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                As low as
              </span>
              <span className="text-[36px] font-bold text-[#000]">
                {pricePerCard[1]}
              </span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                per card
              </span>
              {!subscribeBusiness && (
                <DynamicButton
                  onClickFunction={() => setWalletPlan(true)}
                  className={` ${subscribeTeam ?  "bg-[#1b5299]" :"bg-[#ef6e6e]"}  mt-[10px] whitespace-nowrap rounded-[100px]  h-[60px] w-full xl:min-w-[180px] max-w-[200px]`}
                  text={subscribeTeam ? 'Purchase Package' : 'Upgrade'}
                />
              )}
            </th>
            <th className="flex flex-col py-[10px] px-[20px]">
              <span className="text-[18px] text-[#000] uppercase">
                BUSINESS
              </span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                As low as
              </span>
              <span className="text-[36px] font-bold text-[#000]">
                {pricePerCard[2]}
              </span>
              <span className="text-[14px] text-[#000] leading-[150%]">
                per card
              </span>
              <DynamicButton
                onClickFunction={() => setWalletPlan(true)}
                className={`  ${subscribeBusiness ?  "bg-[#1b5299]" :"bg-[#ef6e6e]"}  mt-[10px] whitespace-nowrap rounded-[100px]  h-[60px] w-full xl:min-w-[180px] max-w-[200px]`}
                text={subscribeBusiness ? 'Purchase Package' : 'Upgrade'}
              />
            </th>
            <th className="flex flex-col py-[10px] px-[20px]">
              <span className="text-[18px] text-[#000] uppercase">
                ENTERPRISE
              </span>
              <span className="text-[14px] text-[#000] opacity-0 leading-[150%]">
                As low as
              </span>
              <span className="text-[36px] font-normal text-[#000]">
                Contact Us
              </span>
              <span className="text-[14px] text-[#000] opacity-0 leading-[150%]">
                per card
              </span>
              <DynamicButton
                onClickFunction={() => window.open("https://meetings.hubspot.com/rick24",
                "_blank")}
                className="bg-[#ef6e6e] mt-[10px] whitespace-nowrap rounded-[100px]  h-[60px] w-full xl:min-w-[180px] max-w-[200px]"
                text="Contact Us"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="flex justify-end gap-[159px]" key={index}>
              <td className=" text-[#001a5f] text-[14px]">{item.feature}</td>
              <td>
                {index < 10 ? (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941"
                    className="w-[18px] h-[16px]"
                  />
                ) : (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149"
                    className="w-[18px] h-[16px]"
                  />
                )}
              </td>
              <td>
                {index < 15 ? (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941"
                    className="w-[18px] h-[16px]"
                  />
                ) : (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149"
                    className="w-[18px] h-[16px]"
                  />
                )}
              </td>
              <td>
                {index < 20 ? (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941"
                    className="w-[18px] h-[16px]"
                  />
                ) : (
                  <img
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149"
                    className="w-[18px] h-[16px]"
                  />
                )}
              </td>
              <td>
                <img
                  src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941"
                  className="w-[18px] h-[16px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default WalletTable;
