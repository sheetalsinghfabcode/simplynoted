import React from 'react';
import LogoSimplinoted from '../../../assets/Image/Your_Logo_simplinoted.webp';
import RobotsNewMobileImage from '../../../assets/Image/ROBOTS-new-mobile-new.webp';
import WorkingRobots from '../../../assets/Video/working-robots.webm';
import thankyou from '../../../assets/Image/thankyou.png';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import {TypeAnimation} from 'react-type-animation';
import HomeHeroEnvelop from '../../../assets/Image/home-hero-envelopes-2.webp';
import HomeHeroEnvelopLeft from '../../../assets/Image/home-hero-envelopes-1.webp';

export default function Home() {
  const Navigate = useNavigate();
  return (
    <div className="sm-only:mt-[35px] relative tab:mt-[40px]">
      <div className="flex 2xl:items-start 2xl-only:pt-[20px] items-center flex-col tab:flex-row justify-center relative z-10 gap-[25px] overflow-hidden">
        {/* MIDDLE SECTION  */}
        <div className="flex flex-col flex-wrap justify-center items-center sm:text-[34px] text-[20px] 2xl:text-[38px] max-w-[75vw] gap-5  zx:max-w-[51%] ">
          <span className="text-center sm:leading-[45px] text-[35px] tab:text-[59px] tab:leading-[70px] leading-[40px] font-bold text-[#001a5f] tracking-[-2.07px]">
            Send Real Handwritten Notes to your
          </span>
          <div className="typewriter-bottom-line font-dente">
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
              speed={5}
              className="text-[24px] md:text-[30px] inline-block absolute bottom-[9px] typewriter-effect"
              repeat={Infinity}
            />
          </div>
          <div className="flex tab:flex-col flex-col-reverse mt-[20px]">
            <div className="flex flex-col justify-center tab:flex-row 2xl:text-[22px] text-[16px] font-normal tab:leading-[69px] -tracking-[0.65px] text-center mb-[10px] ">
              <span className="whitespace-nowrap">
                Send real handwritten notes, at scale.
              </span>
              <span className="font-bold whitespace-nowrap">
                &nbsp; Go Unlimited, Only $0.97
              </span>
            </div>
            <div className="flex flex-col tab:flex-row">
              <DynamicButton
                text="START WRITING!"
                className="start-writing-button md:mr-[10px] w-[100%]"
                onClickFunction={() => Navigate('/collections/best-sellers')}
              />

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
      <div className="overflow-hidden tab:absolute top-[2vw] w-full">
        <div className="flex justify-between">
          {/* LEFT IMAGE  */}
          <div className="w-[24vw] relative left-[-30px] hidden tab:block ">
            <img
              className="hidden tab:block max-w-[100%]"
              src={HomeHeroEnvelopLeft}
              alt="LogoSimplinotedpic"
            />
          </div>
          {/* RIGHT IMAGE */}
          <div className="my-[40px] tab:my-0 h-[50vw] tab:h-auto w-full tab:w-[24vw] relative sm:left-[-20px] tab:mt-[-2%]">
            <img
              className="absolute tab:relative sm:max-w-full max-w-[63vw] tab:max-w-full tab:left-0 sm:left-[0px] left-auto right-[37%] tab:right-auto "
              src={HomeHeroEnvelop}
              alt="CardKillerpic"
            />
            <img
              className="absolute tab:top-[80px] top-[50px] tab:right-[100px] left-[37%] tab:max-w-[39vw] max-w-[45vw] tab:hidden"
              src={thankyou}
              alt="Thankyou"
            />
          </div>
        </div>
      </div>
      <video
        className="mt-[10px] w-full sm:flex hidden"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={WorkingRobots} type="video/webm"></source>
      </video>
      <div className="sm:hidden flex mt-[20px]">
        <img
          className="lazyload"
          src={RobotsNewMobileImage}
          data-src={RobotsNewMobileImage}
          alt="Simply Noted Robots"
          width="500"
          height="119"
        />
      </div>
    </div>
  );
}
