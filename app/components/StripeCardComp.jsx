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
      <DynamicButton
        text="Update"
        onClickFunction=""
        className="bg-[#EF6E6E] text-[#fff] p-2 flex justify-center mx-auto w-full max-w-[240px] rounded mt-[10px] "
        type="submit"
      >
      </DynamicButton>
    </form>
  );
};

export default StripeCardComp;
