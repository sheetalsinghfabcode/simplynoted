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
  import.meta.hot.lastModified = "1696944685976.3916";
}
var ContactDetail = ({
  filteredAddresses,
  editAddress,
  setEditAddress,
  customerID,
  setSelectedAddress
}) => {
  _s();
  const tableHeaders = ["check", "Item", "Type", "first Name", "last Name", "business Name", "anniversary", "birthday", "state", "country", "zip", "postal code", "address 1", "address 2"];
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
  const handleSelectAll = () => {
    const allSelected = selectedCheckboxes.length === contactAddress.length;
    if (allSelected) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(contactAddress.map((value) => value._id));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto mt-8", children: !editAddress && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-[16px] items-center mb-[14px]", children: [
      selectedCheckboxes && selectedCheckboxes.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleDeleteSelected, className: "text-white bg-[#FF0000] border border-solid text-[16px] font-bold py-[3px] px-[16px]", children: "Delete Selected" }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 99,
        columnNumber: 69
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-black text-[14px] font-bold", children: [
        "Number of address selected : ",
        selectedCheckboxes?.length
      ] }, void 0, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 102,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ContactDetail.jsx",
      lineNumber: 98,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "uppercase w-full", children: tableHeaders.map((header, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "text-center whitespace-nowrap text-white bg-[#001a5f] border border-solid border-[#001a5f] text-[14px] font-bold p-[10px]", children: index === 2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "bg-transparent w-[10px] text-white border-none outline-none appearance-none  absolute inset-y-0 right-0 w-[10p] ", onChange: handleTypeChange, value: selectedType, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-black", value: "all", children: "all" }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 112,
            columnNumber: 27
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-black", value: "recipient", children: "Recipient" }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 115,
            columnNumber: 27
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { className: "text-black", value: "return", children: "Return" }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 118,
            columnNumber: 27
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 111,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "", children: "Type" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 122,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-[2px] right-0 left-[41px] h-full flex items-center pr-2 pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4 text-white fill-current", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M10 12l-6-6h12z" }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 125,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 124,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 123,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 110,
        columnNumber: 36
      }, this) : index === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { onChange: handleSelectAll, className: "cursor-pointer", type: "checkbox" }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 128,
        columnNumber: 46
      }, this) : header }, index, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 109,
        columnNumber: 54
      }, this)) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 108,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 107,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: contactAddress?.map((value, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: `text-center font-bold ${i % 2 === 0 ? "bg-[#f1f7fc]" : "bg-[#96bee3]"} `, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "flex border-l border-b border-solid border-black p-[10px] gap-[16px] justify-center items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "cursor-pointer", onChange: handleCheckboxChange, value: value._id }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 135,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: edit_default, className: "w-[20px] cursor-pointer h-[20px]", onClick: () => {
            setSelectedAddress(value);
          } }, void 0, false, {
            fileName: "app/components/ContactDetail.jsx",
            lineNumber: 136,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 134,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px]  border border-solid border-black", children: i }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 140,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px] border border-solid border-black ", children: value.type }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 143,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px]  border border-solid border-black ", children: value.firstName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 146,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: " p-[10px] border border-solid border-black ", children: value.lastName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 149,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: " p-[10px] border border-solid border-black", children: value.businessName }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 152,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: " p-[10px] border border-solid border-black ", children: value.anniversary }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 155,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px] border border-solid border-black", children: value.birthday }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 158,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px] border border-solid border-black", children: value.state }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 161,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: " p-[10px] border border-solid border-black", children: value.country }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 164,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: " p-[10px] border border-solid border-black", children: value.zip }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 167,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: " p-[10px] border border-solid border-black", children: value.city }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 170,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px] border border-solid border-black", children: value.address1 }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 173,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "p-[10px] border border-solid border-black", children: value.address2 }, void 0, false, {
          fileName: "app/components/ContactDetail.jsx",
          lineNumber: 176,
          columnNumber: 19
        }, this)
      ] }, i, true, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 133,
        columnNumber: 50
      }, this)) }, void 0, false, {
        fileName: "app/components/ContactDetail.jsx",
        lineNumber: 132,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ContactDetail.jsx",
      lineNumber: 106,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ContactDetail.jsx",
    lineNumber: 97,
    columnNumber: 24
  }, this) }, void 0, false, {
    fileName: "app/components/ContactDetail.jsx",
    lineNumber: 96,
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

// location.json
var location_default = {
  countries: [
    {
      country: "Afghanistan",
      states: ["Badakhshan", "Badghis", "Baghlan", "Balkh", "Bamian", "Daykondi", "Farah", "Faryab", "Ghazni", "Ghowr", "Helmand", "Herat", "Jowzjan", "Kabul", "Kandahar", "Kapisa", "Khost", "Konar", "Kondoz", "Laghman", "Lowgar", "Nangarhar", "Nimruz", "Nurestan", "Oruzgan", "Paktia", "Paktika", "Panjshir", "Parvan", "Samangan", "Sar-e Pol", "Takhar", "Vardak", "Zabol"]
    },
    {
      country: "Albania",
      states: ["Berat", "Dibres", "Durres", "Elbasan", "Fier", "Gjirokastre", "Korce", "Kukes", "Lezhe", "Shkoder", "Tirane", "Vlore"]
    },
    {
      country: "Algeria",
      states: ["Adrar", "Ain Defla", "Ain Temouchent", "Alger", "Annaba", "Batna", "Bechar", "Bejaia", "Biskra", "Blida", "Bordj Bou Arreridj", "Bouira", "Boumerdes", "Chlef", "Constantine", "Djelfa", "El Bayadh", "El Oued", "El Tarf", "Ghardaia", "Guelma", "Illizi", "Jijel", "Khenchela", "Laghouat", "Muaskar", "Medea", "Mila", "Mostaganem", "M'Sila", "Naama", "Oran", "Ouargla", "Oum el Bouaghi", "Relizane", "Saida", "Setif", "Sidi Bel Abbes", "Skikda", "Souk Ahras", "Tamanghasset", "Tebessa", "Tiaret", "Tindouf", "Tipaza", "Tissemsilt", "Tizi Ouzou", "Tlemcen"]
    },
    {
      country: "Andorra",
      states: ["Andorra la Vella", "Canillo", "Encamp", "Escaldes-Engordany", "La Massana", "Ordino", "Sant Julia de Loria"]
    },
    {
      country: "Angola",
      states: ["Bengo", "Benguela", "Bie", "Cabinda", "Cuando Cubango", "Cuanza Norte", "Cuanza Sul", "Cunene", "Huambo", "Huila", "Luanda", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uige", "Zaire"]
    },
    {
      country: "Antarctica",
      states: []
    },
    {
      country: "Antigua and Barbuda",
      states: ["Barbuda", "Redonda", "Saint George", "Saint John", "Saint Mary", "Saint Paul", "Saint Peter", "Saint Philip"]
    },
    {
      country: "Argentina",
      states: ["Buenos Aires", "Buenos Aires Capital", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucuman"]
    },
    {
      country: "Armenia",
      states: ["Aragatsotn", "Ararat", "Armavir", "Geghark'unik'", "Kotayk'", "Lorri", "Shirak", "Syunik'", "Tavush", "Vayots' Dzor", "Yerevan"]
    },
    {
      country: "Australia",
      states: []
    },
    {
      country: "Austria",
      states: ["Burgenland", "Kaernten", "Niederoesterreich", "Oberoesterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg", "Wien"]
    },
    {
      country: "Azerbaijan",
      states: ["Abseron Rayonu", "Agcabadi Rayonu", "Agdam Rayonu", "Agdas Rayonu", "Agstafa Rayonu", "Agsu Rayonu", "Astara Rayonu", "Balakan Rayonu", "Barda Rayonu", "Beylaqan Rayonu", "Bilasuvar Rayonu", "Cabrayil Rayonu", "Calilabad Rayonu", "Daskasan Rayonu", "Davaci Rayonu", "Fuzuli Rayonu", "Gadabay Rayonu", "Goranboy Rayonu", "Goycay Rayonu", "Haciqabul Rayonu", "Imisli Rayonu", "Ismayilli Rayonu", "Kalbacar Rayonu", "Kurdamir Rayonu", "Lacin Rayonu", "Lankaran Rayonu", "Lerik Rayonu", "Masalli Rayonu", "Neftcala Rayonu", "Oguz Rayonu", "Qabala Rayonu", "Qax Rayonu", "Qazax Rayonu", "Qobustan Rayonu", "Quba Rayonu", "Qubadli Rayonu", "Qusar Rayonu", "Saatli Rayonu", "Sabirabad Rayonu", "Saki Rayonu", "Salyan Rayonu", "Samaxi Rayonu", "Samkir Rayonu", "Samux Rayonu", "Siyazan Rayonu", "Susa Rayonu", "Tartar Rayonu", "Tovuz Rayonu", "Ucar Rayonu", "Xacmaz Rayonu", "Xanlar Rayonu", "Xizi Rayonu", "Xocali Rayonu", "Xocavand Rayonu", "Yardimli Rayonu", "Yevlax Rayonu", "Zangilan Rayonu", "Zaqatala Rayonu", "Zardab Rayonu", "Ali Bayramli Sahari", "Baki Sahari", "Ganca Sahari", "Lankaran Sahari", "Mingacevir Sahari", "Naftalan Sahari", "Saki Sahari", "Sumqayit Sahari", "Susa Sahari", "Xankandi Sahari", "Yevlax Sahari", "Naxcivan Muxtar"]
    },
    {
      country: "Bahamas",
      states: ["Acklins and Crooked Islands", "Bimini", "Cat Island", "Exuma", "Freeport", "Fresh Creek", "Governor's Harbour", "Green Turtle Cay", "Harbour Island", "High Rock", "Inagua", "Kemps Bay", "Long Island", "Marsh Harbour", "Mayaguana", "New Providence", "Nichollstown and Berry Islands", "Ragged Island", "Rock Sound", "Sandy Point", "San Salvador and Rum Cay"]
    },
    {
      country: "Bahrain",
      states: ["Al Hadd", "Al Manamah", "Al Mintaqah al Gharbiyah", "Al Mintaqah al Wusta", "Al Mintaqah ash Shamaliyah", "Al Muharraq", "Ar Rifa' wa al Mintaqah al Janubiyah", "Jidd Hafs", "Madinat Hamad", "Madinat 'Isa", "Juzur Hawar", "Sitrah"]
    },
    {
      country: "Bangladesh",
      states: ["Barisal", "Chittagong", "Dhaka", "Khulna", "Rajshahi", "Sylhet"]
    },
    {
      country: "Barbados",
      states: ["Christ Church", "Saint Andrew", "Saint George", "Saint James", "Saint John", "Saint Joseph", "Saint Lucy", "Saint Michael", "Saint Peter", "Saint Philip", "Saint Thomas"]
    },
    {
      country: "Belarus",
      states: ["Brest", "Homyel", "Horad Minsk", "Hrodna", "Mahilyow", "Minsk", "Vitsyebsk"]
    },
    {
      country: "Belgium",
      states: ["Antwerpen", "Brabant Wallon", "Brussels", "Flanders", "Hainaut", "Liege", "Limburg", "Luxembourg", "Namur", "Oost-Vlaanderen", "Vlaams-Brabant", "Wallonia", "West-Vlaanderen"]
    },
    {
      country: "Belize",
      states: ["Belize", "Cayo", "Corozal", "Orange Walk", "Stann Creek", "Toledo"]
    },
    {
      country: "Benin",
      states: ["Alibori", "Atakora", "Atlantique", "Borgou", "Collines", "Donga", "Kouffo", "Littoral", "Mono", "Oueme", "Plateau", "Zou"]
    },
    {
      country: "Bermuda",
      states: ["Devonshire", "Hamilton", "Hamilton", "Paget", "Pembroke", "Saint George", "Saint George's", "Sandys", "Smith's", "Southampton", "Warwick"]
    },
    {
      country: "Bhutan",
      states: ["Bumthang", "Chukha", "Dagana", "Gasa", "Haa", "Lhuntse", "Mongar", "Paro", "Pemagatshel", "Punakha", "Samdrup Jongkhar", "Samtse", "Sarpang", "Thimphu", "Trashigang", "Trashiyangste", "Trongsa", "Tsirang", "Wangdue Phodrang", "Zhemgang"]
    },
    {
      country: "Bolivia",
      states: ["Chuquisaca", "Cochabamba", "Beni", "La Paz", "Oruro", "Pando", "Potosi", "Santa Cruz", "Tarija"]
    },
    {
      country: "Bosnia and Herzegovina",
      states: ["Una-Sana [Federation]", "Posavina [Federation]", "Tuzla [Federation]", "Zenica-Doboj [Federation]", "Bosnian Podrinje [Federation]", "Central Bosnia [Federation]", "Herzegovina-Neretva [Federation]", "West Herzegovina [Federation]", "Sarajevo [Federation]", " West Bosnia [Federation]", "Banja Luka [RS]", "Bijeljina [RS]", "Doboj [RS]", "Fo?a [RS]", "Sarajevo-Romanija [RS]", "Trebinje [RS]", "Vlasenica [RS]"]
    },
    {
      country: "Botswana",
      states: ["Central", "Ghanzi", "Kgalagadi", "Kgatleng", "Kweneng", "North East", "North West", "South East", "Southern"]
    },
    {
      country: "Brazil",
      states: ["Acre", "Alagoas", "Amapa", "Amazonas", "Bahia", "Ceara", "Distrito Federal", "Espirito Santo", "Goias", "Maranhao", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Para", "Paraiba", "Parana", "Pernambuco", "Piaui", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondonia", "Roraima", "Santa Catarina", "Sao Paulo", "Sergipe", "Tocantins"]
    },
    {
      country: "Brunei",
      states: ["Belait", "Brunei and Muara", "Temburong", "Tutong"]
    },
    {
      country: "Bulgaria",
      states: ["Blagoevgrad", "Burgas", "Dobrich", "Gabrovo", "Khaskovo", "Kurdzhali", "Kyustendil", "Lovech", "Montana", "Pazardzhik", "Pernik", "Pleven", "Plovdiv", "Razgrad", "Ruse", "Shumen", "Silistra", "Sliven", "Smolyan", "Sofiya", "Sofiya-Grad", "Stara Zagora", "Turgovishte", "Varna", "Veliko Turnovo", "Vidin", "Vratsa", "Yambol"]
    },
    {
      country: "Burkina Faso",
      states: ["Bale", "Bam", "Banwa", "Bazega", "Bougouriba", "Boulgou", "Boulkiemde", "Comoe", "Ganzourgou", "Gnagna", "Gourma", "Houet", "Ioba", "Kadiogo", "Kenedougou", "Komondjari", "Kompienga", "Kossi", "Koulpelogo", "Kouritenga", "Kourweogo", "Leraba", "Loroum", "Mouhoun", "Namentenga", "Nahouri", "Nayala", "Noumbiel", "Oubritenga", "Oudalan", "Passore", "Poni", "Sanguie", "Sanmatenga", "Seno", "Sissili", "Soum", "Sourou", "Tapoa", "Tuy", "Yagha", "Yatenga", "Ziro", "Zondoma", "Zoundweogo"]
    },
    {
      country: "Burma",
      states: ["Ayeyarwady", "Bago", "Magway", "Mandalay", "Sagaing", "Tanintharyi", "Yangon", "Chin State", "Kachin State", "Kayin State", "Kayah State", "Mon State", "Rakhine State", "Shan State"]
    },
    {
      country: "Burundi",
      states: ["Bubanza", "Bujumbura Mairie", "Bujumbura Rural", "Bururi", "Cankuzo", "Cibitoke", "Gitega", "Karuzi", "Kayanza", "Kirundo", "Makamba", "Muramvya", "Muyinga", "Mwaro", "Ngozi", "Rutana", "Ruyigi"]
    },
    {
      country: "Cambodia",
      states: ["Banteay Mean Chey", "Batdambang", "Kampong Cham", "Kampong Chhnang", "Kampong Spoe", "Kampong Thum", "Kampot", "Kandal", "Koh Kong", "Kracheh", "Mondol Kiri", "Otdar Mean Chey", "Pouthisat", "Preah Vihear", "Prey Veng", "Rotanakir", "Siem Reab", "Stoeng Treng", "Svay Rieng", "Takao", "Keb", "Pailin", "Phnom Penh", "Preah Seihanu"]
    },
    {
      country: "Cameroon",
      states: ["Adamaoua", "Centre", "Est", "Extreme-Nord", "Littoral", "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest"]
    },
    {
      country: "Canada",
      states: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon Territory"]
    },
    {
      country: "Cape Verde",
      states: []
    },
    {
      country: "Central African Republic",
      states: ["Bamingui-Bangoran", "Bangui", "Basse-Kotto", "Haute-Kotto", "Haut-Mbomou", "Kemo", "Lobaye", "Mambere-Kadei", "Mbomou", "Nana-Grebizi", "Nana-Mambere", "Ombella-Mpoko", "Ouaka", "Ouham", "Ouham-Pende", "Sangha-Mbaere", "Vakaga"]
    },
    {
      country: "Chad",
      states: ["Batha", "Biltine", "Borkou-Ennedi-Tibesti", "Chari-Baguirmi", "Gu\xE9ra", "Kanem", "Lac", "Logone Occidental", "Logone Oriental", "Mayo-Kebbi", "Moyen-Chari", "Ouadda\xEF", "Salamat", "Tandjile"]
    },
    {
      country: "Chile",
      states: ["Aysen", "Antofagasta", "Araucania", "Atacama", "Bio-Bio", "Coquimbo", "O'Higgins", "Los Lagos", "Magallanes y la Antartica Chilena", "Maule", "Santiago Region Metropolitana", "Tarapaca", "Valparaiso"]
    },
    {
      country: "China",
      states: ["Anhui", "Fujian", "Gansu", "Guangdong", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Qinghai", "Shaanxi", "Shandong", "Shanxi", "Sichuan", "Yunnan", "Zhejiang", "Guangxi", "Nei Mongol", "Ningxia", "Xinjiang", "Xizang (Tibet)", "Beijing", "Chongqing", "Shanghai", "Tianjin"]
    },
    {
      country: "Colombia",
      states: ["Amazonas", "Antioquia", "Arauca", "Atlantico", "Bogota District Capital", "Bolivar", "Boyaca", "Caldas", "Caqueta", "Casanare", "Cauca", "Cesar", "Choco", "Cordoba", "Cundinamarca", "Guainia", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Narino", "Norte de Santander", "Putumayo", "Quindio", "Risaralda", "San Andres & Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupes", "Vichada"]
    },
    {
      country: "Comoros",
      states: ["Grande Comore (Njazidja)", "Anjouan (Nzwani)", "Moheli (Mwali)"]
    },
    {
      country: "Congo, Democratic Republic",
      states: ["Bandundu", "Bas-Congo", "Equateur", "Kasai-Occidental", "Kasai-Oriental", "Katanga", "Kinshasa", "Maniema", "Nord-Kivu", "Orientale", "Sud-Kivu"]
    },
    {
      country: "Congo, Republic of the",
      states: ["Bouenza", "Brazzaville", "Cuvette", "Cuvette-Ouest", "Kouilou", "Lekoumou", "Likouala", "Niari", "Plateaux", "Pool", "Sangha"]
    },
    {
      country: "Costa Rica",
      states: ["Alajuela", "Cartago", "Guanacaste", "Heredia", "Limon", "Puntarenas", "San Jose"]
    },
    {
      country: "Cote d'Ivoire",
      states: []
    },
    {
      country: "Croatia",
      states: ["Bjelovarsko-Bilogorska", "Brodsko-Posavska", "Dubrovacko-Neretvanska", "Istarska", "Karlovacka", "Koprivnicko-Krizevacka", "Krapinsko-Zagorska", "Licko-Senjska", "Medimurska", "Osjecko-Baranjska", "Pozesko-Slavonska", "Primorsko-Goranska", "Sibensko-Kninska", "Sisacko-Moslavacka", "Splitsko-Dalmatinska", "Varazdinska", "Viroviticko-Podravska", "Vukovarsko-Srijemska", "Zadarska", "Zagreb", "Zagrebacka"]
    },
    {
      country: "Cuba",
      states: ["Camaguey", "Ciego de Avila", "Cienfuegos", "Ciudad de La Habana", "Granma", "Guantanamo", "Holguin", "Isla de la Juventud", "La Habana", "Las Tunas", "Matanzas", "Pinar del Rio", "Sancti Spiritus", "Santiago de Cuba", "Villa Clara"]
    },
    {
      country: "Cyprus",
      states: ["Famagusta", "Kyrenia", "Larnaca", "Limassol", "Nicosia", "Paphos"]
    },
    {
      country: "Czech Republic",
      states: ["Jihocesky Kraj", "Jihomoravsky Kraj", "Karlovarsky Kraj", "Kralovehradecky Kraj", "Liberecky Kraj", "Moravskoslezsky Kraj", "Olomoucky Kraj", "Pardubicky Kraj", "Plzensky Kraj", "Praha", "Stredocesky Kraj", "Ustecky Kraj", "Vysocina", "Zlinsky Kraj"]
    },
    {
      country: "Denmark",
      states: ["Arhus", "Bornholm", "Frederiksberg", "Frederiksborg", "Fyn", "Kobenhavn", "Kobenhavns", "Nordjylland", "Ribe", "Ringkobing", "Roskilde", "Sonderjylland", "Storstrom", "Vejle", "Vestsjalland", "Viborg"]
    },
    {
      country: "Djibouti",
      states: ["Ali Sabih", "Dikhil", "Djibouti", "Obock", "Tadjoura"]
    },
    {
      country: "Dominica",
      states: ["Saint Andrew", "Saint David", "Saint George", "Saint John", "Saint Joseph", "Saint Luke", "Saint Mark", "Saint Patrick", "Saint Paul", "Saint Peter"]
    },
    {
      country: "Dominican Republic",
      states: ["Azua", "Baoruco", "Barahona", "Dajabon", "Distrito Nacional", "Duarte", "Elias Pina", "El Seibo", "Espaillat", "Hato Mayor", "Independencia", "La Altagracia", "La Romana", "La Vega", "Maria Trinidad Sanchez", "Monsenor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", "Puerto Plata", "Salcedo", "Samana", "Sanchez Ramirez", "San Cristobal", "San Jose de Ocoa", "San Juan", "San Pedro de Macoris", "Santiago", "Santiago Rodriguez", "Santo Domingo", "Valverde"]
    },
    {
      country: "East Timor",
      states: ["Aileu", "Ainaro", "Baucau", "Bobonaro", "Cova-Lima", "Dili", "Ermera", "Lautem", "Liquica", "Manatuto", "Manufahi", "Oecussi", "Viqueque"]
    },
    {
      country: "Ecuador",
      states: ["Azuay", "Bolivar", "Canar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galapagos", "Guayas", "Imbabura", "Loja", "Los Rios", "Manabi", "Morona-Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Sucumbios", "Tungurahua", "Zamora-Chinchipe"]
    },
    {
      country: "Egypt",
      states: ["Ad Daqahliyah", "Al Bahr al Ahmar", "Al Buhayrah", "Al Fayyum", "Al Gharbiyah", "Al Iskandariyah", "Al Isma'iliyah", "Al Jizah", "Al Minufiyah", "Al Minya", "Al Qahirah", "Al Qalyubiyah", "Al Wadi al Jadid", "Ash Sharqiyah", "As Suways", "Aswan", "Asyut", "Bani Suwayf", "Bur Sa'id", "Dumyat", "Janub Sina'", "Kafr ash Shaykh", "Matruh", "Qina", "Shamal Sina'", "Suhaj"]
    },
    {
      country: "El Salvador",
      states: ["Ahuachapan", "Cabanas", "Chalatenango", "Cuscatlan", "La Libertad", "La Paz", "La Union", "Morazan", "San Miguel", "San Salvador", "Santa Ana", "San Vicente", "Sonsonate", "Usulutan"]
    },
    {
      country: "Equatorial Guinea",
      states: ["Annobon", "Bioko Norte", "Bioko Sur", "Centro Sur", "Kie-Ntem", "Litoral", "Wele-Nzas"]
    },
    {
      country: "Eritrea",
      states: ["Anseba", "Debub", "Debubawi K'eyih Bahri", "Gash Barka", "Ma'akel", "Semenawi Keyih Bahri"]
    },
    {
      country: "Estonia",
      states: ["Harjumaa (Tallinn)", "Hiiumaa (Kardla)", "Ida-Virumaa (Johvi)", "Jarvamaa (Paide)", "Jogevamaa (Jogeva)", "Laanemaa (Haapsalu)", "Laane-Virumaa (Rakvere)", "Parnumaa (Parnu)", "Polvamaa (Polva)", "Raplamaa (Rapla)", "Saaremaa (Kuressaare)", "Tartumaa (Tartu)", "Valgamaa (Valga)", "Viljandimaa (Viljandi)", "Vorumaa (Voru)"]
    },
    {
      country: "Ethiopia",
      states: ["Addis Ababa", "Afar", "Amhara", "Binshangul Gumuz", "Dire Dawa", "Gambela Hizboch", "Harari", "Oromia", "Somali", "Tigray", "Southern Nations, Nationalities, and Peoples Region"]
    },
    {
      country: "Fiji",
      states: ["Central (Suva)", "Eastern (Levuka)", "Northern (Labasa)", "Rotuma", "Western (Lautoka)"]
    },
    {
      country: "Finland",
      states: ["Aland", "Etela-Suomen Laani", "Ita-Suomen Laani", "Lansi-Suomen Laani", "Lappi", "Oulun Laani"]
    },
    {
      country: "France",
      states: ["Alsace", "Aquitaine", "Auvergne", "Basse-Normandie", "Bourgogne", "Bretagne", "Centre", "Champagne-Ardenne", "Corse", "Franche-Comte", "Haute-Normandie", "Ile-de-France", "Languedoc-Roussillon", "Limousin", "Lorraine", "Midi-Pyrenees", "Nord-Pas-de-Calais", "Pays de la Loire", "Picardie", "Poitou-Charentes", "Provence-Alpes-Cote d'Azur", "Rhone-Alpes"]
    },
    {
      country: "Gabon",
      states: ["Estuaire", "Haut-Ogooue", "Moyen-Ogooue", "Ngounie", "Nyanga", "Ogooue-Ivindo", "Ogooue-Lolo", "Ogooue-Maritime", "Woleu-Ntem"]
    },
    {
      country: "Gambia",
      states: ["Banjul", "Central River", "Lower River", "North Bank", "Upper River", "Western"]
    },
    {
      country: "Georgia",
      states: []
    },
    {
      country: "Germany",
      states: ["Baden-Wuerttemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thueringen"]
    },
    {
      country: "Ghana",
      states: ["Ashanti", "Brong-Ahafo", "Central", "Eastern", "Greater Accra", "Northern", "Upper East", "Upper West", "Volta", "Western"]
    },
    {
      country: "Greece",
      states: ["Agion Oros", "Achaia", "Aitolia kai Akarmania", "Argolis", "Arkadia", "Arta", "Attiki", "Chalkidiki", "Chanion", "Chios", "Dodekanisos", "Drama", "Evros", "Evrytania", "Evvoia", "Florina", "Fokidos", "Fthiotis", "Grevena", "Ileia", "Imathia", "Ioannina", "Irakleion", "Karditsa", "Kastoria", "Kavala", "Kefallinia", "Kerkyra", "Kilkis", "Korinthia", "Kozani", "Kyklades", "Lakonia", "Larisa", "Lasithi", "Lefkas", "Lesvos", "Magnisia", "Messinia", "Pella", "Pieria", "Preveza", "Rethynnis", "Rodopi", "Samos", "Serrai", "Thesprotia", "Thessaloniki", "Trikala", "Voiotia", "Xanthi", "Zakynthos"]
    },
    {
      country: "Greenland",
      states: ["Avannaa (Nordgronland)", "Tunu (Ostgronland)", "Kitaa (Vestgronland)"]
    },
    {
      country: "Grenada",
      states: ["Carriacou and Petit Martinique", "Saint Andrew", "Saint David", "Saint George", "Saint John", "Saint Mark", "Saint Patrick"]
    },
    {
      country: "Guatemala",
      states: ["Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "El Progreso", "Escuintla", "Guatemala", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa", "Peten", "Quetzaltenango", "Quiche", "Retalhuleu", "Sacatepequez", "San Marcos", "Santa Rosa", "Solola", "Suchitepequez", "Totonicapan", "Zacapa"]
    },
    {
      country: "Guinea",
      states: ["Beyla", "Boffa", "Boke", "Conakry", "Coyah", "Dabola", "Dalaba", "Dinguiraye", "Dubreka", "Faranah", "Forecariah", "Fria", "Gaoual", "Gueckedou", "Kankan", "Kerouane", "Kindia", "Kissidougou", "Koubia", "Koundara", "Kouroussa", "Labe", "Lelouma", "Lola", "Macenta", "Mali", "Mamou", "Mandiana", "Nzerekore", "Pita", "Siguiri", "Telimele", "Tougue", "Yomou"]
    },
    {
      country: "Guinea-Bissau",
      states: ["Bafata", "Biombo", "Bissau", "Bolama", "Cacheu", "Gabu", "Oio", "Quinara", "Tombali"]
    },
    {
      country: "Guyana",
      states: ["Barima-Waini", "Cuyuni-Mazaruni", "Demerara-Mahaica", "East Berbice-Corentyne", "Essequibo Islands-West Demerara", "Mahaica-Berbice", "Pomeroon-Supenaam", "Potaro-Siparuni", "Upper Demerara-Berbice", "Upper Takutu-Upper Essequibo"]
    },
    {
      country: "Haiti",
      states: ["Artibonite", "Centre", "Grand 'Anse", "Nord", "Nord-Est", "Nord-Ouest", "Ouest", "Sud", "Sud-Est"]
    },
    {
      country: "Honduras",
      states: ["Atlantida", "Choluteca", "Colon", "Comayagua", "Copan", "Cortes", "El Paraiso", "Francisco Morazan", "Gracias a Dios", "Intibuca", "Islas de la Bahia", "La Paz", "Lempira", "Ocotepeque", "Olancho", "Santa Barbara", "Valle", "Yoro"]
    },
    {
      country: "Hong Kong",
      states: []
    },
    {
      country: "Hungary",
      states: ["Bacs-Kiskun", "Baranya", "Bekes", "Borsod-Abauj-Zemplen", "Csongrad", "Fejer", "Gyor-Moson-Sopron", "Hajdu-Bihar", "Heves", "Jasz-Nagykun-Szolnok", "Komarom-Esztergom", "Nograd", "Pest", "Somogy", "Szabolcs-Szatmar-Bereg", "Tolna", "Vas", "Veszprem", "Zala", "Bekescsaba", "Debrecen", "Dunaujvaros", "Eger", "Gyor", "Hodmezovasarhely", "Kaposvar", "Kecskemet", "Miskolc", "Nagykanizsa", "Nyiregyhaza", "Pecs", "Sopron", "Szeged", "Szekesfehervar", "Szolnok", "Szombathely", "Tatabanya", "Veszprem", "Zalaegerszeg"]
    },
    {
      country: "Iceland",
      states: ["Austurland", "Hofudhborgarsvaedhi", "Nordhurland Eystra", "Nordhurland Vestra", "Sudhurland", "Sudhurnes", "Vestfirdhir", "Vesturland"]
    },
    {
      country: "India",
      states: ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"]
    },
    {
      country: "Indonesia",
      states: ["Aceh", "Bali", "Banten", "Bengkulu", "Gorontalo", "Irian Jaya Barat", "Jakarta Raya", "Jambi", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Kalimantan Barat", "Kalimantan Selatan", "Kalimantan Tengah", "Kalimantan Timur", "Kepulauan Bangka Belitung", "Kepulauan Riau", "Lampung", "Maluku", "Maluku Utara", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Papua", "Riau", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara", "Sulawesi Utara", "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara", "Yogyakarta"]
    },
    {
      country: "Iran",
      states: ["Ardabil", "Azarbayjan-e Gharbi", "Azarbayjan-e Sharqi", "Bushehr", "Chahar Mahall va Bakhtiari", "Esfahan", "Fars", "Gilan", "Golestan", "Hamadan", "Hormozgan", "Ilam", "Kerman", "Kermanshah", "Khorasan-e Janubi", "Khorasan-e Razavi", "Khorasan-e Shemali", "Khuzestan", "Kohgiluyeh va Buyer Ahmad", "Kordestan", "Lorestan", "Markazi", "Mazandaran", "Qazvin", "Qom", "Semnan", "Sistan va Baluchestan", "Tehran", "Yazd", "Zanjan"]
    },
    {
      country: "Iraq",
      states: ["Al Anbar", "Al Basrah", "Al Muthanna", "Al Qadisiyah", "An Najaf", "Arbil", "As Sulaymaniyah", "At Ta'mim", "Babil", "Baghdad", "Dahuk", "Dhi Qar", "Diyala", "Karbala'", "Maysan", "Ninawa", "Salah ad Din", "Wasit"]
    },
    {
      country: "Ireland",
      states: ["Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow"]
    },
    {
      country: "Israel",
      states: ["Central", "Haifa", "Jerusalem", "Northern", "Southern", "Tel Aviv"]
    },
    {
      country: "Italy",
      states: ["Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"]
    },
    {
      country: "Jamaica",
      states: ["Clarendon", "Hanover", "Kingston", "Manchester", "Portland", "Saint Andrew", "Saint Ann", "Saint Catherine", "Saint Elizabeth", "Saint James", "Saint Mary", "Saint Thomas", "Trelawny", "Westmoreland"]
    },
    {
      country: "Japan",
      states: ["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gumma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"]
    },
    {
      country: "Jordan",
      states: ["Ajlun", "Al 'Aqabah", "Al Balqa'", "Al Karak", "Al Mafraq", "'Amman", "At Tafilah", "Az Zarqa'", "Irbid", "Jarash", "Ma'an", "Madaba"]
    },
    {
      country: "Kazakhstan",
      states: ["Almaty Oblysy", "Almaty Qalasy", "Aqmola Oblysy", "Aqtobe Oblysy", "Astana Qalasy", "Atyrau Oblysy", "Batys Qazaqstan Oblysy", "Bayqongyr Qalasy", "Mangghystau Oblysy", "Ongtustik Qazaqstan Oblysy", "Pavlodar Oblysy", "Qaraghandy Oblysy", "Qostanay Oblysy", "Qyzylorda Oblysy", "Shyghys Qazaqstan Oblysy", "Soltustik Qazaqstan Oblysy", "Zhambyl Oblysy"]
    },
    {
      country: "Kenya",
      states: ["Central", "Coast", "Eastern", "Nairobi Area", "North Eastern", "Nyanza", "Rift Valley", "Western"]
    },
    {
      country: "Kiribati",
      states: []
    },
    {
      country: "Korea North",
      states: ["Chagang", "North Hamgyong", "South Hamgyong", "North Hwanghae", "South Hwanghae", "Kangwon", "North P'yongan", "South P'yongan", "Yanggang", "Kaesong", "Najin", "Namp'o", "Pyongyang"]
    },
    {
      country: "Korea South",
      states: ["Seoul", "Busan City", "Daegu City", "Incheon City", "Gwangju City", "Daejeon City", "Ulsan", "Gyeonggi Province", "Gangwon Province", "North Chungcheong Province", "South Chungcheong Province", "North Jeolla Province", "South Jeolla Province", "North Gyeongsang Province", "South Gyeongsang Province", "Jeju"]
    },
    {
      country: "Kuwait",
      states: ["Al Ahmadi", "Al Farwaniyah", "Al Asimah", "Al Jahra", "Hawalli", "Mubarak Al-Kabeer"]
    },
    {
      country: "Kyrgyzstan",
      states: ["Batken Oblasty", "Bishkek Shaary", "Chuy Oblasty", "Jalal-Abad Oblasty", "Naryn Oblasty", "Osh Oblasty", "Talas Oblasty", "Ysyk-Kol Oblasty"]
    },
    {
      country: "Laos",
      states: ["Attapu", "Bokeo", "Bolikhamxai", "Champasak", "Houaphan", "Khammouan", "Louangnamtha", "Louangphrabang", "Oudomxai", "Phongsali", "Salavan", "Savannakhet", "Viangchan", "Viangchan", "Xaignabouli", "Xaisomboun", "Xekong", "Xiangkhoang"]
    },
    {
      country: "Latvia",
      states: ["Aizkraukles Rajons", "Aluksnes Rajons", "Balvu Rajons", "Bauskas Rajons", "Cesu Rajons", "Daugavpils", "Daugavpils Rajons", "Dobeles Rajons", "Gulbenes Rajons", "Jekabpils Rajons", "Jelgava", "Jelgavas Rajons", "Jurmala", "Kraslavas Rajons", "Kuldigas Rajons", "Liepaja", "Liepajas Rajons", "Limbazu Rajons", "Ludzas Rajons", "Madonas Rajons", "Ogres Rajons", "Preilu Rajons", "Rezekne", "Rezeknes Rajons", "Riga", "Rigas Rajons", "Saldus Rajons", "Talsu Rajons", "Tukuma Rajons", "Valkas Rajons", "Valmieras Rajons", "Ventspils", "Ventspils Rajons"]
    },
    {
      country: "Lebanon",
      states: ["Beyrouth", "Beqaa", "Liban-Nord", "Liban-Sud", "Mont-Liban", "Nabatiye"]
    },
    {
      country: "Lesotho",
      states: ["Berea", "Butha-Buthe", "Leribe", "Mafeteng", "Maseru", "Mohale's Hoek", "Mokhotlong", "Qacha's Nek", "Quthing", "Thaba-Tseka"]
    },
    {
      country: "Liberia",
      states: ["Bomi", "Bong", "Gbarpolu", "Grand Bassa", "Grand Cape Mount", "Grand Gedeh", "Grand Kru", "Lofa", "Margibi", "Maryland", "Montserrado", "Nimba", "River Cess", "River Gee", "Sinoe"]
    },
    {
      country: "Libya",
      states: ["Ajdabiya", "Al 'Aziziyah", "Al Fatih", "Al Jabal al Akhdar", "Al Jufrah", "Al Khums", "Al Kufrah", "An Nuqat al Khams", "Ash Shati'", "Awbari", "Az Zawiyah", "Banghazi", "Darnah", "Ghadamis", "Gharyan", "Misratah", "Murzuq", "Sabha", "Sawfajjin", "Surt", "Tarabulus", "Tarhunah", "Tubruq", "Yafran", "Zlitan"]
    },
    {
      country: "Liechtenstein",
      states: ["Balzers", "Eschen", "Gamprin", "Mauren", "Planken", "Ruggell", "Schaan", "Schellenberg", "Triesen", "Triesenberg", "Vaduz"]
    },
    {
      country: "Lithuania",
      states: ["Alytaus", "Kauno", "Klaipedos", "Marijampoles", "Panevezio", "Siauliu", "Taurages", "Telsiu", "Utenos", "Vilniaus"]
    },
    {
      country: "Luxembourg",
      states: ["Diekirch", "Grevenmacher", "Luxembourg"]
    },
    {
      country: "Macedonia",
      states: ["Aerodrom", "Aracinovo", "Berovo", "Bitola", "Bogdanci", "Bogovinje", "Bosilovo", "Brvenica", "Butel", "Cair", "Caska", "Centar", "Centar Zupa", "Cesinovo", "Cucer-Sandevo", "Debar", "Debartsa", "Delcevo", "Demir Hisar", "Demir Kapija", "Dojran", "Dolneni", "Drugovo", "Gazi Baba", "Gevgelija", "Gjorce Petrov", "Gostivar", "Gradsko", "Ilinden", "Jegunovce", "Karbinci", "Karpos", "Kavadarci", "Kicevo", "Kisela Voda", "Kocani", "Konce", "Kratovo", "Kriva Palanka", "Krivogastani", "Krusevo", "Kumanovo", "Lipkovo", "Lozovo", "Makedonska Kamenica", "Makedonski Brod", "Mavrovo i Rastusa", "Mogila", "Negotino", "Novaci", "Novo Selo", "Ohrid", "Oslomej", "Pehcevo", "Petrovec", "Plasnica", "Prilep", "Probistip", "Radovis", "Rankovce", "Resen", "Rosoman", "Saraj", "Skopje", "Sopiste", "Staro Nagoricane", "Stip", "Struga", "Strumica", "Studenicani", "Suto Orizari", "Sveti Nikole", "Tearce", "Tetovo", "Valandovo", "Vasilevo", "Veles", "Vevcani", "Vinica", "Vranestica", "Vrapciste", "Zajas", "Zelenikovo", "Zelino", "Zrnovci"]
    },
    {
      country: "Madagascar",
      states: ["Antananarivo", "Antsiranana", "Fianarantsoa", "Mahajanga", "Toamasina", "Toliara"]
    },
    {
      country: "Malawi",
      states: ["Balaka", "Blantyre", "Chikwawa", "Chiradzulu", "Chitipa", "Dedza", "Dowa", "Karonga", "Kasungu", "Likoma", "Lilongwe", "Machinga", "Mangochi", "Mchinji", "Mulanje", "Mwanza", "Mzimba", "Ntcheu", "Nkhata Bay", "Nkhotakota", "Nsanje", "Ntchisi", "Phalombe", "Rumphi", "Salima", "Thyolo", "Zomba"]
    },
    {
      country: "Malaysia",
      states: ["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan", "Malacca", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Penang", "Sabah", "Sarawak", "Selangor", "Terengganu"]
    },
    {
      country: "Maldives",
      states: ["Alifu", "Baa", "Dhaalu", "Faafu", "Gaafu Alifu", "Gaafu Dhaalu", "Gnaviyani", "Haa Alifu", "Haa Dhaalu", "Kaafu", "Laamu", "Lhaviyani", "Maale", "Meemu", "Noonu", "Raa", "Seenu", "Shaviyani", "Thaa", "Vaavu"]
    },
    {
      country: "Mali",
      states: ["Bamako (Capital)", "Gao", "Kayes", "Kidal", "Koulikoro", "Mopti", "Segou", "Sikasso", "Tombouctou"]
    },
    {
      country: "Malta",
      states: []
    },
    {
      country: "Marshall Islands",
      states: []
    },
    {
      country: "Mauritania",
      states: ["Adrar", "Assaba", "Brakna", "Dakhlet Nouadhibou", "Gorgol", "Guidimaka", "Hodh Ech Chargui", "Hodh El Gharbi", "Inchiri", "Nouakchott", "Tagant", "Tiris Zemmour", "Trarza"]
    },
    {
      country: "Mauritius",
      states: ["Agalega Islands", "Black River", "Cargados Carajos Shoals", "Flacq", "Grand Port", "Moka", "Pamplemousses", "Plaines Wilhems", "Port Louis", "Riviere du Rempart", "Rodrigues", "Savanne"]
    },
    {
      country: "Mexico",
      states: ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila de Zaragoza", "Colima", "Distrito Federal", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico", "Michoacan de Ocampo", "Morelos", "Nayarit", "Nuevo Leon", "Oaxaca", "Puebla", "Queretaro de Arteaga", "Quintana Roo", "San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz-Llave", "Yucatan", "Zacatecas"]
    },
    {
      country: "Micronesia",
      states: []
    },
    {
      country: "Moldova",
      states: ["Anenii Noi", "Basarabeasca", "Briceni", "Cahul", "Cantemir", "Calarasi", "Causeni", "Cimislia", "Criuleni", "Donduseni", "Drochia", "Dubasari", "Edinet", "Falesti", "Floresti", "Glodeni", "Hincesti", "Ialoveni", "Leova", "Nisporeni", "Ocnita", "Orhei", "Rezina", "Riscani", "Singerei", "Soldanesti", "Soroca", "Stefan-Voda", "Straseni", "Taraclia", "Telenesti", "Ungheni", "Balti", "Bender", "Chisinau", "Gagauzia", "Stinga Nistrului"]
    },
    {
      country: "Mongolia",
      states: ["Arhangay", "Bayanhongor", "Bayan-Olgiy", "Bulgan", "Darhan Uul", "Dornod", "Dornogovi", "Dundgovi", "Dzavhan", "Govi-Altay", "Govi-Sumber", "Hentiy", "Hovd", "Hovsgol", "Omnogovi", "Orhon", "Ovorhangay", "Selenge", "Suhbaatar", "Tov", "Ulaanbaatar", "Uvs"]
    },
    {
      country: "Morocco",
      states: ["Agadir", "Al Hoceima", "Azilal", "Beni Mellal", "Ben Slimane", "Boulemane", "Casablanca", "Chaouen", "El Jadida", "El Kelaa des Sraghna", "Er Rachidia", "Essaouira", "Fes", "Figuig", "Guelmim", "Ifrane", "Kenitra", "Khemisset", "Khenifra", "Khouribga", "Laayoune", "Larache", "Marrakech", "Meknes", "Nador", "Ouarzazate", "Oujda", "Rabat-Sale", "Safi", "Settat", "Sidi Kacem", "Tangier", "Tan-Tan", "Taounate", "Taroudannt", "Tata", "Taza", "Tetouan", "Tiznit"]
    },
    {
      country: "Monaco",
      states: []
    },
    {
      country: "Mozambique",
      states: ["Cabo Delgado", "Gaza", "Inhambane", "Manica", "Maputo", "Cidade de Maputo", "Nampula", "Niassa", "Sofala", "Tete", "Zambezia"]
    },
    {
      country: "Namibia",
      states: ["Caprivi", "Erongo", "Hardap", "Karas", "Khomas", "Kunene", "Ohangwena", "Okavango", "Omaheke", "Omusati", "Oshana", "Oshikoto", "Otjozondjupa"]
    },
    {
      country: "Nauru",
      states: []
    },
    {
      country: "Nepal",
      states: ["Bagmati", "Bheri", "Dhawalagiri", "Gandaki", "Janakpur", "Karnali", "Kosi", "Lumbini", "Mahakali", "Mechi", "Narayani", "Rapti", "Sagarmatha", "Seti"]
    },
    {
      country: "Netherlands",
      states: ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"]
    },
    {
      country: "New Zealand",
      states: ["Auckland", "Bay of Plenty", "Canterbury", "Chatham Islands", "Gisborne", "Hawke's Bay", "Manawatu-Wanganui", "Marlborough", "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Tasman", "Waikato", "Wellington", "West Coast"]
    },
    {
      country: "Nicaragua",
      states: ["Atlantico Norte", "Atlantico Sur", "Boaco", "Carazo", "Chinandega", "Chontales", "Esteli", "Granada", "Jinotega", "Leon", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Rio San Juan", "Rivas"]
    },
    {
      country: "Niger",
      states: ["Agadez", "Diffa", "Dosso", "Maradi", "Niamey", "Tahoua", "Tillaberi", "Zinder"]
    },
    {
      country: "Nigeria",
      states: ["Abia", "Abuja Federal Capital", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nassarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]
    },
    {
      country: "Norway",
      states: ["Akershus", "Aust-Agder", "Buskerud", "Finnmark", "Hedmark", "Hordaland", "More og Romsdal", "Nordland", "Nord-Trondelag", "Oppland", "Oslo", "Ostfold", "Rogaland", "Sogn og Fjordane", "Sor-Trondelag", "Telemark", "Troms", "Vest-Agder", "Vestfold"]
    },
    {
      country: "Oman",
      states: ["Ad Dakhiliyah", "Al Batinah", "Al Wusta", "Ash Sharqiyah", "Az Zahirah", "Masqat", "Musandam", "Dhofar"]
    },
    {
      country: "Pakistan",
      states: ["Balochistan", "North-West Frontier Province", "Punjab", "Sindh", "Islamabad Capital Territory", "Federally Administered Tribal Areas"]
    },
    {
      country: "Panama",
      states: ["Bocas del Toro", "Chiriqui", "Cocle", "Colon", "Darien", "Herrera", "Los Santos", "Panama", "San Blas", "Veraguas"]
    },
    {
      country: "Papua New Guinea",
      states: ["Bougainville", "Central", "Chimbu", "Eastern Highlands", "East New Britain", "East Sepik", "Enga", "Gulf", "Madang", "Manus", "Milne Bay", "Morobe", "National Capital", "New Ireland", "Northern", "Sandaun", "Southern Highlands", "Western", "Western Highlands", "West New Britain"]
    },
    {
      country: "Paraguay",
      states: ["Alto Paraguay", "Alto Parana", "Amambay", "Asuncion", "Boqueron", "Caaguazu", "Caazapa", "Canindeyu", "Central", "Concepcion", "Cordillera", "Guaira", "Itapua", "Misiones", "Neembucu", "Paraguari", "Presidente Hayes", "San Pedro"]
    },
    {
      country: "Peru",
      states: ["Amazonas", "Ancash", "Apurimac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huanuco", "Ica", "Junin", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martin", "Tacna", "Tumbes", "Ucayali"]
    },
    {
      country: "Philippines",
      states: ["Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay", "Antique", "Apayao", "Aurora", "Basilan", "Bataan", "Batanes", "Batangas", "Biliran", "Benguet", "Bohol", "Bukidnon", "Bulacan", "Cagayan", "Camarines Norte", "Camarines Sur", "Camiguin", "Capiz", "Catanduanes", "Cavite", "Cebu", "Compostela", "Davao del Norte", "Davao del Sur", "Davao Oriental", "Eastern Samar", "Guimaras", "Ifugao", "Ilocos Norte", "Ilocos Sur", "Iloilo", "Isabela", "Kalinga", "Laguna", "Lanao del Norte", "Lanao del Sur", "La Union", "Leyte", "Maguindanao", "Marinduque", "Masbate", "Mindoro Occidental", "Mindoro Oriental", "Misamis Occidental", "Misamis Oriental", "Mountain Province", "Negros Occidental", "Negros Oriental", "North Cotabato", "Northern Samar", "Nueva Ecija", "Nueva Vizcaya", "Palawan", "Pampanga", "Pangasinan", "Quezon", "Quirino", "Rizal", "Romblon", "Samar", "Sarangani", "Siquijor", "Sorsogon", "South Cotabato", "Southern Leyte", "Sultan Kudarat", "Sulu", "Surigao del Norte", "Surigao del Sur", "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"]
    },
    {
      country: "Poland",
      states: ["Greater Poland (Wielkopolskie)", "Kuyavian-Pomeranian (Kujawsko-Pomorskie)", "Lesser Poland (Malopolskie)", "Lodz (Lodzkie)", "Lower Silesian (Dolnoslaskie)", "Lublin (Lubelskie)", "Lubusz (Lubuskie)", "Masovian (Mazowieckie)", "Opole (Opolskie)", "Podlasie (Podlaskie)", "Pomeranian (Pomorskie)", "Silesian (Slaskie)", "Subcarpathian (Podkarpackie)", "Swietokrzyskie (Swietokrzyskie)", "Warmian-Masurian (Warminsko-Mazurskie)", "West Pomeranian (Zachodniopomorskie)"]
    },
    {
      country: "Portugal",
      states: ["Aveiro", "Acores", "Beja", "Braga", "Braganca", "Castelo Branco", "Coimbra", "Evora", "Faro", "Guarda", "Leiria", "Lisboa", "Madeira", "Portalegre", "Porto", "Santarem", "Setubal", "Viana do Castelo", "Vila Real", "Viseu"]
    },
    {
      country: "Qatar",
      states: ["Ad Dawhah", "Al Ghuwayriyah", "Al Jumayliyah", "Al Khawr", "Al Wakrah", "Ar Rayyan", "Jarayan al Batinah", "Madinat ash Shamal", "Umm Sa'id", "Umm Salal"]
    },
    {
      country: "Romania",
      states: ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Braila", "Brasov", "Bucuresti", "Buzau", "Calarasi", "Caras-Severin", "Cluj", "Constanta", "Covasna", "Dimbovita", "Dolj", "Galati", "Gorj", "Giurgiu", "Harghita", "Hunedoara", "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt", "Prahova", "Salaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman", "Timis", "Tulcea", "Vaslui", "Vilcea", "Vrancea"]
    },
    {
      country: "Russia",
      states: ["Amur", "Arkhangel'sk", "Astrakhan'", "Belgorod", "Bryansk", "Chelyabinsk", "Chita", "Irkutsk", "Ivanovo", "Kaliningrad", "Kaluga", "Kamchatka", "Kemerovo", "Kirov", "Kostroma", "Kurgan", "Kursk", "Leningrad", "Lipetsk", "Magadan", "Moscow", "Murmansk", "Nizhniy Novgorod", "Novgorod", "Novosibirsk", "Omsk", "Orenburg", "Orel", "Penza", "Perm'", "Pskov", "Rostov", "Ryazan'", "Sakhalin", "Samara", "Saratov", "Smolensk", "Sverdlovsk", "Tambov", "Tomsk", "Tula", "Tver'", "Tyumen'", "Ul'yanovsk", "Vladimir", "Volgograd", "Vologda", "Voronezh", "Yaroslavl'", "Adygeya", "Altay", "Bashkortostan", "Buryatiya", "Chechnya", "Chuvashiya", "Dagestan", "Ingushetiya", "Kabardino-Balkariya", "Kalmykiya", "Karachayevo-Cherkesiya", "Kareliya", "Khakasiya", "Komi", "Mariy-El", "Mordoviya", "Sakha", "North Ossetia", "Tatarstan", "Tyva", "Udmurtiya", "Aga Buryat", "Chukotka", "Evenk", "Khanty-Mansi", "Komi-Permyak", "Koryak", "Nenets", "Taymyr", "Ust'-Orda Buryat", "Yamalo-Nenets", "Altay", "Khabarovsk", "Krasnodar", "Krasnoyarsk", "Primorskiy", "Stavropol'", "Moscow", "St. Petersburg", "Yevrey"]
    },
    {
      country: "Rwanda",
      states: ["Butare", "Byumba", "Cyangugu", "Gikongoro", "Gisenyi", "Gitarama", "Kibungo", "Kibuye", "Kigali Rurale", "Kigali-ville", "Umutara", "Ruhengeri"]
    },
    {
      country: "Samoa",
      states: ["A'ana", "Aiga-i-le-Tai", "Atua", "Fa'asaleleaga", "Gaga'emauga", "Gagaifomauga", "Palauli", "Satupa'itea", "Tuamasaga", "Va'a-o-Fonoti", "Vaisigano"]
    },
    {
      country: "San Marino",
      states: ["Acquaviva", "Borgo Maggiore", "Chiesanuova", "Domagnano", "Faetano", "Fiorentino", "Montegiardino", "San Marino Citta", "Serravalle"]
    },
    {
      country: "Sao Tome",
      states: []
    },
    {
      country: "Saudi Arabia",
      states: ["Al Bahah", "Al Hudud ash Shamaliyah", "Al Jawf", "Al Madinah", "Al Qasim", "Ar Riyad", "Ash Sharqiyah", "'Asir", "Ha'il", "Jizan", "Makkah", "Najran", "Tabuk"]
    },
    {
      country: "Senegal",
      states: ["Dakar", "Diourbel", "Fatick", "Kaolack", "Kolda", "Louga", "Matam", "Saint-Louis", "Tambacounda", "Thies", "Ziguinchor"]
    },
    {
      country: "Serbia and Montenegro",
      states: ["Kosovo", "Montenegro", "Serbia", "Vojvodina"]
    },
    {
      country: "Seychelles",
      states: ["Anse aux Pins", "Anse Boileau", "Anse Etoile", "Anse Louis", "Anse Royale", "Baie Lazare", "Baie Sainte Anne", "Beau Vallon", "Bel Air", "Bel Ombre", "Cascade", "Glacis", "Grand' Anse", "Grand' Anse", "La Digue", "La Riviere Anglaise", "Mont Buxton", "Mont Fleuri", "Plaisance", "Pointe La Rue", "Port Glaud", "Saint Louis", "Takamaka"]
    },
    {
      country: "Sierra Leone",
      states: []
    },
    {
      country: "Singapore",
      states: []
    },
    {
      country: "Slovakia",
      states: ["Banskobystricky", "Bratislavsky", "Kosicky", "Nitriansky", "Presovsky", "Trenciansky", "Trnavsky", "Zilinsky"]
    },
    {
      country: "Slovenia",
      states: ["Ajdovscina", "Beltinci", "Benedikt", "Bistrica ob Sotli", "Bled", "Bloke", "Bohinj", "Borovnica", "Bovec", "Braslovce", "Brda", "Brezice", "Brezovica", "Cankova", "Celje", "Cerklje na Gorenjskem", "Cerknica", "Cerkno", "Cerkvenjak", "Crensovci", "Crna na Koroskem", "Crnomelj", "Destrnik", "Divaca", "Dobje", "Dobrepolje", "Dobrna", "Dobrova-Horjul-Polhov Gradec", "Dobrovnik-Dobronak", "Dolenjske Toplice", "Dol pri Ljubljani", "Domzale", "Dornava", "Dravograd", "Duplek", "Gorenja Vas-Poljane", "Gorisnica", "Gornja Radgona", "Gornji Grad", "Gornji Petrovci", "Grad", "Grosuplje", "Hajdina", "Hoce-Slivnica", "Hodos-Hodos", "Horjul", "Hrastnik", "Hrpelje-Kozina", "Idrija", "Ig", "Ilirska Bistrica", "Ivancna Gorica", "Izola-Isola", "Jesenice", "Jezersko", "Jursinci", "Kamnik", "Kanal", "Kidricevo", "Kobarid", "Kobilje", "Kocevje", "Komen", "Komenda", "Koper-Capodistria", "Kostel", "Kozje", "Kranj", "Kranjska Gora", "Krizevci", "Krsko", "Kungota", "Kuzma", "Lasko", "Lenart", "Lendava-Lendva", "Litija", "Ljubljana", "Ljubno", "Ljutomer", "Logatec", "Loska Dolina", "Loski Potok", "Lovrenc na Pohorju", "Luce", "Lukovica", "Majsperk", "Maribor", "Markovci", "Medvode", "Menges", "Metlika", "Mezica", "Miklavz na Dravskem Polju", "Miren-Kostanjevica", "Mirna Pec", "Mislinja", "Moravce", "Moravske Toplice", "Mozirje", "Murska Sobota", "Muta", "Naklo", "Nazarje", "Nova Gorica", "Novo Mesto", "Odranci", "Oplotnica", "Ormoz", "Osilnica", "Pesnica", "Piran-Pirano", "Pivka", "Podcetrtek", "Podlehnik", "Podvelka", "Polzela", "Postojna", "Prebold", "Preddvor", "Prevalje", "Ptuj", "Puconci", "Race-Fram", "Radece", "Radenci", "Radlje ob Dravi", "Radovljica", "Ravne na Koroskem", "Razkrizje", "Ribnica", "Ribnica na Pohorju", "Rogasovci", "Rogaska Slatina", "Rogatec", "Ruse", "Salovci", "Selnica ob Dravi", "Semic", "Sempeter-Vrtojba", "Sencur", "Sentilj", "Sentjernej", "Sentjur pri Celju", "Sevnica", "Sezana", "Skocjan", "Skofja Loka", "Skofljica", "Slovenj Gradec", "Slovenska Bistrica", "Slovenske Konjice", "Smarje pri Jelsah", "Smartno ob Paki", "Smartno pri Litiji", "Sodrazica", "Solcava", "Sostanj", "Starse", "Store", "Sveta Ana", "Sveti Andraz v Slovenskih Goricah", "Sveti Jurij", "Tabor", "Tisina", "Tolmin", "Trbovlje", "Trebnje", "Trnovska Vas", "Trzic", "Trzin", "Turnisce", "Velenje", "Velika Polana", "Velike Lasce", "Verzej", "Videm", "Vipava", "Vitanje", "Vodice", "Vojnik", "Vransko", "Vrhnika", "Vuzenica", "Zagorje ob Savi", "Zalec", "Zavrc", "Zelezniki", "Zetale", "Ziri", "Zirovnica", "Zuzemberk", "Zrece"]
    },
    {
      country: "Solomon Islands",
      states: ["Central", "Choiseul", "Guadalcanal", "Honiara", "Isabel", "Makira", "Malaita", "Rennell and Bellona", "Temotu", "Western"]
    },
    {
      country: "Somalia",
      states: ["Awdal", "Bakool", "Banaadir", "Bari", "Bay", "Galguduud", "Gedo", "Hiiraan", "Jubbada Dhexe", "Jubbada Hoose", "Mudug", "Nugaal", "Sanaag", "Shabeellaha Dhexe", "Shabeellaha Hoose", "Sool", "Togdheer", "Woqooyi Galbeed"]
    },
    {
      country: "South Africa",
      states: ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North-West", "Northern Cape", "Western Cape"]
    },
    {
      country: "Spain",
      states: ["Andalucia", "Aragon", "Asturias", "Baleares", "Ceuta", "Canarias", "Cantabria", "Castilla-La Mancha", "Castilla y Leon", "Cataluna", "Comunidad Valenciana", "Extremadura", "Galicia", "La Rioja", "Madrid", "Melilla", "Murcia", "Navarra", "Pais Vasco"]
    },
    {
      country: "Sri Lanka",
      states: ["Central", "North Central", "North Eastern", "North Western", "Sabaragamuwa", "Southern", "Uva", "Western"]
    },
    {
      country: "Sudan",
      states: ["A'ali an Nil", "Al Bahr al Ahmar", "Al Buhayrat", "Al Jazirah", "Al Khartum", "Al Qadarif", "Al Wahdah", "An Nil al Abyad", "An Nil al Azraq", "Ash Shamaliyah", "Bahr al Jabal", "Gharb al Istiwa'iyah", "Gharb Bahr al Ghazal", "Gharb Darfur", "Gharb Kurdufan", "Janub Darfur", "Janub Kurdufan", "Junqali", "Kassala", "Nahr an Nil", "Shamal Bahr al Ghazal", "Shamal Darfur", "Shamal Kurdufan", "Sharq al Istiwa'iyah", "Sinnar", "Warab"]
    },
    {
      country: "Suriname",
      states: ["Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie", "Para", "Paramaribo", "Saramacca", "Sipaliwini", "Wanica"]
    },
    {
      country: "Swaziland",
      states: ["Hhohho", "Lubombo", "Manzini", "Shiselweni"]
    },
    {
      country: "Sweden",
      states: ["Blekinge", "Dalarnas", "Gavleborgs", "Gotlands", "Hallands", "Jamtlands", "Jonkopings", "Kalmar", "Kronobergs", "Norrbottens", "Orebro", "Ostergotlands", "Skane", "Sodermanlands", "Stockholms", "Uppsala", "Varmlands", "Vasterbottens", "Vasternorrlands", "Vastmanlands", "Vastra Gotalands"]
    },
    {
      country: "Switzerland",
      states: ["Aargau", "Appenzell Ausser-Rhoden", "Appenzell Inner-Rhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg", "Geneve", "Glarus", "Graubunden", "Jura", "Luzern", "Neuchatel", "Nidwalden", "Obwalden", "Sankt Gallen", "Schaffhausen", "Schwyz", "Solothurn", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zurich"]
    },
    {
      country: "Syria",
      states: ["Al Hasakah", "Al Ladhiqiyah", "Al Qunaytirah", "Ar Raqqah", "As Suwayda'", "Dar'a", "Dayr az Zawr", "Dimashq", "Halab", "Hamah", "Hims", "Idlib", "Rif Dimashq", "Tartus"]
    },
    {
      country: "Taiwan",
      states: ["Chang-hua", "Chia-i", "Hsin-chu", "Hua-lien", "I-lan", "Kao-hsiung", "Kin-men", "Lien-chiang", "Miao-li", "Nan-t'ou", "P'eng-hu", "P'ing-tung", "T'ai-chung", "T'ai-nan", "T'ai-pei", "T'ai-tung", "T'ao-yuan", "Yun-lin", "Chia-i", "Chi-lung", "Hsin-chu", "T'ai-chung", "T'ai-nan", "Kao-hsiung city", "T'ai-pei city"]
    },
    {
      country: "Tajikistan",
      states: []
    },
    {
      country: "Tanzania",
      states: ["Arusha", "Dar es Salaam", "Dodoma", "Iringa", "Kagera", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Pemba North", "Pemba South", "Pwani", "Rukwa", "Ruvuma", "Shinyanga", "Singida", "Tabora", "Tanga", "Zanzibar Central/South", "Zanzibar North", "Zanzibar Urban/West"]
    },
    {
      country: "Thailand",
      states: ["Amnat Charoen", "Ang Thong", "Buriram", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", "Krung Thep Mahanakhon", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lamphu", "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phangnga", "Phatthalung", "Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", "Phrae", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Sara Buri", "Satun", "Sing Buri", "Sisaket", "Songkhla", "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Tak", "Trang", "Trat", "Ubon Ratchathani", "Udon Thani", "Uthai Thani", "Uttaradit", "Yala", "Yasothon"]
    },
    {
      country: "Togo",
      states: ["Kara", "Plateaux", "Savanes", "Centrale", "Maritime"]
    },
    {
      country: "Tonga",
      states: []
    },
    {
      country: "Trinidad and Tobago",
      states: ["Couva", "Diego Martin", "Mayaro", "Penal", "Princes Town", "Sangre Grande", "San Juan", "Siparia", "Tunapuna", "Port-of-Spain", "San Fernando", "Arima", "Point Fortin", "Chaguanas", "Tobago"]
    },
    {
      country: "Tunisia",
      states: ["Ariana (Aryanah)", "Beja (Bajah)", "Ben Arous (Bin 'Arus)", "Bizerte (Banzart)", "Gabes (Qabis)", "Gafsa (Qafsah)", "Jendouba (Jundubah)", "Kairouan (Al Qayrawan)", "Kasserine (Al Qasrayn)", "Kebili (Qibili)", "Kef (Al Kaf)", "Mahdia (Al Mahdiyah)", "Manouba (Manubah)", "Medenine (Madanin)", "Monastir (Al Munastir)", "Nabeul (Nabul)", "Sfax (Safaqis)", "Sidi Bou Zid (Sidi Bu Zayd)", "Siliana (Silyanah)", "Sousse (Susah)", "Tataouine (Tatawin)", "Tozeur (Tawzar)", "Tunis", "Zaghouan (Zaghwan)"]
    },
    {
      country: "Turkey",
      states: ["Adana", "Adiyaman", "Afyonkarahisar", "Agri", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydin", "Balikesir", "Bartin", "Batman", "Bayburt", "Bilecik", "Bingol", "Bitlis", "Bolu", "Burdur", "Bursa", "Canakkale", "Cankiri", "Corum", "Denizli", "Diyarbakir", "Duzce", "Edirne", "Elazig", "Erzincan", "Erzurum", "Eskisehir", "Gaziantep", "Giresun", "Gumushane", "Hakkari", "Hatay", "Igdir", "Isparta", "Istanbul", "Izmir", "Kahramanmaras", "Karabuk", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kirikkale", "Kirklareli", "Kirsehir", "Kocaeli", "Konya", "Kutahya", "Malatya", "Manisa", "Mardin", "Mersin", "Mugla", "Mus", "Nevsehir", "Nigde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Sanliurfa", "Siirt", "Sinop", "Sirnak", "Sivas", "Tekirdag", "Tokat", "Trabzon", "Tunceli", "Usak", "Van", "Yalova", "Yozgat", "Zonguldak"]
    },
    {
      country: "Turkmenistan",
      states: ["Ahal Welayaty (Ashgabat)", "Balkan Welayaty (Balkanabat)", "Dashoguz Welayaty", "Lebap Welayaty (Turkmenabat)", "Mary Welayaty"]
    },
    {
      country: "Uganda",
      states: ["Adjumani", "Apac", "Arua", "Bugiri", "Bundibugyo", "Bushenyi", "Busia", "Gulu", "Hoima", "Iganga", "Jinja", "Kabale", "Kabarole", "Kaberamaido", "Kalangala", "Kampala", "Kamuli", "Kamwenge", "Kanungu", "Kapchorwa", "Kasese", "Katakwi", "Kayunga", "Kibale", "Kiboga", "Kisoro", "Kitgum", "Kotido", "Kumi", "Kyenjojo", "Lira", "Luwero", "Masaka", "Masindi", "Mayuge", "Mbale", "Mbarara", "Moroto", "Moyo", "Mpigi", "Mubende", "Mukono", "Nakapiripirit", "Nakasongola", "Nebbi", "Ntungamo", "Pader", "Pallisa", "Rakai", "Rukungiri", "Sembabule", "Sironko", "Soroti", "Tororo", "Wakiso", "Yumbe"]
    },
    {
      country: "Ukraine",
      states: ["Cherkasy", "Chernihiv", "Chernivtsi", "Crimea", "Dnipropetrovs'k", "Donets'k", "Ivano-Frankivs'k", "Kharkiv", "Kherson", "Khmel'nyts'kyy", "Kirovohrad", "Kiev", "Kyyiv", "Luhans'k", "L'viv", "Mykolayiv", "Odesa", "Poltava", "Rivne", "Sevastopol'", "Sumy", "Ternopil'", "Vinnytsya", "Volyn'", "Zakarpattya", "Zaporizhzhya", "Zhytomyr"]
    },
    {
      country: "United Arab Emirates",
      states: ["Abu Dhabi", "'Ajman", "Al Fujayrah", "Sharjah", "Dubai", "Ra's al Khaymah", "Umm al Qaywayn"]
    },
    {
      country: "United Kingdom",
      states: []
    },
    {
      country: "United States",
      states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    },
    {
      country: "Uruguay",
      states: ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandu", "Rio Negro", "Rivera", "Rocha", "Salto", "San Jose", "Soriano", "Tacuarembo", "Treinta y Tres"]
    },
    {
      country: "Uzbekistan",
      states: ["Andijon Viloyati", "Buxoro Viloyati", "Farg'ona Viloyati", "Jizzax Viloyati", "Namangan Viloyati", "Navoiy Viloyati", "Qashqadaryo Viloyati", "Qaraqalpog'iston Respublikasi", "Samarqand Viloyati", "Sirdaryo Viloyati", "Surxondaryo Viloyati", "Toshkent Shahri", "Toshkent Viloyati", "Xorazm Viloyati"]
    },
    {
      country: "Vanuatu",
      states: ["Malampa", "Penama", "Sanma", "Shefa", "Tafea", "Torba"]
    },
    {
      country: "Venezuela",
      states: ["Amazonas", "Anzoategui", "Apure", "Aragua", "Barinas", "Bolivar", "Carabobo", "Cojedes", "Delta Amacuro", "Dependencias Federales", "Distrito Federal", "Falcon", "Guarico", "Lara", "Merida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Tachira", "Trujillo", "Vargas", "Yaracuy", "Zulia"]
    },
    {
      country: "Vietnam",
      states: ["An Giang", "Bac Giang", "Bac Kan", "Bac Lieu", "Bac Ninh", "Ba Ria-Vung Tau", "Ben Tre", "Binh Dinh", "Binh Duong", "Binh Phuoc", "Binh Thuan", "Ca Mau", "Cao Bang", "Dac Lak", "Dac Nong", "Dien Bien", "Dong Nai", "Dong Thap", "Gia Lai", "Ha Giang", "Hai Duong", "Ha Nam", "Ha Tay", "Ha Tinh", "Hau Giang", "Hoa Binh", "Hung Yen", "Khanh Hoa", "Kien Giang", "Kon Tum", "Lai Chau", "Lam Dong", "Lang Son", "Lao Cai", "Long An", "Nam Dinh", "Nghe An", "Ninh Binh", "Ninh Thuan", "Phu Tho", "Phu Yen", "Quang Binh", "Quang Nam", "Quang Ngai", "Quang Ninh", "Quang Tri", "Soc Trang", "Son La", "Tay Ninh", "Thai Binh", "Thai Nguyen", "Thanh Hoa", "Thua Thien-Hue", "Tien Giang", "Tra Vinh", "Tuyen Quang", "Vinh Long", "Vinh Phuc", "Yen Bai", "Can Tho", "Da Nang", "Hai Phong", "Hanoi", "Ho Chi Minh"]
    },
    {
      country: "Yemen",
      states: ["Abyan", "'Adan", "Ad Dali'", "Al Bayda'", "Al Hudaydah", "Al Jawf", "Al Mahrah", "Al Mahwit", "'Amran", "Dhamar", "Hadramawt", "Hajjah", "Ibb", "Lahij", "Ma'rib", "Sa'dah", "San'a'", "Shabwah", "Ta'izz"]
    },
    {
      country: "Zambia",
      states: ["Central", "Copperbelt", "Eastern", "Luapula", "Lusaka", "Northern", "North-Western", "Southern", "Western"]
    },
    {
      country: "Zimbabwe",
      states: ["Bulawayo", "Harare", "Manicaland", "Mashonaland Central", "Mashonaland East", "Mashonaland West", "Masvingo", "Matabeleland North", "Matabeleland South", "Midlands"]
    }
  ]
};

// app/components/AddressForm.jsx
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
  import.meta.hot.lastModified = "1696944680427.7002";
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
    country: "United States",
    type: "",
    birthday: "",
    anniversary: ""
  });
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    if (name === "country") {
      const selectedCountry2 = location_default.countries.find((country) => country.country === value);
      setFormData((prev) => ({
        ...prev,
        country: value,
        state: selectedCountry2 ? selectedCountry2.states[0] : ""
        // Set default state
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const selectedCountry = location_default.countries.find((country) => country.country === formData.country);
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
          lineNumber: 100,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "firstName", name: "firstName", type: "text", required: true, placeholder: "First Name", value: formData.firstName, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 103,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 99,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "lastName", children: "Last Name" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 106,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "lastName", name: "lastName", required: true, type: "text", placeholder: "Last Name", value: formData.lastName, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 98,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "businessName", children: "Business Name (Optional)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 114,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "businessName", name: "businessName", type: "text", placeholder: "Business Name", value: formData.businessName, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 117,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 113,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "address1", children: "Address 1" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 121,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "address1", name: "address1", type: "text", placeholder: "Address 1", required: true, value: formData.address1, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 124,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 120,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "address2", children: "Address 2 (Optional)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 128,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "address2", name: "address2", type: "text", placeholder: "Address 2", value: formData.address2, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 127,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4 flex flex-wrap -mx-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "city", children: "City" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 136,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "city", name: "city", type: "text", required: true, placeholder: "City", value: formData.city, onChange: handleChange }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 139,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 135,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/2 px-3 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "stateProvince", children: "State/Province" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 142,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { onChange: handleChange, value: formData.state, name: "state", className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "state", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Select a state" }, void 0, false, {
            fileName: "app/components/AddressForm.jsx",
            lineNumber: 146,
            columnNumber: 15
          }, this),
          selectedCountry && selectedCountry.states.map((state) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: state, children: state }, state, false, {
            fileName: "app/components/AddressForm.jsx",
            lineNumber: 147,
            columnNumber: 71
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 145,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 134,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "postalCode", children: "Postal Code" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 155,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "postalCode", required: true, name: "postalCode", type: "text", placeholder: "Postal Code", value: formData.postalCode, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 158,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 154,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "country", children: "Country" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { onChange: handleChange, value: formData.country, itemID: "country", name: "country", id: "country", className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", children: location_default.countries.map((country) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: country.country, children: country.country }, country.country, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 166,
        columnNumber: 48
      }, this)) }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 165,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 161,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "type", children: "Type" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 173,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "type", name: "type", value: formData.type, onChange: handleChange, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { children: "Recipient" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 177,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { children: "Sender" }, void 0, false, {
          fileName: "app/components/AddressForm.jsx",
          lineNumber: 178,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 176,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 172,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "birthday", children: "Birthday (MM/DD/YYYY)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 184,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "birthday", name: "birthday", type: "date", pattern: "\\d{1,2}/\\d{1,2}/\\d{4}", placeholder: "MM/DD/YYYY", value: formData.birthday, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 187,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 183,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "anniversary", children: "Anniversary (MM/DD/YYYY)" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 191,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "anniversary", name: "anniversary", type: "date", pattern: "\\d{1,2}/\\d{1,2}/\\d{4}", placeholder: "MM/DD/YYYY", value: formData.anniversary, onChange: handleChange }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 194,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 190,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: " flex gap-[20px] mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: uploadDataToAPI, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", children: "Save Address" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 197,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", onClick: () => {
        setAddressForm(false);
        setEditAddress(false);
      }, children: "Cancel" }, void 0, false, {
        fileName: "app/components/AddressForm.jsx",
        lineNumber: 200,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AddressForm.jsx",
      lineNumber: 196,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AddressForm.jsx",
    lineNumber: 97,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/AddressForm.jsx",
    lineNumber: 96,
    columnNumber: 10
  }, this);
};
_s2(AddressForm, "L/Qb3nyWzUu/OwCjPa70cqh7coo=");
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
//# sourceMappingURL=/build/routes/($locale).address-book-C43PMUGS.js.map
