import DynamicButton from '../DynamicButton';

const WalletPurchase = ({
  setWalletPurchase,
  setWalletPlan,
  amount,
  selectedPlan,
  subscription,
  setWalletPayment,
  setFinalPrice,
  subscriptionTitle,
}) => {
  const subscriptionPrice =
    subscription !== 0 ? subscription?.split('/')[0].replace('$', '') : '0';

  const total =
    subscriptionPrice > 0
      ? (parseFloat(subscriptionPrice) + parseFloat(amount)).toFixed(2)
      : parseFloat(amount).toFixed(2);
  setFinalPrice(total);


  return (
    <div className="max-w-[1366px] mx-auto px-[20px]  py-[40px] ml-[14px] mr-[14px] bg-white">
      <div className="max-w-[640px] mx-auto p-[17px] border border-solid border-[#ef6e6e]">
        <div className="flex justify-center">
          <DynamicButton
            text={`${
              subscriptionTitle ? subscriptionTitle : 'Free' 
            } Plan Packages`}
            className="!bg-[#EF6E6E] font-karla !p-[18px] whitespace-nowrap  mt-[-9px] sm:!h-[45px]  w-full sm:max-w-[80%] md:max-w-[50%]  uppercase md:text-[16px] text-[12px]"
          />
        </div>
        {subscriptionPrice > 0 &&
        <div className="flex justify-between items-center mt-[27px] md:mt-[16px]  text-[#001a5f]">
          <span className="md:text-[16px] text-[#001a5f] font-medium text-[12px]">Plan Amount</span>
          <span className="md:text-[16px] text-[#001a5f] font-medium text-[12px]">
            ${subscription === 'Always Free' || 0 ? 0 : Number(subscriptionPrice).toFixed(2)}
          </span>
        </div>
}
        <div className="flex justify-between items-center mt-[16px]  text-[#001a5f]">
          <span className="md:text-[16px] text-[#001a5f] font-medium text-[12px]">
            Selected Prepaid Package: {selectedPlan}
          </span>
          <span className="md:text-[16px] text-[#001a5f] font-medium text-[12px]">${amount || 0}</span>
        </div>

        <div className="flex justify-between items-center py-[10px] mt-[10px] border-y border-solid border-[#cfcfcf] text-[16px] font-medium text-[#001a5f]">
          <span className="md:text-[16px] text-[#001a5f] font-medium text-[12px]">Total</span>
          <span className="md:text-[16px] text-[#001a5f] font-medium text-[12px]">
            ${subscription === 'Always Free' ? amount : total}
          </span>
        </div>

        <div className=" sm:flex grid lg:justify-between md:justify-around justify-normal lg:gap-[11px] gap-[12px] items-center mt-[27px]">
          <DynamicButton
            text="Go Back"
            className="!bg-[#EF6E6E] font-karla !w-full   !h-[50px]  uppercase md:text-[16px] text-[12px]"
            onClickFunction={() => {
              setWalletPurchase(false);
              setWalletPlan(true);
            }}
            backArrow={true}
          />
          <DynamicButton
            text="Continue to Checkout"
            onClickFunction={() => {
              setWalletPurchase(false);
              setWalletPayment(true);
            }}
            className="!bg-[#1b5299] font-karla !w-full  whitespace-nowrap !h-[50px] uppercase md:text-[16px] text-[12px]"
          />
        </div>
      </div>
    </div>
  );
};

export default WalletPurchase;
