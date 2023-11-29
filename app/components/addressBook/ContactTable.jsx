import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useTable, usePagination} from 'react-table';
import edit from '../../../assets/Image/edit.png';
import ConfirmationModal from '../modal/ConfirmationModal';
import {useStateContext} from '../../context/StateContext';
import CheckBox from '../../components/CheckBox';
import CircularLoader from '../CircularLoder';
import DynamicButton from '../DynamicButton';
import ErrorModal from '../modal/ErrorModal';
import CustomCheckbox from '../CustomCheckbox';
import Instruction from '../modal/Instruction';

const ContactTable = ({
  customerID,
  filteredAddresses,
  editAddress,
  setSelectedCheckboxes,
  setSelectedAddress,
  selectedCheckboxes,
  setAddressForm,
  ProdcuctSide,
  continueBtn,
  setFilteredAddresses,
}) => {
  const {loadAddress, setLoadAddress, addresses} = useStateContext();
  const [selectedType, setSelectedType] = useState('all');
  const [loader, setLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [updateLoader, setupdateLoader] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorContent, serErrorContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let data = filteredAddresses.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return dateB - dateA; // Sorting in decending order (newest first)
  });

  const handleTypeChange = (e) => {
    setSelectedCheckboxes([]);
    setSelectedType(e.target.value);
  };

  const handleCheckboxChange = (e, row) => {
    const checkboxValue = e.target.value;

    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(checkboxValue)) {
        return prevSelectedCheckboxes.filter(
          (value) => value !== checkboxValue,
        );
      } else {
        return [...prevSelectedCheckboxes, checkboxValue];
      }
    });
  };

  const handleDeleteSelected = () => {
    setDeleteModal(false);

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
        setTimeout(() => {
          setLoader(false);
        }, [1000]);
        // Handle the response data if needed
        setSelectedCheckboxes([]);
        setLoadAddress(!loadAddress);
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
      });
  };

  const filterAddressesByType = () => {
    if (selectedType === 'all') {
      return filteredAddresses;
    } else {
      return filteredAddresses.filter((address) => {
        const addressType = address.type.toLowerCase();
        if (selectedType === 'return') {
          return addressType === 'sender' || addressType === 'return';
        } else {
          return addressType === selectedType;
        }
      });
    }
  };

  useEffect(() => {
    setupdateLoader(true);
    if (filteredAddresses && filteredAddresses.length > 0) {
      setTimeout(() => {
        setupdateLoader(false);
      }, [2000]);
    }
  }, []);

  data = useMemo(
    () => filterAddressesByType(),
    [selectedType, filteredAddresses],
  );

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'check',
          accessor: '_id',
          Cell: ({row}) => (
            <CheckBox
              onChange={(e) => handleCheckboxChange(e, row)}
              value={row.original._id}
              checked={selectedCheckboxes.includes(row.original._id)}
            />
          ),
        },
        !continueBtn && {
          Header: 'Edit',
          accessor: 'id',
          Cell: ({row}) => (
            <img
              src={edit}
              className="w-[20px] h-[20px] m-auto cursor-pointer"
              onClick={() => setSelectedAddress(row.original)}
            />
          ),
        },

        {
          Header: 'Type',
          accessor: 'type',
          Cell: ({row}) =>
            row.original.type === 'return' ? 'Sender' : row.original.type,
        },
        {
          Header: 'first Name',
          accessor: 'firstName',
        },
        {
          Header: 'last Name',
          accessor: 'lastName',
        },
        {
          Header: 'business Name',
          accessor: 'businessName',
        },
        {
          Header: 'address 1',
          accessor: 'address1',
        },
        {
          Header: 'address 2',
          accessor: 'address2',
        },
        {
          Header: 'city',
          accessor: 'city',
        },
        {
          Header: 'state',
          accessor: 'state',
        },
        {
          Header: 'postal code',
          accessor: 'zip',
        },
        {
          Header: 'country',
          accessor: 'country',
        },
        {
          Header: 'birthday',
          accessor: 'birthday',
        },
        {
          Header: 'anniversary',
          accessor: 'anniversary',
        },
      ].filter(Boolean),
    [selectedCheckboxes],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: {pageIndex},
  } = useTable(
    {
      columns,
      data,
      // Add the initialState for pagination
      initialState: {pageIndex: 0, pageSize: 10},
    },
    usePagination, // Use the pagination plugin
  );
  const openModal = () => {
    setIsModalOpen(true);
  };
  const allSelected =
    page.length > 0 &&
    page.every((row) => selectedCheckboxes.includes(row.original._id));

  const handleSelectAll = () => {
    const currentPageIds = page.map((value) => value.original._id);
    const allSelectedIds = [...selectedCheckboxes];

    const currentPageSelected = currentPageIds.every((id) =>
      allSelectedIds.includes(id),
    );

    if (currentPageSelected) {
      // Deselect all from the current page
      setSelectedCheckboxes(
        allSelectedIds.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      // Select all from the current page and merge with existing selection
      const updatedSelected = Array.from(
        new Set([...allSelectedIds, ...currentPageIds]),
      );
      setSelectedCheckboxes(updatedSelected);
    }
  };

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

  let file = useRef(null);

  const handleFileChange = (event) => {
    file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = csvToJson(csvData);
        setSelectedFile(file);
        setFileData(jsonData);

        // Set the 'file' variable to null after using it
      };
      reader.readAsText(file);
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setSelectedCheckboxes([]);

    // Filter the addresses based on the search term
    if (value) {
      const filtered = data.filter((address) =>
        Object.values(address).some((field) =>
          field.toString().toLowerCase().includes(value.toLowerCase()),
        ),
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses(addresses);
    }
  };

  const uploadDataToAPI = async (data) => {
    setLoader(true);
    const modifiedData = {};

    for (let key in data) {
      const modifiedKey = key?.replace(/"/g, '');

      modifiedData[modifiedKey] = data[key]?.replace(/"/g, '');
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
        file.current.value = '';

        'Successful response data:', responseData.result;
      } else {
        setSelectedFile(null);
        setLoader(false);
        file.current.value = '';
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setSelectedFile(null);
      setLoader(false);
      file.current.value = '';
      console.log('Error uploading data:', error);
      throw error;
    }
  };
  function checkCSVFormat(data) {
    const requiredFormat = [
      'Type',
      'First Name',
      'Last Name',
      'Address',
      '',
      'City',
      'State/Province',
      'Country',
      'Postal Code',
      'Phone',
      'Email',
      'Company',
      'Birthday',
      'Anniversary',
      'Custom 1',
      'Custom 2',
      'Custom 3',
      'Address 2',
    ];

    if (data.length === 0) {
      return false; // Empty CSV
    }

    const headerRow = data[0]; // Assuming the first row is the header

    // Check if headerRow matches the required format
    for (let i = 0; i < requiredFormat.length; i++) {
      if (headerRow[i] !== requiredFormat[i]) {
        return false; // Invalid format
      }
    }

    return true; // Format matches
  }

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

    // Function to check if fileData matches the required CSV format
    const isValidCSVFormat = checkCSVFormat(fileData);

    if (!isValidCSVFormat) {
      setErrorModal(true)
      serErrorContent([
        "The file you are trying to upload does not have the right columns or headers. Please download our Bulk Address template and try again."])
      console.error('Invalid CSV format');
      setTimeout(() => {
        setErrorModal(false)
      },[3000])
      return;
    }

    const cleanedData = fileData.map((entry) => {
      const cleanedEntry = {};
      Object.keys(entry).forEach((key) => {
        const cleanedKey = key?.replace(/"/g, ''); // Remove double quotes from keys
        const cleanedValue = entry[key]?.replace(/"/g, ''); // Remove double quotes from values
        cleanedEntry[cleanedKey] = cleanedValue;
      });
      return cleanedEntry;
    });

    for (let i = 0; i < cleanedData.length; i++) {
      const data = cleanedData[i];
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
            missingFields.push(`${field} is not a valid email`);
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
      setSelectedFile(null);
      setTimeout(() => {
        setErrorModal(false);
        serErrorContent([]);
      }, 4000);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {errorModal ? (
        <ErrorModal
          title="Uploaded Error!"
          isOpen={errorModal}
          onRequestClose={() => setErrorModal(false)}
          content={errorContent}
        />
      ) : (
        <div className="w-full max-w-[100%] overflow-x-auto">
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
                className={`border-[1px] border-dashed border-[#000] py-[5px]`}
              >
                <div className="flex flex-col">
                  <h2 className="font-bold text-[16px] px-[10px] pt-[10px] leading-[120%] text-[#333]">
                    Bulk Address Upload
                  </h2>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept=".csv"
                    ref={file}
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

          {!editAddress && (
            <>
              <div className="flex gap-[16px] items-center mb-[14px]">
                {selectedCheckboxes &&
                  selectedCheckboxes.length > 0 &&
                  !ProdcuctSide && (
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
              {ProdcuctSide && (
                <div>
                  <button
                    className="text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]"
                    onClick={continueBtn}
                  >
                    Continue
                  </button>
                </div>
              )}
              {/* Your table rendering code here... */}
              <table
                className="w-full overflow-auto max-w-[100%]"
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="text-center whitespace-nowrap uppercase text-white !tracking-[1.2px] bg-[#001a5f] border border-solid border-[#001a5f] text-[14px] font-bold p-[10px]"
                        >
                          {column.id === 'type' ? (
                            <div className="flex items-center relative type-select">
                              <select
                                className="bg-transparent w-[10px] text-white border-none outline-none appearance-none  absolute inset-y-0 right-0"
                                onChange={handleTypeChange}
                                value={selectedType}
                              >
                                <option className="text-black" value="all">
                                  all
                                </option>
                                <option
                                  className="text-black"
                                  value="recipient"
                                >
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
                          ) : column.id === '_id' ? (
                            <CheckBox
                              onChange={handleSelectAll}
                              checked={allSelected}
                              className={`cursor-pointer ${
                                data.length === 0 && '!bg-white'
                              }`}
                            />
                          ) : (
                            column.render('Header')
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {!updateLoader && !loader && (
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className={`text-center font-bold ${
                            row.index % 2 === 0
                              ? 'bg-[#f1f7fc]'
                              : 'bg-[#96bee3]'
                          }`}
                        >
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="border border-solid border-black p-[10px] text-center"
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
              {updateLoader && (
                <div className="flex justify-center items-center mt-[24px]">
                  <CircularLoader
                    title="Loading Address Book"
                    color="#ef6e6e"
                  />
                </div>
              )}
              {loader && (
                <div className="flex justify-center items-center mt-[24px]">
                  <CircularLoader
                    title="Updaing Address Book"
                    color="#ef6e6e"
                  />
                </div>
              )}

              {page && page.length > 0 && !updateLoader && !loader && (
                <div className="pagination">
                  <div>
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {'<<'}
                    </button>{' '}
                    <button
                      onClick={() => {
                        previousPage();
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth', // Make the scroll behavior smooth
                        });
                      }}
                      disabled={!canPreviousPage}
                    >
                      {'<'}
                    </button>{' '}
                    <button
                      onClick={() => {
                        nextPage();
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth', // Make the scroll behavior smooth
                        });
                      }}
                      disabled={!canNextPage}
                    >
                      {'>'}
                    </button>{' '}
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {'>>'}
                    </button>{' '}
                  </div>
                  <div>
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                  </div>
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
        </div>
      )}
    </>
  );
};

export default ContactTable;
