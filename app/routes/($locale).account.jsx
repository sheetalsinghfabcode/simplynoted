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
import {Suspense, useEffect, useState, useMemo, useRef} from 'react';
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
import {STRIPE_PUBLISHABLE_KEY, SERVER_BASE_URL} from '~/data/config';
import {CACHE_NONE, routeHeaders} from '~/data/cache';
import {ORDER_CARD_FRAGMENT} from '~/components/OrderCard';
import Profile from '~/components/Profile';
import {useStateContext} from '~/context/StateContext';
import CartItems from '../components/CartItems';

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
import ApiKeyModal from '~/components/modal/ApiKeyModal';

export const headers = routeHeaders;

export async function loader({request, context, params}) {
  const {pathname} = new URL(request.url);
  const locale = params.locale;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = locale ? `/${locale}/account/login` : '/account/login';
  const isAccountPage = /^\/account\/?$/.test(pathname);

  const StripeKey = STRIPE_PUBLISHABLE_KEY;
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
  // let custmo
  // if(customerAccessToken){
  const customer = await getCustomer(context, customerAccessToken);

  const heading = customer
    ? customer.result
      ? `Welcome, ${customer.firstName}.`
      : `Account`
    : 'Account Details';

  // }

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

function Account({customer}) {
  let orders = useRef([]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (state?.activeTab) {
      setActiveTab(state?.activeTab);
      setAccountTabName(state?.acountTabName);
    }
    if (!isMounted.current) {
      isMounted.current = true;
      orders.current = flattenConnection(customer?.orders);
      setMissingProductImages(orders);
    }
  }, []);

  const navigate = useNavigate();
  const {state} = useLocation();

  const {
    orderHistory,
    setCustomerId,
    setIsAccountLoader,
    setAccountTabName,
    activeTab,
    setCartCountVal,
    setCartData,
    setActiveTab,
  } = useStateContext();
  const [data, setData] = useState(false);
  const [accountDetail, setAccountDetail] = useState(
    orderHistory ? false : true,
  );
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
      setCartCountVal(0);
      setCartData(null);
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
        setActiveTab(0);
        setAccountTabName('General');
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
        `${SERVER_BASE_URL}/stripe/customer-data?customerId=${result}`,
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

  const [apiKey, setApiKey] = useState('');
  const [keyModal, setKeyModal] = useState(false);

  useEffect(() => {
    generateApiKey();
  }, [customer]);

  const generateApiKey = async () => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/storefront/apiKeys?customerId=${Number(
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
        setApiKey(data.result);

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
  const [accountDetails, setAccountDetails] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address1: customer?.defaultAddress?.address1 || '',
    address2: customer?.defaultAddress?.address2 || '',
    city: customer?.defaultAddress?.city || '',
    state: customer?.defaultAddress?.address2 || '',
    country: 'USA',
    zip: customer?.defaultAddress?.zip || '',
  });

  return (
    <>
      <div className="w-full global-max-width-handler ">
        <div className=" flex flex-col p-[20px] px-0 md:px-[20px] lg:p-[40px] gap-[24px] md:gap-[48px]">
          <div className="flex gap-[12px] font-inter flex-col md:flex-row md:gap-[24px] w-full items-center justify-center md:justify-start md:items-start md:max-w-[388px]">
            <div className="user-name-account">
              {accountDetails.firstName
                ? accountDetails.firstName?.charAt(0)
                : customer.firstName?.charAt(0)}
              {accountDetails.lastName
                ? accountDetails.lastName?.charAt(0)
                : customer.lastname?.charAt(0)}
            </div>
            <h1 className='hidden'>Account</h1>
            <div className="flex flex-col items-center md:gap-0 gap-[24px] md:items-start">
              <h4 className="text-[16px] md:text-[20px] leading-[145%] text-[#0D0C22] font-normal ">
                {accountDetails.firstName
                  ? accountDetails.firstName
                  : customer?.firstName}{' '}
                {accountDetails.lastName
                  ? accountDetails?.lastName
                  : customer?.lastName}
              </h4>
              <span
                onClick={() => setActiveTab(6)}
                className="text-[14px] cursor-pointer hover:text-[#0D0C22] text-center md:text-left hover:underline  decoration-[#0D0C22] text-[#6E6D7A] leading-[18.2px] font-normal "
              >
                Update your username and manage your account
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-[#fff]  mx-auto md:flex-row md:gap-[23px] gap-[0px] w-full ">
            <div className="md:flex  md:flex-col md:pb-[0px] pb-[7px] flex items-center md:items-start w-full md:w-[20%] max-w-[721px] font-inter gap-[24px] md:gap-4 overflow-y-auto md:overflow-visible">
              <>
                {tabs &&
                  tabs.length > 0 &&
                  tabs?.map((tab, i) => (
                    <div className="accountTab" key={i}>
                      {i === 1 || i === 5 ? (
                        <a
                          target="_blank"
                          href={
                            i === 1
                              ? 'https://meetings.hubspot.com/rick24'
                              : 'https://simplynoted.leaddyno.com'
                          }
                          className={`text-[16px] leading-[19.36px] whitespace-nowrap hover:text-[#0D0C22] cursor-pointer  ${
                            activeTab === i
                              ? 'text-[#0D0C22] font-semibold '
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
                          className={`text-[16px] relative min-w-[233px] whitespace-nowrap	 leading-[19.36px] hover:text-[#0D0C22] cursor-pointer after:content-[''] after:h-full after:w-[1px] after:bg-[#f9f9f8] after:absolute after:right-[-1px] after:top-0 ${
                            activeTab === i
                              ? 'text-[#0D0C22] font-semibold '
                              : 'text-[#6E6D7A] font-normal  after:opacity-0 '
                          }  `}
                          key={i}
                        >
                          {tab}
                        </span>
                      )}
                    </div>
                  ))}
              </>

              <Form
                method="post"
                className="w-full tab:mt-[9px] tab:pt-[25px] tab:border-t tab:border-[#DBDBDE]"
                action={usePrefixPathWithLocale('/account/logout')}
              >
                <button
                  onClick={() => setData(true)}
                  className="text-[16px] w-full block text-left whitespace-nowrap hover:underline cursor-pointer leading-[19.36px] font-normal text-[#FF5555]"
                >
                  Log Out
                </button>
              </Form>
            </div>
            <div className="hidden"></div>

            <div className=" w-full  md:w-[80%]">
              {activeTab === 0 && (
                <div className="bg-white max-w-[972.09px] grid md:grid-cols-2  2xl:flex md:mt-[0px] mt-[23px] gap-[32px] font-inter justify-center sm:justify-normal  p-[24px] w-full rounded-[12px] border border-solid border-[#DDDDDD]">
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
                        SERVER_BASE_URL + '/docs/bulk-template',
                        '_self',
                      )
                    }
                  />

                  <CardComponent
                    imgSrc={customOrder}
                    title="Custom Order"
                    description="Tailored to yours Needs: Custom Orders Welcome!"
                    buttonText="Get Started"
                    onClick={() => {
                      window.location.href =
                        'https://share.hsforms.com/17v4fJX1GR-mtrLa0OWPEvA39obb';
                    }}
                  />
                  <CardComponent
                    imgSrc={automate}
                    title="Automate"
                    description="Automate your campaigns with our API or Zapier App"
                    buttonText="Get Started"
                    onClick={() => navigate('/pages/zapier-integration')}
                    showDownloadButton={true}
                    onDownload={() => {
                      setKeyModal(true);
                      generateApiKey();
                    }}
                    downloadButtonText="Generate API Key"
                  />
                  <CardComponent
                    imgSrc={help}
                    title="Get Help"
                    description="Need Help? Schedule a call with Us Today!"
                    buttonText="Get Started"
                    showBorder={false}
                    onClick={() =>
                      window.open(
                        'https://meetings.hubspot.com/rick24',
                        '_blank',
                      )
                    }
                    onDownload={() => navigate('/blogs/Video')}
                    showDownloadButton={true}
                    downloadButtonText="See Tutorials"
                  />
                </div>
              )}
              <ApiKeyModal
                title="Generated Api Key"
                closeModal={() => setKeyModal(false)}
                isOpen={keyModal}
                close={true}
                body={apiKey}
              />

              {activeTab === 2 && (
                <div className="p-4 md:p-4 md:pb-12 mt-[23px] md:bg-white rounded-[12px] border border-solid border-[#DDDDDD]">
                  <AccountOrderHistory orders={orders.current} />
                </div>
              )}

              {activeTab === 3 && (
                <div className="p-4 md:p-4 md:pb-12 mt-[23px] md:bg-white rounded-[12px] border border-solid border-[#DDDDDD]">
                  <AddressBook />
                </div>
              )}

              {activeTab === 4 && (
                <div className="p-4 md:py-8 md:bg-white mt-[23px] rounded-[12px] border border-solid border-[#DDDDDD]">
                  <ManageSubscription />
                </div>
              )}
              {activeTab === 6 && (
                <div className="p-4 md:p-4 md:pb-12 md:bg-white rounded-[12px] mt-[23px] border border-solid border-[#DDDDDD]">
                  <Profile
                    setAccountDetail={setAccountDetail}
                    customer={customer}
                    result={result}
                    accountDetails={accountDetails}
                    setAccountDetails={setAccountDetails}
                    loader={loader}
                    accountDetail={accountDetail}
                    setLoader={setLoader}
                  />
                </div>
              )}

              {activeTab === 7 && (
                <AccountDetails
                  loader={loader}
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  setLoader={setLoader}
                  accountDetail={accountDetail}
                  customer={customer}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <CartItems id={result} />
    </>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div className="mt-0 h-[500px] p-4 overflow-auto">
      <div className="md:grid grid justify-center w-full gap-4 p-4 py-6 md:p-0 ">
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
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 md:grid-cols-2 overflow-auto  lg:grid-cols-3">
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

async function setMissingProductImages(orders) {
  orders = orders.current;
  const nullVariantTitles = new Set();
  if (orders.length > 0) {
    for (const order of orders) {
      const items = order.lineItems?.edges || [];
      items.forEach(
        (item) => !item.node?.variant && nullVariantTitles.add(item.node.title),
      );
    }
  }
  getNullVariantProducts(nullVariantTitles).then((nullProducts) => {
    for (const order of orders) {
      const items = order.lineItems?.edges || [];
      for (const item of items) {
        const nullProduct = nullProducts.find(
          (product) => product.title === item.node.title,
        );
        if (nullProduct && !item.node.variant) {
          item.node.variant = {
            image: {url: nullProduct.images[0]?.originalSrc},
          };
        }
      }
    }
  });
}

async function getNullVariantProducts(nullVariantTitles) {
  try {
    if (!nullVariantTitles.size) return;
    const productPromises = [];
    for (const title of nullVariantTitles) {
      const request = fetch(
        `${SERVER_BASE_URL}/api/storefront/product?handleName=${getProductHandleFromTitle(
          title,
        )}`,
      );
      productPromises.push(request);
    }
    const productResponses = await Promise.all(productPromises);
    const responses = [];
    for (const response of productResponses) {
      const res = await response.json();
      responses.push(res?.result);
    }

    return responses;
  } catch (err) {
    console.error(`Failed to get products with null variant: ${err}`);
  }
}

function getProductHandleFromTitle(title) {
  if (!title) return;
  // Convert product title to a handle name as per handle name's convention.
  let handleName = title.trim();
  // Remove special characters from the beginning and the end.
  handleName = handleName.replace(/^[^a-zA-Z0-9_]+|[^a-zA-Z0-9_]+$/g, '');
  // Replace all remaining whitespace or special characters with a single hyphen.
  handleName = handleName.replace(/[^a-zA-Z0-9_]+/g, '-');
  // Making the title to lowercase.
  handleName = handleName.toLowerCase();

  return handleName;
}
