import React, {useState} from 'react';
import location from '../../../location.json';
import DateInput from '../addressBook/DateInput';
import DynamicButton from '../DynamicButton';
import {useStateContext} from '../../context/StateContext';
import CircularLoader from '../CircularLoder';

const EditAddressForm = ({setSelectedAddress, customerID, selectedAddress}) => {
  const {setAddressForm, setShowLoader, setLoaderTitle} = useStateContext();

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name === 'country') {
      // Handling country selection
      const selectedCountry = location.countries.find(
        (country) => country.country === value,
      );
      setSelectedAddress((prev) => ({
        ...prev,
        country: value,
        state: selectedCountry ? selectedCountry.states[0] : '', // Set default state
      }));
    } else if (name === 'birthday' || name === 'anniversary') {
      // Handling birthday and anniversary fields
      const selectedDate = new Date(value); // Parse input value to Date object
      const currentDate = new Date();

      if (isNaN(selectedDate)) {
        // Handle invalid date format
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid date format',
        }));
      } else if (selectedDate > currentDate) {
        // Handle future date
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } cannot be in the future`,
        }));
      } else {
        // Reset error for the current field
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }

      // Store the date as a string or Date object, depending on your preference
      setSelectedAddress((prev) => ({
        ...prev,
        [name]: value, // Store as string
        // [name]: selectedDate, // Store as Date object
      }));
    } else if (name === 'postalCode') {
      // Handling postal code
      if (!/^\d+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid postal code format',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }
      setSelectedAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Handling other input fields
      setSelectedAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const selectedCountry = location.countries.find(
    (country) => country.country === selectedAddress.country,
  );

  function convertISOToMMDDYYYY(isoDateString) {
    const date = new Date(isoDateString);
    const month = date.getUTCMonth() + 1; // Month is zero-based, so we add 1
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  }

  const uploadDataToAPI = () => {
    setSelectedAddress(null);
    setShowLoader(true);
    setLoaderTitle('Updating Address Book');
    setLoader(true);
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
        type: selectedAddress.type,
        birthday: selectedAddress.birthday || '',
        anniversary: selectedAddress.anniversary || '',
      }),
    })
      .then((response) => {
        if (response.ok) {
          setShowLoader(false);
          setLoaderTitle(null);
          setLoader(false);
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

    if (errors.birthday) {
      newErrors.birthday = 'Birthday cannot be in the future';
    }
    if (errors.anniversary) {
      newErrors.anniversary = 'Anniversary cannot be in the future';
    }
    setErrors(newErrors);

    // Return true if the form is valid, i.e., no errors
    return Object.keys(newErrors).length === 0;
  };

  const updateAddress = () => {
    if (validateForm()) {
      uploadDataToAPI();
    }
  };

  return (
    <div className="container mx-auto  bg-[#e2ecf6]">
      {loader && (
        <div className="absolute z-[50] top-[50%] left-[50%]">
          <CircularLoader title="Updating Address Book..." color="#ef6e6e" />
        </div>
      )}
      <div
        className={`bg-white shadow-md rounded md:mt-[0px] mt-[23px] px-8 pt-6 pb-8 mb-4 ${
          loader && 'opacity-40'
        }`}
      >
        <div className="md:flex grid md:justify-between justify-normal items-center mb-[16px]">
          <h2 className="text-left text-[#001a5f] md:text-normal text-center md:mb-[0px] mb-[7px] md:text-[34px] text-[31px] font-bold  leading-[44px]">
            Edit Address
          </h2>
          <div className="md:flex grid gap-[10px]">
            <DynamicButton
              className="bg-[#ef6e6e] md:text-[14px] text-[12px] !h-[45px]  w-full  xl:min-w-[180px] max-w-[100%] "
              text="Cancel"
              onClickFunction={() => {
                setAddressForm(false);
                setSelectedAddress(null);
              }}
            />
            <DynamicButton
              className="bg-[#1b5299] whitespace-nowrap  md:text-[14px] text-[12px]  !h-[45px] w-full xl:min-w-[180px] max-w-[100%]"
              text="Update Address"
              onClickFunction={updateAddress}
            />
          </div>
        </div>
        <div className="mb-4 md:flex grid  -mx-3">
          <div className="w-full px-3 mb-6">
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
          <div className="w-full px-3 mb-6">
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
        <div className="mb-4 md:flex grid -mx-3">
          <div className="w-full px-3 mb-6">
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
          <div className="w-full px-3 mb-6">
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
        <div className="mb-4 md:flex grid -mx-3">
          <div className="w-full px-3 mb-6">
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

          <div className="w-full px-3 mb-6">
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

        <div className="mb-4 md:flex grid -mx-3">
          <div className="w-full px-3 mb-6">
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
          <div className="w-full px-3 mb-6">
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

        <div className="mb-4 md:flex grid -mx-3">
          <div className="w-full px-3 mb-6">
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
          <div className="w-full px-3 mb-6">
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
              {selectedAddress.type === '"recipient"' ? (
                <>
                <option value={'recipient'}>Recipient</option>
                <option value={'return'}>Sender</option>
              </>
              
              ) : (
                <>
                <option value={'return'}>Sender</option>
                <option value={'recipient'}>Recipient</option>
              </>
              )}
              {/* Add other types if needed */}
            </select>
          </div>
        </div>

        <div className="mb-4 md:flex grid -mx-3">
          <div className="w-full px-3 mb-6">
            <DateInput
              fieldType="birthday"
              label="Birthday"
              value={selectedAddress.birthday}
              onChange={(value) => {
                handleChange({target: {name: 'birthday', value}});
              }}
            />
            {errors.birthday && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.birthday}
              </p>
            )}
          </div>
          <div className="w-full px-3 mb-6">
            <DateInput
              fieldType="anniversary"
              label="Anniversary"
              value={selectedAddress.anniversary}
              onChange={(value) =>
                handleChange({target: {name: 'anniversary', value}})
              }
            />
            {errors.anniversary && (
              <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                {errors.anniversary}
              </p>
            )}
          </div>
        </div>
        <div className="text-center">
          <DynamicButton
            className="bg-[#1b5299] whitespace-nowrap !h-[45px] text-center w-full max-w-[200px]  h-[60px] "
            text="Update Address"
            onClickFunction={updateAddress}
          />
        </div>
      </div>
    </div>
  );
};
export default EditAddressForm;
