import DynamicButton from '../DynamicButton';
import {useStateContext} from '~/context/StateContext';
const PackageModal = ({
  show,
  onCancel,
  confirmText,
  onConfirm,
  filteredWalletData,
  stripeCollection,
}) => {
  const {
    setAmount,
    setSubscription,
    setPackageProduct,
    setSubscriptionProduct,
    setSubscriptionPriceId,
    selectedPlan,
    setSelectedPlan,
    setSubscriptionTitle,
  } = useStateContext();

  const handleRadioChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-[5rem] left-[50%] h-full translate-x-[-50%] overflow-y-auto flex items-center  justify-center z-50`}
    >
      <div className="modal-container relative bg-[#dde8f9] w-11/12 h-full max-w-[80%] md:max-w-[40%] w-full mx-auto py-[18px] pt-[45px] rounded shadow-lg z-50 rounded-[10px] overflow-y-auto">
        <span
          onClick={onCancel}
          className="absolute cursor-pointer !leading-[0] right-0 top-[20px]  text-[40px]"
        >
          &times;
        </span>
        <div className="modal-content ptt-4  px-6">
          <div className="flex flex-col p-[15px] text-center !bg-[#324879] rounded-[15px] text-[#fff] gap-[10px]">
            <span className="md:text-[14px] text-[12px] font-normal font-karla text-center">
              {stripeCollection &&
              stripeCollection.stripe?.subscriptionStatus &&
              stripeCollection.stripe?.subscriptionStatus !== 'canceled'
                ? stripeCollection.stripe?.subscription
                : 'Free'}
              Prepaid Packages
            </span>
            <span className="md:text-[14px] text-[12px] font-normal font-karla text-center">
              Your current Prepaid Package:
              {stripeCollection ? (
                <span className="md:text-[14px] text-[12px] font-karla font-normal ">
                  {stripeCollection.stripe?.subscriptionStatus !== 'canceled'
                    ? stripeCollection.stripe?.subscription
                    : 'Free'}
                  - {stripeCollection.stripe?.packageQuantity} cards -
                  {stripeCollection.stripe?.packageDiscount}% DISCOUNT
                </span>
              ) : (
                <span>None</span>
              )}
            </span>
            <span className="md:text-[14px] text-[12px] font-normal font-karla text-center">
              Balance: $
              {stripeCollection.stripe?.balance
                ? stripeCollection.stripe?.balance
                : 0.0}
            </span>
          </div>
          <h3 className="md:text-[20px] text-[12px] mt-[20px] text-center leading-[1.4] w-full max-w-[418px] mx-auto  font-semibold">
            {stripeCollection &&
            stripeCollection.stripe?.subscriptionStatus !== 'canceled'
              ? stripeCollection.stripe?.subscription
              : 'Free'}
            Prepaid Packages
          </h3>
          <h4 className="md:text-[16px] text-[12px] text-[#001a5f] text-center">
            Select Prepaid Package
          </h4>
        </div>
        <div className="modal-body ">
          <p className="text-[20px] w-full max-w-[600px] mx-auto text-center leading-[1.4] text-[#001a5f] font-semibold">
            {filteredWalletData &&
              filteredWalletData.length > 0 &&
              filteredWalletData.map((product, index) => (
                <div
                  key={product.node.title}
                  className={`col-span-1 p-[11px] ${
                    (stripeCollection?.error &&
                      product.node.title === 'Free') ||
                    product.node.title.toLowerCase() ===
                      stripeCollection.stripe?.subscription
                      ? 'bg-[#F7B7B7]'
                      : ''
                  }`}
                >
                  <div className="flex flex-col gap-[16px]">
                    {product.node.variants.edges
                      .filter(
                        (variant) => variant.node.title !== 'Subscription',
                      )
                      .map((variant) => {
                        const titleMetafield = variant.node.metafields.find(
                          (metafield) => metafield?.key === 'variant_title',
                        );
                        const descriptionMetafield =
                          variant.node.metafields.find(
                            (metafield) => metafield?.key === 'description',
                          );
                        const amountMetafield = variant.node.metafields.find(
                          (metafield) => metafield?.key === 'card_amount',
                        );
                        const subscriptionPriceId =
                          product.node.metafields.find(
                            (metafield) => metafield?.key === 'strip_link',
                          );

                        const subscriptionMetafield =
                          product.node.metafields.find(
                            (metafield) =>
                              metafield?.key ===
                                'subscription_plan_price_monthly' &&
                              product.node.title.toLowerCase() !==
                                stripeCollection.stripe?.subscription,
                          );

                        return (
                          <div
                            onClick={() => {
                              setSubscription(
                                subscriptionMetafield?.value || 0,
                              );
                              setSubscriptionProduct(product.node.id);
                              setPackageProduct(variant.node.id);
                              setSubscriptionTitle(product.node.title);
                              setAmount(variant.node.price.amount || 0);
                              setSubscriptionPriceId(
                                subscriptionPriceId?.value,
                              );
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
                              className="mt-[4px] md:h-[15px] h-[10px] md:w-[15px] w-[10px]"
                              value={`${variant.node.title} ${titleMetafield?.value}`}
                              checked={
                                selectedPlan ===
                                `${variant.node.title} ${titleMetafield?.value}`
                              }
                            />

                            <div className="flex flex-col gap-[8px]">
                              <div className="flex gap-[6px] items-start">
                                <span className=" md:text-[15px] text-[12px] font-bold">
                                  {titleMetafield?.value}
                                </span>
                                <span className="md:text-[15px] text-[12px] font-bold">
                                  {variant.node.title}
                                </span>
                              </div>
                              {descriptionMetafield?.value &&
                                variant.node.price.amount !== '0.0' && (
                                  <span className="md:text-[14px] text-[12px] font-medium">
                                    {descriptionMetafield
                                      ? JSON.parse(descriptionMetafield?.value)
                                          .children[0].children[0]?.value
                                      : ''}
                                  </span>
                                )}
                              {amountMetafield?.value && (
                                <span className="md:text-[14px] text-[12px] text-left font-medium">
                                  ${variant.node.price.amount}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </p>
        </div>
        <div className="modal-footer w-full flex justify-center items-center gap-[12px] mt-[20px]">
          <button
            onClick={onConfirm}
            className="bg-red-500 uppercase whitespace-nowrap text-[12px] w-full min-h-[48px] min-w-[175px] max-w-[175px]  text-center hover:bg-red-600 text-white font-semibold py-2 px-4 "
          >
            {confirmText}
          </button>
        </div>

        <div className=" mt-[10px] border-2 text-[12px] bg-white text-left p-[10px] border-solid border-[#324879]">
          <span>
            Custom cards and international postage may cost extra. You will
            receive the same level of discount on custom cards.
          </span>
          <br />
          <br />
          <span>
            By making this purchase, you agree to allow us to automatically
            renew your prepaid package when your balance drops below $100 and to
            renew your subscription at the end of your subscription period. Both
            your subscription and prepaid package can be changed later from your
            Account area.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
