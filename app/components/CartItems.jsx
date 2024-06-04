import {useEffect} from 'react';
import {useStateContext} from '~/context/StateContext';

const CartItems = () => {
  const {
    setCartCountVal,
    cartCountVal,
    setCartData,
    isCartUpdated,
    customerId,
  } = useStateContext();

  useEffect(() => {
    handleCartUpdate();
  }, [isCartUpdated, cartCountVal, customerId]);

  async function handleCartUpdate() {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) return;

    const hasPackageDiscountMatch = await crossVerifyPackageDiscount(
      customerId,
    );
    if (!hasPackageDiscountMatch) {
      return deleteCartItem(customerId);
    }
    await updateCartItems(customerId);
  }

  async function updateCartItems(customerId) {
    try {
      const URL = `https://api.simplynoted.com/api/storefront/cart-items?customerId=${customerId}`;
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.result.success) {
        setCartCountVal(data.result.cartItems.length);
        setCartData(data.result.cartItems);
      }
    } catch (err) {
      console.error(`Error fetching data: ${err}`);
    }
  }

  async function deleteCartItem(customerId) {
    try {
      const URL = `https://api.simplynoted.com/api/storefront/cart-items/delete?customerId=${customerId}`;
      const response = await fetch(URL, {method: 'POST'});
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.result.success) {
        setCartCountVal(0);
      }
    } catch (err) {
      console.error(`Error deleting cart item: ${err}`);
    }
  }

  async function crossVerifyPackageDiscount(customerId) {
    try {
      const localPackageDiscount = JSON.parse(
        localStorage.getItem('packageDiscount'),
      );
      if (!localPackageDiscount) return true;
      const URL = `https://api.simplynoted.com/stripe/customer-data?customerId=${customerId}`;
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data?.stripe) {
        const currentPackageDiscount = data?.stripe.packageDiscount;
        if (currentPackageDiscount != localPackageDiscount) {
          localStorage.setItem(
            'packageDiscount',
            JSON.stringify(data.stripe.packageDiscount),
          );
          return false;
        }
      }
      return true;
    } catch (err) {
      console.error(`Error deleting cart item: ${err}`);
    }
  }

  return <></>;
};

export default CartItems;
