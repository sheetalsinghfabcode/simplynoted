import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  IconCaret,
  IconCheck,
  IconClose,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  Link,
  AddToCartButton,
  Heading,
  Button,
} from '../Text';
import {FaYoutube} from 'react-icons/fa';
import Instruction from '../modal/Instruction';
import {VideoTutorial} from '../VideoTutorial';
import DynamicButton from '../DynamicButton';
import {useStateContext} from '~/context/StateContext';
import ConfirmationModal from '../modal/ConfirmationModal';
// import { SERVER_BASE_URL } from '~/data/config';

export function ProductInfo({
  title,
  product,
  setShow,
  show,
  showBulkOnEdit,
  setShowBox,
  editFontFamily,
  setFontFamily,
  setCustomFontName,
  editCustomFontFamily,
}) {
  const {isbirthdayAutomated} = useStateContext();
  // const [customFonts, setCustomFonts] = useState([]);
  const [standardFontVal, setStandardFontVal] = useState('');
  const [customFontVal, setCustomFontVal] = useState('');
  const [offPrice, setOffPrice] = useState('');
  const [videoBtn, setVideoBtn] = useState(false);
  const [purchaseBtnBgColor, setPurchaseBtnBgColor] = useState({
    bulkPurchase: 'bg-[#001a5f]',
    singlePurchase: 'bg-[#ef6e6e]',
  });

  function CloseVideoComp() {
    setVideoBtn(false);
  }
  async function singleBtnCLick() {
    setShow(false);
    setShowBox(true);
  }

  function setFont(e) {
    setCustomFontVal('Select Custom Font');
    setFontFamily(e);
    setStandardFontVal(e);
  }

  // async function customFontFamily(id) {
  //   try {
  //     const res = await fetch(
  //       `${SERVER_BASE_URL}/fonts/getMyFonts/${id}`,
  //     );
  //     const json = await res.json();
  //     setCustomFonts(json.data);
  //   } catch (error) {
  //     console.error(error, 'customfontError');
  //   }
  // }

  useEffect(() => {
    let customerid = localStorage.getItem('customerId');
    let discountedCount = JSON.parse(localStorage.getItem('packageDiscount'));
    setOffPrice(discountedCount);

    // customFontFamily(customerid);
  }, []);

  useEffect(() => {
    const colorMode = {
      bulkPurchase: show ? 'bg-[#001a5f]' : 'bg-[#ef6e6e]',
      singlePurchase: show ? 'bg-[#ef6e6e]' : 'bg-[#001a5f]',
    };

    setPurchaseBtnBgColor(colorMode);

    if (show) {
      localStorage.setItem('selectedOrderPurchaseQuantity', 'Bulk Purchase');
    } else {
      localStorage.setItem('selectedOrderPurchaseQuantity', 'Single Card');
    }
  }, [show]);

  function getCustomFont(val) {
    setFontFamily(val);
    setCustomFontVal(val);
    setStandardFontVal('Select Standard Font');
    setCustomFontName(val);
  }

  return (
    <div className="flex justify-center md:w-[46%] w-[90%]  md:mx-0 flex-wrap md:-mb-nav md:top-nav md:-translate-y-nav  md:pt-nav hiddenScroll md:overflow-y-scroll ">
      <section className="flex flex-col w-full gap-8 md:mx-auto md:px-0 ">
        <div className="grid">
          <Heading
            as="h1"
            className="mb-[5px] mt-[6px] md:mt-[0px] whitespace-normal text-[26px] leading-10 font-semibold md:font-bold text-[#010101] font-inter"
          >
            {title}
          </Heading>
          <div>
            {offPrice > 0 ? (
              <span className="text-[30px] text-[#4D679F] leading-[40px] font-bold">
                <span className="line-through text-[black] font-bold leading-[40px] ">
                  ${product?.variants.nodes[0].price.amount}
                </span>
                &nbsp;$
                {(
                  product?.variants.nodes[0].price.amount -
                  (product?.variants.nodes[0].price.amount * offPrice) / 100
                ).toFixed(2)}
              </span>
            ) : (
              <span className="text-[30px] text-[#4D679F] leading-[40px] font-bold">
                ${product?.variants.nodes[0].price.amount}
              </span>
            )}
            <div className="text-[#737373] font-normal text:xs mb-[6px]">
              Save Now - Go Unlimited - $0.97 / Note
            </div>
          </div>
          <div className="purchase-btn-cont flex justify-start mt-3 mb-3">
            {isbirthdayAutomated ? (
              <span className="text-[#1b5299] text-[32px] font-bold underline">
                Birthday Automation Setup!
              </span>
            ) : (
              <>
                <DynamicButton
                  className={`bulk-purchase-btn ${purchaseBtnBgColor.bulkPurchase} w-[179px] h-[44px] rounded text-[#fff] font-semibold text-base mr-[16px] font-roboto quantitybutton`}
                  text="Bulk Purchase"
                  onClickFunction={() => setShow(true)}
                />
                <DynamicButton
                  className={`single-purchase-btn ${purchaseBtnBgColor.singlePurchase} w-[179px] h-[44px] rounded text-[#fff] font-semibold zx:mt-[0px] mt-[10px] text-base font-roboto quantitybutton`}
                  text="Single Card"
                  onClickFunction={() => singleBtnCLick()}
                />
              </>
            )}
          </div>
          <div
            className="flex items-center gap-[10px] mt-[9px]"
            onClick={() => setVideoBtn(true)}
          >
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.75 16.2002C19.75 16.3991 19.671 16.5899 19.5303 16.7305C19.3897 16.8712 19.1989 16.9502 19 16.9502H1C0.801088 16.9502 0.610322 16.8712 0.46967 16.7305C0.329018 16.5899 0.25 16.3991 0.25 16.2002C0.25 16.0013 0.329018 15.8105 0.46967 15.6699C0.610322 15.5292 0.801088 15.4502 1 15.4502H19C19.1989 15.4502 19.3897 15.5292 19.5303 15.6699C19.671 15.8105 19.75 16.0013 19.75 16.2002ZM19.75 1.9502V12.4502C19.75 12.848 19.592 13.2296 19.3107 13.5109C19.0294 13.7922 18.6478 13.9502 18.25 13.9502H1.75C1.35218 13.9502 0.970644 13.7922 0.68934 13.5109C0.408035 13.2296 0.25 12.848 0.25 12.4502V1.9502C0.25 1.55237 0.408035 1.17084 0.68934 0.889535C0.970644 0.608231 1.35218 0.450195 1.75 0.450195H18.25C18.6478 0.450195 19.0294 0.608231 19.3107 0.889535C19.592 1.17084 19.75 1.55237 19.75 1.9502ZM13.375 7.2002C13.375 7.07397 13.3431 6.94979 13.2823 6.83918C13.2215 6.72856 13.1337 6.63507 13.0272 6.56738L8.90219 3.94238C8.78881 3.87035 8.65816 3.83009 8.5239 3.82581C8.38964 3.82153 8.25669 3.85338 8.13895 3.91805C8.02121 3.98272 7.923 4.07782 7.85458 4.19342C7.78616 4.30901 7.75004 4.44087 7.75 4.5752V9.8252C7.75004 9.95952 7.78616 10.0914 7.85458 10.207C7.923 10.3226 8.02121 10.4177 8.13895 10.4823C8.25669 10.547 8.38964 10.5789 8.5239 10.5746C8.65816 10.5703 8.78881 10.53 8.90219 10.458L13.0272 7.83301C13.1337 7.76532 13.2215 7.67183 13.2823 7.56122C13.3431 7.4506 13.375 7.32642 13.375 7.2002Z"
                fill="#1B5299"
              />
            </svg>

            <a className="underline text-[#1B5299] text-[16px] font-bold cursor-pointer">
              Watch Tutorial Video
            </a>
          </div>
          <Instruction
            isOpen={videoBtn}
            body={<VideoTutorial />}
            close={true}
            closeModal={CloseVideoComp}
          />
        </div>
      </section>
    </div>
  );
}
