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
import {Suspense, useEffect, useState} from 'react';
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
import CircularLoader from '~/components/CircularLoder';
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
  const renderOutletInModal = matches.some((match) => {
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
    setOrderHistory,
    setCustomerId,
    setIsAccountLoader,
    managePlan,
    setManagePlan,
    addressBook,
    setAddressBook,
  } = useStateContext();
  const [accountDetail, setAccountDetail] = useState(
    !orderHistory ? true : false,
  );
  const [profile, setProfile] = useState(false);
  const [loader, setLoader] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {id: 1, title: 'Account Detalis', content: 'Content of Tab 1'},
    {id: 2, title: 'Security', content: 'Content of Tab 2'},
  ];

  useEffect(() => {
    if (customer) {
      setIsAccountLoader(false);
    }
    getSavedCards();
  }, [loader]);

  const handleAccountDetailClick = () => {
    setAccountDetail(true);
    setManagePlan(false);
    setOrderHistory(false);
    setProfile(false);
    setAddressBook(false);
  };

  const handleOrderHistoryClick = () => {
    setOrderHistory(true);
    setManagePlan(false);
    setAccountDetail(false);
    setProfile(false);
    setAddressBook(false);
  };
  const handleManagePlan = () => {
    setManagePlan(true);
    setOrderHistory(false);
    setAccountDetail(false);
    setProfile(false);
    setAddressBook(false);
  };

  const handleProfile = () => {
    setProfile(true);
    setManagePlan(false);
    setAddressBook(false);
    setOrderHistory(false);
    setAccountDetail(false);
  };

  const handleAddressBook = () => {
    setOrderHistory(false);
    setAccountDetail(false);
    setManagePlan(false);
    setProfile(false);
    setAddressBook(true);
  };

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
  if (data == true) {
    remove();
  } else if (data == false) {
    if (typeof window !== 'undefined' && customer) {
      localStorage.setItem('customerId', result);
      setCustomerId(result);
      localStorage.setItem('SnEmail', customer.email);
      localStorage.setItem('firstName', customer.firstName);
      localStorage.setItem('lastName', customer.lastName);
    }
  }
  async function getSavedCards(Id) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/stripe/customer-data?customerId=${result}`,
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

  return (
    <div className="w-full max-w-[1840px] mx-auto ">
      <div className="flex  justify-between py-[30px] items-start sm:items-center">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
              <a
                href="#"
                class="inline-flex items-center text-[16px] font-medium text-black hover:text-[#001a5f] "
              >
                <svg
                  class="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  class="ms-1 text-[16px] font-medium text-black hover:text-[#001a5f] md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Projects
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg
                  class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span class="ms-1 text-[16px] font-medium text-black md:ms-2 hover:text-[#001a5f]">
                  Flowbite
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
          <DynamicButton
            logoutIcon
            className="text-primary/50 bg-[#EF6E6E] mt-1 sm:mt-0 md:text-[15px] text-[8px]"
            text="Log Out"
            onClickFunction={() => setData(true)}
          />
        </Form>
      </div>

      <div className="flex flex-col sm:flex-row gap-[16px] pb-[16px] items-center justify-center  flex-wrap  ">
        <DynamicButton
          text="Account Details"
          className={`tab-button !px-0  ${accountDetail ? 'active-tab' : ''}`}
          onClickFunction={() => handleAccountDetailClick()}
        />
        <DynamicButton
          text="Order History"
          className={`tab-button !px-0 ${orderHistory ? 'active-tab' : ''}`}
          onClickFunction={() => handleOrderHistoryClick()}
        />
        <DynamicButton
          text="View Addresses"
          className={`tab-button !px-0 ${addressBook ? 'active-tab' : ''}`}
          onClickFunction={() => handleAddressBook()}
        />
        <DynamicButton
          text="Manage Plan"
          className={`tab-button !px-0 ${managePlan ? 'active-tab' : ''}`}
          onClickFunction={() => handleManagePlan()}
        />
        <DynamicButton
          text="Edit Profile"
          className={`tab-button !px-0 ${profile ? 'active-tab' : ''}`}
          onClickFunction={() => handleProfile()}
        />
      </div>

      <div class="flex flex-col lg:flex-row w-full gap-[30px] items-start">
        <div class="w-full lg:w-[25%] bg-white p-[20px] text-center">
          <div class="user-name">
            {customer.firstName?.charAt(0)}
            {customer.lastName?.charAt(0)}
          </div>
          <div class="mt-[20px]">
            <div class="lg:text-[20px] text-[15px] text-[#001a5f] font-bold">
              <span class="mr-[4px]">{customer?.firstName}</span>
              {customer?.lastName}
            </div>
            <div class="mt-[5px] md:text-[16px] text-[12px] text-[#001a5f] font-bold">
              {customer?.email}
            </div>
          </div>
        </div>
        <div class="w-full lg:w-[75%] bg-white p-[20px] text-center">
          {orders && orderHistory && <AccountOrderHistory orders={orders} />}
          {accountDetail && (
            <AccountDetails
              loader={loader}
              setLoader={setLoader}
              accountDetail={accountDetail}
              customer={customer}
            />
          )}
          {profile && (
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
          {addressBook && <AddressBook />}
          {managePlan && <ManageSubscription />}
        </div>
      </div>
    </div>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div className="mt-6 custom-scrollbar">
      <div className="md:grid  grid justify-center w-full gap-4 p-4 py-6 md:p-0 ">
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
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false md:grid-cols-3">
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
