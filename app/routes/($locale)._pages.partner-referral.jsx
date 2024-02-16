import underline from '../../assets/Image/faq-underline.png';

const Partner_referral = () => {
  return (
    <>
      <div className="mt-10 global-max-width-handler">
        <h1 className="text-[#001a5f] text-center md:text-5xl text-3xl font-karla tracking-tight pb-[6px] mx-2">
          Submit a
          <span className="font-beauty ml-2 md:text-8xl text-6xl font-extrabold">
            referral
          </span>
        </h1>
        <div className="flex justify-center">
          <img
            className="xl:w-[28%] w-[35%] mb-[33px]"
            src={underline}
            alt="menu-underline"
          />
        </div>

        <div className="flex justify-center mt-[30px] lg:mx-auto mx-[30px]">
          <div className="wrap-referral-form">
            <form className="w-[90%] m-0 flex-row flex-wrap pb-[60px]">
              <div className="mt-10">
                <div className="underline-heading">
                  <div className="top-underline">
                    <h3 className=" text-[#001a5f] text-2xl font-karla">
                      Your Information
                    </h3>
                  </div>
                </div>

                <div className="underline-heading">
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="first-name"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="last-name"
                      placeholder="Your Last Name"
                    />
                  </div>
                </div>

                <div className="underline-heading">
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="company"
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="phone-number"
                      placeholder="Your Phone Number"
                    />
                  </div>
                </div>

                <div className="underline-heading">
                  <div className="top-underline">
                    <input
                      required=""
                      type="text"
                      name="email"
                      placeholder="Your Email Address"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="underline-heading">
                  <div className="top-underline">
                    <h3 className=" text-[#001a5f] text-2xl font-karla">
                      Referral Information
                    </h3>
                  </div>
                </div>

                <div className="underline-heading">
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="rfirst-name"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="rlast-name"
                      placeholder="Your Last Name"
                    />
                  </div>
                </div>

                <div className="underline-heading">
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="rcompany"
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="rphone"
                      placeholder="Your Phone Number"
                    />
                  </div>
                </div>

                <div className="underline-heading">
                  <div className="underline-text">
                    <input
                      required=""
                      type="text"
                      name="remail"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="underline-text">
                    <select name="volume" id="">
                      <option value="Expected Volume">Expected Volume</option>
                      <option value="100-500">100-500</option>
                      <option value="501-999">501-999</option>
                      <option value="1,000-2,499">1,000-2,499</option>
                      <option value="2,500+">2,500+</option>
                    </select>
                  </div>
                </div>

                <div className="text-center mt-10 text-white">
                  <input
                    type="submit"
                    value="Submit"
                    className="referral-button"
                    id="Form-submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner_referral;
