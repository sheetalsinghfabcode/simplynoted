import React from 'react';
import DynamicTitle from '~/components/Title';
export default function refundpolicy() {
  return (
    <div>
      <div className="flex justify-center md:w-full mx-auto sm:w-[90%] w-[85%]">
        <div className=" ">
          <DynamicTitle dynamicButton title="Refund policy" />
          <div className="sm:text-[14px] text-[12px]">
            <p className="mt-[25px] font-medium">RETURNS</p>
            <p className="mt-[25px] ">30-Day Return Guarantee</p>
            <p className="mt-[25px] ">
              We stand behind the quality of our products and your satisfaction
              is our top
              <br /> priority. If you are not entirely satisfied with your
              purchase for any reason, you
              <br /> have 30 days from the date of purchase to return the item
              for a full refund.
            </p>
            <p className="mt-[25px] font-medium ">Eligibility for Returns</p>
            <p className="mt-[25px] ">
              To be eligible for a return, your item must be:
            </p>
            <p className="mt-[25px] ">- Unused & not shipped</p>
            <p className="">- Accompanied by a receipt or proof of purchase.</p>

            <p className="mt-[25px] font-medium ">Non-Returnable Items</p>
            <p className="mt-[25px]  ">
              Some types of goods are exempt from being returned. These include:
            </p>
            <p className="mt-[25px]  ">- Gift cards</p>
            <p className="">- Promotional Sales or Special Discounts.</p>
            <p className="">- Personalized or custom-made items</p>
            <p className="">- Downloadable software products</p>
            <p className="">- Clearance or discounted/sale items</p>

            <p className="mt-[25px]  text-[14px] font-medium">
              How to Initiate a Return
            </p>
            <p className="mt-[25px]  ">
              1. **Contact Us**: Before sending back the item, contact our
              Customer Service team
              <br /> at support@simplynoted.com to initiate the return process.
            </p>
            <p className="mt-[25px] ">
              2. **Return Authorization**: You will receive a Return
              Authorization Number
              <br /> (RA#)
            </p>
            <p className="mt-[25px] font-medium">Refunds</p>
            <p className="mt-[25px] ">
              Once your return request is received and is eligible for return,
              we will send
              <br />
              you an email notification. If approved, your refund will be
              processed, and a<br /> credit will be automatically applied to
              your original payment method within
              <br /> 7-10 business days.
            </p>

            <p className="mt-[25px] text-[14px]">Questions?</p>
            <p className="mt-[25px] ">
              If you have any questions about our return policy, please contact
              us at:
            </p>
            <p className="mt-[25px] ">- Email: support@simplynoted.com</p>
            <p className="mt-[25px] ">
              We are always here to help and want to make sure you are
              completely
              <br /> satisfied with your purchase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
