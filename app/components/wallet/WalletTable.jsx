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
      buttonText: 'Purchase Package',
      buttonColor: '#1b5299',
      onClick: () => setWalletPlan(true),
    },
  ];

  return (
    <div className="w-full max-w-[1440px] p-[20px] mx-auto">
      <div className='overflow-auto'>
      <table className="mx-auto table bg-white">
        <thead>
          <tr className="h-[120px] overflow-auto">
            <th className="text-center py-4  px-10"></th>
            {pricingPlans
              .slice(0)
              .reverse()
              .map((plan, index) => {
                let renderButton = true;

                if (
                  subscribeBusiness &&
                  (plan.name === 'Team' || plan.name === 'Free')
                ) {
                  renderButton = false; // Don't render buttons for Team or Free if subscribeBusiness is true
                } else if (subscribeTeam && plan.name === 'Free') {
                  renderButton = false; // Don't render Free button if subscribeTeam is true
                }

                return (
                  <th key={index} className="text-center  py-4 px-10">
                    <span className="text-lg text-[#000] uppercase block">
                      {plan.name}
                    </span>
                    <span className="text-sm text-[#000] leading-[150%] block">
                      As low as
                    </span>
                    <span className="text-2xl font-bold text-[#000] block">
                      {plan.price}
                    </span>
                    <span className="text-sm text-[#000] leading-[150%] block">
                      per card
                    </span>
                    {/* ... Plan details */}
                    {renderButton ? (
                      <DynamicButton
                        onClickFunction={plan.onClick}
                        className={`bg-[${plan.buttonColor}] mt-4 xl:min-w-[180px] rounded-full h-[40px] px-6`}
                        text={plan.buttonText}
                      />
                    ) : (
                      <span></span>
                    )}
                  </th>
                );
              })}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              className="text-[#001a5f] text-sm border-t border-[#ddd] last:border-b"
              key={index}
            >
              <td className="py-4 pl-6">{item.feature}</td>
              {Array.from({length: pricingPlans.length}).map((_, i) => (
                <td key={i} className="text-center">
                  {index < (i + 1) * 5 ? (
                    <img
                      src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/tick.svg?v=1690531941"
                      className="w-[18px] h-[16px] mx-auto"
                      alt="tick"
                    />
                  ) : (
                    <img
                      src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/remove.png?v=1690532149"
                      className="w-[18px] h-[16px] mx-auto"
                      alt="remove"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default WalletTable;
