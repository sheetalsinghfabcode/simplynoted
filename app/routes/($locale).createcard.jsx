import {useState} from 'react';
import {Link} from '@remix-run/react';
import FlatGreen from '../../assets/Image/flat-green.png';
import FoldedGreen from '../../assets/Image/folded-green.png';
import FoldCard from '../components/createCard/FoldCard';
import FlatCard from "../components/createCard/FlatCard";


export default function createcard() {
  const [selectedImage, setSelectedImage] = useState('first');
  const [card, setCard] = useState(false)

  const handleFirstButtonClick = () => {
    setSelectedImage('first');
  };
  const handleSecButtonClick = () => {
    setSelectedImage('sec');
  };


  return (
    <>
    {!card &&
    <>
      <div className="create-card-select-cont flex justify-center gap-20 m-20">
        <div className="images">
          {selectedImage === 'first' && (
            <img
              src={
                'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/Screenshot_1.png?v=1689262698%22'
              }
              alt="pic"
              className="w-[400px] h-[360px]"
            />
          )}
          {selectedImage === 'sec' && (
            <img
              src={
                'https://cdn.shopify.com/s/files/1/0275/6457/2777/files/create_a_card.png?v=1689262711'
              }
              alt="pics"
              className="w-[400px] h-[360px]"
            />
          )}
        </div>
        <div className="slect-btn-image">
          <p>
            Start by selecting the size and style<br></br>of the card you want
            to create.
          </p>
          <div className="saaelect-img-btn flex gap-2 mt-[22px] justify-center">
            <img
              className={`select-btn w-[80px] h-[70px] ${
                selectedImage === 'first' ? 'bg-blue-500' : 'bg-green-500'
              } sm:bg-indigo-500 md:bg-red-500 lg:bg-red-500 xl:bg-white text-white w-23`}
              src={FlatGreen}
              alt="flatgreenpic"
              onClick={handleFirstButtonClick}
            />
            <br />
            <img
              className={`select-btn w-[80px] h-[70px] ${
                selectedImage === 'sec' ? 'bg-red-500' : 'bg-indigo-500'
              } sm:bg-red-500 md:bg-indigo-500 xl:bg-white text-white w-23`}
              src={FoldedGreen}
              alt="flatgreenpic"
              onClick={handleSecButtonClick}
            />
          </div>

          <Link
            className="slect-result-btn  mt-[19px] w-[300px] h-[60px] text-center pt-[12px;]  first-select-btn bg-#1b5299-500 sm:bg-#1b5299-500 md:bg-indigo-500 lg:bg-#1b5299-500 xl:bg-#1b5299 text-white w-23"
            type="button"
            onClick={()=>setCard(true)}
          >
            Next
          </Link>
        </div>
      </div>
      <div className="companies-header text-center">
        <h1>Companies we've worked with</h1>
      </div>  
      </>
  }
      {card &&  selectedImage ==="first" && <FlatCard/>}
      {card &&  selectedImage ==="sec" && <FoldCard/>}
    </>
  );
}
