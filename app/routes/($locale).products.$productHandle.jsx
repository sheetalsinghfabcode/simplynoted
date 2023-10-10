import { useRef, Suspense } from 'react';
import { Disclosure, Listbox } from '@headlessui/react';
import { defer, redirect } from '@shopify/remix-oxygen';
import { useLoaderData, Await } from '@remix-run/react';
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


export const headers = routeHeaders;
let input, input2, output, output2, outputContainer, outputContainer2, customerid, recipientAddressVal

export async function loader({ params, request, context }) {
  const { productHandle } = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const { shop, product } = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', { status: 404 });
  }

  if (!product.selectedVariant) {
    return redirectToFirstVariant({ product, request });
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

function redirectToFirstVariant({ product, request }) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const firstVariant = product.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }

  throw redirect(`/products/${product.handle}?${searchParams.toString()}`, 302);
}

export default function Product() {
  const { product, shop, recommended, variants } = useLoaderData();
  console.log(variants, '!1!!!!!!variants');
  console.log(product.variants.nodes[0].price, "productData-------------");
  const { media, title, vendor, descriptionHtml } = product;
  const { shippingPolicy, refundPolicy } = shop;
  const [name, setName] = useState('')
  console.log(name, '^^^^^^^^^^^^^^^^^^');
  const [name2, setName2] = useState('')
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [productshow, setProductShow] = useState(true)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [returnAddress, setReturnAddress] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [aiText, setaiText] = useState('')
  const [valToGen, setValToGen] = useState('')
  const [showBox, setShowBox] = useState(true)
  const [selectedFile, setSelectedFile] = useState('');
  const [fileData, setFileData] = useState([]);
  //  input = document.querySelector('.inputText');
  input2 = document.querySelector('.inputText2');
  console.log(input, "PPPPPPPPPPPPPPPPPP");

  output2 = document.querySelector('.output2');

  outputContainer2 = document.querySelector('.secDiv');


  if (input) {
    input.addEventListener('input', processInput);
  }

  function resize_to_fit() {
    let fontSize = window.getComputedStyle(output).fontSize;
    output.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
    console.log(output.clientHeight, "------------", outputContainer.clientHeight);
    if (output.clientHeight >= outputContainer.clientHeight) {
      resize_to_fit();
    }
  }

  async function processInput() {
    console.log(input.value, "PPPPPPPPPPPPPPPPPPPPPPPPPPP", this.value);

    output.innerHTML = await this.value;
    output.style.fontSize = '60px'; // Default font size
    resize_to_fit();
  }


  function resize_to_fit2() {
    let fontSize = window.getComputedStyle(output2).fontSize;
    output2.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
    console.log(output2.clientHeight, "------------", outputContainer2.clientHeight);
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
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
    var selectFont = document.getElementById("font");
    if (selectFont) {
      var selectFontValue = selectFont.options[selectFont.selectedIndex].value;
      console.log(selectFontValue, "==========");
      if (selectFontValue) {
        document.getElementById("abcd").style.fontFamily = selectFontValue;
        document.getElementById("abcd2").style.fontFamily = selectFontValue;
      }
    }
  }
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  useEffect(() => {
    input = ref.current;
    output = ref1.current;
    outputContainer = ref2.current;
    recipientAddressVal = ref3.current
    console.log(recipientAddressVal, '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7');
    customerid = localStorage.getItem('customerId')
    console.log(customerid, 'customerId----------------');
    getRecipient()
    getReturn()
  }, []);
  if (recipientAddressVal && recipientAddressVal.value) {
    console.log('@@@@@@@------------@@@@@@@@@@@@@@@@2');
  }
  console.log(recipientAddress, '-----------------recipientAddress')
  async function getRecipient() {
    try {
      const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`)
      const json = await res.json();
      console.log(json, 'getRecipient Response____________');
      setRecipientAddress(json.result)
    } catch (error) {
      console.log(error, 'Recipient error--------');
    }
  }
  async function getReturn() {
    try {
      const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=return`)
      const json = await res.json();
      console.log(json, 'getRecipient Response____________');
      setReturnAddress(json.result)
    } catch (error) {
      console.log(error, 'Recipient error--------');
    }
  }

  async function checkUserLogged() {
    console.log(customerid, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    if (customerid) {
      console.log(customerid);
      setProductShow(false)
    } else {
      alert('please Login First')
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
      position: 'relative'
    },
  };

  async function aiGenrateMess() {
    try {
      const res = await fetch('https://api.simplynoted.com/api/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNjZjBiNDAwODcwZjFmMjQ3OTA5ODUiLCJ1c2VyIjp7ImVtYWlsIjoia2FyYW5AdGhlZmFiY29kZS5vcmciLCJzaG9waWZ5SWQiOiI2MjMzNjE5MTAzODQ5IiwiX2lkIjoiNjQzY2YwYjQwMDg3MGYxZjI0NzkwOTg1IiwiZmlyc3RfbmFtZSI6InRlc3RlciIsImxhc3RfbmFtZSI6InRlc3RlciJ9LCJpYXQiOjE2ODE3MzIxNTd9.wFzXMBbN3mSy8nDIlczfkp6m_r1nshHGLCFuLz81Bkc',
        },
        body: JSON.stringify({ msg: valToGen })
      })
      const json = await res.json();
      setaiText(json.message)

      console.log(json.message, 'AiGenrated Response____________');
    } catch (error) {
      console.log(error, "error at Ai generated message ");
    }
  }
  async function onCancl() {
    setIsOpen(false)
    setValToGen(null)
    setaiText(null)
    setValue('abbabbbbb')
  }
  async function onInsetClick() {
    await setName(aiText)
    setIsOpen(false)
    setaiText('')
    setValToGen(null)


  }
  let ab
  
  async function uploadCsvFile() {
    if(!fileData.length){
      console.log('it is empty--------');
    }
    console.log(fileData.length,'length of addresses');
    ab = fileData.map((item) => {
      let bb = `${'"First Name"','"Last Name"'}`
      for( bb in item) {
        // console.log(key,'[[[[',item[key]);
        if(item[bb] === '""'){
          console.log(`${bb}`,item[bb],'field is empty');
        } else {
          // console.log(item[key],'else condition');
        }
    }
      //     if (item._id == cc) {
      //   console.log(item, 'ababababababababababaab');
      // }
    });

  }
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(false)
  const handleCheckboxChange = (item) => {
    console.log(item, '***********item');
    setSelectedItem(item);
  };

  function AfterUpload() {
    if (selectedFile) {
      setShowBox(false)
      return <div className="">
        <div>
          <h3 className='text-[green]'>Your upload was successful.</h3>
          <p >Number of recipients uploaded: <span id="card-quantity" ></span></p>
        </div>
        <div>
          <button className="bg-[#ef6e6e] text-[#fff] p-2 rounded" onClick={() => uploadCsvFile()}>
            Upload
          </button>
        </div>
      </div>
    }
    else {
      return <div></div>
    }
  }
  async function singleBtnCLick() {
    setShow(false)
    setSelectedFile('')
    setShowBox(true)
  }
  console.log(selectedFile, '$$$$$$$$$$$%%%%%%');

