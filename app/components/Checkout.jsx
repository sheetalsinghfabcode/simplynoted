import React, {useState, useEffect, useRef, useCallback} from 'react';
import {HiArrowLongLeft} from 'react-icons/hi2';
import {loadStripe} from '@stripe/stripe-js';
import StripeCardComp from './StripeCardComp';
import {Elements} from '@stripe/react-stripe-js';
import {Modal} from './Modal';
import location from '../../location.json';
import Loader from './modal/Loader';
import DynamicTitle from './Title';

export function CheckoutData({
  setShowCartPage,
  StripeKey,
  totalPrize,
  cartData,
}) {
  const stripe = loadStripe(`${StripeKey}`);
  let customerid, fullName, userEmail, firstName, lastName;
  const [showWallet, setShowWallet] = useState(true);
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [showCardBox, setShowCardBox] = useState(false);
  const [savedCard, setSavedCart] = useState([]);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [newCardAdded, setNewCardAdded] = useState(false);
  const [customerID, setCustomertID] = useState('');
  const [loader, setloader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'USA',
    },
    paymentMethodId: '',
  });
  const [discountCouponCode, setDiscountCouponCode] = useState({
    payloadValue: '',
    oldTriedPayloadValue: '',
    apiDiscountResponse: {},
  });
  const [prices, setPrices] = useState({
    subtotalPrice: totalPrize,
    totalPrice: totalPrize,
  });
  const [errors, setErrors] = useState({});
  const [walletBalance, setWalletBalance] = useState('');

  function showWalletBtn() {
    setShowWallet(true);
    setShowCardDetail(false);
  }
  function cardDetailBtn() {
    setShowCardDetail(true);
    setShowWallet(false);
  }
  function closeModal() {
    setShowCardBox(false);
  }

  function AddCreditCard(id) {
    if (savedCard) {
      addNewCreditCard(id);
    } else {
      createCustomerId(id);
    }
  }

  useEffect(() => {
    if (discountCouponCode.apiDiscountResponse?.discountedAmount) {
      const newtotalPrice =
        prices.subtotalPrice -
        discountCouponCode.apiDiscountResponse?.discountedAmount;
      setPrices((prevPrices) => {
        return {
          ...prevPrices,
          totalPrice: newtotalPrice,
        };
      });
    } else if (discountCouponCode.apiDiscountResponse?.message) {
      setTimeout(() => {
        setDiscountCouponCode((prevDiscountCouponCode) => {
          return {
            ...prevDiscountCouponCode,
            apiDiscountResponse: null,
          };
        });
      }, 3000);
    }
  }, [discountCouponCode.apiDiscountResponse]);

  async function createCustomerId(id) {
    try {
      setloader(true);
      const res = await fetch(
        `https://api.simplynoted.com/stripe/create-customer?customerId=${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name || '',
            email: formData.email || '',
            'address[line1]': formData.address.line1 || '',
            'address[line2]': formData.address.line2 || '',
            'address[city]': formData.address.city || '',
            'address[state]': formData.address.state || '',
            'address[country]': formData.address.country || '',
            paymentMethodId: id || '',
          }),
        },
      );
      const json = await res.json();
      // console.log(json, 'createCustomerId Response');
      // await addNewCreditCard(id, json.stripeCustomerId)
      setNewCardAdded(true);
      setShowCardBox(false);
      setloader(false);
      // }
    } catch (error) {
      setloader(false);
      console.error(error, 'error on CreateCard');
    }
  }
  async function addNewCreditCard(paymentID) {
    try {
      setloader(true);
      const res = await fetch(
        `https://api.simplynoted.com/stripe/add-new-payment-method?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentID,
          }),
        },
      );
      const jsonData = await res.json();
      
      // console.log(jsonData, 'addNewCard');
      setNewCardAdded(true);
      setShowCardBox(false);
      setloader(false);
    } catch (error) {
      setloader(false);
      console.error(error, 'addNewCreditCard ------');
    }
  }
  async function getSavedCards(Id) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/stripe/customer-data?customerId=${Id}`,
      );
      const json = await res.json();
      // console.log(json, 'creditCard Details');
      if (json) {
        setSavedCart(json.payments);
        setWalletBalance(json.stripe);
      }
    } catch (error) {
      console.error(error, 'error at credit Card');
    }
  }

  async function handleApplyDiscountCoupon() {
    try {
      if (
        discountCouponCode.apiDiscountResponse &&
        discountCouponCode.payloadValue ===
          discountCouponCode.oldTriedPayloadValue
      ) {
        return 'Already used API with the same value.';
      }
      let res = await fetch(
        `https://api.simplynoted.com/api/storefront/shopify/coupon-details?code=${discountCouponCode.payloadValue}&amount=${totalPrize}&customerId=${customerID}`,
      );
      const data = await res.json();
      if (res.ok && data) {
        setDiscountCouponCode((prevDiscountCouponCode) => {
          return {
            ...prevDiscountCouponCode,
            oldTriedPayloadValue: discountCouponCode.payloadValue,
            apiDiscountResponse: data.result,
          };
        });
      }
    } catch (err) {
      console.error('Failed to apply discount code: ', err);
      setDiscountCouponCode((prevDiscountCouponCode) => {
        return {
          ...prevDiscountCouponCode,
          apiDiscountResponse: {message: 'Unable to apply discount code.'},
        };
      });
    }
  }

  useEffect(() => {
    customerid = localStorage.getItem('customerId');
    fullName = localStorage.getItem('SNFullName');
    userEmail = localStorage.getItem('SnEmail');
    firstName = localStorage.getItem('firstName');
    lastName = localStorage.getItem('lastName');
    setCustomertID(customerid);
    getSavedCards(customerid);
    formData.name = fullName ? fullName : firstName + ' ' + lastName;
    formData.email = userEmail;
  }, [newCardAdded]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name.startsWith('address.')) {
      // If the name starts with 'address.', it's part of the address object
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name.substring(8)]: value,
        },
        paymentMethodId: paymentMethodId ? paymentMethodId : '',
      }));
    } else {
      // It's not part of the address object, update it directly
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  

  const selectedCountry = location.countries.find(
    (country) => country.country === formData.address.country,
  );
  // console.log(formData, 'formData');
  function onpenAddCardModal() {
    setShowCardBox(true);
  }

  const setFirstPaymentId = () => {
    if (savedCard && savedCard.length > 0) {
      setPaymentMethodId(savedCard[0].paymentId); // Set the first payment ID
    }
  };

  // Calling the function to set the first payment ID when the component renders
  useEffect(() => {
    setFirstPaymentId();
  }, [savedCard]); // Run when savedCard changes

  async function paymentPurchase() {
    try {
      const formData = new FormData();
      const payload = {
        billingAddress: {
          firstName: 'Pradeep',
          lastName: 'singh',
          email: 'fabprojectmanager@gmail.com',
          address: 'test',
          apartment: 'test',
          city: 'test',
          country: 'US',
          state: 'Florida',
        },
        cartNote: '',
        cartItems:
          cartData &&
          cartData?.map((item) => {
            let senderFullName =
              item.senderAddress.firstName + ' ' + item.senderAddress.lastName;
            let recieverFullName =
              item.reciverAddress.firstName +
              ' ' +
              item.reciverAddress.lastName;
            console.log('item', item);
            return {
              productTitle: item.productTitle,
              variant_id: item.variant_id,
              productUrlGet: item.productGetUrl,
              productPrice: item.price,
              productUrl:
                'https://simplynoted.com/collections/best-sellers/products/cactus-thank-you',
              qyt: 1,
              proImage: item.productImg,
              properties: {
                bulk_shipping_address: '\n  \n  \n',
                selectedText: 'Single Card',
                font_family: item.fontFamily,
                custom_message: item.messageData,
                font_size: '60px',
                font_size_cust_card: '60px',
                line_ht_cust_card: '60px',
                signoff: item.endText,
                custom_font: '',
                font_selection: item.fontFamily,
                recipient_upload: 'Not Applicable',
                ship_date: '',
                sender_fullName: senderFullName,
                sender_address1: item.senderAddress.address1,
                sender_address2: item.senderAddress.address2,
                sender_city: item.senderAddress.city,
                sender_state: item.senderAddress.state,
                sender_zip: item.senderAddress.zip,
                sender_country: item.senderAddress.country,
                sender_id: item.senderAddress._id,
                gift_card_ID: '1696942729953',
                uqId: '1696942729953',
                gift_id: '39532033146985',
                recipient_id: item.reciverAddress._id,
                recipient_fullName: recieverFullName,
                recipient_businessName: item.reciverAddress.businessName,
                recipient_address1: item.reciverAddress.address1,
                recipient_address2: item.reciverAddress.address2,
                recipient_city: item.reciverAddress.city,
                recipient_state: item.reciverAddress.state,
                recipient_zip: item.reciverAddress.zip,
                recipient_country: item.reciverAddress.country,
              },
              additionalProducts: {
                postageUS: {
                  id: 40677547769961,
                  url: '/products/postage',
                  qyt: 1,
                },
                giftCard: {
                  id: '39532033146985',
                  url: '/products/visa-gift-card_new',
                  qyt: 1,
                },
              },
            };
          }),

        cartTotal: prices.totalPrice,
        wallet: showWallet,
        paymentMethodKey: !showWalletBtn && paymentMethodId,
        discountCode: discountCouponCode?.payloadValue,
        discountValue: discountCouponCode?.apiDiscountResponse.value,
        discountValueType: discountCouponCode?.apiDiscountResponse.value_type,
      };

      console.log("payload",payload);

      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/wallet-order?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        },
      );
      const json = await res.json();
    } catch (error) {
      console.error(error, 'error on CreateCard');
    }
  }

  console.log('cartData', cartData);
  console.log('discountCouponCode', discountCouponCode);
  console.log('prices', prices);
  console.log('savedCard', savedCard);
  console.log('paymentMethodId', paymentMethodId);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="'w-full h-full gap-2 mt-8 mb-8">
            <div className="lg:pb-[80px]">
              <DynamicTitle title={'PAYMENT'} />
            </div>
            <div className="w-[98%] flex lg:flex-row flex-col mr-2 ml-2 gap-8  justify-center">
              <div className="p-5 bg-white lg:max-w-[42%] lg:w-full w-[90%] lg:mx-0 mx-auto rounded-xl font-bold">
                <div className="border border-solid border-[#e6edf8] m-3 rounded-tl-lg rounded-tr-lg">
                  <div
                    className={`p-3 text-sm cursor-pointer rounded-tl-lg rounded-tr-lg ${
                      showWallet ? 'bg-[#ef6e6e] bg-opacity-25' : ''
                    }`}
                    onClick={showWalletBtn}
                  >
                    <input
                      className="cursor-pointer"
                      type="radio"
                      name="action"
                      checked={showWallet}
                      style={{boxShadow: 'none'}}
                    />
                    &emsp; USE WALLET
                  </div>
                  <hr />
                  {showWallet && (
                    <div className="p-3">
                      <div className="border border-solid border-[#e6edf8] p-2 pl-4 pr-5 mb-3">
                        <span className="flex justify-between items-center text-sm text-[#001a5f] font-bold">
                          <span className="flex-1">WALLET BALANCE </span>
                          <span className="flex-1 text-3xl md:text-4xl text-[#ef6e6e] font-black text-right">
                            $
                            {walletBalance && walletBalance.balance
                              ? walletBalance.balance
                              : ''}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                  <hr />
                  <div
                    className={`p-3 cursor-pointer text-sm ${
                      showWallet ? '' : 'bg-[#ef6e6e] bg-opacity-25'
                    }`}
                    onClick={cardDetailBtn}
                  >
                    <input
                      type="radio"
                      className="cursor-pointer"
                      name="action"
                      checked={showCardDetail}
                      style={{boxShadow: 'none'}}
                    />
                    &emsp; USE CREDIT CARD
                  </div>
                  {showCardDetail && (
                    <div className="p-3">
                      <div className="mt-2">
                        <div className="text-lg font-bold">
                          CREDIT CARD INFORMATION
                        </div>
                        <div className="text-base font-bold mt-2">
                          Card Details
                        </div>
                      </div>
                      {savedCard &&
                        savedCard.map((item) => (
                          <div className="border border-solid border-[#e6edf8] p-2 mt-1 mb-2 flex justify-between flex">
                            <div
                              onClick={() => setPaymentMethodId(item.paymentId)}
                              className="flex justify-between cursor-pointer items-center text-xs font-bold"
                            >
                              <input
                                checked={paymentMethodId === item.paymentId}
                                type="radio"
                                style={{boxShadow: 'none'}}
                                name="stipe-action"
                                className="mr-2 cursor-pointer"
                              />
                              <span className=" tracking-wide">
                                **********{item.cardLast4Number}
                              </span>
                            </div>

                            <div>
                              <span>
                                {item.cardExpMonth}/{item.cardExpYear}
                              </span>
                            </div>
                          </div>
                        ))}
                      <div className="savedCard flex items-start justify-between flex-wrap sm:flex-row flex-col mt-4">
                        <div className="text-sm flex items-center">
                          <input
                            type="radio"
                            name="saved-action"
                            checked
                            id="saved-credit-card"
                            className="cursor-pointer"
                            style={{boxShadow: 'none'}}
                          />
                          <label htmlFor="saved-credit-card">
                            &nbsp;Use Saved Credit Card
                          </label>
                        </div>
                        <div className="sm:mt-0 mt-[10px]">
                          <button
                            className="bg-[#EF6E6E] w-[200px] text-[#fff] p-2 rounded"
                            onClick={() => onpenAddCardModal()}
                          >
                            Add New Card
                          </button>
                        </div>
                      </div>
                      <div className="w-[100%] h-[1px] border border-t-black mt-5"></div>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex justify-center">
                  <button
                    className="bg-[#EF6E6E] w-[200px] text-[#fff] p-4 mt-6 mb-3 rounded flex"
                    onClick={() => setShowCartPage(true)}
                  >
                    <HiArrowLongLeft className="text-2xl mr-2 " />
                    GO BACK TO CART
                  </button>
                </div>
              </div>
              <div className="lg:max-w-[35%] lg:w-full w-[90%] lg:mx-0 mx-auto">
                <div className="p-5 bg-white  rounded-xl">
                  <h1 className="text-left font-bold text-2xl">
                    ORDER SUMMARY
                  </h1>
                  <span className="flex justify-between items-center mt-3 mb-3">
                    <span className="font-medium">Subtotal</span>
                    <span>${prices.subtotalPrice}</span>
                  </span>
                  {discountCouponCode.apiDiscountResponse?.value && (
                    <span className="flex justify-between items-center mt-3 mb-6">
                      <span>
                        <span className="mr-2 font-medium">Order Discount</span>
                        <span className="text-xs font-medium bg-[#ef6e6e] bg-opacity-25 rounded p-1">
                          {discountCouponCode.oldTriedPayloadValue}
                        </span>
                      </span>
                      <span>
                        -$
                        {
                          discountCouponCode.apiDiscountResponse
                            .discountedAmount
                        }
                      </span>
                    </span>
                  )}
                  <div className="w-full h-[1px] bg-black"></div>
                  <span className="flex justify-between items-center mt-3 mb-3 font-bold">
                    Total <span>${Number(prices.totalPrice)?.toFixed(2)}</span>
                  </span>
                  <div className="font-bold">
                    <span>If you have a discount code, enter it here:</span>
                    <div
                      className="flex gap-2 justify-start items-stretch mt-3"
                      style={{maxWidth: '90%'}}
                    >
                      <input
                        className="flex-2 w-full rounded text-sm"
                        type="text"
                        value={discountCouponCode.payloadValue}
                        placeholder="Discount code"
                        onChange={(e) =>
                          setDiscountCouponCode((prevDiscountCouponCode) => {
                            return {
                              ...prevDiscountCouponCode,
                              payloadValue: e.target.value,
                            };
                          })
                        }
                      />
                      <button
                        onClick={handleApplyDiscountCoupon}
                        className="flex-1 bg-[#EF6E6E] w-full justify-center text-[#fff] p-2 pr-5 pl-5 rounded flex font-bold"
                      >
                        Apply
                      </button>
                    </div>
                    {discountCouponCode.apiDiscountResponse?.message && (
                      <div
                        className="mt-5 bg-[#ffd4d4] bg-opacity-25 border border-[#EF6E6E] p-2 text-xs"
                        style={{maxWidth: '90%'}}
                      >
                        {discountCouponCode.apiDiscountResponse.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={paymentPurchase}
                    className="bg-[#EF6E6E] w-full justify-center text-[#fff] p-3 text-lg mt-8 rounded flex font-bold"
                  >
                    PURCHASE
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showCardBox && (
            <Modal
              children={
                <Elements stripe={stripe}>
                  {!savedCard && (
                    <div className="w-[100%] border border-solid border-black p-3 mt-7">
                      <div className="lg:grid-rows-2 grid  flex gap-3 md:flex-row flex-col">
                        <div>
                          <label htmlFor="">Full Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="name"
                            disabled
                            // placeholder="FullName"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            className="mt-2 border border-solid border-black p-3 w-[100%]"
                          />
                        </div>
                        <div>
                          <label htmlFor="">Email</label>
                          <input
                            id="email"
                            disabled
                            name="email"
                            type="text"
                            //  placeholder="email"
                            value={formData.email}
                            onChange={(e) => handleChange(e)}
                            className="mt-2 border border-solid border-black p-3 w-[100%]"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label htmlFor="" className="">
                          Address
                        </label>
                        <input
                          id="address1"
                          name="address.line1"
                          type="text"
                          placeholder="Address"
                          required
                          value={formData.address.line1}
                          onChange={(e) => handleChange(e)}
                          className="mt-2 border border-solid border-black p-3 w-[100%]"
                        />
                      </div>
                      <div className="mt-2">
                        <label htmlFor="" className="">
                          Apartment,suite,etc
                        </label>
                        <input
                          id="address2"
                          name="address.line2"
                          type="text"
                          placeholder="Address 2"
                          value={formData.address.line2}
                          onChange={(e) => handleChange(e)}
                          className="mt-2 border border-solid border-black p-3 w-[100%]"
                        />
                      </div>
                      <div className="mt-2">
                        <label htmlFor="" className="">
                          City
                        </label>
                        <input
                          id="city"
                          name="address.city"
                          type="text"
                          required
                          placeholder="City"
                          value={formData.address.city}
                          onChange={(e) => handleChange(e)}
                          className="mt-2 border border-solid border-black p-3 w-[100%]"
                        />
                      </div>
                      <div className="lg:grid-rows-2 grid flex gap-3 md:flex-row flex-col">
                        <div>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="country"
                          >
                            Country
                          </label>
                          <select
                            onChange={(e) => handleChange(e)}
                            value={formData.address.country}
                            itemID="country"
                            name="address.country"
                            id="country"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            {location.countries.map((country) => (
                              <option
                                key={country.country}
                                value={country.country}
                              >
                                {country.country}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="country"
                          >
                            Country
                          </label>
                          <select
                            onChange={(e) => handleChange(e)}
                            value={formData.address.state}
                            name="address.state"
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                              errors.state ? 'border-red-500' : ''
                            }`}
                            id="state"
                          >
                            <option value="">Select a state</option>
                            {selectedCountry &&
                              selectedCountry.states.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                          </select>
                          {errors.state && (
                            <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic ">
                              {errors.state}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <StripeCardComp
                    setPaymentMethodId={setPaymentMethodId}
                    AddCreditCard={AddCreditCard}
                  />
                </Elements>
              }
              cancelLink={closeModal}
            />
          )}
        </>
      )}
    </>
  );
}
