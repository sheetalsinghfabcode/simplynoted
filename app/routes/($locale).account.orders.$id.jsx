import invariant from 'tiny-invariant';
import clsx from 'clsx';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useStateContext} from '~/context/StateContext';
import {Money, Image, flattenConnection} from '@shopify/hydrogen';
import DynamicTitle from '~/components/Title';

import {statusMessage} from '~/lib/utils';
import {Link, Heading, PageHeader, Text} from '~/components';
import DynamicButton from '~/components/DynamicButton';
import { Fragment, useEffect } from 'react';

export const meta = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

export async function loader({request, context, params}) {
  if (!params.id) {
    return redirect(params?.locale ? `${params.locale}/account` : '/account');
  }

  const queryParams = new URL(request.url).searchParams;
  const orderToken = queryParams.get('key');

  invariant(orderToken, 'Order token is required');

  const customerAccessToken = await context.session.get('customerAccessToken');

  if (!customerAccessToken) {
    return redirect(
      params.locale ? `${params.locale}/account/login` : '/account/login',
    );
  }

  const orderId = `gid://shopify/Order/${params.id}?key=${orderToken}`;

  const {node: order} = await context.storefront.query(CUSTOMER_ORDER_QUERY, {
    variables: {orderId},
  });

  if (!order || !('lineItems' in order)) {
    throw new Response('Order not found', {status: 404});
  }

  const lineItems = flattenConnection(order.lineItems);

  const discountApplications = flattenConnection(order.discountApplications);

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return json({
    order,
    lineItems,
    discountValue,
    discountPercentage,
  });
}

