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
import DynamicButton from '~/components/DynamicButton';
import {useState} from 'react';

const Business = () => {
  const [integrated, setIntegrated] = useState('salesforce');
  const [customizable, setCustomizable] = useState('create_card');
  const BLOCK = {display: 'block'};
  const NONE = {display: 'none'};

  return (
    <>
      <div>
        <div className="mt-5">
          <div className="w-full px-[10px] mx-auto max-w-[75%]">
            <div className="relative flex flex-wrap">
              <img
                className="absolute ml-[12.2rem] w-[515px] mt-[7.06rem]"
                src={business_curve}
                alt="business line"
              />
              <div className="w-[50%] text-left mt-5">
                <div className="text-[44px] text-[#001A5F] font-karla font-extrabold">
                  <div className="">
                    You{' '}
                    <span className="font-beauty ml-2 text-8xl font-extrabold">
                      type
                    </span>{' '}
                  </div>
                  <div className="mt-[-30px]">
                    We
                    <span className="font-beauty text-8xl ml-2 font-extrabold">
                      write
                    </span>
                  </div>
                </div>
                <p className="text-[24px] max-w-[350px] leading-8 text-[#535252] font-thin mt-[16px]">
                  Simply Noted puts a personal touch back into your business.
                </p>

                <div className="inline-flex relative">
                  <img
                    className="relative h-auto ml-[-35px] mt-[-10px] w-[460px]"
                    src={letter}
                    alt="Letter"
                  />
                  <img
                    className="absolute h-auto ml-[-150px] mt-[10rem] w-[245px] z-1"
                    src={rice_elmore}
                    alt=""
                  />
                  <img
                    className="absolute ml-[12rem] mt-[8rem] w-[235px] z-1"
                    src={amazon_card}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[50%] text-left mt-5">
                <div className="inline-flex z-[-1] absolute">
                  <img
                    className="z-1 w-[420px] ml-[-190px] mt-[71px]"
                    src={robot4}
                    alt="robot-4"
                  ></img>
                  <img
                    className="z-[-1] w-[495px] mr-[-210px] mt-[30px]"
                    src={kw_letter}
                    alt="kw-letter"
                  ></img>
                </div>

                <div className="wrap-sample-form">
                  <form className="hubForm" data-hs-cf-bound="true">
                    <div className="mt-[3rem] text-[30px] text-center text-white leading-8">
                      Request a Writing Sample Packet
                    </div>
                    <div className="row">
                      <div className="white-underline">
                        <input
                          required=""
                          type="text"
                          name="first-name"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="white-underline">
                        <input
                          required=""
                          type="text"
                          name="last-name"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="white-underline">
                        <input
                          type="text"
                          name="company"
                          placeholder="Company"
                        />
                      </div>
                      <div className="white-underline">
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
                      <div className="white-underline">
                        <input
                          required=""
                          type="email"
                          name="email-address"
                          placeholder="Email"
                        />
                      </div>
                      <div className="white-underline">
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

                    <div className="row">
                      <div className="white-underline">
                        <input
                          type="text"
                          name="Street Address"
                          placeholder="Street Address"
                        />
                      </div>
                      <div className="white-underline">
                        <input
                          required=""
                          type="tel"
                          name="City"
                          placeholder="City"
                          id=""
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="white-underline">
                        <input type="text" name="State" placeholder="State" />
                      </div>
                      <div className="white-underline">
                        <input
                          required=""
                          type="tel"
                          name="Zip"
                          placeholder="Zip"
                          id=""
                        />
                      </div>
                    </div>

                    <div className="white-underline !w-[90%]">
                      <input
                        className="!w-full"
                        type="text"
                        name="company"
                        placeholder="How did you hear about us?"
                      />
                    </div>

                    <input
                      type="submit"
                      value="SIGN UP"
                      className="sample-request"
                      id="Form-submit"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap flex-row-reverse mt-14">
              <div className="w-[70%] text-right">
                <div className="inline-flex relative">
                  <div className=" mr-[-10px] ml-[-6.8rem] mt-[-12px]">
                    <div className="text-center">
                      <div className="text-5xl text-[#001A5F] font-karla font-extrabold ml-[-8rem]">
                        Integrate{' '}
                        <span className="font-beauty text-7xl mr-2 font-extrabold">
                          and
                        </span>
                        Automate
                      </div>
                      <img
                        className="absolute w-[9%] inline ml-[12rem] mt-[-2.5rem] curve-line"
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Salesforce Integration
                            </div>
                            <div className="text-[#001a5f] text-[26px] font-bold leading-4 mt-[20px] mb-[20px">
                              Salesforce Integration
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
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
                              text="START INTEGRATE"
                              className="business-btn
                    "
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Zapier Integration
                            </div>
                            <div className="text-[#001a5f] text-[26px] font-bold leading-4 mt-[20px] mb-[20px">
                              Zapier Integration
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
                              Integrate and automate sending real handwritten
                              notes from 2,500+ softwares instantly. Request
                              access to our Zapier App today!{' '}
                            </div>
                            <DynamicButton
                              onClickFunction={() =>
                                (window.location.href =
                                  'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/')
                              }
                              text="START INTEGRATE"
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Shopify Integration
                            </div>
                            <div className="text-[#001a5f] text-[17px] font-bold leading-4 mt-[20px] mb-[20px">
                              Leverage Zapier to Integrate with Shopify
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
                              Automatically send welcome new customers notes to
                              your customers. We recommend sending a discount
                              code or a personalized product recommendation to
                              encourage customer loyalty.
                            </div>
                            <DynamicButton
                              onClickFunction={() =>
                                (window.location.href =
                                  'https://zapier.com/developer/public-invite/27690/a14b419f142ef350556c85f9ccafe775/')
                              }
                              text="START INTEGRATE"
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center"></div>
                            <div className="text-[#001a5f] text-[26px] font-bold leading-4 mt-[20px] mb-[20px]"></div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]"></div>
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Api Integration
                            </div>
                            <div className="text-[#001a5f] text-[18px] font-bold leading-4 mt-[20px] mb-[20px">
                              Access our Open RESTful API
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
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
                              text="START INTEGRATE"
                              className="business-btn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[30%] text-center">
                <div className="wrap-integrate font-beauty">
                  Click these to learn more
                </div>
                <div className="item-center flex flex-col">
                  <img
                    className="w-[10%] ml-[60px]"
                    src={business_arrow}
                    alt="business_arrow"
                  />
                  <img
                    className="h-[65%] ml-[6%] absolute mt-[82px] z-[-1]"
                    src={business_line}
                    alt="business_line"
                  />{' '}
                </div>

                <div className="ml-[40px]">
                  <img
                    className="click-link w-[30%] bg-white p-[10px] rounded-full mb-7 object-contain h-[70px] cursor-pointer "
                    style={
                      integrated === 'salesforce'
                        ? {filter: 'grayscale(0)'}
                        : {filter: 'grayscale(1)'}
                    }
                    src={salesforce}
                    alt="salesforce"
                    onClick={() => setIntegrated('salesforce')}
                  />
                  <img
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full object-contain h-[70px] cursor-pointer "
                    style={
                      integrated === 'zapier'
                        ? {filter: 'grayscale(0)'}
                        : {filter: 'grayscale(1)'}
                    }
                    src={Zapier}
                    alt="Zapier"
                    onClick={() => setIntegrated('zapier')}
                  />
                  <img
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full object-contain h-[70px] cursor-pointer "
                    style={
                      integrated === 'shopify'
                        ? {filter: 'grayscale(0)'}
                        : {filter: 'grayscale(1)'}
                    }
                    src={Shopify}
                    alt="Shopify"
                    onClick={() => setIntegrated('shopify')}
                  />
                  <img
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full cursor-pointer "
                    style={
                      integrated === 'hubspot'
                        ? {filter: 'grayscale(0)'}
                        : {filter: 'grayscale(1)'}
                    }
                    src={Hubspot}
                    alt="Hubspot"
                    onClick={() => setIntegrated('hubspot')}
                  />
                  <img
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full cursor-pointer "
                    style={
                      integrated === 'api'
                        ? {filter: 'grayscale(0)'}
                        : {filter: 'grayscale(1)'}
                    }
                    src={API}
                    alt="API"
                    onClick={() => setIntegrated('api')}
                  />
                </div>
              </div>
            </div>

            {/* Customizable */}

            <div className="flex flex-wrap flex-row-reverse mt-14">
              <div className="w-[70%] text-right">
                <div className="inline-flex relative">
                  <div className=" mr-[-10px] ml-[-6.8rem] mt-[-12px]">
                    <div className="text-center">
                      <div className="text-5xl text-[#001A5F] font-karla font-extrabold ml-[-8rem]">
                        Fully{' '}
                        <span className="font-beauty text-7xl mr-2 font-extrabold">
                          Customizable
                        </span>
                      </div>
                      <img
                        className="absolute w-[7.5%] inline ml-[6.5rem] mt-[-2.5rem] curve-line"
                        src={curve}
                        alt="curve"
                      ></img>
                    </div>

                    {/* Create a card  */}
                    <div style={customizable === 'create_card' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={message_area}
                            alt="bussiness image"
                          />
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Custom Request
                            </div>
                            <div className="text-[#001a5f] text-[26px] font-bold leading-4 mt-[20px] mb-[20px">
                              Create Your Own Card
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
                              Simply Noted offers a wide array of cards to
                              choose from and a powerful custom create a card
                              tool. Over 95% of our clients are businesses and
                              use their own or create custom stationery.
                            </div>
                            <DynamicButton
                              // onClickFunction={() =>
                              //   navigate('/collections/best-sellers')
                              // }
                              text="Create a Card"
                              className="business-btn
                    "
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Gift Cards & Inserts
                            </div>
                            <div className="text-[#001a5f] text-[26px] font-bold leading-4 mt-[20px] mb-[20px">
                              Add Business Cards & Inserts
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
                              Simply Noted makes it easy to add your business
                              cards and desired inserts. Just simply contact us
                              and we will house your items in our warehouse to
                              be added as needed.
                            </div>
                            <DynamicButton
                              // onClickFunction={() =>
                              //   navigate('/collections/best-sellers')
                              // }
                              text="START SENDING"
                              className="business-btn
                    "
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
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Gift Cards
                            </div>
                            <div className="text-[#001a5f] text-[17px] font-bold leading-4 mt-[20px] mb-[20px">
                              Add Gift Cards
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
                              Simply Noted makes it easy to send gift cards from
                              your favorite stores with each order. From $5
                              Starbucks cards to $100 Visas, there's a gift card
                              to match any budget.
                            </div>
                            <DynamicButton
                              // onClickFunction={() =>
                              //   navigate('/collections/best-sellers')
                              // }
                              text="START SENDING"
                              className="business-btn
                    "
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* custom_card*/}
                    <div style={customizable === 'custom_card' ? BLOCK : NONE}>
                      <div className="relative">
                        <div className="relative">
                          <img
                            className="max-w-100%"
                            src={custom}
                            alt="bussiness image"
                          />
                          <div className="card-lorem">
                            <div className="bg-[#001a5f] rounded-3xl text-white inline-block text-[12px] leading-6 py-[6px] px-[20px] text-center">
                              Custom request Integration
                            </div>
                            <div className="text-[#001a5f] text-[26px] font-bold leading-4 mt-[20px] mb-[20px]">
                              Lorem ipsum
                            </div>
                            <div className="text-[#9c9a9a] text-[10px] leading-5 mt-[20px] mb-[25px]">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna aliquyam erat, sed diam
                              voluptua. At vero eos et accusam et justo duo
                              dolores et ea rebum.
                            </div>
                            <DynamicButton
                              // onClickFunction={() =>
                              //   navigate('/collections/best-sellers')
                              // }

                              text="START INTEGRATE"
                              className="business-btn "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[30%] text-center">
                <div className="wrap-integrate font-beauty">
                  Click these to learn more
                </div>
                <div className="item-center flex flex-col">
                  <img
                    className="w-[10%] ml-[60px]"
                    src={business_arrow}
                    alt="business_arrow"
                  />
                  <img
                    className="h-[54%] ml-[6%] absolute mt-[82px] z-[-1]"
                    src={business_line}
                    alt="business_line"
                  />{' '}
                </div>

                <div className="ml-[40px]">
                  <div
                    className="click-link w-[30%] bg-white p-[10px] rounded-full mb-7 cursor-pointer"
                    style={
                      customizable === 'create_card' ? {color: '#7F00FF'} : {}
                    }
                    onClick={() => setCustomizable('create_card')}
                  >
                    Create a Card
                  </div>
                  <div
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full cursor-pointer"
                    style={
                      customizable === 'business_card' ? {color: '#7F00FF'} : {}
                    }
                    onClick={() => setCustomizable('business_card')}
                  >
                    Business Card
                  </div>
                  <div
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full cursor-pointer"
                    style={
                      customizable === 'gift_card' ? {color: '#7F00FF'} : {}
                    }
                    onClick={() => setCustomizable('gift_card')}
                  >
                    Gift Card
                  </div>

                  <div
                    className="click-link w-[30%] bg-white p-[10px] my-7 rounded-full cursor-pointer"
                    style={
                      customizable === 'custom_card' ? {color: '#7F00FF'} : {}
                    }
                    onClick={() => setCustomizable('custom_card')}
                  >
                    Custom Request
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Business;
