import React from 'react';
import CardKiller from '../../../assets/Image/Card_Keller_kwlegacy.webp';
import LogoSimplinoted from '../../../assets/Image/Your_Logo_simplinoted.webp';
import { Button } from '../Button';

export default function Home() {
  
  return (
    <div>
     <div className='sec-section' >
     <div className='handwritten-notice'>
      <h3>Send Real Handwritten Notes <br></br></h3>
             <p>to your____________</p>
         <h2 className='scale-starting'>Send real handwritten notes, at scale.<span><b>Starting at $3.25</b></span></h2>
         <button
          type="button"
          className='start-writing-button'>
          START WRITING!
          </button>
          <button
          type="button"
          className='request-a-button'
          onClick={() => window.open("https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb", "_blank")}
      >
          REQUEST A SAMPLE
          </button>
            </div>
    <img className='logo-simplinoted' src={LogoSimplinoted} alt="LogoSimplinotedpic"  /> 
          
       <img className='cars-killer' src={CardKiller} alt="CardKillerpic" /> 

      </div>
 
       <video className='robot-gif' autoPlay loop muted>
        <source src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/robots.webm?v=1650939452" 
         type="video/webm"></source>
       </video> 
     
    </div>
   
  );
}
