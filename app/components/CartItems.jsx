import { useEffect } from 'react';
import { useStateContext } from '~/context/StateContext';

const CartItems = ({id}) => {
  const { setCartCountVal, cartCountVal, setCartData,isCartUpdated} = useStateContext();

  useEffect(() => {
    // Read customerId from localStorage
    const customerId = localStorage.getItem('customerId');

    // Define the API URL with customerId
    const apiUrl = `https://testapi.simplynoted.com/api/storefront/cart-items?customerId=${customerId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })

      .then((data) => {
        // Update state with fetched data
        setCartCountVal(data.result.cartItems.length);
        setCartData(data.result.cartItems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [isCartUpdated,cartCountVal]);


  return <></>;
};

export default CartItems;