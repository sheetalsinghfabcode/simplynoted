import business_curve from '../../assets/Image/business-line-curve2.webp';
import letter from '../../assets/Image/letter.webp';
import rice_elmore from '../../assets/Image/rick-elmore-card.png';
import amazon_card from '../../assets/Image/amazon-card.png';
import curve from '../../assets/Image/business-arrow-curve.png';
import robot4 from '../../assets/Image/Robot-4.webp';
import kw_letter from '../../assets/Image/kw-legacy-letter.webp';
import business_saleforce from '../../assets/Image/business-feature_salesforce.webp';
import business_shopify from '../../assets/Image/business-feature_shopify.webp';
import business_zapier from '../../assets/Image/business-feature_zapier.webp';
import business_integrated from '../../assets/Image/integrated-img.webp';
import business_feature from '../../assets/Image/business-feature_api.webp';
import business_arrow from '../../assets/Image/business-arrow-img.png';
import business_line from '../../assets/Image/business-line-vertical.png';
import salesforce from '../../assets/Image/Salesforce.png';
import Zapier from '../../assets/Image/Zapier.png';
import Shopify from '../../assets/Image/Shopify.png';
import Hubspot from '../../assets/Image/Hubspot.png';
import API from '../../assets/Image/API.webp';
import message_area from '../../assets/Image/message-area.webp';
import bizcard from '../../assets/Image/bizcard.webp';
import giftcard from '../../assets/Image/giftcard.webp';
import custom from '../../assets/Image/custom.webp';
import mobile_curve from '../../assets/Image/business-arrow-curve-mobile.png';
import DynamicButton from '~/components/DynamicButton';
import { useState } from 'react';
import { Section } from '~/components';
import { defer } from '@remix-run/server-runtime';
import { seoPayload } from '~/lib/seo.server';
import CanvasBuss from '../../assets/Video/canvas-buss.gif';
import { useNavigate } from '@remix-run/react';
import ReCAPTCHA from 'react-google-recaptcha';
export async function loader({ request, context }) {
  const { page } = await context.storefront.query(BUSSINESS_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({ page, url: request.url });
  return defer({
    seo,
    page,
  });
}
export default function bussniess() {
  const [integrated, setIntegrated] = useState('salesforce');
  const [customizable, setCustomizable] = useState('create_card');
  const BLOCK = { display: 'block' };
  const NONE = { display: 'none' };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company: '',
    phone: '',
    email: '',
    volume: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    referral: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleInput(event) {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;
  }

  const [verifid, setVerifid] = useState(false);

  function onChange(value) {
    if (value) {
      setVerifid(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const url = 'https://hooks.zapier.com/hooks/catch/4135261/ollrgfc/';

      const options = {
        method: 'POST',
        body: form,
      };

      const response = await fetch(url, options);
      if (response.ok) {
        setFormData({
          first_name: '',
          last_name: '',
          company: '',
          phone: '',
          email: '',
          volume: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          referral: '',
        });
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Section className="!p-0 ">
        <div className="w-[100%] pb-10 ">
          <div className="relative w-full lg:flex grid flex-wrap global-section-divider zoom">
            <img
              className="absolute lg:block hidden ml-[16.2rem] w-[500px] mt-[7.06rem] z-[-1]"
              src={business_curve}
              alt="business line"
            />
            <div className="lg:w-[40%] lg:ml-[4rem] lg:mr-0 md:w-[40%] sm:w-[55%] w-[90%] ml-auto mr-auto text-left mt-5">
              <h1 className="flex lg:flex-col flex-row md:text-[42px] sm:text-[40px] text-[22px] text-[#001A5F] font-karla font-extrabold justify-center">
                <div className="text-[42px]">
                  You
                  <span className="font-beauty ml-2 lg:text-8xl md:text-[60px] text-[50px]  font-extrabold">
                    type
                  </span>
                </div>
                <div className="lg:mt-[-30px] text-[42px] ml-[7px]">
                  We
                  <span className="font-beauty ml-2 lg:text-8xl md:text-[60px] text-[50px]  font-extrabold">
                    write
                  </span>
                </div>
              </h1>
              <p className="max-w-[350px] texts lg:mt-[20px] mt-[30px] lg:text-start text-center">
                Simply Noted puts a personal touch back into your business.
              </p>

              <div className="relative">
                <div className='relative'>
                  <img
                    className="relative h-auto  mt-[-10px] lg:w-[85%] w-full lg:ml-[-5rem]"
                    src={letter}
                    alt="Letter"
                  />
                </div>
                <div className='relative flex lg:justify-evenly  justify-between sm:mt-[-10rem] mt-[-8rem] lg:ml-[-16rem]  sm:ml-[-6rem] ml-[-2rem]'>
                  <img
                    className=" md:w-[245px]  relative h-auto  w-[170px] z-1"
                    src={rice_elmore}
                    alt=""
                  />
                  <img
                    className="relative  md:w-[235px]  w-[160px]  z-1"
                    src={amazon_card}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-[53%] lg:block flex justify-center w-full text-left lg:mt-5 md:mt-24 mt-16 ml-auto">
              <div className="lg:inline-flex z-[-1] absolute hidden">
                <img
                  className="z-1 relative w-[100%] ml-[-147px] mt-[97px]"
                  src={robot4}
                  alt="robot-4"
                ></img>
                <img
                  className="z-[-1] w-[100%] ml-[20rem] absolute overflow-x-hidden mt-[6rem]  "
                  src={kw_letter}
                  alt="kw-letter"
                ></img>
              </div>

              <div className="wrap-sample-form">
                <form
                  className="hubForm"
                  data-hs-cf-bound="true"
                  onSubmit={handleSubmit}
                >
                  <h3 className="mt-[3rem] sm:text-[28px] text-[18px] font-bold text-center text-white leading-8 mb-[25px]">
                    Request a Writing Sample Packet
                  </h3>
                  <div className="row flex">
                    <div className="white-underline ">
                      <input
                        className='p-0'
                        required
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        placeholder="First Name"
                        onChange={handleChange}
                        id="fname"
                      />
                    </div>
                    <div className="white-underline ">
                      <input
                        className='p-0'
                        required
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        id="lname"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row flex">
                    <div className="white-underline">
                      <input
                        className='p-0'
                        required
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="white-underline ">
                      <input
                        className='p-0'
                        required
                        type="tel"
                        name="phone"
                        pattern="\d{10}"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleChange}
                        onInput={handleInput}
                        placeholder="Phone Number"
                        id="phoneInput"
                      />
                    </div>
                  </div>

                  <div className="row flex">
                    <div className="white-underline ">
                      <input
                        className='p-0'
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="white-underline ">
                      <select
                        required
                        className="!text-[13px] p-0"
                        name="volume"
                        id=""
                        onChange={handleChange}
                        value={formData.volume}
                      >
                        <option value="" disabled hidden>
                          Expected Volume
                        </option>
                        <option value="100-500">100-500</option>
                        <option value="501-999">501-999</option>
                        <option value="1,000-2,499">1,000-2,499</option>
                        <option value="2,500+">2,500+</option>
                      </select>
                    </div>
                  </div>

                  <div className="row flex">
                    <div className="white-underline ">
                      <input
                        className='p-0'
                        type="text"
                        name="address"
                        value={formData.address}
                        placeholder="Street Address"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="white-underline ">
                      <input
                        className='p-0'
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="row flex">
                    <div className="white-underline">
                      <input
                        className='p-0'
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="white-underline">
                      <input
                        className='p-0'
                        required
                        type="text"
                        name="zip"
                        value={formData.zip}
                        pattern="\d{5}"
                        maxLength="5"
                        placeholder="Zip"
                        id="zip"
                        onChange={handleChange}
                        onInput={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row flex">
                    <div className="white-underline  !w-[100%]">
                      <input
                        required
                        className="!w-full !px-0 p-0"
                        type="text"
                        name="referral"
                        onChange={handleChange}
                        value={formData.referral}
                        placeholder="How did you hear about us?"
                      />
                    </div>
                  </div>
                  <ReCAPTCHA
                    sitekey="6LdZCogiAAAAAF90CyxrwcnpuKDLAXD8LG4i_WRM"
                    onChange={onChange}
                  />
                  <input
                    type="submit"
                    value="REQUEST A SAMPLE"
                    className="sample-request"
                    id="Form-submit"
                    disabled={!verifid}
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="w-full relative px-[10px] ">
            <div className="absolute z-10 top-[570px] xl:top-[661px] hidden lg:block right-[55px] xl:right-[168px] mix-blend-multiply">
              <img
                className="w-full h-[30rem] "
                src={CanvasBuss}
                alt="Computer man"
              />
            </div>
            <div className="lg:flex flex-wrap flex-row-reverse lg:mt-[65px]  grid global-section-divider">
              <div className="md:w-[70%] w-[100%] text-right lg:mx-0 mx-auto">
                <div className="inline-flex relative">
                  <div className=" mr-[-10px] lg:ml-[-6.8rem] ml-0 mt-[-12px]  ">
                    <div className="text-center">
                      <h2 className="sm:text-5xl text-2xl text-[#001A5F] font-karla font-extrabold lg:ml-[-8rem] ml-0 lg:mb-3  mb-6">
                        Integrate&nbsp;
                        <span className="font-beauty text-7xl font-extrabold sm:leading-2 leading-7">
                          and
                        </span>
                        &nbsp; Automate
                      </h2>
                      <img
                        className="lg:inline hidden absolute w-[9%]  ml-[12rem] mt-[-2.5rem] curve-line"
                        src={curve}
                        alt="curve"
                      ></img>
                    </div>

                    {/* SLIDE - SALES FORCE  */}
                    <div style={integrated === 'salesforce' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={business_saleforce}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Salesforce Integration
                            </div>
                            <div className="text-[#001a5f] text-[28px] font-bold  mt-[20px] mb-[20px">
                              Salesforce Integration
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed mt-[20px] mb-[25px]">
                              Leverage Salesforce Process Builder and easily
                              automate sending real penwritten notes based off
                              activities such as new customer, anniversary, or
                              after hitting predetermined milestones.
                            </div>
                            <DynamicButton
                              onClickFunction={() =>
                              (window.location.href =
                                'https://share.hsforms.com/1C6vknLo8RZONgXjDQhc0GQ39obb')
                              }
                              text="START INTEGRATING"
                              className="business-btn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SLIDE - Zapier */}

                    <div style={integrated === 'zapier' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={business_zapier}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Zapier Integration
                            </div>
                            <div className="text-[#001a5f] text-[30px] font-bold  mt-[20px] mb-[20px">
                              Zapier Integration
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Integrate and automate sending real handwritten
                              notes from 2,500+ softwares instantly. Request
                              access to our Zapier App today!
                            </div>
                            <DynamicButton
                              onClickFunction={() =>
                              (window.location.href =
                                'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/')
                              }
                              text="START INTEGRATING"
                              className="business-btn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SLIDE - Shopify  */}
                    <div style={integrated === 'shopify' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={business_shopify}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Shopify Integration
                            </div>
                            <div className="text-[#001a5f] text-[16px] font-bold  mt-[30px] mb-[20px">
                              Leverage Zapier to Integrate with Shopify
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Automatically send welcome new customers notes
                              to your customers. We recommend sending a
                              discount code or a personalized product
                              recommendation to encourage customer loyalty.
                            </div>
                            <DynamicButton
                              onClickFunction={() =>
                              (window.location.href =
                                'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/')
                              }
                              text="START INTEGRATING"
                              className="business-btn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SLIDE - Hubspot */}
                    <div style={integrated === 'hubspot' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={business_integrated}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center"></div>
                            <div className="text-[#001a5f] text-[26px] font-bold  mt-[30px] mb-[20px]"></div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]"></div>
                            <DynamicButton
                              // onClickFunction={() =>
                              //   navigate('/collections/best-sellers')
                              // }
                              className="business-btn "
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SLIDE - API */}
                    <div style={integrated === 'api' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={business_feature}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Api Integration
                            </div>
                            <div className="text-[#001a5f] text-[30px] font-bold mt-[20px] mb-[20px">
                              Access our Open RESTful API
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Add the Simply Noted API to your app, website or
                              software. Using this api, you can send cards to
                              users in the handwriting style of your choice,
                              with an optional gift card.
                            </div>
                            <DynamicButton
                              onClickFunction={() =>
                              (window.location.href =
                                'https://share.hsforms.com/1C6vknLo8RZONgXjDQhc0GQ39obb')
                              }
                              text="START INTEGRATING"
                              className="business-btn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-[30%] md:w-[84%] w-full lg:ml-0 ml-auto mr-auto lg:mr-0 text-center">
                <div className="lg:block hidden wrap-integrate relative z-[1] font-beauty">
                  Click these to learn more
                </div>
                <div className="lg:flex hidden item-center flex-col">
                  <img
                    className="w-[10%] 2xl:ml-[56px] ml-[60px]"
                    src={business_arrow}
                    alt="business_arrow"
                  />
                  <img
                    className="2xl:h-[400px] h-[420px] ml-[75px] absolute 2xl:mt-[110px] mt-[91px] z-[-1]"
                    src={business_line}
                    alt="business_line"
                  />
                </div>

                <div className="lg:ml-[40px] md:ml-[60px] ml-0 lg:flex-col flex flex-row gap-[3px] small:gap-[5px]">
                  <img
                    className="click-link 2xl:w-[85px] xl:w-[76px] lg:w-[30%] small:w-[65px] w-[60px] bg-[#f0f8ff] p-[10px] lg:mt-0 mt-7 rounded-full  object-contain  h-[60px] small:h-[70px] cursor-pointer "
                    style={
                      integrated === 'salesforce'
                        ? { filter: 'grayscale(0)' }
                        : { filter: 'grayscale(1)' }
                    }
                    src={salesforce}
                    alt="salesforce"
                    onClick={() => setIntegrated('salesforce')}
                  />
                  <img
                    className="click-link 2xl:w-[85px] xl:w-[76px] lg:w-[30%] small:w-[65px] w-[60px]  bg-[#f0f8ff] p-[10px] mt-7 rounded-full object-contain  h-[60px] small:h-[70px] cursor-pointer "
                    style={
                      integrated === 'zapier'
                        ? { filter: 'grayscale(0)' }
                        : { filter: 'grayscale(1)' }
                    }
                    src={Zapier}
                    alt="Zapier"
                    onClick={() => setIntegrated('zapier')}
                  />
                  <img
                    className="click-link 2xl:w-[85px] xl:w-[76px] lg:w-[30%] small:w-[65px] w-[60px] bg-[#f0f8ff] p-[10px] mt-7 rounded-full object-contain  h-[60px] small:h-[70px] cursor-pointer "
                    style={
                      integrated === 'shopify'
                        ? { filter: 'grayscale(0)' }
                        : { filter: 'grayscale(1)' }
                    }
                    src={Shopify}
                    alt="Shopify"
                    onClick={() => setIntegrated('shopify')}
                  />
                  <img
                    className="click-link 2xl:w-[85px] xl:w-[76px] lg:w-[28%] small:w-[65px] w-[60px] bg-[#f0f8ff] p-[10px] mt-7 rounded-full cursor-pointer  h-[60px] small:h-[70px]"
                    style={
                      integrated === 'hubspot'
                        ? { filter: 'grayscale(0)' }
                        : { filter: 'grayscale(1)' }
                    }
                    src={Hubspot}
                    alt="Hubspot"
                    onClick={() => setIntegrated('hubspot')}
                  />
                  <img
                    className="click-link 2xl:w-[85px] xl:w-[76px] lg:w-[28%] small:w-[65px] w-[60px] bg-[#f0f8ff] lg:p-[10px] p-[13px] mt-7 rounded-full cursor-pointer h-[60px] small:h-[70px]"
                    style={
                      integrated === 'api'
                        ? { filter: 'grayscale(0)' }
                        : { filter: 'grayscale(1)' }
                    }
                    src={API}
                    alt="API"
                    onClick={() => setIntegrated('api')}
                  />
                </div>
              </div>
              <div className="lg:hidden flex justify-center text-[14px]">
                <img
                  className="w-[7%]"
                  src={mobile_curve}
                  alt="mobile curve"
                />
                <span className="mt-[20px] ml-[5px] text-[15px] font-medium">
                  Click a Bubble to Learn More
                </span>
              </div>

              <div className="lg:hidden block sm:w-[80%] w-full mx-auto text-center mt-8">
                <div style={integrated === 'salesforce' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] sm:text-[30px] text-[22px] font-bold  mt-[20px] mb-[20px">
                    Salesforce Integration
                  </div>
                  <div className="texts  mt-[20px] mb-[25px] text-justify">
                    Leverage Salesforce Process Builder and easily automate
                    sending real penwritten notes based off activities such as
                    new customer, anniversary, or after hitting predetermined
                    milestones.
                  </div>
                  <DynamicButton
                    onClickFunction={() =>
                    (window.location.href =
                      'https://share.hsforms.com/1C6vknLo8RZONgXjDQhc0GQ39obb')
                    }
                    text="START INTEGRATING"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px] "
                  />
                </div>

                <div style={integrated === 'zapier' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] sm:text-[30px] text-[24px] font-bold mt-[20px] mb-[20px">
                    Zapier Integration
                  </div>
                  <div className="texts mt-[20px] mb-[25px] text-justify">
                    Integrate and automate sending real handwritten notes from
                    2,500+ softwares instantly. Request access to our Zapier
                    App today!
                  </div>
                  <DynamicButton
                    onClickFunction={() =>
                    (window.location.href =
                      'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/')
                    }
                    text="START INTEGRATING"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px]"
                  />
                </div>
                <div style={integrated === 'shopify' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] md:text-[30px] sm:text-[20px] text-[18px] font-bold mt-[20px] mb-[20px">
                    Leverage Zapier to Integrate with Shopify
                  </div>
                  <div className="texts  mt-[20px] mb-[25px] text-justify">
                    Automatically send welcome new customers notes to your
                    customers. We recommend sending a discount code or a
                    personalized product recommendation to encourage customer
                    loyalty.
                  </div>
                  <DynamicButton
                    onClickFunction={() =>
                    (window.location.href =
                      'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/')
                    }
                    text="START INTEGRATING"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px]"
                  />
                </div>
                <div style={integrated === 'hubspot' ? BLOCK : NONE}>
                  <DynamicButton className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px] " />
                </div>
                <div style={integrated === 'api' ? BLOCK : NONE}>
                  <div className="text-[#001a5f]  sm:text-[30px] small:text-[24px] text-[20px] font-bold  mt-[20px] mb-[20px">
                    Access our Open RESTful API
                  </div>
                  <div className="texts  mt-[20px] mb-[25px] text-justify">
                    Add the Simply Noted API to your app, website or software.
                    Using this api, you can send cards to users in the
                    handwriting style of your choice, with an optional gift
                    card.
                  </div>
                  <DynamicButton
                    onClickFunction={() =>
                    (window.location.href =
                      'https://share.hsforms.com/1C6vknLo8RZONgXjDQhc0GQ39obb')
                    }
                    text="START INTEGRATING"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px]"
                  />
                </div>
              </div>
            </div>
            {/* Customizable */}
            <div className="lg:flex flex-wrap flex-row-reverse xl:mt-[260px] lg:mt-[135px] mt-7 grid global-section-divider">
              <div className="md:w-[70%] w-full text-right lg:mx-0 mx-auto">
                <div className="inline-flex relative">
                  <div className=" mr-[-10px] lg:ml-[-6.8rem] ml-0 mt-[-12px] ">
                    <div className="text-center">
                      <div className="sm:text-5xl text-3xl text-[#001A5F] font-karla font-extrabold lg:ml-[-8rem] ml-0 lg:mb-3 mb-6">
                        Fully
                        <span className="font-beauty sm:text-7xl ml-2 text-5xl font-extrabold sm:leading-2 leading-7">
                          Customizable
                        </span>
                      </div>
                      <img
                        className="lg:inline hidden absolute w-[7.5%]  ml-[6.5rem] mt-[-2.5rem] curve-line"
                        src={curve}
                        alt="curve"
                      ></img>
                    </div>
                    {/* Create a card  */}
                    <div
                      style={customizable === 'create_card' ? BLOCK : NONE}
                    >
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={message_area}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Custom Request
                            </div>
                            <div className="text-[#001a5f] text-[30px] font-bold mt-[20px] mb-[20px">
                              Create Your Own Card
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Simply Noted offers a wide array of cards to
                              choose from and a powerful custom create a card
                              tool. Over 95% of our clients are businesses and
                              use their own or create custom stationery.
                            </div>
                            <DynamicButton
                              text="Create a Card"
                              className="business-btn"
                              onClickFunction={() =>
                                navigate('/customise-your-card')
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* business_card */}

                    <div
                      style={customizable === 'business_card' ? BLOCK : NONE}
                    >
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={bizcard}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Gift Cards & Inserts
                            </div>
                            <div className="text-[#001a5f] text-[30px] font-bold  mt-[20px] mb-[20px">
                              Add Business Cards & Inserts
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Simply Noted makes it easy to add your business
                              cards and desired inserts. Just simply contact
                              us and we will house your items in our warehouse
                              to be added as needed.
                            </div>
                            <DynamicButton
                              text="START SENDING"
                              className="business-btn"
                              onClickFunction={() =>
                                navigate('/collections/cards')
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* gift_card */}
                    <div style={customizable === 'gift_card' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={giftcard}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Gift Cards
                            </div>
                            <div className="text-[#001a5f] text-[30px] font-bold mt-[20px] mb-[20px">
                              Add Gift Cards
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Simply Noted makes it easy to send gift cards
                              from your favorite stores with each order. From
                              $5 Starbucks cards to $100 Visas, there's a gift
                              card to match any budget.
                            </div>
                            <DynamicButton
                              text="START SENDING"
                              className="business-btn"
                              onClickFunction={() =>
                                navigate('/collections/cards')
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* custom_card*/}
                    <div
                      style={customizable === 'custom_card' ? BLOCK : NONE}
                    >
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={custom}
                            alt="bussiness image"
                          />
                          <div className="card-lorem lg:block hidden">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[13px] leading-6 py-[6px] px-[20px] text-center">
                              Custom request Integration
                            </div>
                            <div className="text-[#001a5f] text-[30px] font-bold  mt-[20px] mb-[20px">
                              Lorem ipsum
                            </div>
                            <div className="text-[#707070] text-[15px] leading-relaxed  mt-[20px] mb-[25px]">
                              Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et dolore magna aliquyam
                              erat, sed diam voluptua. At vero eos et accusam
                              et justo duo dolores et ea rebum.
                            </div>
                            <DynamicButton
                              text="START INTEGRATING"
                              className="business-btn"
                              onClickFunction={() =>
                                navigate('/pages/business')
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-[30%] md:w-[77%] w-full  lg:ml-0 ml-auto mr-auto lg:mr-0 text-center">
                <div className="lg:block hidden wrap-integrate relative z-[1] font-beauty">
                  Click these to learn more
                </div>
                <div className="lg:flex hidden item-center flex-col">
                  <img
                    className="w-[10%] ml-[65px]"
                    src={business_arrow}
                    alt="business_arrow"
                  />
                  <img
                    className="2xl:h-[375px] h-[349px] 2xl:ml-[82px] xl:ml-[6.5%] lg:ml-[6.8%] absolute 2xl:mt-[110px] mt-[88px] z-[-1]"
                    src={business_line}
                    alt="business_line"
                  />
                </div>

                <div className="md:ml-[40px] ml-0 lg:flex-col flex flex-row gap-[3px] small:gap-[5px]">
                  <div
                    className="click-link xl:w-[22%] lg:w-[26%] lg:mt-0 mt-7 w-[70px] h-[70px] font-semibold bg-[#f0f8ff] 2xl:p-[40px] flex justify-center items-center 2xl:text-[16px] p-[15px] rounded-full  cursor-pointer lg:text-[14px] text-[12px] "
                    style={
                      customizable === 'create_card' ? { color: '#7F00FF' } : {}
                    }
                    onClick={() => setCustomizable('create_card')}
                  >
                    Create a Card
                  </div>
                  <div
                    className="click-link xl:w-[22%] lg:w-[26%] w-[70px] h-[70px] 2xl:p-[40px] font-semibold flex justify-center items-center 2xl:text-[16px] bg-[#f0f8ff] p-[10px] mt-7 rounded-full cursor-pointer lg:text-[14px] text-[12px]"
                    style={
                      customizable === 'business_card'
                        ? { color: '#7F00FF' }
                        : {}
                    }
                    onClick={() => setCustomizable('business_card')}
                  >
                    Business Card
                  </div>
                  <div
                    className="click-link xl:w-[22%] lg:w-[26%] w-[70px] font-semibold h-[70px] 2xl:p-[40px] flex justify-center items-center 2xl:text-[16px] bg-[#f0f8ff] p-[20px] mt-7 rounded-full cursor-pointer lg:text-[14px] text-[12px]"
                    style={
                      customizable === 'gift_card' ? { color: '#7F00FF' } : {}
                    }
                    onClick={() => setCustomizable('gift_card')}
                  >
                    Gift Card
                  </div>

                  <div
                    className="click-link xl:w-[22%] lg:w-[26%] w-[70px] h-[70px] font-semibold 2xl:p-[40px] flex justify-center items-center 2xl:text-[16px] bg-[#f0f8ff] p-[10px] mt-7 rounded-full cursor-pointer lg:text-[14px] text-[12px]"
                    style={
                      customizable === 'custom_card' ? { color: '#7F00FF' } : {}
                    }
                    onClick={() => setCustomizable('custom_card')}
                  >
                    Custom Request
                  </div>
                </div>
              </div>
              <div className="lg:hidden flex justify-center text-[14px]">
                <img
                  className="w-[7%]"
                  src={mobile_curve}
                  alt="mobile curve"
                />
                <span className="mt-[20px] ml-[5px] text-[15px] font-medium">
                  Click a Bubble to Learn More
                </span>
              </div>

              <div className="lg:hidden block sm:w-[80%] w-full mx-auto text-center mt-8">
                <div style={customizable === 'create_card' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] sm:text-[30px] text-[24px] font-bold  mt-[20px] mb-[20px]">
                    Create Your Own Card
                  </div>
                  <div className="texts mt-[20px] mb-[25px] text-justify">
                    Simply Noted offers a wide array of cards to choose from
                    and a powerful custom create a card tool. Over 95% of our
                    clients are businesses and use their own or create custom
                    stationery.
                  </div>
                  <DynamicButton
                    text="Create a Card"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px] "
                    onClickFunction={() =>
                      navigate('/customise-your-card')
                    }
                  />
                </div>

                <div style={customizable === 'business_card' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] sm:text-[30px] text-[24px] font-bold mt-[20px] mb-[20px]">
                    Add Business Cards & Inserts
                  </div>
                  <div className="texts mt-[20px] mb-[25px] text-justify">
                    Simply Noted makes it easy to add your business cards and
                    desired inserts. Just simply contact us and we will house
                    your items in our warehouse to be added as needed.
                  </div>
                  <DynamicButton
                    text="START SENDING"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px]"
                    onClickFunction={() =>
                      navigate('/collections/cards')
                    }
                  />
                </div>
                <div style={customizable === 'gift_card' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] sm:text-[30px] text-[24px]  font-bold mt-[20px] mb-[20px]">
                    Add Gift Cards
                  </div>
                  <div className="texts  mt-[20px] mb-[25px] text-justify">
                    Simply Noted makes it easy to send gift cards from your
                    favorite stores with each order. From $5 Starbucks cards
                    to $100 Visas, there's a gift card to match any budget.
                  </div>
                  <DynamicButton
                    text="START SENDING"
                    className="business-btn "
                    onClickFunction={() =>
                      navigate('/collections/cards')
                    }
                  />
                </div>

                <div style={customizable === 'custom_card' ? BLOCK : NONE}>
                  <div className="text-[#001a5f] sm:text-[30px] text-[24px] font-bold  mt-[20px] mb-[20px]">
                    Lorem ipsum
                  </div>
                  <div className="texts mt-[20px] mb-[25px] text-justify">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum.
                  </div>
                  <DynamicButton
                    text="START INTEGRATING"
                    className="business-btn lg:w-[37%] h-[50px] lg:!text-[17px] text-[14px] w-[225px]"
                    onClickFunction={() =>
                      navigate('/pages/business')
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

const BUSSINESS_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/47162753129"){
    title
    seo{
      title
      description
    }
  }
}`;
// export default Business;
