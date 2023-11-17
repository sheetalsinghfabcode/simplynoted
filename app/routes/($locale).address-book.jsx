import {useEffect, useState} from 'react';
import AddressForm from '../components/addressBook/AddressForm';
import EditAddressForm from '../components/addressBook/EditAddressForm';
import Instruction from '~/components/modal/Instruction';
import {useNavigate} from '@remix-run/react';
import Loader from '../components/modal/Loader';
import DynamicButton from '~/components/DynamicButton';
import ContactTable from '~/components/addressBook/ContactTable';
import ErrorModal from '../components/modal/ErrorModal';
import {useAddressBook} from '~/components/AddressBookContext';
import DynamicTitle from '~/components/Title';
import CircularLoader from '~/components/CircularLoder';

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([addresses]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [updateLoader, setupdateLoader] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorContent, serErrorContent] = useState([]);

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

  function csvToJson(csv) {
    var lines = csv.split('\n');
    var result = [];

    var headers = lines[0].split(',');
    for (var i = 1; i < lines.length; i++) {
      var currentLine = lines[i].split(',');

      // Skip empty lines
      if (currentLine.length === 1 && currentLine[0].trim() === '') {
        continue;
      }

      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = csvToJson(csvData);
        setSelectedFile(file);
        setFileData(jsonData);
      };
      reader.readAsText(file);
    }
  };

  const uploadDataToAPI = async (data) => {
    setupdateLoader(true);
    const modifiedData = {};

    for (let key in data) {
      const modifiedKey = key?.replace(/"/g, '');

      modifiedData[modifiedKey] = data[key].replace(/"/g, '');
    }
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: modifiedData['First Name'] || '',
          lastName: modifiedData['Last Name'] || '',
          businessName: modifiedData.Company || '',
          address1: modifiedData.Address || '',
          address2: modifiedData['Address 2'] || '',
          city: modifiedData.City || '',
          state: modifiedData['State/Province'] || '',
          zip: modifiedData['Postal Code'] || '',
          country: modifiedData.Country || 'USA',
          type: modifiedData.Type
            ? modifiedData.Type.toLowerCase() === 'sender'
              ? 'return'
              : 'recipient'
            : 'recipient',
          birthday: modifiedData.Birthday || '',
          anniversary: modifiedData.Anniversary || '',
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setLoadAddress(!loadAddress);
        setSelectedFile(null);
        setupdateLoader(false);
        'Successful response data:', responseData.result;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.log('Error uploading data:', error);
      throw error;
    }
  };

  const handleUploadClick = async () => {
    if (fileData.length === 0) {
      console.warn('No data to upload');
      return;
    }

    const requiredFields = [
      'First Name',
      'Last Name',
      'Address',
      'City',
      'State/Province',
      'Postal Code',
      'Email',
    ];
    const errors = [];

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    for (let i = 0; i < fileData.length; i++) {
      const data = fileData[i];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
          missingFields.push(field);
        } else if (field === 'First Name' || field === 'Last Name') {
          if (!namePattern.test(data[field])) {
            missingFields.push(`${field} contains numbers`);
          }
        } else if (field === 'Email') {
          if (!emailPattern.test(data[field])) {
            missingFields.push(`${field} is not a valid `);
          }
        }
      }

      if (missingFields.length > 0) {
        for (const field of missingFields) {
          errors.push(`Row ${i + 1}: Missing field - ${field}`);
        }
      } else {
        await uploadDataToAPI(data);
      }
    }

    if (errors.length > 0) {
      serErrorContent(errors);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        serErrorContent([]);
      }, [4000]);
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setSelectedCheckboxes([]);

    // Filter the addresses based on the search term
    const filtered = addresses.filter((address) =>
      Object.values(address).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredAddresses(filtered);
  };

  return (
    <>
      <div className="bg-[#e0e9f8] relative w-full max-w-[1440px] mx-auto px-[20px]">
      
      {
        errorModal ? (
          <ErrorModal
            title="Uploaded Error!"
            isOpen={errorModal}
            onRequestClose={() => setErrorModal(false)}
            content={errorContent}
          />
        ) : (
          <>
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
                    searchText={searchText}
                    selectedFile={selectedFile}
                    setSearchText={setSearchText}
                    filteredAddresses={filteredAddresses}
                    editAddress={editAddress}
                    updateLoader={updateLoader}
                    setupdateLoader={setupdateLoader}
                    setSelectedAddress={setSelectedAddress}
                    handleSearchInputChange={handleSearchInputChange}
                    setSelectedCheckboxes={setSelectedCheckboxes}
                    selectedCheckboxes={selectedCheckboxes}
                    handleFileChange={handleFileChange}
                    handleUploadClick={handleUploadClick}
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
          </>
        )}
      </div>
    </>
  );
}
