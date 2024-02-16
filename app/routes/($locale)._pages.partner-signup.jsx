import underline from '../../assets/Image/faq-underline.png';
import robot4 from '../../assets/Image/Robot-4.webp';
import signup_card from '../../assets/Image/signup-envelopes.webp';
import DynamicButton from '~/components/DynamicButton';
const Partner_signup = () => {
  return (
    <>
      <div className="mt-8 w-full mx-auto flex justify-center global-max-width-handler">
        <div className="relative grid lg:flex flex-wrap justify-center  gap-[50px] ">
          <div className="lg:w-[40%] w-[90%] lg:mx-0 mx-auto relative text-left mt-5">
            <h1 className="text-[#001a5f] text-center md:text-3xl text-xl font-karla tracking-tight pb-[6px] mx-2">
              Signup for the <hr />
              <span className="font-beauty ml-2 text-6xl  !leading-7 font-extrabold">
                partner
              </span>
              Program
            </h1>

            <div className="flex relative justify-center">
              <div className="signup-overview">
                <h3 className="signup-title">Partner Program Overview</h3>
                <div className="font-bold text-[#ef6e6e] text-[21px] bg-white signup-row">
                  <div className="">Referral amount</div>
                  <div className="">Commision %</div>
                </div>

                <div className="signup-row">
                  <div>$5,000 - $49,999</div>
                  <div>7.5%</div>
                </div>
                <div className="signup-row">
                  <div>$50,000 - $99,999</div>
                  <div>10%</div>
                </div>

                <div className="signup-row">
                  <div>$100,000+</div>
                  <div>12.5%</div>
                </div>

                <div className="text-center mx-auto">
                  <DynamicButton text="GET STARTED NOW" className="btn1" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] w-full  text-left mt-5 mr-auto xl:ml-auto ml-0">
            <div className="lg:inline-flex z-[-1]  hidden absolute">
              <img
                className="z-1  w-full ml-[-146px] mt-[100px]"
                src={robot4}
                alt="robot-4"
              ></img>
            </div>

            <div className="wrap-sample-form-sign ">
              <form className="hubForm" data-hs-cf-bound="true">
                <div className="mt-[3rem] text-[30px] text-center text-white leading-8">
                  Start Earning Today
                </div>
                <div className="row">
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

                <div className="row">
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

                <div className="row">
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

                <div className="row">
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

                <div className="row">
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

                <input
                  type="submit"
                  value="SIGN UP"
                  className="sample-request"
                  id="Form-submit"
                />
              </form>
            </div>
          </div>

          <div className="pt-[60ox] relative flex flex-wrap mx-[-10px] justify-center ">
            <div>
              <h2 className="text-[#001a5f] text-center text-4xl  font-karla mb-10 signup-underline">
                Program Benefits
              </h2>
              <ul className="md:columns-2 columns-1">
                <li className="programm-list">
                  Support Sales & Marketing Programs
                </li>
                <li className="programm-list">
                  Define Joint Business Opportunities
                </li>
                <li className="programm-list">
                  Provide Product and Technical Expertise
                </li>
                <li className="programm-list">
                  Training and Development Activities
                </li>
                <li className="programm-list">Access to our API </li>
                <li className="programm-list">
                  Automate with our Zapier Integration
                </li>
                <li className="programm-list">Commissions Paid Monthly</li>
                <li className="programm-list">Contract Discounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner_signup;
