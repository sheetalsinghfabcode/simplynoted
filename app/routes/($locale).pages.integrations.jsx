import DynamicButton from '~/components/DynamicButton';
import IntegratedApplicatons from '../../assets/Video/integrated-applications.gif';
import RobotMailIntegration from '../../assets/Video/robot-mail-integration.webm';
import SalesforceIntegration from '../../assets/Image/integration-salesforce.webp';
import ZapierIntegrationLaptop from '../../assets/Image/integration-zapier-laptop.webp';
import ZapierIntegrationBanner from '../../assets/Image/integration-zapier-banner.webp';
import Espiral  from '../../assets/Image/espiral.png';
import Line  from '../../assets/Image/line-e.png';
import Integration from '../../assets/Image/deep-integration-stamps.png'
import WhiteZapierLogo from '../../assets/Image/white-zapier-logo.png';
import IntegrationsRedCalloutBG from '../../assets/Image/integrations-callout-red-bg.webp';
import ROIRobot from '../../assets/Image/roi-robot.webp';
import {seoPayload} from '~/lib/seo.server';
import {defer} from '@remix-run/server-runtime';


import CustomNoteRobot from '../../assets/Image/Robot-4.webp';

export async function loader({request, context}) {
  const {page} = await context.storefront.query(Shopify_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
}

const Integrations = () => {
  const FirstSection = () => {
    return (
      <div className="relative">
        <div className=" global-max-width-handler">
          {/** Desktop: first section */}
          <div className="hidden lg:flex  min-h-[539px]">
            <div className="flex flex-1 justify-center align-center pb-[70px]">
              <img
                className="p-3 object-contain "
                src={IntegratedApplicatons}
                alt="Simplynoted Integrated Applications"
              />
            </div>
            <div className="flex-1 pt-[40px] pb-[104px] mx-5">
              <h1 className="text-left text-[#001a5f] text-[40px] leading-9 font-bold my-5">
                Integrate <span className="font-beauty text-[200%]">and</span>{' '}
                automate
              </h1>
              <div className="text-[20px] text-left">
                <span className="text-[#707070] leading-normal font-normal">
                  Simply Noted integrates with your software and will do bulk
                  sends in just a few minutes of your time.
                </span>
                <div className="flex justify-start mt-5">
                  <DynamicButton
                    text="START INTEGRATING"
                    className="bg-[#ef6e6e] text-base text-white font-semibold leading-4 py-[18px] px-[50px]"
                    onClickFunction={() =>
                      (window.location.href =
                        'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105')
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/** Mobile: first section */}
          <div className="lg:hidden">
            <div className="text-center text-[#001a5f] text-4xl leading-9 font-bold m-7">
              Integrate <span className="font-beauty text-[200%]">and</span>{' '}
              automate
            </div>
            <div className="flex justify-center align-center max-h-[539px]">
              <img
                className="p-3 object-contain"
                src={IntegratedApplicatons}
                alt="Simplynoted Integrated Applications"
              />
            </div>
            <div className="text-[20px] text-center">
              <span className="text-[#707070] leading-normal font-normal p-2">
                Simply Noted integrates with your software and will do bulk
                sends in just a few minutes of your time.
              </span>
              <div className="flex justify-center mt-5">
                <DynamicButton
                  text="START INTEGRATING"
                  className="bg-[#ef6e6e] text-base text-white font-semibold leading-4 py-[18px] px-[50px]"
                  onClickFunction={() =>
                    (window.location.href =
                      'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105')
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/** Mobile: video */}
        <div className="hidden xl:block" style={{marginTop:'-26%'}}>
          <video
            src={RobotMailIntegration}
            className=" lg-tab:max-w-[550px] block ml-auto"
            autoPlay
            loop
            playsInline
            muted
          ></video>
        </div>
      </div>
    );
  };
  const SecondSection = () => {
    return (
      <div className='relative'>
      <div className=" global-max-width-handler">
        {/** Desktop: Second section */}
        <div className="hidden lg:flex align-center gap-[50px]">
          <div className="relative flex  justify-center align-center pb-[70px] lg-1xl:w-[120%] lg-1xl:ml-[-20%] mt-8" >
            <img
              className="p-3 z-20 object-contain "
              src={SalesforceIntegration}
              alt="Salesforce Integration"
            />
            <img
              className="hidden xl:block absolute -z-10 -right-[60px] bottom-[50px] w-[400px]"
              src={ROIRobot}
              alt="ROI Robot"
            />
          </div>
          <div className="lg-tab:w-1/2 pt-[40px] pb-[104px] w-full">
            <div className="text-left text-[#001a5f] text-[40px] leading-9 font-bold my-5">
              Send <span className="font-beauty text-[200%]">handwritten</span>{' '}
              notes from within Salesforce.
            </div>
            <div className="text-[20px] text-left">
              <span className="leading-normal py-2">
                Leverage Salesforce Process Builder and easily automate sending
                real penwritten notes based off activities such as new customer,
                anniversary, or after hitting predetermined milestones.
              </span>
              <div className="flex justify-left mt-5">
                <DynamicButton
                  text="START INTEGRATING"
                  className="bg-[#ef6e6e] text-base text-white font-semibold leading-4 py-[18px] px-[50px]"
                  onClickFunction={() =>
                    (window.location.href =
                      'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105')
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/** Mobile: Second section */}
        <div className="lg:hidden pt-5">
          <div className="text-center text-[#001a5f] text-4xl leading-9 font-bold m-7">
            Send <span className="font-beauty text-[200%]">handwritten</span>{' '}
            notes from within Salesforce.
          </div>
          <div className="flex justify-center align-center max-h-[539px]">
            <img
              className="p-3 object-contain"
              src={SalesforceIntegration}
              alt="Salesforce Integration"
            />
          </div>
          <div className="text-[20px] text-center">
            <span className="leading-normal p-2">
              Leverage Salesforce Process Builder and easily automate sending
              real penwritten notes based off activities such as new customer,
              anniversary, or after hitting predetermined milestones.
            </span>
            <div className="flex justify-center mt-5 mb-16">
              <DynamicButton
                text="START INTEGRATING"
                className="bg-[#ef6e6e] text-base text-white font-semibold leading-4 py-[18px] px-[50px]"
                onClickFunction={() =>
                  (window.location.href =
                    'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105')
                }
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
  const ThirdSection = () => {
    return (
      <div className="bg-[#324879]">
        {/** Desktop: Third section */}
        <div className="hidden relative xl:flex pl-[395px] min-h-[626px]">
          <div className="absolute -top-[98px] -left-[345px]">
            <img
              src={ZapierIntegrationBanner}
              alt="Zapier Integration Banner"
            />
          </div>
          <div className="flex flex-col ml-[40px] 2xl:ml-[0px] 2xl:flex-row 2xl:self-center h-full">
            <div className="flex-1 pl-[152px] 2xl:pl-[0px] pb-4 pt-[40px]  lg-tab:max-w-[480px]">
              <div className="mb-16">
                <img src={WhiteZapierLogo} alt="White Zapier Logo" />
              </div>
              <div className="text-[25px] text-white leading-7 font-medium m-7 mt-14 ml-0">
                <div className="text-[11px] font-medium mb-2">
                  ZAPIER INTEGRATION
                </div>
                Access our Zapier App today!
              </div>
              <div className="text-[18px] text-white mr-7">
                <span className="leading-normal p-2 pl-0 lg-tab:max-w-[428px]">
                  Integrate and automate sending real handwritten notes from
                  2,500+ softwares instantly. Request access to our Zapier App
                  today!
                </span>
                <div className='flex'>
                <div className="flex flex-col items-center gap-3 mt-5 ml-0 mb-2">
                  <DynamicButton
                    text="INTEGRATE WITH ZAPIER"
                    className="bg-[#ef6e6e] text-base font-semibold leading-4 py-[18px] px-[50px]"
                    onClickFunction={() =>
                      (window.location.href =
                        'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105')
                    }
                  />
                        <a
                  className="underline text-white mb-16 text-[14px]"
                  href="https://zapier.com/apps/simply-noted/integrations"
                >
                  or view all integrations
                </a>
                </div></div>
          
              </div>
            </div>
            <div className="flex-1 flex justify-center align-center mb-14">
              <img
                className="object-contain"
                src={ZapierIntegrationLaptop}
                alt="Zapier Integration"
              />
            </div>
          </div>
        </div>
        {/** Mobile: Third section */}
        <div className="global-max-width-handler text-white !mt-4">
          <div className="xl:hidden pt-3 pb-3">
            <h4 className="text-center text-[25px] leading-7 font-medium m-7 mt-14">
              Access our Zapier App today!
            </h4>
            <div className="flex justify-center align-center">
              <img
                className="p-3 object-contain"
                src={ZapierIntegrationLaptop}
                alt="Zapier Integration"
              />
            </div>
            <div className="text-[18px] text-center">
              <span className="leading-normal p-2">
                Integrate and automate sending real handwritten notes from
                2,500+ softwares instantly. Request access to our Zapier App
                today!
              </span>
              <div className="flex justify-center mt-5 mb-16">
                <DynamicButton
                  text="INTEGRATE WITH ZAPIER"
                  className="bg-[#ef6e6e] text-base font-semibold leading-4 py-[18px] px-[50px]"
                  onClickFunction={() =>
                    (window.location.href =
                      'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/?context=4136105')
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const FourthSection = () => {
    return (
      <div className="flex justify-center mt-[40px] lg:mt-[70px] mb-7 text-white">
        <div className="relative w-[663px] min-h-[344px] mr-[20px] ml-[20px]">
          <img
            class="hidden lg:block w-[115px] absolute -right-[60px] -top-[40px] z-[2]"
            src={Integration}
            alt="Stamp"
          />
          <img
            src={CustomNoteRobot}
            alt="Custom Note Robot"
            className="hidden lg:block absolute -bottom-[110px] -left-[340px] -z-10"
          />
          <img
            src={IntegrationsRedCalloutBG}
            alt="Red Callout BG"
            className="absolute top-0 bottom-0 z-[1]"
          />
          <div className="flex flex-col justify-center align-center md:min-h-[344px] z-[2] relative">
            <div className="p-4 pt-[35px] text-center font-bold sm:text-[30px] sm:p-7 sm:leading-tight lg:p-16">
              See how easy it is to access our full range of features with our
              API.
            </div>
            <div className="flex justify-center sm:mt-5 sm:mb-16 z-[2]">
              <DynamicButton
                text="View API Documents"
                className="bg-[#001A5F] text-[11px] sm:text-base lg:text-[25px] font-normal leading-4 py-[18px] px-[50px] lg:py-[20px] lg:px-[40px] rounded-md"
                onClickFunction={() =>
                  (window.location.href =
                    '/pages/api-automation')
                }
              />
            </div>
          </div>
          <img
            src={Espiral}
            alt="Espiral"
            className="absolute  hidden lg:block  right-[-130px] top-[240px] max-w-[200px]  -z-20"
          />
           <img
            src={Line}
            alt="Line"
            className="absolute hidden lg:block top-0  left-[-130px] -z-20"
          />       

        </div>
      </div>
    );
  };

  return (
    <section>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </section>
  );
};

export default Integrations;

const Shopify_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/73125527657"){
    title
    seo{
      title
      description
    }
  }
}`;

