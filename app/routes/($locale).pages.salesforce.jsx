import SalesforceWorkflowImage from '../../assets/Image/salesforce-workflow.webp';
import SalesforceFormBgImage02 from '../../assets/Image/salesforce-form-bg-2.webp';
import SalesforceFormStampImage from '../../assets/Image/salesforce-form-stamp.avif';
import SalesforceIcon from '../../assets/Image/salesforce-icon.png';
import DynamicButton from '~/components/DynamicButton';
import { useEffect, useState } from 'react';
import { defer } from '@remix-run/server-runtime';
import { seoPayload } from '~/lib/seo.server';
import CanvasOne from '../../assets/Video/canvas-first.gif';
import CanvasTow from '../../assets/Video/canvas-sec.gif';
import Pen from '../../assets/Image/deep-integration-pen.webp';
import Stamps from '../../assets/Image/deep-integration-stamps.png';
import Espiral from '../../assets/Image/espiral.png';
import ComingSoon from '../../assets/Image/coming-soon.webp';
import Salesforce2 from '../../assets/Image/salesforce-2.webp';
import SalesforceLetter from '../../assets/Image/salesforce-letter-1.webp';
import SalesforceLetter2 from '../../assets/Image/salesforce-letter-2.webp';
import SalesforceArrowLeft from '../../assets/Image/salesforce-arrow-left.avif';
import SalesforceArrowCenter from '../../assets/Image/salesforce-arrow-center.png';
import SalesforceArrowRight from '../../assets/Image/salesforce-arrow-right.avif';
import calculator1 from '../../assets/Image/calculator-why-1.webp';
import calculator2 from '../../assets/Image/calculator-why-2.webp';
import calculator3 from '../../assets/Image/calculator-why-3.webp';
import SalesforceCard from '../../assets/Image/salesforce-cards-1.webp';
import Arrow from '../../assets/Image/salesforce-arrow-1.png';
import SalesforceLogo from '../../assets/Image/salesforce-logo.avif';
import SalesforceItem from '../../assets/Image/salesforce-1.webp';
import { useNavigate } from '@remix-run/react';
import ReCAPTCHA from 'react-google-recaptcha';
export async function loader({ request, context }) {
  const { page } = await context.storefront.query(Shopify_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({ page, url: request.url });
  return defer({
    seo,
    page,
  });
}

export default function Salesforce() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [verifid, setVerifid] = useState(false);

  function onChange(value) {
    if (value) {
      setVerifid(true);
    }
  }

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section>
      <div className={`w-full ${animate ? 'fade-in' : ''}`}>
        <div className="flex px-[16px] md:px-[40px]  items-center">
          <div className="xl:flex-row flex-col global-max-width-handler flex  sm:mt-10 mt-5">
            {/* first div left side */}
            <div className="xl:flex-col  flex-col-reverse global-section-divider  flex  xl:w-[50%] w-full xl:justify-start justify-center">
              <div>
                <div className="xl:block hidden">
                  <div className="text-white text-center text-[12px] p-[3px] bg-[#ef6e6e] w-[104px] rounded-3xl ">
                    COMING SOON &nbsp;
                  </div>
                  <h1
                    className="xl:text-[50px] text-[35px] font-karla font-bold  text-[#001a5f] mb-6"
                    style={{ lineHeight: '0.75' }}
                  >
                    Salesforce
                    <span
                      style={{
                        fontFamily: 'Beauty, Handwriting',
                        fontSize: '200%',
                      }}
                    >
                      Deep
                    </span>
                    <br />
                    Integration
                  </h1>
                </div>
                <div className="  xl:text-left texts !text-[18px] !leading-normal text-center !mb-0 ">
                  We go as far as to design the type of slant, spacing and
                  stroke variability that goes into a unique personalized font.
                  We can control everything from the slant of the lettering,
                  tight spacing, loose spacing and much more depending on what
                  your unique style is.
                </div>
                <div className="flex xl:justify-start justify-center flex-wrap items-center gap-2 mt-5 mb-5 relative ">
                  <DynamicButton
                    text="CONNECT USING OUR PROCESS BUILDER"
                    className="text-white p-[17px] sm:text-[16px] small:text-[14px] text-[10px] bg-[#ef6e6e] px-2 py-5 font-bold"
                    onClickFunction={() =>
                    (window.location.href =
                      'https://simplynoted.com/pages/Easily%20set%20up%20your%20campaign%20in%20minutes%20using%20Salesforce%20Process%20Builder%20or%20Zapier!')
                    }
                  />

                  <span className="xl:block hidden font-karla  text-[#001a5f] underline xl:ml-5 text-[28px] font-bold">
                    or
                  </span>
                  <img
                    className="xl:block hidden relative right-[4px] top-[36px] xl:top-[47px] xl:w-[20%] w-[16%] "
                    src={Arrow}
                    alt="arrow"
                  />
                </div>
              </div>
              {/* first div form */}
              <div className="xl:flex grid xl:justify-start justify-center">
                <div className="xl:hidden inline-block text-center">
                  <div className="text-white inline-block text-center text-[12px] p-[4px] bg-[#ef6e6e] w-[104px] rounded-3xl xl:mb-0  mb-[14px]">
                    COMING SOON
                  </div>
                  <div
                    className="text-[44px] font-karla md:flex grid  text-[#001a5f] items-center font-bold"
                    style={{ lineHeight: '0.75' }}
                  >
                    Salesforce &nbsp;
                    <span
                      style={{
                        fontFamily: 'Beauty, Handwriting',
                        fontSize: '200%',
                      }}
                    >
                      Deep
                    </span>
                    Integration
                  </div>
                </div>
                <div className="wrap-business-banner justify-center">
                  <div className="relative flex xl:w-auto">
                    <div className="formStamp xl:block hidden">
                      <img
                        src={SalesforceFormStampImage}
                        alt="Salesforce form stamp"
                      />
                    </div>
                    <div className=" hidden small:block xl:hidden absolute top-[-2rem] right-[8rem] md:right-[15rem] z-[3]">
                      <img src={SalesforceLogo} alt="salesforce" />
                    </div>
                    <div className="wrap-business-form-salesforce xl:min-w-[35rem] lg:min-w-[30rem] md:min-w-[40rem]">
                      <h3 className="form-title">
                        Sign-Up for Early Access to our Deep Integration
                      </h3>
                      <p id="messageBox"></p>
                      <form className="hubForm" data-hs-cf-bound="true">
                        <div className="row flex">
                          <div className="white-underline-salesforce">
                            <input
                              className="p-0"
                              required
                              type="text"
                              name="first-name"
                              placeholder="First Name"
                            />
                          </div>
                          <div className="white-underline-salesforce">
                            <input
                              className="p-0"
                              required
                              type="text"
                              name="last-name"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>

                        <div className="row flex">
                          <div className="white-underline-salesforce">
                            <input
                              className="p-0"
                              type="text"
                              name="company"
                              required
                              placeholder="Company"
                            />
                          </div>
                          <div className="white-underline-salesforce">
                            <input
                              className="p-0"
                              required
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              id=""
                            />
                          </div>
                        </div>

                        <div className="row flex">
                          <div className="white-underline-salesforce">
                            <input
                              className="p-0"
                              required
                              type="email"
                              name="email-address"
                              placeholder="Email"
                            />
                          </div>
                          <div className="white-underline-salesforce">
                            <select
                            required
                            name="volume" id="" className="py-0">
                              <option  value="Expected Volume">
                                Expected Volume
                              </option>
                              <option value="100-500">100-500</option>
                              <option value="501-999">501-999</option>
                              <option value="1,000-2,499">1,000-2,499</option>
                              <option value="2,500+">2,500+</option>
                            </select>
                          </div>
                        </div>
                        <div className='mx-auto mb-2'>
                        <ReCAPTCHA
                          sitekey="6LdZCogiAAAAAF90CyxrwcnpuKDLAXD8LG4i_WRM"
                          onChange={onChange}
                        />
                        </div>
                        <input
                          type="submit"
                          disabled={!verifid}
                          value="SIGN UP"
                          className="sample-request"
                          id="Form-submit"
                        />
                      </form>
                    </div>
                    <div className="absolute z-1 top-[30px] left-[-30px] w-[114%] lg:block hidden">
                      <img className="w-[113%]" src={SalesforceFormBgImage02} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* first div right side */}
            <div className="lg:block hidden flex-1 p-3  flex-col gap-5  items-center mt-28">
              <div className="text-3xl mb-10 font-karla text-center font-bold  text-[#001a5f]">
                Current Salesforce Workflow
              </div>
              <div className="">
                <img
                  className="object-contian h-full"
                  src={SalesforceWorkflowImage}
                  alt="Salesforce Workflow Image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:block hidden relative my-[30px]">
          <img
            className="pl-[50px] 2xl:w-[750px] w-[650px]"
            src={SalesforceCard}
          />
        </div>
        {/* second */}
        <div className="flex flex-wrap justify-center global-section-divider relative global-max-width-handler">
          <div className="absolute hidden lg:block xl:top-[373px] top-[280px] right-[14rem] z-[-12]">
            <img
              className="w-full xl:h-[56rem] h-[44rem]"
              src={CanvasOne}
              alt="Computer man"
            />
          </div>
          <div className="xl:w-[30%] lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
            <div className="lg:block hidden">
              <div className="xl:text-[32px] mb-[12px] text-[32px] font-bold text-[#001A5F]">
                Send one or send
                <span className="font-beauty text-6xl font-bold">
                  thousands
                </span>
              </div>
            </div>
            <p className=" xl:w-[550] w-[100%]  lg:mt-0 mt-7 texts">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
            <div className="flex gap-2 items-center w-full max-lg:max-w-[353px] max-lg:mx-auto">
              <DynamicButton
                text="START WRITING"
                className="btn1 lg:!text-[17px] w-[247px]  md:text-[14px] !h-[54px]  mt-[35px]"
                onClickFunction={() =>
                (window.location.href =
                  'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 lg:!text-[17px] w-[247px] md:text-[14px] h-[67px] items-center text-center"
                onClickFunction={() => navigate('/blogs/news')}
              />
            </div>
          </div>
          <div className="lg:hidden block  mb-">
            <div className="text-center mb-[12px] sm:text-[32px]  text-[28px] font-bold text-[#001A5F]">
              Send one or send
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>

          <div className="lg:w-[60%] relative  w-full">
            <img
              className="lg:absolute relative 2xl:left-[30px] xl:max-w-[1000px] lg:max-w-[725px] mx-auto overflow-hidden "
              src={SalesforceItem}
            />
          </div>
        </div>

        <div className="lg:flex hidden overflow-hidden justify-between h-[40rem] py-[30px] ">
          <img className="h-[500px]  relative" src={SalesforceCard} />
          <img className="relative  h-[430px] " src={SalesforceLetter} />
        </div>

        {/* third */}

        <div className="flex flex-wrap flex-row-reverse global-section-divider justify-center relative  global-max-width-handler   w-[100%] ">
          <div className="absolute xl:top-[270px] top-[175px] hidden lg:block z-[-12] xl:right-[134px] right-[17px]">
            <img
              className="2xl:w-[1135px] w-[1051px]"
              src={CanvasTow}
              alt="Computer man"
            />
          </div>
          <div className="lg:w-[40%] xl:mt-[61px]  lg:order-none order-2 w-full lg:text-left text-center">
            <div className="lg:block hidden">
              <div className="xl:text-[36px] md:text-left text-center mb-[12px] text-[32px] font-bold text-[#001A5F]">
                Send one or send
                <span className="font-beauty text-6xl font-bold">
                  thousands
                </span>
              </div>
            </div>
            <p className=" w-[100%] texts lg:mt-0 mt-7 ">
              Send one or send thousands
            </p>
            <div className="flex gap-2 items-center w-full max-lg:max-w-[353px] max-lg:mx-auto">
              <DynamicButton
                text="START WRITING"
                className="btn1 lg:!text-[17px] w-[247px]  md:text-[14px] !h-[54px]  mt-[35px]"
                onClickFunction={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth', // Make the scroll behavior smooth
                  })
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 lg:!text-[17px] w-[247px] md:text-[14px] !h-[67px] items-center text-center"
                onClickFunction={() => navigate('/blogs')}
              />
            </div>
          </div>
          <div className="lg:hidden block">
            <div className="xl:text-[36px] mb-[12px] text-[27px] text-center font-bold text-[#001A5F]">
              Send one or send
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>
          <div className="xl:w-[60%] lg:w-[60%] relative  w-full">
            <img
              className="lg:absolute relative xl:max-w-[1000px] lg:max-w-[800px] lg:right-[-3rem] xl:right-[-7rem]  mx-auto overflow-hidden "
              src={Salesforce2}
            />
          </div>
        </div>

        <div className="lg:flex hidden overflow-hidden pl-[20px] mt-[18rem] relative justify-between  max-w 5/6">
          <img
            className="h-[430px] xl:ml-[35px] ml-[-122px] xl:rotate-0 rotate-90"
            src={Espiral}
          />
          <img className="w-[36%]" src={SalesforceLetter2} />
        </div>

        <div className="text-center relative flex justify-center lg:mt-0 mt-10">
          <h2 className="text-[#001a5f] text-center sm:text-[40px] text-2xl   font-bold mb-10 signup-underline">
            Integration Feature
          </h2>
        </div>
        <div className="lg:flex mt-[12px] justify-center grid">
          <div className="md:mt-14  mt-0">
            <img className="pb-[12px]" src={calculator1} />
            <h2 className="w-[299px] texts text-center">
              Our team of handwriting robots will help you engage with vast
              audiences.
            </h2>
          </div>
          <div className="mt-14">
            <img className="pb-[12px]" src={calculator2} />
            <h2 className="w-[299px] texts text-center">
              Sending a letter to 1 customer or 10,000 + customers. We’ve got
              you covered!
            </h2>
          </div>
          <div className="mt-14">
            <img className="pb-[12px]" src={calculator3} />
            <h2 className="w-[306px] texts text-center">
              Every handwritten card and envelope we produce is hand quality
              controlled to ensure the highest quality product possible.
            </h2>
          </div>
        </div>
        <div className="lg:flex hidden pt-[50px] justify-center gap-[191px] mt-[20px]">
          <img src={SalesforceArrowLeft} />
          <img src={SalesforceArrowCenter} />
          <img src={SalesforceArrowRight} />
        </div>
        <div className="max-w-[1550px] mx-auto">
          <div className="flex flex-row items-center mb-[51px] relative justify-center mx-auto mt-[70px]">
            <div className="banner-detail text-center tab:w-[80%] w-[1200px]">
              <div className="absolute right-[-198px] top-[-89px]">
                <img className="xl:block hidden" src={Pen} alt="shopify" />
              </div>
              <div className="absolute left-[-98px] top-[-91px]">
                <img className="xl:block hidden" src={Stamps} alt="shopify" />
              </div>
              <img
                className="absolute lg:mt-[-14rem] md:mt-[-11rem] mt-[-16rem] "
                src={SalesforceIcon}
                alt="shopify"
              />
              <img
                className="absolute right-[143px] hiiden lg:block top-[60px] hidden md:block"
                src={ComingSoon}
              />
              <div className="lg:text-6xl md:text-[37px] sm:text-[28px] text-[20px] lg:mt-0 md:mt-[28px] mt-[55px] flex text-white flex-col items-center font-karla">
                Salesforce Deep Integration
                <div className="md:flex-row flex-col  lg:mt-10 md:mt-[20px]  flex md:gap-12 items-center">
                  <DynamicButton
                    text="JOIN WAITLIST"
                    className="btn1 lg:!text-[17px] w-[247px]  md:text-[14px] h-[54px]  mt-[35px]"
                    onClickFunction={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth', // Make the scroll behavior smooth
                      })
                    }
                  />
                  <DynamicButton
                    text="USE PROCESS BUILDER"
                    className="sch-btn lg:!text-[17px] whitespace-pre-line w-[247px] md:text-[14px] !h-[67px] text-[white] items-center text-center"
                    onClickFunction={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth', // Make the scrool behavior smooth
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const Shopify_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/73125494889"){
    title
    seo{
      title
      description
    }
  }
}`;
