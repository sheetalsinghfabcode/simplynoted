import React, {useState, useEffect, useMemo} from 'react';
import {useTable, usePagination} from 'react-table';
import Loader from '../modal/Loader';
import edit from '../../../assets/Image/edit.png';
import ConfirmationModal from '../modal/ConfirmationModal';
import {useAddressBook} from '../AddressBookContext';
import CheckBox from '../../components/CheckBox';
import CircularLoader from '../CircularLoder';
import DynamicButton from '../DynamicButton';

const ContactTable = ({
  customerID,
  filteredAddresses,
  editAddress,
  setSelectedCheckboxes,
  setSelectedAddress,
  selectedCheckboxes,
  openModal,
  setAddressForm,
  ProdcuctSide,
  continueBtn,
  setFilteredAddresses

}) => {
  const {loadAddress, setLoadAddress,addresses} = useAddressBook();
  const [selectedType, setSelectedType] = useState('all');
  const [loader, setLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [updateLoader, setupdateLoader] = useState(false);
const [searchFilter,setSearchFilter] = useState([])
  

  let data = filteredAddresses;



  console.log("filteredAddresses",filteredAddresses)
  console.log("data",data)

  

  const handleTypeChange = (e) => {
    setSelectedCheckboxes([]);
    setSelectedType(e.target.value);
  };

  const handleCheckboxChange = (e, row) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(checkboxValue)) {
        return prevSelectedCheckboxes.filter(
          (value) => value !== checkboxValue,
        );
      } else {
        return [...prevSelectedCheckboxes, checkboxValue];
      }
    });

    const checkboxValue = e.target.value;
    const res = selectedCheckboxes.some(
      (selectedId) => row.original._id == selectedId,
    );
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
      return filteredAddresses.filter(
        (address) => address.type === selectedType,
      );
    }
  };

  data = useMemo(
    () => filterAddressesByType(),
    [selectedType, filteredAddresses],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'check',
        accessor: '_id',
        Cell: ({row}) => (
          <CheckBox
            onChange={(e) => handleCheckboxChange(e, row)}
            value={row.original._id}
          />
        ),
      },
      {
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
    ],
    [],
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

  const allSelected =
    page.length > 0 && selectedCheckboxes?.length === page.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(page.map((value) => value._id));
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
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setSelectedCheckboxes([]);

    // Filter the addresses based on the search term
    if(value){
    const filtered = data.filter((address) =>
      Object.values(address).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredAddresses(filtered);

  } else {
    setFilteredAddresses(addresses)
  }
  };
console.log(searchText,"PPPPPPPPPP");
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



  return (
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
                {selectedCheckboxes && selectedCheckboxes.length > 0 && !ProdcuctSide &&(
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
              {ProdcuctSide &&
              <div>
                <button className="text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]" onClick={continueBtn}>Continue</button>
              </div>
              }
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
                {!updateLoader &&
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`text-center font-bold ${
                          row.index % 2 === 0 ? 'bg-[#f1f7fc]' : 'bg-[#96bee3]'
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
                </tbody>}
              </table>{updateLoader &&
              <div className="flex justify-center items-center mt-[24px]">
                 <CircularLoader color="#ef6e6e" />
              </div>}

              {page.length === 0 && (
                <div className="text-center text-[24px] font-bold mt-[20px] text-[#001a5f]">
                  No Address Found
                </div>
              )}
              {page && page.length > 0 && (
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
    </div>
  );
};

export default ContactTable;
