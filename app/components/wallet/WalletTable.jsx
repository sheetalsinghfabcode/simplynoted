import DynamicButton from '../../components/DynamicButton';
import {useState, useEffect} from 'react';
import {Link} from '../../components/Link';
import {useNavigate} from '@remix-run/react';

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

const WalletTable = ({pricePerCard, setWalletPlan, stripeCollection}) => {
  const getSubscriptionType = (stripeCollection) => {
    if (stripeCollection && stripeCollection.stripe.subscriptionStatus !=="canceled") {
      const subscription = stripeCollection.stripe?.subscription || 'free';
      if (subscription === 'team') {
        return 'team';
      } else if (subscription === 'business') {
        return 'business';
      }
    }
    return 'free';
  };


  const navigate = useNavigate();

  const subscriptionType = getSubscriptionType(stripeCollection);
  const subscribeTeam = subscriptionType === 'team';
  const subscribeBusiness = subscriptionType === 'business';
  const subscribeFree = subscriptionType === 'free';

  const pricingPlans = [
    
    {
      name: 'Enterprise',
      price: 'Contact Us',
      buttonText: 'Contact Us',
      buttonColor: '#ef6e6e',
      onClick: () =>
        window.open('https://meetings.hubspot.com/rick24', '_blank'),
    },
    
    {
      name: 'Business',
      price: pricePerCard[2],
      buttonText: subscribeBusiness ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeBusiness ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
    },
    {
      name: 'Team',
      price: pricePerCard[1],
      buttonText: subscribeTeam ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeTeam ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
    },
    {
      name: 'Free',
      price: pricePerCard[0],
      buttonText: subscribeFree ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeFree ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
    },
  ];

  return (
    <div>
      <div className="w-full  max-w-[1366px] p-[20px] mx-auto">
        <h2 className="text-[50px] leading-[130%] my-[10px] text-center font-semibold text-[#1b5299]">
          Simply Noted Plan
        </h2>
        <table className="mx-auto table bg-white  ">
          <thead>
            <tr className="h-[190px] flex flex-row-reverse">
              {pricingPlans.map((plan, index) => {
                if (
                  (subscriptionType === 'business' && plan.name === 'Team') ||
                  (subscriptionType === 'business' && plan.name === 'Free') ||
                  (subscriptionType === 'team' && plan.name === 'Free')
                ) {
                  return (
                    <th
                      key={index}
                      className="flex flex-col py-[10px] px-[20px]"
                    >
                      <span className="text-[18px] text-[#000] uppercase">
                        {plan.name}
                      </span>
                      <span className="text-[14px] text-[#000] leading-[150%]">
                        As low as
                      </span>
                      <span className="text-[36px] font-bold text-[#000]">
                        {plan.price}
                      </span>
                      <span className="text-[14px] text-[#000] leading-[150%]">
                        per card
                      </span>
                    </th>
                  );
                }

                return (
                  <th key={index} className="flex flex-col py-[10px] px-[20px]">
                    <span className="text-[18px] text-[#000] uppercase">
                      {plan.name}
                    </span>
                    <span className="text-[14px] text-[#000] leading-[150%]">
                      As low as
                    </span>
                    <span className="text-[36px] font-bold text-[#000]">
                      {plan.price}
                    </span>
                    <span className="text-[14px] text-[#000] leading-[150%]">
                      per card
                    </span>
                    <DynamicButton
                      onClickFunction={plan.onClick}
                      className={`bg-[${plan.buttonColor}] mt-[10px] whitespace-nowrap rounded-[100px] h-[60px] w-full xl:min-w-[180px] max-w-[200px]`}
                      text={plan.buttonText}
                    />
                  </th>
                );
              })}
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
