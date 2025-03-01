import DynamicButton from '../DynamicButton';
import {useEffect, useState} from 'react';
import {PRODUCTION_PLANS_SHOPIFY_IDS} from '~/data/config';

const WalletPlans = ({
  WalletData,
  setWalletPlan,
  setSelectedPlan,
  selectedPlan,
  setAmount,
  setWalletPurchase,
  setSubscription,
  stripeCollection,
  setSubscriptionProduct,
  setPackageProduct,
  amount,
  setSubscriptionTitle,
  subscriptionTitle,
  setSubscriptionPriceId,
  subscriptionPriceId,
}) => {
  const handleRadioChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  let packageQuantity;

  const [isButtonDisabled, setIsButtonDisabled] = useState();

  useEffect(() => {
    // Set initial values based on stripeCollection data
    if (!stripeCollection?.error) {
      const packageDiscount = stripeCollection.stripe?.packageDiscount || 0;
      packageQuantity = stripeCollection.stripe?.packageQuantity || 0;

      if (packageQuantity >= 1000) {
        packageQuantity = packageQuantity.toLocaleString();
      }

      const selectedPlanString = `${packageDiscount}% Discount ${packageQuantity} Standard Cards`;

      setSelectedPlan(selectedPlanString); // Set the selected plan
      setAmount(stripeCollection.stripe?.packageQuantity || 0); // Set the amount
    }
  }, [stripeCollection]);

  function formatNumberWithCommas(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  useEffect(() => {
    if (stripeCollection?.stripe?.subscriptionStatus === 'canceled') {
      setSubscriptionTitle('Free');
    }
  }, [stripeCollection]);

  useEffect(() => {
    if (selectedPlan) {
      const parts = selectedPlan?.split('%');
      const firstPart = parts[0]?.trim();
      const discountPercentage = parseInt(firstPart);
      const isZeroDiscountPlan = discountPercentage === 0;
      setIsButtonDisabled(isZeroDiscountPlan);
    }
  }, [selectedPlan]);

  return (
    <div className="w-full font-karla plan-input-radio mx-auto my-[16px] ">
      <div className="flex flex-col md:flex-row overflow-auto">
        {WalletData.collection.products.edges.map((product, index) => (
          <div
            key={index}
            className={`flex-1 p-[20px] ${
              PRODUCTION_PLANS_SHOPIFY_IDS.includes(
                product?.node.id.match(/\d+$/)[0],
              )
                ? 'block'
                : 'hidden'
            } ${
              (subscriptionTitle === product?.node?.title && 'bg-[#f7b7b7]') ||
              (stripeCollection?.stripe?.subscription ===
                product?.node?.title &&
                stripeCollection?.stripe?.subscriptionStatus !== 'canceled')
                ? 'bg-[#f7b7b7]'
                : ''
            }`}
          >
            <DynamicButton
              text={`${product.node.title} PLAN PREPAID PACKAGES`}
              className="bg-[#EF6E6E] whitespace-nowrap  text-[14px] sm:text-[18px] rounded-[5px] py-[12px] border border-solid border-[#001a5f] md:text-[22px] w-full mb-[24px]   uppercase mx-auto  px-2 text-left"
            />
            <div className="flex flex-col gap-[16px]">
              {product.node.variants.edges
                .filter((variant) => variant.node.title !== 'Subscription')
                .map((variant, index) => {
                  const titleMetafield = variant.node.metafields.find(
                    (metafield) => metafield?.key === 'variant_title',
                  );
                  const descriptionMetafield = variant.node.metafields.find(
                    (metafield) => metafield?.key === 'description',
                  );
                  const amountMetafield = variant.node.metafields.find(
                    (metafield) => metafield?.key === 'card_amount',
                  );
                  const subscriptionPriceId = product.node.metafields.find(
                    (metafield) => metafield?.key === 'strip_link',
                  );

                  const subscriptionMetafield = product.node.metafields.find(
                    (metafield) =>
                      metafield?.key === 'subscription_plan_price_monthly' &&
                      product.node.title.toLowerCase() !==
                        stripeCollection.stripe?.subscription,
                  );

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (
                          stripeCollection.stripe?.subscriptionStatus ===
                          'canceled'
                        ) {
                          setSubscription(subscriptionMetafield?.value || 0);
                        } else if (
                          stripeCollection.stripe?.subscription !=
                          product.node.title
                        ) {
                          setSubscription(subscriptionMetafield?.value || 0);
                        } else {
                          setSubscription(0);
                        }
                        setSubscriptionProduct(
                          product.node.variants.edges[0].node.id,
                        );
                        setPackageProduct(variant.node.id);
                        setSubscriptionTitle(product.node.title);
                        setAmount(variant.node.price.amount || 0);
                        setSubscriptionPriceId(subscriptionPriceId?.value);
                        handleRadioChange({
                          target: {
                            value: `${variant.node.title} ${titleMetafield?.value}`,
                          },
                        });
                      }}
                      className="flex justify-start p-[20px] bg-white cursor-pointer items-start gap-[16px] border border-solid border-black rounded-[10px]"
                    >
                      <input
                        type="radio"
                        className="mt-[4px]"
                        value={`${variant.node.title} ${titleMetafield?.value}`}
                        checked={
                          selectedPlan ===
                          `${variant.node.title} ${titleMetafield?.value}`
                        }
                        onChange={() => ''}
                      />

                      <div className="flex flex-col gap-[8px]">
                        <div className="flex gap-[6px] whitespace-nowrap text-[#001a5f]  items-start">
                          <span className="sm:text-[15px] text-[11px] font-bold">
                            {titleMetafield?.value}
                          </span>
                          <span className="sm:text-[15px] text-[11px] font-bold">
                            {variant.node?.title}
                          </span>
                        </div>
                        {descriptionMetafield?.value &&
                          variant.node.price.amount !== '0.0' && (
                            <span className="sm:text-[14px] text-[12px] font-medium">
                              {descriptionMetafield
                                ? JSON.parse(descriptionMetafield?.value)
                                    .children[0].children[0]?.value
                                : ''}
                            </span>
                          )}

                        {amountMetafield?.value && (
                          <span className="md:text-[14px] text-[12px] font-medium">
                            $
                            {formatNumberWithCommas(
                              Number(variant.node.price.amount),
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              <span className="text-[14px] leading-1.3 text-[#000] mt-[16px] font-medium">
                {product.node.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[30px]  px-[20px] bg-white  flex flex-col-reverse md:flex-row w-full items-center justify-between gap-[50px]">
        <div className="w-full text-[#000] max-w-[810px] font-karla font-normal">
          <span>
            *Custom cards and international postage may cost extra. You will
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
          nextArrow={true}
          disabled={isButtonDisabled || !selectedPlan}
          className={`bg-[#0c5699] ${
            (isButtonDisabled || !selectedPlan) && 'cursor-not-allowed'
          } flex-row-reverse min-w-[190px] font-bold max-w-[190px] text-[16px] rounded-0 border-2 text-white border-solid border-[#000] py-[16px] px-[30px] border-black`}
          onClickFunction={() => {
            setWalletPlan(false);
            setWalletPurchase(true);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </div>
    </div>
  );
};

export default WalletPlans;
