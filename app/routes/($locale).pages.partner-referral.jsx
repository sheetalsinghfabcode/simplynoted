import underline from '../../assets/Image/faq-underline.png';
import DynamicTitle from '../components/Title';
import {defer} from '@remix-run/server-runtime';
import {seoPayload} from '~/lib/seo.server';
import CanvasReferral from '../../assets/Video/canvas-referral.gif';
import PartnerReferral from '../../assets/Video/partner-referral.mp4'
import { useState } from 'react';
export async function loader({request, context}) {
  const {page} = await context.storefront.query(GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
}





      
        
const Partner_referral = () => {
const [formData, setFormData] = useState({});
const [message, setMessage] = useState('');
const [errors, setErrors] = useState('');
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const submit = async (e)=>{
  e.preventDefault();  
  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/4135261/ollrgfc/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    });

    if (response.ok) {      
      setMessage('Thanks for your submission.');
      setFormData({});
      setTimeout(()=>{
        setMessage('');
      },2500);
    } else {
      setErrors('Something went wrong. Please try again later.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    setErrors('Something went wrong. Please try again later.');
  }
}
  return (
    <>
      <div className="mt-10 global-max-width-handler z-[1]">
        <DynamicTitle title={'Submit a '} title2={'referral'}/>

        <div className="flex justify-center md:mt-[30px] mt-5 mx-auto">
          <div className="wrap-referral-form">
            <form className="w-[90%] m-0 flex-row flex-wrap pb-[60px] font-bold" onSubmit={submit}>
              <div className="mt-10">
                <div className="underline-heading">
                  <div className="top-underline">
                    <h3 className=" text-[#001a5f] text-[24px] font-karla">
                      Your Information
                    </h3>
                  </div>
                </div>
                <div className="underline-heading sm:!flex-nowrap gap-4">
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required="true"
                      type="text"
                      name="first-name"
                      className='w-full'
                      placeholder="Your First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                             

                  </div>
                  </div>
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required="true"
                      type="text"
                      name="last-name"
                      className='w-full'
                      placeholder="Your Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>
        
                  </div>
                </div>

                <div className="underline-heading sm:!flex-nowrap gap-4">
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required=""
                      type="text"
                      name="company"
                      className='w-full'
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
               
                  </div>
        
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required=""
                      type="text"
                      name="phone-number"
                      className='w-full'
                      placeholder="Your Phone Number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      
                    />
                  </div>
            
                  </div>
                </div>

                <div className="underline-heading">
                <div className='relative w-full'>
                  <div className="top-underline !pb-0">
                    <input
                      required="true"
                      type="text"
                      name="email"
                      className='w-full pl-1'
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
   
                </div>
                </div>
              </div>

              <div className="mt-14">
                <div className="underline-heading">
                  <div className="top-underline">
                    <h3 className=" text-[#001a5f] text-2xl font-karla">
                      Referral Information
                    </h3>
                  </div>
                </div>

                <div className="underline-heading sm:!flex-nowrap gap-4">
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required="true"
                      type="text"
                      name="rfirstName"
                      className='w-full'
                      placeholder="Your First Name"
                      value={formData.rfirstName}
                      onChange={handleChange}
                    />
                  </div></div>

                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required="true"
                      type="text"
                      name="rlastName"
                      className='w-full'
                      placeholder="Your Last Name"
                      value={formData.rlastName}
                      onChange={handleChange}
                    />
                  </div></div>
                </div>

                <div className="underline-heading sm:!flex-nowrap gap-4">
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required=""
                      type="text"
                      name="rcompany"
                      className='w-full'
                      placeholder="Your Company"
                      value={formData.rcompany}
                      onChange={handleChange}
                    />
                  </div></div>
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required=""
                      type="text"
                      name="rphone"
                      className='w-full'
                      placeholder="Your Phone Number"
                      value={formData.rphone}
                      onChange={handleChange}
                    />
                  </div></div>
                </div>

                <div className="underline-heading sm:!flex-nowrap gap-4">
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <input
                      required="true"
                      type="text"
                      name="remail"
                      className='w-full'
                      placeholder="Email Address"
                      value={formData.remail}
                      onChange={handleChange}
                    />
                  </div></div>
                  
                  <div className='relative w-full'>
                  <div className="underline-text !w-full">
                    <select required="true" className='w-full' name="volume" id=""
                      value={formData.volume}
                      onChange={handleChange}>
                      <option className='text-white' value="Expected Volume" disabled selected>Expected Volume</option>
                      <option className='text-white' value="100-500">100-500</option>
                      <option className='text-white' value="501-999">501-999</option>
                      <option className='text-white' value="1,000-2,499">1,000-2,499</option>
                      <option className='text-white' value="2,500+">2,500+</option>
                    </select>
                  </div></div>
                </div>

                <div className="text-center mt-10 text-white">
                  <input
                    type="submit"
                    value="Submit"
                    className="referral-button"
                    id="Form-submit"    
                  />
                </div>
                {message && (<span className='error-message'>{message}</span>)}
                {errors && (<span className='prError text-center'>{errors}</span>)}
              </div>
            </form>
          </div>
        </div>
       
      </div>
      <div className='w-full overflow-hidden'>
      <video   
                className="z-[0] w-full block overflow-hidden scale-[1.01] mix-blend-multiply"
                autoPlay
                loop
                playsInline
                muted
                nocontrols
              >
                <source src={PartnerReferral} type="video/mp4"></source>
              </video>
              </div>
    </>
  );
}; 

export default Partner_referral;
const GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/73125429353"){
    title
    seo{
      title
      description
    }
  }
}`;
