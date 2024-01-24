import react from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css';
import {stockData} from './swiper-data';

import Card1 from '../../../assets/Image/Card1.webp';
import Card2 from '../../../assets/Image/Card2.webp';
import Card3 from '../../../assets/Image/Card3.webp';
import next from '../../../assets/Image/next.png';
import prev from '../../../assets/Image/pre.png';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import pen from '../../../assets/Image/pen-img.webp';
import swiper_arrow_left from '../../../assets/Image/swiper-arrow-left.png';
import swiper_arrow_right from '../../../assets/Image/swiper-arrow-right.png';
const Card = () => {
  const Navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex md:flex-row flex-col sm:w-[76%] w-[80%] mx-auto">
          <div className="swiper-button-prev relative my-auto md:block hidden">
            <img src={prev} className="w-[25px] cursor-pointer" alt="" />
          </div>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            allowTouchMove={false}
            direction={'horizontal'}
            breakpoints={{
              1024: {
                slidesPerView: 1,
                allowTouchMove: false,
              },
              768: {
                spaceBetween: 10,
                slidesPerView: 1,
                allowTouchMove: false,
              },
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={{
              //navigation(arrows)
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {stockData.map((data, key) => {
              return (
                <div key={key}>
                  <SwiperSlide>
                    <div className="data_card bg-white  text-center mt-5 sm:w-[88%] w-full mx-auto ">
                      <div className="m-auto w-full pt-5 md:pt-20">
                        <img
                          src={data.img}
                          alt=""
                          className="w-[100px] mt-1 text-center inline "
                        ></img>
                      </div>
                      <div className="pt-5 pb-5  md:text-center text-justify text-sm md:px-24 sm:px-16 px-[35px] text-[#696969] tracking-normal">
                        {data.description}
                      </div>
                      <div className="text-black pb-32 font-bold">
                        {data.Name}
                        <br />
                        {data.Department}
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
          </Swiper>

          <div className="swiper-button-next relative my-auto md:block hidden">
            <img src={next} className="w-[25px] cursor-pointer" alt="" />
          </div>

          {/* mobile */}
          <div className="md:hidden flex w-[50%] mx-auto justify-between  mb-[4rem] sm:mt-[-65px] mt-[-95px] relative">
            <div className="swiper-button-prev  ">
              <img
                src={swiper_arrow_left}
                className="w-[20px] pr-[4px] cursor-pointer"
                alt=""
              />
            </div>
            <div className="swiper-button-next ">
              <img
                src={swiper_arrow_right}
                className="w-[20px] pl-[4px] cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="ml-[-20rem]">
          <Swiper
            direction={'horizontal'}
            spaceBetween={10}
            slidesPerView={3.5}
            breakpoints={{
              580: {
                spaceBetween: 20,
                slidesPerView: 3.5,
              },
              768: {
                spaceBetween: 10,
                slidesPerView: 4,
              },
              998: {
                spaceBetween: 10,
                slidesPerView: 4,
              },
              1024: {
                spaceBetween: 10,
                slidesPerView: 4,
              },
              1280: {
                spaceBetween: 10,
                slidesPerView: 3.5,
              },
            }}
          >
            <SwiperSlide>
              <img className="w-full" src={Card1} alt="LogoSimplinotedpic" />{' '}
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="lg:w-[30%] w-full lg:absolute lg:mt-[-3rem]"
                src={Card2}
                alt="LogoSimplinotedpic"
              />{' '}
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full" src={Card3} alt="LogoSimplinotedpic" />{' '}
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[90%] lg:mt-[-1rem]"
                src={Card2}
                alt="LogoSimplinotedpic"
              />{' '}
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="bg-white text-center mt-[-11rem] mb-[-12px] ">
          <div className="md:w-[50%] sm:w-[100%]  w=[90%] flex flex-wrap overflow-hidden mx-auto  pt-60">
            <img className="w-full" src={pen} alt="LogoSimplinotedpic" />
          </div>
          <div className="md:text-4xl text-3xlfont-bold text-[#001A5F]">
            Get your first card FREE!
          </div>
          <div className="sm:text-xl text-[16px] pt-4 text-[#696969]">
            Join our email list and receive your first card free.
          </div>

          <div className="pt-10 pb-10 text-center">
            <form>
              <div className="flex justify-center">
                <input
                  type="email"
                  className="input_email"
                  placeholder="Enter your email address"
                />
                <DynamicButton
                  text="SUBSCRIBE"
                  className="subscribe"
                  onClickFunction={() => Navigate('/blogs/news')}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="bottom_background mt-3 relative  overflow-x-hidden">
          <div className="pt-10 md:flex grid  justify-center">
            <h3 className="lg:text-4xl md:text-2xl  text-[26px] font-bold md:my-20 md:mx-[2rem] ml-[4rem] mt-5">
              Ready to start writing?
            </h3>

            <div className=" flex flex-col md:flex-row text-white md:my-[4rem]  md:mx-[2rem] mr-10 ml-auto mt-10">
              <DynamicButton
                text="REQUEST SAMPLE"
                className="req-btn"
                onClickFunction={() =>
                  (window.location.href =
                    'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
                }
              />
              <DynamicButton
                text="SCHEDULE A DEMO"
                className="sch-btn"
                onClickFunction={() =>
                  (window.location.href = 'https://meetings.hubspot.com/rick24')
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
