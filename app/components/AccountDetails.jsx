import {Link} from '~/components';
import DynamicButton from './DynamicButton';
import {useEffect, useState} from 'react';
import CircularLoader from './CircularLoder';
import {useStateContext} from '~/context/StateContext';

export function AccountDetails({customer, loader, setLoader, accountDetail}) {
  const {firstName, lastName, email, phone, id} = customer;

  const [key, setKey] = useState('');
  // const [loader, setLoader] = useState(false);
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
  }, [customerID]);

  const {
    fullName,
    setFullName,
    userEmail,
    setUserEmail,
    phoneNumber,
    setPhoneNumber,
  } = useStateContext();

  useEffect(() => {
    const storedFullName = localStorage.getItem('SNFullName');
    const storedUserEmail = localStorage.getItem('SnEmail');
    const phoneNumber = localStorage.getItem('phone');

    setFullName(storedFullName || '');
    setUserEmail(storedUserEmail || '');
    setPhoneNumber(phoneNumber);
  }, []);

  return (
    <>
      <div className="container px-4 py-8">
        <h3 className=" md:text-2xl text-[15px] font-bold mb-6">
          Account Details
        </h3>
        <div className="bg-white font-karla shadow-md rounded-lg p-6">
          {/* Name */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px] text-gray-600">
              Name:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px] font-semibold">
              {fullName
                ? fullName
                : `${firstName || ''} ${lastName ? lastName + ' ' : ''}`}
            </p>
          </div>

          {/* Phone */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px] text-gray-600">
              Phone:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              {phoneNumber ? phoneNumber : phone}
            </p>
          </div>

          {/* Email */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px] text-sm text-gray-600">
              Email address:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              {userEmail}
            </p>
          </div>

          {/* Password */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px] text-gray-600">
              Password:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              **************
            </p>
          </div>

          {/* API Key */}
          <div className="flex mb-4 items-center">
            <div className="w-1/4 md:text-sm text-[12px] text-gray-600 ">
              API Key:
            </div>
            <button
              className="px-4 py-2 bg-[#1b52b1] text-white  md:text-sm text-[12px] font-semibold hover:bg-[#1b52b1] focus:outline-none"
              onClick={() => {
                setHandleGenerateClick(true);
                generateApiKey();
              }}
            >
              Generate
            </button>
          </div>

          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px] text-gray-600">
              Generated API Key:
            </div>
            {handleGenerateClick && (
              <>
                {loader ? (
                  <CircularLoader color="#ef6e6e" />
                ) : (
                  <p className="w-3/4 md:text-[14px] text-[11px] font-semibold break-all">
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
