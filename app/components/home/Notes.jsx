import react from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
import Note1 from '../../../assets/Image/Note1.jpg';
import Note2 from '../../../assets/Image/Note2.jpg';
import Note3 from '../../../assets/Image/Note3.jpg';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import 'swiper/css';
// import Slider from '@ant-design/react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows:false
//   };

const Notes = () => {
    
  return (
    <>
      <div className="container-indent bg-[#324879] flex items-center justify-center">
        <div className="container">
          <div className="block-title text-xl font-bold md:text-3xl">
            <h1 className="tt-title  text-center pt-20 text-white">
              Real Pen.Real Ink.
            </h1>
            <div className="tt-description text-center pt-1 text-white">
              Real Impressions.
            </div>
          </div>
          </div>
         
          </div>
          <div className='mt-6 ml-[-20rem]'>
          <Swiper
            modules={[Autoplay]}
            direction={'horizontal'}
            spaceBetween={1}
            slidesPerView={4}
           
          loop={true}
          breakpoints={{
         
            768: {
              spaceBetween:10,
              slidesPerView:2.5,
             
            },
            1024:{
              spaceBetween:10,
              slidesPerView:3.5,
            }
          }}
     
      autoplay={{ delay:1000 ,
        pauseOnMouseEnter: true, 
         disableOnInteraction: false,
        }}

    >
       
      <SwiperSlide><img className='w-[90%]' src={Note1} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note2} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note3} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note2} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note1} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note2} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note3} alt="LogoSimplinotedpic"  /> </SwiperSlide>
      <SwiperSlide><img className='w-[90%]' src={Note2} alt="LogoSimplinotedpic"  /> </SwiperSlide>
    </Swiper>

          </div>
         
    </>
  );
};

export default Notes;
