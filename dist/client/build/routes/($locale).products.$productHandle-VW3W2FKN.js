import {
  BsXCircle,
  GenIcon,
  require_lib
} from "/build/_shared/chunk-Z2ON2YDZ.js";
import {
  MEDIA_FRAGMENT,
  PRODUCT_CARD_FRAGMENT
} from "/build/_shared/chunk-643JJXO2.js";
import {
  require_seo
} from "/build/_shared/chunk-PA7CGJSA.js";
import "/build/_shared/chunk-AUYLHJJM.js";
import {
  Heading,
  IconClose,
  Link,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  clsx_m_default,
  ve
} from "/build/_shared/chunk-GOQTW4BK.js";
import "/build/_shared/chunk-UQLQSQUR.js";
import "/build/_shared/chunk-YOSDW4RD.js";
import "/build/_shared/chunk-IEDAELJY.js";
import "/build/_shared/chunk-4BGUX6VE.js";
import "/build/_shared/chunk-GZRC5YLW.js";
import "/build/_shared/chunk-VROBH53W.js";
import {
  Await,
  useLoaderData,
  useLocation,
  useNavigate
} from "/build/_shared/chunk-M7ZELIPT.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UHAUI7PR.js";
import {
  require_react
} from "/build/_shared/chunk-BVWHYGSQ.js";
import {
  createHotContext
} from "/build/_shared/chunk-QLMTPHJM.js";
import "/build/_shared/chunk-LSHG36UU.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).products.$productHandle.jsx
var import_react4 = __toESM(require_react());
var import_seo = __toESM(require_seo());
var import_react7 = __toESM(require_react());
var import_react_modal2 = __toESM(require_lib());

