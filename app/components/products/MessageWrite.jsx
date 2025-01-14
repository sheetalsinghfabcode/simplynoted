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
import {Link} from '../Link';
import CustomDropdown from '../CustomDropDown';
import { SERVER_BASE_URL } from "../../data/config"

let mainMessageBox,
  signOffTextBox,
  messageBocContainer,
  messageBoxOuterRef,
  signOffBoxOuterRef,
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
  showBulkOnEdit,
}) {
  const INITIAL_INPUT_CSS = {
    initailFontSize: '60px',
    initalLineHeight: '60px',
  };
  const {
    setAddressForm,
    addressForm,
    loadAddress,
    addresses,
    setAddresses,
    setProductShow,
    // isbirthdayAutomated,
    // setIsBirthdayAutomated,
    setShowSignScreen,
    customerId,
    setCustomerId
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
  const [fontSize, setFontSize] = useState(
    editFontSize ? editFontSize : INITIAL_INPUT_CSS.initailFontSize,
  );
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
  const [errorMessage, setErrorMessage] = useState(false);
  const [onDelTemp, setOnDelTemp] = useState(false);
  const [lineHeight, setLineHeight] = useState(
    editLineHeight ? editLineHeight : INITIAL_INPUT_CSS.initalLineHeight,
  );
  const [signOffFontSize, setSignOffFontSize] = useState(
    editSignOffFontSize
      ? editSignOffFontSize
      : INITIAL_INPUT_CSS.initailFontSize,
  );
  const [signOffLineHeight, setSignOffLineHeight] = useState(
    editSignOffLineHeight
      ? editSignOffLineHeight
      : INITIAL_INPUT_CSS.initalLineHeight,
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
  const [minDateCheck, setMinDateCheck] = useState(false);
  const [errorCustomText, setErrorCustomText] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(
    editFontSize && editLineHeight && true,
  );

  const [customMessageBoxMaxHeight, setCustomMessageBoxMaxHeight] = useState();
  const [signOffBoxMaxHeight, setsignOffBoxMaxHeight] = useState();
  const importedCustomFonts = useRef([]);

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (ref6.current) {
      messageBoxOuterRef = ref6.current;
    }
  }, [ref6]);

  useEffect(() => {
    if (ref7.current) {
      signOffBoxOuterRef = ref7.current;
    }
  }, [ref7]);

  useEffect(() => {
    setCustomerId(localStorage.getItem('customerId'));
  }, []);

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
    if (!customerId) {
      // setLoginModal(true);
      setShowSignScreen(true);
    } else if (name.length == 0) {
      setInstructionModal(true);
    } else {
      let reqField;
      let subName = name;
      const baseCustomMessage = name;

      if (fileData.length) {
        fileData.map((obj) => {
          if (obj['First Name']) {
            subName = subName?.replace(/\[First Name\]/g, obj['First Name']);
          }
          if (obj['Last Name']) {
            subName = subName?.replace(/\[Last Name\]/g, obj['Last Name']);
          }
          if (obj['Company']) {
            subName = subName?.replace(/\[Company\]/g, obj['Company']);
          }
          if (obj['Custom 1']) {
            subName = subName?.replace(/\[Custom 1\]/g, obj['Custom 1']);
          }
          if (obj['Custom 2']) {
            subName = subName?.replace(/\[Custom 2\]/g, obj['Custom 2']);
          }
          if (obj['Custom 3']) {
            subName = subName?.replace(/\[Custom 3\]/g, obj['Custom 3']);
          }
          obj.msgData = subName;
        });
        reqField = {
          msg: subName,
          baseCustomMessage,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
          csvFileLen: lenCsvData ? lenCsvData : 1,
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
          baseCustomMessage,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
          csvFileLen: lenCsvData ? lenCsvData : 1,
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
    if (!customerId) {
      setLoginModal(true);
    } else if (name.length == 0) {
      setInstructionModal(true);
    } else {
      let subName = name;
      const baseCustomMessage = name;
      

      const csvFileResponse = await uploadCsvFileOnClick();
      let reqField,
        usCountAdd = 0,
        nonUsAdd = 0;
      if (fileData.length) {
        fileData.map((obj) => {
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
          msg: subName,
          baseCustomMessage,
          signOffText: name2,
          csvFileBulk: csvFileResponse ? csvFileResponse : null,
          csvFileLen: fileData ? fileData.length : 1,
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
        alert("You haven't added Address");
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
              <div className="text-center mt-3 flex flex-col mb-2">
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
              className="bg-[#ef6e6e] text-[#fff] max-w-[286.14px] mx-auto p-2 font-roboto text-base font-bold w-full"
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
            className={`flex h-[48px] `}
            style={{
              justifyContent: metafields.header.justifyContent,
              transform: `scale(${metafields.header.zoom})`,
            }}
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
                fontSize: `${metafields.header.fontSize}px`,
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
            style={{
              justifyContent: metafields.footer.justifyContent,
              transform: `scale(${metafields.footer.zoom})`,
            }}
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
                fontSize: `${metafields.footer.fontSize}px`,
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

  async function onChnageNameVal(nameData) {
    setErrorCustomText('');
    setName(nameData);
    if (!fontFamilyName) {
      setFontFamily('tarzan');
    }
    // processInput();
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

  function updateMessageBoxesMaxHeight() {
    const outermostContainer = ref2.current;
    const mainMessageBox = ref1.current;
    if (outermostContainer) {
      const messageBoxMaxHeight =
        name2.length > 0
          ? outermostContainer?.getBoundingClientRect().height / 1.3
          : outermostContainer?.getBoundingClientRect().height;
      if (messageBoxMaxHeight !== customMessageBoxMaxHeight) {
        setCustomMessageBoxMaxHeight(messageBoxMaxHeight);
      }
      if (mainMessageBox) {
        const signOffMaxHeight =
          outermostContainer?.getBoundingClientRect().height -
          mainMessageBox?.getBoundingClientRect().height;
        if (signOffMaxHeight !== signOffBoxMaxHeight) {
          setsignOffBoxMaxHeight(signOffMaxHeight);
        }
      }
    }
  }

  useEffect(() => {
    if (name.length > 0) {
      updateMessageBoxesMaxHeight();
      const debouncedCallback = debounce(processCustomMessageInput);
      debouncedCallback();
    } else {
      setFontSize(INITIAL_INPUT_CSS.initailFontSize);
      setLineHeight(INITIAL_INPUT_CSS.initalLineHeight);
    }
  }, [
    name,
    name2,
    fontFamilyName,
    customMessageBoxMaxHeight,
    signOffFontSize,
    signOffLineHeight,
  ]);

  useEffect(() => {
    if (name2.length > 0) {
      updateMessageBoxesMaxHeight();
      const debouncedCallback = debounce(processSignOffInput);
      debouncedCallback();
    } else {
      setSignOffFontSize(INITIAL_INPUT_CSS.initailFontSize);
      setSignOffLineHeight(INITIAL_INPUT_CSS.initalLineHeight);
    }
  }, [name2, name, fontFamilyName, fontSize, lineHeight, signOffBoxMaxHeight]);

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
    mainMessageBox.style.fontSize = `${
      isFirstTime ? editFontSize : INITIAL_INPUT_CSS.initailFontSize
    }`;
    mainMessageBox.style.lineHeight = `${
      isFirstTime ? editLineHeight : INITIAL_INPUT_CSS.initalLineHeight
    }`;
    // setFontSize(isFirstTime ? editFontSize  : INITIAL_INPUT_CSS.initailFontSize);
    // setLineHeight(isFirstTime ? editLineHeight  : INITIAL_INPUT_CSS.initalLineHeight);
    resize_to_fit(messageBoxOuterRef, mainMessageBox, 'customTextResizing');
    setIsFirstTime(false);
  }

  function processSignOffInput() {
    if (!signOffTextBox) return;
    signOffTextBox.style.fontSize = fontSize;
    signOffTextBox.style.lineHeight = lineHeight;
    resize_to_fit(signOffBoxOuterRef, signOffTextBox, 'signOffResizing');
  }

  function resize_to_fit(outerContainer, innerContainer, resizeSelection) {
    isOverflowing = innerContainer.clientHeight > outerContainer.clientHeight;
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
    const fontSize = parseFloat(
      window.getComputedStyle(innerContainer).fontSize,
    );
    const lineHeight = parseFloat(
      window.getComputedStyle(innerContainer).lineHeight,
    );
    innerContainer.style.fontSize =
      parseFloat(fontSize) - fontSizeDecrement + 'px';
    innerContainer.style.lineHeight =
      parseFloat(lineHeight) - lineHeightDecrement + 'px';
    if (resizeSelection === 'customTextResizing') {
      setFontSize(innerContainer.style.fontSize);
      setLineHeight(innerContainer.style.lineHeight);
    }
    if (isOverflowing) {
      resize_to_fit(outerContainer, innerContainer, resizeSelection);
    }
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
            const newKey = key?.replace(/"/g, ''); // Remove quotes from key
            const newValue = obj[key]?.replace(/"/g, ''); // Remove quotes from value
            cleanedObj[newKey] = newValue;
          });
          return cleanedObj;
        });
        setSelectedFile(file); // Update the selected file state
        setFileData(cleanedArray);
      };
      reader.readAsText(file);
    }
    event.target.value = '';
    setDragAndDropBorderColor('#ef6e6e');
  };

  function csvToJson(csv) {
    var lines = csv.split('\n');
    var result = [];

    var headers = lines[0].split(',');
    for (var i = 1; i < lines.length; i++) {
      var currentLine = lines[i].trim();
      // Skip empty lines
      if (currentLine.length === 0) {
        continue;
      }

      // Handle commas inside double quotes
      var parts = currentLine?.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = parts[j]?.replace(/"/g, '').trim();
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

    if (!fileData.length) {
      errMsg.push('it is empty please add addresses');
      setErrorVal(errMsg);
      setIsOpen2(true);
      // setTimeout(() => setIsOpen2(false), 3000);
      return;
    } else {
      setLenCsvData(fileData.length);
    }

    let reqField = [
      'Type',
      // 'First Name',
      // 'Last Name',
      // 'Address',
      // 'City',
      // 'State/Province',
      // 'Postal Code',
      'Country',
    ];

    const alphabetPattern = /^[A-Za-z]+$/;
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneNumberPattern = /^\+?[0-9\-]{6,15}$/;
    const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;

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
        // setTimeout(() => setIsOpen2(false), 3000);
        found = true;
      }
    }

    let totalAddresses = fileData.length;

    if (errMsg.length == 0) {
      const batchSize = 250; // Define your batch size
      const numBatches = Math.ceil(fileData.length / batchSize);

      for (let i = 0; i < numBatches; i++) {
        const startIdx = i * batchSize;
        const endIdx = Math.min((i + 1) * batchSize, fileData.length);
        const batchData = fileData.slice(startIdx, endIdx);

        for (let index = 0; index < batchData.length; index++) {
          const obj = batchData[index];

          let emptyKeys = [];
          const numkeys = [];
          let fnameField = 'First Name';
          let lnameField = 'Last Name';
          let countryCheck = 'Country';
          let type = 'Type';
          let email = 'Email';
          let phoneNumber = 'Phone';
          let anniversary = 'Anniversary';
          let birthday = 'Birthday';
          for (const key of reqField) {
            if (obj[key] === '') {
              emptyKeys.push(key);
            }
          }
          if (
            obj[countryCheck] === 'USA' ||
            obj[countryCheck]?.toLowerCase() === '' ||
            obj[countryCheck]?.toLowerCase() === ' ' ||
            obj[countryCheck]?.toLowerCase() === 'u.s.a' ||
            obj[countryCheck]?.toLowerCase() === 'u.s' ||
            obj[countryCheck]?.toLowerCase() === 'usa' ||
            obj[countryCheck]?.toLowerCase() === 'us' ||
            obj[countryCheck]?.toLowerCase() === 'america' ||
            obj[countryCheck]?.toLowerCase() === 'united states' ||
            obj[countryCheck]?.toLowerCase() === 'united states of america' ||
            obj[countryCheck]?.toLowerCase() == undefined
          ) {
            usCount++;
          } else {
            nonUSCount++;
          }

          if (emptyKeys.length > 0) {
            errMsg.push(
              ` ${emptyKeys.join(', ')} is empty please check at row ${
                index + 1
              }`,
            );
          }

          if (errMsg.length > 0) {
            setIsOpen2(true);
            // setTimeout(() => setIsOpen2(false), 3000);
            found = true;
            onCancelCSVUpload();
          }
        }

        if (!found) {
          if (stateCheckCart) {
            await uploadDataToAPI(batchData, totalAddresses);
            totalAddresses -= batchData.length;
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
    if (!found) {
      uploadCsvFileOnClick();
    }
  }

  async function uploadCsvFileOnClick() {
    let collectionid = '';
    try {
      const batchSize = 250;
      const numBatches = Math.ceil(fileData.length / batchSize);

      for (let i = 0; i <= numBatches; i++) {
        const startIdx = i * batchSize;
        const endIdx = Math.min((i + 1) * batchSize, fileData.length);
        const batchData = fileData.slice(startIdx, endIdx);
        const isLastBatch = i === numBatches;
        setLoader(true);

        const payload = {
          initiatePartialUpload: i === 0 ? true : false,
          initiatePartialUploadsAggregation: isLastBatch ? true : false,
          partialS3Data: batchData,
          collectionId: collectionid,
        };

        const res = await fetch(
          `${SERVER_BASE_URL}/api/orders/bulk-orders-partial-upload-s3?customerId=${customerid}`,
          {
            method: 'POST',
            timeout: 0,
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNiYjVhOTAwODcwZjFmMjQ3OGRjNjkiLCJ1c2VyIjp7ImVtYWlsIjoiZmFicHJvamVjdG1hbmFnZXJAZ21haWwuY29tIiwic2hvcGlmeUlkIjoiNjIzMjYyMjg5MTExMyIsIl9pZCI6IjY0M2JiNWE5MDA4NzBmMWYyNDc4ZGM2OSIsImZpcnN0X25hbWUiOiJQcmFkZWVwIiwibGFzdF9uYW1lIjoic2luZ2gifSwiaWF0IjoxNjkwNDQwNDY0fQ.5s5g9A2PtZ8Dr5dQZsd0D9wWTT2BzDioqDXzTbIJPko',
            },
            body: JSON.stringify(payload),
          },
        );
        const json = await res.json();

        if (json.result) {
          setShowNextBtn(true);
          setLoader(false);
          setCsvFile(json.result);
          if (i == 0) {
            collectionid = json.result[0].collectionId;
          }
          if (isLastBatch && json.result[0].success) {
            return json.result;
          }
        }
      }
    } catch (error) {
      setModalForAddressBook(false);
      console.error(error, 'file upload error');
      setLoader(false);
    }
  }

  const uploadDataToAPI = async (batchData, totalAddresses) => {
    setLoaderMessage('Uploading Addresses...');
    setLoader(true);

    const apiUrl = `${SERVER_BASE_URL}/api/storefront/addresses/multiple-save?customerId=${customerid}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          batchData.map((data) => ({
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
          })),
        ),
      });

      if (response.ok) {
        // Assuming you want to handle response data from each batch, you can add your logic here
        const responseData = await response.json();
        // Handle response data if needed

        setLoader(false);
      } else {
        setLoader(false);
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setLoader(false);
      console.error('Error uploading data:', error);
      throw error;
    }

    if (totalAddresses === 1) {
      setLoaderMessage('Uploaded Address Successfully');
      setTimeout(() => {
        setLoader(false);
        setLoaderMessage(null);
      }, 1400);
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
    setName(aiText.slice(0, 450));
    setIsOpen(false);
    setaiText('');
    setValToGen(null);
  }
  async function aiGenrateMess() {
    setAiTestLoader(true);
    try {
      const res = await fetch(`${SERVER_BASE_URL}/api/ai-generate`, {
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

  useEffect(() => {
    mainMessageBox = ref1.current;
    signOffTextBox = ref3.current;
    messageBocContainer = ref2.current;
    messageBoxOuterRef = ref6.current;
    signOffBoxOuterRef = ref7.current;
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

  // async function firstNameBtn(data) {
  //   if (remainingWord > data.length) {
  //     setCheckCharCount(false);
  //     setName((prevString) => prevString + data);
  //   } else {
  //     setCheckCharCount(true);
  //   }
  // }

  async function firstNameBtn(data) {
    if (remainingWord > data.length) {
      setCheckCharCount(false);
      setName((prevString) => {
        // Get the cursor position
        const selectionStart = textareaRef?.current?.selectionStart;
        const selectionEnd = textareaRef?.current?.selectionEnd;

        // Insert the new data at the cursor position
        const newValue =
          prevString.substring(0, selectionStart) +
          data +
          prevString.substring(selectionEnd);

        return newValue;
      });
    } else {
      setCheckCharCount(true);
    }
  }

  useEffect(() => {
    // Define the API URL
    const apiUrl = `${SERVER_BASE_URL}/api/storefront/addresses?customerId=${customerid}`;
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
          `${SERVER_BASE_URL}/api/storefront/messageTemplates?customerId=${customerid}`,
          {
            method: 'POST',
            body: formData,
          },
        );
        const json = await res.json();
        if (!json.result.message) {
          setTimeout(() => {
            setAddNewTem(false);

            setLoaderMessage(null);
            setShowLoader(false);
          }, 2000);
        } else {
          setLoaderMessage(null);
          setShowLoader(false);
          setErrorMessage(json.result.message);
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
          <div className="h-[16px] mt-[5px]">
            {errorTemplate && (
              <span className="text-red-500 font-karla">
                Please check that the value is not empty
              </span>
            )}
          </div>
          <div>
            <input
              type="text"
              ref={ref4}
              autoFocus
              onChange={(e) => {
                setErrorMessage('');
                setErrorTemplate('');
                e.target.value;
              }}
              value={tempVal}
              className="border border-gray-300 p-2 mt-[12px] rounded-md w-full"
            />
          </div>
          {errorMessage && (
            <span className="text-red-500 font-karla">{errorMessage}</span>
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
        `${SERVER_BASE_URL}/api/storefront/messageTemplates?customerId=${customerid}`,
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
          {showLoader ? (
            <CircularLoader title={loaderMessage} color="#ef6e6e" />
          ) : (
            <>
              {loadTempData && loadTempData.length > 0 ? (
                filteredList(loadTempData, searchData).map((item, index) => (
                  <div className="" key={index}>
                    <div className="border border-black-600 mt-[12px] lg:h-[50px] h-[40px] mb-[12px] px-[10px] items-center w-full flex">
                      <div className="w-full font-font-semibold  text-[14px]">
                        {item.templateName}
                      </div>
                      <div className="w-full flex items-center gap-[11px] justify-end">
                        <img
                          src={TickImg}
                          className="2xl:w-[6%] md:w-[6%] w-[14%] h-[5%] cursor-pointer"
                          onClick={() => setLoadedTemVal(item.customMessage)}
                        />
                        <img
                          src={Del}
                          className="2xl:w-[6%] md:w-[6%] w-[14%] h-[5%] cursor-pointer"
                          onClick={() => onConfirmDeleteTemplate(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center font-bold mt-4 text-[#001a5f] text-[15px]">
                  {' '}
                  No Saved template
                </div>
              )}
            </>
          )}
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
        `${SERVER_BASE_URL}/api/storefront/messageTemplates/delete?customerId=${customerid}`,
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
    if (!name) {
      setAddNewTem(false);
      setLoginModal(false);
      setAddNewTem(false);
      setErrorCustomText(true);
    } else if (!customerid && name) {
      setShowSignScreen(true);

      setErrorCustomText(false);
    } else {
      setAddNewTem(true);
      setErrorCustomText(false);
    }
  }
  function OpenLoadTemp() {
    if (!customerid) {
      setShowSignScreen(true);
    } else {
      SavedTemp() && setLoadTemModal(true);
    }
  }
  function OpenAddressBookModal() {
    if (!customerid) {
      setShowSignScreen(true);
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

  async function initiateCustomFontImport(customFonts) {
    if (!customFonts.length) return;
    for (const font of customFonts) {
      const res = await fetch(
        `${SERVER_BASE_URL}/fonts/myFont/${font.fileName}`,
      );
      const fontData = await readReadableFile(res.body);
      const fontBlob = new Blob([fontData.buffer]);
      const fontUrl = URL.createObjectURL(fontBlob);

      if (!importedCustomFonts.current.includes(font.fontName)) {
        const style = document.createElement('style');
        style.appendChild(
          document.createTextNode(
            `@font-face { font-family: '${font.fontName}'; src: url('${fontUrl}') format('truetype'); }`,
          ),
        );
        document.head.appendChild(style);
        importedCustomFonts.current.push(font.fontName);
      }
    }
  }

  async function readReadableFile(fileResponse) {
    const reader = fileResponse.getReader();
    const chunks = [];
    let done = false;

    while (!done) {
      const {value, done: readerDone} = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }
    const fontData = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0),
    );
    let offset = 0;
    for (const chunk of chunks) {
      fontData.set(chunk, offset);
      offset += chunk.length;
    }
    return fontData;
  }

  async function customFontFamily(id) {
    try {
      const res = await fetch(
        `${SERVER_BASE_URL}/fonts/getMyFonts/${id}`,
      );
      const json = await res.json();

      setCustomFonts(json.data);
      initiateCustomFontImport(json.data);
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
    anchor.href = `${SERVER_BASE_URL}/docs/new-birthday-template`;
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
  function onDateChangeFunction(value) {
    let minValue = new Date().toISOString().split('T')[0];
    if (minValue > value.target.value) {
      setMinDateCheck(true);
    } else {
      setMinDateCheck(false);

      setShippingDate(value.target.value);
      if (value.target.value) {
        value.target.blur();
      }
    }
  }

  useEffect(() => {
    if (!standardFontVal && !editFontFamily) {
      setStandardFontVal('Tarzan');
    } else if (editFontFamily) {
      setStandardFontVal(editFontFamily);
    }
  }, []);

  return (
    <>
      <div className="mainDivForBox relative flex md:flex-row flex-col xl:gap-[40px] md:gap-[20px] w-full gap-5  md:justify-between">
        <div
          className={`relative  w-auto xl:w-[618px] md:h-[1068px] ${
            show
              ? 'lg:h-[1110px] texting-relative-cont-bulk'
              : 'lg:h-[714px] texting-relative-cont-single'
          }`}
        >
          <div
            className={`md:mx-0 mx-auto bg-[#FAFAFA] p-[20px] md:w-[601px] md:absolute -top-[94px] w-full ${
              show
                ? 'md:pb-[35rem] textarea-cont-bulk'
                : 'md:pb-[15rem] textarea-cont-single'
            }`}
          >
            <div className="flex flex-col handwrittenStyle items-start xl:flex-row xl:items-center gap-[16px] text-center mb-2 pb-[0.86rem]">
              <div className="h-[73px] xl:max-w-[187px] flex flex-col justify-between font-inter whitespace-nowrap font-semibold 2xl:text-[14px] text-[11px] flex-1 w-full text-left">
                <span className=""> Standard Handwriting Style</span>
                <CustomDropdown
                  id="font"
                  value={standardFontVal}
                  onChange={(e) => setFont(e.target.value)}
                  options={[
                    {
                      value: standardFontVal,
                      label: standardFontVal
                        ? standardFontVal
                        : editFontFamily && !editCustomFontFamily
                        ? editFontFamily
                        : 'Tarzan',
                      style: {fontSize: '16px'},
                    },
                    {
                      value: 'Tarzan',
                      label: 'Tarzan',
                      style: {fontSize: '33px'},
                      className: 'font-tarzan',
                    },

                    {
                      value: 'Stitch',
                      label: 'Stitch',
                      style: {fontSize: '33px'},
                      className: 'font-stitch',
                    },

                    {
                      value: 'Pinocchio',
                      label: 'Pinocchio',
                      style: {fontSize: '20px'},
                      className: 'font-pinocchio',
                    },
                    {
                      value: 'Simba',
                      label: 'Simba',
                      style: {fontSize: '33px'},
                      className: 'font-simba',
                    },
                    {
                      value: 'Roo',
                      label: 'Roo',
                      style: {fontSize: '33px'},
                      className: `font-roo`,
                    },
                    {
                      value: 'Nemo',
                      label: 'Nemo',
                      style: {fontSize: '20px'},
                      className: `font-nemo`,
                    },
                    {
                      value: 'Lumiere',
                      label: 'Lumiere',
                      style: {fontSize: '33px'},
                      className: `font-lumiere`,
                    },
                    {
                      value: 'Kaa',
                      label: 'Kaa',
                      style: {fontSize: '33px'},
                      className: `font-kaa`,
                    },
                    {
                      value: 'Dumbo',
                      label: 'Dumbo',
                      style: {fontSize: '33px'},
                      className: `font-dumbo`,
                    },
                    {
                      value: 'Bolt',
                      label: 'Bolt',
                      style: {fontSize: '33px'},
                      className: `font-bolt`,
                    },
                    {
                      value: 'Cinderella',
                      label: 'Cinderella',
                      style: {fontSize: '33px'},
                      className: `font-cinderella`,
                    },
                    {
                      value: 'Hercules',
                      label: 'Hercules',
                      style: {fontSize: '38px'},
                      className: `font-hercules`,
                    },
                    {
                      value: 'Merlin',
                      label: 'Merlin',
                      style: {fontSize: '33px'},
                      className: `font-merlin`,
                    },
                    {
                      value: 'Rapunzel',
                      label: 'Rapunzel',
                      style: {fontSize: '33px'},
                      className: `font-rapunzel`,
                    },
                    {
                      value: 'Scar',
                      label: 'Scar',
                      style: {fontSize: '33px'},
                      className: `font-scar`,
                    },
                    {
                      value: 'Woody',
                      label: 'Woody',
                      style: {fontSize: '33px'},
                      className: `font-woody`,
                    },
                    {
                      value: 'Sarabi',
                      label: 'Sarabi',
                      style: {fontSize: '33px'},
                      className: `font-sarabi`,
                    },
                    {
                      value: 'Goofy',
                      label: 'Goofy',
                      style: {fontSize: '33px'},
                      className: `font-goofy`,
                    },
                    {
                      value: 'Donald',
                      label: 'Donald',
                      style: {fontSize: '20px'},
                      className: `font-donald`,
                    },
                    {
                      value: 'Aladdin',
                      label: 'Aladdin',
                      style: {fontSize: '29px'},
                      className: `font-aladdin`,
                    },
                    {
                      value: 'Triton',
                      label: 'Triton',
                      style: {fontSize: '33px'},
                      className: `font-triton`,
                    },
                    {
                      value: 'Ratigan',
                      label: 'Ratigan',
                      style: {fontSize: '33px'},
                      className: `font-ratigan`,
                    },

                    {
                      value: 'Rafiki',
                      label: 'Rafiki',
                      style: {fontSize: '33px'},
                      className: `font-rafiki`,
                    },
                    {
                      value: 'Jasmine',
                      label: 'Jasmine',
                      style: {fontSize: '33px'},
                      className: `font-jasmine`,
                    },
                    {
                      value: 'Copper',
                      label: 'Copper',
                      style: {fontSize: '33px'},
                      className: `font-copper`,
                    },
                    {
                      value: 'Boo',
                      label: 'Boo',
                      style: {fontSize: '29px'},
                      className: `font-boo`,
                    },
                  ]}
                />
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
              <div className="h-[73px] xl:max-w-[181px] flex flex-col justify-between font-inter whitespace-nowrap relative font-semibold 2xl:text-[14px] text-[11px]  flex-1 w-full text-left self-end">
                <span>Optional shipping date</span>
                <div className="flex relative">
                  <input
                    type="date"
                    className="h-[40px] highlight-none font-bold text-[14px] cursor-pointer w-full outline-none border-none rounded-tl rounded-bl font-inter text-sm text-[#737373]"
                    // min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => onDateChangeFunction(e)}
                    value={shippingDate}
                  />
                  <span className="calendar-icon">
                    <img src={calender_icon} alt="Calendar" />
                  </span>
                </div>
                {minDateCheck && (
                  <span className="absolute h-[22px] -bottom-[22px] text-[10.5px] text-red-500">
                    Please choose a future date
                  </span>
                )}
              </div>
            </div>
            {/* <div className="flex flex-col handwrittenStyle items-start xl:flex-row xl:items-center gap-[16px] text-center mb-2">
              <div className="h-[73px] xl:max-w-[187px] flex flex-col justify-between font-inter whitespace-nowrap font-semibold 2xl:text-[14px] text-[11px] flex-1 w-full text-left">
                <span className=""> Standard Handwriting Style</span>
                <select
                  id="font"
                  className="h-[40px] highlight-none cursor-pointer font-bold  text-[14px] rounded border-0 border-black w-full font-inter text-sm text-[#737373]"
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
                  {editFontFamily && editFontFamily !== 'Tarzan' && (
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
                    // min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => onDateChangeFunction(e)}
                    value={shippingDate}
                  />
                  <span className="calendar-icon">
                    <img src={calender_icon} alt="Calendar" />
                  </span>
                </div>
                {minDateCheck && (
                  <span className=" text-[10.5px] pt-[14px] text-red-500">
                    Please choose a future date
                  </span>
                )}
              </div>
            </div> */}

            {!customFonts && (
              <div className="mb-[24px]  font-inter text-xs">
                <a
                  href="https://meetings.hubspot.com/rick24"
                  target="_self"
                  className="text-[#737373]"
                >
                  <span className="text-[#001A5F] font-medium">
                    Contact Us &nbsp;
                  </span>
                </a>
                <span>
                  to find out how to add your own custom handwriting fonts.
                </span>
              </div>
            )}
            <textarea
              type="text"
              ref={textareaRef}
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

            {errorCustomText && (
              <>
                <p className="text-[red] mb-[12px]">
                  Please provide a custom message
                </p>
              </>
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
                  <a
                    href="https://simplynoted.leaddyno.com/"
                    target="_blank"
                    className="h-[26px] underline font-roboto font-bold text-base"
                  >
                    Refer & Earn: Click to Join!
                  </a>
                  <Link
                    to="/pages/simply-noted-plans"
                    className="h-[26px] underline font-roboto font-bold text-base"
                  >
                    Upgrade To Unlimited $0.97 Notes
                  </Link>
                  <Link
                    to="/pages/faq"
                    className="h-[26px] underline font-roboto font-bold text-base"
                  >
                    Need Help? Contact Support Here
                  </Link>
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
            className="outerr shadow-outer-custom h-[400px] bg-white absolute pt-[13px] pb-[16px] top-0 right-0 left-0 bottom-0 md:mx-0 overflow-hidden"
          >
            {metafields &&
              metafields.isHeaderIncluded &&
              metafields.header.data && <ShowHeaderComp />}
            <div
              id="outer"
              className="outerr border border-[#E5E5E5] rounded flex flex-col justify-between custom-product-shadow h-[400px] bg-white absolute pt-[13px] pb-[16px] top-0 right-0 left-0 bottom-0 md:mx-0 overflow-hidden"
            >
              {metafields &&
                metafields.isHeaderIncluded &&
                metafields.header.data && <ShowHeaderComp />}
              <div
                className={`outerSec flex flex-col flex-1 w-[100%] bg-white mt-1 overflow-hidden`}
                ref={ref2}
              >
                <div
                  ref={ref6}
                  style={{maxHeight: `${customMessageBoxMaxHeight}px`}}
                  className="output"
                >
                  <div
                    id="messageBoxID"
                    ref={ref1}
                    className="pl-[20px] pr-[20px] pt-2 pb-2 text-[#0040ac] relative"
                    style={{
                      fontFamily: fontFamilyName
                        ? fontFamilyName
                        : editFontFamily
                        ? editFontFamily
                        : 'tarzan',
                      fontSize: fontSize
                        ? fontSize
                        : INITIAL_INPUT_CSS.initailFontSize,
                      lineHeight: lineHeight
                        ? lineHeight
                        : INITIAL_INPUT_CSS.initalLineHeight,
                    }}
                  >
                    {name ? name : 'Enter your custom message here...'}
                  </div>
                </div>
                <div
                  ref={ref7}
                  style={{
                    height:
                      name.length > 0 ? 'auto' : `${signOffBoxMaxHeight}px`,
                    maxHeight: `${signOffBoxMaxHeight}px`,
                  }}
                  className="flex-1"
                >
                  <div
                    className={`secDiv output w-[100%] max-w-[300px] ml-auto mr-5 bg-white`}
                    ref={ref}
                    style={{
                      display: name2.length > 0 ? 'block' : 'none',
                      height:
                        (metafields.footer ||
                          metafields.header ||
                          qrValue?.length > 0) &&
                        '48px',
                    }}
                  >
                    <div
                      id="signOffText"
                      ref={ref3}
                      className="text-[#0040ac] max-w-[300px]"
                      style={{
                        fontFamily: fontFamilyName
                          ? fontFamilyName
                          : editFontFamily
                          ? editFontFamily
                          : 'tarzan',
                        fontSize: signOffFontSize
                          ? `${signOffFontSize}px`
                          : INITIAL_INPUT_CSS.initailFontSize,
                        lineHeight: signOffLineHeight
                          ? `${signOffLineHeight}px`
                          : INITIAL_INPUT_CSS.initalLineHeight,
                      }}
                    >
                      {name2}
                    </div>
                  </div>
                </div>
              </div>
              {/* {name2.length>0 && */}

              {/* } */}
              {metafields &&
                metafields.isFooterIncluded &&
                (metafields.footer.data || qrValue?.length > 0) && (
                  <ShowFooterComp />
                )}
            </div>
            {/* } */}
            {/* {metafields &&
              metafields.isFooterIncluded &&
              metafields.footer.data && <ShowFooterComp />} */}
          </div>
          {/* // This margin is similar to the height of the absolute div above this */}
          <div className="text-[#737373] text-sm mt-[406px] mb-[44px]">
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
                          <div className="mt-3 capitalize">
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
                            href={`${SERVER_BASE_URL}/docs/bulk-template`}
                            className="underline  text-[14px] font-normal text-[#1B5299]"
                          >
                            Download The Bulk Order Template
                          </a>
                        </>
                        <p
                          onClick={openModal}
                          className="underline underline-offset-1 cursor-pointer text-[14px] text-[#1B5299] font-normal hover:text-blue-600"
                        >
                          View Bulk Upload Instructions
                        </p>
                        {/* <div className='text-[14px] text-[#1b5299] font-bold'>Watch Tutorial <span className='border-b-[1px] border-[#1b5299]'>Video</span></div> */}
                        {!showNextBtn && (
                          <div className="bg-[#E5E5E5] capitalize p-4 flex items-center mt-3 text-[14px] text-[#737373] font-bold rounded gap-[3px]">
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
                        )}

                        {selectedFile && (
                          <div className="mt-2  w-full text-center">
                            <span className="text-[#000] text-[14px] break-all  leading-[22px] font-karla font-bold">
                              {selectedFile?.name}
                            </span>
                          </div>
                        )}
                        {/* )} */}

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
                        <CircularLoader title={loaderMessage} color="#ef6e6e" />
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
                              href={`${SERVER_BASE_URL}/docs/bulk-template`}
                              className="underline  text-[14px] font-normal text-[#1B5299]"
                            >
                              Download Bulk Order Templates
                            </a>
                          </>
                          <p
                            onClick={openModal}
                            className="underline underline-offset-1 cursor-pointer text-[14px] text-[#1B5299] font-normal hover:text-blue-600"
                          >
                            View Bulk Upload Instructions
                          </p>
                          {/* <div className='text-[14px] text-[#1b5299] font-bold'>Watch Tutorial <span className='border-b-[1px] border-[#1b5299]'>Video</span></div> */}
                          {!showNextBtn && (
                            <div className="bg-[#E5E5E5] capitalize p-4 flex items-center mt-3 text-[14px] text-[#737373] font-bold rounded gap-[3px]">
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
                          )}
                          {selectedFile && (
                            <div className="mt-2  w-full text-center">
                              <span className="text-[#000] text-[14px] break-all  leading-[22px] font-karla font-bold">
                                {selectedFile?.name}
                              </span>
                            </div>
                          )}
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
                    className="bg-[#ff0000] cursor-not-allowed !opacity-40 px-[10px] py-[16px] md:mb-6 mb-[16px] w-full text-base font-roboto font-bold h-[44px]"
                    text="Buy Leads (Mailing List) Coming Soon"
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
                    <span className="text-[#737373] capitalize font-inter text-sm font-medium mt-[12px] text-center">
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
              <div className="mt-[12px]  mb-[12px]">
                <text className="text-[black] text-[15px]">
                  Type in words or a phrase to use our AI Assistant to help
                  generate a great message
                </text>
              </div>
              <div>
                {aiTextLoader ? (
                  <div className="h-[300px] flex justify-center items-center mt-[12px] border-dashed border border-[#999999]">
                    <CircularLoader
                      title="Generating AI Text"
                      color="#ef6e6e"
                    />
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
                    className="bg-[#ef6e6e] sm:w-[40%] w-[60%] h-[45px]  bg-red-500 text-white text-lg rounded-md mt-2 transition-all duration-500 ease-in-out"
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
              isAddressUploadSuccess={isAddressUploadSuccess}
              ProdcuctSide={ProdcuctSide}
              setAddressForm={setAddressForm}
              setIsAddressUploadSuccess={setIsAddressUploadSuccess}
              continueBtn={onClickOfContinue}
              setFilteredAddresses={setFilteredAddresses}
            />
          )
        }
      />
      {/* <ConfirmationModal
        show={confirmModal && isbirthdayAutomated}
        title={'AUTOMATED BIRTHDAY CARDS'}
        onCancel={() =>
          setConfirmModal(false) && setIsBirthdayAutomated(!isbirthdayAutomated)
        }
        onConfirm={() => onConfirmClick()}
        message="Download the recipient template and populate each person birthdate. Their custom card will be sent to them in time to receive it for their birthday!"
        confirmText="Download"
        cancelText="Exit"
      /> */}
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
        subtitle={true}
        instructionsTitle={true}
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

      <Instruction
        title="Uploaded Error!"
        body={errorVal}
        close={true}
        closeModal={() => setIsOpen2(false)}
        isOpen={modalIsOpen2}
        isArrayTrue={true}
      />
    </>
  );
}
