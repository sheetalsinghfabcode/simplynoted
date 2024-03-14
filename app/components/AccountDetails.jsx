import {useEffect, useState} from 'react';
import CircularLoader from './CircularLoder';
import {useStateContext} from '~/context/StateContext';

export function AccountDetails({customer, apiKey,setApiKey}) {
  const {firstName, lastName, email, phone, id} = customer;

  const [handleGenerateClick, setHandleGenerateClick] = useState(false);

  const customerID = customer.id.replace(/[^0-9]/g, '');

  const generateApiKey = async () => {
    
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
        setHandleGenerateClick(false)
        setApiKey(data.result);
      } else {
        setHandleGenerateClick(false)
        // Handle errors here
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setHandleGenerateClick(false)
      // Handle network errors or exceptions
      console.error('Error:', error);
    }
  };



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
      <div className="max-w-[100%] mx-auto sm:px-4 px-[0px] ">
        <div className="bg-white font-karla rounded-[12px] p-[9px] border border-solid border-[#DDDDDD] rounded-lg md:p-6 p-[0px] md:mt-[0px] mt-[23px]">
          {/* Name */}
          <div className="flex mb-4 ">
            <div className="w-1/4 md:text-[16px] text-[12px] font-semibold text-black font-karla">
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
            <div className="w-1/4 md:text-[16px] text-[12px] font-semibold text-black font-karla ">
              Phone:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              {phoneNumber ? phoneNumber : phone ? phone :null  }
            </p>
          </div>

          {/* Email */}
          <div className="flex mb-4 items-center">
            <div className="w-1/4 md:text-[16px] text-[12px] font-semibold text-black  ">
              Email address:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              {email ? email : userEmail}
            </p>
          </div>

          {/* Password */}
          <div className="flex mb-4">
            <div className="w-1/4 md:text-[16px] text-[12px] font-semibold text-black font-karla ">
              Password:
            </div>
            <p className="w-3/4 md:text-[16px] text-[12px]  font-semibold">
              **************
            </p>
          </div>

          {/* API Key */}
          <div className="flex mb-4 items-center">
            <div className="w-1/4 md:text-[16px] text-[12px] font-semibold text-black font-karla  ">
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

          <div className={`flex mb-4  `}>
            <div className="w-1/4 md:text-[16px] text-[12px] font-semibold text-black font-karla ">
              Generated API Key:
            </div>
              <>
                {(handleGenerateClick) ? (
                  <div className=''>
                  <CircularLoader color="#ef6e6e" />
                  </div>
                ) : (
                  <p className="w-3/4 md:text-[16px] text-[12px] font-semibold break-all">
                    {apiKey}
                  </p>
                )}
              </>
          </div>
        </div>
      </div>
    </>
  );
}
