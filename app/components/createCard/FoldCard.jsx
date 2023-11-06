import React, {useEffect, useState, useRef} from 'react';
import {Modal} from '../../components';
import AddPicture from '../../../assets/Image/add_image_icon.png';
import html2canvas from 'html2canvas';
import Loader from '../modal/Loader';


export default function FoldCard() {
  const [isFolded, setIsFolded] = useState(true);
  const [cardPageName, setCardPageName] = useState('Front');
  const [selectedFile, setSelectedFile] = useState(null);
  const [backCardImage, setBackCardImage] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  const [backImageScale, setBackImageScale] = useState(1);
  const [selectButton, setSelectButton] = useState(null);
  const [selectButton2, setSelectButton2] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [loader, setLoader] = useState(false);



  const handleCloseModal = () => {
    setModalOpen(false);
  };
 

  const fileInputRef = useRef(null);
  const redDotDivRef = useRef(null); 

  const customerIdRef = useRef("");
  customerIdRef.current = localStorage.getItem('customerId');
  const customerId = customerIdRef.current;  

  useEffect(() => {
    generateScreenshotURL(redDotDivRef.current);
  }, [imageScale, backCardImage, selectedFile, redDotDivRef]);

  const generateScreenshotURL = async (element) => {
    try {
      const canvas = await html2canvas(element);
      const cropSize = 23;
      const newWidth = canvas.width - 2 * cropSize;
      const newHeight = canvas.height - 2 * cropSize;

      const xOffset = cropSize;
      const yOffset = cropSize;

      const newCanvas = document.createElement('canvas');
      newCanvas.width = newWidth;
      newCanvas.height = newHeight;
      const context = newCanvas.getContext('2d');

      context.drawImage(
        canvas,
        xOffset,
        yOffset,
        newWidth,
        newHeight,
        0,
        0,
        newWidth,
        newHeight,
      );

      const dataURL = newCanvas.toDataURL('image/png');

      console.log(dataURL);
      return dataURL;
    } catch (error) {
      console.error('Error generating screenshot:', error);
    }
  };

  const handleAlertClick = () => {
    setShowAlert(true);
    alert('Please enter url first!');
  };

  const handleButtonClick = (cardPageName) => {
    setCardPageName(cardPageName);
  };

  const handleFileChange = (event, cardPageName) => {
    const file = event.target.files[0];
    cardPageName === 'Front' && setSelectedFile(file);
    cardPageName === 'Back' && setBackCardImage(file);
    setSelectButton(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    if (cardPageName === "Back") {
      setBackImageScale(1);
      setBackCardImage(null);
    }
    if (cardPageName === "Front") {
      setImageScale(1);
      setSelectedFile(null);
    }
  };

  const handleSliderChange = (value) => {
    const scaleFactor = 1 + (value - 50) / 100;
    cardPageName === "Front" && setImageScale(scaleFactor);
    cardPageName === "Back" && setBackImageScale(scaleFactor);
  };

  const handleClickButton = (buttonId) => {
    setSelectButton(buttonId);
  };
  const handleClickButton2 = (buttonId) => {
    setSelectButton2(buttonId);
  };

  const payloadDependency = [
    selectedFile, 
    backCardImage,
    imageScale,
    backImageScale,
  ];

  let payload;
  useEffect(() => {
     payload = {
      faceImage: selectedFile,
      backImage: backCardImage,
      isLongImage: "", 
      transformFace: '' , 
      transformBack: '',
      name: '',
      cardType: " Folded5*7",
      isLongImageBack:"",
      QR:"",
      // isHeaderIncluded: '',
      // isFooterIncluded: '',
      headerImage: null,
      footerImage: null,
      headerData: {
        data: "",
        textAlign: '',
        isColored: true,
        zoom: backImageScale,
        fontType: '',
        fontSize: '',
        fontColor: '',
        justifyContent: "", 
        flexDirection: "", 
        isImage: "",     
      },
      footerData: {
        data: '',
        textAlign: '',
        fontSize: '',
        fontType: '',
        zoom: imageScale,
        fontColor: '',
        isColored: false,
      }
    };
  }, payloadDependency);

  const handleFinishEditing = async (event) => {
    setLoader(true);
    try {
      let formdata = new FormData();
      for(const name in payload) {
        formdata.append(name, JSON.stringify(payload[name]));
      }

      let requestOptions = {
        method: 'POST',
        body: formdata
      };

      let data = await fetch(`https://api.simplynoted.com/api/customizedCard/uploadPDFv2?customerId=${customerId}`, requestOptions);
      
      if (data.ok){
        setLoader(false);
        setModalOpen(true);
        alert("uploadPDF worked!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveCardClick = async () => {
    let saveCardRequests = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',},
       body: JSON.stringify({
        "productTitle": productTitle
      }),
    };
    try {
      let response = await fetch("https://api.simplynoted.com/api/storefront/product/checkDuplicateProductName",saveCardRequests);
      
      if (response.ok) {
        let data = await response.json();
        if (data.result.count === 0) {
          const payload ={
            product: {
              title:'',
              vendor: "",
              product_type: "",
              tags:
                "customise_card, customise_card_edited, packageDiscount_" ,
              variants: allVariantsPriceing,
              metafields: [
                    {
                      key: "",
                      value: '',
                      value_type: "",
                      namespace: "",
                    },
                {
                  key: "",
                  value: customerId,
                  value_type: "", //"value_type": "string",
                  namespace: "",
                },
                {
                  key: "",
                  value: "",
                  value_type: "",
                  namespace: "",
                },
                {
                  key: "",
                  value: varaintOption.toString(),
                  value_type: "",
                  namespace: "",
                },
              ],
            },
            customFields: {
              cardType: 'folded5x7',
              isHeaderIncluded: false,
              isFooterIncluded: true,
              messageAreaPosition: messageAreaPosition,
              header: {
                data: '', //it will contain text or image base64 'data:image/base64
                textAlign: '',
                justifyContent: '',
                flexDirection: '',
                fontType: selectedHeaderFont,
                fontSize: parseInt(''),
                fontColor: '',
                zoom: '',
                isColored: false,
                height: parseInt(''),
              },
              message: {
                data: '',
                fontSize: parseInt(''),
                fontType: '',
                fontFamily: customFontFamily,
                height: parseInt(''),
                fontAutoResize: '',
              },
              footer: {
                data: '', //it will contain text or image
                textAlign: '',
                justifyContent: '',
                flexDirection: '',
                fontType: selectedFooterFont,
                fontSize: parseInt(''),
                fontColor: '',
                zoom: '',
                isColored: '',
              },
              face: {
                zoom: '',
                isColored: '',
                width: isFolded
                  ?''
                  : '',
                height: isFolded
                  ? ''
                  :'',
              },
              back: {
                zoom: '',
                isColored: '',
                width: '',
                height: '',
              },
              pdfURL: customPdfURL,
            },
          }

          const saveInDbOptions = {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
          
            })
          }
          const saveInDbResponse = await fetch(`https://api.simplynoted.com/api/customizedCard/save?customerId=${customerId}`,saveInDbOptions);    
          if(saveInDbResponse.ok) alert("Saved in the DB.");
        } else if (data.result.count === 1) {
          alert("Card already exist!!");
        }
        console.log(data);
      } else {
        console.error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
     {loader ? (
    <Loader loaderMessage="Saving Folded Book" />
     ) : (
      <div>
     <div className="Custom-folded-card-front">
        <h1 className="custom-folded-card ml-[-71px]">
          Custom Folded Card Front
        </h1>
      </div>
      <div className={`folded-card flex items-center justify-evenly`}>
        <div className="main-div  h-[416px] w-[553px]">
          <div
            ref={redDotDivRef}
            style={{border: '2px solid black'}}
            className="bg-white relative overflow-hidden -z-30"
          >
            <div className="dotted-div -z-10"></div>
            <div className={`red-dot flex align-items justify-center -z-20`}>
              {(cardPageName === 'Front' && (
                <div className="front-div p-[19px] flex justify-center align-center ">
                  {selectedFile && (
                    <img
                      key={selectedFile.name}
                    className={`${
                        selectButton  === 'dark' ? 'grayscale' : 'grayscale-0'
                      } image-scal  `}  
                      src={isFolded ? URL.createObjectURL(selectedFile) : null}
                      style={{transform: `scale(${imageScale})`}}
                      alt="selected"
                    />
                  )}
                </div>
              )) ||
                (cardPageName === 'Inside' && (
                  <div className="custom-msg font-cursive text-base text-22 text-blue-500 pt-16">
                    Your custom message text will be here...
                  </div>
                )) ||
                (cardPageName === 'Back' && (
                  <div className="front-div p-[19px] flex justify-center align-center">
                    {backCardImage &&  (
                      <img
                        key={backCardImage.name}
                        className={`${
                          selectButton2  ===  'dark' ? 'grayscale' : 'grayscale-0'
                        } image-scal`}
                        src={
                          isFolded ? URL.createObjectURL(backCardImage) : null
                        }
                        style={{transform: `scale(${backImageScale})`}}
                        alt="selected"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-x-3 justify-between pt-2">
            <button
              className="card-button button-blue"
              type="button"
              onClick={() => {
                handleButtonClick('Front');
              }}
            >
              Card Front
            </button>
            <button
              className="card-button button-tomato"
              type="button"
              onClick={() => {
                handleButtonClick('Inside');
              }}
            >
              Card Inside
            </button>
            <button
              className="card-button button-tomato"
              type="button"
              onClick={() => {
                handleButtonClick('Back');
              }}
            >
              Card Back
            </button>
          </div>
        </div>
        <div className="choose-file-button">
          {(cardPageName === 'Back' || cardPageName === 'Front') && (
            <div className='file-click relative'>
              <div className='add-image-icon flex font-bold'>
              <img className="choose-image" src={AddPicture} alt="addpicture" />
              <span>Add Image</span>
              </div>
              <input
                type="file"
                id="file-upload mb-[17px]"
                onChange={(event) => {
                  handleFileChange(event, cardPageName);
                }}
                value=""
                className='file-upload'
              />
            </div>
          )}
          {cardPageName === 'Front' && selectedFile && (
            <div
              key={selectedFile.name}
          
            >
              <div className="slider-container">
                <b>Resize image</b> <br />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(imageScale - 1) * 100 + 50}
                  onChange={(e) => handleSliderChange(e.target.value)}
                />
              </div>

              <div className="select-color-change flex gap-10">
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="dark"
                    checked={selectButton === 'dark'}
                    onChange={() => handleClickButton('dark')}
                  />
                  <span className="radio-icon"></span> B/W
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="colorful"
                    checked={selectButton === 'colorful'}
                    onChange={() => handleClickButton('colorful')}
                  />
                  <span className="radio-icon"></span> Color
                </label>
              </div>
              <div className="remove-finishing position-relative">
                <button
                  className="remove-image"
                  type="button"
                  onClick={handleRemoveImage}
                >
                  Remove image
                </button>
                {/* <img className="trash-icon" src={TrashXxl} alt="trashxxl" /> */}
              </div>
            </div>
          )}
          {cardPageName === 'Back' && backCardImage && (
            <div
              key={backCardImage.name}
              className={`${selectButton2 === 'dark' ? 'dark' : ''}`}
            >
              <div className="slider-container">
                <b>Resize image</b> <br />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(backImageScale - 1) * 100 + 50}
                  onChange={(e) => handleSliderChange(e.target.value)}
                />
              </div>

              <div className="select-color-change flex gap-10">
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="dark"
                    checked={selectButton2 === 'dark'}
                    onChange={() => handleClickButton2('dark')}
                  />
                  <span className="radio-icon"></span> B/W
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="colorful"
                    checked={selectButton2 === 'colorful'}
                    onChange={() => handleClickButton2('colorful')}
                  />
                  <span className="radio-icon"></span> Color
                </label>
              </div>
              <div className="remove-finishing position-relative">
                <button
                  className="remove-image"
                  type="button"
                  onClick={handleRemoveImage}
                >
                  Remove image
                </button>
                {/* <img className="trash-icon" src={TrashXxl} alt="trashxxl" /> */}
              </div>
            </div>
          )}
          {cardPageName === 'Back' && (
           <div className="finish-button-editing">
           <button type="button" onClick={handleFinishEditing}>Finish Editing</button>
         </div>
          )}
             {isModalOpen && <Modal cancelLink={handleCloseModal}>
             <div className='modal-flatpage'>
            <div className='first-1st'>
              <p className='modal-save-name font-bold'>Name your card and save it.</p>
            </div>
            <input className='input-modal'
             type="text" onChange={(e) => setProductTitle(e.target.value)}></input><br />
            <button className='button-modal' type="button" onClick={saveCardClick}>SAVE CARD</button>
              </div>
              </Modal>}
        </div>
      </div>
      </div>
     )}
    </>
    
  );
}
