import React, { useState, useEffect, useRef } from 'react';
import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from '@remix-run/react';


let customerid, senderAddressVal, reciverAddressVal, cartDataReq
export function AddCart({ show, setProductShow, data, productData, selectFontValue,editOrderValue,shippingData}) {
    // console.log(editOrderValue,'editOrderValur');
    // console.log(shippingData, 'shippingData');
    const [returnAddress, setReturnAddress] = useState([])
    const [recipientAddress, setRecipientAddress] = useState([])
    const [selectedItem, setSelectedItem] = useState(editOrderValue?.data ?editOrderValue.data.reciverAddress : null);
    const [selectedItem2, setSelectedItem2] = useState(editOrderValue?.data ?editOrderValue.data.senderAddress : null);
    const [selectShipMode,setSelectShipMode] = useState(null)
    const [searchData, setsearchData] = useState(null);
    const [cardVal, setCardVal] = useState('')
    const [cardPriceVal, setCardPriceVal] = useState([])
    const [cardName, setCardName] = useState(editOrderValue?.data?editOrderValue.data.giftCardName:'Select Gift Card')
    const [cardImg, setCardImg] = useState(editOrderValue?.data?editOrderValue.data.giftCardImg:'')
    const [cardPrice, setCardPrice] = useState(editOrderValue?.data?editOrderValue.data.giftCardPrice:'')
    const [MsgText,setMesgtext] = useState('')
    const [cardPriceTitle,setCardPriceTitle] = useState('')
    async function getRecipient() {
        try {
            const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`)
            const json = await res.json();
            // console.log(json, 'getRecipient Response____________');
            setRecipientAddress(json.result)
        } catch (error) {
            console.log(error, 'Recipient error--------');
        }
    }
    async function getReturn() {
        try {
            const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=return`)
            const json = await res.json();
            // console.log(json, 'getRecipient Response____________');
            setReturnAddress(json.result)
        } catch (error) {
            console.log(error, 'Recipient error--------');
        }
    }
    // console.log(cardName,'cardName',cardPrice);
    const handleCheckboxChange = (item) => {
        console.log(item, '***********item');
        // console.log(reciverAddressVal.value,'addressOfRecivers----');

        setSelectedItem(item);
    };
    const handleCheckboxChange2 = (item) => {
        console.log(item, '***********item2');
        setSelectedItem2(item);
    };
    const handleBoxoNShipping = (item) => {
        // console.log(item,'shippingData----');
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

    const cardvalFunc = async (item) => {
        console.log(item, 'cardVal-----');
        setCardVal(item)
        let selCardName = data.collection.products.edges[item].node
        console.log(selCardName, 'selCardName--');
        setCardName(selCardName.title)
        setCardImg(selCardName.featuredImage.url)
        // console.log(cardName,'cardName-----');
        let arrCardPrice = data.collection.products.edges[item].node.variants.edges
        console.log(arrCardPrice[0].node, '---------abababababaababab');
        let firstPrice = arrCardPrice[0].node.price.amount
        setCardPrice(firstPrice)
        
        setCardPriceVal(arrCardPrice)
        // await AfterCardSel(ab)
    }
    const priceValFunc = async (item) => {
        console.log(item, 'PriceVAl');
        setCardPrice(item ? item : firstPrice)
    }

    const refRec = useRef(null);
    const ref1 = useRef(null);

    useEffect(() => {
        reciverAddressVal = refRec.current
        senderAddressVal = ref1.current
        customerid = localStorage.getItem('customerId')
        // console.log(customerid, '----------------------');
        // console.log(productData, '----productData-----');
        cartDataReq = JSON.parse(localStorage.getItem('reqFielddInCart'))
        console.log(cartDataReq,'cartDataReq');
        setMesgtext(cartDataReq.msg)
        getRecipient()
        getReturn()
    }, [])
    function onClickAddCartBtn() {
        let CartData = []
        if (selectedItem && selectedItem2 && cardName && cardPrice && productData) {
            CartData.push({ selectedItem, selectedItem2, cardName, cardPrice, productData })
            console.log('ssssssssss');
            navigate('/carts', { state: { data: CartData } })
        } else if (selectedItem && selectedItem2 && productData) {
            CartData.push({ selectedItem, selectedItem2, productData })
            console.log('ssssssssss');
            navigate('/carts', { state: { data: CartData } })
            console.log('ooooooooo');
        } else {
            alert('please Select Address')
        }
    }
    const navigate = useNavigate()
    // console.log('ooooooo', selectFontValue);
    // console.log(window.location.pathname);
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
        endText:cartDataReq?.signOffText,
        csvFileURL: cartDataReq?.csvFileBulk,
        csvFileLen: cartDataReq?.csvFileLen,
        usCount: cartDataReq?.usCount,
        nonUSCount: cartDataReq?.nonUsCount,
        csvBulkData:cartDataReq?.bulkCsvData,
        shippingData:selectShipMode?selectShipMode:'',
        shippingMethodImage:shippingData?shippingData.featuredImage.url:''
    }

    // const dataString = JSON.stringify(arrOfObj);
    // console.log(globalMessData, 'globalMessData');
    let keyUpdate1 = 'messageData'
    let keyUpdate2 = 'reciverAddress'
    let keyUpdate3 = 'senderAddress'
    let keyUpdate4 = 'giftCardImg'
    let keyUpdate5 = 'giftCardName'
    let keyUpdate6 = 'giftCardPrice'
    let keyUpdate7 = 'endText'
    function onClickAddCart() {

        if (editOrderValue?.index >= 0) {
            const storedData = JSON.parse(localStorage.getItem('mydata'));
            console.log(storedData, 'storedData');
            if (editOrderValue.index >= 0 && editOrderValue.index < storedData.length) {
                storedData[editOrderValue.index][keyUpdate1] = cartDataReq?.msg ? cartDataReq?.msg : editOrderValue?.data.messageData;
                storedData[editOrderValue.index][keyUpdate2] = selectedItem;
                storedData[editOrderValue.index][keyUpdate3] = selectedItem2 ;
                storedData[editOrderValue.index][keyUpdate4] = cardImg ? cardImg : null;
                storedData[editOrderValue.index][keyUpdate5] = cardName ? cardName : null;
                storedData[editOrderValue.index][keyUpdate6] = cardPrice;
                storedData[editOrderValue.index][keyUpdate7] = cartDataReq?.signOffText?cartDataReq?.signOffText: editOrderValue?.data.endText;
            }
            localStorage.setItem('mydata', JSON.stringify(storedData));
            navigate('/carts')
        } else {
            if(cartDataReq && cartDataReq.csvFileLen && selectedItem2){
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
            } else {
                alert('please select the address')
            }
        }



    }
    return (
        <>
            <div className='  w-full h-full gap-2 mt-8'>
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
                                        <div className='buttonDiv pr-5 mt-2'>
                                            <button className="bg-[#001a5f] text-[#fff] p-3">New Address</button>
                                        </div>
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
                                                    ref={refRec}
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
                                    {shippingData?.variants.edges.map((item)=>
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
                                        {cardPrice  ?
                                            // <div>heelooo</div>
                                            <select name="" id="" className='w-full' onChange={(e) => priceValFunc(e.target.value)}>
                                                {/* <option value="">{cardPrice}</option> */}
                                                {cardPriceVal.map((item) =>
                                                    <option
                                                        value={item.node.price.amount}>{item.node.title}</option>
                                                )}
                                            </select>
                                            // <AfterCardSel />
                                            :
                                            <select name="" id="">
                                                <option value="">{'Price Card'}</option>
                                            </select>
                                        }
                                        {/* <select name="gift_name" className='w-full' id="gift_name" onchange="changeGiftPrice(this.value)" >
                                            <option value="" disabled="" selected="">Select</option>
                                            <option value="6661818679401" id="giftName">Starbucks Gift Card</option>
                                            <option value="6661817729129" id="giftName">Amazon Gift Card</option>
                                            <option value="6661818941545" id="giftName">Visa Gift Card</option>
                                            <option value="6661815795817" id="giftName">Home Depot Gift Card</option>
                                            <option value="6661818253417" id="giftName">Lowe's Gift Card</option>
                                        </select> */}
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
                    <button className="bg-[#001a5f] text-[#fff] p-3" onClick={() => onClickAddCart()} >Add To Cart</button>
                    {/* </Link> */}
                </div>

            </div>
        </>
    )
}