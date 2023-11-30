import SalesforceWorkflowImage from '../../assets/Image/salesforce-workflow.webp';
import SalesforceFormBgImage01 from '../../assets/Image/salesforce-form-bg-1.webp';
import SalesforceFormBgImage02 from '../../assets/Image/salesforce-form-bg-2.webp';
import SalesforceFormStampImage from '../../assets/Image/salesforce-form-stamp.avif';
import SalesforceIcon from  '../../assets/Image/salesforce-icon.png';

export default function Salesforce() {
  return (
    <section>
      <div className="flex justify-center items-center">
        <div className="lg:flex grid
         mt-10" style={{maxWidth: '90%'}}>
          {/* first div left side */}
          <div className="flex-1 p-3 mr-10">
            <div className='lg:text-left text-center'>
            <span className="text-white text-xs bg-[#ef6e6e] px-2 rounded">
              COMING SOON
            </span>
            </div>
            <div className='lg:flex text-left text-center'>
            <div className="text-[35px] font-bold" style={{lineHeight: '0.75'}}>
              Salesforce{' '}
              <span
                style={{fontFamily: 'Beauty, Handwriting', fontSize: '200%'}}
              >
                Deep
              </span>{' '}
              Integration
            </div>
            </div>
            <div className='lg:flex justify-start	 justify-center'>
            <div className="font-light mt-10 mr-10 max-w-[500px]">
              We go as far as to design the type of slant, spacing and stroke
              variability that goes into a unique personalized font. We can
              control everything from the slant of the lettering, tight spacing,
              loose spacing and much more depending on what your unique style
              is.
            </div>
            </div>

            <div className="flex justify-start items-center gap-2 mt-5 mb-5">
              <button
                className="text-white p-2 bg-[#ef6e6e] px-2 pt-4 pb-4 font-bold"
                type="button"
              >
                CONNECT USING OUR PROCESS BUILDER
              </button>
              <span className="font-bold underline ml-5 text-xl">or</span>
            </div>
            {/* first div form */}
            <div className="wrap-business-banner">
              <div className="relative flex">
                <div className="formStamp">
                  <img
                    src={SalesforceFormStampImage}
                    alt="Salesforce form stamp"
                  />
                </div>
                <div className="wrap-business-form">
                  <h3 className="form-title">
                    Sign-Up for Early Access to our Deep Integration
                  </h3>
                  <p id="messageBox"></p>
                  <form className="hubForm" data-hs-cf-bound="true">
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
                        <input
                          type="text"
                          name="company"
                          placeholder="Company"
                        />
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
                          <option value="Expected Volume">
                            Expected Volume
                          </option>
                          <option value="100-500">100-500</option>
                          <option value="501-999">501-999</option>
                          <option value="1,000-2,499">1,000-2,499</option>
                          <option value="2,500+">2,500+</option>
                        </select>
                      </div>
                    </div>

                    <input
                      type="submit"
                      value="SIGN UP"
                      className="sample-request"
                      id="Form-submit"
                    />
                  </form>
                </div>
                <div className="formBgBg absolute">
                  <img src={SalesforceFormBgImage02} />
                </div>
              </div>
            </div>
          </div>
          {/* first div right side */}
          <div className="flex-1 p-3 flex flex-col gap-5 justify-center items-center">
            <div className="font-bold text-2xl mb-10">
              Current Salesforce Workflow
            </div>
            <div className="">
              <img
                className="object-contian h-full"
                src={SalesforceWorkflowImage}
                alt="Salesforce Workflow Image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='relative mt-[36px]'>
        <img className='ml-[-173px]' src="https://simplynoted.com/cdn/shop/files/salesforce-cards.png?v=5725391707754373102"/>
      </div>
      <div className="sec-shopify-cont mb-[62px] flex justify-center">
        <div className="sec-left-cont ml-[105px]">
          <div className="send-one">
            <h1>
              Send one or send <span className="italic">thousands</span>
            </h1>
          </div>
          <div className="consetetur">
            <h2>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              <br /> diam nonumy eirmod tempor invidunt ut labore et dolore
              <br /> magna aliquyam erat, sed diam voluptua.
            </h2>
          </div>
          <div className="button-tutorial-now flex gap-12">
            <button className="intigrate-button" type="button">
              INTEGRATE NOW
            </button>
            <button className="tutorials" type="button">
              TUTORIALS
            </button>
          </div>
        </div>
        <div className="sec-right-cont mt-[20px]">
          <img
            className="w-[747px]"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
      </div>
      <div className='flex justify-between mb-[64px]'>
          <img className='h-[466px] ml-[-188px]' src="https://simplynoted.com/cdn/shop/files/salesforce-cards-1.png?v=6344989565106697086"/>
          <img className='h-[449px] mr-[-292px]' src="https://simplynoted.com/cdn/shop/files/salesforce-letter-1.png?v=14369353811488978466"/>
        </div>
        <div className="thrid-shopify-cont flex justify-center">
        <div className="sec-left-cont mb-[123px]">
          <img
            className="w-[747px]"
            src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/salesforce-2.png?v=1611259750"
          />
        </div>
        <div className="sec-right-cont mt-[20px] mr-[105px]">
          <div className="send-one">
            <h1>
              Send one or send <span className="italic">thousands</span>
            </h1>
          </div>
          <div className="consetetur">
            <h2>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              <br /> diam nonumy eirmod tempor invidunt ut labore et dolore
              <br /> magna aliquyam erat, sed diam voluptua.
            </h2>
          </div>
          <div className="button-tutorial-now flex gap-12">
            <button className="intigrate-button" type="button">
              INTEGRATE NOW
            </button>
            <button className="tutorials" type="button">
              TUTORIALS
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-[20px]'>
        <img className='h-[374px] ml-[-123px]' src="	https://simplynoted.com/cdn/shop/files/espiral.png?v=3800721941933214506"/>
        <img className='h-[374px] mr-[-173px]' src="https://simplynoted.com/cdn/shop/files/salesforce-letter-2.png?v=12785632709067599954"/>
      </div>
      <div className='text-center'>
        <h1 className='text-[38px] mb-[67px] font-semibold text-blue-900'>Integration Features</h1>
      </div>
      <div className='flex justify-center'>
        <div>
        <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/calculator-why-1.png?v=1611260064"/>
        <h2 className='w-[271px]'>Our team of handwriting robots will help you engage with vast audiences.</h2>
        </div>
        <div>
        <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/calculator-why-2.png?v=1611260106"/>
        <h2 className='w-[297px]'>Sending a letter to 1 customer or 10,000 + customers. We’ve got you covered!</h2>
        </div>
        <div>
        <img src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/calculator-why-3.png?v=1611260085"/>
        <h2 className='w-[341px]'>Every handwritten card and envelope we produce is hand quality controlled to ensure the highest quality product possible.</h2>
        </div>
      </div>
      <div className='flex justify-evenly mt-[20px]'>
        <img src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-left.png?v=1507224686358523339"/>
        <img src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-center.png?v=1294751222991646381"/>
        <img src="https://simplynoted.com/cdn/shop/files/salesforce-arrow-right.png?v=17628020455828864692"/>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="banner-detail text-center">
          <img className="mx-auto mb-6" src={SalesforceIcon} alt="apier" />
          <h1 className="text-6xl flex text-white flex-col items-center">
          Salesforce Deep Integration
            <div className="button-tutorial-now mt-10 text-xl p-[12px] flex gap-12">
              <button className="integrate-button w-[247px]  p-[12px] bg-rose-500 " type="button">
              JOIN WAITLIS
              </button>
              <button className="tutorial w-[247px] text-large  p-[12px] ring ring-white-500" type="button">
              USE PROCESS BUILDER
              </button>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
}
