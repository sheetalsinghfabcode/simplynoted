import {Link} from '~/components';
import DynamicButton from './DynamicButton';
import {useEffect, useState} from 'react';
import CircularLoader from './CircularLoder';
import {useStateContext} from '~/context/StateContext';
import { postApi } from '~/utils/ApiService';
import { API_PATH } from '~/utils/Path';

export function AccountDetails({customer, loader, setLoader, accountDetail}) {
  const {firstName, lastName, email, phone, id} = customer;

  const [key, setKey] = useState('');
  const [handleGenerateClick, setHandleGenerateClick] = useState(false);

  const customerID = customer.id.replace(/[^0-9]/g, '');

  const generateApiKey = async () => {
    if (handleGenerateClick) {
      setLoader(true);
    }
    try {
      const response = await 
      // postApi(`${API_PATH.GENRATE_API_KEY}${customerID}`,'')
      fetch(
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
        setLoader(false)
        setKey(data.result);
      } else {
        setLoader(false)
        // Handle errors here
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setLoader(false)
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
      <div className="container mx-auto px-4 ">
        <div className="bg-white font-karla  rounded-lg p-6">
          {/* Name */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px]  md:text-[16px] text-black font-karla font-normal">
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
            <div className="w-1/4 md:text-sm text-[12px]  md:text-[16px] text-black font-karla font-normal">
              Phone:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              {phoneNumber ? phoneNumber : phone}
            </p>
          </div>

          {/* Email */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px] text-sm text-black font-normal ">
              Email address:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              {email ? email : userEmail}
            </p>
          </div>

          {/* Password */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px]  md:text-[16px] text-black font-karla font-normal">
              Password:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              **************
            </p>
          </div>

          {/* API Key */}
          <div className="flex mb-4 items-center">
            <div className="w-1/4 md:text-sm text-[12px]  md:text-[16px] text-black font-karla font-normal ">
              API Key:
            </div>
            <div className='w-3/4'>
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
          </div>

          <div className="flex mb-4">
            <div className="w-1/4 md:text-sm text-[12px]  md:text-[16px] text-black font-karla font-normal">
              Generated API Key:
            </div>
            {handleGenerateClick && (
              <>
                {loader ? (
                  <div className='w-3/4'>
                  <CircularLoader color="#ef6e6e" />
                  </div>
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
