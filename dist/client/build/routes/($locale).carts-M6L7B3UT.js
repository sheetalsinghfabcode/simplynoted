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
  import.meta.hot.lastModified = "1697628505724.844";
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
    navigate(`${ab}?Quantity=1+-99`, {
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
    setIsOpen2(true);
    setMsgFont(cartData[item].fontFamily);
    setMsgShow(cartData[item].messageData);
    setSenderAddress(cartData[item].senderAddress);
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full h-full gap-2 mt-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center font-bold text-4xl", children: "SHOPPING CART" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 197,
        columnNumber: 17
      }, this),
      cartData && cartData.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[1000px]  bg-[white] m-auto mt-10 mb-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[700px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: item.productImg, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 203,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 202,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[100%]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: item.productTitle }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 207,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 207,
                columnNumber: 73
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 207,
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
                lineNumber: 208,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#EF6E6E] text-[#fff] p-2 rounded", onClick: () => OpenModalFunc2(index), children: "PREVIEW YOUR CUSTOM MESSAGE" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 210,
                columnNumber: 45
              }, this) }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 209,
                columnNumber: 41
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 206,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 201,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 200,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.price }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 221,
                columnNumber: 54
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 221,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 220,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 224,
                columnNumber: 57
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 224,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 223,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              item.price * 1
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 227,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 226,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 219,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 218,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] m-4", children: [
            item.giftCardName !== null ? "" : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded", onClick: () => OpenModalFunc(index), children: "ADD GIFT CART" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 233,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 232,
              columnNumber: 68
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => editOrderData(index), children: "EDIT ORDER" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 237,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 236,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded", onClick: () => deleteOrder(index), children: "DELETE ORDER" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 240,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 239,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 231,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 199,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[1000px] h-[2px] bg-[red]" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 244,
          columnNumber: 25
        }, this),
        item.giftCardName ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: item.giftCardImg, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 249,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 248,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: item.giftCardName }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 252,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 252,
                columnNumber: 77
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 252,
                columnNumber: 83
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 251,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 247,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 246,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.giftCardPrice }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 260,
                columnNumber: 58
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 260,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 259,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 263,
                columnNumber: 61
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 263,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 262,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              item.giftCardPrice * 1
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 266,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 265,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 258,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 257,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] m-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 m-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => deleteKeyInArray(index), children: "DELETE CARD" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 272,
            columnNumber: 41
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 271,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 270,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 245,
          columnNumber: 46
        }, this) : "",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[1000px] h-[2px] bg-[red]" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 276,
          columnNumber: 25
        }, this),
        item.reciverAddress.country === "USA" || item.reciverAddress.country?.toLowerCase() === "" || item.reciverAddress.country?.toLowerCase() === " " || item.reciverAddress.country?.toLowerCase() === "u.s.a" || item.reciverAddress.country?.toLowerCase() === "u.s" || item.reciverAddress.country?.toLowerCase() === "usa" || item.reciverAddress.country?.toLowerCase() === "us" || item.reciverAddress.country?.toLowerCase() === "america" || item.reciverAddress.country?.toLowerCase() === "united states" || item.reciverAddress.country?.toLowerCase() === "united states of america" || item.reciverAddress.country?.toLowerCase() == void 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: postImage, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 281,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 280,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
                "Postal ",
                postTitle
              ] }, void 0, true, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 284,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 284,
                columnNumber: 76
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 284,
                columnNumber: 82
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 283,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 279,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 278,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: postPrice }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 291,
                columnNumber: 58
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
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 294,
                columnNumber: 61
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 294,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 293,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              postPrice * 1
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 297,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 296,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 289,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 288,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 277,
          columnNumber: 660
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex m-5", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[20%] m-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: postImage, alt: "" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 305,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 304,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-[40%] mt-10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: postTitle2 }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 308,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 308,
                columnNumber: 70
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 308,
                columnNumber: 76
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 307,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 303,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 302,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[200px] gap-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "m-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Price:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: postPrice2 }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 315,
                columnNumber: 58
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 315,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 314,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Quantity:",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1" }, void 0, false, {
                fileName: "app/routes/($locale).carts.jsx",
                lineNumber: 318,
                columnNumber: 61
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 318,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 317,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
              " Subtotal:",
              postPrice2 * 1
            ] }, void 0, true, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 321,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 320,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 313,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 312,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 301,
          columnNumber: 38
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 198,
        columnNumber: 60
      }, this))
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 196,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react_modal.default, { isOpen: modalIsOpen, style: customStyles, contentLabel: "Example Modal", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-2xl w-[600px] text-center", children: "Add a Gift Card" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 333,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BsXCircle, { className: "", onClick: () => setIsOpen(false) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 334,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 332,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "address-data", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row  mr-2 ml-2 ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Card:" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 338,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "w-full", onChange: (e) => cardvalFunc(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "w-full", children: " Select Gift Card" }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 341,
              columnNumber: 33
            }, this),
            data.collection.products.edges.map((item, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i, children: item.node.title }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 342,
              columnNumber: 82
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 340,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 339,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 337,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row  mr-2 ml-2 ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-4 mt-4 font-bold w-[190px]", children: "Select Gift Price:" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 347,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-8 mt-3 pr-0 w-[370px]", children: cardPriceVal && cardPriceVal.length ? (
            // <div>heelooo</div>
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "", id: "", className: "w-full", onChange: (e) => priceValFunc(e.target.value), children: cardPriceVal.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: item.node.price.amount, children: item.node.title }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 352,
              columnNumber: 63
            }, this)) }, void 0, false, {
              fileName: "app/routes/($locale).carts.jsx",
              lineNumber: 351,
              columnNumber: 13
            }, this)
          ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "", id: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Price Card" }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 356,
            columnNumber: 37
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 355,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).carts.jsx",
            lineNumber: 348,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 346,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "buttonDiv pr-5 items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-[#001a5f] text-[#fff] p-2 rounded ", onClick: () => updateValueInArray(cardVal), children: "Add Gift Card" }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 361,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 360,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 336,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 331,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react_modal.default, { isOpen: modalIsOpen2, style: customStyles, contentLabel: "Example Modal", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[600px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: " text-xl text-center", children: [
          "Recipient: ",
          senderAddress.firstName,
          ",",
          senderAddress.address1,
          ",",
          senderAddress.city,
          ",",
          senderAddress.country
        ] }, void 0, true, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 368,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 367,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BsXCircle, { className: "", onClick: () => setIsOpen2(false) }, void 0, false, {
          fileName: "app/routes/($locale).carts.jsx",
          lineNumber: 370,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 366,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-bold text-2xl w-[600px] text-center mt-3", children: "Your Custom Message" }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 372,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-[400px] items-center bg-[#fff] h-[50px] mt-5 ml-[70px] p-[10px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { className: "text-xl", style: {
        fontFamily: msgFont
      }, children: [
        " ",
        msgShow
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 374,
        columnNumber: 20
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 373,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { children: [
        "Font: ",
        msgFont
      ] }, void 0, true, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 379,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/routes/($locale).carts.jsx",
        lineNumber: 378,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).carts.jsx",
      lineNumber: 365,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).carts.jsx",
    lineNumber: 195,
    columnNumber: 10
  }, this);
}
_s(AddCartFunc, "z/w2fXLjZeAccrY8GxDeG+Gqxzc=", false, function() {
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
//# sourceMappingURL=/build/routes/($locale).carts-M6L7B3UT.js.map
