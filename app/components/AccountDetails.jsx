import {Link} from '~/components';
import DynamicButton from './DynamicButton';
import { useEffect, useState } from 'react';

export function AccountDetails({customer}) {
  const {firstName, lastName, email, phone,id} = customer;

  const customerID = customer.id.replace(/[^0-9]/g,"")


  let apiKey = "" ;

  const generateApiKey = async () => {

   try {
     const response = await fetch(`https://api.simplynoted.com/api/storefront/apiKeys?customerId=${customerID}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       
       
     });

     if (response.ok) {
       const data = await response.json();
       localStorage.setItem('apiKey',data.result)
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

  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="font-bold text-lead">Account Details</h3>
        <div className="lg:p-8 p-6 border border-gray-200 rounded">
          <div className="flex">
            {/* <Link
              prefetch="intent"
              className="underline text-sm font-normal"
              to="/account/edit"
            >
              Edit
            </Link> */}
          </div>
          <div className="mt-4 text-sm text-primary/50">Name</div>
          <p className="mt-1">
            {firstName || lastName
              ? (firstName ? firstName + ' ' : '') + lastName
              : 'Add name'}{' '}
          </p>

          <div className="mt-4 text-sm text-primary/50">Phone</div>
          <p className="mt-1">{phone}</p>

          <div className="mt-4 text-sm text-primary/50">Email address</div>
          <p className="mt-1">{email}</p>

          <div className="mt-4 text-sm text-primary/50">Password</div>
          <p className="mt-1">**************</p>
          <div className='flex items-center'>
          <div className=" text-sm text-primary/50">API Key</div>
          <DynamicButton
          text="Generate"
          className="!text-black"
          onClickFunction={()=>generateApiKey()}
          />
          </div>
          <div className='my-[10px]  max-w-[60%] text-black text-[16px] break-all font-semibold'>{apiKey}</div>  
        </div>
      </div>
    </>
  );
}
