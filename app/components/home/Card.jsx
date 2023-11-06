import react from"react";
import { Swiper, div } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css';


import Card1 from"../../../assets/Image/Card1.webp";
import Card2 from"../../../assets/Image/Card2.webp";
import Card3 from"../../../assets/Image/Card3.webp";
import Profile1 from'../../../assets/Image/Profile1.webp';

import pen from'../../../assets/Image/pen-img.webp';
const Card=()=>{
    return(
        <>
        <div>
        <div className="bg-white  mx-56 text-center mt-5">
        <div className="pl-[25rem] pt-20 ">
            <img src={Profile1} alt="" className="w-[100px] mt-1"></img>
        </div>
        <div className="pt-5 pb-5  text-left text-sm px-28 text-[#696969] tracking-normal">
   “With the help of Simply Noted I have been able to effectively bring in business from guests who have no email/phone number on file. The amount of appreciation received from guests has been astounding!”
                </div>
                <div className="text-black pb-32 font-bold">
                    Waylon F.
                    <br/>
                    Marketing Industry

                    </div>
    </div>

    <div className="flex mx-[-10rem] mt-1">
      <div className=" w-[450px]  px-5 ml-[-8.5rem]"><img className='w-full' src={Card1} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[400px] mx-8" ><img className='w-full mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[450px] mx-8"><img className='w-full' src={Card3} alt="LogoSimplinotedpic"  /> </div>
      <div  className=" w-[390px]  "><img className='w-full ml-4 mt-[-3rem]' src={Card2} alt="LogoSimplinotedpic"  /> </div>
      </div>
   

   <div className="bg-white text-center mt-[-11rem] mb-[-12px]">
   <div className="w-[43rem] ml-[22rem] pt-60">
    <img className='w-full' src={pen} alt="LogoSimplinotedpic"  /> 
    </div>
    <div className="text-4xl font-bold text-[#001A5F]">Get your first card FREE!</div>
    <div className="text-xl pt-4 text-[#696969]">Join our email list and receive your first card free.</div>

    <div className="pt-10 pb-10">
        <form>
            <div>
            <input type="email" className="input_email" placeholder="Enter your email address" />
            <span><button type="button" className="btn1">SUBSCRIBE</button></span>
            </div>
        </form>
    </div>
   </div>
        </div>
        </>
    )
}

export default Card;