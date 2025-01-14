import FaqAccordion from '~/components/FaqAccordion';
import underline from '../../assets/Image/faq-underline.png';
import DynamicTitle from '~/components/Title';
import {defer} from '@remix-run/server-runtime';
import {seoPayload} from '~/lib/seo.server';
export async function loader({request, context}) {
  const {page} = await context.storefront.query(API_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
}

const Faq = () => {
  return (
    <>
      <div className="global-max-width-handler">
        <DynamicTitle
          title="Simply Noted FAQs"
          className={'mt-[20px] md:text-[42px] sm:text-[32px] text-[28px]'}
        />
        <div className="shadow-outer-custom md:mt-14 mt-4 w-full mx-auto">
          <FaqAccordion
            title="Do you have have business pricing / offer custom orders?"
            className=" tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Yes we do! Orders up-to 5,000 can be placed online with our normal
              pricing. For larger orders or custom orders please reach out to us
              at support@simplynoted.com."
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="What type of card / paper can you write on?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              We are proud to offer the most flexibility in the industry by
              giving our clients the ability to write on a variety paper sizes
              3x5, 4x6, 5x7, 6x9 or 8.5x11 card stock or A1, A2, A6, A7, A8, A9,
              & A10 envelope sizes. By default we use 5x7 (10x7 fold over)
              stationary & A7 envelopes. To place a custom order please reach
              out to us at support@simplynoted.com.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="How fast do you write and mail orders?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Great question! Orders that do not require custom printed card
              stock and use our in-stock stationery can be started as fast as
              the same day. Orders that require custom-designed & printed
              stationery can take up to 1-3 business days. Depending on the
              order size we can ship the same day as completion. From there USPS
              typically delivers within 3-7 business days. For large orders and
              specific turnaround times please contact us at
              support@simplynoted.com.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Do your notes have Simply Noted branding?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              NO! The person receiving this letter will think that it came from
              your desk. Simply Noted does not cobrand or use your cards to
              market our business.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="How do I format my data to submit orders?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Simply submit us your contacts address and the message you would
              like and we do the rest. We can send you a template to assist you
              or give us a call and we would be happy to help you!
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="How does Simply Noted write notes?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Glad you asked! Simply Noted has highly sophisticated software and
              autonomous robotic writing technology that produce custom,
              individualized real pen written notes on your behalf. They hold a
              really high-quality pen (in any color) and manually write each
              letter one at a time.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can I use my own stationery?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              If you are sending more than 1,000 handwritten notes per month we
              can hold onto personal stationery BUT we do recommend to let us
              print your stationery for you. Through years of testing and
              sending millions of handwritten notes we have determined the best
              paper types that produce the best and most authentic handwritten
              notes.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can you just write envelopes?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Yes! We offer business solutions for companies or individuals who
              need large quantities. Please refer to the pricing above for
              information and requirements. If you need less than 500 done
              please contact us for pricing.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can you just write cards?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Yes! Just like our envelope service we offer business solutions
              for companies or individuals who need large quantities. Please
              refer to the pricing above for information and requirements. If
              you need less than 500 done please contact us for pricing.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can I include a business card, gift card, stuffer, etc?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Absolutely! For a small monthly fee we will stuff 1 item at no
              additional cost. We only ask that you provide what you would like
              to have stuffed OR ask us about our concierge service and let us
              help you for a small additional fee.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can I use my own handwriting?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Yes! We have the ability to take your handwriting and convert it
              into its own font. To ensure that the writing is as similar as
              possible to yours we take 7-10 business days to convert your font.
              Our designers are very meticulous and thorough. There is a
              one-time additional fee of $1,500.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can I add my own signature?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Yes! We have the ability to convert your signature as well. It
              takes 3-5 business days to convert your signature. Our designers
              are very meticulous and thorough. There is a one-time additional
              fee of $250.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="What is Simply Noteds return policy?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              We offer a 15 day no questions asked return policy on
              pre-purchased credits. If your prepaid service included design,
              print, consulting, the customer would then be billed for the
              services received at fair market value including but not limited
              to design, print, consulting etc. We offer a 100% satisfaction
              guarantee, if you are not satisfied with your order we will make
              it right!
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Have a question we haven’t answered?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>Simply reach out to us at support@SimplyNoted.com</span>
          </FaqAccordion>

          <FaqAccordion
            title="Can you clean my mailing list to verify mailing addresses?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              We can clean your mailing list to improve delivery rates. Starts
              at $99
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="How long will it take for my note to be delivered?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              We use real Forever Stamps which take 3-5 business days to be
              delivered anywhere in the continental US. There is no tracking
              since we use Forever Stamps.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can you sending me tracking for my order?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Since we use real Forever Stamps there is no tracking. If we used
              a trackable mailing method your recipient would know you used a
              service to send your handwritten note AND the shipping cost would
              20x or more expensive. You can see your order status in your
              account page.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="How do I know when my order has been shipped?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              The best way for efficient communication of your order status is
              placing your order online. You will receive automated emails
              letting you know the status of your order. You can also check your
              order status in your account page when you are logged in
              FULLFILLED = SHIPPED!
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Can you ship my order directly to me?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Yes! At check out just ask (in the "Note" box) for us to ship it
              to you and give us your address. Standard drop shipping starts at
              $29 a goes up pending the size of your order. Our team will email
              you the invoice for the drop shipping, once that is paid we will
              mail your order to you!
            </span>
          </FaqAccordion>

          <FaqAccordion title="How do gift cards work?" className="tab-content md:text-[17px] text-[13px]">
            <span>
              We use real physical gift cards just as if you would. We manually
              buy and include the gift card in the handwritten note. The Gift
              Card is prepaid and will work just as if you bought the gift card.
              For limitations of that gift card please visit that vendors
              website (Amex, Visa, Starbucks, etc.).
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="How do you track open rates?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              Although we think the best reason to send a handwritten note is to
              simply thank them or show them you are thinking about them, there
              are multiple ways to track open rates. We recommend setting up a
              call tracking number, a trackable QR code or drive traffic towards
              a landing page specifically for your mailing project.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="What happens if my handwritten note is not delivered?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              If your handwritten note is not delivered to your recipient it is
              usually because the address was wrong OR incomplete. Since we use
              real forever stamps the USPS will send it to the return address
              provided on your order usually within 2 weeks.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="What happens if there is a spelling, grammar or address error on my order, will you fix it?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              If there is an error on your order that you placed, the order will
              need to be cancelled which can be done on your account page. We
              are not responsible for spelling, grammar or address errors on the
              orders you place.
            </span>
          </FaqAccordion>

          <FaqAccordion
            title="Who is responsible for bounced mail?"
            className="tab-content md:text-[17px] text-[13px]"
          >
            <span>
              When a letter bounces back, it is most likely due to a bad or
              incomplete mailing address. Simply Noted is not responsible for
              bounced mail for this reason. Please make sure that you have the
              most accurate addresses for your mailing list. We can also run
              your mailing list through the NCOA for a $100 fee to verify the
              mailing address for you. If the mailing address is correct, please
              visit your local post office for justification. We are not liable
              for mail that the post office mishandles. If there was a mistake
              on our end we will redo and send them at no charge.
            </span>
          </FaqAccordion>
        </div>
      </div>
    </>
  );
};

export default Faq;
const API_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/48360259689"){
    title
    seo{
      title
      description
    }
  }
}`;
