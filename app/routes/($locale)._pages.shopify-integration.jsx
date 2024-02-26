
// import React, {useEffect, useState} from 'react';
// import ac_blue from '../../assets/Image/ac-blue-orb.png';
// import shopifys from '../../assets/Image/shopify-log.png';
// import hubspot from '../../assets/Image/Hubspot.png';``
// import zoho from '../../assets/Image/zoho.png';
// import salesforce from '../../assets/Image/Salesforce.png';
// import amazon from '../../assets/Image/amazon.png';
// import sheet from '../../assets/Image/Google-Sheets.png';
// import click_funnel from '../../assets/Image/clickfunnels-dark-logo.png';
// import esty from '../../assets/Image/Etsy_logo.png';
// import ShopifyIcon from '../../assets/Image/shopify-log.png';
// import ShopifyWhiteLogo from '../../assets/Image/shopify-white-logo.png';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import {Autoplay} from 'swiper/modules';
// import DynamicButton from '~/components/DynamicButton';
// import 'swiper/css/autoplay';
// import {defer} from '@remix-run/server-runtime';
// import { seoPayload } from '~/lib/seo.server';
// import CanvasOne from "../../assets/Video/canvas-first.gif";
// import CanvasTow from "../../assets/Video/canvas-sec.gif";

// export async function loader({request,context}){
//   const {page} = await context.storefront.query(Shopify_GRAPH_QL, {
//     variants: {},
//   });
//   const seo = seoPayload.page({page, url: request.url});
//   return defer({
//     seo,
//     page,
//   });
// }
// export default function shopify() {
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     setAnimate(true);
//   }, []);

//   return (
//     <div className="w-full">
//       <div className="flex flex-wrap sm:mt-[71px] mt-[50px] justify-center mx-auto px-[16px] md:px-[40px] ">
//         <div
//           className={`w-full ${
//             animate ? 'fade-in' : ''
//           } lg:w-2/5 lg:order-none order-2 w-full pl-[35px] lg:text-left text-center`}
//         >
//           <div className="lg:block hidden">
//             <img src={ShopifyIcon} alt="shopify" className="" />
//             <h2 className="xl:text-[46px] text-[32px] mt-[26px] font-normal text-[#001A5F]">
//               Shopify Integration
//             </h2>
//           </div>
//           <p
//             className="lg:text-[18px] text-[20px] text-black font-light w-full leading-8 lg:mt-[26px] mt-7 lg:text-left sm:text-center text-center"
//             style={{fontWeight: '100', color: '#1e1e1e'}}
//           >
//           Delight your customers with automated real handwritten notes from your Shopify store. A personalized handwritten note makes the customer experience so much more memorable, and is a great way to build lasting relationships and increase lifetime value of your customers.
//           </p>
//           <div className="flex justify-center lg:justify-start md:justify-center mt-[16px]">
//             <div className="INTEGRATE flex justify-center">
//               {/* Higher z-index for top div */}
//               <DynamicButton
//                 onClickFunction={() =>
//                   (window.location.href =
//                     'https://zapier.com/apps/simply-noted/integrations')
//                 }
//                 text="INTEGRATE NOW"
//                 className="mt-[6px] text-[16px] font-bold"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="lg:hidden block sm:mb-10 mb-[2.5rem]">
//           <img className="mx-auto mb-[12px]" src={ShopifyIcon} alt="shopify" />
//           <h2 className="sm:text-[46px]  text-[32px] font-normal font-karla text-[#001A5F]">
//             Shopify Integration
//           </h2>
//         </div>
//         <div className={`w-full ${animate ? 'fade-in' : ''} lg:w-[60%] w-full`}>
//           <img
//             className="w-full"
//             src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/zapier-laptop-1.png?v=1611259837"
//           />
//         </div>
//       </div>

