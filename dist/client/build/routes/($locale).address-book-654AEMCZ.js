import {
  require_lib
} from "/build/_shared/chunk-LPT5DYTP.js";
import "/build/_shared/chunk-IEDAELJY.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UHAUI7PR.js";
import {
  require_react
} from "/build/_shared/chunk-BVWHYGSQ.js";
import {
  createHotContext
} from "/build/_shared/chunk-M5RZR2GW.js";
import "/build/_shared/chunk-LSHG36UU.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/($locale).address-book.jsx
var import_react3 = __toESM(require_react());

// app/components/ContactDetail.jsx
var import_react = __toESM(require_react());

// assets/image/edit.png
var edit_default = "/build/_assets/edit-UOYXJGUT.png";

// app/components/ContactDetail.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\ContactDetail.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\ContactDetail.jsx"
  );
  import.meta.hot.lastModified = "1696936288297.7996";
}
var ContactDetail = ({
  filteredAddresses,
  editAddress,
  setEditAddress,
  customerID,
  setSelectedAddress
}) => {
  _s();
  const tableHeaders = ["Checkobox", "Item", "Type", "first Name", "last Name", "business Name", "anniversary", "birthday", "state", "country", "zip", "postal code", "address 1", "address 2"];
  const [selectedCheckboxes, setSelectedCheckboxes] = (0, import_react.useState)([]);
  const [selectedType, setSelectedType] = (0, import_react.useState)("all");
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    if (e.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== checkboxValue));
    }
  };
  const handleDeleteSelected = () => {
    const url = `https://api.simplynoted.com/api/storefront/addresses/multiple-remove?customerId=${customerID}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        addressIds: selectedCheckboxes
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      console.log("API Response:", data);
      if (data.result.deletedCount > 0) {
        window.location.reload();
      }
    }).catch((error) => {
      console.error("API Error:", error);
    });
  };
  const filterAddressesByType = () => {
    if (selectedType === "all") {
      return filteredAddresses;
    } else {
      return filteredAddresses.filter((address) => address.type === selectedType);
    }
  };
  const contactAddress = filterAddressesByType();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto mt-8", children: !editAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-[16px] items-center mb-[14px]", children: [
      selectedCheckboxes && selectedCheckboxes.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleDeleteSelected, className: "text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]", children: "Delete Selected" }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 88,
        columnNumber: 69
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-black text-[14px] font-bold", children: [
        "Number of address selected : ",
        selectedCheckboxes?.length
      ] }, void 0, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 91,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ContactDetail.jsx",
      lineNumber: 87,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "uppercase w-full", children: tableHeaders.map((header, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-center whitespace-nowrap text-white bg-[#001a5f] border border-solid border-[#001a5f] text-[14px] font-bold p-[5px]", children: index === 2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "bg-transparent text-white border-none outline-none appearance-none  absolute inset-y-0 right-0 opacity-0", onChange: handleTypeChange, value: selectedType, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-black", value: "all", children: "all" }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 101,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-black", value: "recipient", children: "Recipient" }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 104,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-black", value: "return", children: "Return" }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 107,
            columnNumber: 22
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 100,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "pl-[10px]", children: "Type" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 111,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 right-0 h-full flex items-center pr-2 pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4 text-white fill-current", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M10 12l-6-6h12z" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 114,
          columnNumber: 24
        }, this) }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 113,
          columnNumber: 22
        }, this) }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 112,
          columnNumber: 20
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 99,
        columnNumber: 36
      }, this) : header }, index, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 98,
        columnNumber: 54
      }, this)) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 97,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 96,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: contactAddress?.map((value, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: `text-center font-bold ${i % 2 === 0 ? "bg-[#f1f7fc]" : "bg-[#96bee3]"} `, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "flex border-l border-b border-solid border-black py-[10px] gap-[10px] justify-center items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "cursor-pointer", onChange: handleCheckboxChange, value: value._id }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 124,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: edit_default, className: "w-[20px] cursor-pointer h-[20px]", onClick: () => {
            setSelectedAddress(value);
          } }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 125,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 123,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2  border border-solid border-black px-2", children: i }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 129,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2  border border-solid border-black px-2", children: value.type }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 132,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2  border border-solid border-black px-2", children: value.firstName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 135,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2  border border-solid border-black px-2", children: value.lastName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 138,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2  border border-solid border-black px-2", children: value.businessName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 141,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2  border border-solid border-black px-2", children: value.anniversary }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 144,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.birthday }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 147,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.state }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 150,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.country }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 153,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.zip }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 156,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.city }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 159,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.address1 }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 162,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2  border border-solid border-black", children: value.address2 }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 165,
          columnNumber: 19
        }, this)
      ] }, i, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 122,
        columnNumber: 50
      }, this)) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 121,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ContactDetail.jsx",
      lineNumber: 95,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ContactDetail.jsx",
    lineNumber: 86,
    columnNumber: 24
  }, this) }, void 0, false, {
    fileName: "app/components/ContactDetail.jsx",
    lineNumber: 85,
    columnNumber: 10
  }, this);
};
_s(ContactDetail, "fPy0yRGCtNfGUYxKfGmMJGkFtgQ=");
_c = ContactDetail;
var ContactDetail_default = ContactDetail;
var _c;
$RefreshReg$(_c, "ContactDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/AddressForm.jsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\AddressForm.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\AddressForm.jsx"
  );
  import.meta.hot.lastModified = "1696936283894.2021";
}
var AddressForm = ({
  setAddressForm,
  setEditAddress
}) => {
  _s2();
  const customerID = 6406284116073;
  const [formData, setFormData] = (0, import_react2.useState)({
    firstName: "",
    lastName: "",
    businessName: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    type: "",
    birthday: "",
    anniversary: ""
  });
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const uploadDataToAPI = () => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;
    try {
      const responseData = fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          businessName: formData.businessName || "",
          address1: formData.address1 || "",
          address2: formData.address2 || "",
          city: formData.city || "",
          state: formData.stateProvince || "",
          zip: formData.postalCode || "",
          country: formData.country || "USA",
          type: formData.type ? formData.type.toLowerCase() === "sender" ? "return" : "recipient" : "recipient",
          birthday: formData.birthday || "",
          anniversary: formData.anniversary || ""
        })
      });
      if (responseData) {
        setAddressForm(false);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      throw error;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4 flex flex-wrap -mx-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "firstName", children: "First Name" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 88,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "firstName", name: "firstName", type: "text", required: true, placeholder: "First Name", value: formData.firstName, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 91,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "lastName", children: "Last Name" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 94,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "lastName", name: "lastName", required: true, type: "text", placeholder: "Last Name", value: formData.lastName, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 97,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 86,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "businessName", children: "Business Name (Optional)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "businessName", name: "businessName", type: "text", placeholder: "Business Name", value: formData.businessName, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 101,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "address1", children: "Address 1" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 109,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "address1", name: "address1", type: "text", placeholder: "Address 1", required: true, value: formData.address1, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 112,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 108,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "address2", children: "Address 2 (Optional)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 116,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "address2", name: "address2", type: "text", placeholder: "Address 2", value: formData.address2, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 119,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 115,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4 flex flex-wrap -mx-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "city", children: "City" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 124,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "city", name: "city", type: "text", required: true, placeholder: "City", value: formData.city, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 127,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 123,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "stateProvince", children: "State/Province" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 130,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "stateProvince", name: "stateProvince", type: "text", required: true, value: formData.stateProvince, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 133,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 129,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 122,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "postalCode", children: "Postal Code" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 138,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "postalCode", required: true, name: "postalCode", type: "text", placeholder: "Postal Code", value: formData.postalCode, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 137,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "country", children: "Country" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 145,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "country", name: "country", required: true, value: formData.country, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 148,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 144,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "type", children: "Type" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 152,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "type", name: "type", value: formData.type, onChange: handleChange, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { children: "Recipient" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 156,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { children: "Sender" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 157,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 155,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 151,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "birthday", children: "Birthday (MM/DD/YYYY)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 163,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "birthday", name: "birthday", type: "date", pattern: "\\d{1,2}/\\d{1,2}/\\d{4}", placeholder: "MM/DD/YYYY", value: formData.birthday, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 166,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 162,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "anniversary", children: "Anniversary (MM/DD/YYYY)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "anniversary", name: "anniversary", type: "date", pattern: "\\d{1,2}/\\d{1,2}/\\d{4}", placeholder: "MM/DD/YYYY", value: formData.anniversary, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 173,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 169,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: " flex gap-[20px] mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: uploadDataToAPI, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Save Address" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 176,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", onClick: () => {
        setAddressForm(false);
        setEditAddress(false);
      }, children: "Cancel" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 179,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 175,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AddressForm.jsx",
    lineNumber: 85,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/AddressForm.jsx",
    lineNumber: 84,
    columnNumber: 10
  }, this);
};
_s2(AddressForm, "fR9ZrQUjZta/hUv1NS0wQzv5RFA=");
_c2 = AddressForm;
var AddressForm_default = AddressForm;
var _c2;
$RefreshReg$(_c2, "AddressForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/EditAddressForm.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\EditAddressForm.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\EditAddressForm.jsx"
  );
  import.meta.hot.lastModified = "1696936811451.0645";
}
var EditAddressForm = ({
  setAddressForm,
  setSelectedAddress,
  selectedAddress
}) => {
  const customerID = 6406284116073;
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setSelectedAddress({
      ...selectedAddress,
      [name]: value
    });
  };
  const uploadDataToAPI = () => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses/${selectedAddress._id}?customerId=${customerID}`;
    try {
      const responseData = fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: selectedAddress.firstName || "",
          lastName: selectedAddress.lastName || "",
          businessName: selectedAddress.businessName || "",
          address1: selectedAddress.address1 || "",
          address2: selectedAddress.address2 || "",
          city: selectedAddress.city || "",
          state: selectedAddress.state || "",
          zip: selectedAddress.zip || "",
          country: selectedAddress.country || "US",
          type: selectedAddress.type ? selectedAddress.type.toLowerCase() === "sender" ? "return" : "recipient" : "recipient",
          birthday: selectedAddress.birthday || "",
          anniversary: selectedAddress.anniversary || ""
        })
      });
      if (responseData) {
        window.location.reload();
        console.log("responseData", responseData);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      throw error;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "container mx-auto p-4 bg-[#e2ecf6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4 flex flex-wrap -mx-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "firstName", children: "First Name" }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "firstName", name: "firstName", type: "text", required: true, placeholder: "First Name", value: selectedAddress.firstName, onChange: handleChange }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "lastName", children: "Last Name" }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 80,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "lastName", name: "lastName", required: true, type: "text", placeholder: "Last Name", value: selectedAddress.lastName, onChange: handleChange }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 83,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 79,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 72,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "businessName", children: "Business Name (Optional)" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "businessName", name: "businessName", type: "text", placeholder: "Business Name", value: selectedAddress.businessName, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 91,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "address1", children: "Address 1" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "address1", name: "address1", type: "text", placeholder: "Address 1", required: true, value: selectedAddress.address1, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 94,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "address2", children: "Address 2 (Optional)" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "address2", name: "address2", type: "text", placeholder: "Address 2", value: selectedAddress.address2, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 101,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4 flex flex-wrap -mx-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "city", children: "City" }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 110,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "city", name: "city", type: "text", required: true, placeholder: "City", value: selectedAddress.city, onChange: handleChange }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 113,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 109,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "stateProvince", children: "State/Province" }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 116,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "state", name: "state", type: "text", required: true, value: selectedAddress.state, onChange: handleChange }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 119,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 115,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 108,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "postalCode", children: "Postal Code" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 124,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "postalCode", required: true, name: "postalCode", type: "text", placeholder: "Postal Code", value: selectedAddress.zip, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 127,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 123,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "country", children: "Country" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 131,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "country", name: "country", required: true, value: selectedAddress.country, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 134,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 130,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "type", children: "Type" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 138,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("select", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "type", name: "type", value: selectedAddress.type, onChange: handleChange, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { children: "Recipient" }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 142,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("option", { children: "Sender" }, void 0, false, {
          fileName: "app/components/EditAddressForm.jsx",
          lineNumber: 143,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 137,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "birthday", children: "Birthday (MM/DD/YYYY)" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 149,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "birthday", name: "birthday", type: "date", pattern: "\\d{1,2}/\\d{1,2}/\\d{4}", placeholder: "MM/DD/YYYY", value: selectedAddress.birthday, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 152,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 148,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "anniversary", children: "Anniversary (MM/DD/YYYY)" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "anniversary", name: "anniversary", type: "date", pattern: "\\d{1,2}/\\d{1,2}/\\d{4}", placeholder: "MM/DD/YYYY", value: selectedAddress.anniversary, onChange: handleChange }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 159,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 155,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: " flex gap-[20px] mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { onClick: uploadDataToAPI, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Update Address" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", onClick: () => {
        setAddressForm(false);
        setSelectedAddress(null);
      }, children: "Cancel" }, void 0, false, {
        fileName: "app/components/EditAddressForm.jsx",
        lineNumber: 165,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/EditAddressForm.jsx",
      lineNumber: 161,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/EditAddressForm.jsx",
    lineNumber: 71,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/EditAddressForm.jsx",
    lineNumber: 70,
    columnNumber: 10
  }, this);
};
_c3 = EditAddressForm;
var EditAddressForm_default = EditAddressForm;
var _c3;
$RefreshReg$(_c3, "EditAddressForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/CsvInstruction.jsx
var import_react_modal = __toESM(require_lib());
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\CsvInstruction.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\CsvInstruction.jsx"
  );
  import.meta.hot.lastModified = "1696935592649.0498";
}
var customStyles = {
  content: {
    top: "60%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "100%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%"
    // Add your desired width here
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
};
function CsvInstruction({
  isOpen,
  closeModal
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react_modal.default, { isOpen, onRequestClose: closeModal, style: customStyles, shouldCloseOnOverlayClick: false, contentLabel: "CSV Instruction Modal", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "absolute cursor-pointer !leading-0 right-[10px]  text-[40px]", onClick: closeModal, children: "\xD7" }, void 0, false, {
      fileName: "app/components/CsvInstruction.jsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "text-[#001a5f] font-bold text-[30px] text-center mb-4", children: "INSTRUCTIONS FOR BULK UPLOAD" }, void 0, false, {
      fileName: "app/components/CsvInstruction.jsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "!text-[#1e1e1e] text-[14px] leading-[160%]", children: [
      "Bulk upload can be used to add addresses to your address book or for bulk card orders.",
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: " Download the bulk upload template (csv) " }, void 0, false, {
        fileName: "app/components/CsvInstruction.jsx",
        lineNumber: 53,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: "Complete a row for each address you wish to add" }, void 0, false, {
        fileName: "app/components/CsvInstruction.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: "Upload your completed file in .csv format" }, void 0, false, {
        fileName: "app/components/CsvInstruction.jsx",
        lineNumber: 55,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CsvInstruction.jsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-white  mt-[20px] text-black overflow-popup rounded-lg overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("table", { className: "w-full text-[14px] text-[#1e1e1e] px-[10x]", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("thead", { clasName: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { className: "text-left", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("th", { className: "border border-solid border-black py-2 px-4", children: "Field Name" }, void 0, false, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 61,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("th", { className: "border border-solid border-black py-2 px-4", children: "Notes" }, void 0, false, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 64,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/CsvInstruction.jsx",
        lineNumber: 60,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/CsvInstruction.jsx",
        lineNumber: 59,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tbody", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Type*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 71,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "\u201CSender\u201D or \u201CRecipient\u201D" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 74,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 70,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "First Name*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 79,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 82,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 78,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Last Name*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 87,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 90,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 86,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Address*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 95,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Numbers + Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 98,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 94,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Address 2" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 103,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Numbers + Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 106,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 102,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 111,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 112,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 110,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "State/Province*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 117,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Please use full names for US States (E.g., California, not CA)" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 120,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 116,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Postal Code*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 125,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "For US addresses, 5 digits are required. For non-US addresses, any postal code may be used." }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 128,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 124,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Country*" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 134,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "If no country is provided, USA is assumed. USA, US, U.S., U.S.A, United States, and United States of America are all acceptable for US addresses. US postage rates apply for US addresses. Non-US postage rates apply for all other countries." }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 137,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 133,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Phone" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 145,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "E.g., (801) 444-4444 or 999.222.2222" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 148,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 144,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Email" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 153,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "name@company.com" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 156,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 152,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Company" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 161,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 164,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 160,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Anniversary" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 169,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "May be used for anniversary card automation. Format as MM/DD/YYYY - e.g., 05/20/1990" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 172,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 168,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Custom 1" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 178,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("td", { className: "border border-solid border-black py-2 px-4", children: "Text" }, void 0, false, {
            fileName: "app/components/CsvInstruction.jsx",
            lineNumber: 181,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/CsvInstruction.jsx",
          lineNumber: 177,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/CsvInstruction.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CsvInstruction.jsx",
      lineNumber: 58,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/CsvInstruction.jsx",
      lineNumber: 57,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/CsvInstruction.jsx",
    lineNumber: 43,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/CsvInstruction.jsx",
    lineNumber: 42,
    columnNumber: 10
  }, this);
}
_c4 = CsvInstruction;
var CsvInstruction_default = CsvInstruction;
var _c4;
$RefreshReg$(_c4, "CsvInstruction");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/($locale).address-book.jsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\($locale).address-book.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\($locale).address-book.jsx"
  );
  import.meta.hot.lastModified = "1696936730690.8418";
}
function AddressBook() {
  _s3();
  const customerID = 6406284116073;
  const [selectedFile, setSelectedFile] = (0, import_react3.useState)(null);
  const [fileData, setFileData] = (0, import_react3.useState)([]);
  const [addresses, setAddresses] = (0, import_react3.useState)([]);
  const [addressForm, setAddressForm] = (0, import_react3.useState)(false);
  const [searchText, setSearchText] = (0, import_react3.useState)("");
  const [editAddress, setEditAddress] = (0, import_react3.useState)(false);
  const [filteredAddresses, setFilteredAddresses] = (0, import_react3.useState)([addresses]);
  const [selectedAddress, setSelectedAddress] = (0, import_react3.useState)(null);
  const [isModalOpen, setIsModalOpen] = (0, import_react3.useState)(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  (0, import_react3.useEffect)(() => {
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;
    fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      setAddresses(data.result);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);
  (0, import_react3.useEffect)(() => {
    if (addresses)
      setFilteredAddresses(addresses);
  }, [addresses]);
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = csvToJson(csvData);
        setSelectedFile(file);
        setFileData(jsonData);
      };
      reader.readAsText(file);
    }
  };
  const uploadDataToAPI = async (data) => {
    const modifiedData = {};
    for (let key in data) {
      const modifiedKey = key?.replace(/"/g, "");
      modifiedData[modifiedKey] = data[key].replace(/"/g, "");
    }
    const apiUrl = `https://api.simplynoted.com/api/storefront/addresses?customerId=${customerID}`;
    try {
      const responseData = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: modifiedData["First Name"] || "",
          lastName: modifiedData["Last Name"] || "",
          businessName: modifiedData.Company || "",
          address1: modifiedData.Address || "",
          address2: modifiedData["Address 2"] || "",
          city: modifiedData.City || "",
          state: modifiedData["State/Province"] || "",
          zip: modifiedData["Postal Code"] || "",
          country: modifiedData.Country || "USA",
          type: modifiedData.Type ? modifiedData.Type.toLowerCase() === "sender" ? "return" : "recipient" : "recipient",
          birthday: modifiedData.Birthday || "",
          anniversary: modifiedData.Anniversary || ""
        })
      });
    } catch (error) {
      console.error("Error uploading data:", error);
      throw error;
    }
  };
  const handleUploadClick = async () => {
    if (fileData.length === 0) {
      console.warn("No data to upload");
      return;
    }
    try {
      await Promise.all(fileData.map(uploadDataToAPI));
      window.location.reload();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filtered = addresses.filter((address) => Object.values(address).some((field) => field.toString().toLowerCase().includes(value.toLowerCase())));
    setFilteredAddresses(filtered);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "bg-[#e0e9f8]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full max-w-[1440px] px-[24px]  py-[40px] mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "text-center text-[#001a5f] font-bold text-[36px]", children: "Address Book" }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 154,
      columnNumber: 7
    }, this),
    !addressForm && !selectedAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col lg:flex-row gap-y-[40px] lg:gap-y-[10px] justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "text", placeholder: "Search Addresses...", value: searchText, onChange: handleSearchInputChange, className: "w-full max-w-[400px] py-[5px] px-[10px] h-[45px] border border-solid border-black rounded-[8px]" }, void 0, false, {
          fileName: "app/routes/($locale).address-book.jsx",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: `border-[2px] border-soild border-[#000] py-[5px]`, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "font-bold text-[16px] px-[10px] pt-[10px] leading-[120%] text-[#333]", children: "Bulk Address Upload" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 161,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { onChange: handleFileChange, type: "file", accept: ".csv", className: "p-[10px]" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 162,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("a", { href: "https://api.simplynoted.com/docs/bulk-template", className: "text-[14px] px-[10px] font-bold underline", children: "Download bulk address template" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 163,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { onClick: openModal, className: "font-bold text-[14px] text-black px-[10px] cursor-pointer underline", children: " View Instructions" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 166,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).address-book.jsx",
              lineNumber: 160,
              columnNumber: 17
            }, this),
            selectedFile && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: () => handleUploadClick(), className: "w-full text-white bg-[#ef6e6e] p-[5px] mx-[10px] max-w-[292px] mt-[5px]", children: "Upload" }, void 0, false, {
              fileName: "app/routes/($locale).address-book.jsx",
              lineNumber: 169,
              columnNumber: 34
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).address-book.jsx",
            lineNumber: 159,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-end justify-end ml-[10px] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: () => setAddressForm(true), className: "text-white h-[40px] text-[14px] px-[10px] font-bold bg-[#1b5299]", children: "+New Address" }, void 0, false, {
            fileName: "app/routes/($locale).address-book.jsx",
            lineNumber: 174,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).address-book.jsx",
            lineNumber: 173,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).address-book.jsx",
          lineNumber: 158,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).address-book.jsx",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CsvInstruction_default, { isOpen: isModalOpen, closeModal }, void 0, false, {
        fileName: "app/routes/($locale).address-book.jsx",
        lineNumber: 180,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ContactDetail_default, { customerID, searchText, setSearchText, filteredAddresses, editAddress, setSelectedAddress, setEditAddress }, void 0, false, {
        fileName: "app/routes/($locale).address-book.jsx",
        lineNumber: 182,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 155,
      columnNumber: 44
    }, this),
    addressForm && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full max-w-[1440px] px-[20px] mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(AddressForm_default, { setAddressForm, setEditAddress }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 185,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 184,
      columnNumber: 23
    }, this),
    selectedAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full max-w-[1440px] px-[20px] mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(EditAddressForm_default, { selectedAddress, setSelectedAddress, setEditAddress, setAddressForm }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 188,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 187,
      columnNumber: 27
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).address-book.jsx",
    lineNumber: 153,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "app/routes/($locale).address-book.jsx",
    lineNumber: 152,
    columnNumber: 10
  }, this);
}
_s3(AddressBook, "bW2mdNp/eqwL82VITd0yS2WTunY=");
_c5 = AddressBook;
var _c5;
$RefreshReg$(_c5, "AddressBook");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AddressBook as default
};
//# sourceMappingURL=/build/routes/($locale).address-book-654AEMCZ.js.map
