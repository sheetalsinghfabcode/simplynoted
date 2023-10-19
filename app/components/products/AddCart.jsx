import React, { useState, useEffect, useRef } from 'react';
import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from '@remix-run/react';


let customerid, senderAddressVal, reciverAddressVal
export function AddCart({ show, setProductShow, data, productData, sharedValue,sharedValueBoxData, selectFontValue, addressDataSender, addressDataReciver, editDataIndex, EditMess,editEndMess }) {
    
    console.log(addressDataReciver, 'addressDataReciver');
    const [returnAddress, setReturnAddress] = useState([])
    const [recipientAddress, setRecipientAddress] = useState([])
    const [selectedItem, setSelectedItem] = useState(addressDataReciver ? addressDataReciver : null);
    const [selectedItem2, setSelectedItem2] = useState(addressDataSender ? addressDataSender : null);
    const [searchData, setsearchData] = useState(null);
    const [cardVal, setCardVal] = useState('')
    const [cardPriceVal, setCardPriceVal] = useState([])
    const [cardName, setCardName] = useState('')
    const [cardPrice, setCardPrice] = useState('')
    const [allData, setAllData] = useState([])
    // console.log(searchData, 'searchData{-------}')
    // console.log(cardVal, '8808888');
    async function getRecipient() {
        try {
            const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}&type=recipient`)
            const json = await res.json();
            console.log(json, 'getRecipient Response____________');
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
    const handleCheckboxChange = (item) => {
        console.log(item, '***********item');
        // console.log(reciverAddressVal.value,'addressOfRecivers----');

        setSelectedItem(item);
    };
    const handleCheckboxChange2 = (item) => {
        console.log(item, '***********item2');
        setSelectedItem2(item);
    };
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
    // console.log(data.collection.products.edges[0], 'data--------');

    const cardvalFunc = async (item) => {
        console.log(item, 'cardVal-----');
        setCardVal(item)
        let selCardName = data.collection.products.edges[item].node
        console.log(selCardName, 'selCardName--');
        setCardName(selCardName)
        // console.log(cardName,'cardName-----');
        let arrCardPrice = data.collection.products.edges[item].node.variants.edges
        console.log(arrCardPrice[0].node.price.amount, '---------abababababaababab');
        let firstPrice = arrCardPrice[0].node.price.amount
        setCardPrice(firstPrice)
        setCardPriceVal(arrCardPrice)
        // await AfterCardSel(ab)
    }

    // async function AfterCardSel(itemda) {
    //     // console.log(itemda.length,'ppppppppp');
    //     // console.log(itemda.edges, 'cardPriceVal');
    //     // console.log(cardPriceVal,'cardPriceVal2222');
    //     if (itemda && itemda.length) {

    //         return (
    //             <select className='w-full' onChange={(e)=> priceValFunc(e.target.value)}>
    //                 <option className='w-full' > Select Gift Price</option>
    //                 {itemda.map((item, i) =>
    //                     <option value={i}>{item.node.title}</option>)}
    //             </select>
    //         )
    //     } else {
    //         return (
    //             <select className='w-full' >
    //                 <option className='w-full' disabled>card Price</option>
    //             </select>
    //         )
    //     }
    // }

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
        console.log(customerid, '----------------------');
        console.log(productData, '----productData-----');

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
    console.log(sharedValue, 'ooooooo', selectFontValue);
    console.log(window.location.pathname);
    let arrOfObj = {
        productTitle: productData.product.title ? productData.product.title : null,
        variant_id: productData.id,
        price: productData.price.amount,
        productImg: productData.image.url,
        senderAddress: selectedItem2,
        reciverAddress: selectedItem,
        giftCardName: cardName ? cardName.title : null,
        giftCardImg: cardName ? cardName.featuredImage.url : null,
        giftCardPrice: cardPrice ? cardPrice : null,
        messageData: sharedValue ? sharedValue : '',
        fontFamily: selectFontValue ? selectFontValue : 'tarzan',
        productGetUrl: window.location.pathname,
        endText:sharedValueBoxData ? sharedValueBoxData:''
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

        if (editDataIndex) {
            const storedData = JSON.parse(localStorage.getItem('mydata'));
            console.log(storedData, 'storedData');
            if (editDataIndex >= 0 && editDataIndex < storedData.length) {
                storedData[editDataIndex][keyUpdate1] = sharedValue ? sharedValue : EditMess;
                storedData[editDataIndex][keyUpdate2] = selectedItem ? selectedItem : addressDataReciver;
                storedData[editDataIndex][keyUpdate3] = selectedItem2 ? selectedItem2 : addressDataSender;
                storedData[editDataIndex][keyUpdate4] = cardName ? cardName.featuredImage.url : null;
                storedData[editDataIndex][keyUpdate5] = cardName ? cardName.title : null;
                storedData[editDataIndex][keyUpdate6] = cardPrice;
                storedData[editDataIndex][keyUpdate7] = sharedValueBoxData?sharedValueBoxData:editEndMess;
            }
            localStorage.setItem('mydata', JSON.stringify(storedData));
            navigate('/carts')
        } else {
            if (selectedItem && selectedItem2) {
                const existingDataString = localStorage.getItem('mydata');
                console.log('=-=existingDataString=-=-');
                let existingDataArray = [];
                if (existingDataString) {
                    existingDataArray = JSON.parse(existingDataString);
                    localStorage.removeItem('mydata')

                }

                existingDataArray.push(arrOfObj);
                // console.log(existingDataArray, 'existingDataArray)0000000000');
                const updatedDataString = JSON.stringify(existingDataArray);
                // console.log(updatedDataString, '------updatedDataString');
                localStorage.setItem('mydata', updatedDataString);
                // Cookies.set('myArrayCookie', dataString);
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
                                <h3 className='text-2xl font-bold mt-4 mb-4'>Shipping Methods</h3>

                                <div class="shipping-methods" id="shipping-options">
                                    <div key="7027299254377" class="getProductId">
                                        <div>
                                            <input data-product-url="/products/shipping-methods" checked="" id="Mail-Individual-Cards-Normally-(default)" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526056041" />
                                            <label for="Mail-Individual-Cards-Normally-(default)">Mail Individual Cards Normally (default)</label>
                                        </div>
                                        <div class="custom_variant_price">$0.00</div>
                                    </div>

                                    <div key="7027299254377" class="getProductId">
                                        <div>
                                            <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk-with-Envelopes-Addressed--Sealed--and-Stamped" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526088809" />
                                            <label for="Ship-Cards-in-Bulk-with-Envelopes-Addressed--Sealed--and-Stamped">Ship Cards in Bulk with Envelopes Addressed, Sealed, and Stamped</label>
                                        </div>
                                        <div class="custom_variant_price">$49.00</div>
                                    </div>

                                    <div key="7027299254377" class="getProductId">
                                        <div>
                                            <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-plus-Blank-Envelopes-Unsealed" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526121577" />
                                            <label for="Ship-Cards-in-Bulk---Cards-plus-Blank-Envelopes-Unsealed">Ship Cards in Bulk - Cards plus Blank Envelopes Unsealed</label>
                                        </div>
                                        <div class="custom_variant_price">$49.00</div>
                                    </div>

                                    <div key="7027299254377" class="getProductId">
                                        <div>
                                            <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-Only" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526154345" />
                                            <label for="Ship-Cards-in-Bulk---Cards-Only">Ship Cards in Bulk - Cards Only</label>
                                        </div>
                                        <div class="custom_variant_price">$49.00</div>
                                    </div>

                                    <div key="7027299254377" class="getProductId">
                                        <div>
                                            <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed--Unsealed--Not-Stamped" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526187113" />
                                            <label for="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed--Unsealed--Not-Stamped">Ship Cards in Bulk - Cards Plus Envelopes Addressed, Unsealed, Not Stamped</label>
                                        </div>
                                        <div class="custom_variant_price">$49.00</div>
                                    </div>

                                    <div key="7027299254377" class="getProductId">
                                        <div>
                                            <input data-product-url="/products/shipping-methods" id="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed-and-Sealed--Not-Stamped" type="radio" name="radioGroup" class="shipping_method_chose" value="40647526219881" />
                                            <label for="Ship-Cards-in-Bulk---Cards-Plus-Envelopes-Addressed-and-Sealed--Not-Stamped">Ship Cards in Bulk - Cards Plus Envelopes Addressed and Sealed, Not Stamped</label>
                                        </div>
                                        <div class="custom_variant_price">$49.00</div>
                                    </div>


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
                                            <option className='w-full' > Select Gift Card</option>
                                            {data.collection.products.edges.map((item, i) =>
                                                <option value={i}>{item.node.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className='row flex mr-2 ml-2 '>
                                    <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Price:</div>
                                    <div className='col-8 mt-3 pr-0 w-[370px]' >
                                        {cardPriceVal && cardPriceVal.length ?
                                            // <div>heelooo</div>
                                            <select

                                                name="" id="" className='w-full' onChange={(e) => priceValFunc(e.target.value)}>
                                                {cardPriceVal.map((item) =>
                                                    <option
                                                        value={item.node.price.amount}>{item.node.title}</option>
                                                )}
                                            </select>
                                            // <AfterCardSel />
                                            :
                                            <select name="" id="">
                                                <option value="">Price Card</option>
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