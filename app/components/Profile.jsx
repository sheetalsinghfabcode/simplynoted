// src/components/AccountForm.js
import React, {useState, useEffect} from 'react';
import DynamicButton from './DynamicButton';
import CircularLoader from './CircularLoder';
import {json} from '@shopify/remix-oxygen';
import {useStateContext} from '~/context/StateContext';
import SuccessfullLoader from './SucessfullLoader';
import location from '../../location.json';
import { SERVER_BASE_URL } from '~/data/config';

const Profile = ({
  customer,
  loader,
  setLoader,
  setAccountDetails,
  accountDetails,
  setAccountDetail,
}) => {
  const customerID = customer.id.replace(/[^0-9]/g, '');

  const [activeTabs, setActiveTabs] = useState('account'); // 'account' or 'security'
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [successfullLoader, setSuccessFullLoader] = useState(false);

  const {setFullName, setAccountTabName, setActiveTab, setUserEmail} =
    useStateContext();

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    setApiKey(apiKey);
  }, [apiKey]);

  const [securityDetails, setSecurityDetails] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleAccountInputChange = (e) => {
    setError('');
    const {name, value} = e.target;
    if (name === 'country') {
      // Handling country selection
      const selectedCountry = location.countries.find(
        (country) => country.country === value,
      );

      setAccountDetails((prevAccountDetails) => ({
        ...prevAccountDetails,
        country: value,
        state: selectedCountry ? selectedCountry.states[0] : '', // Set default state
      }));
    } else {
      setAccountDetails((prevAccountDetails) => ({
        ...prevAccountDetails,
        [name]: value,
      }));
    }
  };

  const selectedCountry = location.countries.find(
    (country) => country.country === accountDetails.country,
  );

  const handleSecurityInputChange = (e) => {
    const {name, value} = e.target;
    setError('');
    setSecurityDetails({
      ...securityDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // Add your logic to update the account details and security
  };

  const updateUserProfile = async () => {
    setLoader(true);

    const payload = {
      first_name: accountDetails.firstName,
      last_name: accountDetails.lastName,
      phone: accountDetails.phone,
      email: accountDetails.email,
      addresses: [
        {
          address1: accountDetails.address1,
          address2: accountDetails.address2,
          city: accountDetails.city,
          province: accountDetails.state,
          zip: accountDetails.zip,
          country: accountDetails.country,
          default: true,
        },
      ],
    };

    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/users/update-profile?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      const jsonResponse = await response.json();
      if (jsonResponse?.errors && jsonResponse?.errors.phone) {
        setError(jsonResponse?.errors.phone[0]);
      }

      if (response.ok) {
        // Request was successful

        if (jsonResponse.updated) {
          localStorage.setItem('SnEmail', accountDetails.email);
          localStorage.setItem('phone', accountDetails.phone);

          localStorage.setItem(
            'SNFullName',
            `${accountDetails.firstName || ''} ${
              accountDetails.lastName ? accountDetails.lastName + ' ' : ''
            }`,
          );

          setTimeout(() => {
            setUserEmail(accountDetails.email);
            setFullName(
              `${accountDetails.firstName || ''} ${
                accountDetails.lastName ? accountDetails.lastName + ' ' : ''
              }`,
            );
            setSuccessFullLoader(true);
            setLoader(false);
            setAccountDetail(true);
          }, [1000]);

          setTimeout(() => {
            setAccountTabName('Profile');
            setActiveTab(7);
            setSuccessFullLoader(false);
          }, 1000);
        }
      } else {
        // Handle errors if the response is not OK
        setLoader(false);
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or exceptions
      setLoader(false);
      console.error('Error:', error);
    }
  };

  const updateUserPassword = async () => {
    if (securityDetails.newPassword.trim() === '') {
      setError('Password cannot be empty');
      return;
    } else if (securityDetails.newPassword.length <= 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    const payload = {
      newPassword: securityDetails.newPassword,
      confirmNewPassword: securityDetails.confirmPassword,
    };
    setLoader(true);
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/users/update-password?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const jsonResponse = await response.json();
      setError(
        jsonResponse.errors?.password_confirmation ||
          jsonResponse.errors?.password ||
          '',
      );
      if (error) {
        setLoader(false);
      }
      if (jsonResponse.customer) {
        setLoader(false);
        setSuccessFullLoader(true);
        setAccountDetail(true);
      }

      if (response.ok) {
        setLoader(false);
        setSuccessFullLoader(false);
        setAccountTabName('Profile');
        setActiveTab(7);
        // Request was successful
      } else {
        setLoader(false);
        // Handle errors if the response is not OK
        console.error('Error updating user profile:', response);
      }
    } catch (error) {
      // Handle network errors or exceptions
      setLoader(false);
      console.error('Error:', error);
    }
  };

  const switchToTab = (tabName) => {
    setActiveTabs(tabName);
    setError(null);
  };

  return (
    <div className="relative">
      {loader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 flex justify-center items-center z-50">
          <CircularLoader
            textColor="text-white"
            title={
              activeTabs === 'account'
                ? 'Updating Profile'
                : 'Updating Password'
            }
            color="#ef6e6e"
          />
        </div>
      )}

      <div
        className={`rounded-lg md:p-6 w-full  mx-auto   ${
          (loader || successfullLoader) && 'opacity-50'
        } `}
      >
        <div className="flex w-full md:mt-[0px] mt-[23px]">
          <button
            onClick={() => switchToTab('account')}
            className={`mr-4 px-4 py-4 w-full text-[18px] font-semibold  rounded-t-lg font-karla ${
              activeTabs === 'account'
                ? 'bg-[#001a5f] text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            Account Details
          </button>
          <button
            onClick={() => switchToTab('security')}
            className={`px-4 py-4 w-full text-[18px] font-semibold  rounded-t-lg font-karla ${
              activeTabs === 'security'
                ? 'bg-[#001a5f] text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            Update Password
          </button>
        </div>
        {activeTabs === 'account' && (
          <form onSubmit={handleSubmit} className="mb-[3rem]">
            <div className=" lg:grid grid-cols-1 items-center mt-[1rem] md:grid-cols-2 grid flex-wrap -mx-3">
              <div className="px-3 ">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={accountDetails.firstName || ''}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="px-3">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={accountDetails.lastName || ''}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {/* Other Account Details Fields */}
              </div>
            </div>

            <div className=" lg:grid grid-cols-1 mt-[1rem] md:grid-cols-2 grid flex-wrap -mx-3">
              <div className="px-3">
                <label
                  htmlFor="email"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  disabled
                  name="email"
                  value={accountDetails.email || ''}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="px-3">
                <label
                  htmlFor="phone"
                  className="block text-gray-700  text-[14px]  font-bold mb-2 whitespace-nowrap"
                >
                  Phone Number (with area code)
                </label>

                <input
                  type="tel"
                  id="phone"
                  maxLength="13"
                  name="phone"
                  value={accountDetails.phone || ''}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {error && (
                  <span className="text-[16px] text-[#ef6e6e] font-semibold">
                    Error: {error}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4 lg:grid grid grid-cols-1 mt-[1rem] md:grid-cols-2 flex-wrap -mx-3">
              <div className="px-3">
                <label
                  htmlFor="address1"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  Address 1
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={accountDetails.address1}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="px-3">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  Address 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={accountDetails.address2}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className=" lg:grid grid grid-cols-1 mt-[1rem] md:grid-cols-2 flex-wrap -mx-3">
              <div className="px-3">
                <label
                  htmlFor="city"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={accountDetails.city}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="px-3">
                <label
                  htmlFor="state"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  State
                </label>

                <select
                  onChange={handleAccountInputChange}
                  value={accountDetails.state}
                  name="state"
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className=" lg:grid grid-cols-1 mt-[1rem] md:grid-cols-2 grid flex-wrap -mx-3">
              <div className="px-3">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  Country
                </label>
                <select
                  value={accountDetails.country}
                  onChange={handleAccountInputChange}
                  itemID="country"
                  name="country"
                  id="country"
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {location.countries.map((country) => (
                    <option key={country.country} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-3">
                <label
                  htmlFor="zip"
                  className="block text-gray-700  text-[14px]  font-bold mb-2"
                >
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={accountDetails.zip}
                  onChange={handleAccountInputChange}
                  className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </form>
        )}

        {activeTabs === 'security' && (
          <>
            {error && (
              <span className="text-[16px] text-[#ef6e6e] font-semibold">
                Error: {error}
              </span>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4 lg:grid grid-cols-1 mt-[1rem] mb-[3rem] md:grid-cols-2 grid flex-wrap -mx-3">
                <div className="px-3">
                  <label
                    htmlFor="newPassword"
                    className="block text-gray-700  text-[14px]  font-bold mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={securityDetails.newPassword}
                    onChange={handleSecurityInputChange}
                    className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="px-3 md:mt-[0px] mt-[12px]">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700  text-[14px]  font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={securityDetails.confirmPassword}
                    onChange={handleSecurityInputChange}
                    className="appearance-none border rounded md:text-[14px] text-[14px] font-medium  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </form>
          </>
        )}

        <div className=" flex items-center justiy-center w-full mx-auto">
          <DynamicButton
            onClickFunction={() => {
              if (activeTabs === 'account') {
                updateUserProfile();
              } else {
                updateUserPassword();
              }
            }}
            className="bg-[#ef6e6e] text-white font-bold sm:max-w-[40%] 2xl:max-w-[60%] cursor-pointer font-karla h-[50px] mx-auto w-[100%]"
            text={
              activeTabs === 'account' ? 'Update Profile' : 'Update Password'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
