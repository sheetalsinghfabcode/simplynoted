import {createContext, useContext, useState, useEffect} from 'react';

const StateContext = createContext();

export function StateContextProvider({children}) {
  const [addresses, setAddresses] = useState([]);
  const [loadAddress, setLoadAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderHistory, setOrderHistory] = useState(false);
  const [cartCountVal, setCartCountVal] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isAccountLoader,setIsAccountLoader] = useState(false)

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customerId');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
    setIsInitialRender(false);

    const handleLocalStorageChange = (e) => {
      if (e.key === 'customerId') {
        setCustomerId(e.newValue); // Update state when the 'customerId' key changes
      }
    };

    // Add event listener for changes in localStorage
    window.addEventListener('storage', handleLocalStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

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
        setOrderHistory,
        customerId,
        setCustomerId,
        isInitialRender,
        isAccountLoader,
        setIsAccountLoader
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
