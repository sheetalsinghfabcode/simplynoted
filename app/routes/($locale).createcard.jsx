import {useState,useEffect} from 'react';
import FlatGreen from '../../assets/Image/flat-green.png';
import FoldedGreen from '../../assets/Image/folded-green.png';
import FoldCard from '../components/createCard/FoldCard';
import FlatCard from '../components/createCard/FlatCard';
import {useLoaderData} from 'react-router';
import {defer} from '@remix-run/server-runtime';
import {useNavigate} from '@remix-run/react';

import LoginModal from '~/components/modal/loginModal';

export async function loader({context}) {
  const CardData = await context.storefront.query(Card, {
    variants: {},
  });

  return defer({
    CardData,
  });
}

let customerID ;


export default function createACard() {
  const {CardData} = useLoaderData();
  const [selectedImage, setSelectedImage] = useState('Flat 5*7');
  const [card, setCard] = useState(false);
  const [clickColor, setClickColor] = useState('white');
  const [isClicked, setIsClicked] = useState(false);
  const [variants,setVariants] = useState('');



  const navigate = useNavigate();


  useEffect(() => {
    customerID = localStorage.getItem('customerId');
    if (!customerID) {
      // navigate('/account/login');
    }
  }, []);


  const onChnage = (event) =>{
   const selectedValue = (event.target.value)
   setVariants(selectedValue);
 }

  const handleFirstButtonClick = () => {
    setSelectedImage('Flat 5*7');
    setClickColor('white');
    setIsClicked(true);
  };

  const handleSecButtonClick = () => {
    setSelectedImage('Folded 5*7');
    setClickColor('white');
    setIsClicked(false);
  };

  // console.log('CREATECARD', CardData.product.title);
  // console.log(CardData,'ggggg');

 return (
    <>
      {!card && (
        <>
          <div className="create-card-select-cont flex justify-center gap-20 m-20">
            <div className="images">
              {selectedImage === 'Flat 5*7' && (
                <img src={CardData.product.featuredImage.url} />
              )}

              {selectedImage === 'Folded 5*7' && (
                <img
                  src={
                    'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/create_a_card.png?v=1689262711'
                  }
                  alt="pics"
                  className="max-w-120 h-[400px]"
                />
              )}
            </div>
            <div className="slect-btn-image">
              <p>
                Start by selecting the size and style<br></br>of the card you
                want to create.
              </p>
              <div className="saaelect-img-btn flex gap-2 mt-[22px] justify-center">
                <img
                  className={`select-btn w-[80px] h-[70px] ${
                    selectedImage === 'Flat 5*7' ? '' : ''
                  } sm: md:bg-red-500 lg:bg-red-500 xl: text-white w-23`}
                  src={FlatGreen}
                  alt="flatgreenpic"
                  onClick={handleFirstButtonClick}
                  style={{
                    backgroundColor:
                      selectedImage === 'Flat 5*7' ? '#EF6E6E' : clickColor,
                  }}
                />
                <br />
                <img
                  className={`select-btn w-[80px] h-[70px] ${
                    selectedImage === 'Folded 5*7' ? '' : ''
                  } sm:bg-red-500 md: xl: text-white w-23`}
                  src={FoldedGreen}
                  alt="flatgreenpic"
                  onClick={handleSecButtonClick}
                  style={{
                    backgroundColor:
                    selectedImage === 'Folded 5*7' ? '#EF6E6E' : clickColor,
                  }}
                />
              </div>
              <div
                className="slect-result-btn  mt-[19px] w-[300px] h-[60px] text-center pt-[12px;]  first-select-btn bg-#1b5299-500 sm:bg-#1b5299-500 md:bg-indigo-500 lg:bg-#1b5299-500 xl:bg-#1b5299 text-white w-23"
                type="button"
                onClick={() => setCard(true)}
              >
                Next
              </div>
            </div>
          </div>
          <div className="companies-header text-center">
            <h1>Companies we've worked with</h1>
          </div>
        </>
      )}
    
      {card && selectedImage === 'Flat 5*7' && <FlatCard variants={variants} CardData={CardData} setCard={setCard} />}
      {card && selectedImage === 'Folded 5*7' && <FoldCard variants={variants} CardData={CardData} setCard={setCard} />}
      <div className="payload-select-variants flex mt-[61px]  bg-black h-[78px] justify-around">
        <div className="flex gap-[23px]">
          <img
            className="w-10 h-[34px]"
            src="https://simplynoted.com/cdn/shop/files/Screenshot_1_x80.png?v=1689262698"
            alt="cardpic"
          />
          <div className="font-12 text-white">
            {CardData.product.title}
            <br />${CardData.product.variants.edges[0].node.price.amount}
          </div>
          <form>
            <select
              id="variants"
              className="w-[338px] border-0 rounded-12"
              name="Dollar"
              value={variants}
              onChange={onChnage}
            >
              {CardData.product.variants.edges.map(({node}) => (
                <option key={node.title} 
                value={node.title}>
                  {node.title}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
    </>
  );
}

const Card = `#graphql
  query
  {
    product(handle:"customise-your-card"){
      title
      featuredImage{
        url
      }
      vendor
      tags
      productType
      variants(first:10){
        edges{
          node{
            title
           metafields(identifiers:[
                 {namespace:"is_customised", key: "qrImage"}
                 {namespace:"shopify_id", key: "customer"}
                 {namespace:"is_customised", key: "flag"}
                 {namespace:"product", key: "variantDefaultPricing"}
                    
               
              ]){
                value
                key
              }
            price{
              amount
            }
          }
        }
      }
    }
  }`;
