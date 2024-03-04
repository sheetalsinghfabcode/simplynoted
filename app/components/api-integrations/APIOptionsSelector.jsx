import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const APIOptionsSelector = () => {
  const {selectedSection, handleSectionChange} = useAPIIntegrationContext();

  return (
    <div className="w-full flex leading-[44px]  hidden lg:block">
      <div className="flex justify-between  bg-[beige] pl-[22px] p-[22px] w-full max-w-full">
        <button
          type="button"
          onClick={handleSectionChange}
          value="API ENDPOINTS"
          className={`hover:text-blue-700 font-bold ${
            selectedSection === 'API ENDPOINTS' ? 'text-blue-700' : ''
          }`}
          style={{
            borderBottom:
              selectedSection === 'API ENDPOINTS'
                ? '2px solid black'
                : 'none',
          }}
        >
          {' '}
          API ENDPOINTS
        </button>
        <div>
          <button
            type="button"
            value="AUTHENTICATION"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'AUTHENTICATION' ? 'text-blue-700' : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'AUTHENTICATION'
                  ? '2px solid black'
                  : 'none',
            }}
          >
            AUTHENTICATION
          </button>
        </div>

        <div>
          <button
            type="button"
            value="USERS"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'USERS' ? 'text-blue-700' : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'USERS'
                  ? '2px solid black'
                  : 'none',
            }}
          >
            USERS
          </button>
        </div>
        <div>
          <button
            type="button"
            value="PRODUCTS"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'PRODUCTS' ? 'text-blue-700' : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'PRODUCTS'
                  ? '2px solid black'
                  : 'none',
            }}
          >
            PRODUCTS
          </button>
        </div>
        <div>
          <button
            type="button"
            value="ORDERS"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'ORDERS' ? 'text-blue-700' : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'ORDERS'
                  ? '2px solid black'
                  : 'none',
            }}
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
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'TEMPLATES' ? 'text-blue-700' : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'TEMPLATES'
                  ? '2px solid black'
                  : 'none',
            }}
          >
            TEMPLATES
          </button>
        </div>
        <div>
          <button
            type="button"
            value="ADDRESSES"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'ADDRESSES' ? 'text-blue-700' : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'ADDRESSES'
                  ? '2px solid black'
                  : 'none',
            }}
          >
            {' '}
            ADDRESSES
          </button>
        </div>
        <div className="">
          <button
            type="button"
            value="AVAILABLE HANDWRITING STYLES"
            onClick={handleSectionChange}
            className={`hover:text-blue-700 font-bold ${
              selectedSection === 'AVAILABLE HANDWRITING STYLES'
                ? 'text-blue-700'
                : ''
            }`}
            style={{
              borderBottom:
                selectedSection === 'AVAILABLE HANDWRITING STYLES'
                  ? '2px solid black'
                  : 'none',
            }}
          >
            {' '}
            AVAILABLE HANDWRITING STYLES
          </button>
        </div>
        {/* <div className="block lg:hidden">
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
        </div> */}
      </div>
    </div>
  );
};

export default APIOptionsSelector;
