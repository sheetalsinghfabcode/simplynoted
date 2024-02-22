import React, {useEffect, useState} from 'react';
import {defer, json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Await} from '@remix-run/react';
import Modal from 'react-modal';
import {BsXCircle} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {useNavigate} from '@remix-run/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import ConfirmationModal from '~/components/modal/ConfirmationModal';
import DynamicButton from '~/components/DynamicButton';
// import { RiDeleteBin5Line } from "react-icons/Ri";
import {HiArrowLongRight} from 'react-icons/hi2';
import {CheckoutData} from '../components/Checkout';
import DynamicTitle from '../components/Title';
import CircularLoader from '~/components/CircularLoder';
import {useStateContext} from '~/context/StateContext';
import {RiDeleteBin6Line} from 'react-icons/ri';
import LoginModal from '~/components/modal/LoginModal';
import {seoPayload} from '~/lib/seo.server';

let storedDataString, storedDataArray;

export async function loader({context, request}) {
  const StripeKey =
    'pk_test_51NWJuCKwXDGuBPYABUNXd2dplCTxFziZU0QVQJpYTQmh0d59BUFAZNX2J8FhN74jBjMFUOF0tqrlEDMIRKaei2e800kPIWqGnz';

  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  });
  const postalData = await context.storefront.query(PostalProduct, {
    variants: {},
  });
  // const formData = new FormData()
  // formData.append("name","ayush")
  const seo = seoPayload.cart()
  return defer({
    data,
    postalData,
    StripeKey,
    seo
  });
}

