import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useMatches,
  useLocation,
  useOutlet,
  useNavigate,
} from '@remix-run/react';
import {Suspense, useEffect, useState,useRef} from 'react';
import {json, defer, redirect} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';
import {
  Button,
  OrderCard,
  PageHeader,
  Text,
  AccountDetails,
  AccountAddressBook,
  Modal,
  ProductSwimlane,
} from '~/components';
import {FeaturedCollections} from '~/components/FeaturedCollections';
import {usePrefixPathWithLocale} from '~/lib/utils';
import {CACHE_NONE, routeHeaders} from '~/data/cache';
import {ORDER_CARD_FRAGMENT} from '~/components/OrderCard';
import Profile from '~/components/Profile';
import {useStateContext} from '~/context/StateContext';

import {getFeaturedData} from './($locale).featured-products';
import {doLogout} from './($locale).account.logout';
import DynamicButton from '~/components/DynamicButton';
import DynamicTitle from '~/components/Title';
import AddressBook from './($locale).address-book';
import {fetchWalletData} from '~/utils/graphqlUtils';
import ManageSubscription from '../components/wallet/ManageSubscription';
// import tutorials from './($locale).tutorials';
import CircularLoader from '~/components/CircularLoder';
import sendcard from '../../assets/Image/send-card.png';
import help from '../../assets/Image/help.png';
import customOrder from '../../assets/Image/custom-order.png';
import CardComponent from '~/components/account/CardComponent';
import automate from '../../assets/Image/automate.png';
import Instruction from '~/components/modal/Instruction';
export const headers = routeHeaders;

export async function loader({request, context, params}) {
  const {pathname} = new URL(request.url);
  const locale = params.locale;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = locale ? `/${locale}/account/login` : '/account/login';
  const isAccountPage = /^\/account\/?$/.test(pathname);

  const StripeKey =
    'pk_test_51NWJuCKwXDGuBPYABUNXd2dplCTxFziZU0QVQJpYTQmh0d59BUFAZNX2J8FhN74jBjMFUOF0tqrlEDMIRKaei2e800kPIWqGnz';
  let WalletData;
  try {
    WalletData = await fetchWalletData(context);
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }

  if (!isAuthenticated) {
    if (isAccountPage) {
      return redirect(loginPath);
    }
    // pass through to public routes
    return json({isAuthenticated: false});
  }

  const customer = await getCustomer(context, customerAccessToken);

  const heading = customer
    ? customer.result
      ? `Welcome, ${customer.firstName}.`
      : `Account`
    : 'Account Details';

  return defer(
    {
      isAuthenticated,
      customer,
      heading,
      featuredData: getFeaturedData(context.storefront),
      StripeKey,
      WalletData,
    },
    {
      headers: {
        'Cache-Control': CACHE_NONE,
      },
    },
  );
}

export default function Authenticated() {
  const data = useLoaderData();
  const outlet = useOutlet();
  const matches = useMatches();

  // routes that export handle { renderInModal: true }
  const renderOutletInModal = matches?.some((match) => {
    return match?.handle?.renderInModal;
  });

  // Public routes
  if (!data.isAuthenticated) {
    return <Outlet />;
  }

  // Authenticated routes
  if (outlet) {
    if (renderOutletInModal) {
      return (
        <>
          <Modal cancelLink="/account">
            <Outlet context={{customer: data.customer}} />
          </Modal>
          <Account {...data} />
        </>
      );
    } else {
      return <Outlet context={{customer: data.customer}} />;
    }
  }

  return <Account {...data} />;
}

