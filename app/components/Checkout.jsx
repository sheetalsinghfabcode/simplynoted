import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { loadStripe } from '@stripe/stripe-js';
import StripeCardComp from './StripeCardComp';
import { Elements } from '@stripe/react-stripe-js';
import { Modal } from './Modal';
import Loader from './modal/Loader';
import DynamicTitle from './Title';
import { getApi, postApi } from '~/utils/ApiService';
import { API_PATH } from '~/utils/Path';
import DynamicButton from './DynamicButton';
import { useStateContext } from '~/context/StateContext';
import location from "../../location.json"
import { useNavigate } from '@remix-run/react';

import { Link } from '~/components';
import CircularLoader from './CircularLoder';
import ConfirmationModal from './modal/ConfirmationModal';

export function CheckoutData({
  setShowCartPage,
  isModalOpen,
  StripeKey,
  totalPrize,
  cartData,
  cartNote,
  deleteCartItem,
  postalId,
  postalId2,
}) {
  const stripe = loadStripe(`${StripeKey}`);
  let customerid, fullName, userEmail, firstName, lastName, selectedText;
  const [showWallet, setShowWallet] = useState(true);
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [showCardBox, setShowCardBox] = useState(false);
  const [savedCard, setSavedCart] = useState([]);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [newCardAdded, setNewCardAdded] = useState(false);
  const [customerID, setCustomertID] = useState('');
  const [loader, setloader] = useState(false);
  const [customerInformation, setCustomerInformation] = useState([]);
  const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);
  const [selectedOrderPurchaseQuantity, setSelectedOrderPurchaseQuantity] =
    useState('');
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

  const [showPlan, setShowPlan] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [errors, setErrors] = useState({});
  const [walletBalance, setWalletBalance] = useState('');
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [paymentLoaderMessage, setPaymentLoaderMessage] = useState(false);
  const { setCartCountVal, setCartData, setWalletPlan } = useStateContext();
  const navigate = useNavigate();

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
      const res = await // postApi(
        //   `${API_PATH.CREATE_STRIPE_CUSTOMER}${customerID}`,
        //   {
        //     name: formData.name || '',
        //     email: formData.email || '',
        //     'address[line1]': formData.address.line1 || '',
        //     'address[line2]': formData.address.line2 || '',
        //     'address[city]': formData.address.city || '',
        //     'address[state]': formData.address.state || '',
        //     'address[country]': formData.address.country || '',
        //     paymentMethodId: id || '',
        //   },
        // );
        fetch(
          `https://api.simplynoted.com/stripe/create-customer?customerId=${customerID}`,
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
      setNewCardAdded(true);
      setShowCardBox(false);
      setloader(false);
    } catch (error) {
      setloader(false);
      console.error(error, 'error on CreateCard');
    }
  }
  async function addNewCreditCard(paymentID) {
    try {
      setloader(true);
      const res = await // postApi(`${API_PATH.ADD_NEW_CARD}${customerID}`, {
        //   paymentMethodId: paymentID,
        // });
        fetch(
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
      setNewCardAdded(!newCardAdded);
      setShowCardBox(false);
      setloader(false);
    } catch (error) {
      setloader(false);
      console.error(error, 'addNewCreditCard ------');
    }
  }
  async function getSavedCards(Id) {
    try {
      const res = await // getApi(`${API_PATH.GET_STRIPE_CUSTOMER_DATA}${Id}`);
        fetch(
          `https://api.simplynoted.com/stripe/customer-data?customerId=${Id}`,
        );
      const json = await res.json();
      if (json) {
        setCustomerInformation(json.customer);
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
      let res = await // getApi(
        //   `${API_PATH.GET_DISCOUNT_COUPON}${discountCouponCode.payloadValue}&amount=${totalPrize}&customerId=${customerID}`,
        // );
        fetch(
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
          apiDiscountResponse: { message: 'Unable to apply discount code.' },
        };
      });
    }
  }

  useEffect(() => {
    selectedText = localStorage.getItem('selectedOrderPurchaseQuantity');
    setSelectedOrderPurchaseQuantity(selectedText);
  }, []);

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
    const { name, value } = e.target;
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

  const selectedCountry = location.countries?.find(
    (country) => country.country === formData.address.country,
  );
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

  function separateFullName(fullName) {
    // Split the full name into an array of words
    let nameArray = fullName?.split(' ');

    // Extract the first name (first element of the array)
    let firstName = nameArray && nameArray[0];

    // Extract the last name (join the remaining elements of the array with a space)
    let lastName = nameArray?.slice(1).join(' ');

    // Return an object with firstName and lastName properties
    return {
      firstName: firstName,
      lastName: lastName,
    };
  }

  let name = customerInformation?.name;
  let separatedNames = separateFullName(name);

  const totalPrice = Number(prices?.totalPrice)?.toFixed(2);





  async function paymentPurchase() {
    if ((walletBalance?.balance < 100 || walletBalance?.balance < prices?.totalPrice ) && showWallet) {
      setOpenModal(true);
    }
    else {
      setPurchaseCompleted(true)
      setPaymentLoaderMessage('Processing your order...');
      try {
        setloader(true);
        const postageUSCountries = [
          'USA',
          'US',
          'United States',
          'United States of America',
          'America',
          'u.s',
          'us',
          'usa',
          'u.s.a',
        ];

      const payload = {
        billingAddress: {
          firstName: separatedNames?.firstName ? separatedNames?.firstName : '',
          lastName: separatedNames?.lastName ? separatedNames?.lastName : '',
          email: customerInformation?.email ? customerInformation?.email : '',
          address: customerInformation?.address?.line1
            ? customerInformation.address?.line1
            : '',
          apartment: customerInformation?.address?.line2
            ? customerInformation.address?.line2
            : '', 
          city: customerInformation?.address?.city
            ? customerInformation.address?.city
            : '',
          country: customerInformation?.address?.country
            ? customerInformation.address?.country
            : '',
          state: customerInformation?.address?.state
            ? customerInformation.address?.state
            : '',
        },
        cartNote: cartNote ? cartNote : '',
        cartItems:
          cartData &&
          cartData.map((item) => {
            let senderFullName =
              item.senderAddress?.firstName +
              ' ' +
              item.senderAddress?.lastName;
            let receiverFullName =
              item.reciverAddress?.firstName +
              ' ' +
              item.reciverAddress?.lastName;
            let giftCard = null;
            if (item.giftCardName) {
              let giftProdUrl = item.giftCardProdUrl.split('.com/')[1];
              giftCard = {
                id: item.giftCardId, // Add a unique identifier for the gift card
                url: giftProdUrl, // URL based on gift card name
                qyt: item.qyt,
              };
            }
            let shipping = null;
            if (item.isShippidata) {
              let shippingUrl = item.shippingMethodProdUrl.split('.com/')[1];
              shipping = {
                id: item.shippingData.node?.id?.match(/\d+/g)?.join(''),
                url: shippingUrl,
                qyt: 1,
              };
            }
            let postageUS = null;
            let postageNonUS = null;
            if (
              (item.shippingData &&
                item.shippingData.node.title ==
                  'Ship Cards in Bulk - Cards plus Blank Envelopes Unsealed') ||
                (item.shippingData &&
                  item.shippingData.node.title ==
                  'Ship Cards in Bulk - Cards Only') ||
                (item.shippingData &&
                  item.shippingData.node.title ==
                  'Ship Cards in Bulk - Cards Plus Envelopes Addressed, Unsealed, Not Stamped') ||
                (item.shippingData &&
                  item.shippingData.node.title ==
                  'Ship Cards in Bulk - Cards Plus Envelopes Addressed and Sealed, Not Stamped')
              ) {
                postageUS = null;
                postageNonUS = null;
              } else if (item.reciverAddress) {
                const isPostageUSCountry = postageUSCountries.includes(
                  item.reciverAddress?.country,
                );
                isPostageUSCountry
                  ? (postageUS = {
                    id: postalId,
                    url: '/products/postage',
                    qyt: item.qyt,
                  })
                  : (postageNonUS = {
                    id: postalId2,
                    url: '/products/postage',
                    qyt: item.qyt,
                  });
              } else {
                if (item.usCount) {
                  postageUS = {
                    id: postalId,
                    url: '/products/postage',
                    qyt: item.usCount,
                  };
                }
                if (item.nonUSCount) {
                  postageNonUS = {
                    id: postalId2,
                    url: 'products/postage',
                    qyt: item.nonUSCount,
                  };
                }
              }
              return {
                productTitle: item.productTitle,
                productId: item?.productId?.match(/\d+/g)?.join(''),
                variant_id: item.variant_id,
                productUrlGet: item.productGetUrl,
                productPrice: `$${item.cartTotal}`,
                qyt: item.qyt,
                properties: {
                  bulk_shipping_address: item.locationForShipMethod
                    ? item.locationForShipMethod.firstName +
                    item.locationForShipMethod.lastName +
                    item.locationForShipMethod.address1 +
                    item.locationForShipMethod.address2 +
                    item.locationForShipMethod.city +
                    item.locationForShipMethod.state +
                    item.locationForShipMethod.country +
                    item.locationForShipMethod.postalCode
                    : '',
                  selectedText:
                    selectedOrderPurchaseQuantity &&
                    selectedOrderPurchaseQuantity,
                  font_family: item.fontFamily,
                  custom_message: item.baseCustomMessage,
                  font_size: item.fontSizeMsg ? item.fontSizeMsg : '50px',
                  font_size_cust_card: item.fontSizeMsg
                    ? item.fontSizeMsg
                    : '50px',
                  line_ht_cust_card: item.lineHeight ? item.lineHeight : '50px',
                  signoff: item?.endText,
                  custom_font: item?.customFontName,
                  font_selection: item?.fontFamily,
                  recipient_upload: item?.csvFileURL
                    ? item.csvFileURL
                    : 'Not Applicable :',
                  ship_date: item?.optionalShipDate ? item.optionalShipDate : '',
                  sender_fullName: senderFullName && senderFullName,
                  sender_address1: item.senderAddress?.address1,
                  sender_address2: item.senderAddress?.address2,
                  sender_city: item.senderAddress?.city,
                  sender_state: item.senderAddress?.state,
                  sender_zip: item.senderAddress?.zip,
                  sender_country: item.senderAddress?.country,
                  sender_id: item.senderAddress?._id,
                  gift_card_ID: giftCard ? giftCard.id : '',
                  uqId: giftCard ? giftCard.id : '',
                  gift_id: giftCard ? giftCard.id : '',
                  recipient_id: item?.reciverAddress?._id,
                  recipient_fullName: receiverFullName && receiverFullName,
                  recipient_businessName: item?.reciverAddress?.businessName,
                  recipient_address1: item?.reciverAddress?.address1,
                  recipient_address2: item?.reciverAddress?.address2,
                  recipient_city: item?.reciverAddress?.city,
                  recipient_state: item?.reciverAddress?.state,
                  recipient_zip: item?.reciverAddress?.zip,
                  recipient_country: item?.reciverAddress?.country,
                  custom_pdf: item?.custom_pdf,
                },
                additionalProducts: {
                  ...(giftCard && { giftCard }),
                  ...(shipping && { shipping }),
                  ...(postageUS && { postageUS }),
                  ...(postageNonUS && { postageNonUS }),
                },
              };
            }),

          cartTotal: Number(totalPrice),
          wallet: showWallet,
          paymentMethodKey: !showWallet && paymentMethodId,
          discountCode: discountCouponCode?.oldTriedPayloadValue,
          discountValue: discountCouponCode?.apiDiscountResponse?.value
            ? discountCouponCode?.apiDiscountResponse?.value
            : '',
          discountValueType: discountCouponCode?.apiDiscountResponse?.value_type
            ? discountCouponCode?.apiDiscountResponse?.value_type
            : '',

        };


        const res = await // postApi(
          //   `${API_PATH.PURCHASE_API}${customerID}`,
          //   payload,
          // );
          fetch(
            `https://api.simplynoted.com/api/storefront/checkout?customerId=${customerID}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            },
          );
        const json = await res.json();
        // console.log(json.result,"----rresult data");
        if (json.result.success) {
          setCartCountVal(0);
          setCartData(null)
          deleteCartItem()
          localStorage.setItem('mydata', '[]');
          setPaymentLoaderMessage("Your order has been successfully processed. ");
          setTimeout(() => {
            setPurchaseCompleted(false);
            setPaymentSuccessfull(true);
          }, 1500);
        } else {
          setPaymentLoaderMessage(json.result.message);
          setTimeout(() => {
            setPurchaseCompleted(false);
          }, 1500);
        }
      } catch (error) {
        setPaymentLoaderMessage("Error while processing your order. Please try after some time");
        console.error(error, 'error on CreateCard');
      }
    }
  }

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      errors.email = 'Email is required and must be valid';
      isValid = false;
    }

    // Validate address line 1
    if (!formData.address?.line1.trim()) {
      errors.addressLine1 = 'Address is required';
      isValid = false;
    }

    // Validate city
    if (!formData.address.city.trim()) {
      errors.city = 'City is required';
      isValid = false;
    }

    // Validate country
    if (!formData.address.country.trim()) {
      errors.country = 'Country is required';
      isValid = false;
    }

    // Validate state
    if (!formData.address.state.trim()) {
      errors.state = 'State is required';
      isValid = false;
    }

    setErrors(errors); // Set errors state to display validation messages

    return isValid;
  };

  function continueShopping() {
    navigate('/collections/best-sellers');
  }

  return (
    <div className="relative">
      {purchaseCompleted && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 flex justify-center items-center z-50">
          <CircularLoader textColor="text-white" title={paymentLoaderMessage} />
        </div>
      )}

      <>
        {!paymentSuccessfull ? (
          <div className="'w-full h-full gap-2 mt-[4.5rem]">
            <div className="lg:pb-[40px]">
              <DynamicTitle title={'PAYMENT'} />
            </div>
            <div className="w-[98%] flex lg:flex-row flex-col mr-2 ml-2 gap-8  justify-center">
              <div className="p-5 bg-white lg:max-w-[48%] lg:w-full w-[90%] lg:mx-0 mx-auto rounded-xl font-bold border border-[#aaa]">
                <div className="border border-solid border-[#e6edf8] sm:m-3 rounded-tl-lg rounded-tr-lg">
                  <div
                    className={`p-3 text-[15px] cursor-pointer rounded-tl-lg rounded-tr-lg md:flex grid justify-between ${showWallet ? 'bg-[#ef6e6e] bg-opacity-25' : ''
                      }`}
                    onClick={showWalletBtn}
                  >
                    <div>
                      <input
                        className="cursor-pointer highlight-none"
                        type="radio"
                        name="action"
                        checked={showWallet}
                        onChange={(e) => setShowWallet(e.target.checked)}
                      />
                      &emsp; USE WALLET
                    </div>
                    <div>
                      <Link to="/pages/simply-noted-plans">
                        <span className="text-sm font-bold sm:mt-[0px] mt-[8px] underline pointer-cursor hover:text-[#0056b3">
                          Get huge discounts with our Plans and Packages
                        </span>
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={`overflow-hidden  ${showWallet
                      ? 'max-h-[1000px] transition-max-h ease-in-out duration-[3s]  '
                      : 'max-h-0 transition-max-h ease-in-out duration-0'
                      }`}
                  >
                    <div className="border border-solid border-[#e6edf8] sm:p-[20px] p-[10px] sm:m-[15px] m-[7px]">
                      <span className="flex justify-between items-center text-[#001a5f] flex-wrap">
                        <span className="flex-1 sm:text-[15px] text-[12px] font-bold">
                          WALLET BALANCE{' '}
                        </span>
                        <span className="flex-1 sm:text-[46px] text-[16px] text-[#ef6e6e] font-black text-right">
                          $
                          {walletBalance && walletBalance.balance
                            ? walletBalance.balance
                            : '0'}
                        </span>
                      </span>
                    </div>
                  </div>

                  <hr />
                  <div
                    className={`p-3 cursor-pointer text-[15px] font-bold ${showWallet ? '' : 'bg-[#ef6e6e] bg-opacity-25'
                      }`}
                    onClick={cardDetailBtn}
                  >
                    <input
                      type="radio"
                      className="cursor-pointer highlight-none"
                      name="action"
                      checked={showCardDetail}
                      onChange={(e) => setShowCardDetail(e.target.checked)}
                    />
                    &emsp; USE CREDIT CARD
                  </div>

                  <div
                    className={`overflow-hidden  ${showCardDetail
                      ? 'max-h-[1000px] transition-max-h ease-in-out duration-[3s] '
                      : 'max-h-0 transition-max-h ease-in-out duration-700'
                      }`}
                  >
                    <div className="p-3">
                      <div className="mt-2 ">
                        <div className="sm:text-[20px] text-base font-bold">
                          CREDIT CARD INFORMATION
                        </div>
                        <div className="text-base font-bold mt-2">
                          Card Details
                        </div>
                      </div>
                      {savedCard &&
                        savedCard.map((item) => (
                          <div
                            key={item.id}
                            className="border border-solid border-[#e6edf8] p-2 mt-1 mb-2  justify-between flex"
                          >
                            <div
                              onClick={() => setPaymentMethodId(item.paymentId)}
                              className="flex justify-between cursor-pointer items-center text-[14px] font-bold"
                            >
                              <input
                                checked={paymentMethodId === item.paymentId}
                                type="radio"
                                name="stipe-action"
                                className="mr-2 cursor-pointer highlight-none"
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
                      <div className="savedCard flex items-start justify-between flex-wrap md:flex-row flex-col mt-4">
                        <div className="text-base font-normal flex items-center">
                          <input
                            type="radio"
                            name="saved-action"
                            defaultChecked
                            id="saved-credit-card"
                            className="cursor-pointer highlight-none"
                          />
                          <label htmlFor="saved-credit-card">
                            &nbsp;Use Saved Credit Card
                          </label>
                        </div>
                        <div className="md:mt-0 mt-[10px]">
                          <button
                            className="bg-[#EF6E6E] md:w-[200px] w-[254px] md:h-full h-[49px] text-[#fff] p-2 rounded"
                            onClick={() => onpenAddCardModal()}
                          >
                            Add New Card
                          </button>
                        </div>
                      </div>
                      <div className="w-[100%] h-[1px] border border-t-black mt-5"></div>
                    </div>
                  </div>
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
              <div className="lg:max-w-[35%] lg:w-full w-[90%] lg:mx-0 mx-auto ">
                <div className="p-5 bg-white  rounded-xl border border-[#aaa]">
                  <h1 className="text-left font-bold sm:text-[30px] text-[26px]">
                    ORDER SUMMARY
                  </h1>
                  <span className="flex justify-between items-center sm:mt-3 mt-[34px] mb-3 text-base">
                    <span className="font-medium">Subtotal</span>
                    <span>${prices.subtotalPrice}</span>
                  </span>
                  {discountCouponCode.apiDiscountResponse?.value && (
                    <span className="flex justify-between items-center mt-3 mb-6">
                      <span>
                        <span className="mr-2 font-medium text-base">
                          Order Discount
                        </span>
                        <span className="text-base font-medium bg-[#ef6e6e] bg-opacity-25 rounded p-1">
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
                  <span className="flex justify-between items-center sm:mt-3 mb-[mt-[32px] font-bold text-base">
                    Total <span>${Number(prices.totalPrice)?.toFixed(2)}</span>
                  </span>
                  <div className="font-bold sm:mt-[0px] mt-[31px] text-base">
                    <span>If you have a discount code, enter it here:</span>
                    <div
                      className="flex gap-2 justify-start items-stretch mt-3"
                      style={{ maxWidth: '100%' }}
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
                        style={{ maxWidth: '90%' }}
                      >
                        {discountCouponCode.apiDiscountResponse.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    disabled={((!walletBalance || walletBalance?.balance === 0 && showWallet) || (!savedCard &&  showCardDetail ) )}
                    onClick={paymentPurchase}
                    className="bg-[#EF6E6E] w-full justify-center text-[#fff] p-3 text-lg mt-8 rounded flex font-bold"
                  >
                    PURCHASE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full gap-2 mt-8 mb-8">
            <div className="w-[90%]  m-auto mt-[4rem] mb-10 flex justify-center">
              <div>
                <h3 className="text-[black] font-karla sm:text-[40px] text-[24px] mb-4">
                  Thank you for your order!
                </h3>
                <div className="flex justify-center">
                  <DynamicButton
                    className="bg-[#EF6E6E] m-5 w-full max-w-[225px]"
                    text="CONTINUE SHOPPING"
                    onClickFunction={() => continueShopping()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {showCardBox && (
          <Modal
            children={
              <Elements stripe={stripe}>
                {!savedCard && (
                  <div className="mb-2 w-[100%] p-3">
                    <div className="lg:grid-rows-2 grid gap-3 ">
                      <div>
                        <label
                          htmlFor=""
                          className="text-gray-700 text-sm font-bold mb-2"
                        >
                          Full Name
                        </label>
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
                        <label
                          htmlFor=""
                          className="text-gray-700 text-sm font-bold mb-2"
                        >
                          Email
                        </label>
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
                      <label
                        htmlFor=""
                        className="text-gray-700 text-sm font-bold mb-2"
                      >
                        Address
                      </label>
                      <input
                        id="address1"
                        name="address.line1"
                        type="text"
                        placeholder="Address"
                        required
                        value={formData.address.line1}
                        onChange={(e) => {
                          errors.addressLine1 = '';
                          handleChange(e);
                        }}
                        className="mt-2 border border-solid border-black p-3 w-[100%]"
                      />
                      {errors.addressLine1 && (
                        <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                          {errors.addressLine1}
                        </p>
                      )}
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor=""
                        className="text-gray-700 text-sm font-bold mb-2"
                      >
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
                      <label
                        htmlFor=""
                        className="text-gray-700 text-sm font-bold mb-2"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        name="address.city"
                        type="text"
                        required
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => {
                          errors.city = '';
                          handleChange(e);
                        }}
                        className="mt-2 border border-solid border-black p-3 w-[100%]"
                      />
                      {errors.city && (
                        <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div className="lg:grid-rows-2 grid mt-2  gap-3 ">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="state"
                        >
                          State
                        </label>
                        <select
                          onChange={(e) => {
                            errors.state = '';
                            handleChange(e);
                          }}
                          value={formData.address.state}
                          name="address.state"
                          className={`appearance-none border border-solid  border-black h-[46px] w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${errors.state ? 'border-red-500' : ''
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
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold "
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
                          className="appearance-none border mt-2 border-solid  h-[46px]  border-black  w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          {location.countries?.map((country) => (
                            <option
                              key={country.country}
                              value={country.country}
                            >
                              {country.country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                <StripeCardComp
                  savedCard={savedCard ? savedCard : []}
                  validateForm={validateForm}
                  setPaymentMethodId={setPaymentMethodId}
                  AddCreditCard={AddCreditCard}
                />
              </Elements>
            }
            cancelLink={closeModal}
          />
        )}
      </>
      <ConfirmationModal
        show={openModal}
        title="Attention: Low Wallet Balance"
        message={`Your Wallet has insufficient funds ${walletBalance?.balance < 100 ? "(minimum of $100)" : ""} for this purchase. You can either purchase a new Pre-Paid Package or use your credit card on file for this purchase.`}

        confirmText="Purchase Package"
        onConfirm={() => {
          setTimeout(() => {
            setWalletPlan(true)
          }, 800);
          setOpenModal(false)
          navigate("/pages/simply-noted-plans")
        }}
        cancelText="Use credit card"
        onCancel={() => {
          setOpenModal(false)
          setShowWallet(false)
          setShowCardDetail(true)
        }}
      />

    </div>
  );
}
