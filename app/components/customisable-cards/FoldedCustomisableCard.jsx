import {useEffect, useRef, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import {Modal} from '../Modal';
import CircularLoader from '../CircularLoder';
import { FaArrowLeft } from 'react-icons/fa';
import AddImageIcon from '../../../assets/Image/add_image_icon.png';
import DefaultFrontCardImage from '../../../assets/Image/foldFront.webp';
import DefaultBackCardImage from '../../../assets/Image/foldBack.png';
import { MdOutlineDone } from 'react-icons/md';

export default function FoldedCustomisableCard({
  setIsCardTypeSelectionPage,
  shopifyCustomisableCardProduct,
  customerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Checking availability');
  const [isScrollerRemoved, setIsScrollerRemoved] = useState(false);
  const [triggerEvent, setTriggerEvent] = useState(false);
  const [isRotationAnimationApplied, setIsRotationAnimationApplied] =
    useState(false);
  const [validationModalData, setValidationModalData] = useState({
    isModalOpen: false,
    isNameValidated: false,
    isUserTyping: false,
  });
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [customCardTitle, setCustomCardTitle] = useState('');
  const [frontImageDetails, setFrontImageDetails] = useState({
    isImageSelected: false,
    imageBlobUrl: null,
    screenShotUrl: null,
    blackAndWhiteImageBlobUrl: null,
    selectedImageFile: null,
    canvasImageUrl:null,
    zoom: 1,
    isColoredImage: true,
    isLongImage: false,
  });
  const [backImageDetails, setBackImageDetails] = useState({
    isImageSelected: false,
    imageBlobUrl: null,
    screenShotUrl: null,
    blackAndWhiteImageBlobUrl: null,
    selectedImageFile: null,
    canvasImageUrl:null,
    zoom: 1,
    isColoredImage: true,
    isLongImage: false,
  });

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
  const backImageRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollTo(0, 0);
    };
    if (isScrollerRemoved) {
      window.addEventListener('scroll', scrollHandler);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
      window.removeEventListener('scroll', scrollHandler);
    }
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [isScrollerRemoved]);

  useEffect(() => {
    if (isLoading) {
      window.scroll({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [isLoading]);

  useEffect(() => {
    setQr((prevQrValues) => {
      return {
        ...prevQrValues,
        generatedQrImageLink: `https://api.qrserver.com/v1/create-qr-code/?size=48x48&data=${qr.inputText}`,
      };
    });
  }, [qr.inputText]);

  useEffect(() => {
    const trimmDiv = async () => {
      if (
        selectedCardPage === 'Card Back' &&
        backImageDetails.isImageSelected
      ) {
        const trimmedData = document.getElementById('backTrimmedDiv');
        await generateTrimmedImageScreenshotFile(trimmedData);
      }
    };
    trimmDiv();
  }, [triggerEvent, backImageDetails.isImageSelected, backImageDetails.zoom]);

  useEffect(() => {
    const generateImageFiles = async () => {
      try {
        let imageFile;
        if (selectedCardPage === 'Card Front') {
          if (frontImageDetails.isImageSelected) {
            const selectedBlobUrl = frontImageDetails.isColoredImage
              ? frontImageDetails.imageBlobUrl
              : frontImageDetails.blackAndWhiteImageBlobUrl;
            imageFile = await blobUrlToFileObject(
              selectedBlobUrl,
              `${customerId}-folded-front-image`,
            );

            setFrontImageDetails((prevFrontImageDetails) => {
              return {
                ...prevFrontImageDetails,
                selectedImageFile: imageFile,
              };
            });
          } else {
            generateDefaultScreenshotImage(
              DefaultFrontCardImage,
              'front-image',
            );
          }
        }

        if (selectedCardPage === 'Card Back') {
          if (backImageDetails.isImageSelected) {
            const selectedBlobUrl = backImageDetails.isColoredImage
              ? backImageDetails.imageBlobUrl
              : backImageDetails.blackAndWhiteImageBlobUrl;
            imageFile = await blobUrlToFileObject(
              selectedBlobUrl,
              `${customerId}-folded-back-image`,
            );

            setBackImageDetails((prevBackImageDetails) => {
              return {
                ...prevBackImageDetails,
                selectedImageFile: imageFile,
              };
            });
          } else {
            generateDefaultScreenshotImage(DefaultBackCardImage, 'back-image');
          }
        }
      } catch (err) {
        console.error('Failed to generate image files', err);
      }
    };
    generateImageFiles();
  }, [
    frontImageDetails.isImageSelected,
    frontImageDetails.isColoredImage,
    frontImageDetails.imageBlobUrl,
    backImageDetails.isImageSelected,
    backImageDetails.isColoredImage,
    backImageDetails.imageBlobUrl
  ]);

  useEffect(() => {
    let timeout;
    if (validationModalData.isUserTyping) {
      timeout = setTimeout(() => {
        setValidationModalData((prevValidationData) => {
          return {
            ...prevValidationData,
            isUserTyping: false,
          };
        });
      }, 1000);

      if (errorResponse.status) {
        setErrorResponse({
          message: '',
          status: false,
        });
      }
      if (validationModalData.isNameValidated) {
        setValidationModalData((prevValidationData) => {
          return {
            ...prevValidationData,
            isNameValidated: false,
          };
        });
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [validationModalData.isUserTyping]);

  async function blobUrlToFileObject(blobUrl, fileName = 'image') {
    try {
      // Fetch the blob URL to get the image data
      const response = await fetch(blobUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch blob URL: ${response.status} ${response.statusText}`,
        );
      }

      // Convert the response data to a blob
      const blob = await response.blob();

      // Create a File object with the blob
      const fileObject = new File([blob], `${fileName}.jpg`, { type: blob.type });

      return fileObject;
    } catch (error) {
      console.error(
        `Error converting blob URL to file object: ${error.message}`,
      );
      return null;
    }
  }

  async function generateDefaultScreenshotImage(image, cardImagePosition) {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = `${customerId}-default-${cardImagePosition}.png`;
      const selectedImageFile = new File([blob], filename, {
        type: blob.type,
      });

      if (cardImagePosition === 'front-image') {
        setFrontImageDetails((prevFrontImageDetails) => {
          return {
            ...prevFrontImageDetails,
            selectedImageFile,
            canvasImageUrl:selectedImageFile,
          };
        });
      }
      if (cardImagePosition === 'back-image') {
        setBackImageDetails((prevBackImageDetails) => {
          return {
            ...prevBackImageDetails,
            selectedImageFile,
            canvasImageUrl:selectedImageFile,
          };
        });
      }
    } catch (error) {
      console.error('Error fetching the default image:', error);
    }
  }

  async function getBlackAndWhiteImageBlobUrl(imageUrl) {
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

  const handleImageFileInsertion = (event) => {
    const chosenFile = event.target.files[0];
    if (!chosenFile) return;

    handleSelectedImageReset();

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const aspectRatio = imageWidth / imageHeight;
        // If image is long
        const isLongImage = aspectRatio < 0.9 ? true : false;
        const blackAndWhiteImageBlobUrl = await getBlackAndWhiteImageBlobUrl(
          URL.createObjectURL(chosenFile),
        );

        if (selectedCardPage === 'Card Front') {
          setFrontImageDetails((prevFrontImageDetails) => {
            return {
              ...prevFrontImageDetails,
              imageBlobUrl: URL.createObjectURL(chosenFile),
              isImageSelected: true,
              blackAndWhiteImageBlobUrl,
              isLongImage,
            };
          });
        }

        if (selectedCardPage === 'Card Back') {
          setBackImageDetails((prevBackImageDetails) => {
            return {
              ...prevBackImageDetails,
              imageBlobUrl: URL.createObjectURL(chosenFile),
              isImageSelected: true,
              blackAndWhiteImageBlobUrl,
              isLongImage,
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

    if (selectedCardPage === 'Card Back') {
      setBackImageDetails((prevBackImageDetails) => {
        return {
          ...prevBackImageDetails,
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

    if (selectedCardPage === 'Card Back') {
      setBackImageDetails((prevBackImageDetails) => {
        return {
          ...prevBackImageDetails,
          isColoredImage,
        };
      });
    }
  };

  const handleSelectedImageReset = () => {
    const initialImageDetails = {
      isImageSelected: false,
      imageBlobUrl: null,
      blackAndWhiteImageBlobUrl: null,
      selectedImageFile: null,
      zoom: 1,
      isColoredImage: true,
      isLongImage: false,
    };
    if (selectedCardPage === 'Card Front') {
      frontImageRef.current.value = '';
      setFrontImageDetails(initialImageDetails);
    }

    if (selectedCardPage === 'Card Back') {
      backImageRef.current.value = '';
      setBackImageDetails(initialImageDetails);
    }
  };

  const handleFinishEditingButton = async () => {
    try {
      await generateScreenshotFile();
      setValidationModalData((prevValidationData) => {
        return { ...prevValidationData, isModalOpen: true };
      });
    } catch (err) {
      throw err;
    }
  };

  const handleCustomCardSaveButton = async () => {
    const pdfUpload = await uploadPdfRequest();
    if (!pdfUpload.isSuccess) {
      return setErrorResponse({
        message: 'Unable to upload the PDF.',
        status: true,
      });
    }
    const isCustomCardSaved = await saveCustomCard(pdfUpload.s3ImageUrls);
    if (!isCustomCardSaved) {
      return setErrorResponse({
        message: 'Unable to save the custom card.',
        status: true,
      });
    }
    setIsScrollerRemoved(false);
    // Convert product title to a handle name as per handle name's convention.
    let handleName = customCardTitle.trim();
    // Remove special characters from the beginning and the end.
    handleName = handleName.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
    // Replace all remaining whitespace or special characters with a single hyphen.
    handleName = handleName.replace(/[^a-zA-Z0-9]+/g, '-');
    // Making the title to lowercase.
    handleName = handleName.toLowerCase();
    navigate(`/custom/${handleName}`);
  };

  const handleCardPageSelectionButton = async (event) => {
    event.preventDefault();

    if (
      selectedCardPage === 'Card Front' &&
      frontImageDetails.isImageSelected
    ) {
      const trimmedData = document.getElementById('frontTrimmedDiv');
      await generateTrimmedImageScreenshotFile(trimmedData);
    }

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

  async function generateTrimmedImageScreenshotFile(element) {
    try {
      const image = element.querySelector('img');

      // Wait for the image to be fully loaded for the timing issue.
      await new Promise((resolve) => {
        if (image.complete) {
          resolve();
        } else {
          image.onload = resolve;
        }
      });
     /* const canvas = await html2canvas(element, {
        width: element.offsetWidth,
        height: element.offsetHeight,
        quality: 1,
        style: {
          margin: 0,
        }
      });
      const dataUrl = canvas.toDataURL('image/png');*/

       const dataUrl = await domtoimage.toPng(element, {
         width: element.offsetWidth,
         height: element.offsetHeight,
         quality: 1,
         style: {
          transform: (element.id === 'backTrimmedDiv') ? 'rotateY(360deg)' : 'rotateY(0deg)',
             display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 margin:'0',
         },  
       
       });

      if (selectedCardPage === 'Card Back' && dataUrl) {
        setBackImageDetails((prevBackImageDetails) => {
          return {
            ...prevBackImageDetails,
            screenShotUrl: dataUrl,
            isImageSelected: true,
          };
        });
      } else if (selectedCardPage === 'Card Front' && dataUrl) {
        setFrontImageDetails((prevFrontImageDetails) => {
          return {
            ...prevFrontImageDetails,
            screenShotUrl: dataUrl,
            isImageSelected: true,
          };
        });
      }
      setTriggerEvent(false);
    } catch (error) {
      console.error('Error generating a screenshot file:', error);
    }
  }

  async function generateScreenshotFile() {
    try {
      let imageFile;
      const frontblobUrl = frontImageDetails.screenShotUrl;
      const backblobUrl = backImageDetails.screenShotUrl;

      if (frontImageDetails.isImageSelected && frontblobUrl) {
        const selectedBlobUrl = await generateCanvasImage(frontblobUrl);
        if (selectedBlobUrl) {
          imageFile = await blobUrlToFileObject(
            selectedBlobUrl,
            `${customerId}-folded-front-image`,
          );
          setFrontImageDetails((prevFrontImageDetails) => {
            return {
              ...prevFrontImageDetails,
              canvasImageUrl: imageFile,
            };
          });
        }
      } else {
        generateDefaultScreenshotImage(DefaultFrontCardImage, 'front-image');
      }

      if (backImageDetails.isImageSelected && backblobUrl) {
        const selectedBlobUrl = await generateCanvasImage(backblobUrl);
        if (selectedBlobUrl) {
          imageFile = await blobUrlToFileObject(
            selectedBlobUrl,
            `${customerId}-folded-back-image`,
          );
          setBackImageDetails((prevBackImageDetails) => {
            return {
              ...prevBackImageDetails,
              canvasImageUrl: imageFile,
            };
          });
        }
      } else {
        generateDefaultScreenshotImage(DefaultBackCardImage, 'back-image');
      }
    } catch (error) {
      console.error('Error generating screenshot:', error);
    }
  }
  async function generateCanvasImage(blobUrl) {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const image1 = new Image();
      image1.src = DefaultFrontCardImage;

      const image2 = new Image();
      image2.src = blobUrl;

      await Promise.all([
        new Promise((resolve, reject) => {
          image1.onload = resolve;
          image1.onerror = reject;
        }),
        new Promise((resolve, reject) => {
          image2.onload = resolve;
          image2.onerror = reject;
        }),
      ]);
      canvas.width = 400;
      canvas.height = 280;

      ctx.imageSmoothingEnabled = true;
  
      ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const maxAllowedWidth = canvas.width * 0.68; 
      const maxAllowedHeight = canvas.height * 0.7;

      const scaledWidth = Math.min(maxAllowedWidth, image2.width);
      const scaledHeight = Math.min(maxAllowedHeight , image2.height);

      const offsetX = centerX - scaledWidth / 2 ;
      const offsetY = centerY - scaledHeight / 2 ;
  
      const rotationAngle = (1.3 * Math.PI) / 180;
  
      ctx.save();
  
      ctx.rotate(rotationAngle);
  
   
      ctx.drawImage(image2, offsetX, offsetY, scaledWidth, scaledHeight);
  
      ctx.restore();
  
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate blob from canvas'));
          }
        });
      });
  
      const blobImageUrl = URL.createObjectURL(blob);
      return blobImageUrl;
    } catch (error) {
      console.error('Error generating a screenshot file:', error);
    }
  }
  
  async function uploadPdfRequest() {
    try {
      setIsLoading(true);
      setIsScrollerRemoved(true);
      const formData = new FormData();
      const commonHeaderFooterPayload = {
        data: '',
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontType: 'Times New Roman',
        fontSize: 30,
        fontColor: '#000',
        zoom: '1',
        isColored: true,
        height: 50,
      };
      formData.append('headerData', JSON.stringify(commonHeaderFooterPayload));
      formData.append('footerData', JSON.stringify(commonHeaderFooterPayload));

      formData.append(
        'faceImage',
        frontImageDetails.isImageSelected
          ? frontImageDetails.selectedImageFile
          : null,
      );
      formData.append(
        'backImage',
        backImageDetails.isImageSelected
          ? backImageDetails.selectedImageFile
          : null,
      );
      formData.append('headerImage', null);
      formData.append('footerImage', null);

      formData.append('isLongImage', frontImageDetails.isLongImage);
      formData.append('isLongImageBack', backImageDetails.isLongImage);
      formData.append('transformFace', frontImageDetails.zoom);
      formData.append('transformBack', backImageDetails.zoom);
      formData.append('cardType', 'folded5x7');
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
        setIsScrollerRemoved(false);
        const response = await data.json();
        return {
          s3ImageUrls: response.result,
          isSuccess: true,
        };
      } else {
        return {
          s3ImageUrls: null,
          isSuccess: false,
        };
      }
    } catch (err) {
      console.error('Failed uploading the PDF: ', err);
      return {
        s3ImageUrls: null,
        isSuccess: false,
      };
    }
  }

  async function checkForDuplicateTitle() {
    try {
      setIsLoading(true);
      setIsScrollerRemoved(true);

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
        setIsScrollerRemoved(false);
        return data.result.count === 0 ? false : true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Failed to check duplicacy for card title: ', err);
      return false;
    }
  }

  async function saveCustomCard(s3ImageUrls) {
    try {
      setIsScrollerRemoved(true);

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
          cardType: 'folded5x7',
          isHeaderIncluded: false,
          isFooterIncluded: qr.isQrAdded ? true : false,
          messageAreaPosition: 'TOP',
          header: {
            data: '',
            textAlign: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontType: 'Times New Roman',
            fontSize: 30,
            fontColor: '#000',
            zoom: '1',
            isColored: true,
            height: 50,
          },
          message: {
            fontSize: null,
            fontFamily: 'Tarzan',
            height: 0,
            fontAutoResize: true,
          },
          footer: {
            data: '',
            textAlign: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontType: 'Times New Roman',
            fontSize: 26,
            fontColor: '#000',
            zoom: '1',
            isColored: true,
          },
          face: {
            zoom: frontImageDetails.zoom,
            isColored: frontImageDetails.isColoredImage,
            width: '100%',
            height: '0px',
          },
          back: {
            zoom: backImageDetails.zoom,
            isColored: backImageDetails.isColoredImage,
            width: '100%',
            height: '0px',
          },
          pdfURL: s3ImageUrls ? s3ImageUrls.pdfUrl : null,
        },
        s3ImageUrls: s3ImageUrls,
        featuredImage: frontImageDetails?.canvasImageUrl,
        featuredBackImage: backImageDetails?.canvasImageUrl,
      };

      formData.append('product', JSON.stringify(payload.product));
      formData.append('customFields', JSON.stringify(payload.customFields));
      formData.append('s3ImageUrls', JSON.stringify(payload.s3ImageUrls));
      formData.append('featuredImage', payload.featuredImage);
      formData.append('featuredBackImage',payload.featuredBackImage)

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

  const handleCardTitleInputChange = (event) => {
    setCustomCardTitle(event.target.value);
    setValidationModalData((prevValidationData) => {
      return { ...prevValidationData, isUserTyping: true };
    });
  };
  const handleCardTitleValidation = async () => {
    if (validationModalData.isUserTyping || customCardTitle.trim().length === 0)
      return;
    const isDuplicateTitle = await checkForDuplicateTitle();
    if (isDuplicateTitle) {
      return setErrorResponse({
        message: 'Card name already exists.',
        status: true,
      });
    }
    setValidationModalData((prevValidationData) => {
      return {
        ...prevValidationData,
        isNameValidated: true,
      };
    });
  };

  return (
    <section>
      <div id="ones"></div>
      {/* {isLoading && (
        <div
          style={{zIndex: 999}}
          className="min-h-screen w-full absolute top-[-10px] flex justify-center items-center bg-transparent backdrop-filter backdrop-blur"
        >
          <CircularLoader color={'#ef6e6e'} title={loadingText} />
        </div>
      )} */}
      {validationModalData.isModalOpen && (
        <Modal
          cancelLink={() => {
            if (!isLoading) {
              setErrorResponse({ message: '', status: false });
              setValidationModalData({
                isModalOpen: false,
                isNameValidated: false,
                isUserTyping: false,
              });
            }
          }}
        >
          <div className="p-[35px]">
            <div>
              <p className="bg-[#deebf7] h-[55px] lg:text-[20px] text-[14px] flex justify-center items-center text-black border-2 border-solid border-[#526fa1] font-bold">
                Name your card and save it.
              </p>
            </div>
            <div className="h-4 mt-2 flex justify-start items-center">
              {errorResponse.status && (
                <span className="text-[red] text-[14px]">
                  {errorResponse.message}
                </span>
              )}
            </div>
            <div className="flex lg:flex-row flex-col justify-between gap-2 mt-3">
              <div className="relative flex-1">
                <input
                  className={`min-w-[190px] w-full h-[42px] rounded border-[#aaa] border-solid border-2 outline-none focus:outline-none flex-1 focus:ring-0 ${validationModalData.isNameValidated
                    ? 'border-emerald-600 focus:border-emerald-600'
                    : 'focus:border-red-400'
                    } ${errorResponse.status ? 'border-red-400' : ''}`}
                  type="text"
                  placeholder="Card Name"
                  onChange={(e) => handleCardTitleInputChange(e)}
                />
                {validationModalData.isNameValidated ? (
                  <MdOutlineDone className="text-[green] text-[22px] ml-[30px] absolute right-[10px] top-[9px]" />
                ) : (
                  <button
                    type="button"
                    className={`absolute right-[3px] min-w-[100px] top-[3px] py-2 px-4  max-w-full h-[35px] shadow-md bg-[#EF6E6E] flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none rounded`}
                    onClick={handleCardTitleValidation}
                    disabled={validationModalData.isNameValidated}
                  >
                    {!isLoading && 'Validate'}

                    {isLoading && (
                      <div className="flex gap-[4px] items-center">
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="mr-2 animate-spin min-w-[100px]"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                        </svg>
                        <span className="whitespace-nowrap hidden md:block">{loadingText}</span>
                      </div>
                    )}
                  </button>
                )}
              </div>
              <div className='block md:hidden'>
              {isLoading && (
                <span className="whitespace-nowrap ">{loadingText}</span>
              )}

              </div>
              <button
                className={`${!validationModalData.isNameValidated
                  ? 'cursor-not-allowed'
                  : ''
                  } bg-[#1b5299] text-[13px] font-normal border-none text-white  outline-none p-1 px-8  h-[42px] `}
                disabled={!validationModalData.isNameValidated}
                type="button"
                onClick={handleCustomCardSaveButton}
              >
                {isLoading &&
                  validationModalData.isNameValidated ? (
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                    <span className="whitespace-nowrap">
                      Saving in progress...
                    </span>
                  </div>
                ) : (
                  'SAVE CARD'
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
      {qr.isInputModalOpened && (
        <Modal
          cancelLink={() =>
            setQr((prevQrValues) => {
              return { ...prevQrValues, isInputModalOpened: false };
            })
          }
        >
          <div>
            <div>
              <p className="bg-[#deebf7] text-2xl h-[55px] mt-[20px] flex justify-center items-center text-black border-2 border-solid border-['gray'] font-bold mb-4">
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
                className={`${qr.isEnteredTextInvalid && 'border-red-500 '
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
              className="bg-[#ef6e6e] border-none mb-[20px] text-white outline-none p-1 pl-8 pr-8 w-full h-[43px] mt-5 font-bold"
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
              return { ...prevQrValues, isConfirmationModalOpened: false };
            })
          }
        >
          <div className="flex gap-1 flex-col justify-center items-center">
            <div className="font-bold tex-xl p-3">
              Please scan the QR code to confirm that it works as you expect.
            </div>

            <div className="h-[100px]">
              <img
                className="object-contain h-full"
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
      <div className="relative md:mt-3" style={{ marginTop: '-2rem' }}>
        <div className="min-h-[553px] global-max-width-handler flex justify-center items-center flex-wrap lg:gap-0 gap-5 lg:flex-row flex-col">
          <div
            className="flex flex-col justify-start items-center flex-1 lg:w-auto w-[95%]"
            style={{ minHeight: '564px' }}
          >
            <span className="text-[30px] text-[#333] font-normal mb-3 md:mt-[85px] mt-[4rem]">
              Custom Folded {selectedCardPage}
            </span>
            <div>
              <div className="border-2 border-black border-solid">
                <div
                  className="md:min-w-[465px] sm:w-[450px] w-[350px] sm:h-[400px] h-[340px] bg-white relative overflow-hidden"
                  style={{
                    zIndex: '-30',
                    transform: isRotationAnimationApplied
                      ? 'rotateY(-180deg)'
                      : 'rotateY(0deg)',
                    transition: 'transform 0.8s',
                  }}
                >
                  {(selectedCardPage === 'Card Front' && (
                    <>
                      <div
                        className="absolute flex justify-center sm:h-[380px] h-[320px] items-center m-auto inset-0 md:w-[445px] sm:w-[430px] w-[330px] sm:border-[3px] border-[2px] border-dashed border-[#ff0000]"
                        style={{
                          background: 'transparent',
                          zIndex: '-10',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
                            : 'rotateY(0deg)',
                        }}
                      ></div>
                      <div
                        className="absolute flex justify-center sm:h-[380px] h-[320px] items-center m-auto inset-0 md:w-[445px] w-[330px] "
                        id="frontTrimmedDiv"
                        style={{
                          zIndex: '-20',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
                            : 'rotateY(0deg)',
                        }}
                      >
                        {(frontImageDetails.imageBlobUrl ||
                          frontImageDetails.blackAndWhiteImageBlobUrl) && (
                            <img
                              src={
                                frontImageDetails.isColoredImage
                                  ? frontImageDetails.imageBlobUrl
                                  : frontImageDetails.blackAndWhiteImageBlobUrl
                              }
                              alt="Selected front card image file"
                              className="max-h-full"
                              draggable="false"
                              style={{
                                transform: `scale(${frontImageDetails.zoom})`,
                              }}
                            />
                          )}
                      </div>
                    </>
                  )) ||
                    (selectedCardPage === 'Card Inside' && (
                      <div
                        className="absolute flex justify-center items-center  text-center m-auto inset-0 sm:h-[380px] h-[320px] md:w-[445px] sm:w-[430px] w-[330px] sm:pt-4 pt-2"
                        style={{
                          transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
                            : 'rotateY(0deg)',
                        }}
                      >
                        <div className="relative w-full h-full">
                          <span className=" font-pinocchio">
                            Your custom message text will be here...
                          </span>
                          {qr.isQrAdded && (
                            <div className="h-[50px] absolute bottom-0 right-0">
                              <img
                                src={qr.generatedQrImageLink}
                                className="object-contain h-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )) ||
                    (selectedCardPage === 'Card Back' && (
                      <>
                        <div
                          className="absolute flex justify-center sm:h-[380px] h-[320px] items-center m-auto inset-0 md:w-[445px] sm:w-[430px] w-[330px] sm:border-[3px] border-[2px] border-dashed border-[#ff0000]"
                          style={{
                            background: 'transparent',
                            zIndex: '-10',
                            transform: isRotationAnimationApplied
                              ? 'rotateY(-180deg)'
                              : 'rotateY(0deg)',
                          }}
                        ></div>
                        <div
                          className="absolute flex justify-center sm:h-[380px] h-[320px] items-center m-auto inset-0 md:w-[445px] w-[330px]"
                          id="backTrimmedDiv"
                          style={{
                            zIndex: '-20',
                            transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
                            : 'rotateY(0deg)',
                          }}
                        >
                          {(backImageDetails.imageBlobUrl ||
                            backImageDetails.blackAndWhiteImageBlobUrl) && (
                            <img
                              src={
                                backImageDetails.isColoredImage
                                  ? backImageDetails.imageBlobUrl
                                  : backImageDetails.blackAndWhiteImageBlobUrl
                              }
                              alt="Selected back card image file"
                              className="max-h-full"
                              draggable="false"
                              style={{
                                transform: `scale(${backImageDetails.zoom})`,
                              }}
                            />
                          )}
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <div className="flex gap-4 w-full mt-3">
                <button
                  value="Card Front"
                  className={`flex-1 p-[10px] text-white font-normal sm:text-[18px] text-[16px] ${selectedCardPage === 'Card Front'
                    ? 'button-blue'
                    : 'button-tomato'
                    }`}
                  onClick={handleCardPageSelectionButton}
                >
                  Card Front
                </button>
                <button
                  value="Card Inside"
                  className={`flex-1 p-[10px] text-white font-normal sm:text-[18px] text-[16px] ${selectedCardPage === 'Card Inside'
                    ? 'button-blue'
                    : 'button-tomato'
                    }`}
                  onClick={handleCardPageSelectionButton}
                >
                  Card Inside
                </button>
                <button
                  value="Card Back"
                  className={`flex-1 p-[10px] text-white font-normal sm:text-[18px] text-[16px] ${selectedCardPage === 'Card Back'
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
          <div className="flex flex-col justify-center items-start gap-8 flex-1 lg:mt-[12rem] mt-[10px] lg:mb-auto">
            <div
              className={` ${qr.isQrAdded ? 'bg-[#ef6e6e] ' : 'bg-[#1b5299]'
                } w-[200px] cursor-pointer border border-solid  border-black rounded p-1.5 flex items-center justify-start gap-2 text-white flex-wrap mb-5`}
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
                <span className="font-extrabold text-[16px]">
                  {qr.isQrAdded ? 'Remove QR Code' : 'Add QR Code'}
                </span>
                <span className="text-[14px] font-normal">
                  &#40;to inside of card&#41;
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between md:items-start items-baseline gap-5 min-w-[240px] ">
              {!(selectedCardPage === 'Card Inside') && (
                <>
                  <div className="relative ">
                    {selectedCardPage === 'Card Front' && (
                      <>
                        <div className="flex flex-row items-center lg:justify-start gap-2 justify-center p-2 border border-[#ddd] rounded-lg w-full md:w-adto">
                          <img
                            src={AddImageIcon}
                            className="cursor-pointer w-[70px]"
                            alt="Add image file icon"
                            draggable="false"
                          />
                          <label
                            htmlFor="image-input"
                            className="font-bold text-[14px] whitespace-nowrap cursor-pointer"
                          >
                            Add Image
                          </label>
                        </div>

                        <input
                          id="image-input"
                          type="file"
                          accept="image/png, image/jpeg"
                          className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                          onChange={handleImageFileInsertion}
                          ref={frontImageRef}
                        />
                      </>
                    )}

                    {selectedCardPage === 'Card Back' && (
                      <>
                        <div className="flex flex-row items-center lg:justify-start gap-2 justify-center p-2 border border-[#ddd] rounded-lg w-full md:w-adto">
                          <img
                            src={AddImageIcon}
                            alt="Add image file icon"
                            className="cursor-pointer w-[70px]"
                            draggable="false"
                          />
                          <label
                            htmlFor="image-input2"
                            className="font-bold text-[14px] whitespace-nowrap cursor-pointer"
                          >
                            Add Image
                          </label>
                        </div>
                        <input
                          id="image-input2"
                          type="file"
                          accept="image/png, image/jpeg"
                          className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                          onChange={handleImageFileInsertion}
                          ref={backImageRef}
                        />
                      </>
                    )}
                  </div>
                  <div className="h-auto">
                    {selectedCardPage === 'Card Front' &&
                      (frontImageDetails.imageBlobUrl ||
                        frontImageDetails.blackAndWhiteImageBlobUrl) && (
                        <div className="flex flex-col gap-8 ">
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
                                checked={!frontImageDetails.isColoredImage}
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
                                checked={frontImageDetails.isColoredImage}
                                onChange={handleImageColorChange}
                              />
                              &nbsp;Color
                            </label>
                          </div>
                          <button
                            className="bg-[#1b5299] border-none  text-white text-sm outline-none text-center h-[40px] font-bold"
                            type="button"
                            onClick={handleSelectedImageReset}
                          >
                            Remove image
                          </button>
                        </div>
                      )}

                    {selectedCardPage === 'Card Back' &&
                      (backImageDetails.imageBlobUrl ||
                        backImageDetails.blackAndWhiteImageBlobUrl) && (
                        <div className="flex flex-col gap-8 ">
                          <div className="flex flex-col">
                            <span>Resize image</span>
                            <input
                              type="range"
                              min="0.3"
                              max="2"
                              step="0.1"
                              value={backImageDetails.zoom}
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
                                checked={!backImageDetails.isColoredImage}
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
                                checked={backImageDetails.isColoredImage}
                                onChange={handleImageColorChange}
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
                      className="bg-[#1b5299] h-[40px] border-none ml-[0px]  text-white text-[14px]  outline-none text-center w-[85%] font-semibold"
                      onClick={() => {
                        setTriggerEvent(true);
                        handleFinishEditingButton();
                      }}
                    >
                      Finish Editing
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
