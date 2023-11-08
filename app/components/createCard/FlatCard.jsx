import {useState, useRef, useEffect} from 'react';
import AddImage from '../../../assets/Image/add_image_icon.png';
import html2canvas from 'html2canvas';
import {Link, Modal} from '../../components';
import {useAddressBook} from '../AddressBookContext';
import Loader from '../modal/Loader';
import {useNavigate} from '@remix-run/react';

export default function FlatCard({CardData, variants, setCard}) {
  const [isFrontCard, setIsFrontCard] = useState(true);
  const [headerText, setHeaderText] = useState('Header Text');

  const [scaledImage, setScaledImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const customerIdRef = useRef('');
  customerIdRef.current = localStorage.getItem('customerId');
  const customerId = customerIdRef.current;
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [dataURL, setDataURL] = useState(null);
  const [pdfData, setPdfData] = useState({});

  const navigate = useNavigate();

  const {
    inputText,
    setInputText,
    alignment,
    setAlignment,
    headerFontSize,
    setHeaderFontSize,
    selectButton,
    setSelectButton,
    backScale,
    setBackScale,
    selectFontValue,
    setSelectFontValue,
    footerText,
    setFooterText,
    footeralignment,
    setFooteraligmment,
    footerFontSize,
    setFooterFontSize,
    selectedColor,
    setSelectedColor,
    isHeaderChecked,
    setIsHeaderChecked,
    isFooterChecked,
    setIsFooterChecked,
    backHeaderImage,
    setBackHeaderImage,
    backFooterImage,
    setBackFooterImage,
    scale,
    setScale,
  } = useAddressBook();

  useEffect(() => {
    setInputText('');
    setAlignment('');
    setHeaderFontSize(16);
    setSelectButton(null);
    setBackScale(1);
    setSelectFontValue('');
    setFooterText('');
    setFooteraligmment(false);
    setFooterFontSize(16);
    setSelectedColor('#000');
    setIsHeaderChecked(false);
    setIsFooterChecked(false);
    setBackHeaderImage(null);
    setBackFooterImage(null);
    setScale(1);
  }, []);

  const openModal = (data) => {
    setModalData(data);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFontSizeChange = (event) => {
    headerText === 'Header Text' && setHeaderFontSize(event.target.value);
    headerText === 'Footer Text' && setFooterFontSize(event.target.value);
  };

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
    console.log('selectedFile', selectedFile);

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
    setSelectedColor(selectedColor);
    if (!selectedColor) return;
    headerText === 'Header Text' &&
      (document.getElementById('color-header').style.color = selectedColor);
    headerText === 'Footer Text' &&
      (document.getElementById('color-footer').style.color = selectedColor);
  }

  function setFont() {
    const selectFont = document.getElementById('font');
    if (selectFont) {
      setSelectFontValue(selectFont.options[selectFont.selectedIndex].value);
      if (selectFontValue) {
        headerText === 'Header Text' &&
          (document.getElementById('color-header').style.fontFamily =
            selectFontValue);
        headerText === 'Footer Text' &&
          (document.getElementById('color-footer').style.fontFamily =
            selectFontValue);
      }
    }
  }

  function handleHeaderClick() {
    setHeaderText(
      headerText === 'Header Text' ? 'Header Image' : 'Header Text',
    );

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
    setBackHeaderImage(null);
  };
  const handleInputFooter = (e) => {
    setFooterText(e.target.value);
    setBackFooterImage(null);
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
      console.log(dataURL, 'imaBFBSKDFKSDKFSKDFKJSDFKSDFKDSFKSDKJFKJSDgeURL');
      setDataURL(dataURL);
      return dataURL;
    } catch (error) {
      console.error('Error generating screenshot:', error);
    }
  };

  const payloadDependency = [
    inputText,
    alignment,
    headerFontSize,
    selectButton,
    backScale,
    selectFontValue,
    footerText,
    footeralignment,
    footerFontSize,
    isHeaderChecked,
    isFooterChecked,
    backHeaderImage,
    backFooterImage,
    selectedColor,
    footerText,
    dataURL,
  ];
  let payload;
  useEffect(() => {
    console.log('scaledImage', scaledImage);

    payload = {
      headerData: {
        data: inputText,
        textAlign: alignment,
        isColored: selectButton === 'dark' ? false : true,
        zoom: backScale,
        fontType: selectFontValue,
        fontSize: headerFontSize,
        fontColor: selectedColor,
        justifyContent: 'center',
        flexDirection: 'column',
        isImage: 'false',
      },
      footerData: {
        data: footerText,
        textAlign: footeralignment,
        fontSize: footerFontSize,
        fontType: selectFontValue,
        zoom: backScale,
        fontColor: selectedColor,
        isColored: selectButton === 'dark' ? false : true,
        justifyContent: 'center',
        flexDirection: 'column',
        isImage: 'false',
      },
      faceImage: dataURL,
      backImage: scaledImage,
      zoom: backScale,
      // isHeaderIncluded: isHeaderChecked,
      // isFooterIncluded: isFooterChecked,
      headerImage: backHeaderImage,
      footerImage: backFooterImage,
      isLongImage: 'false',
      transformFace: '1',
      name: `flat-card-${customerId}`,
      cardType: 'flat5x7',
      transformBack: '1',
      isLongImageBack: 'false',
      QR: 'simply',
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
    setError(null);
    setLoader(true);
    try {
      let formData = new FormData();
      console.log(payload, 'payloadpayloadpayloadpayloadpayload');
      // for (const name in payload) {
      //   formdata.append(name, JSON.stringify(payload[name]));

      // }
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
      formData.append('cardType', 'flat');
      console.log(formData, '------------------------------------------');
      let requestOptions = {
        method: 'POST',
        body: formData,
      };

      const data = await fetch(
        `https://api.simplynoted.com/api/customizedCard/uploadPDFv2?customerId=${customerId}`,
        requestOptions,
      );
      if (data.ok) {
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
      let response = await fetch(
        'https://api.simplynoted.com/api/storefront/product/checkDuplicateProductName',
        saveCardRequests,
      );

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
                data: inputText,
                textAlign: alignment,
                isColored: selectButton === 'dark' ? false : true,
                zoom: backScale,
                fontType: selectFontValue,
                fontSize: headerFontSize,
                fontColor: selectedColor,
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
                data: footerText,
                textAlign: footeralignment,
                fontSize: footerFontSize,
                fontType: selectFontValue,
                zoom: backScale,
                fontColor: selectedColor,
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
          // alert('Saved API triggered successfully.');
        } else if (data.result.count === 1) {
          setError(true);
          alert('Card already exists.');
        }
        console.log(data);
      } else {
        console.error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  console.log(scaledImage, 'sdfsfssfsfsdffsdf');
  return (
    <>
     <button type="button" onClick={() => setCard(false)}>Back</button>
      {loader ? (
        <Loader loaderMessage="Saving Flat Card" />
      ) : (
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
                        className={`absolute-scaled-image -z-20 ${
                          selectButton === 'dark' ? 'grayscale' : 'grayscale-0'
                        } image-scal`}
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
                      }  enclosed-div absolute top-0 m-3 overflow-hidden`}
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
                        className={`border-none min-w-full${
                          alignment === 'left' && 'text-left'
                        } ${alignment === 'center' && 'text-center'} ${
                          alignment === 'right' && 'text-right'
                        }`}
                        value={inputText}
                        onChange={handleInputChange}
                        type="text"
                        placeholder={backHeaderImage ? '' : 'Header'}
                        style={{fontSize: `${headerFontSize}px`}}
                      />
                    </div>
                  ) : null}
                  {isFooterChecked ? (
                    <div
                      className={`${backFooterImage && 'flex'} ${
                        footeralignment === 'left' && 'justify-start'
                      } ${footeralignment === 'right' && 'justify-end'} ${
                        footeralignment === 'center' && 'justify-center'
                      } enclosed-div   border-black  absolute bottom-0 m-3 overflow-hidden`}
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
                        className={`border-none  min-w-full ${
                          footeralignment === 'left' && 'text-left'
                        } ${footeralignment === 'center' && 'text-center'} ${
                          footeralignment === 'right' && 'text-right'
                        }`}
                        value={footerText}
                        type="text"
                        placeholder={backFooterImage ? '' : 'Footer'}
                        style={{fontSize: `${footerFontSize}px`}}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <div className="flex gap-x-3 justify-center pt-2 w-full flex-1">
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
          <div className="flat_second-cont flex flex-col items-center justify-center relative">
            {!isFrontCard && (
              <>
                <div className="flex min-w-full gap-[42px] text-[23px] justify-evenly mb-5">
                  <div className="header-btn">
                    <button
                      className={`${
                        headerText === 'Header Text'
                          ? 'text-[36px] opacity-100 font-bold'
                          : 'text-[20px] opacity-50 font-normal'
                      } text-[#001a5f]`}
                      type="button"
                      onClick={handleHeaderClick}
                    >
                      Header
                    </button>
                  </div>
                  <div className="footer-btn">
                    <button
                      className={`${
                        headerText === 'Footer Text'
                          ? 'text-[36px]  opacity-100  font-bold'
                          : 'text-[20x] opacity-50 font-normal'
                      } text-[#001a5f]`}
                      type="button"
                      onClick={handleFooterClick}
                    >
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
                      onClick={() => {
                        if (isHeaderChecked && headerText === 'Header Text') {
                          setAlignment('left');
                        }
                        if (isFooterChecked && headerText === 'Footer Text') {
                          setFooteraligmment('left');
                        }
                      }}
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
                      onClick={() => {
                        if (isHeaderChecked && headerText === 'Header Text') {
                          setAlignment('center');
                        }
                        if (isFooterChecked && headerText === 'Footer Text') {
                          setFooteraligmment('center');
                        }
                      }}
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
                      onClick={() => {
                        if (isHeaderChecked && headerText === 'Header Text') {
                          setAlignment('right');
                        }
                        if (isFooterChecked && headerText === 'Footer Text') {
                          setFooteraligmment('right');
                        }
                      }}
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
                <span className="font-bold">Font-Family</span>
                <select
                  id="font"
                  className="min-w-[207px] h-9 rounded-[12px]"
                  onChange={() => setFont()}
                >
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
                <span>Font</span>
                <select
                  style={{width: '200px', borderRadius: '19px'}}
                  onClick={handleFontSizeChange}
                >
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
                  onClick={() => handleFinishEditing()}
                  className="finish-editing"
                >
                  Finish editing
                </button>

                {modalOpen && (
                  <Modal cancelLink={closeModal}>
                    <div className="modal-flatpage bg-white">
                      <div className="first-1st">
                        <p className="modal-save-name">
                          Name your card and save it.
                        </p>
                      </div>
                      <input
                        className="input-modal"
                        onChange={(e) => setProductTitle(e.target.value)}
                        type="text"
                      />
                      <br />
                      {error && (
                        <span className="text-red-500">
                          *Card with the same name already exists. Please try
                          another name
                        </span>
                      )}
                      <button
                        className="button-modal"
                        type="button"
                        onClick={saveCardClick}
                      >
                        SAVE CARD
                      </button>
                    </div>
                  </Modal>
                )}
                <br />
              </>
            )}
            {isFrontCard && (
              <div>
                <div className="add-image-choose-file flex font-bold">
                  <img
                    className="add-image-button h-[50px] w-[70px] mb-3"
                    onClick={() =>
                      document.querySelector('.choose-file').click()
                    }
                    src={AddImage}
                    alt="addimage"
                  />
                  <span>Add Image</span>
                </div>
                <input
                  type="file"
                  className="choose-file"
                  accept="image/*"
                  onChange={handleFilesChange}
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
                      onInput={handleScaleChange}
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
              <label
                className="add-header"
                value={footerText}
                htmlFor="vehicle1"
              >
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
              <div
                className="choose-file-btn-sec"
                style={{position: 'relative'}}
              >
                <div className="header-image-select flex">
                  <img
                    className="w-12"
                    src={AddImage}
                    alt=""
                    onClick={() => document.getElementById('myFile').click()}
                    style={{cursor: 'pointer'}}
                  />
                  {headerText === 'Header Image' && <span>Header Image</span>}
                </div>
                <input
                  type="file"
                  id="myFile"
                  onChange={handleFilesChange}
                  ref={fileInputRef}
                  name="filename"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    width: '0',
                    top: 0,
                    left: 0,
                  }}
                />
              </div>

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
                    onInput={handleScaleChange}
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
      )}
    </>
  );
}
