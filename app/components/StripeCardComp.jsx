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

const StripeCardComp = ({setPaymentMethodId, AddCreditCard,validateForm,savedCard}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() && savedCard && savedCard.length === 0 ) {
      return; // Exit early if the form is not valid
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const {id} = paymentMethod;
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
      className="w-full mx-auto h-[130px] p-[1px] mt-[20px] "
    >
      <div className="border border-solid border-black">
        <CardElement options={CARD_OPTIONS} className="m-5 " />
      </div>
      <div className="flex justify-center mt-[29px]">
        <button
          type="submit"
          className="!bg-[#EF6E6E] text-white md:!text-[16px] font-bold !text-[13px] font-bold  w-full !rounded-0 md:max-w-[300px] max-w-[220px] p-[10px]"
        >
          Add Card
        </button>
      </div>
    </form>
  );
};

export default StripeCardComp;
