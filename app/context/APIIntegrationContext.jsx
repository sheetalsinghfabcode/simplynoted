import {createContext, useContext, useState} from 'react';

const APIIntegrationContext = createContext();

export const APIIntegrationProvider = ({children}) => {
  const [selectedSection, setSelectedSection] = useState('PRODUCTS');

  const handleSectionChange = (event) => {
    const targetElementValue = event.target.value.toUpperCase();
    setSelectedSection(targetElementValue);
  };

  return (
    <APIIntegrationContext.Provider
      value={{selectedSection, setSelectedSection, handleSectionChange}}
    >
      {children}
    </APIIntegrationContext.Provider>
  );
};

export const useAPIIntegrationContext = () => {
  return useContext(APIIntegrationContext);
};
