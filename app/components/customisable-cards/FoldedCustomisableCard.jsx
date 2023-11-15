import {useEffect, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import html2canvas from 'html2canvas';
import Loader from '../modal/Loader';
import {Modal} from '../Modal';
import {FaArrowLeft} from 'react-icons/fa';
import AddImageIcon from '../../../assets/Image/add_image_icon.png';

export default function FoldedCustomisableCard({
  setIsCardTypeSelectionPage,
  shopifyCustomisableCardProduct,
  customerId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkTitleDuplicacyModalOpen, setCheckTitleDuplicacyModalOpen] =
    useState(false);
  const [selectedCardPage, setSelectedCardPage] = useState('Card Front');
  const [customCardTitle, setCustomCardTitle] = useState('');
  const [s3ImageUrls, setS3ImageUrls] = useState({});
  const [frontImageDetails, setFrontImageDetails] = useState({
    imageFile: null,
    screenshotImageFile: null,
    zoom: 1,
    isColoredImage: true,
    isLongImage: false,
  });
  const [backImageDetails, setBackImageDetails] = useState({
    imageFile: null,
    screenshotImageFile: null,
    zoom: 1,
    isColoredImage: true,
    isLongImage: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.clear();
    let trimmedDiv;
    // To Store the actual value instead of a promise inside screenshotUrl object key.
    const generateScreenshot = async () => {
      try {
        //
        // Image file present, generating screenshot.
        if (selectedCardPage === 'Card Front') {
          trimmedDiv = document.getElementById('frontTrimmedDiv');
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

        if (selectedCardPage === 'Card Back') {
          trimmedDiv = document.getElementById('backTrimmedDiv');
          const screenshotImageFile = await generateTrimmedImageScreenshotFile(
            trimmedDiv,
          );
          setBackImageDetails((prevBackImageDetails) => {
            return {
              ...prevBackImageDetails,
              screenshotImageFile,
            };
          });
        }
      } catch (error) {
        console.error('Error generating screenshot:', error);
      }
    };

    generateScreenshot();

    console.log({frontImageDetails, backImageDetails});
  }, [
    frontImageDetails.imageFile,
    backImageDetails.imageFile,
    frontImageDetails.zoom,
    backImageDetails.zoom,
    frontImageDetails.isColoredImage,
    backImageDetails.isColoredImage,
  ]);

  async function generateTrimmedImageScreenshotFile(element) {
    try {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');

      console.log(`${selectedCardPage} Screenshot URL: `, dataUrl);

      // Convert the URL to a file
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
    } catch (error) {
      console.error('Error generating a screenshot file:', error);
    }
  }

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

        if (selectedCardPage === 'Card Back') {
          setBackImageDetails((prevBackImageDetails) => {
            return {
              ...prevBackImageDetails,
              imageFile: URL.createObjectURL(chosenFile),
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
      imageFile: null,
      screenshotUrl: null,
      zoom: 1,
      isColoredImage: true,
      isLongImage: false,
    };
    selectedCardPage === 'Card Front' &&
      setFrontImageDetails(initialImageDetails);

    selectedCardPage === 'Card Back' &&
      setBackImageDetails(initialImageDetails);
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

  const handleCustomCardSaveButton = async () => {
    const isDuplicateTitle = await checkForDuplicateTitle();
    if (isDuplicateTitle) return alert('Card name already exists. 😔');
    const isCustomCardSaved = await saveCustomCard();
    if (!isCustomCardSaved) return alert('Unable to save the custom card.');
    alert('Custom card succesfully saved!! 🚀');
    // navigate(`/products/${customCardTitle}`);
  };

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

  const handleQrSelectionButton = () => {
    alert('Yet to be completed. 🚀');
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

  async function uploadPdfRequest() {
    try {
      setIsLoading(true);
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

      formData.append('faceImage', frontImageDetails.screenshotImageFile);
      formData.append('backImage', backImageDetails.screenshotImageFile);
      formData.append('headerImage', null);
      formData.append('footerImage', null);

      formData.append('isLongImage', frontImageDetails.isLongImage);
      formData.append('isLongImageBack', backImageDetails.isLongImage);
      formData.append('transformFace', frontImageDetails.zoom);
      formData.append('transformBack', backImageDetails.zoom);
      formData.append('cardType', 'folded5x7');
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
          cardType: 'folded5x7',
          isHeaderIncluded: false,
          isFooterIncluded: false,
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
          <span className="text-2xl mb-2">
            Custom Folded {selectedCardPage}
          </span>
          <div>
            <div
              className="h-[350px] min-w-[500px] bg-white relative border-2 border-black border-solid overflow-hidden"
              style={{zIndex: '-30'}}
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
                (selectedCardPage === 'Card Inside' && (
                  <div className="p-8">
                    Your custom message text will be here...
                  </div>
                )) ||
                (selectedCardPage === 'Card Back' && (
                  <>
                    <div
                      className="absolute flex justify-center items-center m-auto inset-0 h-[330px] w-[480px] border-2 border-dashed border-[#ff0000]"
                      style={{background: 'transparent', zIndex: '-10'}}
                    ></div>
                    <div
                      className="absolute flex justify-center items-center m-auto inset-0 h-[330px] w-[480px]"
                      id="backTrimmedDiv"
                      style={{zIndex: '-20'}}
                    >
                      {backImageDetails.imageFile && (
                        <img
                          src={backImageDetails.imageFile}
                          alt="Selected back card image file"
                          className={`object-contain h-full ${
                            backImageDetails.isColoredImage
                              ? 'grayscale-0'
                              : 'grayscale'
                          }`}
                          draggable="false"
                          style={{transform: `scale(${backImageDetails.zoom})`}}
                        />
                      )}
                    </div>
                  </>
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
                value="Card Inside"
                className={`flex-1 p-2 text-white ${
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
        <div className="flex flex-col justify-center items-start gap-8 flex-1">
          <div
            className="w-[200px] cursor-pointer bg-[#1b5299] border border-solid border-black rounded p-1.5 flex items-center justify-start gap-2 text-white flex-wrap mb-5"
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
              <span className="text-xs">&#40;to inside of card&#41;</span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center gap-5 min-h-[330px] min-w-[240px] ">
            {!(selectedCardPage === 'Card Inside') && (
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

                  {selectedCardPage === 'Card Back' && (
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

                  {selectedCardPage === 'Card Back' &&
                    backImageDetails.imageFile && (
                      <div className="flex flex-col gap-8">
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
                    className="bg-[#1b5299] h-[40px] border-none text-white text-sm outline-none text-center w-full font-semibold"
                    onClick={handleFinishEditingButton}
                  >
                    Finish Editing
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
