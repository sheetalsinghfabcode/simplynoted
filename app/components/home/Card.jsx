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
                  <div className="bg-white  mx-56 text-center mt-5">
        <div className="pl-[25rem] pt-20 ">
            <img src={data.img} alt="" className="w-[100px] mt-1"></img>
        </div>
        <div className="pt-5 pb-5  text-center text-sm px-24 text-[#696969] tracking-normal">
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

    <div class="swiper-button-prev cursor-pointer absolute mt-[-16rem] ml-[9rem]"><img src={prev} className="w-[25px]" alt="" /></div>
<div class="swiper-button-next cursor-pointer absolute mt-[-16rem] ml-[73rem] "><img src={next} className="w-[25px]" alt="" /></div>
     
 

    <div className="flex mx-[-10rem] mt-1">
      <div className=" w-[450px]  px-5 ml-[-8.5rem]"><img className='w-full' src={Card1} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[400px] mx-8 relative" ><img className='w-full mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[450px] mx-8"><img className='w-full' src={Card3} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[390px]  "><img className='w-full ml-4 mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </div>
      </div>
   

   <div className="bg-white text-center mt-[-11rem] mb-[-12px]">
   <div className="md:w-[43rem] w-[100%] md:ml-[22rem] pt-60">
    <img className='w-full' src={pen} alt="LogoSimplinotedpic"  /> 
    </div>
    <div className="md:text-4xl text-3xlfont-bold text-[#001A5F]">Get your first card FREE!</div>
    <div className="text-xl pt-4 text-[#696969]">Join our email list and receive your first card free.</div>

    <div className="pt-10 pb-10">
        <form>
            <div>
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

        <div className="bottom_background mt-3 md:w-[107%] sm:(w-[100%] h-[100%])">
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