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
      <div className="sec-section relative lg:flex inline-block w-full overflow-x-clip lg:mt-10 justify-between">
        <div className="flex flex-1 flex-col global-max-width-handler">
          <div className="handwritten-notice">
            <h3 className="md:text-[70px] flex flex-wrap gap-2 justify-center text-[37px] font-semibold">
              Send Real Handwritten Notes to your
              <span className="">
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
                  className="text-[30px] inline-block absolute typewriter-effect"
                  repeat={Infinity}
                />
                <div className="typewriter-bottom-line"></div>
              </span>
            </h3>
          </div>
          <div className="grid lg:gap-[20px] gap-[4px] mt-[25px] self-center">
            <div className="lg:order-none order-1">
              <h2 className="scale-starting">
                Send real handwritten notes, at scale.
                <span className="font-bold">&nbsp; Go Unlimited, Only $0.97</span>
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
