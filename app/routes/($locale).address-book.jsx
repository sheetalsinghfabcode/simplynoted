import {useEffect, useState} from 'react';
import AddressForm from '../components/addressBook/AddressForm';
import EditAddressForm from '../components/addressBook/EditAddressForm';
import Instruction from '~/components/modal/Instruction';
import {useNavigate} from '@remix-run/react';
import ContactTable from '~/components/addressBook/ContactTable';
import {useAddressBook} from '~/components/AddressBookContext';
import DynamicTitle from '~/components/Title';

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
    selectedAddress,
    setSelectedAddress,
  } = useAddressBook();

  const [filteredAddresses, setFilteredAddresses] = useState([addresses]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  useEffect(() => {
    customerID = localStorage.getItem('customerId');
    if (!customerID) {
      navigate('/account/login');
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Define the API URL
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;
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
  }, [addressForm, selectedAddress, editAddress, loadAddress]);

  useEffect(() => {
    if (addresses) setFilteredAddresses(addresses);
  }, [addresses]);

  return (
    <div className="bg-[#e0e9f8] relative w-full max-w-[1440px] mx-auto px-[20px]">
      <div className={`w-full max-w-[1440px]  mx-auto`}>
        <DynamicTitle dynamicButton title={'Address Book'} />
        {!addressForm && !selectedAddress && (
          <div className="w-full">
            <Instruction
              isOpen={isModalOpen}
              title="INSTRUCTIONS FOR BULK UPLOAD"
              closeModal={closeModal}
              instructions={[
                'Download the bulk upload template (csv)',
                'Complete a row for each address you wish to add',
                'Upload your completed file in .csv format',
              ]}
              table={true}
            />
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
          <div className="w-full max-w-[1440px] px-[20px] mx-auto">
            <AddressForm
              customerID={customerID}
              setAddressForm={setAddressForm}
              setEditAddress={setEditAddress}
            />
          </div>
        )}
        {selectedAddress && (
          <div className="w-full max-w-[1440px] px-[20px] mx-auto">
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
