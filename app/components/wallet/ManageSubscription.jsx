import React, {useEffect, useState} from 'react';
import {SERVER_BASE_URL, STRIPE_PUBLISHABLE_KEY} from '~/data/config';
import DynamicButton from '~/components/DynamicButton';
import WalletAccordion from '~/components/WalletAccordion';
import ConfirmationModal from '~/components/modal/ConfirmationModal';
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
import {fetchWalletData} from '~/utils/graphqlUtils';
import {useStateContext} from '~/context/StateContext';
import DeleteIcon from '../../../assets/Image/delete.png';

let firstName, lastName, email, customerID;

export async function loader({context}) {
  const StripeKey = STRIPE_PUBLISHABLE_KEY;
  const WalletData = await fetchWalletData(context);
  return defer({
    StripeKey,
    WalletData,
  });
}
const ManageSubscription = () => {
  const {StripeKey, WalletData} = useLoaderData();
  const [stripeCollection, setStripeCollection] = useState([]);
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [savedCard, setSavedCard] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [autoModal, setAutoModal] = useState(false);
  const [restartAutoRenew, setRestartAutoNew] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [forUpdateData, setForUpdateData] = useState(false);
  const [defaultCard, setDefaultCard] = useState(false);
  const [defaultCardConfirm, setDefaultCardConfirm] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);
  const [packageModal, setPackageModal] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const {
    updateModal,
    setUpdateModal,
    loader,
    setLoader,
    cardElements,
    subscriptionTitle,
    setSubscriptionTitle,
    isStripeDataUpdated,
    subscriptionPriceId,
    setIsStripeDataUpdated,
  } = useStateContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'USA',
    },
    paymentMethodId: '',
  });

  const header = ['S.NO', 'DESCRIPTION', 'DATE', 'AMOUNT', 'PAYMENT STATUS'];

  const navigate = useNavigate();

  function someEvent() {
    cardElements.clear();
  }

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
  }, []);

  useEffect(() => {
    // Define the API URL
    const apiUrl = `${SERVER_BASE_URL}/stripe/payment-history?customerId=${customerID}`;
    setLoader(true);
    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          setLoader(false);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPaymentHistory(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    return () => {};
  }, []);

  const handleSubscription = () => {
    setLoader((prevLoader) => ({
      ...prevLoader,
      stopSubscription: true,
    }));
    const apiUrl = `${SERVER_BASE_URL}/stripe/stop-subscription?customerId=${customerID}`;

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
      })
      .finally(() => {
        setCancelSubscription(false);
        setLoader(false);
      });
  };

  const handleAutoRewnew = () => {
    setLoader(true);
    const apiUrl = `${SERVER_BASE_URL}/stripe/stop-autorenew?customerId=${customerID}`;

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
    setDeleteModal(false);
    setLoader(true);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    const url = `${SERVER_BASE_URL}/stripe/delete-card?customerId=${customerID}`;

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
        setLoader(false);
        setForUpdateData(true);
        setDeleted(true);
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
        setLoader(false);
        setDeleted(false);
      });
  };


  const updateCreditCard = (id) => {
    const url = `${SERVER_BASE_URL}/stripe/update-payment-method?customerId=${customerID}`;

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
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Make the scroll behavior smooth
        });
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
        setLoader(false);
      });
  };

  const makeDefaultCard = () => {
    setDefaultCardConfirm(false);
    setDefaultCard(false);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    setLoader(true);
    const url = `${SERVER_BASE_URL}/stripe/default-creditcard?customerId=${customerID}`;

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
        setIsStripeDataUpdated(true);
        setDefaultCardConfirm(true);
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle errors here
        console.error('API Error:', error);
        setLoader(false);
      });
  };

  async function createCustomerId(id) {
    try {
      setLoader(true);

      const requestData = {
        name: formData.name || '',
        email: formData.email || '',
        'address[line1]': formData.address.line1 || '',
        'address[line2]': formData.address.line2 || '',
        'address[city]': formData.address.city || '',
        'address[state]': formData.address.state || '',
        'address[country]': formData.address.country || '',
        paymentMethodId: id || '',
      };

      const res = await fetch(
        `${SERVER_BASE_URL}/stripe/create-customer?customerId=${customerID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        },
      );
      const json = await res.json();
      setLoader(false);
    } catch (error) {
      setLoader(false);

      console.log('Error on CreateCard:', error);
    } finally {
      setUpdateModal(false);
    }
  }

  function handlePurchaseCard(id) {
    if (!savedCard || savedCard?.length === 0) {
      createCustomerId(id);
    } else if (addCreditModal) {
      addNewCreditCard(id);
    } else {
      updateCreditCard(id);
    }
  }

  async function addNewCreditCard(paymentID) {
    try {
      const res = await fetch(
        `${SERVER_BASE_URL}/stripe/add-new-payment-method?customerId=${customerID}`,
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

      setTimeout(() => {
        setLoader(false);
        setForUpdateData(true);
        setUpdateModal(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Make the scroll behavior smooth
        });
      }, [500]);
    } catch (error) {
      setLoader(false);
    }
  }

  useEffect(() => {
    // Define the API URL
    const apiUrl = `${SERVER_BASE_URL}/stripe/customer-data?customerId=${customerID}`;
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
        setLoader(false);
      });
    getSavedCards(customerID);

    return () => {};
  }, [
    forUpdateData,
    defaultCardConfirm,
    addCreditModal,
    deleted,
    updateModal,
    isStripeDataUpdated,
    restartAutoRenew,
    cancelSubscription,
    autoModal,
  ]);

  let formattedDateString;

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
        `${SERVER_BASE_URL}/stripe/customer-data?customerId=${Id}`,
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

  useEffect(() => {
    if (
      stripeCollection && stripeCollection.stripe &&
      stripeCollection.stripe.subscriptionStatus === 'canceled'
    ) {
      setSubscriptionTitle('Free');
    } else {
      const subscriptionTitleName = localStorage.getItem('subscriptionName');
      if (subscriptionTitleName) {
        setSubscriptionTitle(subscriptionTitleName);
      }
    }
  }, [stripeCollection]);


  function prettyFormatNumber(inputString) {
    inputString = inputString?.toString();
    if (!isNaN(parseFloat(inputString))) {
      let number = parseFloat(inputString)?.toFixed(2);
      return number?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return inputString; // Return as is if not a valid number
  }

  // Function to format date
  function formatDate(date) {
    // Get the user's preferred language
    let userLanguage = navigator.language || navigator.userLanguage;

    // Get the user's time zone dynamically
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: userTimeZone, // Set the time zone dynamically
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // Get the current date
  let currentDate = new Date();

  // Format the current date based on the user's location
  let formattedDate = formatDate(currentDate);

  // Display the formatted date
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
      <PaymentModal
        StripeKey={StripeKey}
        setShowAccordion={setShowAccordion}
        setPurchaseModal={setPurchaseModal}
        setPackageModal={setPackageModal}
        stripeCollection={stripeCollection}
        show={showAccordion}
      />

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
        cancelText="Previous"
        confirmText="Continue To Checkout"
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
        savedCard={savedCard}
        onConfirm={updateCreditCard}
        onCancel={() => setUpdateModal(false)}
        title={addCreditModal ? 'Add Credit Card' : 'Update Credit Card'}
        // confirmText="Update"
        setUpdateModal={setUpdateModal}
        StripeKey={StripeKey}
        formData={formData}
        setLoader={setLoader}
        setFormData={setFormData}
        updateCard={updateCard}
        addCreditModal={addCreditModal}
        handlePurchaseCard={handlePurchaseCard}
      />
      <>
        <div className="w-full max-w-[1640px] md:mt-[0px] mt-[23px] mx-auto md:px-[20px] px-[0px]">
          <div className="flex flex-col lg:flex-row w-full  gap-[30px] items-start">
            <div className="w-full bg-white  text-center">
              {loader ? (
                <CircularLoader title="Loading Manage Plans" color="#ef6e6e" />
              ) : (
                <>
                  <div className="flex justify-between items-center w-full min-h-[68px] border border-solid border-[#e6edf8] py-[10px] px-[20px]">
                    <span className="md:text-[14px] sm:text-[14px] text-[13px] text-[#001a5f] font-semibold uppercase">
                      wallet balance
                    </span>
                    <span className="md:text-[46px] sm:text-[30px] text-[17px] !font-bold text-[#ef6e6e] uppercase">
                      $
                      {stripeCollection.stripe?.balance
                        ? prettyFormatNumber(stripeCollection.stripe?.balance)
                        : '0.00'}
                    </span>
                  </div>
                  <div className="mt-[20px] border-b-2 border-solid border-[#e6edf8]">
                    <WalletAccordion accordion={true} title="Plan">
                      <div className="sm:p-[8px] p-[3px]">
                        <div className="flex justify-between items-center gap-[15px] py-[10px]  border-b border-solid border-[#e6edf8]">
                          <span className="md:text-[14px] sm:text-[14px] text-[13px] text-[#001a5f] font-semibold uppercase">
                            My Plan
                          </span>
                          <span className="md:text-[20px] sm:text-[18px] text-[17px] !font-bold text-[#ef6e6e] uppercase">
                            {(stripeCollection &&
                              stripeCollection.stripe?.subscriptionStatus !==
                                'canceled' &&
                              !stripeCollection.error &&
                              stripeCollection.stripe?.subscription) ||
                              (stripeCollection &&
                                Number(stripeCollection.stripe?.balance) ===
                                  0 &&
                                stripeCollection.stripe?.subscription) ||
                              'Free'}
                          </span>
                        </div>
                        {stripeCollection.stripe?.subscriptionStatus &&
                          stripeCollection.stripe?.subscriptionStatus !==
                            'canceled' &&
                          !stripeCollection.error && (
                            <div className="flex justify-between justify-center  border-b border-solid border-[#e6edf8] items-center gap-[15px] py-[10px]">
                              <span className="md:text-[14px] sm:text-[14px] text-[12px]  text-[#001a5f] font-karla font-semibold uppercase">
                                CHANGE STATUS
                              </span>
                              <DynamicButton
                                onClickFunction={() =>
                                  setCancelSubscription(true)
                                }
                                text="Cancel Plan"
                                className="!bg-[#ef6e6e]  rounded-[9px]  sm:w-[190px] w-[120px] md:h-[45px] h-[38px] lg:text-[13px] text-[12px]   uppercase"
                              />
                            </div>
                          )}
                        <div className="flex justify-between items-center mt-[4px] gap-[15px] py-[10px]  border-b border-solid border-[#e6edf8]">
                          <span className="lg:text-[14px] sm:text-[14px] text-[13px] text-[#001a5f] font-karla font-semibold uppercase">
                            CHANGE PLAN
                          </span>
                          <DynamicButton
                            onClickFunction={() =>
                              navigate('/pages/simply-noted-plans')
                            }
                            text={
                              stripeCollection.stripe?.subscriptionStatus &&
                              stripeCollection.stripe?.subscriptionStatus !==
                                'canceled' &&
                              !stripeCollection.error
                                ? 'Change Plan'
                                : 'Buy Plan'
                            }
                            className="!bg-[#001a5f]  rounded-[9px]  sm:w-[190px] w-[120px] md:h-[45px] h-[38px] lg:text-[13px] text-[12px]  uppercase"
                          />
                        </div>
                        {!stripeCollection.error &&
                          stripeCollection.stripe?.balance !== 0 && (
                            <>
                              {stripeCollection.stripe?.subscriptionStatus !==
                              'canceled' ? (
                                <div className="flex justify-between items-center gap-[15px] py-[10px]">
                                  <span className="md:text-[14px] sm:text-[14px]  text-[12px] text-[#001a5f] font-karla font-semibold uppercase">
                                    {stripeCollection.stripe?.isAutorenew
                                      ? ' PLAN RENEWAL DATE'
                                      : '  SUBSCRIPTION END DATE'}
                                  </span>
                                  <span className="md:text-[20px] sm:text-[18px] sm:text-[12px] text-[11px] text-[#ef6e6e] font-karla font-bold uppercase">
                                    {formattedDateString}
                                  </span>
                                </div>
                              ) : (
                                <div className="lg:flex grid justify-between items-left  md:gap-[15px] gap-[10px] py-[10px]">
                                  <span className="md:text-[14px] sm:text-[14px] text-left text-[13px] text-[#001a5f] font-semibold uppercase">
                                    SUBSCRIPTION CANCELLATION DATE
                                  </span>
                                  <span className="md:text-[14px] sm:text-[14px] text-[12px] lg:text-center text-left  text-[#001a5f] font-karla font-semibold uppercase">
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
                    <WalletAccordion accordion={false} title="PREPAID PACKAGE">
                      <div className="p-[7px]">
                        <div className="flex justify-between py-[10px] border-b border-solid border-[#e6edf8]">
                          <span className=" lg:text-[14px] sm:text-[14px] text-[13px]  lg:pl-[0px]   lg:mr-[0px] mr-[46px] lg:w-[147px]  w-[190px]  text-left text-[#001a5f] font-karla font-semibold uppercase">
                            PREPAID PACKAGE
                          </span>
                          {stripeCollection &&
                          stripeCollection.stripe?.balance !== 0 &&
                          !stripeCollection?.stripe?.manual &&
                          !stripeCollection.error ? (
                            <span className="md:text-[20px] sm:text-[18px] sm:text-[12px] whitespace-nowrap text-[12px] font-karla !font-bold text-[#ef6e6e] uppercase">
                              {stripeCollection.stripe?.subscriptionStatus !==
                              'canceled'
                                ? stripeCollection.stripe?.subscription
                                : 'Free'}
                              - {stripeCollection.stripe?.packageQuantity} cards
                              -{stripeCollection.stripe?.packageDiscount}%
                              DISCOUNT
                            </span>
                          ) : (
                            <span className=" lg:text-[20px] sm:text-[13px] text-[11px]  font-karla !font-bold text-[#ef6e6e] uppercase">
                              No Package
                            </span>
                          )}
                        </div>
                        {!stripeCollection.error &&
                          !stripeCollection?.stripe?.manual &&
                          stripeCollection.stripe?.balance !== 0 && (
                            <div className="flex justify-between items-center gap-[15px] py-[10px] border-b border-solid border-[#e6edf8]">
                              <span className="md:text-[14px] sm:text-[14px] text-[13px] text-[#001a5f]  font-karla font-semibold uppercase">
                                AUTO RENEW
                              </span>
                              <DynamicButton
                                onClickFunction={() => {
                                  if (stripeCollection.stripe?.isAutorenew) {
                                    setAutoModal(true);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: 'smooth',
                                    });
                                  } else {
                                    setRestartAutoNew(true);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: 'smooth',
                                    });
                                  }
                                }}
                                text={
                                  stripeCollection.stripe?.isAutorenew
                                    ? 'Stop Auto Renew'
                                    : 'Restart Auto Renew'
                                }
                                className="!bg-[#4bb543] rounded-[9px] sm:!tracking-wider !tracking-normal whitespace-nowrap sm:w-[190px] w-[130px] md:h-[45px] h-[38px] lg:text-[13px] text-[11px] uppercase"
                              />
                            </div>
                          )}
                        <div className="flex justify-between items-center gap-[15px] py-[10px] border-b border-solid border-[#e6edf8]">
                          <span className=" lg:text-[14px] sm:text-[14px] text-[13px]   text-[#001a5f] font-karla font-semibold uppercase">
                            Update
                          </span>
                          <DynamicButton
                            onClickFunction={() => setPackageModal(true)}
                            text={
                              stripeCollection.stripe?.balance !== 0 &&
                              !stripeCollection.error &&
                              !stripeCollection?.stripe?.manual &&
                              stripeCollection.stripe?.subscriptionStatus !==
                                'canceled'
                                ? 'Change Package'
                                : 'Buy Package'
                            }
                            className="!bg-[#001a5f] rounded-[9px]  sm:w-[190px] w-[130px] sm:!pl-[1rem] pl-[0px] sm:!pr-[1rem] !pr-[0px] md:h-[45px] h-[38px] lg:text-[13px] text-[12px]  uppercase"
                          />
                        </div>
                      </div>
                    </WalletAccordion>
                    <WalletAccordion title="STORED PAYMENT METHOD">
                      <div className="p-[8px]">
                        <div className="flex flex-col items-start">
                          {savedCard && savedCard.length > 0 && (
                            <span className="md:text-[14px] sm:text-[14px] text-[13px] text-[#001a5f] font-karla font-semibold p-[5px] text-left  uppercase">
                              Saved Cards
                            </span>
                          )}
                          <div className="text-[#001a5f] bg-[#fff5f5] font-karla text-left md:text-[14px] sm:text-[14px] text-[13px] md:p-[12px] p-[5px]  md:h-[45px] h-[32px] !font-semibold w-full  border-b border-solid border-[#e6edf8]">
                            DEFAULT CARD
                          </div>
                          <div className="w-full">
                            {savedCard &&
                              savedCard.map((item, i) => (
                                <div
                                  key={i}
                                  className={`p-[1rem] ${
                                    i === 0 && 'bg-[#fff5f5]'
                                  }  lg:flex justify-between border-b border-solid border-[#e6edf8] grid justify-center`}
                                >
                                  <div className="flex justify-start items-center text-[14px] font-bold">
                                    <span className="mr-[1rem]  md:text-[13px] text-[12px] tracking-wide">
                                      **********{item.cardLast4Number}
                                    </span>
                                    <span>
                                      {item.cardExpMonth}/{item.cardExpYear}
                                    </span>
                                  </div>
                                  <div className="flex lg:mt-[12px] mt-[12px] gap-[16px] items-center">
                                    {i === 0 ? (
                                      <DynamicButton
                                        text="Update Card"
                                        className="bg-[#ef6e6e] rounded-[9px] md:w-[190px] w-[130px] md:h-[45px] h-[38px] text-white text-[13px]"
                                        onClickFunction={() => {
                                          window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                          });
                                          someEvent();
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
                                          className="bg-[#ef6e6e] text-white md:w-[190px] w-[130px] md:h-[45px] h-[38px]  rounded-[9px]  text-[13px]"
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
                                          src={DeleteIcon}
                                          className="sm:w-[26px] w-[10%]  sm:h-[27px] h-[37px] cursor-pointer"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}

                            <DynamicButton
                              onClickFunction={() => {
                                someEvent();
                                window.scrollTo({
                                  top: 0,
                                  behavior: 'smooth',
                                });
                                setAddCreditModal(true);
                                setUpdateModal(true);
                              }}
                              text="Add Credit Card"
                              className={`bg-[#001a5f] text-white ml-[12px] rounded-[9px] whitespace-nowrap md:w-[190px] w-[130px] sm:h-[45px] h-[38px] sm:text-[13px] text-[11px] flex${
                                savedCard === 0
                                  ? 'justify-start'
                                  : 'justify-end'
                              }  mt-[10px]`}
                            />
                          </div>
                        </div>
                      </div>
                    </WalletAccordion>
                    <WalletAccordion title="PLANS AND PACKAGES TRANSACTIONS">
                      <div className="p-[8px] w-[100%] overflow-x-auto">
                        <table className="divide-y w-[100%] divide-gray-200">
                          <thead>
                            <tr>
                              {header.map((column, index) => (
                                <th
                                  key={index}
                                  className="bg-[#001a5f] whitespace-nowrap	 py-[15px] px-[10px] uppercase md:text-[15px] text-[12px] text-white font-bold"
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
                                  <td className=" text-[#1b5299] p-[11px] whitespace-nowrap lg:text-[14px] text-[12px] font-karla !font-bold uppercase">
                                    {payment.description
                                      ? payment.description
                                      : null}
                                  </td>
                                  <td className="text-[#1b5299] p-[11px] whitespace-nowrap font-karla lg:text-[14px] text-[12px] !font-bold uppercase">
                                    {formatDate(payment.created * 1000)}
                                  </td>
                                  <td className=" text-[#1b5299] p-[11px] whitespace-nowrap font-karla lg:text-[14px] text-[12px] !font-bold uppercase">
                                    $ {payment.amount / 100}
                                  </td>
                                  <td className="flex justify-center p-[11px] text-center">
                                    <td className="rounded-[50px] mt-[5px] min-h-[22px] whitespace-nowrap !font-bold uppercase lg:text-[12px] text-[10px] lg:pt-[0px] pt-[4px] px-[15px] bg-[#4BB543] text-white">
                                      {payment.status && 'Paid'}
                                    </td>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </WalletAccordion>
                  </div>

                  <div className="mt-[20px]">
                    <p className="text-[#001a5f] md:text-[12px] text-left text-[9px] font-bold">
                      *Please note: Your wallet balance reflects promotional
                      value, not the original purchase price. Terms apply,
                      <b className="font-bold text-[black]">
                        {' '}
                        <a href="policies/terms-of-service" target="_self">
                          learn more here
                        </a>
                        .
                      </b>
                    </p>
                  </div>
                  <div className="border border-[#e6edf8] mt-[6px] border-bottom "></div>
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
