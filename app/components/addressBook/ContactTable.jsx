import React, {useState, useEffect, useMemo} from 'react';
import {useTable, usePagination} from 'react-table';
import Loader from '../modal/Loader';
import edit from '../../../assets/Image/edit.png';
import ConfirmationModal from '../modal/ConfirmationModal';
import {useAddressBook} from '../AddressBookContext';
import CheckBox from '../../components/CheckBox';

const ContactTable = ({
  customerID,
  filteredAddresses,
  editAddress,
  setSelectedCheckboxes,
  setSelectedAddress,
  selectedCheckboxes,
}) => {
  const {loadAddress, setLoadAddress} = useAddressBook();
  const [selectedType, setSelectedType] = useState('all');
  const [loader, setLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  let data = filteredAddresses;

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
    data.length > 0 && selectedCheckboxes?.length === data.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(data.map((value) => value._id));
    }
  };

  console.log('selectedCheckboxes', selectedCheckboxes);

  return (
    <div className="container mx-auto mt-8">
      {loader ? (
        <Loader loaderMessage="Deleting Address Book Data" />
      ) : (
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
              {/* Your table rendering code here... */}
              <table
                className="w-full overflow-auto max-h-[60vh]"
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
                </tbody>
              </table>
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
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
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
        </>
      )}
    </div>
  );
};

export default ContactTable;
