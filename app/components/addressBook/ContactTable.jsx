import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useTable, usePagination} from 'react-table';
import edit from '../../../assets/Image/edit.png';
import ConfirmationModal from '../modal/ConfirmationModal';
import {useStateContext} from '../../context/StateContext';
import CheckBox from '../../components/CheckBox';
import CircularLoader from '../CircularLoder';
import DynamicButton from '../DynamicButton';
import ErrorModal from '../modal/ErrorModal';
import Instruction from '../modal/Instruction';
import chooseFile from '../../../assets/Image/choose-file.svg';
import {useLocation} from '@remix-run/react';
import {VideoTutorial} from '../VideoTutorial';
import {RxCross2} from 'react-icons/rx';
import SuccessfullLoader from '../SucessfullLoader';

const ContactTable = ({
  customerID,
  filteredAddresses,
  editAddress,
  setSelectedCheckboxes,
  closeIcon,
  setSelectedAddress,
  selectedCheckboxes,
  setAddressForm,
  ProdcuctSide,
  continueBtn,
  setFilteredAddresses,
}) => {
  const {
    loadAddress,
    setLoadAddress,
    addresses,
    loaderTitle,
    setLoaderTitle,
    showLoader,
    setShowLoader,
  } = useStateContext();
  const [selectedType, setSelectedType] = useState('all');

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [updateLoader, setupdateLoader] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorContent, setErrorContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadBulkAddress, setUploadBulkAddress] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const pathName = useLocation();
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
    setLoaderTitle('Deleting Address...');
    setShowLoader(true);
    const url = `https://testapi.simplynoted.com/api/storefront/addresses/multiple-remove?customerId=${customerID}`;

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
          setLoaderTitle(null);

          setShowLoader(false);
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
    if (addresses.length > 0) {
      setupdateLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        setupdateLoader(false);
      }, 1500);
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
            row.original.type === 'return' ? 'sender' : row.original.type,
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
        var currentLine = lines[i].trim();
        // Skip empty lines
        if (currentLine.length === 0) {
            continue;
        }
 
        // Handle commas inside double quotes
        var parts = currentLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
       
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = parts[j]?.replace(/"/g, '').trim();
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

  const updatedAddressData = addresses.map((item) => {
    if (item.type === 'return') {
      return {...item, type: 'sender'};
    }
    return item;
  });

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    // Filter the addresses based on the search term
    if (value.trim() !== '') {
      const filtered = updatedAddressData.filter((address) =>
        Object.values(address).some((field) =>
          field.toString().toLowerCase().includes(value.toLowerCase()),
        ),
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses(updatedAddressData);
    }
  };

  function cleanHeaders(headerRow) {
    const cleanedHeaders = {};
    for (const key in headerRow) {
      cleanedHeaders[key?.replace(/"/g, '')?.trim()] = headerRow[key]
        ?.replace(/"/g, '')
        ?.trim();
    }
    return cleanedHeaders;
  }

  // function checkCSVFormat(headerRow, requiredHeaders) {
  //   const headerKeys = Object.keys(headerRow);
  //   const missingHeaders = [];
  //   for (let i = 0; i < requiredHeaders.length; i++) {
  //     const requiredHeader = requiredHeaders[i];
  //     const headerKey = headerKeys[i];

  //     if (!headerKey || headerKey !== requiredHeader) {
  //       missingHeaders.push(requiredHeader);
  //     }
  //   }

  //   const isValidFormat = missingHeaders.length === 0;
  //   return {isValidFormat, missingHeaders};
  // }

  const handleUploadClick = async () => {
    setShowLoader(true);
    setUploadBulkAddress(false);

    if (fileData.length === 0) {
      console.warn('No data to upload');
      return;
    }

    const requiredFields = [
      'Type',
      'First Name',
      'Last Name',
      'Address',
      'City',
      'State/Province',
      'Postal Code',

    ];

    // const requiredHeaders = [
    //   'Type',
    //   'First Name',
    //   'Last Name',
    //   'Address',
    //   'Address 2',
    //   'City',
    //   'State/Province',
    //   'Country',
    //   'Postal Code',
    //   'Phone',
    //   'Email',
    //   'Company',
    //   'Birthday',
    //   'Anniversary',
    //   'Custom 1',
    //   'Custom 2',
    //   'Custom 3',
    // ];

    const errors = [];
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  
    fileData.forEach((obj, index) => {
      const cleanedHeaders = cleanHeaders(obj);
      const missingKeys = requiredFields.filter((key) => !(key in cleanedHeaders));
      if (missingKeys.length > 0) {
        errors.push(missingKeys);
      }
    });

    // const {isValidFormat, missingHeaders} = checkCSVFormat(
    //   cleanedHeaders,
    //   requiredHeaders,
    // );

    if (errors.length > 0) {
      setErrorModal(true);
      setShowLoader(false);
      setFileData(null);
      file.current.value = '';
      setSelectedFile(null);
      setErrorContent([
        'The file you are trying to upload does not have the right columns or headers. Please download our Bulk Address template and try again.',
      ]);
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

    let totalAddresses = cleanedData.length;

    try {
      const batchSize = 250;
      const numBatches = Math.ceil(cleanedData.length / batchSize);

      for (let i = 0; i < numBatches; i++) {
        const startIdx = i * batchSize;
        const endIdx = Math.min((i + 1) * batchSize, cleanedData.length);
        const batchData = cleanedData.slice(startIdx, endIdx);

        // Validate missing fields in the current batch
        for (const data of batchData) {
          const missingFields = [];
          for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
              missingFields.push(field);
            } else if (field === 'First Name' || field === 'Last Name') {
              if (!namePattern.test(data[field])) {
                missingFields.push(`${field} contains invalid characters`);
              }
            }
            //  else if (field === 'Email') {
            //   if (!emailPattern.test(data[field])) {
            //     missingFields.push(`${field} is not a valid email`);
            //   }
            // } 
            else if (field === 'Type') {
              if (
                data[field].toLowerCase() !== 'recipient' &&
                data[field].toLowerCase() !== 'sender'
              ) {
                missingFields.push(`${field} should be either 'Sender' or 'Recipient`);
              }
            }
          }

          if (missingFields.length > 0) {
            errors.push(
              `Missing fields in row ${startIdx + 1}: ${missingFields.join(
                ', ',
              )}`,
            );
          }
        }

        if (errors.length > 0) {
          // If any missing fields found, display error and halt further processing
          setErrorContent(errors);
          setErrorModal(true);
          setShowLoader(false);
          return;
        }

        // If no missing fields, proceed to upload the batch
        await uploadDataBatchToAPI(batchData, totalAddresses);
        totalAddresses -= batchData.length;
      }
    } catch (error) {
      setShowLoader(false);
      setLoaderTitle('Error while Uploading Address Book');
      setFileData(null);
      setupdateLoader(false);
      setSelectedFile(null);
      file.current.value = '';
      console.error('Error uploading data:', error);
      throw error;
    } finally {
      setLoaderTitle('Uploaded Address Successfully');
      setTimeout(() => {
        setShowLoader(false);
        setLoaderTitle(null);
      }, 1400);
    }
  };

  const uploadDataBatchToAPI = async (batchData, totalAddresses) => {
    setLoaderTitle('Uploading Address Book....');
    setShowLoader(true);
    const apiUrl = `https://testapi.simplynoted.com/api/storefront/addresses/multiple-save?customerId=${customerID}`;

    const requestData = batchData.map((data) => ({
      firstName: data['First Name'] || '',
      lastName: data['Last Name'] || '',
      businessName: data.Company || '',
      address1: data.Address || '',
      address2: data['Address 2'] || '',
      city: data.City || '',
      state: data['State/Province'] || '',
      zip: data['Postal Code'] || '',
      country: data.Country || 'USA',
      type: data.Type
        ? data.Type.toLowerCase() === 'sender'
          ? 'return'
          : 'recipient'
        : 'recipient',
      birthday: data.Birthday || '',
      anniversary: data.Anniversary || '',
    }));

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.ok) {
        const responseData = await response.json();
        setLoadAddress(!loadAddress);
        setSelectedFile(null);
        file.current.value = '';
        setFileData(null);
        file.current.value = '';
        'Successful response data:', responseData.result;
      } else {
        file.current.value = '';
        setSelectedFile(null);
        setShowLoader(false);
        setFileData(null);
        setupdateLoader(false);
        setLoaderTitle('Error while Uploading Address Book...');
        file.current.value = '';
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setShowLoader(false);
      setLoaderTitle('Error while Uploading Address Book');
      setFileData(null);
      setupdateLoader(false);
      setSelectedFile(null);
      file.current.value = '';
      console.error('Error uploading data:', error);
      throw error;
    } finally {
      if (totalAddresses === 1) {
        setLoaderTitle('Uploaded Address Successfully');
        setTimeout(() => {
          setShowLoader(false);
          setLoaderTitle(null);
        }, 1400);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const uploadBulkAddressRef = useRef(null);
  const clickUploadBulkAddress = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        uploadBulkAddressRef.current &&
        !uploadBulkAddressRef.current.contains(event.target) &&
        clickUploadBulkAddress.current &&
        !clickUploadBulkAddress.current.contains(event.target)
      ) {
        setUploadBulkAddress(false);
        setSelectedFile(null);
        file.current.value = '';
        setFileData(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [uploadBulkAddressRef, clickUploadBulkAddress]);

  return (
    <>
      {errorModal ? (
        <Instruction
          title="Uploaded Error!"
          body={errorContent}
          close={true}
          closeModal={() => {
            setErrorModal(false);
            setShowLoader(false);
          }}
          isOpen={errorModal}
        />
      ) : (
        // <ErrorModal
        //   title="Uploaded Error!"
        //   isOpen={errorModal}
        //   onRequestClose={() => setErrorModal(false)}
        //   content={errorContent}
        // />
        <div className="w-full mx-auto relative max-w-[100%]">
          {pathName.pathname !== '/account' && (
            <h2 className="font-bold sm:text-[29px] text-[21px] font-karla lg:text-[34px] text-center text-[#001a5f]">
              ADDRESS BOOK
            </h2>
          )}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 my-8">
            <div className="w-full max-w-[400px]">
              <input
                type="text"
                placeholder="Search Addresses..."
                value={searchText}
                onChange={handleSearchInputChange}
                className="w-full md:max-w-[250px] lg:max-w-[400px] py-[5px] text-black md:text-[15px] text-[12px] px-[10px] h-[45px] border border-solid border-[#001A5F]"
              />
            </div>
            <div className="tab:flex grid md:items-end  items-center md:gap-[10px]">
              <div
                ref={clickUploadBulkAddress}
                className="flex items-center justify-end lg:mt-[0px]  md:mb-[0px] mb-[17px]"
              >
                <DynamicButton
                  className="bg-[#EF6E6E] px-[50px] py-[14px] whitespace-nowrap md:w-[190px] sm:w-[287px] w-[220px] h-[45px] text-[14px] font-normal "
                  text="Upload Bulk Address"
                  onClickFunction={(event) => {
                    setUploadBulkAddress(!uploadBulkAddress);
                  }}
                />
              </div>

              <div
                ref={uploadBulkAddressRef}
                className={`absolute md:right-[165px] z-10 right-[30px] sm:right-[246px] md:top-[57px] top-[122px] mt-[-2px] rounded-md shadow-lg bg-white ring-1 w-full max-w-[240px] mx-auto ring-black ring-opacity-0 focus:outline-none
                  overflow-hidden  ${
                    uploadBulkAddress
                      ? 'max-h-[500px] transition-max-h duration-1000 ease-in-out'
                      : 'max-h-0'
                  }
                  `}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="flex justify-end mr-[7px] mt-[5px]">
                  <p
                    className="bg-[#ef6e6e] cursor-pointer text-white"
                    onClick={() => {
                      setSelectedFile(null);
                      file.current.value = '';
                      setFileData(null);
                      setUploadBulkAddress(false);
                    }}
                  >
                    <RxCross2 />
                  </p>
                </div>
                <div className="flex flex-col justify-center items-start p-4">
                  <div className="flex flex-col items-start gap-[4px]">
                    <h2 className="text-[#000] text-[16px] md:text-[20px] leading-[110%] font-bold font-karla ">
                      Bulk Address Upload{' '}
                    </h2>
                    <h4
                      className="text-[#001A5F] text-[12px] font-bold font-karla md:text-[14px] cursor-pointer leading-[157.14%]"
                      onClick={() => setShowVideo(true)}
                    >
                      Watch Tutorial <span className="underline">Video</span>
                    </h4>
                  </div>

                  <div className="flex flex-col justify-center mt-[16px] mb-[8px] items-center border-2 border-dashed max-w-[100%] w-[100%] min-h-[100px] border-[#1B5299]">
                    <label
                      htmlFor="fileInput"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <input
                        id="fileInput"
                        onChange={handleFileChange}
                        type="file"
                        accept=".csv"
                        ref={file}
                        className="hidden"
                      />
                      <img
                        className="h-[43px] w-[43px]"
                        src={chooseFile}
                        alt="choose-file"
                      />
                      <h4 className="text-[#001A5F] text-[12px] font-bold font-karla md:text-[16px] leading-[22px]">
                        Choose File
                      </h4>
                    </label>
                  </div>

                  <a
                    className="text-[#000]  w-[233px] text-[14px] lg:whitespace-nowrap leading-[22px] font-karla font-bold"
                    href="https://api.simplynoted.com/docs/bulk-template"
                  >
                    Download bulk address template
                  </a>
                  <span
                    onClick={openModal}
                    className="font-bold text-[#000] md:text-[14px] text-[12px] leading-[22px] font-karla cursor-pointer underline"
                  >
                    View bulk upload instructions.
                  </span>
                  {selectedFile && (
                    <div className="mt-2  w-full text-center">
                      <span className="text-[#000] text-[14px] break-all  leading-[22px] font-karla font-bold">
                        {selectedFile?.name}
                      </span>
                      <DynamicButton
                        text="Upload"
                        className="bg-[#ef6e6e] w-full mt-2  h-[36px] mx-auto "
                        onClickFunction={() => handleUploadClick()}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end lg:mt-[0px]  md:mb-[0px] mb-[17px]">
                <DynamicButton
                  className="bg-[#1b5299] px-[50px] md:w-[190px] sm:w-[287px] w-[220px] whitespace-nowrap h-[45px] py-[14px] text-[14px] font-normal "
                  text="+ New Address"
                  onClickFunction={() => setAddressForm(true)}
                />
              </div>
            </div>
          </div>
          {!editAddress && (
            <>
              <div className="md:flex grid  md:gap-[16px] gap-0 items-center sm:mt-[0px] mb-[14px]">
                {selectedCheckboxes &&
                  selectedCheckboxes.length > 0 &&
                  !ProdcuctSide && (
                    <button
                      onClick={() => setDeleteModal(true)}
                      className="text-white bg-[#ef6e6e] mt-[0px] tracking-[1px] h-[45px] w-[200px] border border-solid md:text-[13px] text-[12px] lg:m-[0px] m-[12px] lg:ml-[0px] ml-[2px] font-bold py-[3px] px-[16px]"
                    >
                      Delete Selected
                    </button>
                  )}
                <span className="text-black text-[13px] md:text-left text-center lg:mt-[0px] md:mt-[12px]  font-bold">
                  Number of address selected : {selectedCheckboxes?.length}
                </span>
              </div>
              {ProdcuctSide && selectedCheckboxes.length > 0 && (
                <div className="flex md:justify-normal justify-center">
                  <button
                    className="text-white bg-[#EF6E6E] w-[190px] h-[45px] mb-2 border border-solid text-[16px] font-bold py-[3px] px-[16px]"
                    onClick={continueBtn}
                  >
                    Continue
                  </button>
                </div>
              )}
              {/* Your table rendering code here... */}
              <div className="overflow-auto">
                <table className="min-w-full bg-gray-200 text-black overflow-auto">
                  <thead className="bg-[#0D0C22] text-[white] text-[14px] font-bold">
                    {headerGroups.map((headerGroup, index) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                          <th
                            key={index}
                            {...column.getHeaderProps()}
                            className={`text-center whitespace-nowrap uppercase ${
                              column.id === 'type'
                                ? 'bg-gray-300'
                                : 'bg-gray-200'
                            }text-sm font-semibold py-2 px-4`}
                          >
                            {column.id === 'type' ? (
                              <div className="flex items-center relative type-select">
                                <select
                                  className="bg-transparent text-black border-none outline-none appearance-none absolute inset-y-0 right-0 pr-3"
                                  onChange={handleTypeChange}
                                  value={selectedType}
                                >
                                  <option value="all">All</option>
                                  <option value="recipient">Recipient</option>
                                  <option value="return">Sender</option>
                                </select>
                                <span className="mr-1">Type</span>
                                <svg
                                  className="w-4 h-4 text-white fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 12l-6-6h12z" />
                                </svg>
                              </div>
                            ) : column.id === '_id' ? (
                              <CheckBox
                                onChange={handleSelectAll}
                                checked={allSelected}
                                className={`cursor-pointer ${
                                  data.length === 0 && 'bg-white'
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
                  {!updateLoader && !showLoader && (
                    <tbody>
                      {page.map((row, index) => {
                        prepareRow(row);
                        return (
                          <tr
                            key={index}
                            {...row.getRowProps()}
                            className={`text-center font-semibold ${
                              index % 2 === 0 ? 'bg-white' : 'bg-white'
                            }`}
                          >
                            {row.cells.map((cell, index) => (
                              <td
                                {...cell.getCellProps()}
                                className="border border-[#EFEFF2] capitalize py-2 px-4 whitespace-nowrap"
                                key={index}
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
              </div>

              {updateLoader && !showLoader && addresses.length > 0 && (
                <div className="flex justify-center items-center mt-[24px]">
                  <CircularLoader
                    title="Loading Address Book"
                    color="#ef6e6e"
                  />
                </div>
              )}
              {showLoader && (
                <div className="flex justify-center items-center mt-[24px]">
                  <CircularLoader title={loaderTitle} color="#ef6e6e" />
                </div>
              )}

              {filteredAddresses.length === 0 &&
                !updateLoader &&
                !showLoader && (
                  <div className="text-[22px] md:text-[30px] font-medium mt-10 text-center text-[#0D0C22]  font-karla">
                    No Address Found
                  </div>
                )}

              {page && page.length > 0 && !updateLoader && !showLoader && (
                <div className="pagination">
                  <div>
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {'<<'}
                    </button>
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
                    </button>
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
                    </button>
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {'>>'}
                    </button>
                  </div>
                  <div>
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </div>
                </div>
              )}
            </>
          )}

          <ConfirmationModal
            show={deleteModal}
            onCancel={() => setDeleteModal(false)}
            onConfirm={handleDeleteSelected}
            message="Are you sure you want to delete all selected records? This action cannot be undone?"
            confirmText="Delete"
            cancelText="Cancel"
          />
          <Instruction
            isOpen={isModalOpen}
            close={true}
            subtitle={true}
            instructionsTitle={true}
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
      <Instruction
        isOpen={showVideo}
        body={<VideoTutorial />}
        close={true}
        closeModal={() => setShowVideo(false)}
      />
    </>
  );
};

export default ContactTable;
