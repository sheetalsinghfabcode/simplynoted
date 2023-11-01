import DynamicButton from '../DynamicButton';
import React, {useState} from 'react';

const WalletPlans = ({
  WalletData,
  setWalletPlan,
  setWalletPurchase,
  setSelectedPlan,
  selectedPlan,
  setAmount,
  setSubscription,
  stripeCollection,
}) => {
  const handleRadioChange = (event) => {
    setSelectedPlan(event.target.value);
  };

    

  return (
    <div className="w-full p-[20px] mx-auto my-[16px] max-w-[1396px]">
      <DynamicButton
        text="Previous"
        onClickFunction={() => setWalletPlan(false)}
        className="!bg-[#EF6E6E] mb-[18px]"
      />

      <div className="grid grid-cols-3 mx-auto  gap-[28px]">
        {WalletData.collection.products.edges.map((product, index) => (
          <div
            key={product.node.title}
            className={`col-span-1 p-[20px] ${
              product.node.title === 'Free' ||
              (stripeCollection &&
                product.node.title.toLowerCase() ===
                  stripeCollection.stripe?.subscription)
                ? 'bg-[#F7B7B7]'
                : ''
            }`}
          >
            <DynamicButton
              text={`${product.node.title} PLAN PREPAID PACKAGES`}
              className="bg-[#EF6E6E] text-[18px] 2xl:text-[20px] w-full mb-[24px]  uppercase mx-auto whitespace-nowrap text-center"
            />
            <div className="flex flex-col gap-[16px]">
              {product.node.variants.edges
                .filter((variant) => variant.node.title !== 'Subscription')
                .map((variant) => {
                  const titleMetafield = variant.node.metafields.find(
                    (metafield) => metafield?.key === 'variant_title',
                  );
                  const descriptionMetafield = variant.node.metafields.find(
                    (metafield) => metafield?.key === 'description',
                  );
                  const amountMetafield = variant.node.metafields.find(
                    (metafield) => metafield?.key === 'card_amount',
                  );

                  const subscriptionMetafield = product.node.metafields.find(
                    (metafield) =>
                      metafield?.key === 'subscription_plan_price_monthly' &&
                      product.node.title.toLowerCase() !==
                        stripeCollection.stripe?.subscription,
                  );

                  console.log('subscriptionMetafield', subscriptionMetafield);

                  return (
                    <div
                      onClick={() => {
                        setSubscription(subscriptionMetafield?.value || 0);
                        setAmount(amountMetafield?.value || 0);
                        handleRadioChange({
                          target: {
                            value: `${variant.node.title} ${titleMetafield?.value}`,
                          },
                        });
                      }}
                      className="flex justify-start p-[20px] cursor-pointer items-start gap-[16px] border border-solid border-black rounded-[10px]"
                    >
                      <input
                        type="radio"
                        className="mt-[4px]"
                        value={`${variant.node.title} ${titleMetafield?.value}`}
                        checked={
                          selectedPlan ===
                          `${variant.node.title} ${titleMetafield?.value}`
                        }
                      />

                      <div className="flex flex-col gap-[8px]">
                        <div className="flex gap-[6px] items-start">
                          <span className="text-[15px] font-bold">
                            {titleMetafield?.value}
                          </span>
                          <span className="text-[15px] font-bold">
                            {variant.node.title}
                          </span>
                        </div>
                        {descriptionMetafield?.value &&
                          variant.node.price.amount !== '0.0' && (
                            <span className="text-[14px] font-medium">
                              {descriptionMetafield
                                ? JSON.parse(descriptionMetafield?.value)
                                    .children[0].children[0]?.value
                                : ''}
                            </span>
                          )}
                        {amountMetafield?.value && (
                          <span className="text-[14px] font-medium">
                            ${amountMetafield?.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              <span className="text-[14px] mt-[16px] font-medium">
                {product.node.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[30px] flex w-full items-center justify-between gap-[50px]">
        <div className="w-full max-w-[810px]">
          <span>
            Custom cards and international postage may cost extra. You will
            receive the same level of discount on custom cards.
          </span>
          <br />
          <br />
          <span>
            Team and Business plans renew on a monthly basis. We will renew your
            prepaid package when your balance drops below $100 to ensure you
            retain your discount. Both your plan and prepaid package can be
            changed later from your Account area.
          </span>
        </div>
        <DynamicButton
          text="Continue"
          className="!bg-[#0c5699] !rounded-0 !border-2 border-black"
          onClickFunction={() => {
            setWalletPlan(false);
            setWalletPurchase(true);
          }}
        />
      </div>
    </div>
  );
};

export default WalletPlans;
