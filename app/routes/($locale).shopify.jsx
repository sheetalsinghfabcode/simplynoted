import React from 'react';
import ShopifyIcon from '../../assets/Image/shopify-log.png';
import ac_blue from '../../assets/Image/ac-blue-orb.png';
import shopifys from '../../assets/Image/shopify-log.png';
import hubspot from '../../assets/Image/Hubspot.png';
import zoho from '../../assets/Image/zoho.png';
import salesforce from '../../assets/Image/Salesforce.png';
import amazon from '../../assets/Image/amazon.png';
import sheet from '../../assets/Image/Google-Sheets.png';
import click_funnel from '../../assets/Image/clickfunnels-dark-logo.png';
import esty from '../../assets/Image/Etsy_logo.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import DynamicButton from '~/components/DynamicButton';
import 'swiper/css/autoplay';

export default function shopify() {
  return (
    <div>
      <div className="flex flex-wrap mt-[71px] justify-center mx-auto w-[90%]">
        <div className="lg:w-[35%] lg:order-none order-2 w-full lg:text-left text-center">
          <div className="lg:block hidden">
            <img src={ShopifyIcon} alt="shopify" />
            <h2 className="xl:text-[46px] text-[32px] font-normal text-[#001A5F]">
              Shopify Integration
            </h2>
          </div>
          <p className="lg:text-[18px] text-[20px] text-black font-light xl:w-[94%] w-[100%] leading-8 lg:mt-0 mt-10 ">
            Delight your customers with automated real handwritten notes from
            your Shopify store. A personalized handwritten note makes the
            customer experience so much more memorable, and is a great way to
            build lasting relationships and increase lifetime value of your
            customers.
          </p>
          <DynamicButton
            onClickFunction={() =>
              (window.location.href =
                'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105 ')
            }
            text="INTEGRATE NOW"
            className="btn1 lg:mt-5 mt-10 xl:w-[45%] lg:w-[52%] md:w-[35%] w-[50%] text-[16px]"
          />
        </div>
        <div className="lg:hidden block mb-10">
          <img className="mx-auto" src={ShopifyIcon} alt="shopify" />
          <h2 className="sm:text-[46px]  text-[32px] font-normal font-karla text-[#001A5F]">
            Shopify Integration
          </h2>
        </div>
        <div className="lg:w-[65%] w-full">
          <img
            className="w-full"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/Group_854.png?v=1611976470"
          />
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
            280: {
              slidesPerView: 2,
            },
            540: {
              slidesPerView: 3,
            },
            768: {
              spaceBetween: 10,
              slidesPerView: 4,
            },
            1024: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
          }}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide className="!mr-[-60px]">
            <img
              className="w-[36%] mt-[-13px]"
              src={hubspot}
              alt="LogoSimplinotedpic"
            />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[40%]"
              src={salesforce}
              alt="LogoSimplinotedpic"
            />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[90%]" src={amazon} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[90%]" src={sheet} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-[90%]"
              src={click_funnel}
              alt="LogoSimplinotedpic"
            />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[90%]" src={esty} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />{' '}
          </SwiperSlide>
        </Swiper>
      </div>
      
      <div className="lg:flex lg:mt-0 mt-8 hidden gap-[30px] flex-wrap items-center overflow-hidden">
        <img
          className="card-image-shopify"
          src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"
        />
        <div className="mt-[-71px]">
          <p className="max-w-[287px] mx-auto text-center font-light text-lg relative">
            Send pen written notes automatically from your favorite CRM
          </p>
          <img
            className="left-[80px] "
            src="https://simplynoted.com/cdn/shop/files/zapier-arrow.png?v=17017241910886262831"
          />
        </div>
      </div>
{/* second */}
      <div className="flex flex-wrap justify-center ml-auto lg:mr-0 mr-auto w-[90%]">
        <div className="xl:w-[30%] lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
          <div className="lg:block hidden">
            <div className="  text-[28px] font-karla text-[#001A5F]">
              Send one or send{' '}
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>
          <p className="lg:text-[20px] text-[18px] text-black font-light xl:w-[138%] w-[100%] leading-8 lg:mt-0 mt-10 ">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <div className="lg:flex-row flex-col flex lg:items-left items-center lg:mt-0 mt-5">
            <DynamicButton
              text="INTEGRATE NOW"
              className="btn1 lg:w-[45%] lg:mt-6 md:w-[26%] sm:w-[38%] w-[45%] lg:!text-[13px] md:text-[14px] text-[12px] lg:h-[10%]  h-full mt-[35px]"
              onClickFunction={() =>
                (window.location.href =
                  'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105 ')
              }
            />
            <DynamicButton
              text="TUTORIALS"
              className="btn2 lg:w-[50%] md:w-[26%] text-[15px] mt-5"
              onClickFunction={() => navigate('/blogs')}
            />
          </div>
        </div>
        <div className="lg:hidden block mb-10">
          <div className=" sm:text-[46px]  text-[32px] font-karla text-[#001A5F]">
            Send one or send{' '}
            <span className="font-beauty text-6xl font-bold">thousands</span>
          </div>
        </div>

        <div className="xl:w-[70%] lg:w-[60%] relative overflow-x-clip  w-full">
          <img
            className="lg:absolute relative xl:max-w-[950px] lg:max-w-[725px] mx-auto overflow-hidden "
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
      </div>



      <div className="lg:flex hidden overflow-hidden justify-end max-w 5/6">
        <img
          className="simplinoted-card-image"
          src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"
        />
      </div>

      {/* third */}

      <div className="flex flex-wrap flex-row-reverse justify-center lg:ml-0  mr-auto  ml-auto  w-[90%] lg:mt-0 mt-8">
        <div className="xl:w-[30%] lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
          <div className="lg:block hidden">
            <div className="  text-[28px] font-karla text-[#001A5F]">
              Send one or send{' '}
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>
          <p className="lg:text-[20px] text-[18px] text-black font-light xl:w-[138%] w-[100%] leading-8 lg:mt-0 mt-10 ">
            Simply Noted integrates with your software and will do bulk sends in
            just a few minutes of your time.
          </p>
          <div className="lg:flex-row flex-col flex lg:items-left items-center lg:mt-0 mt-5">
            <DynamicButton
              text="INTEGRATE NOW"
              className="btn1 lg:w-[45%] lg:mt-6 md:w-[26%] sm:w-[38%] w-[45%] lg:!text-[13px] md:text-[14px] text-[12px] lg:h-[10%]  h-full mt-[35px]"
              onClickFunction={() =>
                (window.location.href =
                  'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105 ')
              }
            />
            <DynamicButton
              text="TUTORIALS"
              className="btn2 lg:w-[50%] md:w-[26%] text-[15px] mt-5"
              onClickFunction={() => navigate('/blogs')}
            />
          </div>
        </div>
        <div className="lg:hidden block mb-10">
          <div className="sm:text-[46px]  text-[32px] font-karla text-[#001A5F]">
            Send one or send{' '}
            <span className="font-beauty text-6xl font-bold">thousands</span>
          </div>
        </div>

        <div className="xl:w-[70%] lg:w-[60%] relative overflow-x-clip  w-full">
          <img
            className="lg:absolute relative xl:max-w-[950px] lg:max-w-[725px] mx-auto overflow-hidden "
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
      </div>
      <div className="lg:flex hidden overflow-hidden justify-end max-w 5/6">
        <img
          className="simplinoted-card-image"
          src="https://simplynoted.com/cdn/shop/files/salesforce-letter-2.png?v=12785632709067599954"
        />
      </div>



      <div className="flex flex-row items-center justify-center h-screen">
        <div className='absolute ml-[-65rem] mt-[-19rem]'>
        <img className="mx-auto mb-6" src="https://simplynoted.com/cdn/shop/files/deep-integration-stamps.png?v=1452620472871025556" alt="shopify" />
        </div>
        <div className="banner-detail text-center">
          <img className="mx-auto mb-6" src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/1024px-Shopify_logo_2018.svg_564a8f8d-db80-41ef-b750-3fddbe29354c.png?v=1612111934" alt="shopify" />
          <h1 className="text-6xl flex text-white flex-col items-center font-karla">
            Integrate with Shopify
            <div className="button-tutorial-now mt-10 text-xl p-[12px] flex gap-12">
            <DynamicButton
                    text="INTEGRATE NOW"
                    className="req-btn"
                     onClickFunction={()=>window.location.href=("https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb")}
                
            />
            <DynamicButton
                    text="SCHEDULE A DEMO"
                    className="sch-btn"
                     onClickFunction={()=>window.location.href=("https://meetings.hubspot.com/rick24")}
                
            />
            </div>
          </h1>
        </div>
        <div className='absolute mr-[-57rem] mt-[48px] overflow-x-hidden'>
        <img className="mx-auto mr-[-4rem] " src="https://simplynoted.com/cdn/shop/files/deep-integration-pen.png?v=2271676627160902087" alt="shopify" />
        </div>
      </div>
    </div>
  );
}
