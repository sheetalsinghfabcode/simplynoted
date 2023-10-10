import React, {useState} from 'react';

const EditAddressForm = ({setAddressForm,setSelectedAddress, selectedAddress}) => {
  const customerID = 6406284116073;


  const handleChange = (e) => {
    const {name, value} = e.target;
    setSelectedAddress({
      ...selectedAddress,
      [name]: value,
    });
  };

  const uploadDataToAPI = () => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses/${selectedAddress._id}?customerId=${customerID}`;

    try {
      const responseData = fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          firstName: selectedAddress.firstName || '',
          lastName: selectedAddress.lastName || '',
          businessName: selectedAddress.businessName || '',
          address1: selectedAddress.address1 || '',
          address2: selectedAddress.address2 || '',
          city: selectedAddress.city || '',
          state: selectedAddress.state || '',
          zip: selectedAddress.zip || '',
          country: selectedAddress.country || 'US',
          type: selectedAddress.type
            ? selectedAddress.type.toLowerCase() === 'sender'
              ? 'return'
              : 'recipient'
            : 'recipient',
          birthday: selectedAddress.birthday || '',
          anniversary: selectedAddress.anniversary || '',
        }),
      });
      if (responseData) {
        window.location.reload()
        console.log("responseData",responseData)
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      throw error;
    }
  };


  
  return (
    <div className="container mx-auto p-4 bg-[#e2ecf6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 flex flex-wrap -mx-3">
          <div className="w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              value={selectedAddress.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              required
              type="text"
              placeholder="Last Name"
              value={selectedAddress.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="businessName"
          >
            Business Name (Optional)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="businessName"
            name="businessName"
            type="text"
            placeholder="Business Name"
            value={selectedAddress.businessName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address1"
          >
            Address 1
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address1"
            name="address1"
            type="text"
            placeholder="Address 1"
            required
            value={selectedAddress.address1}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address2"
          >
            Address 2 (Optional)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address2"
            name="address2"
            type="text"
            placeholder="Address 2"
            value={selectedAddress.address2}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-wrap -mx-3">
          <div className="w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="city"
              type="text"
              required
              placeholder="City"
              value={selectedAddress.city}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stateProvince"
            >
              State/Province
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              name="state"
              type="text"
              required
              value={selectedAddress.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="postalCode"
            required
            name="postalCode"
            type="text"
            placeholder="Postal Code"
            value={selectedAddress.zip}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            name="country"
            required
            value={selectedAddress.country}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            name="type"
            value={selectedAddress.type}
            onChange={handleChange}
          >
            <option>Recipient</option>
            <option>Sender</option>
            {/* Add other types if needed */}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthday"
          >
            Birthday (MM/DD/YYYY)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthday"
            name="birthday"
            type="date"
            pattern="\d{1,2}/\d{1,2}/\d{4}"
            placeholder="MM/DD/YYYY"
            value={selectedAddress.birthday}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="anniversary"
          >
            Anniversary (MM/DD/YYYY)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="anniversary"
            name="anniversary"
            type="date"
            pattern="\d{1,2}/\d{1,2}/\d{4}"
            placeholder="MM/DD/YYYY"
            value={selectedAddress.anniversary}
            onChange={handleChange}
          />
        </div>
        <div className=" flex gap-[20px] mb-6">
          <button
            onClick={uploadDataToAPI}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Address
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setAddressForm(false);
              setSelectedAddress(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressForm;
