import SalesforceWorkflowImage from '../../assets/Image/salesforce-workflow.webp';
import SalesforceFormBgImage01 from '../../assets/Image/salesforce-form-bg-1.webp';
import SalesforceFormBgImage02 from '../../assets/Image/salesforce-form-bg-2.webp';
import SalesforceFormStampImage from '../../assets/Image/salesforce-form-stamp.avif';

export default function Salesforce() {
  return (
    <section>
      <div className="flex justify-center items-center">
        <div className="flex mt-10" style={{maxWidth: '90%'}}>
          {/* first div left side */}
          <div className="flex-1 p-3 mr-10">
            <span className="text-white text-xs bg-[#ef6e6e] px-2 rounded">
              COMING SOON
            </span>
            <div className="text-6xl font-bold" style={{lineHeight: '0.75'}}>
              Salesforce{' '}
              <span
                style={{fontFamily: 'Beauty, Handwriting', fontSize: '200%'}}
              >
                Deep
              </span>{' '}
              Integration
            </div>
            <div className="font-light mt-10 mr-10 max-w-[500px]">
              We go as far as to design the type of slant, spacing and stroke
              variability that goes into a unique personalized font. We can
              control everything from the slant of the lettering, tight spacing,
              loose spacing and much more depending on what your unique style
              is.
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
    </section>
  );
}
