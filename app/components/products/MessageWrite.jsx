import React, {useState, useEffect, useRef, useCallback} from 'react';
import Instruction from '../modal/Instruction';
import ErrorModal from '../modal/ErrorModal';
import LoginModal from '../modal/LoginModal';
import DynamicButton from '../DynamicButton';
import ContactTable from '../addressBook/ContactTable';
import CircularLoader from '../CircularLoder';
import AiImage from '../../../assets/Image/aiImage.avif';
import {useLocation} from '@remix-run/react';
import {useStateContext} from '../../context/StateContext';
import AddressForm from '../addressBook/AddressForm';
import ConfirmationModal from '../modal/ConfirmationModal';
import TickImg from '../../../assets/Image/check-mark.png';
import Del from '../../../assets/Image/delete.png';
import calender_icon from '../../../assets/Image/calendar.png';
import {FiUploadCloud} from 'react-icons/fi';
import {VideoTutorial} from '../VideoTutorial';
import {Modal as ModalComp} from '../Modal';
import SuccessfullLoader from '../SucessfullLoader';

let mainMessageBox,
  signOffTextBox,
  messageBocContainer,
  signOffBocContainer,
  customerid,
  loadTempDataFilter,
  savedMsg,
  boxHeight,
  isOverflowing;
export function MessageWriting({
  show,
  selectedFile,
  setSelectedFile,
  setShowBox,
  EditMess,
  editEndMess,
  editFontFamily,
  fontFamilyName,
  metafields,
  editFontSize,
  qrValue,
  editLineHeight,
  editSignOffLineHeight,
  editSignOffFontSize,
  setFontFamily,
  setCustomFontName,
  editCustomFontFamily,
  editShippingDate,
}) {
  const {
    setAddressForm,
    addressForm,
    loadAddress,
    addresses,
    setAddresses,
    setProductShow,
    isbirthdayAutomated,
    setISBirthdayAutomated,
    setShowSignScreen,
    customerId,
    showSignScreen,
    
  } = useStateContext();
  let ProdcuctSide = true;
  let [name, setName] = useState(EditMess ? EditMess : '');
  const [name2, setName2] = useState(editEndMess ? editEndMess : '');
  const [fileData, setFileData] = useState([]);
  const [valToGen, setValToGen] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [aiText, setaiText] = useState('');
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [errorVal, setErrorVal] = useState([]);
  const [clickedItem, setClickedItem] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [csvFile, setCsvFile] = useState('');
  const [bulkUploadDiv, setbulkUploadDiv] = useState(true);
  const [lenCsvData, setLenCsvData] = useState('');
  const [usAddress, setUsAddress] = useState(null);
  const [nonusAddress, setnonUsAddress] = useState(null);
  const [instructionModal, setInstructionModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [aiTextLoader, setAiTestLoader] = useState(false);
  const [fontSize, setFontSize] = useState(editFontSize ? editFontSize : '');
  const [loginModal, setLoginModal] = useState(false);
  const [checkCharCount, setCheckCharCount] = useState(false);
  const [modalForAddressBook, setModalForAddressBook] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([addresses]);
  const [addNewTem, setAddNewTem] = useState(false);
  const [loadTemModal, setLoadTemModal] = useState(false);
  const [tempVal, setTempVal] = useState('');
  const [loadTempData, setloadTempData] = useState([]);
  const [bulkFileCount, setBulkFileCount] = useState(0);
  const [errorTemplate, setErrorTemplate] = useState(false);
  const [onDelTemp, setOnDelTemp] = useState(false);
  const [lineHeight, setLineHeight] = useState(
    editLineHeight ? editLineHeight : '',
  );
  const [signOffFontSize, setSignOffFontSize] = useState(
    editSignOffFontSize ? editSignOffFontSize : '',
  );
  const [signOffLineHeight, setSignOffLineHeight] = useState(
    editSignOffLineHeight ? editSignOffLineHeight : '',
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateCheckCart, setStateCheckCart] = useState(false);
  const [isAddressUploadSuccess, setIsAddressUploadSuccess] = useState(false);
  const [getMetafields, setgetMetafield] = useState(
    metafields ? metafields : '',
  );
  const [customFonts, setCustomFonts] = useState([]);
  const [standardFontVal, setStandardFontVal] = useState('');
  const [customFontVal, setCustomFontVal] = useState('');
  const [videoBtn, setVideoBtn] = useState(false);
  const [dragAndDropBorderColor, setDragAndDropBorderColor] = useState('');
  const [fontLoad, setFontLoad] = useState(false);
  const [shippingDate, setShippingDate] = useState(
    editShippingDate ? editShippingDate : '',
  );
  const [disableSelectAddressBtn, setDisableSelectAddressBtn] = useState(false);
  const [confirmModal, setConfirmModal] = useState(true);
  const [delTemplateState, setDelTemplateState] = useState(false);
  const [delTempValue, setDelTempValue] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState(false);

  //  useEffect(()=>{
  //   setMetafieldsHeader(metafields.header && metafields.header.data.length>0?true:false)
  //   setMetafieldsFooter(metafields.footer && metafields.footer.data.length>0?true:false)

  //  },[metafields])
  const maxMessCount = 450;
  const remainingWord = maxMessCount - name.length;
  const maxSignCount = 50;
  const remainSign = maxSignCount - name2.length;
  function gettingCheckBoxAddress() {
    const data = addresses.filter((item) =>
      selectedCheckboxes.includes(item._id),
    );
    const modifiedData = data.map((item) => {
      // Specify the fields you want to remove from each object
      const {_id, shopifyId, created, updated, __v, ...newObject} = item;
      return newObject;
    });
    setFileData(modifiedData);
  }
  useEffect(() => {
    gettingCheckBoxAddress();
  }, [selectedCheckboxes]);
  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '620px',
      background: '#fff',
      width: '100%',
      padding: '30px',
      maxHeight: '500px',
      zIndex: '2',
      position: 'relative',
    },
  };
  function closeModalInt() {
    setInstructionModal(false);
  }
  function closeSelectAddressModal() {
    setModalForAddressBook(false);
  }

  function onCancelCSVUpload() {
    setDragAndDropBorderColor('#525252');
    setShowNextBtn(false);
    setSelectedFile('');
    setDisableSelectAddressBtn(false);
  }
  async function checkUserLogged() {
    // console.log(customerid,customerId,"customerId");
    // debugger
    if (!customerId) {
      // setLoginModal(true);
      // debugger
      setShowSignScreen(true)
    } else if (name.length == 0) {
      setInstructionModal(true);
    } else {
      let reqField;

      if (fileData.length) {
        fileData.map((obj) => {
          let subName = name;
          if (obj['First Name']) {
            subName = subName.replace(/\[First Name\]/g, obj['First Name']);
          }
          if (obj['Last Name']) {
            subName = subName.replace(/\[Last Name\]/g, obj['Last Name']);
          }
          if (obj['Company']) {
            subName = subName.replace(/\[Company\]/g, obj['Company']);
          }
          if (obj['Custom 1']) {
            subName = subName.replace(/\[Custom 1\]/g, obj['Custom 1']);
          }
          if (obj['Custom 2']) {
            subName = subName.replace(/\[Custom 2\]/g, obj['Custom 2']);
          }
          if (obj['Custom 3']) {
            subName = subName.replace(/\[Custom 3\]/g, obj['Custom 3']);
          }
          obj.msgData = subName;
        });
        reqField = {
          msg: name,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
          csvFileLen: lenCsvData ? lenCsvData : '1',
          usCount: usAddress,
          nonUsCount: nonusAddress,
          bulkCsvData: fileData,
          fontSize: fontSize,
          lineHeight: lineHeight,
          signOffFontSize:
            fontSize > signOffFontSize ? signOffFontSize : fontSize,
          signOffLineHeight:
            lineHeight > signOffLineHeight ? signOffLineHeight : lineHeight,
          ship_date: shippingDate,
        };
      } else {
        reqField = {
          msg: name,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
          csvFileLen: lenCsvData ? lenCsvData : '1',
          usCount: usAddress,
          nonUsCount: nonusAddress,
          bulkCsvData: fileData ? fileData : null,
          fontSize: fontSize,
          lineHeight: lineHeight,
          signOffFontSize:
            fontSize > signOffFontSize ? signOffFontSize : fontSize,
          signOffLineHeight:
            lineHeight > signOffLineHeight ? signOffLineHeight : lineHeight,
          ship_date: shippingDate,
        };
      }
      localStorage.setItem('reqFielddInCart', JSON.stringify(reqField));
      setProductShow(false);

      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Make the scroll behavior smooth
      });
    }
  }

  async function onSelectFromAddressBook() {
    if (!customerid) {
      setLoginModal(true);
    } else if (name.length == 0) {
      setInstructionModal(true);
    } else {
      const csvFileURL = await uploadCsvFileOnClick();
      let reqField,
        usCountAdd = 0,
        nonUsAdd = 0;
      if (fileData.length) {
        fileData.map((obj) => {
          let subName = name;
          if (obj['firstName']) {
            subName = subName.replace(/\[First Name\]/g, obj['firstName']);
          }
          if (obj['lastName']) {
            subName = subName.replace(/\[Last Name\]/g, obj['lastName']);
          }
          if (obj['businessName']) {
            subName = subName.replace(/\[Company\]/g, obj['businessName']);
          }
          if (
            obj['country'] === 'USA' ||
            obj['country'].toLowerCase() === '' ||
            obj['country'].toLowerCase() === ' ' ||
            obj['country'].toLowerCase() === 'u.s.a' ||
            obj['country'].toLowerCase() === 'u.s' ||
            obj['country'].toLowerCase() === 'usa' ||
            obj['country'].toLowerCase() === 'us' ||
            obj['country'].toLowerCase() === 'america' ||
            obj['country'].toLowerCase() === 'united states' ||
            obj['country'].toLowerCase() === 'united states of america' ||
            obj['country'].toLowerCase() == undefined
          ) {
            usCountAdd++;
          } else {
            nonUsAdd++;
          }
          obj.msgData = subName;
        });
        reqField = {
          msg: name,
          signOffText: name2,
          csvFileBulk: csvFileURL ? csvFileURL : null,
          csvFileLen: fileData ? fileData.length : '1',
          usCount: usCountAdd,
          nonUsCount: nonUsAdd,
          bulkCsvData: fileData,
          fontSize: fontSize,
          lineHeight: lineHeight,
          signOffFontSize:
            fontSize > signOffFontSize ? signOffFontSize : fontSize,
          signOffLineHeight:
            lineHeight > signOffLineHeight ? signOffLineHeight : lineHeight,
          ship_date: shippingDate,
        };
      } else {
        alert("you haven't added Address");
      }
      localStorage.setItem('reqFielddInCart', JSON.stringify(reqField));
      setProductShow(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Make the scroll behavior smooth
      });
    }
  }
  function onClickOfContinue() {
    setModalForAddressBook(false);
    setBulkFileCount(fileData.length);
  }

  function AfterUpload() {
    if (selectedFile) {
      setShowBox(false);
      return (
        <div className="w-full text-center">
          {showNextBtn ? (
            <>
              <div className="text-center mt-5 flex flex-col mb-2">
                <button
                  className="bg-[#1b5299] text-[#fff] items-center mb-2 justify-center p-4 h-[50px] font-roboto text-base font-bold"
                  onClick={() => checkUserLogged()}
                >
                  Next
                </button>
                <button
                  className="bg-[#ef6e6e] text-[#fff] items-center justify-center p-4 h-[50px] font-roboto text-base font-bold"
                  onClick={() => onCancelCSVUpload()}
                >
                  Cancel
                </button>
              </div>
              <span className="text-[#737373] font-inter text-sm font-medium mt-[12px] text-center">
                Number of recipient Uploaded: {lenCsvData}
              </span>
            </>
          ) : (
            <button
              className="bg-[#ef6e6e] text-[#fff] p-2 font-roboto text-base font-bold w-full"
              onClick={() => uploadCsvFile()}
            >
              Upload
            </button>
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  function ShowHeaderComp() {
    if (typeof metafields.header.data == 'string') {
      if (
        metafields.header.data.startsWith('http://') ||
        metafields.header.data.startsWith('https://')
      ) {
        return (
          <div
            className={`flex h-[48px]`}
            style={{justifyContent: metafields.header.justifyContent}}
          >
            <img
              className={`!w-20 headerImage ${
                metafields.header.isColored ? 'grayscale-0' : 'grayscale'
              }`}
              src={metafields.header.data}
            />
          </div>
        );
      } else if (metafields.header.data) {
        return (
          <div
            className={`overflow-hidden h-[48px] w-[100%]  px-[2rem] mt-2 aaa`}
          >
            <span
              className={`flex w-full h-full`}
              style={{
                fontFamily: metafields.header.fontType,
                fontSize: metafields.header.fontSize,
                textAlign: metafields.header.textAlign,
                justifyContent: metafields.header.justifyContent,
                flexDirection: metafields.header.flexDirection,
                color: metafields.header.fontColor,
                maxWidth: qrValue && qrValue.length ? '90%' : '100%',
                overflow: 'hidden',
              }}
            >
              {metafields.header.data}
            </span>
          </div>
        );
      }
    }
  }

  function ShowFooterComp() {
    if (typeof metafields.footer.data == 'string') {
      if (
        metafields.footer.data.startsWith('http://') ||
        metafields.footer.data.startsWith('https://')
      ) {
        return (
          <div
            className={`flex  h-[48px]`}
            style={{justifyContent: metafields.footer.justifyContent}}
          >
            <img
              className={`!w-20 ${
                metafields.footer.isColored ? 'grayscale-0' : 'grayscale'
              }`}
              src={metafields.footer.data}
            />
          </div>
        );
      } else {
        return (
          <div
            className={` overflow-hidden justify-center h-[48px] w-[100%] px-[2rem]`}
          >
            <span
              className={`flex w-full h-full`}
              style={{
                fontFamily: metafields.footer.fontType,
                fontSize: metafields.footer.fontSize,
                textAlign: metafields.footer.textAlign,
                justifyContent: metafields.footer.justifyContent,
                flexDirection: metafields.footer.flexDirection,
                color: metafields.footer.fontColor,
                maxWidth: qrValue && qrValue.length ? '90%' : '100%',
                overflow: 'hidden',
              }}
            >
              {metafields.footer.data}
            </span>
            {qrValue && qrValue.length ? (
              <img
                src={qrValue}
                className="h-[50px] w-[50px] absolute right-[10px] bottom-[10px]"
              />
            ) : (
              ''
            )}
          </div>
        );
      }
    }
  }
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  useEffect(() => {
    if (name.length > 0) {
      const debouncedCallback = debounce(processCustomMessageInput);
      // const resizeObserver = new ResizeObserver(debouncedCallback);
      debouncedCallback();
      if (!document.body.contains(mainMessageBox)) return;
      // resizeObserver.observe(mainMessageBox);
      // return () => resizeObserver.disconnect();
    }
  }, [name, fontFamilyName]);

  useEffect(() => {
    if (name2.length > 0) {
      const debouncedCallback = debounce(processSignOffInput);
      // const resizeObserver = new ResizeObserver(debouncedCallback);
      debouncedCallback();
      if (!document.body.contains(signOffTextBox)) return;
      // resizeObserver.observe(signOffTextBox);

      // return () => resizeObserver.disconnect();
    }
  }, [name2, fontFamilyName]);

  async function onChnageNameVal(nameData) {
    setName(nameData);
    // processInput();
  }

  async function onchnageOfRegardBox(data) {
    setName2(data);
    const debouncFunc = debounce(processCustomMessageInput);
    if (name2.length == '0' || name2.length == '1') {
      debouncFunc();
    }
    // processInput2();
  }
  function processCustomMessageInput() {
    if (!mainMessageBox) return;
    mainMessageBox.style.fontSize = '34px';
    mainMessageBox.style.lineHeight = '34px';
    setFontSize('34px');
    setLineHeight('34px');
    resize_to_fit(messageBocContainer, mainMessageBox, 'customTextResizing');
  }

  function processSignOffInput() {
    if (!signOffTextBox) return;
    signOffTextBox.style.fontSize = '34px';
    signOffTextBox.style.lineHeight = '34px';
    setSignOffFontSize('34px');
    setSignOffLineHeight('34px');
    resize_to_fit(signOffBocContainer, signOffTextBox, 'signOffResizing');
  }

  function resize_to_fit(outerContainer, innerContainer, resizeSelection) {
    isOverflowing = innerContainer.clientHeight >= outerContainer.clientHeight;
    // console.log({isOverflowing});
    if (!innerContainer || !outerContainer || !isOverflowing) return;

    const heightDifference =
      innerContainer.clientHeight - outerContainer.clientHeight;

    let fontSizeDecrement = 1;
    let lineHeightDecrement = 1;

    if (heightDifference > 1000) {
      fontSizeDecrement = 8;
      lineHeightDecrement = 8;
    } else if (heightDifference > 500) {
      fontSizeDecrement = 5;
      lineHeightDecrement = 5;
    }

    const fontSize = window.getComputedStyle(innerContainer).fontSize;
    const lineHeight = window.getComputedStyle(innerContainer).lineHeight;
    innerContainer.style.fontSize =
      parseFloat(fontSize) - fontSizeDecrement + 'px';
    innerContainer.style.lineHeight =
      parseFloat(lineHeight) - lineHeightDecrement + 'px';
    if (resizeSelection === 'customTextResizing') {
      setFontSize(innerContainer.style.fontSize);
      setLineHeight(innerContainer.style.lineHeight);
    } else if (resizeSelection === 'signOffResizing') {
      setSignOffFontSize(signOffTextBox.style.fontSize);
      setSignOffLineHeight(signOffTextBox.style.lineHeight);
    }
    if (isOverflowing)
      resize_to_fit(outerContainer, innerContainer, resizeSelection);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const keyToRemove = 'Type';
      reader.onload = (e) => {
        const csvData = e.target.result;
        let jsonData = csvToJson(csvData);
        const cleanedArray = jsonData.map((obj) => {
          const cleanedObj = {};
          Object.keys(obj).forEach((key) => {
            const newKey = key.replace(/"/g, ''); // Remove quotes from key
            const newValue = obj[key].replace(/"/g, ''); // Remove quotes from value
            cleanedObj[newKey] = newValue;
          });
          return cleanedObj;
        });
        setSelectedFile(file); // Update the selected file state
        setFileData(cleanedArray);
      };
      reader.readAsText(file);
    }
    setDragAndDropBorderColor('#ef6e6e');
  };
  function csvToJson(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');
    for (var i = 1; i < lines.length; i++) {
      var currentLine = lines[i].split(',');
      // Skip empty lines
      if (currentLine.length === 1 && currentLine[0].trim() === '') {
        continue;
      }
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
    setDisableSelectAddressBtn(true);
    return result;
  }
  async function uploadCsvFile() {
    let errMsg = [];
    let usCount = 0;
    let nonUSCount = 0;
    let found = false;
    let replacedMsg = [];

    // setbulkUploadDiv(false)
    if (!fileData.length) {
      errMsg.push('it is empty please add addresses');
      setErrorVal(errMsg);
      setIsOpen2(true);
      setTimeout(() => setIsOpen2(false), 3000);
      return;
    } else {
      setLenCsvData(fileData.length);
    }

    let reqField = [
      'Type',
      'First Name',
      'Last Name',
      'Address',
      'City',
      'State/Province',
      'Postal Code',
    ];

    const alphabetPattern = /^[A-Za-z]+$/;
    const mailText = /@.*\.com$/;
    if (fileData.length) {
      let errObj = [];
      fileData.forEach((obj, index) => {
        const missingKeys = reqField.filter((key) => !(key in obj));
        if (missingKeys.length > 0) {
          errObj.push(missingKeys);
        }
      });
      if (errObj.length > 0) {
        errMsg.push(
          'The file you are trying to upload does not have the right columns or headers. Please download our Bulk Address template and try again.',
        );

        setIsOpen2(true);
        onCancelCSVUpload();
        setTimeout(() => setIsOpen2(false), 3000);
        found = true;
      }
    }
    if (errMsg.length == 0) {
      for (let index = 0; index < fileData.length; index++) {
        const obj = fileData[index];

        let emptyKeys = [];
        const numkeys = [];
        let targetField = 'First Name';
        let emailValid = 'Email';
        let countryCheck = 'Country';
        for (const key of reqField) {
          // debugger
          if (obj[key] === '') {
            // debugger
            emptyKeys.push(key);
          }
        }

        if (alphabetPattern.test(obj[targetField]) == false) {
          errMsg.push(`'${targetField}' at row ${index} includes a number.`);
        }
        if (
          obj[countryCheck] === 'USA' ||
          obj[countryCheck].toLowerCase() === '' ||
          obj[countryCheck].toLowerCase() === ' ' ||
          obj[countryCheck].toLowerCase() === 'u.s.a' ||
          obj[countryCheck].toLowerCase() === 'u.s' ||
          obj[countryCheck].toLowerCase() === 'usa' ||
          obj[countryCheck].toLowerCase() === 'us' ||
          obj[countryCheck].toLowerCase() === 'america' ||
          obj[countryCheck].toLowerCase() === 'united states' ||
          obj[countryCheck].toLowerCase() === 'united states of america' ||
          obj[countryCheck].toLowerCase() == undefined
        ) {
          usCount++;
        } else {
          nonUSCount++;
        }
        if (mailText.test(obj[emailValid]) == false) {
          errMsg.push(
            `Index: ${index}, 'email' is not valid (missing @ or not ending with .com).`,
          );
          // setIsOpen2(true)
          // setTimeout(() => setIsOpen2(false), 3000)
        }

        if (emptyKeys.length > 0) {
          errMsg.push(
            ` ${emptyKeys.join(', ')} is empty please check at row ${index}`,
          );
          // setIsOpen2(true)
          // setTimeout(() => setIsOpen2(false), 3000)
          // break;
        }

        if (errMsg.length > 0) {
          setIsOpen2(true);
          setTimeout(() => setIsOpen2(false), 3000);
          found = true;
          onCancelCSVUpload();
        } else {
          if (stateCheckCart) {
            await uploadDataToAPI(obj);
          }
        }
      }
    }
    setErrorVal(errMsg);
    setUsAddress(usCount);
    setnonUsAddress(nonUSCount);
    if (stateCheckCart) {
      setIsAddressUploadSuccess(!isAddressUploadSuccess);
    }
    if (found) {
    } else {
      uploadCsvFileOnClick();
      // checkUserLogged()
    }
  }
  async function uploadCsvFileOnClick() {
    try {
      setLoader(true);

      const res = await fetch(
        'https://api.simplynoted.com/api/orders/bulk-orders-upload-s3',
        {
          method: 'POST',
          timeout: 0,
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNiYjVhOTAwODcwZjFmMjQ3OGRjNjkiLCJ1c2VyIjp7ImVtYWlsIjoiZmFicHJvamVjdG1hbmFnZXJAZ21haWwuY29tIiwic2hvcGlmeUlkIjoiNjIzMjYyMjg5MTExMyIsIl9pZCI6IjY0M2JiNWE5MDA4NzBmMWYyNDc4ZGM2OSIsImZpcnN0X25hbWUiOiJQcmFkZWVwIiwibGFzdF9uYW1lIjoic2luZ2gifSwiaWF0IjoxNjkwNDQwNDY0fQ.5s5g9A2PtZ8Dr5dQZsd0D9wWTT2BzDioqDXzTbIJPko',
          },
          body: JSON.stringify(fileData),
        },
      );
      const json = await res.json();

      setCsvFile(json.result);

      if (json.result) {
        setShowNextBtn(true);
        setLoader(false);
        return json.result;
      }
    } catch (error) {
      
      setModalForAddressBook(false)
      console.error(error, 'file upload error');
      setLoader(false);
    }
  }
  const uploadDataToAPI = async (data) => {
    setLoader(true);

    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data['First Name'] || '',
          lastName: data['Last Name'] || '',
          businessName: data.Company || '',
          address1: data.Address || '',
          address2: data['Address 2'] || '',
          city: data.City || '',
          state: data['State/Province'] || '',
          zip: data['Postal Code'] || '',
          country: data.Country || 'USA',
          type: data.Type
            ? data.Type.toLowerCase() === 'sender'
              ? 'return'
              : 'recipient'
            : 'recipient',
          birthday: data.Birthday || '',
          anniversary: data.Anniversary || '',
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // setLoadAddress(!loadAddress);
        // setSelectedFile(null);
        // setLoader(false);

        setLoader(false);
      } else {
        // setSelectedFile(null);
        setLoader(false);

        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // setSelectedFile(null);
      setLoader(false);

      console.error('Error uploading data:', error);
      throw error;
    }
  };
  async function onCancl() {
    setIsOpen(false);
    setValToGen(null);
    setaiText(null);
    setValue('abbabbbbb');
  }
  async function onInsetClick() {
    mainMessageBox.style.fontSize = '20px';
    mainMessageBox.style.lineHeight = '20px';

    setName(aiText);
    setIsOpen(false);
    setaiText('');
    setValToGen(null);
  }
  async function aiGenrateMess() {
    setAiTestLoader(true);
    try {
      const res = await fetch('https://api.simplynoted.com/api/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNjZjBiNDAwODcwZjFmMjQ3OTA5ODUiLCJ1c2VyIjp7ImVtYWlsIjoia2FyYW5AdGhlZmFiY29kZS5vcmciLCJzaG9waWZ5SWQiOiI2MjMzNjE5MTAzODQ5IiwiX2lkIjoiNjQzY2YwYjQwMDg3MGYxZjI0NzkwOTg1IiwiZmlyc3RfbmFtZSI6InRlc3RlciIsImxhc3RfbmFtZSI6InRlc3RlciJ9LCJpYXQiOjE2ODE3MzIxNTd9.wFzXMBbN3mSy8nDIlczfkp6m_r1nshHGLCFuLz81Bkc',
        },
        body: JSON.stringify({msg: valToGen}),
      });

      const json = await res.json();
      setaiText(json.message);
      setAiTestLoader(false);
    } catch (error) {
      setAiTestLoader(false);
      console.error(error, 'error at Ai generated message ');
    }
  }
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const location = useLocation();
  useEffect(() => {
    mainMessageBox = ref1.current;
    signOffTextBox = ref3.current;
    messageBocContainer = ref2.current;
    signOffBocContainer = ref.current;
    loadTempDataFilter = ref5.current?.value;
    customerid = localStorage.getItem('customerId');
    savedMsg = JSON.parse(localStorage.getItem('reqFielddInCart'));
    setShippingDate(
      savedMsg
        ? savedMsg.optionalShipDate
        : editShippingDate
        ? editShippingDate
        : '',
    );
    setName(savedMsg ? savedMsg.msg : EditMess ? EditMess : '');
    setName2(savedMsg ? savedMsg.signOffText : editEndMess ? editEndMess : '');
    customFontFamily(customerid);
    setFontSize(
      savedMsg ? savedMsg.fontSize : editFontSize ? editFontSize : '',
    );
    setLineHeight(
      savedMsg ? savedMsg.lineHeight : editLineHeight ? editLineHeight : '',
    );
    setSignOffFontSize(
      savedMsg
        ? savedMsg.signOffFontSize
        : editSignOffFontSize
        ? editSignOffFontSize
        : '',
    );
    setSignOffLineHeight(
      savedMsg
        ? savedMsg.signOffLineHeight
        : editSignOffLineHeight
        ? editSignOffLineHeight
        : '',
    );
    setTempVal(ref4.current?.value);
  }, []);
  async function firstNameBtn(data) {
    if (remainingWord > data.length) {
      setCheckCharCount(false);
      setName((prevString) => prevString + data);
    } else {
      setCheckCharCount(true);
    }
  }
  useEffect(() => {
    // Define the API URL
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid}`;
    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAddresses(data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [addressForm, loadAddress, isAddressUploadSuccess]);
  useEffect(() => {
    if (addresses) setFilteredAddresses(addresses);
  }, [addresses]);

  async function addNewTemplateFunc() {
    try {
      const formData = new FormData();
      formData.append('templateName', ref4.current?.value);
      formData.append('customMessage', name);
      if (!customerid) {
        setLoginModal(true);
      } else if (name.length === 0 || ref4.current?.value.length === 0) {
        setErrorTemplate(true);
      } else {
        setLoaderMessage('Adding New Templates');
        setShowLoader(true);

        const res = await fetch(
          `https://api.simplynoted.com/api/storefront/messageTemplates?customerId=${customerid}`,
          {
            method: 'POST',
            body: formData,
          },
        );
        const json = await res.json();
        if (json) {
          setTimeout(() => {
            setAddNewTem(false);

            setLoaderMessage(null);
            setShowLoader(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error, 'add new Template');
    }
  }
  function AddNewTemplate() {
    return (
      <>
        <div className="w-[100%]">
          <div>
            <h1 className="text-[18px] sm:text-[24px] md:text-[34px] text-[#001a5f] font-bold text-center font-karla">
              NEW TEMPLATE
            </h1>
          </div>
          <div>
            <input
              type="text"
              ref={ref4}
              value={tempVal}
              className="border border-gray-300 p-2 mt-[12px] rounded-md w-full"
            />
          </div>
          {errorTemplate && (
            <span className="text-red-500 font-karla">
              Please check that the value is not empty
            </span>
          )}
          <div className="mt-2">
            {showLoader && <CircularLoader title={loaderMessage} />}
          </div>
          <div className="flex justify-center sm:gap-[17px] gap-3 mt-[18px]  items-center sm:flex-row flex-col">
            <DynamicButton
              className="bg-[#1b5299] w-full h-[40px] text-base"
              onClickFunction={() => addNewTemplateFunc()}
              text="Save template"
            />
            <DynamicButton
              className="bg-[#ef6e6e] w-full h-[40px]"
              text="Cancel"
              onClickFunction={() =>
                setAddNewTem(false) && setErrorTemplate(false)
              }
            />
          </div>
        </div>
      </>
    );
  }
  async function SavedTemp() {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/messageTemplates?customerId=${customerid}`,
      );
      const json = await res.json();
      setloadTempData(json.result);

      // setLoadTemModal(true)
    } catch (error) {
      console.error(error, 'savedTemp');
    }
  }
  const filteredList = (loadTempData, searchData) => {
    return loadTempData.filter((dataobj) => bySearch(dataobj, searchData));
  };

  const bySearch = (dataobj, searchData) => {
    if (searchData) {
      return Object.values(dataobj).some((field) =>
        field.toString().toLowerCase().includes(searchData.toLowerCase()),
      );
    } else return dataobj;
  };

  function LoadTemplate() {
    const [searchData, setsearchData] = useState(null);

    return (
      <>
        <div className="w-[100%]">
          <div>
            <h1 className="text-[18px] sm:text-[24px] md:text-[34px] text-[#001a5f] font-bold font-karla text-center">
              SELECT TEMPLATE
            </h1>
          </div>
          <div className="mt-[30px]">
            <input
              type="text"
              className="w-full rounded p-3 text-[15px] mt-4 bg-[#e8e8ea3d] font-karla"
              placeholder="Search Template..."
              ref={ref5}
              onChange={(e) => setsearchData(e.target.value)}
            />
          </div>
          <div className="flex mt-[12px] justify-between">
            <span className="font-bold text-[15px]">Template Name</span>
            <span className="font-bold text-[15px]">Actions</span>
          </div>
          {loadTempData &&
            filteredList(loadTempData, searchData).map((item, index) => (
              <div className="" key={index}>
                {showLoader ? (
                  <CircularLoader title={loaderMessage} color="#ef6e6e" />
                ) : (
                  <div className="border border-black-600 mt-[12px] lg:h-[50px] h-[40px] mb-[12px] px-[10px] items-center w-full flex">
                    <div className="w-full font-font-semibold  text-[14px]">
                      {item.templateName}
                    </div>
                    <div className="w-full flex items-center gap-[11px] justify-end">
                      <img
                        src={TickImg}
                        className="2xl:w-[7%] w-[7%] h-[5%] cursor-pointer"
                        onClick={() => setLoadedTemVal(item.customMessage)}
                      />
                      <img
                        src={Del}
                        className="2xl:w-[7%] w-[7%] h-[5%] cursor-pointer"
                        onClick={() => onConfirmDeleteTemplate(item._id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          <div></div>
        </div>
      </>
    );
  }
  function setLoadedTemVal(val) {
    setShowLoader(true);
    setLoaderMessage('Loading Saved Template');
    setTimeout(() => {
      setShowLoader(false);
      setLoadTemModal(false);

      setLoaderMessage(null);
    }, 2000);
    setName(val);
  }

  async function deleteTemp(val) {
    setShowLoader(true);
    setLoadTemModal(true);

    setLoaderMessage('Deleting Template');
    setDelTemplateState(false);
    try {
      const formData = new FormData();
      formData.append('templateId', val);
      const res = await fetch(
        `https://api.simplynoted.com/api/storefront/messageTemplates/delete?customerId=${customerid}`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const json = await res.json();

      setTimeout(() => {
        setOnDelTemp(!onDelTemp);
        setShowLoader(false);
        setLoadTemModal(false);

        setLoaderMessage(null);
      }, 2000);
    } catch (error) {
      console.error(error, 'delete Template');
    }
  }
  function onConfirmDeleteTemplate(val) {
    setDelTempValue(val);
    setDelTemplateState(true);
    setLoadTemModal(false);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setLoginModal(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    SavedTemp();
  }, [onDelTemp]);

  function OpenAddTemplateBox() {
    if (!customerid) {
      setLoginModal(true);
    } else {
      setAddNewTem(true);
    }
  }
  function OpenLoadTemp() {
    if (!customerid) {
      setLoginModal(true);
    } else {
      SavedTemp() && setLoadTemModal(true);
    }
  }
  function OpenAddressBookModal() {
    if (!customerid) {
      setLoginModal(true);
    } else {
      setModalForAddressBook(true);
    }
  }
  function setFont(e) {
    setCustomFontVal('Select Custom Font');
    setFontFamily(e);
    // setFontLoad(true)
    setStandardFontVal(e);
  }
  async function customFontFamily(id) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/fonts/getMyFonts/${id}`,
      );
      const json = await res.json();

      setCustomFonts(json.data);
    } catch (error) {
      console.error(error, 'customfontError');
    }
  }
  function getCustomFont(val) {
    setFontFamily(val);
    setCustomFontVal(val);
    setStandardFontVal('Select Standard Font');
    setCustomFontName(val);
  }
  function onConfirmClick() {
    const anchor = document.createElement('a');
    anchor.href = 'https://api.simplynoted.com/docs/new-birthday-template';
    anchor.download = 'new-birthday-template';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setConfirmModal(false);
  }
  function cancelCompDelTem() {
    setDelTemplateState(false);
    setLoadTemModal(true);
  }
  return (
    <>
      <div className="mainDivForBox relative flex md:flex-row flex-col xl:gap-[40px] md:gap-[20px] w-full gap-5  md:justify-between">
        {/* {showLoader && loaderMessage !== 'Adding New Templates' && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-80 flex justify-center items-center z-10">
            <CircularLoader
              textColor="text-white"
              title={loaderMessage}
              color="#ef6e6e"
            />
          </div>
        )} */}
        <div
          className={`relative  w-auto xl:w-[618px] md:h-[1068px] ${
            show
              ? 'lg:h-[1110px] texting-relative-cont-bulk'
              : 'lg:h-[714px] texting-relative-cont-single'
          }`}
        >
          <div
            className={`md:mx-0 mx-auto bg-[#FAFAFA] p-[20px] md:w-[618px] md:absolute -top-[94px] w-full ${
              show
                ? 'md:pb-[35rem] textarea-cont-bulk'
                : 'md:pb-[15rem] textarea-cont-single'
            }`}
          >
            <div className="flex flex-col items-start xl:flex-row xl:items-center gap-[16px] text-center mb-2">
              <div className="h-[73px] xl:max-w-[187px] flex flex-col justify-between font-inter whitespace-nowrap font-semibold 2xl:text-[14px] text-[11px] flex-1 w-full text-left">
                <span className=""> Standard Handwriting Style</span>
                <select
                  id="font"
                  className="h-[40px] highlight-none cursor-pointer font-bold text-[14px] rounded border-0 border-black w-full font-inter text-sm text-[#737373]"
                  value={standardFontVal}
                  onChange={(e) => setFont(e.target.value)}
                  placeholder="aaaa"
                >
                  <option
                    value={standardFontVal}
                    disabled
                    style={{fontSize: '16px'}}
                  >
                    {standardFontVal
                      ? standardFontVal
                      : editFontFamily && !editCustomFontFamily
                      ? editFontFamily
                      : 'Tarzan'}
                  </option>
                  {editFontFamily && editFontFamily !== 'tarzan' && (
                    <option value="Tarzan" className={`font-tarzan`}>
                      Tarzan
                    </option>
                  )}
                  <option
                    value="Stitch"
                    style={{fontSize: '33px'}}
                    className={`font-stitch`}
                  >
                    Stitch
                  </option>
                  <option
                    value="Tarzan"
                    style={{fontSize: '33px'}}
                    className={`font-tarzan`}
                  >
                    Tarzan
                  </option>
                  <option
                    value="Simba"
                    style={{fontSize: '33px'}}
                    className={`font-simba`}
                  >
                    Simba
                  </option>
                  <option
                    value="Roo"
                    style={{fontSize: '20px'}}
                    className={`font-roo`}
                  >
                    Roo
                  </option>
                  <option
                    value="pinocchio"
                    style={{fontSize: '16px'}}
                    className={`font-pinocchio`}
                  >
                    Pinocchio
                  </option>
                  <option
                    value="Nimo"
                    style={{fontSize: '20px'}}
                    className={`font-nimo`}
                  >
                    Nimo
                  </option>
                  <option
                    value="Lumiere"
                    style={{fontSize: '33px'}}
                    className={`font-lumiere`}
                  >
                    Lumiere
                  </option>
                  <option
                    value="dumbo"
                    style={{fontSize: '33px'}}
                    className={`font-dumbo`}
                  >
                    Dumbo
                  </option>
                  <option
                    value="Donald"
                    style={{fontSize: '20px'}}
                    className={`font-donald`}
                  >
                    Donald
                  </option>
                  <option
                    value="Aladdin"
                    style={{fontSize: '29px'}}
                    className={`font-aladdin`}
                  >
                    Aladdin
                  </option>
                  <option
                    value="Belle"
                    style={{fontSize: '39px'}}
                    className={`font-belle`}
                  >
                    Belle
                  </option>
                  <option
                    value="Boo"
                    style={{fontSize: '38px'}}
                    className={`font-boo`}
                  >
                    Boo
                  </option>
                  <option
                    value="Cinderella"
                    style={{fontSize: '33px'}}
                    className={`font-cinderella`}
                  >
                    Cinderella
                  </option>
                  <option
                    value="kaa"
                    style={{fontSize: '33px'}}
                    className={`font-kaa`}
                  >
                    Kaa
                  </option>
                  <option
                    value="Copper"
                    style={{fontSize: '33px'}}
                    className={`font-copper`}
                  >
                    Copper
                  </option>
                  <option
                    value="Jasmine"
                    style={{fontSize: '33px'}}
                    className={`font-jasmine`}
                  >
                    Jasmine
                  </option>
                  <option
                    value="Merlin"
                    style={{fontSize: '33px'}}
                    className={`font-merlin`}
                  >
                    Merlin
                  </option>
                  <option
                    value="Goofy"
                    style={{fontSize: '33px'}}
                    className={`font-goofy`}
                  >
                    Goofy
                  </option>
                  <option
                    value="Hercules"
                    style={{fontSize: '38px'}}
                    className={`font-hercules`}
                  >
                    Hercules
                  </option>
                  <option
                    value="Rafiki"
                    style={{fontSize: '33px'}}
                    className={`font-rafiki`}
                  >
                    Rafiki
                  </option>
                  <option
                    value="Rapunzel"
                    style={{fontSize: '33px'}}
                    className={`font-rapunzel`}
                  >
                    Rapunzel
                  </option>
                  <option
                    value="Ratigan"
                    style={{fontSize: '33px'}}
                    className={`font-ratigan`}
                  >
                    Ratigan
                  </option>
                  <option
                    value="Sarabi"
                    style={{fontSize: '33px'}}
                    className={`font-sarabi`}
                  >
                    Sarabi
                  </option>
                  <option
                    value="Scar"
                    style={{fontSize: '33px'}}
                    className={`font-scar`}
                  >
                    Scar
                  </option>
                  <option
                    value="Triton"
                    style={{fontSize: '33px'}}
                    className={`font-triton`}
                  >
                    Triton
                  </option>
                  <option
                    value="Woody"
                    style={{fontSize: '33px'}}
                    className={`font-woody`}
                  >
                    Woody
                  </option>
                </select>
              </div>
              <div className="h-[73px] xl:max-w-[178px] flex flex-col 2xl:text-[14px] text-[11px] whitespace-nowrap  justify-between font-inter font-semibold text-left flex-1 w-full self-end">
                <span>Custom Handwriting Style</span>
                <select
                  id="Coustomfont"
                  className="h-[40px] highlight-none cursor-pointer font-bold text-[14px] rounded border-0 border-black w-full font-inter text-sm text-[#737373]"
                  value={customFontVal}
                  onChange={(e) => getCustomFont(e.target.value)}
                >
                  <option value={customFontVal} disabled>
                    {customFontVal
                      ? customFontVal
                      : editCustomFontFamily
                      ? editCustomFontFamily
                      : 'Select Custom Font'}
                  </option>
                  {customFonts &&
                    customFonts.map((item, index) => (
                      <option key={index} value={item.fontName}>
                        {item.fontName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="h-[73px] xl:max-w-[181px] flex flex-col justify-between font-inter whitespace-nowrap  font-semibold 2xl:text-[14px] text-[11px]  flex-1 w-full text-left self-end">
                <span>Optional shipping date</span>
                <div className="flex relative">
                  <input
                    type="date"
                    className="h-[40px] highlight-none font-bold text-[14px] cursor-pointer w-full outline-none border-none rounded-tl rounded-bl font-inter text-sm text-[#737373]"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setShippingDate(e.target.value);
                      if (e.target.value) {
                        e.target.blur();
                      }
                    }}
                    value={shippingDate}
                  />
                  <span className="calendar-icon">
                    <img src={calender_icon} alt="Calendar" />
                  </span>
                </div>
              </div>
            </div>
            {!customFonts && (
              <div className="mb-[24px]  font-inter text-xs">
                <span className="text-[#001A5F] font-medium">
                  Contact Us &nbsp;
                </span>
                <a
                  href="https://meetings.hubspot.com/rick24"
                  target="_self"
                  className="text-[#737373]"
                >
                  to find out how to add your own custom handwriting fonts.
                </a>
              </div>
            )}
            <textarea
              type="text"
              id="example-one-input"
              value={name}
              placeholder="Enter your custom message text here..."
              className="border-dashed resize-none h-[301px] rounded p-[7px] text-black font-normal "
              maxLength="450"
              onChange={(e) => onChnageNameVal(e.target.value)}
              data-gtm-form-interact-field-id="0"
            ></textarea>
            <span className="text-[#737373] flex font-inter text-xs">
              {remainingWord} characters remaining
            </span>
            {/* {customerid && ( */}
            <div className="flex w-full items-center h-[30px] mt-[24px] mb-[24px] font-inter gap-[4px]">
              <img
                src={AiImage}
                className="h-[35px] cursor-pointer  mt-3 mb-3 lg:mb-5"
                onClick={() => setIsOpen(true)}
              />
              <span
                className="cursor-pointer font-bold text-[#836FE5] text-[13px] lg:mb-[7px] underline"
                onClick={() => setIsOpen(true)}
              >
                <span className="text-[red]">Try our</span> New AI Message
                Assistant
              </span>
            </div>

            {checkCharCount && (
              <span className="text-[red] font-bold">
                You don't have enough character remaining
              </span>
            )}

            {show && (
              <div className="mb-[24px] flex flex-wrap">
                <button
                  className="addFirstnameBtn flex items-center h-[28px]"
                  value={'[First Name]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  First Name
                </button>
                <button
                  className="addFirstnameBtn flex items-center h-[28px]"
                  value={'[Last Name]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Last Name
                </button>
                <button
                  className="addFirstnameBtn flex items-center h-[28px]"
                  value={'[Company]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Company
                </button>
                <button
                  className="addFirstnameBtn flex items-center h-[28px]"
                  value={'[Custom 1]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Custom 1
                </button>
                <button
                  className="addFirstnameBtn flex items-center h-[28px]"
                  value={'[Custom 2]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Custom 2
                </button>
                <button
                  className="addFirstnameBtn flex items-center h-[28px]"
                  value={'[Custom 3]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Custom 3
                </button>
              </div>
            )}
            <div className="flex w-full justify-between xl:flex-row flex-col ">
              <div className="flex flex-col justify-between gap-[24px]">
                <div className="flex justify-between font-bold text-[#1b5299] text-[12px] md:text-[14px] gap-[20px] items-start xl:mr-3 mb-2">
                  <button
                    className="templateButton cursor-pointer border whitespace-nowrap border-[#1b5299] rounded-[5px] p-2 h-[44px]"
                    onClick={() => OpenAddTemplateBox()}
                  >
                    Save New Template
                  </button>
                  <button
                    className="templateButton cursor-pointer whitespace-nowrap border border-[#1b5299] rounded-[5px] p-2 h-[44px]"
                    onClick={() => OpenLoadTemp()}
                  >
                    Load Save Template
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="h-[26px] font-roboto font-bold text-base">
                    Refer & Earn: Click to Join!
                  </div>
                  <div className="h-[26px] font-roboto font-bold text-base">
                    Upgrade To Unlimited $0.97 Notes
                  </div>
                  <div className="h-[26px] font-roboto font-bold text-base">
                    Need Help? Contact Support Here
                  </div>
                </div>
              </div>
              <div className="xl:w-[40%] w-full xl:mt-0 mt-[10px]">
                <textarea
                  type="text"
                  value={name2}
                  v-model="keyword"
                  id="example-one-input2"
                  className="inputText2 resize-none lg:h-[100px] h-[130px] !w-full rounded p-[7px] border-2 border-dotted border-[#1b5299]"
                  maxLength="50"
                  onChange={(e) => onchnageOfRegardBox(e.target.value)}
                  data-gtm-form-interact-field-id="0"
                ></textarea>
                <br />
                <div className="flex ">
                  <div>
                    <span className="font-karla text-[#1b5299] text-[14px] font-bold">
                      Optional Sign Off / Signature
                    </span>
                    <br />
                    <span className="text-[#1E1E1E] font-inter font-bold text-sm">
                      {remainSign} characters remaining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mt-[11px] flex flex-col w-full md:w-[48%] sm:max-w-[702px] md:min-w-0  relative  ${
            show ? 'h-[940px]' : 'h-[370px] '
          } mb-[200px] md:mb-[0px]`}
        >
          <div
            id="outer"
            className="outerr shadow-lg h-[301px] bg-white absolute pt-[13px] pb-[16px] top-0 right-0 left-0 bottom-0 md:mx-0 overflow-hidden"
          >
            {metafields &&
              metafields.isHeaderIncluded &&
              metafields.header.data && <ShowHeaderComp />}
            <div
              id="outer"
              className="outerr shadow-lg h-[301px] bg-white absolute pt-[13px] pb-[16px] top-0 right-0 left-0 bottom-0 md:mx-0 overflow-hidden"
            >
              {metafields && metafields.isHeaderIncluded && <ShowHeaderComp />}
              <div
                className={`outerSec w-[100%] bg-white mt-1 overflow-hidden`}
                ref={ref2}
                style={{
                  height:
                    (metafields.footer &&
                      metafields.header &&
                      metafields.footer.data &&
                      metafields.header.data &&
                      name2.length > 0) ||
                    (metafields.footer &&
                      metafields.header &&
                      metafields.header.data &&
                      qrValue &&
                      name2.length > 0)
                      ? '121px'
                      : (metafields.footer &&
                          metafields.header &&
                          metafields.footer.data &&
                          metafields.header.data) ||
                        (metafields.footer &&
                          metafields.header &&
                          metafields.footer.data &&
                          name2.length > 0) ||
                        (metafields.footer &&
                          metafields.header &&
                          metafields.header.data &&
                          qrValue) ||
                        (qrValue && name2.length > 0) ||
                        (metafields.footer &&
                          metafields.header &&
                          metafields.header.data &&
                          name2.length > 0)
                      ? '169px'
                      : (metafields.footer &&
                          metafields.header &&
                          metafields.footer.data) ||
                        (metafields.footer &&
                          metafields.header &&
                          metafields.header.data) ||
                        qrValue ||
                        name2.length > 0
                      ? '221px'
                      : '280px',
                }}
              >
                <div
                  id="messageBoxID"
                  ref={ref1}
                  className="output pt-[3px] pl-[20px] pr-[20px] text-[#0040ac]"
                  style={{
                    fontFamily: fontFamilyName
                      ? fontFamilyName
                      : editFontFamily
                      ? editFontFamily
                      : 'great vibes',
                    fontSize: fontSize ? fontSize : '34px',
                    lineHeight: lineHeight ? lineHeight : '50px',
                  }}
                >
                  {name ? name : 'Enter your custom message here...'}
                </div>
              </div>
              {/* {name2.length>0 && */}
              <div
                className={`secDiv h-[48px] w-[100%] max-w-[300px] ml-auto mr-5 bg-white `}
                ref={ref}
                style={{display: name2.length > 0 ? 'block' : 'none'}}
              >
                <div
                  id="signOffText"
                  ref={ref3}
                  className="output2 text-[#0040ac] max-w-[300px]"
                  style={{
                    fontFamily: fontFamilyName
                      ? fontFamilyName
                      : editFontFamily
                      ? editFontFamily
                      : 'great vibes',
                    fontSize: signOffFontSize ? signOffFontSize : '50px',
                    lineHeight: signOffLineHeight ? signOffLineHeight : '50px',
                  }}
                >
                  {name2}
                </div>
              </div>
              {/* } */}
              {metafields && metafields.isFooterIncluded && <ShowFooterComp />}
            </div>
            {/* } */}
            {/* {metafields &&
              metafields.isFooterIncluded &&
              metafields.footer.data && <ShowFooterComp />} */}
          </div>
          {/* // This margin is similar to the height of the absolute div above this */}
          <div className="text-[#737373] text-sm mt-[306px] mb-[44px]">
            Preview doesn't do the quality justice, See the real writing magic
            there.
          </div>
          {show && (
            <div>
              {/* <div className="lg:w-[50%] w-[100%] flex justify-start font-bold md:mt-[10px] mt-[25px]">
                <text>
                  As of july5,2023, we have upgraded the bulk order
                  template.Please download the new template below
                </text>
              </div> */}
              <div className="flex flex-col w-full flex-wrap gap-[10px] text-black items-center">
                {bulkFileCount && bulkFileCount > 0 ? (
                  <div
                    className={`custom_testing  pointer-events-none opacity-40 w-full min-h-[200px] p-4 border border-dashed border-[#525252] rounded-[6px] p-[7px] pt-[24px] pb-[24px] text-black font-normal flex justify-center border-[${dragAndDropBorderColor}]`}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const file = event.dataTransfer.files[0];
                      if (file && file.type === 'text/csv') {
                        handleFileChange({target: {files: [file]}});
                      }
                    }}
                    onDragEnter={() => {
                      setDragAndDropBorderColor('#ef6e6e');
                    }}
                    onDragLeave={() => {
                      setDragAndDropBorderColor('');
                    }}
                  >
                    <div className="sm:w-full md:w-[50%] flex flex-col gap-3 justify-center items-center">
                      {/* {loader ? (
                        <CircularLoader color="#ef6e6e" />
                      ) : ( */}
                      <>
                        <div className="rounded-full p-3 bg-[#E6E6E6] w-[60px] text-[40px]">
                          <FiUploadCloud />
                        </div>
                        <div
                          className="flex items-center gap-[10px]"
                          onClick={() => setVideoBtn(true)}
                        >
                          <svg
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.75 16.2002C19.75 16.3991 19.671 16.5899 19.5303 16.7305C19.3897 16.8712 19.1989 16.9502 19 16.9502H1C0.801088 16.9502 0.610322 16.8712 0.46967 16.7305C0.329018 16.5899 0.25 16.3991 0.25 16.2002C0.25 16.0013 0.329018 15.8105 0.46967 15.6699C0.610322 15.5292 0.801088 15.4502 1 15.4502H19C19.1989 15.4502 19.3897 15.5292 19.5303 15.6699C19.671 15.8105 19.75 16.0013 19.75 16.2002ZM19.75 1.9502V12.4502C19.75 12.848 19.592 13.2296 19.3107 13.5109C19.0294 13.7922 18.6478 13.9502 18.25 13.9502H1.75C1.35218 13.9502 0.970644 13.7922 0.68934 13.5109C0.408035 13.2296 0.25 12.848 0.25 12.4502V1.9502C0.25 1.55237 0.408035 1.17084 0.68934 0.889535C0.970644 0.608231 1.35218 0.450195 1.75 0.450195H18.25C18.6478 0.450195 19.0294 0.608231 19.3107 0.889535C19.592 1.17084 19.75 1.55237 19.75 1.9502ZM13.375 7.2002C13.375 7.07397 13.3431 6.94979 13.2823 6.83918C13.2215 6.72856 13.1337 6.63507 13.0272 6.56738L8.90219 3.94238C8.78881 3.87035 8.65816 3.83009 8.5239 3.82581C8.38964 3.82153 8.25669 3.85338 8.13895 3.91805C8.02121 3.98272 7.923 4.07782 7.85458 4.19342C7.78616 4.30901 7.75004 4.44087 7.75 4.5752V9.8252C7.75004 9.95952 7.78616 10.0914 7.85458 10.207C7.923 10.3226 8.02121 10.4177 8.13895 10.4823C8.25669 10.547 8.38964 10.5789 8.5239 10.5746C8.65816 10.5703 8.78881 10.53 8.90219 10.458L13.0272 7.83301C13.1337 7.76532 13.2215 7.67183 13.2823 7.56122C13.3431 7.4506 13.375 7.32642 13.375 7.2002Z"
                              fill="#1B5299"
                            />
                          </svg>
                          <span className="underline text-[16px] text-[#1B5299] font-bold cursor-pointer">
                            Bulk Upload Tutorial Video
                          </span>
                        </div>
                        {bulkUploadDiv && !showNextBtn ? (
                          <div className="mt-3">
                            <label className="cursor-pointer text-[18px] font-semibold">
                              Click to upload or drag and drop
                              <input
                                type="file"
                                name="file"
                                accept=".csv"
                                className="upload-input hidden"
                                onChange={(e) => handleFileChange(e)}
                              />
                            </label>
                          </div>
                        ) : (
                          ''
                        )}
                        <>
                          <a
                            href="https://api.simplynoted.com/docs/bulk-template"
                            className="underline  text-[14px] font-normal text-[#1B5299]"
                          >
                            Download the Bulk Order Template
                          </a>
                        </>
                        <p
                          onClick={openModal}
                          className="underline underline-offset-1 cursor-pointer text-[14px] text-[#1B5299] font-normal hover:text-blue-600"
                        >
                          View bulk upload instructions
                        </p>
                        {/* <div className='text-[14px] text-[#1b5299] font-bold'>Watch Tutorial <span className='border-b-[1px] border-[#1b5299]'>Video</span></div> */}
                        <div className="bg-[#E5E5E5] p-4 flex items-center mt-3 text-[14px] text-[#737373] font-bold rounded gap-[3px]">
                          <input
                            type="checkbox"
                            className=" border-[1px] border-[#E5E5E5] outline-none border-none"
                            checked={stateCheckCart}
                            onChange={() => setStateCheckCart(!stateCheckCart)}
                          />
                          &nbsp;
                          <label htmlFor="">
                            Add all addresses to address book
                          </label>
                        </div>
                        <AfterUpload />
                      </>
                      {/* // )} */}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full min-h-[200px] p-4 border border-dashed border-[#525252] rounded-[6px] p-[7px] pt-[24px] pb-[24px] text-black font-normal flex justify-center border-[${dragAndDropBorderColor}]`}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const file = event.dataTransfer.files[0];
                      if (file && file.type === 'text/csv') {
                        handleFileChange({target: {files: [file]}});
                      }
                    }}
                    onDragEnter={() => {
                      setDragAndDropBorderColor('#ef6e6e');
                    }}
                    onDragLeave={() => {
                      setDragAndDropBorderColor('');
                    }}
                  >
                    <div className="sm:w-full md:w-[100%] flex flex-col gap-3 justify-center items-center">
                      {loader ? (
                        <CircularLoader color="#ef6e6e" />
                      ) : (
                        <>
                          <div className="rounded-full p-3 bg-[#E6E6E6] w-[60px] text-[40px]">
                            <FiUploadCloud />
                          </div>
                          <div
                            className="flex items-center gap-[10px]"
                            onClick={() => setVideoBtn(true)}
                          >
                            <svg
                              width="20"
                              height="17"
                              viewBox="0 0 20 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.75 16.2002C19.75 16.3991 19.671 16.5899 19.5303 16.7305C19.3897 16.8712 19.1989 16.9502 19 16.9502H1C0.801088 16.9502 0.610322 16.8712 0.46967 16.7305C0.329018 16.5899 0.25 16.3991 0.25 16.2002C0.25 16.0013 0.329018 15.8105 0.46967 15.6699C0.610322 15.5292 0.801088 15.4502 1 15.4502H19C19.1989 15.4502 19.3897 15.5292 19.5303 15.6699C19.671 15.8105 19.75 16.0013 19.75 16.2002ZM19.75 1.9502V12.4502C19.75 12.848 19.592 13.2296 19.3107 13.5109C19.0294 13.7922 18.6478 13.9502 18.25 13.9502H1.75C1.35218 13.9502 0.970644 13.7922 0.68934 13.5109C0.408035 13.2296 0.25 12.848 0.25 12.4502V1.9502C0.25 1.55237 0.408035 1.17084 0.68934 0.889535C0.970644 0.608231 1.35218 0.450195 1.75 0.450195H18.25C18.6478 0.450195 19.0294 0.608231 19.3107 0.889535C19.592 1.17084 19.75 1.55237 19.75 1.9502ZM13.375 7.2002C13.375 7.07397 13.3431 6.94979 13.2823 6.83918C13.2215 6.72856 13.1337 6.63507 13.0272 6.56738L8.90219 3.94238C8.78881 3.87035 8.65816 3.83009 8.5239 3.82581C8.38964 3.82153 8.25669 3.85338 8.13895 3.91805C8.02121 3.98272 7.923 4.07782 7.85458 4.19342C7.78616 4.30901 7.75004 4.44087 7.75 4.5752V9.8252C7.75004 9.95952 7.78616 10.0914 7.85458 10.207C7.923 10.3226 8.02121 10.4177 8.13895 10.4823C8.25669 10.547 8.38964 10.5789 8.5239 10.5746C8.65816 10.5703 8.78881 10.53 8.90219 10.458L13.0272 7.83301C13.1337 7.76532 13.2215 7.67183 13.2823 7.56122C13.3431 7.4506 13.375 7.32642 13.375 7.2002Z"
                                fill="#1B5299"
                              />
                            </svg>
                            <span className="underline text-[16px] text-[#1B5299] font-bold cursor-pointer">
                              Bulk Upload Tutorial Video
                            </span>
                          </div>
                          {bulkUploadDiv && !showNextBtn ? (
                            <>
                              <div className="mt-3">
                                <label className="cursor-pointer text-[18px] font-semibold">
                                  Click to upload or drag and drop
                                  <input
                                    type="file"
                                    name="file"
                                    accept=".csv"
                                    className="upload-input hidden"
                                    onChange={(e) => handleFileChange(e)}
                                  />
                                </label>
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                          <>
                            <a
                              href="https://api.simplynoted.com/docs/bulk-template"
                              className="underline  text-[14px] font-normal text-[#1B5299]"
                            >
                              Download the Bulk Order Template
                            </a>
                          </>
                          <p
                            onClick={openModal}
                            className="underline underline-offset-1 cursor-pointer text-[14px] text-[#1B5299] font-normal hover:text-blue-600"
                          >
                            View bulk upload instructions
                          </p>
                          {/* <div className='text-[14px] text-[#1b5299] font-bold'>Watch Tutorial <span className='border-b-[1px] border-[#1b5299]'>Video</span></div> */}
                          <div className="bg-[#E5E5E5] p-4 flex items-center mt-3 text-[14px] text-[#737373] font-bold rounded gap-[3px]">
                            <input
                              type="checkbox"
                              className=" border-[1px] border-[#E5E5E5] outline-none border-none"
                              checked={stateCheckCart}
                              onChange={() =>
                                setStateCheckCart(!stateCheckCart)
                              }
                            />
                            &nbsp;
                            <label htmlFor="">
                              Add all addresses to address book
                            </label>
                          </div>
                          <AfterUpload />
                        </>
                      )}
                    </div>
                  </div>
                )}
                <span className="flex items-center font-bold text-[#737373] text-[18px]">
                  Or
                </span>
                <div className="m-auto w-full grid font-bold">
                  <DynamicButton
                    disabled={disableSelectAddressBtn}
                    className={`bg-[#1b5299] px-[10px] py-[16px] md:mb-6 mb-[16px] w-full text-base font-roboto font-semibold h-[44px] ${
                      disableSelectAddressBtn && 'opacity-40'
                    }`}
                    text="Select From Address Book"
                    onClickFunction={() => OpenAddressBookModal()}
                  />
                  <DynamicButton
                    className="bg-[#FF0000] px-[10px] py-[16px] md:mb-6 mb-[16px] w-full text-base font-roboto font-semibold h-[44px]"
                    text="Buy Leads (Mailing List)"
                    onClickFunction={() => {}}
                  />
                  {bulkFileCount && bulkFileCount > 0 ? (
                    <DynamicButton
                      className="bg-[#001a5f] px-[10px] py-[16px] w-full text-base font-roboto font-semibold h-[44px]"
                      text="Next"
                      onClickFunction={() => onSelectFromAddressBook()}
                    />
                  ) : (
                    <DynamicButton
                      className="bg-[#697ba6] px-[10px] py-[16px] w-full text-base font-roboto font-semibold h-[44px]"
                      text="Next"
                      onClickFunction={() => ''}
                    />
                  )}
                  {bulkFileCount && bulkFileCount > 0 ? (
                    <span className="text-[#737373] font-inter text-sm font-medium mt-[12px] text-center">
                      {' '}
                      Number of addresses selected: {bulkFileCount}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          )}
          <Instruction
            isOpen={videoBtn}
            body={<VideoTutorial />}
            close={true}
            closeModal={() => {
              setVideoBtn(false);
            }}
          />
          {!show && (
            <div className="bg-[#001a5f] h-[50px] text-center">
              <button
                className="text-[#fff] items-center h-[50px] font-normal text-base justify-center w-full font-roboto h-[44px]"
                onClick={() => checkUserLogged()}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {modalIsOpen && (
        <ModalComp
          children={
            <div className="w-[100%] h-[80">
              <div className="flex">
                <h2 className="font-bold text-[black] md:text-[28px] text-[19px] w-[600px]">
                  AI Message Assistant
                </h2>
              </div>
              <div className="mt-[12px]">
                <text className="text-[black] text-[15px]">
                  Type in words or a phrase to use our AI Assistant to help
                  generate a great message
                </text>
              </div>
              <div>
                {aiTextLoader ? (
                  <div className="h-[300px] flex justify-center items-center mt-[12px] border-dashed border border-[#999999]">
                    <CircularLoader color="#ef6e6e" />
                  </div>
                ) : (
                  <textarea
                    type="text"
                    id="aiTextArea"
                    value={aiText ? aiText : valToGen}
                    onChange={(e) => setValToGen(e.target.value)}
                    placeholder="Example: Message for Birthday"
                    maxLength="250"
                  ></textarea>
                )}
              </div>
              {!aiText ? (
                <div className="ai-generate">
                  <button
                    id="generate-msg"
                    disabled=""
                    onClick={() => aiGenrateMess()}
                    className="bg-[#ef6e6e] sm:w-[40%] w-[50%] h-[45px]  bg-red-500 text-white text-lg rounded-md mt-2 transition-all duration-500 ease-in-out"
                  >
                    Generate Message
                  </button>
                </div>
              ) : (
                <div className="buttonClass flex justify-start">
                  <div className="buttonDiv pr-5">
                    <button
                      className="bg-[#001a5f] text-[#fff] p-2 rounded"
                      onClick={() => onInsetClick()}
                    >
                      Insert
                    </button>
                  </div>
                  <div className="gap-2">
                    <button
                      className="bg-[#f0f0f0] text-[black] p-2 rounded "
                      onClick={() => onCancl()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
          cancelLink={onCancl}
        />
      )}
      <Instruction
        isOpen={instructionModal}
        title="Text Can not be Empty"
        closeModal={closeModalInt}
        button={true}
        image={true}
      />
      <Instruction
        isOpen={modalForAddressBook}
        title=""
        close={!addressForm && true}
        closeModal={closeSelectAddressModal}
        body={
          addressForm ? (
            <AddressForm customerID={customerid} />
          ) : (
            <ContactTable
              customerID={customerid}
              filteredAddresses={filteredAddresses}
              setSelectedCheckboxes={setSelectedCheckboxes}
              selectedCheckboxes={selectedCheckboxes}
              ProdcuctSide={ProdcuctSide}
              setAddressForm={setAddressForm}
              continueBtn={onClickOfContinue}
              setFilteredAddresses={setFilteredAddresses}
            />
          )
        }
      />
      <ConfirmationModal
        show={confirmModal && isbirthdayAutomated}
        title={'AUTOMATED BIRTHDAY CARDS'}
        onCancel={() =>
          setConfirmModal(false) && setISBirthdayAutomated(!isbirthdayAutomated)
        }
        onConfirm={() => onConfirmClick()}
        message="Download the recipient template and populate each person birthdate. Their custom card will be sent to them in time to receive it for their birthday!"
        confirmText="Download"
        cancelText="Exit"
      />
      <ConfirmationModal
        show={delTemplateState}
        message={'Are you sure you want to delete this template?'}
        onCancel={() => cancelCompDelTem()}
        onConfirm={() => deleteTemp(delTempValue)}
        confirmText={'Delete'}
        cancelText={'Cancel'}
      />
      <Instruction
        isOpen={isModalOpen}
        title="INSTRUCTIONS FOR BULK UPLOAD"
        closeModal={closeModal}
        close={true}
        instructions={[
          'Download the bulk upload template (csv)',
          'Complete a row for each address you wish to add',
          'Upload your completed file in .csv format',
        ]}
        table={true}
      />
      {addNewTem && (
        <ModalComp
          children={<AddNewTemplate />}
          cancelLink={() => setAddNewTem(false)}
        />
      )}
      {loadTemModal && (
        <ModalComp
          children={<LoadTemplate />}
          cancelLink={() => setLoadTemModal(false)}
        />
      )}
      <LoginModal
        title={' Add'}
        show={loginModal}
        setLoginModal={setLoginModal}
        onCancel={() => setLoginModal(false)}
        confirmText="Login"
        cancelText="Register"
      />
      <ErrorModal
        title="Uploaded Error!"
        isOpen={modalIsOpen2}
        // onRequestClose={() => setErrorModal(false)}
        content={errorVal}
      />
    </>
  );
}
