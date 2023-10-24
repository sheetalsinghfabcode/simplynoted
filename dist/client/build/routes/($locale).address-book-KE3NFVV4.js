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
  import.meta.hot.lastModified = "1696848422073.9229";
}
var ContactDetail = ({
  filteredAddresses,
  editAddress,
  setEditAddress,
  customerID
}) => {
  _s();
  const items = Object.entries(filteredAddresses);
  const [selectedCheckboxes, setSelectedCheckboxes] = (0, import_react.useState)([]);
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto mt-8", children: !editAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-[16px] items-center mb-[14px]", children: [
      selectedCheckboxes && selectedCheckboxes.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleDeleteSelected, className: "text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]", children: "Delete Selected" }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 74,
        columnNumber: 69
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-black text-[14px] font-bold", children: [
        "Number of address selected : ",
        selectedCheckboxes?.length
      ] }, void 0, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 77,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ContactDetail.jsx",
      lineNumber: 73,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "Checkobox" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 84,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "Item" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 85,
          columnNumber: 16
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "Type" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "firstName" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 87,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "lastName" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 88,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "businessName" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "anniversary" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "birthday" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "state" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "country" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "zip" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "postal code" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "address 1" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 96,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-left", children: "address 2" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 97,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 83,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 82,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: items.map(([key, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "flex gap-[10px] justify-start items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "cursor-pointer", onChange: handleCheckboxChange, value: value._id }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 103,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: edit_default, className: "w-[20px] cursor-pointer h-[20px]", onClick: () => {
            setEditAddress(true);
          } }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 104,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 102,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: key }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 108,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.type }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 109,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.firstName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 110,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.lastName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 111,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.businessName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 112,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.anniversary }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 113,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.birthday }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 114,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.state }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 115,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.country }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 116,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.zip }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 117,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.city }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 118,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.address1 }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 119,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-2", children: value.address2 }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 120,
          columnNumber: 21
        }, this)
      ] }, key, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 101,
        columnNumber: 44
      }, this)) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 100,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ContactDetail.jsx",
      lineNumber: 81,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ContactDetail.jsx",
    lineNumber: 72,
    columnNumber: 24
  }, this) }, void 0, false, {
    fileName: "app/components/ContactDetail.jsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
};
_s(ContactDetail, "cE9qr9Un/J6bIavRReyYdfaIaEo=");
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
  import.meta.hot.lastModified = "1696849512268.8296";
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
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "birthday", name: "birthday", type: "date", placeholder: "MM/DD/YYYY", value: formData.birthday, onChange: handleChange }, void 0, false, {
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
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "anniversary", name: "anniversary", type: "date", placeholder: "MM/DD/YYYY", value: formData.anniversary, onChange: handleChange }, void 0, false, {
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

// app/routes/($locale).address-book.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
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
  import.meta.hot.lastModified = "1696848951661.91";
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
  console.log("filteredAddresses", filteredAddresses);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { className: "text-center text-[#001a5f] text-[36px]", children: "Address Book" }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 144,
      columnNumber: 7
    }, this),
    !addressForm && !editAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-full max-w-[1440px] px-[20px] mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col lg:flex-row gap-y-[40px] lg:gap-y-[10px] justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", placeholder: "Search...", value: searchText, onChange: handleSearchInputChange, className: "w-full max-w-[400px] py-[5px] px-[10px] h-[45px] border border-solid border-black rounded-[8px]" }, void 0, false, {
          fileName: "app/routes/($locale).address-book.jsx",
          lineNumber: 147,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: `border-[2px] border-soild border-[#000] p-[4px]`, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col gap-[10px]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { children: "Bulk Address Upload" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 151,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { onChange: handleFileChange, type: "file", accept: ".csv" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 152,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { className: "text-[14px]", children: "Download bulk address template" }, void 0, false, {
                fileName: "app/routes/($locale).address-book.jsx",
                lineNumber: 153,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/($locale).address-book.jsx",
              lineNumber: 150,
              columnNumber: 17
            }, this),
            selectedFile && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { onClick: () => handleUploadClick(), className: "w-full text-white bg-[#ef6e6e] p-[5px] mt-[5px]", children: "Upload" }, void 0, false, {
              fileName: "app/routes/($locale).address-book.jsx",
              lineNumber: 157,
              columnNumber: 34
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/($locale).address-book.jsx",
            lineNumber: 149,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex items-end justify-end ml-[10px] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { onClick: () => setAddressForm(true), className: "text-white h-[40px] text-[14px] px-[10px] font-bold bg-[#1b5299]", children: "+New Address" }, void 0, false, {
            fileName: "app/routes/($locale).address-book.jsx",
            lineNumber: 162,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/($locale).address-book.jsx",
            lineNumber: 161,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/($locale).address-book.jsx",
          lineNumber: 148,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/($locale).address-book.jsx",
        lineNumber: 146,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ContactDetail_default, { customerID, searchText, setSearchText, filteredAddresses, editAddress, setEditAddress }, void 0, false, {
        fileName: "app/routes/($locale).address-book.jsx",
        lineNumber: 168,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 145,
      columnNumber: 40
    }, this),
    addressForm && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-full max-w-[1440px] px-[20px] mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(AddressForm_default, { setAddressForm, setEditAddress }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 171,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 170,
      columnNumber: 23
    }, this),
    editAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-full max-w-[1440px] px-[20px] mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(AddressForm_default, { setEditAddress, setAddressForm }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 174,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/($locale).address-book.jsx",
      lineNumber: 173,
      columnNumber: 23
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/($locale).address-book.jsx",
    lineNumber: 143,
    columnNumber: 10
  }, this);
}
_s3(AddressBook, "Xlga3HZXyH7z+PPlCwLoIZHMpDI=");
_c3 = AddressBook;
var _c3;
$RefreshReg$(_c3, "AddressBook");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AddressBook as default
};
//# sourceMappingURL=/build/routes/($locale).address-book-KE3NFVV4.js.map
