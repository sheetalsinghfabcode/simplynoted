import React, { useState, useEffect, useRef, useCallback } from 'react';


export function CheckoutData() {

    return (
        <>
            <div className="'w-full h-full gap-2 mt-8 ">
                <div className='pb-[80px]'>
                    <h1 className='text-center font-bold text-4xl'>PAYMENT</h1>
                </div>
                <div className='w-[100%] flex mr-2 ml-2 gap-8  justify-center'>
                    <div className='p-5 bg-white max-w-[42%] w-full rounded-xl'>
                    </div>
                    <div className='p-5 bg-white max-w-[35%] w-full rounded-xl'>
                        <h1 className='text-left font-bold text-2xl'>ORDER SUMMARY</h1>
                        <text className='flex justify-between items-center m-3'>Subtotal <span>$22.8</span></text>
                        <div className='w-full h-[1px] bg-black'></div>
                        <text className='flex justify-between items-center m-3'>Total <span>$22.8</span></text>
                    </div>
                </div>
            </div>
        </>
    )
}