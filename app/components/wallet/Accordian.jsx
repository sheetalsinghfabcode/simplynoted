import React, {useState, useEffect} from 'react';
import location from '../../../location.json';
import StripeCard from './StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '../CircularLoder';
import {useStateContext} from '~/context/StateContext';
import arrow_ups from '../../../assets/Image/arrow-up.png';
import arrow_down from '../../../assets/Image/arrow-down.png';
import SuccessfullLoader from '../SucessfullLoader';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import StripeCardComp from '../StripeCardComp';
import { SERVER_BASE_URL } from '../../data/config';

const Accordion = ({
  StripeKey,
  finalPrice,
  setWalletPurchase,
  setWalletPayment,
  amount,
  selectedPlan,
  packageProduct,
  subscriptionProduct,
  subscriptionTitle,
  subscriptionPriceId,
  stripePayments,
}) => {
  const stripe = Stripe(StripeKey);
  const [isBillingOpen, setIsBillingOpen] = useState(true);
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(true);
  const [loader, setloader] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [savedCard, setSavedCard] = useState([]);
  const [showStripeCard, setShowStripeCard] = useState(false);
  const [customerID, setCustomertID] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [customerData, setCustomerData] = useState({});
  const {setCartCountVal, setIsCartUpdated} = useStateContext();

  const {
    setActiveTab,
    loaderTitle,
    setLoaderTitle,
    setStripeLoader,
    setAccountTabName,
    setIsStripeDataUpdated,
  } = useStateContext();

  let customerid, fullName, userEmail;

  let productId = packageProduct?.replace(/[^0-9]/g, '');
  let variantId = subscriptionProduct?.replace(/[^0-9]/g, '');

  const toggleBilling = () => {
    setIsBillingOpen(!isBillingOpen);
    setIsCardInfoOpen(false);
  };

  const toggleCardInfo = () => {
    setIsCardInfoOpen(!isCardInfoOpen);
    setIsBillingOpen(false);
  };

  const navigate = useNavigate();

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

  async function createCustomerId(id) {
    try {
      setloader(true);
      const res = await fetch(
        `${SERVER_BASE_URL}/stripe/create-customer?customerId=${customerID}`,
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
      if (json) {
        // Expecting to be an array in further usage
        json.paymentMethodId = [json.paymentMethodId];
        setPaymentMethodId(id);
        if (subscriptionTitle === 'Free') {
          paymentSave(subscriptionTitle, json, true,id);
        } else {
          await createSubscription(json);
        }
      }
    } catch (error) {
      setloader(false);
    }
  }

  async function addNewCreditCard(paymentID) {
    try {
      setloader(true);
      const res = await fetch(
        `${SERVER_BASE_URL}/stripe/add-new-payment-method?customerId=${customerID}`,
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

      const customerId = localStorage.getItem('customerId');
      await getSavedCards(customerId);
      setTimeout(() => {
        setloader(false);
        setShowStripeCard(!showStripeCard);
      }, [500]);
    } catch (error) {
      setloader(false);
    }
  }
  async function getSavedCards(Id) {
    try {
      const res = await fetch(
        `${SERVER_BASE_URL}/stripe/customer-data?customerId=${Id}`,
      );
      const json = await res.json();
      if (json) {
        setCustomerData(json.customer);
        setSavedCard(json.payments);
      }
    } catch (error) {}
  }
  useEffect(() => {
    customerid = localStorage.getItem('customerId');
    fullName = localStorage.getItem('SNFullName');
    userEmail = localStorage.getItem('SnEmail');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    setCustomertID(customerid);
    getSavedCards(customerid);
    formData.name = fullName ? fullName : firstName + ' ' + lastName;
    formData.email = userEmail;

    // formData.address.country = customerData && customerData.address?.country
  }, []);

  useEffect(() => {
    formData.address.line1 = customerData && customerData.address?.line1;
    formData.address.line2 = customerData && customerData.address?.line2;
    formData.address.state = customerData && customerData.address?.state;
    formData.address.city = customerData && customerData.address?.city;
  }, [customerData]);

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

    // Clear error for the specific field on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error for the field on change
    }));
  };

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

    // Validate address
    if (!formData.address?.line1) {
      errors.addressLine1 = 'Address is required';
      isValid = false;
    }

    // Validate city
    if (!formData.address.city) {
      errors.city = 'City is required';
      isValid = false;
    }

    // Validate country
    if (!formData.address.country) {
      errors.country = 'Country is required';
      isValid = false;
    }

    // Validate state
    if (!formData.address.state) {
      errors.state = 'State is required';
      isValid = false;
    }

    setErrors(errors); // Set errors state to display validation messages
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      const firstErrorElement = document.getElementById(firstErrorField);
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }

    // Open billing address section if there are any errors
    if (!isValid) {
      setIsBillingOpen(true);
      setStripeLoader(false);
    }
    return isValid;
  };

  const selectedCountry = location?.countries?.find(
    (country) => country.country === formData.address.country,
  );

  function extractDiscountAndCardsInfo(str) {
    // Regular expressions to extract discount and card numbers
    const discountRegex = /(\d*\.?\d+)% Discount/;
    const cardsRegex = /([\d,]+) Standard Cards/;

    // Extracting discount percentage
    const discountMatch = str?.match(discountRegex);
    const discount = discountMatch ? parseFloat(discountMatch[1]) : null;

    // Extracting number of cards
    const cardsMatch = str?.match(cardsRegex);
    let cards = null;
    if (cardsMatch) {
      cards = parseInt(cardsMatch[1]?.replace(/,/g, ''), 10);
    }

    // Convert discount and cards to strings
    const discountAsString = discount !== null ? discount.toString() : null;
    const cardsAsString = cards !== null ? cards.toString() : null;

    return {
      discount: discountAsString,
      cards: cardsAsString,
    };
  }

  // Example usage:
  const {discount, cards} = extractDiscountAndCardsInfo(selectedPlan);
  const createSubscription = async (json) => {
    try {
      const payLoad = {
        subscriptionPriceId: subscriptionPriceId,
        subscriptionName: subscriptionTitle,
      };

      const apiUrl = `${SERVER_BASE_URL}/stripe/create-subscription?customerId=${customerID}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await response.json();

      if (data.redirectUrl) {
        const result = await stripe.confirmCardPayment(data.client_secret);
        if (result?.error) {
          setPaymentLoader(false);
        } else {
          data.status = result.paymentIntent.status;
          paymentSave(data, json);
        }
      } else {
        paymentSave(data, json);
      }
    } catch (error) {
      setPaymentLoader(false);
      setloader(false);
      // Handle errors here
      console.error('Error:', error);
    }
  };

  function deleteCartItem() {
    const apiUrl = `${SERVER_BASE_URL}/api/storefront/cart-items/delete?customerId=${customerID}`;
    fetch(apiUrl, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.result.success) {
          setCartCountVal(0);
          setIsCartUpdated(true);
        }
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  }

  const paymentPurchase = async (data, json) => {
    const payLoad = {
      paymentMethodId: paymentMethodId
        ? paymentMethodId
        : json?.paymentMethodId[0],
      packageDiscount: Number(discount),
      packageQuantity: Number(cards),
      packagePrice: amount,
      description: selectedPlan,
      packageProduct: productId,
      subscriptionName: subscriptionTitle,
      subscriptionProduct: variantId,
      isSubscriptionOnly: true,
      isAutorenew: true,
    };

    const apiUrl = `${SERVER_BASE_URL}/stripe/package-payment?customerId=${customerID}`;

    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('packageDiscount', JSON.stringify(discount));
        localStorage.setItem('selectedPlan', selectedPlan);
        localStorage.setItem('amount', amount);
        // Handle the response data here
        if (data) {
          deleteCartItem();
          setLoaderTitle('Payment completed successfully... ');
          setTimeout(() => {
            navigate('/account', {
              state: {
                activeTab: 4,
                accountTabName: 'Manage Plans',
              },
            });
            setPaymentLoader(false);
            setIsStripeDataUpdated(true);
          }, 2000);
          setTimeout(() => {
            setActiveTab(4);
            setAccountTabName('Manage Plans');
          }, 2200);
        }
      })

      .catch((error) => {
        // Handle errors here

        console.error('Error:', error);
      });
  };


  const paymentSave = (data, json, directly,id) => {
    let payLoad;

    if (subscriptionTitle === 'Free') {
      payLoad = {
        subscriptionName: subscriptionTitle,
        packageDiscount: String(discount),
        packageQuantity: String(cards),
        packagePrice: String(amount),
        isAutorenew: true,
        paymentOnly: true,
      };
    } 
    else {
      payLoad = {
        subscriptionId: data.subscriptionId,
        subscriptionName: subscriptionTitle,
        packageDiscount: String(discount),
        paymentOnly: false,
        packageQuantity: String(cards),
        packagePrice: String(amount),
        isAutorenew: true,
        subscriptionStartDate: data.subscriptionStartDate,
        subscriptionEndDate: data.subscriptionEndDate,
        subscriptionStatus:
          data.status === 'succeeded' ? 'active' : data.status,
        isSubscriptionOnly: true
      };
    }

    const apiUrl = `${SERVER_BASE_URL}/stripe/payment-save?customerId=${customerID}`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((response) => {
        console.log('response', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        paymentPurchase(data, json);
        // Handle the response data here
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  };

  const setFirstPaymentId = () => {
    if (savedCard && savedCard.length > 0) {
      setPaymentMethodId(savedCard[0].paymentId); // Set the first payment ID
    }
  };

  // Calling the function to set the first payment ID when the component renders
  useEffect(() => {
    setFirstPaymentId();
  }, [savedCard]); // Run when savedCard changes

  return (
    <div className="w-full  relative max-w-[1440px] mt-[24px] mx-auto px-[24px]">
      {paymentLoader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 flex justify-center items-center z-50">
          <CircularLoader
            textColor="text-white"
            title={
              loaderTitle
                ? loaderTitle
                : 'Processing your payment securely. Please wait a moment.'
            }
          />
        </div>
      )}

      <div
        className={`w-full
          p-[20px]  border border-solid border-black mt-[14px] max-w-[640px] mx-auto`}
      >
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleBilling}
        >
          <span className="font-bold  md:text-[20px] text-[17px] text-[#001a5f]">
            Billing Address
          </span>
          <span className="">
            {isBillingOpen || errors.length > 0 ? (
              <FaAngleUp />
            ) : (
              <FaAngleDown />
            )}
          </span>
        </div>
        <div
          className={`overflow-hidden
         ${
           isBillingOpen || errors.length > 0
             ? 'max-h-[800px] transition-max-height '
             : 'max-h-0'
         }
        `}
        >
          <div className="rounded">
            <div className="w-full max-w-[650px]  mx-auto mt-3">
              <div className="grid-rows-2 lg:flex grid gap-3">
                <div className="w-full">
                  <label className="font-bold" htmlFor="">
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
                    className="mt-2 border rounded-md border-solid border-black p-3 w-[100%]"
                  />
                  {errors.name && (
                    <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="font-bold" htmlFor="">
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
                    className="mt-2 border  rounded-md border-solid border-black p-3 w-[100%]"
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="" className="font-bold">
                  Address
                </label>
                <input
                  id="address1"
                  name="address.line1"
                  type="text"
                  placeholder="Address"
                  required
                  disabled={customerData && customerData?.address?.line1}
                  value={formData.address.line1}
                  onChange={(e) => {
                    errors.addressLine1 = '';
                    handleChange(e);
                  }}
                  className="mt-2 border rounded-md border-solid border-black p-3 w-[100%]"
                />
                {errors.addressLine1 && (
                  <p className="text-red-500  mt-[2px] text-[14px] font-semibold italic">
                    {errors.addressLine1}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="" className="font-bold">
                  Apartment,suite,etc
                </label>
                <input
                  id="address2"
                  name="address.line2"
                  type="text"
                  disabled={customerData && customerData.address?.line2}
                  placeholder="Address 2"
                  value={formData.address.line2}
                  onChange={(e) => handleChange(e)}
                  className="mt-2 border rounded-md border-solid border-black p-3 w-[100%]"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="font-bold">
                  City
                </label>
                <input
                  id="city"
                  name="address.city"
                  type="text"
                  required
                  placeholder="City"
                  disabled={customerData && customerData.address?.city}
                  value={formData.address.city}
                  onChange={(e) => {
                    errors.city = '';
                    handleChange(e);
                  }}
                  className="mt-2 border rounded-md border-solid border-black p-3 w-[100%]"
                />
                {errors.city && (
                  <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="grid-rows-2 mt-2 lg:flex grid gap-3">
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <select
                    onChange={(e) => handleChange(e)}
                    value={formData.address.country}
                    itemID="country"
                    name="address.country"
                    disabled={customerData && customerData.address?.country}
                    id="country"
                    className="appearance-none rounded-md border h-[46px] w-full  border-solid border-black p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {location.countries.map((country) => (
                      <option key={country.country} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700  font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <select
                    onChange={(e) => {
                      errors.state = '';
                      handleChange(e);
                    }}
                    disabled={customerData && customerData.address?.state}
                    value={formData.address.state}
                    name="address.state"
                    className={`appearance-none rounded-md border h-[46px]  w-full  border-solid border-black p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
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
                    <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-solid border-black mt-[12px]"></div>
        <div className="mt-4  rounded">
          <div
            className="flex items-center border-b border-solid border-black pb-[15px] justify-between mb-3  cursor-pointer"
            onClick={toggleCardInfo}
          >
            <span className="font-bold md:text-[20px] text-[17px] text-[#001a5f]">
              Credit Card Information
            </span>
            <span className="">
              {!isCardInfoOpen ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </div>
          <div
            className={`overflow-hidden
            ${
              isCardInfoOpen ? 'max-h-[800px] transition-max-height' : 'max-h-0'
            }
          `}
          >
            <>
              <Elements stripe={stripe}>
                {savedCard &&
                  savedCard.map((item, i) => (
                    <label
                      key={i}
                      htmlFor={'item-index-' + i}
                      className={
                        paymentMethodId === item.paymentId
                          ? 'bg-[#ffdada] cursor-pointer border border-solid border-[#dbdbdb] rounded-md p-[1rem] mt-1 mb-2 flex justify-between '
                          : 'bg-[#f5fffa]  border border-solid border-[#dbdbdb] rounded-md p-[1rem] mt-1 mb-2 flex justify-between  cursor-pointer'
                      }
                    >
                      <div className="flex justify-start items-center text-[14px] font-bold ">
                        <input
                          id={'item-index-' + i}
                          type="radio"
                          onChange={() => setPaymentMethodId(item.paymentId)}
                          name="action"
                          checked={paymentMethodId === item.paymentId}
                          className="mr-2"
                        />
                        <span className="mr-[17rem] tracking-wide">
                          **********{item.cardLast4Number}
                        </span>
                        <span>
                          {item.cardExpMonth}/{item.cardExpYear}
                        </span>
                      </div>
                    </label>
                  ))}
                {savedCard && (
                  <div className="savedCard flex items-start justify-between mb-2 ">
                    <div>
                      <button
                        className="bg-[#1b5299] w-[200px] text-[#fff] p-2 rounded"
                        onClick={() => {
                          setShowStripeCard(!showStripeCard);
                        }}
                      >
                        Add New Card
                      </button>
                    </div>
                  </div>
                )}
                {loader && (
                  <CircularLoader title="Adding Card.." color="#ef6e6e" />
                )}
                {(!savedCard || showStripeCard) && (
                  <div className="p-4">
                    <StripeCard
                      addNewCreditCard={addNewCreditCard}
                      setPaymentMethodId={setPaymentMethodId}
                      createCustomerId={createCustomerId}
                      savedCard={
                        savedCard && savedCard.length > 0 ? savedCard : []
                      }
                      paymentPurchase={paymentPurchase}
                      validateForm={validateForm}
                      stripePayments={stripePayments}
                      setloader={setloader}
                      showStripeCard={showStripeCard}
                    />
                  </div>
                )}
              </Elements>

              <div className="flex justify-between font-bold   text-[#001a5f] border-y border-[#cfcfcf] p-[10px] items-center w-full">
                <div>Total</div>
                <div>${finalPrice}</div>
              </div>
              {stripePayments && stripePayments.length > 0 && (
                <div className="md:flex grid md:justify-between justify-normal  w-full gap-[10px] items-center my-[16px]">
                  <DynamicButton
                    text="Previous"
                    onClickFunction={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                      setWalletPurchase(true);
                      setWalletPayment(false);
                    }}
                    backArrow={true}
                    className="!bg-[#EF6E6E] w-full !h-[55px]  !py-[16px] !px-[30px] uppercase md:text-[16px] text-[12px]"
                  />
                  <button
                    type="submit"
                    onClick={() => {
                      if (validateForm()) {
                        setPaymentLoader(true);
                        if (subscriptionTitle === 'Free') {
                          paymentSave(subscriptionTitle, paymentMethodId, true,);
                        } else {
                          createSubscription(paymentMethodId);
                        }
                      }
                    }}
                    className="!bg-[#1b5299] w-full !h-[55px] text-[white] font-bold rounded-lg  !px-[30px] uppercase md:text-[16px] text-[12px]"
                  >
                    Complete Purchase
                  </button>
                </div>
              )}
            </>
          </div>
          <div className=" border-2 text-[12px] mt-[15px] bg-white text-left p-[10px] border-solid border-[#324879]">
            <span>
              Custom cards and international postage may cost extra. You will
              receive the same level of discount on custom cards.
            </span>
            <br />
            <br />
            <span>
              By making this purchase, you agree to allow us to automatically
              renew your prepaid package when your balance drops below $100 and
              to renew your subscription at the end of your subscription period.
              Both your subscription and prepaid package can be changed later
              from your Account area.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
