import React, {useEffect, useState} from 'react';
import DynamicButton from '~/components/DynamicButton';
import WalletAccordion from '~/components/WalletAccordion';
import ConfirmationModal from '~/components/modal/ConfirmationModal';
let firstName, lastName, email, customerID;
import {useNavigate} from '@remix-run/react';
import StripeModal from '~/components/modal/StripeModal';
import {useLoaderData} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import DynamicTitle from '~/components/Title';
import CircularLoader from '~/components/CircularLoder';
import PackageModal from '~/components/wallet/PackageModal';
import PurchaseModal from '~/components/wallet/PurchaseModal';
import Accordion from '~/components/wallet/Accordian';
import PaymentModal from '~/components/wallet/PaymentModal';

export async function loader({context, request}) {
  const StripeKey = context.env.STRIPE_KEY;
  const WalletData = await context.storefront.query(Wallet, {
    variants: {},
  });

  return defer({
    StripeKey,
    WalletData,
  });
}
const ManageSubscription = () => {
  const {StripeKey, WalletData} = useLoaderData();
  const [firstNameChar, setFirstNameChar] = useState('');
  const [lastNameChar, setLastNameChar] = useState('');
  const [stripeCollection, setStripeCollection] = useState([]);
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [savedCard, setSavedCard] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [autoModal, setAutoModal] = useState(false);
  const [restartAutoRenew, setRestartAutoNew] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [forUpdateData, setForUpdateData] = useState(false);
  const [defaultCard, setDefaultCard] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);
  const [packageModal, setPackageModal] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);

  const [loader, setLoader] = useState({
    paymentHistory: false,
    stopSubscription: false,
    stopAutoRenew: false,
    deleteCard: false,
    updatePaymentMethod: false,
    addNewPaymentMethod: false,
    defaultCreditCard: false,
    // ... other API endpoints
  });

  const header = ['S.NO', 'DESCRIPTION', 'DATE', 'AMOUNT', 'PAYMENT STATUS'];

  const navigate = useNavigate();

  useEffect(() => {
    customerID = localStorage.getItem('customerId');
    if (!customerID) {
      navigate('/account/login');
    }
  }, []);

  useEffect(() => {
    firstName = localStorage.getItem('firstName');
    lastName = localStorage.getItem('lastName');
    email = localStorage.getItem('SnEmail');
    customerID = localStorage.getItem('customerId');

    setLastNameChar(lastName.charAt(0));
    setFirstNameChar(firstName.charAt(0));
  }, []);

  useEffect(() => {
    // Define the API URL
    setLoader(true);
    const apiUrl = `https://api.simplynoted.com/stripe/payment-history?customerId=${customerID}`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPaymentHistory(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoader(false);
      });
    return () => {};
  }, []);

  const handleSubscription = () => {
    setLoader((prevLoader) => ({
      ...prevLoader,
      stopSubscription: true,
    }));
    const apiUrl = `https://api.simplynoted.com/stripe/stop-subscription?customerId=${customerID}`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        setLoader((prevLoader) => ({
          ...prevLoader,
          stopSubscription: false,
        }));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoader((prevLoader) => ({
          ...prevLoader,
          stopSubscription: false,
        }));
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('subscriptionName');
        localStorage.removeItem('amount');
        setCancelSubscription(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoader((prevLoader) => ({
          ...prevLoader,
          stopSubscription: false,
        }));
      });
  };

  const handleAutoRewnew = () => {
    setLoader(true);
    const apiUrl = `https://api.simplynoted.com/stripe/stop-autorenew?customerId=${customerID}`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoader(false);
        setTimeout(() => {
          setRestartAutoNew(false);
          setAutoModal(false);
        }, [300]);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoader(false);
      });
  };

  const handleDeleteSelected = () => {
    setLoader(true);
    const url = `https://api.simplynoted.com/stripe/delete-card?customerId=${customerID}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({paymentMethodId: paymentId}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDeleteModal(false);
        setLoader(false);
        setForUpdateData(true);
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
        setLoader(false);
      });
  };

  const updateCreditCard = (id) => {
    setLoader(true);
    const url = `https://api.simplynoted.com/stripe/update-payment-method?customerId=${customerID}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newPaymentMethodId: id}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoader(false);
        setForUpdateData(true);
        setUpdateModal(false);
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
        setLoader(false);
      });
  };

  const makeDefaultCard = () => {
    setLoader(true);
    const url = `https://api.simplynoted.com/stripe/default-creditcard?customerId=${customerID}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({paymentMethodId: paymentId}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoader(false);
        setTimeout(() => {
          setDefaultCard(false);
        }, [500]);
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
        setLoader(false);
      });
  };

  function handlePurchaseCard(id) {
    if (addCreditModal) {
      addNewCreditCard(id);
    } else {
      updateCreditCard(id);
    }
  }
  async function addNewCreditCard(paymentID) {
    try {
      setLoader(true);
      const res = await fetch(
        `https://api.simplynoted.com/stripe/add-new-payment-method?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentID,
          }),
        },
      );
      const jsonData = await res.json();
      // setNewCardAdded(true);
      // setShowCardBox(false);
      setTimeout(() => {
        setLoader(false);
        setForUpdateData(true);
        setUpdateModal(false);
      }, [500]);
    } catch (error) {
      setLoader(false);
    }
  }

  useEffect(() => {
    // Define the API URL
    const apiUrl = `https://api.simplynoted.com/stripe/customer-data?customerId=${customerID}`;
    setLoader(true);

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStripeCollection(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoader(false);
      });
    getSavedCards(customerID);

    return () => {};
  }, [
    forUpdateData,
    defaultCard,
    addCreditModal,
    deleteModal,
    updateModal,
    restartAutoRenew,
    autoModal,
  ]);

  let formattedDateString;

  const getSubscriptionType = (stripeCollection) => {
    if (
      stripeCollection &&
      stripeCollection.stripe?.subscriptionStatus !== 'canceled'
    ) {
      const subscription = stripeCollection.stripe?.subscription || 'Free';
      if (subscription === 'Team') {
        return 'team';
      } else if (subscription === 'Business') {
        return 'business';
      }
    }
    return 'Free';
  };

  let subscriptionTitle = getSubscriptionType(stripeCollection);

  function formatDateString(inputDateString) {
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
    const date = new Date(inputDateString);

    return date.toLocaleString('en-US', options).toUpperCase();
  }

  // Example usage with your dynamic value
  const subscriptionEndDate = stripeCollection.stripe?.subscriptionEndDate;
  if (subscriptionEndDate) {
    formattedDateString = formatDateString(subscriptionEndDate);
  }

  async function getSavedCards(Id) {
    try {
      setLoader(true);
      const res = await fetch(
        `https://api.simplynoted.com/stripe/customer-data?customerId=${Id}`,
      );
      const json = await res.json();
      if (json) {
        setSavedCard(json.payments);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  }

  const filteredWalletData = WalletData.collection.products.edges.filter(
    (product) => {
      return (
        product.node.title.toLowerCase() === subscriptionTitle?.toLowerCase()
      );
    },
  );

  function prettyFormatNumber(inputString) {
    inputString = inputString?.toString();
    return inputString?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  console.log('stripeCollection', stripeCollection);

  return (
    <>
      <PackageModal
        show={packageModal}
        onConfirm={() => {
          setPackageModal(false);
          setPurchaseModal(true);
        }}
        setPurchaseModal={setPurchaseModal}
        onCancel={() => setPackageModal(false)}
        filteredWalletData={filteredWalletData}
        stripeCollection={stripeCollection}
        confirmText="Add to cart"
      />
      <PaymentModal show={showAccordion} />

      <PurchaseModal
        show={purchaseModal}
        onCancel={() => {
          setPurchaseModal(false);
          setPackageModal(true);
        }}
        onConfirm={() => {
          setPurchaseModal(false);
          setShowAccordion(true);
        }}
        filteredWalletData={filteredWalletData}
        stripeCollection={stripeCollection}
        cancelText="Prev"
        confirmText="Contine To Checkout"
      />

      <ConfirmationModal
        show={deleteModal}
        onConfirm={handleDeleteSelected}
        onCancel={() => setDeleteModal(false)}
        title="Are you sure you want to delete your card?"
        confirmText="YES, CONTINUE WITH DELETE"
        cancelText="No, I do not wish to delete card at this time. "
      />
      <ConfirmationModal
        show={cancelSubscription}
        onConfirm={handleSubscription}
        onCancel={() => setCancelSubscription(false)}
        title="Are you sure you want to cancel your existing plan?"
        message="If you continue with this cancellation, your current plan will be converted to a Free plan and Prepaid Package when your current plan expires, and your discount level will decrease.?"
        confirmText="YES, CONTINUE WITH CANCELLATION"
        cancelText=" No, I do not wish to cancel at this time. "
      />
      <ConfirmationModal
        show={restartAutoRenew}
        onConfirm={handleAutoRewnew}
        onCancel={() => setRestartAutoNew(false)}
        title="Restart pre-paid package autorenew?"
        confirmText="YES"
        cancelText="Cancel"
      />
      <ConfirmationModal
        show={defaultCard}
        onConfirm={makeDefaultCard}
        onCancel={() => setDefaultCard(false)}
        title="Are you sure you want to make this card default?"
        confirmText="YES"
        cancelText="Cancel"
      />

      <ConfirmationModal
        show={autoModal}
        onConfirm={handleAutoRewnew}
        onCancel={() => setAutoModal(false)}
        title="Are you sure you want to stop Autorenew?"
        message="If you do, any orders placed for which you have insuffficient funds will not be fulfilled."
        confirmText="YES, CONTINUE to cancel"
        cancelText=" No, I do not want to cancel autorenew at this time. "
      />

      <StripeModal
        loader={loader}
        show={updateModal}
        updateModal={updateModal}
        onConfirm={updateCreditCard}
        onCancel={() => setUpdateModal(false)}
        title={addCreditModal ? 'Add Credit Card' : 'Update Credit Card'}
        // confirmText="Update"
        StripeKey={StripeKey}
        updateCard={updateCard}
        addCreditModal={addCreditModal}
        handlePurchaseCard={handlePurchaseCard}
      />
      <>
        <div className="w-full max-w-[1440px] mx-auto px-[20px]">
          <DynamicTitle
            dynamicButton
            title={'Manage Plans and Prepaid Packages'}
          />

          <div className="flex flex-col md:flex-row w-full max-w-[1440px] gap-[30px] items-start">
            <div className="w-full md:w-[30%]  bg-white p-[20px] text-center">
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

            <div className="w-full md:w-[70%] bg-white  p-[20px] text-center">
              {loader ? (
                <CircularLoader title="Loading Manage Plans" color="#ef6e6e" />
              ) : (
                <>
                  <div className="flex justify-between items-center w-full min-h-[68px] border border-solid border-[#e6edf8] py-[10px] px-[20px]">
                    <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                      wallet balance
                    </span>
                    <span className="text-[24px] lg:text-[46px] !font-bold text-[#ef6e6e] uppercase">
                      $
                      {!stripeCollection.error
                        ? prettyFormatNumber(stripeCollection.stripe?.balance)
                        : 0.0}
                    </span>
                  </div>
                  <div className="mt-[20px] border-b-2 border-solid border-[#e6edf8]"></div>

                  <WalletAccordion accordion={true} title="Plan">
                    <div className="p-[15px] mb-[15px] border border-solid border-[#e6edf8]">
                      <div className="flex justify-between items-center gap-[15px] py-[10px]">
                        <span className="text-[16px] text-[#001a5f] font-bold uppercase">
                          My Plan
                        </span>
                        <span className="text-[20px] !font-bold text-[#ef6e6e] uppercase">
                          {stripeCollection  && stripeCollection.stripe?.subscriptionStatus !==
                            'canceled' && !stripeCollection.error
                            ? stripeCollection.stripe?.subscription
                            : 'Free'}
                        </span>
                      </div>
                      { stripeCollection.stripe?.subscriptionStatus && stripeCollection.stripe?.subscriptionStatus !==
                        'canceled' &&
                        !stripeCollection.error && (
                          <div className="flex justify-between items-center gap-[15px] py-[10px]">
                            <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                              CHANGE STATUS
                            </span>
                            <DynamicButton
                              onClickFunction={() =>
                                setCancelSubscription(true)
                              }
                              text="Cancel Plan"
                              className="!bg-[#ef6e6e] max-w-[190px] uppercase min-w-[190px]"
                            />
                          </div>
                        )}
                      <div className="flex justify-between items-center gap-[15px] py-[10px]">
                        <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                          CHANGE PLAN
                        </span>
                        <DynamicButton
                          onClickFunction={() =>
                            navigate('/simply-noted-plans')
                          }
                          text={
                            stripeCollection.stripe?.subscriptionStatus  &&
                            stripeCollection.stripe?.subscriptionStatus !==
                              'canceled' && !stripeCollection.error
                              ? 'Change Plan'
                              : 'Buy Plan'
                          }
                          className="!bg-[#001a5f] max-w-[190px] uppercase min-w-[190px]"
                        />
                      </div>

                      {!stripeCollection.error && (
                        <>
                          {stripeCollection.stripe?.subscriptionStatus !==
                          'canceled' ? (
                            <div className="flex justify-between items-center gap-[15px] py-[10px]">
                              <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                                PLAN RENEWAL DATE
                              </span>
                              <span className="text-[12px] text-[#001a5f] font-karla font-normal uppercase">
                                {formattedDateString}
                              </span>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center gap-[15px] py-[10px]">
                              <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                                SUBSCRIPTION CANCELLATION DATE
                              </span>
                              <span className="text-[12px] text-[#001a5f] font-karla font-normal uppercase">
                                {
                                  stripeCollection.stripe
                                    ?.subscriptionCancelledAt
                                }
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </WalletAccordion>
                  <WalletAccordion title="PREPAID PACKAGE">
                    <div className="flex justify-between items-center gap-[15px] py-[10px]">
                      <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                        PREPAID PACKAGE
                      </span>
                      {stripeCollection &&  stripeCollection.stripe?.balance !== 0 &&
                      !stripeCollection.error ? (
                        <span className="text-[20px] font-karla !font-bold text-[#ef6e6e] uppercase">
                          {stripeCollection.stripe?.subscriptionStatus !==
                          'canceled'
                            ? stripeCollection.stripe?.subscription
                            : 'Free'}{' '}
                          - {stripeCollection.stripe?.packageQuantity} cards -
                          {stripeCollection.stripe?.packageDiscount}% DISCOUNT
                        </span>
                      ) : (
                        <span className="text-[20px] font-karla !font-bold text-[#ef6e6e] uppercase">
                          No Package
                        </span>
                      )}
                    </div>
                    {!stripeCollection.error && (
                      <div className="flex justify-between items-center gap-[15px] py-[10px]">
                        <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                          AUTO RENEW
                        </span>
                        <DynamicButton
                          onClickFunction={() => {
                            if (stripeCollection.stripe?.isAutorenew) {
                              setAutoModal(true);
                            } else {
                              setRestartAutoNew(true);
                            }
                          }}
                          text={
                            stripeCollection.stripe?.isAutorenew
                              ? 'Stop Auto Renew'
                              : 'Restart Auto Renew'
                          }
                          className="!bg-[#ef6e6e] max-w-[190px] !text-[14px] whitespace-nowrap uppercase min-w-[190px]"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center gap-[15px] py-[10px]">
                      <span className="text-[16px] text-[#001a5f] font-karla font-normal uppercase">
                        Update
                      </span>
                      <DynamicButton
                        onClickFunction={() => setPackageModal(true)}
                        text={
                          stripeCollection.stripe?.balance !== 0 &&
                          !stripeCollection.error
                            ? 'Change Package'
                            : 'Buy Package'
                        }
                        className="!bg-[#001a5f] font-karla max-w-[190px] uppercase min-w-[190px]"
                      />
                    </div>
                  </WalletAccordion>
                  <WalletAccordion title="STORED PAYMENT METHOD">
                    <div className="flex flex-col items-start">
                      {savedCard && savedCard.length > 0 && (
                        <span className="text-[16px] text-[#001a5f] font-karla font-normal p-[5px] text-left  uppercase">
                          Saved Cards
                        </span>
                      )}
                      <div className=" text-[#001a5f] bg-[#fff5f5] font-karla text-left text-[16px] !font-semibold w-full p-[5px] border-b border-solid border-[#e6edf8]">
                        DEFAULT CARD
                      </div>
                      <div className="w-full">
                        {savedCard &&
                          savedCard.map((item, i) => (
                            <div
                              key={i}
                              className={`p-[1rem] ${
                                i === 0 && 'bg-[#fff5f5]'
                              } flex justify-between`}
                            >
                              <div className="flex justify-start items-center text-[14px] font-bold">
                                <span className="mr-[1rem] tracking-wide">
                                  **********{item.cardLast4Number}
                                </span>
                                <span>
                                  {item.cardExpMonth}/{item.cardExpYear}
                                </span>
                              </div>
                              <div className="flex gap-[16px] items-center">
                                {i === 0 ? (
                                  <DynamicButton
                                    text="Update Card"
                                    className="bg-[#ef6e6e] text-white "
                                    onClickFunction={() => {
                                      setAddCreditModal(false);
                                      setPaymentId(item.paymentId);
                                      setUpdateModal(true);
                                      setUpdateCard(true);
                                    }}
                                  />
                                ) : (
                                  <div className="flex items-center gap-[16px]">
                                    <DynamicButton
                                      text="Make Default"
                                      className="bg-[#ef6e6e] text-white "
                                      onClickFunction={() => {
                                        setPaymentId(item.paymentId);
                                        setDefaultCard(true);
                                      }}
                                    />

                                    <img
                                      onClick={() => {
                                        setPaymentId(item.paymentId);
                                        setDeleteModal(true);
                                      }}
                                      src="https://simplynoted.com/cdn/shop/files/delete.png"
                                      className="w-[20px] h-[20px] cursor-pointer"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                        <DynamicButton
                          onClickFunction={() => {
                            setAddCreditModal(true);
                            setUpdateModal(true);
                          }}
                          text="Add Credit Card"
                          className={`bg-[#001a5f] text-white flex ${
                            savedCard === 0 ? 'justify-start' : 'justify-end'
                          }  mt-[10px]`}
                        />
                      </div>
                    </div>
                  </WalletAccordion>
                  <WalletAccordion title="PLANS AND PACKAGES TRANSACTIONS">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          {header.map((column, index) => (
                            <th
                              key={index}
                              className="bg-[#001a5f] py-[15px] px-[10px] uppercase text-[15px] text-white font-bold"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory &&
                          paymentHistory.length > 0 &&
                          paymentHistory.map((payment, i) => (
                            <tr
                              className=" border-b border-solid border-[#e9e7e7]"
                              key={i}
                            >
                              <td className="text-[#1b5299] p-[11px]">
                                {i + 1}
                              </td>
                              <td className=" text-[#1b5299] p-[11px] text-[14px] font-karla !font-bold uppercase">
                                {payment.description}
                              </td>
                              <td className="text-[#1b5299] p-[11px] font-karla text-[14px] !font-bold uppercase">
                                {payment.date}
                              </td>
                              <td className=" text-[#1b5299] p-[11px] font-karla text-[14px] !font-bold uppercase">
                                $ {payment.amount}
                              </td>
                              <td className="flex justify-center p-[11px] text-center">
                                <td className="rounded-[50px] mt-[5px] min-h-[22px] !font-bold uppercase text-[12px] px-[15px] bg-[#4BB543] text-white">
                                  {payment.status && 'Paid'}
                                </td>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </WalletAccordion>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ManageSubscription;

const Wallet = `#graphql
  query
  {
    collection(id: "gid://shopify/Collection/271625027689"){
      title
      products(first:6){
        edges{
          node{
            id
            title
            description
            metafields(identifiers:[
               {namespace:"custom", key: "product_title"}
                    {namespace:"custom", key: "strip_year_link"}
                    {namespace:"custom", key: "pay_as_you_go"}
                    {namespace:"custom", key: "pricing"}
                    {namespace:"custom", key: "pricing_yearly"}
                    {namespace:"custom", key: "subscription_plan_price"}
                    {namespace:"custom", key: "subscription_plan_price_yearly"}
                    {namespace:"custom", key: "strip_link"}
                    {namespace:"custom", key: "subscription_plan_price_monthly"}
              
            ]){
              value
              key
            }
            variants(first:10){
              edges{
                node{
                  id
                  metafields(identifiers:[
                    {namespace: "custom", key: "variant_title"},
                    {namespace: "custom", key: "card_amount"},
                    {namespace: "custom", key: "description"},
                   ]){
                     value
                     key
                   }
                  title
                  price
                  {
                    amount
                  }
                }
              }
            }
         
            
          }
        }
      }
    }
  }`;
