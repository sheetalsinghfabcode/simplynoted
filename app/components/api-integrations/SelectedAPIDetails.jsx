import {APIEndpoints, Authentication, Users, Products, Orders, Templates, Addresses, AvailableHandwritingStyles} from './api-details';
import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const SelectedAPIDetails = () => {
  const {selectedSection} = useAPIIntegrationContext();
  return (
    <>
    <div className="h-[600px] overflow-auto border border-solid border-black  hidden lg:block w-full max-w-full p-[12px]">
      {selectedSection === 'API ENDPOINTS' && <APIEndpoints />}
      {selectedSection === 'AUTHENTICATION' &&   <Authentication />}
      {selectedSection === 'USERS' && <Users />}
      {selectedSection === 'PRODUCTS' && <Products /> }
      {selectedSection === 'ORDERS' && <Orders />}
      {selectedSection === 'TEMPLATES' && <Templates />}
      {selectedSection === 'ADDRESSES' && <Addresses />}
      {selectedSection === 'AVAILABLE HANDWRITING STYLES' && <AvailableHandwritingStyles />}
    </div>
    <div className='sec sec block  w-[100%] lg:hidden'>
    <APIEndpoints />
    <Authentication />
    <Users />
    <Products />
    <Orders />
    <Templates />
    <Addresses />
    <AvailableHandwritingStyles />
    </div>
    </>
  );
};

export default SelectedAPIDetails;

