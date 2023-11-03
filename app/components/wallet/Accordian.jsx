import React, {useState, useEffect} from 'react';
import location from '../../../location.json';
import StripeCard from './StripeCard';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import DynamicButton from '../DynamicButton';

const Accordion = ({
  StripeKey,
  finalPrice,
  setWalletPurchase,
  setWalletPayment,
}) => {
  const stripe = loadStripe(StripeKey);

  const [isBillingOpen, setIsBillingOpen] = useState(true);
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [newCardAdded, setNewCardAdded] = useState(false);
  const [errors, setErrors] = useState({});
  const [savedCard, setSavedCart] = useState([]);
  const [showStripeCard, setShowStripeCard] = useState(false);

  const [custmerID, setCustomertID] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');

  let customerid, fullName, userEmail;

  const toggleBilling = () => {
    setIsBillingOpen(!isBillingOpen);
    setIsCardInfoOpen(false);
  };

  const toggleCardInfo = () => {
    setIsCardInfoOpen(!isCardInfoOpen);
    setIsBillingOpen(false);
  };

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
        `https://api.simplynoted.com/stripe/create-customer?customerId=${custmerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name || '',
            email: formData.email || '',
            address: {
              line1: formData.address.line1 || '',
              line2: formData.address.line2 || '',
              city: formData.address.city || '',
              state: formData.address.state || '',
              country: formData.address.country || 'USA',
            },
            paymentMethodId: id || '',
          }),
        },
      );
      const json = await res.json();
      console.log(json, 'createCustomerId Response');
      await addNewCreditCard(id, json.stripeCustomerId);
      // }
    } catch (error) {
      setloader(false);
      console.log(error, 'error on CreateCard');
    }
  }


  async function addNewCreditCard(paymentID, stripeCustomerId) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/stripe/add-new-payment-method?customerId=${custmerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentID,
            stripeCustomerId: stripeCustomerId,
          }),
        },
      );
      const jsonData = await res.json();
      console.log(jsonData, 'addNewCard');
      setNewCardAdded(true);
      setShowCardBox(false);
      setloader(false);
    } catch (error) {
      setloader(false);
      console.log(error, 'addNewCreditCard ------');
    }
  }
  async function getSavedCards(Id) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/stripe/customer-data?customerId=${Id}`,
      );
      const json = await res.json();
      console.log(json, 'creditCard Details');
      if (json) {
        setSavedCart(json.payments);
      }
    } catch (error) {
      console.log(error, 'error at credit Card');
    }
  }
  useEffect(() => {
    customerid = localStorage.getItem('customerId');
    fullName = localStorage.getItem('SNFullName');
    userEmail = localStorage.getItem('SnEmail');
    setCustomertID(customerid);
    getSavedCards(customerid);
    formData.name = fullName;
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


  return (
    <div div className="w-full p-[20px] max-w-[640px] mx-auto">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-200"
        onClick={toggleBilling}
      >
        <span className="font-semibold">Billing Address</span>
        <span className="mr-2">{isBillingOpen ? '▼' : '►'}</span>
      </div>
      <div className="border rounded">
        {isBillingOpen && (
          <div className="w-full max-w-[650px]  mx-auto border border-solid border-black p-3 mt-3">
            <div className="grid-rows-2 flex gap-3">
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
            <div className="grid-rows-2 flex gap-3">
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
          <span className="mr-2">{isCardInfoOpen ? '▼' : '►'}</span>
        </div>
        {isCardInfoOpen && (
          <>
            <Elements stripe={stripe}>
              {savedCard &&
                savedCard.map((item) => (
                  <div className="border-y border-solid border-[#000] p-[1rem] mt-1 mb-2 flex justify-between ">
                    <div className="flex justify-start items-center text-[14px] font-bold">
                      <input type="radio" name="action" className="mr-2" />
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
                  {/* <input type="radio" name="action" id="" className="mt-2" />
              <label htmlFor="">Use Saved Credit Card</label> */}
                  <div>
                    <button
                      className="bg-[#1b5299] w-[200px] text-[#fff] p-2 rounded"
                      onClick={() => setShowStripeCard(true)}
                    >
                      Add New Card
                    </button>
                  </div>
                </div>
              )}
              {(!savedCard || showStripeCard) && (
                <div className="p-4">
                  <StripeCard
                   setWalletPurchase={setWalletPurchase}
                   setWalletPayment={setWalletPayment}
                    setPaymentMethodId={setPaymentMethodId}
                    createCustomerId={createCustomerId}
                  />
                </div>
              )}
            </Elements>

            <div className="flex justify-between font-bold   text-[#001a5f] border-y border-[#cfcfcf] p-[10px] items-center w-full">
              <div>Total</div>
              <div>${finalPrice}</div>
            </div>
            {/* <div className="flex justify-between  w-full gap-[10px] items-center my-[16px]">
              <DynamicButton
                text="Previous"
                onClickFunction={()=>{
                    setWalletPurchase(true)
                    setWalletPayment(false)
                }}
                className="!bg-[#EF6E6E] w-full !rounded-0 !py-[16px] !px-[30px] max-w-[190px]"
              />
              <DynamicButton
                text="Complete Purchase"
                className="!bg-[#EF6E6E] w-full !rounded-0 !py-[16px] !px-[30px] max-w-[300px] "
              />
            </div> */}
            <div className=" border-2 text-[12px] bg-white text-left p-[10px] border-solid border-[#324879]">
              <span>
                Custom cards and international postage may cost extra. You will
                receive the same level of discount on custom cards.
              </span>
              <br />
              <br />
              <span>
                By making this purchase, you agree to allow us to automatically
                renew your prepaid package when your balance drops below $100
                and to renew your subscription at the end of your subscription
                period. Both your subscription and prepaid package can be
                changed later from your Account area.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Accordion;
