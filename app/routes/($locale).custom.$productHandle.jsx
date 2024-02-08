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
import foldBack from '../../assets/Image/foldBack.png';
import flatCardImg from '../../assets/Image/flatCustomImg.png';
import CircularLoader from '~/components/CircularLoder';
export async function loader({params, context}) {
  const {productHandle} = params;
  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  });
  // console.log(params,"-----");
  const shippingData = await context.storefront.query(ShippingMethod, {
    variables: {},
  });
  return json({
    productHandle,
    data,
    shippingData,
  });
}
let parameterValue;
export default function CustomProducts() {
  const {productHandle, shippingData, data} = useLoaderData();
  // console.log(productHandle, '------productHandle');
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const datafornav = useLocation();
  let EditMess = datafornav.state?.data?.messageData;
  let editEndMess = datafornav.state?.data.endText;
  let editOrderValue = datafornav.state;
  let editFontFamily = datafornav.state?.data.fontFamily;
  let showBulkOnEdit = datafornav.state?.data.csvBulkData.length;
  let editFontSize = datafornav.state?.data.fontSizeMsg;
  let editCustomFontFamily = datafornav.state?.data.customFontName;
  let editLineHeight = datafornav.state?.data.lineHeight;
  let editSignOffLineHeight = datafornav.state?.data.signOffLineHeight;
  let editSignOffFontSize = datafornav.state?.data.signOffFontSize;
  const [show, setShow] = useState(
    showBulkOnEdit || datafornav.search == '?select=Bulk' ? true : false,
  );
  const [productshow, setProductShow] = useState(true);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorVal, setErrorVal] = useState([]);
  const [fontFamilyName, setFontFamily] = useState('tarzan');
  const [metafields, setMetafields] = useState([]);
  const [customProductData, setCustomProductData] = useState('');
  const [imageShow, setImageShow] = useState(0);
  const [customFontName, setCustomFontName] = useState('');
  const [locationValue, setLocationValue] = useState(false);
  const [qrValue, setQrValue] = useState([]);

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
  useEffect(() => {
    if (customProductData) {
      let result = customProductData.id.replace(/[^0-9]/g, '');
      getMetaFields(result);
    }
  }, [customProductData]);
  async function getProductDetails() {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/product?handleName=${productHandle}`,
      );
      const json = await res.json();
      // console.log(json, 'productData');
      setCustomProductData(json.result);
      // getMetaFields(json.result)
    } catch (error) {
      console.error(error, 'productError');
    }
  }
  async function getMetaFields(id) {
    try {
      const queryEndPoint = `https://api.simplynoted.com/api/storefront/product/product-metafields`;
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
      let extractedData = json.result.metafields[0].value;
      let extractMetafield = JSON.parse(extractedData);
      // console.log(extractMetafield, 'extractMetafield');
      setMetafields(extractMetafield);
      let key = 'is_customised';
      let key2 = 'qrImage';
      let qrData = json.result.metafields[1];
      let newData = json.result.metafields;
      let dataAfterChecking = newData.filter(
        (item) => key.includes(item.namespace) && key2.includes(item.key),
      );
      // console.log(dataAfterChecking[0].value, 'filter QR Data');
      if (qrData.namespace == 'is_customised') {
        setQrValue(dataAfterChecking[0].value);
      }
    } catch (error) {
      console.error(error, 'shopify');
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
  useEffect(() => {
    localStorage.removeItem('reqFielddInCart');
    setLocationValue(true);
  }, [datafornav.pathname]);
  // console.log(metafields.back, 'metafields.back.zoom');
  return (
    <div className="relative">
      {customProductData.length === 0 && metafields.length === 0 && (
        <div className="z-[50] absolute top-[40%] left-[50%]">
          <CircularLoader color="#ef6e6e" />
        </div>
      )}
      {productshow ? (
        <>
          <DynamicButton
            className="bg-[#EF6E6E] m-5 ml-[32px] w-full max-w-[150px]"
            text="Go Back"
            backArrow={true}
            onClickFunction={goBack}
          />
          <Section
            className={`px-0 md:px-8
           ${
             customProductData.length === 0 &&
             metafields.length === 0 &&
             'opacity-40'
           } `}
          >
            <div className="flex flex-wrap md:flex-row flex-col w-full lg:gap-[10px] gap-[30px]">
              <div
                className={`swimlane flex flex-col hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 md:w-[50%] w-full mb-0 `}
              >
                <div
                  className="md:aspect-[4/5]',
          'aspect-square snap-center card-image bg-white dark:bg-contrast/10  md:w-[92%] md:h-[386px] h-[100%] w-full "
                >
                  {customProductData &&
                    metafields &&
                    metafields.cardType == 'folded5x7' && (
                      <img
                        style={{
                          transform: `scale(${
                            imageShow == 0
                              ? metafields.face && metafields.face.zoom
                              : metafields.back && metafields.back.zoom
                          })`,
                        }}
                        src={
                          customProductData.images.length
                            ? customProductData.images[imageShow].originalSrc
                            : foldBack
                        }
                        className="object-contain  fadeIn md:w-[583px] md:h-[386px] h-full w-full"
                      />
                    )}
                  {/* {metafields && metafields.face.zoom}------ */}
                  {customProductData && metafields.cardType !== 'folded5x7' && (
                    <img
                      style={{
                        transform: `scale(${
                          imageShow == 0
                            ? metafields.face && metafields.face.zoom
                            : metafields.back && metafields.back.zoom
                        })`,
                      }}
                      src={
                        customProductData.images.length
                          ? customProductData.images[imageShow].originalSrc
                          : flatCardImg
                      }
                      className="object-contain  fadeIn  md:w-[583px] md:h-[386px] h-full w-full"
                    />
                  )}
                </div>
                {customProductData &&
                  customProductData.images.length > 1 &&
                  metafields &&
                  metafields.cardType == 'folded5x7' && (
                    <div className="flex md:w-[92%] w-full gap-[10px]">
                      <button
                        style={{
                          backgroundColor:
                            imageShow == '0' ? '#001a5f' : '#ef6e6e',
                        }}
                        className={`bg-[#1b5299]  w-full p-2 text-[#fff]`}
                        onClick={() => setImageShow(0)}
                      >
                        VIEW CARD FRONT
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            imageShow == '1' ? '#001a5f' : '#ef6e6e',
                        }}
                        className="bg-[#EF6E6E]   w-full p-2 text-[#fff]"
                        onClick={() => setImageShow(1)}
                      >
                        VIEW CARD BACK
                      </button>
                    </div>
                  )}
              </div>
              {customProductData && (
                <ProductInfo
                  title={customProductData?.title}
                  product={customProductData}
                  show={show}
                  setShow={setShow}
                  setShowBox={setShowBox}
                  editFontFamily={editFontFamily}
                  setFontFamily={setFontFamily}
                  setCustomFontName={setCustomFontName}
                  editCustomFontFamily={editCustomFontFamily}
                />
              )}
            </div>
            {locationValue && (
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
                qrValue={qrValue}
                editLineHeight={editLineHeight}
                editSignOffFontSize={editSignOffFontSize}
                editSignOffLineHeight={editSignOffLineHeight}
              />
            )}
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
    </div>
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

  `;

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
}`;
