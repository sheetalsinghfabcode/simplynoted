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

export function ProductInfo({ title, product, setShow, show, setShowBox, editFontFamily, setFontFamily }) {
    // console.log(editFontFamily, 'editFontFamily');
    const [customFonts, setCustomFonts] = useState([])
    const [standardFontVal, setStandardFontVal] = useState('Tarzan')
    const [customFontVal, setCustomFontVal] = useState('Select Custom Font')
    async function singleBtnCLick() {
        setShow(false)
        setSelectedFile('')
        setShowBox(true)
    }
    function setFont(e) {
        // console.log(e, 'fontFamily');
        // getCustomFont('dddd')
        // console.log(selectVal,'useRefData');
        setCustomFontVal('Select Custom Font')
        setFontFamily(e)
        setStandardFontVal(e)
        // if(e){
            // refVal2.current.valueOf = "Custom FOnt"
        // }
    }


    async function customFontFamily() {
        try {
            const res = await fetch(`https://api.simplynoted.com/fonts/getMyFonts/6232622891113`)
            const json = await res.json()
            // console.log(json.data);
            setCustomFonts(json.data)
        } catch (error) {
            console.error(error, 'customfontError');
        }
    }
    // const refVal = useRef('')
    // const refVal2 = useRef('')
    // let selectVal = refVal.current.valueOf
    // let selectVal2 = refVal2.current.valueOf
    // console.log(selectVal,'selectavl');
    useEffect(() => {
        let customerid = localStorage.getItem('customerId')
        customFontFamily(customerid)
    }, [])

    function getCustomFont(val) {
        console.log(val, 'getcustom val');
        setFontFamily(val)
        setCustomFontVal(val)
        setStandardFontVal('Select Standard Font')

        // if(val){
            // refVal.current.valueOf = "Standard Font"
        // }
        // setFont('select')
    }
    return (
        <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav  md:pt-nav hiddenScroll md:overflow-y-scroll ml-[-1.5rem]">
            <section className="flex flex-col w-full gap-8 md:mx-auto md:px-0 ">
                <div className="grid gap-2">
                    <Heading as="h1" className="whitespace-normal">
                        {title}
                    </Heading>
                    <span>$3.25</span>
                    {/* <span className='text-[30px] text-[#1b5299] leading-[47px] font-karla'>$ {product?.variants.nodes[0].price.amount}</span> */}
                    {/* {vendor && (
                   <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                     )} */}
                    <div className='buttonClass flex justify-start mt-[2rem]'>
                        <div className='buttonDiv pr-5'>
                            <button style={{backgroundColor: show?"#ef6e6e":"#001a5f"}} className="bg-[#001a5f] text-[#fff] p-2 rounded " onClick={() => singleBtnCLick()}>Single Card</button>
                        </div>
                        <div className='gap-2'>
                            <button style={{backgroundColor: show?"#001a5f":"#ef6e6e"}} className="bg-[#ef6e6e] text-[#fff] p-2 rounded " onClick={() => setShow(true)}>Bulk Purchase</button>
                        </div>
                    </div>
                    
                    <div className='selectOtion mb-5 flex mt-[2rem] gap-[2rem]'>
                        <div className='w-[192px]'>
                            <Text className='text-sm w-[100px]'>Standard Handwriting Style</Text>
                            <br />
                            <select id="font" className='cursor-pointer' value={standardFontVal} onChange={(e) => setFont(e.target.value)} placeholder='aaaa'>
                                <option value={standardFontVal} selected disabled>{editFontFamily ? editFontFamily :standardFontVal}</option>
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
                            <select id="Coustomfont text-sm " className='cursor-pointer' value={customFontVal}  onChange={(e) => getCustomFont(e.target.value)}>
                                <option className='text-sm' value={customFontVal} selected disabled>{customFontVal}</option>
                                {customFonts && customFonts.map((item) =>
                                    <option value={item.fontName}>{item.fontName}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div>
                        <Text>Optional shipping date</Text><br />
                        <input type='date' className='cursor-pointer'/>
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