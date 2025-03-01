import {useState} from 'react';
import DynamicButton from '../../components/DynamicButton';
import LoginModal from '../modal/LoginModal';
import {GoChevronDown} from 'react-icons/go';
import {GoChevronUp} from 'react-icons/go';
import GreenTickMark from '../../../assets/Image/green-tick.svg';
import RemoveCrossImage from '../../../assets/Image/remove-cross.webp';

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

const WalletTable = ({
  pricePerCard,
  setWalletPlan,
  stripeCollection,
  customerID,
}) => {
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
  const [loginModal, setLoginModal] = useState(false);
  const [showId, setShowID] = useState(null);

  const handleChange = (id) => {
    setShowID(showId === id ? null : id);
  };

  let businessPrice = pricePerCard[pricePerCard.length - 1];
  const pricingPlans = [
    {
      name: 'Free',
      price: pricePerCard[0],
      buttonText: 'Purchase Package',
      buttonColor: '#1b5299',
      tickCount: 16,
      firstTwoFeaturesText: ['0% - 40% OFF', 'Lite Users'],
      onClick: () => {
        customerID ? setWalletPlan(true) : setLoginModal(true);
      },

      features: [
        'Discounts / Savings',
        'Reccomended for',
        'Global Leading Technology' /* add features as needed */,
      ],
    },
    {
      name: 'Team',
      price: pricePerCard[1],
      tickCount: 18,
      firstTwoFeaturesText: ['40% - 55% OFF', '100+ Cards/mo'],
      buttonText: !customerID
        ? 'Buy Plan'
        : subscribeTeam
        ? 'Purchase Package'
        : 'Upgrade',
      buttonColor: subscribeTeam ? '#1b5299' : '#ef6e6e',
      onClick: () => {
        customerID ? setWalletPlan(true) : setLoginModal(true);
      },
      features: [
        'Discounts / Savings',
        'Global Leading Technology' /* add features as needed */,
      ],
    },
    {
      name: 'Business',
      price: businessPrice,
      tickCount: 22,
      firstTwoFeaturesText: ['60% - 70% OFF', '1000+ Cards/mo'],
      buttonText: !customerID
        ? 'Buy Plan'
        : subscribeBusiness
        ? 'Purchase Package'
        : 'Upgrade',
      buttonColor: subscribeBusiness ? '#1b5299' : '#ef6e6e',
      onClick: () => {
        customerID ? setWalletPlan(true) : setLoginModal(true);
      },
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
                  className=" py-2 pb-4 px-4 md:  lg:min-w-[190px] flex flex-col text-center"
                >
                  <div className="flex flex-col font-karla py-[10px] px-[20px] items-center">
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
                      className={`bg-[${plan.buttonColor}] font-bold mt-2  md:mx-auto  w-full
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
                className="grid grid-cols-5 items-center border-b border-gray-200 py-1 pl-4"
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
                              ? GreenTickMark
                              : RemoveCrossImage
                          }
                          className="w-4 h-4 mx-auto"
                          alt={index < plan.tickCount ? 'tick' : 'remove'}
                        />
                      )
                    ) : (
                      <img
                        src={
                          index < plan.tickCount
                            ? GreenTickMark
                            : RemoveCrossImage
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
                <div className="">
                  <div className="flex justify-center shadow-slate-100 border border-solid  mt-[12px] overflow-auto border-b border-gray-200">
                    {/* <div className="py-2 px-4 min-w-[190px]"></div> */}
                    <div className="py-1 px-4 min-w-full text-center">
                      <div className="font-karla py-[10px] px-[20px] flex flex-col items-center">
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
                        (plan.name === 'Free' ||
                          plan.name === 'Team')) ? null : (
                        <DynamicButton
                          onClickFunction={plan.onClick}
                          className={`bg-[${plan.buttonColor}] w-[150px] whitespace-nowrap rounded-md mx-auto mt-2  h-[46px] px-4 `}
                          text={plan.buttonText}
                        />
                      )}
                      <div
                        className="text-center mt-[12px] h-[46px] flex justify-center w-[100%]"
                        onClick={() => handleChange(index)}
                      >
                        <button type="button w-[100%]">
                          <div className="text-[black]  flex items-center justify-center text-center ">
                            <span className="text-[19px] font-normal">
                              Show Feature{' '}
                            </span>
                            <span className="text-[22px]">
                              {showId === index ? (
                                <GoChevronUp />
                              ) : (
                                <GoChevronDown />
                              )}
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {showId === index &&
                  data.map((item, dataIndex) => (
                    <div
                      key={dataIndex}
                      className="flex flex-col gap-[2px] items-center border border-solid border-gray-200 py-2 pl-4 overflow-x-auto"
                    >
                      <span className="font-bold col-span-1">
                        {item.feature}
                      </span>
                      <div className="text-center col-span-1">
                        {dataIndex < plan.tickCount ? (
                          <img
                            src={GreenTickMark}
                            className="w-4 h-4 mx-auto"
                            alt="tick"
                          />
                        ) : (
                          <img
                            src={RemoveCrossImage}
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
      <LoginModal
        show={loginModal}
        title=" buy plan"
        confirmText="Login"
        cancelText="Register"
        onCancel={() => setLoginModal(false)}
        hasCancelIcon={true}
      />
    </>
  );
};

export default WalletTable;
