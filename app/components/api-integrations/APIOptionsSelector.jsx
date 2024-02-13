import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const APIOptionsSelector = () => {
  const {selectedSection, handleSectionChange} = useAPIIntegrationContext();

  console.log('selectedSection', selectedSection);

  return (
    <div className="w-full leading-[44px] grid max-w-[20%] hidden md:block">
      <div className='border-r-[1px]'>
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
      <div className='hidden lg:block'>
        <button
          type="button"
          value="AVAILABLE HANDWRITING STYLES"
          onClick={handleSectionChange}
          className={`hover:text-blue-700 ${
            selectedSection === '  AVAILABLE HANDWRITING STYLES'
              ? 'font-bold'
              : ''
          }`}
        >
          {' '}
          AVAILABLE HANDWRITING STYLES
        </button>
      </div>
      <div className='block lg:hidden'>
        <button
          type="button"
          value="AVAILABLE HANDWRITING STYLES"
          onClick={handleSectionChange}
          className={`hover:text-blue-700 ${
            selectedSection === '  AVAILABLE HANDWRITING STYLES'
              ? 'font-bold'
              : ''
          }`}
        >
          {' '}
         HANDWRITING
        </button>
      </div>
      </div>
      {/* <div class="space-y-4">
<div className={`w-full md:w-[56%] ${selectedSection === 'API ENDPOINTS' ? 'font-bold' : ''}`}>
  <button
    className={`text-${selectedSection === 'API ENDPOINTS' ? 'blue-700' : 'text-blue-700'}
                cursor-pointer hover:text-blue-700`}
    onClick={handleSectionChange}
    value="API ENDPOINTS"
  >
    <span className={`text-${selectedSection === 'API ENDPOINTS' ? 'blue-700' : 'text-blue-700'}
                    cursor-pointer`}
    >
      1.
    </span>{' '}
    API ENDPOINTS
  </button>
</div>

  <div class="line-height-[1.5]">AUTHENTICATION</div>
  <div class="line-height-[1.8]">USERS</div>
  <div class="line-height-[2]">PRODUCTS</div>
  <div class="line-height-[2.2]">ORDERS</div>
  <div class="line-height-[2.5]">TEMPLATES</div>
  <div class="line-height-[2.5]">ADDRESSES</div>
  <div class="line-height-[2.8]">AVAILABLE</div>
</div> */}
    </div>
  );
};

export default APIOptionsSelector;
