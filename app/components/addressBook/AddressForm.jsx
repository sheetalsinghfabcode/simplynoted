import React, {useState, useEffect} from 'react';
import location from '../../../location.json';
import DateInput from '../addressBook/DateInput';
import DynamicButton from '../DynamicButton';
import {useStateContext} from '../../context/StateContext';
import CircularLoader from '../CircularLoder';

const AddressForm = ({customerID, defaultOption}) => {
  const {setAddressForm, setEditAddress} = useStateContext();

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
    type: defaultOption,
    birthday: '',
    anniversary: '',
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
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
        state: formData.state || '',
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
          setLoader(false);
          setAddressForm(false);
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

    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = () => {
    if (validateForm()) {
      uploadDataToAPI();
    }
  };

  return (
    <>
      <div className={`container relative mx-auto md:p-4 p-0`}>
        {loader && (
          <div className="absolute z-[50] top-[50%] left-[50%]">
            <CircularLoader title="Adding Address" color="#ef6e6e" />
          </div>
        )}
        <div
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   ${
            loader && 'opacity-40'
          }`}
        >
          <div className="lg:flex grid justify-between items-center mb-[16px]">
            <h2 className=" text-left text-[#001a5f] font-bold md:text-[34px] text-[24px] leading-[43px]">
              New Address
            </h2>
            <div className="flex gap-[10px] lg:mt-0 mt-[12px]">
              <DynamicButton
                className="bg-[#ef6e6e] md:text-[16px] text-[12px] lg:h-[41px] h-[33px] w-full lg:min-w-[180px] w-[140px] "
                text="Cancel"
                onClickFunction={() => {
                  setAddressForm(false);
                  setEditAddress(false);
                }}
              />
              <DynamicButton
                className="bg-[#1b5299] whitespace-nowrap md:text-[16px] text-[12px] lg:h-[41px] h-[33px] w-full xl:min-w-[180px] max-w-[200px]"
                text="Save Address"
                onClickFunction={saveAddress}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-3">
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className={`appearance-none border rounded md:text-[14px] text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={`appearance-none border rounded w-full md:text-[14px] text-[12px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
          <div className="md: items-center">
            <div className="flex flex-wrap -mx-3">
              <div className="md:w-1/2 w-[100%] px-3 mb-6">
                <label
                  className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
                  htmlFor="businessName"
                >
                  Business Name (Optional)
                </label>
                <input
                  className="appearance-none border rounded md:text-[14px] text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>
              <div className="md:w-1/2 w-[100%] px-3 mb-6">
                <label
                  className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <input
                  className={`appearance-none border rounded w-full md:text-[14px] text-[12px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700  md:text-sm text-[12px]  font-bold mb-2"
                htmlFor="address1"
              >
                Address 1
              </label>
              <input
                className={`appearance-none border rounded md:text-[14px] text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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

            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
                htmlFor="address2"
              >
                Address 2 (Optional)
              </label>
              <input
                className="appearance-none border rounded md:text-sm text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address2"
                name="address2"
                type="text"
                placeholder="Address 2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className={`appearance-none border rounded md:text-sm text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700  md:text-sm text-[12px] font-bold mb-2"
                htmlFor="state"
              >
                State/Province
              </label>
              <select
                onChange={handleChange}
                value={formData.state}
                name="state"
                className={`appearance-none border rounded md:text-sm text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
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

          <div className="flex flex-wrap -mx-3">
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700 md:text-sm text-[12px]  font-bold mb-2"
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
                className="appearance-none border rounded w-full md:text-sm text-[12px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {location.countries.map((country) => (
                  <option key={country.country} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <label
                className="block text-gray-700 md:text-sm text-[12px] font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                className="appearance-none border rounded md:text-sm text-[12px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {defaultOption === 'recipient' ? (
                  <>
                    {' '}
                    (<option>Recipient</option>
                    <option>Sender</option>){' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <option>Sender</option>
                    <option>Recipient</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <DateInput
                fieldType="birthday"
                label="Birthday"
                className="md:text-sm text-[10px]"
                value={formData.birthday}
                onChange={(value) =>
                  handleChange({target: {name: 'birthday', value}})
                }
              />
            </div>
            <div className="md:w-1/2 w-[100%] px-3 mb-6">
              <DateInput
                fieldType="anniversary"
                label="Anniversary"
                className="md:text-sm text-[10px]"
                value={formData.anniversary}
                onChange={(value) =>
                  handleChange({target: {name: 'anniversary', value}})
                }
              />
            </div>
          </div>
          <div className="lg:flex  flex justify-center text-center">
            <DynamicButton
              className="bg-[#1b5299] whitespace-nowrap md:text-[14px] text-[12px] text-center w-full max-w-[200px]  md:h-[45px] h-[33px]"
              text="Save Address"
              onClickFunction={saveAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
