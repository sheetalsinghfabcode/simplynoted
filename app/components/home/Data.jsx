import react from"react";
import First from '../../../assets/Video/First.mp4';
import Second from"../../../assets/Video/Second.mp4";
import Third from"../../../assets/Video/Third.mp4";
import robot1 from"../../../assets/Image/robot.webp";
import robot2 from"../../../assets/Image/robot2.webp";
import robot3 from"../../../assets/Image/robot3.webp";
import DynamicButton from "../DynamicButton";


import { useNavigate } from "@remix-run/react";

const Data=()=>{


  const navigate = useNavigate()

    return(
        <>
        <div className="mt-10px">
      <div className="container flex mt-6">
        <div className="w-2/5 m-20 data-background">
            <div className="text-3xl font-extrabold text-[#001A5F]">Send one or send <span className="font-beauty text-7xl font-bold">thousands</span>
            </div>
            <div className="texts mt-5">Simply Noteds platform makes sending 1,000s of real penwritten notes as quick and easy as sending just 1. It has never been easier to scale your personal touch and leave lasting impressions!</div>
            <DynamicButton
                    text="START WRITTING"
                    className="btn1"
                    onClickFunction={()=>navigate('/collections/best-sellers')}
            />
            <DynamicButton
                    text="TUTORIALS"
                    className="btn2"
                    onClickFunction={()=>navigate('/blogs/news')}
            />
        </div>
        <div className="w-100  mt-10">
            <div className="robot">
            <img className='robot-img' src={robot1} alt="LogoSimplinotedpic"  /> 
            </div>
            <div className="text-right">
        <video className='robot-gif ' autoPlay loop muted>
        <source src={First} 
         type="video/webm"></source>
       </video> 
       </div>
        </div>
      </div>

      {/* Second */}

      <div className="container flex mt-6">
      <div className="w-100  mt-10 mr-96">
            <div className="robot2">
            <img className='robot-img' src={robot2} alt="LogoSimplinotedpic"  /> 
            </div>
            <div className="text-left">
        <video className='robot-gif2' autoPlay loop muted>
        <source src={Second} 
         type="video/webm"></source>
       </video> 
       </div>
        </div>
        <div className="w-2/5 m-10 data-background">
            <div className="text-4xl font-extrabold text-[#001A5F]">Unlimited card <span className="font-beauty text-7xl font-bold">options</span>
            </div>
            <div className="texts mt-5">Use our cards, send us yours or design your own! Simply Noted offers a wide array of cards to choose from and a powerful custom create a card tool. Over 95% of our clients are businesses and use their own custom stationery.</div>
           
            <DynamicButton
            onClickFunction={()=>navigate('/collections/best-sellers')}
                    text="OUR CARDS"
                    className="btn1"
            />
          
        </div>
        
      </div>



      {/* Third */}

      <div className="container flex mt-6">
        <div className="w-2/5 m-20 data-background">
            <div className="text-4xl font-extrabold text-[#001A5F]">Gift cards &<span className="font-beauty text-7xl font-bold">inserts</span>
            </div>
            <div className="texts mt-5">Simply Noted makes it easy to send gift cards from your favorite stores with each order. From $5 Starbucks cards to $100 Visas, there's a gift card to match any budget.</div>
            

            <DynamicButton
              onClickFunction={()=>navigate('/collections/best-sellers')}
                    text="START WRITTING"
                    className="btn1"
            />
           
        </div>
        <div className="w-100  mt-10">
            <div className="robot">
            <img className='robot-img' src={robot3} alt="LogoSimplinotedpic"  /> 
            </div>
            <div className="text-right">
        <video className='robot-gif ' autoPlay loop muted>
        <source src={Third} 
         type="video/webm"></source>
       </video> 
       </div>
        </div>
      </div>
      </div>
  
        </>
    )
}

export default Data;