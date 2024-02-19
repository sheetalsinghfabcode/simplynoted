import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const APIOptionsSelector = () => {
  const {selectedSection, handleSectionChange} = useAPIIntegrationContext();

  return (
    <div className="w-full leading-[44px] grid max-w-[20%] hidden md:block">
      <div className="border-r-[1px]">
        <button
          type="button"
          onClick={handleSectionChange}
          value="API ENDPOINTS"
          className={`hover:text-blue-700 ${
            selectedSection === 'API ENDPOINTS' ? 'font-bold' : ''
          }`}
        >
          {' '}
          API ENDPOINTS
        </button>
        <div>
          <button
            type="button"
            value="AUTHENTICATION"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'AUTHENTICATION' ? 'font-bold' : ''
            }`}
          >
            AUTHENTICATION
          </button>
        </div>
        <div>
          <button
            type="button"
            value="USERS"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'USERS' ? 'font-bold' : ''
            }`}
          >
            USERS
          </button>
        </div>
        <div>
          <button
            type="button"
            value="PRODUCTS"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'PRODUCTS' ? 'font-bold' : ''
            }`}
          >
            PRODUCTS
          </button>
        </div>
        <div>
          <button
            type="button"
            value="ORDERS"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'ORDERS' ? 'font-bold' : ''
            }`}
          >
            {' '}
            ORDERS
          </button>
        </div>
        <div>
          <button
            type="button"
            value="TEMPLATES"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'TEMPLATES' ? 'font-bold' : ''
            }`}
          >
            TEMPLATES
          </button>
        </div>
        <div>
          <button
            type="button"
            value="ADDRESSES"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'ADDRESSES' ? 'font-bold' : ''
            }`}
          >
            {' '}
            ADDRESSES
          </button>
        </div>
        <div className="hidden lg:block">
          <button
            type="button"
            value="AVAILABLE HANDWRITING STYLES"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'AVAILABLE HANDWRITING STYLES'
                ? 'font-bold'
                : ''
            }`}
          >
            {' '}
            AVAILABLE HANDWRITING STYLES
          </button>
        </div>
        <div className="block lg:hidden">
          <button
            type="button"
            value="AVAILABLE HANDWRITING STYLES"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 ${
              selectedSection === 'AVAILABLE HANDWRITING STYLES'
                ? 'font-bold'
                : ''
            }`}
          >
            {' '}
            HANDWRITING
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIOptionsSelector;