//       <div className="shopify-tag flex justify-center mx-3 max-w 5/6 sm:mt-[130px] mt-[50px]">
//         <Swiper
//           modules={[Autoplay]}
//           direction={'horizontal'}
//           spaceBetween={1}
//           slidesPerView={6}
//           loop={true}
//           breakpoints={{
//             280: {
//               slidesPerView: 2,
//             },
//             540: {
//               slidesPerView: 3,
//             },
//             768: {
//               spaceBetween: 10,
//               slidesPerView: 4,
//             },
//             1024: {
//               spaceBetween: 10,
//               slidesPerView: 6,
//             },
//           }}
//           autoplay={{
//             delay: 1000,
//             pauseOnMouseEnter: true,
//             disableOnInteraction: false,
//           }}
//         >
//           <SwiperSlide>
//             <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />
//           </SwiperSlide>
//           <SwiperSlide className="!mr-[-60px]">
//             <img
//               className="w-[36%] mt-[-13px]"
//               src={hubspot}
//               alt="LogoSimplinotedpic"
//             />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img
//               className="w-[40%]"
//               src={salesforce}
//               alt="LogoSimplinotedpic"
//             />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[90%]" src={amazon} alt="LogoSimplinotedpic" />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[90%]" src={sheet} alt="LogoSimplinotedpic" />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img
//               className="w-[90%]"
//               src={click_funnel}
//               alt="LogoSimplinotedpic"
//             />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[90%]" src={esty} alt="LogoSimplinotedpic" />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />
//           </SwiperSlide>

//           <SwiperSlide>
//             <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />
//           </SwiperSlide>
//         </Swiper>
//       </div>

//       <div className="lg:flex lg:mt-0 mt-8 hidden gap-[30px] flex-wrap items-center overflow-hidden">
//         <img
//           className="card-image-shopify"
//           src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"
//         />
//         <div className="mt-[-71px]">
//           <p className="max-w-[324px] mx-auto ml-[-53px] text-[19px] text-center font-light  relative">
//             Send pen written notes automatically from your favorite CRM
//           </p>
//           <img
//             className="left-[240px] absolute"
//             src="https://simplynoted.com/cdn/shop/files/zapier-arrow.png?v=17017241910886262831"
//           />
//         </div>
//       </div>

//       <div className="flex flex-wrap relative justify-center  ml-auto lg:mr-0 mr-auto ">
//         <div className="absolute top-[383px] z-[-12] right-[406px]">
//           <img className="w-[1023px]" src={CanvasOne} alt="Computer man" />
//         </div>
//         <div className="xl:w-[30%] lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
//           <div className="lg:block hidden">
//             <div className="text-[28px] color-[#001a5f]  font-karla text-[#001A5F]">
//               <p className="color-[#001a5f] text-[38px] font-bold pb-[25px] w-[450%]">
//                 Instantly Integrate With
//               </p>
//               <p className="color-[#001a5f] text-[38px] font-bold pb-[25px] w-[450%]">
//                 1,000s of Applications
//               </p>
//             </div>
//           </div>
//           <p className="lg:text-[20px] text-[18px] text-black font-light leading-8 lg:mt-0 mt-7 lg:text-justify sm:text-center text-justify ">
//           Integrate and automate sending real handwritten notes from 2,500+ softwares instantly. Request access to our Zapier App today
//           </p>
//           <div className="lg:flex-row flex-col flex lg:items-left  items-center gap-[12px]  mt-5">
//             <DynamicButton
//               text="INTEGRATE NOW"
//               className="btn1 lg:!text-[17px] w-[247px] max-w-[247px]  md:text-[14px] h-[54px]  mt-[35px]"
//               onClickFunction={() =>
//                 (window.location.href =
//                   'https://zapier.com/apps/simply-noted/integrations')
//               }
//             />
//             <DynamicButton
//               text="TUTORIALS"
//               className="btn2 lg:!text-[17px] w-[247px] max-w-[247px] md:text-[14px] !h-[69px] items-center text-center"
//               onClickFunction={() =>
//                 (window.location.href = 'https://simplynoted.com/blogs/news')
//               }
//             />
//           </div>
//         </div>
//         <div className="lg:hidden block sm:mb-10 mb-7 leading-[46px] mt-10">
//           <div className=" sm:text-[30px] text-center text-[32px] font-karla text-[#001A5F]">
//             Instantly Integrate With 1,000s of Applications
//           </div>
//         </div>

