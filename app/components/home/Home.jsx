import React from 'react';
import CardKiller from '../../../assets/Image/Card_Keller_kwlegacy.webp';
import LogoSimplinoted from '../../../assets/Image/Your_Logo_simplinoted.webp';
import WorkingRobots from '../../../assets/Video/working-robots.webm';
import thankyou from '../../../assets/Image/thankyou.png';
import DynamicButton from '../DynamicButton';
import {useNavigate} from '@remix-run/react';
import {TypeAnimation} from 'react-type-animation';

export default function Home() {
  const Navigate = useNavigate();
  return (
    <div className="sm-only:mt-[35px]">
      <div className="flex 2xl:items-start items-center flex-col tab:flex-row justify-center tab:justify-between  gap-[25px] overflow-hidden">
        {/* LEFT IMAGE  */}
        <div>
          <img
            className="hidden tab:block -rotate-6 max-w-[24vw] mt-[35px]"
            src={LogoSimplinoted}
            alt="LogoSimplinotedpic"
          />
        </div>
        {/* MIDDLE SECTION  */}
        <div className="flex flex-col flex-wrap justify-center items-center sm:text-[34px] text-[20px] 2xl:text-[38px] max-w-[75vw] gap-5 2xl:mt-[50px]">
          <span className="text-center sm:leading-[45px] leading-7 font-bold text-[#001a5f]">
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
            <div className="flex flex-col justify-center tab:flex-row text-[15px] font-normal leading-[25px] -tracking-[0.65px] text-center mb-[10px]">
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
        {/* RIGHT IMAGE */}
        <div className="w-full tab:w-auto relative">
          <img
            className="-rotate-6 sm:max-w-[42vw] max-w-[63vw] tab:max-w-[24vw] relative tab:left-0 sm:left-[130px] left-0"
            src={CardKiller}
            alt="CardKillerpic"
          />
          <img
            className="absolute sm:top-[80px] top-[50px] sm:right-[100px] right-0 sm:max-w-[39vw] max-w-[57vw] tab:hidden"
            src={thankyou}
            alt="Thankyou"
          />
        </div>
      </div>

      <video className="mt-[10px] w-full sm:flex hidden" autoPlay loop muted playsInline>
        <source src={WorkingRobots} type="video/webm"></source>
      </video>
      <div className='sm:hidden flex mt-[20px]'>
     <img class="lazyload" src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/ROBOTS-new-mobile-new.gif?v=1650467899" data-src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/ROBOTS-new-mobile-new.gif?v=1650467899" alt="Simply Noted Robots" width="500" height="119"/>
     </div>
    </div>
  );
}