export default function OrderRoute() {
  const {order, lineItems, discountValue, discountPercentage} = useLoaderData();
  const {setOrderHistory} = useStateContext();

  useEffect(()=>{
    setOrderHistory(true)
  },[])
  return (
    <div className=" w-full max-w-[1440px] px-[24] mx-auto">
      <div className="mt-[30px]">
        <DynamicTitle
          
          title={'Order Detail'}
        />
      </div>

      <div className="w-full p-6 sm:grid-cols-1 md:p-8 lg:p-12 lg:py-6">
        <div>
          <h4 className="text-[14px] mb-2 md:text-[18px] lg:text-[20px] font-semibold text-[#000]">
            Order No. {order.name}
          </h4>
          <span
            className="mt-2 text-[#141414e6] text-[14px] md:text-[16px] font-semibold "
            as="p"
          >
            Placed on {new Date(order.processedAt).toDateString()}
          </span>
          <div className="grid items-start gap-12 sm:grid-cols-1 md:grid-cols-4 md:gap-16 sm:divide-y sm:divide-gray-200">
            <table className="min-w-full my-8 divide-y divide-gray-300 md:col-span-3">
              <thead>
                <tr className="align-baseline text-[16px] xl:text-[18px] font-semibold ">
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 font-semibold text-left"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-4 pb-4 font-semibold text-right"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lineItems.map((lineItem,index) => (
                  <Fragment key={index}>
                    {lineItem.variant?.id && (
                      <tr >
                        <td className="w-full py-4 pl-0 pr-3 align-top sm:align-middle max-w-0 sm:w-auto sm:max-w-none">
                          <div className="flex gap-6">
                            {lineItem?.variant?.image && (
                              <div className="w-24 card-image aspect-square">
                                <img
                                  src={lineItem.variant.image.src}
                                  width={96}
                                  height={96}
                                  alt={lineItem?.title || 'Product Image'}
                                />
                              </div>
                            )}
                            <div className="flex-col text-[14px] justify-center hidden lg:flex">
                              <p className="text-[16px] text-[#141414e6] font-medium">
                                {lineItem?.title || 'Untitled Product'}
                              </p>
                              <p className="mt-1 text-[16px] text-[#141414e6] font-medium">
                                {lineItem?.variant?.title || 'Untitled Variant'}
                              </p>
                            </div>
                            <dl className="grid">
                              <dt className="text-[16px] text-[#141414e6] hidden font-medium">
                                Product
                              </dt>
                              <dd className="truncate lg:hidden">
                                <Heading
                                  size="copy"
                                  className="text-[16px] text-[#141414e6] font-medium"
                                  format
                                  as="h3"
                                >
                                  {lineItem?.title || 'Untitled Product'}
                                </Heading>
                                <Text
                                  size="fine"
                                  className="mt-1 text-[16px] text-[#141414e6] font-medium"
                                >
                                  {lineItem?.variant?.title ||
                                    'Untitled Variant'}
                                </Text>
                              </dd>
                              <dt className="sr-only text-[16px] text-[#141414e6] font-medium">
                                Price
                              </dt>
                              <dd className="truncate sm:hidden">
                                <span
                                  size="fine"
                                  className="mt-4 text-[16px] text-[#141414e6] font-medium"
                                >
                                  {lineItem?.variant?.price && (
                                    <Money
                                      className="text-[16px] text-[#141414e6] font-medium"
                                      data={lineItem.variant.price}
                                    />
                                  )}
                                </span>
                              </dd>
                              <dt className="sr-only text-[16px] text-[#141414e6] font-medium">
                                Quantity
                              </dt>
                              <dd className="truncate sm:hidden">
                                <span
                                  className="mt-1 text-[16px] text-[#141414e6] font-medium"
                                  size="fine"
                                >
                                  Qty: {lineItem.quantity}
                                </span>
                              </dd>
                            </dl>
                          </div>
                        </td>
                        <td className="hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                          {lineItem?.variant?.price && (
                            <Money
                              className="text-[16px] text-[#141414e6] font-medium"
                              data={lineItem.variant.price}
                            />
                          )}
                        </td>
                        <td className="hidden px-3 py-4 text-[16px] text-[#141414e6] font-medium text-right align-top sm:align-middle sm:table-cell">
                          {lineItem.quantity}
                        </td>
                        <td className="px-3 py-4 text-[16px] text-[#141414e6] font-medium text-right align-top sm:align-middle sm:table-cell">
                          <Text>
                            {lineItem?.discountedTotalPrice && (
                              <Money
                                className="text-[16px] text-[#141414e6] font-medium"
                                data={lineItem.discountedTotalPrice}
                              />
                            )}
                          </Text>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>

              <tfoot>
                {((discountValue && discountValue.amount) ||
                  discountPercentage) && (
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden  pt-6 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0"
                    >
                      <span className="text-[16px] text-[#141414e6] font-medium">
                        Discounts
                      </span>
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pr-3 font-normal text-left sm:hidden"
                    >
                      <span className="text-[16px] text-[#141414e6] font-medium">
                        Discounts
                      </span>
                    </th>
                    <td className="pt-6 pl-3 pr-4 font-medium text-right text-green-700 md:pr-3">
                      {discountPercentage ? (
                        <span className="text-[16px] text-[#141414e6] font-medium">
                          -{discountPercentage}% OFF
                        </span>
                      ) : (
                        discountValue && (
                          <Money
                            className="text-[16px] text-[#141414e6] font-medium"
                            data={discountValue}
                          />
                        )
                      )}
                    </td>
                  </tr>
                )}
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-6 pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0"
                  >
                    <h6 className="text-[18px] text-[#141414e6] font-semibold">
                      Subtotal
                    </h6>
                  </th>
                  <th
                    scope="row"
                    className="pt-6 pr-3 font-normal text-left sm:hidden"
                  >
                    <h6 className="text-[18px] text-[#141414e6] font-semibold">
                      Subtotal
                    </h6>
                  </th>
                  <td className="pt-6 pl-3 pr-4 text-[16px] text-[#141414e6] font-medium  text-right md:pr-3">
                    <Money
                      className="text-[16px] text-[#141414e6] font-medium"
                      data={order.subtotalPriceV2}
                    />
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-[18px] text-[#141414e6] font-semibold  pl-6 pr-3 font-normal text-right sm:table-cell md:pl-0"
                  >
                    Tax
                  </th>
                  <th
                    scope="row"
                    className="pt-4 pr-3 font-normal text-left sm:hidden"
                  >
                    <h6 className="text-[18px] text-[#141414e6] font-semibold">
                      Tax
                    </h6>
                  </th>
                  <td className="pt-4 pl-3 pr-4 text-right md:pr-3">
                    <Money
                      className="text-[16px] text-[#141414e6] font-medium"
                      data={order.totalTaxV2}
                    />
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 pl-6 pr-3 text-[18px] text-[#141414e6]  font-semibold text-right sm:table-cell md:pl-0"
                  >
                    Total
                  </th>
                  <th
                    scope="row"
                    className="pt-4 pr-3 font-semibold text-left sm:hidden"
                  >
                    <h6 className="text-[18px] text-[#141414e6] font-semibold">
                      Total
                    </h6>
                  </th>
                  <td className="pt-4 pl-3 pr-4  text-right md:pr-3">
                    <Money
                      className="text-[16px] text-[#141414e6] font-medium"
                      data={order.totalPriceV2}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="sticky border-none top-nav md:my-8">
              <Heading
                size="copy"
                className="font-semibold text-[20px] text-[#141414e6] "
                as="h3"
              >
                Shipping Address
              </Heading>
              {order?.shippingAddress ? (
                <ul className="mt-6">
                  <li>
                    <Text>
                      {order.shippingAddress.firstName &&
                        order.shippingAddress.firstName + ' '}
                      {order.shippingAddress.lastName}
                    </Text>
                  </li>
                  {order?.shippingAddress?.formatted ? (
                    order.shippingAddress.formatted.map((line,index) => (
                      <li key={index}>
                        <Text
                          className="text-[16px] text-[#141414e6]"
                          font-semibold
                        >
                          {line}
                        </Text>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <p className="mt-3 text-[14px] text-[#141414e6] font-medium">
                  No shipping address defined
                </p>
              )}
              <Heading
                size="copy"
                className="mt-8 mb-4 font-semibold  text-[20px] text-[#141414e6] "
                as="h3"
              >
                Status
              </Heading>

              <DynamicButton
                className="bg-[#ef6e6e] w-[100%] text-[#fff] py-[14px] px-[8px]"
                text={statusMessage(order.fulfillmentStatus)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CUSTOMER_ORDER_QUERY = `#graphql
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
  fragment AddressFull on MailingAddress {
    address1
    address2
    city
    company
    country
    countryCodeV2
    firstName
    formatted
    id
    lastName
    name
    phone
    province
    provinceCode
    zip
  }
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        amount
        currencyCode
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
  fragment Image on Image {
    altText
    height
    src: url(transform: {crop: CENTER, maxHeight: 96, maxWidth: 96, scale: 2})
    id
    width
  }
  fragment ProductVariant on ProductVariant {
    id
    image {
      ...Image
    }
    price {
      ...Money
    }
    product {
      handle
    }
    sku
    title
  }
  fragment LineItemFull on OrderLineItem {
    title
    quantity
    discountAllocations {
      allocatedAmount {
        ...Money
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    originalTotalPrice {
      ...Money
    }
    discountedTotalPrice {
      ...Money
    }
    variant {
      ...ProductVariant
    }
  }

  query CustomerOrder(
    $country: CountryCode
    $language: LanguageCode
    $orderId: ID!
  ) @inContext(country: $country, language: $language) {
    node(id: $orderId) {
      ... on Order {
        id
        name
        orderNumber
        processedAt
        fulfillmentStatus
        totalTaxV2 {
          ...Money
        }
        totalPriceV2 {
          ...Money
        }
        subtotalPriceV2 {
          ...Money
        }
        shippingAddress {
          ...AddressFull
        }
        discountApplications(first: 100) {
          nodes {
            ...DiscountApplication
          }
        }
        lineItems(first: 100) {
          nodes {
            ...LineItemFull
          }
        }
      }
    }
  }
`;
