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
  const [isScrollerRemoved, setIsScrollerRemoved] = useState(false);
  const [isRotationAnimationApplied, setIsRotationAnimationApplied] =
    useState(false);
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [frontImageDetails, setFrontImageDetails] = useState({
    isImageSelected: false,
    imageBlobUrl: null,
    blackAndWhiteImageBlobUrl: null,
    selectedImageFile: null,
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
              : frontImageDetails.blackAndWhiteImageFile;
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
    headerData.isImageSelected,
    footerData.isImageSelected,
  ]);

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
        setIsLoading(false);
        setIsScrollerRemoved(false);
        const response = await data.json();
        setS3ImageUrls(response.result);
        console.log(s3ImageUrls);

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
        message: 'Card name already exists.',
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

  async function saveCustomCard() {
    try {
      setIsLoading(true);
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
        featuredImage: frontImageDetails.selectedImageFile,
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



  return (
    <section>
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
          <div className='p-[35px]'>
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
            <div className='flex lg:flex-row flex-col justify-between gap-2 mt-3'>
            <input
              className="min-w-[190px] h-[42px] rounded border-[#aaa] border-solid border-2 outline-none focus:outline-none flex-1"
              type="text"
              placeholder="Card Name"
              onChange={(e) => setCustomCardTitle(e.target.value)}
            ></input>
          
            <button
              className="bg-[#1b5299] text-[13px] font-normal border-none text-white  outline-none p-1 px-8  h-[42px] "
              type="button"
              onClick={handleCustomCardSaveButton}
            >
              SAVE CARD
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
              className="bg-[#ef6e6e] border-none text-white outline-none p-1 pl-8 pr-8 w-full h-[43px] mt-5 font-bold"
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

      <div className="relative md:mt-3" style={{marginTop: '-2rem'}}>
        <div className="min-h-[553px] flex justify-center items-center flex-wrap  lg:flex-row flex-col">
          <div
            className="flex flex-col justify-start items-center flex-1 lg:w-auto w-[95%] "
            style={{minHeight: '564px'}}
          >
           
            <span className="text-[30px] text-[#333] font-normal mb-3 md:mt-[65px] mt-[4rem]">
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
                            className={`font-${headerData.fontFamily} overflow-hidden h-[50px] whitespace-nowrap items-center flex`}
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
                            className={`font-${footerData.fontFamily} overflow-hidden h-[50px] whitespace-nowrap items-center flex`}
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
                              className={`h-[45px] flex justify-center overflow-hidden ${
                                qr.isQrAdded ? 'w-[20px] ml-3 ' : 'w-[60px]'
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
            className="flex flex-col justify-between lg:items-baseline  items-center lg:mt-[8rem] mt-[30px]  lg:ml-[47px]  sm:ml-7 gap-5  flex-1 lg:w-[50%] md:w-[500px] sm:w-[445px] w-[350px]"
            // style={{marginTop: '9rem'}}
          >
            {selectedCardPage === 'Card Front' && (
              <>
                <div className="relative w-[60px] h-[50px] lg:mt-[-9rem] mt-0 ">
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
                <div className="h-auto mt-[40px]">
                  {selectedCardPage === 'Card Front' &&
                    (frontImageDetails.imageBlobUrl ||
                      frontImageDetails.blackAndWhiteImageBlobUrl) && (
                      <div className="flex flex-col gap-8 md:mt-[0px] mt-[-60px]">
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
                <div className="flex justify-between items-center text-white gap-1 lg:w-[90%]  w-[100%] ">
                  <button
                    className={`${
                      observingData.isHeader
                        ? 'bg-[#1b5299] text-white shadow-md'
                        : 'bg-transparent text-[#1b5299]'
                    } h-[35px] border border-solid border-[#1b5299] outline-none text-center flex-1 font-semibold text-[16px]`}
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
                    } h-[38px] border border-solid border-[#1b5299] outline-none text-center flex-1 font-semibold text-[16px]`}
                    onClick={() =>
                      setObservingData({isHeader: false, isFooter: true})
                    }
                  >
                    Footer
                  </button>
                </div>
                <div className="flex min-h-[330px]  sm:flex-row flex-col items-center lg:w-auto w-[100%] ">
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
                          className="w-full"
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
                  <div className="flex sm:flex-col flex-row flex-1 sm:ml-[38px] ml-0 w-full flex-wrap sm:justify-start justify-center">
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
                    <div className="flex sm:flex-col flex-col sm:items-baseline items-center gap-8  sm:w-full w-[45%]">
                      <div className="h-auto sm:w-1/2 w-[90%] sm:ml-0 ml-[33px]">
                        {observingData.isHeader &&
                          headerData.imageFile &&
                          headerData.imageBlobUrl && (
                            <>
                              <div className="flex flex-col mb-3 mt-3">
                                <span>Resize image</span>
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
                                  className="bg-[#1b5299] border-none text-white text-sm outline-none text-center h-[40px] w-full font-bold"
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
                      } sm:w-[200px] w-[100%] cursor-pointer border border-solid border-black rounded p-1.5 flex items-center justify-start gap-2 text-white flex-wrap mb-5 mt-10`}
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
