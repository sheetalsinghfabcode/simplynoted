import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const APIOptionsSelector = () => {
  const {selectedSection, handleSectionChange} = useAPIIntegrationContext();

  return (
    <div className="w-full flex leading-[44px]  hidden lg:block">
      <div className="flex justify-between color-[white] bg-[#001a5f] pl-[22px] p-[22px] w-full max-w-full">
        <button
          type="button"
          onClick={handleSectionChange}
          value="API ENDPOINTS"
          className={`hover:text-[#ef6e6e]  font-bold ${
            selectedSection === 'API ENDPOINTS' ? 'text-[#ef6e6e]' : 'text-[white]'
          }`}
          style={{
            borderBottom:
              selectedSection === 'API ENDPOINTS'
                ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e]  font-bold ${
              selectedSection === 'AUTHENTICATION' ? 'text-[#ef6e6e]' : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'AUTHENTICATION'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e] font-bold ${
              selectedSection === 'USERS' ? 'text-[#ef6e6e]' : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'USERS'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e] font-bold ${
              selectedSection === 'PRODUCTS' ? 'text-[#ef6e6e]' : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'PRODUCTS'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e] font-bold ${
              selectedSection === 'ORDERS' ? 'text-[#ef6e6e]' : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'ORDERS'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e] font-bold ${
              selectedSection === 'TEMPLATES' ? 'text-[#ef6e6e]' : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'TEMPLATES'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e] font-bold ${
              selectedSection === 'ADDRESSES' ? 'text-[#ef6e6e]' : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'ADDRESSES'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e]  font-bold ${
              selectedSection === 'AVAILABLE HANDWRITING STYLES'
                ? 'text-[#ef6e6e]'
                : 'text-[white]'
            }`}
            style={{
              borderBottom:
                selectedSection === 'AVAILABLE HANDWRITING STYLES'
                  ? '2px solid #ef6e6e'
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
            className={`hover:text-[#ef6e6e] ${
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
