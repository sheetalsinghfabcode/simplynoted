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
            <div className="">
        <Swiper
      modules={[Navigation,Pagination]}
      direction={'horizontal'}
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

    <div class="swiper-button-prev absolute mt-[-16rem] ml-[9rem]"><img src={prev} className="w-[25px]" alt="" /></div>
<div class="swiper-button-next  absolute mt-[-16rem] ml-[73rem] "><img src={next} className="w-[25px]" alt="" /></div>
</div>     
 

    <div className="flex mx-[-10rem] mt-1">
      <div className=" w-[450px]  px-5 ml-[-8.5rem]"><img className='w-full' src={Card1} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[400px] mx-8 relative" ><img className='w-full mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[450px] mx-8"><img className='w-full' src={Card3} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[390px]  "><img className='w-full ml-4 mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </div>
      </div>
   

   <div className="bg-white text-center mt-[-11rem] mb-[-12px]">
   <div className="w-[43rem] ml-[22rem] pt-60">
    <img className='w-full' src={pen} alt="LogoSimplinotedpic"  /> 
    </div>
    <div className="text-4xl font-bold text-[#001A5F]">Get your first card FREE!</div>
    <div className="text-xl pt-4 text-[#696969]">Join our email list and receive your first card free.</div>

    <div className="pt-10 pb-10">
        <form>
            <div>
            <input type="email" className="input_email" placeholder="Enter your email address" />
            <span> <DynamicButton
                    text="SUBSCRIBE"
                    className="subscribe"
                    onClickFunction={()=>Navigate('/blogs/news')}
            /></span>
            </div>
        </form>
    </div>
   </div>
        </div>
        </>
    )
}

export default Card;