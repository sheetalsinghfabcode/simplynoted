import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { loadStripe } from '@stripe/stripe-js';
import StripeCardComp from './StripeCardComp'
import { Elements } from '@stripe/react-stripe-js';
import { Modal } from './Modal'
import location from '../../location.json'
import Loader from './modal/Loader';
import Accordion from './wallet/Accordian';

export function WalletPayment({ setShowCartPage, StripeKey,totalPrize }) {
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

    async function getSavedCards(Id) {
        try {
            const res = await fetch(`https://api.simplynoted.com/stripe/customer-data?customerId=${Id}`)
            const json = await res.json()
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
    
 
    return (
        <>
     
            <Accordion/>
        </>
    )
}