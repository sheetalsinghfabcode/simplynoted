import React from 'react';
import CardKiller from '../../../assets/Image/Card_Keller_kwlegacy.webp';
import LogoSimplinoted from '../../../assets/Image/Your_Logo_simplinoted.webp';
import thankyou from '../../../assets/Image/thankyou.png';
import { Button } from '../Button';
import DynamicButton from '../DynamicButton';
import { useNavigate } from '@remix-run/react';

export default function Home({contentfulBanner}) {

  console.log("contentfulBanner",contentfulBanner)
  const Navigate=useNavigate()
  return (
    <div>
     <div className='sec-section' >
      <div className='text-center'>
     <div className='handwritten-notice'>
      <h3 className='inline-block'>Send Real Handwritten Notes <br></br>
             to your____________</h3>
             </div>
             <div className='lg:mt-0 mt-[120px]'>
         <h2 className='scale-starting'>Send real handwritten notes, at scale.<span><b>Starting at $3.25</b></span></h2>
         </div>
         <div className='  lg:inline-flex  lg:mt-[40px]  lg:ml-0 mt-[-136px] ml-[60px] relative'>
          <div>
         <DynamicButton
                    text="START WRITTING!"
                    className="start-writing-button"
                    onClickFunction={()=>Navigate('/collections/best-sellers')}
            />
        </div>
        <div>
        <DynamicButton
                    text="REQUEST A SAMPLE"
                    className="request-a-button"
                    onClickFunction={()=>window.open("https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb", "_blank")}
                   
         />
         </div>
         </div>
            </div>
    <img className='logo-simplinoted' src={LogoSimplinoted} alt="LogoSimplinotedpic"  /> 
    <img className='thankyou_img' src={thankyou} alt="Thankyou"  /> 
          
       <img className='cars-killer' src={CardKiller} alt="CardKillerpic" /> 

      </div>
 
       <video className='video-home' autoPlay loop muted>
        <source src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/robots.webm?v=1650939452" 
         type="video/webm"></source>
       </video> 
     
    </div>
   
  );
}
