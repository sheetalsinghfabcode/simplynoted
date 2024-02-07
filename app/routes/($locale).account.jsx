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
import ManageSubscription from './($locale).manage-subscription';
import { fetchWalletData } from '~/utils/graphqlUtils';
export const headers = routeHeaders;

export async function loader({request, context, params}) {
  const {pathname} = new URL(request.url);
  const locale = params.locale;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = locale ? `/${locale}/account/login` : '/account/login';
  const isAccountPage = /^\/account\/?$/.test(pathname);

  const StripeKey = context.env.STRIPE_KEY;
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

  useEffect(() => {
    if (customer) {
      setIsAccountLoader(false);
    }
    getSavedCards();
  }, [loader]);

  const handleAccountDetailClick = () => {
    setAccountDetail(true);
    setManagePlan(false)
    setOrderHistory(false);
    setProfile(false);
    setAddressBook(false)
  };

  const handleOrderHistoryClick = () => {
    setOrderHistory(true);
    setManagePlan(false)
    setAccountDetail(false);
    setProfile(false);
    setAddressBook(false)
  };
  const handleManagePlan = () => {
    setManagePlan(true)
    setOrderHistory(false);
    setAccountDetail(false);
    setProfile(false);
    setAddressBook(false)
  };



  const handleProfile = () => {
    setProfile(true);
    setManagePlan(false)
    setAddressBook(false);
    setOrderHistory(false);
    setAccountDetail(false);
  };

  const handleAddressBook = () => {
    setOrderHistory(false);
    setAccountDetail(false);
    setManagePlan(false)
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
    <div className="w-full max-w-[1444px] mx-auto px-[30px]">
      <div className="flex  justify-between py-[30px] items-center">
        <div className="flex gap-[16px] ml-6 flex-wrap  ">
          <DynamicButton
            text="Account Detail"
            className={`tab-button ${accountDetail ? 'active-tab' : ''}`}
            onClickFunction={() => handleAccountDetailClick()}
          />
          <DynamicButton
            text="Order History"
            className={`tab-button ${orderHistory ? 'active-tab' : ''}`}
            onClickFunction={() => handleOrderHistoryClick()}
          />
          <DynamicButton
            text="View Addresses"
            className={`tab-button ${addressBook ? 'active-tab' : ''}`}
            onClickFunction={() => handleAddressBook()}
          />
          <DynamicButton
            text="Manage Plan"
            className={`tab-button ${managePlan ? 'active-tab' : ''}`}
            onClickFunction={() => handleManagePlan()}
          />
          <DynamicButton
            text="Edit Profile"
            className={`tab-button ${profile ? 'active-tab' : ''}`}
            onClickFunction={() => handleProfile()}
          />
        </div>
        <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
          <DynamicButton
            logoutIcon
            className="text-primary/50 bg-[#EF6E6E] md:text-[15px] text-[8px]"
            text="Log Out"
            onClickFunction={() => setData(true)}
          />
        </Form>
      </div>

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

      {managePlan && <ManageSubscription/>}
    </div>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div className="mt-6">
      <div className="md:grid  grid justify-center w-full gap-4 p-4 py-6  md:p-8 lg:p-12">
        <h2 className=" text-[18px] md:text-center md:pb-[16px] text-center font-karla font-semibold lg:text-[32px]">
          Order History
        </h2>
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