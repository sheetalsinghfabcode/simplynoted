// src/components/AccountForm.js
import React, {useState} from 'react';

const Profile = ({customer}) => {
  const [activeTab, setActiveTab] = useState('account'); // 'account' or 'security'

  const [accountDetails, setAccountDetails] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: '',
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
    setSecurityDetails({
      ...securityDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Account Details:', accountDetails);
    console.log('Security Details:', securityDetails);
    // Add your logic to update the account details and security
  };

  // Assuming customerId is already defined

const updateUserProfile = async () => {
    const data = {
      first_name: accountDetails.firstName,
      last_name: accountDetails.lastName,
      phone: accountDetails.phone,
      email: accountDetails.email,
      addresses: {
        address1: accountDetails.address1,
        address2: accountDetails.address2,
        city: accountDetails.city,
        province: accountDetails.state,
        zip: accountDetails.zip,
        country: accountDetails.country,
        default: true
      }
    };
  
    try {
      const response = await fetch(`https://api.simplynoted.com/api/users/update-profile?customerId=${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        // Request was successful
        const jsonResponse = await response.json();
        console.log('User profile updated:', jsonResponse);
        // Perform further actions with the response if needed
      } else {
        // Handle errors if the response is not OK
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error:', error);
    }
  };
  
  // Call the function to update the user profile
  

  const switchToTab = (tabName) => {
    setActiveTab(tabName);
  };

  // ... rest of the code remains the same

  return (
    <div className=" w-full max-w-[60%] mx-auto mt-[40px] p-4">
      <div className="flex w-full mb-4">
        <button
          onClick={() => switchToTab('account')}
          className={`px-4 py-2 mr-4 w-full ${
            activeTab === 'account'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Account Details
        </button>
        <button
          onClick={() => switchToTab('security')}
          className={`px-4 py-2  w-full  ${
            activeTab === 'security'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Security
        </button>
      </div>

      {activeTab === 'account' && (
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4 flex flex-wrap -mx-3">
            <div className="w-1/2 px-3 mb-6">
              <label htmlFor="firstName" className="block mb-1 font-semibold">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={accountDetails.firstName}
                onChange={handleAccountInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <label htmlFor="firstName" className="block mb-1 font-semibold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={accountDetails.lastName}
                onChange={handleAccountInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              {/* Other Account Details Fields */}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={accountDetails.email}
              onChange={handleAccountInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1 font-semibold">
              Phone Number (with area code)
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={accountDetails.phone}
              onChange={handleAccountInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4 flex flex-wrap -mx-3">
            <div className="w-1/2 px-3 mb-6">
              <label htmlFor="address1" className="block mb-1 font-semibold">
                Address 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={accountDetails.address1}
                onChange={handleAccountInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="w-1/2 px-3 mb-6">
              <label htmlFor="firstName" className="block mb-1 font-semibold">
                Address 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={accountDetails.address2}
                onChange={handleAccountInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-3">

          <div className="w-1/2 px-3 mb-6">
            <label htmlFor="city" className="block mb-1 font-semibold">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={accountDetails.city}
              onChange={handleAccountInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="w-1/2 px-3 mb-6">
            <label htmlFor="state" className="block mb-1 font-semibold">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={accountDetails.state}
              onChange={handleAccountInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-3">

          <div className="w-1/2 px-3 mb-6">
            <label htmlFor="firstName" className="block mb-1 font-semibold">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={accountDetails.country}
              onChange={handleAccountInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="w-1/2 px-3 mb-6">
            <label htmlFor="zip" className="block mb-1 font-semibold">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={accountDetails.zip}
              onChange={handleAccountInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-1 font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={securityDetails.newPassword}
              onChange={handleSecurityInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={securityDetails.confirmPassword}
              onChange={handleSecurityInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </form>
      )}

      <div className=' flex items-center justiy-center w-full mx-auto'>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 max-w-[350px] mx-auto px-4 w-full hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
