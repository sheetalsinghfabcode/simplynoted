import {useEffect, useState} from 'react';
import AddressForm from '../components/addressBook/AddressForm';
import EditAddressForm from '../components/addressBook/EditAddressForm';
import {useNavigate} from '@remix-run/react';
import ContactTable from '~/components/addressBook/ContactTable';
import {useStateContext} from '~/context/StateContext';
import { SERVER_BASE_URL } from '../data/config';

let customerID;

export default function AddressBook() {
  const {
    addresses,
    setAddresses,
    loadAddress,
    setLoadAddress,
    addressForm,
    setAddressForm,
    editAddress,
    setEditAddress,
    showLoader,
    selectedAddress,
    setSelectedAddress,
  } = useStateContext();

  const [filteredAddresses, setFilteredAddresses] = useState([addresses]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    customerID = localStorage.getItem('customerId');
    if (!customerID) {
      navigate('/account/login');
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Define the API URL
    const apiUrl = `${SERVER_BASE_URL}/api/storefront/addresses?customerId=${customerID}`;
    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAddresses(data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [addressForm, selectedAddress, editAddress, loadAddress, showLoader]);

  useEffect(() => {
    if (addresses) setFilteredAddresses(addresses);
  }, [addresses]);

  return (
    <div className="relative w-full max-w-[1640px] mx-auto ">
      <div className={`w-full max-w-[1640px] sm:mt-[0px] mt-[20px]  mx-auto`}>
        {!addressForm && !selectedAddress && (
          <div className="w-full">
            <ContactTable
              customerID={customerID}
              openModal={openModal}
              filteredAddresses={filteredAddresses}
              editAddress={editAddress}
              setSelectedAddress={setSelectedAddress}
              setSelectedCheckboxes={setSelectedCheckboxes}
              selectedCheckboxes={selectedCheckboxes}
              setFilteredAddresses={setFilteredAddresses}
              setAddressForm={setAddressForm}
            />
          </div>
        )}
        {addressForm && (
          <div className="w-full max-w-[1640px] sm:px-[20px] px-[0px] mx-auto">
            <AddressForm
              customerID={customerID}
              setAddressForm={setAddressForm}
              setEditAddress={setEditAddress}
            />
          </div>
        )}
        {selectedAddress && (
          <div className="w-full max-w-[1640px] sm:px-[20px] px-[0px] mx-auto">
            <EditAddressForm
              customerID={customerID}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setEditAddress={setEditAddress}
              setAddressForm={setAddressForm}
              loadAddress={loadAddress}
              setLoadAddress={setLoadAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
}
