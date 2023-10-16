import {useRef, Suspense} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Await} from '@remix-run/react';
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
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {useState, useEffect} from 'react';
import {BiSolidChevronLeft} from 'react-icons/bi';
import {BsXCircle} from 'react-icons/bs';
import Modal from 'react-modal';

export const headers = routeHeaders;
let input,
  input2,
  output,
  output2,
  outputContainer,
  outputContainer2,
  customerid;

export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  if (!product.selectedVariant) {
    return redirectToFirstVariant({product, request});
  }

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
  const recommended = getRecommendedProducts(context.storefront, product.id);

  // TODO: firstVariant is never used because we will always have a selectedVariant due to redirect
  // Investigate if we can avoid the redirect for product pages with no search params for first variant
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

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
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
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

export default function Product() {
  const {product, shop, recommended, variants} = useLoaderData();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;
  const [name, setName] = useState('Enter Your Text Here....');
  const [name2, setName2] = useState('');
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [productshow, setProductShow] = useState(true);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [returnAddress, setReturnAddress] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [aiText, setaiText] = useState('');
  const [valToGen, setValToGen] = useState('');

  //  input = document.querySelector('.inputText');
  input2 = document.querySelector('.inputText2');

  output2 = document.querySelector('.output2');

  outputContainer2 = document.querySelector('.secDiv');

  if (input) {
    input.addEventListener('input', processInput);
  }

  function resize_to_fit() {
    let fontSize = window.getComputedStyle(output).fontSize;
    output.style.fontSize = parseFloat(fontSize) - 1 + 'px';
    if (output.clientHeight >= outputContainer.clientHeight) {
      resize_to_fit();
    }
  }

  async function processInput() {
    output.innerHTML = await this.value;
    output.style.fontSize = '60px'; // Default font size
    resize_to_fit();
  }

  function resize_to_fit2() {
    let fontSize = window.getComputedStyle(output2).fontSize;
    output2.style.fontSize = parseFloat(fontSize) - 1 + 'px';
    if (output2.clientHeight >= outputContainer2.clientHeight) {
      resize_to_fit2();
    }
  }

  async function processInput2() {
    output2.innerHTML = await this.value;
    output2.style.fontSize = '60px'; // Default font size
    resize_to_fit2();
  }

  if (input2) {
    input2.addEventListener('input', processInput2);
  }

  function setFont() {
    var selectFont = document.getElementById('font');
    if (selectFont) {
      var selectFontValue = selectFont.options[selectFont.selectedIndex].value;
      if (selectFontValue) {
        document.getElementById('abcd').style.fontFamily = selectFontValue;
        document.getElementById('abcd2').style.fontFamily = selectFontValue;
      }
      // else if (selectFontValue == "Plain") {
      //     document.getElementById("abcd").style.fontFamily  = "Bold";
      // }
      // else if (selectFontValue == "Bold") {
      //     document.getElementById("abcd").style.fontFamily  = 'Courier';
      // }
      // else {
      //     document.getElementById("abcd").style.fontFamily  = 'Times New Roman';
      // }
    }
  }
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useEffect(() => {
    //   output = document.querySelector('.output');
    // newData()
    input = ref.current;
    output = ref1.current;
    outputContainer = ref2.current;
    customerid = localStorage.getItem('customerId');
    getRecipient();
    getReturn();
  }, []);
  async function getRecipient() {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`,
      );
      const json = await res.json();
      console.log(json, 'getRecipient Response____________');
      setRecipientAddress(json.result);
    } catch (error) {
      console.log(error, 'Recipient error--------');
    }
  }
  async function getReturn() {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=return`,
      );
      const json = await res.json();
      console.log(json, 'getRecipient Response____________');
      setReturnAddress(json.result);
    } catch (error) {
      console.log(error, 'Recipient error--------');
    }
  }

  async function checkUserLogged() {
    if (customerid) {
      setProductShow(false);
    } else {
      alert('please Login First');
    }
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

  async function aiGenrateMess() {
    try {
      const res = await fetch('https://api.simplynoted.com/api/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNjZjBiNDAwODcwZjFmMjQ3OTA5ODUiLCJ1c2VyIjp7ImVtYWlsIjoia2FyYW5AdGhlZmFiY29kZS5vcmciLCJzaG9waWZ5SWQiOiI2MjMzNjE5MTAzODQ5IiwiX2lkIjoiNjQzY2YwYjQwMDg3MGYxZjI0NzkwOTg1IiwiZmlyc3RfbmFtZSI6InRlc3RlciIsImxhc3RfbmFtZSI6InRlc3RlciJ9LCJpYXQiOjE2ODE3MzIxNTd9.wFzXMBbN3mSy8nDIlczfkp6m_r1nshHGLCFuLz81Bkc',
        },
        body: JSON.stringify({msg: valToGen}),
      });
      const json = await res.json();
      setaiText(json.message);

      console.log(json.message, 'AiGenrated Response____________');
    } catch (error) {
      console.log(error, 'error at Ai generated message ');
    }
  }
  return (
    <>
      {productshow ? (
        <>
          <Section className="px-0 md:px-8 lg:px-12">
            <div className="grid items-start md:gap-6 lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
              <ProductGallery
                media={media.nodes}
                className="w-full lg:col-span-2"
              />
              <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll ml-[-300px]">
                <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
                  <div className="grid gap-2">
                    <Heading as="h1" className="whitespace-normal">
                      {title}
                    </Heading>
                    <Text className={'opacity-50 font-medium'}>
                      $ {product.variants.nodes[0].price.amount}
                    </Text>
                    {/* {vendor && (
              <Text className={'opacity-50 font-medium'}>{vendor}</Text>
            )} */}
                    <div className="buttonClass flex justify-start">
                      <div className="buttonDiv pr-5">
                        <button
                          className="bg-[#001a5f] text-[#fff] p-2 rounded "
                          onClick={() => setShow(false)}
                        >
                          Single Card
                        </button>
                      </div>
                      <div className="gap-2">
                        <button
                          className="bg-[#ef6e6e] text-[#fff] p-2 rounded "
                          onClick={() => setShow(true)}
                        >
                          Bulk Purchase
                        </button>
                      </div>
                    </div>
                    {show && (
                      <table className="price-breakdown desktop">
                        <tbody>
                          <tr>
                            <td className="label">Quantity</td>
                            <td>1-99</td>
                            <td>100-249</td>
                            <td>250-499</td>
                            <td>500-999</td>
                            <td>1000-2499</td>
                            <td>2500+</td>
                          </tr>
                          <tr>
                            <td className="label">Price</td>
                            <td>$3.25</td>
                            <td>$3.15</td>
                            <td>$3.00</td>
                            <td>$2.85</td>
                            <td>$2.70</td>
                            <td>$2.55</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                    <div className="selectOtion mb-5 flex">
                      <div className="w-[192px]">
                        <Text className="text-sm w-[100px]">
                          Standard Handwriting Style
                        </Text>
                        <br />
                        <select id="font" onClick={() => setFont()}>
                          <option
                            value="pinocchio"
                            className={`font-pinocchio`}
                          >
                            Pinocchio
                          </option>
                          <option value="tarzan" className={`font-tarzan`}>
                            Tarzan
                          </option>
                          <option value="stitch" className={`font-stitch`}>
                            Stitch
                          </option>
                          <option value="simba" className={`font-simba`}>
                            Simba
                          </option>
                          <option value="roo" className={`font-roo`}>
                            Roo
                          </option>
                          <option value="nimo" className={`font-nimo`}>
                            Nimo
                          </option>
                          <option value="lumiere" className={`font-lumiere`}>
                            Lumiere
                          </option>
                          <option value="kaa" className={`font-kaa`}>
                            Kaa
                          </option>
                          <option value="kaaNew" className={`font-kaaNew`}>
                            KaaNew
                          </option>
                          <option value="dumbo" className={`font-dumbo`}>
                            Dumbo
                          </option>
                          <option value="donald" className={`font-donald`}>
                            Donald
                          </option>
                          <option value="aladdin" className={`font-aladdin`}>
                            Aladdin
                          </option>
                          <option value="belle" className={`font-belle`}>
                            Belle
                          </option>
                          <option value="boo" className={`font-boo`}>
                            Boo
                          </option>
                          <option
                            value="cinderella"
                            className={`font-cinderella`}
                          >
                            Cinderella
                          </option>
                          <option value="copper" className={`font-copper`}>
                            Copper
                          </option>
                          <option value="jasmine" className={`font-jasmine`}>
                            Jasmine
                          </option>
                          <option value="merlin" className={`font-merlin`}>
                            Merlin
                          </option>
                          <option value="goofy" className={`font-goofy`}>
                            Goofy
                          </option>
                          <option value="hercules" className={`font-hercules`}>
                            Hercules
                          </option>
                          <option value="rafiki" className={`font-rafiki`}>
                            Rafiki
                          </option>
                          <option value="rapunzel" className={`font-rapunzel`}>
                            Rapunzel
                          </option>
                          <option value="ratigan" className={`font-ratigan`}>
                            Ratigan
                          </option>
                          <option value="sarabi" className={`font-sarabi`}>
                            Sarabi
                          </option>
                          <option value="scar" className={`font-scar`}>
                            Scar
                          </option>
                          <option value="triton" className={`font-triton`}>
                            Triton
                          </option>
                          <option value="woody" className={`font-woody`}>
                            Woody
                          </option>
                        </select>
                      </div>
                      <div>
                        <Text className="text-sm">
                          Custom Handwriting Style
                        </Text>
                        <br />
                        <select id="Coustomfont text-sm">
                          <option className="text-sm">
                            Custom Handwriting Style
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Text>Optional shipping date</Text>
                      <br />
                      <input type="date" />
                      {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    </div>
                  </div>
                  {/* Product page Data Vieew */}
                  {/* <Suspense fallback={<ProductForm variants={[]} />}>
            <Await
              errorElement="There was a problem loading related products"
              resolve={variants}
            >
              {(resp) => (
                <ProductForm
                  variants={resp.product?.variants.nodes || []}
                />
              )}
            </Await>

          </Suspense> */}

                  {/* Return and Policy button */}
                  {/* <div className="grid gap-4 py-4">
            {descriptionHtml && (
              <ProductDetail
                title="Product Details"
                content={descriptionHtml}
              />
            )}
            {shippingPolicy?.body && (
              <ProductDetail
                title="Shipping"
                content={getExcerpt(shippingPolicy.body)}
                learnMore={`/policies/${shippingPolicy.handle}`}
              />
            )}
            {refundPolicy?.body && (
              <ProductDetail
                title="Returns"
                content={getExcerpt(refundPolicy.body)}
                learnMore={`/policies/${refundPolicy.handle}`}
              />
            )}
          </div> */}
                </section>
              </div>
            </div>
            {/* <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
      <input onChange={onChange} value={name} id="your-notes-for-our-design"
        disabled placeholder='Enter your custom message here....'
        type="text" name="properties [Your notes for our design]"
      />
    </div> */}
            {/* <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
      <input id="your-notes-for-our-design" onChange={onChange} value={name} placeholder='Enter your custom message here....' type="text" name="properties [Your notes for our design]" />
    </div> */}

            <div className="mainDivForBox flex gap-10">
              <div id="outer" className="outerr">
                <div className="outerSec" ref={ref2}>
                  <div id="abcd" ref={ref1} className="output">
                    {name}
                  </div>
                </div>
                <div className="secDiv">
                  <div id="abcd2" className="output2">
                    {name2}
                  </div>
                </div>
              </div>
              <div className="textAreaView w-[600px]">
                <textarea
                  type="text"
                  id="example-one-input"
                  ref={ref}
                  className="inputText"
                  maxlength="450"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your custom message text here..."
                  data-gtm-form-interact-field-id="0"
                ></textarea>
                <div className="flex">
                  <text onClick={() => setIsOpen(true)}>
                    Try our new AI Assistant to <br /> help write your message
                  </text>
                  <textarea
                    type="text"
                    id="example-one-input2"
                    className="inputText2"
                    maxlength="24"
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter here..."
                    data-gtm-form-interact-field-id="0"
                  ></textarea>
                </div>
                <div className="bg-[#1b5299] h-[50px] text-center mt-10">
                  <button
                    className="text-[#fff] items-center justify-center mt-3 w-full"
                    onClick={() => checkUserLogged()}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* <input id='customText' className='inputText' type="text" placeholder="Enter your custom text here...." /> */}
            </div>
          </Section>
          <Suspense fallback={<Skeleton className="h-32" />}>
            <Await
              errorElement="There was a problem loading related products"
              resolve={recommended}
            >
              {(products) => (
                <ProductSwimlane title="Related Products" products={products} />
              )}
            </Await>
          </Suspense>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="flex">
              <h2 className="font-bold text-xl w-[600px]">
                AI Message Assistant
              </h2>
              <BsXCircle className="" onClick={() => setIsOpen(false)} />
            </div>
            <div>
              <text className=" text-[#999999] ">
                Type in words or a phrase to use our AI Assistant to
                <br /> help generate a great message
              </text>
            </div>
            <div>
              <textarea
                type="text"
                id="aiTextArea"
                value={aiText ? aiText : valToGen}
                onChange={(e) => setValToGen(e.target.value)}
                placeholder="Example: Message for Birthday"
                maxlength="450"
              ></textarea>
            </div>
            <div className="ai-generate">
              <button
                id="generate-msg"
                disabled=""
                onClick={() => aiGenrateMess()}
              >
                Generate Message
              </button>
            </div>
          </Modal>
        </>
      ) : (
        <div className="  w-full h-full gap-2 mt-8">
          <h3
            className="items-center font-bold flex text-2xl"
            onClick={() => setProductShow(true)}
          >
            <BiSolidChevronLeft size="50px" />
            Back To Product Customization
          </h3>
          <div className="row flex mr-2 ml-2 gap-4">
            <div className="col-6 w-[50%] ">
              <div className="address-grid">
                <div className="address-data">
                  <h3 className="text-2xl font-bold mt-4 mb-4">
                    Your Info (return/sender address)
                  </h3>
                  <div className="buttonDiv pr-5 mt-2">
                    <button className="bg-[#001a5f] text-[#fff] p-3">
                      New Address
                    </button>
                  </div>
                  <div>
                    <input
                      type="text "
                      className="w-full rounded p-3 mt-4"
                      placeholder="Search Addresses..."
                    />
                  </div>
                  {returnAddress.map((item) => (
                    <div className="w-full rounded p-3 mt-4 bg-[#fff] ">
                      <input type="checkbox" className="mr-4" />
                      {item.firstName} {item.lastName}, {item.city},{' '}
                      {item.state}, {item.zip}, {item.country}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-6 w-[50%]">
              <div className="address-grid">
                <div className="address-data">
                  <h3 className="text-2xl font-bold mt-4 mb-4">
                    Recipient address
                  </h3>
                  <div className="buttonDiv pr-5 mt-2">
                    <button className="bg-[#001a5f] text-[#fff] p-3">
                      New Address
                    </button>
                  </div>
                  <div>
                    <input
                      type="text "
                      className="w-full rounded p-3 mt-4 "
                      placeholder="Search Addresses..."
                    />
                  </div>
                  {recipientAddress.map((item) => (
                    <div className="w-full rounded p-3 mt-4 bg-[#fff] ">
                      <input type="checkbox" className="mr-4" />
                      {item.firstName} {item.lastName}, {item.city},{' '}
                      {item.state}, {item.zip}, {item.country}
                    </div>
                  ))}
                </div>
              </div>
              <div className="address-grid mt-10">
                <div className="address-data">
                  <h3 className="text-2xl font-bold mt-6 mb-6">
                    Add a Gift Card
                  </h3>
                  <div className="row flex mr-2 ml-2 ">
                    <div className="col-4 mt-4 font-bold w-[190px]">
                      Select Gift Card:
                    </div>
                    <div className="col-8 mt-3 pr-0 w-[370px]">
                      <select
                        name="gift_name"
                        className="w-full"
                        id="gift_name"
                        onchange="changeGiftPrice(this.value)"
                      >
                        <option value="" disabled="" selected="">
                          Select
                        </option>
                        <option value="6661818679401" id="giftName">
                          Starbucks Gift Card
                        </option>
                        <option value="6661817729129" id="giftName">
                          Amazon Gift Card
                        </option>
                        <option value="6661818941545" id="giftName">
                          Visa Gift Card
                        </option>
                        <option value="6661815795817" id="giftName">
                          Home Depot Gift Card
                        </option>
                        <option value="6661818253417" id="giftName">
                          Lowe's Gift Card
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row flex mr-2 ml-2 ">
                    <div className="col-4 mt-4 font-bold w-[190px]">
                      Select Gift Price:
                    </div>
                    <div className="col-8 mt-3 pr-0 w-[370px]">
                      <select
                        name="gift_name"
                        className="w-full"
                        id="gift_name"
                        onchange="changeGiftPrice(this.value)"
                      >
                        <option value="" disabled="" selected="">
                          Select
                        </option>
                        <option value="6661818679401" id="giftName">
                          Starbucks Gift Card
                        </option>
                        <option value="6661817729129" id="giftName">
                          Amazon Gift Card
                        </option>
                        <option value="6661818941545" id="giftName">
                          Visa Gift Card
                        </option>
                        <option value="6661815795817" id="giftName">
                          Home Depot Gift Card
                        </option>
                        <option value="6661818253417" id="giftName">
                          Lowe's Gift Card
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <input type="checkbox" id="" name="" value="" />
                    <text className="ml-3">Add Gift Card</text>
                  </div>
                </div>
              </div>
              <div className="buttonDiv pr-5 m-2">
                <button className="bg-[#001a5f] text-[#fff] p-3">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
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

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}
