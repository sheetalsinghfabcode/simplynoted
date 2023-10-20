import {
  BsXCircle,
  require_lib
} from "/build/_shared/chunk-Z2ON2YDZ.js";
import "/build/_shared/chunk-IEDAELJY.js";
import {
  useLoaderData,
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

// app/routes/($locale).carts.jsx
var import_react = __toESM(require_react());
var import_react_modal = __toESM(require_lib());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).carts.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).carts.jsx"
  );
  import.meta.hot.lastModified = "1697800979081.3438";
}
var storedDataString;
function AddCartFunc() {
  _s();
  const {
    data,
    postalData
  } = useLoaderData();
  const [cartData, setCartData] = (0, import_react.useState)("");
  const [updateGift, setUpdateGift] = (0, import_react.useState)(false);
  const [modalIsOpen, setIsOpen] = (0, import_react.useState)(false);
  const [modalIsOpen2, setIsOpen2] = (0, import_react.useState)(false);
  const [cardPriceVal, setCardPriceVal] = (0, import_react.useState)([]);
  const [cardPrice, setCardPrice] = (0, import_react.useState)("");
  const [cardName, setCardName] = (0, import_react.useState)("");
  const [cardVal, setCardVal] = (0, import_react.useState)("");
  const [cardImg, setCardImage] = (0, import_react.useState)("");
  const [postTitle, setPostTitle] = (0, import_react.useState)("");
  const [postTitle2, setPostTitle2] = (0, import_react.useState)("");
  const [postPrice, setPostPrice] = (0, import_react.useState)("");
  const [postPrice2, setPostPrice2] = (0, import_react.useState)("");
  const [postImage, setPostImage] = (0, import_react.useState)("");
  const [senderAddress, setSenderAddress] = (0, import_react.useState)("");
  const [msgShow, setMsgShow] = (0, import_react.useState)("");
  const [msgFont, setMsgFont] = (0, import_react.useState)("");
  const [msglastText, setMsglastText] = (0, import_react.useState)("");
  const [reciverAddress, setReciverAddress] = (0, import_react.useState)("");
  const [bulkAddress, setBulkAddress] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    storedDataString = localStorage.getItem("mydata");
    setCartData(JSON.parse(storedDataString));
    if (postalData) {
      setPostalValue();
    }
  }, [updateGift]);
  function setPostalValue() {
    let postalTit = postalData.product.variants.edges[0].node.title;
    let postalrate = postalData.product.variants.edges[0].node.price.amount;
    let postalTit2 = postalData.product.variants.edges[1].node.title;
    let postalrate2 = postalData.product.variants.edges[1].node.price.amount;
    let postalImag = postalData.product.variants.edges[1].node.image;
    setPostTitle(postalTit);
    setPostTitle2(postalTit2);
    setPostPrice(postalrate);
    setPostPrice2(postalrate2);
    setPostImage(postalImag.url);
  }
  let keyToUpdate1 = "giftCardName";
  let keyToUpdate2 = "giftCardImg";
  let keyToUpdate3 = "giftCardPrice";
  function updateValueInArray(index) {
    console.log(index);
    setUpdateGift(!updateGift);
    if (index >= 0 && index < cartData.length) {
      cartData[index][keyToUpdate1] = cardName;
      cartData[index][keyToUpdate2] = cardImg;
      cartData[index][keyToUpdate3] = cardPrice;
    }
    localStorage.setItem("mydata", JSON.stringify(cartData));
    setCardPrice("");
    setIsOpen(false);
  }
  function deleteKeyInArray(index) {
    setUpdateGift(!updateGift);
    console.log(index);
    if (index >= 0 && index < cartData.length) {
      cartData[index][keyToUpdate1] = null;
      cartData[index][keyToUpdate2] = null;
      cartData[index][keyToUpdate3] = null;
    }
    localStorage.setItem("mydata", JSON.stringify(cartData));
  }
  function deleteOrder(index) {
    setUpdateGift(!updateGift);
    cartData.splice(index, 1);
    console.log(cartData, "deleteOrder");
    localStorage.setItem("mydata", JSON.stringify(cartData));
  }
  function editOrderData(index) {
    let data2 = cartData[index];
    console.log(data2, "data---");
    let ab = cartData[index].productGetUrl;
    navigate(`${ab}`, {
      state: {
        data: data2,
        index
      }
    });
  }
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "620px",
      background: "#FFF6F6",
      width: "100%",
      padding: "30px",
      maxHeight: "500px",
      zIndex: "2",
      position: "relative"
    }
  };
  async function OpenModalFunc(item) {
    setIsOpen(true);
    setCardVal(item);
  }
  async function OpenModalFunc2(item) {
    console.log(item);
    setIsOpen2(true);
    if (cartData[item].csvBulkData.length) {
      console.log("bulkAddress");
      setBulkAddress(cartData[item].csvBulkData);
      setMsgFont(cartData[item].fontFamily);
      setMsgShow(cartData[item].messageData);
      setMsglastText(cartData[item].endText);
    } else {
      setMsgFont(cartData[item].fontFamily);
      setMsgShow(cartData[item].messageData);
      setReciverAddress(cartData[item].reciverAddress);
      setMsglastText(cartData[item].endText);
    }
  }
  const cardvalFunc = async (item) => {
    console.log(item, "cardVal-----");
    let selCardName = data.collection.products.edges[item].node;
    console.log(selCardName, "selCardName--");
    setCardName(selCardName.title);
    setCardImage(selCardName.featuredImage.url);
    let arrCardPrice = data.collection.products.edges[item].node.variants.edges;
    console.log(arrCardPrice[0].node.price.amount, "---------abababababaababab");
    let firstPrice = arrCardPrice[0].node.price.amount;
    setCardPrice(firstPrice);
    setCardPriceVal(arrCardPrice);
  };
  const priceValFunc = async (item) => {
    console.log(item, "PriceVAl");
    setCardPrice(item);
  };
  function closeModal() {
    setBulkAddress([]);
    setIsOpen2(false);
  }
  const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNextClick = () => {
    if (currentIndex < bulkAddress.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full h-full gap-2 mt-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center font-bold text-4xl", children: "SHOPPING CART" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 225,
        columnNumber: 17
      }, this),
      cartData && cartData.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[1000px]  bg-[white] m-auto mt-10 mb-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[700px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: item.productImg, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 231,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 230,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[100%]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: item.productTitle }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 235,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 235,
                columnNumber: 73
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 235,
                columnNumber: 79
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Sender: ",
                item.senderAddress.address1,
                ",",
                item.senderAddress.city,
                ",",
                item.senderAddress.state,
                ",",
                item.senderAddress.country
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 236,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#EF6E6E] text-[#fff] p-2 rounded", onClick: () => OpenModalFunc2(index), children: "PREVIEW YOUR CUSTOM MESSAGE" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 238,
                columnNumber: 45
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 237,
                columnNumber: 41
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 234,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 229,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 228,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.price }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 249,
                columnNumber: 54
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 249,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 248,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.csvFileLen }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 252,
                columnNumber: 57
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 252,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 251,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              item.price * item.csvFileLen
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 255,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 254,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 247,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 246,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] m-4", children: [
            item.giftCardName !== null ? "" : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded", onClick: () => OpenModalFunc(index), children: "ADD GIFT CART" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 261,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 260,
              columnNumber: 68
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => editOrderData(index), children: "EDIT ORDER" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 265,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 264,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded", onClick: () => deleteOrder(index), children: "DELETE ORDER" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 268,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 267,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 259,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 227,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[1000px] h-[2px] bg-[red]" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 272,
          columnNumber: 25
        }, this),
        item.giftCardName ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: item.giftCardImg, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 277,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 276,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: item.giftCardName }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 280,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 280,
                columnNumber: 77
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 280,
                columnNumber: 83
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 279,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 275,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 274,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.giftCardPrice }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 288,
                columnNumber: 58
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 288,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 287,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.csvFileLen }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 291,
                columnNumber: 61
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 291,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 290,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              item.giftCardPrice * item.csvFileLen
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 294,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 293,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 286,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 285,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] m-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => deleteKeyInArray(index), children: "DELETE CARD" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 300,
            columnNumber: 41
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 299,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 298,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 273,
          columnNumber: 46
        }, this) : "",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[1000px] h-[2px] bg-[red]" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 304,
          columnNumber: 25
        }, this),
        item.usCount || item.nonUSCount ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          item.nonUSCount ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: postImage, alt: "" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 312,
                columnNumber: 53
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 311,
                columnNumber: 49
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                  "Postal ",
                  postTitle2
                ] }, void 0, true, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 315,
                  columnNumber: 53
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 315,
                  columnNumber: 85
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 315,
                  columnNumber: 91
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 314,
                columnNumber: 49
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 310,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 309,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Price:",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: postPrice2 }, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 322,
                  columnNumber: 66
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 322,
                columnNumber: 53
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 321,
                columnNumber: 49
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Quantity:",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.nonUSCount }, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 325,
                  columnNumber: 69
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 325,
                columnNumber: 53
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 324,
                columnNumber: 49
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Subtotal:",
                postPrice2 * item.nonUSCount
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 328,
                columnNumber: 53
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 327,
                columnNumber: 49
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 320,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 319,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 308,
            columnNumber: 52
          }, this) : "",
          item.usCount ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: postImage, alt: "" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 337,
                columnNumber: 49
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 336,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                  "Postal ",
                  postTitle
                ] }, void 0, true, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 340,
                  columnNumber: 49
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 340,
                  columnNumber: 80
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 340,
                  columnNumber: 86
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 339,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 335,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 334,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Price:",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: postPrice }, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 347,
                  columnNumber: 62
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 347,
                columnNumber: 49
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 346,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Quantity:",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.usCount }, void 0, false, {
                  fileName: "app/routes/($locale).carts.jsx",
                  lineNumber: 350,
                  columnNumber: 65
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 350,
                columnNumber: 49
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 349,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                " Subtotal:",
                postPrice * item.usCount
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 353,
                columnNumber: 49
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 352,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 345,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 344,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 333,
            columnNumber: 49
          }, this) : ""
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 306,
          columnNumber: 60
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: item.reciverAddress?.country === "USA" || item.reciverAddress?.country?.toLowerCase() === "" || item.reciverAddress?.country?.toLowerCase() === " " || item.reciverAddress?.country?.toLowerCase() === "u.s.a" || item.reciverAddress?.country?.toLowerCase() === "u.s" || item.reciverAddress?.country?.toLowerCase() === "usa" || item.reciverAddress?.country?.toLowerCase() === "us" || item.reciverAddress?.country?.toLowerCase() === "america" || item.reciverAddress?.country?.toLowerCase() === "united states" || item.reciverAddress?.country?.toLowerCase() === "united states of america" || item.reciverAddress?.country?.toLowerCase() == void 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: postImage, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 366,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 365,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                "Postal ",
                postTitle
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 369,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 369,
                columnNumber: 84
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 369,
                columnNumber: 90
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 368,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 364,
            columnNumber: 45
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 363,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: postPrice }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 376,
                columnNumber: 66
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 376,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 375,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.csvFileLen }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 379,
                columnNumber: 69
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 379,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 378,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              postPrice * item.csvFileLen
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 382,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 381,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 374,
            columnNumber: 45
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 373,
            columnNumber: 41
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 362,
          columnNumber: 679
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: postImage, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 390,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 389,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                "Postal",
                postTitle2
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 393,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 393,
                columnNumber: 84
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 393,
                columnNumber: 90
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 392,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 388,
            columnNumber: 45
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 387,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: postPrice2 }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 400,
                columnNumber: 66
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 400,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 399,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.csvFileLen }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 403,
                columnNumber: 69
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 403,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 402,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              postPrice2 * item.csvFileLen
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 406,
              columnNumber: 53
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 405,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 398,
            columnNumber: 45
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 397,
            columnNumber: 41
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 386,
          columnNumber: 46
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 361,
          columnNumber: 35
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 226,
        columnNumber: 60
      }, this))
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 224,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react_modal.default, { isOpen: modalIsOpen, style: customStyles, contentLabel: "Example Modal", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-2xl w-[600px] text-center", children: "Add a Gift Card" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 420,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BsXCircle, { className: "", onClick: () => setIsOpen(false) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 421,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 419,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row  mr-2 ml-2 ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Card:" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 425,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "w-full", onChange: (e) => cardvalFunc(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "w-full", children: " Select Gift Card" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 428,
              columnNumber: 33
            }, this),
            data.collection.products.edges.map((item, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i, children: item.node.title }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 429,
              columnNumber: 82
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 427,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 426,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 424,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row  mr-2 ml-2 ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Price:" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 434,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: cardPriceVal && cardPriceVal.length ? (
            // <div>heelooo</div>
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "", id: "", className: "w-full", onChange: (e) => priceValFunc(e.target.value), children: cardPriceVal.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: item.node.price.amount, children: item.node.title }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 439,
              columnNumber: 63
            }, this)) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 438,
              columnNumber: 13
            }, this)
          ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "", id: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Price Card" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 443,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 442,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 435,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 433,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => updateValueInArray(cardVal), children: "Add Gift Card" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 448,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 447,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 423,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 418,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react_modal.default, { isOpen: modalIsOpen2, style: customStyles, contentLabel: "Example Modal", children: bulkAddress.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BsXCircle, { className: "absolute right-10 cursor-pointer", onClick: () => closeModal() }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 454,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handlePrevClick, className: "absolute top-[130px]", children: "Previous" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 455,
        columnNumber: 25
      }, this),
      bulkAddress && bulkAddress.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: index === currentIndex ? "block" : "none"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: " text-xl text-center", children: [
          "Recipient:  ",
          item["First Name"],
          ",",
          item["Last Name"],
          ",",
          item["Address"],
          ",",
          item["City"],
          ",",
          item["State/Province"]
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 461,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-2xl w-[600px] text-center mt-3", children: "Your Custom Message" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 464,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px] items-center bg-[#fff] h-[100px] mt-5 ml-[70px] p-[10px]", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: " w-[600px]", style: {
            fontFamily: msgFont
          }, children: [
            " ",
            item.msgData
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 466,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 468,
            columnNumber: 40
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: " text-center w-[600px] ml-10", style: {
            fontFamily: msgFont
          }, children: msglastText }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 469,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 465,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
          "Font: ",
          msgFont
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 474,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 473,
          columnNumber: 25
        }, this)
      ] }, index, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 458,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 456,
        columnNumber: 74
      }, this)),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "absolute right-10 bottom-[95px]", onClick: handleNextClick, children: "Next" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 479,
        columnNumber: 31
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 453,
      columnNumber: 39
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[600px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: " text-xl text-center", children: [
          "Recipient: ",
          reciverAddress.firstName,
          ",",
          reciverAddress.address1,
          ",",
          reciverAddress.city,
          ",",
          reciverAddress.country
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 484,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 483,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BsXCircle, { className: "cursor-pointer", onClick: () => closeModal() }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 487,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 482,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-2xl w-[600px] text-center mt-3", children: "Your Custom Message" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 489,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px] items-center bg-[#fff] h-[70px] mt-5 ml-[70px] p-[10px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: "text-2xl w-[600px]", style: {
          fontFamily: msgFont
        }, children: [
          " ",
          msgShow
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 491,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 493,
          columnNumber: 31
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: "text-2xl text-center w-[600px] ml-10", style: {
          fontFamily: msgFont
        }, children: msglastText }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 494,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 490,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
        "Font: ",
        msgFont
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 499,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 498,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 481,
      columnNumber: 27
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 452,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).carts.jsx",
    lineNumber: 223,
    columnNumber: 10
  }, this);
}
_s(AddCartFunc, "f5kDHKLArh1nu9GtwDjMJRC9zbM=", false, function() {
  return [useLoaderData, useNavigate];
});
_c = AddCartFunc;
var _c;
$RefreshReg$(_c, "AddCartFunc");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AddCartFunc as default
};
//# sourceMappingURL=/build/routes/($locale).carts-MWJ6V4YB.js.map
