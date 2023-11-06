import react from "react";
import footerlogo from"../../../assets/Image/logo-footer.webp";
import linkdin from"../../../assets/Image/Linkdin.svg";
import fb from"../../../assets/Image/fb.png";
import twitter from"../../../assets/Image/twitter.png";
const Footer=()=>{
    return(
        <>
        <div className="bg-[#2d4271]  text-white">
        <div className="row flex">
            <div className="gap-x-6 my-36 mr-20 ml-3">
                <div className="w-48"><img src={footerlogo} alt=""></img></div>
                <div className="flex mt-5">
                <img className="w-14 m-1" src={linkdin} alt=""></img>
                <img className="w-14 m-1" src={fb} alt=""></img>
                <img className="w-14 m-1" src={twitter} alt=""></img>
                </div>
            </div>
            <div className="gap-x-6 mx-20 my-36">
                <div className="text-xl font-semibold">Quick Links </div>
                <ul className="space-y-2 mt-1">
                    <li>For Agencies</li>
                    <li>Partner Signup</li>
                    <li>Partner Refferal</li>
                    <li>Refund Policy</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Our 100% Guarantee</li>
                </ul>
            </div>
            <div className="gap-x-6 mx-20 my-36">
                <div >
                    <div className="text-xl  font-semibold">Address</div>
                    <div>5025 S Ash Ave Suite B16 Tempe AZ 85282</div>
                </div>

                <div className="mt-24">
                    <div className="text-xl font-semibold">Email</div>
                    <div>support@simplynoted.com</div>
                </div>
            </div>
            
            <div className="gap-x-6 mx-20 my-36">
                <div className="text-xl font-semibold">Hours</div>
                <div>Monday-Friday</div>
                <div>9:00am - 5:00pm MST</div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Footer;