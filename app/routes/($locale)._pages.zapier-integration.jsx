import React from 'react';
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

export default function Zapier() {
  return (
    <div>
      <div className="flex flex-wrap sm:mt-[71px] mt-[27px] justify-center mx-auto w-[90%]">
        <div className="lg:w-[35%] lg:order-none order-2 w-full lg:text-left text-center">
          <div className="lg:block hidden">
            <img
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/zapier-logo-orange.png?v=1611259806"
              alt="zapier"
            />
            <h2 className="xl:text-[46px] text-[32px] mt-[26px] font-normal text-[#001A5F]">
              Zapier Integration
            </h2>
          </div>
          <p
            className="lg:text-[18px] text-[20px] text-black font-light w-[100%] leading-8 lg:mt-[26px] mt-7 w-[97%] lg:text-justify sm:text-center text-justify"
            style={{fontWeight: '100', color: '#1e1e1e'}}
          >
            Integrate and automate sending real handwritten notes from 2,500+
            softwares instantly. Request access to our Zapier App today!
          </p>
          <div className="absolute mt-[34px]">
            <div className="z-10 flex justify-center">
              {' '}
              {/* Higher z-index for top div */}
              <DynamicButton
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
                text="INTEGRATE NOW"
                className="mt-[6px] text-[16px] font-bold"
              />
            </div>
            <div className="z-[-1] relative top-[-56px]">
              {' '}
              {/* Lower z-index for bottom div */}
              <img
                src="https://simplynoted.com/cdn/shop/files/Group_460.svg"
                alt="Some description"
              />
            </div>
          </div>
        </div>
        <div className="lg:hidden block sm:mb-10 mb-[2.5rem]">
          <img
            className="mx-auto"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/zapier-logo-orange.png?v=1611259806"
            alt="shopify"
          />
          <h2 className="sm:text-[46px]  text-[32px] font-normal font-karla text-[#001A5F]">
            Zapier Integration
          </h2>
        </div>
        <div className="lg:w-[60%] w-full">
          <img
            className="w-full"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/zapier-laptop-1.png?v=1611259837"
          />
        </div>
      </div>

      <div className="shopify-tag flex justify-center mx-3 max-w 5/6 sm:mt-[130px] mt-[141px]">
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
            <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />
          </SwiperSlide>
          <SwiperSlide className="!mr-[-60px]">
            <img
              className="w-[36%] mt-[-13px]"
              src={hubspot}
              alt="LogoSimplinotedpic"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-[40%]"
              src={salesforce}
              alt="LogoSimplinotedpic"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={amazon} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={sheet} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-[90%]"
              src={click_funnel}
              alt="LogoSimplinotedpic"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={esty} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="lg:flex lg:mt-0 mt-8 hidden gap-[30px] flex-wrap items-center overflow-hidden">
        <img
          className="card-image-shopify"
          src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"
        />
        <div className="mt-[-71px]">
          <p className="max-w-[324px] mx-auto ml-[-53px] text-[19px] text-center font-light  relative">
            Send pen written notes automatically from your favorite CRM
          </p>
          <img
            className="left-[240px] absolute"
            src="https://simplynoted.com/cdn/shop/files/zapier-arrow.png?v=17017241910886262831"
          />
        </div>
      </div>
      {/* second */}
      <div className="flex flex-wrap justify-center ml-auto lg:mr-0 mr-auto w-[90%]">
        <div className="xl:w-[30%] lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
          <div className="lg:block hidden">
            <div className="text-[28px] color-[#001a5f]  font-karla text-[#001A5F]">
              <p className='color-[#001a5f] text-[40px] font-bold pb-[25px] w-[112%]'>
              Instantly Integrate With 
              </p>
              <p className='color-[#001a5f] text-[40px] font-bold pb-[25px] w-[112%]'>
              1,000s of Applications
              </p>
            </div>
          </div>
          <p className="lg:text-[20px] text-[18px] text-black font-light xl:w-[138%] w-[100%] leading-8 lg:mt-0 mt-7 lg:text-justify sm:text-center text-justify ">
            Start your trigger by finding your app in the Zapier database
          </p>
          <div className="lg:flex-row flex-col flex lg:items-left items-center lg:mt-0 mt-5">
            <DynamicButton
              text="INTEGRATE NOW"
              className="btn1 lg:w-[45%] lg:mt-6 md:w-[26%] sm:w-[38%] w-[50%] lg:!text-[13px] md:text-[14px] text-[12px] lg:h-[10%]  h-full mt-[35px]"
              onClickFunction={() =>
                (window.location.href =
                  'https://zapier.com/apps/simply-noted/integrations')
              }
            />
            <DynamicButton
              text="TUTORIALS"
              className="btn2 lg:w-[50%] md:w-[26%] text-[15px] mt-5"
              onClickFunction={() =>
                (window.location.href = 'https://simplynoted.com/blogs/news')
              }
            />
          </div>
        </div>
        <div className="lg:hidden block sm:mb-10 mb-7 leading-[46px] mt-10">
          <div className=" sm:text-[30px] text-center text-[32px] font-karla text-[#001A5F]">
            Instantly Integrate With 1,000s of Applications
          </div>
        </div>

        <div className="xl:w-[70%] lg:w-[60%] relative overflow-x-clip  w-full">
          <img
            className="lg:absolute relative 2xl:left-[30px] xl:max-w-[950px] lg:max-w-[725px] mx-auto overflow-hidden "
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
      </div>

      <div className="lg:flex hidden overflow-hidden justify-end max-w 5/6 mt-[105px]">
        <img
          className="simplinoted-card-image"
          src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"
        />
      </div>

      {/* third */}

      <div className="flex flex-wrap flex-row-reverse justify-center lg:ml-0  mr-auto  ml-auto  w-[90%] lg:mt-0 mt-8">
        <div className="lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
          <div className="lg:block hidden">
            <div className="  text-[28px] font-karla text-[#001A5F]">
              Send one or send
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>
          <p className="lg:text-[20px] text-[18px] text-black font-light w-[100%] leading-8 lg:mt-0 mt-7 lg:text-justify sm:text-center text-justify ">
            Simply Noted integrates with your software and will do bulk sends in
            just a few minutes of your time.
          </p>
          <div className="lg:flex-row flex-col flex lg:items-left items-center lg:mt-0 mt-5">
            <DynamicButton
              text="INTEGRATE NOW"
              className="btn1 lg:w-[45%] lg:mt-6 md:w-[26%] sm:w-[38%] w-[50%] lg:!text-[13px] md:text-[14px] text-[12px] lg:h-[10%]  h-full mt-[35px]"
              onClickFunction={() =>
                (window.location.href =
                  'https://zapier.com/apps/simply-noted/integrations')
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
          <div className="sm:text-[46px] text-center text-[32px] font-karla text-[#001A5F]">
            Send one or send
            <span className="font-beauty text-6xl font-bold">thousands</span>
          </div>
        </div>

        <div className="xl:w-[60%] lg:w-[60%] relative overflow-x-clip  w-full">
          <img
            className="lg:absolute relative xl:max-w-[800px] lg:max-w-[725px] mx-auto  "
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

      <div className="flex flex-row items-center justify-center lg:w-full md:w-[90%] mx-auto">
        <div className="banner-detail text-center">
          <img
            className="lg:block absolute hidden left-0 mt-[-18rem]"
            src="https://simplynoted.com/cdn/shop/files/deep-integration-stamps.png?v=1452620472871025556"
            alt="shopify"
          />

          <img
            className="absolute lg:mt-[-14rem] md:mt-[-11rem] mt-[-13rem] "
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/zapier-logo-orange.png?v=1611259806"
            alt="shopify"
          />
          <img
            className="lg:block hidden absolute mt-[100px] right-0 "
            src="https://simplynoted.com/cdn/shop/files/deep-integration-pen.png?v=2271676627160902087"
            alt="shopify"
          />
          <div className="lg:text-6xl md:text-[37px] sm:text-[28px] text-[20px] lg:mt-0 md:mt-[28px] mt-[80px] flex text-white flex-col items-center font-karla">
            Integrate with Zapier
            <div className="md:flex-row flex-col  lg:mt-10 md:mt-[20px]  flex md:gap-12 items-center">
              <DynamicButton
                text="INTEGRATE NOW"
                className="req-btn !ml-0 md:w-50%  !w-full"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="VIEW ALL INTEGRATION"
                className="sch-btn !ml-0 md:w-50% !w-full"
                onClickFunction={() =>
                  (window.location.href = 'https://zapier.com/apps')
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
