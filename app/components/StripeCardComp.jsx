import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import DynamicButton from './DynamicButton';

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

const StripeCardComp = ({setPaymentMethodId, AddCreditCard}) => {
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
        debugger;
        if (id) {
          setPaymentMethodId(id);
          AddCreditCard(id);
        }
      } catch (error) {
        console.error(error, 'stripe error');
      }
    } else {
      console.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] mx-auto mt-[20px] "
    >
      <CardElement options={CARD_OPTIONS} className="m-5 " />
      <button
        type="submit"
        className="!bg-[#EF6E6E] text-white md:!text-[16px] font-bold !text-[13px] font-bold  w-full !rounded-0 md:max-w-[300px] max-w-[220px] p-[10px]"
      >
        Add Card
      </button>
    </form>
  );
};

export default StripeCardComp;
