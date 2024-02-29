import React, {useState, useEffect} from 'react';
import location from '../../../location.json';
import DateInput from '../addressBook/DateInput';
import DynamicButton from '../DynamicButton';
import {useStateContext} from '../../context/StateContext';
import CircularLoader from '../CircularLoder';
import {  useLocation } from '@remix-run/react';
import { formatText } from '~/lib/utils';

const AddressForm = ({customerID}) => {
  const {setAddressForm, defaultOption, setEditAddress} = useStateContext();

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
    type: defaultOption ? defaultOption : "",
    birthday: '',
    anniversary: '',
  });


  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const pathname = useLocation()

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    }
     else if (name === 'birthday' || name === 'anniversary') {
      const currentDate = new Date();
      const selectedDate = new Date(value); // Convert value to Date object
      if (selectedDate > currentDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be in the future`,
        }));
        setFormData({
          ...formData,
          [name]: '', // Resetting the date value
        });
      } else {
        setFormData({
          ...formData,
          [name]: selectedDate, // Store as Date object
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    } else if (name === 'postalCode') {
      if (!/^\d+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid postal code format',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
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


  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }
  
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
    if(errors.birthday){
      newErrors.birthday = "Birthday cannot be in the future"
    }
    if(errors.anniversary){
      newErrors.anniversary = "Anniversary cannot be in the future"
    }
  
    // Validate postal code format
    if (formData.postalCode && !/^\d+$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Invalid postal code format';
    }
  
    // Validate date format
   
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  

  const saveAddress = () => {
    if (validateForm()) {
      uploadDataToAPI();
    }
  };

  console.log("errors",errors);

  return (
    <>
      <div className={`relative mx-auto`}>
        {loader && (
          <div className="absolute z-[50] top-[50%] left-[50%]">
            <CircularLoader title="Adding Address" color="#ef6e6e" />
          </div>
        )}
        <div
          className={`rounded md:px-8 px-[0px] pb-8 mb-4 ${pathname.pathname !=="/account" && "mt-6"}   ${
            loader && 'opacity-40' 
          }`}
        >
          <div className="xl:flex grid justify-between  xl:gap-[90px] gap-[0px] items-center mb-[16px]">
            <h2 className=" text-left text-[#001a5f] font-bold md:text-[32px] text-[24px] leading-[43px]">
              New Address
            </h2>
            <div className="flex gap-[10px] lg:mt-0 mt-[12px]">
              <DynamicButton
                className="bg-[#ef6e6e] md:text-[14px] text-[12px] lg:h-[45px] h-[33px] w-full lg:min-w-[190px]  "
                text="Cancel"
                onClickFunction={() => {
                  setAddressForm(false);
                  setEditAddress(false);
                }}
              />
              <DynamicButton
                className="bg-[#1b5299] whitespace-nowrap md:text-[14px] text-[12px] lg:h-[45px] h-[33px] w-full xl:min-w-[190px] max-w-[200px]"
                text="Save Address"
                onClickFunction={saveAddress}
              />
            </div>
          </div>
          <div className="mb-4 flex mt-[30px] flex-wrap -mx-3">
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
                  type="text"
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
                { (defaultOption &&  defaultOption === 'recipient') ? (
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
              {errors.birthday && (
                <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                  {errors.birthday}
                </p>
              )}
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
              {errors.anniversary && (
                <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                  {errors.anniversary}
                </p>
              )}
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
