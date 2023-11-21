import React from 'react';
import ZapierIcon from '../../assets/Image/zapier-logo-orange.png';
import ac_blue from "../../assets/Image/ac-blue-orb.png";
import shopify from '../../assets/Image/shopify-log.png';
import hubspot from "../../assets/Image/Hubspot.png";
import zoho from "../../assets/Image/zoho.png";
import salesforce from "../../assets/Image/Salesforce.png";
import amazon from "../../assets/Image/amazon.png";
import sheet from "../../assets/Image/Google-Sheets.png";
import click_funnel from "../../assets/Image/clickfunnels-dark-logo.png";
import esty from "../../assets/Image/Etsy_logo.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';

export default function zapier() {
  return (
    <div>
      <div className="shopify-main-cont ml-[100px] flex justify-center">
        <div className="shopify-sec-cont  flex mt-[71px] items-center max-w-5/6">
          <div className="Shopify Integration">
            <img src={ZapierIcon} alt="shopify" />
            <h2 className="Integration-shopify text-base font-light">
              Shopify Integration
            </h2>
            <p className="Delight-customers mt-6 font-light">
              Delight your customers with automated real
              <br /> handwritten notes from your Shopify store.
              <br /> A personalized handwritten note makes the customer
              <br /> experience so much more memorable, and is a great
              <br /> way to build lasting relationships and increase lifetime
              <br /> value of your customers.
            </p>
            <button className="intigrate-button" type="button">
              INTEGRATE NOW
            </button>
          </div>
          <div className="img-shopify-inti">
            <img
              className="w-[730px]"
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/Group_854.png?v=1611976470"
            />
          </div>
        </div>
      </div>
      <div className="shopify-tag flex justify-center mx-3 max-w 5/6 mt-[74px]">
      <Swiper
            modules={[Autoplay]}
            direction={'horizontal'}
            spaceBetween={1}
            slidesPerView={6}
           
          loop={true}
          breakpoints={{
         
            768: {
              spaceBetween:10,
              slidesPerView:4,
             
            },
            1024:{
              spaceBetween:10,
              slidesPerView:6,
            }
          }}
     
      autoplay={{ delay:1000 ,
        pauseOnMouseEnter: true, 
         disableOnInteraction: false,
        }}

    >
       
      <SwiperSlide><img className='w-[90%]' src={ac_blue} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[60%]' src={shopify} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide className='!mr-[-60px]'><img className='w-[36%] mt-[-13px]' src={hubspot} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={zoho} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[40%]' src={salesforce} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={amazon} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={sheet} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={click_funnel} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={esty} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={ac_blue} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[60%]' src={shopify} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={zoho} alt="LogoSimplinotedpic"  /> </SwiperSlide>
    </Swiper>

      </div>
      <div className="shopify-tag-card flex gap-[100px] items-center">
        <img
          className="card-image-shopify"
          src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"
        />
        <div className="written notes">
          <p className="max-w-[287px] mx-auto text-center font-light text-lg relative">
            Send pen written notes automatically from your favorite CRM
          </p>
          <img
            className="absolute left-[354px] top-[904px]"
            src="https://simplynoted.com/cdn/shop/files/zapier-arrow.png?v=17017241910886262831"
          />
        </div>
      </div>
      <div className="sec-shopify-cont flex justify-center">
        <div className="sec-left-cont ml-[105px]">
          <div className="send-one">
            <h1>
              Send one or send <span className="italic">thousands</span>
            </h1>
          </div>
          <div className="consetetur">
            <h2>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              <br /> diam nonumy eirmod tempor invidunt ut labore et dolore
              <br /> magna aliquyam erat, sed diam voluptua.
            </h2>
          </div>
          <div className="button-tutorial-now flex gap-12">
            <button className="intigrate-button" type="button">
              INTEGRATE NOW
            </button>
            <button className="tutorials" type="button">
              TUTORIALS
            </button>
          </div>
        </div>
        <div className="sec-right-cont">
          <img
            className="w-[747px]"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
      </div>
      <div className="simplinoted-card flex justify-end max-w 5/6">
        <img
          className="simplinoted-card-image"
          src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"
        />
      </div>
      <br />
      <div className="thrid-shopify-cont flex justify-center">
        <div className="sec-left-cont">
          <img
            className="w-[747px]"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
        <div className="sec-right-cont mr-[105px]">
          <div className="send-one">
            <h1>
              Send one or send <span className="italic">thousands</span>
            </h1>
          </div>
          <div className="consetetur">
            <h2>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              <br /> diam nonumy eirmod tempor invidunt ut labore et dolore
              <br /> magna aliquyam erat, sed diam voluptua.
            </h2>
          </div>
          <div className="button-tutorial-now flex gap-12">
            <button className="intigrate-button" type="button">
              INTEGRATE NOW
            </button>
            <button className="tutorials" type="button">
              TUTORIALS
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-[-230px]">
        <img
          className="max-w-screen-sm mr-[-11.5rem]"
          src="https://simplynoted.com/cdn/shop/files/salesforce-letter-2.png?v=12785632709067599954"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="banner-detail text-center">
          <img className="mx-auto mb-6" src={ZapierIcon} alt="apier" />
          <h1 className="text-6xl flex text-white flex-col items-center">
            Integrate with Zapier
            <div className="button-tutorial-now mt-10 text-xl p-[12px] flex gap-12">
              <button className="integrate-button w-[255px]  p-[12px] bg-rose-500 " type="button">
                INTEGRATE NOW
              </button>
              <button className="tutorial w-[255px] text-large  p-[12px] ring ring-white-500" type="button">
              VIEW ALL INTEGRATIONS
              </button>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