function Account({customer, heading, featuredData}) {
  const orders = flattenConnection(customer.orders);
  const addresses = flattenConnection(customer.addresses);

  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const {
    orderHistory,
    setCustomerId,
    setIsAccountLoader,
    acountTabName,
    setAccountTabName,
    activeTab,
    setActiveTab,
  } = useStateContext();
  const [accountDetail, setAccountDetail] = useState(
    !orderHistory ? true : false,
  );
  const [profile, setProfile] = useState(false);
  const [loader, setLoader] = useState(false);

  const tabs = [
    'General',
    'Book a Demo',
    'Order History',
    'Address Book',
    'Manage Plans',
    'Affiliate Program',
    'Edit Profile',
    'Profile',
  ];

  useEffect(() => {
    if (customer) {
      setIsAccountLoader(false);
    }
    getSavedCards();
  }, [loader]);

  let result = customer.id.replace(/[^0-9]/g, '');
  const remove = () => {
    if (typeof window !== 'undefined' && customer) {
      localStorage.removeItem('customerId');
      setCustomerId(null);

      localStorage.removeItem('subscriptionPriceId');
      localStorage.removeItem('SNFirstName');
      localStorage.removeItem('SnEmail');
      localStorage.removeItem('apiKey');
      localStorage.removeItem('packageDiscount');
      localStorage.removeItem('subscriptionName');
      localStorage.removeItem('SNFullName');
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('subscriptionName');
      localStorage.removeItem('amount');
      localStorage.removeItem('phone');

      localStorage.removeItem('firstName', customer.firstName);
      localStorage.removeItem('lastName', customer.lastName);
    }
  };

  useEffect(() => {
    if (data == true) {
      remove();
    } else if (data == false) {
      if (customer && typeof window !== 'undefined') {
        localStorage.setItem('customerId', result);
        setCustomerId(result);
        localStorage.setItem('SnEmail', customer.email);
        localStorage.setItem('firstName', customer.firstName);
        localStorage.setItem('lastName', customer.lastName);
      }
    }
  }, [data, customer, result]);
  async function getSavedCards(Id) {
    try {
      const res = await fetch(
        `https://testapi.simplynoted.com/stripe/customer-data?customerId=${result}`,
      );
      const json = await res.json();

      if (json.stripe) {
        localStorage.setItem(
          'packageDiscount',
          JSON.stringify(json.stripe.packageDiscount),
        );
        localStorage.setItem(
          'subscriptionName',
          json.stripe.subscription ? json.stripe.subscription : 'Free',
        );

        localStorage.setItem(
          'subscriptionPriceId',
          json.stripe.subscriptionId && json.stripe.subscriptionId,
        );
      } else {
        localStorage.setItem('packageDiscount', JSON.stringify(0));
        localStorage.setItem('subscriptionName', 'Free');
      }
    } catch (error) {}
  }

  const [key,setKey] = useState("")
  const [keyModal,setKeyModal] = useState(false)

  const textToCopyRef = useRef(null);

  const copyTextToClipboard = () => {
    const textToCopy = textToCopyRef.current.textContent;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  const generateApiKey = async () => {
    try {
      const response = await fetch(
        `https://api.simplynoted.com/api/storefront/apiKeys?customerId=${Number(
          customer.id.match(/\d+/)[0],
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setKey(data.result)
    setKeyModal(true)

        localStorage.setItem('apiKey', data.result);
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
    <div className="w-full global-max-width-handler ">
      <div className=" flex flex-col p-[20px] pt-[40px] px-0 md:px-[20px] lg:p-[40px] gap-[24px] md:gap-[48px]">
        <div className="flex gap-[12px] font-inter flex-col md:flex-row md:gap-[24px] w-full items-center justify-center md:justify-start md:items-start md:max-w-[388px]">
          <div className="user-name-account">
            {customer.firstName?.charAt(0)}
            {customer.lastName?.charAt(0)}
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[16px] md:text-[20px] leading-[145%] text-[#0D0C22] font-normal ">
              {customer?.firstName ? customer.firstName + ' ' : ''}
              {customer?.lastName ? customer.lastName : ''}
            </h4>
            <span
              onClick={() => setActiveTab(6)}
              className="text-[14px] cursor-pointer hover:text-[#0D0C22] text-center md:text-left hover:underline  decoration-[#0D0C22] text-[#6E6D7A] leading-[18.2px] font-normal "
            >
              Update your username and manage your account
            </span>
          </div>
        </div>
        <div className="flex flex-col bg-[#fff]  mx-auto items-center md:items-start md:flex-row gap-[23px] w-full">
          <div className="flex flex-col items-center md:items-start w-full md:w-[20%] max-w-[200px] font-inter gap-[24px]">
            <>
              {tabs &&
                tabs.length > 0 &&
                tabs?.map((tab, i) => (
                  <div key={i}>
                    {i === 1 || i === 5 ? (
                      <a
                        target="_blank"
                        href={
                          i === 1
                            ? 'https://meetings.hubspot.com/rick24'
                            : 'https://simplynoted.leaddyno.com'
                        }
                        className={`text-[16px] leading-[19.36px] hover:text-[#0D0C22] cursor-pointer  ${
                          activeTab === i
                            ? 'text-[#0D0C22] font-semibold'
                            : 'text-[#6E6D7A] font-normal'
                        }  `}
                        key={i}
                      >
                        {tab}
                      </a>
                    ) : (
                      <span
                        onClick={() => {
                          {
                            setAccountTabName(tab);
                            setActiveTab(i);
                          }
                        }}
                        className={`text-[16px] leading-[19.36px] hover:text-[#0D0C22] cursor-pointer  ${
                          activeTab === i
                            ? 'text-[#0D0C22] font-semibold'
                            : 'text-[#6E6D7A] font-normal'
                        }  `}
                        key={i}
                      >
                        {tab}
                      </span>
                    )}
                  </div>
                ))}
            </>
            <div className="border w-full max-w-[199.53px] border-solid border-[#DBDBDE]"></div>
            <Form
              method="post"
              action={usePrefixPathWithLocale('/account/logout')}
            >
              <button
                onClick={() => setData(true)}
                className="text-[16px] hover:underline cursor-pointer leading-[19.36px] font-normal text-[#FF5555]"
              >
                Log Out
              </button>
            </Form>
          </div>
          <div className="hidden"></div>

          <div className=" w-full  md:w-[80%]">
            {activeTab === 0 && (
              <div className=" grid md:grid-cols-2 xl:max-w-[972.09px] 2xl:flex gap-[32px] font-inter justify-center sm:justify-normal  p-[24px] w-full rounded-[12px] border border-solid border-[#DDDDDD]">
                <CardComponent
                  imgSrc={sendcard}
                  title="Send Cards"
                  onClick={() => navigate('/collections/best-sellers')}
                  description="Send a card to one or more people by starting here"
                  buttonText="Send Now"
                  showDownloadButton={true}
                  downloadButtonText="Download Bulk Template"
                  onDownload={() =>
                    window.open(
                      'https://api.simplynoted.com/docs/bulk-template',
                      '_self',
                    )
                  }
                />

                <CardComponent
                  imgSrc={customOrder}
                  title="Custom Order"
                  description="Tailored to yours Needs: Custom Orders Welcome!"
                  buttonText="Get Started"
                  onClick={() => navigate('/customise-your-card')}
                />
                <CardComponent
                  imgSrc={automate}
                  title="Automate"
                  description="Automate your campaigns with our API or Zapier App"
                  buttonText="Get Started"
                  onClick={() => navigate('/zapier-integration')}
                  showDownloadButton={true}
                  onDownload={() => generateApiKey()}
                  downloadButtonText="Generate API Key"
                />
                <CardComponent
                  imgSrc={help}
                  title="Get Help"
                  description="Need Help? Schedule a call with Us Today!"
                  buttonText="Get Started"
                  showBorder={false}
                  onClick={() =>
                    window.open('https://meetings.hubspot.com/rick24', '_blank')
                  }
                  onDownload={() => navigate('/Video')}
                  showDownloadButton={true}
                  downloadButtonText="See Tutorials"
                />
              </div>
            )}
            <Instruction
              title="Generated Api Key"
              closeModal={()=>setKeyModal(false)}
              isOpen={keyModal}
              close={true}
              body={key}
            />

            {activeTab === 2 && <AccountOrderHistory orders={orders} />}

            {activeTab === 3 && <AddressBook />}

            {activeTab === 4 && <ManageSubscription />}
            {activeTab === 6 && (
              <Profile
                setProfile={setProfile}
                setAccountDetail={setAccountDetail}
                customer={customer}
                result={result}
                loader={loader}
                accountDetails={accountDetail}
                setLoader={setLoader}
              />
            )}

            {activeTab === 7 && (
              <AccountDetails
                loader={loader}
                setLoader={setLoader}
                accountDetail={accountDetail}
                customer={customer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div class="mt-6 overflow-auto">
      <div class="md:grid grid justify-center w-full gap-4 p-4 py-6 md:p-0 ">
        {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
      </div>
    </div>
  );
}

function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <div className="md:grid grid place-items-center">
      <span className=" font-karla  text-[16px] font-medium">
        You haven&apos;t placed any orders yet.
      </span>
      <div className="w-48 mt-[12px]">
        <div className="md:itmes-center">
          <DynamicButton
            text="Start Shopping"
            onClickFunction={() => navigate('/collections/best-sellers')}
            className="bg-[#ef6e6e] font-semibold max-w-[340px] w-[100%] text-[#fff] py-[14px] px-[8px] font-karla"
          />
        </div>
      </div>
    </div>
  );
}

function Orders({orders}) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 md:grid-cols-2 overflow-auto h-[500px] lg:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      ...CustomerDetails
    }
  }

  fragment AddressPartial on MailingAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    country
    province
    city
    zip
    phone
  }

  fragment CustomerDetails on Customer {
    firstName
    lastName
    phone
    email
    tags
    id
    defaultAddress {
      ...AddressPartial
    }
    addresses(first: 6) {
      edges {
        node {
          ...AddressPartial
        }
      }
    }
    orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          ...OrderCard
        }
      }
    }
  }

  ${ORDER_CARD_FRAGMENT}
`;

export async function getCustomer(context, customerAccessToken) {
  const {storefront} = context;

  const data = await storefront.query(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (!data || !data.customer) {
    throw await doLogout(context);
  }

  return data.customer;
}
