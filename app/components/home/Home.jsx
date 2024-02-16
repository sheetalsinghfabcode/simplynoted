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
      <div className="xl:flex inline-block w-full overflow-x-clip  justify-between items-center mt-[35px]">
        <div className="flex-1 lg:-ml-[30px]">
          <img
            className="hidden xl:block -rotate-6 max-w-[381px] mt-[35px]"
            src={LogoSimplinoted}
            alt="LogoSimplinotedpic"
          />
        </div>
        <div className="flex flex-2 flex-col global-max-width-handler">
          <div className=" flex gap-4 items-center justify-center flex-wrap text-[50px] text-[#001a5f] font-bold whitespace-nowrap">
            Send Real Handwritten Notes to your
            <div className="typewriter-bottom-line">
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
                className="text-[30px] inline-block absolute bottom-[9px] typewriter-effect"
                repeat={Infinity}
              />
            </div>
          </div>
          <div className="grid xl:gap-[20px] gap-[4px] self-center lg:mb-[95px]">
            <div className="xl:order-none order-1">
              <h2 className="scale-starting">
                Send real handwritten notes, at scale.
                <span className="font-bold">
                  &nbsp; Go Unlimited, Only $0.97
                </span>
              </h2>
            </div>
            <div className="xl:inline-flex gap-[16px] mx-auto w-[100%]  w-fit relative">
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

        <div className="flex-1 flex justify-end">
          <img
            className="hidden xl:block -rotate-6 max-w-[381px]"
            src={CardKiller}
            alt="CardKillerpic"
          />
        </div>
        <div className="flex-1 xl:hidden">
          <img className="thankyou_img" src={thankyou} alt="Thankyou" />
        </div>
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
