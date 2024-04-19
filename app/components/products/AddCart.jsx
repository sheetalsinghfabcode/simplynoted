import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@remix-run/react';
import DynamicButton from '../DynamicButton';
import { useStateContext } from '~/context/StateContext';
import AddressForm from '../addressBook/AddressForm';
import Loader from '../modal/Loader';
import { Modal } from '../Modal';
import location from '../../../location.json';
import Instruction from '../modal/Instruction';
import CircularLoader from '../CircularLoder';
import { getApi, postApi } from '~/utils/ApiService';
import { API_PATH } from '~/utils/Path';
import { BsJustify } from 'react-icons/bs';

let customerid, cartDataReq, selectedOrder;
export function AddCart({
  show,
  data,
  productData,
  editOrderValue,
  shippingData,
  fontFamilyName,
  customFontName,
  variantsVal,
  metafields,
  productId,
}) {
  const {
    addressForm,
    setAddressForm,
    setEditAddress,
    setDefaultAddressType,
    showLoader,
    cartData,
    setCartCountVal,
    setIsCartUpdated,
    custometId,
  } = useStateContext();

  const [returnAddress, setReturnAddress] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
    editOrderValue?.data ? editOrderValue.data.reciverAddress : null,
  );
  const [selectedItem2, setSelectedItem2] = useState(
    editOrderValue?.data ? editOrderValue.data.senderAddress : null,
  );
  const [selectShipMode, setSelectShipMode] = useState(
    editOrderValue?.data
      ? editOrderValue.data.shippingData
      : shippingData.variants.edges[0],
  );
  const [searchData, setsearchData] = useState(null);
  const [searchData2, setsearchData2] = useState(null);
  const [cardVal, setCardVal] = useState('');
  const [cardPriceVal, setCardPriceVal] = useState([]);
  const [buttonTextChange, setButtonTextChange] = useState(false);

  const [cardPriceTitle, setCardPriceTitle] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardPriceTitle : '',
  );
  const [cardName, setCardName] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardName : '',
  );
  const [giftCardUrl, setGiftCardUrl] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardProdUrl : '',
  );
  const [cardImg, setCardImg] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardImg : '',
  );
  const [cardPrice, setCardPrice] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardPrice : '',
  );

  const [giftCardId, setGiftCardId] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardId : '',
  );
  const [MsgText, setMesgtext] = useState('');
  const [loader, setLoader] = useState(false);
  const [showShipAddress, setShowShipAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [onSaveShip, setSaveShip] = useState(false);
  const [formData, setFormData] = useState({
    firstName: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.firstName
      : '',
    lastName: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.lastName
      : '',
    address1: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.address1
      : '',
    address2: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.address2
      : '',
    city: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.city
      : '',
    state: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.state
      : '',
    postalCode: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.postalCode
      : '',
    country: editOrderValue?.data
      ? editOrderValue.data.locationForShipMethod?.country
      : 'USA',
  });
  const [checkSelAddress, setCheckSelAddress] = useState(false);
  const [stateCheckCart, setStateCheckCart] = useState(true);
  const [reqFields, setReqFields] = useState(false);
  const [offPrice, setOffPrice] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const [variantID, setVariantID] = useState('');
  const [apiVariantID, setApiVariantID] = useState('');
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [finalPrice, setFinalPrice] = useState('');
  const [selectedBoxCheck, setSelectedBoxCheck] = useState(false);
  const [selectedBoxCheck2, setSelectedBoxCheck2] = useState(false);
  const [purchaseType, setPurchaseType] = useState('');
  const [giftPriceVariantId, setGiftPriceVariantID] = useState('');

  useEffect(() => {
    setIsInitialRender(false);
    const selectedOrder = localStorage.getItem('selectedOrderPurchaseQuantity');
    setPurchaseType(selectedOrder);
    const discountedCount = JSON.parse(localStorage.getItem('packageDiscount'));
    setOffPrice(discountedCount);
    const cartDataReq = JSON.parse(localStorage.getItem('reqFielddInCart'));

    const fetchData = async () => {
      if (selectedOrder === 'Single Card') {
        setVariantID(productData?.id?.match(/\d+/g).join(''));
        setFinalPrice(
          (
            productData?.price?.amount -
            (productData?.price?.amount * discountedCount) / 100
          ).toFixed(2),
        );
      } else {
        const targetValue = cartDataReq?.csvFileLen;
        if (variantsVal?.variants?.nodes.length) {
          try {
            const matchedVariant = await findMatchingVariant(
              variantsVal?.variants?.nodes,
              targetValue,
              discountedCount,
            );
            if (matchedVariant) {
              setVariantID(matchedVariant.replace(/[^0-9]/g, ''));
              setUpdatedPrice(finalPrice);
            }
          } catch (error) {
            console.error('Error while fetching data:', error);
          }
        }
      }
    };

    fetchData();
  }, []);

  const findMatchingVariant = async (variants, targetValue, discount) => {
    let matchedVariant = null;
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const quantityRange = variant.title;
      let lastValue = parseInt(quantityRange.split(' -')[1]);
      if (!isNaN(lastValue) && lastValue >= targetValue) {
        matchedVariant = variant.id;
        if (discount > 0) {
          setFinalPrice(
            (
              variant.price.amount -
              (variant.price.amount * discount) / 100
            ).toFixed(2),
          );
        } else {
          setFinalPrice(variant.price.amount);
        }
        break; // Exit the loop when a match is found
      } else if (quantityRange.includes('+')) {
        lastValue = parseInt(quantityRange.split('+')[0]);
        if (!isNaN(lastValue) && lastValue < targetValue) {
          matchedVariant = variant.id;
          break; // Exit the loop when a match is found
        }
      }
    }

    return matchedVariant;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      // Find the selected country's states
      const selectedCountry = location.countries.find(
        (country) => country.country === value,
      );
      setFormData((prev) => ({
        ...prev,
        country: value,
        state: selectedCountry ? selectedCountry.states[0] : '',
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  const selectedCountry = location.countries.find(
    (country) => country.country === formData.country,
  );
  function onNewAddressClick() {
    setAddressForm(true);
    setsearchData2(null);
    setsearchData(null);
  }

  async function getRecipient() {
    setLoader(true);

    try {
      const res = await getApi(
        `${API_PATH.GET_ADDRESS}${customerid}&type=recipient`,
      );
      // fetch(
      //   `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`,
      // );
      const json = await res.json();
      setRecipientAddress(json.result);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }
  async function getReturn() {
    setLoader(true);

    try {
      const res = await getApi(
        `${API_PATH.GET_ADDRESS}${customerid}&type=return`,
      );
      // fetch(
      //   `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=return`,
      // );
      const json = await res.json();
      setReturnAddress(json.result);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }
  const handleCheckboxChange = (item) => {
    setSelectedItem(item);
    if (selectedItem == item) {
      setSelectedBoxCheck(!selectedBoxCheck);
      setSelectedItem(null);
    } else {
      setSelectedBoxCheck(false);
    }
  };
  const handleCheckboxChange2 = (item) => {
    setSelectedItem2(item);
    if (selectedItem2 == item) {
      setSelectedBoxCheck2(!selectedBoxCheck2);
      setSelectedItem2(null);
    } else {
      setSelectedBoxCheck2(false);
    }
  };

  const handleBoxoNShipping = (item) => {
    setSelectShipMode((prevMode) => (prevMode === item ? null : item));
  };

  const filteredList = (recipientAddress, searchData) => {
    return recipientAddress.filter((dataobj) => bySearch(dataobj, searchData));
  };

  const bySearch = (dataobj, searchData) => {
    if (searchData) {
      return Object.values(dataobj).some((field) =>
        field.toString().toLowerCase().includes(searchData.toLowerCase()),
      );
    } else return dataobj;
  };

  const filteredForSender = (returnAddress, searchData2) => {
    return returnAddress.filter((dataobj) => searchBy(dataobj, searchData2));
  };
  const searchBy = (dataobj, searchData2) => {
    if (searchData2) {
      return Object.values(dataobj).some((field) =>
        field.toString().toLowerCase().includes(searchData2.toLowerCase()),
      );
    } else return dataobj;
  };
  const cardvalFunc = async (item) => {
    setCardVal(item);
    let selCardName = data.collection.products.edges[item].node;
    setCardName(selCardName.title);
    setCardImg(selCardName.featuredImage.url);
    setGiftCardUrl(selCardName.onlineStoreUrl);
    let arrCardPrice = data.collection.products.edges[item].node.variants.edges;
    setGiftCardId(arrCardPrice[0].node.id.match(/\d+/g).join(''));
    let firstPrice = arrCardPrice[0].node.price.amount;
    setCardPrice(firstPrice);
    setCardPriceTitle(arrCardPrice[0].node.title);
    setCardPriceVal(arrCardPrice);
    setGiftPriceVariantID(arrCardPrice[0].node.id);
  };

  const priceValFunc = async (item) => {
    let priceAmount = cardPriceVal[item].node.price.amount;
    let priceTitle = cardPriceVal[item].node.title;
    let variantIDs = cardPriceVal[item].node.id;
    setCardPrice(priceAmount);
    setCardPriceTitle(priceTitle);
    setGiftCardId(variantIDs.match(/\d+/g).join(''));
  };
  useEffect(() => {
    customerid = localStorage.getItem('customerId');
    cartDataReq = JSON.parse(localStorage.getItem('reqFielddInCart'));
    let discountedCount = JSON.parse(localStorage.getItem('packageDiscount'));
    setOffPrice(discountedCount);
    // if (discountedCount > 0) {
    //   setUpdatedPrice(
    //     (
    //       productData.price.amount -
    //       (productData.price.amount * discountedCount) / 100
    //     ).toFixed(2),
    //   );
    // }
    setMesgtext(cartDataReq?.msg);
    getRecipient();
    getReturn();
  }, [addressForm, showLoader, buttonTextChange]);
  useEffect(() => {
    if (!isInitialRender) {
      onClickAddCart();
    }
  }, [apiVariantID]);

  const navigate = useNavigate();
  let arrOfObj = {
    productTitle: productData?.product?.title
      ? productData.product.title
      : null,
    productId: productId ? productId : null,
    variant_id: apiVariantID ? apiVariantID : variantID,
    price: finalPrice ? finalPrice : productData?.price?.amount,
    productImg: productData?.image?.url,
    senderAddress: selectedItem2,
    reciverAddress: selectedItem,
    giftCardName: cardName && stateCheckCart ? cardName : null,
    giftCardId: giftCardId && stateCheckCart ? giftCardId : null,
    giftCardImg: cardImg && stateCheckCart ? cardImg : null,
    giftCardPrice: cardPrice && stateCheckCart ? cardPrice : null,
    giftCardPriceTitle: cardPriceTitle && stateCheckCart ? cardPriceTitle : '',
    giftCardProdUrl: giftCardUrl && stateCheckCart ? giftCardUrl : null,
    messageData: MsgText,
    fontFamily: fontFamilyName ? fontFamilyName : 'great vibes',
    productGetUrl: window?.location.pathname,
    endText: cartDataReq?.signOffText,
    csvFileURL: cartDataReq?.csvFileBulk,
    csvFileLen: cartDataReq?.csvFileLen,
    usCount: cartDataReq?.usCount,
    nonUSCount: cartDataReq?.nonUsCount,
    csvBulkData: cartDataReq?.bulkCsvData,
    shippingData: selectShipMode ? selectShipMode : '',
    shippingMethodImage: selectShipMode ? shippingData.featuredImage.url : '',
    shippingMethodProdUrl: selectShipMode ? shippingData.onlineStoreUrl : '',
    locationForShipMethod: formData ? formData : '',
    shippingDataCost: selectShipMode ? selectShipMode.node.price.amount : '',
    fontSizeMsg: cartDataReq?.fontSize,
    customFontName: customFontName ? customFontName : 'Select Custom Font',
    lineHeight: cartDataReq?.lineHeight,
    signOffLineHeight: cartDataReq?.signOffLineHeight,
    signOffFontSize: cartDataReq?.signOffFontSize,
    isShippidata: show ? show : false,

    optionalShipDate: cartDataReq?.ship_date,
    custom_pdf: metafields ? metafields.pdfURL : null,
  };

  async function onClickAddCart() {

    if (selectedItem2 === null || (selectedItem === null && !show)) {
      setCheckSelAddress(true);
      return;
    }
    setButtonTextChange(true);

    try {
      setLoader(false);
      // Construct new cart item
      const newCartItem = {
        productTitle: productData?.product?.title
          ? productData.product.title
          : null,
        productId: productId ? productId.replace(/[^0-9]/g, '') : null,
        variant_id: apiVariantID ? apiVariantID : variantID,
        cartTotal: finalPrice ? finalPrice : productData?.price?.amount,
        productImg: productData?.image?.url,
        senderAddress: selectedItem2,
        reciverAddress: selectedItem,
        giftCardName: cardName && stateCheckCart ? cardName : null,
        giftCardId: giftCardId && stateCheckCart ? giftCardId : null,
        giftCardImg: cardImg && stateCheckCart ? cardImg : null,
        giftCardPrice: cardPrice && stateCheckCart ? cardPrice : null,
        giftCardPriceTitle:
          cardPriceTitle && stateCheckCart ? cardPriceTitle : '',
        giftCardProdUrl: giftCardUrl && stateCheckCart ? giftCardUrl : null,
        messageData: cartDataReq.msg ? cartDataReq.msg : MsgText,
        fontFamily: fontFamilyName ? fontFamilyName : 'great vibes',
        productGetUrl: window?.location.pathname,
        endText: cartDataReq?.signOffText,
        csvFileURL: cartDataReq?.csvFileBulk,
        qyt: cartDataReq?.csvFileLen,
        usCount: cartDataReq?.usCount,
        nonUSCount: cartDataReq?.nonUsCount,
        csvBulkData: !cartDataReq?.csvFileBulk && cartDataReq?.bulkCsvData,
        shippingData: selectShipMode ? selectShipMode : '',
        shippingMethodImage: selectShipMode
          ? shippingData.featuredImage.url
          : '',
        shippingMethodProdUrl: selectShipMode
          ? shippingData.onlineStoreUrl
          : '',
        locationForShipMethod: formData ? formData : '',
        shippingDataCost: selectShipMode
          ? selectShipMode.node.price.amount
          : '',
        fontSizeMsg: cartDataReq?.fontSize,
        customFontName: customFontName ? customFontName : 'Select Custom Font',
        lineHeight: cartDataReq?.lineHeight,
        signOffLineHeight: cartDataReq?.signOffLineHeight,
        signOffFontSize: cartDataReq?.signOffFontSize,
        isShippidata: show ? show : false,
        optionalShipDate: cartDataReq?.ship_date,
        custom_pdf: metafields ? metafields.pdfURL : null,
      };

      const storedData = editOrderValue
        ? cartData.map(item => {
          if (item.productId === newCartItem.productId) {
            return newCartItem;
          } else {
            return item;
          }
        })
        : [...cartData, newCartItem];


      // Define the API URL
      const url = 'https://testapi.simplynoted.com/api/storefront/cart-items';

      // Make POST request to update data
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerid,
          cartItems: storedData,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.result.success) {
          setLoader(false);
          setIsCartUpdated(true);
          setCartCountVal(storedData.length);
          navigate('/cart');
          setTimeout(() => {
            setButtonTextChange(false);
          }, [300]);
        }
        // Proceed with any further actions upon successful update
      } else {
        throw new Error('Failed to update data');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }

  function closeSelAddressModal() {
    setCheckSelAddress(false);
  }
  function onpenAddCardModal() {
    setShowShipAddress(true);
  }
  function closeModal() {
    setShowShipAddress(false);
  }
  function OnSaveClickShipAddress() {
    if (
      formData.address1 &&
      formData.city &&
      formData.country &&
      formData.firstName &&
      formData.lastName &&
      formData.postalCode &&
      formData.state
    ) {
      setSaveShip(true);
      setShowShipAddress(false);
    } else {
      setReqFields(true);
    }
  }

  function onClickOFAddCartBtn() {
    if (offPrice > 0) {
      onClickAddCart(); //before here was newDiscountedCard function
    } else {
      onClickAddCart();
    }
  }
  async function newDiscountedCard() {
    try {
      setLoader(true);
      let tagsData = `customise_card, customise_card_edited, packageDiscount_${offPrice}`;

      const res = await fetch(
        'https://api.simplynoted.com/api/new-discounted-card',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNiYjVhOTAwODcwZjFmMjQ3OGRjNjkiLCJ1c2VyIjp7ImVtYWlsIjoiZmFicHJvamVjdG1hbmFnZXJAZ21haWwuY29tIiwic2hvcGlmeUlkIjoiNjIzMjYyMjg5MTExMyIsIl9pZCI6IjY0M2JiNWE5MDA4NzBmMWYyNDc4ZGM2OSIsImZpcnN0X25hbWUiOiJQcmFkZWVwIiwibGFzdF9uYW1lIjoic2luZ2gifSwiaWF0IjoxNjkwNDQwNDY0fQ.5s5g9A2PtZ8Dr5dQZsd0D9wWTT2BzDioqDXzTbIJPko',
          },
          body: JSON.stringify({
            quantity: 1,
            title: productData.product.title,
            tags: tagsData,
            featuredImage: productData.image.url,
            price: finalPrice,
          }),
        },
      );
      const json = await res.json();
      if (json.result) {
        setApiVariantID(json.result.product.variants[0].id);
        setLoader(false);
      }
    } catch (error) { }
  }
  return (
    <div className="relative global-max-width-handler">
      {loader && !addressForm  && !buttonTextChange && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 flex justify-center items-center z-50">
          <CircularLoader textColor="text-white" title="Loading Address.." />
        </div>
      )}

      <>
        {addressForm && (
          <div className="md:w-full w-[100%]  max-w-[1440px] ">
            <AddressForm
              customerID={customerid}
              setAddressForm={setAddressForm}
              setEditAddress={setEditAddress}
            />
          </div>
        )}
        {!addressForm && (
          <div
            className={`w-[100%] h-full gap-2 my-[2rem] flex justify-center flex-wrap ${loader ? 'opacity-40' : ''
              }`}
          >
            <div className="row flex md:flex-row flex-col gap-4 mr-2 ml-2 justify-between w-full">
              <div className="col-6 md:w-[49%] w-full  rounded-md  bg-[#FAFAFA] border border-[#dbdbdb]">
                <div className=" max-h-[600px] small:p-[20px] p-[10px] overflow-y-auto">
                  <div className="address-data">
                    <h3 className="sm:text-[26px] text-[18px] small:my-8 my-4 font-bold">
                      Your Info (return/sender address)
                    </h3>
                    <DynamicButton
                      className="bg-[#1b5299] text-[14px] small:font-normal font-light small:px-[15px] px-[8px] py-2.5 "
                      text="+ New Address"
                      onClickFunction={() => {
                        setDefaultAddressType('return');
                        onNewAddressClick();
                      }}
                    />
                    <div>
                      <input
                        type="text "
                        className="w-full rounded-xl p-3 small:my-4 my-2 border-2 border-[#aaa] text-black font-normal "
                        onChange={(e) => setsearchData2(e.target.value)}
                        placeholder="Search Addresses..."
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                    {filteredForSender(returnAddress, searchData2).reverse().map(
                      (item, index) => (
                        <div
                          key={index}
                          className={`  ${selectedItem2?._id === item._id && !selectedBoxCheck2 ? 'bg-[#ffdada] ' : 'bg-white '} w-full border rounded-md border-[#e8e1e1] px-3 small:py-[16px] py-3  text-black font-bold sm:text-[14px] text-[12px] cursor-pointer flex items-center`}
                          onClick={() => handleCheckboxChange2(item)}
                        >
                          <input
                            className="cursor-pointer border-2 border-black"
                            type="checkbox"
                            value={item}
                            checked={
                              selectedItem2?._id === item._id &&
                              !selectedBoxCheck2
                            }
                            onChange={() => handleCheckboxChange2(item)}
                          />
                          <span className="font-karla ml-4">
                            {item.firstName} {item.lastName}, {item.city},
                            {item.state}, {item.zip}, {item.country}
                          </span>
                        </div>
                      ),
                    )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 md:w-[49%] w-full  rounded-md  bg-[#FAFAFA] border border-[#dbdbdb]">
                <div className=" max-h-[600px] small:p-[20px] p-[10px] overflow-y-auto">
                  <div className="address-data">
                    <h3 className="sm:text-[26px] text-[18px] small:my-8 my-4 font-bold">
                      Recipient address
                    </h3>
                    {show ? (
                      <div>
                        <span className="sm:text-[16px] text-[14px]">
                          Recipient addresses were specified in your bulk order
                          upload.
                        </span>
                      </div>
                    ) : (
                      <>
                        <DynamicButton
                          className="bg-[#1b5299] text-[14px] small:font-normal font-light small:px-[15px] px-[8px] py-2.5 "
                          text="+ New Address"
                          onClickFunction={() => {
                            setAddressForm(true);
                            setDefaultAddressType('recipient');
                            setsearchData(null);
                            setsearchData2(null);
                          }}
                        />
                        <div>
                          <input
                            type="text "
                            className="w-full rounded-xl p-3 small:my-4 my-2 border-2 border-[#aaa] text-black font-normal"
                            onChange={(e) => setsearchData(e.target.value)}
                            placeholder="Search Addresses..."
                          />
                        </div>
                        <div className='flex flex-col gap-3'>
                        {filteredList(recipientAddress, searchData).reverse().map(
                          (item, index) => (
                            <div
                              key={index}
                              className={` ${selectedItem?._id === item._id && !selectedBoxCheck ? 'bg-[#ffdada] ' : 'bg-white '} w-full border rounded-md border-[#e8e1e1] px-3 small:py-[16px] py-3  text-black font-bold flex items-center sm:text-[14px] text-[12px] cursor-pointer`}
                              onClick={() => handleCheckboxChange(item)}
                            >
                              <input
                                className="cursor-pointer border-2 border-black"
                                type="checkbox"
                                value={item}
                                checked={
                                  selectedItem?._id === item._id &&
                                  !selectedBoxCheck
                                }
                                onChange={() => handleCheckboxChange(item)}
                              // ref={refRec}
                              />

                              <span className="font-karla ml-4">
                                {item.firstName} {item.lastName}, {item.city},
                                {item.state}, {item.zip}, {item.country}
                              </span>
                            </div>
                          ),
                        )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`row flex  md:flex-row flex-col   mr-2 ml-2 gap-[2rem] mt-[1.5rem]  w-full ${show ? 'justify-end' : 'justify-start'
                }`}
            >
              {show && (
                <div className="col-6 md:w-[49%] w-full   rounded-md  bg-[#FAFAFA] border border-[#dbdbdb]">
                  <div className="max-h-[600px] small:p-[20px] p-[15px] overflow-y-auto ">
                    <h3 className="sm:text-[26px] text-[18px] font-bold small:my-8 my-4">
                      {shippingData?.title}
                    </h3>

                    <div
                      className="shipping-methods grid grid-cols-1 sm:grid-cols-2 gap-x-[14px] gap-y-[8px]"
                      id="shipping-options"
                    >
                      {shippingData?.variants.edges.map((item, index) => (
                        <div
                          onClick={() => handleBoxoNShipping(item)}
                          className="flex flex-col gap-[6px] cursor-pointer"
                          key={index}
                        >
                          <div className="">
                            <input
                              className="mr-2 cursor-pointer"
                              value={item}
                              checked={
                                selectShipMode &&
                                selectShipMode?.node.title === item.node.title
                              }
                              type="radio"
                            />
                            <label
                              className="font-medium cursor-pointer tab:text-[16px] text-[14px]"
                              htmlFor="Mail-Individual-Cards-Normally-(default)"
                            >
                              {item?.node.title}
                            </label>
                          </div>
                          <div className="custom_variant_price cursor-pointer font-medium tab:text-[16px] text-[14px]">
                            ${Number(item?.node.price.amount).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-6 md:w-[49%] w-full  rounded-md   bg-[#FAFAFA] border border-[#dbdbdb]">
                <div className="max-h-[600px] sm:p-[20px] py-[15px] px-3 overflow-y-auto small:mt-10 my-4">
                  <div className="address-data">
                    <h3 className="sm:text-[26px] text-[18px] font-bold mb-5">
                      Add a Gift Card
                    </h3>
                    <div className="row flex text-[14px] justify-between p-[10px]">
                      <div className="col-4 mt-4 font-bold ">
                        Select Gift Card:
                      </div>
                      <div className="col-8  pr-0 w-[58%] ">
                        <select
                          className="w-full font-karla font-normal text-black border border-[#dbdbdb] h-12 rounded-md"
                          onChange={(e) => cardvalFunc(e.target.value)}
                        >
                          <option
                            className="w-full font-karla"
                            selected
                            disabled
                          >
                            {cardName ? cardName : 'Select Gift Card'}
                          </option>
                          {data.collection.products.edges.map((item, i) => (
                            <option className="font-karla" value={i} key={i}>
                              {item.node.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row flex text-[14px] justify-between p-[10px]">
                      <div className="col-4 mt-4 font-bold ">
                        Select Gift Price:
                      </div>
                      <div className="col-8 pr-0 w-[58%]">
                        {cardPrice ? (
                          // <div>heelooo</div>
                          <select
                            name=""
                            id=""
                            className="w-full font-karla font-normal text-black  border border-[#dbdbdb] h-12 rounded-md"
                            onChange={(e) => priceValFunc(e.target.value)}
                          >
                            <option selected disabled className="font-karla">
                              {cardPriceTitle}
                            </option>
                            {cardPriceVal.map((item, i) => (
                              <option className="font-karla" value={i} key={i}>
                                {item.node.title}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            name=""
                            id=""
                            className="w-full font-karla font-normal text-black border border-[#dbdbdb] h-12 rounded-md"
                          >
                            <option value="" className="font-karla">
                              {'Price Card'}
                            </option>
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="mt-[20px]">
                      <input
                        type="checkbox"
                        id=""
                        className={`${cardPriceTitle
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed'
                          }`}
                        name=""
                        value=""
                        onChange={() => setStateCheckCart(!stateCheckCart)}
                        checked={cardPriceTitle && stateCheckCart}
                      />
                      <span className="ml-3 mt-[6px] text-[14px] font-bold">
                        Add Gift Card
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {((onSaveShip &&
              selectShipMode &&
              selectShipMode.node.price.amount !== '0.0') ||
              (purchaseType == 'Bulk Purchase' &&
                editOrderValue?.data?.isShippidata &&
                editOrderValue?.data?.locationForShipMethod.firstName &&
                editOrderValue?.node?.price?.amount !== '0.0')) && (
                <div className="w-[600px] border border-solid border-black p-3 mt-3 ml-3">
                  {formData?.firstName}, {formData?.lastName},{formData?.address1}
                  , {formData?.city}, {formData?.state},{formData?.country}
                </div>
              )}
            <div
              className={`row flex mt-4 w-full ${selectShipMode && selectShipMode.node.price.amount !== '0.0'
                  ? 'justify-between'
                  : ''
                } font-normal text-[14px]`}
            >
              {selectShipMode && selectShipMode.node.price.amount !== '0.0' && (
                <div className="buttonDiv my-2">
                  <DynamicButton
                    className="bg-[#1b5299] sm:text-[14px] text-[11px] opacity-65 px-8 py-4 w-full "
                    text={
                      onSaveShip || editOrderValue?.data
                        ? 'Change Shipping Address'
                        : 'Enter the shipping address for the package'
                    }
                    onClickFunction={() => onpenAddCardModal()}
                  />
                </div>
              )}
              <div className="buttonDiv  my-2">
                <DynamicButton
                  className="bg-[#1b5299] w-[190px] h-[45px] opacity-65 px-8 py-4 "
                  text={buttonTextChange ? 'ADDING...' : 'ADD TO CART'}
                  // disabled={!agree}x`x`
                  onClickFunction={() => onClickOFAddCartBtn()}
                />
              </div>
            </div>
          </div>
        )}
        {showShipAddress && (
          <Modal
            children={
              <div className="w-[100%]  p-3 mt-3">
                <div className="lg:text-[30px] sm:text-[26px]  text-[20px] text-[#001a5f] font-bold flex justify-center pb-[25px]">
                  BULK SHIPPING ADDRESS
                </div>
                {reqFields && (
                  <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                    Please add all fields with * that are Mandatory
                  </p>
                )}
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor=""
                      className="text-[#001a5f] font-bold text-sm "
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid rounded border-black p-3 w-[100%]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-[#001a5f] font-bold text-sm "
                    >
                      Last Name*
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid rounded border-black p-3 w-[100%]"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-4 gap-0">
                  <div className="mt-[9px]">
                    <label
                      htmlFor=""
                      className="text-[#001a5f] font-bold text-sm "
                    >
                      Address1*
                    </label>
                    <input
                      id="address1"
                      name="address1"
                      type="text"
                      placeholder="Address"
                      required
                      value={formData.address1}
                      onChange={(e) => handleChange(e)}
                      className=" border border-solid rounded border-black p-3 w-[100%]"
                    />
                  </div>
                  <div className="mt-[8px]">
                    <label
                      htmlFor=""
                      className="text-[#001a5f] font-bold text-sm "
                    >
                      Address 2
                    </label>
                    <input
                      id="address2"
                      name="address2"
                      type="text"
                      placeholder="Address 2"
                      value={formData.address2}
                      onChange={(e) => handleChange(e)}
                      className=" border border-solid rounded border-black p-3 w-[100%]"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-4 gap-0">
                  <div className="mt-[12px]">
                    <label
                      htmlFor=""
                      className="text-[#001a5f] font-bold text-sm "
                    >
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleChange(e)}
                      className=" border border-solid rounded border-black p-3 w-[100%]"
                    />
                  </div>
                  <div className="mt-[12px]">
                    <label
                      htmlFor=""
                      className="text-[#001a5f] font-bold text-sm "
                    >
                      Postal Code*
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="number"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={(e) => handleChange(e)}
                      className="border border-solid rounded border-black p-3 w-[100%]"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-4 gap-0">
                  <div className="mt-[12px]">
                    <label
                      className="text-[#001a5f] font-bold text-sm"
                      htmlFor="country"
                    >
                      Country*
                    </label>
                    <select
                      onChange={(e) => handleChange(e)}
                      value={formData.country}
                      itemID="country"
                      name="country"
                      id="country"
                      className="appearance-none h-[42px]  rounded w-full py-2 px-3 border  border-black leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {location.countries.map((country, index) => (
                        <option key={index} value={country.country}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-[12px]">
                    <label
                      className="text-[#001a5f] font-bold text-sm "
                      htmlFor="country"
                    >
                      State*
                    </label>
                    <select
                      onChange={(e) => handleChange(e)}
                      value={formData.state}
                      name="state"
                      className={`appearance-none h-[42px] rounded w-full py-2 px-3 border  border-black leading-tight focus:outline-none focus:shadow-outline  ${errors.state ? 'border-red-500' : ''
                        }`}
                      id="state"
                    >
                      <option value="">Select a state</option>
                      {selectedCountry &&
                        selectedCountry.states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500  text-[14px] font-semibold italic">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:flex grid items-center  mt-[24px] gap-[8px] justify-between">
                  <div>
                    <DynamicButton
                      className="bg-[#ef6e6e] !w-[190px] h-[40px]"
                      text="Cancel"
                      onClickFunction={() => closeModal()}
                    />
                  </div>
                  <div>
                    <DynamicButton
                      className="bg-[#1b5299] !w-[190px] h-[40px]"
                      text="Save Address"
                      onClickFunction={() => OnSaveClickShipAddress()}
                    />
                  </div>
                </div>
              </div>
            }
            cancelLink={closeModal}
          />
        )}

        <Instruction
          isOpen={checkSelAddress}
          title="Please Select Address"
          button={true}
          image={true}
          closeModal={closeSelAddressModal}
          table={false}
        />
      </>
    </div>
  );
}
