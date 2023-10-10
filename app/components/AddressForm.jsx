import React, {useState} from 'react';
import location from '../../location.json';

const AddressForm = ({setAddressForm, setEditAddress}) => {
  const customerID = 6406284116073;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    address1: '',
    address2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: 'United States',
    type: '',
    birthday: '',
    anniversary: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'country') {
      // Find the selected country's states
      const selectedCountry = location.countries.find(
        (country) => country.country === value,
      );
      setFormData((prev) => ({
        ...prev,
        country: value,
        state: selectedCountry ? selectedCountry.states[0] : '', // Set default state
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const selectedCountry = location.countries.find(
    (country) => country.country === formData.country,
  );


  const uploadDataToAPI = () => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;

    try {
      const responseData = fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          businessName: formData.businessName || '',
          address1: formData.address1 || '',
          address2: formData.address2 || '',
          city: formData.city || '',
          state: formData.stateProvince || '',
          zip: formData.postalCode || '',
          country: formData.country || 'USA',
          type: formData.type
            ? formData.type.toLowerCase() === 'sender'
              ? 'return'
              : 'recipient'
            : 'recipient',
          birthday: formData.birthday || '',
          anniversary: formData.anniversary || '',
        }),
      });
      if (responseData) {
        setAddressForm(false);
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      throw error;
    }
  };


  return (
    <div className="container mx-auto p-4">
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
              value={formData.firstName}
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
              value={formData.lastName}
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
            value={formData.businessName}
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
            value={formData.address1}
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
            value={formData.address2}
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
              value={formData.city}
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
            <select
              onChange={handleChange}
              value={formData.state}
              name="state"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
            >
              <option value="">Select a state</option>
              {selectedCountry &&
                selectedCountry.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
            </select>
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
            value={formData.postalCode}
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
          <select
            onChange={handleChange}
            value={formData.country}
            itemID="country"
            name="country"
            id="country"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {location.countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
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
            value={formData.type}
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
            value={formData.birthday}
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
            value={formData.anniversary}
            onChange={handleChange}
          />
        </div>
        <div className=" flex gap-[20px] mb-6">
          <button
            onClick={uploadDataToAPI}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Address
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setAddressForm(false);
              setEditAddress(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
