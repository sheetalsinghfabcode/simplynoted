import React, {useEffect, useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import DynamicButton from '../DynamicButton';
import {useLocation} from '@remix-run/react';
import {useStateContext} from '~/context/StateContext';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'black',
      color: 'black',
      fontWeight: 500,
      fontSize: '16px',
      border: '1px solid #000',
      padding: '10px',
    },
    invalid: {
      iconColor: 'red',
      color: 'red',
    },
  },
};

const StripeCard = ({
  createCustomerId,
  savedCard,
  handlePurchaseCard,
  addNewCreditCard,
  addCreditModal,
  showStripeCard,
  updateCard,
  validateForm,
}) => {
  const stripe = useStripe();
  let elements = useElements();

  const {stripeLoader, setStripeLoader,setCardElements} = useStateContext();
  const [errorMessage, setErrorMessage] = useState('');

  const clearCard = () => {
    const cardElement = elements.getElement(CardElement);
    // ensure the Element is still mounted
    if (cardElement) {
      cardElement.clear();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      (!validateForm() && !addCreditModal && !updateCard && !showStripeCard) ||
      (addCreditModal && savedCard && savedCard.length === 0 && !validateForm())
    ) {
      return; // Exit early if the form is not valid
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const {id} = paymentMethod;
        if (
          id &&
          savedCard &&
          savedCard.length === 0 &&
          !addCreditModal &&
          !updateCard
        ) {
          createCustomerId(id);
        } else if (showStripeCard) {
          addNewCreditCard(id);
        } else {
          handlePurchaseCard(id);
        }
      } catch (error) {
        setStripeLoader(false);

        console.error(error, 'stripe error');
      } 
    } else {
      setErrorMessage(error.message);
      console.error(error.message);
      setStripeLoader(false);
    }
  };

  const pathname = useLocation();

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="border border-solid border-black">
        <CardElement
          onReady={(e)=>setCardElements(e)}          
          onChange={() => setErrorMessage('')}
          options={CARD_OPTIONS}
          className="my-5 mx-2 sm:mx-5"
        />
      </div>
      {errorMessage && (
        <div className="text-red-700 font-karla text-[14px] mt-2">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-center w-full gap-[10px] items-center mt-[24px] mb-[16px]">
        <div
          onClick={() => {
            setStripeLoader(true);
          }}
          className="flex items-center justify-center w-full max-w-[300px] !mt-0 "
        >
          <button
            type="submit"
            className="!bg-[#EF6E6E] text-white flex justify-center items-center h-[45px]  w-full !rounded-0 !py-[16px] hover:!bg-sky-700 transition duration-400 !px-[30px] max-w-[300px] "
          >
            {(pathname.pathname === '/simply-noted-plans' ||
              pathname.pathname === '/account') &&
            !addCreditModal &&
            !showStripeCard &&
            !updateCard
              ? 'Complete Purchase'
              : !addCreditModal && !showStripeCard && updateCard
              ? 'Update Card'
              : (showStripeCard || addCreditModal) && 'Add Card'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StripeCard;
