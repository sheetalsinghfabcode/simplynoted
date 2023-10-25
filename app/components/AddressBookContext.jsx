import React, {createContext, useContext, useState} from 'react';

const AddressBookContext = createContext();

export function AddressBookProvider({children}) {
  const [addresses, setAddresses] = useState([]);
  const [loadAddress, setLoadAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [editAddress,setEditAddress]= useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <AddressBookContext.Provider
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
        setSelectedAddress
      }}
    >
      {children}
    </AddressBookContext.Provider>
  );
}

export function useAddressBook() {
  return useContext(AddressBookContext);
}
