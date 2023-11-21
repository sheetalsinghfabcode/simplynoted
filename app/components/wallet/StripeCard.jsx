import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import DynamicButton from '../DynamicButton';

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
  setPaymentMethodId,
  createCustomerId,
  savedCard,
  setloader,
  paymentPurchase,
  handlePurchaseCard,
  addCreditModal,
}) => {
  // console.log(setPaymentMethodId,'setStripeId',setNewCardAdded);
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
        if (id && !addCreditModal && savedCard) {
          handlePurchaseCard(id);
        } else if (id && !savedCard && !addCreditModal) {
          createCustomerId(id);
        }

        console.log(id, 'stripeID');
      } catch (error) {
        console.log(error, 'stripe error');
      }
    } else {
      console.log(error.message);
    }
  };

  console.log('savedCard', savedCard);
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
      <CardElement options={CARD_OPTIONS} className="m-5" />
      <div className="flex justify-center w-full gap-[10px] items-center mt-[24px] mb-[16px]">
        <button
          type="submit"
          className="!bg-[#EF6E6E] text-white  w-full !rounded-0 !py-[16px] !px-[30px] max-w-[300px] "
        >
          {savedCard && savedCard.length > 0 && (addCreditModal ? 'Add Card' : 'Update Card')}

          {(!savedCard || savedCard.length===0) && 'Complete Purcase'}
        </button>
      </div>
    </form>
  );
};

export default StripeCard;
