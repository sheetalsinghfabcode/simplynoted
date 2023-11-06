import react from 'react';

import Note1 from '../../../assets/Image/Note1.jpg';
import Note2 from '../../../assets/Image/Note2.jpg';
import Note3 from '../../../assets/Image/Note3.jpg';
// import Slider from '@ant-design/react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows:false
//   };

const Note = () => {
    
  return (
    <>
      <div className="container-indent bg-[#324879] flex items-center justify-center">
        <div className="container">
          <div className="block-title">
            <h1 className="tt-title text-3xl text-center font-bold pt-20 text-white">
              Real Pen.Real Ink.
            </h1>
            <div className="tt-description text-center font-bold text-3xl pt-1 text-white">
              Real Impressions.
            </div>
          </div>
          <div className='mb-6'></div>
          {/* <Slider {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider> */}
        </div>
      </div>
    </>
  );
};

export default Note;
