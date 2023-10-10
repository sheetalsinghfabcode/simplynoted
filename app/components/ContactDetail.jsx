import React, {useState} from 'react';
import edit from '../../assets/image/edit.png';

const ContactDetail = ({
  filteredAddresses,
  editAddress,
  setEditAddress,
  customerID,
  setSelectedAddress,
}) => {
  const tableHeaders = [
    'Checkobox',
    'Item',
    'Type',
    'first Name',
    'last Name',
    'business Name',
    'anniversary',
    'birthday',
    'state',
    'country',
    'zip',
    'postal code',
    'address 1',
    'address 2',
  ];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); // Update selectedType when the user selects a type
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;

    if (e.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((value) => value !== checkboxValue),
      );
    }
  };

  const handleDeleteSelected = () => {
    // Construct the URL with the customer ID and selected addressIds
    const url = `https://api.simplynoted.com/api/storefront/addresses/multiple-remove?customerId=${customerID}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressIds: selectedCheckboxes}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log('API Response:', data);
        if (data.result.deletedCount > 0) {
          window.location.reload();
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
      });
  };

  const filterAddressesByType = () => {
    if (selectedType === 'all') {
      return filteredAddresses; // Return all addresses if "all" is selected
    } else {
      return filteredAddresses.filter(
        (address) => address.type === selectedType,
      );
    }
  };

  // Get the filtered addresses based on selected type
  const contactAddress = filterAddressesByType();

  return (
    <div className="container mx-auto mt-8">
      {!editAddress && (
        <>
          <div className="flex gap-[16px] items-center mb-[14px]">
            {selectedCheckboxes && selectedCheckboxes.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]"
              >
                Delete Selected
              </button>
            )}
            <span className="text-black text-[14px] font-bold">
              Number of address selected : {selectedCheckboxes?.length}
            </span>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="uppercase w-full">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="text-center whitespace-nowrap text-white bg-[#001a5f] border border-solid border-[#001a5f] text-[14px] font-bold p-[5px]"
                  >
                    {index === 2 ? (
                   <div className="flex items-center relative">
                   <select
                     className="bg-transparent text-white border-none outline-none appearance-none  absolute inset-y-0 right-0 opacity-0"
                     onChange={handleTypeChange}
                     value={selectedType}
                   >
                     <option className="text-black" value="all">
                       all
                     </option>
                     <option className="text-black" value="recipient">
                       Recipient
                     </option>
                     <option className="text-black" value="return">
                     Return
                     </option>
                   </select>
                   <span className='pl-[10px]'>Type</span>
                   <div className="absolute top-0 right-0 h-full flex items-center pr-2 pointer-events-none">
                     <svg
                       className="w-4 h-4 text-white fill-current"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20"
                     >
                       <path d="M10 12l-6-6h12z" />
                     </svg>
                   </div>
                 </div>
                 
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contactAddress?.map((value, i) => (
                <tr
                  key={i}
                  className={`text-center font-bold ${
                    i % 2 === 0 ? 'bg-[#f1f7fc]' : 'bg-[#96bee3]'
                  } `}
                >
                  <td className="flex border-l border-b border-solid border-black py-[10px] gap-[10px] justify-center items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onChange={handleCheckboxChange}
                      value={value._id}
                    />
                    <img
                      src={edit}
                      className="w-[20px] cursor-pointer h-[20px]"
                      onClick={() => {
                        setSelectedAddress(value);
                      }}
                    />
                  </td>
                  <td className="py-2  border border-solid border-black px-2">
                    {i}
                  </td>
                  <td className="py-2  border border-solid border-black px-2">
                    {value.type}
                  </td>
                  <td className="py-2  border border-solid border-black px-2">
                    {value.firstName}
                  </td>
                  <td className="py-2  border border-solid border-black px-2">
                    {value.lastName}
                  </td>
                  <td className="py-2  border border-solid border-black px-2">
                    {value.businessName}
                  </td>
                  <td className="py-2  border border-solid border-black px-2">
                    {value.anniversary}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.birthday}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.state}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.country}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.zip}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.city}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.address1}
                  </td>
                  <td className="py-2 px-2  border border-solid border-black">
                    {value.address2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ContactDetail;
