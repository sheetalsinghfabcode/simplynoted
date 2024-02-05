import React from 'react';
import CardKiller from '../../../assets/Image/Card_Keller_kwlegacy.webp';
import LogoSimplinoted from '../../../assets/Image/Your_Logo_simplinoted.webp';
import thankyou from '../../../assets/Image/thankyou.png';
import {Button} from '../Button';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import {TypeAnimation} from 'react-type-animation';

export default function Home({contentfulBanner}) {
  const Navigate = useNavigate();
  return (
    <div>
      <div className="sec-section relative lg:flex inline-block w-full overflow-x-clip lg:mt-7">
        <div className="text-center w-full">
          <div className="handwritten-notice">
            <h3 className="inline-block">
              <div className=" flex justify-center">
                <span className="md:text-[70px] w-[81%] text-[37px]">
                  Send Real Handwritten Notes to your
                </span>
                <TypeAnimation
                  sequence={[
                    'customers',
                    1000,
                    'clients',
                    1000,
                    'donors',
                    1000,
                    'prospects',
                    1000,
                  ]}
                  wrapper="span"
                  speed={30}
                  className="text-[30px] inline-block absolute lg:mt-[15px] lg:ml-[25px] ml-[15px]"
                  repeat={Infinity}
                />
                <span className="absolute bottom-[28px] border-b-2 border-[#001A5F] ml-[12px] w-[24%]"></span>
              </div>
              {/* <div>
          <div className="absolute bottom-0 border-b-4 border-[#001A5F] w-[20%]"></div></div> */}
            </h3>
          </div>
          <div className="grid lg:gap-[20px] gap-[4px] mt-[25px]">
            <div className="lg:order-none order-1">
              <h2 className="scale-starting">
                Send real handwritten notes, at scale.
                <span>
                  <b className=""> Go Unlimited, Only $0.97 </b>
                </span>
              </h2>
            </div>
            <div className="lg:inline-flex gap-[16px] mx-auto w-[100%]  w-fit relative">
              <div>
                <DynamicButton
                  text="START WRITTING!"
                  className="start-writing-button w-[100%]"
                  onClickFunction={() => Navigate('/collections/best-sellers')}
                />
              </div>

              <div>
                <DynamicButton
                  text="REQUEST A SAMPLE"
                  className="request-a-button w-[100%]"
                  onClickFunction={() =>
                    window.open(
                      'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb',
                      '_blank',
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <img
          className="logo-simplinoted"
          src={LogoSimplinoted}
          alt="LogoSimplinotedpic"
        />
        <img className="thankyou_img" src={thankyou} alt="Thankyou" />

        <img className="cars-killer" src={CardKiller} alt="CardKillerpic" />
      </div>

      <video className="video-home" autoPlay loop muted>
        <source
          src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/robots.webm?v=1650939452"
          type="video/webm"
        ></source>
      </video>
    </div>
  );
}
