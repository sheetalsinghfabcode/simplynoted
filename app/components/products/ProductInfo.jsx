import React, { useState, useEffect, useRef, useCallback } from 'react';
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
export function ProductInfo({title,product,setShow,show,setShowBox,editFontFamily,setFontFamily}) {
    console.log(editFontFamily,'editFontFamily');
let selectFontValue;
    async function singleBtnCLick() {
        setShow(false)
        setSelectedFile('')
        setShowBox(true)
      }
      function setFont() {

        var selectFont = document.getElementById("font");
        selectFontValue = editFontFamily 
        // console.log(selectFontValue,selectFont);
        if (selectFont) {
          selectFontValue = selectFont.options[selectFont.selectedIndex].value;
          if (selectFontValue) {
        console.log(selectFontValue);

            document.getElementById("messageBoxID").style.fontFamily = selectFontValue;
            document.getElementById("signOffText").style.fontFamily = selectFontValue;
          }
        }
        setFontFamily(selectFontValue)
        // console.log(selectFontValue,'selectFontValue');
      }
    return (
        <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll ml-[-300px]">
            <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
                <div className="grid gap-2">
                    <Heading as="h1" className="whitespace-normal">
                        {title}
                    </Heading>
                    <Text className={'opacity-50 font-medium'}>$ {product?.variants.nodes[0].price.amount}</Text>
                    {/* {vendor && (
                   <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                     )} */}
                    <div className='buttonClass flex justify-start'>
                        <div className='buttonDiv pr-5'>
                            <button className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => singleBtnCLick()}>Single Card</button>
                        </div>
                        <div className='gap-2'>
                            <button className="bg-[#ef6e6e] text-[#fff] p-2 rounded " onClick={() => setShow(true)}>Bulk Purchase</button>
                        </div>
                    </div>
                    {show &&
                        <table className="price-breakdown desktop">
                            <tbody>
                                <tr>
                                    <td className="label p-[6px] text-xs border-solid border-[#ddd]">Quantity</td><td>1-99</td><td>100-249</td><td>250-499</td><td>500-999</td><td>1000-2499</td><td>2500+</td></tr>
                                <tr>
                                    <td className="label">Price</td><td>$3.25</td><td>$3.15</td><td>$3.00</td><td>$2.85</td><td>$2.70</td><td>$2.55</td></tr>
                            </tbody>
                        </table>}
                    <div className='selectOtion mb-5 flex'>
                        <div className='w-[192px]'>
                            <Text className='text-sm w-[100px]'>Standard Handwriting Style</Text>
                            <br />
                            <select id="font" onClick={() => setFont()} >
                                <option value="">{editFontFamily?editFontFamily:'Select FontFamily'}</option>
                                {editFontFamily && editFontFamily !== 'tarzan' &&
                            <option value="tarzan" className={`font-tarzan`}>Tarzan</option>}
                                {/* <option value="pinocchio" className={`font-pinocchio`}>Pinocchio</option> */}
                                <option value="tarzan" className={`font-tarzan`}>Tarzan</option>
                                <option value="stitch" className={`font-stitch`}>Stitch</option>
                                <option value="simba" className={`font-simba`}>Simba</option>
                                <option value="roo" className={`font-roo`}>Roo</option>
                                <option value="nimo" className={`font-nimo`}>Nimo</option>
                                <option value="lumiere" className={`font-lumiere`}>Lumiere</option>
                                <option value="kaa" className={`font-kaa`}>Kaa</option>
                                <option value="kaaNew" className={`font-kaaNew`}>KaaNew</option>
                                <option value="dumbo" className={`font-dumbo`}>Dumbo</option>
                                <option value="donald" className={`font-donald`}>Donald</option>
                                <option value="aladdin" className={`font-aladdin`}>Aladdin</option>
                                <option value="belle" className={`font-belle`}>Belle</option>
                                <option value="boo" className={`font-boo`}>Boo</option>
                                <option value="cinderella" className={`font-cinderella`}>Cinderella</option>
                                <option value="copper" className={`font-copper`}>Copper</option>
                                <option value="jasmine" className={`font-jasmine`}>Jasmine</option>
                                <option value="merlin" className={`font-merlin`}>Merlin</option>
                                <option value="goofy" className={`font-goofy`}>Goofy</option>
                                <option value="hercules" className={`font-hercules`}>Hercules</option>
                                <option value="rafiki" className={`font-rafiki`}>Rafiki</option>
                                <option value="rapunzel" className={`font-rapunzel`}>Rapunzel</option>
                                <option value="ratigan" className={`font-ratigan`}>Ratigan</option>
                                <option value="sarabi" className={`font-sarabi`}>Sarabi</option>
                                <option value="scar" className={`font-scar`}>Scar</option>
                                <option value="triton" className={`font-triton`}>Triton</option>
                                <option value="woody" className={`font-woody`}>Woody</option>
                            </select>
                        </div>
                        <div>
                            <Text className='text-sm'>Custom Handwriting Style</Text>
                            <br />
                            <select id="Coustomfont text-sm"  >
                                <option className='text-sm'>Custom Handwriting Style</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <Text>Optional shipping date</Text><br />
                        <input type='date' />
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
    )
}