//         <div className="lg:w-[58%] relative overflow-x-clip  w-full">
//           <img
//             className="lg:absolute relative 2xl:left-[56px] xl:max-w-[975px] lg:max-w-[725px] mx-auto overflow-hidden "
//             src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
//           />
//         </div>
//       </div>

//       <div className="lg:flex hidden overflow-hidden justify-end max-w 5/6 mt-[250px] mb-[20px]">
//         <img
//           className="simplinoted-card-image"
//           src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"
//         />
//       </div>

//       <div className="flex flex-wrap flex-row-reverse relative justify-center lg:ml-0  mr-auto  ml-auto  w-[95%] lg:mt-0 mt-8">
//         <div className="absolute top-[346px] z-[-12]">
//           <img className="w-[1023px]" src={CanvasTow} alt="Computer man" />
//         </div>
//         <div className="lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
//           <div className="lg:block hidden">
//             <div
//               style={{fontSize: '46px', fontWeight: 500}}
//               className="text-[#001A5F]"
//             >
//               Send one or send
//               <span className="font-beauty text-6xl font-bold">thousands</span>
//             </div>
//           </div>
//           <p className="lg:text-[20px] text-[18px] text-black font-light w-[100%] leading-8 lg:mt-0 mt-7 lg:text-justify sm:text-center text-justify ">
//             Simply Noted integrates with your software and will do bulk sends in
//             just a few minutes of your time.
//           </p>
//           <div className="lg:flex-row flex-col gap-[12px] flex lg:items-left items-center lg:mt-[15px] mt-5">
//             <DynamicButton
//               text="INTEGRATE NOW"
//               className="btn1  lg:!text-[17px] w-[247px]  md:text-[14px] h-[54px]  mt-[35px]"
//               onClickFunction={() =>
//                 (window.location.href =
//                   'https://zapier.com/apps/simply-noted/integrations')
//               }
//             />
//             <DynamicButton
//               text="TUTORIALS"
//               className="btn2  lg:!text-[17px] w-[247px] md:text-[14px] !h-[69px] items-center text-center"
//               onClickFunction={() => navigate('/blogs')}
//             />
//           </div>
//         </div>
//         <div className="lg:hidden block mb-10">
//           <div className="sm:text-[46px] text-center text-[32px] font-karla text-[#001A5F]">
//             Send one or send
//             <span className="font-beauty text-6xl font-bold">thousands</span>
//           </div>
//         </div>

