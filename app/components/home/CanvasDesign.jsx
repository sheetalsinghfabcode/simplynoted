import react, {useEffect} from 'react';
import First from '../../../assets/Video/First.mp4';
import Second from '../../../assets/Video/Second.mp4';
import Third from '../../../assets/Video/Third.mp4';
import robot1 from '../../../assets/Image/robot.webp';
import robot2 from '../../../assets/Image/robot2.webp';
import robot3 from '../../../assets/Image/robot3.webp';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import Arrow1 from '../../../assets/Image/FirstArrow.gif';
import Arrow2 from '../../../assets/Image/SecondArrow.gif';
import Arrow3 from '../../../assets/Image/ThirdArrow.gif';
import ShopifyPhoto from '../../../assets/Image/ShopifyPhoto.gif';
import Note1 from '../../../assets/Image/Note1.jpg';
import Note2 from '../../../assets/Image/Note2.jpg';
import Note3 from '../../../assets/Image/Note3.jpg';
import {Swiper, SwiperSlide} from 'swiper/react';
const CanvasDesign = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sm:py-[50px] py-[20px] ">
        {/* First */}
        <div className="global-max-width-handler global-section-divider relative md:flex flex-col lg:flex-row hidden justify-between flex-wrap tab:flex-nowrap mx-auto w-full  lg:gap-[10px] gap-[30px] ">
          <div className="lg:w-[40%] w-[80%] relative lg:mx-0 mx-auto ml-auto lg:my-[6rem] lg:order-none order-2 data-background text-left">
            <h4 className="text-4xl text-custom font-custom font-bold text-left  text-[#001A5F] ">
              Send one or send &nbsp;
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                thousands
              </span>
            </h4>
            <div className="texts mt-3 lg:text-left text-justify lg:w-[94%] w-full">
              Simply Noted platform makes sending 1,000s of real penwritten
              notes as quick and easy as sending just 1. It has never been
              easier to scale your personal touch and leave lasting impressions!
            </div>
            <DynamicButton
              text="START WRITING"
              className="btn1 text-sm py-[20px] px-[30px]"
              onClickFunction={() => navigate('/collections/best-sellers')}
            />
            <DynamicButton
              text="TUTORIALS"
              className="btn2 py-[18px] px-[40px] ml-[15px]"
              onClickFunction={() => navigate('/blogs/news')}
            />
          </div>
          <div className="flex-1">
            <div className="flex relative justify-end mt-[30px]">
              <div className="absolute  z-[1] w-[48%] top-[60px] left-[76px]">
                <img className="" src={robot1} alt="LogoSimplinotedpic" />
              </div>
              <video   
                className="z-[2] tab:max-w-[500px] tab:w-[58%] w-[450px] overflow-hidden"
                autoPlay
                loop
                playsInline
                muted
              >
                <source src={First} type="video/mp4"></source>
              </video>
            </div>
          </div>
          <img
            src={Arrow1}
            className="hidden lg:block absolute bottom-0 lg:h-[345px] lg:top-[226px] lg:left-[25rem] z-[-1]  xl:h-[474px] xl:left-[227px]"
          />
        </div>

        {/* mobile view */}
        <div className="md:hidden block  w-[85%] mx-auto text-center global-section-divider">
          <div className="  text-3xl font-bold text-[#001A5F] mb-5">
            Send one or send &nbsp;
            <span className="font-beauty text-6xl font-bold">thousands</span>
          </div>
          <div className="w-full">
            <video className="w-full" playsInline autoPlay loop muted>
              <source src={First} type="video/mp4"></source>
            </video>
          </div>
          <div className="text-justify mt-5  texts">
            Simply Noteds platform makes sending 1,000s of real penwritten notes
            as quick and easy as sending just 1. It has never been easier to
            scale your personal touch and leave lasting impressions!
          </div>
          
          <DynamicButton
            text="START WRITING"
            className="btn1 sm:w-auto w-full text-sm py-[20px] px-[40px] mr-5"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
          <DynamicButton
            text="TUTORIALS"
            className="btn2 sm:w-auto w-full mt-5 py-[18px] px-[40px]"
            onClickFunction={() => navigate('/blogs/news')}
          />
        
        </div>

        {/* Second */}
        <div className="global-max-width-handler global-section-divider md:flex hidden lg:justify-between xl:top-[3rem] lg:top-14 relative justify-center flex-wrap w-full  lg:gap-[50px] gap-[30px]">
          <div className="lg:w-[60%] w-[80%] mx-auto lg:mx-0 relative flex flex-wrap  lg:p-[10px] mt-[50px] lg:overflow-hidden overflow-visible  justify-start">
            <div className="text-right relative w-[67%]">
              <video
                className="max-w-[435px]  relative overflow-hidden z-[1]"
                autoPlay
                loop
                playsInline
                muted
              >
                <source src={Second} type="video/mp4"></source>
              </video>
              <img
                className="absolute top-0 left-[25rem]  w-[440px] "
                src={robot2}
                alt="LogoSimplinotedpic"
              />
            </div>
          </div>
          <div className="lg:w-[33%] w-[80%] lg:mx-0 lg:mt-[60px] text-left  data-background">
            <div className="text-4xl  font-bold text-left text-[#001A5F]">
              Unlimited card &nbsp;
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                options
              </span>
            </div>
            <div className="texts mt-3 lg:text-left text-justify lg:w-[98%] w-full">
              Use our cards, send us yours or design your own! Simply Noted
              offers a wide array of cards to choose from and a powerful custom
              create a card tool. Over 95% of our clients are businesses and use
              their own custom stationery.
            </div>
            <DynamicButton
              text="OUR CARDS"
              className="btn1 text-sm py-[20px] px-[30px]"
              onClickFunction={() => navigate('/collections/best-sellers')}
            />
          </div>
          <img
            src={Arrow2}
            className="hidden lg:block absolute bottom-0 lg:h-[345px] lg:top-[24rem] xl:top-[27rem] lg:left-[263px] z-[-1] xl:h-[434px] xl:left-[227px]"
          />
        </div>

        {/* mobile view */}
        <div className="md:hidden block  w-[85%] mx-auto text-center global-section-divider">
          <div className="  text-3xl font-bold text-[#001A5F] mb-5 ">
            Unlimited card &nbsp;
            <span className="font-beauty text-6xl font-bold">options</span>
          </div>
          <div className="w-full">
            <video className="w-full" playsInline autoPlay loop muted>
              <source src={First} type="video/mp4"></source>
            </video>
          </div>
          <div className="texts text-justify mt-5">
            Use our cards, send us yours or design your own! Simply Noted offers
            a wide array of cards to choose from and a powerful custom create a
            card tool. Over 95% of our clients are businesses and use their own
            custom stationery.
          </div>
          <DynamicButton
            text="OUR CARDS"
            className="btn1 text-sm py-[20px] px-[40px] sm:w-auto w-full"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
        </div>

        {/* Third */}

        <div className="global-max-width-handler global-section-divider relative md:flex hidden justify-between lg:top-[15rem]  flex-wrap mx-auto w-full  lg:gap-[10px] gap-[40px] ">
          <div className="lg:w-[35%] w-[80%] lg:mx-0 mx-auto ml-auto lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <div className="text-4xl  font-bold text-left  text-[#001A5F]">
              Gift cards & &nbsp;
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                inserts
              </span>
            </div>
            <div className="texts mt-3 lg:text-left text-justify lg:w-[98%] w-full">
              Simply Noted makes it easy to send gift cards from your favorite
              stores with each order. From $5 Starbucks cards to $100 Visas,
              there's a gift card to match any budget.
            </div>
            <DynamicButton
              onClickFunction={() => navigate('/collections/best-sellers')}
              text="START WRITING"
              className="btn1 text-sm py-[20px] px-[30px]"
            />
          </div>

          <div className="lg:w-[60%] lg:mx-0 mx-auto relative flex flex-wrap w-full  xl:pl-[180px]  pl-0 mt-5  lg:overflow-hidden overflow-visible  justify-end">
            <div className="text-right relative lg:w-[67%] w-full border-b-[1px]">
              <img
                className="absolute -top-[30px] -left-[350px] lg:top-[30px] lg:-left-[300px] w-[48%] tab:w-auto"
                src={robot3}
                alt="LogoSimplinotedpic"
              />
              <video
                className="lg:max-w-[465px] max-w-[430px] relative overflow-hidden"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={Third} type="video/mp4"></source>
              </video>
            </div>
          </div>
          <img
            src={Arrow3}
            className="hidden lg:block absolute bottom-0 lg:h-[400px]  lg:left-[20rem] z-[-1] lg:top-[24rem] xl:left-[33rem]"
          />
        </div>

        {/* mobile view */}
        <div className="md:hidden block  w-[85%] mx-auto text-center global-section-divider">
          <div className="  text-3xl font-bold text-[#001A5F] mb-5">
            Gift cards & &nbsp;
            <span className="font-beauty text-6xl font-bold">inserts</span>
          </div>
          <div className="w-full">
            <video className="w-full" playsInline autoPlay loop muted>
              <source src={Third} type="video/mp4"></source>
            </video>
          </div>
          <div className="texts text-justify mt-5">
            Simply Noted makes it easy to send gift cards from your favorite
            stores with each order. From $5 Starbucks cards to $100 Visas,
            there's a gift card to match any budget.
          </div>
          <DynamicButton
            text="START WRITING"
            className="btn1 text-sm py-[20px] px-[40px] sm:w-auto w-full"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
        </div>

        <div className="lg:hidden block  sm:p-[40px] p-[30px]">
          <Swiper
            allowTouchMove={false}
            direction={'horizontal'}
            spaceBetween={1}
            slidesPerView={2.5}
            breakpoints={{
              320 : {
                slidesPerView: 1.5,
              },
             511 : {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2.5,
              }}}
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
          </Swiper>
        </div>
        {/* {Fourth } */}
        
        <div className="global-max-width-handler  global-section-divider 2xl:mt-[24rem] lg:mt-[30rem] mt-4 relative  md:flex hidden justify-between mx-auto w-full  gap-[40px] items-center">
       
          <div className=" lg:max-w-[50%] w-[80%] lg:mx-0 mx-auto ml-auto lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <img src={ShopifyPhoto} className="" />
          </div>
          <div className="lg:max-w-[50%] w-[80%] lg:mx-0 mx-auto ml-auto  lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <div className="text-4xl  font-bold text-left  text-[#001A5F]">
              Integrate &nbsp;
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                and
              </span>
              &nbsp; automate
            </div>
            <div className="texts mt-3 lg:text-left text-justify lg:w-[98%] w-full">
              Leveraging our RESTful API or Zapier app Simply Noted can
              integrate to your favorite software and automate your handwritten
              outreach.
            </div>
            <DynamicButton
              onClickFunction={() => navigate('/pages/business')}
              text="VIEW ALL INTEGRATIONS"
              className="btn1 text-sm py-[20px] px-[30px]"
            />
          </div>
        </div>
         {/* mobile view */}
         <div className="md:hidden block  w-[85%] mx-auto text-center global-section-divider">
          <div className="small:text-3xl text-[22px] font-bold text-[#001A5F] mb-5">
              Integrate &nbsp;
              <span className="font-beauty  md:text-7xl text-5xl font-bold">
                and
              </span>
              &nbsp; automate
            </div>
          <div className="w-full">
          <div className=" lg:max-w-[50%] w-[80%] lg:mx-0 mx-auto ml-auto lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <img src={ShopifyPhoto} className="" />
          </div>
          </div>
          <div className="texts text-justify mt-5">
              Leveraging our RESTful API or Zapier app Simply Noted can
              integrate to your favorite software and automate your handwritten
              outreach.
            </div>
            <DynamicButton
              onClickFunction={() => navigate('/pages/business')}
              text="VIEW ALL INTEGRATIONS"
              className="btn1 text-sm py-[20px] small:px-[40px] px-[20px] sm:w-auto w-full"
            />
        </div>
      </div>
    </>
  );
};

export default CanvasDesign;
