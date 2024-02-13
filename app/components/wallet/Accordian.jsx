import React, {useState, useEffect} from 'react';
import location from '../../../location.json';
import StripeCard from './StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '../CircularLoder';
import {useStateContext} from '~/context/StateContext';
import arrow_rights from '../../../assets/Image/arrow-right-faq.png';
import arrow_down from '../../../assets/Image/arrow-down.png';

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
  const stripe = loadStripe(StripeKey);
  const [isBillingOpen, setIsBillingOpen] = useState(true);
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [savedCard, setSavedCard] = useState([]);
  const [showStripeCard, setShowStripeCard] = useState(false);
  const [customerID, setCustomertID] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');

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
        `https://testapi.simplynoted.com/stripe/create-customer?customerId=${customerID}`,
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
        await createSubscription(id);
      }
    } catch (error) {
      setloader(false);
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
        `https://testapi.simplynoted.com/stripe/customer-data?customerId=${Id}`,
      );
      const json = await res.json();
      if (json) {
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
  }, [showStripeCard]);

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

  const createSubscription = async (id) => {
    try {
      const payLoad = {
        subscriptionPriceId: subscriptionPriceId,
        subscriptionName: subscriptionTitle,
      };

      const apiUrl = `https://api.simplynoted.com/stripe/create-subscription?customerId=${customerID}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });

      const data = await response.json();
      if (data) {
        id, data;
      }
      // Handle the response data here
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  const paymentPurchase = (id, savePaymentData) => {
    const payLoad = {
      paymentMethodId: id,
      packageDiscount: Number(discount),
      packageQuantity: Number(cards),
      packagePrice: amount,
      description: selectedPlan,
      packageProduct: productId,
      subscriptionProduct: variantId,
    };

    const apiUrl = `https://api.simplynoted.com/stripe/package-payment?customerId=${customerID}`;

    fetch(apiUrl, {
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
          paymentSave(savePaymentData);
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  };

  const paymentSave = (data) => {
    const payLoad = {
      subscriptionId: data.subscriptionId,
      subscriptionName: subscriptionTitle,
      isSubscriptionOnly: true,
      packageDiscount: String(discount),
      packageQuantity: String(cards),
      packagePrice: String(amount),
      isAutorenew: true,
      subscriptionStartDate: data.subscriptionStartDate,
      subscriptionEndDate: data.subscriptionEndDate,
      subscriptionStatus: data.status,
    };

    const apiUrl = `https://api.simplynoted.com/stripe/payment-save?customerId=${customerID}`;

    fetch(apiUrl, {
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
        setPaymentLoader(false);
        navigate('/manage-subscription');
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
      <DynamicButton
        className="bg-[#EF6E6E]  w-full max-w-[150px]"
        text="Go Back"
        backArrow={true}
        onClickFunction={() => {
          setWalletPurchase(true);
          setWalletPayment(false);
        }}
      />
      {paymentLoader && (
        <div className="absolute z-[50] top-[50%] left-[50%]">
          <CircularLoader
            title="Processing your payment securely. Please wait a moment."
            color="#ef6e6e"
          />
        </div>
      )}

      <div
        className={`w-full ${
          paymentLoader && 'opacity-40'
        }  p-[20px] max-w-[640px] mx-auto`}
      >
        <div
          className="flex items-center justify-between p-4 cursor-pointer bg-gray-200"
          onClick={toggleBilling}
        >
          <span className="font-semibold">Billing Address</span>
          <span className="mr-2">
            {isBillingOpen ? (
              <img className="h-[12px]" src={arrow_down} alt="" />
            ) : (
              <img className="h-[12px]" src={arrow_rights} alt="" />
            )}
          </span>
        </div>
        <div className="border rounded">
          {isBillingOpen && (
            <div className="w-full max-w-[650px]  mx-auto border border-solid border-black p-3 mt-3">
              <div className="grid-rows-2 lg:flex grid gap-3">
                <div className="w-full">
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
                <div className="w-full">
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
              <div className="grid-rows-2 lg:flex grid gap-3">
                <div className="w-full">
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
                      <option key={country.country} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
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
                    <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 border rounded">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-gray-200"
            onClick={toggleCardInfo}
          >
            <span className="font-semibold">Credit Card Information</span>
            <span className="mr-2">
              {isCardInfoOpen ? (
                <img className="h-[12px]" src={arrow_down} alt="" />
              ) : (
                <img className="h-[12px]" src={arrow_rights} alt="" />
              )}
            </span>
          </div>
          {isCardInfoOpen && (
            <>
              <Elements stripe={stripe}>
                {savedCard &&
                  savedCard.map((item, i) => (
                    <div
                      key={i}
                      className="border-y border-solid border-[#000] p-[1rem] mt-1 mb-2 flex justify-between "
                    >
                      <div className="flex justify-start items-center text-[14px] font-bold">
                        <input
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
                    </div>
                  ))}
                {savedCard && (
                  <div className="savedCard flex items-start justify-between mb-[12px]">
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
                      savedCard={savedCard}
                      paymentPurchase={paymentPurchase}
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
                <div className="flex justify-between  w-full gap-[10px] items-center my-[16px]">
                  <DynamicButton
                    text="Previous"
                    onClickFunction={() => {
                      setWalletPurchase(true);
                      setWalletPayment(false);
                    }}
                    className="!bg-[#EF6E6E] w-full !rounded-0 !py-[16px] !px-[30px] max-w-[190px]"
                  />
                  <button
                    type="submit"
                    onClick={() => {
                      setPaymentLoader(true);
                      createSubscription(paymentMethodId);
                    }}
                    className="!bg-[#EF6E6E] text-white  w-full !rounded-0 !py-[16px] !px-[30px] max-w-[300px] "
                  >
                    Complete Purchase
                  </button>
                </div>
              )}
              <div className=" border-2 text-[12px] bg-white text-left p-[10px] border-solid border-[#324879]">
                <span>
                  Custom cards and international postage may cost extra. You
                  will receive the same level of discount on custom cards.
                </span>
                <br />
                <br />
                <span>
                  By making this purchase, you agree to allow us to
                  automatically renew your prepaid package when your balance
                  drops below $100 and to renew your subscription at the end of
                  your subscription period. Both your subscription and prepaid
                  package can be changed later from your Account area.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
