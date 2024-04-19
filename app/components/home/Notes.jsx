import react from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
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
    <div className="md:mt-[-8.5rem] mt-[-2.5rem] ml-[-20rem] home_swiper">
      <Swiper
        modules={[Autoplay]}
        direction={'horizontal'}
        spaceBetween={1}
        slidesPerView={4}
        loop={true}
        breakpoints={{
          320: {
            spaceBetween: 1,
            slidesPerView: 2.5,
          },
         
          768: {
            spaceBetween: 3,
            slidesPerView: 2.5,
          },
          1024: {
            spaceBetween: 10,
            slidesPerView: 3.5,
          },
        }}
        speed={5000}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img className="w-[90%]" src={Note1} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note2} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note3} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note2} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note1} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note2} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note3} alt="LogoSimplinotedpic" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-[90%]" src={Note2} alt="LogoSimplinotedpic" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Notes;
