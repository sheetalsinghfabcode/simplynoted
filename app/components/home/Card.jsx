import react, {useState} from 'react';
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
import pen from '../../../assets/Image/pen-img.webp';
import swiper_arrow_left from '../../../assets/Image/swiper-arrow-left.png';
import swiper_arrow_right from '../../../assets/Image/swiper-arrow-right.png';

const Card = () => {
  const [emailForSubs, setEmailForSubs] = useState('');
  const [loader, setLoader] = useState(false);
  const [isEmailSubscribed, setisEmailSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [successfullMessage, setSuccessFullMessage] = useState('');

  const validateEmail = (email) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function onClickForSubs() {
    if (!validateEmail(emailForSubs)) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      setError('');
      setLoader(true);
      const formData = new FormData();
      formData.append('email', emailForSubs);

      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/users/newsletter-subscription`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();

      if (res.ok) {
        setSuccessFullMessage(data.result);
        setisEmailSubscribed(true);
        setTimeout(() => {
          setSuccessFullMessage(null);
          setisEmailSubscribed(false);
          
        }, 2000);
      }
    } catch (error) {
      setError('Subscription failed. Please try again.');
      console.log(error, 'error for subscription');
    } finally {
      setLoader(false);
    }
  }

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
            {stockData.map((data, index) => {
              return (
                <SwiperSlide key={data.img}>
                  <div className="data_card shadow-inset-custom text-center mt-5 sm:w-[88%] w-full mx-auto ">
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

        <div className="ml-[-13rem] relative  mt-[1rem] sm:mt-[-70px] cards-swiper-slider">
          <Swiper
            direction={'horizontal'}
            allowTouchMove={false}
            spaceBetween={5}
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
              <img className="w-full " src={Card1} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="lg:w-[88%] w-full  "
                src={Card2}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full " src={Card3} alt="LogoSimplinotedpic" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-[90%] lg:mt-[-1rem] "
                src={Card2}
                alt="LogoSimplinotedpic"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="bg-white text-center mt-[-11rem] mb-[-12px] ">
          <div className="md:w-[50%]   w-[90%] flex flex-wrap justify-center  mx-auto  pt-60">
            <img className="max-w-full" src={pen} alt="LogoSimplinotedpic" />
          </div>
          
          <div className="flex flex-col flex-wrap md:gap-2 gap-7 pt-[20px] pb-[20px] md:pt-0 md:pb-0 md:h-[120px] md:flex-row md:justify-around items-center bg-[#1b3064]">
            <div className="text-white flex flex-col flex-1">
              <div className="md:text-4xl sm:text-3xl text-xl font-bold">
                Get your first card FREE!
              </div>
              <div className="sm:text-[16px] text-[13px]">
                Join our email list and receive your first card free.
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex  justify-center mb-2 items-center text-center  w-full">
                <input
                  type="email"
                  className="input_email"
                  placeholder="Enter your email address"
                  onChange={(e) => {
                    setSuccessFullMessage('');
                    setError('');
                    setEmailForSubs(e.target.value);
                    setisEmailSubscribed(false);
                  }}
                />

                <button
                  disabled={emailForSubs?.length === 0 || isEmailSubscribed}
                  className="subscribe"
                  onClick={() => onClickForSubs()}
                >
                  {loader ? (
                    <div className="flex gap-[4px] items-center">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2 animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg>
                      <span className="whitespace-nowrap">Subscribing</span>
                    </div>
                  ) : isEmailSubscribed ? (
                    'SUBSCRIBED'
                  ) : (
                    'SUBSCRIBE'
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className='w-[100%]  bg-[#1b3064]'>
            <div className='flex  w-[80%] justify-end'>
              {error && <p className="text-red-500 whitespace-nowrap md:mt-[-29px] sm:mr-[74px] mt-[-19px] md:mr-[-15px] mr-[25px] ">{error}</p>}
              {successfullMessage && (
                <p className="text-red-500 whitespace-nowrap  md:mt-[-29px] sm:mr-[74px] mt-[-19px] md:mr-[-15px] mr-[25px] ">{successfullMessage}</p>
              )}
            </div>
              </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="bottom_background mt-3 relative  overflow-x-hidden">
          <div className="md:flex grid  justify-evenly items-center md:p-[70px] pb-4 pt-14 md:gap-0 gap-[20px]">
            <h3 className="tab:text-[33px]  text-[24px] font-bold ">
              Ready to start writing?
            </h3>

            <div className=" flex flex-col md:flex-row text-white  md:gap-[20px] items-center">
              <DynamicButton
                text="REQUEST A SAMPLE"
                className="req-btn  py-[15px] tab:px-[32px] px-[20px]"
                onClickFunction={() =>
                  (window.location.href =
                    'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
                }
              />
              <DynamicButton
                text="SCHEDULE A DEMO"
                className="sch-btn py-[18px] tab:px-[35px] px-[34px]"
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
