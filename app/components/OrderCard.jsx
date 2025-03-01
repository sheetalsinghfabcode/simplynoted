import {flattenConnection, Image} from '@shopify/hydrogen';
import {Heading, Text, Link} from '~/components';
import {defer} from '@shopify/remix-oxygen';

import DynamicButton from './DynamicButton';
import placeholderImage from '../../assets/Image/product-placeholder.png';
import { useLoaderData } from '@remix-run/react';

export async function loader({context}) {
  const productInformation = await context.storefront.query(ProductData, {
    variants: {},
  });
  return defer({
    productInformation,
  });
}

export function OrderCard({order}) {
  if (!order?.id) return null;
  const [legacyOrderId, key] = order.id.split('/').pop().split('?');
  const lineItems = flattenConnection(order?.lineItems);



  const {productInformation} = useLoaderData();
  return (
    <li className="grid text-center shadow-lg">
      <Link
        className=" flex md:grid items-center md:justify-center justify-normal gap-4 p-4 md:gap-6 md:p-6  md:grid-cols-2"
        to={`/account/orders/${legacyOrderId}?${key}`}
        prefetch="intent"
      >
        {lineItems[0].variant?.image ? (
          <div className="card-image aspect-square bg-primary/5">
            <Image
              width={168}
              height={168}
              className="w-full fadeIn cover"
              alt={lineItems[0].variant?.image?.altText ?? 'Order image'}
              src={lineItems[0].variant?.image.url}
            />
          </div>
        ) : (
          <div className="card-image aspect-square bg-primary/5">
            <img
              className="w-[168px] h-[168px] fadeIn cover"
              src={placeholderImage || ''}
              alt="placeholder"
            />
          </div>
        )}
        <div
          className={`flex-col justify-center text-left ${
            !lineItems[0].variant?.image && 'md:col-span-2'
          }`}
        >
          <Heading as="h3" format className="items-center" size="copy">
            {lineItems.length > 1
              ? `${lineItems[0].title} +${lineItems.length - 1} more`
              : lineItems[0].title}
          </Heading>
          <dl className="grid grid-cols-2 grid-gap-1">
            {/* <dt className="text-[12px] md:text-[14px]">Order ID</dt> */}
            <dd>
              <Text className="text-[12px] md:text-[14px]" color="subtle">
                Order No. {order.orderNumber}
              </Text>
            </dd>
            {/* <dt className="text-[12px] md:text-[14px]">Order Date</dt> */}
            <dd>
              <Text className="text-[12px] md:text-[14px]">
                {new Date(order.processedAt).toDateString()}
              </Text>
            </dd>
            <dt className="sr-only">Fulfillment Status</dt>
          </dl>
        </div>
      </Link>
      <div className="self-end border-t">
        <Link
          className=" flex justify-center block w-full p-2 text-center"
          to={`/account/orders/${legacyOrderId}?${key}`}
          prefetch="intent"
        >
          <DynamicButton
            className=" bg-[#001a5f] px-[16px] w-full py-[12px] text-[16px]  text-[#fff]  hover:bg-[#EF6E6E]"
            text="View Details"
          />
        </Link>
      </div>
    </li>
  );
}

export const ORDER_CARD_FRAGMENT = `#graphql
  fragment OrderCard on Order {
    id
    orderNumber
    processedAt
    financialStatus
    fulfillmentStatus
    currentTotalPrice {
      amount
      currencyCode
    }
    lineItems(first: 20) {
      edges {
        node {
          variant {
          requiresShipping
          title
          
            image {
              url
              altText
              height
              width
            }
          }
          quantity
        
          title      
        }
      }
    }
  }
`;

const ProductData = `#graphql
  query
  {
  product(handle:"thank-you-card-black-line"){
    featuredImage{
      url
    }
  }
}`;
