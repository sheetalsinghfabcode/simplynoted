import react from 'react';
import First from '../../../assets/Video/First.mp4';
import Second from '../../../assets/Video/Second.mp4';
import Third from '../../../assets/Video/Third.mp4';
import robot1 from '../../../assets/Image/robot.webp';
import robot2 from '../../../assets/Image/robot2.webp';
import robot3 from '../../../assets/Image/robot3.webp';
import DynamicButton from '../DynamicButton';

import {useNavigate} from '@remix-run/react';

const CanvasDesign = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-10px">
        {/* First */}
        <div className="md:flex hidden justify-end  flex-wrap mx-auto w-full mt-6 gap-[10px] ">
          <div className="lg:w-[30%] w-[74%] lg:mx-0 mx-auto ml-auto mt-[60px] lg:order-none order-2 data-background">
            <div className="xl:text-3xl lg:text-2xl md:text-3xl font-karla lg:text-left text-center text-[#001A5F]">
              Send one or send{' '}
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                thousands
              </span>
            </div>
            <div className="texts mt-5">
              Simply Noteds platform makes sending 1,000s of real penwritten
              notes as quick and easy as sending just 1. It has never been
              easier to scale your personal touch and leave lasting impressions!
            </div>
            <DynamicButton
              text="START WRITTING"
              className="btn1"
              onClickFunction={() => navigate('/collections/best-sellers')}
            />
            <DynamicButton
              text="TUTORIALS"
              className="btn2"
              onClickFunction={() => navigate('/blogs/news')}
            />
          </div>
          <div className="lg:w-[60%] w-[100%] lg:mx-0 mx-auto  lg:mb-0 mb-[190px] flex flex-wrap  pl-[46px] mt-5  lg:overflow-hidden overflow-visible  justify-start">
            <div className="z-[-1] w-[33%] text-left relative ">
              <img
                className="w-full  h-full  lg:h-[90%]  lg:ml-[52px] ml-[68px] relative z-[1]"
                src={robot1}
                alt="LogoSimplinotedpic"
              />
            </div>
            <div className="text-right relative w-[67%]">
              <video
                className="max-w-[500px]  absolute overflow-hidden"
                autoPlay
                loop
                muted
              >
                <source src={First} type="video/webm"></source>
              </video>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div className="md:hidden block mt-10 w-[70%] mx-auto text-center">
          <div className="  text-3xl font-karla text-[#001A5F]">
            Send one or send{' '}
            <span className="font-beauty text-6xl font-bold">thousands</span>
          </div>
          <div className="w-full">
            <video className="w-full" autoPlay loop muted>
              <source src={First} type="video/webm"></source>
            </video>
          </div>
          <div className="text-left mt-5">
            Simply Noteds platform makes sending 1,000s of real penwritten notes
            as quick and easy as sending just 1. It has never been easier to
            scale your personal touch and leave lasting impressions!
          </div>
          <DynamicButton
            text="START WRITTING"
            className="btn1"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
          <DynamicButton
            text="TUTORIALS"
            className="btn2"
            onClickFunction={() => navigate('/blogs/news')}
          />
        </div>

        {/* Second */}
        <div className="md:flex hidden justify-start  flex-wrap w-full mt-6 gap-[10px] ">
        <div className="lg:w-[60%] w-[73%] mx-auto lg:mx-0  lg:mb-0 mb-[190px] flex flex-wrap   mt-5  lg:overflow-hidden overflow-visible  justify-start">
            
            <div className="text-right relative w-[67%]">
              <video
                className="max-w-[500px]  absolute overflow-hidden"
                autoPlay
                loop
                muted
              >
                <source src={Second} type="video/webm"></source>
              </video>
            </div>
            <div className="z-[-1] w-[33%] text-left relative ">
              <img
                className="w-full  h-full   lg:ml-[-80px] ml-[30px] relative z-[1]"
                src={robot2}
                alt="LogoSimplinotedpic"
              />
            </div>
          </div>
          <div className="lg:w-[30%] w-[74%] lg:mx-0  mt-[60px]  data-background">
            <div className="xl:text-3xl lg:text-2xl md:text-3xl font-karla lg:text-left text-center  text-[#001A5F]">
            Unlimited card{' '}
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                options
              </span>
            </div>
            <div className="texts mt-5">
            Use our cards, send us yours or design your own! Simply Noted
              offers a wide array of cards to choose from and a powerful custom
              create a card tool. Over 95% of our clients are businesses and use
              their own custom stationery.
            </div>
            <DynamicButton
              text="OUR CARDS"
              className="btn1"
              onClickFunction={() => navigate('/collections/best-sellers')}
            />
           
          </div>
          
        </div>

 {/* mobile view */}
 <div className="md:hidden block mt-10 w-[70%] mx-auto text-center">
          <div className="  text-3xl font-karla text-[#001A5F]">
          Unlimited card{' '}
            <span className="font-beauty text-6xl font-bold">optionss</span>
          </div>
          <div className="w-full">
            <video className="w-full" autoPlay loop muted>
              <source src={First} type="video/webm"></source>
            </video>
          </div>
          <div className="text-left mt-5">
          Use our cards, send us yours or design your own! Simply Noted
              offers a wide array of cards to choose from and a powerful custom
              create a card tool. Over 95% of our clients are businesses and use
              their own custom stationery.
          </div>
          <DynamicButton
            text="OUR CARDS"
            className="btn1"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
          
        </div>


        {/* Third */}

        <div className="md:flex hidden justify-end  flex-wrap mx-auto w-full mt-6 gap-[10px] ">
          <div className="lg:w-[30%] w-[74%] lg:mx-0 mx-auto ml-auto mt-[60px] lg:order-none order-2 data-background">
            <div className="xl:text-3xl lg:text-2xl md:text-3xl font-karla lg:text-left text-center text-[#001A5F]">
              Gift cards &
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                inserts
              </span>
            </div>
            <div className="texts mt-5">
              Simply Noted makes it easy to send gift cards from your favorite
              stores with each order. From $5 Starbucks cards to $100 Visas,
              there's a gift card to match any budget.
            </div>
            <DynamicButton
              onClickFunction={() => navigate('/collections/best-sellers')}
              text="START WRITTING"
              className="btn1"
            />
          </div>
          <div className="lg:w-[60%] w-[100%] lg:mx-0 mx-auto  lg:mb-0 mb-[190px] flex flex-wrap  pl-[46px] mt-5  lg:overflow-hidden overflow-visible  justify-start">
            <div className="z-[-1] w-[33%] text-left relative ">
              <img
                className="w-full  h-full lg:top-0 lg-top-0  top-[30px]  lg:ml-[52px] ml-[68px] relative z-[1]"
                src={robot3}
                alt="LogoSimplinotedpic"
              />
            </div>
            <div className="text-right relative w-[67%]">
              <video
                className="max-w-[500px]  absolute overflow-hidden"
                autoPlay
                loop
                muted
              >
                <source src={Third} type="video/webm"></source>
              </video>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div className="md:hidden block mt-10 w-[70%] mx-auto text-center">
          <div className="  text-3xl font-karla text-[#001A5F]">
            Gift cards &{' '}
            <span className="font-beauty text-6xl font-bold">inserts</span>
          </div>
          <div className="w-full">
            <video className="w-full" autoPlay loop muted>
              <source src={Third} type="video/webm"></source>
            </video>
          </div>
          <div className="text-left mt-5">
            Simply Noted makes it easy to send gift cards from your favorite
            stores with each order. From $5 Starbucks cards to $100 Visas,
            there's a gift card to match any budget.
          </div>
          <DynamicButton
            text="START WRITTING"
            className="btn1"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
         
        </div>
      </div>
    </>
  );
};

export default CanvasDesign;
