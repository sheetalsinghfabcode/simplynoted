import React from 'react';

export default function price() {
  return (
    <>
      <div className="pricing-Credit-Packs">
        <div className="Pre-Purchased font-thin text-center mt-10">
          <p className='text-black-800 text-gray-700 text-[16px]'>
            Save with Pre-Purchased Credits
            <span className='text-[15px] tracking-wide ml-[16px] text-white pt-[1px] pb-[2px] bg-rose-500 rounded-2xl pr-[11px] pl-[11px]'>NEW</span>
          </p>
        </div>
       <div className="Credit Packs text-center">
        <h1 className='text-blue-800 font-semibold text-6xl'>Credit Packs</h1>
        <h3 className=' mt-[18px] text-gray-700 font-thin text-[19px] text-center '>Save time and money by pre purchasing credits. 1 credit equates to 1 complete send.</h3>
       </div>
       <div className='credits-card mt-[100px] pl-[10px] pr-[10px]'>
        <div className='table-credits relative'>
          <img className='border border-b-0' src="https://simplynoted.com/cdn/shop/files/table-bg_12ce292e-bbd0-4c5a-a59c-d71ec51dd81c.png?v=1684911363"alt="credit"/>
        </div>
       <div className=' flex justify-center side-line gap-60'>
        <img src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"/>
        <img src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"/>
        <img src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"/>
        <img src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"/>
       </div>
       </div>
      </div>
    </>
  );
}
