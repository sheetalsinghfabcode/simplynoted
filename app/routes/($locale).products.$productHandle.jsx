import { useRef, Suspense } from 'react';
import { Disclosure, Listbox } from '@headlessui/react';
import { defer, json, redirect } from '@shopify/remix-oxygen';
import { useLoaderData, Await, useLocation,useNavigate, } from '@remix-run/react';

import {
  AnalyticsPageType,
  Money,
  ShopPayButton,
  VariantSelector,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import clsx from 'clsx';

import {
  Heading,
  IconCaret,
  IconCheck,
  IconClose,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  Link,
  AddToCartButton,
  Button,
} from '~/components';
import { getExcerpt } from '~/lib/utils';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';
import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { useState, useEffect } from 'react';
import { BiSolidChevronLeft } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import Modal from 'react-modal';
import { MessageWriting } from '~/components/products/MessageWrite';
import { AddCart } from '~/components/products/AddCart';
import {ProductInfo} from '../components/products/ProductInfo'
import DynamicButton from '~/components/DynamicButton';


export const headers = routeHeaders;

export async function loader({ params, request, context }) {
  const { productHandle } = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');
  const selectedOptions = getSelectedProductOptions(request);
  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  })

  const shippingData = await context.storefront.query(ShippingMethod, {
    variables: {},
  })
  const { shop, product } = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });
  // if (!product) {
  //   throw new Response('product', { status: 404 });
  // }

  //this condition is commented by me(ayush) for removing the params from url  
  // if (!product.selectedVariant) {
  //   return redirectToFirstVariant({ product, request });
  // }


  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deferred query resolves, the UI will update.

  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: productHandle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // const recommended = getRecommendedProducts(context.storefront, product.id);

  // TODO: firstVariant is never used because we will always have a selectedVariant due to redirect
  // Investigate if we can avoid the redirect for product pages with no search params for first variant

  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant == null ? firstVariant : firstVariant;



  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer({
    shippingData,
    data,
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    // recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    seo,

  });

}


function redirectToFirstVariant({ product, request }) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const firstVariant = product.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }
  throw redirect(`/products/${product.handle}?${searchParams.toString()}`, 302);
}


