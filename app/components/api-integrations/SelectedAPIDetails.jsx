import {APIEndpoints, Authentication, Users, Products, Orders, Templates, Addresses, AvailableHandwritingStyles} from './api-details';
import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const SelectedAPIDetails = () => {
  const {selectedSection} = useAPIIntegrationContext();
  
  return (
    <>
    <div className=" sidebar h-[500px] overflow-y-scroll border-1 hidden md:block border-solid w-[80%] p-[12px]">
      {selectedSection === 'API ENDPOINTS' && <APIEndpoints />}
      {selectedSection === 'AUTHENTICATION' &&   <Authentication />}
      {selectedSection === 'USERS' && <Users />}
      {selectedSection === 'PRODUCTS' && <Products /> }
      {selectedSection === 'ORDERS' && <Orders />}
      {selectedSection === 'TEMPLATES' && <Templates />}
      {selectedSection === 'ADDRESSES' && <Addresses />}
      {selectedSection === 'AVAILABLE HANDWRITING STYLES' && <AvailableHandwritingStyles />}
    </div>
    <div className='sec sec block md:hidden'>
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

