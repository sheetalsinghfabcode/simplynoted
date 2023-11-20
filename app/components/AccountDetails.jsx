import {Link} from '~/components';
import DynamicButton from './DynamicButton';
import {useEffect, useState} from 'react';
import CircularLoader from './CircularLoder';

export function AccountDetails({customer}) {
  const {firstName, lastName, email, phone, id} = customer;

  const [key, setKey] = useState('');
  const [loader, setLoader] = useState(false);
  const [handleGenerateClick, setHandleGenerateClick] = useState(false);

  const customerID = customer.id.replace(/[^0-9]/g, '');

  const generateApiKey = async () => {
    if (handleGenerateClick) {
      setLoader(true);
    }
    try {
      const response = await fetch(
        `https://api.simplynoted.com/api/storefront/apiKeys?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('apiKey', data.result);
        setLoader(false);

        setKey(data.result);
        // Process the data received from the API
        console.log('Response data:', data);
      } else {
        // Handle errors here
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    generateApiKey();
  }, []);

  let apiKey;

  useEffect(() => {
    apiKey = localStorage.getItem('apiKey');

    console.log('apiKey ', apiKey);
  }, [key]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6">Account Details</h3>
        <div className="bg-white font-karla shadow-md rounded-lg p-6">
          {/* Name */}
          <div className="flex mb-4">
            <div className="w-1/4 text-sm text-gray-600">Name:</div>
            <p className="w-3/4 text-[16px] font-semibold">
              {firstName || lastName
                ? `${firstName || ''} ${lastName || ''}`
                : 'Add name'}
            </p>
          </div>

          {/* Phone */}
          <div className="flex mb-4">
            <div className="w-1/4 text-sm text-gray-600">Phone:</div>
            <p className="w-3/4 text-[16px]  font-semibold">{phone}</p>
          </div>

          {/* Email */}
          <div className="flex mb-4">
            <div className="w-1/4 text-sm text-gray-600">Email address:</div>
            <p className="w-3/4 text-[16px]  font-semibold">{email}</p>
          </div>

          {/* Password */}
          <div className="flex mb-4">
            <div className="w-1/4 text-sm text-gray-600">Password:</div>
            <p className="w-3/4 text-[16px]  font-semibold">**************</p>
          </div>

          {/* API Key */}
          <div className="flex mb-4 items-center">
            <div className="w-1/4 text-sm text-gray-600 ">API Key:</div>
            <button
              className="px-4 py-2 bg-[#1b52b1] text-white  text-sm font-semibold hover:bg-[#1b52b1] focus:outline-none"
              onClick={() => {
                setHandleGenerateClick(true);
                generateApiKey()
              }}
            >
              Generate
            </button>
          </div>

          <div className="flex mb-4">
            <div className="w-1/4 text-sm text-gray-600">
              Generated API Key:
            </div>
            {handleGenerateClick && (
              <>
                {loader ? (
                  <CircularLoader color="#ef6e6e" />
                ) : (
                  <p className="w-3/4 text-[14px] font-semibold break-all">
                    {key}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
