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
let mainMessageBox,
  signOffTextBox,
  messageBocContainer,
  signOffBocContainer,
  customerid,
  loadTempDataFilter,
  savedMsg;
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
}) {
  const {setAddressForm, addressForm, loadAddress, addresses, setAddresses} =
    useStateContext();
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
const[stateForFilter,setStateForFilter] = useState(false)
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
        <div className="">
          <div>
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
                className="bg-[#ef6e6e] text-[#fff] p-2 rounded"
                onClick={() => uploadCsvFile()}
              >
                Upload
              </button>
            )}
          </div>
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
            className={`flex h-[50px]  m-2`}
            style={{justifyContent: metafields.header.justifyContent}}
          >
            <Image className={`!w-20`} src={metafields.header.data} />
          </div>
        );
      } else {
        return (
          <div
            className={`flex overflow-hidden items-start h-[50px] w-[100%]  px-[2rem] m-2`}
          >
            <span
              className={`flex `}
              style={{
                fontFamily: metafields.footer.fontType,
                fontSize: metafields.footer.fontSize,
                textAlign: metafields.footer.textAlign,
                justifyContent: metafields.footer.justifyContent,
                flexDirection: metafields.footer.flexDirection,
                color: metafields.footer.fontColor,
                width: '100%',
                maxWidth: qrValue ? '93%' : '100%',
              }}
            >
              {' '}
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
            className={`flex  h-[50px]  m-2`}
            style={{justifyContent: metafields.footer.justifyContent}}
          >
            <Image className={`!w-20`} src={metafields.footer.data} />
          </div>
        );
      } else {
        return (
          <div
            className={`flex items-start overflow-hidden justify-center h-[50px] w-[100%] px-[2rem]`}
          >
            <span
              className={`flex `}
              style={{
                fontFamily: metafields.footer.fontType,
                fontSize: metafields.footer.fontSize,
                textAlign: metafields.footer.textAlign,
                justifyContent: metafields.footer.justifyContent,
                flexDirection: metafields.footer.flexDirection,
                color: metafields.footer.fontColor,
                width: '100%',
                maxWidth: qrValue ? '93%' : '100%',
              }}
            >
              {' '}
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
  
  useEffect(() => {
    if(!mainMessageBox) return;
    const resizeObserver = new ResizeObserver(processCustomMessageInput);
    resizeObserver.observe(mainMessageBox);

    return () => resizeObserver.disconnect();
  }, [mainMessageBox]);

  useEffect(() => {
    if(!signOffTextBox) return;
    const resizeObserver = new ResizeObserver(processSignOffInput);
    resizeObserver.observe(signOffTextBox);

    return () => resizeObserver.disconnect();
  }, [signOffTextBox]);

 function processCustomMessageInput() {
    mainMessageBox.style.fontSize = '50px'; 
    mainMessageBox.style.lineHeight = '50px';
    resize_to_fit(messageBocContainer, mainMessageBox, "customTextResizing");
  }

  function processSignOffInput() {
    signOffTextBox.style.fontSize = '50px'; 
    signOffTextBox.style.lineHeight = '50px';
    resize_to_fit(signOffBocContainer, signOffTextBox, "signOffResizing");
  }

  function resize_to_fit(outerContainer, innerContainer, resizeSelection) {
    const isOverflowing = innerContainer.clientHeight >= outerContainer.clientHeight;
    console.log({isOverflowing});
    if (!innerContainer || !outerContainer || !isOverflowing) return;
    
    const heightDifference = innerContainer.clientHeight - outerContainer.clientHeight;

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
    innerContainer.style.fontSize = parseFloat(fontSize) - fontSizeDecrement + 'px';
    innerContainer.style.lineHeight = parseFloat(lineHeight) - lineHeightDecrement + 'px';
    if (resizeSelection === "customTextResizing") {
      setFontSize(innerContainer.style.fontSize);
      setLineHeight(innerContainer.style.lineHeight);
    } else if (resizeSelection === "signOffResizing") {
      setSignOffFontSize(signOffTextBox.style.fontSize);
      setSignOffLineHeight(signOffTextBox.style.lineHeight);
    }
    // console.log(innerContainer.clientHeight, outerContainer.clientHeight,"heights");
    if(isOverflowing) resize_to_fit(outerContainer, innerContainer, resizeSelection);
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
        let ab = cleanedArray.map((item) => {
          const newData = {...item};
          // console.log(Object.keys(newData),'OOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
          delete newData['"Type"'];
          return newData;
        });

        // console.log(ab, 'fiteredDatat,=========');
        setSelectedFile(file); // Update the selected file state
        setFileData(ab);
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
      }
    }
    setErrorVal(errMsg);
    setUsAddress(usCount);
    setnonUsAddress(nonUSCount);
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
      console.log(error, 'file upload error');
      setLoader(false);
    }
  }
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
      console.log(error, 'error at Ai generated message ');
    }
  }
  async function onChnageNameVal(nameData) {
    setName(nameData);
    // processInput();
  }
  async function onchnageOfRegardBox(data) {
    setName2(data);
    // processInput2();
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
    loadTempDataFilter = ref5.current?.value
    customerid = localStorage.getItem('customerId');
    savedMsg = JSON.parse(localStorage.getItem('reqFielddInCart'));
    setName(savedMsg ? savedMsg.msg : EditMess ? EditMess : '');
    setName2(savedMsg ? savedMsg.signOffText : editEndMess ? editEndMess : '');
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
    console.log(ref4.current, 'OOOOOOOO');

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
  }, [addressForm, loadAddress]);
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
        console.log(json, 'addNewTemplateFunc');
      }
    } catch (error) {
      console.log(error, 'add new Template');
    }
  }
  function AddNewTemplate() {
    return (
      <div className="w-[29rem] m-[2rem]">
        <div>
          <h1 className="text-[28px] text-[#001a5f] font-karla">
            NEW TEMPLATE
          </h1>
        </div>
        <div>
          <input type="text" ref={ref4} value={tempVal} />
        </div>
        {errorTemplate && (
          <span className="text-[red] font-karla">
            Please Check the Value is empty
          </span>
        )}
        <div>
          <DynamicButton
            className="bg-[#1b5299] text-[14px] mb-6 w-[9rem] mt-4"
            onClickFunction={() => addNewTemplateFunc()}
            text="Save template"
          />
          <DynamicButton
            className="bg-[gray] text-[14px] mb-6 w-[9rem]"
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
      console.log(json.result,")))))))))");
    } catch (error) {
      console.log(error, 'savedTemp');
    }
  }
  const filteredList = (loadTempData, searchData) => {
    console.log(searchData,"searchData");
    return loadTempData
        .filter(dataobj => bySearch(dataobj, searchData));

};

