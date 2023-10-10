import {useEffect, useState} from 'react';
import ContactDetail from '../components/ContactDetail';
import AddressForm from '../components/AddressForm';
import EditAddressForm from '../components/EditAddressForm';
import CsvInstruction from '~/components/CsvInstruction';

export default function AddressBook() {
  const customerID = 6406284116073;

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [editAddress, setEditAddress] = useState(false);
  const [filteredAddresses, setFilteredAddresses] = useState([addresses]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        // Update the state with the response data
        setAddresses(data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
        setSelectedFile(file); // Update the selected file state
        setFileData(jsonData);
      };

      reader.readAsText(file);
    }
  };

  const uploadDataToAPI = async (data) => {
    const modifiedData = {};

    for (let key in data) {
      const modifiedKey = key?.replace(/"/g, '');

      modifiedData[modifiedKey] = data[key].replace(/"/g, '');
    }
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;

    try {
      const responseData = await fetch(apiUrl, {
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
    } catch (error) {
      console.error('Error uploading data:', error);
      throw error;
    }
  };

  const handleUploadClick = async () => {
    if (fileData.length === 0) {
      console.warn('No data to upload');
      return;
    }

    try {
      await Promise.all(fileData.map(uploadDataToAPI));
      window.location.reload();
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    // Filter the addresses based on the search term
    const filtered = addresses.filter((address) =>
      Object.values(address).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredAddresses(filtered);
  };

  return (
    <div className='bg-[#e0e9f8]'>
    <div className="w-full max-w-[1440px] px-[24px]  py-[40px] mx-auto">
      <h2 className="text-center text-[#001a5f] font-bold text-[36px]">Address Book</h2>
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
                  <h2 className='font-bold text-[16px] px-[10px] pt-[10px] leading-[120%] text-[#333]'>Bulk Address Upload</h2>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept=".csv"
                    className='p-[10px]'
                  />
                  <a
                    href="https://api.simplynoted.com/docs/bulk-template"
                    className="text-[14px] px-[10px] font-bold underline"
                  >
                    Download bulk address template
                  </a>
                <span 
                onClick={openModal}
                className='font-bold text-[14px] text-black px-[10px] cursor-pointer underline'> View Instructions</span>
                </div>

                {selectedFile && (
                  <button
                    onClick={() => handleUploadClick()}
                    className="w-full text-white bg-[#ef6e6e] p-[5px] mx-[10px] max-w-[292px] mt-[5px]"
                  >
                    Upload
                  </button>
                )}
              </div>
              <div className="flex items-end justify-end ml-[10px] ">
                <button
                  onClick={() => setAddressForm(true)}
                  className="text-white h-[40px] text-[14px] px-[10px] font-bold bg-[#1b5299]"
                >
                  +New Address
                </button>
              </div>
            </div>
          </div>
          <CsvInstruction isOpen={isModalOpen} closeModal={closeModal} />

          <ContactDetail
            customerID={customerID}
            searchText={searchText}
            setSearchText={setSearchText}
            filteredAddresses={filteredAddresses}
            editAddress={editAddress}
            setSelectedAddress={setSelectedAddress}
            setEditAddress={setEditAddress}
          />
        </div>
      )}
      {addressForm && (
        <div className="w-full max-w-[1440px] px-[20px] mx-auto">
          <AddressForm
            setAddressForm={setAddressForm}
            setEditAddress={setEditAddress}
          />
        </div>
      )}
      {selectedAddress && (
        <div className="w-full max-w-[1440px] px-[20px] mx-auto">
          <EditAddressForm
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setEditAddress={setEditAddress}
            setAddressForm={setAddressForm}
          />
        </div>
      )}
    </div>
    </div>
  );
}
