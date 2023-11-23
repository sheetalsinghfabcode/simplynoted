import  { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export function StateContextProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [loadAddress, setLoadAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [editAddress, setEditAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderHistory,setOrderHistory] = useState(false)
  const [cartCountVal, setCartCountVal] = useState(0)

  return (
    <StateContext.Provider
      value={{
        addresses,
        setAddresses,
        loadAddress,
        setLoadAddress,
        addressForm,
        setAddressForm,
        editAddress,
        setEditAddress,
        selectedAddress,
        setSelectedAddress,
        cartCountVal,
        setCartCountVal,
        orderHistory,
        setOrderHistory
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
