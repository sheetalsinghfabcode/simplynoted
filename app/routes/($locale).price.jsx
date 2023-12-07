import React, {useState} from 'react';
import {Link} from '@remix-run/react';
export default function price() {
  return (
    <>
     <div className='full-cont'>
      <div className="pricing-Credit-Packs">
        <div className="Pre-Purchased font-thin text-center mt-10">
          <p className="text-black-800 text-gray-700 text-[16px]">
            Save with Pre-Purchased Credits
            <span className="text-[15px] tracking-wide ml-[16px] text-white pt-[1px] pb-[2px] bg-rose-500 rounded-2xl pr-[11px] pl-[11px]">
              NEW
            </span>
          </p>
        </div>
        <div className="Credit Packs text-center">
          <h1 className="text-blue-800 font-semibold lg:text-6xl text-[26px]">Credit Packs</h1>
          <h3 className=" mt-[18px] text-gray-700 font-thin lg:text-[19px] text-[15px] text-center ">
            Save time and money by pre purchasing credits. 1 credit equates to 1
            complete send.
          </h3>
        </div>
        {/* <div className="credits-card  mt-[100px] pl-[10px] pr-[10px]">
          <div className="table-credits w-[1245px] relative">
            <img
              className="main-cont border border-b-0"
              src="https://simplynoted.com/cdn/shop/files/table-bg_12ce292e-bbd0-4c5a-a59c-d71ec51dd81c.png?v=1684911363"
              alt="credit"
            />
            <div className="credits-cont justify-center flex gap-4">
              <div className="first-div">
                <div className="flex-item">100 credits</div>
                <div className="Includes absolute">
                  <div className="discrition">
                    <p>1 Credit = 1 Card </p>
                    <span className="font-bold">Includes:</span>
                    <h3>Postage & Custom</h3>
                    <h2>Cards</h2>
                  </div>
                  <img
                    className="side-line absolute top-[-104px] max-h-[300px]"
                    src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"
                  />
                </div>
              </div>
              <div className="sec-div">
                <div className="flex-item">200 credits</div>
                <div className="Includes absolute">
                  <div className="discrition">
                    <p>1 Credit = 1 Card </p>
                    <span className="font-bold">Includes:</span>
                    <h3>Postage & Custom</h3>
                    <h2>Cards</h2>
                  </div>
                  <img
                    className="side-line absolute top-[-104px]  max-h-[300px]"
                    src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"
                  />
                </div>
              </div>
              <div className="third-div">
                <div className="flex-item">500 credits</div>
                <div className="Includes absolute">
                  <div className="discrition">
                    <p>1 Credit = 1 Card </p>
                    <span className="font-bold">Includes:</span>
                    <h3>Postage & Custom </h3>
                    <h2>Cards</h2>
                  </div>
                  <img
                    className="side-line absolute top-[-104px]  max-h-[300px]"
                    src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"
                  />
                </div>
              </div>
              <div className="fourth-div">
                <div className="flex-item">1000 credits</div>
                <div className="Includes absolute">
                  <div className="discrition">
                    <p>1 Credit = 1 Card </p>
                    <span className="font-bold">Includes:</span>
                    <h3>Postage & Custom </h3>
                    <h2>Cards</h2>
                  </div>
                  <img
                    className="side-line absolute top-[-104px] max-h-[300px]"
                    src="https://simplynoted.com/cdn/shop/files/column-border.png?v=1684911363"
                  />
                </div>
              </div>
              <div className="fifth">
                <div className="flex-item">2500 credits</div>
                <div className="Includes absolute">
                  <div className="discrition">
                    <p>1 Credit = 1 Card </p>
                    <span className="font-bold">Includes:</span>
                    <h3>Postage & Custom</h3>
                    <h2>Cards</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons-cart flex">
              <button className="add-to-cart" type="button">
                $350.00
                <Link to="/cart">add to cart </Link>
              </button>

              <button className="add-to-cart" type="button">
                $850.00
                <Link to="/cart">add to cart </Link>
              </button>
              <button className="add-to-cart" type="button">
                $1,650.00
                <Link to="/cart">add to cart </Link>
              </button>
              <button className="add-to-cart" type="button">
                $3,200.00
                <Link to="/cart">add to cart </Link>
              </button>
              <button className="add-to-cart" type="button">
                $7,250.00
                <Link to="/cart">add to cart </Link>
              </button>
            </div>
          </div>
        </div> */}
        </div>
        <div className="arrow-down flex justify-center">
          <img
            className="md:h-[321px] h-[123px]"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/pricing-arrow-1.png?v=1611263366"
            alt="arrow-down"
          />
        </div>  
        <div className="Transparency-cont">
          <h1 className="text-#001a5f lg:text-6xl text-[24px]  font-extrabold tracking-wide leading-tight pb-10 text-center">
            100% Price Transparency
          </h1>
        </div>
        <div className="sec-Transparency-cont lg:flex grid justify-center">
          <div className="left-cont">
            <div className=' flex justify-center text-[21px] mb-[29px] font-600 color-[#1e40af]'>
            <h2>Simply Noted features & pricing</h2>
            </div>
            <div className=" Customizable-ntegrations grid md:grid-cols-3 grid-cols-2 md:gap-[23px] gap-[30px]">
              <div className="real-pen-notice w-[100%] ">
                <div class="circle-percentage">100%</div>
                <p className="text-blue-900 text-center font-bold lg:text-[13px] text-[12px] tracking-tight leading-6">
                  Real Pen-written notes & envelopes
                </p>
                <a href="#" className="absolute left-[60px]  md:ml-[0px] ml-[-31px] bottom-[36px]">
                  Learn More →
                </a>
              </div>
              <div className="real-pen-notice w-[100%]">
                <div class="circle-percentage">
                  <img
                    className="card-icon"
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/bxs-customize.svg?v=1611260469"
                  />
                </div>
                <p className="text-blue-900 text-center font-bold lg:text-[13px] text-[12px] tracking-tight leading-6">
                  Fully Customizable Designs
                </p>
                <a href="#" className="absolute left-[41px] bottom-[36px]">
                  Learn More →
                </a>
              </div>
              <div className="real-pen-notice w-[100%]">
                <div class="circle-percentage">
                  <img
                    className="card-icon"
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/gears.svg?v=1611260469"
                  />
                </div>
                <p className="text-blue-900 text-center font-bold lg:text-[13px] text-[12px] tracking-tight leading-6">
                  Unlimited Integrations
                </p>
                <a href ="#" className="absolute left-[41px] bottom-[36px]">
                  Learn More →
                </a>
              </div>
                <div className="real-pen-notice w-[100%]">
                <div class="circle-percentage">
                  <img
                    className="custom-icon"
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/mailbox2.svg?v=1611260469"
                  />
                </div>
                <p className="text-blue-900 text-center font-bold lg:text-[13px] text-[12px] tracking-tight leading-6">
                  Custom Campaigns
                </p>
                <a href ="#" className="absolute left-[41px] bottom-[36px]">
                  Learn More →
                </a>
              </div>
              <div className="real-pen-notice w-[100%]">
                <div class="circle-percentage">
                  <img
                    className="card-icon"
                    src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/card-giftcard.svg?v=1611260469"
                  />
                </div>
                <p className="text-blue-900 text-center font-bold lg:text-[13px] text-[12px] tracking-tight leading-6">
                  Gift-card Add-ons
                </p>
                <a href="#" className="absolute left-[41px] bottom-[36px]">
                  Learn More →
                </a>
              </div>
              <div className="real-pen-notice w-[100%]">
                <div class="circle-percentage">100%</div>
                <p className="text-blue-900 text-center font-bold lg:text-[13px] text-[12px] tracking-tight leading-6">
                  Transparent Pricing
                </p>
                <a href="#" className="absolute left-[41px] bottom-[36px]">
                  Learn More →
                </a>
              </div>
            
            </div>
          </div>
          <div className="right-cont relative p-[58px]">
            <div className='amount flex justify-center gap-8'>
              <div className='text-red-200'>Amount</div>
              <div className='text-red-200'>Price per unit</div>
            </div>
            <div className='flex flex justify-center mb-[22px] gap-[27px] mt-[12px]'>
              <div className='w-[69px]  text-center text-xs'>Number of Cards</div>
              <div className='text-center text-xs w-[63px]'>Standard Cards</div>
              <div className='text-center text-xs'>Custom Cards</div>
            </div>
            <img className='w-full' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center text-sm gap-[51px] mt-[14px]'>
              <div>1-99</div>
              <div>$3.25</div>
              <div>$3.75</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center text-sm gap-[51px] mt-[14px]'>
              <div>100-249</div>
              <div>$3.15</div>
              <div>$3.65</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center text-sm gap-[51px] mt-[14px]'>
              <div>250-499</div>
              <div>$3.00</div>
              <div>$3.50</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center text-sm gap-[51px] mt-[14px]'>
              <div>500-999</div>
              <div>$2.85</div>
              <div>$3.35</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center text-sm gap-[51px] mt-[14px]'>
              <div>1000-2499</div>
              <div>$2.70</div>
              <div>$3.20</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center text-sm gap-[51px] mt-[14px]'>
              <div>2500 +</div>
              <div>$2.55</div>
              <div>$3.05</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <div className='flex justify-center gap-[15px] text-sm mt-[14px]'>
              <div>10,000+</div>
              <div>Contact Us</div>
              <div>Contact Us</div>
            </div>
            <img className='w-full mt-[12px]' src="https://simplynoted.com/cdn/shop/files/pricing-table-underline.png"/>
            <p className='text-center text-sm mt-[12px]'>*Prices do not include postage</p>
            <button className='bg-rose-500 mt-[12px] p-[11px] text-white w-full' type="button">START ORDER</button>
           </div> 
        </div>
      </div>
    </>
  );
}
