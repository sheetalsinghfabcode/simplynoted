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
import { getApi, postApi } from '~/utils/ApiService';
import { API_PATH } from '~/utils/Path';
import { useStateContext } from '~/context/StateContext';
export async function loader({params, context}) {
  const {productHandle} = params;
  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  });
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
  let editShippingDate = datafornav.state?.data.optionalShipDate
  const [show, setShow] = useState(
    showBulkOnEdit || datafornav.search == '?select=Bulk' ? true : false,
  );
  const {productshow, cartData} = useStateContext()
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorVal, setErrorVal] = useState([]);
  const [fontFamilyName, setFontFamily] = useState();
  const [metafields, setMetafields] = useState([]);
  const [customProductData, setCustomProductData] = useState('');
  const [imageShow, setImageShow] = useState(0);
  const [customFontName, setCustomFontName] = useState('');
  const [locationValue, setLocationValue] = useState(false);
  const [qrValue, setQrValue] = useState([]);

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window?.location.search);
    parameterValue = urlParams.get('select');
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
      const res = await 
      // getApi(`${API_PATH.GET_HANDLE_NAME}${productHandle}`)
      fetch(
        `https://api.simplynoted.com/api/storefront/product?handleName=${productHandle}`,
      );
      const json = await res.json();
      // console.log(json.result,"EEEEEEEE");
      setCustomProductData(json.result);
      // getMetaFields(json.result)
    } catch (error) {
      console.error(error, 'productError');
    }
  }
  async function getMetaFields(id) {
    try {
      const queryEndPoint = `https://api.simplynoted.com/api/storefront/product/product-metafields`;
      const data = await 
      // postApi(API_PATH.GET_METAFIELDS, {productId: id})
       fetch(queryEndPoint, {
        method: 'POST',
        body: JSON.stringify({
          productId: id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await data.json();
      let extractedData = json.result.metafields[0].value;
      let extractMetafield = JSON.parse(extractedData);
      setMetafields(extractMetafield);
      let key = 'is_customised';
      let key2 = 'qrImage';
      let qrData = json.result.metafields[1];
      let newData = json.result.metafields;
      let dataAfterChecking = newData.filter(
        (item) => key.includes(item.namespace) && key2.includes(item.key),
      );
      if (qrData.namespace == 'is_customised') {
        setQrValue(dataAfterChecking[0].value);
      }
    } catch (error) {
      
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

  return (
    <div className="relative">
      {customProductData.length === 0 && metafields.length === 0 && (
        <div className="z-[50] absolute top-[40%] left-[50%]">
          <CircularLoader color="#ef6e6e" />
        </div>
      )}
      {productshow ? (
        <>
          <Section
            className={`px-0 md:px-8
           ${
             customProductData.length === 0 &&
             metafields.length === 0 &&
             'opacity-40'
           } `}
          >
            <div className="flex flex-wrap md:flex-row flex-col w-full lg:gap-[10px] gap-[30px] justify-between">
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
              <div
                
                className={`swimlane flex flex-col hiddenScroll p-0 md:overflow-x-auto md:grid-cols-2 md:w-[48%] w-full max-h-[400px] justify-center items-end`}
              >
                <div
                  className="product-image-cont card-image self-center  bg-white dark:bg-contrast/10  sm:h-[240px] sm:w-[345px] md:w-[400px] xl:w-[544px] lg:w-[460px] md:h-[307px]  w-full"
                >
                  {customProductData &&
                    metafields &&
                    metafields.cardType == 'folded5x7' && (
                      <img
                        // style={{
                        //   transform: `scale(${
                        //     imageShow == 0
                        //       ? metafields.face && metafields.face.zoom
                        //       : metafields.back && metafields.back.zoom
                        //   })`,
                        // }}

                       

                        src={
                          customProductData.images.length
                            ? customProductData.images[imageShow].originalSrc
                            : foldBack
                        }
                        className="object-fit-inherit fadeIn h-full w-full"
                      />
                    )}
                  {/* {metafields && metafields.face.zoom}------ */}
                  {customProductData && metafields.cardType !== 'folded5x7' && (
                    <img
                      // style={{
                      //   transform: `scale(${
                      //     imageShow == 0
                      //       ? metafields.face && metafields.face.zoom
                      //       : metafields.back && metafields.back.zoom
                      //   })`,
                      // }}
                      src={
                        customProductData.images.length
                          ? customProductData.images[imageShow].originalSrc
                          : flatCardImg
                      }
                      className="object-fit-inherit fadeIn h-full w-full"
                    />
                  )}
                </div>
                {customProductData &&
                  customProductData.images.length > 1 &&
                  metafields &&
                  metafields.cardType == 'folded5x7' && (
                    <div className="flex w-full gap-[10px]">
                      <DynamicButton
                        className={`${
                          imageShow == '0' ? 'bg-[#001a5f]' : 'bg-[#ef6e6e]'
                        } w-[100%] text-[#fff] py-[14px] px-[8px] font-normal text-base rounded`}
                        text="VIEW CARD FRONT"
                        onClickFunction={() => setImageShow(0)}
                      />
                      <DynamicButton
                        className={`${
                          imageShow == '1' ? 'bg-[#001a5f]' : 'bg-[#ef6e6e]'
                        } w-[100%] text-[#fff] py-[14px] px-[8px] font-normal text-base rounded`}
                        text="VIEW CARD BACK"
                        onClickFunction={() =>customProductData.images.length >2 ?setImageShow(2):setImageShow(1) }
                      />
                    </div>
                  )}
              </div>
            </div>
            {locationValue && (
              <MessageWriting
              show={show}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setShowBox={setShowBox}
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
              qrValue={qrValue}
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
            {errorVal.map((item,index) => (
              <div key={index}>{item}</div>
            ))}
          </Modal>
        </>
      ) : (
        <AddCart
          show={show}
          data={data}
          productData={ customProductData?.variants ? customProductData.variants.nodes[0]:''}
          editOrderValue={editOrderValue}
          shippingData={shippingData?.product}
          fontFamilyName={fontFamilyName}
          customFontName={customFontName}
          variantsVal={customProductData}
          metafields={metafields?metafields:null}
          productId={customProductData?.id}
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
