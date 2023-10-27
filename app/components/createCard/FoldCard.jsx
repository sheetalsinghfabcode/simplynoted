import React, {useEffect, useState, useRef} from 'react';
import {Modal} from '../../components';
import AddPicture from '../../../assets/Image/add_image_icon.png';
import html2canvas from 'html2canvas';


export default function FoldCard() {
  const [isFolded, setIsFolded] = useState(true);
  const [cardPageName, setCardPageName] = useState('Front');
  const [selectedFile, setSelectedFile] = useState(null);
  const [backCardImage, setBackCardImage] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  const [backImageScale, setBackImageScale] = useState(1);
  const [selectButton, setSelectButton] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const redDotDivRef = useRef(null);  

  const openModal = (data) => {
    setModalOpen(true);
    setModalData(data);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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

  
  return (
    <>
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
                        selectButton === 'dark' ? 'graysacle' : 'grayscale-0'
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
                    {backCardImage && (
                      <img
                        key={backCardImage.name}
                        className={`${
                          selectButton === 'dark' ? 'dark' : ''
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
              <img className="choose-image" src={AddPicture} alt="addpicture" />
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
              className={`${selectButton === 'dark' ? 'dark' : ''}`}
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
          {cardPageName === 'Back' && (
            <div className="finish-button-editing">
              <button type="button">Finish Editing</button>
            </div>
          )}
          <div className="bar-code flex items-center  absolute top-236  gap-5 border border-solid border-gray-300 bg-gray-200">
            <img
              onClick={openModal}
              src="	https://cdn.shopify.com/s/files/1/0275/6457/2777/files/qr.png?v=1696332445"
            />
            <span className="qr-code font-bold ">ADD QR CODE</span>
            {ModalOpen && (
              <Modal cancelLink="#">
                {
                  <div className="modal min-w-40">
                  <button className='float-right text-[25px]' type="button" onClick={closeModal}>X</button>
                    <h1>ADD QR CODE</h1>
                    <p>Enter website URL or message:</p>
                    <input type="text"></input>
                    <div className="flex gap-10">
                      <span>Position:</span>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label className="form-check-label" for="flexRadioDefault1">
                         Add header
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label className="form-check-label" for="flexRadioDefault2">
                        Add footer
                        </label>
                      </div>
                    </div>
                    <button onClick={handleAlertClick} className='insert-btn' type="button">Insert QR Code</button>  
                  </div>
                }
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
