import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { loadStripe } from '@stripe/stripe-js';
import StripeCardComp from './StripeCardComp'
import { Elements } from '@stripe/react-stripe-js';
import { Modal } from './Modal'
import location from '../../location.json'
import Loader from './modal/Loader';
export function CheckoutData({ setShowCartPage, StripeKey,totalPrize }) {
    const stripe = loadStripe(StripeKey);
    let customerid, fullName, userEmail
    const [showWallet, setShowWallet] = useState(true)
    const [showCardDetail, setShowCardDetail] = useState(false)
    const [showCardBox, setShowCardBox] = useState(false)
    const [savedCard, setSavedCart] = useState([])
    const [paymentMethodId, setPaymentMethodId] = useState('')
    const [newCardAdded, setNewCardAdded] = useState(false)
    const [custmerID, setCustomertID] = useState('')
    const [loader , setloader] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: 'USA',
        },
        paymentMethodId: ''
    });
    const [errors, setErrors] = useState({});

    function showWalletBtn() {
        setShowWallet(true)
        setShowCardDetail(false)
    }
    function cardDetailBtn() {
        setShowCardDetail(true)
        setShowWallet(false)
    }
    function closeModal() {
        setShowCardBox(false)
    }
    async function createCustomerId(id) {
        try {
            setloader(true)
            const res = await fetch(`https://api.simplynoted.com/stripe/create-customer?customerId=${custmerID}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name || '',
                    email: formData.email || '',
                    address: {
                        line1: formData.address.line1 || '',
                        line2: formData.address.line2 || '',
                        city: formData.address.city || '',
                        state: formData.address.state || '',
                        country: formData.address.country || 'USA',
                    },
                    paymentMethodId: id || ''
                }),
            })
            const json = await res.json()
            console.log(json, 'createCustomerId Response');
            await addNewCreditCard(id, json.stripeCustomerId)
            // }
        } catch (error) {
            setloader(false)
            console.log(error, 'error on CreateCard');
        }
    }
    async function addNewCreditCard(paymentID, stripeCustomerId) {
        try {
            
            const res = await fetch(`https://api.simplynoted.com/stripe/add-new-payment-method?customerId=${custmerID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "paymentMethodId": paymentID,
                    "stripeCustomerId": stripeCustomerId
                })
            })
            const jsonData = await res.json()
            console.log(jsonData, 'addNewCard');
            setNewCardAdded(true)
            setShowCardBox(false)
            setloader(false)

        } catch (error) {
            setloader(false)
            console.log(error, 'addNewCreditCard ------');
        }
    }
    async function getSavedCards(Id) {
        try {
            const res = await fetch(`https://api.simplynoted.com/stripe/customer-data?customerId=${Id}`)
            const json = await res.json()
            console.log(json, 'creditCard Details');
            if (json) {
                setSavedCart(json.payments)
            }

        } catch (error) {
            console.log(error, 'error at credit Card');
        }
    }
    useEffect(() => {
        customerid = localStorage.getItem('customerId')
        fullName = localStorage.getItem('SNFullName')
        userEmail = localStorage.getItem('SnEmail')
        setCustomertID(customerid)
        getSavedCards(customerid)
        formData.name = fullName
        formData.email = userEmail
    }, [newCardAdded])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            // If the name starts with 'address.', it's part of the address object
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name.substring(8)]: value,
                },
                paymentMethodId: paymentMethodId ? paymentMethodId : ''
            }));
        } else {
            // It's not part of the address object, update it directly
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const selectedCountry = location.countries.find(
        (country) => country.country === formData.address.country,
    );
    // console.log(formData, 'formData');
    function onpenAddCardModal() {
        setShowCardBox(true)
    }
    return (
        <>
        {loader?<Loader/>:
            <>
            <div className="'w-full h-full gap-2 mt-8 mb-8">
                <div className='pb-[80px]'>
                    <h1 className='text-center font-bold text-4xl'>PAYMENT</h1>
                </div>
                <div className='w-[100%] flex mr-2 ml-2 gap-8  justify-center'>
                    <div className='p-5 bg-white max-w-[42%] w-full rounded-xl'>
                        <div className='border border-solid border-[#e6edf8] p-3 mt-3'>
                            <div className=''>
                                <input type="radio" name="action" onChange={() => showWalletBtn()} /> USE WALLET
                            </div>
                            <div className='w-[100%] h-[1px] bg-[black]'></div>
                            {showWallet &&
                                <div>
                                    <div className='border border-solid border-[#e6edf8] p-3 mt-3'>
                                        <text className='flex justify-between items-center text-l font-bold'> WALLET BALANCE <span>$10000</span></text>
                                    </div>
                                </div>
                            }

                            <div className='mt-3'>
                                <input type="radio" name="action" onChange={() => cardDetailBtn()} /> USE CREDIT CARD
                            </div>
                            {showCardDetail &&
                                <div>
                                    <div className='mt-2'>
                                        <text className='text-l font-bold'> CREDIT CARD INFORMATION</text><br />
                                        <text className='text-xs font-bold'>CARD DETAILS</text>
                                    </div>
                                    {savedCard && savedCard.map((item) =>
                                        <div className='border border-solid border-[#e6edf8] p-2 mt-1 mb-2 flex justify-between '>

                                            <div className='flex justify-start items-center text-xs font-bold'>
                                                <input type='radio' name='action' className='mr-2' />
                                                <span className='mr-[17rem] tracking-wide'>**********{item.cardLast4Number}</span>
                                                <span>{item.cardExpMonth}/{item.cardExpYear}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className='savedCard flex items-start justify-between'>
                                        <input type="radio" name="action" id="" className='mt-2' />
                                        <label htmlFor="">Use Saved Credit Card</label>
                                        <div>
                                            <button className='bg-[#EF6E6E] w-[200px] text-[#fff] p-2 rounded' onClick={() => onpenAddCardModal()}>Add New Card</button>
                                        </div>
                                    </div>

                                </div>
                            }

                        </div>

                        <div className='mt-2'>
                            <button className="bg-[#EF6E6E] w-[200px] text-[#fff] p-2 rounded flex" onClick={() => setShowCartPage(true)} > <HiArrowLongLeft className='text-2xl mr-2 ' />GO BACK TO CART  </button>
                        </div>
                    </div>
                    <div className=' max-w-[35%] w-full'>
                        <div className='p-5 bg-white  rounded-xl h-[155px]'>
                            <h1 className='text-left font-bold text-2xl'>ORDER SUMMARY</h1>
                            <text className='flex justify-between items-center m-3'>Subtotal <span>${totalPrize}</span></text>
                            <div className='w-full h-[1px] bg-black'></div>
                            <text className='flex justify-between items-center m-3 font-bold'>Total <span>${totalPrize}</span></text>
                        </div>
                        <div className='mt-2'>
                            <button className="bg-[#EF6E6E] w-full justify-center text-[#fff] p-2 rounded flex"  >PURCHASE  </button>
                        </div>
                    </div>
                </div>
            </div>
            {showCardBox &&
                <Modal children={<Elements stripe={stripe}>
                    <div className='w-[100%] border border-solid border-black p-3 mt-3'>
                        <div className='grid-rows-2 flex gap-3'>
                            <div>
                                <label htmlFor="">Full Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="name"
                                    disabled
                                    // placeholder="FullName"
                                    value={formData.name}
                                    onChange={(e)=>handleChange(e)}
                                    className='mt-2 border border-solid border-black p-3 w-[100%]' />
                            </div>
                            <div>
                                <label htmlFor="">Email</label>
                                <input
                                    id="email"
                                    disabled
                                    name="email"
                                    type="text"
                                    //  placeholder="email"
                                    value={formData.email}
                                    onChange={(e)=>handleChange(e)}
                                    className='mt-2 border border-solid border-black p-3 w-[100%]' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="" className=''>Address</label>
                            <input
                                id="address1"
                                name="address.line1"
                                type="text"
                                placeholder="Address"
                                required
                                value={formData.address.line1}
                                onChange={(e)=>handleChange(e)}
                                className='mt-2 border border-solid border-black p-3 w-[100%]' />

                        </div>
                        <div className='mt-2'>
                            <label htmlFor="" className=''>Apartment,suite,etc</label>
                            <input
                                id="address2"
                                name="address.line2"
                                type="text"
                                placeholder="Address 2"
                                value={formData.address.line2}
                                onChange={(e)=>handleChange(e)}
                                className='mt-2 border border-solid border-black p-3 w-[100%]' />

                        </div>
                        <div className='mt-2'>
                            <label htmlFor="" className=''>City</label>
                            <input
                                id="city"
                                name="address.city"
                                type="text"
                                required
                                placeholder="City"
                                value={formData.address.city}
                                onChange={(e)=>handleChange(e)}
                                className='mt-2 border border-solid border-black p-3 w-[100%]' />

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
                                    onChange={(e)=>handleChange(e)}
                                    value={formData.address.country}
                                    itemID="country"
                                    name="address.country"
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
                                    Country
                                </label>
                                <select
                                    onChange={(e)=>handleChange(e)}
                                    value={formData.address.state}
                                    name="address.state"
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
                    </div>
                    <StripeCardComp setPaymentMethodId={setPaymentMethodId} createCustomerId={createCustomerId} />
                </Elements>} cancelLink={closeModal} />}
                </>
            }
        </>
    )
}