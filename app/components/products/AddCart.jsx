import React, { useState, useEffect, useRef } from 'react';
import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from '@remix-run/react';
import DynamicButton from '../DynamicButton';
import { useAddressBook } from '~/components/AddressBookContext';
import AddressForm from '../addressBook/AddressForm';
import Loader from '../modal/Loader';


let customerid, senderAddressVal, reciverAddressVal, cartDataReq
export function AddCart({ show, setProductShow, data, productData, selectFontValue, editOrderValue, shippingData }) {
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
    const [returnAddress, setReturnAddress] = useState([])
    const [recipientAddress, setRecipientAddress] = useState([])
    const [selectedItem, setSelectedItem] = useState(editOrderValue?.data ? editOrderValue.data.reciverAddress : null);
    const [selectedItem2, setSelectedItem2] = useState(editOrderValue?.data ? editOrderValue.data.senderAddress : null);
    const [selectShipMode, setSelectShipMode] = useState(null)
    const [searchData, setsearchData] = useState(null);
    const [searchData2, setsearchData2] = useState(null);
    const [cardVal, setCardVal] = useState('')
    const [cardPriceVal, setCardPriceVal] = useState([])
    const [cardName, setCardName] = useState(editOrderValue?.data ? editOrderValue.data.giftCardName : 'Select Gift Card')
    const [cardImg, setCardImg] = useState(editOrderValue?.data ? editOrderValue.data.giftCardImg : '')
    const [cardPrice, setCardPrice] = useState(editOrderValue?.data ? editOrderValue.data.giftCardPrice : '')
    const [MsgText, setMesgtext] = useState('')
    const [loader, setLoader] = useState(false);
    const [componentHide, setComponentHide] = useState(false)

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
        console.log(searchData2,'searchData2');
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
        let firstPrice = arrCardPrice[0].node.price.amount
        setCardPrice(firstPrice)
        setCardPriceVal(arrCardPrice)
    }
    const priceValFunc = async (item) => {
        setCardPrice(item ? item : firstPrice)
    }

    // const refRec = useRef(null);
    // const ref1 = useRef(null);

    useEffect(() => {
        // reciverAddressVal = refRec.current
        // senderAddressVal = ref1.current
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
        messageData: MsgText,
        fontFamily: selectFontValue ? selectFontValue : 'tarzan',
        productGetUrl: window.location.pathname,
        endText: cartDataReq?.signOffText,
        csvFileURL: cartDataReq?.csvFileBulk,
        csvFileLen: cartDataReq?.csvFileLen,
        usCount: cartDataReq?.usCount,
        nonUSCount: cartDataReq?.nonUsCount,
        csvBulkData: cartDataReq?.bulkCsvData,
        shippingData: selectShipMode ? selectShipMode : '',
        shippingMethodImage: shippingData ? shippingData.featuredImage.url : ''
    }

    let keyUpdate1 = 'messageData'
    let keyUpdate2 = 'reciverAddress'
    let keyUpdate3 = 'senderAddress'
    let keyUpdate4 = 'giftCardImg'
    let keyUpdate5 = 'giftCardName'
    let keyUpdate6 = 'giftCardPrice'
    let keyUpdate7 = 'endText'
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
                alert('please select the address')
                setLoader(false);

            }
        }



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
                    {show ?
                        <div className='col-6 w-[50%] '>
                            <div className='address-grid'>
                                <h3 className='text-2xl font-bold mt-4 mb-4'>{shippingData?.title}</h3>

                                <div class="shipping-methods" id="shipping-options">
                                    {shippingData?.variants.edges.map((item) =>
                                        <div key="7027299254377" class="getProductId">
                                            <div>
                                                <input
                                                    value={item}
                                                    checked={selectShipMode === item}
                                                    type="radio" name="radioGroup"
                                                    onChange={() => handleBoxoNShipping(item)}
                                                />
                                                <label for="Mail-Individual-Cards-Normally-(default)">{item?.node.title}</label>
                                            </div>
                                            <div class="custom_variant_price">${item?.node.price.amount}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        : ''}

                    <div className='col-6 w-[50%]'>
                        <div className='address-grid mt-10'>
                            <div className='address-data'>
                                <h3 className='text-2xl font-bold mt-6 mb-6'>Add a Gift Card</h3>
                                <div className='row flex mr-2 ml-2 '>
                                    <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Card:</div>
                                    <div className='col-8 mt-3 pr-0 w-[370px]' >
                                        <select className='w-full' onChange={(e) => cardvalFunc(e.target.value)}>
                                            <option className='w-full' >{cardName} </option>
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
                                                {cardPriceVal.map((item) =>
                                                    <option
                                                        value={item.node.price.amount}>{item.node.title}</option>
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
                                    <input type="checkbox" id="" name="" value="" />
                                    <text className='ml-3'>Add Gift Card</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='buttonDiv pr-5 m-2'>
                    {/* <Link to={`/carts`}> */}
                    {/* <button className="bg-[#001a5f] text-[#fff] p-3" onClick={() => onClickAddCart()} >Add To Cart</button> */}
                    {/* </Link> */}
                    <DynamicButton
                        className="bg-[#1b5299]"
                        text="Add To Cart"
                        onClickFunction={() => onClickAddCart()}
                    />
                </div>

            </div> }
                
                </>
            }
        </>
    )
}