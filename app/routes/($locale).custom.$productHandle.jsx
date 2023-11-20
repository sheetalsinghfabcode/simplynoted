import {useRef, Suspense} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer, json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Await, useLocation, useNavigate} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

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
import {MessageWriting} from '~/components/products/MessageWrite';
import {AddCart} from '~/components/products/AddCart';
import {ProductInfo} from '../components/products/ProductInfo';
import DynamicButton from '~/components/DynamicButton';
import foldBack from '../../assets/Image/foldBack.png'
import CircularLoader from '~/components/CircularLoder';
export async function loader({params,context}) {
  const {productHandle} = params;
  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  })
  // console.log(params,"-----");
  const shippingData = await context.storefront.query(ShippingMethod, {
    variables: {},
  })
  return json({
    productHandle,
    data,
    shippingData
  });
}
let parameterValue;
export default function CustomProducts() {
  const {productHandle, shippingData, data} = useLoaderData();
  console.log(productHandle, '------productHandle');
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const datafornav = useLocation();
  let EditMess = datafornav.state?.data?.messageData;
  let editEndMess = datafornav.state?.data.endText;
  let editOrderValue = datafornav.state;
  let editFontFamily = datafornav.state?.data.fontFamily;
  let showBulkOnEdit = datafornav.state?.data.csvBulkData.length;
  let editFontSize = datafornav.state?.data.fontSizeMsg;
  const [show, setShow] = useState(
    showBulkOnEdit || parameterValue == 'Bulk' ? true : false,
  );
  const [productshow, setProductShow] = useState(true);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorVal, setErrorVal] = useState([]);
  const [fontFamilyName, setFontFamily] = useState('');
  const [metafields, setMetafields] = useState([]);
  const [customProductData, setCustomProductData] = useState('');
  const [imageShow,setImageShow] = useState(0)
  const [customFontName,setCustomFontName] = useState('')
  const [locationValue,setLocationValue] = useState(false)

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window?.location.search);
    parameterValue = urlParams.get('select');
    // console.log(parameterValue,"---000000");
  }

    // useEffect(() => {
    //   let result =  product.id.replace(/[^0-9]/g,"");
    //        getMetaFields(result)
    //   }, []);
     

  useEffect(() => {
    
    getProductDetails();
  }, []);
  useEffect(()=>{
    if(customProductData){
      let result =  customProductData.id.replace(/[^0-9]/g,"");
      getMetaFields(result)
    }
  },[customProductData])
  async function getProductDetails() {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/product?handleName=${productHandle}`,
      );
      const json = await res.json();
      console.log(json, 'productData');
      setCustomProductData(json.result);
      // getMetaFields(json.result)
    } catch (error) {
      console.log(error, 'productError');
    }
  }
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
      console.log(extractMetafield,")))))))))s");
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
      position: 'relative',
    },
  };
  useEffect(() => {
    localStorage.removeItem('reqFielddInCart');
    setLocationValue(true)
  }, [datafornav.pathname]);
  return (
    <>
    {customProductData.length === 0  &&
             <CircularLoader color="#ef6e6e" />

    }
      {productshow ? (
        <>
          <DynamicButton
            className="bg-[#EF6E6E] m-5 ml-[32px] w-full max-w-[150px]"
            text="Go Back"
            backArrow={true}
            onClickFunction={goBack}
          />
          <Section className="px-0 md:px-8 ">
            <div className="grid items-start md:gap-6 lg:gap-5 md:grid-cols-2">
              <div
                className={`swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 w-full`}
              >
                <div className="md:col-span-2  aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-[550px] md:h-[400px]">
                  {customProductData && (
                    <img
                      src={customProductData.images? customProductData.images[imageShow]?.originalSrc : foldBack}
                      className="object-cover w-[550px] h-[400px ] aspect-square fadeIn"
                    />
                  )}
                </div>

                <div className='flex w-[35rem]'>
                    <DynamicButton
                     className="bg-[#1b5299] m-5 ml-[32px] w-full "
                     text="VIEW CART FRONT"
                     onClickFunction={()=>setImageShow(0)}

                    />
                    <DynamicButton
                     className="bg-[#EF6E6E] m-5 ml-[32px] w-full "
                     text="VIEW CART BACK"
                     onClickFunction={()=>setImageShow(1)}
                    />
                </div>
              </div>
              {customProductData &&
              <ProductInfo
                title={customProductData?.title}
                product={customProductData}
                show={show}
                setShow={setShow}
                setShowBox={setShowBox}
                editFontFamily={editFontFamily}
                setFontFamily={setFontFamily}
                setCustomFontName={setCustomFontName}
              />
            }
            </div>
            {locationValue &&
            <MessageWriting
              show={show}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setShowBox={setShowBox}
              setProductShow={setProductShow}
              EditMess={EditMess}
              editEndMess={editEndMess}
              editFontFamily={editFontFamily}
              editFontSize={editFontSize}
              fontFamilyName={fontFamilyName}
              metafields={metafields}
            />
          }
          </Section>
          <Modal
            isOpen={modalIsOpen2}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {errorVal.map((item) => (
              <div>{item}</div>
            ))}
          </Modal>
        </>
      ) : (
        <AddCart
          show={show}
          setProductShow={setProductShow}
          data={data}
          productData={customProductData.variants.nodes[0]}
          editOrderValue={editOrderValue}
          shippingData={shippingData?.product}
          fontFamilyName={fontFamilyName}
          customFontName={customFontName}
        />
      )}
    </>
  );
}

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