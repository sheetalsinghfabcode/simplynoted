import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: 'black',
            color:"black",
            fontWeight:500,
            fontSize: "16px"
        },
        invalid: {
            iconColor: "red",
            color:"red"
        }
    }
}

const StripeCardComp = ({setPaymentMethodId,createCustomerId}) => {
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
          createCustomerId(id)
        }
        console.log(id,'stripeID');
    } catch (error) {
        console.log(error,'stripe error');
    }
  } else {
    console.log(error.message);
  }
};
  return (
    <form onSubmit={handleSubmit} className='w-[500px] h-[200px] mt-2 ml-[22px]'>
      <CardElement options={CARD_OPTIONS} className='m-5'/>
      <button className="bg-[#EF6E6E] w-[200px] text-[#fff] p-2 rounded mt-[50px] ml-[120px]" type="submit">
        ADD NEW CARD
      </button>
    </form>
  );
};

export default StripeCardComp;