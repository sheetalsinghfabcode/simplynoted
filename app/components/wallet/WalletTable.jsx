import DynamicButton from '../../components/DynamicButton';

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
    if (
      stripeCollection &&
      stripeCollection.stripe?.subscriptionStatus !== 'canceled'
    ) {
      const subscription = stripeCollection.stripe?.subscription || 'Free';
      if (subscription === 'Team') {
        return 'team';
      } else if (subscription === 'Business') {
        return 'business';
      }
    }
    return 'Free';
  };

  const subscriptionType = getSubscriptionType(stripeCollection);
  const subscribeTeam = subscriptionType === 'team';
  const subscribeBusiness = subscriptionType === 'business';
  const subscribeFree = subscriptionType === 'free';
  
  const pricingPlans = [
    {
      name: 'Free',
      price: pricePerCard[0],
      buttonText: 'Purchase Package',
      buttonColor: '#1b5299',
      tickCount: 17,
      firstTwoFeaturesText: ['0% - 40% OFF', 'Lite Users'],
      onClick: () => setWalletPlan(true),
      features: [
        'Discounts / Savings',
        'Reccomended for',
        'Global Leading Technology' /* add features as needed */,
      ],
    },
    {
      name: 'Team',
      price: pricePerCard[1],
      tickCount: 19,
      firstTwoFeaturesText: ['40% - 55% OFF', '100+ Cards/mo'],
      buttonText: subscribeTeam ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeTeam ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
      features: [
        'Discounts / Savings',
        'Global Leading Technology' /* add features as needed */,
      ],
    },
    {
      name: 'Business',
      price: pricePerCard[2],
      tickCount: 23,
      firstTwoFeaturesText: ['60% - 70% OFF', '1000+ Cards/mo'],
      buttonText: subscribeBusiness ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeBusiness ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
      features: [
        'Discounts / Savings',
        'Global Leading Technology',
        'Reccomended for' /* add features as needed */,
      ],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      firstTwoFeaturesText: ['> 70% OFF', '10000+ Cards/mo'],
      buttonText: 'Contact Us',
      buttonColor: '#ef6e6e',
      tickCount: 29,

      onClick: () =>
        window.open('https://meetings.hubspot.com/rick24', '_blank'),
      features: [
        'Discounts / Savings',
        'Global Leading Technology',
        'Reccomended for' /* add features as needed */,
      ],
    },
  ];

  return (
    <>
      <div className="max-w-[1640px] mx-auto lg:p-4">
        <div className="overflow-auto">
          <div className="hidden md:block">
            {' '}
            {/* Display only on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-5  border-b border-gray-200">
              <div className="py-2 px-4  lg:max-w-none lg:min-w-[190px]"></div>
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="py-2 px-4 md:  lg:min-w-[190px] flex flex-col text-center"
                >
                  <div className="flex flex-col font-karla py-[10px] px-[20px] flex-row-reverse items-center">
                    <span className="text-[18px] font-bold text-[#000] uppercase">
                      {plan.name}
                    </span>
                    <span
                      className={` text-[14px] lg:text-[16px] ${
                        plan.name === 'Enterprise' && 'invisible'
                      } text-[#000] font-bold`}
                    >
                      as low as
                    </span>
                   
                      <div
                        className={` text-[18px] lg:text-[24px] xl:text-[36px] whitespace-nowrap my-2 text-[#000] ${
                          plan.buttonText === 'Contact Us'
                            ? '!font-normal'
                            : 'font-bold'
                        } `}
                      >
                        {plan.price}
                      </div>
                    <span
                      className={`text-[14px] lg:text-[16px] ${
                        plan.name === 'Enterprise' && 'invisible'
                      } text-[#000] font-bold`}
                    >
                      per card
                    </span>
                  </div>
                  {(subscribeTeam && plan.name === 'Free') ||
                    (subscribeBusiness &&
                      (plan.name === 'Free' || plan.name === 'Team')) ? null : (
                  <DynamicButton
                    onClickFunction={plan.onClick}
                    className={`bg-[${plan.buttonColor}] ${
                      plan.buttonText === 'Contact Us' && '!font-normal'
                    } mt-2  md:mx-auto  w-full
               rounded-full h-[46px] lg:px-4 text-[12px] lg:text-[16px] `}
                    text={plan.buttonText}
                  />
                  )}

                </div>
              ))}
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center border-b border-gray-200 py-2 pl-4"
              >
                <span className="font-bold col-span-1">{item.feature}</span>
                {pricingPlans.map((plan, i) => (
                  <div key={i} className="text-center col-span-1">
                    {index < plan.tickCount ? (
                      // Render tick/cross icons only for the third field onwards
                      index < 2 ? (
                        <span className="text-[14px] text-[#000] font-bold">
                          {plan.firstTwoFeaturesText[index]}
                        </span>
                      ) : index < plan.firstTwoFeaturesText.length ? (
                        <span className="text-[14px] text-[#000] font-bold">
                          {plan.firstTwoFeaturesText[index]}
                        </span>
                      ) : (
                        <img
                          src={
                            index < plan.tickCount
                              ? 'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941'
                              : 'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149'
                          }
                          className="w-4 h-4 mx-auto"
                          alt={index < plan.tickCount ? 'tick' : 'remove'}
                        />
                      )
                    ) : (
                      <img
                        src={
                          index < plan.tickCount
                            ? 'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941'
                            : 'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149'
                        }
                        className="w-4 h-4 mx-auto"
                        alt={index < plan.tickCount ? 'tick' : 'remove'}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="md:hidden">
            {/* Display only on mobile */}
            {pricingPlans.map((plan, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 overflow-auto border-b border-gray-200">
                  <div className="py-2 px-4 min-w-[190px]"></div>
                  <div className="py-2 px-4 min-w-[190px] flex flex-col text-center">
                    <div className="flex flex-col font-karla py-[10px] px-[20px] flex-row-reverse items-center">
                      <span className="text-[18px] font-bold text-[#000] uppercase">
                        {plan.name}
                      </span>
                      <span className="text-[14px] text-[#000] font-bold">
                        As low as
                      </span>
                      <div className=" text-[24px] xl:text-[36px] text-[#000] my-1 font-bold">
                        {plan.price}
                      </div>
                      <span className="text-[16px] text-[#000] font-bold">
                        per card
                      </span>
                    </div>
                    {(subscribeTeam && plan.name === 'Free') ||
                    (subscribeBusiness &&
                      (plan.name === 'Free' || plan.name === 'Team')) ? null : (
                    <DynamicButton
                      onClickFunction={plan.onClick}
                      className={`bg-[${plan.buttonColor}] min-w-[164.93px] max-w-[360px] mx-auto mt-2 rounded-full h-[46px] px-4 `}
                      text={plan.buttonText}
                    />
                      )}  
                  </div>
                </div>
                {data.map((item, dataIndex) => (
                  <div
                    key={dataIndex}
                    className="flex flex-col gap-[2px] items-center border-b border-gray-200 py-2 pl-4 overflow-x-auto"
                  >
                    <span className="font-bold col-span-1">{item.feature}</span>
                    <div className="text-center col-span-1">
                      {dataIndex < plan.tickCount ? (
                        <img
                          src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941"
                          className="w-4 h-4 mx-auto"
                          alt="tick"
                        />
                      ) : (
                        <img
                          src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149"
                          className="w-4 h-4 mx-auto"
                          alt="remove"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletTable;