let parameterValue;
export default function Product() {

  const { product, shop, recommended, variants, data, shippingData } = useLoaderData();
  console.log(product,"----++++_++_-");
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const datafornav = useLocation();
  let EditMess = datafornav.state?.data?.messageData
  let editEndMess = datafornav.state?.data.endText
  let editOrderValue = datafornav.state
  let editFontFamily = datafornav.state?.data.fontFamily
  let showBulkOnEdit = datafornav.state?.data.csvBulkData.length
  let editFontSize = datafornav.state?.data.fontSizeMsg
  let editCustomFontFamily = datafornav.state?.data.customFontName
  let editLineHeight = datafornav.state?.data.lineHeight
  let editSignOffLineHeight = datafornav.state?.data.signOffLineHeight
  let editSignOffFontSize = datafornav.state?.data.signOffFontSize

  const { media, title, vendor, descriptionHtml } = product;
  const { shippingPolicy, refundPolicy } = shop;
  const [show, setShow] = useState(showBulkOnEdit || parameterValue == "Bulk" ? true : false);
  const [productshow, setProductShow] = useState(true)
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [showBox, setShowBox] = useState(true)
  const [selectedFile, setSelectedFile] = useState('');
  const [errorVal, setErrorVal] = useState([]);
  const [fontFamilyName,setFontFamily] = useState('tarzan')
  const [metafields,setMetafields] = useState([])
  const [customFontName,setCustomFontName] = useState('')
  const [locationValue,setLocationValue] = useState(false)


  if (typeof window !== 'undefined') {

    const urlParams = new URLSearchParams(window?.location.search);
     parameterValue = urlParams.get('select');
    // console.log(parameterValue,"---000000");
  }

  useEffect(() => {
    let result =  product.id.replace(/[^0-9]/g,"");
         getMetaFields(result)
    }, []);
    async function getMetaFields(id) {
      try {
        const queryEndPoint = `https://api.simplynoted.com/api/storefront/product/product-metafields`
        const data = await fetch(queryEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "productId": id
        })
        });
        const json = await data.json();
        let y = json.result.metafields[0].value
        let extractMetafield = JSON.parse(y)
        setMetafields(extractMetafield)
      } catch (error) {
        console.error(error, "shopify");
      }
      // debugger;
   
    }

 
  const customStyles = {

    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '620px',
      background: '#fff',
      width: '100%',
      padding: '30px',
      maxHeight: '500px',
      zIndex: '2',
      position: 'relative'
    },

  };
  useEffect(() => {
    localStorage.removeItem('reqFielddInCart')
    console.log(datafornav.pathname,'0000000000')
    setLocationValue(true)
  }, [datafornav.pathname]);
  return (
    <>
      {productshow ?
        <>
        <DynamicButton 
        className="bg-[#EF6E6E] m-5 ml-[32px] w-full max-w-[150px]"
        text="Go Back"
        backArrow={true}
        onClickFunction={goBack}/>
          <Section className="px-0 md:px-8 ">
            <div className="grid items-start md:gap-6 lg:gap-5 md:grid-cols-2">
              <ProductGallery
                media={media.nodes}
                className="w-full"
              />
              <ProductInfo title={title} product={product} 
              show={show} setShow={setShow} setShowBox={setShowBox}
               editFontFamily={editFontFamily} setFontFamily={setFontFamily}
               setCustomFontName={setCustomFontName}
               editCustomFontFamily={editCustomFontFamily}/>
            </div>
            {locationValue &&
            <MessageWriting show={show} selectedFile={selectedFile} setSelectedFile={setSelectedFile}
              setShowBox={setShowBox} setProductShow={setProductShow}
              EditMess={EditMess} editEndMess={editEndMess}
              editFontFamily={editFontFamily} editFontSize={editFontSize} fontFamilyName={fontFamilyName} metafields={metafields}
              editLineHeight={editLineHeight} editSignOffFontSize={editSignOffFontSize} editSignOffLineHeight={editSignOffLineHeight}/>
            }
              </Section>

          {/* <Suspense fallback={<Skeleton className="" />}>
            <Await
              errorElement="There was a problem loading related products"
              resolve={recommended}
            >
              {(products) => (
                <ProductSwimlane title="Related Products" products={products} />
              )}
            </Await>
          </Suspense> */}
          <Modal
            isOpen={modalIsOpen2}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {errorVal.map((item) =>
              <div>{item}</div>
            )}
          </Modal>
        </>
        :
        <AddCart show={show} setProductShow={setProductShow}
          data={data} productData={product.variants.nodes[0]}
          editOrderValue={editOrderValue}
          shippingData={shippingData?.product} 
          fontFamilyName={fontFamilyName}
          customFontName={customFontName}/>
      }
    </>
  );

}

