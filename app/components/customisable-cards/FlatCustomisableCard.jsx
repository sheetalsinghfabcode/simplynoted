import {useState, useEffect, useRef} from 'react';
import {useNavigate} from '@remix-run/react';
import {FaArrowLeft} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import {Modal} from '../Modal';
import CircularLoader from '../CircularLoder';
import AddImageIcon from '../../../assets/Image/add_image_icon.png';
import CustomCheckbox from '../CustomCheckbox';
import DefaultFrontCardImage from '../../../assets/Image/flatCustomImg.png';

export default function FlatCustomisableCard({
  setIsCardTypeSelectionPage,
  shopifyCustomisableCardProduct,
  customerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRotationAnimationApplied, setIsRotationAnimationApplied] =
    useState(false);
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [frontImageDetails, setFrontImageDetails] = useState({
    isImageSelected: false,
    imageFile: null,
    blackAndWhiteImageFile: null,
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
  const [qr, setQr] = useState({
    isInputModalOpened: false,
    isConfirmationModalOpened: false,
    inputText: '',
    isEnteredTextInvalid: false,
    isQrAdded: false,
    generatedQrImageLink:
      'https://api.qrserver.com/v1/create-qr-code/?size=48x48&data=simplynoted',
  });
  const [errorResponse, setErrorResponse] = useState({
    message: '',
    status: false,
  });

  const frontImageRef = useRef(null);
  const backHeaderImageRef = useRef(null);
  const backFooterImageRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollTo(0, 0);
    };
    if (isLoading) {
      window.addEventListener('scroll', scrollHandler);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [isLoading]);

  useEffect(() => {
    // Generate default image for the face URL of the custom card.
    if (frontImageDetails.isImageSelected) return;
    const generateDefaultScreenshotImage = async () => {
      try {
        const response = await fetch(DefaultFrontCardImage);
        const blob = await response.blob();
        const filename = 'default-screenshot.png';
        const frontDefaultImageFile = new File([blob], filename, {
          type: blob.type,
        });
        setFrontImageDetails((prevFrontImageDetails) => {
          return {
            ...prevFrontImageDetails,
            screenshotImageFile: frontDefaultImageFile,
          };
        });
      } catch (error) {
        console.error('Error fetching the default image:', error);
      }
    };

    generateDefaultScreenshotImage();
  }, [frontImageDetails.isImageSelected]);

  useEffect(() => {
    console.log({
      qr,
      frontImageDetails,
      backImageDetails: {observingData, headerData, footerData},
    });
  }, [observingData, headerData, footerData, qr]);

  useEffect(() => {
    // To Store the actual value instead of a promise inside screenshotUrl object key.
    const generateScreenshot = async () => {
      try {
        // Image file present, generating screenshot.
        if (
          selectedCardPage === 'Card Front' &&
          frontImageDetails.isImageSelected
        ) {
          const trimmedDiv = document.getElementById('frontTrimmedDiv');
          // Wait for the image to be fully loaded for the timing issue.
          await new Promise((resolve) => {
            const image = trimmedDiv.querySelector('img');
            if (image.complete) {
              resolve();
            } else {
              image.onload = resolve;
            }
          });

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
      } catch (error) {
        console.error('Error generating screenshot:', error);
      }
    };
    generateScreenshot();
  }, [
    frontImageDetails.imageFile,
    frontImageDetails.blackAndWhiteImageFile,
    frontImageDetails.isColoredImage,
    frontImageDetails.zoom,
  ]);

  useEffect(() => {
    setQr((prevQrValues) => {
      return {
        ...prevQrValues,
        generatedQrImageLink: `https://api.qrserver.com/v1/create-qr-code/?size=48x48&data=${qr.inputText}`,
      };
    });
  }, [qr.inputText]);

  async function generateTrimmedImageScreenshotFile(element) {
    try {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');
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

  async function convertToBlackAndWhiteImageBlobUrl(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Enable cross-origin resource sharing (CORS) if needed
      img.src = imageUrl;

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert each pixel to grayscale
        for (let i = 0; i < data.length; i += 4) {
          const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = average;
          data[i + 1] = average;
          data[i + 2] = average;
        }

        // Put the modified image data back onto the canvas
        ctx.putImageData(imageData, 0, 0);

        // Create a Blob from the canvas data
        canvas.toBlob(
          (blob) => {
            // Create a short URL for the Blob
            const blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          },
          'image/png',
          1, // Quality parameter for PNG, can be adjusted
        );
      };

      img.onerror = function (error) {
        reject(error);
      };
    });
  }

  const handleCardPageSelectionButton = (event) => {
    event.preventDefault();
    setIsRotationAnimationApplied((prevRotationValue) => !prevRotationValue);
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
      img.onload = async () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const aspectRatio = imageWidth / imageHeight;
        // If image is long
        const isLongImage = aspectRatio < 0.9 ? true : false;
        const blackAndWhiteImageFile = await convertToBlackAndWhiteImageBlobUrl(
          URL.createObjectURL(chosenFile),
        );

        if (selectedCardPage === 'Card Front') {
          setFrontImageDetails((prevFrontImageDetails) => {
            return {
              ...prevFrontImageDetails,
              imageFile: URL.createObjectURL(chosenFile),
              isImageSelected: true,
              blackAndWhiteImageFile,
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
    if (selectedCardPage === 'Card Front') {
      frontImageRef.current.value = '';
      setFrontImageDetails({
        imageFile: null,
        blackAndWhiteImageFile: null,
        screenshotUrl: null,
        zoom: 1,
        isColoredImage: true,
        isLongImage: false,
        isImageSelected: false,
      });
    }

    if (selectedCardPage === 'Card Back' && observingData.isHeader) {
      backHeaderImageRef.current.value = '';
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
    }

    if (selectedCardPage === 'Card Back' && observingData.isFooter) {
      backFooterImageRef.current.value = '';
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
    }
  };

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

  const handleQrSelectionButton = () => {
    if (qr.isQrAdded) {
      setQr((prevQrValues) => {
        return {
          ...prevQrValues,
          isEnteredTextInvalid: false,
          isQrAdded: false,
        };
      });
    } else {
      setQr((prevQrValues) => {
        return {
          ...prevQrValues,
          isEnteredTextInvalid: false,
          isInputModalOpened: true,
        };
      });
    }
  };

  const handleQrCodeCreation = () => {
    if (qr.inputText !== '') {
      setQr((prevQrValues) => {
        return {
          ...prevQrValues,
          isInputModalOpened: false,
          isConfirmationModalOpened: true,
        };
      });
    } else {
      setQr((prevQrValues) => {
        return {
          ...prevQrValues,
          isEnteredTextInvalid: true,
        };
      });
    }
  };

  const handleFinishEditingButton = async () => {
    try {
      const isPdfUploaded = await uploadPdfRequest();
      setCheckTitleDuplicacyModalOpen(true);
      if (!isPdfUploaded) {
        return setErrorResponse({
          message: 'Unable to upload the PDF.',
          status: true,
        });
      }
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

      formData.append(
        'faceImage',
        frontImageDetails.isImageSelected
          ? frontImageDetails.screenshotImageFile
          : null,
      );
      formData.append('backImage', null);
      formData.append('headerImage', headerData.imageFile);
      formData.append('footerImage', footerData.imageFile);

      formData.append('isLongImage', frontImageDetails.isLongImage);
      formData.append('isLongImageBack', null);
      formData.append('transformFace', frontImageDetails.zoom);
      formData.append('transformBack', null);
      formData.append('cardType', 'flat5x7');
      formData.append('name', `customer-${customerId}--`);
      qr.isQrAdded && formData.append('QR', qr.inputText);

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
    if (isDuplicateTitle) {
      return setErrorResponse({
        message: 'Card name already exists. 😔',
        status: true,
      });
    }
    const isCustomCardSaved = await saveCustomCard();
    if (!isCustomCardSaved) {
      return setErrorResponse({
        message: 'Unable to save the custom card.',
        status: true,
      });
    }
    // Convert product title to a handle name as per handle name's convention.
    // Remove whitespace or special characters at the beginning
    let handleName = customCardTitle.replace(/^[^a-zA-Z0-9]+/, '');
    // Replace all remaining whitespace or special characters with a single hyphen
    handleName = handleName.replace(/[^a-zA-Z0-9]+/g, '-');
    // Making the title to lowercase
    handleName = handleName.toLowerCase();
    navigate(`/custom/${handleName}`);
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
              value: qr.isQrAdded ? `${qr.generatedQrImageLink}` : '',
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
      return response.ok ? true : false;
    } catch (err) {
      console.error('Failed to save the custom card: ', err);
      return false;
    }
  }

  const handleHeaderVisibilityChange = () => {
    setHeaderFooterVisibility((prevVisibility) => ({
      ...prevVisibility,
      isHeaderVisible: !prevVisibility.isHeaderVisible,
    }));
  };

  const handleFooterVisibilityChange = () => {
    setHeaderFooterVisibility((prevVisibility) => ({
      ...prevVisibility,
      isFooterVisible: !prevVisibility.isFooterVisible,
    }));
  };

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

  return (
    <section className="relative">
      {isLoading && (
        <div
          style={{zIndex: 999}}
          className="min-h-screen w-full absolute top-[-10px] flex justify-center items-center bg-transparent backdrop-filter backdrop-blur"
        >
          <CircularLoader color={'#ef6e6e'} title="Saving in progress..." />
        </div>
      )}
      {checkTitleDuplicacyModalOpen && (
        <Modal
          cancelLink={() => {
            setErrorResponse({message: '', status: false});
            setCheckTitleDuplicacyModalOpen(false);
          }}
        >
          <div>
            <div>
              <p className="bg-[#deebf7] h-[55px] flex justify-center items-center text-black border-2 border-solid border-['gray'] font-bold">
                Name your card and save it.
              </p>
            </div>
            <div className="h-4 mt-2 flex justify-start items-center">
              {errorResponse.status && (
                <span className="text-[red] text-xs">
                  {errorResponse.message}
                </span>
              )}
            </div>
            <input
              className="w-full mt-3 border-black border-solid border-2 outline-none focus:outline-none"
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
      {qr.isInputModalOpened && (
        <Modal
          cancelLink={() =>
            setQr((prevQrValues) => {
              return {...prevQrValues, isInputModalOpened: false};
            })
          }
        >
          <div>
            <div>
              <p className="bg-[#deebf7] text-2xl h-[55px] flex justify-center items-center text-black border-2 border-solid border-['gray'] font-bold mb-4">
                ADD QR CODE
              </p>
            </div>
            <label htmlFor="qr">
              <span className="font-bold">Enter website URL or message:</span>
              <br />
              <div className="h-4 flex justify-start items-center">
                {qr.isEnteredTextInvalid && (
                  <span className="text-[red] text-xs">Required field*</span>
                )}
              </div>
              <input
                className={`${
                  qr.isEnteredTextInvalid && 'border-red-500 '
                } w-full mt-1 border-black border-solid border-2 outline-none focus:outline-none`}
                type="text"
                required
                onChange={(e) =>
                  setQr((prevQrValues) => {
                    return {
                      ...prevQrValues,
                      isEnteredTextInvalid: false,
                      inputText: e.target.value,
                    };
                  })
                }
              />
            </label>
            <br />
            <button
              className="bg-[#ef6e6e] border-none text-white outline-none p-1 pl-8 pr-8 min-w-[554px] h-[43px] mt-5 font-bold"
              type="button"
              onClick={handleQrCodeCreation}
            >
              Create QR Code
            </button>
          </div>
        </Modal>
      )}
      {qr.isConfirmationModalOpened && (
        <Modal
          cancelLink={() =>
            setQr((prevQrValues) => {
              return {...prevQrValues, isConfirmationModalOpened: false};
            })
          }
        >
          <div className="flex gap-1 flex-col justify-center items-center">
            <div className="font-bold tex-xl p-3">
              Please scan the QR code to confirm that it works as you expect.
            </div>

            <div className="h-[100px]">
              <img
                class="object-contain h-full"
                src={qr.generatedQrImageLink}
              />
            </div>
            <div className="flex w-full gap-1 items-center justify-center">
              <button
                className="flex-1 text-[#ef6e6e] border border-[#ef6e6e] p-1 h-[43px] mt-5 font-bold"
                type="button"
                onClick={() => {
                  setQr((prevQrValues) => {
                    return {
                      ...prevQrValues,
                      inputText: '',
                      isInputModalOpened: true,
                      isEnteredTextInvalid: false,
                      isConfirmationModalOpened: false,
                    };
                  });
                }}
              >
                CHANGE QR
              </button>
              <button
                className="flex-1 text-white bg-[#ef6e6e] p-1 h-[43px] mt-5 font-bold"
                type="button"
                onClick={() => {
                  setQr((prevQrValues) => {
                    return {
                      ...prevQrValues,
                      isInputModalOpened: false,
                      isConfirmationModalOpened: false,
                      isQrAdded: true,
                    };
                  });
                }}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="relative mt-3">
        <GoBackButton />
        <div className="min-h-[553px] flex justify-center items-center flex-wrap gap-5 pt-10">
          <div
            className="flex flex-col justify-start items-center flex-1 ml-7"
            style={{minHeight: '564px'}}
          >
            <span className="text-2xl mb-2">
              Custom Flat {selectedCardPage}
            </span>
            <div>
              <div className="border-2 border-black border-solid">
                <div
                  className="h-[350px] min-w-[500px] bg-white relative overflow-hidden"
                  style={{
                    zIndex: selectedCardPage === 'Card Front' ? '-30' : '0',
                    transform: isRotationAnimationApplied
                      ? 'rotateY(360deg)'
                      : 'rotateY(0deg)',
                    transition: 'transform 1.2s',
                  }}
                  onMouseOver={() => setIsMouseHoveredOnContainer(true)}
                  onMouseOut={() => setIsMouseHoveredOnContainer(false)}
                >
                  {(selectedCardPage === 'Card Front' && (
                    <>
                      <div
                        className="absolute flex justify-center items-center m-auto inset-0 h-[330px] w-[480px] border-2 border-dashed border-[#ff0000]"
                        style={{
                          background: 'transparent',
                          zIndex: '-10',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(360deg)'
                            : 'rotateY(0deg)',
                        }}
                      ></div>
                      <div
                        className="absolute flex justify-center items-center m-auto inset-0 h-[330px] w-[480px]"
                        id="frontTrimmedDiv"
                        style={{
                          zIndex: '-20',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(360deg)'
                            : 'rotateY(0deg)',
                        }}
                      >
                        {(frontImageDetails.imageFile ||
                          frontImageDetails.blackAndWhiteImageFile) && (
                          <img
                            src={
                              frontImageDetails.isColoredImage
                                ? frontImageDetails.imageFile
                                : frontImageDetails.blackAndWhiteImageFile
                            }
                            alt="Selected front card image file"
                            className="object-contain h-full"
                            draggable="false"
                            style={{
                              transform: `scale(${frontImageDetails.zoom})`,
                            }}
                          />
                        )}
                      </div>
                    </>
                  )) ||
                    (selectedCardPage === 'Card Back' && (
                      <div
                        className="flex flex-col h-full p-2"
                        id="backTrimmedDiv"
                        style={{
                          zIndex: '-20',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(360deg)'
                            : 'rotateY(0deg)',
                        }}
                      >
                        <div
                          className={`flex relative h-[50px] border-dashed border font-semibold pl-6 pr-6 items-center ${
                            headerFooterVisibility.isHeaderVisible
                              ? 'block '
                              : 'hidden '
                          }  ${
                            isMouseHoveredOnContainer
                              ? 'border-black '
                              : 'border-transparent '
                          } ${
                            (headerData.alignment === 'left' &&
                              'justify-start ') ||
                            (headerData.alignment === 'center' &&
                              'justify-center ') ||
                            (headerData.alignment === 'right' && 'justify-end ')
                          }`}
                        >
                          <div
                            className={`font-${headerData.fontFamily} overflow-hidden h-[50px] whitespace-nowrap`}
                            style={{
                              fontSize: `${headerData.fontSize}px`,
                              color: `${headerData.fontColor}`,
                              maxWidth: '434px',
                            }}
                          >
                            {!headerData.isImageSelected &&
                              headerData.customText}
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
                        <div className="flex flex-1 pl-6 mt-5 mb-5 font-pinocchio">
                          <span>Your custom message text will be here...</span>
                        </div>
                        <div
                          className={`flex relative h-[50px] border-dashed border font-semibold pl-6 pr-6 items-center ${
                            headerFooterVisibility.isFooterVisible
                              ? 'block '
                              : 'hidden '
                          } ${
                            isMouseHoveredOnContainer
                              ? 'border-black '
                              : 'border-transparent '
                          } ${
                            (footerData.alignment === 'left' &&
                              'justify-start ') ||
                            (footerData.alignment === 'center' &&
                              'justify-center ') ||
                            (footerData.alignment === 'right' && 'justify-end ')
                          }`}
                        >
                          <div
                            className={`font-${footerData.fontFamily} overflow-hidden h-[50px] whitespace-nowrap`}
                            style={{
                              fontSize: `${footerData.fontSize}px`,
                              color: `${footerData.fontColor}`,
                              maxWidth: `${qr.isQrAdded ? '375px' : '434px'}`,
                            }}
                          >
                            {!footerData.isImageSelected &&
                              footerData.customText}
                          </div>
                          {(footerData.isImageSelected || qr.isQrAdded) && (
                            <div
                              id="backFooterImageDiv"
                              className={`h-[45px] ${
                                qr.isQrAdded ? 'w-[20px] ml-3 ' : 'w-[60px]'
                              } overflow-hidden`}
                            >
                              <img
                                src={
                                  qr.isQrAdded
                                    ? qr.generatedQrImageLink
                                    : footerData.imageUrl
                                }
                                className={`object-contain h-full ${
                                  footerData.isColoredImage
                                    ? 'grayscale-0'
                                    : 'grayscale'
                                } ${qr.isQrAdded && 'absolute right-1 pb-1'}`}
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
              </div>
              <div className="flex gap-4 w-full mt-2">
                <button
                  value="Card Front"
                  className={`flex-1 p-2 text-white font-bold ${
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
                  className={`flex-1 p-2 text-white font-bold ${
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
                      accept="image/png, image/jpeg"
                      ref={frontImageRef}
                      className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                      onChange={handleImageFileInsertion}
                    />
                  )}
                </div>
                <div className="h-[200px]">
                  {selectedCardPage === 'Card Front' &&
                    (frontImageDetails.imageFile ||
                      frontImageDetails.blackAndWhiteImageFile) && (
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
                              checked={!frontImageDetails.isColoredImage}
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
                              checked={frontImageDetails.isColoredImage}
                            />
                            &nbsp;Color
                          </label>
                        </div>
                        <button
                          className="bg-[#1b5299] border-none text-white text-sm outline-none text-center h-[40px] font-bold"
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
                    <CustomCheckbox
                      label={'Add Header'}
                      isChecked={headerFooterVisibility.isHeaderVisible}
                      onChange={handleHeaderVisibilityChange}
                      value={headerFooterVisibility.isHeaderVisible}
                    />
                    <CustomCheckbox
                      label={'Add Footer'}
                      isChecked={headerFooterVisibility.isFooterVisible}
                      onChange={handleFooterVisibilityChange}
                      value={headerFooterVisibility.isHeaderVisible}
                    />
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
                          {observingData.isHeader
                            ? 'Header Text'
                            : 'Footer Text'}
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
                        <span className="flex-1 font-bold mr-2">Alignment</span>
                        <div className="flex-1 flex">
                          <svg
                            className="flex-1 mr-1 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            onClick={() => handleDataAlignment('left')}
                          >
                            <path
                              fill="#637381"
                              d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                            />
                            {((observingData.isHeader &&
                              headerData.alignment === 'left') ||
                              (observingData.isFooter &&
                                footerData.alignment === 'left')) && (
                              <path d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 4h10a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z" />
                            )}
                          </svg>
                          <svg
                            className="flex-1 mr-1 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            onClick={() => handleDataAlignment('center')}
                          >
                            <path
                              fill="#637381"
                              d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                            />
                            {((observingData.isHeader &&
                              headerData.alignment === 'center') ||
                              (observingData.isFooter &&
                                footerData.alignment === 'center')) && (
                              <path d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
                            )}
                          </svg>
                          <svg
                            className="flex-1 mr-1 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            onClick={() => handleDataAlignment('right')}
                          >
                            <path
                              fill="#637381"
                              d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                            />
                            {((observingData.isHeader &&
                              headerData.alignment === 'right') ||
                              (observingData.isFooter &&
                                footerData.alignment === 'right')) && (
                              <path d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm-4 4h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm4 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
                            )}
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
                          <option
                            value="pinocchio"
                            className={`font-pinocchio`}
                          >
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
                          value={
                            observingData.isHeader
                              ? headerData.fontColor
                              : footerData.fontColor
                          }
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
                    <div className="relative mt-5 w-[60px] h-[50px]">
                      {observingData.isHeader && (
                        <>
                          <img
                            src={AddImageIcon}
                            alt="Add image file icon"
                            draggable="false"
                          />

                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={backHeaderImageRef}
                            className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                            onChange={handleImageFileInsertion}
                          />
                        </>
                      )}
                      {observingData.isFooter && !qr.isQrAdded && (
                        <>
                          <img
                            src={AddImageIcon}
                            ref={backFooterImageRef}
                            alt="Add image file icon"
                            draggable="false"
                          />
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                            onChange={handleImageFileInsertion}
                          />
                        </>
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
                                  checked={
                                    observingData.isHeader
                                      ? !headerData.isColoredImage
                                      : !footerData.isColoredImage
                                  }
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
                        className="bg-[#1b5299] border-none text-white text-sm outline-none text-center h-[40px] w-1/2 font-bold"
                        type="button"
                        onClick={handleSelectedImageReset}
                      >
                        Remove image
                      </button>
                    </div>

                    <div
                      className={` ${
                        qr.isQrAdded ? 'bg-[#ef6e6e] ' : 'bg-[#1b5299]'
                      } w-[200px] cursor-pointer border border-solid border-black rounded p-1.5 flex items-center justify-start gap-2 text-white flex-wrap mb-5 mt-10`}
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
                        <span className="font-bold">
                          {qr.isQrAdded ? 'Remove QR Code' : 'Add QR Code'}
                        </span>
                        <span className="text-xs font-bold">
                          &#40;Footer Only&#41;
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
        </div>
      </div>
    </section>
  );
}
