import React, {useState} from 'react';
import location from '../../../location.json';
import DateInput from '../addressBook/DateInput';
import DynamicButton from '../DynamicButton';
import Input from "../Input"

const EditAddressForm = ({
  setAddressForm,
  setSelectedAddress,
  setEditAddress,
  setLoadAddress,
  loadAddress,
  customerID,
  selectedAddress,
}) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'country') {
      // Find the selected country's states
      const selectedCountry = location.countries.find(
        (country) => country.country === value,
      );
      setSelectedAddress((prev) => ({
        ...prev,
        country: value,
        state: selectedCountry ? selectedCountry.states[0] : '', // Set default state
      }));
    } else {
      setSelectedAddress({
        ...selectedAddress,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const selectedCountry = location.countries.find(
    (country) => country.country === selectedAddress.country,
  );

  const uploadDataToAPI = () => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses/${selectedAddress._id}?customerId=${customerID}`;

    fetch(apiUrl, {
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
    })
      .then((response) => {
        if (response.ok) {
          setEditAddress(false);
          return response.json(); // Parse the response JSON if it's a successful response
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
        throw error;
      });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields and set error messages if empty
    if (!selectedAddress.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!selectedAddress.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!selectedAddress.address1) {
      newErrors.address1 = 'Address is required';
    }
    if (!selectedAddress.city) {
      newErrors.city = 'City is required';
    }
    if (!selectedAddress.state) {
      newErrors.state = 'State/Province is required';
    }
    if (!selectedAddress.zip) {
      newErrors.zip = 'Postal Code is required';
    }

    setErrors(newErrors);

    // Return true if the form is valid, i.e., no errors
    return Object.keys(newErrors).length === 0;
  };

  const updateAddress = () => {
    if (validateForm()) {
      uploadDataToAPI();
      setLoadAddress(!loadAddress);
      setSelectedAddress(null);
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
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.firstName ? 'border-red-500' : ''
              }`}
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              value={selectedAddress.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.lastName ? 'border-red-500' : ''
              }`}
              id="lastName"
              name="lastName"
              required
              type="text"
              placeholder="Last Name"
              value={selectedAddress.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4 flex flex-wrap -mx-3">

        <div className="w-1/2 px-3 mb-6">
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
        <div className="w-1/2 px-3 mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.zip ? 'border-red-500' : ''
            }`}
            id="postalCode"
            required
            name="zip"
            type="number"
            placeholder="Postal Code"
            value={selectedAddress.zip}
            onChange={handleChange}
          />
          {errors.zip && (
            <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
              {errors.zip}
            </p>
          )}
        </div>
        </div>
        <div className="mb-4 flex flex-wrap -mx-3">


        <div className="w-1/2 px-3 mb-6">

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address1"
          >
            Address 1
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address1 ? 'border-red-500' : ''
            }`}
            id="address1"
            name="address1"
            type="text"
            placeholder="Address 1"
            required
            value={selectedAddress.address1}
            onChange={handleChange}
          />
          {errors.address1 && (
            <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
              {errors.address1}
            </p>
          )}
        </div>

        <div className="w-1/2 px-3 mb-6">

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
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.city ? 'border-red-500' : ''
              }`}
              id="city"
              name="city"
              type="text"
              required
              placeholder="City"
              value={selectedAddress.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.city}
              </p>
            )}
          </div>
          <div className="w-1/2 px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State/Province
            </label>
            <select
              onChange={handleChange}
              value={selectedAddress.state}
              name="state"
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.state ? 'border-red-500' : ''
              }`}
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
            {errors.state && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.state}
              </p>
            )}
          </div>
        </div>

      
        <div className="mb-4 flex flex-wrap -mx-3">


        <div className="w-1/2 px-3 mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <select
            onChange={handleChange}
            value={selectedAddress.country}
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
        <div className="w-1/2 px-3 mb-6">
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
        </div>

        <div className="mb-4 flex flex-wrap -mx-3">

        <div className="w-1/2 px-3 mb-6">
          <DateInput
            fieldType="birthday"
            label="Birthday"
            value={selectedAddress.birthday}
            onChange={(value) =>
              handleChange({target: {name: 'birthday', value}})
            }
          />
        </div>
        <div className="w-1/2 px-3 mb-6">
          <DateInput
            fieldType="anniversary"
            label="Anniversary"
            value={selectedAddress.anniversary}
            onChange={(value) =>
              handleChange({target: {name: 'anniversary', value}})
            }
          />
        </div>

        </div>
        <div className="flex gap-[20px] mb-6">
          <DynamicButton
            className="bg-[#1b5299]"
            text="Update Address"
            onClickFunction={updateAddress}
          />
          <DynamicButton
            className="bg-[#ef6e6e]"
            text="Cancel"
            onClickFunction={() => {
              setAddressForm(false);
              setSelectedAddress(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAddressForm;