// export function ProductForm({ variants }) {
//   const { product, analytics, storeDomain } = useLoaderData();
//   const closeRef = useRef(null);
//   /**
//    * Likewise, we're defaulting to the first variant for purposes
//    * of add to cart if there is none returned from the loader.
//    * A developer can opt out of this, too.
//    */
//   const selectedVariant = product.selectedVariant;
//   const isOutOfStock = !selectedVariant?.availableForSale;
//   const isOnSale =
//     selectedVariant?.price?.amount &&
//     selectedVariant?.compareAtPrice?.amount &&
//     selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;
//   const productAnalytics = {
//     ...analytics.products[0],
//     quantity: 1,
//   };
//   return (
//     <div className="grid gap-10">
//       <div className="grid gap-4">
//         <VariantSelector
//           handle={product.handle}
//           options={product.options}
//           variants={variants}
//         >
//           {({ option }) => {
//             console.log(option, '+++++++++++++++++++=');
//             return (
//               <div
//                 key={option.name}
//                 className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
//               >
//                 <Heading as="legend" size="lead" className="min-w-[4rem]">
//                   {option.name}
//                 </Heading>
//                 <div className="flex flex-wrap items-baseline gap-4">
//                   {option.values.length > 7 ? (
//                     <div className="relative w-full">
//                       <Listbox>
//                         {({ open }) => (
//                           <>
//                             <Listbox.Button
//                               ref={closeRef}
//                               className={clsx(
//                                 'flex items-center justify-between w-full py-3 px-4 border border-primary',
//                                 open
//                                   ? 'rounded-b md:rounded-t md:rounded-b-none'
//                                   : 'rounded',
//                               )}
//                             >
//                               <span>{option.value}</span>
//                               <IconCaret direction={open ? 'up' : 'down'} />
//                             </Listbox.Button>
//                             <Listbox.Options
//                               className={clsx(
//                                 'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
//                                 open ? 'max-h-48' : 'max-h-0',
//                               )}
//                             >
//                               {option.values
//                                 .filter((value) => value.isAvailable)
//                                 .map(({ value, to, isActive }) => (
//                                   <Listbox.Option
//                                     key={`option-${option.name}-${value}`}
//                                     value={value}
//                                   >
//                                     {({ active }) => (
//                                       <Link
//                                         to={to}
//                                         className={clsx(
//                                           'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
//                                           active && 'bg-primary/10',
//                                         )}
//                                         onClick={() => {
//                                           if (!closeRef?.current) return;
//                                           closeRef.current.click();
//                                         }}
//                                       >
//                                         {value}
//                                         {isActive && (
//                                           <span className="ml-2">
//                                             <IconCheck />
//                                           </span>
//                                         )}
//                                       </Link>
//                                     )}
//                                   </Listbox.Option>
//                                 ))}
//                             </Listbox.Options>
//                           </>
//                         )}
//                       </Listbox>
//                     </div>
//                   ) : (
//                     option.values.map(({ value, isAvailable, isActive, to }) => (
//                       <Link
//                         key={option.name + value}
//                         to={to}
//                         preventScrollReset
//                         prefetch="intent"
//                         replace
//                         className={clsx(
//                           'leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200',
//                           isActive ? 'border-primary/50' : 'border-primary/0',
//                           isAvailable ? 'opacity-100' : 'opacity-50',
//                         )}
//                       >
//                         {value}
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               </div>
//             );
//           }}
//         </VariantSelector>
//         {selectedVariant && (
//           <div className="grid items-stretch gap-4">
//             {isOutOfStock ? (
//               <Button variant="secondary" disabled>
//                 <Text>Sold out</Text>
//               </Button>
//             ) : (
//               <AddToCartButton
//                 lines={[
//                   {
//                     merchandiseId: selectedVariant.id,
//                     quantity: 1,
//                   },
//                 ]}
//                 variant="primary"
//                 data-test="add-to-cart"
//                 analytics={{
//                   products: [productAnalytics],
//                   totalValue: parseFloat(productAnalytics.price),
//                 }}
//               >
//                 <Text
//                   as="span"
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <span>Add to Cart</span> <span>·</span>{' '}
//                   <Money
//                     withoutTrailingZeros
//                     data={selectedVariant?.price}
//                     as="span"
//                   />
//                   {isOnSale && (
//                     <Money
//                       withoutTrailingZeros
//                       data={selectedVariant?.compareAtPrice}
//                       as="span"
//                       className="opacity-50 strike"
//                     />
//                   )}
//                 </Text>
//               </AddToCartButton>
//             )}
//             {!isOutOfStock && (
//               <ShopPayButton
//                 width="100%"
//                 variantIds={[selectedVariant?.id]}
//                 storeDomain={storeDomain}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



function ProductDetail({ title, content, learnMore }) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="pb-px border-b border-primary/30 text-primary/50"
                  to={learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}



const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }

`;


const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      metafield(namespace: "custom_fields", key: "data") {
        id
        value
      }
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;



const VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}

`;



// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   query productRecommendations(
//     $productId: ID!
//     $count: Int
//     $country: CountryCode
//     $language: LanguageCode
//   ) @inContext(country: $country, language: $language) {
//     recommended: productRecommendations(productId: $productId) {
//       ...ProductCard
//     }
//     additional: products(first: $count, sortKey: BEST_SELLING) {
//       nodes {
//         ...ProductCard
//       }
//     }
//   }
//   ${PRODUCT_CARD_FRAGMENT}

// `;


const GiftProduct = `#graphql
  query
  {
    collection(handle:"gift-cards"){
      title
      products(first:10){
        edges{
          node{
            title
            featuredImage{
              url
            }
            variants(first:10){
              edges{
                node{
                  title
                  price{
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
    }

  `

const ShippingMethod = `#graphql
query
{
  product(id:"gid://shopify/Product/7027299254377"){
    title
    featuredImage{
      url
    }
    variants(first:10){
      edges{
        node{
          title
          price
          {
            amount}
        }
      }
    }
  }
}`

// async function getRecommendedProducts(storefront, productId) {
//   const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
//     variables: { productId, count: 12 },

//   });
//   invariant(products, 'No data returned from Shopify API');
//   const mergedProducts = (products.recommended ?? [])
//     .concat(products.additional.nodes)
//     .filter(
//       (value, index, array) =>
//         array.findIndex((value2) => value2.id === value.id) === index,
//     );

//   const originalProduct = mergedProducts.findIndex(
//     (item) => item.id === productId,
//   );
//   mergedProducts.splice(originalProduct, 1);
//   return { nodes: mergedProducts };

// }