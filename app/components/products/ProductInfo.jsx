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

export function ProductInfo({
  title,
  product,
  setShow,
  show,
  setShowBox,
  editFontFamily,
  setFontFamily,
  setCustomFontName,
  editCustomFontFamily,
}) {
  console.log({product});
  const [customFonts, setCustomFonts] = useState([]);
  const [standardFontVal, setStandardFontVal] = useState('');
  const [customFontVal, setCustomFontVal] = useState('');
  const [offPrice, setOffPrice] = useState('');
  const [videoBtn, setVideoBtn] = useState(false);

  function CloseVideoComp() {
    setVideoBtn(false);
  }
  async function singleBtnCLick() {
    setShow(false);
    setSelectedFile('');
    setShowBox(true);
  }

  function setFont(e) {
    setCustomFontVal('Select Custom Font');
    setFontFamily(e);
    setStandardFontVal(e);
  }

  async function customFontFamily(id) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/fonts/getMyFonts/${id}`,
      );
      const json = await res.json();
      // console.log(json.data);
      setCustomFonts(json.data);
    } catch (error) {
      console.error(error, 'customfontError');
    }
  }

  useEffect(() => {
    let customerid = localStorage.getItem('customerId');
    let discountedCount = JSON.parse(localStorage.getItem('packageDiscount'));
    setOffPrice(discountedCount);

    customFontFamily(customerid);
  }, []);

  useEffect(() => {
    if (show) {
      localStorage.setItem('selectedOrderPurchaseQuantity', 'Bulk Purchase');
    } else {
      localStorage.setItem('selectedOrderPurchaseQuantity', 'Single Card');
    }
  }, [show]);

  function getCustomFont(val) {
    // console.log(val, 'getcustom val');
    setFontFamily(val);
    setCustomFontVal(val);
    setStandardFontVal('Select Standard Font');
    setCustomFontName(val);
  }

  return (
    <div className="flex justify-center md:w-[46%] w-[90%] md:mx-0 flex-wrap md:-mb-nav md:top-nav md:-translate-y-nav  md:pt-nav hiddenScroll md:overflow-y-scroll ">
      <section className="flex flex-col w-full gap-8 md:mx-auto md:px-0 ">
        <div className="grid">
          <Heading
            as="h1"
            className="mb-[5px] whitespace-normal text-[26px] leading-10 sm:font-semibold md:font-bold text-[#010101] font-inter"
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
              <span className="text-[#4D679F] leading-[40px] font-bold">
                ${product?.variants.nodes[0].price.amount}
              </span>
            )}
            <div className="text-[#737373] font-normal text:xs mb-[6px]">
              Save Now - Go Unlimited - $0.97 / Note
            </div>
          </div>
          <div className="flex justify-start mt-3 mb-3">
            <DynamicButton
              className={`${
                show ? 'bg-[#001a5f]' : 'bg-[#ef6e6e]'
              } w-[179px] h-[44px] rounded text-[#fff] font-semibold text-base mr-[16px] font-roboto quantitybutton`}
              text="Bulk Purchase"
              onClickFunction={() => setShow(true)}
            />
            <DynamicButton
              className={`${
                show ? 'bg-[#ef6e6e]' : 'bg-[#001a5f]'
              } w-[179px] h-[44px] rounded text-[#fff] font-semibold text-base font-roboto quantitybutton`}
              text="Single Card"
              onClickFunction={() => singleBtnCLick()}
            />
          </div>
          <div
            className="flex items-center gap-[10px] mt-[9px]"
            onClick={() => setVideoBtn(true)}
          >
            <div className="relative mb-[1.5px]">
              <FaYoutube className="underline text-[15px] self-start text-[#1B5299] font-bold" />
              <hr className="absolute border-[#1B5299] bottom-0 left-0 right-0" />
            </div>
            <a className="underline text-[#1B5299] text-base font-bold cursor-pointer">
              Watch Tutorial Video
            </a>
          </div>
          <Instruction
            isOpen={videoBtn}
            body={<VideoTutorial />}
            close={true}
            closeModal={CloseVideoComp}
          />
          {/* <div className="selectOtion mb-5 flex md:mt-[1rem]  text-[14px] text-[#1e1e1e] mt-[10px] md:gap-[10px] gap-[1rem] w-full flex-wrap">
            <div className="lg:w-[47%] w-[42%]">
              <Text className="font-bold w-[100px]">
                Standard Handwriting Style
              </Text>
              <br />
              <select
                id="font"
                className="cursor-pointer font-light md:w-[85%] rounded border-1 border-black w-full"
                value={standardFontVal}
                onChange={(e) => setFont(e.target.value)}
                placeholder="aaaa"
              >
                <option value={standardFontVal} selected disabled>
                  {standardFontVal
                    ? standardFontVal
                    : editFontFamily && !editCustomFontFamily
                    ? editFontFamily
                    : 'tarzan'}
                </option>
                {editFontFamily && editFontFamily !== 'tarzan' && (
                  <option value="tarzan" className={`font-tarzan`}>
                    Tarzan
                  </option>
                )}
                <option value="tarzan" className={`font-tarzan`}>
                  Tarzan
                </option>
                <option value="stitch" className={`font-stitch`}>
                  Stitch
                </option>
                <option value="simba" className={`font-simba`}>
                  Simba
                </option>
                <option value="roo" className={`font-roo`}>
                  Roo
                </option>
                <option value="nimo" className={`font-nimo`}>
                  Nimo
                </option>
                <option value="lumiere" className={`font-lumiere`}>
                  Lumiere
                </option>
                <option value="kaa" className={`font-kaa`}>
                  Kaa
                </option>
                <option value="kaaNew" className={`font-kaaNew`}>
                  KaaNew
                </option>
                <option value="dumbo" className={`font-dumbo`}>
                  Dumbo
                </option>
                <option value="donald" className={`font-donald`}>
                  Donald
                </option>
                <option value="aladdin" className={`font-aladdin`}>
                  Aladdin
                </option>
                <option value="belle" className={`font-belle`}>
                  Belle
                </option>
                <option value="boo" className={`font-boo`}>
                  Boo
                </option>
                <option value="cinderella" className={`font-cinderella`}>
                  Cinderella
                </option>
                <option value="copper" className={`font-copper`}>
                  Copper
                </option>
                <option value="jasmine" className={`font-jasmine`}>
                  Jasmine
                </option>
                <option value="merlin" className={`font-merlin`}>
                  Merlin
                </option>
                <option value="goofy" className={`font-goofy`}>
                  Goofy
                </option>
                <option value="hercules" className={`font-hercules`}>
                  Hercules
                </option>
                <option value="rafiki" className={`font-rafiki`}>
                  Rafiki
                </option>
                <option value="rapunzel" className={`font-rapunzel`}>
                  Rapunzel
                </option>
                <option value="ratigan" className={`font-ratigan`}>
                  Ratigan
                </option>
                <option value="sarabi" className={`font-sarabi`}>
                  Sarabi
                </option>
                <option value="scar" className={`font-scar`}>
                  Scar
                </option>
                <option value="triton" className={`font-triton`}>
                  Triton
                </option>
                <option value="woody" className={`font-woody`}>
                  Woody
                </option>
              </select>
            </div>
            <div className="md:w-[45%] w-[42%] text-[#1e1e1e] text-[14px] ">
              <Text className="font-bold">
                Custom Handwriting Style
              </Text>
              <br />
              <select
                id="Coustomfont  "
                className="cursor-pointer font-light md:w-[85%] rounded-md border-1 border-black w-full"
                value={customFontVal}
                onChange={(e) => getCustomFont(e.target.value)}
              >
                <option
                  className=""
                  value={customFontVal}
                  selected
                  disabled
                >
                  {customFontVal
                    ? customFontVal
                    : editCustomFontFamily
                    ? editCustomFontFamily
                    : 'Select Custom Font'}
                </option>
                {customFonts &&
                  customFonts.map((item) => (
                    <option value={item.fontName}>{item.fontName}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className='font-bold'>
            <Text>Optional shipping date</Text>
            <br />
            <input
              type="date"
              className="cursor-pointer font-light"
              min={new Date().toISOString().split('T')[0]}
            />
          </div> */}
        </div>
      </section>
    </div>
  );
}
