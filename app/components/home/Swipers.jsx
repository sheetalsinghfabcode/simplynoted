import react from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Fairway from '../../../assets/Image/Fairway.png';
import Mariott from '../../../assets/Image/Marriott.png';
import Ncca from '../../../assets/Image/Ncca.png';
import Ford from '../../../assets/Image/Ford.png';
import Edward from '../../../assets/Image/Edward.png';
import Ronald from '../../../assets/Image/Ronald.png';
import kw from '../../../assets/Image/Kw.png';
import tesla from '../../../assets/Image/Tesla.png';

import {Autoplay} from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import 'swiper/css';

const Swipers = () => {
  return (
    <>
      <div className="my-8">
        <div className="md:text-3xl text-xl font-bold text-[#001A5F] text-center mt-20 mb-16">
          Companies we've worked with
        </div>
        <div className="ml-5 mr-10">
          <Swiper
            modules={[Autoplay]}
            direction={'horizontal'}
            spaceBetween={20}
            slidesPerView={7}
            loop={true}
            breakpoints={{
              280: {
                slidesPerView: 3,
              },
              768: {
                spaceBetween: 10,
                slidesPerView: 4,
              },
              1024: {
                spaceBetween: 10,
                slidesPerView: 4,
              },
              1075: {
                slidesPerView: 6,
              },
              1280: {
                slidesPerView: 7,
              },
            }}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            className="swiper-company md:block hidden"
          >
            <SwiperSlide>
              <img className="w-[85%]" src={Fairway} alt="LogoSimplinotedpic" />{' '}
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[72%] mt-[-2px]"
                src={Mariott}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%]" src={Ncca} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[78%] mt-[-2px]"
                src={Ford}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%]" src={Edward} alt="LogoSimplinotedpic" />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-[75%] mt-[-6px] "
                src={Ronald}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[65%]" src={kw} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[90%]  mt-[-13px]"
                src={tesla}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-[72%] mt-[-2px]"
                src={Mariott}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%]" src={Ncca} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[78%] mt-[-2px]"
                src={Ford}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%]" src={Edward} alt="LogoSimplinotedpic" />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-[75%] mt-[-6px] "
                src={Ronald}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[90%]  mt-[-13px]"
                src={tesla}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* <div className='columns-2'>
      
              <img className="w-full" src={Fairway} alt="LogoSimplinotedpic" />{' '}
            
              <img
                className="w-full"
                src={Mariott}
                alt="LogoSimplinotedpic"
              />
           
              <img className="w-full" src={Ncca} alt="LogoSimplinotedpic" />
            
              <img
                className="w-full"
                src={Ford}
                alt="LogoSimplinotedpic"
              />
           
              <img className="w-full" src={Edward} alt="LogoSimplinotedpic" />
        
              <img
                className="w-full"
                src={Ronald}
                alt="LogoSimplinotedpic"
              />
            
              <img className="w-full" src={kw} alt="LogoSimplinotedpic" />
           
              <img
                className="w-full  mt-[-13px]"
                src={tesla}
                alt="LogoSimplinotedpic"
              />
            

        </div> */}
      </div>
    </>
  );
};
export default Swipers;
