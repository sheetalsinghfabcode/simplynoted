import {useRef, Suspense} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer, json, redirect} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Await,
  useLocation,
  useNavigate,
  Form,
  useActionData,
} from '@remix-run/react';
import {getInputStyleClasses} from '~/lib/utils';
import {
  AnalyticsPageType,
  Money,
  ShopPayButton,
  VariantSelector,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import MenuUnderlineImage from '../../assets/Image/menu-underline.png';

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
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {useState, useEffect} from 'react';
import {BiSolidChevronLeft} from 'react-icons/bi';
import {BsXCircle} from 'react-icons/bs';
import Modal from 'react-modal';
import {MessageWriting} from '~/components/products/MessageWrite';
import {AddCart} from '~/components/products/AddCart';
import {ProductInfo} from '../components/products/ProductInfo';
import DynamicButton from '~/components/DynamicButton';
import Breadcrumbs from '~/components/Breadcrumbs';
import {useStateContext} from '~/context/StateContext';
import Instruction from '~/components/modal/Instruction';
import CircularLoader from '~/components/CircularLoder';
import {SERVER_BASE_URL} from '~/data/config';
import ReCAPTCHA from 'react-google-recaptcha';

export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');
  const selectedOptions = getSelectedProductOptions(request);
  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  });

  const shippingData = await context.storefront.query(ShippingMethod, {
    variables: {},
  });
  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
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
  const selectedVariant =
    product.selectedVariant == null ? firstVariant : firstVariant;

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

function redirectToFirstVariant({product, request}) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const firstVariant = product.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }
  throw redirect(`/products/${product.handle}?${searchParams.toString()}`, 302);
}
const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide both an email and a password.',
    });
  }

  const {session, storefront, cart} = context;

  try {
    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);
    // console.log(customerAccessToken,"customerAccessToken");
    // Sync customerAccessToken with existing cart
    const result = await cart.updateBuyerIdentity({customerAccessToken});
    const path = `http://localhost:3000/account`;
    // Update cart id in cookie
    const headers = cart.setCartId(result.cart.id);
    headers.append('Set-Cookie', await session.commit());
    const {customer} = await getCustomer(context, customerAccessToken);
    return json(
      {customer},
      (params.locale
        ? `/${params.locale}/products/${params.productHandle}`
        : `/products/${params.productHandle}`,
      {headers}),
    );
  } catch (error) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      });
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We did not recognize either your email or password. Please try to sign in again or create a new account.',
    });
  }
};
export async function getCustomer(context, customerAccessToken) {
  const {storefront} = context;

  const customer = await storefront.query(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });
  return customer;
}
let parameterValue;

