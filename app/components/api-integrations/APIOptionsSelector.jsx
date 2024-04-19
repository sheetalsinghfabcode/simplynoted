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
          className={`hover:text-[#ef6e6e] px-2 xl:px-10 font-bold ${
            selectedSection === 'API ENDPOINTS' ? ' bg-white rounded-md ' : 'text-[white]'
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10 font-bold ${
              selectedSection === 'AUTHENTICATION' ? ' bg-white rounded-md ' : 'text-[white]'
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10  font-bold ${
              selectedSection === 'USERS' ? 'bg-white rounded-md' : 'text-[white]'
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10  font-bold ${
              selectedSection === 'PRODUCTS' ? 'bg-white rounded-md' : 'text-[white]'
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10  font-bold ${
              selectedSection === 'ORDERS' ? 'bg-white rounded-md' : 'text-[white]'
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10  font-bold ${
              selectedSection === 'TEMPLATES' ? 'bg-white rounded-md' : 'text-[white]'
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10  font-bold ${
              selectedSection === 'ADDRESSES' ? 'bg-white rounded-md' : 'text-[white]'
            }`}
  
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
            className={`hover:text-[#ef6e6e] px-2 xl:px-10  font-bold ${
              selectedSection === 'AVAILABLE HANDWRITING STYLES'
                ? 'bg-white rounded-md'
                : 'text-[white]'
            }`}
       
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
