import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import DynamicButton from '../DynamicButton';
import {useLocation} from '@remix-run/react';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'black',
      color: 'black',
      fontWeight: 500,
      fontSize: '16px',
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
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const {id} = paymentMethod;
        if (id && !savedCard && !addCreditModal && !updateCard) {
          createCustomerId(id);
        } else if (showStripeCard) {
          addNewCreditCard(id);
        } else {
          handlePurchaseCard(id);
        }
      } catch (error) {
        console.error(error, 'stripe error');
      }
    } else {
      console.error(error.message);
    }
  };

  const pathname = useLocation();

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <CardElement options={CARD_OPTIONS} className="m-5" />
      <div className="flex md:justify-center justify-normal w-full gap-[10px] items-center mt-[24px] mb-[16px]">
        <button
          type="submit"
          className="!bg-[#ef6e6e] text-white flex justify-center items-center font-bold h-[45px]  w-full !rounded-0 !py-[16px] hover:!bg-[#001a5f] transition duration-400 !px-[30px] max-w-[300px] "
        >
          {showStripeCard || addCreditModal
            ? 'Add Card'
            : pathname.pathname === '/simply-noted-plans' ||
              pathname.pathname === '/account'
            ? 'Complete Purchase'
            : 'Update Card'}
        </button>
      </div>
    </form>
  );
};

export default StripeCard;
