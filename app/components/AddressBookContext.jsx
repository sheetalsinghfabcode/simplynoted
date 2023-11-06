import React, {createContext, useContext, useState} from 'react';

const AddressBookContext = createContext();

export function AddressBookProvider({children}) {
  const [addresses, setAddresses] = useState([]);
  const [loadAddress, setLoadAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [editAddress,setEditAddress]= useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [isFooterChecked, setIsFooterChecked] = useState(false);
  const [inputText, setInputText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [backHeaderImage, setBackHeaderImage] = useState();
  const [backFooterImage, setBackFooterImage] = useState();
  const [scale, setScale] = useState(1);
  const [backScale, setBackScale] = useState(1);
  const [selectButton, setSelectButton] = useState(null);
  const [alignment, setAlignment] = useState('');
  const [footeralignment, setFooteraligmment] = useState(false);
  const [footerFontSize, setFooterFontSize] = useState(16);
  const [selectFontValue, setSelectFontValue] = useState('');
  const [headerFontSize, setHeaderFontSize] = useState(16);
  const [selectedColor, setSelectedColor] = useState('#000');


  return (
    <AddressBookContext.Provider
      value={{
        addresses,
        setAddresses,
        loadAddress,
        setLoadAddress,
        addressForm,
        setAddressForm,
        inputText,
        setInputText,
        editAddress,
        setEditAddress,
        selectedAddress,
        setSelectedAddress, 
        footerText,
        setFooterText,
        footeralignment,
        setFooteraligmment,
        headerFontSize,
        setHeaderFontSize,
        footerFontSize,
        setFooterFontSize,
        selectFontValue,
        setSelectFontValue,
        selectButton,
        setSelectButton,
        selectedColor,
        setSelectedColor,
        isHeaderChecked,
        setIsHeaderChecked,
        isFooterChecked,
        setIsFooterChecked,
        backHeaderImage,
        setBackHeaderImage,
        backFooterImage,
        setBackFooterImage,
        alignment,
        setAlignment,
        scale,
        setScale,
        backScale,
        setBackScale,
      }}
    >
      {children}
    </AddressBookContext.Provider>
  );
}

export function useAddressBook() {
  return useContext(AddressBookContext);
}
