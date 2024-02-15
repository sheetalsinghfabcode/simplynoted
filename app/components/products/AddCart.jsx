import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from '@remix-run/react';
import DynamicButton from '../DynamicButton';
import {useStateContext} from '~/context/StateContext';
import AddressForm from '../addressBook/AddressForm';
import Loader from '../modal/Loader';
import {Modal} from '../Modal';
import location from '../../../location.json';
import Instruction from '../modal/Instruction';
import CircularLoader from '../CircularLoder';
import { getApi } from '~/utils/ApiService';
import { API_PATH } from '~/utils/Path';

let customerid, cartDataReq;
export function AddCart({
  show,
  setProductShow,
  data,
  productData,
  editOrderValue,
  shippingData,
  fontFamilyName,
  customFontName,
}) {
  const {
    addresses,
    setAddresses,
    loadAddress,
    setLoadAddress,
    addressForm,
    setAddressForm,
    editAddress,
    setEditAddress,
    selectedAddress,
    setSelectedAddress,
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

  const [cardPriceTitle, setCardPriceTitle] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardPriceTitle : '',
  );
  const [cardName, setCardName] = useState(
    editOrderValue?.data ? editOrderValue.data.giftCardName : '',
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

  const [defaultOption, setDefaultOption] = useState(null);

  const handleButtonClick = (option) => {
    setDefaultOption(option);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
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
  }

  async function getRecipient() {
    setLoader(true);

    try {
      const res = await getApi(`${API_PATH.GET_ADDRESS}${customerid}&type=recipient`)
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
      const res = await getApi(`${API_PATH.GET_ADDRESS}${customerid}&type=return`)
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
  };
  const handleCheckboxChange2 = (item) => {
    setSelectedItem2(item);
  };
  const handleBoxoNShipping = (item) => {
    setSelectShipMode(item);
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
    let arrCardPrice = data.collection.products.edges[item].node.variants.edges;
    console.log('arrCardPrice', arrCardPrice);
    setGiftCardId(arrCardPrice[0].node.id.match(/\d+/g).join(''));

    let firstPrice = arrCardPrice[0].node.price.amount;
    setCardPrice(firstPrice);
    setCardPriceTitle(arrCardPrice[0].node.title);
    setCardPriceVal(arrCardPrice);
  };


  const priceValFunc = async (item) => {
    let priceAmount = cardPriceVal[item].node.price.amount;
    let priceTitle = cardPriceVal[item].node.title;
    setCardPrice(priceAmount);
    setCardPriceTitle(priceTitle);
  };
  useEffect(() => {
    customerid = localStorage.getItem('customerId');
    cartDataReq = JSON.parse(localStorage.getItem('reqFielddInCart'));
    console.log("**********",cartDataReq);
    let discountedCount = JSON.parse(localStorage.getItem('packageDiscount'));
    setOffPrice(discountedCount);
    setMesgtext(cartDataReq.msg);
    getRecipient();
    getReturn();
  }, [addressForm]);
  const navigate = useNavigate();
  let arrOfObj = {
    productTitle: productData.product.title ? productData.product.title : null,
    variant_id: productData.id,
    price:
      offPrice > 0
        ? (
            productData.price.amount -
            (productData.price.amount * offPrice) / 100
          ).toFixed(2)
        : productData.price.amount,
    productImg: productData.image.url,
    senderAddress: selectedItem2,
    reciverAddress: selectedItem,
    giftCardName: cardName && stateCheckCart ? cardName : null,
    giftCardId: giftCardId && stateCheckCart ? giftCardId : null,
    giftCardImg: cardImg && stateCheckCart ? cardImg : null,
    giftCardPrice: cardPrice && stateCheckCart ? cardPrice : null,
    giftCardPriceTitle: cardPriceTitle && stateCheckCart ? cardPriceTitle : '',
    messageData: MsgText,
    fontFamily: fontFamilyName ? fontFamilyName : 'tarzan',
    productGetUrl: window?.location.pathname,
    endText: cartDataReq?.signOffText,
    csvFileURL: cartDataReq?.csvFileBulk,
    csvFileLen: cartDataReq?.csvFileLen,
    usCount: cartDataReq?.usCount,
    nonUSCount: cartDataReq?.nonUsCount,
    csvBulkData: cartDataReq?.bulkCsvData,
    shippingData: selectShipMode ? selectShipMode : '',
    shippingMethodImage: selectShipMode ? shippingData.featuredImage.url : '',
    locationForShipMethod: formData ? formData : '',
    shippingDataCost: selectShipMode ? selectShipMode.node.price.amount : '',
    fontSizeMsg: cartDataReq?.fontSize,
    customFontName: customFontName ? customFontName : 'Select Custom Font',
    lineHeight: cartDataReq?.lineHeight,
    signOffLineHeight: cartDataReq?.signOffLineHeight,
    signOffFontSize: cartDataReq?.signOffFontSize,
    isShippidata: show ? show : false,
  };

  let keyUpdate1 = 'messageData';
  let keyUpdate2 = 'reciverAddress';
  let keyUpdate3 = 'senderAddress';
  let keyUpdate4 = 'giftCardImg';
  let keyUpdate5 = 'giftCardName';
  let keyUpdate6 = 'giftCardPrice';
  let keyUpdate7 = 'endText';
  let keyUpdate8 = 'locationForShipMethod';
  let keyUpdate9 = 'shippingData';
  let keyUpdate10 = 'shippingDataCost';
  let keyUpdate11 = 'fontFamily';
  let keyUpdate12 = 'giftCardPriceTitle';
  let keyUpdate13 = 'fontSizeMsg';
  let keyUpdate14 = 'customFontName';
  let keyUpdate15 = 'lineHeight';
  let keyUpdate16 = 'signOffLineHeight';
  let keyUpdate17 = 'signOffFontSize';
  let keyUpdate18 = 'csvFileLen';
  let keyUpdate19 = 'csvBulkData';
  let keyUpdate20 = 'csvFileURL';
  let keyUpdate21 = 'usCount';
  let keyUpdate22 = 'nonUSCount';
  let keyUpdate23 = 'shippingMethodImage';
  let keyUpdate24 = 'isShippidata';
  let keyUpdate25 = 'giftCardId';

  function onClickAddCart() {
    setLoader(true);
    if (editOrderValue?.index >= 0) {
      const storedData = JSON.parse(localStorage.getItem('mydata'));

      if (
        editOrderValue.index >= 0 &&
        editOrderValue.index < storedData.length
      ) {
        storedData[editOrderValue.index][keyUpdate1] = cartDataReq?.msg
          ? cartDataReq?.msg
          : editOrderValue?.data.messageData;
        storedData[editOrderValue.index][keyUpdate2] = selectedItem;
        storedData[editOrderValue.index][keyUpdate3] = selectedItem2;
        storedData[editOrderValue.index][keyUpdate4] =
          cardImg && stateCheckCart ? cardImg : null;
        storedData[editOrderValue.index][keyUpdate5] =
          cardName && stateCheckCart ? cardName : null;
        storedData[editOrderValue.index][keyUpdate25] =
          giftCardId && stateCheckCart ? giftCardId : null;
        storedData[editOrderValue.index][keyUpdate6] =
          cardPrice && stateCheckCart ? cardPrice : null;
        storedData[editOrderValue.index][keyUpdate7] = cartDataReq?.signOffText
          ? cartDataReq?.signOffText
          : editOrderValue?.data.endText;
        storedData[editOrderValue.index][keyUpdate8] = formData ? formData : '';
        storedData[editOrderValue.index][keyUpdate9] = selectShipMode
          ? selectShipMode
          : '';
        storedData[editOrderValue.index][keyUpdate10] = selectShipMode
          ? selectShipMode.node.price.amount
          : '';
        storedData[editOrderValue.index][keyUpdate11] = fontFamilyName
          ? fontFamilyName
          : 'tarzan';
        storedData[editOrderValue.index][keyUpdate12] =
          cardPriceTitle && stateCheckCart ? cardPriceTitle : null;
        storedData[editOrderValue.index][keyUpdate13] = cartDataReq
          ? cartDataReq?.fontSize
          : editOrderValue?.data.fontSizeMsg;
        storedData[editOrderValue.index][keyUpdate14] = customFontName
          ? customFontName
          : 'Select custom Font';
        storedData[editOrderValue.index][keyUpdate15] = cartDataReq
          ? cartDataReq?.lineHeight
          : editOrderValue?.data.lineHeight;
        storedData[editOrderValue.index][keyUpdate16] = cartDataReq
          ? cartDataReq?.signOffLineHeight
          : editOrderValue?.data.signOffLineHeight;
        storedData[editOrderValue.index][keyUpdate17] = cartDataReq
          ? cartDataReq?.signOffFontSize
          : editOrderValue?.data.signOffFontSize;
        storedData[editOrderValue.index][keyUpdate18] = cartDataReq
          ? cartDataReq?.csvFileLen
          : editOrderValue?.data.csvFileLen;
        storedData[editOrderValue.index][keyUpdate19] = cartDataReq
          ? cartDataReq?.bulkCsvData
          : editOrderValue?.data.bulkCsvData;
        storedData[editOrderValue.index][keyUpdate20] = cartDataReq
          ? cartDataReq?.csvFileBulk
          : editOrderValue?.data.csvFileBulk;
        storedData[editOrderValue.index][keyUpdate21] = cartDataReq
          ? cartDataReq?.usCount
          : editOrderValue?.data.usCount;
        storedData[editOrderValue.index][keyUpdate22] = cartDataReq
          ? cartDataReq?.nonUsCount
          : editOrderValue?.data.nonUsCount;
        storedData[editOrderValue.index][keyUpdate23] = selectShipMode
          ? shippingData.featuredImage.url
          : '';
        storedData[editOrderValue.index][keyUpdate24] = show ? show : false;
      }
      localStorage.setItem('mydata', JSON.stringify(storedData));
      localStorage.removeItem('reqFielddInCart');
      navigate('/cart');
      setLoader(false);
    } else {
      if (cartDataReq && cartDataReq.csvFileLen && selectedItem2) {
        const existingDataString = localStorage.getItem('mydata');
        let existingDataArray = [];
        if (existingDataString) {
          existingDataArray = JSON.parse(existingDataString);
          localStorage.removeItem('mydata');
        }
        existingDataArray.push(arrOfObj);
        const updatedDataString = JSON.stringify(existingDataArray);
        localStorage.setItem('mydata', updatedDataString);
        localStorage.removeItem('reqFielddInCart');

        navigate('/cart');
        setLoader(false);
      } else if (selectedItem && selectedItem2) {
        const existingDataString = localStorage.getItem('mydata');
        let existingDataArray = [];
        if (existingDataString) {
          existingDataArray = JSON.parse(existingDataString);
          localStorage.removeItem('mydata');
        }
        existingDataArray.push(arrOfObj);
        const updatedDataString = JSON.stringify(existingDataArray);
        localStorage.setItem('mydata', updatedDataString);
        localStorage.removeItem('reqFielddInCart');

        navigate('/cart');
        setLoader(false);
      } else {
        setCheckSelAddress(true);
        // alert('please select the address')
        setLoader(false);
      }
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

  console.log("cardName",cardName);

  return (
    <div className="relative md:w-[95%] w-[85%] mx-auto">
      {loader && (
        <div className="absolute top-[50%] left-[50%]">
          <CircularLoader color="#ef6e6e" />
        </div>
      )}

      <>
        <DynamicButton
          className="bg-[#EF6E6E] my-5 w-full max-w-[130px] ml-[-6px]"
          text="Go Back"
          onClickFunction={() => setProductShow(true)}
          backArrow={true}
        />
        {addressForm && (
          <div className="md:w-full w-[100%]  max-w-[1440px] ">
            <AddressForm
            defaultOption={defaultOption}
              customerID={customerid}
              setAddressForm={setAddressForm}
              setEditAddress={setEditAddress}
            />
          </div>
        )}
        {!addressForm && (
          <div
            className={`w-[100%] h-full gap-2 my-[2rem]  ${
              loader && 'opacity-40'
            }`}
          >
            <div className="row flex md:flex-row flex-col gap-4 mr-2 ml-2 justify-between">
              <div className="col-6 md:w-[49%] w-full bg-[#f1f1f1]  border-2 border-[#aaaaaa] rounded-xl">
                <div className=" max-h-[600px] p-[20px] overflow-y-auto">
                  <div className="address-data">
                    <h3 className="sm:text-[26px] text-[19px] my-8 font-bold">
                      Your Info (return/sender address)
                    </h3>
                    <DynamicButton
                      className="bg-[#1b5299] text-[14px] font-normal px-[15px] py-2.5 "
                      text="+ New Address"
                      onClickFunction={() => {
                        handleButtonClick('sender');
                        onNewAddressClick();
                      }}
                    />
                    <div>
                      <input
                        type="text "
                        className="w-full rounded-xl p-3 mt-4 border-2 border-[#aaa] text-black font-normal "
                        onChange={(e) => setsearchData2(e.target.value)}
                        placeholder="Search Addresses..."
                      />
                    </div>
                    {filteredForSender(returnAddress, searchData2).map(
                      (item) => (
                        <div
                          className="w-full rounded p-3 mt-4 bg-white text-black font-bold text-[14px] cursor-pointer flex items-center"
                          onClick={() => handleCheckboxChange2(item)}
                        >
                          <input
                            className="cursor-pointer border-2 border-black"
                            type="checkbox"
                            value={item}
                            checked={selectedItem2?._id === item._id}
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
              <div className="col-6 md:w-[49%] w-full bg-[#f1f1f1]  border-2 border-[#aaaaaa] rounded-xl">
                <div className=" max-h-[600px] p-[20px] overflow-y-auto">
                  <div className="address-data">
                    <h3 className="sm:text-[26px] text-[19px] my-8 font-bold">
                      Recipient address
                    </h3>
                    {show ? (
                      <div>
                        <text className="sm:text-[16px] text-[14px]">
                          Recipient addresses were specified in your bulk order
                          upload.
                        </text>
                      </div>
                    ) : (
                      <>
                        <DynamicButton
                          className="bg-[#1b5299] text-[14px] font-normal px-[15px] py-2.5 "
                          text="+ New Address"
                          onClickFunction={() => {
                            handleButtonClick('recipient');
                            setAddressForm(true);
                          }}
                        />
                        <div>
                          <input
                            type="text "
                            className="w-full rounded-xl p-3 mt-4 border-2 border-[#aaa] text-black font-normal"
                            onChange={(e) => setsearchData(e.target.value)}
                            placeholder="Search Addresses..."
                          />
                        </div>
                        {filteredList(recipientAddress, searchData).map(
                          (item, index) => (
                            <div
                              className="w-full rounded p-3 mt-4 bg-white text-black font-bold flex items-center text-[14px] cursor-pointer"
                              onClick={() => handleCheckboxChange(item)}
                            >
                              <input
                                className="cursor-pointer border-2 border-black"
                                type="checkbox"
                                value={item}
                                checked={selectedItem?._id === item._id}
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`row flex mr-2 ml-2 gap-4 mt-10 ${
                show ? 'justify-between' : 'justify-end'
              }`}
            >
              {show && (
                <div className="col-6 md:w-[49%] w-full  bg-[#f1f1f1]  border-2 border-[#aaaaaa] rounded-xl">
                  <div className="max-h-[600px] p-[20px] overflow-y-auto ">
                    <h3 className="sm:text-[30px] text-[14px] font-bold my-8">
                      {shippingData?.title}
                    </h3>

                    <div
                      className="shipping-methods grid grid-cols-2 gap-2"
                      id="shipping-options"
                    >
                      {shippingData?.variants.edges.map((item, index) => (
                        <div>
                          <div>
                            <input
                              className="mr-2"
                              value={item}
                              checked={
                                selectShipMode &&
                                selectShipMode?.node.title === item.node.title
                              }
                              type="radio"
                              onChange={() => handleBoxoNShipping(item)}
                            />
                            <label
                              className="font-medium sm:text-[16px] text-[14px]"
                              for="Mail-Individual-Cards-Normally-(default)"
                            >
                              {item?.node.title}
                            </label>
                          </div>
                          <div className="custom_variant_price font-medium sm:text-[16px] text-[14px]">
                            ${item?.node.price.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="col-6 md:w-[49%] w-full  bg-[#f1f1f1]  border-2 border-[#aaaaaa] rounded-xl">
                <div className="max-h-[600px] p-[20px] overflow-y-auto mt-10 ">
                  <div className="address-data">
                    <h3 className="sm:text-[30px] text-[18px] font-bold mb-5">
                      Add a Gift Card
                    </h3>
                    <div className="row flex text-[14px] justify-between p-[10px]">
                      <div className="col-4 mt-4 font-bold ">
                        Select Gift Card:
                      </div>
                      <div className="col-8 mt-3 pr-0 w-[60%]">
                        <select
                          className="w-full font-karla font-normal text-black border-none"
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
                            <option className="font-karla" value={i}>
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
                      <div className="col-8 mt-3 pr-0 w-[60%]">
                        {cardPrice ? (
                          // <div>heelooo</div>
                          <select
                            name=""
                            id=""
                            className="w-full font-karla font-normal text-black border-none"
                            onChange={(e) => priceValFunc(e.target.value)}
                          >
                            <option selected disabled className="font-karla">
                              {cardPriceTitle}
                            </option>
                            {cardPriceVal.map((item, i) => (
                              <option className="font-karla" value={i}>
                                {item.node.title}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            name=""
                            id=""
                            className="w-full font-karla font-normal text-black border-none"
                          >
                            <option value="" className="font-karla">
                              {'Price Card'}
                            </option>
                          </select>
                        )}
                      </div>
                    </div>
                    <div className=" ">
                      <input
                        type="checkbox"
                        id=""
                        className={`${cardPriceTitle  ? "cursor-pointer" : "cursor-not-allowed"}`}
                        name=""
                        value=""
                        onClick={() => setStateCheckCart(!stateCheckCart)}
                        checked={cardPriceTitle && stateCheckCart}
                      />
                      <text className="ml-3 mt-[6px] text-[14px] font-bold">
                        Add Gift Card
                      </text>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {onSaveShip && (
              <div className="w-[600px] border border-solid border-black p-3 mt-3 ml-3">
                {formData?.firstName}, {formData?.lastName},{formData?.address1}
                , {formData?.city}, {formData?.state},{formData?.country}
              </div>
            )}
            <div className="row flex mt-4 relative right-[-17px] w-full justify-end font-normal text-[14px]">
              <div className="buttonDiv my-2">
                <DynamicButton
                  className="bg-[#1b5299] w-[190px] h-[45px] opacity-65 px-8 py-4"
                  text="ADD TO CART"
                  // disabled={!agree}
                  onClickFunction={() => onClickAddCart()}
                />
              </div>
              {selectShipMode && selectShipMode.node.price.amount !== '0.0' && (
                <div className="buttonDiv my-2">
                  <DynamicButton
                    className="bg-[#1b5299] text-[12px] opacity-65 px-8 py-4"
                    text="Enter the shipping address for the package"
                    onClickFunction={() => onpenAddCardModal()}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {showShipAddress && (
          <Modal
            children={
              <div className="w-[100%] border border-solid border-black p-3 mt-3">
                {reqFields && (
                  <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                    Please add all fields with * that are Mandatory
                  </p>
                )}
                <div className="grid-rows-2 flex gap-3">
                  <div>
                    <label htmlFor="">First Name*</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid border-black p-3 w-[100%]"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Last Name*</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid border-black p-3 w-[100%]"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label htmlFor="" className="">
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
                    className="mt-2 border border-solid border-black p-3 w-[100%]"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="" className="">
                    Address 2
                  </label>
                  <input
                    id="address2"
                    name="address2"
                    type="text"
                    placeholder="Address 2"
                    value={formData.address2}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 border border-solid border-black p-3 w-[100%]"
                  />
                </div>
                <div className="grid-rows-2 flex gap-3">
                  <div>
                    <label htmlFor="">City*</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid border-black p-3 w-[100%]"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Postal Code*</label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="number"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={(e) => handleChange(e)}
                      className="mt-2 border border-solid border-black p-3 w-[100%]"
                    />
                  </div>
                </div>
                <div className="grid-rows-2 flex gap-3">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
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
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {location.countries.map((country) => (
                        <option key={country.country} value={country.country}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="country"
                    >
                      State*
                    </label>
                    <select
                      onChange={(e) => handleChange(e)}
                      value={formData.state}
                      name="state"
                      className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                        errors.state ? 'border-red-500' : ''
                      }`}
                      id="state"
                    >
                      <option value="">Select a state</option>
                      {selectedCountry &&
                        selectedCountry.states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500 mt-[2px] text-[14px] font-semibold italic">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid-rows-2 flex gap-[10rem] mt-5">
                  <div>
                    <DynamicButton
                      className="bg-[#ef6e6e] h-[60px] w-full xl:min-w-[180px] max-w-[170px] "
                      text="Cancel"
                      onClickFunction={() => closeModal()}
                    />
                  </div>
                  <div>
                    <DynamicButton
                      className="bg-[#1b5299] h-[60px] w-full xl:min-w-[180px] max-w-[170px] "
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
