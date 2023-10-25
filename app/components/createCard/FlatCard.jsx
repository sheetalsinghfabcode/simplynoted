import {useState, useRef, useEffect} from 'react';
import AddImage from '../../../assets/Image/add_image_icon.png';
import html2canvas from 'html2canvas';

export default function FlatCard() {
  const [isFrontCard, setIsFrontCard] = useState(true);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [isFooterChecked, setIsFooterChecked] = useState(false);
  const [inputText, setInputText] = useState('');
  const [headerText, setHeaderText] = useState('Header Text');
  const [footerText, setFooterText] = useState('');
  const [scaledImage, setScaledImage] = useState(null);
  const [backHeaderImage, setBackHeaderImage] = useState();
  const [backFooterImage, setBackFooterImage] = useState();
  const [scale, setScale] = useState(1);
  const [backScale, setBackScale] = useState(1);
  const [qrCodeShow, setQrCodeShow] = useState(false);

  const [selectButton, setSelectButton] = useState(null);
  const fileInputRef = useRef(null);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [alignment, setAlignment] = useState('');
  const [selectedFontSize, setSelectedFontSize] = useState({});
  const [headerFontSize, setHeaderFontSize] = useState(16); 
  const [footerFontSize, setFooterFontSize] = useState(16); 

  const handleFontSizeChange = (event) => {
    headerText === "Header Text" && setHeaderFontSize(event.target.value);
    headerText === "Footer Text" && setFooterFontSize(event.target.value);
  }

  const handleDivOpen = (setScale) => {
    setIsDivOpen(!isDivOpen);
    isFrontCard ? setScale(scale) : setBackScale(backScale);
  };

  const handleClickButton = (buttonId) => {
    setSelectButton(buttonId);
  };

  const handleHeaderCheckboxChange = () => {
    setIsHeaderChecked(!isHeaderChecked);
  };

  const handleFooterCheckboxChange = () => {
    setIsFooterChecked(!isFooterChecked);
  };
  const handleFilesChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        isFrontCard && setScaledImage(e.target.result);
        !isFrontCard && isHeaderChecked && setBackHeaderImage(e.target.result);
        !isFrontCard && isFooterChecked && setBackFooterImage(e.target.result);
      };

      setInputText('');
      setFooterText('');
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleScaleChange = (event) => {
    isFrontCard
      ? setScale(event.target.value)
      : setBackScale(event.target.value);
    console.log(event.target.value, 'resize');
  };

  function clrchange(selectedColor) {
    if(!selectedColor) return;
    headerText === "Header Text" && (document.getElementById('color-header').style.color = selectedColor);
    headerText === "Footer Text" && (document.getElementById('color-footer').style.color = selectedColor);
  };


  function setFont() {
    const selectFont = document.getElementById("font");
    if (selectFont) {
     let selectFontValue = selectFont.options[selectFont.selectedIndex].value;
      if (selectFontValue) {
        headerText === "Header Text" && (document.getElementById("color-header").style.fontFamily = selectFontValue);
        headerText === "Footer Text" && (document.getElementById("color-footer").style.fontFamily = selectFontValue);
      }
    }
  }


  function handleHeaderClick() {
    setHeaderText('Header Text');
    // setQrCodeShow(true);
  }

  function handleFooterClick() {
    setHeaderText('Footer Text');
    // setQrCodeShow(false)
  }

  const handleClearData = () => {
    isFrontCard && setScaledImage(null);
    !isFrontCard && setBackHeaderImage(null);
    !isFrontCard && setBackFooterImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // const options = [
  //   {value: '6px', label: '6px'},
  //   {value: '8px', label: '8px'},
  //   {value: '10px', label: '10px'},
  //   {value: '12px', label: '12px'},
  // ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: selectedFontSize.value,
    }),
  };

  const handleChange = (selectedOption) => {
    setSelectedFontSize(selectedOption);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setFooterText(e.target.value);
    setBackFooterImage(null);
    setBackHeaderImage(null);
  };
  const handleInputHeader = (e) => {
    setInputText(e.target.value);
    setBackFooterImage(null);
    setBackHeaderImage(null);
  };
  const handleInputFooter = (e) => {
    setFooterText(e.target.value);
    setBackFooterImage(null);
    setBackHeaderImage(null);
  };

  const dottedDivRef = useRef(null);
  useEffect(() => {
    generateScreenshotURL(dottedDivRef.current);
  }, [scale, scaledImage, fileInputRef, dottedDivRef]);

  const generateScreenshotURL = async (element) => {
    try {
      const canvas = await html2canvas(element);
      const cropSize = 20;
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

  return (
    <section
      className={`flat_main flex  justify-evenly ${
        isFrontCard ? 'items-center' : 'items-end'
      }`}
    >
      <div className="flat_first-cont flex flex-col items-center justify-center pt-5">
        <h2 className=" text-2xl font-medium"> Custom Flat Card</h2>
        <div className="border border-solid border-black bg-white text-center h-[416px] w-[553px] -z-30">
          {isFrontCard ? (
            <div
              ref={dottedDivRef}
              className="flat__front-card min-h-full overflow-hidden relative flex justify-center h-100 "
            >
              <div className="dotted-div -z-10"></div>
              {scaledImage && (
                <div className="flex min-h-full flex-1 p-[18px] h-[416px] w-[553px] justify-center align-center overflow-hidden">
                  <img
                    className="absolute-scaled-image  -z-20"
                    src={scaledImage}
                    style={{
                      transform: `scale(${scale})`,
                    }}
                    alt="selected"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="relative min-h-full overflow-hidden">
              {isHeaderChecked ? (
                <div
                  className={`${backHeaderImage && 'flex'} ${
                    alignment === 'left' && 'justify-start'
                  } ${alignment === 'right' && 'justify-end'} ${
                    alignment === 'center' && 'justify-center'
                  } enclosed-div absolute top-0 m-3 overflow-hidden`}
                >
                  {backHeaderImage && (
                    <img
                      className="w-10 absolute"
                      src={backHeaderImage}
                      style={{transform: `scale(${backScale})`}}
                      alt="Selected Image"
                    />
                  )}
                  <input
                    id="color-header"
                    className={`border-none min-w-full ${
                      alignment === 'left' &&
                      headerText === 'Header Text' &&
                      'text-left'
                    } ${
                      alignment === 'center' &&
                      headerText === 'Header Text' &&
                      'text-center'
                    } ${
                      alignment === 'right' &&
                      headerText === 'Header Text' &&
                      'text-right'
                    }`}
                    value={inputText}
                    onChange={handleInputChange}
                    type="text"
                    placeholder={backHeaderImage ? '' : 'Header'}
                    style={{ fontSize: `${headerFontSize}px` }}
                  />
                </div>
              ) : null}
              {isFooterChecked ? (
                <div
                  className={`${backFooterImage && 'flex'} ${
                    alignment === 'left' && 'justify-start'
                  } ${alignment === 'right' && 'justify-end'} ${
                    alignment === 'center' && 'justify-center'
                  } enclosed-div absolute bottom-0 m-3 overflow-hidden`}
                >
                  {backFooterImage && (
                    <img
                      className="w-10 absolute"
                      src={backFooterImage}
                      style={{transform: `scale(${backScale})`}}
                      alt="Selected Image"
                    />
                  )}
                  <input
                    id="color-footer"
                    className={`border-none min-w-full ${
                      alignment === 'left' &&
                      headerText === 'Footer Text' &&
                      'text-left'
                    } ${
                      alignment === 'center' &&
                      headerText === 'Footer Text' &&
                      'text-center'
                    } ${
                      alignment === 'right' &&
                      headerText === 'Footer Text' &&
                      'text-right'
                    }`}
                    value={footerText}
                    type="text"
                    placeholder={backFooterImage ? '' : 'Footer'}
                    style={{ fontSize: `${footerFontSize}px` }}
                  />
                </div>
              ) : null}
            </div>
          )}
          <div className="flex gap-x-3 justify-center pt-2">
            <button
              onClick={() => setIsFrontCard(true)}
              className="card-button button-blue"
              type="button"
            >
              Card Front
            </button>
            <button
              className="card-button button-tomato"
              type="button"
              onClick={() => setIsFrontCard(false)}
            >
              Card Back
            </button>
          </div>
        </div>
      </div>

      <div className="flat_second-cont flex flex-col items-center justify-center relative">
        {!isFrontCard && (
          <>
            <div className="flex min-w-full gap-[42px] text-[23px] justify-evenly mb-5">
              <div className="header-btn">
                <button type="button" onClick={handleHeaderClick}>
                  Header
                </button>
              </div>
              <div className="footer-btn">
                <button type="button" onClick={handleFooterClick}>
                  Footer
                </button>
              </div>
            </div>
            <div className="header-text">
              <span>{headerText}</span>
              <br />
              {headerText === 'Header Text' ? (
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputHeader}
                />
              ) : (
                <input
                  type="text"
                  value={footerText}
                  onChange={handleInputFooter}
                />
              )}
              <div className="mt-3 flex gap-2 mb-15">
                <label className="field-label mr-3 ">
                  <b>Alignment</b>
                </label>
                <svg
                  className="alignment-left"
                  onClick={() => setAlignment('left')}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#637381"
                    d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                  />
                </svg>
                <svg
                  className="alignment-center"
                  onClick={() => setAlignment('center')}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#637381"
                    d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                  />
                </svg>
                <svg
                  className="alignment-right"
                  onClick={() => setAlignment('right')}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#637381"
                    d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                  />
                </svg>
              </div>
            </div>
            <select id="font" onClick={() => setFont()}>
              <option value="pinocchio" className={`font-pinocchio`}>
                Pinocchio
              </option>

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
            <select style={{width: "125px"}} onClick={handleFontSizeChange}>
           <option value="16">16px</option>
           <option value="20">20px</option>
           <option value="24">24px</option>
           <option value="28">28px</option>
           <option value="32">32px</option>
          </select>
            <div className="text-color mt-[25px] flex items-center gap-[5px]">
              <span>
                <b>Font Color</b>
              </span>
              <select id="s1" onChange={(e) => clrchange(e.target.value)}>
                <option id="r1" value="black">
                  Black
                </option>
                <option id="r2" value="yellow">
                  Yellow
                </option>
                <option id="r3" value="grey">
                  Grey
                </option>
                <option id="r4" value="red">
                  Red
                </option>
                <option id="r5" value="blue">
                  Blue
                </option>
                <option id="r6" value="green">
                  Green
                </option>
              </select>
              <br />
            </div>
            <button
              className="finish-editing"
              onClick={handleDivOpen}
              type="button"
            >
              Finish editing
            </button>
            <br />
          </>
        )}

        {isFrontCard && (
          <div>
            <img
              className="add-image-button h-[50px] w-[70px] mb-3"
              onChange={handleFilesChange}
              src={AddImage}
              alt="addimage"
            />
            <input
              type="file"
              className="choose-file"
              accept="image/*"
              onChange={handleFilesChange}
              ref={fileInputRef}
            />
            {scaledImage && (
              <div className="zoom-slider mt-3">
                <label htmlFor="scale">Resize:</label>
                <br />
                <input
                  type="range"
                  id="scale"
                  name="scale"
                  min="1"
                  max="3"
                  step="0.4"
                  value={isFrontCard ? scale : backScale}
                  onChange={handleScaleChange}
                />
                <br />
                <div className="dark-colorfull-btn flex gap-5 mt-[12px]">
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
                <div className="finish-button mt-[12px] pt-3 text-white bg-blue-500 text-center w-[150px] h-[50px]">
                  <button type="button" onClick={handleClearData}>
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {!isFrontCard && (
        <div className="flat__checkbox self-center">
          <input
            type="checkbox"
            name="header"
            value="header"
            checked={isHeaderChecked}
            onChange={handleHeaderCheckboxChange}
          />
          <label className="add-header" value={footerText} htmlFor="vehicle1">
            Add Header
          </label>
          <br />
          <input
            type="checkbox"
            name="footer"
            checked={isFooterChecked}
            onChange={handleFooterCheckboxChange}
            value="footer"
          />
          <label className="add-footer" htmlFor="vehicle2">
            Add Footer
          </label>
          <br />
          <div className="choose-file-btn-sec">
            <input
              type="file"
              id="myFile"
              onChange={handleFilesChange}
              ref={fileInputRef}
              name="filename"
            />
          </div>
          {qrCodeShow && (
            <div className="flex items-center mt-[173px] absolute gap-5 border border-solid border-gray-300 bg-gray-200">
              <img src="	https://cdn.shopify.com/s/files/1/0275/6457/2777/files/qr.png?v=1696332445" />
              <span className="qr-code font-bold ">ADD QR CODE</span>
            </div>
          )}

          {(backHeaderImage || backFooterImage) && (
            <div className="zoom-slider mt-3">
              <label htmlFor="scale">Resize:</label>
              <br />
              <input
                type="range"
                id="scale"
                name="scale"
                min="1"
                max="3"
                step="0.4"
                value={isFrontCard ? scale : backScale}
                onChange={handleScaleChange}
              />
              <br />
              <div className="dark-colorfull-btn flex gap-5 mt-[12px]">
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
              <div className="finish-button mt-[12px] pt-3 text-white bg-blue-500 text-center w-[150px] h-[50px]">
                <button type="button" onClick={handleClearData}>
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
