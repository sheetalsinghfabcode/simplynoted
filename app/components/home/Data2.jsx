import react from"react";
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Fairway from '../../../assets/Image/Fairway.png';
import Mariott from '../../../assets/Image/Marriott.png';
import Ncca from '../../../assets/Image/Ncca.png';
import Ford from '../../../assets/Image/Ford.png';
import Edward from '../../../assets/Image/Edward.png';
import Ronald from '../../../assets/Image/Ronald.png';
import kw from '../../../assets/Image/Kw.png';
import tesla from'../../../assets/Image/Tesla.png';

import {  Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import 'swiper/css';

// &copy;Simply Noted  {new Date().getFullYear()}.All Rights Reserved
const Data2=()=>{
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        centerMode: true,
        speed:1000,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1
      };
return(
    <>
<div className="text-3xl font-bold text-[#001A5F] text-center mt-40 mb-20">Companies we've worked with</div>
    <Swiper
      modules={[Autoplay]}
      direction={'horizontal'}
      spaceBetween={20}
      slidesPerView={7}
      loop={true}
    
      autoplay={{ delay:3000 ,
        pauseOnMouseEnter: true, 
         disableOnInteraction: false,
        }}
  className="swiper-company"
    >
       
      <SwiperSlide ><img className='w-full' src={Fairway} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide className=" relative top-[-10px] ml-5"><img className='w-[64%] h-[66%]' src={Mariott} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide><img className='w-[84%]' src={Ncca} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className="relative top-[-10px]"><img className='w-[90%]' src={Ford} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide ><img className='w-[80%]' src={Edward} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className=" relative top-[-27px]"><img className='w-[90%]' src={Ronald} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className=" relative top-[-10px]"><img className='w-[70%]' src={kw} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className=" relative top-[-15px] ml-[-20px]"><img className='w-full' src={tesla} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide><img className='w-full' src={Fairway} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide className=" relative top-[-10px] ml-5"><img className='w-[64%] h-[66%]' src={Mariott} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide><img className='w-[84%]' src={Ncca} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className="relative top-[-10px]"><img className='w-[90%]' src={Ford} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide ><img className='w-[80%]' src={Edward} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className=" relative top-[-27px]"><img className='w-[90%]' src={Ronald} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className=" relative top-[-10px]"><img className='w-[70%]' src={kw} alt="LogoSimplinotedpic"  /></SwiperSlide>
      <SwiperSlide className=" relative top-[-15px] ml-[-20px]"><img className='w-full' src={tesla} alt="LogoSimplinotedpic"  /></SwiperSlide>
    </Swiper>

    


   

    </>
)
}
export default Data2;