import {useState, useEffect} from 'react';
import {useNavigate} from '@remix-run/react';
import {FaArrowLeft} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import {Modal} from '../Modal';
import Loader from '../modal/Loader';
import AddImageIcon from '../../../assets/Image/add_image_icon.png';

export default function FlatCustomisableCard({
  setIsCardTypeSelectionPage,
  shopifyCustomisableCardProduct,
  customerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [frontImageDetails, setFrontImageDetails] = useState({
    imageFile: null,
    screenshotImageFile: null,
    zoom: 1,
    isColoredImage: true,
    isLongImage: false,
  });
  const [isMouseHoveredOnContainer, setIsMouseHoveredOnContainer] =
    useState(false);
  const [headerFooterVisibility, setHeaderFooterVisibility] = useState({
    isHeaderVisible: true,
    isFooterVisible: true,
  });
  const [observingData, setObservingData] = useState({
    isHeader: true,
    isFooter: false,
  });
  const [headerData, setHeaderData] = useState({
    customText: '',
    alignment: 'center',
    fontFamily: 'pinocchio',
    fontSize: 30,
    fontColor: '#000',
    zoom: 1,
    isColoredImage: true,
    isImageSelected: false,
    imageUrl: '',
    imageFile: null,
    isColoredImage: true,
  });
  const [footerData, setFooterData] = useState({
    customText: '',
    alignment: 'center',
    fontFamily: 'pinocchio',
    fontSize: 30,
    fontColor: '#000',
    zoom: 1,
    isColoredImage: true,
    isImageSelected: false,
    imageUrl: '',
    imageFile: null,
    isColoredImage: true,
  });
  const [customCardTitle, setCustomCardTitle] = useState('');
  const [s3ImageUrls, setS3ImageUrls] = useState({});
  const [checkTitleDuplicacyModalOpen, setCheckTitleDuplicacyModalOpen] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log({
      frontImageDetails,
      backImageDetails: {observingData, headerData, footerData},
    });
  }, [observingData, headerData, footerData]);

  useEffect(() => {
    // To Store the actual value instead of a promise inside screenshotUrl object key.
    const generateScreenshot = async () => {
      try {
        // Image file present, generating screenshot.
        if (selectedCardPage === 'Card Front') {
          const trimmedDiv = document.getElementById('frontTrimmedDiv');
          const screenshotImageFile = await generateTrimmedImageScreenshotFile(
            trimmedDiv,
          );
          setFrontImageDetails((prevFrontImageDetails) => {
            return {
              ...prevFrontImageDetails,
              screenshotImageFile,
            };
          });
        }
        if (
          selectedCardPage === 'Card Back' &&
          observingData.isHeader &&
          headerData.isImageSelected
        ) {
          const backHeaderImageDiv =
            document.getElementById('backHeaderImageDiv');
          const screenshotImageFile = await generateTrimmedImageScreenshotFile(
            backHeaderImageDiv,
          );
          setHeaderData((prevHeaderData) => {
            return {
              ...prevHeaderData,
              imageFile: screenshotImageFile,
            };
          });
        }
      } catch (error) {
        console.error('Error generating screenshot:', error);
      }
    };

    generateScreenshot();
  }, [
    frontImageDetails.imageFile,
    frontImageDetails.zoom,
    frontImageDetails.isColoredImage,
    headerData.imageUrl,
    headerData.zoom,
    headerData.isColoredImage,
    footerData.imageUrl,
    footerData.zoom,
    footerData.isColoredImage,
  ]);

  async function generateTrimmedImageScreenshotFile(element) {
    try {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');

      console.log(`${selectedCardPage} Screenshot URL: `, dataUrl);

      return dataUrlToFile(dataUrl);
    } catch (error) {
      console.error('Error generating a screenshot file:', error);
    }
  }

  // Convert the URL to a file
  function dataUrlToFile(dataUrl) {
    let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let filename = 'screenshot.png';

    return new File([u8arr], filename, {type: mime});
  }

  const handleCardPageSelectionButton = (event) => {
    event.preventDefault();
    switch (event.target.value) {
      case 'Card Front':
        setSelectedCardPage('Card Front');
        break;
      case 'Card Inside':
        setSelectedCardPage('Card Inside');
        break;
      case 'Card Back':
        setSelectedCardPage('Card Back');
        break;
    }
  };

  const handleImageFileInsertion = (event) => {
    const chosenFile = event.target.files[0];
    if (!chosenFile) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const aspectRatio = imageWidth / imageHeight;
        // If image is long
        const isLongImage = aspectRatio < 0.9 ? true : false;

        if (selectedCardPage === 'Card Front') {
          setFrontImageDetails((prevFrontImageDetails) => {
            return {
              ...prevFrontImageDetails,
              imageFile: URL.createObjectURL(chosenFile),
              isLongImage,
            };
          });
        }

        if (selectedCardPage === 'Card Back' && observingData.isHeader) {
          setHeaderData((prevHeaderData) => {
            return {
              ...prevHeaderData,
              customText: '',
              imageUrl: URL.createObjectURL(chosenFile),
              imageFile: URL.createObjectURL(chosenFile),
              isImageSelected: true,
            };
          });
        }

        if (selectedCardPage === 'Card Back' && observingData.isFooter) {
          setFooterData((prevFooterData) => {
            return {
              ...prevFooterData,
              customText: '',
              imageUrl: URL.createObjectURL(chosenFile),
              imageFile: URL.createObjectURL(chosenFile),
              isImageSelected: true,
            };
          });
        }
      };
      // To trigger the image onload event
      img.src = e.target.result;
    };
    // To trigger the reader onload event
    reader.readAsDataURL(chosenFile);
  };

  const handleZoomSliderChange = (event) => {
    const updatedZoomValue = event.target.value;
    if (selectedCardPage === 'Card Front') {
      setFrontImageDetails((prevFrontImageDetails) => {
        return {
          ...prevFrontImageDetails,
          zoom: updatedZoomValue,
        };
      });
    }
    if (selectedCardPage === 'Card Back' && observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          zoom: updatedZoomValue,
        };
      });
    }
    if (selectedCardPage === 'Card Back' && observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          zoom: updatedZoomValue,
        };
      });
    }
  };

  const handleImageColorChange = (event) => {
    let isColoredImage;
    event.target.value === 'grayscale' && (isColoredImage = false);
    event.target.value === 'colored' && (isColoredImage = true);

    if (selectedCardPage === 'Card Front') {
      setFrontImageDetails((prevFrontImageDetails) => {
        return {
          ...prevFrontImageDetails,
          isColoredImage,
        };
      });
    }
    if (selectedCardPage === 'Card Back' && observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          isColoredImage,
        };
      });
    }
    if (selectedCardPage === 'Card Back' && observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          isColoredImage,
        };
      });
    }
  };

  const handleSelectedImageReset = () => {
    selectedCardPage === 'Card Front' &&
      setFrontImageDetails({
        imageFile: null,
        screenshotUrl: null,
        zoom: 1,
        isColoredImage: true,
        isLongImage: false,
      });

    selectedCardPage === 'Card Back' &&
      observingData.isHeader &&
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          customText: headerData.isImageSelected
            ? ''
            : prevHeaderData.customText,
          imageUrl: '',
          imageFile: null,
          isImageSelected: false,
        };
      });

    selectedCardPage === 'Card Back' &&
      observingData.isFooter &&
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          customText: footerData.isImageSelected
            ? ''
            : prevFooterData.customText,
          imageUrl: '',
          imageFile: null,
          isImageSelected: false,
        };
      });
  };

  const handleQrSelectionButton = () => {};

  const handleCustomTextChange = (event) => {
    if (observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          customText: event.target.value,
          isImageSelected: false,
          imageFile: null,
          imageUrl: '',
        };
      });
    }
    if (observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          customText: event.target.value,
          isImageSelected: false,
          imageFile: null,
          imageUrl: '',
        };
      });
    }
  };

  const handleDataAlignment = (selectedAligment) => {
    if (observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          alignment: selectedAligment,
        };
      });
    }
    if (observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          alignment: selectedAligment,
        };
      });
    }
  };

  const handleFontFamilyChange = (event) => {
    if (observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          fontFamily: event.target.value,
        };
      });
    }
    if (observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          fontFamily: event.target.value,
        };
      });
    }
  };

  const handleFontSizeChange = (event) => {
    if (observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          fontSize: event.target.value,
        };
      });
    }
    if (observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          fontSize: event.target.value,
        };
      });
    }
  };

  const handleFontColorChange = (event) => {
    if (observingData.isHeader) {
      setHeaderData((prevHeaderData) => {
        return {
          ...prevHeaderData,
          fontColor: event.target.value,
        };
      });
    }
    if (observingData.isFooter) {
      setFooterData((prevFooterData) => {
        return {
          ...prevFooterData,
          fontColor: event.target.value,
        };
      });
    }
  };

  const handleFinishEditingButton = async () => {
    try {
      const isPdfUploaded = await uploadPdfRequest();
      if (!isPdfUploaded) return alert('Unable to upload the PDF.');
      setCheckTitleDuplicacyModalOpen(true);
    } catch (err) {
      throw err;
    }
  };

  async function uploadPdfRequest() {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const headerPayload = {
        data: headerData.customText,
        textAlign: headerData.alignment,
        justifyContent: 'center',
        flexDirection: 'column',
        fontType: headerData.fontFamily,
        fontSize: headerData.fontSize,
        fontColor: headerData.fontColor,
        zoom: headerData.zoom,
        isColored: headerData.isColoredImage,
        height: 50,
      };
      const footerPayload = {
        data: footerData.customText,
        textAlign: footerData.alignment,
        justifyContent: 'center',
        flexDirection: 'column',
        fontType: footerData.fontFamily,
        fontSize: footerData.fontSize,
        fontColor: footerData.fontColor,
        zoom: footerData.zoom,
        isColored: footerData.isColoredImage,
        height: 50,
      };

      formData.append('headerData', JSON.stringify(headerPayload));
      formData.append('footerData', JSON.stringify(footerPayload));

      formData.append('faceImage', frontImageDetails.screenshotImageFile);
      formData.append('backImage', null);
      formData.append('headerImage', headerData.imageFile);
      formData.append('footerImage', footerData.imageFile);

      formData.append('isLongImage', frontImageDetails.isLongImage);
      formData.append('isLongImageBack', null);
      formData.append('transformFace', frontImageDetails.zoom);
      formData.append('transformBack', null);
      formData.append('cardType', 'flat5x7');
      formData.append('name', `customer-${customerId}--`);

      const options = {
        method: 'POST',
        body: formData,
      };

      let data = await fetch(
        `https://api.simplynoted.com/api/customizedCard/uploadPDFv2?customerId=${customerId}`,
        options,
      );

      if (data.ok) {
        setIsLoading(false);
        const response = await data.json();
        //TODO: set the response to new state for the save
        setS3ImageUrls(response.result);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Failed uploading the PDF: ', err);
      return false;
    }
  }

  const handleCustomCardSaveButton = async () => {
    const isDuplicateTitle = await checkForDuplicateTitle();
    if (isDuplicateTitle) return alert('Card name already exists. 😔');
    const isCustomCardSaved = await saveCustomCard();
    if (!isCustomCardSaved) return alert('Unable to save the custom card.');
    alert('Custom card succesfully saved!! 🚀');
    // navigate(`/products/${customCardTitle}`);
  };

  async function checkForDuplicateTitle() {
    try {
      setIsLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productTitle: customCardTitle,
        }),
      };
      const response = await fetch(
        'https://api.simplynoted.com/api/storefront/product/checkDuplicateProductName',
        options,
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        return data.result.count === 0 ? false : true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Failed to check duplicacy for card title: ', err);
      return false;
    }
  }

  async function saveCustomCard() {
    try {
      setIsLoading(true);

      const formData = new FormData();

      const defaultPricing = [];

      const customVariantsPayload =
        shopifyCustomisableCardProduct.product.variants.edges.map((variant) => {
          defaultPricing.push(
            `${variant.node.title}: ${variant.node.price.amount}`,
          );
          return {
            option1: variant.node.title,
            price: variant.node.price.amount,
            sku: '',
            taxable: false,
          };
        });
      const customDefaultPricing = defaultPricing.join(', ');
      const payload = {
        product: {
          title: customCardTitle,
          vendor: shopifyCustomisableCardProduct.product.vendor,
          product_type: shopifyCustomisableCardProduct.product.productType,
          tags: shopifyCustomisableCardProduct.product.tags.join(', '),
          variants: customVariantsPayload,
          metafields: [
            {
              key: 'qrImage',
              // TODO: Have a dynamic value here.
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
              value: customDefaultPricing,
              value_type: 'string',
              namespace: 'product',
            },
          ],
        },

        customFields: {
          cardType: 'flat5x7',
          isHeaderIncluded: headerFooterVisibility.isHeaderVisible,
          isFooterIncluded: headerFooterVisibility.isFooterVisible,
          messageAreaPosition: 'TOP',
          header: {
            data: headerData.customText,
            textAlign: headerData.alignment,
            justifyContent: 'center',
            flexDirection: 'column',
            fontType: headerData.fontFamily,
            fontSize: headerData.fontSize,
            fontColor: headerData.fontColor,
            zoom: headerData.zoom,
            isColored: headerData.isColoredImage,
            height: 50,
          },
          message: {
            fontSize: null,
            fontFamily: 'Tarzan',
            height: 0,
            fontAutoResize: true,
          },
          footer: {
            data: footerData.customText,
            textAlign: footerData.alignment,
            justifyContent: 'center',
            flexDirection: 'column',
            fontType: footerData.fontFamily,
            fontSize: footerData.fontSize,
            fontColor: footerData.fontColor,
            zoom: footerData.zoom,
            isColored: footerData.isColoredImage,
            height: 50,
          },
          face: {
            zoom: frontImageDetails.zoom,
            isColored: frontImageDetails.isColoredImage,
            width: '100%',
            height: '0px',
          },
          back: {
            zoom: '1',
            isColored: true,
            width: '100%',
            height: '0px',
          },
          pdfURL: s3ImageUrls.pdfUrl,
        },
        s3ImageUrls: s3ImageUrls,
        featuredImage: frontImageDetails.screenshotImageFile,
      };

      formData.append('product', JSON.stringify(payload.product));
      formData.append('customFields', JSON.stringify(payload.customFields));
      formData.append('s3ImageUrls', JSON.stringify(payload.s3ImageUrls));
      formData.append('featuredImage', payload.featuredImage);

      let options = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(
        ` https://api.simplynoted.com/api/customizedCard/save?customerId=${customerId}`,
        options,
      );

      setIsLoading(false);
      return response.ok ? true : false;
    } catch (err) {
      console.error('Failed to save the custom card: ', err);
      return false;
    }
  }

  const GoBackButton = () => {
    return (
      <div
        className="button-tomato text-white inline flex justify-center items-center absolute top-0 left-3 p-3 font-semibold cursor-pointer text-xs"
        onClick={() => setIsCardTypeSelectionPage(true)}
      >
        <FaArrowLeft /> &nbsp; GO BACK
      </div>
    );
  };

  return isLoading ? (
    <Loader loaderMessage="Saving in progress..." />
  ) : (
    <>
      {checkTitleDuplicacyModalOpen && (
        <Modal cancelLink={() => setCheckTitleDuplicacyModalOpen(false)}>
          <div>
            <div>
              <p className="bg-[#deebf7] h-[55px] flex justify-center items-center text-black border-2 border-solid border-['gray'] font-bold">
                Name your card and save it.
              </p>
            </div>
            <input
              className="w-full mt-5 border-black border-solid border-2 outline-none focus:outline-none"
              type="text"
              onChange={(e) => setCustomCardTitle(e.target.value)}
            ></input>
            <br />
            <button
              className="bg-[#1b5299] border-none text-white text-sm outline-none p-1 pl-8 pr-8 min-w-[554px] h-[43px] mt-5"
              type="button"
              onClick={handleCustomCardSaveButton}
            >
              SAVE CARD
            </button>
          </div>
        </Modal>
      )}

      <section className="relative min-h-[553px] flex justify-center items-center flex-wrap gap-5 mt-4">
        <GoBackButton />
        <div className="flex flex-col justify-center items-center flex-1 ml-7">
          <span className="text-2xl mb-2">Custom Flat {selectedCardPage}</span>
          <div>
            <div
              className="h-[350px] min-w-[500px] bg-white relative border-2 border-black border-solid overflow-hidden"
              style={{zIndex: selectedCardPage === 'Card Front' ? '-30' : '0'}}
              onMouseOver={() => setIsMouseHoveredOnContainer(true)}
              onMouseOut={() => setIsMouseHoveredOnContainer(false)}
            >
              {(selectedCardPage === 'Card Front' && (
                <>
                  <div
                    className="absolute flex justify-center items-center m-auto inset-0 h-[330px] w-[480px] border-2 border-dashed border-[#ff0000]"
                    style={{background: 'transparent', zIndex: '-10'}}
                  ></div>
                  <div
                    className="absolute flex justify-center items-center m-auto inset-0 h-[330px] w-[480px]"
                    id="frontTrimmedDiv"
                    style={{zIndex: '-20'}}
                  >
                    {frontImageDetails.imageFile && (
                      <img
                        src={frontImageDetails.imageFile}
                        alt="Selected front card image file"
                        className={`object-contain h-full ${
                          frontImageDetails.isColoredImage
                            ? 'grayscale-0'
                            : 'grayscale'
                        }`}
                        draggable="false"
                        style={{transform: `scale(${frontImageDetails.zoom})`}}
                      />
                    )}
                  </div>
                </>
              )) ||
                (selectedCardPage === 'Card Back' && (
                  <div
                    className="flex flex-col h-full p-2"
                    id="backTrimmedDiv"
                    style={{zIndex: '-20'}}
                  >
                    <div
                      className={`flex h-[50px] border-dashed border-black font-semibold pl-6 pr-6 items-center ${
                        headerFooterVisibility.isHeaderVisible
                          ? 'block '
                          : 'hidden '
                      }  ${isMouseHoveredOnContainer && 'border '} ${
                        (headerData.alignment === 'left' && 'justify-start ') ||
                        (headerData.alignment === 'center' &&
                          'justify-center ') ||
                        (headerData.alignment === 'right' && 'justify-end ')
                      }`}
                    >
                      <div
                        className={`font-${headerData.fontFamily}`}
                        style={{
                          fontSize: `${headerData.fontSize}px`,
                          color: `${headerData.fontColor}`,
                        }}
                      >
                        {!headerData.isImageSelected && headerData.customText}
                      </div>
                      {headerData.isImageSelected && (
                        <div
                          id="backHeaderImageDiv"
                          className="h-[45px] w-[60px] overflow-hidden"
                        >
                          <img
                            src={headerData.imageUrl}
                            className={`object-contain h-full ${
                              headerData.isColoredImage
                                ? 'grayscale-0'
                                : 'grayscale'
                            }`}
                            style={{transform: `scale(${headerData.zoom})`}}
                            alt="Selected header image"
                            draggable="false"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 pl-6 mt-2 mb-2">
                      <span>Your custom message text will be here...</span>
                    </div>
                    <div
                      className={`flex h-[50px] border-dashed border-black font-semibold pl-6 pr-6 items-center ${
                        headerFooterVisibility.isFooterVisible
                          ? 'block '
                          : 'hidden '
                      } ${isMouseHoveredOnContainer && 'border '} ${
                        (footerData.alignment === 'left' && 'justify-start ') ||
                        (footerData.alignment === 'center' &&
                          'justify-center ') ||
                        (footerData.alignment === 'right' && 'justify-end ')
                      }`}
                    >
                      <div
                        className={`font-${footerData.fontFamily}`}
                        style={{
                          fontSize: `${footerData.fontSize}px`,
                          color: `${footerData.fontColor}`,
                        }}
                      >
                        {!footerData.isImageSelected && footerData.customText}
                      </div>
                      {footerData.isImageSelected && (
                        <div
                          id="backFooterImageDiv"
                          className="h-[45px] w-[60px] overflow-hidden"
                        >
                          <img
                            src={footerData.imageUrl}
                            className={`object-contain h-full ${
                              footerData.isColoredImage
                                ? 'grayscale-0'
                                : 'grayscale'
                            }`}
                            style={{transform: `scale(${footerData.zoom})`}}
                            alt="Selected footer image"
                            draggable="false"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex gap-4 w-full mt-2">
              <button
                value="Card Front"
                className={`flex-1 p-2 text-white ${
                  selectedCardPage === 'Card Front'
                    ? 'button-blue'
                    : 'button-tomato'
                }`}
                onClick={handleCardPageSelectionButton}
              >
                Card Front
              </button>
              <button
                value="Card Back"
                className={`flex-1 p-2 text-white ${
                  selectedCardPage === 'Card Back'
                    ? 'button-blue'
                    : 'button-tomato'
                }`}
                onClick={handleCardPageSelectionButton}
              >
                Card Back
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start gap-5 min-h-[330px] min-w-[240px] flex-1">
          {selectedCardPage === 'Card Front' && (
            <>
              <div className="relative w-[60px] h-[50px]">
                <img
                  src={AddImageIcon}
                  alt="Add image file icon"
                  draggable="false"
                />
                {selectedCardPage === 'Card Front' && (
                  <input
                    type="file"
                    className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                    onChange={handleImageFileInsertion}
                  />
                )}
              </div>
              <div className="h-[200px]">
                {selectedCardPage === 'Card Front' &&
                  frontImageDetails.imageFile && (
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col">
                        <span>Resize image</span>
                        <input
                          type="range"
                          min="0.3"
                          max="2"
                          step="0.1"
                          value={frontImageDetails.zoom}
                          onChange={handleZoomSliderChange}
                        />
                      </div>
                      <div className="flex justify-center items-center gap-5">
                        <label htmlFor="bw-radio-btn">
                          <input
                            id="bw-radio-btn"
                            name="isImageColored"
                            type="radio"
                            value="grayscale"
                            onChange={handleImageColorChange}
                            checked={
                              observingData.isHeader
                                ? !headerData.isColoredImage
                                : !footerData.isColoredImage
                            }
                          />
                          &nbsp;B/W
                        </label>
                        <label htmlFor="colored-radio-btn">
                          <input
                            id="colored-radio-btn"
                            type="radio"
                            name="isImageColored"
                            value="colored"
                            onChange={handleImageColorChange}
                            defaultChecked
                          />
                          &nbsp;Color
                        </label>
                      </div>
                      <button
                        className="bg-[#1b5299] border-none text-white text-sm outline-none text-center h-[40px]"
                        type="button"
                        onClick={handleSelectedImageReset}
                      >
                        Remove image
                      </button>
                    </div>
                  )}
              </div>
              {selectedCardPage === 'Card Back' && (
                <button
                  type="button"
                  className="bg-[#1b5299] h-[40px] border-none text-white text-sm outline-none text-center w-full"
                  onClick={handleFinishEditingButton}
                >
                  Finish Editing
                </button>
              )}
            </>
          )}
          {selectedCardPage === 'Card Back' && (
            <>
              <div>
                <div className="flex items-center space-x-4 gap-8 mb-5">
                  <label
                    htmlFor="headerCheckbox"
                    className="flex items-center cursor-pointer text-[#1b5299]"
                  >
                    <input
                      type="checkbox"
                      id="headerCheckbox"
                      checked={headerFooterVisibility.isHeaderVisible}
                      value={headerFooterVisibility.isHeaderVisible}
                      onChange={() =>
                        setHeaderFooterVisibility((prevVisibility) => ({
                          ...prevVisibility,
                          isHeaderVisible: !prevVisibility.isHeaderVisible,
                        }))
                      }
                      className="hidden"
                    />
                    <div className="w-4 h-4 border border-[#1b5299] flex items-center justify-center">
                      {headerFooterVisibility.isHeaderVisible && (
                        <svg
                          className="w-4 h-4 text-[#1b5299] fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 font-semibold text-sm">
                      Add Header
                    </span>
                  </label>

                  <label
                    htmlFor="footerCheckbox"
                    className="flex items-center cursor-pointer text-[#1b5299]"
                  >
                    <input
                      type="checkbox"
                      id="footerCheckbox"
                      checked={headerFooterVisibility.isFooterVisible}
                      value={headerFooterVisibility.isFooterVisible}
                      onChange={() =>
                        setHeaderFooterVisibility((prevVisibility) => ({
                          ...prevVisibility,
                          isFooterVisible: !prevVisibility.isFooterVisible,
                        }))
                      }
                      className="hidden"
                    />
                    <div className="w-4 h-4 border border-[#1b5299] flex items-center justify-center">
                      {headerFooterVisibility.isFooterVisible && (
                        <svg
                          className="w-4 h-4 text-[#1b5299] fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 font-semibold text-sm">
                      Add Footer
                    </span>
                  </label>
                </div>
              </div>
              <div
                className="flex justify-between items-center text-white gap-1 "
                style={{width: '75%'}}
              >
                <button
                  className={`${
                    observingData.isHeader
                      ? 'bg-[#1b5299] text-white shadow-md'
                      : 'bg-transparent text-[#1b5299]'
                  } h-[35px] border border-solid border-[#1b5299] outline-none text-center flex-1 font-semibold`}
                  onClick={() =>
                    setObservingData({isHeader: true, isFooter: false})
                  }
                >
                  Header
                </button>
                <button
                  className={`${
                    observingData.isFooter
                      ? 'bg-[#1b5299] text-white shadow-md'
                      : 'bg-transparent text-[#1b5299]'
                  } h-[38px] border border-solid border-[#1b5299] outline-none text-center flex-1 font-semibold`}
                  onClick={() =>
                    setObservingData({isHeader: false, isFooter: true})
                  }
                >
                  Footer
                </button>
              </div>
              <div className="flex min-h-[330px] w-full">
                <div className="flex flex-1">
                  <div className="flex flex-col">
                    <label htmlFor="custom-text">
                      <span className="font-semibold">
                        {observingData.isHeader ? 'Header Text' : 'Footer Text'}
                      </span>
                      <br />
                      <input
                        id="custom-text"
                        type="text"
                        placeholder={`Enter ${
                          observingData.isHeader ? 'header' : 'footer'
                        } text here.`}
                        value={
                          observingData.isHeader
                            ? headerData.customText
                            : footerData.customText
                        }
                        onChange={handleCustomTextChange}
                      />
                    </label>
                    <div className="flex h-[20px] mt-3 mb-5">
                      <span className="flex-1 mr-2">Alignment</span>
                      <div className="flex-1 flex">
                        <svg
                          className="flex-1 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          onClick={() => handleDataAlignment('left')}
                        >
                          <path
                            fill="#637381"
                            d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                          />
                        </svg>
                        <svg
                          className="flex-1 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          onClick={() => handleDataAlignment('center')}
                        >
                          <path
                            fill="#637381"
                            d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                          />
                        </svg>
                        <svg
                          className="flex-1 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          onClick={() => handleDataAlignment('right')}
                        >
                          <path
                            fill="#637381"
                            d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                          />
                        </svg>
                      </div>
                    </div>

                    <label
                      htmlFor="font-family-selection"
                      className="mt-1 mb-3"
                    >
                      <span className="font-bold">Font</span>
                      <br />
                      <select
                        id="font-family-selection"
                        className="min-w-[207px]"
                        value={
                          observingData.isHeader
                            ? headerData.fontFamily
                            : footerData.fontFamily
                        }
                        onChange={handleFontFamilyChange}
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

                        <option
                          value="cinderella"
                          className={`font-cinderella`}
                        >
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
                    </label>

                    <label htmlFor="font-size-selection" className="mb-3">
                      <span className="font-bold">Font Size</span>
                      <br />
                      <select
                        id="font-size-selection"
                        className="min-w-[200px]"
                        onChange={handleFontSizeChange}
                        value={
                          observingData.isHeader
                            ? headerData.fontSize
                            : footerData.fontSize
                        }
                      >
                        {Array.from({length: 33}, (_, index) => (
                          <option key={index} value={index + 8}>
                            {index + 8}px
                          </option>
                        ))}
                      </select>
                    </label>

                    <label htmlFor="font-color-selection" className="mb-3">
                      <span className="font-bold">Font Color</span>
                      <br />
                      <select
                        id="font-color-selection"
                        onChange={handleFontColorChange}
                      >
                        <option value="black">Black</option>
                        <option value="yellow">Yellow</option>
                        <option value="grey">Grey</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col flex-1 ml-10">
                  <div className="relative w-[60px] h-[50px]">
                    <img
                      src={AddImageIcon}
                      alt="Add image file icon"
                      draggable="false"
                    />
                    {observingData.isHeader && (
                      <input
                        type="file"
                        className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                        onChange={handleImageFileInsertion}
                      />
                    )}
                    {observingData.isFooter && (
                      <input
                        type="file"
                        className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                        onChange={handleImageFileInsertion}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <div className="min-h-[130px] w-1/2">
                      {((headerData.imageFile && headerData.imageUrl) ||
                        (footerData.imageFile && footerData.imageUrl)) && (
                        <>
                          <div className="flex flex-col mb-3 mt-3">
                            <span>Resize image</span>
                            <input
                              type="range"
                              min="0.3"
                              max="1"
                              step="0.1"
                              value={
                                observingData.isHeader
                                  ? headerData.zoom
                                  : footerData.zoom
                              }
                              onChange={handleZoomSliderChange}
                            />
                          </div>
                          <div className="flex justify-start items-center gap-5">
                            <label htmlFor="bw-radio-btn">
                              <input
                                id="bw-radio-btn"
                                name="isImageColored"
                                type="radio"
                                value="grayscale"
                                onChange={handleImageColorChange}
                              />
                              &nbsp;B/W
                            </label>
                            <label htmlFor="colored-radio-btn">
                              <input
                                id="colored-radio-btn"
                                type="radio"
                                name="isImageColored"
                                value="colored"
                                onChange={handleImageColorChange}
                                defaultChecked
                                checked={
                                  observingData.isHeader
                                    ? headerData.isColoredImage
                                    : footerData.isColoredImage
                                }
                              />
                              &nbsp;Color
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      className="bg-[#1b5299] border-none text-white text-sm outline-none text-center h-[40px] w-1/2"
                      type="button"
                      onClick={handleSelectedImageReset}
                    >
                      Remove image
                    </button>
                  </div>

                  <div
                    className="w-[200px] cursor-pointer bg-[#1b5299] border border-solid border-black rounded p-1.5 flex items-center justify-start gap-2 text-white flex-wrap mb-5 mt-10"
                    onClick={handleQrSelectionButton}
                  >
                    <div>
                      <img
                        src="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/qr.png?v=1696332445"
                        alt="QR Sample Image"
                        className="h-[40px]"
                        draggable="false"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Add QR Code</span>
                      <span className="text-xs">
                        &#40;to inside of card&#41;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="bg-[#1b5299] h-[40px] border-none text-white text-sm outline-none text-center w-[250px] font-semibold"
                  onClick={handleFinishEditingButton}
                >
                  Finish Editing
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}