//         <div className="xl:w-[60%] lg:w-[60%] relative overflow-x-clip  w-full">
//           <img
//             className="lg:absolute relative xl:max-w-[975px] lg:max-w-[725px] mx-auto  "
//             src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
//           />
//         </div>
//       </div>
//       <div className="">
//         <div className="lg:flex hidden overflow-hidden pt-[221px] justify-end max-w 5/6">
//           <img
//             className="simplinoted-card-image"
//             src="https://simplynoted.com/cdn/shop/files/salesforce-letter-2.png?v=12785632709067599954"
//           />
//         </div>
//       </div>
//       <div className="w-full flex justify-center text-center">
//         <div className="banner-detail relative w-[90rem]">
//           <div className="absolute right-[-198px] top-[-36px]">
//             <img
//               className="lg:block hidden"
//               src="https://simplynoted.com/cdn/shop/files/deep-integration-pen.png?v=2271676627160902087"
//               alt="shopify"
//             />
//           </div>
//           <div className="absolute left-[-98px] top-[-91px]">
//             <img
//               className="lg:block hidden"
//               src="https://simplynoted.com/cdn/shop/files/deep-integration-stamps.png?v=1452620472871025556"
//               alt="shopify"
//             />
//           </div>
//           <div>
//             <img
//               className=""
//               src="https://hydrogen-simplynoted.vercel.app/build/_assets/shopify-white-logo-ALXBTYBF.png"
//               alt="shopify"
//             />
//           </div>
//           <div className="">
//             <div className="mb-[12px] text-[44px] mt-[21px] mb-[29px] font-bold text-[white]">
//               Integrate with Zapier
//             </div>
//             <div className="flex gap-[12px]">
//               <DynamicButton
//                 text="REQUEST SAMPLE"
//                 className="req-btn w-[247px] h-[54px]"
//                 onClickFunction={() =>
//                   (window.location.href =
//                     'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
//                 }
//               />
//               <DynamicButton
//                 text="SCHEDULE A DEMO"
//                 className="sch-btn text-[white] w-[247px] !h-[69px]"
//                 onClickFunction={() =>
//                   (window.location.href = 'https://meetings.hubspot.com/rick24')
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//  const Shopify_GRAPH_QL = `#graphql
//   query
//   {
//     page(id:"gid://shopify/Page/73131294825"){
//     title
//     seo{
//       title
//       description
//     }
//   }
// }`


import {useEffect, useState} from 'react';
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
import {defer} from '@remix-run/server-runtime';
import {seoPayload} from '~/lib/seo.server';
import CanvasOne from '../../assets/Video/canvas-first.gif';
import CanvasTow from '../../assets/Video/canvas-sec.gif';


