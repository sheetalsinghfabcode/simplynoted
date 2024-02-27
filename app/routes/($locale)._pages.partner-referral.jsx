import underline from '../../assets/Image/faq-underline.png';
import DynamicTitle from '../components/Title';
import {defer} from '@remix-run/server-runtime';
import {seoPayload} from '~/lib/seo.server';
import CanvasReferral from '../../assets/Video/canvas-referral.gif';
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
  return (
    <>
      <div className="mt-10 global-max-width-handler">
        <DynamicTitle title={'Submit a '} title2={'referral'}/>

        <div className="flex justify-center md:mt-[30px] mt-5 mx-auto">
          <div className="wrap-referral-form">
            <form className="w-[90%] m-0 flex-row flex-wrap pb-[60px] font-bold">
              <div className="mt-10">
                <div className="underline-heading">
                  <div className="top-underline">
                    <h3 className=" text-[#001a5f] text-[24px] font-karla">
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
                      className=''
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

              <div className="mt-14">
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
        <div className="max-w-full relative mt-[30px] hidden 2xl:block h-[444px]">
          <div className="absolute left-[-118px]   z-[-12]">
            <img className="max-w-[1543px]" src={CanvasReferral} alt="canvas" />
          </div>
        </div>
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