// CSV file converting to json
  function csvToJson(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');
    for (var i = 1; i < lines.length; i++) {
      var currentLine = lines[i].split(',');
      // Skip empty lines
      if (currentLine.length === 1 && currentLine[0].trim() === '') {
        continue;
      }
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
    return result;
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const keyToRemove = "Type";
      reader.onload = (e) => {
        const csvData = e.target.result;
        // console.log( csvData,'csVData,0000000000000000');
        let jsonData = csvToJson(csvData);
        // console.log(jsonData,'jsonData^^^^^^^^^^^^^^^^^');
        let ab = jsonData.map((item)=>{
          const newData = { ...item }
          // console.log(Object.keys(newData),'OOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
          delete newData['"Type"'];
          // console.log(newData,'&&&&&&&&&&newDataaaaaaaaaaa');
          return newData
        })

      console.log(ab,'fiteredDatat,=========');
        setSelectedFile(file); // Update the selected file state
        setFileData(ab);
      };
      reader.readAsText(file);
    }

  };
  console.log(fileData, 'fileDatatatatatatataat******************');
  // Upload CSV file Api to Amazon
  // async function uploadCsvFile() {
  //   try {
      
  //     const res = await fetch("https://api.simplynoted.com/api/orders/bulk-orders-upload-s3",
  //       {
  //         method: "POST",
  //         timeout: 0,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNiYjVhOTAwODcwZjFmMjQ3OGRjNjkiLCJ1c2VyIjp7ImVtYWlsIjoiZmFicHJvamVjdG1hbmFnZXJAZ21haWwuY29tIiwic2hvcGlmeUlkIjoiNjIzMjYyMjg5MTExMyIsIl9pZCI6IjY0M2JiNWE5MDA4NzBmMWYyNDc4ZGM2OSIsImZpcnN0X25hbWUiOiJQcmFkZWVwIiwibGFzdF9uYW1lIjoic2luZ2gifSwiaWF0IjoxNjkwNDQwNDY0fQ.5s5g9A2PtZ8Dr5dQZsd0D9wWTT2BzDioqDXzTbIJPko",
  //         },
  //         body: fileData,
  //       })
  //     console.log(res, 'CSV UPLOAD DATA ---------------');
  //   } catch (error) {
  //     console.log(error, 'file upload error');
  //   }
  // }

  // showing remaining char
  const maxMessCount = 450
  const remainingWord = maxMessCount - name.length
  const maxSignCount = 50
  const remainSign = maxSignCount - name2.length
  const arrayOfObjects = [
    { "id": "1", "name": 'John', "age": "30" },
    { "id": "2", "name": 'Alice', "age": "25" },
    { "id": "3", "name": 'Bob', "age": "35" },
  ];
  const keyToRemove = "age";