export async function loader({request, context}) {
  const {page} = await context.storefront.query(Zapier_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
  ``;
}
export default function Zapier() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="w-full">
      <div className="xl:flex mt-10 items-center  justify-center">
        <div className="xl:ml-[6rem] ml-0">
          <div className="md:flex flex xl:justify-normal justify-center">
            <img src={shopifys} />
          </div>
          <div className="mt-5 flex xl:justify-normal justify-center">
            <h2 className="md:text-[48px] sm:text-[35px] text-[29px]  text-[#001a5f] font-normal">
              Shopify Integration
            </h2>
          </div>
          <div className="flex xl:justify-normal hidden xl:block justify-center">
            <p className="w-3/4 text-[black] mt-[25px] xl:text-left max-w-[1196px] text-gray-700 font-normal text-center  leading-7 mt-5 text-[19px]">
            Delight your customers with automated real handwritten notes from your Shopify store. A personalized handwritten note makes the customer experience so much more memorable, and is a great way to build lasting relationships and increase lifetime value of your customers.
            </p>
          </div>
          <div className="mt-5 flex xl:justify-normal hidden xl:block justify-center xl:order-first">
            <div className="INTEGRATE flex justify-center">
              <button
                onclick="window.location.href = 'https://zapier.com/apps/simply-noted/integrations'"
                className="mt-1 order-first text-lg font-bold text-white py-2 px-4 order-1	rounded"
              >
                INTEGRATE NOW
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex xl:justify-normal xl:mt-[0px] mt-[34px] justify-center mt-5">
            <img
              className="w-full"
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/Group_854.png?v=1611976470"
            />
          </div>
          <div className="flex xl:justify-normal block xl:hidden justify-center max-w-[1196px]">
            <p className="w-3/4 text-[black] mt-[25px] xl:text-left text-center  text-gray-700 font-normal leading-7 mt-5 text-[19px]">
            Delight your customers with automated real handwritten notes from your Shopify store. A personalized handwritten note makes the customer experience so much more memorable, and is a great way to build lasting relationships and increase lifetime value of your customers.
            </p>
          </div>
          <div className="mt-5 flex xl:justify-normal justify-center block xl:hidden xl:order-first">
            <div className="INTEGRATE flex justify-center">
              <button
                onclick="window.location.href = 'https://zapier.com/apps/simply-noted/integrations'"
                className="mt-1 order-first text-lg font-bold text-white py-2 px-4 order-1	rounded"
              >
                INTEGRATE NOW
              </button>
            </div>
          </div>
  
        </div>
      </div>
      <div className="shopify-tag flex justify-center mx-3 max-w 5/6 sm:mt-[130px] mt-[50px]">
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
      <div className="w-full hidden xl:block relative h-[459px]">
        <div className="flex">
          <div className="absolute left-[-302px] top-[3px]">
            <img
              className="max-w-[500px] left-[-22w]"
              src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"
            />
            <div className="absolute   right-[-285px] top-[192px]">
              <p className="text-center w-[311px] text-[18px]">
                Send pen written notes automatically from your favorite CRM
              </p>
            </div>
            <div className="absolute right-[-120px] top-[241px]">
              <img src="  https://simplynoted.com/cdn/shop/files/zapier-arrow.png?v=17017241910886262831" />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:flex mt-10 items-center relative  justify-center">
           <div className="absolute hidden xl:block top-[390px] right-[362px] z-[-12]">
          <img className="w-[1084px]" src={CanvasOne} alt="Computer man" />
        </div> 
        <div className="xl:ml-[6rem] ml-0">
          <div className="mt-5 flex xl:justify-normal xl:w-[655px] w-[100%] leading-[48px] font-bold justify-center">
          <h2 className="md:text-[48px] xl:text-left text-center sm:text-[35px] text-[29px]  text-[#001a5f] font-normal">
              Send one or send 
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </h2>
          </div>
          <div className="flex xl:justify-normal hidden xl:block justify-center max-w-[1196px]">
            <p className="max-w-[76%] text-[black] mt-[25px] xl:text-left text-center text-gray-700 font-normal leading-7 mt-5 text-[19px]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
          </div>
          <div className="mt-5 flex xl:justify-normal hidden xl:block justify-center xl:order-first">
            <div className="xl:flex grid">
              <DynamicButton
                text="START WRITING"
                className="btn1 text-sm py-[20px] px-[30px]"
                onClickFunction={() => navigate('/collections/best-sellers')}
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[18px] xl:mt-[0px] mt-[12px] px-[45px] ml-[15px]"
                onClickFunction={() => navigate('/blogs/news')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex xl:justify-normal justify-center mt-5">
            <img
              className="w-full"
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
            />
          </div>
          <div className="flex xl:justify-normal block xl:hidden  justify-center">
            <p className="max-w-[100%] text-[black] mt-[25px] xl:text-left text-center text-gray-700 font-normal  leading-7 mt-5 text-[19px]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

            </p>
          </div>
          <div className="mt-5 flex xl:justify-normal block xl:hidden justify-center xl:order-first">
            <div className="xl:flex grid">
              <DynamicButton
                text="START WRITING"
                className="btn1 text-sm py-[20px] px-[30px]"
                onClickFunction={() => navigate('/collections/best-sellers')}
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[18px] xl:mt-[0px] mt-[12px] px-[45px] ml-[15px]"
                onClickFunction={() => navigate('/blogs/news')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden xl:block w-full relative h-[577px]">
        <div className="absolute right-[-67px] top-[77px]">
          <img
            className="max-w-[650px]"
            src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"
          />
        </div>
      </div>
      <div className="xl:flex mt-20 items-center relative  justify-center">
      <div className="absolute top-[399px] hidden xl:block z-[-12] right-[298px]">
          <img className="w-[1135px]" src={CanvasTow} alt="Computer man" />
        </div>
        <div className="order-2 xl:mr-[56px] mr-[0px]">
          <div className="mt-5 flex xl:justify-normal justify-center">
            <h2 className="md:text-[48px] xl:text-left text-center sm:text-[35px] text-[29px]  text-[#001a5f] font-normal">
              Send one or send 
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </h2>
          </div>
          <div className="flex xl:justify-normal justify-center">
            <p className="w-3/4 text-[black] mt-[25px] xl:text-left text-center text-gray-700 font-normal hidden xl:block  leading-7 mt-5 text-[19px]">
              Simply Noted integrates with your software and will do bulk sends
              in just a few minutes of your time.
            </p>
          </div>
          <div className="mt-5 flex xl:justify-normal hidden xl:block justify-center xl:order-first">
            <div className="xl:flex grid">
              <DynamicButton
                text="START WRITING"
                className="btn1 text-sm py-[20px] px-[30px]"
                onClickFunction={() => navigate('/collections/best-sellers')}
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[18px] xl:mt-[0px] mt-[12px] px-[45px] ml-[15px]"
                onClickFunction={() => navigate('/blogs/news')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex xl:justify-normal justify-center mt-5">
            <img
              className="w-[98%]"
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
            />
          </div>
          <div className="flex xl:justify-normal block xl:hidden justify-center">
            <p className="w-3/4 text-[black] mt-[25px] xl:text-left text-center text-gray-700 font-normal  leading-7 mt-5 text-[19px]">
              Simply Noted integrates with your software and will do bulk sends
              in just a few minutes of your time.
            </p>
          </div>
          <div className="mt-5 flex xl:justify-normal block xl:hidden justify-center xl:order-first">
            <div className="xl:flex grid">
              <DynamicButton
                text="START WRITING"
                className="btn1 text-sm py-[20px] px-[30px]"
                onClickFunction={() => navigate('/collections/best-sellers')}
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[18px] xl:mt-[0px] mt-[12px] px-[45px] ml-[15px]"
                onClickFunction={() => navigate('/blogs/news')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden xl:block w-full relative h-[577px]">
        <div className="absolute right-[-67px] top-[77px]">
          <img
            className="max-w-[650px]"
            src="https://simplynoted.com/cdn/shop/files/salesforce-letter-2.png?v=12785632709067599954"
          />
        </div>
      </div>
        <div className='w-full flex p-[37px] xl:mt-[173px] mt-[0px] relative justify-center'>
          <div className='banner-detail  w-[1200px]'>
          <div className="absolute right-[-198px] top-[-36px]">
            <img
              className="xl:block hidden"
              src="https://simplynoted.com/cdn/shop/files/deep-integration-pen.png?v=2271676627160902087"
              alt="shopify"
            />
          </div>
          <div className="absolute left-[-98px] top-[-91px]">
            <img
              className="xl:block hidden"
              src="https://simplynoted.com/cdn/shop/files/deep-integration-stamps.png?v=1452620472871025556"
              alt="shopify"
            />
          </div>
          <div>
            <img
              className=""
              src='https://cdn.shopify.com/s/files/1/0275/6457/2777/files/1024px-Shopify_logo_2018.svg_564a8f8d-db80-41ef-b750-3fddbe29354c.png?v=1612111934'
              alt="shopify"
            />
          </div>
          <div className="">
            <div className="mb-[12px] xl:text-[44px] text-[38px] leading-[41px] mt-[21px] mb-[29px] font-bold text-[white]">
              Integrate with Zapier
            </div>
            <div className="xl:flex grid justify-center  gap-[12px]">
              <DynamicButton
                text="REQUEST SAMPLE"
                className="req-btn w-[247px] h-[54px]"
                onClickFunction={() =>
                  (window.location.href =
                    'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
                }
              />
              <DynamicButton
                text="SCHEDULE A DEMO"
                className="sch-btn text-[white] w-[247px] !h-[69px]"
                onClickFunction={() =>
                  (window.location.href = 'https://meetings.hubspot.com/rick24')
                }
              />
            </div>
          </div>
            
          </div>
      </div>
    </div>
  );
}
const Zapier_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/73125298281"){
    title
    seo{
      title
      description
    }
  }
}`;
