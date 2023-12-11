import {useEffect, useRef, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import html2canvas from 'html2canvas';
import {Modal} from '../Modal';
import CircularLoader from '../CircularLoder';
import {FaArrowLeft} from 'react-icons/fa';
import AddImageIcon from '../../../assets/Image/add_image_icon.png';
import DefaultFrontCardImage from '../../../assets/Image/foldFront.webp';
import DefaultBackCardImage from '../../../assets/Image/foldBack.png';

export default function FoldedCustomisableCard({
  setIsCardTypeSelectionPage,
  shopifyCustomisableCardProduct,
  customerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollerRemoved, setIsScrollerRemoved] = useState(false);
  const [isRotationAnimationApplied, setIsRotationAnimationApplied] =
    useState(false);
  const [checkTitleDuplicacyModalOpen, setCheckTitleDuplicacyModalOpen] =
    useState(false);
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [customCardTitle, setCustomCardTitle] = useState('');
  const [s3ImageUrls, setS3ImageUrls] = useState({});
  const [frontImageDetails, setFrontImageDetails] = useState({
    isImageSelected: false,
    imageBlobUrl: null,
    blackAndWhiteImageBlobUrl: null,
    selectedImageFile: null,
    zoom: 1,
    isColoredImage: true,
    isLongImage: false,
  });
  const [backImageDetails, setBackImageDetails] = useState({
    isImageSelected: false,
    imageBlobUrl: null,
    blackAndWhiteImageBlobUrl: null,
    selectedImageFile: null,
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

  // TODO: Remove commented code when no longer needed
  // useEffect(() => {
  //   // To stop the lateral inversion of the image to be screenshotted.
  //   setIsRotationAnimationApplied(false);
  //   let trimmedDiv;
  //   // To Store the actual value instead of a promise inside screenshotUrl object key.
  //   const generateScreenshot = async () => {
  //     try {
  //       // Image file present, generating screenshot.
  //       if (
  //         selectedCardPage === 'Card Front' &&
  //         frontImageDetails.isImageSelected
  //       ) {
  //         trimmedDiv = document.getElementById('frontTrimmedDiv');
  //         const screenshotImageFile = await generateTrimmedImageScreenshotFile(
  //           trimmedDiv,
  //         );
  //         setFrontImageDetails((prevFrontImageDetails) => {
  //           return {
  //             ...prevFrontImageDetails,
  //             screenshotImageFile,
  //           };
  //         });
  //       }

  //       if (
  //         selectedCardPage === 'Card Back' &&
  //         backImageDetails.isImageSelected
  //       ) {
  //         trimmedDiv = document.getElementById('backTrimmedDiv');
  //         const screenshotImageFile = await generateTrimmedImageScreenshotFile(
  //           trimmedDiv,
  //         );
  //         setBackImageDetails((prevBackImageDetails) => {
  //           return {
  //             ...prevBackImageDetails,
  //             screenshotImageFile,
  //           };
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error generating screenshot:', error);
  //     }
  //   };

  //   generateScreenshot();

  //   console.log({frontImageDetails, backImageDetails});
  // }, [
  //   frontImageDetails.imageBlobUrl,
  //   frontImageDetails.blackAndWhiteImageBlobUrl,
  //   frontImageDetails.zoom,
  //   frontImageDetails.isColoredImage,

  //   backImageDetails.imageBlobUrl,
  //   backImageDetails.blackAndWhiteImageBlobUrl,
  //   backImageDetails.zoom,
  //   backImageDetails.isColoredImage,
  // ]);

  // async function generateTrimmedImageScreenshotFile(element) {
  //   try {
  //     // Wait for the image to be fully loaded for the timing issue.
  //     await new Promise((resolve) => {
  //       const image = element.querySelector('img');
  //       if (image.complete) {
  //         resolve();
  //       } else {
  //         image.onload = resolve;
  //       }
  //     });

  //     const canvas = await html2canvas(element);
  //     const dataUrl = canvas.toDataURL('image/png');

  //     // Convert the URL to a file
  //     let arr = dataUrl.split(','),
  //       mime = arr[0].match(/:(.*?);/)[1],
  //       bstr = atob(arr[1]),
  //       n = bstr.length,
  //       u8arr = new Uint8Array(n);

  //     while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //     }

  //     let filename = 'screenshot.png';

  //     return new File([u8arr], filename, {type: mime});
  //   } catch (error) {
  //     console.error('Error generating a screenshot file:', error);
  //   }
  // }

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

        if (
          selectedCardPage === 'Card Back' &&
          backImageDetails.isImageSelected
        ) {
          if (frontImageDetails.isImageSelected) {
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
            generateDefaultScreenshotImage(DefaultFrontCardImage, 'front-mage');
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
    backImageDetails.isImageSelected,
    backImageDetails.isColoredImage,
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
          };
        });
      }
      if (cardImagePosition === 'back-image') {
        setBackImageDetails((prevBackImageDetails) => {
          return {
            ...prevBackImageDetails,
            selectedImageFile,
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

  const handleCustomCardSaveButton = async () => {
    const isDuplicateTitle = await checkForDuplicateTitle();
    if (isDuplicateTitle) {
      return setErrorResponse({
        message: 'Card Name Already in Use. Please Choose a Unique Name.',
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
        setIsLoading(false);
        setIsScrollerRemoved(false);
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

  const GoBackButton = () => {
    return (
      <div
        className="absolute top-0 left-0 button-tomato text-white inline flex justify-center items-center p-3 font-semibold cursor-pointer text-xs"
        onClick={() => setIsCardTypeSelectionPage(true)}
      >
        <FaArrowLeft /> &nbsp; GO BACK
      </div>
    );
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
              className="bg-[#1b5299] border-none text-white text-sm outline-none p-1 pl-8 pr-8 min-w-[100%] h-[43px] mt-5"
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
      <div className="relative md:mt-3" style={{marginTop: '-2rem'}}>
        <div className="min-h-[553px] flex justify-center items-center flex-wrap gap-5 lg:flex-row flex-col">
          <div
            className="flex flex-col justify-start items-center flex-1 sm:ml-7 ml-0 "
            style={{minHeight: '564px'}}
          >
            <div className="sm:min-w-[500px] min-w-[347px] md:mt-[58px] mt-[63px] ml-[0px]  flex-1 relative">
              <GoBackButton />
            </div>
            <span className="text-2xl mb-2  mt-[60px]">
              Custom Folded {selectedCardPage}
            </span>
            <div>
              <div className="border-2 border-black border-solid">
                <div
                  className="sm:min-w-[500px] w-[350px] bg-white relative overflow-hidden"
                  style={{
                    height: '378px',
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
                        className="absolute flex justify-center items-center m-auto inset-0 sm:w-[480px] w-[330px] border-2 border-dashed border-[#ff0000]"
                        style={{
                          height: '358px',
                          background: 'transparent',
                          zIndex: '-10',
                          transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
                            : 'rotateY(0deg)',
                        }}
                      ></div>
                      <div
                        className="absolute flex justify-center items-center m-auto inset-0 sm:w-[480px] w-[330px]"
                        id="frontTrimmedDiv"
                        style={{
                          height: '358px',
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
                    (selectedCardPage === 'Card Inside' && (
                      <div
                        className="absolute flex justify-center items-center  text-center m-auto inset-0 h-[330px] sm:w-[480px] w-[330px]"
                        style={{
                          transform: isRotationAnimationApplied
                            ? 'rotateY(-180deg)'
                            : 'rotateY(0deg)',
                        }}
                      >
                        <div class="relative w-full h-full">
                          <span className="p-8 font-pinocchio">
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
                          className="absolute flex justify-center items-center m-auto inset-0 sm:w-[480px] w-[330px] border-2 border-dashed border-[#ff0000]"
                          style={{
                            height: '358px',
                            background: 'transparent',
                            zIndex: '-10',
                            transform: isRotationAnimationApplied
                              ? 'rotateY(-180deg)'
                              : 'rotateY(0deg)',
                          }}
                        ></div>
                        <div
                          className="absolute flex justify-center items-center m-auto inset-0 sm:w-[480px] w-[330px]"
                          id="backTrimmedDiv"
                          style={{
                            height: '358px',
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
                              className="object-contain h-full"
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
                  value="Card Inside"
                  className={`flex-1 p-2 text-white font-bold ${
                    selectedCardPage === 'Card Inside'
                      ? 'button-blue'
                      : 'button-tomato'
                  }`}
                  onClick={handleCardPageSelectionButton}
                >
                  Card Inside
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
          <div className="flex flex-col justify-center items-start gap-8 flex-1 lg:mt-[10rem] mt-[10px]">
            <div
              className={` ${
                qr.isQrAdded ? 'bg-[#ef6e6e] ' : 'bg-[#1b5299]'
              } w-[200px] cursor-pointer border border-solid md:ml-[0px] ml-[36px] border-black rounded p-1.5 flex items-center justify-start gap-2 text-white flex-wrap mb-5`}
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
                  &#40;to inside of card&#41;
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center gap-5 min-w-[240px] ">
              {!(selectedCardPage === 'Card Inside') && (
                <>
                  <div className="relative md:ml-[0px] ml-[-108px] w-[60px] h-[50px]">
                    {selectedCardPage === 'Card Front' && (
                      <>
                        <img
                          src={AddImageIcon}
                          alt="Add image file icon"
                          draggable="false"
                        />
                        <input
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
                        <img
                          src={AddImageIcon}
                          alt="Add image file icon"
                          draggable="false"
                        />
                        <input
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
                      className="bg-[#1b5299] h-[40px] border-none ml-[0px]  text-white text-sm outline-none text-center w-full font-semibold"
                      onClick={handleFinishEditingButton}
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
