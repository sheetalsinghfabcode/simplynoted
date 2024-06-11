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
import {Fragment, useEffect, useRef, useState} from 'react';
import placeholderImage from '../../assets/Image/product-placeholder.png';
import { SERVER_BASE_URL } from '~/data/config';

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

  const orderLineItems = flattenConnection(order.lineItems);

  const discountApplications = flattenConnection(order.discountApplications);

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return json({
    order,
    orderLineItems,
    discountValue,
    discountPercentage,
  });
}

export default function OrderRoute() {
  const {order, orderLineItems, discountValue, discountPercentage} =
    useLoaderData();
  const {setOrderHistory} = useStateContext();
  const isMounted = useRef(false);
  const [lineItems, setlineItems] = useState(orderLineItems);

  useEffect(() => {
    setOrderHistory(true);
    if (!isMounted.current) {
      isMounted.current = true;
      setMissingProductImages(order, setlineItems);
    }
  }, []);

  return (
    <div className=" w-full max-w-[1440px] px-[24] mx-auto">
      <div className="mt-[30px]">
        <DynamicTitle title={'Order Detail'} />
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
          <div className="border-none md:mb-2 md:mt-2">
            <span className="mb-4 font-semibold  text-[16px] text-[#141414e6] ">
              Status : &nbsp;
              {statusMessage(order.fulfillmentStatus)}
            </span>
          </div>
          <div className="grid items-start gap-12 sm:grid-cols-1 md:grid-cols-3 md:gap-16 sm:divide-y sm:divide-gray-200">
            <table className="my-8 divide-y divide-gray-300 md:col-span-3">
              <thead>
                <tr className="align-baseline text-[16px] xl:text-[18px] font-semibold ">
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 font-semibold text-left"
                  >
                    PRODUCT
                  </th>
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 font-semibold text-left"
                  >
                    ORDER MESSAGE
                  </th>
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 font-semibold text-left"
                  >
                    FONT SELECTION
                  </th>
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 font-semibold text-left"
                  >
                    SENDER'S ADDRESS
                  </th>
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 font-semibold text-left"
                  >
                    RECIPIENT'S ADDRESS
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell"
                  >
                    PRICE
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell"
                  >
                    QUANTITY
                  </th>
                  <th
                    scope="col"
                    className="px-4 pb-4 font-semibold text-right"
                  >
                    TOTAL
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {lineItems.map((lineItem, index) => (
                  <Fragment key={index}>
                    {/* {lineItem.variant?.id && ( */}
                    <tr>
                      <td className="w-full py-4 pl-0 pr-3 align-top sm:align-middle max-w-0 sm:w-auto sm:max-w-none">
                        <div className="flex gap-6">
                          {lineItem?.variant?.image ? (
                            <div className="w-24 card-image aspect-square">
                              <img
                                src={lineItem.variant.image.src}
                                width={96}
                                height={96}
                                alt={lineItem?.title || 'Product Image'}
                              />
                            </div>
                          ) : (
                            <div className="w-24 card-image aspect-square">
                              <img
                                src={placeholderImage}
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
                              {lineItem?.variant?.title}
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
                                {lineItem?.variant?.title || ''}
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
                                className="mt-1 text-[14px] text-[#141414e6] font-medium"
                                size="fine"
                              >
                                qty: {lineItem.quantity}
                              </span>
                            </dd>
                          </dl>
                        </div>
                      </td>
                      <td className="break-words md:w-[300px] max-w-[300px] py-4 pl-0 pr-3 align-top sm:align-middle">
                        {lineItem?.customAttributes.length > 0 &&
                          lineItem?.customAttributes.map((attr) => {
                            return (
                              attr.key === 'custom_message' && <>{attr.value}</>
                            );
                          })}
                      </td>
                      <td className="break-words max-w-[135px] py-4 pl-0 pr-3 align-top sm:align-middle">
                        {lineItem?.customAttributes.length > 0 &&
                          lineItem?.customAttributes.map((attr) => {
                            return (
                              attr.key === 'font_selection' &&
                              getCapitalizedFont(attr.value)
                            );
                          })}
                      </td>
                      <td className="break-words max-w-[135px] py-4 pl-0 pr-3 align-top sm:align-middle">
                        {lineItem?.customAttributes.length > 0 &&
                          getFullAddress(lineItem?.customAttributes)}
                      </td>
                      <td className="break-words max-w-[135px] py-4 pl-0 pr-3 align-top sm:align-middle">
                        {lineItem?.customAttributes.length > 0 &&
                          getRecipientsAddress(lineItem?.customAttributes)}
                      </td>
                      <td className="px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                        <Money
                          className="text-[16px] text-[#141414e6] font-medium"
                          data={
                            lineItem.variant?.price ||
                            lineItem?.originalTotalPrice
                          }
                        />
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
                    {/* )} */}
                  </Fragment>
                ))}
              </tbody>

              <tfoot>
                {((discountValue && discountValue.amount) ||
                  discountPercentage) && (
                  <tr>
                    <th
                      scope="row"
                      colSpan={7}
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
                    colSpan={7}
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
                    colSpan={7}
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
                    colSpan={7}
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
          </div>
        </div>
      </div>
    </div>
  );
}

function getCapitalizedFont(font) {
  if (!font || typeof font != 'string') return null;
  return `${font[0].toUpperCase() + font.slice(1)}`
}

function getFullAddress(properties, type = 'SENDER') {
  const address = {
    sender_address1: '',
    sender_address2: '',
    sender_city: '',
    sender_state: '',
    sender_zip: '',
    recipient_address1: '',
    recipient_address2: '',
    recipient_city: '',
    recipient_state: '',
    recipient_zip: '',
  };

  for (const {key, value} of properties) {
    if (key in address) {
      address[key] = value;
    }
  }

  if (type === 'SENDER') {
    return `${address.sender_address1} ${address.sender_address2}, ${address.sender_city}, ${address.sender_state} ${address.sender_zip}`;
  } else if (type === 'RECIPIENT') {
    return `${address.recipient_address1} ${address.recipient_address2}, ${address.recipient_city}, ${address.recipient_state} ${address.recipient_zip}`;
  }

  return '';
}

function getRecipientsAddress(properties) {
  const singlePurchaseValidation = {
    recipient_address1: true,
    recipient_address2: true,
    recipient_city: true,
    recipient_state: true,
    recipient_zip: true,
  };

  let recipientUpload = null;

  for (const {key, value} of properties) {
    if (!(key in singlePurchaseValidation)) {
      if (key === 'recipient_upload' && value !== 'Not Applicable :') {
        recipientUpload = value;
      }
    }
  }

  if (recipientUpload) {
    return (
      <a
        href={recipientUpload}
        className="font-bold text-[#001A5F]"
        alt="recipient_upload"
      >
        Download All Recipients
      </a>
    );
  } else {
    return getFullAddress(properties, 'RECIPIENT');
  }
}

async function setMissingProductImages(order, setlineItems) {
  const nullVariantTitles = new Set();
  const line_items = order.lineItems?.nodes || [];
  line_items.forEach(
    (item) => !item?.variant && nullVariantTitles.add(item.title),
  );

  const nullProducts = await getNullVariantProducts(nullVariantTitles);
  const items = order.lineItems?.nodes || [];
  for (const item of items) {
    const nullProduct = nullProducts.find(
      (product) => product.title === item.title,
    );
    if (nullProduct && !item.variant) {
      item.variant = {
        image: {src: nullProduct.images[0]?.originalSrc},
      };
    }
  }
  setlineItems(order.lineItems.nodes);
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
    customAttributes { key, value }
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
