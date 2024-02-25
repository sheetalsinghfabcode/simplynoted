// src/components/AccountForm.js
import React, {useState, useEffect} from 'react';
import DynamicButton from './DynamicButton';
import CircularLoader from './CircularLoder';
import {json} from '@shopify/remix-oxygen';
import {useStateContext} from '~/context/StateContext';
import SuccessfullLoader from './SucessfullLoader';

const Profile = ({
  customer,
  setProfile,
  loader,
  setLoader,
  setAccountDetail,
}) => {
  const customerID = customer.id.replace(/[^0-9]/g, '');

  const [activeTabs, setActiveTabs] = useState('account'); // 'account' or 'security'
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [successfullLoader, setSuccessFullLoader] = useState(false);

  const {setFullName, setAccountTabName,setActiveTab, setUserEmail} = useStateContext();

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    setKey(apiKey);
  }, [key]);

  const [accountDetails, setAccountDetails] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });

  const [securityDetails, setSecurityDetails] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleAccountInputChange = (e) => {
    const {name, value} = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value,
    });
  };

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
        `https://api.simplynoted.com/api/users/update-profile?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
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
            setProfile(false);
            setSuccessFullLoader(true);
            debugger

            setLoader(false);
            setAccountDetail(true);
          }, [1000]);

          setTimeout(() => {
            setAccountTabName("Profile")
            setActiveTab(7)
            setSuccessFullLoader(false);
          }, 3000);
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
        `https://api.simplynoted.com/api/users/update-password?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
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
        setProfile(false);
        setLoader(false);
        setSuccessFullLoader(true);
        setAccountDetail(true);
      }

      if (response.ok) {
        setLoader(false);
       

        setTimeout(() => {
          setSuccessFullLoader(false);
          setAccountTabName("Profile")
          setActiveTab(7)
        }, 3000);
    
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
        <div className="z-50  absolute top-[50%] left-[30%]">
          <CircularLoader
            title={
              activeTabs === 'account' ? 'Updating Profile' : 'Updating Password'
            }
            color="#ef6e6e"
          />
        </div>
      )}
      {
        successfullLoader && 
        <SuccessfullLoader successfullMessage= {activeTabs ==="account" ? "Updated Profile Successfully" : "Updated Password Successfully"} />
      }
      <div
        className={`rounded-lg md:p-6 w-full  mx-auto   ${
         ( loader || successfullLoader) && 'opacity-50'
        } `}
      >
        <div className="flex w-full mb-4">
          <button
            onClick={() => switchToTab('account')}
            className={`mr-4 px-4 py-4 w-full rounded-t-lg font-karla ${
              activeTabs === 'account'
                ? 'bg-[#001a5f] text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            Account Details
          </button>
          <button
            onClick={() => switchToTab('security')}
            className={`px-4 py-4 w-full rounded-t-lg font-karla ${
              activeTabs === 'security'
                ? 'bg-[#001a5f] text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            Security
          </button>
        </div>

        {activeTabs === 'account' && (
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4 lg:grid grid-cols-1 md:grid-cols-2 grid flex-wrap -mx-3">
              <div className="px-3 mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={accountDetails.firstName || ''}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
              </div>
              <div className="px-3 mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={accountDetails.lastName || ''}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
                {/* Other Account Details Fields */}
              </div>
            </div>

            <div className="mb-4 lg:grid grid-cols-1 md:grid-cols-2 grid flex-wrap -mx-3">
              <div className="px-3 mb-6">
                <label
                  htmlFor="email"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
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
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
              </div>
              <div className="px-3 mb-6">
                <label
                  htmlFor="phone"
                  className="block md:text-[16px] whitespace-nowrap text-[12px]  mb-1 font-semibold"
                >
                  Phone Number (with area code)
                </label>

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={accountDetails.phone || ''}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
                {error && (
                  <span className="text-[16px] text-[#ef6e6e] font-semibold">
                    Error: {error}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4 lg:grid grid grid-cols-1 md:grid-cols-2 flex-wrap -mx-3">
              <div className="px-3 mb-6">
                <label
                  htmlFor="address1"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  Address 1
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={accountDetails.address1}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
              </div>
              <div className="px-3 mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  Address 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={accountDetails.address2}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
              </div>
            </div>
            <div className="mb-4 lg:grid grid grid-cols-1 md:grid-cols-2 flex-wrap -mx-3">
              <div className="px-3 mb-6">
                <label
                  htmlFor="city"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={accountDetails.city}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
              </div>
              <div className="px-3 mb-6">
                <label
                  htmlFor="state"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={accountDetails.state}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md  px-3 py-2 w-[100%]"
                />
              </div>
            </div>
            <div className="mb-4 lg:grid grid-cols-1 md:grid-cols-2 grid flex-wrap -mx-3">
              <div className="px-3 mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={accountDetails.country}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                />
              </div>
              <div className="px-3 mb-6">
                <label
                  htmlFor="zip"
                  className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                >
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={accountDetails.zip}
                  onChange={handleAccountInputChange}
                  className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
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
              <div className="mb-4 lg:grid grid-cols-1 md:grid-cols-2 grid flex-wrap -mx-3">
                <div className="px-3 mb-6">
                  <label
                    htmlFor="newPassword"
                    className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={securityDetails.newPassword}
                    onChange={handleSecurityInputChange}
                    className="border border-gray-300 md:text-[16px] text-[12px] rounded-md px-3 py-2 w-[100%]"
                  />
                </div>

                <div className="px-3 mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 md:text-[16px] text-[12px] font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={securityDetails.confirmPassword}
                    onChange={handleSecurityInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[100%]"
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
