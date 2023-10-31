import React, { useEffect, useState } from 'react'
import { defer, json, redirect } from '@shopify/remix-oxygen';
import { useLoaderData, Await, Form, useActionData } from '@remix-run/react';
import Modal from 'react-modal';
import { BsXCircle } from "react-icons/bs";
import { useNavigate } from '@remix-run/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ConfirmationModal from '~/components/modal/ConfirmationModal';
import DynamicButton from '~/components/DynamicButton';
import { RiDeleteBin5Line } from "react-icons/Ri";
import { HiArrowLongRight } from "react-icons/hi2";
import { CheckoutData } from '../components/Checkout'


let storedDataString, storedDataArray

export async function loader({ context }) {
    const StripeKey = context.env.STRIPE_KEY

    // console.log(StripeKey,'eeee'); 
    const data = await context.storefront.query(GiftProduct, {
        variables: {},
    })
    const postalData = await context.storefront.query(PostalProduct, {
        variants: {}
    })
    //   console.log(data,'cartData');
    return defer({
        data,
        postalData,
        StripeKey
    })
}

export const action = async ({ request }) => {
    const formData = await request.formData()
    console.log(formData, 'input---');

    const name = formData.get("name");
    return `Hello, ${name}`;

}
export default function AddCartFunc() {
    const actionData = useActionData();
    console.log(actionData, 'actiondata');
    const { data, postalData, StripeKey } = useLoaderData()
    const [cartData, setCartData] = useState([])
    const [updateGift, setUpdateGift] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [cardPriceVal, setCardPriceVal] = useState([])
    const [cardPrice, setCardPrice] = useState('')
    const [cardName, setCardName] = useState('')
    const [cardVal, setCardVal] = useState('')
    const [cardImg, setCardImage] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postTitle2, setPostTitle2] = useState('')
    const [postPrice, setPostPrice] = useState('')
    const [postPrice2, setPostPrice2] = useState('')
    const [postImage, setPostImage] = useState('')
    const [senderAddress, setSenderAddress] = useState('')
    const [msgShow, setMsgShow] = useState('')
    const [msgFont, setMsgFont] = useState('')
    const [msglastText, setMsglastText] = useState('')
    const [reciverAddress, setReciverAddress] = useState('')
    const [bulkAddress, setBulkAddress] = useState([])
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteCardModal, setDeleteCardModal] = useState(false);
    const [deleteOrderIndex, setDelOrderIndex] = useState(null)
    const [delCardIndex, setDelCardIndex] = useState(null)
    const [showCartPage, setShowCartPage] = useState(true)

    useEffect(() => {
        storedDataString = localStorage.getItem('mydata');
        setCartData(JSON.parse(storedDataString))
        // subTotalAmount()
        if (postalData) {
            setPostalValue()
        }
    }, [updateGift])
    if (cartData) {
        const prices = cartData.map((cartData) => {
            let b = parseFloat(cartData.price * 2) + parseFloat(postPrice * 1)
            console.log(b);
            console.log((1) + (2), 'eeeeeee')

        }

            //     (cartData.price * cartData.csvFileLen) +
            // //  (cartData.giftCardPrice * cartData.csvFileLen) +
            //  (0.66 * cartData.usCount)
            //  + (1.5 * cartData.nonUSCount) + (cartData.shippingDataCost * 1)
        );
        console.log(prices, 'pricesssss');

    }
    function setPostalValue() {
        let postalTit = postalData.product.variants.edges[0].node.title
        let postalrate = postalData.product.variants.edges[0].node.price.amount
        let postalTit2 = postalData.product.variants.edges[1].node.title
        let postalrate2 = postalData.product.variants.edges[1].node.price.amount
        let postalImag = postalData.product.variants.edges[1].node.image
        setPostTitle(postalTit)
        setPostTitle2(postalTit2)
        setPostPrice(postalrate)
        setPostPrice2(postalrate2)
        setPostImage(postalImag.url)
        console.log(typeof (postalrate), '2@@@@@');

        let grandPrice = cartData.map(cartData =>
            (cartData.price * cartData.csvFileLen) +
            (cartData.giftCardPrice * cartData.csvFileLen) +
            (0.66 * cartData.usCount)
            + (1.5 * cartData.nonUSCount) + (cartData.shippingDataCost * 1) + (postPrice * cartData.csvFileLen) + (postPrice2 * cartData.csvFileLen)
        )
        console.log(grandPrice, 'grandPrice');
    }
    let keyToUpdate1 = 'giftCardName'
    let keyToUpdate2 = 'giftCardImg'
    let keyToUpdate3 = 'giftCardPrice'
    function updateValueInArray(index) {
        console.log(index);
        setUpdateGift(!updateGift)
        // Check if the index is valid
        if (index >= 0 && index < cartData.length) {
            // Update the key's value
            cartData[index][keyToUpdate1] = cardName;
            cartData[index][keyToUpdate2] = cardImg;
            cartData[index][keyToUpdate3] = cardPrice;
        }
        localStorage.setItem('mydata', JSON.stringify(cartData));
        setCardPrice('')
        setIsOpen(false)
    }
    function deleteKeyInArray(index) {
        setUpdateGift(!updateGift)

        console.log(index);

        // Check if the index is valid
        if (index >= 0 && index < cartData.length) {
            // Delete the key from the object
            cartData[index][keyToUpdate1] = null;
            cartData[index][keyToUpdate2] = null;
            cartData[index][keyToUpdate3] = null;
        }
        localStorage.setItem('mydata', JSON.stringify(cartData));
        setDeleteCardModal(false)
    }
    function confirmCardDel(index) {
        setDeleteCardModal(true)
        setDelCardIndex(index)
    }

    function ConfirmDeleteOrder(index) {
        console.log(index);
        setDelOrderIndex(index)
        setDeleteModal(true)
    }

    function deleteOrder(index) {
        setUpdateGift(!updateGift)
        // if (index >= 0 && index < cartData.length) {
        // Delete the order
        cartData.splice(index, 1);
        console.log(cartData, 'deleteOrder');

        // delete cartData[index];
        // }
        localStorage.setItem('mydata', JSON.stringify(cartData));
        setDeleteModal(false)
    }

    function editOrderData(index) {
        // navigate(,{state:{index:'index'}})
        let data = cartData[index]
        console.log(data, 'data---');
        let ab = cartData[index].productGetUrl
        navigate(`${ab}`, { state: { data: data, index: index } })

    }
    const navigate = useNavigate()

    const customStyles = {
        content: {
            top: '60%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '620px',
            background: '#FFF6F6',
            width: '100%',
            padding: '30px',
            maxHeight: '500px',
            zIndex: '2',
            position: 'relative'
        },
    };

    async function OpenModalFunc(item) {
        setIsOpen(true)
        setCardVal(item)

    }
    async function OpenModalFunc2(item) {
        console.log(item);
        setIsOpen2(true)
        // setCardVal(item)
        if (cartData[item].csvBulkData.length) {
            console.log("bulkAddress");
            setBulkAddress(cartData[item].csvBulkData)
            setMsgFont(cartData[item].fontFamily);
            setMsgShow(cartData[item].messageData);
            setMsglastText(cartData[item].endText)


        } else {
            setMsgFont(cartData[item].fontFamily);
            setMsgShow(cartData[item].messageData);
            setReciverAddress(cartData[item].reciverAddress);
            setMsglastText(cartData[item].endText)
        }


    }
    const cardvalFunc = async (item) => {
        console.log(item, 'cardVal-----');
        let selCardName = data.collection.products.edges[item].node
        console.log(selCardName, 'selCardName--');
        setCardName(selCardName.title)
        setCardImage(selCardName.featuredImage.url)
        // console.log(cardName,'cardName-----');
        let arrCardPrice = data.collection.products.edges[item].node.variants.edges
        console.log(arrCardPrice[0].node.price.amount, '---------abababababaababab');
        let firstPrice = arrCardPrice[0].node.price.amount
        setCardPrice(firstPrice)
        setCardPriceVal(arrCardPrice)
        // await AfterCardSel(ab)
    }
    const priceValFunc = async (item) => {
        console.log(item, 'PriceVAl');
        setCardPrice(item)
    }
    function closeModal() {
        setBulkAddress([])

        setIsOpen2(false)
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

    function subTotalAmount() {
        let bb = []

        console.log(bb);
    }
    subTotalAmount()
    return (
        <>
            {showCartPage ?
                <>
                    <div className='w-full h-full gap-2 mt-8'>
                        <h1 className='text-center font-bold text-4xl'>SHOPPING CART</h1>
                        {cartData && cartData.map((item, index) =>
                            <div className='w-[1000px]  bg-[white] m-auto mt-10 mb-10'>
                                <div className='flex'>
                                    <div className='w-[700px]'>
                                        <div className='flex m-5'>
                                            <div className='max-w-[20%] m-5'>
                                                <img src={item.productImg} alt="" />

                                            </div>
                                            <div className='max-w-[100%]'>
                                                <text>{item.productTitle}</text><br /><br />
                                                <text> Sender: {item.senderAddress.address1},{item.senderAddress.city},{item.senderAddress.state},{item.senderAddress.country}</text>
                                                <div className='buttonDiv pr-5 m-2'>
                                                    <button className="bg-[#EF6E6E] text-[#fff] p-2 rounded" onClick={() => OpenModalFunc2(index)}>PREVIEW YOUR CUSTOM MESSAGE</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className='w-[200px] gap-5'>
                                        <div className='m-6'>
                                            <div className=''>
                                                <text> Price:<span >$ {item.price}</span></text>
                                            </div>
                                            <div>
                                                <text> Quantity:<span >{item.csvFileLen}</span></text>
                                            </div>
                                            <div>
                                                <text >Subtotal:$ {item.price * item.csvFileLen}</text>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[200px] m-4'>
                                        {item.giftCardName !== null ?
                                            '' : <div className='buttonDiv pr-5 m-2'>
                                                <DynamicButton
                                                    className="bg-[#1b5299]"
                                                    text="Add Gift Card"
                                                    onClickFunction={() => OpenModalFunc(index)}
                                                />
                                                {/* <button className="bg-[#001a5f] text-[#fff] p-2 rounded" onClick={() => OpenModalFunc(index)}>ADD GIFT CART</button> */}
                                            </div>}

                                        <div className='buttonDiv pr-5 m-2'>
                                            <DynamicButton
                                                className="bg-[#1b5299]"
                                                text="EDIT ORDER"
                                                onClickFunction={() => editOrderData(index)}
                                            />
                                            {/* <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => editOrderData(index)}>EDIT ORDER</button> */}
                                        </div>
                                        <div className='buttonDiv pr-5 m-2'>
                                            <DynamicButton
                                                className="bg-[#1b5299]"
                                                text="DELETE ORDER"
                                                onClickFunction={() => ConfirmDeleteOrder(index)}
                                            />
                                            {/* <button className="bg-[#001a5f] text-[#fff] p-2 rounded" onClick={() => ConfirmDeleteOrder(index)}>DELETE ORDER</button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[1000px] h-[2px] bg-[red]'></div>
                                {item.giftCardName &&
                                    <div className='flex'>
                                        <div className='w-[400px]'>
                                            <div className='flex m-5'>
                                                <div className='max-w-[20%] m-5'>
                                                    <img src={item.giftCardImg} alt="" />
                                                </div>
                                                <div className='max-w-[40%] mt-10'>
                                                    <text>{item.giftCardName}</text><br /><br />
                                                    {/* <text> Sender: {item.senderAddress.address1},{item.senderAddress.city},{item.senderAddress.state},{item.senderAddress.country}</text> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[200px] gap-5'>
                                            <div className='m-6'>
                                                <div className=''>
                                                    <text> Price:<span >$ {item.giftCardPrice}</span></text>
                                                </div>
                                                <div>
                                                    <text> Quantity:<span >{item.csvFileLen}</span></text>
                                                </div>
                                                <div>
                                                    <text> Subtotal:$ {item.giftCardPrice * item.csvFileLen}</text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[200px] m-4'>
                                            <div className='buttonDiv pr-5 m-2'>
                                                <DynamicButton
                                                    className="bg-[#1b5299]"
                                                    text="DELETE CARD"
                                                    onClickFunction={() => confirmCardDel(index)}
                                                />
                                                {/* <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => confirmCardDel(index)}>DELETE CARD</button> */}
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className='w-[1000px] h-[2px] bg-[red]'></div>

                                {item.usCount || item.nonUSCount ?
                                    <>
                                        {/* {item.nonUSCount ? */}
                                        {item.nonUSCount &&
                                            <div className='flex'>
                                                <div className='w-[400px]'>
                                                    <div className='flex m-5'>
                                                        <div className='max-w-[20%] m-5'>
                                                            <img src={postImage} alt="" />
                                                        </div>
                                                        <div className='max-w-[40%] mt-10'>
                                                            <text>Postal {postTitle2}</text><br /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[200px] gap-5'>
                                                    <div className='m-6'>
                                                        <div className=''>
                                                            <text> Price:<span >$ {postPrice2}</span></text>
                                                        </div>
                                                        <div>
                                                            <text> Quantity:<span >{item.nonUSCount}</span></text>
                                                        </div>
                                                        <div>
                                                            <text> Subtotal:$ {postPrice2 * item.nonUSCount}</text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {item.usCount && <div className='flex'>
                                            <div className='w-[400px]'>
                                                <div className='flex m-5'>
                                                    <div className='max-w-[20%] m-5'>
                                                        <img src={postImage} alt="" />
                                                    </div>
                                                    <div className='max-w-[40%] mt-10'>
                                                        <text>Postal {postTitle}</text><br /><br />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-[200px] gap-5'>
                                                <div className='m-6'>
                                                    <div className=''>
                                                        <text> Price:<span >$ {postPrice}</span></text>
                                                    </div>
                                                    <div>
                                                        <text> Quantity:<span >{item.usCount}</span></text>
                                                    </div>
                                                    <div>
                                                        <text> Subtotal:$ {postPrice * item.usCount}</text>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    </>
                                    :
                                    <>
                                        {item.reciverAddress?.country === "USA" ||
                                            item.reciverAddress?.country?.toLowerCase() === "" ||
                                            item.reciverAddress?.country?.toLowerCase() === " " ||
                                            item.reciverAddress?.country?.toLowerCase() === "u.s.a" ||
                                            item.reciverAddress?.country?.toLowerCase() === "u.s" ||
                                            item.reciverAddress?.country?.toLowerCase() === "usa" ||
                                            item.reciverAddress?.country?.toLowerCase() === "us" ||
                                            item.reciverAddress?.country?.toLowerCase() === "america" ||
                                            item.reciverAddress?.country?.toLowerCase() === "united states" ||
                                            item.reciverAddress?.country?.toLowerCase() === "united states of america" ||
                                            item.reciverAddress?.country?.toLowerCase() == undefined
                                            ?

                                            <div className='flex'>
                                                <div className='w-[400px]'>
                                                    <div className='flex m-5'>
                                                        <div className='max-w-[20%] m-5'>
                                                            <img src={postImage} alt="" />
                                                        </div>
                                                        <div className='max-w-[40%] mt-10'>
                                                            <text>Postal {postTitle}</text><br /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[200px] gap-5'>
                                                    <div className='m-6'>
                                                        <div className=''>
                                                            <text> Price:<span >$ {postPrice}</span></text>
                                                        </div>
                                                        <div>
                                                            <text> Quantity:<span >{item.csvFileLen}</span></text>
                                                        </div>
                                                        <div>
                                                            <text> Subtotal:$ {postPrice * item.csvFileLen}</text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            : <div className='flex'>
                                                <div className='w-[400px]'>
                                                    <div className='flex m-5'>
                                                        <div className='max-w-[20%] m-5'>
                                                            <img src={postImage} alt="" />
                                                        </div>
                                                        <div className='max-w-[40%] mt-10'>
                                                            <text>Postal{postTitle2}</text><br /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[200px] gap-5'>
                                                    <div className='m-6'>
                                                        <div className=''>
                                                            <text> Price:<span >${postPrice2}</span></text>
                                                        </div>
                                                        <div>
                                                            <text> Quantity:<span >{item.csvFileLen}</span></text>
                                                        </div>
                                                        <div>
                                                            <text> Subtotal:${postPrice2 * item.csvFileLen}</text>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>}
                                    </>}
                                <div className='w-[1000px] h-[2px] bg-[red]'></div>

                                {item.shippingData && item.shippingMethodImage &&
                                    <div className='flex'>
                                        <div className='w-[400px]'>
                                            <div className='flex m-5'>
                                                <div className='max-w-[20%] m-5'>
                                                    <img src={item.shippingMethodImage} alt="" />
                                                </div>
                                                <div className='max-w-[40%] mt-10'>
                                                    <text>Shipping Methods</text><br /><br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[200px] gap-5'>
                                            <div className='m-6'>
                                                <div className=''>
                                                    <text> Price: <span>$ {item.shippingDataCost}</span></text>
                                                </div>
                                                <div>
                                                    <text> Quantity:<span >1</span></text>
                                                </div>
                                                <div>
                                                    <text> Subtotal: $ {item.shippingDataCost * 1}</text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className='flex'>
                                    <div className='w-[400px]'>
                                    </div>
                                    <div className='w-[200px] gap-5'>
                                        <div className='m-6'>
                                            <div>
                                                <text> Subtotal: $  {(item.price * item.csvFileLen) + (postPrice * item.usCount) +  (postPrice2 * item.nonUSCount) + (item.giftCardPrice * item.csvFileLen) + (item.shippingDataCost * 1) + (item.reciverAddress?.country === "USA" ||
                                            item.reciverAddress?.country?.toLowerCase() === "" ||
                                            item.reciverAddress?.country?.toLowerCase() === " " ||
                                            item.reciverAddress?.country?.toLowerCase() === "u.s.a" ||
                                            item.reciverAddress?.country?.toLowerCase() === "u.s" ||
                                            item.reciverAddress?.country?.toLowerCase() === "usa" ||
                                            item.reciverAddress?.country?.toLowerCase() === "us" ||
                                            item.reciverAddress?.country?.toLowerCase() === "america" ||
                                            item.reciverAddress?.country?.toLowerCase() === "united states" ||
                                            item.reciverAddress?.country?.toLowerCase() === "united states of america" ||
                                            item.reciverAddress?.country?.toLowerCase() == undefined ? postPrice * item.csvFileLen:postPrice2 * item.csvFileLen)}</text>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        )}

                        <div className='w-[1000px]  bg-[#FFF6F6] m-auto mt-10 mb-10'>
                            <div className='flex p-2 border-4 border-indigo-600'>
                                <div className='w-[300px]'>
                                    <div className='buttonDiv pr-5 m-2'>
                                        <button className="bg-[#1b5299] text-[#fff] p-2 rounded flex" >
                                            <RiDeleteBin5Line className='mr-2 mt-1' />    CLEAR SHOPING CART</button>
                                    </div>
                                </div>
                                <div className='w-[200px]'>
                                    <div className='mt-2'>
                                        <text className='text-2xl text-[#1b5299] font-bold mt-2'>GRAND TOTAL</text>
                                    </div>
                                </div>
                                <div className='w-[300px]'>
                                    <div className='mt-2'>
                                        <text className='text-2xl text-[#1b5299] font-bold mt-2'>$22</text>
                                    </div>
                                </div>
                                <div className='w-[300px]'>
                                    <div className=''>
                                        <input type="checkbox" />
                                        <text className='text-s'> i agree with terms and condition</text>
                                        <button className="bg-[#EF6E6E] w-[200px] text-[#fff] p-2 rounded flex" onClick={() => setShowCartPage(false)}>CHECKOUT <HiArrowLongRight className='text-2xl ml-2 ' /> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <div className='flex'>
                            <h2 className='font-bold text-2xl w-[600px] text-center'>Add a Gift Card</h2>
                            <BsXCircle className='' onClick={() => setIsOpen(false)} />
                        </div>
                        <div className='address-data'>
                            <div className='row  mr-2 ml-2 '>
                                <div className='col-4 mt-4 font-bold w-[190px]'>Select Gift Card:</div>
                                <div className='col-8 mt-3 pr-0 w-[370px]' >
                                    <select className='w-full' onChange={(e) => cardvalFunc(e.target.value)}>
                                        <option className='w-full' > Select Gift Card</option>
                                        {data.collection.products.edges.map((item, i) =>
                                            <option value={i}>{item.node.title}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='row  mr-2 ml-2 '>
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
                                </div>
                            </div>
                            <div className='buttonDiv pr-5 items-center'>
                                <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => updateValueInArray(cardVal)}>Add Gift Card</button>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={modalIsOpen2}
                        style={customStyles}
                        contentLabel="Example Modal">
                        {bulkAddress.length ?
                            <>
                                <BsXCircle className='absolute right-10 cursor-pointer' onClick={() => closeModal()} />
                                <button onClick={handlePrevClick} className='absolute top-[130px]'>Previous</button>
                                {bulkAddress && bulkAddress.map((item, index) =>
                                    <div>
                                        <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                                            <text className=' text-xl text-center'>
                                                Recipient:  {item["First Name"]},{item["Last Name"]},{item["Address"]},{item["City"]},{item["State/Province"]}
                                            </text>
                                            <h2 className='font-bold text-2xl w-[600px] text-center mt-3'>Your Custom Message</h2>
                                            <div className='w-[400px] items-center bg-[#fff] h-[100px] mt-5 ml-[70px] p-[10px]'>
                                                <text className=' w-[600px]' style={{ fontFamily: msgFont }}> {item.msgData}</text><br />
                                                <text className=' text-center w-[600px] ml-10' style={{ fontFamily: msgFont }}>{msglastText}</text>
                                            </div>
                                            <div>
                                                <text>Font: {msgFont}</text>
                                            </div>
                                        </div>

                                    </div>
                                )}
                                <button className='absolute right-10 bottom-[95px]' onClick={handleNextClick}>Next</button>

                            </>
                            :
                            <>
                                <div className='flex'>
                                    <div className='w-[600px]'>
                                        <text className=' text-xl text-center'>Recipient: {reciverAddress.firstName},{reciverAddress.address1},{reciverAddress.city},{reciverAddress.country}</text>
                                    </div>

                                    <BsXCircle className='cursor-pointer' onClick={() => closeModal()} />
                                </div>
                                <h2 className='font-bold text-2xl w-[600px] text-center mt-3'>Your Custom Message</h2>
                                <div className='w-[400px] items-center bg-[#fff] h-[70px] mt-5 ml-[70px] p-[10px]'>
                                    <text className='text-2xl w-[600px]' style={{ fontFamily: msgFont }}> {msgShow}</text><br />
                                    <text className='text-2xl text-center w-[600px] ml-10' style={{ fontFamily: msgFont }}>{msglastText}</text>
                                </div>
                                <div>
                                    <text>Font: {msgFont}</text>
                                </div>
                            </>
                        }
                    </Modal>
                </>
                :
                <CheckoutData setShowCartPage={setShowCartPage} StripeKey={StripeKey} />
            }

        </>
    )
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
  `

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
  }`
