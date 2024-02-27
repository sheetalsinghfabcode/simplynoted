import react, {useEffect} from 'react';
import First from '../../../assets/Video/First.mp4';
import Second from '../../../assets/Video/Second.mp4';
import Third from '../../../assets/Video/Third.mp4';
import robot1 from '../../../assets/Image/robot.webp';
import robot2 from '../../../assets/Image/robot2.webp';
import robot3 from '../../../assets/Image/robot3.webp';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import Arrow1 from '../../../assets/Image/FirstArrow.gif'
import Arrow2 from '../../../assets/Image/SecondArrow.gif'
import Arrow3 from '../../../assets/Image/ThirdArrow.gif'
import ShopifyPhoto from '../../../assets/Image/ShopifyPhoto.gif'
const CanvasDesign = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-[4rem] xl:mb-[17rem] md:mb-[5rem] mb-2">
        {/* First */}
        <div className="global-max-width-handler relative md:flex flex-col lg:flex-row hidden justify-between flex-wrap mx-auto w-full mt-6 lg:gap-[10px] gap-[] ">
          <div className="flex-1 lg:w-[35%] w-[80%] relative lg:mx-0 mx-auto ml-auto lg:my-[6rem] lg:order-none order-2 data-background text-left">
            <div className="text-4xl text-custom font-custom font-bold text-left  text-[#001A5F] ">
              Send one or send &nbsp;
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
                thousands
              </span>
            </div>
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
            <div className="z-[1] lg:w-[615px] w-[414px] text-left  relative left-[86px] lg:left-[75px]">
              <img className="" src={robot1} alt="LogoSimplinotedpic" />
            </div>
              <video className="z-[2] lg:w-[600px] w-[450px] overflow-hidden" autoPlay loop muted>
                <source src={First} type="video/webm"></source>
              </video>
            </div>
          </div>
          <img src={Arrow1} className='hidden lg:block absolute bottom-0 lg:h-[345px] lg:top-[158px] lg:left-[263px] z-[-1] xl:top-[80px] xl:h-[474px] xl:left-[227px]'/>
        </div>

        {/* mobile view */}
        <div className="md:hidden block mt-10 w-[85%] mx-auto text-center">
          <div className="  text-3xl font-bold text-[#001A5F] mb-5">
            Send one or send &nbsp;
            <span className="font-beauty text-6xl font-bold">thousands</span>
          </div>
          <div className="w-full">
            <video className="w-full" autoPlay loop muted>
              <source src={First} type="video/webm"></source>
            </video>
          </div>
          <div className="text-justify mt-5 !leading-7 texts">
            Simply Noteds platform makes sending 1,000s of real penwritten notes
            as quick and easy as sending just 1. It has never been easier to
            scale your personal touch and leave lasting impressions!
          </div>
          <DynamicButton
            text="START WRITING"
            className="btn1 w-full text-sm py-[20px] px-[30px]"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
          <DynamicButton
            text="TUTORIALS"
            className="btn2 w-full mt-5 py-[18px] px-[40px]"
            onClickFunction={() => navigate('/blogs')}
          />
        </div>

        {/* Second */}
        <div className="global-max-width-handler md:flex hidden lg:justify-between xl:top-[3rem] top-5 relative justify-center flex-wrap w-full my-10  lg:gap-[50px] gap-[30px]">
          <div className="lg:w-[60%] w-[80%] mx-auto lg:mx-0 relative flex flex-wrap  lg:p-[10px] mt-[50px] lg:overflow-hidden overflow-visible  justify-start">
            <div className="text-right relative w-[67%]">
              <video
                className="max-w-[435px]  relative overflow-hidden z-[1]"
                autoPlay
                loop
                muted
              >
                <source src={Second} type="video/webm"></source>
              </video>
              <img
                className="absolute top-0 -right-[74%] xl:-right-[53%] lg:-right-[63%] lg:w-[85%] w-full "
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
          <img src={Arrow2} className='hidden lg:block absolute bottom-0 lg:h-[345px] lg:top-[158px] lg:left-[263px] z-[-1] xl:top-[14rem] xl:h-[434px] xl:left-[227px]'/>

        </div>

        {/* mobile view */}
        <div className="md:hidden block mt-10 w-[85%] mx-auto text-center">
          <div className="  text-3xl font-bold text-[#001A5F] mb-5 ">
            Unlimited card
            <span className="font-beauty text-6xl font-bold">options</span>
          </div>
          <div className="w-full">
            <video className="w-full" autoPlay loop muted>
              <source src={First} type="video/webm"></source>
            </video>
          </div>
          <div className="texts text-justify !leading-7 mt-5">
            Use our cards, send us yours or design your own! Simply Noted offers
            a wide array of cards to choose from and a powerful custom create a
            card tool. Over 95% of our clients are businesses and use their own
            custom stationery.
          </div>
          <DynamicButton
            text="OUR CARDS"
            className="btn1 w-full text-sm py-[20px] px-[30px]"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
        </div>

        {/* Third */}

        <div className="global-max-width-handler relative md:flex hidden justify-between xl:top-[10rem] top-10 flex-wrap mx-auto w-full  gap-[10px]  ">
          <div className="lg:w-[35%] w-[80%] lg:mx-0 mx-auto ml-auto lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <div className="text-3xl  font-bold text-left  text-[#001A5F]">
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

          <div className="lg:w-[60%] lg:mx-0 mx-auto relative flex flex-wrap justify-end w-full  xl:pl-[180px]  pl-0 mt-5  lg:overflow-hidden overflow-visible  justify-start">
            <div className="text-right relative lg:w-[67%] w-[60%] border-b-[1px]">
              <img
                className="absolute -top-[12px] -left-[350px] lg:top-[30px] lg:-left-[300px]"
                src={robot3}
                alt="LogoSimplinotedpic"
              />
              <video
                className="lg:max-w-[465px] max-w-[430px] relative overflow-hidden"
                autoPlay
                loop
                muted
              >
                <source src={Third} type="video/webm"></source>
              </video>
            </div>
          </div>
          <img src={Arrow3} className='hidden lg:block absolute bottom-0 lg:h-[345px] lg:top-[293px] lg:left-[252px] z-[-1] xl:top-[165px] xl:h-[486px] xl:left-[252px]'/>

        </div>

        {/* mobile view */}
        <div className="md:hidden block mt-10 w-[85%] mx-auto text-center">
          <div className="  text-3xl font-bold text-[#001A5F] mb-5">
            Gift cards & &nbsp;
            <span className="font-beauty text-6xl font-bold">inserts</span>
          </div>
          <div className="w-full">
            <video className="w-full" autoPlay loop muted>
              <source src={Third} type="video/webm"></source>
            </video>
          </div>
          <div className="texts text-justify !leading-7 mt-5">
            Simply Noted makes it easy to send gift cards from your favorite
            stores with each order. From $5 Starbucks cards to $100 Visas,
            there's a gift card to match any budget.
          </div>
          <DynamicButton
            text="START WRITING"
            className="btn1 w-full text-sm py-[20px] px-[30px]"
            onClickFunction={() => navigate('/collections/best-sellers')}
          />
        </div>

        {/* {Fourth } */}
        <div className="global-max-width-handler xl:top-[17rem] top-[7rem] relative  lg:flex hidden justify-between mx-auto w-full  gap-[10px] items-center">
        <div className=" lg:max-w-[50%] w-[80%] lg:mx-0 mx-auto ml-auto lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <img src={ShopifyPhoto} className=''/>
          </div>
          <div className="lg:max-w-[50%] w-[80%] lg:mx-0 mx-auto ml-auto lg:mt-[60px] lg:order-none order-2 data-background text-left ">
            <div className="text-3xl  font-bold text-left  text-[#001A5F]">
            Integrate &nbsp;
              <span className="font-beauty xl:text-7xl lg:text-5xl text-7xl font-bold">
              and
              </span>
               automate &nbsp;
            </div>
            <div className="texts mt-3 lg:text-left text-justify lg:w-[98%] w-full">
            Leveraging our RESTful API or Zapier app Simply Noted can integrate to your favorite software and automate your handwritten outreach. 
            </div>
            <DynamicButton
              onClickFunction={() => navigate('/pages/business-page')}
              text="VIEW ALL INTEGRATIONS"
              className="btn1 text-sm py-[20px] px-[30px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasDesign;
