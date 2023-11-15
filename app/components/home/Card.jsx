import react from"react";
import { Swiper,SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css';
import { stockData } from "./swiper-data";

import Card1 from"../../../assets/Image/Card1.webp";
import Card2 from"../../../assets/Image/Card2.webp";
import Card3 from"../../../assets/Image/Card3.webp";
 import next from'../../../assets/Image/next.png';
 import prev from'../../../assets/Image/pre.png';
import DynamicButton from "../DynamicButton";
import { useNavigate } from "@remix-run/react";
import pen from'../../../assets/Image/pen-img.webp';
const Card=()=>{
  const Navigate=useNavigate();

    return(
        <>
        <div>
           
        <Swiper
      modules={[Navigation,Pagination]}
      direction={'horizontal'}
      breakpoints={{
        1024:{
           slidesPerView:1
        },
       768: {
         spaceBetween:10,
         slidesPerView:1,
        
       }
     }}
      spaceBetween={30}
      slidesPerView={1}
     
    loop={true}
    navigation={  {                     //navigation(arrows)
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
     } }
         
     
    >

            {stockData.map((data, key) => {
          return (
            <div key={key}>
                   
                        
                  <SwiperSlide>
                  <div className="data_card bg-white md:mx-56 sm:mx-[133px]  text-center mt-5">
        <div className="m-auto w-full pt-5 md:pt-20">
            <img src={data.img} alt="" className="w-[100px] mt-1 text-center inline"></img>
        </div>
        <div className="pt-5 pb-5  text-center text-sm md:px-24 px-16 text-[#696969] tracking-normal">
   {data.description}
                </div>
                <div className="text-black pb-32 font-bold">
                    {data.Name}
                    <br/>
                    {data.Department}

                    </div>
                    </div>
                    </SwiperSlide>
    
            </div>
          );
        })}
      
    </Swiper>
<div className="md:mb-0 mb-20">
    <div class="swiper-button-prev cursor-pointer absolute md:mt-[-16rem] sm:mt-[-3rem] md:ml-[9rem]  sm:ml-[17rem]  "><img src={prev} className="w-[25px]" alt="" /></div>
<div class="swiper-button-next cursor-pointer absolute md:mt-[-16rem]   sm:mt-[-3rem]  xl:ml-[73rem] lg:ml-[55rem] md:ml-[50rem]"><img src={next} className="w-[25px]" alt="" /></div>
</div>   


      <div className="ml-[-20rem]">
       <Swiper

            direction={'horizontal'}
            spaceBetween={10}
            slidesPerView={3.5}
           
         
          breakpoints={{
         580:{
          spaceBetween:20,
              slidesPerView:3.5,
         },
            768: {
              spaceBetween:10,
              slidesPerView:4,
             
            },
            998:{
              spaceBetween:10,
              slidesPerView:4,
            },
            1024:{
              spaceBetween:10,
              slidesPerView:4,
            },
            1280:{
              spaceBetween:10,
              slidesPerView:3.5,
            }
          }}
     
     

    >
       
      <SwiperSlide><img className='w-full' src={Card1} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='lg:w-[30%] w-full lg:absolute lg:mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-full' src={Card3} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%] lg:mt-[-1rem]' src={Card2} alt="LogoSimplinotedpic"  /> </SwiperSlide>
     
    </Swiper>
    </div>

   <div className="bg-white text-center mt-[-11rem] mb-[-12px] ">
   <div className="xl:w-[43rem] md:w-[40rem] w-[100%] xl:ml-[22rem] md:ml-[17rem] pt-60">
    <img className='w-full' src={pen} alt="LogoSimplinotedpic"  /> 
    </div>
    <div className="md:text-4xl text-3xlfont-bold text-[#001A5F]">Get your first card FREE!</div>
    <div className="text-xl pt-4 text-[#696969]">Join our email list and receive your first card free.</div>

    <div className="pt-10 pb-10 text-center">
        <form>
            <div className="flex justify-center">
            <input type="email" className="input_email" placeholder="Enter your email address" />
            <DynamicButton
                    text="SUBSCRIBE"
                    className="subscribe"
                    onClickFunction={()=>Navigate('/blogs/news')}
            />
            </div>
        </form>
    </div>
   </div>
        </div>

        <div className="bottom_background mt-3 xl:w-[107%] md:w-[104%] sm:(w-[100%] h-[100%])">
            <div className="pt-10 md:flex   justify-center">
                <h3 className="md:text-4xl text-[26px] font-bold md:m-20 ml-28 mt-5">Ready to start writing?</h3>
           
            <div className=" flex flex-col md:flex-row text-white md:m-20 mx-10 mt-10">
            <DynamicButton
                    text="REQUEST SAMPLE"
                    className="btn1"
                     onClickFunction={()=>window.location.href=("https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb")}
                
            />
            <DynamicButton
                    text="SCHEDULE A DEMO"
                    className="btn3"
                     onClickFunction={()=>window.location.href=("https://meetings.hubspot.com/rick24")}
                
            />
              
            </div>
</div>
        </div>
        </>
    )
}

export default Card;