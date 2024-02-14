import React, {useState, useEffect, useRef, useCallback} from 'react';
import Modal from 'react-modal';
import {BsXCircle} from 'react-icons/bs';
import Instruction from '../modal/Instruction';
import ErrorModal from '../modal/ErrorModal';
import Loader from '../modal/Loader';
import {Image} from '@shopify/hydrogen';
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
import calendarIcon from '../../../assets/Image/calendar.png';
import {Text} from '../Text';
import {FaYoutube} from 'react-icons/fa';
import {FiUploadCloud} from 'react-icons/fi';
import {RxCross2} from 'react-icons/rx';
import {VideoTutorial} from '../VideoTutorial';

let mainMessageBox,
  signOffTextBox,
  messageBocContainer,
  signOffBocContainer,
  customerid,
  loadTempDataFilter,
  savedMsg,
  boxHeight;
export function MessageWriting({
  show,
  selectedFile,
  setSelectedFile,
  setShowBox,
  setProductShow,
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
}) {
  const {setAddressForm, addressForm, loadAddress, addresses, setAddresses} =
    useStateContext();
  console.log({metafields});
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
  const [searchData, setsearchData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateCheckCart, setStateCheckCart] = useState(false);
  const [isAddressUploadSuccess, setIsAddressUploadSuccess] = useState(false);
  const [getMetafields, setgetMetafield] = useState(
    metafields ? metafields : '',
  );
  const [metafieldsHeader, setMetafieldsHeader] = useState(false);
  const [metafieldsFooter, setMetafieldsFooter] = useState(false);
  const [customFonts, setCustomFonts] = useState([]);
  const [standardFontVal, setStandardFontVal] = useState('');
  const [customFontVal, setCustomFontVal] = useState('');
  const [videoBtn, setVideoBtn] = useState(false);

  console.log({metafieldsHeader, metafieldsFooter});
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
    setFileData(data);
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
    setShowNextBtn(false);
  }
  async function checkUserLogged() {
    if (!customerid) {
      setLoginModal(true);
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
        // console.log(fileData, 'fileData');
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
        };
      }
      localStorage.setItem('reqFielddInCart', JSON.stringify(reqField));
      setProductShow(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Make the scroll behavior smooth
      });
      // console.log(name, 'namefield');
    }
  }

  function onSelectFromAddressBook() {
    // console.log(fileData);
    if (!customerid) {
      setLoginModal(true);
    } else if (name.length == 0) {
      setInstructionModal(true);
    } else {
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
        // console.log(fileData, 'fileData');
        reqField = {
          msg: name,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
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
        <div className="w-full">
          {showNextBtn ? (
            <>
              <div className=" h-[50px] text-center mt-5 flex mb-2">
                <button
                  className="bg-[#1b5299] text-[#fff] items-center justify-center m-3 w-[40%] p-4 h-[50px]"
                  onClick={() => checkUserLogged()}
                >
                  Next
                </button>
                <button
                  className="bg-[#ef6e6e] text-[#fff] items-center justify-center m-3 w-[40%] p-4 h-[50px]"
                  onClick={() => onCancelCSVUpload()}
                >
                  Cancel
                </button>
              </div>
              <text> Number of recipient Uploaded:{lenCsvData}</text>
            </>
          ) : (
            <button
              className="bg-[#ef6e6e] text-[#fff] p-2 rounded w-full"
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
            className={`flex h-[48px]  mt-2`}
            style={{justifyContent: metafields.header.justifyContent}}
          >
            <Image className={`!w-20`} src={metafields.header.data} />
          </div>
        );
      } else {
        return (
          <div className={`overflow-hidden h-[48px] w-[100%]  px-[2rem] mt-2`}>
            <span
              className={`flex w-full h-full`}
              style={{
                fontFamily: metafields.header.fontType,
                fontSize: metafields.header.fontSize,
                textAlign: metafields.header.textAlign,
                justifyContent: metafields.header.justifyContent,
                flexDirection: metafields.header.flexDirection,
                color: metafields.header.fontColor,
                maxWidth: qrValue ? '93%' : '100%',
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
    console.log({qrValue});
    console.log({metafields});

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
            <Image className={`!w-20`} src={metafields.footer.data} />
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
                maxWidth: qrValue ? '93%' : '100%',
              }}
            >
              {metafields.footer.data}
            </span>
            {qrValue && qrValue.length ? (
              <img
                src={qrValue}
                className="h-[50px] w-[50px] absolute  right-[10px] bottom-[10px]"
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
  console.log(name2.length, 'name2.length');

  async function onchnageOfRegardBox(data) {
    console.log(name2.length, 'name2.length OnchanegCall');

    setName2(data);
    const debouncFunc = debounce(processCustomMessageInput);
    if (name2.length == '0' || name2.length == '1') {
      debouncFunc();
    }
    // processInput2();
  }
  function processCustomMessageInput() {
    if (!mainMessageBox) return;
    mainMessageBox.style.fontSize = '50px';
    mainMessageBox.style.lineHeight = '50px';
    resize_to_fit(messageBocContainer, mainMessageBox, 'customTextResizing');
  }

  function processSignOffInput() {
    if (!signOffTextBox) return;
    signOffTextBox.style.fontSize = '50px';
    signOffTextBox.style.lineHeight = '50px';
    resize_to_fit(signOffBocContainer, signOffTextBox, 'signOffResizing');
  }

  function resize_to_fit(outerContainer, innerContainer, resizeSelection) {
    const isOverflowing =
      innerContainer.clientHeight >= outerContainer.clientHeight;
    console.log({isOverflowing});
    if (!innerContainer || !outerContainer || !isOverflowing) return;

    const heightDifference =
      innerContainer.clientHeight - outerContainer.clientHeight;

    let fontSizeDecrement = 1;
    let lineHeightDecrement = 1;

    if (heightDifference > 1000) {
      fontSizeDecrement = 7;
      lineHeightDecrement = 7;
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
    // console.log(innerContainer.clientHeight, outerContainer.clientHeight,"heights");
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
        // console.log(jsonData, 'jsonData^^^^^^^^^^^^^^^^^');

        const cleanedArray = jsonData.map((obj) => {
          const cleanedObj = {};

          Object.keys(obj).forEach((key) => {
            const newKey = key.replace(/"/g, ''); // Remove quotes from key
            const newValue = obj[key].replace(/"/g, ''); // Remove quotes from value
            cleanedObj[newKey] = newValue;
          });

          return cleanedObj;
        });

        // console.log(cleanedArray, 'cleaned Array');
        // let ab = cleanedArray.map((item) => {
        //   console.log(item);
        //   const newData = {...item};
        //   console.log(newData["Type"]);
        //   // console.log(Object.keys(newData),'OOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        //   delete newData['"Type"'];
        //   return newData;
        // });

        console.log(cleanedArray, 'fiteredDatat,=========');
        setSelectedFile(file); // Update the selected file state
        setFileData(cleanedArray);
      };
      reader.readAsText(file);
    }
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
      // console.log(fileData.length, '=====');
      setLenCsvData(fileData.length);
    }
    let reqField = [
      'First Name',
      'Last Name',
      'Address',
      'City',
      'State/Province',
      'Postal Code',
    ];

    const alphabetPattern = /^[A-Za-z]+$/;
    const mailText = /@.*\.com$/;

    for (let index = 0; index < fileData.length; index++) {
      const obj = fileData[index];
      // console.log(obj['First Name'], 'Name data');
      const emptyKeys = [];
      const numkeys = [];
      let targetField = 'First Name';
      let emailValid = 'Email';
      let countryCheck = 'Country';
      for (const key of reqField) {
        if (obj[key] === '') {
          emptyKeys.push(key);
        }
      }

      if (alphabetPattern.test(obj[targetField]) == false) {
        errMsg.push(`'${targetField}' at row ${index} includes a number.`);
        // console.log(`Index: ${index}, '${targetField}' includes a number.`);
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
        console.log(
          `Index: ${index}, 'email' is not valid (missing @ or not ending with .com).`,
        );
        // setIsOpen2(true)
        // setTimeout(() => setIsOpen2(false), 3000)
      }

      if (emptyKeys.length > 0) {
        errMsg.push(
          ` ${emptyKeys.join(', ')} is empty please check at row ${index}`,
        );
        console.log(
          `Index: ${index}, Empty Keys: [${emptyKeys.join(', ')}]`,
          numkeys,
        );
        // setIsOpen2(true)
        // setTimeout(() => setIsOpen2(false), 3000)
        // break;
      }
      if (errMsg.length > 0) {
        setIsOpen2(true);
        setTimeout(() => setIsOpen2(false), 3000);
        found = true;
      } else {
        if (stateCheckCart) {
          await uploadDataToAPI(obj);
        }
      }
    }
    setErrorVal(errMsg);
    setUsAddress(usCount);
    setnonUsAddress(nonUSCount);
    if (stateCheckCart) {
      setIsAddressUploadSuccess(!isAddressUploadSuccess);
    }
    // console.log(replacedMsg, 'replacedMsg');
    if (found) {
      console.log(`Found  in the array.`);
    } else {
      console.log(` not found in the array.`);
      uploadCsvFileOnClick();
      // checkUserLogged()
    }
  }
  async function uploadCsvFileOnClick() {
    try {
      setLoader(true);
      // console.log('uploadCsvFile OnClick');

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
      // console.log(json, 'CSV UPLOAD DATA ---------------');
      if (json.result) {
        setShowNextBtn(true);
        setLoader(false);
      }
    } catch (error) {
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

        // console.log('Successful response data:', responseData.result);
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
    setLoader(true);
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
      setLoader(false);

      // console.log(json.message, 'AiGenrated Response____________');
    } catch (error) {
      setLoader(false);
      console.error(error, 'error at Ai generated message ');
    }
  }

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  useEffect(() => {
    mainMessageBox = ref1.current;
    signOffTextBox = ref3.current;
    messageBocContainer = ref2.current;
    signOffBocContainer = ref.current;
    loadTempDataFilter = ref5.current?.value;
    customerid = localStorage.getItem('customerId');
    savedMsg = JSON.parse(localStorage.getItem('reqFielddInCart'));
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
    // console.log(ref4.current, 'OOOOOOOO');

    // console.log(savedMsg?.msg);
  }, []);
  async function firstNameBtn(data) {
    // console.log(data);
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
        // console.log(data.result, 'data.result');
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
        const res = await fetch(
          `https://api.simplynoted.com/api/storefront/messageTemplates?customerId=${customerid}`,
          {
            method: 'POST',
            body: formData,
          },
        );
        const json = await res.json();
        if (json) {
          setAddNewTem(false);
        }
        // console.log(json, 'addNewTemplateFunc');
      }
    } catch (error) {
      console.error(error, 'add new Template');
    }
  }
  function AddNewTemplate() {
    return (
      <div className="w-[29rem] m-[2rem]">
      <div>
        <h1 className="text-2xl text-blue-800 font-karla">
          NEW TEMPLATE
        </h1>
      </div>
      <div>
        <input
          type="text"
          ref={ref4}
          value={tempVal}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>
      {errorTemplate && (
        <span className="text-red-500 font-karla">
          Please check that the value is not empty
        </span>
      )}
      <div>
        <DynamicButton
          className="bg-blue-700 text-base w-36 mt-4"
          onClickFunction={() => addNewTemplateFunc()}
          text="Save template"
        />
        <DynamicButton
          className="bg-gray-400 text-base w-36"
          text="Cancel"
          onClickFunction={() => setAddNewTem(false)}
        />
      </div>
    </div>
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
      // console.log(json.result, ')))))))))');
    } catch (error) {
      console.error(error, 'savedTemp');
    }
  }
  const filteredList = (loadTempData, searchData) => {
    // console.log(searchData, 'searchData');
    return loadTempData.filter((dataobj) => bySearch(dataobj, searchData));
  };

  const bySearch = (dataobj, searchData) => {
    // console.log(Object.values(dataobj),'+++++++++++++++');
    if (searchData) {
      return Object.values(dataobj).some((field) =>
        // console.log(s,'!!!!!!!!!!!!!!!!!!!!!!');
        field.toString().toLowerCase().includes(searchData.toLowerCase()),
      );
    } else return dataobj;
  };

  function LoadTemplate() {
    const [searchData, setsearchData] = useState(null);

    return (
      <>
        <div className="flex justify-end "></div>
        <div className=" w-[29rem] m-[2rem]">
          <div>
            <h1 className="text-[28px] text-[#001a5f] font-karla">
              SELECT TEMPLATE
            </h1>
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded p-3 mt-4 bg-[#e8e8ea3d] font-karla"
              placeholder="search Template..."
              ref={ref5}
              onChange={(e) => setsearchData(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <span>Template Name</span>
            <span>Actions</span>
          </div>
          {loadTempData &&
            filteredList(loadTempData, searchData).map((item) => (
              <div className="p-3">
                <div className="border border-black-600 px-[10px] h-[42px] items-center w-full flex">
                  <div className="w-full font-font-semibold mt-[10px] text-[14px]">
                    {item.templateName}
                  </div>
                  <div className="w-full flex items-center gap-[11px] justify-end">
                    <img
                      src={TickImg}
                      className="w-[12%] h-[5%] cursor-pointer"
                      onClick={() => setLoadedTemVal(item.customMessage)}
                    />
                    <img
                      src={Del}
                      className="w-[12%] h-[5%] cursor-pointer"
                      onClick={() => deleteTemp(item._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          <div></div>
        </div>
      </>
    );
  }
  function setLoadedTemVal(val) {
    setName(val);
    setLoadTemModal(false);
  }

  async function deleteTemp(val) {
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
      // console.log(json, 'delte Temp response');
      setOnDelTemp(!onDelTemp);
    } catch (error) {
      console.error(error, 'delete Template');
    }
  }
  const closeModal = () => {
    setIsModalOpen(false);
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
    setStandardFontVal(e);
  }
  async function customFontFamily(id) {
    try {
      const res = await fetch(
        `https://api.simplynoted.com/fonts/getMyFonts/${id}`,
      );
      const json = await res.json();
      // console.log(json.data);
      setCustomFonts(json.data);
    } catch (error) {
      console.error(error, 'customfontError');
    }
  }
  function getCustomFont(val) {
    // console.log(val, 'getcustom val');
    setFontFamily(val);
    setCustomFontVal(val);
    setStandardFontVal('Select Standard Font');
    setCustomFontName(val);
  }
  return (
    <>
      <div className="mainDivForBox flex md:flex-row flex-col xl:gap-[40px] md:gap-[20px] w-full gap-5 md:mt-16 lg:mt-0 md:justify-between">
        <div
          className={`relative md:w-[45%] w-full md:h-[1068px] ${
            show ? 'lg:h-[985px]' : 'lg:h-[810px]'
          }`}
        >
          <div
            className={`md:mx-0 mx-auto bg-[#FAFAFA] p-4 md:absolute -top-[90px] ${
              show
                ? 'md:pb-[35rem] textarea-cont-bulk'
                : 'md:pb-[15rem] textarea-cont-single'
            }`}
          >
            <div className="flex flex-col items-start lg:flex-row lg:items-center gap-[8px] 3xl:gap-[15px] text-center mb-2">
              <div className="font-bold sm:text-[12px] md:text-[10px] xl:text-[13px] flex-1 w-full text-left">
                <span> Standard Handwriting Style</span>
                <select
                  id="font"
                  className="highlight-none cursor-pointer font-light rounded border-0 border-black w-full"
                  value={standardFontVal}
                  onChange={(e) => setFont(e.target.value)}
                  placeholder="aaaa"
                >
                  <option value={standardFontVal} selected disabled>
                    {standardFontVal
                      ? standardFontVal
                      : editFontFamily && !editCustomFontFamily
                      ? editFontFamily
                      : 'Select Handwriting Style'}
                  </option>
                  {editFontFamily && editFontFamily !== 'tarzan' && (
                    <option value="tarzan" className={`font-tarzan`}>
                      Tarzan
                    </option>
                  )}
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
                  <option value="kaa" className={`font-kaa`}>
                    Kaa
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
              </div>
              <div className="font-bold sm:text-[12px] md:text-[10px] text-left xl:text-[13px] flex-1 w-full self-end">
                <span>Custom Handwriting Style</span>
                <select
                  id="Coustomfont"
                  className="highlight-none cursor-pointer font-light rounded border-0 border-black w-full"
                  value={customFontVal}
                  onChange={(e) => getCustomFont(e.target.value)}
                >
                  <option value={customFontVal} selected disabled>
                    {customFontVal
                      ? customFontVal
                      : editCustomFontFamily
                      ? editCustomFontFamily
                      : 'Select Custom Font'}
                  </option>
                  {customFonts &&
                    customFonts.map((item) => (
                      <option value={item.fontName}>{item.fontName}</option>
                    ))}
                </select>
              </div>
              <div className="font-bold sm:text-[12px] md:text-[10px] xl:text-[13px] flex-1 w-full text-left self-end">
                <span>Optional shipping date</span>
                <div className="flex relative">
                  <input
                    type="date"
                    className="calendar-input highlight-none cursor-pointer font-light w-full outline-none border-none rounded-tl rounded-bl"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            <div className="mb-7 text-sm">
              <span className="text-[#001A5F] font-medium">
                Contact Us &nbsp;
              </span>
              <span className="text-[#737373]">
                to find out how to add your own custom handwriting fonts.
              </span>
            </div>
            <textarea
              type="text"
              id="example-one-input"
              value={name}
              placeholder="Enter your custom message text here..."
              className="border-dashed resize-none h-[200px] rounded-[6px] p-[7px] text-black font-normal "
              maxLength="450"
              onChange={(e) => onChnageNameVal(e.target.value)}
              data-gtm-form-interact-field-id="0"
            ></textarea>
            <span className="text-[#737373] flex">
              {remainingWord} characters remaining
            </span>
            {/* {customerid && ( */}
            <div className="flex w-full items-center">
              <img
                src={AiImage}
                className="h-[35px] cursor-pointer  mt-3 mb-3 lg:mb-5"
                onClick={() => setIsOpen(true)}
              />
              <span
                className="cursor-pointer font-bold text-[#836FE5] text-[12px] md:text-[14px] lg:mb-[7px] underline"
                onClick={() => setIsOpen(true)}
              >
                <span className="text-[red]">Try our</span> New AI Message
                Assistant
              </span>
            </div>
            {/* <div className="flex justify-between font-bold text-[#1b5299] text-[14px] mt-[10px]">
            <div className='border-1'>
              <span
                className=" cursor-pointer"
                onClick={() => OpenAddTemplateBox()}
              >
                Save New Template
              </span>
            </div>
            <div>
              <span
                className=" cursor-pointer"
                onClick={() => OpenLoadTemp()}
              >
                Load Save Template
              </span>
            </div>
          </div> */}
            {/* )} */}

            {checkCharCount && (
              <span className="text-[red] font-bold">
                you don't have enough character remaining
              </span>
            )}

            {show && (
              <div className="mb-5">
                <button
                  className="addFirstnameBtn "
                  value={'[First Name]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  First Name
                </button>
                <button
                  className="addFirstnameBtn "
                  value={'[Last Name]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Last Name
                </button>
                <button
                  className="addFirstnameBtn "
                  value={'[Company]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Company
                </button>
                <button
                  className="addFirstnameBtn "
                  value={'[Custom 1]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Custom 1
                </button>
                <button
                  className="addFirstnameBtn"
                  value={'[Custom 2]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Custom 2
                </button>
                <button
                  className="addFirstnameBtn"
                  value={'[Custom 3]'}
                  onClick={(e) => firstNameBtn(e.target.value)}
                >
                  Custom 3
                </button>
              </div>
            )}
            <div className="flex w-full justify-between xl:flex-row flex-col ">
              <div className="flex flex-col justify-between gap-2">
                <div className="flex justify-between font-bold text-[#1b5299] text-[12px] md:text-[14px] gap-[20px] items-start xl:mr-3 mb-2">
                  <button
                    className="cursor-pointer border border-[#1b5299] rounded-[5px] p-2"
                    onClick={() => OpenAddTemplateBox()}
                  >
                    Save New Template
                  </button>
                  <button
                    className="cursor-pointer border border-[#1b5299] rounded-[5px] p-2 sm:text-[12px] "
                    onClick={() => OpenLoadTemp()}
                  >
                    Load Save Template
                  </button>
                </div>
                <div className="flex flex-col font-medium">
                  <div className="mb-[7px]">Refer & Earn: Click to Join!</div>
                  <div className="mb-[7px]">
                    Upgrade To Unlimited $0.97 Notes
                  </div>
                  <div>Need Help? Contact Support Here</div>
                </div>
              </div>
              <div className="xl:w-[40%] w-full xl:mt-0 mt-[10px]">
                <textarea
                  type="text"
                  value={name2}
                  v-model="keyword"
                  id="example-one-input2"
                  className="inputText2 resize-none h-[100px] !w-full rounded-[6px] p-[7px] border-2 border-dotted border-[#1b5299]"
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
                    <span className="text-[#737373]">
                      {remainSign} characters remaining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col w-full md:w-[48%] w-[90%] sm:max-w-[702px] md:min-w-0  relative ${
            show ? 'h-[940px]' : 'h-[370px] '
          }`}
        >
          <div
            id="outer"
            className="outerr shadow-lg h-[380px] bg-white absolute top-0 right-0 left-0 bottom-0 md:mx-0"
          >
            {metafields &&
              metafields.isHeaderIncluded &&
              metafields.header.data && <ShowHeaderComp />}
            <div
              className={`outerSec w-[100%] bg-white mt-1`}
              ref={ref2}
              style={{
                height:
                  metafields.footer &&
                  metafields.header &&
                  metafields.footer.data &&
                  metafields.header.data &&
                  name2.length > 0
                    ? '210px'
                    : (metafields.footer &&
                        metafields.header &&
                        metafields.footer.data &&
                        metafields.footer &&
                        metafields.header &&
                        metafields.header.data) ||
                      (metafields.footer &&
                        metafields.header &&
                        metafields.footer.data &&
                        name2.length > 0) ||
                      (metafields.footer &&
                        metafields.header &&
                        metafields.header.data &&
                        name2.length > 0)
                    ? '258px'
                    : (metafields.footer &&
                        metafields.header &&
                        metafields.footer.data) ||
                      (metafields.footer &&
                        metafields.header &&
                        metafields.header.data) ||
                      name2.length > 0
                    ? '310px'
                    : '370px',
              }}
            >
              <div
                id="messageBoxID"
                ref={ref1}
                className="output mx-5 text-[#0040ac]"
                style={{
                  fontFamily: fontFamilyName
                    ? fontFamilyName
                    : editFontFamily
                    ? editFontFamily
                    : 'tarzan',
                  fontSize: fontSize ? fontSize : '50px',
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
                    : 'tarzan',
                  fontSize: signOffFontSize ? signOffFontSize : '50px',
                  lineHeight: signOffLineHeight ? signOffLineHeight : '50px',
                }}
              >
                {name2}
              </div>
            </div>
            {/* } */}
            {metafields &&
              metafields.isFooterIncluded &&
              metafields.footer.data && <ShowFooterComp />}
          </div>
          <div className="text-[#737373] text-sm mt-3">
            Preview doesn't do the quality justice, See the real writing magic
            there.
          </div>

          {show && (
            // This margin is similar to the height of the absolute div above this
            <div className="mt-[370px]">
              {/* <div className="lg:w-[50%] w-[100%] flex justify-start font-bold md:mt-[10px] mt-[25px]">
                <text>
                  As of july5,2023, we have upgraded the bulk order
                  template.Please download the new template below
                </text>
              </div> */}
              <div className="flex flex-col w-full flex-wrap gap-[10px] text-black items-center">
                {bulkFileCount && bulkFileCount > 0 ? (
                  <div className="custom_testing pointer-events-none opacity-40 ">
                    <div className="bg-[#dbdbdb] px-[8px] py-[5px]">
                      <input type="checkbox" />
                      <label htmlFor="">
                        Add all addresses to address book
                      </label>
                    </div>
                    <div
                      className="flex items-center gap-[10px]"
                      onClick={() => setVideoBtn(true)}
                    >
                      <div className="relative mb-1">
                        <FaYoutube className="underline text-[15px] self-start text-[#1B5299] font-bold" />
                        <hr className="absolute border-[#1B5299] bottom-0 left-0 right-0" />
                      </div>
                      <span className="underline text-[#1B5299] font-bold cursor-pointer">
                        Bulk Upload Tutorial Video
                      </span>
                    </div>
                    {bulkUploadDiv && !showNextBtn ? (
                      <div>
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
                    <p className="text-[#1B5299]">
                      Download the
                      <a href="https://api.simplynoted.com/docs/bulk-template">
                        Bulk Order Template
                      </a>
                    </p>
                    <p
                      onClick={openModal}
                      className="underline underline-offset-1 cursor-pointer"
                    >
                      View bulk upload instructions
                    </p>
                    <AfterUpload />
                  </div>
                ) : (
                  <div className="w-full min-h-[200px] p-4 border border-dashed border-[#525252] rounded-[6px] p-[7px] pt-[24px] pb-[24px] text-black font-normal flex justify-center">
                    <div className="sm:w-full md:w-[50%] flex flex-col gap-3 justify-center items-center">
                      {loader ? (
                        <CircularLoader color="#ef6e6e" />
                      ) : (
                        <>
                          <div className="rounded-full p-3 bg-[#E6E6E6] text-[20px]">
                            <FiUploadCloud />
                          </div>
                          <div
                            className="flex items-center gap-[10px]"
                            onClick={() => setVideoBtn(true)}
                          >
                            <div className="relative mb-1">
                              <FaYoutube className="underline text-[15px] self-start text-[#1B5299] font-bold" />
                              <hr className="absolute border-[#1B5299] bottom-0 left-0 right-0" />
                            </div>
                            <span className="underline text-[#1B5299] font-bold cursor-pointer">
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
                              onClick={() => setStateCheckCart(!stateCheckCart)}
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
                <div className="m-auto w-full grid text-[13px] font-bold">
                  <DynamicButton
                    className="bg-[#1b5299] px-[10px] py-[16px] md:mb-6 mb-2 w-full"
                    text="Select From Address Book"
                    onClickFunction={() => OpenAddressBookModal()}
                  />
                  <DynamicButton
                    className="bg-[#FF0000] px-[10px] py-[16px] md:mb-6 mb-2 w-full"
                    text="Buy Leads (Mailing List)"
                    onClickFunction={() => {
                      console.log('Yet to be completed!!');
                    }}
                  />
                  {bulkFileCount && bulkFileCount > 0 ? (
                    <DynamicButton
                      className="bg-[#001a5f] px-[10px] py-[16px] w-full"
                      text="Next"
                      onClickFunction={() => onSelectFromAddressBook()}
                    />
                  ) : (
                    <DynamicButton
                      className="bg-[#697ba6] px-[10px] py-[16px] w-full"
                      text="Next"
                      onClickFunction={() => ''}
                    />
                  )}
                  {bulkFileCount && bulkFileCount > 0 ? (
                    <span> Number of Bulk Address: {bulkFileCount}</span>
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
            <div className="bg-[#001a5f] h-[50px] text-center mt-10">
              <button
                className="text-[#fff] items-center h-[50px] font-normal text-[14px] justify-center  w-full"
                onClick={() => checkUserLogged()}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex">
          <h2 className="font-bold text-xl w-[600px]">AI Message Assistant</h2>
          <BsXCircle className="" onClick={() => onCancl()} />
        </div>
        <div>
          <text className=" text-[#999999]">
            Type in words or a phrase to use our AI Assistant to
            <br /> help generate a great message
          </text>
        </div>
        <div>
          {loader ? (
            <div className="h-[300px] flex justify-center items-center border-dashed border border-[#999999]">
              <CircularLoader color="#ef6e6e" />
            </div>
          ) : (
            <textarea
              type="text"
              id="aiTextArea"
              value={aiText ? aiText : valToGen}
              onChange={(e) => setValToGen(e.target.value)}
              placeholder="Example: Message for Birthday"
              maxLength="450"
            ></textarea>
          )}
        </div>
        {!aiText ? (
          <div className="ai-generate">
            <button
              id="generate-msg"
              disabled=""
              onClick={() => aiGenrateMess()}
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
      </Modal>
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

      <Instruction
        isOpen={isModalOpen}
        title="INSTRUCTIONS FOR BULK UPLOAD"
        closeModal={closeModal}
        instructions={[
          'Download the bulk upload template (csv)',
          'Complete a row for each address you wish to add',
          'Upload your completed file in .csv format',
        ]}
        table={true}
      />

      <Instruction
        isOpen={addNewTem}
        title=""
        closeModal={() => setAddNewTem(false)}
        table={false}
        body={<AddNewTemplate />}
      />

      <Instruction
        isOpen={loadTemModal}
        close={true}
        title=""
        closeModal={() => setLoadTemModal(false)}
        table={false}
        body={<LoadTemplate />}
      />

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
