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




const WalletTable = ({ pricePerCard, setWalletPlan, stripeCollection }) => {
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
      onClick: () => setWalletPlan(true),
      features: ['Discounts / Savings', 'Reccomended for', 'Global Leading Technology', /* add features as needed */],
    },
    {
      name: 'Team',
      price: pricePerCard[1],
      buttonText: subscribeTeam ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeTeam ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
      features: ['Discounts / Savings', 'Global Leading Technology', /* add features as needed */],
    },
    {
      name: 'Business',
      price: pricePerCard[2],
      buttonText: subscribeBusiness ? 'Purchase Package' : 'Upgrade',
      buttonColor: subscribeBusiness ? '#1b5299' : '#ef6e6e',
      onClick: () => setWalletPlan(true),
      features: ['Discounts / Savings', 'Global Leading Technology', 'Reccomended for', /* add features as needed */],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      buttonText: 'Contact Us',
      buttonColor: '#ef6e6e',
      onClick: () =>
        window.open('https://meetings.hubspot.com/rick24', '_blank'),
      features: ['Discounts / Savings', 'Global Leading Technology', 'Reccomended for', /* add features as needed */],
    },
  ];

  return (
    <>
      <div className="max-w-[1640px] mx-auto p-4">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 border-b border-gray-200">
            <div className="py-2 px-4 min-w-[190px]"></div>
            {pricingPlans.map((plan, index) => (
              <div key={index} className="py-2 px-4 min-w-[190px] flex flex-col text-center">
                <div className="flex flex-col font-karla py-[10px] px-[20px] flex-row-reverse items-center">
                  <span className="text-[18px] font-bold text-[#000] uppercase">{plan.name}</span>
                  <span className="text-[14px] text-[#000] font-bold">As low as</span>
                  <div className="text-[36px] text-[#000] font-bold">{plan.price}</div>
                  <span className="text-[16px] text-[#000] font-bold">per card</span>
                </div>
                <DynamicButton
                  onClickFunction={plan.onClick}
                  className={`bg-[${plan.buttonColor}] mt-2 rounded-full px-4 h-8`}
                  text={plan.buttonText}
                />
              </div>
            ))}
          </div>
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-5 items-center border-b border-gray-200 py-2 pl-4">
              <span className="font-bold col-span-1">{item.feature}</span>
              {pricingPlans.map((plan, i) => (
                <div key={i} className="text-center col-span-1">
                  {index < (i + 1) * 17 ? (
                    <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941" className="w-4 h-4 mx-auto" alt="tick" />
                  ) : (
                    <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149" className="w-4 h-4 mx-auto" alt="remove" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletTable;
