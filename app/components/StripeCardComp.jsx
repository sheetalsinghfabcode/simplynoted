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

const StripeCardComp = ({setPaymentMethodId,AddCreditCard}) => {
  // console.log(setPaymentMethodId,'setStripeId',setNewCardAdded);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    })
  
  if(!error) {
    try {
        const {id} =  paymentMethod
        if(id){
          setPaymentMethodId(id)
          AddCreditCard(id)
        }
        console.log(id, 'stripeID');
      } catch (error) {
        console.log(error, 'stripe error');
      }
    } else {
      console.log(error.message);
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
          className="!bg-[#EF6E6E] text-white  w-full !rounded-0 !py-[16px] !px-[30px] max-w-[300px] "
        >Add Card</button>
    </form>
  );
};

export default StripeCardComp;