const newArray = arrayOfObjects.map((obj) => {
  // Create a copy of the object without the specified key
  const newObj = { ...obj };
  delete newObj[keyToRemove];
  return newObj;
});
console.log(newArray,'newArray,,,,,,,,,,,,,,,,,');
  return (
    <>
      {productshow ?
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
                    <Text className={'opacity-50 font-medium'}>$ {product.variants.nodes[0].price.amount}</Text>
                    {/* {vendor && (
              <Text className={'opacity-50 font-medium'}>{vendor}</Text>
            )} */}
                    <div className='buttonClass flex justify-start'>
                      <div className='buttonDiv pr-5'>
                        <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => singleBtnCLick()}>Single Card</button>
                      </div>
                      <div className='gap-2'>
                        <button className="bg-[#ef6e6e] text-[#fff] p-2 rounded " onClick={() => setShow(true)}>Bulk Purchase</button>
                      </div>
                    </div>
                    {show &&
                      <table class="price-breakdown desktop">
                        <tbody>
                          <tr>
                            <td class="label">Quantity</td><td>1-99</td><td>100-249</td><td>250-499</td><td>500-999</td><td>1000-2499</td><td>2500+</td></tr>
                          <tr>
                            <td class="label">Price</td><td>$3.25</td><td>$3.15</td><td>$3.00</td><td>$2.85</td><td>$2.70</td><td>$2.55</td></tr>
                        </tbody>
                      </table>}
                    <div className='selectOtion mb-5 flex'>
                      <div className='w-[192px]'>
                        <Text className='text-sm w-[100px]'>Standard Handwriting Style</Text>
                        <br />
                        <select id="font" onClick={() => setFont()} >
                          <option value="pinocchio" className={`font-pinocchio`}>Pinocchio</option>
                          <option value="tarzan" className={`font-tarzan`}>Tarzan</option>
                          <option value="stitch" className={`font-stitch`}>Stitch</option>
                          <option value="simba" className={`font-simba`}>Simba</option>
                          <option value="roo" className={`font-roo`}>Roo</option>
                          <option value="nimo" className={`font-nimo`}>Nimo</option>
                          <option value="lumiere" className={`font-lumiere`}>Lumiere</option>
                          <option value="kaa" className={`font-kaa`}>Kaa</option>
                          <option value="kaaNew" className={`font-kaaNew`}>KaaNew</option>
                          <option value="dumbo" className={`font-dumbo`}>Dumbo</option>
                          <option value="donald" className={`font-donald`}>Donald</option>
                          <option value="aladdin" className={`font-aladdin`}>Aladdin</option>
                          <option value="belle" className={`font-belle`}>Belle</option>
                          <option value="boo" className={`font-boo`}>Boo</option>
                          <option value="cinderella" className={`font-cinderella`}>Cinderella</option>
                          <option value="copper" className={`font-copper`}>Copper</option>
                          <option value="jasmine" className={`font-jasmine`}>Jasmine</option>
                          <option value="merlin" className={`font-merlin`}>Merlin</option>
                          <option value="goofy" className={`font-goofy`}>Goofy</option>
                          <option value="hercules" className={`font-hercules`}>Hercules</option>
                          <option value="rafiki" className={`font-rafiki`}>Rafiki</option>
                          <option value="rapunzel" className={`font-rapunzel`}>Rapunzel</option>
                          <option value="ratigan" className={`font-ratigan`}>Ratigan</option>
                          <option value="sarabi" className={`font-sarabi`}>Sarabi</option>
                          <option value="scar" className={`font-scar`}>Scar</option>
                          <option value="triton" className={`font-triton`}>Triton</option>
                          <option value="woody" className={`font-woody`}>Woody</option>

                        </select>
                      </div>
                      <div>
                        <Text className='text-sm'>Custom Handwriting Style</Text>
                        <br />
                        <select id="Coustomfont text-sm"  >
                          <option className='text-sm'>Custom Handwriting Style</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Text>Optional shipping date</Text><br />
                      <input type='date' />
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
            <div className='mainDivForBox flex gap-10'>
              <div id="outer" className="outerr">
                <div className='outerSec' ref={ref2}>
                  <div id='abcd' ref={ref1} className="output m-5">
                    {name}
                  </div>
                </div>
                <div className='secDiv'>
                  <div id='abcd2' className="output2">
                    {name2}
                  </div>
                </div>

              </div>
              <div className='textAreaView w-[600px]'>

                <textarea type="text" id="example-one-input" value={name} placeholder="Enter your custom message text here..." ref={ref} className='inputText' maxlength="450" onChange={(e) => setName(e.target.value)} data-gtm-form-interact-field-id="0">
                </textarea>
                <span className="charLeft">{remainingWord} characters remaining</span>

                <div className='flex gap-4 mt-5' >
                  <text className='cursor-pointer' onClick={() => setIsOpen(true)}>Try our new AI Assistant to <br /> help write your message</text>
                  <textarea type="text" v-model="keyword" id="example-one-input2" className='inputText2' maxlength="24" onChange={(e) => setName2(e.target.value)} placeholder="Enter here..." data-gtm-form-interact-field-id="0">
                  </textarea><br/>
                </div>
                <span className="charLeft ml-40">{remainSign} characters remaining</span>

                {show &&
                  <>
                    <div className='w-[263px] mt-10 font-bold'>
                      <text>As of july5,2023, we have upgraded the bulk order template.Please download the new template below</text>
                    </div>


                    <div className='custom_testing'>
                      <div >
                        <h3 className='font-bold'>Bulk Address Upload</h3>
                      </div>
                      <div>
                        <div >
                          <input type="file" name="file" accept=".csv" className="upload-input" onChange={(e) => handleFileChange(e)} />
                        </div>
                      </div>
                      <p> Download the<a href="https://api.simplynoted.com/docs/bulk-template" className='text-[blue]'> Bulk Order Template</a> </p>
                      <AfterUpload />
                    </div>
                  </>}
                {!show &&
                  <div className='bg-[#1b5299] h-[50px] text-center mt-10'>
                    <button className='text-[#fff] items-center justify-center mt-3 w-full' onClick={() => checkUserLogged()}>Next</button>
                  </div>
                }

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
            <div className='flex'>
              <h2 className='font-bold text-xl w-[600px]'>AI Message Assistant</h2>
              <BsXCircle className='' onClick={() => onCancl()} />
            </div>
            <div>
              <text className=' text-[#999999]'>Type in words or a phrase to use our AI Assistant to<br /> help generate a great message</text>
            </div>
            <div>
              <textarea type="text" id="aiTextArea" value={aiText ? aiText : valToGen} onChange={(e) => setValToGen(e.target.value)} placeholder="Example: Message for Birthday" maxlength="450"></textarea>
            </div>
            {!aiText ?

              <div class="ai-generate" >
                <button id="generate-msg" disabled="" onClick={() => aiGenrateMess()}>Generate Message</button>
              </div> :
              <div className='buttonClass flex justify-start'>
                <div className='buttonDiv pr-5'>
                  <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => onInsetClick()}>Insert</button>
                </div>
                <div className='gap-2'>
                  <button className="bg-[#f0f0f0] text-[black] p-2 rounded " onClick={() => setShow(true)}>Cancel</button>
                </div>
              </div>
            }
          </Modal>
        </>
        : <div className='  w-full h-full gap-2 mt-8'>

          <h3 className='items-center font-bold flex text-2xl' onClick={() => setProductShow(true)}><BiSolidChevronLeft size='50px' />Back To Product Customization</h3>
          <div className='row flex mr-2 ml-2 gap-4'>
            <div className='col-6 w-[50%] '>
              <div className='address-grid'>
                <div className='address-data'>
                  <h3 className='text-2xl font-bold mt-4 mb-4'>Your Info (return/sender address)</h3>

                  <div className='buttonDiv pr-5 mt-2'>
                    <button className="bg-[#001a5f] text-[#fff] p-3">New Address</button>
                  </div>
                  <div>
                    <input type="text " className='w-full rounded p-3 mt-4' placeholder='Search Addresses...' />
                  </div>
                  {returnAddress.map((item) =>
                    <div className='w-full rounded p-3 mt-4 bg-[#fff] '>
                      <input type="checkbox" className='mr-4' id={item.id} />
                      <span > {item.id} {item.firstName} {item.lastName}, {item.city}, {item.state}, {item.zip}, {item.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 w-[50%]'>
              <div className='address-grid'>
                <div className='address-data'>
                  <h3 className='text-2xl font-bold mt-4 mb-4'>Recipient address</h3>
                  {show ?
                    <div>
                      <text>
                        Recipient addresses were specified in your bulk order upload.
                      </text>
                    </div>
                    :
                    <>
                      <div className='buttonDiv pr-5 mt-2'>
                        <button className="bg-[#001a5f] text-[#fff] p-3">New Address</button>
                      </div>
                      <div>
                        <input type="text " className='w-full rounded p-3 mt-4 ' placeholder='Search Addresses...' />
                      </div>
                      {recipientAddress.map((item) =>
                        <div className='w-full rounded p-3 mt-4 bg-[#fff] '>
                          <input
                            type="checkbox"
                            value={item}
                            checked={selectedItem === item}
                            onChange={() => handleCheckboxChange(item)}
                          />
                          {/* <input type="checkbox" className='mr-4'id={item._id} onClick={()=>getAddressData(item._id)} /> */}
                          {item.id} {item.firstName} {item.lastName}, {item.city}, {item.state}, {item.zip}, {item.country}
                        </div>
                      )}</>}


                </div>
              </div>
            </div>
          </div>
          <div className='row flex mr-2 ml-2 gap-4'>
            <div className='col-6 w-[50%] '>
              <div className='address-grid'>
                <h3 className='text-2xl font-bold mt-4 mb-4'>Shipping Methods</h3>

                <div class="shipping-methods" id="shipping-options">
                  <div key="7027299254377" class="getProductId">
                    <div>
                      <input data-product-url="/products/shipping-methods" checked="" id="Mail-Individual-Cards-Normally-(default)" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526056041" />
                      <label for="Mail-Individual-Cards-Normally-(default)">Mail Individual Cards Normally (default)</label>
                    </div>
                    <div class="custom_variant_price">$0.00</div>
                  </div>

                  <div key="7027299254377" class="getProductId">
                    <div>
                      <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk-with-Envelopes-Addressed--Sealed--and-Stamped" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526088809" />
                      <label for="Ship-Cards-in-Bulk-with-Envelopes-Addressed--Sealed--and-Stamped">Ship Cards in Bulk with Envelopes Addressed, Sealed, and Stamped</label>
                    </div>
                    <div class="custom_variant_price">$49.00</div>
                  </div>

                  <div key="7027299254377" class="getProductId">
                    <div>
                      <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-plus-Blank-Envelopes-Unsealed" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526121577" />
                      <label for="Ship-Cards-in-Bulk---Cards-plus-Blank-Envelopes-Unsealed">Ship Cards in Bulk - Cards plus Blank Envelopes Unsealed</label>
                    </div>
                    <div class="custom_variant_price">$49.00</div>
                  </div>

                  <div key="7027299254377" class="getProductId">
                    <div>
                      <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-Only" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526154345" />
                      <label for="Ship-Cards-in-Bulk---Cards-Only">Ship Cards in Bulk - Cards Only</label>
                    </div>
                    <div class="custom_variant_price">$49.00</div>
                  </div>

                  <div key="7027299254377" class="getProductId">
                    <div>
                      <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed--Unsealed--Not-Stamped" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526187113" />
                      <label for="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed--Unsealed--Not-Stamped">Ship Cards in Bulk - Cards Plus Envelopes Addressed, Unsealed, Not Stamped</label>
                    </div>
                    <div class="custom_variant_price">$49.00</div>
                  </div>

                  <div key="7027299254377" class="getProductId">
                    <div>
                      <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed-and-Sealed--Not-Stamped" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526219881" />
                      <label for="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed-and-Sealed--Not-Stamped">Ship Cards in Bulk - Cards Plus Envelopes Addressed and Sealed, Not Stamped</label>
                    </div>
                    <div class="custom_variant_price">$49.00</div>
                  </div>


                </div>
              </div>
            </div>
            <div className='col-6 w-[50%]'>
              <div className='address-grid mt-10'>
                <div className='address-data'>
                  <h3 className='text-2xl font-bold mt-6 mb-6'>Add a Gift Card</h3>
                  <div className='row flex mr-2 ml-2 '>
                    <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Card:</div>
                    <div className='col-8 mt-3 pr-0 w-[370px]' >
                      <select name="gift_name" className='w-full' id="gift_name" onchange="changeGiftPrice(this.value)" >
                        <option value="" disabled="" selected="">Select</option>
                        <option value="6661818679401" id="giftName">Starbucks Gift Card</option>
                        <option value="6661817729129" id="giftName">Amazon Gift Card</option>
                        <option value="6661818941545" id="giftName">Visa Gift Card</option>
                        <option value="6661815795817" id="giftName">Home Depot Gift Card</option>
                        <option value="6661818253417" id="giftName">Lowe's Gift Card</option>
                      </select>
                    </div>
                  </div>
                  <div className='row flex mr-2 ml-2 '>
                    <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Price:</div>
                    <div className='col-8 mt-3 pr-0 w-[370px]' >
                      <select name="gift_name" className='w-full' id="gift_name" onchange="changeGiftPrice(this.value)" >
                        <option value="" disabled="" selected="">Select</option>
                        <option value="6661818679401" id="giftName">Starbucks Gift Card</option>
                        <option value="6661817729129" id="giftName">Amazon Gift Card</option>
                        <option value="6661818941545" id="giftName">Visa Gift Card</option>
                        <option value="6661815795817" id="giftName">Home Depot Gift Card</option>
                        <option value="6661818253417" id="giftName">Lowe's Gift Card</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <input type="checkbox" id="" name="" value="" />
                    <text className='ml-3'>Add Gift Card</text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='buttonDiv pr-5 m-2'>
            <button className="bg-[#001a5f] text-[#fff] p-3">Add To Cart</button>
          </div>

        </div>
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
    variables: { productId, count: 12 },
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

  return { nodes: mergedProducts };
}
