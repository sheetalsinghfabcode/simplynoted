import React, {useState, useEffect} from 'react';
import location from '../../../location.json';
import DateInput from '../addressBook/DateInput';
import DynamicButton from '../DynamicButton';

const AddressForm = ({
  setAddressForm = () => {},
  setEditAddress,
  customerID,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    type: '',
    birthday: '',
    anniversary: '',
  });

  const [errors, setErrors] = useState({});

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
        state: selectedCountry ? selectedCountry.states[0] : '',
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const selectedCountry = location.countries.find(
    (country) => country.country === formData.country,
  );

  const uploadDataToAPI = () => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;

    fetch(apiUrl, {
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
    })
      .then((response) => {
        if (response.ok) {
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
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.address1) {
      newErrors.address1 = 'Address is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.state) {
      newErrors.state = 'State/Province is required';
    }
    if (!formData.postalCode) {
      newErrors.postalCode = 'Postal Code is required';
    }

    setErrors(newErrors);

    // Return true if the form is valid, i.e., no errors
    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = () => {
    if (validateForm()) {
      uploadDataToAPI();
      setAddressForm(false);
    }
  };

  return (
    <>
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
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.firstName ? 'border-red-500' : ''
                }`}
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First Name"
                value={formData.firstName}
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
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                  {errors.lastName}
                </p>
              )}
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
                value={formData.address1}
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
                value={formData.address2}
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
                value={formData.city}
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
                value={formData.state}
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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.postalCode ? 'border-red-500' : ''
              }`}
              id="postalCode"
              required
              name="postalCode"
              type="number"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.postalCode}
              </p>
            )}
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
                value={formData.type}
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
                value={formData.birthday}
                onChange={(value) =>
                  handleChange({target: {name: 'birthday', value}})
                }
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <DateInput
                fieldType="anniversary"
                label="Anniversary"
                value={formData.anniversary}
                onChange={(value) =>
                  handleChange({target: {name: 'anniversary', value}})
                }
              />
            </div>
          </div>

          <div className=" flex gap-[20px] mb-6">
            <DynamicButton
              className="bg-[#1b5299]"
              text="Save Address"
              onClickFunction={saveAddress}
            />
            <DynamicButton
              className="bg-[#ef6e6e]"
              text="Cancel"
              onClickFunction={() => {
                setAddressForm(false);
                setEditAddress(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
