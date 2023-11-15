import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useMatches,
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

import {getFeaturedData} from './($locale).featured-products';
import {doLogout} from './($locale).account.logout';
import DynamicButton from '~/components/DynamicButton';
import DynamicTitle from '~/components/Title';
export const headers = routeHeaders;

export async function loader({request, context, params}) {
  const {pathname} = new URL(request.url);
  const locale = params.locale;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = locale ? `/${locale}/account/login` : '/account/login';
  const isAccountPage = /^\/account\/?$/.test(pathname);

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
  const [orderHistory, setOrderHistory] = useState(false);
  const [accountDetail, setAccountDetail] = useState(true);
  const [profile, setProfile] = useState(false);


  useEffect(() => {
    console.log("trigger")
  },[accountDetail,profile])


  const handleAccountDetailClick = () => {
    setAccountDetail(true);
    setOrderHistory(false);
    setProfile(false);
  };

  const handleOrderHistoryClick = () => {
    setOrderHistory(true);
    setAccountDetail(false);
    setProfile(false);
  };

  const handleProfile = () => {
    setProfile(true);
    setOrderHistory(false);
    setAccountDetail(false);
  };

  let result = customer.id.replace(/[^0-9]/g, '');
  const remove = () => {
    if (typeof window !== 'undefined' && customer) {
      localStorage.removeItem('customerId');
      localStorage.removeItem('SNFirstName');
      localStorage.removeItem('SnEmail');
      localStorage.removeItem('apiKey');

      localStorage.removeItem('firstName', customer.firstName);
      localStorage.removeItem('lastName', customer.lastName);
    }
  };
  if (data == true) {
    remove();
  } else if (data == false) {
    if (typeof window !== 'undefined' && customer) {
      localStorage.setItem('customerId', result);
      localStorage.setItem(
        'SNFullName',
        `${customer.firstName + customer.lastName}`,
      );
      localStorage.setItem('SnEmail', customer.email);
      localStorage.setItem('firstName', customer.firstName);
      localStorage.setItem('lastName', customer.lastName);
    }
  }

  return (
    <div className="w-full max-w-[1344px] mx-auto px-[20px]">
      <div className="flex justify-between items-center">
        <DynamicTitle title="Account" />
        <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
          <DynamicButton
            className="text-primary/50 bg-[#EF6E6E]"
            text="Log Out"
            onClickFunction={() => setData(true)}
          />
        </Form>
      </div>
      <div className="flex gap-[20px]">
        <DynamicButton
          text="Account detail"
          className={`flex justity-center items-center border-2 border-solid h-[40px] hover:bg-[#1b5299] hover:!text-white !px-[29px] uppercase border-[#1b5299]   ${
            accountDetail
              ? 'bg-[#1b5299] !text-white'
              : 'bg-transparent !text-[#1b5299]'
          } `}
          onClickFunction={() => handleAccountDetailClick()}
        />
        <DynamicButton
          text="Order History"
          onClickFunction={() => handleOrderHistoryClick()}
          className={`border-2 flex justity-center items-center border-solid h-[40px] hover:bg-[#1b5299] hover:!text-white   uppercase border-[#1b5299]   ${
            orderHistory
              ? 'bg-[#1b5299] !text-white'
              : 'bg-transparent !text-[#1b5299]'
          }`}
        />
        <DynamicButton
          text="View Addresses"
          onClickFunction={() => navigate('/address-book')}
          className={`flex justity-center items-center  border-2 border-solid h-[40px] hover:bg-[#1b5299]  hover:!text-white !px-[29px]  uppercase border-[#1b5299] !text-[#1b5299]  `}
        />
        <DynamicButton
          text="Manage Plan"
          className="flex justity-center items-center border-2 border-solid h-[40px] hover:bg-[#1b5299] hover:!text-white !px-[29px] uppercase border-[#1b5299] !text-[#1b5299]  bg-transparent"
          onClickFunction={() => navigate('/manage-subscription')}
        />
        <DynamicButton
          text="Edit Profile"
          className="flex justity-center items-center border-2 border-solid h-[40px] hover:bg-[#1b5299] hover:!text-white !px-[29px] uppercase border-[#1b5299] !text-[#1b5299]  bg-transparent"
          onClickFunction={() => handleProfile()}
        />
      </div>
      {orders && orderHistory && <AccountOrderHistory orders={orders} />}
      {accountDetail && <AccountDetails accountDetail={accountDetail}  customer={customer} />}
      {profile && <Profile setProfile={setProfile} setAccountDetail={setAccountDetail} customer={customer} result={result} />}
      {/* <AccountAddressBook addresses={addresses} customer={customer} /> */}
      {/* {!orders.length && (
        <Suspense>
          <Await
            resolve={featuredData}
            errorElement="There was a problem loading featured products."
          >
            {(data) => (
              <>
                <FeaturedCollections
                  title="Popular Collections"
                  collections={data.featuredCollections}
                />
                <ProductSwimlane products={data.featuredProducts} />
              </>
            )}
          </Await>
        </Suspense>
      )} */}
    </div>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h2 className="font-bold text-lead">Order History</h2>
        {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        You haven&apos;t placed any orders yet.
      </Text>
      <div className="w-48">
        <Button
          className="w-full mt-2 text-sm"
          variant="secondary"
          to={usePrefixPathWithLocale('/')}
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}

function Orders({orders}) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-3">
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
