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
      <div className="sm:my-8 my-2">
        <h2 className="sm:text-[32px] text-2xl font-bold text-[#001A5F] text-center sm:mt-20 mt-10 md:mb-16 mb-5">
          Companies we've worked with
        </h2>
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
              <img className="w-[85%] sm:scale-[0.8]" src={Fairway} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[72%] sm:scale-[0.8]"
                src={Mariott}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide> 
              <img className="w-[80%] sm:scale-[0.8]" src={Ncca} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[78%] sm:scale-[0.8]"
                src={Ford}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%] sm:scale-[0.8]" src={Edward} alt="LogoSimplinotedpic" />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-[75%] sm:scale-[0.8]"
                src={Ronald}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[65%] sm:scale-[0.8]" src={kw} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[90%] sm:scale-[0.8]"
                src={tesla}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-[72%] sm:scale-[0.8]"
                src={Mariott}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%] sm:scale-[0.8]" src={Ncca} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[78%]  sm:scale-[0.8]"
                src={Ford}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-[80%] sm:scale-[0.8]" src={Edward} alt="LogoSimplinotedpic" />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-[75%] sm:scale-[0.8]"
                src={Ronald}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[90%] sm:scale-[0.8]"
                src={tesla}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="md:hidden w-[84%] ml-auto block text-center">
          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={Fairway}
              alt="LogoSimplinotedpic"
            />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={Mariott}
              alt="LogoSimplinotedpic"
            />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={Ncca}
              alt="LogoSimplinotedpic"
            />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={Ford}
              alt="LogoSimplinotedpic"
            />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={Edward}
              alt="LogoSimplinotedpic"
            />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={Ronald}
              alt="LogoSimplinotedpic"
            />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img className="w-[60%] h-auto" src={kw} alt="LogoSimplinotedpic" />
          </span>

          <span className="inline-block  w-[49%] mb-[20px]">
            <img
              className="w-[60%] h-auto"
              src={tesla}
              alt="LogoSimplinotedpic"
            />
          </span>
        </div>
      </div>
    </>
  );
};
export default Swipers;
