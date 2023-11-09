import React, { useState, useEffect, useRef } from 'react';
import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from '@remix-run/react';
import DynamicButton from '../DynamicButton';
import { useAddressBook } from '~/components/AddressBookContext';
import AddressForm from '../addressBook/AddressForm';
import Loader from '../modal/Loader';
import { Modal } from '../Modal'
import location from '../../../location.json'
import Instruction from '../modal/Instruction';


let customerid, cartDataReq
export function AddCart({ show, setProductShow, data, productData, editOrderValue, shippingData, fontFamilyName }) {
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
    } = useAddressBook();
    console.log(editOrderValue, 'editOrderValue');
    const [returnAddress, setReturnAddress] = useState([])
    const [recipientAddress, setRecipientAddress] = useState([])
    const [selectedItem, setSelectedItem] = useState(editOrderValue?.data ? editOrderValue.data.reciverAddress : null);
    const [selectedItem2, setSelectedItem2] = useState(editOrderValue?.data ? editOrderValue.data.senderAddress : null);
    const [selectShipMode, setSelectShipMode] = useState(editOrderValue?.data ? editOrderValue.data.shippingData : null)
    const [searchData, setsearchData] = useState(null);
    const [searchData2, setsearchData2] = useState(null);
    const [cardVal, setCardVal] = useState('')
    const [cardPriceVal, setCardPriceVal] = useState([])
    const [cardPriceTitle, setCardPriceTitle] = useState(editOrderValue?.data ? editOrderValue.data.giftCardPriceTitle : '')
    const [cardName, setCardName] = useState(editOrderValue?.data ? editOrderValue.data.giftCardName : '')
    const [cardImg, setCardImg] = useState(editOrderValue?.data ? editOrderValue.data.giftCardImg : '')
    const [cardPrice, setCardPrice] = useState(editOrderValue?.data ? editOrderValue.data.giftCardPrice : '')
    const [MsgText, setMesgtext] = useState('')
    const [loader, setLoader] = useState(false);
    const [componentHide, setComponentHide] = useState(false)
    const [enterShippingAddress, setEnterShippingAddress] = useState('')
    const [showShipAddress, setShowShipAddress] = useState(false)
    const [errors, setErrors] = useState({});
    const [onSaveShip, setSaveShip] = useState(false)
    const [formData, setFormData] = useState({
        firstName: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.firstName : '',
        lastName: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.lastName : '',
        address1: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.address1 : '',
        address2: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.address2 : '',
        city: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.city : '',
        state: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.state : '',
        postalCode: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.postalCode : '',
        country: editOrderValue?.data ? editOrderValue.data.locationForShipMethod?.country : 'USA',
    });
    const [checkSelAddress,setCheckSelAddress] = useState(false)

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
    console.log(formData, 'formData');
    const selectedCountry = location.countries.find(
        (country) => country.country === formData.country,
    );
    console.log(fontFamilyName, 'fontFamilyName');
    function onNewAddressClick() {
        setAddressForm(true)

    }

    async function getRecipient() {
        setLoader(true);

        try {
            const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`)
            const json = await res.json();
            // console.log(json, 'getRecipient Response____________');
            setRecipientAddress(json.result)
            setLoader(false);
        } catch (error) {
            console.log(error, 'Recipient error--------');
            setLoader(false);
        }
    }
    async function getReturn() {
        setLoader(true);

        try {
            const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=return`)
            const json = await res.json();
            // console.log(json, 'getRecipient Response____________');
            setReturnAddress(json.result)
            setLoader(false);

        } catch (error) {
            console.log(error, 'Recipient error--------');
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
        setSelectShipMode(item)
        console.log(item, 'shipping Data');
    }
    const filteredList = (recipientAddress, searchData) => {
        return recipientAddress
            .filter(dataobj => bySearch(dataobj, searchData));

    };

    const bySearch = (dataobj, searchData) => {
        // console.log(Object.values(dataobj),'+++++++++++++++');
        if (searchData) {
            return Object.values(dataobj).some(field =>
                // console.log(s,'!!!!!!!!!!!!!!!!!!!!!!');
                field.toString().toLowerCase().includes(searchData.toLowerCase()))
        } else return dataobj;

    };

    const filteredForSender = (returnAddress, searchData2) => {
        console.log(searchData2, 'searchData2');
        return returnAddress
            .filter(dataobj => searchBy(dataobj, searchData2));
    }
    const searchBy = (dataobj, searchData2) => {
        if (searchData2) {
            return Object.values(dataobj).some(field =>
                // console.log(s,'!!!!!!!!!!!!!!!!!!!!!!')
                field.toString().toLowerCase().includes(searchData2.toLowerCase()))
        } else return dataobj;
    }
    const cardvalFunc = async (item) => {
        setCardVal(item)
        let selCardName = data.collection.products.edges[item].node
        setCardName(selCardName.title)
        setCardImg(selCardName.featuredImage.url)
        let arrCardPrice = data.collection.products.edges[item].node.variants.edges
      let  firstPrice = arrCardPrice[0].node.price.amount
        setCardPrice(firstPrice)
        setCardPriceTitle(arrCardPrice[0].node.title)
        console.log(cardPrice, '----cardPrice=--', firstPrice);
        setCardPriceVal(arrCardPrice)
    }
    const priceValFunc = async (item) => {
        console.log(cardPriceVal[item].node.price, 'ooooooo');
        let priceAmount = cardPriceVal[item].node.price.amount
        let priceTitle = cardPriceVal[item].node.title
        console.log(priceTitle, 'cardPriceVal', priceAmount)
        console.log(item, 'priceValue');
        setCardPrice(priceAmount)
        setCardPriceTitle(priceTitle)
    }
    useEffect(() => {
        customerid = localStorage.getItem('customerId')
        cartDataReq = JSON.parse(localStorage.getItem('reqFielddInCart'))
        console.log(cartDataReq, 'cartDataReq');
        setMesgtext(cartDataReq.msg)
        getRecipient()
        getReturn()
    }, [addressForm])
    const navigate = useNavigate()
    let arrOfObj = {
        productTitle: productData.product.title ? productData.product.title : null,
        variant_id: productData.id,
        price: productData.price.amount,
        productImg: productData.image.url,
        senderAddress: selectedItem2,
        reciverAddress: selectedItem,
        giftCardName: cardName ? cardName : null,
        giftCardImg: cardImg ? cardImg : null,
        giftCardPrice: cardPrice ? cardPrice : null,
        giftCardPriceTitle: cardPriceTitle ? cardPriceTitle : '',
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
        shippingDataCost: selectShipMode ? selectShipMode.node.price.amount : ''
    }

    let keyUpdate1 = 'messageData'
    let keyUpdate2 = 'reciverAddress'
    let keyUpdate3 = 'senderAddress'
    let keyUpdate4 = 'giftCardImg'
    let keyUpdate5 = 'giftCardName'
    let keyUpdate6 = 'giftCardPrice'
    let keyUpdate7 = 'endText'
    let keyUpdate8 = 'locationForShipMethod'
    let keyUpdate9 = 'shippingData'
    let keyUpdate10 = 'shippingDataCost'
    let keyUpdate11 = 'fontFamily'
    function onClickAddCart() {
        setLoader(true);
        if (editOrderValue?.index >= 0) {
            const storedData = JSON.parse(localStorage.getItem('mydata'));
            console.log(storedData, 'storedData');
            if (editOrderValue.index >= 0 && editOrderValue.index < storedData.length) {
                storedData[editOrderValue.index][keyUpdate1] = cartDataReq?.msg ? cartDataReq?.msg : editOrderValue?.data.messageData;
                storedData[editOrderValue.index][keyUpdate2] = selectedItem;
                storedData[editOrderValue.index][keyUpdate3] = selectedItem2;
                storedData[editOrderValue.index][keyUpdate4] = cardImg ? cardImg : null;
                storedData[editOrderValue.index][keyUpdate5] = cardName ? cardName : null;
                storedData[editOrderValue.index][keyUpdate6] = cardPrice;
                storedData[editOrderValue.index][keyUpdate7] = cartDataReq?.signOffText ? cartDataReq?.signOffText : editOrderValue?.data.endText;
                storedData[editOrderValue.index][keyUpdate8] = formData ? formData : '';
                storedData[editOrderValue.index][keyUpdate9] = selectShipMode ? selectShipMode : '';
                storedData[editOrderValue.index][keyUpdate10] = selectShipMode ? selectShipMode.node.price.amount : '';
                storedData[editOrderValue.index][keyUpdate11] = fontFamilyName ? fontFamilyName : 'tarzan';


            }
            localStorage.setItem('mydata', JSON.stringify(storedData));
            navigate('/carts')
            setLoader(false);
        } else {
            if (cartDataReq && cartDataReq.csvFileLen && selectedItem2) {
                const existingDataString = localStorage.getItem('mydata');
                console.log('cartDataReq');
                let existingDataArray = [];
                if (existingDataString) {
                    existingDataArray = JSON.parse(existingDataString);
                    localStorage.removeItem('mydata')
                }
                existingDataArray.push(arrOfObj);
                const updatedDataString = JSON.stringify(existingDataArray);
                localStorage.setItem('mydata', updatedDataString);
                navigate('/carts')
                setLoader(false);

            }
            else if (selectedItem && selectedItem2) {
                const existingDataString = localStorage.getItem('mydata');
                console.log('=-=existingDataString=-=-');
                let existingDataArray = [];
                if (existingDataString) {
                    existingDataArray = JSON.parse(existingDataString);
                    localStorage.removeItem('mydata')
                }
                existingDataArray.push(arrOfObj);
                const updatedDataString = JSON.stringify(existingDataArray);
                localStorage.setItem('mydata', updatedDataString);
                navigate('/carts')
                setLoader(false);

            } else {
                setCheckSelAddress(true)
                // alert('please select the address')
                setLoader(false);

            }
        }
    }
    function closeSelAddressModal(){
        setCheckSelAddress(false)
    }
    function onpenAddCardModal() {
        setShowShipAddress(true)
    }
    function closeModal() {
        setShowShipAddress(false)
    }
    function OnSaveClickShipAddress() {
        setSaveShip(true)
        setShowShipAddress(false)
    }
    return (
        <>
            {loader ?
                <Loader loaderMessage="Adding Data to Cart" />
                :
                <>
                    {addressForm && (
                        <div className="w-full  max-w-[1440px] px-[20px] mx-auto">
                            <AddressForm
                                customerID={customerid}
                                setAddressForm={setAddressForm}
                                setEditAddress={setEditAddress}
                            />
                        </div>
                    )}
                    {!addressForm &&
                        <div className='  w-full h-full gap-2 mt-8'>

                            <h3 className='items-center font-bold flex text-2xl' onClick={() => setProductShow(true)}><BiSolidChevronLeft size='50px' />Back To Product Customization</h3>
                            <div className='row flex mr-2 ml-2 gap-4'>
                                <div className='col-6 w-[50%] '>
                                    <div className='address-grid'>
                                        <div className='address-data'>
                                            <h3 className='text-2xl font-bold mt-4 mb-4'>Your Info (return/sender address)</h3>
                                            <DynamicButton
                                                className="bg-[#1b5299]"
                                                text="+ New Address"
                                                onClickFunction={() => onNewAddressClick()}
                                            />

                                            {/* <div className='buttonDiv pr-5 mt-2'>
                                <button className="bg-[#001a5f] text-[#fff] p-3">New Address</button>
                            </div> */}
                                            <div>
                                                <input type="text " className='w-full rounded p-3 mt-4' onChange={(e) => setsearchData2(e.target.value)} placeholder='Search Addresses...' />
                                            </div>
                                            {filteredForSender(returnAddress, searchData2).map((item) =>

                                                <div className='w-full rounded p-3 mt-4 bg-[#fff] '>
                                                    <input
                                                        type="checkbox"
                                                        value={item}
                                                        checked={selectedItem2?._id === item._id}
                                                        onChange={() => handleCheckboxChange2(item)}
                                                    />
                                                    <span >  {item.firstName} {item.lastName}, {item.city}, {item.state}, {item.zip}, {item.country}</span>
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
                                                    <DynamicButton
                                                        className="bg-[#1b5299]"
                                                        text="+ New Address"
                                                        onClickFunction={() => setAddressForm(true)}
                                                    />
                                                    <div>
                                                        <input type="text" onChange={(e) => setsearchData(e.target.value)} className='w-full rounded p-3 mt-4 ' placeholder='Search Addresses...' />
                                                    </div>
                                                    {filteredList(recipientAddress, searchData).map((item, index) =>
                                                        <div className='w-full rounded p-3 mt-4 bg-[#fff] '>
                                                            <input
                                                                type="checkbox"
                                                                value={item}
                                                                checked={selectedItem?._id === item._id}
                                                                onChange={() => handleCheckboxChange(item)}
                                                            // ref={refRec}
                                                            />
                                                            {item.firstName} {item.lastName}, {item.city}, {item.state}, {item.zip}, {item.country}
                                                        </div>
                                                    )}
                                                </>}


                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='row flex mr-2 ml-2 gap-4'>
                                {show &&
                                    <div className='col-6 w-[50%] '>
                                        <div className='address-grid'>
                                            <h3 className='text-2xl font-bold mt-4 mb-4'>{shippingData?.title}</h3>

                                            <div class="shipping-methods" id="shipping-options">
                                                {shippingData?.variants.edges.map((item, index) =>
                                                    <div >
                                                        <div>
                                                            <input
                                                                value={item}
                                                                checked={selectShipMode?.node.title === item.node.title}
                                                                type="radio"
                                                                onChange={() => handleBoxoNShipping(item)}
                                                            />
                                                            <label for="Mail-Individual-Cards-Normally-(default)">{item?.node.title}</label>
                                                        </div>
                                                        <div class="custom_variant_price">${item?.node.price.amount}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>}

                                <div className='col-6 w-[50%]'>
                                    <div className='address-grid mt-10'>
                                        <div className='address-data'>
                                            <h3 className='text-2xl font-bold mt-6 mb-6'>Add a Gift Card</h3>
                                            <div className='row flex mr-2 ml-2 '>
                                                <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Card:</div>
                                                <div className='col-8 mt-3 pr-0 w-[370px]' >
                                                    <select className='w-full' onChange={(e) => cardvalFunc(e.target.value)}>
                                                        <option className='w-full' selected disabled>{cardName ? cardName : 'Select Gift Card'} </option>
                                                        {data.collection.products.edges.map((item, i) =>
                                                            <option value={i}>{item.node.title}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='row flex mr-2 ml-2 '>
                                                <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Price:</div>
                                                <div className='col-8 mt-3 pr-0 w-[370px]' >
                                                    {cardPrice ?
                                                        // <div>heelooo</div>
                                                        <select name="" id="" className='w-full' onChange={(e) => priceValFunc(e.target.value)}>
                                                            <option selected disabled>{cardPriceTitle}</option>
                                                            {cardPriceVal.map((item, i) =>
                                                                <option
                                                                    value={i}>{item.node.title}</option>
                                                            )}
                                                        </select>
                                                        :
                                                        <select name="" id="">
                                                            <option value="">{'Price Card'}</option>
                                                        </select>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="" name="" value=""  checked={cardPriceTitle}/>
                                                <text className='ml-3'>Add Gift Card</text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {onSaveShip &&
                                <div className='w-[600px] border border-solid border-black p-3 mt-3 ml-3'>
                                    {formData?.firstName}, {formData?.lastName}, {formData?.address1}, {formData?.city}, {formData?.state}, {formData?.country}
                                </div>
                            }
                            <div className='row flex mt-4'>
                                <div className='buttonDiv pr-5 m-2'>
                                    <DynamicButton
                                        className="bg-[#1b5299]"
                                        text="Add To Cart"
                                        // disabled={!agree}
                                        onClickFunction={() => onClickAddCart()}
                                    />
                                </div>
                                {selectShipMode && selectShipMode.node.price.amount !== "0.0" &&
                                    <div className='buttonDiv pr-5 m-2'>
                                        <DynamicButton
                                            className="bg-[#1b5299]"
                                            text="Enter the shipping address for the package"
                                            onClickFunction={() => onpenAddCardModal()}
                                        />
                                    </div>}
                            </div>
                        </div>
                    }
                    {showShipAddress &&
                        <Modal children={
                            <div className='w-[100%] border border-solid border-black p-3 mt-3'>
                                <div className='grid-rows-2 flex gap-3'>
                                    <div>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleChange(e)}
                                            className='mt-2 border border-solid border-black p-3 w-[100%]' />
                                    </div>
                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleChange(e)}
                                            className='mt-2 border border-solid border-black p-3 w-[100%]' />
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="" className=''>Address1</label>
                                    <input
                                        id="address1"
                                        name="address1"
                                        type="text"
                                        placeholder="Address"
                                        required
                                        value={formData.address1}
                                        onChange={(e) => handleChange(e)}
                                        className='mt-2 border border-solid border-black p-3 w-[100%]' />

                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="" className=''>Address 2</label>
                                    <input
                                        id="address2"
                                        name="address2"
                                        type="text"
                                        placeholder="Address 2"
                                        value={formData.address2}
                                        onChange={(e) => handleChange(e)}
                                        className='mt-2 border border-solid border-black p-3 w-[100%]' />

                                </div>
                                <div className='grid-rows-2 flex gap-3'>
                                    <div>
                                        <label htmlFor="">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="city"
                                            value={formData.city}
                                            onChange={(e) => handleChange(e)}
                                            className='mt-2 border border-solid border-black p-3 w-[100%]' />
                                    </div>
                                    <div>
                                        <label htmlFor="">Postal Code</label>
                                        <input
                                            id="postalCode"
                                            name="postalCode"
                                            type="number"
                                            placeholder="postalCode"
                                            value={formData.postalCode}
                                            onChange={(e) => handleChange(e)}
                                            className='mt-2 border border-solid border-black p-3 w-[100%]' />
                                    </div>
                                </div>
                                <div className='grid-rows-2 flex gap-3'>
                                    <div>
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="country"
                                        >
                                            Country
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
                                            State
                                        </label>
                                        <select
                                            onChange={(e) => handleChange(e)}
                                            value={formData.state}
                                            name="state"
                                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${errors.state ? 'border-red-500' : ''
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
                                <div className='grid-rows-2 flex gap-[10rem] mt-5'>
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
                        } cancelLink={closeModal} />}

                    <Instruction
                        isOpen={checkSelAddress}
                        title="Please Select Address"
                        closeModal={closeSelAddressModal}
                        table={false}
                    />
                </>
            }
        </>
    )
}