import {useEffect, useState} from 'react';
import ac_blue from '../../assets/Image/ac-blue-orb.png';
import shopifys from '../../assets/Image/shopify-log.png';
import hubspot from '../../assets/Image/Hubspot.png';
import zoho from '../../assets/Image/zoho.png';
import salesforce from '../../assets/Image/Salesforce.png';
import amazon from '../../assets/Image/amazon.png';
import sheet from '../../assets/Image/Google-Sheets.png';
import click_funnel from '../../assets/Image/clickfunnels-dark-logo.png';
import esty from '../../assets/Image/Etsy_logo.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import DynamicButton from '~/components/DynamicButton';
import 'swiper/css/autoplay';
import {defer} from '@remix-run/server-runtime';
import {seoPayload} from '~/lib/seo.server';
import CanvasOne from '../../assets/Video/canvas-first.gif';
import CanvasTow from '../../assets/Video/canvas-sec.gif';
import {useNavigate} from '@remix-run/react';
import ZapierLogo from '../../assets/Image/zapier-logo-orange.png'
import ZapierLaptop from '../../assets/Image/zapier-laptop-1.webp'
import Salesforce from '../../assets/Image/salesforce-cards-1.webp'
import zapierArrow from '../../assets/Image/zapier-arrow.png'
import Salesforce2 from '../../assets/Image/salesforce-2.webp'
import SalesforceLetter from '../../assets/Image/salesforce-letter-1.webp'
import SalesforceLetter2 from '../../assets/Image/salesforce-letter-2.webp'
import Pen from '../../assets/Image/deep-integration-pen.webp'
import Stamps from '../../assets/Image/deep-integration-stamps.png'
import Espiral from '../../assets/Image/espiral.png'
export async function loader({request, context}) {
  const {page} = await context.storefront.query(Zapier_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
}

export default function Zapier() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="w-full">
      <div className="xl:flex relative items-center global-section-divider max-lg:top-0 top-10 justify-center global-max-width-handler max-lg:left-0 lg:left-[30px]">
        <div className="tab:max-w-[40%] max-lg:mx-auto">
          <div className="md:flex flex xl:justify-normal justify-center">
            <img src={ZapierLogo} />
          </div>
          <div className="flex xl:justify-normal justify-center">
            <h2 className="md:text-[48px] sm:text-[35px] text-[29px]  text-[#001a5f] font-bold tracking-[-0.2px] leading-normal max-lg:!text-center">
              Zapier Integration
            </h2>
          </div>
          <div className="xl:justify-normal xl:flex hidden justify-center">
            <p className=" xl:text-left texts !text-[18px] !leading-normal text-center !mb-0 ">
              Integrate and automate sending real handwritten notes from 2,500+
              softwares instantly. Request access to our Zapier App today!
            </p>
          </div>
          <div className="mt-5  xl:justify-normal  xl:flex hidden  justify-center xl:order-first">
            <div className="flex justify-center">
              <DynamicButton
                text="INTEGRATE NOW"
                className="INTEGRATE  text-[14px] font-bold text-white py-[20px] px-[50px] order-1	rounded"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
            </div>
          </div>
        </div>
        <div className=''>
          <div className="flex xl:justify-normal xl:mt-[0px]  justify-center mt-8">
            <img
              className="w-full"
              src={ZapierLaptop}
            />
          </div>
          <div className="flex xl:justify-normal  xl:hidden justify-center">
            <p className="sm:w-3/4 w-full xl:text-left text-justify sm:text-center texts mt-8 max-lg:max-w-xl max-lg:text-center max-lg:mx-auto">
              Integrate and automate sending real handwritten notes from 2,500+
              softwares instantly. Request access to our Zapier App today!
            </p>
          </div>
          <div className=" flex xl:justify-normal justify-center  xl:hidden xl:order-first">
            <div className=" flex justify-center">
              <DynamicButton
                text="INTEGRATE NOW"
                className="INTEGRATE  text-[14px] font-bold text-white py-[20px] px-[50px] order-1	rounded"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shopify-tag flex justify-center mx-3 max-w 5/6 sm:mt-[130px] mt-[70px] max-lg:my-[70px] max-sm:my-[40px]">
        <Swiper
          modules={[Autoplay]}
          direction={'horizontal'}
          spaceBetween={1}
          slidesPerView={6}
          loop={true}
          breakpoints={{
            280: {
              spaceBetween: 2,
              slidesPerView: 2,
            },
            540: {
              spaceBetween: 2,
              slidesPerView: 3,
            },
            768: {
              spaceBetween: 10,
              slidesPerView: 4,
            },
            1024: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
            1500: {
              spaceBetween: 10,
              slidesPerView: 8,
            },
          }}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />
          </SwiperSlide>
          <SwiperSlide className="!mr-[-60px]">
            <img
              className="w-[36%] mt-[-13px]"
              src={hubspot}
              alt="LogoSimplinotedpic"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-[40%]"
              src={salesforce}
              alt="LogoSimplinotedpic"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={amazon} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={sheet} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className="w-[90%]"
              src={click_funnel}
              alt="LogoSimplinotedpic"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={esty} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={ac_blue} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[60%]" src={shopifys} alt="LogoSimplinotedpic" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-[90%]" src={zoho} alt="LogoSimplinotedpic" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full hidden xl:block relative h-[459px] ">
        <div className="flex">
          <div className="absolute tab:left-[-10vw] top-[3px]">
            <img
              className="max-w-[500px] "
              src={Salesforce}
            />
            <div className="absolute   right-[-371px] top-[163px]">
              <p className="text-center w-[344px] texts">
                Send pen written notes automatically from your favorite CRM
              </p>
            </div>
            <div className="absolute right-[-166px] top-[235px]">
              <img src={zapierArrow} />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:flex mt-10 items-center global-section-divider w-full relative  justify-center global-max-width-handler max-lg:left-0 lg:left-[30px]">
        <div className="absolute hidden xl:block top-[320px] right-[280px] z-[-12]">
          <img
            className="w-full 2xl:h-[53rem] h-[45rem]"
            src={CanvasOne}
            alt="Computer man"
          />
        </div>
        <div className="">
          <div className="flex xl:justify-normal xl:w-[490px] w-[100%] leading-[48px] font-bold justify-center">
            <h2 className="md:text-[40px] xl:text-left text-center sm:text-[35px] text-[26px]  text-[#001a5f] sm:font-bold font-bold max-sm:leading-normal max-lg:max-w-xl max-lg:text-center max-lg:mx-auto ">
              Instantly Integrate With 1,000s of Applications
            </h2>
          </div>
          <div className="xl:justify-normal  xl:flex hidden justify-center">
            <p className="max-w-[100%]  xl:text-left text-center mt-5 texts max-sm:text-center">
              Start your trigger by finding your app in the Zapier database
            </p>
          </div>
          <div className="mt-5  xl:justify-normal xl:flex hidden justify-center xl:order-first">
            <div className="xl:flex grid">
              <DynamicButton
                text="INTEGRATE NOW"
                className="btn1 text-sm py-[20px] px-[30px] "
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[18px] xl:mt-[0px] mt-[12px] px-[45px] ml-[15px]"
                onClickFunction={() => navigate('/news')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex xl:justify-normal justify-center mt-5">
            <img
              className="w-full"
              src={Salesforce2}
            />
          </div>
          <div className="flex xl:justify-normal  xl:hidden  justify-center">
            <p className="max-w-[100%]  xl:text-left text-justify texts  mt-8 max-sm:text-center ">
              Start your trigger by finding your app in the Zapier database
            </p>
          </div>
          <div className=" flex xl:justify-normal  xl:hidden justify-center xl:order-first">
            <div className="flex gap-2 items-center w-full max-lg:max-w-[353px] max-lg:mx-auto">
              <DynamicButton
                text="INTEGRATE NOW"
                className="btn1 text-sm py-[15px] px-[5px] max-sm:text-[14px] flex-1 !mt-0"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[15px] mt-[0] px-[24px]  max-sm:text-[14px]  flex-1"
                onClickFunction={() => navigate('/news')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden xl:block w-full relative h-[384px]">
        <div className="absolute 2xl:right-[40px]  right-[-185px] top-[-25px] 2xl:top-[-30px]">
          <img
            className="max-w-[540px]"
            src={SalesforceLetter}
          />
        </div>
      </div>
      <div className="xl:flex  items-center relative  global-section-divider global-max-width-handler justify-center mx-auto 3xl:w-[85%] w-full ">
        <div className="absolute 2xl:top-[27rem] top-[20rem]  hidden xl:block z-[-12] 2xl:left-[26rem] left-[14rem]">
          <img
            className="w-full 2xl:h-[54rem] h-[42rem]"
            src={CanvasTow}
            alt="Computer man"
          />
        </div>
        <div className="order-2 xl:mr-[56px] mr-[0px]">
          <div className="flex xl:justify-normal justify-center">
            <h2 className="md:text-[40px] xl:text-left text-center sm:text-[35px] text-[26px]  text-[#001a5f] font-bold">
              Send one or send
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </h2>
          </div>
          <div className="flex xl:justify-normal justify-center">
          <p className="max-w-[100%]  xl:text-left text-justify texts  mt-8 max-sm:text-center hidden xl:block max-lg:max-w-xl max-lg:text-center max-lg:mx-auto">
              Simply Noted integrates with your software and will do bulk sends
              in just a few minutes of your time.
            </p>
          </div>
          <div className="mt-5  xl:justify-normal hidden xl:flex justify-center xl:order-first">
            <div className="xl:flex grid">
              <DynamicButton
                text="INTEGRATE NOW"
                className="btn1 text-sm py-[20px] px-[30px]"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[18px] xl:mt-[0px] mt-[12px] px-[45px] ml-[15px]"  
              onClickFunction={() => navigate('/news')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex xl:justify-normal justify-center mt-5">
            <img
              className="w-[98%]"
              src={Salesforce2}
            />
          </div>
          <div className="flex xl:justify-norma xl:hidden justify-center">
          <p className="max-w-[100%]  xl:text-left text-justify texts  mt-8 max-sm:text-center max-lg:max-w-xl max-lg:text-center max-lg:mx-auto">
              Simply Noted integrates with your software and will do bulk sends
              in just a few minutes of your time.
            </p>
          </div>
          <div className=" flex xl:justify-normal  xl:hidden justify-center xl:order-first">
          <div className="flex gap-2 items-center w-full max-lg:max-w-[353px] max-lg:mx-auto">
              <DynamicButton
                text="INTEGRATE NOW"
                className="btn1 py-[15px] px-[15px]  max-sm:text-[14px]  flex-1 !mt-0"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 py-[15px] mt-[0] px-[5px]  max-sm:text-[14px]  flex-1"
                onClickFunction={() => navigate('/news')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden xl:block w-full relative 2xl:h-[480px] h-[400px]">
        <div className="absolute right-[-23px] top-[3rem] ">
          <img
            className="max-w-[650px]"
            src={SalesforceLetter2}
          />
        </div>
      </div>
      <div className="w-full flex sm:p-[37px] py-[20px] xl:mt-[173px] mb-[51px] mt-[0px] relative justify-center">
        <div className="banner-detail  w-[1200px]">
          <div className="absolute right-[-198px] top-[-89px]">
            <img
              className="xl:block hidden"
              src={Pen}
              alt="shopify"
            />
          </div>
          <div className="absolute left-[-98px] top-[-91px]">
            <img
              className="xl:block hidden"
              src={Stamps}
              alt="shopify"
            />
          </div>
          <div>
            <img
              className=""
              src={ZapierLogo}
              alt="shopify"
            />
          </div>
          <div className="">
            <div className="mb-[10px] xl:text-[44px] tab-text-[38px] sm:text-[28px] text-[24px] leading-[41px] mt-[21px] sm:mb-[29px] font-bold text-[white]">
              Integrate with Zapier
            </div>
            <div className="xl:flex grid justify-center sm:gap-[12px]">
              <DynamicButton
                text="INTEGRATE NOW"
                className="req-btn sm:w-[247px] w-[185px] h-[54px] sm:text-[16px] text-sm"
                onClickFunction={() =>
                  window.open(
                    'https://zapier.com/apps/simply-noted/integrations',
                    '_blank',
                  )
                }
              />
              <DynamicButton
                text="VIEW ALL INTEGRATIONS"
                className="sch-btn text-[white] sm:w-[247px] w-[185px] !h-[69px]"
                onClickFunction={() =>
                  window.open('https://zapier.com/apps', '_blank')
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-[251px]  left-[11px] lg:block hidden">
        <img
          className="rotate-90 hidden"
          src={Espiral}
        />
      </div>
    </div>
  );
}
const Zapier_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/73125298281"){
    title
    seo{
      title
      description
    }
  }
}`;