export default function AddCartFunc() {
  const {setCartCountVal, customerId} = useStateContext();

  const {data, postalData, StripeKey} = useLoaderData();
  const [cartData, setCartData] = useState([]);
  const [updateGift, setUpdateGift] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [cardPriceVal, setCardPriceVal] = useState([]);
  const [cardPrice, setCardPrice] = useState('');
  const [cardName, setCardName] = useState('');
  const [giftCardId, setGiftCardId] = useState('');
  const [giftProdUrl, setGiftProdUrl] = useState('');
  const [cardVal, setCardVal] = useState('');
  const [cardImg, setCardImage] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postalId, setPostalId] = useState('');
  const [postalId2, setPostalId2] = useState('');
  const [postTitle2, setPostTitle2] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postPrice2, setPostPrice2] = useState('');
  const [postImage, setPostImage] = useState('');
  const [msgShow, setMsgShow] = useState('');
  const [msgFont, setMsgFont] = useState('');
  const [msgFontSize, setMsgFontSize] = useState('');
  const [msglastText, setMsglastText] = useState('');
  const [reciverAddress, setReciverAddress] = useState('');
  const [bulkAddress, setBulkAddress] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const [clearCartModal, setClearCartModal] = useState(false);
  const [deleteOrderIndex, setDelOrderIndex] = useState(null);
  const [delCardIndex, setDelCardIndex] = useState(null);
  const [showCartPage, setShowCartPage] = useState(true);
  const [totalPrize, setTotalPrize] = useState('');
  const [agree, setAgree] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [cartNote, setCartNote] = useState('');

  useEffect(() => {
    storedDataString = localStorage.getItem('mydata')
      ? JSON.parse(localStorage.getItem('mydata'))
      : [];
    setCartData(storedDataString);
    localStorage.setItem('cartCount', JSON.stringify(storedDataString.length));
    let totalCartCount = localStorage.getItem('cartCount')
      ? JSON.parse(localStorage.getItem('cartCount'))
      : 0;
    setCartCountVal(totalCartCount);

    if (postalData) {
      setPostalValue();
    }
    if (postPrice) {
      subTotalAmount(storedDataString);
    }
  }, [updateGift, postPrice]);

  async function setPostalValue() {
    let postalTit = postalData.product.variants.edges[0].node.title;
    let postalID = postalData.product.variants.edges[0].node.id;
    let postalID2 = postalData.product.variants.edges[1].node.id;
    let postalrate = postalData.product.variants.edges[0].node.price.amount;
    let postalTit2 = postalData.product.variants.edges[1].node.title;
    let postalrate2 = postalData.product.variants.edges[1].node.price.amount;
    let postalImag = postalData.product.variants.edges[1].node.image;
    setPostTitle(postalTit);
    setPostTitle2(postalTit2);
    setPostalId(postalID.match(/\d+/g).join(''));
    setPostalId2(postalID2.match(/\d+/g).join(''));
    setPostPrice(postalrate);
    setPostPrice2(postalrate2);
    setPostImage(postalImag.url);
  }
  let keyToUpdate1 = 'giftCardName';
  let keyToUpdate2 = 'giftCardImg';
  let keyToUpdate3 = 'giftCardPrice';
  let keyToUpdate4 = 'giftCardId';
  let keyToUpdate5 = 'giftCardProdUrl';
  function updateValueInArray(index) {
    setUpdateGift(!updateGift);
    // Check if the index is valid
    if (index >= 0 && index < cartData.length) {
      // Update the key's value
      cartData[index][keyToUpdate1] = cardName;
      cartData[index][keyToUpdate2] = cardImg;
      cartData[index][keyToUpdate3] = cardPrice;
      cartData[index][keyToUpdate4] = giftCardId;
      cartData[index][keyToUpdate5] = giftProdUrl;
    }
    localStorage.setItem('mydata', JSON.stringify(cartData));
    setCardPrice('');
    setIsOpen(false);
  }
  function deleteKeyInArray(index) {
    setUpdateGift(!updateGift);
    // Check if the index is valid
    if (index >= 0 && index < cartData.length) {
      // Delete the key from the object
      cartData[index][keyToUpdate1] = null;
      cartData[index][keyToUpdate2] = null;
      cartData[index][keyToUpdate3] = null;
      cartData[index][keyToUpdate4] = null;
    }
    localStorage.setItem('mydata', JSON.stringify(cartData));
    setDeleteCardModal(false);
  }
  function confirmCardDel(index) {
    setDeleteCardModal(true);
    setDelCardIndex(index);
  }
  function clearCartBtn() {
    setClearCartModal(true);
  }

  function clearCart() {
    setUpdateGift(!updateGift);
    localStorage.removeItem('mydata');
    setClearCartModal(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Make the scroll behavior smooth
    });
  }

  function ConfirmDeleteOrder(index) {
    setDelOrderIndex(index);
    setDeleteModal(true);
  }

  function deleteOrder(index) {
    setUpdateGift(!updateGift);
    // if (index >= 0 && index < cartData.length) {
    // Delete the order
    cartData.splice(index, 1);
    // delete cartData[index];
    // }
    localStorage.setItem('mydata', JSON.stringify(cartData));
    localStorage.setItem('cartCount', JSON.stringify(cartData.length));
    setDeleteModal(false);
  }

  function editOrderData(index) {
    // navigate(,{state:{index:'index'}})
    let data = cartData[index];
    let ab = cartData[index].productGetUrl;
    navigate(`${ab}`, {state: {data: data, index: index}});
  }
  const navigate = useNavigate();

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: '9999',
    },
    content: {
      top: '50%',
      left: '50%',
      bottom: '0',
      transform: 'translate(-50%, -50%)',
      maxWidth: '780px',
      width: '90%',
      padding: '30px',
      height: 'fit-content',
      maxHeight: '80%',
      zIndex: '10000',
      background: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
    },
  };



  function continueShopping() {
    navigate('/collections/best-sellers');
  }
  async function OpenModalFunc(item) {
    setIsOpen(true);
    setCardVal(item);
  }
  async function OpenModalFunc2(item) {
    setIsOpen2(true);
    // setCardVal(item)
    if (cartData[item].csvBulkData.length) {
      setBulkAddress(cartData[item].csvBulkData);
      setMsgFont(cartData[item].fontFamily);
      setMsgFontSize(cartData[item].fontSizeMsg);
      setMsgShow(cartData[item].messageData);
      setMsglastText(cartData[item].endText);
    } else {
      setMsgFont(cartData[item].fontFamily);
      setMsgShow(cartData[item].messageData);
      setMsgFontSize(cartData[item].fontSizeMsg);
      setReciverAddress(cartData[item].reciverAddress);
      setMsglastText(cartData[item].endText);
    }
  }

  const cardvalFunc = async (item) => {
    let selCardName = data.collection.products.edges[item].node;

    setCardName(selCardName.title);
    setCardImage(selCardName.featuredImage.url);
    setGiftProdUrl(selCardName.onlineStoreUrl);
    let arrCardPrice = data.collection.products.edges[item].node.variants.edges;
    let firstPrice = arrCardPrice[0].node.price.amount;
    setGiftCardId(arrCardPrice[0].node.id.match(/\d+/g).join(''));
    setCardPrice(firstPrice);
    setCardPriceVal(arrCardPrice);
    // await AfterCardSel(ab)
  };
  const priceValFunc = async (item) => {
    setCardPrice(item);
  };
  function closeModal() {
    setBulkAddress([]);

    setIsOpen2(false);
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < bulkAddress.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  async function subTotalAmount(cartData) {
    const prices = cartData.reduce(
      (sum, cartData) =>
        sum +
        (cartData.price * cartData.csvFileLen +
          cartData.giftCardPrice * cartData.csvFileLen +
          ((cartData.shippingData &&
            cartData.shippingData.node?.title ==
              'Ship Cards in Bulk - Cards plus Blank Envelopes Unsealed') ||
          (cartData.shippingData &&
            cartData.shippingData.node?.title ==
              'Ship Cards in Bulk - Cards Only') ||
          (cartData.shippingData &&
            cartData.shippingData.node?.title ==
              'Ship Cards in Bulk - Cards Plus Envelopes Addressed, Unsealed, Not Stamped') ||
          (cartData.shippingData &&
            cartData.shippingData.node?.title ==
              'Ship Cards in Bulk - Cards Plus Envelopes Addressed and Sealed, Not Stamped')
            ? 0
            : cartData.usCount || cartData.nonUSCount
            ? postPrice * cartData.usCount + postPrice2 * cartData.nonUSCount
            : cartData.reciverAddress?.country === 'USA' ||
              cartData.reciverAddress?.country?.toLowerCase() === '' ||
              cartData.reciverAddress?.country?.toLowerCase() === ' ' ||
              cartData.reciverAddress?.country?.toLowerCase() === 'u.s.a' ||
              cartData.reciverAddress?.country?.toLowerCase() === 'u.s' ||
              cartData.reciverAddress?.country?.toLowerCase() === 'usa' ||
              cartData.reciverAddress?.country?.toLowerCase() === 'us' ||
              cartData.reciverAddress?.country?.toLowerCase() === 'america' ||
              cartData.reciverAddress?.country?.toLowerCase() ===
                'united states' ||
              cartData.reciverAddress?.country?.toLowerCase() ===
                'united states of america' ||
              cartData.reciverAddress?.country?.toLowerCase() == undefined
            ? postPrice * cartData.csvFileLen
            : postPrice2 * cartData.csvFileLen) +
          (cartData.isShippidata ? cartData.shippingDataCost * 1 : 0)),
      0,
    );
    setTotalPrize(prices);
  }

  return (
    <div className="global-max-width-handler">
      {showCartPage ? (
        <>
          <div className="w-full h-full gap-2 mt-14">
            {cartData && cartData.length > 0 ? (
              <>
                <DynamicTitle
                  title={'SHOPPING CART'}
                  className="md:text-[40px] text-[24px]"
                />
                <>
                  {cartData.length === 0 && <CircularLoader color="#ef6e6e" />}
                  {cartData &&
                    cartData.map((item, index) => (
                      <div key={index} className="w-[90%] bg-[white] md:px-[30px] m-auto mt-10 mb-10 p-[20px] rounded-[10px] shadow-inset-custom">
                        <div className="flex w-[100%] flex-wrap space-between lg:border-none border-b-[1px] border-[#AAA]">
                          <div className="lg:max-w-[50%] min-w-[150px] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px] border-[#AAA] lg:pb-[15px]">
                            <div className="flex w-full justify-start sm:flex-row flex-col">
                              <div className="lg:max-w-[33%] sm:max-w-[22%] min-w-[80px] md:m-5 sm:m-3 mx-auto w-[50%] sm:mt-[30px] mt-4 rounded-[10px] overflow-hidden">
                                <img src={item.productImg} alt="" />
                              </div>
                              <div className="mt-[30px] font-bold flex flex-col xl:gap-[16px] lg:gap-[5px] w-full sm:px-0 px-[20px]">
                                <h3 className="text-[#1b5299] font-karla lg:text-[20px] sm:text-[18px] text-[22px] font-bold">
                                  {item.productTitle}
                                </h3>
                                <div className="flex flex-wrap ">
                                  <span className="font-karla text-[#1b5299] text-[16px] font-bold ">
                                    {' '}
                                    Sender:
                                  </span>
                                  <span className=" text-[black] font-normal inline-flex ml-[10px] md:text-[16px] text-[12px] ">
                                    {' '}
                                    {item.senderAddress.address1}
                                    <br className="sm:block hidden" />
                                    {item.senderAddress.city},
                                    {item.senderAddress.state}
                                    {item.senderAddress.zip},
                                    {item.senderAddress.country}
                                  </span>
                                </div>
                                <div className="buttonDiv mt-2">
                                  <button
                                    className="bg-[#EF6E6E] text-[#fff]  p-[10px] rounded-[10px] font-inter text-xs sm:w-auto w-full"
                                    onClick={() => {
                                      OpenModalFunc2(index);
                                    }}
                                  >
                                    PREVIEW YOUR CUSTOM MESSAGE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="lg:max-w-[30%] w-full  relative item_block_middle lg:border-r-[1px] border-[#AAA] sm:py-[15px] py-[20px] px-[20px] justify-between flex items-center ">
                            <div className="w-[100%] h-[100%] flex items-center ">
                              <div className="w-[100%] text-[16px] font-bold">
                                <div className="flex justify-between ">
                                  <span className="text-[#1b5299] ">
                                    {' '}
                                    Price:
                                  </span>
                                  <span className="text-black">
                                    $ {item.price}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#1b5299]">
                                    {' '}
                                    Quantity:
                                  </span>
                                  <span className="text-[black]">
                                    {item.csvFileLen}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#1b5299]">
                                    Subtotal:
                                  </span>
                                  <span className="text-[black]">
                                    ${' '}
                                    {(item.price * item.csvFileLen).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-[20%] relative item_block_right pb-[15px] w-full  sm:flex-row flex-col flex-wrap flex justify-end">
                            <div className="flex lg:flex-col sm:flex-row flex-col justify-center lg:gap-[8px]  gap-[3px] ">
                              {item.giftCardName !== null ? (
                                ''
                              ) : (
                                <div className="buttonDiv  m-[0.2rem]">
                                  <DynamicButton
                                    className="bg-[#ef6e6e] rounded-[10px] md:py-[14px]  py-[10px] md:px-[20px] px-[12px] w-full md:text-[14px] text-[12px] font-bold"
                                    text="ADD GIFT CARD"
                                    onClickFunction={() => {
                                      OpenModalFunc(index);
                                    }}
                                  />
                                </div>
                              )}

                              <div className="buttonDiv  m-[0.2rem]">
                                <DynamicButton
                                  className="bg-[#1b5299] rounded-[10px] md:py-[14px] py-[10px] md:px-[20px] px-[12px]  w-full md:text-[14px] text-[12px] font-bold"
                                  text="EDIT ORDER"
                                  onClickFunction={() => {
                                    editOrderData(index);
                                  }}
                                />
                              </div>
                              <div className="buttonDiv m-[0.2rem]">
                                <DynamicButton
                                  className="bg-[#E30000] rounded-[10px] md:py-[14px] py-[10px] md:px-[20px] px-[12px]  w-full md:text-[14px] text-[12px] font-bold"
                                  text="DELETE ORDER"
                                  onClickFunction={() => {
                                    ConfirmDeleteOrder(index);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="w-full h-[1px] bg-[black]"></div> */}

                        {item.giftCardName && (
                          <div className="flex w-[100%] flex-wrap space-between lg:border-none border-b-[1px] border-[#AAA]">
                            <div className="lg:max-w-[50%] min-w-[150px] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px] border-[#AAA] lg:pb-[15px]">
                              <div className="flex w-[95%] justify-start ">
                                <div className="lg:max-w-[33%] w-full sm:max-w-[22%] max-w-[30%] min-w-[80px] md:m-5  m-3 mt-[30px] rounded-[10px] overflow-hidden">
                                  <img
                                    src={item.giftCardImg}
                                    alt=""
                                    className="w-[100px] h-[100px] object-contain"
                                  />
                                </div>
                                <div className="max-w-[100%] flex  justify-center  lg:items-center items-start  lg:flex-row flex-col   ">
                                  <div className="font-bold text-[#1b5299] text-[16px] ">
                                    {' '}
                                    Gift Card:
                                  </div>

                                  <span className=" text-[black] font-normal text-[16px]   ">
                                    {''}
                                    {item.giftCardName}
                                  </span>
                                  {/* <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[20px] lg:tracking-[0.5px] tracking-0">

                                  Gift Card: {item.giftCardName}
                                  </h3> */}
                                </div>
                              </div>
                            </div>
                            <div className="lg:max-w-[30%] sm:w-[50%] w-full relative item_block_middle lg:border-r-[1px] border-[#AAA] md:py-[15px] py-[8px] px-[20px] justify-between flex items-center ">
                              <div className="w-[100%] h-[100%] flex items-center ">
                                <div className="w-[100%] sm:text-[16px] text-[14px] font-bold">
                                  <div className="flex justify-between ">
                                    <span className=" text-[#1b5299] ">
                                      {' '}
                                      Price:
                                    </span>
                                    <span className="text-[black]">
                                      $ {item.giftCardPrice}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#1b5299]">
                                      {' '}
                                      Quantity:
                                    </span>
                                    <span className=" text-[black]">
                                      {item.csvFileLen}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className=" text-[#1b5299]">
                                      Subtotal:
                                    </span>
                                    <span className="text-[black]">
                                      ${' '}
                                      {(
                                        item.giftCardPrice * item.csvFileLen
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="lg:w-[20%] relative item_block_right pb-[15px] sm:w-[50%] w-full sm:flex-row flex-col sm:items-end  flex-wrap flex justify-end">
                              <div className="buttonDiv lg:my-auto mr-[0.2rem]">
                                <DynamicButton
                                  className="bg-[#E30000] rounded-[10px] md:py-[14px] py-[10px] px-[20px] w-full md:text-[14px] text-[12px] font-bold "
                                  text="DELETE CARD"
                                  onClickFunction={() => {
                                    confirmCardDel(index);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/* {item.giftCardName && (
                          <div className="w-full h-[1px] bg-[black]"></div>
                        )} */}

                        {(item.shippingData &&
                          item.shippingData.node?.title ==
                            'Ship Cards in Bulk - Cards plus Blank Envelopes Unsealed') ||
                        (item.shippingData &&
                          item.shippingData.node?.title ==
                            'Ship Cards in Bulk - Cards Only') ||
                        (item.shippingData &&
                          item.shippingData.node?.title ==
                            'Ship Cards in Bulk - Cards Plus Envelopes Addressed, Unsealed, Not Stamped') ||
                        (item.shippingData &&
                          item.shippingData.node?.title ==
                            'Ship Cards in Bulk - Cards Plus Envelopes Addressed and Sealed, Not Stamped') ? (
                          ''
                        ) : (
                          <>
                            {item.usCount || item.nonUSCount ? (
                              <>
                                {item.nonUSCount && item.nonUSCount ? (
                                  <div className="flex w-[100%] flex-wrap space-between">
                                    <div className="lg:max-w-[50%] min-w-[150px] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px] border-[#AAA] lg:pb-[15px]">
                                      <div className="flex w-[95%] justify-start ">
                                        <div className="lg:max-w-[33%] w-full sm:max-w-[22%] max-w-[30%] min-w-[80px] md:m-5  m-3 mt-[30px] rounded-[10px] overflow-hidden">
                                          <img
                                            src={postImage}
                                            alt=""
                                            className="min-w-[100px] max-w-[100px] w-[100%] h-[65px] object-cover"
                                          />
                                        </div>
                                        <div className="max-w-[100%] flex  justify-center  lg:items-center items-start  lg:flex-row flex-col  ">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[16px] font-bold">
                                            Postal {postTitle2}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:max-w-[30%] w-full  relative item_block_middle lg:border-r-[1px] border-[#AAA] md:py-[15px] py-[8px] px-[20px] justify-between flex items-center ">
                                      <div className="w-[100%] h-[100%] flex items-center ">
                                        <div className="w-[100%] sm:text-[16px] text-[14px] font-bold">
                                          <div className="flex justify-between ">
                                            <span className="text-[#1b5299]">
                                              {' '}
                                              Price:
                                            </span>
                                            <span className="text-[black] text-[16px] tracking-[1.5px]">
                                              $ {postPrice2}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className=" text-[#1b5299] ">
                                              {' '}
                                              Quantity:
                                            </span>
                                            <span className="text-black">
                                              {item.nonUSCount}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-black">
                                              {' '}
                                              Subtotal:
                                            </span>
                                            <span className="text-black ">
                                              ${' '}
                                              {(
                                                postPrice2 * item.nonUSCount
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:w-[20%] relative item_block_right pb-[15px] w-full flex-wrap flex "></div>
                                  </div>
                                ) : (
                                  ''
                                )}
                                {item.usCount && (
                                  <div className="flex w-[100%] flex-wrap space-between">
                                    <div className="lg:max-w-[50%] min-w-[150px] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px] border-[#AAA] lg:pb-[15px]">
                                      <div className="flex w-[95%] justify-start ">
                                        <div className="lg:max-w-[33%] w-full sm:max-w-[22%] max-w-[30%] min-w-[80px] md:m-5  m-3 mt-[30px] rounded-[10px] overflow-hidden">
                                          <img
                                            src={postImage}
                                            alt=""
                                            className="min-w-[100px] max-w-[100px] w-[100%] h-[65px] object-cover"
                                          />
                                        </div>
                                        <div className="max-w-[100%] flex  justify-center  lg:items-center items-start  lg:flex-row flex-col  ">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[16px] font-bold">
                                            Postal {postTitle}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:max-w-[30%] w-full  relative item_block_middle lg:border-r-[1px] border-[#AAA] md:py-[15px] py-[8px] px-[20px] justify-between flex items-center ">
                                      <div className="w-[100%] h-[100%] flex items-center ">
                                        <div className="w-[100%] sm:text-[16px] text-[14px] font-bold">
                                          <div className="flex justify-between ">
                                            <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {' '}
                                              Price:
                                            </span>
                                            <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                              $ {postPrice}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {' '}
                                              Quantity:
                                            </span>
                                            <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {item.usCount}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                              {' '}
                                              Subtotal:
                                            </span>
                                            <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                              ${' '}
                                              {(
                                                postPrice * item.usCount
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:w-[20%] relative item_block_right pb-[15px] w-full flex-wrap flex "></div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {item.reciverAddress?.country === 'USA' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  '' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  ' ' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'u.s.a' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'u.s' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'usa' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'us' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'america' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'united states' ||
                                item.reciverAddress?.country?.toLowerCase() ===
                                  'united states of america' ||
                                item.reciverAddress?.country?.toLowerCase() ==
                                  undefined ? (
                                  <div className="flex w-[100%] flex-wrap space-between">
                                    <div className="lg:max-w-[50%] min-w-[150px] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px] border-[#AAA] lg:pb-[15px]">
                                      <div className="flex w-[95%] justify-start ">
                                        <div className="lg:max-w-[33%] w-full sm:max-w-[22%] max-w-[30%] min-w-[80px] md:m-5  m-3 mt-[30px] rounded-[10px] overflow-hidden">
                                          <img
                                            src={postImage}
                                            alt=""
                                            className="min-w-[100px] max-w-[100px] w-[100%] h-[65px] object-cover"
                                          />
                                        </div>
                                        <div className="max-w-[100%] flex  justify-center  lg:items-center items-start  lg:flex-row flex-col  ">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[16px] font-bold">
                                            Postage {postTitle}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:max-w-[30%] w-full  relative item_block_middle lg:border-r-[1px] border-[#AAA] md:py-[15px] py-[8px] px-[20px] justify-between flex items-center ">
                                      <div className="w-[100%] h-[100%] flex items-center ">
                                        <div className="w-[100%] sm:text-[16px] text-[14px] font-bold">
                                          <div className="flex justify-between ">
                                            <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {' '}
                                              Price:
                                            </span>
                                            <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                              $ {postPrice}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {' '}
                                              Quantity:
                                            </span>
                                            <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {item.csvFileLen}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                              {' '}
                                              Subtotal:
                                            </span>
                                            <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                              ${' '}
                                              {(
                                                postPrice * item.csvFileLen
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:w-[20%] relative item_block_right pb-[15px] w-full flex-wrap flex "></div>
                                  </div>
                                ) : (
                                  <div className="flex w-[100%] flex-wrap space-between">
                                    <div className="lg:max-w-[50%] min-w-[150px] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px] border-[#AAA] lg:pb-[15px]">
                                      <div className="flex w-[95%] justify-start ">
                                        <div className="lg:max-w-[33%] w-full sm:max-w-[22%] max-w-[30%] min-w-[80px] md:m-5  m-3 mt-[30px] rounded-[10px] overflow-hidden">
                                          <img
                                            src={postImage}
                                            alt=""
                                            className="min-w-[100px] max-w-[100px] w-[100%] h-[65px] object-cover"
                                          />
                                        </div>
                                        <div className="max-w-[100%] flex  justify-center  lg:items-center items-start  lg:flex-row flex-col  ">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[16px] font-bold">
                                            Postal{postTitle2}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:max-w-[30%] w-full  relative item_block_middle lg:border-r-[1px] border-[#AAA] md:py-[15px] py-[8px] px-[20px] justify-between flex items-center ">
                                      <div className="w-[100%] h-[100%] flex items-center ">
                                        <div className="w-[100%] sm:text-[16px] text-[14px] font-bold">
                                          <div className="flex justify-between ">
                                            <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {' '}
                                              Price:
                                            </span>
                                            <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                              ${postPrice2}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {' '}
                                              Quantity:
                                            </span>
                                            <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                              {item.csvFileLen}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                              {' '}
                                              Subtotal:
                                            </span>
                                            <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                              $
                                              {(
                                                postPrice2 * item.csvFileLen
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="lg:w-[20%] relative item_block_right pb-[15px] w-full flex-wrap flex "></div>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {/* <div className="w-full h-[1px] bg-[black]"></div> */}

                        {item.shippingData &&
                          item.shippingMethodImage &&
                          item.isShippidata && (
                            <div className="flex w-[100%] flex-wrap lg:border-none border-t-[1px] border-[#AAA]">
                              <div className="md:max-w-[50%] w-[100%] items-center relative flex  item_block_left lg:border-r-[1px]  border-[#AAA]">
                                <div className="flex w-[95%] justify-start ">
                                  <div className="max-w-[33%] w-full md:m-5 mt-[30px] mx-auto rounded-[10px] overflow-hidden">
                                    <img
                                      src={item.shippingMethodImage}
                                      alt=""
                                      className="min-w-[100px] max-w-[100px] w-[100%] h-[65px] object-cover"
                                    />
                                  </div>
                                  <div className="sm:max-w-[100%] max-w-[46%] m-auto md:mt-auto sm:mt-[40px] mt-[20px]">
                                    <h3 className="text-[#1b5299] font-bold sm:text-[16px] text-[14px] lg:tracking-[0.5px] tracking-0">
                                      {item.shippingData?.node.title}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="lg:max-w-[30%] w-full  relative item_block_middle lg:border-r-[1px] border-[#AAA] md:py-[15px] py-[8px] px-[20px] justify-between flex items-center ">
                                <div className="w-[100%] h-[100%] flex items-center ">
                                  <div className="w-[100%] sm:text-[16px] text-[14px] font-bold">
                                    <div className="flex justify-between ">
                                      <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                        {' '}
                                        Price:
                                      </span>
                                      <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                        $ {item.shippingDataCost}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                        {' '}
                                        Quantity:
                                      </span>
                                      <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                        1
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                        {' '}
                                        Subtotal:
                                      </span>
                                      <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                        $ {item.shippingDataCost * 1}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="lg:w-[20%] relative item_block_right pb-[15px] w-full flex-wrap flex "></div>
                            </div>
                          )}
                        <div className="flex w-[100%] flex-wrap ">
                          <div className="md:max-w-[50%] w-[100%] items-center relative flex">
                            {''}
                          </div>

                          <div className="lg:max-w-[30%] w-full lg:border-none border-t-[1px] border-[#AAA] relative  md:py-[15px] py-[8px] px-[20px]  items-center text-[#1b5299] font-karla text-[20px] font-bold flex  justify-between">
                            <div> SUBTOTAL: </div>
                            <div>
                              ${' '}
                              {(
                                item.price * item.csvFileLen +
                                item.giftCardPrice * item.csvFileLen +
                                (item.isShippidata
                                  ? item.shippingDataCost * 1
                                  : 0) +
                                ((item.shippingData &&
                                  item.shippingData.node?.title ==
                                    'Ship Cards in Bulk - Cards plus Blank Envelopes Unsealed') ||
                                (item.shippingData &&
                                  item.shippingData.node?.title ==
                                    'Ship Cards in Bulk - Cards Only') ||
                                (item.shippingData &&
                                  item.shippingData.node?.title ==
                                    'Ship Cards in Bulk - Cards Plus Envelopes Addressed, Unsealed, Not Stamped') ||
                                (item.shippingData &&
                                  item.shippingData.node?.title ==
                                    'Ship Cards in Bulk - Cards Plus Envelopes Addressed and Sealed, Not Stamped')
                                  ? 0
                                  : item.usCount || item.nonUSCount
                                  ? postPrice * item.usCount +
                                    postPrice2 * item.nonUSCount
                                  : item.reciverAddress?.country === 'USA' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      '' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      ' ' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'u.s.a' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'u.s' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'usa' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'us' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'america' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'united states' ||
                                    item.reciverAddress?.country?.toLowerCase() ===
                                      'united states of america' ||
                                    item.reciverAddress?.country?.toLowerCase() ==
                                      undefined
                                  ? postPrice * item.csvFileLen
                                  : postPrice2 * item.csvFileLen)
                              ).toFixed(2)}
                            </div>
                          </div>
                          <div className="lg:w-[20%] relative  w-full flex-wrap flex "></div>
                        </div>
                      </div>
                    ))}
                  {totalPrize && (
                    <div className="w-[90%] bg-white m-auto mt-10 mb-10">
                      <div className="flex lg:p-3 p-5 flex-wrap justify-evenly lg:gap-0 gap-[15px] shadow-inset-custom rounded-[10px]">
                        <div className="lg:w-[25%] md:w-[35%] sm:w-[47%] w-full flex lg:items-center items-end sm:justify-start justify-center">
                          <div className="buttonDiv m-2 sm:text-[14px] font-bold sm:w-[82%] w-[77%]">
                            <button
                              className="bg-[#1b5299] text-[#fff] p-3 flex  rounded gap-2.5 w-full sm:justify-start justify-center"
                              onClick={() => {
                                clearCartBtn();
                              }}
                            >
                              <RiDeleteBin6Line className="text-white text-[20px]" />
                              CLEAR SHOPPING CART
                            </button>
                          </div>
                        </div>
                        <div
                          className="lg:w-[45%]  w-[100%] flex items-center  lg:order-none order-[-1]
                         md:text-[30px] sm:text-[28px] text-[24px] text-[#1b5299] font-karla font-bold  lg:justify-around justify-evenly"
                        >
                          <span className="md:mr-[2px]">GRAND TOTAL</span>
                          <span>${totalPrize.toFixed(2)}</span>
                        </div>
                        <div className="lg:w-[25%] sm:w-[45%] w-full  mr-1 flex justify-end ">
                          <div className="">
                            <div className="md:text-[12px] sm:text-[10px] text-[11px] font-medium  items-center gap-2">
                              <input
                                type="checkbox"
                                className="cursor-pointer"
                                onChange={() => setAgree(!agree)}
                                checked={agree}
                              />
                              <span>
                                {' '}
                                I agree with{' '}
                                <span className="underline decoration-solid">
                                  <a href="/policies/terms-of-service">
                                    Terms of service
                                  </a>
                                </span>
                              </span>
                            </div>
                            <button
                              disabled={!agree}
                              className="bg-[#EF6E6E] w-[100%]  lg:text-[16px] text-[14px] text-[#fff] p-[12px] rounded border-[1px] border-[#000] font-bold flex justify-center mt-2"
                              onClick={() => {
                                if (customerId) {
                                  setShowCartPage(false);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth', // Make the scroll behavior smooth
                                  });
                                } else {
                                  setLoginModal(true);
                                }
                              }}
                            >
                              CHECKOUT{' '}
                              <HiArrowLongRight className="text-2xl ml-2 " />
                            </button>
                          </div>
                        </div>
                        {/* <div className="text-[9px] sm:hidden flex justify-end w-full">
                          <input
                            type="checkbox"
                            onClick={() => setAgree(!agree)}
                            checked={agree}
                          />
                          <text>
                            {' '}
                            &nbsp;I agree with{' '}
                            <span className="underline decoration-solid">
                              <a href="/policies/terms-of-service">
                                Terms of service
                              </a>
                            </span>
                          </text>
                        </div> */}
                      </div>
                    </div>
                  )}
                  <div className="w-[90%] m-auto mt-10 mb-10">
                    <div className="p-[30px] bg-white md:w-[50%] w-[100%] shadow-inset-custom rounded-[10px]">
                      <h3 className="text-[30px] font-bold text-[#1b5299]">
                        NOTE
                      </h3>
                      <p className="text-[#000] font-normal text-[14px] py-5 ">
                        Add special instructions for your order...
                      </p>
                      <textarea
                        name=""
                        className="rounded w-full border-[#787878cc] border-[1px]"
                        id="cart-note"
                        cols="30"
                        rows="10"
                        onChange={(e) => setCartNote(e.target.value)}
                        value={cartNote}
                      ></textarea>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <div className="w-[90%]  m-auto mt-[4rem] mb-10 flex justify-center">
                <div>
                  <h3 className="text-[black] font-karla sm:text-[40px] text-[24px]">
                    YOUR CART IS EMPTY!
                  </h3>
                  <div className="flex justify-center mt-[8px]">
                    <DynamicButton
                      className="bg-[#EF6E6E] m-5 w-full max-w-[225px]"
                      text="CONTINUE SHOPPING"
                      onClickFunction={() => continueShopping()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <ConfirmationModal
            show={deleteModal}
            onCancel={() => setDeleteModal(false)}
            onConfirm={() => deleteOrder(deleteOrderIndex)}
            message="Are you sure you want to delete this order."
            confirmText="Delete"
            cancelText="Cancel"
          />
          <ConfirmationModal
            show={deleteCardModal}
            onCancel={() => setDeleteCardModal(false)}
            onConfirm={() => deleteKeyInArray(delCardIndex)}
            message="Are you sure you want to delete Gift Card."
            confirmText="Delete"
            cancelText="Cancel"
          />
          <ConfirmationModal
            show={clearCartModal}
            onCancel={() => setClearCartModal(false)}
            onConfirm={() => clearCart()}
            message="Are you sure you want to clear your Cart?."
            confirmText="Delete"
            cancelText="Cancel"
          />

          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="flex justify-center">
              <h2 className="font-bold text-[30px] text-[#333] leading-10  mt-3 text-center">
                Add a Gift Card
              </h2>

              <div className="absolute top-[35px] right-0  pr-8 sm:block">
                <button
                  onClick={() => setIsOpen(false)}
                  className="transition text-primary "
                >
                   <ImCross className="md:mr-[-12px] mr-[-16px] mt-[-51px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
                </button>
              </div>
            </div>
            <div className="address-data">
              <div className="flex justify-between md:mt-4 md:flex-row flex-col">
                <div className="md:w-[45%] w-full mr-2 ml-2 ">
                  <div className="col-4 mt-4 font-bold text-[16px]">
                    Select Gift Card:
                  </div>
                  <div className="col-8 mt-3 pr-0 ">
                    <select
                      className="w-full border-2 border-[#ef6e6e] rounded-xl font-normal text-[16px] leading-10"
                      onChange={(e) => cardvalFunc(e.target.value)}
                    >
                      <option className="w-full"> Select Gift Card</option>
                      {data.collection.products.edges.map((item, i) => (
                        <option value={i} key={i}>{item.node.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:w-[45%] w-full mr-2 ml-2 ">
                  <div className="col-4 mt-4 font-bold text-[16px]">
                    Select Gift Price:
                  </div>
                  <div className="col-8 mt-3 pr-0">
                    {cardPriceVal && cardPriceVal.length ? (
                      // <div>heelooo</div>
                      <select
                        name=""
                        id=""
                        className="w-full border-2 border-[#ef6e6e] rounded-xl font-normal text-[16px] leading-10"
                        onChange={(e) => priceValFunc(e.target.value)}
                      >
                        {cardPriceVal.map((item,index) => (
                          <option value={item.node.price.amount} key={index}>
                            {item.node.title}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // <AfterCardSel />
                      <select
                        name=""
                        id=""
                        className="w-full border-2 border-[#ef6e6e] rounded-xl font-normal text-[16px] leading-10"
                      >
                        <option value="">Price Card</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className="buttonDiv flex justify-center items-center md:mt-10 mt-6">
                <button
                  className="bg-[#ef6e6e] text-[#fff] py-[15px] px-[25px] rounded-xl text-[14px] font-bold cursor-pointer"
                  onClick={() => updateValueInArray(cardVal)}
                >
                  ADD GIFT CARD
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpen2}
            style={customStyles}
            className="sm:h-fit h-auto fixed overflow-auto"
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="text-[#1B5299] text-[16px] font-bold sm:w-[80%] w-full mx-auto ">
              {bulkAddress.length ? (
                <>
                  <div className="absolute top-[35px] right-0  pr-8 sm:block">
                    <button
                      onClick={() => closeModal()}
                      className="transition text-primary "
                    >
                        <ImCross className="md:mr-[-12px] mr-[-16px] mt-[-51px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
                    </button>
                  </div>

                  {bulkAddress &&
                    bulkAddress.map((item, index) => (
                      <div>
                        <div
                          key={index}
                          style={{
                            display: index === currentIndex ? 'block' : 'none',
                          }}
                          className="mt-[10px]"
                        >
                          <span className=" text-center ">
                            Recipient:
                            <span className="ml-2 font-normal">
                              {' '}
                              {item['First Name'] || item.firstName},
                              {item['Last Name'] || item.lastName},
                              {item['Address'] || item.address1},
                              {item['City'] || item.city},
                              {item['State/Province'] || item.state}
                            </span>
                          </span>

                          <h2 className="font-bold sm:text-[30px] text-[22px] w-full text-center mt-3 leading-10">
                            Your Custom Message
                          </h2>
                          <div className="my-7 mr-5 relative flex justify-between">
                            <div>
                              <button onClick={handlePrevClick}>
                                Previous
                              </button>
                            </div>
                            <div>
                              <button onClick={handleNextClick}>Next</button>
                            </div>
                          </div>
                          <div className="w-full items-center bg-[#fff] border-2 border-[#001a5f] rounded-xl  overflow-auto mt-5  p-[20px] h-auto ">
                            <span
                              className=" w-full"
                              style={{
                                fontFamily: msgFont,
                                fontSize: msgFontSize || '30px',
                              }}
                            >
                              {' '}
                              {item.msgData}
                            </span>
                            <br />
                            <span
                              className="text-center w-full ml-10"
                              style={{
                                fontFamily: msgFont,
                                fontSize: msgFontSize || '30px',
                              }}
                            >
                              {msglastText}
                            </span>
                          </div>
                          <div className="mt-[24px]">
                            <span>
                              Font:{' '}
                              <span className="font-normal ml-2">
                                {msgFont}
                              </span>{' '}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className="flex">
                    <div className="w-full mt-[10px]">
                      <span className=" text-center ">
                        Recipient:{' '}
                        <span className="font-normal">
                          {reciverAddress.firstName},{reciverAddress.address1},
                          {reciverAddress.city},{reciverAddress.country}
                        </span>
                      </span>
                    </div>
                    <div className="absolute top-[35px] right-0  pr-8 sm:block">
                      <button
                        onClick={() => closeModal()}
                        className="transition text-primary "
                      >
                        <ImCross className="md:mr-[-12px] mr-[-16px] mt-[-51px] text-white text-[22px] p-[5px] bg-[#EF6E6E]" />
                      </button>
                    </div>
                  </div>
                  <h2 className="font-bold sm:text-[30px] text-[22px] w-full text-left mt-5 leading-10">
                    Your Custom Message
                  </h2>
                  <div className="w-full items-center bg-[#fff] border-2 border-[#001a5f] rounded-xl  h-auto mt-5 overflow-auto p-[20px]">
                    <span
                      className=" w-full"
                      style={{
                        fontFamily: msgFont,
                        fontSize: msgFontSize || '30px',
                      }}
                    >
                      {' '}
                      {msgShow}
                    </span>
                    <br />
                    <span
                      className="text-center w-full ml-10"
                      style={{
                        fontFamily: msgFont,
                        fontSize: msgFontSize || '30px',
                      }}
                    >
                      {msglastText}
                    </span>
                  </div>
                  <div className="mt-[24px]">
                    <span>
                      Font: <span className="font-normal ml-2">{msgFont}</span>{' '}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Modal>
        </>
      ) : (
        <CheckoutData
          cartNote={cartNote && cartNote}
          cartData={cartData}
          postalId={postalId}
          postalId2={postalId2}
          setShowCartPage={setShowCartPage}
          StripeKey={StripeKey}
          totalPrize={Number(totalPrize).toFixed(2)}
        />
      )}

      <LoginModal
        title={'Update a cart'}
        show={loginModal}
        setLoginModal={setLoginModal}
        onCancel={() => setLoginModal(false)}
        confirmText="Login"
        cancelText="Register"
        cross={true}
      />
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
            onlineStoreUrl
            title
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

const PostalProduct = `#graphql
  query
  {
    product(id:"gid://shopify/Product/7032044912745"){
      title
      onlineStoreUrl
      variants(first:10){
        edges{
          node{
            id
            title
            image{
                url
              }
            price
            {
              amount
            }
          }
        }
      }
    }
  }`;
