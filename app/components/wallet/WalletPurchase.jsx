import DynamicButton from '../DynamicButton';

const WalletPurchase = ({
  setWalletPurchase,
  setWalletPlan,
  amount,
  selectedPlan,
  subscription,
  stripeCollection,
  setWalletPayment,
  setFinalPrice,
}) => {
  const subscriptionPrice = subscription !== 0 ? subscription?.split('/')[0].replace('$', '') : '0';

  const total = (parseFloat(subscriptionPrice) + parseFloat(amount)).toFixed(2);
  setFinalPrice(total);


  return (
    <div className="w-full max-w-[1366px] mx-auto px-[20px] py-[40px] bg-white">
      <div className="max-w-[750px] mx-auto p-[50px] border border-solid border-[#ef6e6e]">
        <div className="flex justify-center">
          <DynamicButton
            text={`${
              stripeCollection ? stripeCollection : 'Free'
            } Plan Packages`}
            className="!bg-[#EF6E6E] uppercase text-[22px]"
          />
        </div>
        <div className="flex justify-between items-center mt-[10px] text-[16px] font-medium text-[#001a5f]">
          <span>Plan Amount</span>
          <span>
            {' '}
            ${subscription === 'Always Free' || 0 ? 0 : subscriptionPrice}
          </span>
        </div>

        <div className="flex justify-between items-center mt-[10px] text-[16px] font-medium text-[#001a5f]">
          <span>Selected Prepaid Package: {selectedPlan} </span>
          <span>${amount || 0}</span>
        </div>

        <div className="flex justify-between items-center py-[10px] mt-[10px] border-y border-solid border-[#cfcfcf] text-[16px] font-medium text-[#001a5f]">
          <span>Total</span>
          <span>${subscription === 'Always Free' ? amount : total}</span>
        </div>

        <div className="flex justify-between items-center mt-[24px]">
          <DynamicButton
            text="Prev"
            className="!bg-[#EF6E6E] w-full max-w-[200px] uppercase text-[22px]"
            onClickFunction={() => {
              setWalletPurchase(false);
              setWalletPlan(true);
            }}
          />
          <DynamicButton
            text="Continue to Checkout"
            onClickFunction={() => {
              setWalletPurchase(false);
              setWalletPayment(true);
            }}
            className="!bg-[#EF6E6E] uppercase text-[22px]"
          />
        </div>
      </div>
    </div>
  );
};

export default WalletPurchase;