const bySearch = (dataobj, searchData) => {
    // console.log(Object.values(dataobj),'+++++++++++++++');
    if (searchData) {
        return Object.values(dataobj).some(field =>
            // console.log(s,'!!!!!!!!!!!!!!!!!!!!!!');
            field.toString().toLowerCase().includes(searchData.toLowerCase()))
    } else return dataobj;

};
  function changeLoadTempHandler(e){
    console.log(e.target.value);
    console.log(ref5.current?.value,"ref5");
    loadTempDataFilter = ref5.current?.value
    setsearchData(e.target.value)
  }
  function setStateForFIlter(){
    setsearchData(ref5.current?.value)
  }
  function LoadTemplate() {
  const [searchData, setsearchData] = useState(null);

    return (
      <>
        <div className=" w-[29rem] m-[2rem]">
          <div>
            <h1 className="text-[28px] text-[#001a5f] font-karla">
              SELECT TEMPLATE
            </h1>
          </div>
          <div>
        <input type="text" className='w-full rounded p-3 mt-4 bg-[#e8e8ea3d] font-karla' placeholder='search Template...' ref={ref5} onChange={(e)=>setsearchData(e.target.value)}/>
      </div>
          <div className="flex justify-between">
            <span>Template Name</span>
            <span>Actions</span>
          </div>
          {loadTempData &&
            filteredList(loadTempData,searchData).map((item) => (
              <div className="border border-black-600 px-[10px] items-center w-full flex">
                <div className="w-full">{item.templateName}</div>
                <div className="w-full flex items-center gap-[11px] justify-end">
                  <img
                    src={TickImg}
                    className="w-[8%] h-[5%] cursor-pointer"
                    onClick={() => setLoadedTemVal(item.customMessage)}
                  />
                  <img
                    src={Del}
                    className="w-[8%] h-[5%] cursor-pointer"
                    onClick={() => deleteTemp(item._id)}
                  />
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
      console.log(json, 'delte Temp response');
      setOnDelTemp(!onDelTemp);
    } catch (error) {
      console.log(error, 'delete Template');
    }
  }
  useEffect(() => {
    SavedTemp();
  }, [onDelTemp]);
  return (
    <>
      <div className="mainDivForBox flex gap-10">
        <div
          id="outer"
          className="outerr h-[480px] w-[100%] bg-white max-w-[600px] relative"
        >
          {metafields && metafields.isHeaderIncluded && <ShowHeaderComp />}
          <div
            className="outerSec h-[250px] w-[100%] bg-white max-h-[250px]"
            ref={ref2}
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
          <div
            className="secDiv  h-[100px] w-[100%] max-w-[300px] ml-auto bg-white"
            ref={ref}
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
                fontSize:
                  fontSize > signOffFontSize
                    ? signOffFontSize
                    : fontSize
                    ? fontSize
                    : '50px',
                lineHeight:
                  lineHeight > signOffLineHeight
                    ? signOffLineHeight
                    : lineHeight
                    ? lineHeight
                    : '50px',
              }}
            >
              {name2}
            </div>
          </div>
          {metafields && metafields.isFooterIncluded && <ShowFooterComp />}
        </div>
        <div className="textAreaView w-[600px]">
          <textarea
            type="text"
            id="example-one-input"
            value={name}
            placeholder="Enter your custom message text here..."
            className="inputText h-[200px] w-[100%] rounded-[6px] p-[7px] "
            maxlength="450"
            onChange={(e) => onChnageNameVal(e.target.value)}
            data-gtm-form-interact-field-id="0"
          ></textarea>
          <span className="charLeft">{remainingWord} characters remaining</span>
          {customerid &&
          <div className="flex justify-between mt-[1rem]">
            <div>
              <span
                className="font-bold text-[#1b5299] cursor-pointer"
                onClick={() => setAddNewTem(true)}
              >
                Save As New Message Template
              </span>
            </div>
            <div>
              <span
                className="font-bold text-[#1b5299] cursor-pointer"
                onClick={() => SavedTemp() && setLoadTemModal(true)}
              >
                Load Saved Message Template
              </span>
            </div>
          </div>
          }
          <br />
          {checkCharCount && (
            <span className="text-[red] font-bold">
              you don't have enough character remaining
            </span>
          )}
          <br />
          {show && (
            <>
              <button
                className="addFirstnameBtn p-2 m-2"
                value={'[First Name]'}
                onClick={(e) => firstNameBtn(e.target.value)}
              >
                First Name
              </button>
              <button
                className="addFirstnameBtn p-2 m-2"
                value={'[Last Name]'}
                onClick={(e) => firstNameBtn(e.target.value)}
              >
                Last Name
              </button>
              <button
                className="addFirstnameBtn p-2 m-2"
                value={'[Company]'}
                onClick={(e) => firstNameBtn(e.target.value)}
              >
                Company
              </button>
              <button
                className="addFirstnameBtn p-2 m-2"
                value={'[Custom 1]'}
                onClick={(e) => firstNameBtn(e.target.value)}
              >
                Custom 1
              </button>
              <button
                className="addFirstnameBtn p-2 m-2"
                value={'[Custom 2]'}
                onClick={(e) => firstNameBtn(e.target.value)}
              >
                Custom 2
              </button>
              <button
                className="addFirstnameBtn p-2 m-2"
                value={'[Custom 3]'}
                onClick={(e) => firstNameBtn(e.target.value)}
              >
                Custom 3
              </button>
            </>
          )}
          <div className="flex mt-5">
            <div className="flex">
              <img
                src={AiImage}
                className="w-[20%] h-[40%] cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
              <span
                className="cursor-pointer font-karla text-[#1b5299]"
                onClick={() => setIsOpen(true)}
              >
                Try our <span className="text-[red]">New</span> AI Assistant to{' '}
                <br /> help write your message
              </span>
            </div>
            <textarea
              type="text"
              value={name2}
              v-model="keyword"
              id="example-one-input2"
              className="inputText2 h-[100px] w-[50%] rounded-[6px] p-[7px]"
              maxlength="50"
              onChange={(e) => onchnageOfRegardBox(e.target.value)}
              placeholder="Enter here..."
              data-gtm-form-interact-field-id="0"
            ></textarea>
            <br />
          </div>
          <div className="flex justify-end mr-[3.9rem] mt-[1rem]">
            <div>
              <span className="font-karla text-[#1b5299]">
                Optional Sign Off / Signature
              </span>{' '}
              <br />
              <span className="charLeft">
                {remainSign} characters remaining
              </span>
            </div>
          </div>
          {show && (
            <>
              <div className="w-[263px] mt-10 font-bold">
                <text>
                  As of july5,2023, we have upgraded the bulk order
                  template.Please download the new template below
                </text>
              </div>
              <div className="flex gap-4">
                {bulkFileCount && bulkFileCount > 0 ? (
                  <div className="custom_testing pointer-events-none opacity-40">
                    <div>
                      <h3 className="font-bold">Bulk Address Upload</h3>
                    </div>
                    {bulkUploadDiv && !showNextBtn ? (
                      <div>
                        <div>
                          <input
                            type="file"
                            name="file"
                            accept=".csv"
                            className="upload-input"
                            onChange={(e) => handleFileChange(e)}
                          />
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    <p>
                      {' '}
                      Download the
                      <a
                        href="https://api.simplynoted.com/docs/bulk-template"
                        className="text-[blue]"
                      >
                        {' '}
                        Bulk Order Template
                      </a>{' '}
                    </p>
                    <AfterUpload />
                  </div>
                ) : (
                  <>
                    <div className="custom_testing">
                      {loader ? (
                        <CircularLoader color="#ef6e6e" />
                      ) : (
                        <>
                          <div>
                            <h3 className="font-bold">Bulk Address Upload</h3>
                          </div>
                          {bulkUploadDiv && !showNextBtn ? (
                            <div>
                              <div>
                                <input
                                  type="file"
                                  name="file"
                                  accept=".csv"
                                  className="upload-input"
                                  onChange={(e) => handleFileChange(e)}
                                />
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                          <p>
                            {' '}
                            Download the
                            <a
                              href="https://api.simplynoted.com/docs/bulk-template"
                              className="text-[blue]"
                            >
                              {' '}
                              Bulk Order Template
                            </a>{' '}
                          </p>
                          <AfterUpload />
                        </>
                      )}
                    </div>
                  </>
                )}
                <span className="flex items-center font-bold">OR</span>
                <div className="m-auto">
                  <DynamicButton
                    className="bg-[#1b5299] text-[14px] mb-6 w-full"
                    text="Select from Address Book"
                    onClickFunction={() => setModalForAddressBook(true)}
                  />
                  {bulkFileCount && bulkFileCount > 0 ? (
                    <DynamicButton
                      className="bg-[#1b5299] text-[14px] w-full"
                      text="Next"
                      onClickFunction={() => onSelectFromAddressBook()}
                    />
                  ) : (
                    <DynamicButton
                      className="bg-[#697ba6] text-[14px] w-full"
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
            </>
          )}
          {!show && (
            <div className="bg-[#1b5299] h-[50px] text-center mt-10">
              <button
                className="text-[#fff] items-center justify-center mt-3 w-full"
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
                className="bg-[#001a5f] text-[#fff] p-2 rounded "
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
        table={false}
      />
      <Instruction
        isOpen={modalForAddressBook}
        title=""
        closeModal={closeSelectAddressModal}
        table={false}
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
        isOpen={addNewTem}
        title=""
        closeModal={() => setAddNewTem(false)}
        table={false}
        body={<AddNewTemplate />}
      />
      <Instruction
        isOpen={loadTemModal}
        title=""
        closeModal={() => setLoadTemModal(false)}
        table={false}
        body={<LoadTemplate />}
      />
      <LoginModal
        title={' Add Card'}
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
