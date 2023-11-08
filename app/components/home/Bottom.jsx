import react from "react";
import DynamicButton from "../DynamicButton";
import { useNavigate } from "@remix-run/react";
const Bottom=()=>{
    const Navigate=useNavigate();
    return(
        <>
        <div className="bottom_background mt-3">
            <div className="pt-10  flex justify-center">
                <h3 className="text-4xl font-bold m-20">Ready to start writing?</h3>
           
            <div className="text-white m-20">
            <DynamicButton
                    text="REQUEST SAMPLE"
                    className="btn1"
                     onClickFunction={()=>window.location.href=("https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb")}
                
            />
              <div class="btn3 text-white ">SCHEDULE A DEMO</div>
            </div>
</div>
        </div>
        </>
    )
}

export default Bottom;