// app/components/products/MessageWrite.jsx
var import_react = __toESM(require_react());
var import_react_modal = __toESM(require_lib());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\products\\\\MessageWrite.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\products\\MessageWrite.jsx"
  );
  import.meta.hot.lastModified = "1697808072504.5115";
}
var input;
var input2;
var output;
var output2;
var outputContainer;
var outputContainer2;
var customerid;
function MessageWriting({
  show,
  selectedFile,
  setSelectedFile,
  setShowBox,
  setProductShow,
  EditMess,
  editEndMess
}) {
  _s();
  let [name, setName] = (0, import_react.useState)(EditMess ? EditMess : "");
  const [name2, setName2] = (0, import_react.useState)(editEndMess ? editEndMess : "");
  const [fileData, setFileData] = (0, import_react.useState)([]);
  const [valToGen, setValToGen] = (0, import_react.useState)("");
  const [modalIsOpen, setIsOpen] = (0, import_react.useState)(false);
  const [aiText, setaiText] = (0, import_react.useState)("");
  const [modalIsOpen2, setIsOpen2] = (0, import_react.useState)(false);
  const [errorVal, setErrorVal] = (0, import_react.useState)([]);
  const [clickedItem, setClickedItem] = (0, import_react.useState)(false);
  const [showNextBtn, setShowNextBtn] = (0, import_react.useState)(false);
  const [csvFile, setCsvFile] = (0, import_react.useState)("");
  const [bulkUploadDiv, setbulkUploadDiv] = (0, import_react.useState)(true);
  const [lenCsvData, setLenCsvData] = (0, import_react.useState)("");
  const [usAddress, setUsAddress] = (0, import_react.useState)(null);
  const [nonusAddress, setnonUsAddress] = (0, import_react.useState)(null);
  input2 = document.querySelector(".inputText2");
  output2 = document.querySelector(".output2");
  outputContainer2 = document.querySelector(".secDiv");
  const maxMessCount = 450;
  const remainingWord = maxMessCount - name.length;
  const maxSignCount = 50;
  const remainSign = maxSignCount - name2.length;
  const customStyles = {
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "620px",
      background: "#fff",
      width: "100%",
      padding: "30px",
      maxHeight: "500px",
      zIndex: "2",
      position: "relative"
    }
  };
  async function checkUserLogged() {
    if (!customerid) {
      alert("please Login First");
    } else if (name.length == 0) {
      alert("Message Can not be empty ");
    } else {
      let reqField;
      let checkWord = "[First Name]";
      let checkWord2 = "[Last Name]";
      if (fileData.length) {
        fileData.map((obj) => {
          let subName = name;
          if (obj["First Name"]) {
            subName = subName.replace(/\[First Name\]/g, obj["First Name"]);
          }
          if (obj["Last Name"]) {
            subName = subName.replace(/\[Last Name\]/g, obj["Last Name"]);
          }
          obj.msgData = subName;
        });
        console.log(fileData, "fileData");
        reqField = {
          msg: name,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
          csvFileLen: lenCsvData ? lenCsvData : "1",
          usCount: usAddress,
          nonUsCount: nonusAddress,
          bulkCsvData: fileData
        };
      } else {
        reqField = {
          msg: name,
          signOffText: name2,
          csvFileBulk: csvFile ? csvFile : null,
          csvFileLen: lenCsvData ? lenCsvData : "1",
          usCount: usAddress,
          nonUsCount: nonusAddress,
          bulkCsvData: fileData ? fileData : null
        };
      }
      localStorage.setItem("reqFielddInCart", JSON.stringify(reqField));
      setProductShow(false);
      console.log(name, "namefield");
    }
  }
  function AfterUpload() {
    if (selectedFile) {
      setShowBox(false);
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: showNextBtn ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-[#1b5299] h-[50px] text-center mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-[#fff] items-center justify-center mt-3 w-full", onClick: () => checkUserLogged(), children: "Next" }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 150,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 149,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
          " Number of recipient Uploaded:",
          lenCsvData
        ] }, void 0, true, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 152,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 148,
        columnNumber: 36
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#ef6e6e] text-[#fff] p-2 rounded", onClick: () => uploadCsvFile(), children: "Upload" }, void 0, false, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 153,
        columnNumber: 31
      }, this) }, void 0, false, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 147,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 146,
        columnNumber: 14
      }, this);
    } else {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {}, void 0, false, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 160,
        columnNumber: 14
      }, this);
    }
  }
  if (input) {
    input.addEventListener("input", processInput);
  }
  function resize_to_fit() {
    let fontSize = window.getComputedStyle(output).fontSize;
    output.style.fontSize = parseFloat(fontSize) - 1 + "px";
    if (output.clientHeight >= outputContainer.clientHeight) {
      resize_to_fit();
    }
  }
  async function processInput() {
    output.innerHTML = await this.value;
    output.style.fontSize = "50px";
    resize_to_fit();
  }
  function resize_to_fit2() {
    let fontSize = window.getComputedStyle(output2).fontSize;
    output2.style.fontSize = parseFloat(fontSize) - 1 + "px";
    if (output2.clientHeight >= outputContainer2.clientHeight) {
      resize_to_fit2();
    }
  }
  async function processInput2() {
    output2.innerHTML = await this.value;
    output2.style.fontSize = output.style.fontSize;
    resize_to_fit2();
  }
  if (input2) {
    input2.addEventListener("input", processInput2);
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const keyToRemove = "Type";
      reader.onload = (e) => {
        const csvData = e.target.result;
        let jsonData = csvToJson(csvData);
        console.log(jsonData, "jsonData^^^^^^^^^^^^^^^^^");
        const cleanedArray = jsonData.map((obj) => {
          const cleanedObj = {};
          Object.keys(obj).forEach((key) => {
            const newKey = key.replace(/"/g, "");
            const newValue = obj[key].replace(/"/g, "");
            cleanedObj[newKey] = newValue;
          });
          return cleanedObj;
        });
        console.log(cleanedArray, "cleaned Array");
        let ab = cleanedArray.map((item) => {
          const newData = {
            ...item
          };
          delete newData['"Type"'];
          return newData;
        });
        console.log(ab, "fiteredDatat,=========");
        setSelectedFile(file);
        setFileData(ab);
      };
      reader.readAsText(file);
    }
  };
  function csvToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var currentLine = lines[i].split(",");
      if (currentLine.length === 1 && currentLine[0].trim() === "") {
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
    let aa = [];
    let usCount = 0;
    let nonUSCount = 0;
    let found = false;
    let replacedMsg = [];
    setbulkUploadDiv(false);
    if (!fileData.length) {
      aa.push("it is empty please add addresses");
      setErrorVal(aa);
      setIsOpen2(true);
      setTimeout(() => setIsOpen2(false), 3e3);
      return;
    } else {
      console.log(fileData.length, "=====");
      setLenCsvData(fileData.length);
    }
    let reqField = ["First Name", "Last Name", "Address", "City", "State/Province", "Postal Code"];
    const alphabetPattern = /^[A-Za-z]+$/;
    const mailText = /@.*\.com$/;
    for (let index = 0; index < fileData.length; index++) {
      const obj = fileData[index];
      console.log(obj["First Name"], "Name data");
      const emptyKeys = [];
      const numkeys = [];
      let targetField = "First Name";
      let emailValid = "Email";
      let countryCheck = "Country";
      for (const key of reqField) {
        if (obj[key] === "") {
          emptyKeys.push(key);
        }
      }
      if (alphabetPattern.test(obj[targetField]) == false) {
        aa.push(`'${targetField}' at row ${index} includes a number.`);
        console.log(`Index: ${index}, '${targetField}' includes a number.`);
      }
      if (obj[countryCheck] === "USA" || obj[countryCheck].toLowerCase() === "" || obj[countryCheck].toLowerCase() === " " || obj[countryCheck].toLowerCase() === "u.s.a" || obj[countryCheck].toLowerCase() === "u.s" || obj[countryCheck].toLowerCase() === "usa" || obj[countryCheck].toLowerCase() === "us" || obj[countryCheck].toLowerCase() === "america" || obj[countryCheck].toLowerCase() === "united states" || obj[countryCheck].toLowerCase() === "united states of america" || obj[countryCheck].toLowerCase() == void 0) {
        usCount++;
      } else {
        nonUSCount++;
      }
      if (mailText.test(obj[emailValid]) == false) {
        aa.push(`Index: ${index}, 'email' is not valid (missing @ or not ending with .com).`);
        console.log(`Index: ${index}, 'email' is not valid (missing @ or not ending with .com).`);
      }
      if (emptyKeys.length > 0) {
        aa.push(` ${emptyKeys.join(", ")} is empty please check at row ${index}`);
        console.log(`Index: ${index}, Empty Keys: [${emptyKeys.join(", ")}]`, numkeys);
      }
      if (aa.length > 0) {
        setIsOpen2(true);
        setTimeout(() => setIsOpen2(false), 3e3);
        found = true;
      }
    }
    setErrorVal(aa);
    setUsAddress(usCount);
    setnonUsAddress(nonUSCount);
    console.log(replacedMsg, "replacedMsg");
    if (found) {
      console.log(`Found  in the array.`);
    } else {
      console.log(` not found in the array.`);
      uploadCsvFileOnClick();
    }
  }
  async function uploadCsvFileOnClick() {
    try {
      console.log("uploadCsvFile OnClick");
      const res = await fetch("https://api.simplynoted.com/api/orders/bulk-orders-upload-s3", {
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNiYjVhOTAwODcwZjFmMjQ3OGRjNjkiLCJ1c2VyIjp7ImVtYWlsIjoiZmFicHJvamVjdG1hbmFnZXJAZ21haWwuY29tIiwic2hvcGlmeUlkIjoiNjIzMjYyMjg5MTExMyIsIl9pZCI6IjY0M2JiNWE5MDA4NzBmMWYyNDc4ZGM2OSIsImZpcnN0X25hbWUiOiJQcmFkZWVwIiwibGFzdF9uYW1lIjoic2luZ2gifSwiaWF0IjoxNjkwNDQwNDY0fQ.5s5g9A2PtZ8Dr5dQZsd0D9wWTT2BzDioqDXzTbIJPko"
        },
        body: JSON.stringify(fileData)
      });
      const json = await res.json();
      setCsvFile(json.result);
      console.log(json, "CSV UPLOAD DATA ---------------");
      if (json.result) {
        setShowNextBtn(true);
      }
    } catch (error) {
      console.log(error, "file upload error");
    }
  }
  async function onCancl() {
    setIsOpen(false);
    setValToGen(null);
    setaiText(null);
    setValue("abbabbbbb");
  }
  async function onInsetClick() {
    output.style.fontSize = "20px";
    setName(aiText);
    setIsOpen(false);
    setaiText("");
    setValToGen(null);
  }
  async function aiGenrateMess() {
    try {
      const res = await fetch("https://api.simplynoted.com/api/ai-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NDNjZjBiNDAwODcwZjFmMjQ3OTA5ODUiLCJ1c2VyIjp7ImVtYWlsIjoia2FyYW5AdGhlZmFiY29kZS5vcmciLCJzaG9waWZ5SWQiOiI2MjMzNjE5MTAzODQ5IiwiX2lkIjoiNjQzY2YwYjQwMDg3MGYxZjI0NzkwOTg1IiwiZmlyc3RfbmFtZSI6InRlc3RlciIsImxhc3RfbmFtZSI6InRlc3RlciJ9LCJpYXQiOjE2ODE3MzIxNTd9.wFzXMBbN3mSy8nDIlczfkp6m_r1nshHGLCFuLz81Bkc"
        },
        body: JSON.stringify({
          msg: valToGen
        })
      });
      const json = await res.json();
      setaiText(json.message);
      console.log(json.message, "AiGenrated Response____________");
    } catch (error) {
      console.log(error, "error at Ai generated message ");
    }
  }
  async function onChnageNameVal(nameData) {
    setName(nameData);
    console.log(nameData, "nameData----");
  }
  async function onchnageOfRegardBox(data) {
    setName2(data);
  }
  const ref = (0, import_react.useRef)(null);
  const ref1 = (0, import_react.useRef)(null);
  const ref2 = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    input = ref.current;
    output = ref1.current;
    outputContainer = ref2.current;
    customerid = localStorage.getItem("customerId");
  }, []);
  async function firstNameBtn(data) {
    console.log(data);
    setName((prevString) => prevString + data);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mainDivForBox flex gap-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "outer", className: "outerr", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "outerSec", ref: ref2, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd", ref: ref1, className: "output m-5 ", children: name }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 419,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 418,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "secDiv", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "abcd2", className: "output2", children: name2 }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 424,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 423,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 417,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "textAreaView w-[600px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "example-one-input", value: name, placeholder: "Enter your custom message text here...", className: "inputText", maxlength: "450", onInput: (e) => setName(e.target.value) }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 431,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "charLeft", children: [
          remainingWord,
          " characters remaining"
        ] }, void 0, true, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 434,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 434,
          columnNumber: 91
        }, this),
        show && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "addFirstnameBtn p-2 m-2", value: "[First Name]", onClick: (e) => firstNameBtn(e.target.value), children: "First Name" }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 436,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "addFirstnameBtn p-2", value: "[Last Name]", onClick: (e) => firstNameBtn(e.target.value), children: "Last Name" }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 438,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 435,
          columnNumber: 30
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-4 mt-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: "cursor-pointer", onClick: () => setIsOpen(true), children: [
            "Try our new AI Assistant to ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 442,
              columnNumber: 118
            }, this),
            " help write your message"
          ] }, void 0, true, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 442,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", value: name2, "v-model": "keyword", id: "example-one-input2", className: "inputText2", maxlength: "50", onChange: (e) => onchnageOfRegardBox(e.target.value), placeholder: "Enter here...", "data-gtm-form-interact-field-id": "0" }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 443,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 444,
            columnNumber: 36
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 441,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "charLeft ml-40", children: [
          remainSign,
          " characters remaining"
        ] }, void 0, true, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 446,
          columnNumber: 21
        }, this),
        show && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[263px] mt-10 font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: "As of july5,2023, we have upgraded the bulk order template.Please download the new template below" }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 449,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 448,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "custom_testing", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-bold", children: "Bulk Address Upload" }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 454,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 453,
              columnNumber: 33
            }, this),
            bulkUploadDiv ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "file", name: "file", accept: ".csv", className: "upload-input", onChange: (e) => handleFileChange(e) }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 458,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 457,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 456,
              columnNumber: 50
            }, this) : "",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
              " Download the",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://api.simplynoted.com/docs/bulk-template", className: "text-[blue]", children: " Bulk Order Template" }, void 0, false, {
                fileName: "app/components/products/MessageWrite.jsx",
                lineNumber: 462,
                columnNumber: 49
              }, this),
              " "
            ] }, void 0, true, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 462,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AfterUpload, {}, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 463,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 452,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 447,
          columnNumber: 30
        }, this),
        !show && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-[#1b5299] h-[50px] text-center mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-[#fff] items-center justify-center mt-3 w-full", onClick: () => checkUserLogged(), children: "Next" }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 467,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 466,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 430,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/products/MessageWrite.jsx",
      lineNumber: 416,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      import_react_modal.default,
      {
        isOpen: modalIsOpen,
        style: customStyles,
        contentLabel: "Example Modal",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-xl w-[600px]", children: "AI Message Assistant" }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 479,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BsXCircle, { className: "", onClick: () => onCancl() }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 480,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 478,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: " text-[#999999]", children: [
            "Type in words or a phrase to use our AI Assistant to",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 483,
              columnNumber: 107
            }, this),
            " help generate a great message"
          ] }, void 0, true, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 483,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 482,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { type: "text", id: "aiTextArea", value: aiText ? aiText : valToGen, onChange: (e) => setValToGen(e.target.value), placeholder: "Example: Message for Birthday", maxlength: "450" }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 486,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 485,
            columnNumber: 17
          }, this),
          !aiText ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { class: "ai-generate", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "generate-msg", disabled: "", onClick: () => aiGenrateMess(), children: "Generate Message" }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 489,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 488,
            columnNumber: 28
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonClass flex justify-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => onInsetClick(), children: "Insert" }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 492,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 491,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#f0f0f0] text-[black] p-2 rounded ", onClick: () => onCancl(), children: "Cancel" }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 495,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "app/components/products/MessageWrite.jsx",
              lineNumber: 494,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/products/MessageWrite.jsx",
            lineNumber: 490,
            columnNumber: 30
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 474,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      import_react_modal.default,
      {
        isOpen: modalIsOpen2,
        style: customStyles,
        contentLabel: "Example Modal",
        children: errorVal.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: item }, void 0, false, {
          fileName: "app/components/products/MessageWrite.jsx",
          lineNumber: 503,
          columnNumber: 39
        }, this))
      },
      void 0,
      false,
      {
        fileName: "app/components/products/MessageWrite.jsx",
        lineNumber: 499,
        columnNumber: 13
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/components/products/MessageWrite.jsx",
    lineNumber: 415,
    columnNumber: 10
  }, this);
}
_s(MessageWriting, "xNlxVTWDg+8KOrakdwU87h8jOiI=");
_c = MessageWriting;
var _c;
$RefreshReg$(_c, "MessageWriting");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/products/AddCart.jsx
var import_react2 = __toESM(require_react());

