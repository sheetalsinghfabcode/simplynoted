import underline from '../../assets/Image/faq-underline.png';
import robot4 from '../../assets/Image/Robot-4.webp';
import signup_card from '../../assets/Image/signup-envelopes.webp';
import DynamicButton from '~/components/DynamicButton';
import { defer } from '@remix-run/server-runtime';
import { seoPayload } from '~/lib/seo.server';
import PartnerReferral from '../../assets/Video/partner-referral.mp4'
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
export async function loader({ request, context }) {
  const { page } = await context.storefront.query(GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({ page, url: request.url });
  return defer({
    seo,
    page,
  });
}
const Partner_signup = () => {


  const [verifid, setVerifid] = useState(false);

  function onChange(value) {
    if (value) {
      setVerifid(true);
    }
  }

  return (
    <>
      <div className=" w-full mx-auto flex justify-center global-max-width-handler">
        <div className="relative grid lg:flex flex-wrap justify-center lg:gap-[50px] sm:mt-8 mt-3">
          <div className="lg:w-[40%] w-full lg:mx-0 mx-auto relative text-left mt-5">
            <h1 className="text-[#001a5f] text-center md:text-[50px] text-4xl font-bold tracking-tight pb-[6px] mx-2 leading-[3.5rem]">
              Sign up for the <br />
              <span className="font-beauty mx-2 text-[200%]  font-extrabold ">
                partner
              </span>
              Program
            </h1>

            <div className="flex relative justify-center">
              <div className="signup-overview">
                <h3 className="signup-title">Partner Program Overview</h3>
                <div className="font-bold text-[#ef6e6e] text-[21px] signup-row flex !bg-transparent">
                  <div className="">Referral Amount</div>
                  <div className="">Commision %</div>
                </div>

                <div className="signup-row flex">
                  <div className='text-[21px]'>$5,000 - $49,999</div>
                  <div className='text-[21px]'>7.5%</div>
                </div>
                <div className="signup-row flex">
                  <div className='text-[21px]'>$50,000 - $99,999</div>
                  <div className='text-[21px]'>10%</div>
                </div>

                <div className="signup-row flex">
                  <div className='text-[21px]'>$100,000+</div>
                  <div className='text-[21px]'>12.5%</div>
                </div>

                <div className="text-center mx-auto">
                  <DynamicButton text="GET STARTED NOW" className="btn1 py-[15px] px-[6px] md:w-[320px] w-[200px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] w-full  text-left md:mt-5  xl:ml-auto ml-0">
            <div className="lg:inline-flex z-[-1]  hidden absolute">
              <img
                className="z-1  w-full ml-[-146px] mt-[100px]"
                src={robot4}
                alt="robot-4"
              ></img>
            </div>

            <div className="wrap-sample-form-sign ">
              <form className="hubForm" data-hs-cf-bound="true">
                <div className="mt-[3rem] text-[30px] text-center text-white leading-8 font-medium pb-4">
                  Start Earning Today
                </div>
                <div className="row flex">
                  <div className="white-underline">
                    <input
                      required=""
                      type="text"
                      name="first-name"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="white-underline">
                    <input
                      required=""
                      type="text"
                      name="last-name"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="row flex">
                  <div className="white-underline">
                    <input type="text" name="company" placeholder="Company" />
                  </div>
                  <div className="white-underline">
                    <input
                      required=""
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      id=""
                    />
                  </div>
                </div>

                <div className="row flex">
                  <div className="white-underline">
                    <input
                      required=""
                      type="email"
                      name="email-address"
                      placeholder="Email"
                    />
                  </div>
                  <div className="white-underline">
                    <select name="volume" id="">
                      <option value="Expected Volume">Expected Volume</option>
                      <option value="100-500">100-500</option>
                      <option value="501-999">501-999</option>
                      <option value="1,000-2,499">1,000-2,499</option>
                      <option value="2,500+">2,500+</option>
                    </select>
                  </div>
                </div>

                <div className="row flex">
                  <div className="white-underline">
                    <input
                      type="text"
                      name="Street Address"
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="white-underline">
                    <input
                      required=""
                      type="tel"
                      name="City"
                      placeholder="City"
                      id=""
                    />
                  </div>
                </div>

                <div className="row flex">
                  <div className="white-underline">
                    <input type="text" name="State" placeholder="State" />
                  </div>
                  <div className="white-underline">
                    <input
                      required=""
                      type="tel"
                      name="Zip"
                      placeholder="Zip"
                      id=""
                    />
                  </div>
                </div>

                <div className="white-underline !w-[90%]">
                  <input
                    className="!w-full"
                    type="text"
                    name="company"
                    placeholder="How did you hear about us?"
                  />
                </div>
                <ReCAPTCHA
                          sitekey="6LdZCogiAAAAAF90CyxrwcnpuKDLAXD8LG4i_WRM"
                          onChange={onChange}
                        />
                <input
                  type="submit"
                  disabled={!verifid}
                  value="SIGN UP"
                  className="sample-request"
                  id="Form-submit"
                />
              </form>
            </div>
          </div>

          <div className="lg:pt-0 pt-[60px] relative flex flex-wrap mx-[-10px] justify-center ">
            <div>
              <h2 className="text-[#001a5f] text-center text-[40px]  font-bold mb-10 signup-underline">
                Program Benefits
              </h2>
              <ul className="grid tab:grid-cols-2 gap-4 gap-x-8 max-sm:ml-6">
                <li className="programm-list !mb-0 !p-0">
                  Support Sales & Marketing Programs
                </li>
                <li className="programm-list !mb-0 !p-0">Access to our API </li>
                <li className="programm-list !mb-0 !p-0">
                  Define Joint Business Opportunities
                </li>

                <li className="programm-list !mb-0 !p-0">
                  Automate with our Zapier Integration
                </li>
                <li className="programm-list !mb-0 !p-0">
                  Provide Product and Technical Expertise
                </li>
                <li className="programm-list !mb-0 !p-0">Commissions Paid Monthly</li>
                <li className="programm-list !mb-0 !p-0">
                  Training and Development Activities
                </li>


                <li className="programm-list !mb-0 !p-0">Contract Discounts</li>
              </ul>
            </div>
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

export default Partner_signup;
const GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/73125462121"){
    title
    seo{
      title
      description
    }
  }
}`;
