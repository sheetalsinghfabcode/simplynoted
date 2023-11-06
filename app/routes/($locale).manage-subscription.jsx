import React, {useEffect, useState} from 'react';
import DynamicButton from '~/components/DynamicButton';
import WalletAccordion from '~/components/WalletAccordion';
import ConfirmationModal from '~/components/modal/ConfirmationModal';
let firstName, lastName, email, customerID;

const ManageSubscription = () => {
  const [firstNameChar, setFirstNameChar] = useState('');
  const [lastNameChar, setLastNameChar] = useState('');
  const [stripeCollection, setStripeCollection] = useState([]);
  const [cancelSubscription, setCancelSubscription] = useState(false);

  useEffect(() => {
    firstName = localStorage.getItem('firstName');
    lastName = localStorage.getItem('lastName');
    email = localStorage.getItem('SnEmail');
    customerID = localStorage.getItem('customerId');

    console.log('customerName', firstName, lastName, email);
    setLastNameChar(lastName.charAt(0));
    setFirstNameChar(firstName.charAt(0));
  }, []);

  useEffect(() => {
    console.log('Component mount');

    // Define the API URL
    const apiUrl = `https://api.simplynoted.com/stripe/customer-data?customerId=${customerID}`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        setStripeCollection(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    return () => {
      console.log('Component Unmount');
    };
  }, []);

  console.log('stripeCollection', stripeCollection);

  function formatBalance(balance) {
    if (balance >= 1000) {
      const formattedBalance = (balance / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return `${formattedBalance}00`;
    } else {
      return balance.toFixed(2);
    }
  }

  return (
    <>
    {cancelSubscription ? (
        <ConfirmationModal
        show={cancelSubscription}
        onCancel={() => setCancelSubscription(false)}
        // onConfirm={handleDeleteSelected}
        message="Are you sure you want to cancel your existing plan?"
        confirmText="YES, CONTINUE WITH CANCELLATION"
        cancelText=" No, I do not wish to cancel at this time. "
      />


    ) : (  <div className="w-full max-w-[1440px] mx-auto px-[20px]">
      <div className="flex justify-center items-center mt-[10px] mb-[40px] ">
        <h2 className=" text-[18px] lg:text-[50px] font-bold text-[#001a5f]">
          Manage Plans and Prepaid Packages
        </h2>
      </div>
      <div className="flex w-full max-w-[1366px] gap-[30px] items-start">
        <div className="w-[30%]  bg-white p-[20px] text-center">
          <div className="user-name">
            {firstNameChar}
            {lastNameChar}
          </div>
          <div className="mt-[20px]">
            <div className="text-[20px] text-[#001a5f] font-bold">
              <span className="mr-[4px]">{firstName}</span>
              {lastName}
            </div>
            <div className="mt-[5px] text-[16px] text-[#001a5f] font-bold">
              {email}
            </div>
          </div>
        </div>
        <div className="w-[70%] bg-white p-[20px] text-center">
          <div className="flex justify-between items-center w-full min-h-[68px] border border-solid border-[#e6edf8] py-[10px] px-[20px]">
            <span className="text-[15px] text-[#001a5f] font-bold uppercase">
              wallet balance
            </span>
            <span className="text-[24px] lg:text-[46px] !font-bold text-[#ef6e6e] uppercase">
              ${stripeCollection ? stripeCollection.stripe?.balance : 0}
            </span>
          </div>
          <div className="mt-[20px] border-b-2 border-solid border-[$e6edf8]"></div>
          <div className="flex justify-between items-center cursor-pointer w-full min-h-[40px] uppercase py-[5px]">
            <span className="text-[15px] text-[#001a5f] !font-bold uppercase">
              Plan
            </span>
            <span>▼</span>
          </div>
          <WalletAccordion title="Plan">
            <div className="p-[15px] mb-[15px] border border-solid border-[#e6edf8]">
              <div className="flex justify-between items-center gap-[15px] py-[10px]">
                <span className="text-[15px] text-[#001a5f] font-bold uppercase">
                  My Plan
                </span>
                <span className="text-[20px] !font-bold text-[#ef6e6e] uppercase">
                  {stripeCollection
                    ? stripeCollection.stripe?.subscription
                    : 'Free'}
                </span>
              </div>
              <div className="flex justify-between items-center gap-[15px] py-[10px]">
                <span className="text-[15px] text-[#001a5f] font-bold uppercase">
                  CHANGE STATUS
                </span>
                <DynamicButton
                  onClickFunction={() => setCancelSubscription(true)}
                  text="Cancel Plan"
                  className="!bg-[#ef6e6e] max-w-[190px] uppercase min-w-[190px]"
                />
              </div>
            </div>
          </WalletAccordion>
          <WalletAccordion title="PREPAID PACKAGE">
            <p>This is your custom content for the accordion.</p>
            <button>Custom Button</button>
          </WalletAccordion>
          <WalletAccordion title="STORED PAYMENT METHOD">
            <p>This is your custom content for the accordion.</p>
            <button>Custom Button</button>
          </WalletAccordion>
          <WalletAccordion title="PLANS AND PACKAGES TRANSACTIONS">
            <p>This is your custom content for the accordion.</p>
            <button>Custom Button</button>
          </WalletAccordion>
        </div>
      </div>
    </div>)}
  
    </>
  );
};

export default ManageSubscription;
