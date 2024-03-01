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
  const [isAccountLoader, setIsAccountLoader] = useState(false);
  const [subscription, setSubscription] = useState(0);
  const [managePlan, setManagePlan] = useState(false);
  const [addressBook, setAddressBook] = useState(false);
  const [productshow, setProductShow] = useState(true);
  const [accountTabName,setAccountTabName] = useState("")
  const [activeTab, setActiveTab] = useState(0);
  const [walletPlan, setWalletPlan] = useState(false);
  const [isCardTypeSelectionPage, setIsCardTypeSelectionPage] = useState(true);
  const [walletPurcase, setWalletPurchase] = useState(false);
  const [walletPayment, setWalletPayment] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [birthdayAutomation, setBirthdayAutomation] = useState(true)
  const [isbirthdayAutomated,setISBirthdayAutomated] = useState(false)
  const [checkLogin,setCheckLogin] = useState(false)
  const [defaultOption, setDefaultOption] = useState(null);
  const [loaderTitle,setLoaderTitle] = useState("");

  const [showSignScreen,setShowSignScreen] = useState(false)

  const [fullName, setFullName] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedFullName = localStorage.getItem('SNFullName');
      return storedFullName ? storedFullName : '';
    }
    return null; // Fallback if localStorage is not available
  });
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUserEmail = localStorage.getItem('SnEmail');
      return storedUserEmail ? storedUserEmail : '';
    }
    return null; // Fallback if localStorage is not available
  });

  const [selectedPlan, setSelectedPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedSelectedPlan = localStorage.getItem('selectedPlan');
      return storedSelectedPlan ? storedSelectedPlan : null;
    }
    return null; // Fallback if localStorage is not available
  });
  const [amount, setAmount] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedAmount = localStorage.getItem('amount');
      return storedAmount ? storedAmount : 0;
    }
    return null; // Fallback if localStorage is not available
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    if (typeof window !== 'undefined') {
      const phone = localStorage.getItem('phone');
      return phone ? phone : null;
    }
    return null; // Fallback if localStorage is not available
  });
  const [packageProduct, setPackageProduct] = useState('');
  const [subscriptionProduct, setSubscriptionProduct] = useState('');
  const [subscriptionPriceId, setSubscriptionPriceId] = useState(() => {
    if (typeof window !== 'undefined') {
      const subscriptionPriceId = localStorage.getItem('subscriptionPriceId');
      return subscriptionPriceId ? subscriptionPriceId : null;
    }
    return null; // Fallback if localStorage is not available
  });

  const [subscriptionTitle, setSubscriptionTitle] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedSubscriptionTitle = localStorage.getItem('subscriptionName');
      return storedSubscriptionTitle ? storedSubscriptionTitle : 'Free';
    }
    return 'Free'; // Fallback if localStorage is not available
  });

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
        setIsAccountLoader,
        subscription,
        setSubscription,
        selectedPlan,
        setSelectedPlan,
        amount,
        setAmount,
        packageProduct,
        setPackageProduct,
        subscriptionProduct,
        setSubscriptionProduct,
        subscriptionPriceId,
        setSubscriptionPriceId,
        subscriptionTitle,
        setSubscriptionTitle,
        fullName,
        setFullName,
        userEmail,
        setUserEmail,
        phoneNumber,
        setPhoneNumber,
        managePlan,
        setManagePlan,
        addressBook,
        setAddressBook,
        productshow,
        setProductShow,
        accountTabName,
        setAccountTabName,
        activeTab,
        setActiveTab,
        walletPlan,
        setWalletPlan,
        isCardTypeSelectionPage,
        setIsCardTypeSelectionPage,
        walletPurcase,
        setWalletPurchase,
        walletPayment,
        setWalletPayment,
        updateModal,
        setUpdateModal,
        birthdayAutomation,
        setBirthdayAutomation,
        isbirthdayAutomated,
        setISBirthdayAutomated,
        checkLogin,
        setCheckLogin,
        defaultOption,
        setDefaultOption,
        loaderTitle,
        setLoaderTitle,
        showSignScreen,
        setShowSignScreen
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
