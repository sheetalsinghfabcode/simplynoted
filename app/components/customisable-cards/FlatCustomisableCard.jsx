import {useState, useEffect, useRef} from 'react';
import {useNavigate} from '@remix-run/react';
import {FaArrowLeft} from 'react-icons/fa';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import {Modal} from '../Modal';
import CircularLoader from '../CircularLoder';
import AddImageIcon from '../../../assets/Image/add_image_icon.png';
import CustomCheckbox from '../CustomCheckbox';
import DefaultFrontCardImage from '../../../assets/Image/flatCustomImg.png';
import CardBackImage from '../../../assets/Image/foldFront.webp';
import {MdOutlineDone} from 'react-icons/md';

export default function FlatCustomisableCard({
  setIsCardTypeSelectionPage,
  shopifyCustomisableCardProduct,
  customerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Checking availability...');
  const [isScrollerRemoved, setIsScrollerRemoved] = useState(false);
  const [isRotationAnimationApplied, setIsRotationAnimationApplied] =
    useState(false);
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [frontImageDetails, setFrontImageDetails] = useState({
    isImageSelected: false,
    imageBlobUrl: null,
    screenShotUrl: null,
    blackAndWhiteImageBlobUrl: null,
    selectedImageFile: null,
    canvasImageUrl: null,
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
    isImageSelected: false,
    imageBlobUrl: '',
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
    isImageSelected: false,
    imageBlobUrl: '',
    imageFile: null,
    isColoredImage: true,
  });
  const [customCardTitle, setCustomCardTitle] = useState('');
  const [validationModalData, setValidationModalData] = useState({
    isModalOpen: false,
    isNameValidated: false,
    isUserTyping: false,
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
  const backHeaderImageRef = useRef(null);
  const backFooterImageRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log({
      qr,
      frontImageDetails,
      backImageDetails: {observingData, headerData, footerData},
    });
  }, [observingData, frontImageDetails, headerData, footerData, qr]);

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
      window.scroll({top: 0, left: 0, behavior: 'instant'});
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
              `${customerId}-flat-front-image`,
            );

            setFrontImageDetails((prevFrontImageDetails) => {
              return {
                ...prevFrontImageDetails,
                selectedImageFile: imageFile,
              };
            });
          } else {
            const response = await fetch(DefaultFrontCardImage);
            const blob = await response.blob();
            const filename = 'default-screenshot.png';
            const frontDefaultImageFile = new File([blob], filename, {
              type: blob.type,
            });
            setFrontImageDetails((prevFrontImageDetails) => {
              return {
                ...prevFrontImageDetails,
                selectedImageFile: frontDefaultImageFile,
              };
            });
          }
        }
        if (
          selectedCardPage === 'Card Back' &&
          observingData.isHeader &&
          headerData.isImageSelected
        ) {
          imageFile = await blobUrlToFileObject(
            headerData.imageBlobUrl,
            `${customerId}-header-image`,
          );
          setHeaderData((prevHeaderData) => {
            return {
              ...prevHeaderData,
              imageFile,
            };
          });
        }

        if (
          selectedCardPage === 'Card Back' &&
          observingData.isFooter &&
          footerData.isImageSelected
        ) {
          // console.log("footerData.imageBlobUrl",footerData.imageBlobUrl)
          imageFile = await blobUrlToFileObject(
            footerData.imageBlobUrl,
            `${customerId}-flat-front-image`,
          );
          setFooterData((prevFooterData) => {
            return {
              ...prevFooterData,
              imageFile,
            };
          });
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
    headerData.isImageSelected,
    footerData.isImageSelected,
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
      const fileObject = new File([blob], `${fileName}.jpg`, {type: blob.type});

      return fileObject;
    } catch (error) {
      console.error(
        `Error converting blob URL to file object: ${error.message}`,
      );
      return null;
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

  const handleCardPageSelectionButton = async (event) => {
    event.preventDefault();
    if (
      selectedCardPage === 'Card Front' &&
      frontImageDetails.isImageSelected
    ) {
      const trimmedDiv = document.getElementById('frontTrimmedDiv');
      await generateTrimmedImageScreenshotFile(trimmedDiv);
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

        if (selectedCardPage === 'Card Back' && observingData.isHeader) {
          setHeaderData((prevHeaderData) => {
            return {
              ...prevHeaderData,
              customText: '',
              imageBlobUrl: URL.createObjectURL(chosenFile),
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
              imageBlobUrl: URL.createObjectURL(chosenFile),
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
        imageBlobUrl: null,
        blackAndWhiteImageBlobUrl: null,
        selectedImageFile: null,
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
          imageBlobUrl: '',
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
          imageBlobUrl: '',
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
          imageBlobUrl: '',
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
          imageBlobUrl: '',
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
      await generateScreenshotFile();
      setValidationModalData((prevValidationData) => {
        return {...prevValidationData, isModalOpen: true};
      });
    } catch (err) {
      throw err;
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

      const canvas = await html2canvas(element, {
        width: element.offsetWidth,
        height: element.offsetHeight,
        quality: 1,
        style: {
          margin: 0,
        },
      });
      const dataUrl = canvas.toDataURL('image/png');

      // const dataUrl = await domtoimage.toPng(element, {
      //   width: element.offsetWidth,
      //   height: element.offsetHeight,
      //   quality: 1,
      //   style: {
      //       display: 'flex',
      //           justifyContent: 'center',
      //           alignItems: 'center',
      //           margin:'0',
      //   },
      // });
      if (selectedCardPage === 'Card Front') {
        setFrontImageDetails((prevFrontImageDetails) => {
          return {
            ...prevFrontImageDetails,
            screenShotUrl: dataUrl,
            isImageSelected: true,
          };
        });
      }
    } catch (error) {
      console.error('Error generating a screenshot file:', error);
    }
  }

  async function generateScreenshotFile() {
    try {
      // Image file present, generating screenshot.
      let imageFile;
      if (frontImageDetails.isImageSelected) {
        const selectedBlobUrl = await generateCanvasImage();
        if (selectedBlobUrl) {
          imageFile = await blobUrlToFileObject(
            selectedBlobUrl,
            `${customerId}-flat-front-image`,
          );
          setFrontImageDetails((prevFrontImageDetails) => {
            return {
              ...prevFrontImageDetails,
              canvasImageUrl: imageFile,
            };
          });
        }
      } else {
        const response = await fetch(DefaultFrontCardImage);
        const blob = await response.blob();
        const filename = 'default-screenshot.png';
        const frontDefaultImageFile = new File([blob], filename, {
          type: blob.type,
        });
        setFrontImageDetails((prevFrontImageDetails) => {
          return {
            ...prevFrontImageDetails,
            canvasImageUrl: frontDefaultImageFile,
          };
        });
      }
    } catch (error) {
      console.error('Error generating screenshot:', error);
    }
  }

  async function generateCanvasImage() {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const blobUrl = frontImageDetails.screenShotUrl;
      const image1 = new Image();
      image1.src = CardBackImage;

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
      const scaledHeight = Math.min(maxAllowedHeight, image2.height);

      const offsetX = centerX - scaledWidth / 2;
      const offsetY = centerY - scaledHeight / 2;

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
          ? frontImageDetails.selectedImageFile
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
        setIsScrollerRemoved(false);
        const response = await data.json();
        return {success: true, s3ImageUrls: response.result};
      } else {
        return {success: false};
      }
    } catch (err) {
      console.error('Failed uploading the PDF: ', err);
      return {success: false};
    }
  }

  const handleCustomCardSaveButton = async () => {
    const uploadPDFResponse = await uploadPdfRequest();
    if (!uploadPDFResponse.success) {
      return setErrorResponse({
        message: 'Unable to upload the PDF.',
        status: true,
      });
    }
    const isCustomCardSaved = await saveCustomCard(
      uploadPDFResponse.s3ImageUrls,
    );
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
          cardType: 'flat5x7',
          isHeaderIncluded: headerFooterVisibility.isHeaderVisible,
          isFooterIncluded: headerFooterVisibility.isFooterVisible,
          messageAreaPosition: 'TOP',
          header: {
            data: s3ImageUrls.headerUrl
              ? s3ImageUrls.headerUrl
              : headerData.customText,
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
            data: s3ImageUrls.footerUrl
              ? s3ImageUrls.footerUrl
              : footerData.customText,
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
        featuredImage: frontImageDetails.canvasImageUrl,
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

  const handleCardTitleInputChange = (event) => {
    setCustomCardTitle(event.target.value);
    setValidationModalData((prevValidationData) => {
      return {...prevValidationData, isUserTyping: true};
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
              setErrorResponse({message: '', status: false});
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
                  className={`min-w-[190px] w-full h-[42px] rounded border-[#aaa] border-solid border-2 outline-none focus:outline-none flex-1 focus:ring-0 ${
                    validationModalData.isNameValidated
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
                    className={`absolute right-[3px] top-[3px] py-2 px-4 min-w-[100px] h-[35px] shadow-md bg-[#EF6E6E] flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none rounded`}
                    onClick={handleCardTitleValidation}
                    disabled={validationModalData.isNameValidated}
                  >
                    {!isLoading && 'Validate'}

                    {isLoading && (
                      <div className="flex gap-[4px]  items-center">
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
                        <span className="whitespace-nowrap hidden md:block ">
                          {loadingText}
                        </span>
                      </div>
                    )}
                  </button>
                )}
                <div className="block md:hidden">
                  {isLoading && !validationModalData.isNameValidated && (
                    <span className="whitespace-nowrap md:text-[14px] font-bold text-[12px] text-[#001a5f]">
                      {loadingText}
                    </span>
                  )}
                </div>
              </div>
              <button
                className={`${
                  !validationModalData.isNameValidated
                    ? 'cursor-not-allowed'
                    : ''
                } bg-[#1b5299] text-[13px] font-normal border-none text-white  outline-none p-1 px-8  h-[42px] `}
                disabled={!validationModalData.isNameValidated}
                type="button"
                onClick={handleCustomCardSaveButton}
              >
                {isLoading && validationModalData.isNameValidated ? (
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
                    <span className="whitespace-nowrap text-center">
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
              return {...prevQrValues, isInputModalOpened: false};
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
              className="bg-[#ef6e6e] border-none text-white outline-none mb-[20px] p-1 pl-8 pr-8 w-full h-[43px] mt-5 font-bold"
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
            <div className="font-bold tex-xl text-center pt-[30px] p-3">
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

      <div className="relative md:mt-16">
        <div className=" global-max-width-handler flex justify-center items-center flex-wrap  lg:flex-row flex-col">
          <div className="flex flex-col justify-start items-center flex-1 lg:w-auto w-[95%] ">
            <span className="text-[30px] text-[#333] font-normal mb-3 md:mt-[0px] mt-[4rem] md:mb-4">
              Custom Flat {selectedCardPage}
            </span>
            <div>
              <div className="border-2 border-black border-solid">
                <div
                  className="md:min-w-[465px] sm:w-[450px] sm:h-[400px] h-[340px] w-[350px] bg-white relative overflow-hidden"
                  style={{
                    zIndex: selectedCardPage === 'Card Front' ? '-30' : '0',
                    transform: isRotationAnimationApplied
                      ? 'rotateY(-180deg)'
                      : 'rotateY(0deg)',
                    transition: 'transform 0.8s',
                  }}
                  onMouseOver={() => setIsMouseHoveredOnContainer(true)}
                  onMouseOut={() => setIsMouseHoveredOnContainer(false)}
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
                    (selectedCardPage === 'Card Back' && (
                      <div
                        className="flex flex-col h-full p-2"
                        id="backTrimmedDiv"
                        style={{
                          zIndex: '-20',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
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
                            className={`overflow-hidden h-[50px] whitespace-nowrap items-center flex`}
                            style={{
                              fontSize: `${headerData.fontSize}px`,
                              fontFamily: headerData.fontFamily,
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
                              className="flex justify-center h-[45px] w-[60px] overflow-hidden"
                            >
                              <img
                                src={headerData.imageBlobUrl}
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
                        <div className="flex flex-1 pl-6 mt-5 mb-5 font-tarzan text-[40px] text-[#0040ac]">
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
                          {footerData.customText && (
                            <div
                              className={`overflow-hidden h-[50px]  whitespace-nowrap items-center flex`}
                              style={{
                                fontFamily: footerData.fontFamily,
                                fontSize: `${footerData.fontSize}px`,
                                color: `${footerData.fontColor}`,
                                maxWidth: `${qr.isQrAdded ? '375px' : '434px'}`,
                              }}
                            >
                              {!footerData.isImageSelected &&
                                footerData.customText}
                            </div>
                          )}
                          {(footerData.isImageSelected || qr.isQrAdded) && (
                            <div
                              id="backFooterImageDiv"
                              className={`h-[45px] flex justify-center overflow-hidden ${
                                qr.isQrAdded && footerData.alignment === 'right'
                                  ? 'w-[35px] '
                                  : 'w-[60px]'
                              }`}
                            >
                              <img
                                src={
                                  qr.isQrAdded
                                    ? qr.generatedQrImageLink
                                    : footerData.imageBlobUrl
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
              <div className="flex gap-4 w-full mt-3">
                <button
                  value="Card Front"
                  className={`flex-1 p-[10px] text-white font-normal text-[18px] ${
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
                  className={`flex-1 p-[10px] text-white font-normal text-[18px]  ${
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
          <div
            className="flex flex-col justify-between lg:items-baseline md:mt-0 mt-6  items-centermt-[30px]  lg:ml-[47px]  gap-5  flex-1 lg:w-[50%] md:w-[500px] sm:w-[445px] w-[350px]"
            // style={{marginTop: '9rem'}}
          >
            {selectedCardPage === 'Card Front' && (
              <>
                <div className="relative flex lg:mt-[-9rem] mt-0 ">
                  <div className="flex flex-row items-center lg:justify-start gap-2 justify-center p-2 border border-[#ddd] rounded-lg w-full md:w-adto">
                    <img
                      className="cursor-pointer w-[70px]"
                      src={AddImageIcon}
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
                  {selectedCardPage === 'Card Front' && (
                    <input
                      type="file"
                      id="image-input"
                      accept="image/png, image/jpeg"
                      ref={frontImageRef}
                      className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none "
                      onChange={handleImageFileInsertion}
                    />
                  )}
                </div>
                <div className="h-auto mt-[30px]">
                  {selectedCardPage === 'Card Front' &&
                    (frontImageDetails.imageBlobUrl ||
                      frontImageDetails.blackAndWhiteImageBlobUrl) && (
                      <div className="flex flex-col gap-3 md:mt-[0px] ">
                        <div className="flex flex-col">
                          <span className="text-base font-bold">
                            Resize image
                          </span>
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
                <div className=" border border-[#ddd] p-6 flex flex-col gap-3 shadow-box">
                  <div>
                    <div className="flex items-center space-x-4 gap-8 ">
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
                  <div className="flex justify-between items-center text-white gap-1 lg:w-[90%]  w-[100%] mb-4">
                    <button
                      className={`${
                        observingData.isHeader
                          ? 'bg-[#1b5299] text-white shadow-md'
                          : 'bg-transparent text-[#1b5299]'
                      } h-[45px] border border-solid border-[#1b5299] outline-none text-center flex-1 font-semibold text-[16px] rounded-lg`}
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
                      } h-[45px] border border-solid border-[#1b5299] outline-none text-center flex-1 font-semibold text-[16px] rounded-lg`}
                      onClick={() =>
                        setObservingData({isHeader: false, isFooter: true})
                      }
                    >
                      Footer
                    </button>
                  </div>
                  <div className="flex min-h-[330px]  sm:flex-row flex-col items-start lg:w-auto w-[100%] ">
                    <div className="flex flex-1 sm:w-[50%] w-[100%] ">
                      <div className="flex flex-col w-full text-[14px] text-black font-medium">
                        <label htmlFor="custom-text">
                          <span className="font-bold">
                            {observingData.isHeader
                              ? 'Header Text'
                              : 'Footer Text'}
                          </span>
                          <br />
                          <input
                            id="custom-text"
                            className="w-full"
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
                          <span className="flex-1 font-bold mr-2">
                            Alignment
                          </span>
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
                            className="w-full"
                            value={
                              observingData.isHeader
                                ? headerData.fontFamily
                                : footerData.fontFamily
                            }
                            onChange={handleFontFamilyChange}
                          >
                            <option
                              value="Arial"
                              style={{fontFamily: 'Arial'}}
                              className={`font-arial`}
                            >
                              Arial
                            </option>
                            <option
                              value="Comic Sans MS"
                              style={{fontFamily: 'Comic Sans MS'}}
                            >
                              Comic Sans Ms
                            </option>
                            <option
                              value="Arial Black"
                              style={{fontFamily: 'Arial Black'}}
                            >
                              Arial Black
                            </option>
                            <option
                              value="Arial Narrow"
                              style={{fontFamily: 'Arial Black'}}
                            >
                              Arial Narrow
                            </option>
                            <option
                              value="Courier New"
                              style={{fontFamily: 'Courier New'}}
                            >
                              Courier New
                            </option>
                            <option
                              value="CImpact"
                              style={{fontFamily: 'Impact'}}
                            >
                              Impact
                            </option>
                            <option
                              value="Rockwell"
                              style={{fontFamily: 'Rockwell'}}
                            >
                              Rockwell
                            </option>
                            <option
                              value="Tahoma"
                              style={{fontFamily: 'Tahoma'}}
                            >
                              Tahoma
                            </option>
                            <option
                              value="Times New Roman"
                              style={{fontFamily: 'Times New Roman'}}
                            >
                              Times New Roman
                            </option>
                            <option
                              value="Trebuchet MS"
                              style={{fontFamily: 'Trebuchet MS'}}
                            >
                              Trebuchet MS
                            </option>
                            <option
                              value="Verdana"
                              style={{fontFamily: 'Verdana'}}
                            >
                              Verdana
                            </option>
                          </select>
                        </label>

                        <label htmlFor="font-size-selection" className="mb-3">
                          <span className="font-bold">Font Size</span>
                          <br />
                          <select
                            id="font-size-selection"
                            className="w-full"
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
                            className="w-full"
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
                    <div className="flex sm:flex-col flex-row flex-1 sm:ml-[38px] ml-0 w-full flex-wrap sm:justify-start justify-between">
                      <div className="relative mt-5 w-[60px] h-[50px]">
                        {observingData.isHeader && !qr.isQrAdded && (
                          <>
                            <div className="flex items-center gap-2">
                              <img
                                className="cursor-pointer"
                                src={AddImageIcon}
                                alt="Add image file icon"
                                draggable="false"
                              />
                              <label
                                htmlFor="image-input2"
                                className="font-bold text-[14px] whitespace-nowrap cursor-pointer"
                              >
                                Header Image
                              </label>
                            </div>
                            <input
                              type="file"
                              id="image-input2"
                              accept="image/png, image/jpeg"
                              ref={backHeaderImageRef}
                              className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                              onChange={handleImageFileInsertion}
                            />
                          </>
                        )}
                        {observingData.isFooter && !qr.isQrAdded && (
                          <>
                            <div className="flex items-center gap-2 ">
                              <img
                                className="cursor-pointer"
                                src={AddImageIcon}
                                ref={backFooterImageRef}
                                alt="Add image file icon"
                                draggable="false"
                              />
                              <label
                                htmlFor="image-input3"
                                className="font-bold text-[14px] whitespace-nowrap cursor-pointer"
                              >
                                Footer Image
                              </label>
                            </div>
                            <input
                              type="file"
                              id="image-input3"
                              accept="image/png, image/jpeg"
                              className="absolute top-0 bottom-0 left-0 right-0 opacity-0 focus:outline-none focus:border-none"
                              onChange={handleImageFileInsertion}
                            />
                          </>
                        )}
                      </div>
                      <div className="flex  flex-col items-baseline gap-8  sm:w-full w-[45%]">
                        <div className="h-auto sm:w-1/2 w-[90%] ">
                          {observingData.isHeader &&
                            headerData.imageFile &&
                            headerData.imageBlobUrl &&
                            !qr.isQrAdded && (
                              <>
                                <div className="flex flex-col mb-3 mt-3">
                                  <span className="font-bold text-[14px]">
                                    Resize image
                                  </span>
                                  <input
                                    type="range"
                                    min="0.3"
                                    max="1"
                                    step="0.1"
                                    value={headerData.zoom}
                                    onChange={handleZoomSliderChange}
                                  />
                                </div>
                                <div className="flex justify-start items-center sm:gap-5 gap-2">
                                  <label htmlFor="bw-radio-btn">
                                    <input
                                      id="bw-radio-btn"
                                      name="isImageColored"
                                      type="radio"
                                      value="grayscale"
                                      checked={!headerData.isColoredImage}
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
                                      checked={headerData.isColoredImage}
                                    />
                                    &nbsp;Color
                                  </label>
                                </div>
                                <div className="h-[40px] sm:mt-5 mt-2">
                                  <button
                                    className="bg-[#1b5299] border-none text-white  text-sm outline-none text-center h-[40px] w-full font-bold"
                                    type="button"
                                    onClick={handleSelectedImageReset}
                                  >
                                    Remove image
                                  </button>
                                </div>
                              </>
                            )}
                          {observingData.isFooter &&
                            footerData.imageFile &&
                            footerData.imageBlobUrl && (
                              <>
                                <div className="flex flex-col mb-3 mt-3">
                                  <span>Resize image</span>
                                  <input
                                    type="range"
                                    min="0.3"
                                    max="1"
                                    step="0.1"
                                    value={footerData.zoom}
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
                                      checked={!footerData.isColoredImage}
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
                                      checked={footerData.isColoredImage}
                                    />
                                    &nbsp;Color
                                  </label>
                                </div>
                                <div className="h-[40px] mt-5">
                                  <button
                                    className="bg-[#1b5299] border-none text-white text-sm outline-none text-center h-[40px] w-full font-bold"
                                    type="button"
                                    onClick={handleSelectedImageReset}
                                  >
                                    Remove image
                                  </button>
                                </div>
                              </>
                            )}
                        </div>
                      </div>

                      <div
                        className={` ${
                          qr.isQrAdded ? 'bg-[#ef6e6e] ' : 'bg-[#1b5299]'
                        } sm:w-[200px] w-[100%] cursor-pointer border border-solid border-black rounded p-1.5 flex items-center sm:justify-start justify-center gap-2 text-white flex-wrap mb-5 mt-10`}
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
                      className="bg-[#1b5299] h-[40px] border-none text-white text-[14px] outline-none text-center sm:w-[250px] w-[350px] font-semibold"
                      onClick={handleFinishEditingButton}
                    >
                      Finish Editing
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