// node_modules/react-icons/bi/index.esm.js
function BiSolidChevronLeft(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z" } }] })(props);
}

// app/components/products/AddCart.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\products\\\\AddCart.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\products\\AddCart.jsx"
  );
  import.meta.hot.lastModified = "1697789496164.6094";
}
var customerid2;
var senderAddressVal;
var reciverAddressVal;
var cartDataReq;
function AddCart({
  show,
  setProductShow,
  data,
  productData,
  selectFontValue: selectFontValue2,
  editOrderValue,
  shippingData
}) {
  _s2();
  console.log(shippingData, "shippingData");
  const [returnAddress, setReturnAddress] = (0, import_react2.useState)([]);
  const [recipientAddress, setRecipientAddress] = (0, import_react2.useState)([]);
  const [selectedItem, setSelectedItem] = (0, import_react2.useState)(editOrderValue?.data ? editOrderValue.data.reciverAddress : null);
  const [selectedItem2, setSelectedItem2] = (0, import_react2.useState)(editOrderValue?.data ? editOrderValue.data.senderAddress : null);
  const [selectShipMode, setSelectShipMode] = (0, import_react2.useState)(null);
  const [searchData, setsearchData] = (0, import_react2.useState)(null);
  const [cardVal, setCardVal] = (0, import_react2.useState)("");
  const [cardPriceVal, setCardPriceVal] = (0, import_react2.useState)([]);
  const [cardName, setCardName] = (0, import_react2.useState)(editOrderValue?.data ? editOrderValue.data.giftCardName : "");
  const [cardImg, setCardImg] = (0, import_react2.useState)(editOrderValue?.data ? editOrderValue.data.giftCardImg : "");
  const [cardPrice, setCardPrice] = (0, import_react2.useState)(editOrderValue?.data ? editOrderValue.data.giftCardPrice : "");
  const [MsgText, setMesgtext] = (0, import_react2.useState)("");
  async function getRecipient() {
    try {
      const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid2}&type=recipient`);
      const json = await res.json();
      setRecipientAddress(json.result);
    } catch (error) {
      console.log(error, "Recipient error--------");
    }
  }
  async function getReturn() {
    try {
      const res = await fetch(`https://api.simplynoted.com/api/storefront/addresses?customerId=${customerid2}&type=return`);
      const json = await res.json();
      setReturnAddress(json.result);
    } catch (error) {
      console.log(error, "Recipient error--------");
    }
  }
  const handleCheckboxChange = (item) => {
    console.log(item, "***********item");
    setSelectedItem(item);
  };
  const handleCheckboxChange2 = (item) => {
    console.log(item, "***********item2");
    setSelectedItem2(item);
  };
  const handleBoxoNShipping = (item) => {
    console.log(item, "shippingData----");
    setSelectShipMode(item);
  };
  const filteredList = (recipientAddress2, searchData2) => {
    return recipientAddress2.filter((dataobj) => bySearch(dataobj, searchData2));
  };
  const bySearch = (dataobj, searchData2) => {
    if (searchData2) {
      return Object.values(dataobj).some((field) => (
        // console.log(s,'!!!!!!!!!!!!!!!!!!!!!!');
        field.toString().toLowerCase().includes(searchData2.toLowerCase())
      ));
    } else
      return dataobj;
  };
  const cardvalFunc = async (item) => {
    console.log(item, "cardVal-----");
    setCardVal(item);
    let selCardName = data.collection.products.edges[item].node;
    console.log(selCardName, "selCardName--");
    setCardName(selCardName.title);
    setCardImg(selCardName.featuredImage.url);
    let arrCardPrice = data.collection.products.edges[item].node.variants.edges;
    console.log(arrCardPrice[0].node.price.amount, "---------abababababaababab");
    let firstPrice2 = arrCardPrice[0].node.price.amount;
    setCardPrice(firstPrice2);
    setCardPriceVal(arrCardPrice);
  };
  const priceValFunc = async (item) => {
    console.log(item, "PriceVAl");
    setCardPrice(item ? item : firstPrice);
  };
  const refRec = (0, import_react2.useRef)(null);
  const ref1 = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    reciverAddressVal = refRec.current;
    senderAddressVal = ref1.current;
    customerid2 = localStorage.getItem("customerId");
    cartDataReq = JSON.parse(localStorage.getItem("reqFielddInCart"));
    console.log(cartDataReq, "cartDataReq");
    setMesgtext(cartDataReq.msg);
    getRecipient();
    getReturn();
  }, []);
  function onClickAddCartBtn() {
    let CartData = [];
    if (selectedItem && selectedItem2 && cardName && cardPrice && productData) {
      CartData.push({
        selectedItem,
        selectedItem2,
        cardName,
        cardPrice,
        productData
      });
      console.log("ssssssssss");
      navigate("/carts", {
        state: {
          data: CartData
        }
      });
    } else if (selectedItem && selectedItem2 && productData) {
      CartData.push({
        selectedItem,
        selectedItem2,
        productData
      });
      console.log("ssssssssss");
      navigate("/carts", {
        state: {
          data: CartData
        }
      });
      console.log("ooooooooo");
    } else {
      alert("please Select Address");
    }
  }
  const navigate = useNavigate();
  let arrOfObj = {
    productTitle: productData.product.title ? productData.product.title : null,
    variant_id: productData.id,
    price: productData.price.amount,
    productImg: productData.image.url,
    senderAddress: selectedItem2,
    reciverAddress: selectedItem,
    giftCardName: cardName ? cardName : null,
    giftCardImg: cardImg ? cardImg : null,
    giftCardPrice: cardPrice ? cardPrice : null,
    messageData: MsgText,
    fontFamily: selectFontValue2 ? selectFontValue2 : "tarzan",
    productGetUrl: window.location.pathname,
    endText: cartDataReq?.signOffText,
    csvFileURL: cartDataReq?.csvFileBulk,
    csvFileLen: cartDataReq?.csvFileLen,
    usCount: cartDataReq?.usCount,
    nonUSCount: cartDataReq?.nonUsCount,
    csvBulkData: cartDataReq?.bulkCsvData,
    shippingData: selectShipMode ? selectShipMode : "",
    shippingMethodImage: shippingData ? shippingData.featuredImage.url : ""
  };
  let keyUpdate1 = "messageData";
  let keyUpdate2 = "reciverAddress";
  let keyUpdate3 = "senderAddress";
  let keyUpdate4 = "giftCardImg";
  let keyUpdate5 = "giftCardName";
  let keyUpdate6 = "giftCardPrice";
  let keyUpdate7 = "endText";
  function onClickAddCart() {
    if (editOrderValue?.index >= 0) {
      const storedData = JSON.parse(localStorage.getItem("mydata"));
      console.log(storedData, "storedData");
      if (editOrderValue.index >= 0 && editOrderValue.index < storedData.length) {
        storedData[editOrderValue.index][keyUpdate1] = cartDataReq?.msg ? cartDataReq?.msg : editOrderValue?.data.messageData;
        storedData[editOrderValue.index][keyUpdate2] = selectedItem;
        storedData[editOrderValue.index][keyUpdate3] = selectedItem2;
        storedData[editOrderValue.index][keyUpdate4] = cardImg ? cardImg : null;
        storedData[editOrderValue.index][keyUpdate5] = cardName ? cardName : null;
        storedData[editOrderValue.index][keyUpdate6] = cardPrice;
        storedData[editOrderValue.index][keyUpdate7] = cartDataReq?.signOffText ? cartDataReq?.signOffText : editOrderValue?.data.endText;
      }
      localStorage.setItem("mydata", JSON.stringify(storedData));
      navigate("/carts");
    } else {
      if (cartDataReq && cartDataReq.csvFileLen && selectedItem2) {
        const existingDataString = localStorage.getItem("mydata");
        console.log("cartDataReq");
        let existingDataArray = [];
        if (existingDataString) {
          existingDataArray = JSON.parse(existingDataString);
          localStorage.removeItem("mydata");
        }
        existingDataArray.push(arrOfObj);
        const updatedDataString = JSON.stringify(existingDataArray);
        localStorage.setItem("mydata", updatedDataString);
        navigate("/carts");
      } else if (selectedItem && selectedItem2) {
        const existingDataString = localStorage.getItem("mydata");
        console.log("=-=existingDataString=-=-");
        let existingDataArray = [];
        if (existingDataString) {
          existingDataArray = JSON.parse(existingDataString);
          localStorage.removeItem("mydata");
        }
        existingDataArray.push(arrOfObj);
        const updatedDataString = JSON.stringify(existingDataArray);
        localStorage.setItem("mydata", updatedDataString);
        navigate("/carts");
      } else {
        alert("please select the address");
      }
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "  w-full h-full gap-2 mt-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "items-center font-bold flex text-2xl", onClick: () => setProductShow(true), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BiSolidChevronLeft, { size: "50px" }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 266,
        columnNumber: 107
      }, this),
      "Back To Product Customization"
    ] }, void 0, true, {
      fileName: "app/components/products/AddCart.jsx",
      lineNumber: 266,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row flex mr-2 ml-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-6 w-[50%] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-2xl font-bold mt-4 mb-4", children: "Your Info (return/sender address)" }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 271,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "buttonDiv pr-5 mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-3", children: "New Address" }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 274,
          columnNumber: 37
        }, this) }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 273,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "text ", className: "w-full rounded p-3 mt-4", placeholder: "Search Addresses..." }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 277,
          columnNumber: 37
        }, this) }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 276,
          columnNumber: 33
        }, this),
        returnAddress.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full rounded p-3 mt-4 bg-[#fff] ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", value: item, checked: selectedItem2?._id === item._id, onChange: () => handleCheckboxChange2(item) }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 280,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: [
            "  ",
            item.firstName,
            " ",
            item.lastName,
            ", ",
            item.city,
            ", ",
            item.state,
            ", ",
            item.zip,
            ", ",
            item.country
          ] }, void 0, true, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 281,
            columnNumber: 41
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 279,
          columnNumber: 60
        }, this))
      ] }, void 0, true, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 270,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 269,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 268,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-6 w-[50%]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-grid", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-2xl font-bold mt-4 mb-4", children: "Recipient address" }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 289,
          columnNumber: 33
        }, this),
        show ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("text", { children: "Recipient addresses were specified in your bulk order upload." }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 291,
          columnNumber: 41
        }, this) }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 290,
          columnNumber: 41
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "buttonDiv pr-5 mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-3", children: "New Address" }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 296,
            columnNumber: 45
          }, this) }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 295,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "text", onChange: (e) => setsearchData(e.target.value), className: "w-full rounded p-3 mt-4 ", placeholder: "Search Addresses..." }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 299,
            columnNumber: 45
          }, this) }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 298,
            columnNumber: 41
          }, this),
          filteredList(recipientAddress, searchData).map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-full rounded p-3 mt-4 bg-[#fff] ", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", value: item, checked: selectedItem?._id === item._id, onChange: () => handleCheckboxChange(item), ref: refRec }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 302,
              columnNumber: 49
            }, this),
            item.firstName,
            " ",
            item.lastName,
            ", ",
            item.city,
            ", ",
            item.state,
            ", ",
            item.zip,
            ", ",
            item.country
          ] }, void 0, true, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 301,
            columnNumber: 106
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 294,
          columnNumber: 46
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 288,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 287,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 286,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/products/AddCart.jsx",
      lineNumber: 267,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row flex mr-2 ml-2 gap-4", children: [
      show ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-6 w-[50%] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-grid", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-2xl font-bold mt-4 mb-4", children: shippingData?.title }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 315,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { class: "shipping-methods", id: "shipping-options", children: shippingData?.variants.edges.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { class: "getProductId", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { value: item, checked: selectShipMode === item, type: "radio", name: "radioGroup", onChange: () => handleBoxoNShipping(item) }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 320,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { for: "Mail-Individual-Cards-Normally-(default)", children: item?.node.title }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 321,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 319,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { class: "custom_variant_price", children: [
            "$",
            item?.node.price.amount
          ] }, void 0, true, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 323,
            columnNumber: 37
          }, this)
        ] }, "7027299254377", true, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 318,
          columnNumber: 79
        }, this)) }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 317,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 314,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 313,
        columnNumber: 29
      }, this) : "",
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-6 w-[50%]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-grid mt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-2xl font-bold mt-6 mb-6", children: "Add a Gift Card" }, void 0, false, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 371,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row flex mr-2 ml-2 ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Card:" }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 373,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { className: "w-full", value: "pppppp", onChange: (e) => cardvalFunc(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { className: "w-full", children: "Select Gift Card " }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 376,
              columnNumber: 45
            }, this),
            data.collection.products.edges.map((item, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: i, children: item.node.title }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 377,
              columnNumber: 94
            }, this))
          ] }, void 0, true, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 375,
            columnNumber: 41
          }, this) }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 374,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 372,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row flex mr-2 ml-2 ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Price:" }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 382,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: cardPrice ? (
            // <div>heelooo</div>
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { name: "", id: "", className: "w-full", onChange: (e) => priceValFunc(e.target.value), children: cardPriceVal.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: item.node.price.amount, children: item.node.title }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 387,
              columnNumber: 75
            }, this)) }, void 0, false, {
              fileName: "app/components/products/AddCart.jsx",
              lineNumber: 386,
              columnNumber: 19
            }, this)
          ) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { name: "", id: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Price card" }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 391,
            columnNumber: 49
          }, this) }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 390,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 383,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 381,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", id: "", name: "", value: "" }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 404,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("text", { className: "ml-3", children: "Add Gift Card" }, void 0, false, {
            fileName: "app/components/products/AddCart.jsx",
            lineNumber: 405,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/products/AddCart.jsx",
          lineNumber: 403,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 370,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 369,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/products/AddCart.jsx",
        lineNumber: 368,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/products/AddCart.jsx",
      lineNumber: 312,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-3", onClick: () => onClickAddCart(), children: "Add To Cart" }, void 0, false, {
      fileName: "app/components/products/AddCart.jsx",
      lineNumber: 413,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/components/products/AddCart.jsx",
      lineNumber: 411,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/products/AddCart.jsx",
    lineNumber: 265,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/components/products/AddCart.jsx",
    lineNumber: 264,
    columnNumber: 10
  }, this);
}
_s2(AddCart, "N57z3xkfTCsYxusZTLJdGToqtMU=", false, function() {
  return [useNavigate];
});
_c2 = AddCart;
var _c2;
$RefreshReg$(_c2, "AddCart");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/($locale).products.$productHandle.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).products.$productHandle.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).products.$productHandle.jsx"
  );
  import.meta.hot.lastModified = "1697789411233.4817";
}
var input3;
var customerid3;
var recipientAddressVal;
var selectFontValue;
function Product() {
  _s3();
  const {
    product,
    shop,
    recommended,
    variants,
    data,
    shippingData
  } = useLoaderData();
  console.log(shippingData, "shippingData");
  const datafornav = useLocation();
  let EditMess = datafornav.state?.data?.messageData;
  let editEndMess = datafornav.state?.data.endText;
  let editOrderValue = datafornav.state;
  console.log(datafornav.state, "locationState");
  const {
    media,
    title,
    vendor,
    descriptionHtml
  } = product;
  const {
    shippingPolicy,
    refundPolicy
  } = shop;
  const [show, setShow] = (0, import_react7.useState)(false);
  const [productshow, setProductShow] = (0, import_react7.useState)(true);
  const [modalIsOpen2, setIsOpen2] = (0, import_react7.useState)(false);
  const [showBox, setShowBox] = (0, import_react7.useState)(true);
  const [selectedFile, setSelectedFile] = (0, import_react7.useState)("");
  const [fileData, setFileData] = (0, import_react7.useState)([]);
  const [errorVal, setErrorVal] = (0, import_react7.useState)([]);
  function setFont() {
    var selectFont = document.getElementById("font");
    if (selectFont) {
      selectFontValue = selectFont.options[selectFont.selectedIndex].value;
      if (selectFontValue) {
        document.getElementById("abcd").style.fontFamily = selectFontValue;
        document.getElementById("abcd2").style.fontFamily = selectFontValue;
      }
    }
  }
  const ref = (0, import_react4.useRef)(null);
  const ref3 = (0, import_react4.useRef)(null);
  (0, import_react7.useEffect)(() => {
    input3 = ref.current;
    recipientAddressVal = ref3.current;
    customerid3 = localStorage.getItem("customerId");
  }, []);
  if (recipientAddressVal && recipientAddressVal.value) {
  }
  const customStyles = {
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "620px",
      background: "#fff",
      width: "100%",
      padding: "30px",
      maxHeight: "500px",
      zIndex: "2",
      position: "relative"
    }
  };
  async function singleBtnCLick() {
    setShow(false);
    setSelectedFile("");
    setShowBox(true);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: productshow ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Section, { className: "px-0 md:px-8 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "grid items-start md:gap-6 lg:gap-5 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ProductGallery, { media: media.nodes, className: "w-full lg:col-span-2" }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 235,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll ml-[-300px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("section", { className: "flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Heading, { as: "h1", className: "whitespace-normal", children: title }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 239,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Text, { className: "opacity-50 font-medium", children: [
            "$ ",
            product.variants.nodes[0].price.amount
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 242,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "buttonClass flex justify-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "buttonDiv pr-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => singleBtnCLick(), children: "Single Card" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 248,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 247,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { className: "bg-[#ef6e6e] text-[#fff] p-2 rounded ", onClick: () => setShow(true), children: "Bulk Purchase" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 251,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 250,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 246,
            columnNumber: 21
          }, this),
          show && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("table", { class: "price-breakdown desktop", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tbody", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { class: "label", children: "Quantity" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "1-99" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 60
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "100-249" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 73
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "250-499" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 89
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "500-999" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 105
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "1000-2499" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 121
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "2500+" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 257,
                columnNumber: 139
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 256,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { class: "label", children: "Price" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "$3.25" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 57
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "$3.15" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 71
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "$3.00" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 85
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "$2.85" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 99
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "$2.70" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 113
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "$2.55" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 259,
                columnNumber: 127
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 258,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 255,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 254,
            columnNumber: 30
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "selectOtion mb-5 flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-[192px]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Text, { className: "text-sm w-[100px]", children: "Standard Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 264,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 265,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("select", { id: "font", onClick: () => setFont(), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "pinocchio", className: `font-pinocchio`, children: "Pinocchio" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 267,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "tarzan", className: `font-tarzan`, children: "Tarzan" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 268,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "stitch", className: `font-stitch`, children: "Stitch" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 269,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "simba", className: `font-simba`, children: "Simba" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 270,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "roo", className: `font-roo`, children: "Roo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 271,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "nimo", className: `font-nimo`, children: "Nimo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 272,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "lumiere", className: `font-lumiere`, children: "Lumiere" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 273,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "kaa", className: `font-kaa`, children: "Kaa" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 274,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "kaaNew", className: `font-kaaNew`, children: "KaaNew" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 275,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "dumbo", className: `font-dumbo`, children: "Dumbo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 276,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "donald", className: `font-donald`, children: "Donald" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 277,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "aladdin", className: `font-aladdin`, children: "Aladdin" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 278,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "belle", className: `font-belle`, children: "Belle" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 279,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "boo", className: `font-boo`, children: "Boo" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 280,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "cinderella", className: `font-cinderella`, children: "Cinderella" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 281,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "copper", className: `font-copper`, children: "Copper" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 282,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "jasmine", className: `font-jasmine`, children: "Jasmine" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 283,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "merlin", className: `font-merlin`, children: "Merlin" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 284,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "goofy", className: `font-goofy`, children: "Goofy" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 285,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "hercules", className: `font-hercules`, children: "Hercules" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 286,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "rafiki", className: `font-rafiki`, children: "Rafiki" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 287,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "rapunzel", className: `font-rapunzel`, children: "Rapunzel" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 288,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "ratigan", className: `font-ratigan`, children: "Ratigan" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 289,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "sarabi", className: `font-sarabi`, children: "Sarabi" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 290,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "scar", className: `font-scar`, children: "Scar" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 291,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "triton", className: `font-triton`, children: "Triton" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 292,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { value: "woody", className: `font-woody`, children: "Woody" }, void 0, false, {
                  fileName: "app/routes/($locale).products.$productHandle.jsx",
                  lineNumber: 293,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 266,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 263,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Text, { className: "text-sm", children: "Custom Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 298,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 299,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("select", { id: "Coustomfont text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { className: "text-sm", children: "Custom Handwriting Style" }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 301,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).products.$productHandle.jsx",
                lineNumber: 300,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 297,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 262,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Text, { children: "Optional shipping date" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 306,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("br", {}, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 306,
              columnNumber: 58
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "date" }, void 0, false, {
              fileName: "app/routes/($locale).products.$productHandle.jsx",
              lineNumber: 307,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).products.$productHandle.jsx",
            lineNumber: 305,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 238,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 237,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 236,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 234,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(MessageWriting, { show, selectedFile, setSelectedFile, setShowBox, setProductShow, EditMess, editEndMess }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 352,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 233,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Skeleton, { className: "h-32" }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 355,
      columnNumber: 31
    }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Await, { errorElement: "There was a problem loading related products", resolve: recommended, children: (products) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ProductSwimlane, { title: "Related Products", products }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 357,
      columnNumber: 28
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 356,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 355,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      import_react_modal2.default,
      {
        isOpen: modalIsOpen2,
        style: customStyles,
        contentLabel: "Example Modal",
        children: errorVal.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: item }, void 0, false, {
          fileName: "app/routes/($locale).products.$productHandle.jsx",
          lineNumber: 365,
          columnNumber: 35
        }, this))
      },
      void 0,
      false,
      {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 361,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 232,
    columnNumber: 22
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(AddCart, { show, setProductShow, data, productData: product.variants.nodes[0], selectFontValue, editOrderValue, shippingData: shippingData?.product }, void 0, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 367,
    columnNumber: 15
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 231,
    columnNumber: 10
  }, this);
}
_s3(Product, "OWt/PlvfpgYPfXRC4p9jP9vQPuc=", false, function() {
  return [useLoaderData, useLocation];
});
_c3 = Product;
function ProductDetail({
  title,
  content,
  learnMore
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ve, { as: "div", className: "grid w-full gap-2", children: ({
    open
  }) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ve.Button, { className: "text-left", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Text, { size: "lead", as: "h4", children: title }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 564,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(IconClose, { className: clsx_m_default("transition-transform transform-gpu duration-200", !open && "rotate-[45deg]") }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 567,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 563,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 562,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ve.Panel, { className: "pb-4 pt-2 grid gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "prose dark:prose-invert", dangerouslySetInnerHTML: {
        __html: content
      } }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 572,
        columnNumber: 13
      }, this),
      learnMore && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link, { className: "pb-px border-b border-primary/30 text-primary/50", to: learnMore, children: "Learn more" }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 576,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).products.$productHandle.jsx",
        lineNumber: 575,
        columnNumber: 27
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).products.$productHandle.jsx",
      lineNumber: 571,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 561,
    columnNumber: 11
  }, this) }, title, false, {
    fileName: "app/routes/($locale).products.$productHandle.jsx",
    lineNumber: 558,
    columnNumber: 10
  }, this);
}
_c22 = ProductDetail;
var PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;
var PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;
var VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;
var RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
var _c3;
var _c22;
$RefreshReg$(_c3, "Product");
$RefreshReg$(_c22, "ProductDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Product as default
};
//# sourceMappingURL=/build/routes/($locale).products.$productHandle-VW3W2FKN.js.map
