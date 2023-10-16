import React, { useEffect, useState } from 'react'

let storedDataString, storedDataArray
export default function AddCartFunc() {
    const [cartData, setCartData] = useState('')


    // if (storedDataString ) {
    // console.log(storedDataArray);
    // console.log(storedDataString,'storedDataString');
    // console.log(cartData,'cartData');
    // console.log(cartData); // This will log the array of objects
    // }
    // console.log(cartData, 'cartdta----');
    useEffect(() => {
        storedDataString = localStorage.getItem('mydata');
        console.log(storedDataString);
        setCartData(JSON.parse(storedDataString))
    }, [])
    console.log(cartData[0]);
    // if(storedDataString && storedDataString.length){
    // storedDataArray = JSON.parse(storedDataString);
    // setCartData(storedDataArray)

    // }
    return (
        <div className='w-full h-full gap-2 mt-8'>
            <h1 className='text-center font-bold text-4xl'>SHOPPING CART</h1>
            {cartData && cartData.map((item) =>
                <div className='w-[800px]  bg-[white] m-auto mt-10'>
                    <div className='flex'>
                        <div className='w-[400px]'>
                            <div className='flex m-5'>
                                <div className='max-w-[20%] m-5'>
                                    <img src={item.productImg} alt="" />

                                </div>
                                <div className='max-w-[30%]'>
                                    <text>{item.productTitle}</text><br /><br />
                                    <text> Sender: {item.senderAddress.address1},{item.senderAddress.city},{item.senderAddress.state},{item.senderAddress.country}</text>
                                </div>
                            </div>
                        </div>

                        <div className='w-[200px]'>
                            <div className='mt-6'>
                                <div className=''>
                                    <text> Price:<span >{item.price}</span></text>
                                    <text> Quantity:<span >{item.price}</span></text>
                                </div>
                            </div>
                        </div>
                        <div>www</div>
                    </div>
                </div>
            )}

        </div>
    )
}
