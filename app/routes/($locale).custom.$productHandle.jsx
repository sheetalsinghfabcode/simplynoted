import { useRef, Suspense } from 'react';
import { Disclosure, Listbox } from '@headlessui/react';
import { defer, json, redirect } from '@shopify/remix-oxygen';
import { useLoaderData, Await, useLocation,useNavigate, } from '@remix-run/react';

import {
  AnalyticsPageType,
  Money,
  ShopPayButton,
  VariantSelector,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import clsx from 'clsx';

import {
  Heading,
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
  Button,
} from '~/components';
import { getExcerpt } from '~/lib/utils';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';
import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { useState, useEffect } from 'react';
import { BiSolidChevronLeft } from "react-icons/bi";
import { BsXCircle } from "react-icons/bs";
import Modal from 'react-modal';
import { MessageWriting } from '~/components/products/MessageWrite';
import { AddCart } from '~/components/products/AddCart';
import {ProductInfo} from '../components/products/ProductInfo'
import DynamicButton from '~/components/DynamicButton';

export async function loader({params}){
    const {productHandle} = params
console.log(params,"-----");

return null
}
let parameterValue
export default function CustomProducts(){
    const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const datafornav = useLocation();
  let EditMess = datafornav.state?.data?.messageData
  let editEndMess = datafornav.state?.data.endText
  let editOrderValue = datafornav.state
  let editFontFamily = datafornav.state?.data.fontFamily
  let showBulkOnEdit = datafornav.state?.data.csvBulkData.length
  let editFontSize = datafornav.state?.data.fontSizeMsg
//   const { media, title, vendor, descriptionHtml } = product;
//   const { shippingPolicy, refundPolicy } = shop;
  const [show, setShow] = useState(showBulkOnEdit || parameterValue == "Bulk" ? true : false);
  const [productshow, setProductShow] = useState(true)
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [showBox, setShowBox] = useState(true)
  const [selectedFile, setSelectedFile] = useState('');
  const [errorVal, setErrorVal] = useState([]);
  const [fontFamilyName,setFontFamily] = useState('')
  const [metafields,setMetafields] = useState([])

  if (typeof window !== 'undefined') {

    const urlParams = new URLSearchParams(window?.location.search);
     parameterValue = urlParams.get('select');
    // console.log(parameterValue,"---000000");
  }

//   useEffect(() => {
//     let result =  product.id.replace(/[^0-9]/g,"");
//          getMetaFields(result)
//     }, []);
//     async function getMetaFields(id) {
//       try {
//         const queryEndPoint = `https://api.simplynoted.com/api/storefront/product/product-metafields`
//         const data = await fetch(queryEndPoint, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             "productId": id
//         })
//         });
//         const json = await data.json();
//         let y = json.result.metafields[0].value
//         let extractMetafield = JSON.parse(y)
//         setMetafields(extractMetafield)
//       } catch (error) {
//         console.error(error, "shopify");
//       }
//       // debugger;
   
//     }

 
  const customStyles = {

    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '620px',
      background: '#fff',
      width: '100%',
      padding: '30px',
      maxHeight: '500px',
      zIndex: '2',
      position: 'relative'
    },

  };
  useEffect(() => {
    localStorage.removeItem('reqFielddInCart')
    // console.log(location.pathname,'0000000000');/
  }, [datafornav.pathname]);
    return (
        <>
        {productshow ?
        <>
        <DynamicButton 
        className="bg-[#EF6E6E] m-5 ml-[32px] w-full max-w-[150px]"
        text="Go Back"
        backArrow={true}
        onClickFunction={goBack}/>
          <Section className="px-0 md:px-8 ">
            <div className="grid items-start md:gap-6 lg:gap-5 md:grid-cols-2">
              {/* <ProductGallery
                media={media.nodes}
                className="w-full"
              /> */}
              <ProductInfo title={"title"} product={'product'} 
              show={show} setShow={setShow} setShowBox={setShowBox}
               editFontFamily={editFontFamily} setFontFamily={setFontFamily}/>
            </div>
            <MessageWriting show={show} selectedFile={selectedFile} setSelectedFile={setSelectedFile}
              setShowBox={setShowBox} setProductShow={setProductShow}
              EditMess={EditMess} editEndMess={editEndMess}
              editFontFamily={editFontFamily} editFontSize={editFontSize} fontFamilyName={fontFamilyName} metafields={metafields}/>
          </Section>
          <Modal
            isOpen={modalIsOpen2}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {errorVal.map((item) =>
              <div>{item}</div>
            )}
          </Modal>
        </>
        :
        <AddCart show={show} setProductShow={setProductShow}
          data={data} productData={product.variants.nodes[0]}
          editOrderValue={editOrderValue}
          shippingData={shippingData?.product} 
          fontFamilyName={fontFamilyName}/>
      }
        </>
    )
}