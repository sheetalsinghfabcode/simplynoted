import {useEffect, useState} from 'react';
import ContactDetail from '../components/addressBook/ContactDetail';
import AddressForm from '../components/addressBook/AddressForm';
import EditAddressForm from '../components/addressBook/EditAddressForm';
import CsvInstruction from '~/components/addressBook/CsvInstruction';
import {useNavigate} from '@remix-run/react';
import Loader from '../components/modal/Loader';
import DynamicButton from '~/components/DynamicButton';
import ContactTable from "~/components/addressBook/ContactTable"
import ErrorModal from '../components/modal/ErrorModal';

let customerID;

export default function AddressBook() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [editAddress, setEditAddress] = useState(false);
  const [filteredAddresses, setFilteredAddresses] = useState([addresses]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loadAddress, setLoadAddress] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorContent, serErrorContent] = useState([]);

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
  }, [loadAddress, addressForm, selectedAddress,editAddress]);



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
    setLoader(true);
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
        setLoader(false);
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
    <div className="bg-[#e0e9f8]">
      {loader ? (
        <Loader loaderMessage="Uploading Address Book" />
      ) : errorModal ? (
        <ErrorModal
          title="Uploaded Error!"
          isOpen={errorModal}
          onRequestClose={() => setErrorModal(false)}
          content={errorContent}
        />
      ) : (
        <div className="w-full max-w-[1440px] px-[24px]  py-[40px] mx-auto">
          <h2 className="text-center text-[#001a5f] font-bold text-[36px]">
            Address Book
          </h2>
          {!addressForm && !selectedAddress && (
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-y-[40px] lg:gap-y-[10px] justify-between items-center">
                <input
                  type="text"
                  placeholder="Search Addresses..."
                  value={searchText}
                  onChange={handleSearchInputChange}
                  className="w-full max-w-[400px] py-[5px] px-[10px] h-[45px] border border-solid border-black rounded-[8px]"
                />
                <div className="flex">
                  <div
                    className={`border-[2px] border-soild border-[#000] py-[5px]`}
                  >
                    <div className="flex flex-col">
                      <h2 className="font-bold text-[16px] px-[10px] pt-[10px] leading-[120%] text-[#333]">
                        Bulk Address Upload
                      </h2>
                      <input
                        onChange={handleFileChange}
                        type="file"
                        accept=".csv"
                        className="p-[10px] cursor-pointer"
                      />
                      <a
                        href="https://api.simplynoted.com/docs/bulk-template"
                        className="text-[14px] px-[10px] font-bold underline"
                      >
                        Download bulk address template
                      </a>
                      <span
                        onClick={openModal}
                        className="font-bold text-[14px] text-black px-[10px] cursor-pointer underline"
                      >
                        {' '}
                        View Instructions
                      </span>
                    </div>
                    {selectedFile && (
                      <DynamicButton
                        text="Upload"
                        className="bg-[#ef6e6e] w-full max-w-[292px] !mt-[10px] !ml-[10px] "
                        onClickFunction={() => handleUploadClick()}
                      />
                    )}
                  </div>
                  <div className="flex items-end justify-end ml-[10px] ">
                    <DynamicButton
                      className="bg-[#1b5299]"
                      text="+ New Address"
                      onClickFunction={() => setAddressForm(true)}
                    />
                  </div>
                </div>
              </div>
              <CsvInstruction
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

              {/* <ContactDetail
                customerID={customerID}
                filteredAddresses={filteredAddresses}
                editAddress={editAddress}
                setSelectedAddress={setSelectedAddress}
                handleSearchInputChange={handleSearchInputChange}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              /> */}
              <ContactTable
              customerID={customerID}
              filteredAddresses={filteredAddresses}
              editAddress={editAddress}
              setSelectedAddress={setSelectedAddress}
              handleSearchInputChange={handleSearchInputChange}
              setSelectedCheckboxes={setSelectedCheckboxes}
              selectedCheckboxes={selectedCheckboxes}
              
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
      )}
    </div>
    </>
  );
}