export default function Product() {
  const {product, shop, recommended, variants, data, shippingData, customer} =
    useLoaderData();
  // console.log(product,"product data route page  ");
  const navigate = useNavigate();
  const datafornav = useLocation();

  let EditMess = datafornav?.state?.data?.baseCustomMessage;
  let editEndMess = datafornav?.state?.data?.endText;
  let editOrderValue = datafornav?.state;
  let editFontFamily = datafornav?.state?.data?.fontFamily;
  let showBulkOnEdit = datafornav?.state?.data?.csvBulkData?.length;
  let csvFileUrl = datafornav?.state?.data?.csvFileURL;
  let editFontSize = datafornav?.state?.data?.fontSizeMsg;
  let editCustomFontFamily = datafornav?.state?.data?.customFontName;
  let editLineHeight = datafornav?.state?.data?.lineHeight;
  let editSignOffLineHeight = datafornav?.state?.data?.signOffLineHeight;
  let editSignOffFontSize = datafornav?.state?.data?.signOffFontSize;
  let editShippingDate = datafornav?.state?.data?.optionalShipDate;

  const {media, title} = product;
  const [show, setShow] = useState(
    showBulkOnEdit > 0 || csvFileUrl || datafornav?.search == '?select=Bulk'
      ? true
      : false,
  );

  const {productshow, showSignScreen, setShowSignScreen} = useStateContext();
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorVal, setErrorVal] = useState([]);
  const [fontFamilyName, setFontFamily] = useState('tarzan');
  const [metafields, setMetafields] = useState([]);
  const [customFontName, setCustomFontName] = useState('');
  const [locationValue, setLocationValue] = useState(false);

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window?.location.search);
    parameterValue = urlParams.get('select');
  }

  useEffect(() => {
    let result = product.id.replace(/[^0-9]/g, '');
    getMetaFields(result);
  }, []);
  async function getMetaFields(id) {
    try {
      const queryEndPoint = `${SERVER_BASE_URL}/api/storefront/product/product-metafields`;
      const data = await fetch(queryEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
        }),
      });
      const json = await data.json();
      let y = json.result.metafields[0].value;
      let extractMetafield = JSON.parse(y);
      setMetafields(extractMetafield);
    } catch (error) {}
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
      position: 'relative',
    },
  };
  useEffect(() => {
    localStorage.removeItem('reqFielddInCart');
    setLocationValue(true);
  }, [datafornav.pathname]);
  return (
    <>
      {productshow ? (
        <>
          <Section className={`w-full mt-[20px] !p-0 `}>
            <div className="flex flex-wrap md:flex-row md:justify-between flex-col w-full xl:gap-[40px] gap-[20px] md:mt-0 mt-[15px]">
              <ProductInfo
                title={title}
                product={product}
                showBulkOnEdit={showBulkOnEdit}
                show={show}
                setShow={setShow}
                setShowBox={setShowBox}
                editFontFamily={editFontFamily}
                setFontFamily={setFontFamily}
                setCustomFontName={setCustomFontName}
                editCustomFontFamily={editCustomFontFamily}
              />
              <ProductGallery media={media.nodes} className="" />
            </div>
            {locationValue && (
              <MessageWriting
                show={show}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setShowBox={setShowBox}
                showBulkOnEdit={showBulkOnEdit}
                EditMess={EditMess}
                editEndMess={editEndMess}
                editFontFamily={editFontFamily}
                editFontSize={editFontSize}
                fontFamilyName={fontFamilyName}
                metafields={metafields}
                editLineHeight={editLineHeight}
                editSignOffFontSize={editSignOffFontSize}
                editShippingDate={editShippingDate}
                editSignOffLineHeight={editSignOffLineHeight}
                setFontFamily={setFontFamily}
                setCustomFontName={setCustomFontName}
                editCustomFontFamily={editCustomFontFamily}
              />
            )}
          </Section>
          <Modal
            isOpen={modalIsOpen2}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            {errorVal.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </Modal>
          <Instruction
            close={true}
            isOpen={showSignScreen}
            body={<LoginFunc />}
            closeModal={() => {
              setShowSignScreen(false);
            }}
          />
        </>
      ) : (
        <AddCart
          show={show}
          data={data}
          editFontFamily={editFontFamily}
          productData={product.variants.nodes[0]}
          editOrderValue={editOrderValue}
          shippingData={shippingData?.product}
          fontFamilyName={fontFamilyName}
          customFontName={customFontName}
          variantsVal={product}
          productId={product.id}
        />
      )}
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
//                   <span>Add to Cart</span> <span>·</span>
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

function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
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
              dangerouslySetInnerHTML={{__html: content}}
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
export const meta = () => {
  return [{title: 'Login'}];
};
export function LoginFunc() {
  const {setShowSignScreen, setCustomerId} = useStateContext();

  const {shopName} = useLoaderData();
  const actionData = useActionData();
  // console.log(actionData?.customer,"actiondata");
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);
  const {loaderTitle, setLoaderTitle, showLoader, setShowLoader} =
    useStateContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifid, setVerifid] = useState(false);

  function onChange(value) {
    if (value) {
      setVerifid(true);
    }
  }

  const handleLogin = async () => {
    if (
      !email.trim() ||
      nativeEmailError ||
      nativePasswordError ||
      !password.trim()
    ) {
      return;
    }
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2300);
  };

  if (actionData?.customer?.id) {
    let result = actionData.customer.id.replace(/[^0-9]/g, '');
    localStorage.setItem('customerId', result);
    localStorage.setItem('SnEmail', actionData.customer.email);
    localStorage.setItem('firstName', actionData.customer.firstName);
    localStorage.setItem('lastName', actionData.customer.lastName);
    getSavedCards(result);
    setCustomerId(result);
  }

  async function getSavedCards(Id) {
    try {
      const res = await fetch(
        `${SERVER_BASE_URL}/stripe/customer-data?customerId=${Id}`,
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
      } else {
        localStorage.setItem('packageDiscount', JSON.stringify(0));
        localStorage.setItem('subscriptionName', 'Free');
      }
      setShowSignScreen(false);
    } catch (error) {}
  }
  return (
    <div className="flex relative md:min-w-[540px] justify-center sm:mt-12 mt-4 mb-10 px-4">
      {showLoader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 flex justify-center items-center z-50">
          <CircularLoader textColor="text-white" title="Logging in..." />
        </div>
      )}
      <div className="max-w-md w-full">
        <h1 className="name text-4xl flex sm:mt-[-20px] mt-[0px] justify-center font-bold text-blue-900">
          Sign in
        </h1>
        <div className="flex justify-center">
          <img className="mt-2 w-32" src={MenuUnderlineImage} />
        </div>
        <p className="mt-[20px] text-black text-opacity-80 text-[15px]">
          If you have an account with us, please log in.
        </p>
        {/* TODO: Add onSubmit to validate _before_ submission with native? */}
        <Form method="post" noValidate className="pb-8 mt-4 mb-4 space-y-3">
          {actionData?.formError && (
            <div className="flex items-center text-left text-red">
              <p className="text-red text-[red]">{actionData.formError}</p>
            </div>
          )}
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(nativeEmailError)}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter-E-mail"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(e) => {
                if (actionData) {
                  actionData.formError = '';
                }
                setEmail(e.target.value);
              }}
              onBlur={(event) => {
                setNativeEmailError(
                  event.currentTarget.value.length &&
                    !event.currentTarget.validity.valid
                    ? 'Invalid email address'
                    : null,
                );
              }}
            />

            {nativeEmailError && (
              <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
            )}
          </div>
          <div className="!mb-3">
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(
                nativePasswordError,
              )}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter-Password"
              aria-label="Password"
              minLength={8}
              required
              value={password}
              onChange={(e) => {
                if (actionData) {
                  actionData.formError = '';
                }
                setPassword(e.target.value);
              }}
              onBlur={(event) => {
                if (
                  event.currentTarget.validity.valid ||
                  !event.currentTarget.value.length
                ) {
                  setNativePasswordError(null);
                } else {
                  setNativePasswordError(
                    event.currentTarget.validity.valueMissing
                      ? 'Please enter a password'
                      : 'Passwords must be at least 8 characters',
                  );
                }
              }}
            />
            {nativePasswordError && (
              <p className="text-red-500 text-xs">
                {nativePasswordError} &nbsp;
              </p>
            )}
          </div>
          <ReCAPTCHA
            sitekey="6LdZCogiAAAAAF90CyxrwcnpuKDLAXD8LG4i_WRM"
            onChange={onChange}
          />
          ,
          <div
            onClick={handleLogin}
            className="flex !mt-0 items-center justify-between"
          >
            <button
              className=" shadow-custom h-12 sign-in-modal shadow-lg bg-ef6e6e text-contrast py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
              disabled={
                !!(
                  nativePasswordError ||
                  nativeEmailError ||
                  actionData?.formError ||
                  !verifid
                )
              }
            >
              Sign in
            </button>
          </div>
          <div className="sm:flex grid  justify-between items-center sm:mt-6 mt-4 border-t border-gray-300">
            <p className="align-baseline mt-[12px] text-[16px]">
              <Link
                className="text-[17px] mt-4 inline underline"
                to="/account/register"
              >
                Create an account
              </Link>
            </p>
            <Link
              className="inline-block mt-[12px] align-baseline text-[16px] text-primary/50"
              to="/account/recover"
            >
              Lost your password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

const LOGIN_MUTATION = `#graphql
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export async function doLogin({storefront}, {email, password}) {
  const data = await storefront.mutate(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data.customerAccessTokenCreate.customerAccessToken.accessToken;
  }

  /**
   * Something is wrong with the user's input.
   */
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
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
      variants(first: 6) {
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

const GiftProduct = `#graphql
  query
  {
    collection(handle:"gift-cards"){
      title
      products(first:10){
        edges{
          node{
            title
            onlineStoreUrl
            featuredImage{
              url
            }
            variants(first:10){
              edges{
                node{
                  id
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

  `;

const ShippingMethod = `#graphql
query
{
  product(id:"gid://shopify/Product/7027299254377"){
    title
    onlineStoreUrl
    featuredImage{
      url
    }
    variants(first:10){
      edges{
        node{
          id
          title
          price
          {
            amount}
        }
      }
    }
  }
}`;
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

  fragment CustomerDetails on Customer {
    firstName
    lastName
    phone
    email
    tags
    id
  }

`;
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
