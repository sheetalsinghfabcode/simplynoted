import React, {useEffect, useState, useRef} from 'react';
import {Modal} from '../../components';
import AddPicture from '../../../assets/Image/add_image_icon.png';
import html2canvas from 'html2canvas';
import Loader from '../modal/Loader';


export default function FoldCard({CardData,variants,}) {
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
  const [pdfData, setPdfData] = useState({});



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
      cardType: "folded5x7",
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

  function dataURLtoFile(dataurl, filename) {
    if (dataurl === null) return;
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }
  const handleFinishEditing = async (event) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append('headerData', JSON.stringify(payload.headerData));
      formData.append('footerData', JSON.stringify(payload.footerData));

      formData.append('faceImage', dataURLtoFile(payload.faceImage, 'jpg'));
      formData.append('backImage', dataURLtoFile(payload.backImage, 'jpg'));
      formData.append('headerImage', dataURLtoFile(payload.headerImage, 'jpg'));
      formData.append('footerImage', dataURLtoFile(payload.footerImage, 'jpg'));

      formData.append('isLongImage', false);
      formData.append('isLongImageBack', false);
      formData.append('transformFace', '1');
      formData.append('transformBack', '1');
      formData.append('cardType', 'folded5x7');
      console.log(formData, '------------------------------------------');

      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      let data = await fetch(`https://api.simplynoted.com/api/customizedCard/uploadPDFv2?customerId=${customerId}`, requestOptions);
      
      if (data.ok){
        setLoader(false);
        setModalOpen(true);
        const response = await data.json();
        setPdfData(response?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const saveCardClick = async () => {
    let saveCardRequests = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productTitle: productTitle,
      }),
    };
    try {
      let response = await fetch("https://api.simplynoted.com/api/storefront/product/checkDuplicateProductName",saveCardRequests);
      
      if (response.ok) {
        let data = await response.json();
        if (data.result.count === 0) {
          const saveFormData = new FormData();
          const savePayload = {
            product: {
              title: productTitle,
              vendor: CardData.product.vendor,
              product_type: CardData.product.customisable_card,
              tags: CardData.product.customise_card,
              variants: variants,
              metafields: [
                {
                  key: 'qrImage',
                  value: '',
                  value_type: 'string',
                  namespace: 'is_customised',
                },
                {
                  key: 'customer',
                  value: customerId,
                  value_type: 'integer',
                  namespace: 'shopify_id',
                },
                {
                  key: 'flag',
                  value: 'true',
                  value_type: 'string',
                  namespace: 'is_customised',
                },
                {
                  key: 'variantDefaultPricing',
                  value: '',
                  value_type: 'string',
                  namespace: 'product',
                },
              ],
            },
            customFields: {
              cardType: 'folded5x7',
              isHeaderIncluded: false,
              isFooterIncluded: true,
              messageAreaPosition: '',
              header: {
                data: "",
                textAlign: "",
                isColored: selectButton === 'dark' ? false : true,
                zoom: "",
                fontType: "",
                fontSize: "",
                fontColor: "",
                justifyContent: 'center',
                flexDirection: 'column',
                isImage: 'false',
                height: 50,
              },
              message: {
                data: '',
                fontSize: parseInt(''),
                fontType: '',
                fontFamily: '',
                height: parseInt(''),
                fontAutoResize: true,
              },
              footer: {
                data: "",
                textAlign: "",
                fontSize: "",
                fontType: "",
                zoom: "",
                fontColor: "",
                isColored: selectButton === 'dark' ? false : true,
                justifyContent: 'center',
                flexDirection: 'column',
                isImage: 'false',
                height: 50,
              },
              face: {
                zoom: '',
                isColored: '',
                width: '',
                height: '',
              },
              back: {
                zoom: '',
                isColored: '',
                width: '',
                height: '',
              },
              pdfURL: pdfData?.pdfUrl,
            },
            s3ImageUrls: pdfData,
            featuredImage: null,
          };
          saveFormData.append('product', JSON.stringify(savePayload.product));
          saveFormData.append(
            'customFields',
            JSON.stringify(savePayload.customFields),
          );
          saveFormData.append(
            's3ImageUrls',
            JSON.stringify(savePayload.s3ImageUrls),
          );
          saveFormData.append('featuredImage', dataURLtoFile(dataURL, 'jpg'));
          console.log(saveFormData, '--------');

          let saveRequestOptions = {
            method: 'POST',
            body: saveFormData,
          };
          console.log(saveFormData, '--------');
          const saveInDbResponse = await fetch(
            `https://api.simplynoted.com/api/customizedCard/save?customerId=${customerId}`,
            saveRequestOptions,
          );
          if (saveInDbResponse.ok) navigate(`/products/${productTitle}`);
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
