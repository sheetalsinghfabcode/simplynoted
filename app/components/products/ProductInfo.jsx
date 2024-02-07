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

  function getCustomFont(val) {
    // console.log(val, 'getcustom val');
    setFontFamily(val);
    setCustomFontVal(val);
    setStandardFontVal('Select Standard Font');
    setCustomFontName(val);

    // if(val){
    // refVal.current.valueOf = "Standard Font"
    // }
    // setFont('select')
  }

  return (
    <div className="flex justify-center md:w-[46%] w-[90%] md:mx-0 mx-auto flex-wrap md:-mb-nav md:top-nav md:-translate-y-nav  md:pt-nav hiddenScroll md:overflow-y-scroll ">
      <section className="flex flex-col w-full gap-8 md:mx-auto md:px-0 ">
        <div className="grid gap-2.5">
          <Heading
            as="h1"
            className="whitespace-normal xl:text-[30px] md:text-[23px] sm:text-[34px] leading-10 text-[30px] font-semibold text-[#191919]"
          >
            {title}
          </Heading>
          {offPrice > 0 ? (
            <span className="text-[30px] text-[#1b5299] leading-[40px] font-medium">
              <span className="line-through text-[black] text-[30px] leading-[40px] ">
                ${product?.variants.nodes[0].price.amount}
              </span>
              $
              {(
                product?.variants.nodes[0].price.amount -
                (product?.variants.nodes[0].price.amount * offPrice) / 100
              ).toFixed(2)}
            </span>
          ) : (
            <span className="text-[30px] text-[#1b5299] leading-[40px] font-medium">
              $ {product?.variants.nodes[0].price.amount}
            </span>
          )}
          {/* <span className="text-[30px] text-[#1b5299] leading-[47px] font-karla">
            $ {product?.variants.nodes[0].price.amount}
          </span> */}
          {/* {vendor && (
                   <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                     )} */}
          <div className="buttonClass flex justify-start ">
            <div className="buttonDiv pr-5">
              <button
                style={{backgroundColor: show ? '#ef6e6e' : '#001a5f'}}
                className="bg-[#001a5f] text-[#fff] p-3 rounded text-[20px] font-normal"
                onClick={() => singleBtnCLick()}
              >
                Single Card
              </button>
            </div>
            <div className="gap-2">
              <button
                style={{backgroundColor: show ? '#001a5f' : '#ef6e6e'}}
                className="bg-[#ef6e6e] text-[#fff] p-3 rounded text-[20px] font-normal"
                onClick={() => setShow(true)}
              >
                Bulk Purchase
              </button>
            </div>
          </div>

          <div className="selectOtion mb-5 flex md:mt-[1rem]  text-[14px] text-[#1e1e1e] mt-[10px] md:gap-[10px] gap-[1rem] w-full flex-wrap">
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
                {/* <option value="pinocchio" className={`font-pinocchio`}>Pinocchio</option> */}
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
          </div>
        </div>
        {/* Product page Data Vieew */}
        {/* <Suspense fallback={<ProductForm variants={[]} />}>
                 <Await
                 errorElement="There was a problem loading related products"
                  resolve={variants}
                  >
                  {(resp) => (
                    <ProductForm
                      variants={resp.product?.variants.nodes || []}
                    />
                   )}
                 </Await>
                 </Suspense> */}
        {/* Return and Policy button */}
        {/* <div className="grid gap-4 py-4">
                  {descriptionHtml && (
                  <ProductDetail
                    title="Product Details"
                   content={descriptionHtml}
                   />
                  )}
                  {shippingPolicy?.body && (
                  <ProductDetail
                  title="Shipping"
                   content={getExcerpt(shippingPolicy.body)}
                   learnMore={`/policies/${shippingPolicy.handle}`}
                  />
                  )}
                  {refundPolicy?.body && (
                 <ProductDetail
                   title="Returns"
                   content={getExcerpt(refundPolicy.body)}
                   learnMore={`/policies/${refundPolicy.handle}`}
                  />
                  )}
                 </div> */}
      </section>
    </div>
  );
}
