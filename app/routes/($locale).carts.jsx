import React, {useEffect, useState} from 'react';
import {defer, json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Await} from '@remix-run/react';
import Modal from 'react-modal';
import {BsXCircle} from 'react-icons/bs';
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
import Del from '../../assets/Image/del2.png';
import CircularLoader from '~/components/CircularLoder';
import EditICon from '../../assets/Image/editIcon.png';
import {useStateContext} from '~/context/StateContext';
import LoginModal from '~/components/modal/LoginModal';
let storedDataString, storedDataArray;

export async function loader({context, request}) {
  const StripeKey =
    'pk_test_51NWJuCKwXDGuBPYABUNXd2dplCTxFziZU0QVQJpYTQmh0d59BUFAZNX2J8FhN74jBjMFUOF0tqrlEDMIRKaei2e800kPIWqGnz';

  // console.log(StripeKey,'eeee');
  const data = await context.storefront.query(GiftProduct, {
    variables: {},
  });
  const postalData = await context.storefront.query(PostalProduct, {
    variants: {},
  });
  //   console.log(data,'cartData');
  // const formData = new FormData()
  // formData.append("name","ayush")
  return defer({
    data,
    postalData,
    StripeKey,
  });
}

export default function AddCartFunc() {
  const {setCartCountVal, customerId} = useStateContext();

  const {data, postalData, StripeKey} = useLoaderData();
  // console.log(formData,'-----------');
  const [cartData, setCartData] = useState([]);
  const [updateGift, setUpdateGift] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [cardPriceVal, setCardPriceVal] = useState([]);
  const [cardPrice, setCardPrice] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardVal, setCardVal] = useState('');
  const [cardImg, setCardImage] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postTitle2, setPostTitle2] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postPrice2, setPostPrice2] = useState('');
  const [postImage, setPostImage] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [msgShow, setMsgShow] = useState('');
  const [msgFont, setMsgFont] = useState('');
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
    let postalrate = postalData.product.variants.edges[0].node.price.amount;
    let postalTit2 = postalData.product.variants.edges[1].node.title;
    let postalrate2 = postalData.product.variants.edges[1].node.price.amount;
    let postalImag = postalData.product.variants.edges[1].node.image;
    setPostTitle(postalTit);
    setPostTitle2(postalTit2);
    setPostPrice(postalrate);
    setPostPrice2(postalrate2);
    setPostImage(postalImag.url);
    // console.log(typeof (postalrate), '2@@@@@');
  }
  let keyToUpdate1 = 'giftCardName';
  let keyToUpdate2 = 'giftCardImg';
  let keyToUpdate3 = 'giftCardPrice';
  function updateValueInArray(index) {
    // console.log(index);
    setUpdateGift(!updateGift);
    // Check if the index is valid
    if (index >= 0 && index < cartData.length) {
      // Update the key's value
      cartData[index][keyToUpdate1] = cardName;
      cartData[index][keyToUpdate2] = cardImg;
      cartData[index][keyToUpdate3] = cardPrice;
    }
    localStorage.setItem('mydata', JSON.stringify(cartData));
    setCardPrice('');
    setIsOpen(false);
  }
  function deleteKeyInArray(index) {
    setUpdateGift(!updateGift);

    // console.log(index);

    // Check if the index is valid
    if (index >= 0 && index < cartData.length) {
      // Delete the key from the object
      cartData[index][keyToUpdate1] = null;
      cartData[index][keyToUpdate2] = null;
      cartData[index][keyToUpdate3] = null;
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
    // console.log(index);
    setDelOrderIndex(index);
    setDeleteModal(true);
  }

  function deleteOrder(index) {
    setUpdateGift(!updateGift);
    // if (index >= 0 && index < cartData.length) {
    // Delete the order
    cartData.splice(index, 1);
    // console.log(cartData, 'deleteOrder');

    // delete cartData[index];
    // }
    localStorage.setItem('mydata', JSON.stringify(cartData));
    localStorage.setItem('cartCount', JSON.stringify(cartData.length));
    setDeleteModal(false);
  }

  function editOrderData(index) {
    // navigate(,{state:{index:'index'}})
    let data = cartData[index];
    // console.log(data, 'data---');
    let ab = cartData[index].productGetUrl;
    navigate(`${ab}`, {state: {data: data, index: index}});
  }
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '620px',
      background: '#FFF6F6',
      width: '90%',
      padding: '30px',
      maxHeight: '500px',
      zIndex: '2',
      position: 'relative',
    },
  };
  const customStyles2 = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '620px',
      background: '#FFF6F6',
      width: '90%',
      padding: '30px',
      height: '40%',
      zIndex: '2',
      position: 'relative',
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
    // console.log(item);
    setIsOpen2(true);
    // setCardVal(item)
    if (cartData[item].csvBulkData.length) {
      // console.log('bulkAddress');
      setBulkAddress(cartData[item].csvBulkData);
      setMsgFont(cartData[item].fontFamily);
      setMsgShow(cartData[item].messageData);
      setMsglastText(cartData[item].endText);
    } else {
      setMsgFont(cartData[item].fontFamily);
      setMsgShow(cartData[item].messageData);
      setReciverAddress(cartData[item].reciverAddress);
      setMsglastText(cartData[item].endText);
    }
  }
  const cardvalFunc = async (item) => {
    // console.log(item, 'cardVal-----');
    let selCardName = data.collection.products.edges[item].node;
    // console.log(selCardName, 'selCardName--');
    setCardName(selCardName.title);
    setCardImage(selCardName.featuredImage.url);
    // console.log(cardName,'cardName-----');
    let arrCardPrice = data.collection.products.edges[item].node.variants.edges;
    // console.log(
    //   arrCardPrice[0].node.price.amount,
    //   '---------abababababaababab',
    // );
    let firstPrice = arrCardPrice[0].node.price.amount;
    setCardPrice(firstPrice);
    setCardPriceVal(arrCardPrice);
    // await AfterCardSel(ab)
  };
  const priceValFunc = async (item) => {
    // console.log(item, 'PriceVAl');
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
    // console.log(prices, 'pricesssss');
    setTotalPrize(prices);
  }
  return (
    <>
      {showCartPage ? (
        <>
          <div className="w-full h-full gap-2 mt-8">
            {cartData && cartData.length > 0 ? (
              <>
                <DynamicTitle title={'SHOPPING CART'} />
                <>
                  {cartData.length === 0 && <CircularLoader color="#ef6e6e" />}
                  {cartData &&
                    cartData.map((item, index) => (
                      <div className="w-[85%]  bg-[white] m-auto mt-10 mb-10">
                        <div className="flex w-[100%] flex-wrap ">
                          <div className="md:w-[44%] w-full items-center relative flex ml-0 m-auto">
                            <div className="flex w-full justify-evenly">
                              <div className="max-w-[20%]  md:m-5 mt-[30px] mx-auto">
                                <img src={item.productImg} alt="" />
                              </div>
                              <div className="max-w-[100%] m-auto md:mt-auto mt-[27px]">
                                <h3 className="text-[#1b5299] font-karla lg:text-[18px] md:text-[14px] sm:text-[20px] text-[14px] lg:tracking-[0.5px] tracking-0">
                                  {item.productTitle}
                                </h3>
                                <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] sm:text-[18px] text-[14px] lg:tracking-[1.5px] tracking-0">
                                  {' '}
                                  Sender
                                </span>
                                :
                                <span className=" text-[black]  lg:text-[14px] md:text-[12px] sm:text-[16px] text-[12px] lg:tracking-[1.5px] tracking-0">
                                  {' '}
                                  {item.senderAddress.address1},
                                  {item.senderAddress.city},
                                  {item.senderAddress.state},
                                  {item.senderAddress.country}
                                </span>
                                <div className="buttonDiv mt-2">
                                  <button
                                    className="bg-[#EF6E6E] text-[#fff]  p-[5px]  lg:text-[14px] md:text-[9px] sm:text-[14px] text-[11px] "
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

                          <div className="md:w-[25%] sm:w-[80%] w-[85%] md:m-0 m-auto justify-between flex items-center md:mt-0 mt-[20px]">
                            <div className="w-[100%]">
                              <div className="flex justify-between">
                                <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                  {' '}
                                  Price:
                                </span>
                                <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                  $ {item.price}
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
                                <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                  Subtotal:
                                </span>
                                <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                  $ {(item.price * item.csvFileLen).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-[20%]  sm:w-full w-[85%] my-4 md:ml-4 md:mr-0  mx-auto sm:flex-row flex-col flex-wrap flex justify-center">
                            <div className="flex md:flex-col sm:flex-row flex-col">
                              {item.giftCardName !== null ? (
                                ''
                              ) : (
                                <div className="buttonDiv md:pr-5 pr-0 m-[0.2rem]">
                                  <DynamicButton
                                    className="bg-[#ef6e6e] w-full lg:text-[14px] md:text-[12px] "
                                    text="Add Gift Card"
                                    onClickFunction={() => {
                                      OpenModalFunc(index);
                                    }}
                                  />
                                </div>
                              )}

                              <div className="buttonDiv md:pr-5 pr-0 m-[0.2rem]">
                                <DynamicButton
                                  className="bg-[#1b5299] w-full lg:text-[14px] md:text-[12px]"
                                  text="EDIT ORDER"
                                  onClickFunction={() => {
                                    editOrderData(index);
                                  }}
                                />
                              </div>
                              <div className="buttonDiv md:pr-5 pr-0 m-[0.2rem]">
                                <DynamicButton
                                  className="bg-[#E30000] w-full lg:text-[14px] md:text-[12px] "
                                  text="DELETE ORDER"
                                  onClickFunction={() => {
                                    ConfirmDeleteOrder(index);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-[1px] bg-[black]"></div>

                        {item.giftCardName && (
                          <div className="flex w-[100%] flex-wrap ">
                            <div className="md:w-[41%] w-full items-center relative flex ml-0 m-auto md:mb-0 mb-[20px]">
                              <div className="flex w-full justify-evenly">
                                <div className="sm:max-w-[20%] max-w-[23%] md:m-5 mt-[30px] mx-auto">
                                  <img src={item.giftCardImg} alt="" />
                                </div>
                                <div className="max-w-[100%] m-auto md:mt-auto mt-[40px]">
                                  <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[20px] lg:tracking-[0.5px] tracking-0">
                                    {item.giftCardName}
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div className="md:w-[25%] sm:w-[75%] w-[85%] md:m-0 m-auto justify-between flex items-center">
                              <div className="w-[100%]">
                                <div className="flex justify-between">
                                  <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                    {' '}
                                    Price:
                                  </span>
                                  <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                    $ {item.giftCardPrice}
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
                                  <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                    Subtotal:
                                  </span>
                                  <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                    ${' '}
                                    {(
                                      item.giftCardPrice * item.csvFileLen
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="md:w-[20%]  sm:w-full w-[85%] my-4 md:ml-4 md:mr-0  mx-auto sm:flex-row flex-col flex-wrap flex justify-center">
                              <div className="buttonDiv md:pr-5 pr-0 m-2">
                                <DynamicButton
                                  className="bg-[#E30000] w-full lg:text-[14px] md:text-[12px] "
                                  text="DELETE CARD"
                                  onClickFunction={() => {
                                    confirmCardDel(index);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {item.giftCardName && (
                          <div className="w-full h-[1px] bg-[black]"></div>
                        )}

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
                                  <div className="flex w-[100%] flex-wrap ">
                                    <div className="md:w-[41%] w-full items-center relative flex ml-0 m-auto md:mb-0 mb-[20px]">
                                      <div className="flex w-full justify-evenly">
                                        <div className="md:max-w-[28%] max-w-[25%] md:m-[7px] mt-[30px] mr-auto ml-[27px]">
                                          <img src={postImage} alt="" />
                                        </div>
                                        <div className="max-w-[100%] m-auto md:mt-auto mt-[40px]">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[20px] lg:tracking-[0.5px] tracking-0">
                                            Postal {postTitle2}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:w-[25%] sm:w-[75%] w-[85%] md:m-0 m-auto justify-between flex items-center">
                                      <div className="w-[100%]">
                                        <div className="flex justify-between">
                                          <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                            {' '}
                                            Price:
                                          </span>
                                          <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                            $ {postPrice2}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-karla text-[#1b5299] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                            {' '}
                                            Quantity:
                                          </span>
                                          <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                            {item.nonUSCount}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-karla text-[black] lg:text-[16px] md:text-[14px] tracking-[1.5px]">
                                            {' '}
                                            Subtotal:
                                          </span>
                                          <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                            ${' '}
                                            {(
                                              postPrice2 * item.nonUSCount
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:w-[20%] w-0 my-4 ml-4 flex justify-center"></div>
                                  </div>
                                ) : (
                                  ''
                                )}
                                {item.usCount && (
                                  <div className="flex w-[100%] flex-wrap ">
                                    <div className="md:w-[41%] w-full items-center relative flex ml-0 m-auto md:mb-0 mb-[20px]">
                                      <div className="flex w-full justify-evenly">
                                        <div className="md:max-w-[28%] max-w-[25%] md:m-[7px] mt-[30px] mr-auto ml-[27px]">
                                          <img src={postImage} alt="" />
                                        </div>
                                        <div className="max-w-[100%] m-auto md:mt-auto mt-[40px]">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[20px] lg:tracking-[0.5px] tracking-0">
                                            Postal {postTitle}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:w-[25%] sm:w-[75%] w-[85%] md:m-0 m-auto justify-between flex items-center">
                                      <div className="w-[100%]">
                                        <div className="flex justify-between">
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
                                            {(postPrice * item.usCount).toFixed(
                                              2,
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:w-[20%] w-0 my-4 ml-4 flex justify-center"></div>
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
                                  <div className="flex w-[100%] flex-wrap ">
                                    <div className="md:w-[41%] w-full items-center relative flex ml-0 m-auto md:mb-0 mb-[20px]">
                                      <div className="flex w-full justify-evenly">
                                        <div className="md:max-w-[28%] max-w-[25%] md:m-[7px] mt-[30px] mr-auto ml-[27px]">
                                          <img src={postImage} alt="" />
                                        </div>
                                        <div className="max-w-[100%] m-auto md:mt-auto mt-[40px]">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[20px] lg:tracking-[0.5px] tracking-0">
                                            Postal {postTitle}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:w-[25%] sm:w-[75%] w-[85%] md:m-0 m-auto justify-between flex items-center">
                                      <div className="w-[100%]">
                                        <div className="flex justify-between">
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
                                    <div className="md:w-[20%] w-0 my-4 ml-4 flex justify-center"></div>
                                  </div>
                                ) : (
                                  // <div className="flex">
                                  //   <div className="w-[36rem]">
                                  //     <div className="flex m-5">
                                  //       <div className="max-w-[20%] m-5">
                                  //         <img src={postImage} alt="" />
                                  //       </div>
                                  //       <div className="max-w-[100%] mt-10">
                                  //         <h3 className="text-[#1b5299] font-karla text-[18px] tracking-[1.5px]">
                                  //           Postal {postTitle}
                                  //         </h3>
                                  //         <br />
                                  //         <br />
                                  //       </div>
                                  //     </div>
                                  //   </div>
                                  //   <div className="w-[18rem] gap-5 flex items-center">
                                  //     <div className="m-6 w-[16rem]">
                                  //       <div className="flex justify-between">
                                  //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           Price:
                                  //         </span>
                                  //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                  //           $ {postPrice}
                                  //         </span>
                                  //       </div>
                                  //       <div className="flex justify-between">
                                  //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           Quantity:
                                  //         </span>
                                  //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                  //           {item.csvFileLen}
                                  //         </span>
                                  //       </div>
                                  //       <div className="flex justify-between">
                                  //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           Subtotal:
                                  //         </span>
                                  //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                  //           ${' '}
                                  //           {(
                                  //             postPrice * item.csvFileLen
                                  //           ).toFixed(2)}
                                  //         </span>
                                  //       </div>
                                  //     </div>
                                  //   </div>
                                  //   <div className="w-[19rem] m-4 flex justify-center items-center"></div>
                                  // </div>
                                  <div className="flex w-[100%] flex-wrap ">
                                    <div className="md:w-[41%] w-full items-center relative flex ml-0 m-auto md:mb-0 mb-[20px]">
                                      <div className="flex w-full justify-evenly">
                                        <div className="md:max-w-[28%] max-w-[25%] md:m-[7px] mt-[30px] mr-auto ml-[27px]">
                                          <img src={postImage} alt="" />
                                        </div>
                                        <div className="max-w-[100%] m-auto md:mt-auto mt-[40px]">
                                          <h3 className="text-[#1b5299] font-karla md:text-[18px] text-[20px] lg:tracking-[0.5px] tracking-0">
                                            Postal{postTitle2}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:w-[25%] sm:w-[75%] w-[85%] md:m-0 m-auto justify-between flex items-center">
                                      <div className="w-[100%]">
                                        <div className="flex justify-between">
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
                                    <div className="md:w-[20%] w-0 my-4 ml-4 flex justify-center"></div>
                                  </div>

                                  // <div className="flex">
                                  //   <div className="w-[36rem]">
                                  //     <div className="flex m-5">
                                  //       <div className="max-w-[20%] m-5">
                                  //         <img src={postImage} alt="" />
                                  //       </div>
                                  //       <div className="max-w-[100%] mt-10">
                                  //         <h3 className="text-[#1b5299] font-karla text-[18px] tracking-[1.5px]">
                                  //           Postal{postTitle2}
                                  //         </h3>
                                  //         <br />
                                  //         <br />
                                  //       </div>
                                  //     </div>
                                  //   </div>
                                  //   <div className="w-[18rem] gap-5 flex items-center">
                                  //     <div className="m-6 w-[16rem]">
                                  //       <div className="flex justify-between">
                                  //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           Price:
                                  //         </span>
                                  //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                  //           ${postPrice2}
                                  //         </span>
                                  //       </div>
                                  //       <div className="flex justify-between">
                                  //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           Quantity:
                                  //         </span>
                                  //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                  //           {item.csvFileLen}
                                  //         </span>
                                  //       </div>
                                  //       <div className="flex justify-between">
                                  //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           Subtotal:
                                  //         </span>
                                  //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                                  //           {' '}
                                  //           $
                                  //           {(
                                  //             postPrice2 * item.csvFileLen
                                  //           ).toFixed(2)}
                                  //         </span>
                                  //       </div>
                                  //     </div>
                                  //   </div>
                                  //   <div className="w-[19rem] m-4 flex justify-center items-center"></div>
                                  // </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                        <div className="w-full h-[1px] bg-[black]"></div>

                        {item.shippingData &&
                          item.shippingMethodImage &&
                          item.isShippidata && (
                            <div className="flex w-[100%] flex-wrap ">
                              <div className="md:w-[50%] w-full items-center relative flex ml-0 m-auto md:mb-0 mb-[15px]">
                                <div className="flex w-full justify-evenly">
                                  <div className="sm:max-w-[13%] max-w-[20%] md:m-5 mt-[20px] mx-auto">
                                    <img
                                      src={item.shippingMethodImage}
                                      alt=""
                                    />
                                  </div>
                                  <div className="sm:max-w-[100%] max-w-[46%] m-auto md:mt-auto sm:mt-[40px] mt-[20px]">
                                    <h3 className="text-[#1b5299] font-karla sm:text-[18px] text-[16px] lg:tracking-[0.5px] tracking-0">
                                      {item.shippingData?.node.title}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-[25%] sm:w-[80%] w-[85%] md:m-0 m-auto justify-between flex items-center">
                                <div className="w-[100%]">
                                  <div className="flex justify-between">
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
                              <div className="md:w-[20%] w-0 my-4 ml-4 flex justify-center"></div>
                            </div>

                            // <div className="flex">
                            //   <div className="w-[36rem]">
                            //     <div className="flex m-5">
                            //       <div className="max-w-[20%] m-5">
                            //         <img
                            //           src={item.shippingMethodImage}
                            //           alt=""
                            //         />
                            //       </div>
                            //       <div className="max-w-[100%] mt-10">
                            //         <h3 className="text-[#1b5299] font-karla text-[18px] tracking-[1.5px]">
                            //           {item.shippingData?.node.title}
                            //         </h3>
                            //         <br />
                            //         <br />
                            //       </div>
                            //     </div>
                            //   </div>
                            //   <div className="w-[18rem] gap-5 flex items-center">
                            //     <div className="m-6 w-[16rem]">
                            //       <div className="flex justify-between">
                            //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                            //           {' '}
                            //           Price:
                            //         </span>{' '}
                            //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                            //           $ {item.shippingDataCost}
                            //         </span>
                            //       </div>
                            //       <div className="flex justify-between">
                            //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                            //           {' '}
                            //           Quantity:
                            //         </span>
                            //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                            //           1
                            //         </span>
                            //       </div>
                            //       <div className="flex justify-between">
                            //         <span className="font-karla text-[#1b5299] text-[16px] tracking-[1.5px]">
                            //           {' '}
                            //           Subtotal:
                            //         </span>{' '}
                            //         <span className="font-karla text-[black] text-[16px] tracking-[1.5px]">
                            //           {' '}
                            //           $ {item.shippingDataCost * 1}
                            //         </span>
                            //       </div>
                            //     </div>
                            //   </div>
                            //   <div className="w-[19rem] m-4 flex justify-center items-center"></div>
                            // </div>
                          )}
                        <div className="flex w-full relative mx-auto justify-center ">
                          <div className="m-6">
                            <h3 className="text-[#1b5299] font-karla sm:text-[18px] text-[16px] tracking-[1.5px]">
                              {' '}
                              Subtotal: ${' '}
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
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  {totalPrize && (
                    <div className="w-[85%]  bg-[#FFF6F6] m-auto mt-10 mb-10">
                      <div className="flex p-5 flex-wrap justify-evenly md:gap-0 gap-[10px]">
                        <div className="md:w-[33%] sm:w-[47%] w-[55%] flex items-center justify-center ">
                          <div className="buttonDiv sm:pr-5 m-2 lg:text-[16px] sm:text-[11px] text-[8px]">
                            <button
                              className="bg-[#E30000] text-[#fff] p-2 flex tracking-[1.5px] font-karla "
                              onClick={() => {
                                clearCartBtn();
                              }}
                            >
                              <img
                                src={Del}
                                className="md:w-[20px] md:h-[20px] w-[14px] h-[14px] m-auto cursor-pointer text-[white] mr-1 "
                              />
                              CLEAR SHOPPING CART
                            </button>
                          </div>
                        </div>
                        <div className="md:w-[30%] sm:w-[45%] w-[100%] flex items-center sm:justify-center justify-start sm:order-none order-[-1]">
                          <div className="mt-2 lg:text-2xl  sm:text-[15px] text-[20px] text-[#1b5299] font-karla  mr-4 tracking-[1.5px]">
                            <span className="md:mr-[2px]">GRAND TOTAL</span>
                            <span>${totalPrize.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="md:w-[30%] sm:w-[80%] w-auto  mr-1 flex justify-end ">
                          <div className="">
                            <div className="lg:text-[18px] text-[12px] sm:flex hidden">
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
                            </div>
                            <button
                              disabled={!agree}
                              className="bg-[#EF6E6E] lg:w-[100%] w-auto lg:text-[16px] text-[14px] text-[#fff] p-2  flex justify-center mt-2"
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
                        <div className="text-[9px] sm:hidden flex justify-end w-full">
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
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="w-[85%] m-auto mt-10 mb-10">
                    <div className="p-[30px] bg-[#FFF6F6] md:w-[50%] w-[100%]">
                      <h3 className="text-[30px] font-karla text-[#1b5299]">
                        NOTE
                      </h3>
                      <p className="text-[#000] font-karla">
                        Add special instructions for your order...
                      </p>
                      <textarea
                        name=""
                        className="w-[85%]"
                        id="cart-note"
                        cols="30"
                        rows="4"
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
                  <div className="flex justify-center">
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
          >
            <div className="flex">
              <h2 className="font-bold text-2xl w-[600px] text-center">
                Add a Gift Card
              </h2>
              <BsXCircle className="w-[30%]" onClick={() => setIsOpen(false)} />
            </div>
            <div className="address-data">
              <div className="row  mr-2 ml-2 ">
                <div className="col-4 mt-4 font-bold w-[190px]">
                  Select Gift Card:
                </div>
                <div className="col-8 mt-3 pr-0 w-[370px]">
                  <select
                    className="w-full"
                    onChange={(e) => cardvalFunc(e.target.value)}
                  >
                    <option className="w-full"> Select Gift Card</option>
                    {data.collection.products.edges.map((item, i) => (
                      <option value={i}>{item.node.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row  mr-2 ml-2 ">
                <div className="col-4 mt-4 font-bold w-[190px]">
                  Select Gift Price:
                </div>
                <div className="col-8 mt-3 pr-0 w-[370px]">
                  {cardPriceVal && cardPriceVal.length ? (
                    // <div>heelooo</div>
                    <select
                      name=""
                      id=""
                      className="w-full"
                      onChange={(e) => priceValFunc(e.target.value)}
                    >
                      {cardPriceVal.map((item) => (
                        <option value={item.node.price.amount}>
                          {item.node.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // <AfterCardSel />
                    <select name="" id="">
                      <option value="">Price Card</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="buttonDiv pr-5 items-center mt-[20px]">
                <button
                  className="bg-[#001a5f] text-[#fff] p-2 rounded "
                  onClick={() => updateValueInArray(cardVal)}
                >
                  Add Gift Card
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={modalIsOpen2}
            style={customStyles2}
            contentLabel="Example Modal"
          >
            {bulkAddress.length ? (
              <>
                <BsXCircle
                  className="absolute right-0 cursor-pointer w-[28%]"
                  onClick={() => closeModal()}
                />

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
                        <text className=" text-xl text-center ">
                          Recipient: {item['First Name'] || item.firstName},
                          {item['Last Name'] || item.lastName},
                          {item['Address'] || item.address1},
                          {item['City'] || item.city},
                          {item['State/Province'] || item.state}
                        </text>

                        <h2 className="font-bold text-2xl w-full text-center mt-3">
                          Your Custom Message
                        </h2>
                        <div className="my-7 mr-5 relative flex justify-between">
                          <div>
                            <button
                              onClick={handlePrevClick}
                              className="absolute "
                            >
                              Previous
                            </button>
                          </div>
                          <div>
                            <button
                              className="absolute "
                              onClick={handleNextClick}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                        <div className="w-full items-center bg-[#fff]  mt-5  p-[10px] h-auto ">
                          <text
                            className=" w-full"
                            style={{fontFamily: msgFont}}
                          >
                            {' '}
                            {item.msgData}
                          </text>
                          <br />
                          <text
                            className=" text-center w-full ml-10"
                            style={{fontFamily: msgFont}}
                          >
                            {msglastText}
                          </text>
                        </div>
                        <div>
                          <text>Font: {msgFont}</text>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <>
                <div className="flex">
                  <div className="w-full mt-[10px]">
                    <text className=" text-xl text-center ">
                      Recipient: {reciverAddress.firstName},
                      {reciverAddress.address1},{reciverAddress.city},
                      {reciverAddress.country}
                    </text>
                  </div>

                  <BsXCircle
                    className="cursor-pointer w-[28%]"
                    onClick={() => closeModal()}
                  />
                </div>
                <h2 className="font-bold text-2xl w-full text-center mt-3">
                  Your Custom Message
                </h2>
                <div className="w-full items-center bg-[#fff] h-auto mt-5  p-[10px]">
                  <text
                    className="text-2xl w-full"
                    style={{fontFamily: msgFont}}
                  >
                    {' '}
                    {msgShow}
                  </text>
                  <br />
                  <text
                    className="text-2xl text-center w-full ml-10"
                    style={{fontFamily: msgFont}}
                  >
                    {msglastText}
                  </text>
                </div>
                <div>
                  <text>Font: {msgFont}</text>
                </div>
              </>
            )}
          </Modal>
        </>
      ) : (
        <CheckoutData
          setShowCartPage={setShowCartPage}
          StripeKey={StripeKey}
          totalPrize={totalPrize}
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
  `;

const PostalProduct = `#graphql
  query
  {
    product(id:"gid://shopify/Product/7032044912745"){
      title
      variants(first:10){
        edges{
          node{
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
