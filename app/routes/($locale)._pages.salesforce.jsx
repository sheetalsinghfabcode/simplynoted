import SalesforceWorkflowImage from '../../assets/Image/salesforce-workflow.webp';
import SalesforceFormBgImage02 from '../../assets/Image/salesforce-form-bg-2.webp';
import SalesforceFormStampImage from '../../assets/Image/salesforce-form-stamp.avif';
import SalesforceIcon from '../../assets/Image/salesforce-icon.png';
import DynamicButton from '~/components/DynamicButton';
import {useEffect, useState} from 'react';
import {defer} from '@remix-run/server-runtime';
import { seoPayload } from '~/lib/seo.server';
export async function loader({request,context}){
  const {page} = await context.storefront.query(Shopify_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
}

export default function Salesforce() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section>
      <div className={`w-full global-max-width-handler ${animate ? 'fade-in' : ''}`}>
        <div className="flex px-[16px] md:px-[40px]  items-center">
          <div
            className="lg:flex-row flex-col flex  sm:mt-10 mt-5"
          >
            {/* first div left side */}
            <div className="lg:flex-col  flex-col-reverse  flex p-3 mr-10 lg:w-[50%] w-full ">
              <div>
                <div className="lg:block hidden">
                  <div className="text-white text-center text-[12px] p-[3px] bg-[#ef6e6e] w-[104px] rounded-3xl ">
                    COMING SOON
                  </div>
                  <div
                    className="lg:text-[50px] text-[35px] font-karla  text-[#001a5f]"
                    style={{lineHeight: '0.75'}}
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
                    Integration
                  </div>
                </div>
                <div className=" mt-[14px] lg:w-[83%]  font-light w-full lg:text-left sm:text-center text-justify text-[19px]">
                  We go as far as to design the type of slant, spacing and
                  stroke variability that goes into a unique personalized font.
                  We can control everything from the slant of the lettering,
                  tight spacing, loose spacing and much more depending on what
                  your unique style is.
                </div>
                <div className="flex lg:justify-start justify-center flex-wrap items-center gap-2 mt-5 mb-5 relative ">
                  <button
                    className="text-white p-[17px] text-[17px] bg-[#ef6e6e] px-2 pt-4 pb-4 font-bold"
                    type="button"
                  >
                    CONNECT USING OUR PROCESS BUILDER
                  </button>
                  <span className="lg:block hidden font-karla  text-[#001a5f] underline ml-5 text-2xl">
                    or
                  </span>
                  <img
                    className="lg:block hidden relative right-[4px] top-[38px] w-[21%]"
                    src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-1.png?v=1609453677&94441"
                    alt="arrow"
                  />
                </div>
              </div>

              {/* first div form */}
              <div className="lg:flex grid  justify-center">
                <div className="lg:hidden inline-block text-center">
                  <div className="text-white inline-block text-center text-[12px] p-[4px] bg-[#ef6e6e] w-[104px] rounded-3xl lg:mb-0  mb-[14px]">
                    COMING SOON
                  </div>
                  <div
                    className="text-[44px] font-karla  text-[#001a5f]"
                    style={{lineHeight: '0.75'}}
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
                    Integration
                  </div>
                </div>
                <div className="wrap-business-banner ">
                  <div className="relative flex lg:w-auto w-full">
                    <div className="formStamp lg:block hidden">
                      <img
                        src={SalesforceFormStampImage}
                        alt="Salesforce form stamp"
                      />
                    </div>
                    <div className="wrap-business-form-salesforce">
                      <h3 className="form-title">
                        Sign-Up for Early Access to our Deep Integration
                      </h3>
                      <p id="messageBox"></p>
                      <form className="hubForm" data-hs-cf-bound="true">
                        <div className="row">
                          <div className="white-underline-salesforce">
                            <input
                              required=""
                              type="text"
                              name="first-name"
                              placeholder="First Name"
                            />
                          </div>
                          <div className="white-underline-salesforce">
                            <input
                              required=""
                              type="text"
                              name="last-name"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="white-underline-salesforce">
                            <input
                              type="text"
                              name="company"
                              placeholder="Company"
                            />
                          </div>
                          <div className="white-underline-salesforce">
                            <input
                              required=""
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              id=""
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="white-underline-salesforce">
                            <input
                              required=""
                              type="email"
                              name="email-address"
                              placeholder="Email"
                            />
                          </div>
                          <div className="white-underline-salesforce">
                            <select name="volume" id="">
                              <option value="Expected Volume">
                                Expected Volume
                              </option>
                              <option value="100-500">100-500</option>
                              <option value="501-999">501-999</option>
                              <option value="1,000-2,499">1,000-2,499</option>
                              <option value="2,500+">2,500+</option>
                            </select>
                          </div>
                        </div>

                        <input
                          type="submit"
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
            <div className="lg:block hidden flex-1 p-3 flex flex-col gap-5  items-center mt-28">
              <div className="text-3xl mb-10 font-karla  text-[#001a5f]">
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
        <div className="lg:block hidden relative mt-[36px]">
          <img
            className="ml-[-173px]"
            src="https://simplynoted.com/cdn/shop/files/salesforce-cards.png?v=5725391707754373102"
          />
        </div>
        {/* second */}
        <div className="flex flex-wrap justify-center ml-auto lg:mr-0 mr-auto  ">
          <div className="xl:w-[30%] lg:w-[40%] xl:mt-[61px] lg:order-none order-2 w-full lg:text-left text-center">
            <div className="lg:block hidden">
              <div className="xl:text-[36px] mb-[12px] text-[32px] font-bold text-[#001A5F]">
                Send one or send
                <span className="font-beauty text-6xl font-bold">
                  thousands
                </span>
              </div>
            </div>
            <p className="lg:text-[20px] text-[18px] text-black font-light xl:w-[138%] w-[100%] leading-8 lg:mt-0 mt-7 ">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
            <div className="lg:flex-row flex-col flex lg:items-left items-center lg:mt-0 mt-5">
              <DynamicButton
                text="INTEGRATE NOW"
                className="btn1 lg:w-[45%] lg:mt-6 md:w-[26%] sm:w-[38%] w-[50%] lg:!text-[16px] md:text-[14px] text-[16px] lg:h-[10%]  h-full mt-[35px]"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105 ')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 lg:w-[50%] md:w-[26%] text-[15px] mt-5"
                onClickFunction={() => navigate('/blogs')}
              />
            </div>
          </div>
          <div className="lg:hidden block sm:mb-10 mb-7">
            <div className="xl:text-[37px] mb-[12px] text-[32px] font-bold text-[#001A5F]">
              Send one or send
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>

          <div className="xl:w-[70%] lg:w-[60%] relative overflow-x-clip  w-full">
            <img
              className="lg:absolute relative 2xl:left-[30px] xl:max-w-[950px] lg:max-w-[725px] mx-auto overflow-hidden "
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-1.png?v=1611260653"
            />
          </div>
        </div>

        <div className="lg:flex hidden overflow-hidden justify-between max-w 5/6  mb-[64px]">
          <img
            className="h-[466px] ml-[-188px]"
            src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"
          />
          <img
            className="simplinoted-card-image"
            src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"
          />
        </div>

        {/* third */}

        <div className="flex flex-wrap flex-row-reverse justify-center lg:ml-0   mr-auto  ml-auto  w-[90%] lg:mt-0 mt-8">
          <div className="lg:w-[40%] xl:mt-[61px]  lg:order-none order-2 w-full lg:text-left text-center">
            <div className="lg:block hidden">
              <div className="xl:text-[37px] mb-[12px] text-[32px] font-bold text-[#001A5F]">
                Send one or send
                <span className="font-beauty text-6xl font-bold">
                  thousands
                </span>
              </div>
            </div>
            <p className="lg:text-[20px] text-[18px] text-black font-light w-[100%] leading-8 lg:mt-0 mt-7 ">
              Send one or send thousands
            </p>
            <div className="lg:flex-row flex-col flex lg:items-left items-center lg:mt-0 mt-5">
              <DynamicButton
                text="INTEGRATE NOW"
                className="btn1 lg:w-[45%] lg:mt-6 md:w-[26%] sm:w-[38%] w-[50%] lg:!text-[16px] md:text-[14px] text-[16px] lg:h-[10%]  h-full mt-[35px]"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/apps/simply-noted/integrations')
                }
              />
              <DynamicButton
                text="TUTORIALS"
                className="btn2 lg:w-[50%] md:w-[26%] text-[16px] mt-5"
                onClickFunction={() => navigate('/blogs')}
              />
            </div>
          </div>
          <div className="lg:hidden block sm:mb-10 mb-7">
            <div className="xl:text-[37px] mb-[12px] text-[32px] font-bold text-[#001A5F]">
              Send one or send
              <span className="font-beauty text-6xl font-bold">thousands</span>
            </div>
          </div>

          <div className="xl:w-[60%] lg:w-[60%] relative  w-full">
            <img
              className="lg:absolute relative xl:max-w-[800px] lg:max-w-[725px] mx-auto overflow-hidden "
              src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
            />
          </div>
        </div>

        <div className="lg:flex hidden overflow-hidden mt-[12rem] relative justify-between  max-w 5/6">
          <img
            className="h-[310px] ml-[-143px]"
            src="	https://simplynoted.com/cdn/shop/files/espiral.png?v=3800721941933214506"
          />
          <img
            className="w-[50%] mt-[-8rem] mr-[-421px]"
            src="https://simplynoted.com/cdn/shop/files/salesforce-letter-2.png?v=12785632709067599954"
          />
        </div>

        <div className="text-center relative flex justify-center lg:mt-0 mt-10">
          <h2 className="text-[#001a5f] text-center text-4xl  font-karla mb-10 signup-underline">
            Integration Feature
          </h2>
        </div>
        <div className="lg:flex justify-center grid">
          <div className="md:mt-14 mt-0">
            <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/calculator-why-1.png?v=1611260064" />
            <h2 className="w-[271px] text-center">
              Our team of handwriting robots will help you engage with vast
              audiences.
            </h2>
          </div>
          <div className="mt-14">
            <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/calculator-why-2.png?v=1611260106" />
            <h2 className="w-[297px] text-center">
              Sending a letter to 1 customer or 10,000 + customers. We’ve got
              you covered!
            </h2>
          </div>
          <div className="mt-14">
            <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/calculator-why-3.png?v=1611260085" />
            <h2 className="w-[341px] text-center">
              Every handwritten card and envelope we produce is hand quality
              controlled to ensure the highest quality product possible.
            </h2>
          </div>
        </div>
        <div className="lg:flex hidden justify-evenly mt-[20px]">
          <img src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-left.png?v=1507224686358523339" />
          <img src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-center.png?v=1294751222991646381" />
          <img src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-right.png?v=17628020455828864692" />
        </div>

        <div className="flex flex-row items-center justify-center lg:w-full md:w-[90%] mx-auto mt-[70px]">
          <div className="banner-detail text-center">
            <img
              className="absolute lg:mt-[-14rem] md:mt-[-11rem] mt-[-16rem] "
              src={SalesforceIcon}
              alt="shopify"
            />

            <div className="lg:text-6xl md:text-[37px] sm:text-[28px] text-[20px] lg:mt-0 md:mt-[28px] mt-[55px] flex text-white flex-col items-center font-karla">
              Salesforce Deep Integration
              <div className="md:flex-row flex-col  lg:mt-10 md:mt-[20px]  flex md:gap-12 items-center">
                <DynamicButton
                  text="JOIN WAITLIST"
                  className="req-btn !ml-0 md:w-50%  !w-full"
                  onClickFunction={() =>
                    (window.location.href =
                      'https://zapier.com/apps/simply-noted/integrations')
                  }
                />
                <DynamicButton
                  text="USE PROCESS BUILDER"
                  className="sch-btn !ml-0 md:w-50% !w-full"
                  onClickFunction={() =>
                    (window.location.href = 'https://zapier.com/apps')
                  }
                />
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
}`