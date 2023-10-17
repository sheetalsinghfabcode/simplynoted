import {useState} from 'react';
import edit from '../../../assets/Image/edit.png';
import ConfirmationModal from '../../components/modal/ConfirmationModal';
import Loader from '../../components/modal/Loader';

const ContactDetail = ({
  customerID,
  filteredAddresses,
  editAddress,
  setSelectedCheckboxes,
  setSelectedAddress,
  selectedCheckboxes,
}) => {
  const tableHeaders = [
    'check',
    'Edit',
    'Type',
    'first Name',
    'last Name',
    'business Name',
    'address 1',
    'address 2',
    'city',
    'state',
    'postal code',
    'country',
    'birthday',
    'anniversary',
  ];

  const [selectedType, setSelectedType] = useState('all');
  const [deleteModal, setDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleTypeChange = (e) => {
    setSelectedCheckboxes([]);
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
    setLoader(true);
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
        setLoader(false);
        setSelectedCheckboxes([]);
        setDeleteModal(false);
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

  const allSelected = selectedCheckboxes.length === contactAddress.length;
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(contactAddress.map((value) => value._id));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {loader ? (
        <Loader loaderMessage="Deleting Address Book Data" />
      ) :(
        <>
          {!editAddress && (
            <>
              <div className="flex gap-[16px] items-center mb-[14px]">
                {selectedCheckboxes && selectedCheckboxes.length > 0 && (
                  <button
                    onClick={() => setDeleteModal(true)}
                    className="text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]"
                  >
                    Delete Selected
                  </button>
                )}
                <span className="text-black text-[14px] font-bold">
                  Number of address selected : {selectedCheckboxes?.length}
                </span>
              </div>
              <table className="w-full overflow-auto max-h-[60vh]">
                <thead>
                  <tr className="uppercase w-full">
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="text-center whitespace-nowrap text-white !tracking-[1.2px] bg-[#001a5f] border border-solid border-[#001a5f] text-[14px] font-bold p-[10px]"
                      >
                        {index === 2 ? (
                          <div className="flex items-center relative type-select">
                            <select
                              className="bg-transparent w-[10px] text-white border-none outline-none appearance-none  absolute inset-y-0 right-0 w-[10p] "
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
                                Sender
                              </option>
                            </select>
                            <span className="">Type</span>
                            <div className="absolute top-[2px] right-0 left-[41px] h-full flex items-center  pointer-events-none">
                              <svg
                                className="w-4 h-4 text-white fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 12l-6-6h12z" />
                              </svg>
                            </div>
                          </div>
                        ) : index === 0 ? (
                          <input
                            onChange={handleSelectAll}
                            className={`cursor-pointer ${
                              contactAddress.length === 0 && '!bg-white'
                            }`}
                            type="checkbox"
                            checked={allSelected}
                          />
                        ) : (
                          header
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contactAddress.length > 0 &&
                    contactAddress.map((value, i) => (
                      <tr
                        key={i}
                        className={`text-center font-bold ${
                          i % 2 === 0 ? 'bg-[#f1f7fc]' : 'bg-[#96bee3]'
                        } `}
                      >
                        <td className="border border-solid border-black p-[10px] text-center">
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            onChange={handleCheckboxChange}
                            value={value._id}
                            checked={selectedCheckboxes.includes(value._id)}
                          />
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          <img
                            src={edit}
                            className="w-[20px] h-[20px] m-auto cursor-pointer"
                            onClick={() => {
                              setSelectedAddress(value);
                            }}
                          />
                        </td>

                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.type === 'return' ? 'Sender' : value.type}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.firstName}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.lastName}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.businessName}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.address1}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.address2}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.city}
                        </td>
                        <td className="border  border-solid border-black p-[10px] text-center">
                          {value.state}
                        </td>
                        <td className="border border-solid border-black p-[10px] text-center">
                          {value.zip}
                        </td>
                        <td className="border whitespace-nowrap border-solid border-black p-[10px] text-center">
                          {value.country}
                        </td>
                        <td className="border border-solid whitespace-nowrap border-black p-[10px] text-center">
                          {value.birthday}
                        </td>
                        <td className="border border-solid whitespace-nowrap text border-black p-[10px] text-center">
                          {value.anniversary}
                        </td>
                     
                    
                      </tr>
                    ))}
                </tbody>
              </table>
              {contactAddress.length === 0 && (
                <div className="text-center text-[24px] font-bold mt-[20px] text-[#001a5f]">
                  No Address Found
                </div>
              )}
            </>
          )}
          <ConfirmationModal
            show={deleteModal}
            onCancel={() => setDeleteModal(false)}
            onConfirm={handleDeleteSelected}
            message="Are you sure you want to delete all selected records? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        </>
      )}
    </div>
  );
};

export default ContactDetail;


