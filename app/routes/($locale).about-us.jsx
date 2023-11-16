import about_underline from "../../assets/Image/about-underline.png";
import machine from "../../assets/Image/unnamed.webp";
import automate_scale from "../../assets/Image/about-img.webp";
const AboutUs=()=>{
    return(
        <>
      <div>
        <div className="mt-10">
            <div className="m-auto max-w-[900px] px-[15px]">
                <div className="video-text">
                   <h2 className="text-center capitalize text-[37px] text-[#001a5f] font-karla"> Meet Simply Noted</h2>
                   <img className="w-[40%] ml-[16rem]" src={about_underline} alt="about-underline"/>
                   <p className="text-center max-w-[30rem] mt-[10px] mx-auto text-[18px] leading-5 pb-[30px] text-[#696969]">Simply Noted enhances customer relationships through the unique power of authentic handwritten notes</p>
               
               <div className="p-[20px] bg-[#0b4f8e]">
               <div className="wrapper-videos text-center relative pb-[56%] w-full overflow-hidden">
               <iframe  width="1280" height="720" src="https://www.youtube.com/embed/E_tcBL0zw2E?autoplay=1&controls=0&loop=1&playsinline=1&mute=0"  title="Simply Noted Company Introduction 2023" frameborder="0" allowfullscreen>
                #document
               </iframe>
               </div>
               </div>
                </div>

            </div>
        </div>


        <div className="max-w-[1000px] mt-[50px] mx-auto px-[15px]">
            <div className="bg-[#ee7272] p-[30px] text-white">
                <div className="flex items-center gap-[50px]">
                    <div className="w-[50%]">
                        <h2 className=" text-[37px] font-karla  leading-10 ">THE LEADER IN INNOVATION</h2>
                        <p className="mt-[8px] font-extralight text-[20px] leading-8 mr-[27px] mb-[10px]">
                        Simply Noted emerged with a purpose: to revolutionize and disrupt the handwritten notes space. Achieving this purpose called for a profound commitment to building the worlds only purposely built automated handwriting robotics unmatched in quality, capabilities, and speed. 
                        </p>
                       
                        <a className="bg-[#1b5299] text-[20px] pt-[2px] pb-[5px] px-[10px] hover:text-white" href="https://www.youtube.com/@simplynoted" target="_blank" >Learn more</a>
                   
                    </div>

                    <div className="w-[50%]">
                        <img className="max-w-full w-full" src={machine} alt="Machine"/>

                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-[1000px] mt-[50px] mx-auto px-[15px]">
            <img className="max-w-full w-full block" src={automate_scale} alt="Automate Scale"/>
        </div>
      </div>
        </>
    )
}

export default AboutUs;