import {
  countries
} from "/build/_shared/chunk-VFPJDGJ3.js";
import {
  useLocation,
  useMatches
} from "/build/_shared/chunk-7LX4FZKM.js";
import {
  createHotContext
} from "/build/_shared/chunk-M5RZR2GW.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/textr/index.js
var require_textr = __commonJS({
  "node_modules/textr/index.js"(exports, module) {
    "use strict";
    module.exports = function textr(defaults) {
      var mws = [];
      defaults = defaults || {};
      function api() {
        return exec.apply(null, arguments);
      }
      api.exec = exec;
      api.use = use;
      api.mws = mws;
      return api;
      function exec(text, options) {
        options = clone(defaults, options);
        var l = mws.length;
        for (var i = 0; i < l; i++) {
          text = mws[i].apply(text, [text, options]) || text;
        }
        return text;
      }
      function use() {
        [].push.apply(mws, arguments);
        return api;
      }
    };
    function clone() {
      var res = {};
      var length = arguments.length;
      for (var i = 0; i < length; i++) {
        var obj = arguments[i];
        for (var k in obj) {
          res[k] = obj[k];
        }
      }
      return res;
    }
  }
});

// node_modules/typographic-apostrophes/index.es5.js
var require_index_es5 = __commonJS({
  "node_modules/typographic-apostrophes/index.es5.js"(exports, module) {
    "use strict";
    module.exports = function(input) {
      return input.replace(/ 'n' /gim, " \u2019n\u2019 ").replace(/'n'/gim, "\u2019n\u2019").replace(/(\S)'(\S)/gim, "$1\u2019$2").replace(/'(\d0s)/gim, "\u2019$1");
    };
  }
});

// node_modules/typographic-quotes-l10n-db/index.js
var require_typographic_quotes_l10n_db = __commonJS({
  "node_modules/typographic-quotes-l10n-db/index.js"(exports, module) {
    module.exports = {
      "af": "\u201C\u201D\u2018\u2019",
      // Afrikaans
      "sq": "\u201E\u201C\u2018\u2019",
      // Albanian
      "az": "\xAB\xBB\u2039\u203A",
      // Azerbaijani
      "eu": "\xAB\xBB\u2039\u203A",
      // Basque
      "be": "\xAB\xBB\u201C\u201D",
      // Belarusian
      "bg": "\u201E\u201C\u2019\u2019",
      // Bulgarian
      "ca": "\xAB\xBB\u201C\u201D",
      // Catalan
      "zh-Hans": "\u201C\u201D\u2018\u2019",
      // Chinese, simplified
      "hr": "\u201E\u201D\u2018\u2019",
      // Croatian
      "cs": "\u201E\u201C\u201A\u2018",
      // Czech
      "da": "\xBB\xAB\u203A\u2039",
      // Danish
      "nl": "\u2018\u2019\u201C\u201D",
      // Dutch
      "en-uk": "\u2018\u2019\u201C\u201D",
      // English, UK
      "en-us": "\u201C\u201D\u2018\u2019",
      // English, US; English, Canada
      "eo": "\u201C\u201D\u2018\u2019",
      // Esperanto
      "et": "\u201E\u201C\xAB\xBB",
      // Estonian
      "fil": "\u201C\u201D\u2018\u2019",
      // Filipino
      "fi": "\u201D\u201D\u2019\u2019",
      // Finnish
      "fr": "\xAB\xBB\u201C\u201D",
      // French
      "fr-sw": "\xAB\xBB\u2039\u203A",
      // French, Swiss
      "ka": "\u201E\u201C\u201C\u201D",
      // Georgian
      "de": "\u201E\u201C\u201A\u2018",
      // German
      "de-sw": "\xAB\xBB\u2039\u203A",
      // German, Swiss
      "el": "\xAB\xBB\u201C\u201D",
      // Greek
      "he": `""''`,
      // Hebrew
      "hu": "\u201E\u201D\xBB\xAB",
      // Hungarian
      "is": "\u201E\u201C\u201A\u2018",
      // Icelandic
      "id": "\u201C\u201D\u2018\u2019",
      // Indonesian
      "ga": "\u201C\u201D\u2018\u2019",
      // Irish
      "it": "\xAB\xBB\u201C\u201D",
      // Italian
      "it-sw": "\xAB\xBB\u2039\u203A",
      // Italian, Swiss
      "ko": "\u201C\u201D\u2018\u2019",
      // Korean
      "lv": "\xAB\xBB\u201E\u201C",
      // Latvian
      "mk": "\u201E\u201C\u2019\u2018",
      // Macedonian
      "no": "\xAB\xBB\u2019\u2019",
      // Norwegian
      "pl": "\u201E\u201D\xAB\xBB",
      // Polish
      "pt-br": "\u201C\u201D\u2018\u2019",
      // Portuguese, Brazil
      "pt-pl": "\xAB\xBB\u201C\u201D",
      // Portuguese, Portugal
      "ro": "\u201E\u201D\xAB\xBB",
      // Romanian
      "ru": "\xAB\xBB\u201E\u201C",
      // Russian
      "sr": "\u201E\u201D\u2019\u2019",
      // Serbian
      "sk": "\u201E\u201C\u201A\u2018",
      // Slovak
      "sl": "\u201E\u201C\u201A\u2018",
      // Slovene
      "es": "\xAB\xBB\u201C\u201D",
      // Spanish
      "sv": "\u201D\u201D\u2019\u2019",
      // Swedish
      "th": "\u201C\u201D\u2018\u2019",
      // Thai
      "tr": "\u201C\u201D\u2018\u2019",
      // Turkish
      "uk": "\xAB\xBB\u201E\u201C",
      // Ukrainian
      "cy": "\u2018\u2019\u201C\u201D"
      // Welsh
    };
  }
});

// node_modules/typographic-quotes/index.es5.js
var require_index_es52 = __commonJS({
  "node_modules/typographic-quotes/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = typographicQuotes;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _typographicQuotesL10nDb = require_typographic_quotes_l10n_db();
    var _typographicQuotesL10nDb2 = _interopRequireDefault(_typographicQuotesL10nDb);
    function typographicQuotes() {
      var input = arguments.length <= 0 || arguments[0] === void 0 ? "" : arguments[0];
      var _ref = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
      var _ref$locale = _ref.locale;
      var locale = _ref$locale === void 0 ? "en-us" : _ref$locale;
      var separator = "";
      var localeQuotes = _typographicQuotesL10nDb2["default"][locale];
      var pattern = /(^|\s)(?:"(.*?)"|'(.*?)')(\s|$|\.|,|\?|!)/gim;
      var handleQuotes = function handleQuotes2(quotes, cb) {
        return function(match) {
          var before = arguments.length <= 1 || arguments[1] === void 0 ? "" : arguments[1];
          var part1 = arguments.length <= 2 || arguments[2] === void 0 ? "" : arguments[2];
          var part2 = arguments.length <= 3 || arguments[3] === void 0 ? "" : arguments[3];
          var after = arguments.length <= 4 || arguments[4] === void 0 ? "" : arguments[4];
          var text = part1 + part2;
          if (cb) {
            text = text.replace(pattern, cb);
          }
          if (locale === "fr") {
            separator = "\xA0";
          }
          return "" + before + quotes[0] + separator + text + separator + quotes[1] + after;
        };
      };
      return input.replace(pattern, handleQuotes(localeQuotes.slice(0, 2), handleQuotes(localeQuotes.slice(2, 4))));
    }
    module.exports = exports["default"];
  }
});

// node_modules/typographic-apostrophes-for-possessive-plurals/index.es5.js
var require_index_es53 = __commonJS({
  "node_modules/typographic-apostrophes-for-possessive-plurals/index.es5.js"(exports, module) {
    "use strict";
    module.exports = function(input) {
      return input.replace(/s'(\s|$)/gim, "s\u2019$1");
    };
  }
});

// node_modules/typographic-arrows/index.es5.js
var require_index_es54 = __commonJS({
  "node_modules/typographic-arrows/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = typographicArrows;
    function typographicArrows(input) {
      return input.replace(/<->/gim, "\u2194").replace(/<=>/gim, "\u21D4").replace(/<-/gim, "\u2190").replace(/->/gim, "\u2192").replace(/<=/gim, "\u21D0").replace(/=>/gim, "\u21D2");
    }
    module.exports = exports["default"];
  }
});

// node_modules/typographic-copyright/index.es5.js
var require_index_es55 = __commonJS({
  "node_modules/typographic-copyright/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = function(input) {
      return input.replace(/\(c\)/gim, "\xA9").replace(/© *(\d)/gim, "\xA9\xA0$1");
    };
    module.exports = exports["default"];
  }
});

// node_modules/typographic-currency-db/index.es5.js
var require_index_es56 = __commonJS({
  "node_modules/typographic-currency-db/index.es5.js"(exports, module) {
    "use strict";
    module.exports = {
      "AFN": "\u060B",
      // ؋
      "AMD": "\u058F",
      // ֏
      "ANG": "\u0192",
      // ƒ
      "AWG": "\u0192",
      // ƒ
      "AZN": "\u20BC",
      // ₼
      "BDT": "\u09F3",
      // ৳
      "BTC": "\u0243",
      // Ƀ
      "CNY": "\xA5",
      // ¥
      "CRC": "\u20A1",
      // ₡
      "EUR": "\u20AC",
      // €
      "FKP": "\xA3",
      // £
      "GBP": "\xA3",
      // £
      "GHS": "\u20B5",
      // ₵
      "GIP": "\xA3",
      // £
      "ILS": "\u20AA",
      // ₪
      "INR": "\u20B9",
      // ₹
      "IRR": "\uFDFC",
      // ﷼
      "JPY": "\xA5",
      // ¥
      "KHR": "\u17DB",
      // ៛
      "KPW": "\u20A9",
      // ₩
      "KRW": "\u20A9",
      // ₩
      "KZT": "\u20B8",
      // ₸
      "LAK": "\u20AD",
      // ₭
      "LKR": "\u20A8",
      // ₨
      "MNT": "\u20AE",
      // ₮
      "MTL": "\u20A4",
      // ₤
      "MUR": "\u20A8",
      // ₨
      "NGN": "\u20A6",
      // ₦
      "NPR": "\u20A8",
      // ₨
      "OMR": "\uFDFC",
      // ﷼
      "PHP": "\u20B1",
      // ₱
      "PKR": "\u20A8",
      // ₨
      "PYG": "\u20B2",
      // ₲
      "QAR": "\uFDFC",
      // ﷼
      "RUB": "\u20BD",
      // ₽
      "SAR": "\uFDFC",
      // ﷼
      "SCR": "\u20A8",
      // ₨
      "SDG": "\xA3",
      // £
      "SHP": "\xA3",
      // £
      "SVC": "\u20A1",
      // ₡
      "SYP": "\xA3",
      // £
      "THB": "\u0E3F",
      // ฿
      "UAH": "\u20B4",
      // ₴
      "USD": "$",
      // $
      "VND": "\u20AB",
      // ₫
      "YER": "\uFDFC"
      // ﷼
    };
  }
});

// node_modules/typographic-currency/index.es5.js
var require_index_es57 = __commonJS({
  "node_modules/typographic-currency/index.es5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = typographicCurrency;
    var _typographicCurrencyDb = require_index_es56();
    var _typographicCurrencyDb2 = _interopRequireDefault(_typographicCurrencyDb);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var pattern = function pattern2(key) {
      return new RegExp("([^a-z]|\\b)(" + key + ")\\b", "gi");
    };
    function typographicCurrency(input) {
      if (!input)
        return;
      return Object.keys(_typographicCurrencyDb2.default).reduce(function(state, key) {
        return state.replace(pattern(key), "$1" + _typographicCurrencyDb2.default[key]);
      }, input);
    }
  }
});

// node_modules/typographic-ellipses/index.es5.js
var require_index_es58 = __commonJS({
  "node_modules/typographic-ellipses/index.es5.js"(exports, module) {
    "use strict";
    module.exports = function(input) {
      return input.replace(/\.{3}/gim, "\u2026");
    };
  }
});

// node_modules/typographic-em-dashes/index.es5.js
var require_index_es59 = __commonJS({
  "node_modules/typographic-em-dashes/index.es5.js"(exports, module) {
    "use strict";
    module.exports = function(input) {
      return input.replace(/--/gim, "\u2014").replace(/ — /gim, "\u200A\u2014\u200A");
    };
  }
});

// node_modules/typographic-en-dashes/index.es5.js
var require_index_es510 = __commonJS({
  "node_modules/typographic-en-dashes/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = function(input) {
      return input.replace(/(\d)-(\d)/gim, "$1\u2013$2");
    };
    module.exports = exports["default"];
  }
});

// node_modules/typographic-math-symbols/index.es5.js
var require_index_es511 = __commonJS({
  "node_modules/typographic-math-symbols/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = function(input) {
      return input.replace(/(\d) x (\d)/gim, "$1 \xD7 $2").replace(/(\d) - (\d)/gim, "$1 \u2212 $2").replace(/(\w) >> (\w)/gim, "$1 \u226B $2").replace(/(\w) << (\w)/gim, "$1 \u226A $2").replace(/(\w) >= (\w)/gim, "$1 \u2265 $2").replace(/(\w) <= (\w)/gim, "$1 \u2264 $2").replace(/\+-/gim, "\xB1").replace(/-\+/gim, "\u2213");
    };
    module.exports = exports["default"];
  }
});

// node_modules/typographic-registered-trademark/index.es5.js
var require_index_es512 = __commonJS({
  "node_modules/typographic-registered-trademark/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = function(input) {
      return input.replace(/\(r\)/gim, "\xAE");
    };
    module.exports = exports["default"];
  }
});

// node_modules/typographic-single-spaces/index.es5.js
var require_index_es513 = __commonJS({
  "node_modules/typographic-single-spaces/index.es5.js"(exports, module) {
    "use strict";
    module.exports = function(input) {
      return input.replace(/ +/gim, " ");
    };
  }
});

// node_modules/typographic-trademark/index.es5.js
var require_index_es514 = __commonJS({
  "node_modules/typographic-trademark/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = function(input) {
      return input.replace(/ *\(tm\)/gim, "\u2122");
    };
    module.exports = exports["default"];
  }
});

// node_modules/typographic-base/index.es5.js
var require_index_es515 = __commonJS({
  "node_modules/typographic-base/index.es5.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _textr = require_textr();
    var _textr2 = _interopRequireDefault(_textr);
    var _typographicApostrophes = require_index_es5();
    var _typographicApostrophes2 = _interopRequireDefault(_typographicApostrophes);
    var _typographicQuotes = require_index_es52();
    var _typographicQuotes2 = _interopRequireDefault(_typographicQuotes);
    var _typographicApostrophesForPossessivePlurals = require_index_es53();
    var _typographicApostrophesForPossessivePlurals2 = _interopRequireDefault(_typographicApostrophesForPossessivePlurals);
    var _typographicArrows = require_index_es54();
    var _typographicArrows2 = _interopRequireDefault(_typographicArrows);
    var _typographicCopyright = require_index_es55();
    var _typographicCopyright2 = _interopRequireDefault(_typographicCopyright);
    var _typographicCurrency = require_index_es57();
    var _typographicCurrency2 = _interopRequireDefault(_typographicCurrency);
    var _typographicEllipses = require_index_es58();
    var _typographicEllipses2 = _interopRequireDefault(_typographicEllipses);
    var _typographicEmDashes = require_index_es59();
    var _typographicEmDashes2 = _interopRequireDefault(_typographicEmDashes);
    var _typographicEnDashes = require_index_es510();
    var _typographicEnDashes2 = _interopRequireDefault(_typographicEnDashes);
    var _typographicMathSymbols = require_index_es511();
    var _typographicMathSymbols2 = _interopRequireDefault(_typographicMathSymbols);
    var _typographicRegisteredTrademark = require_index_es512();
    var _typographicRegisteredTrademark2 = _interopRequireDefault(_typographicRegisteredTrademark);
    var _typographicSingleSpaces = require_index_es513();
    var _typographicSingleSpaces2 = _interopRequireDefault(_typographicSingleSpaces);
    var _typographicTrademark = require_index_es514();
    var _typographicTrademark2 = _interopRequireDefault(_typographicTrademark);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var base = (0, _textr2.default)().use(_typographicApostrophes2.default, _typographicQuotes2.default, _typographicApostrophesForPossessivePlurals2.default, _typographicArrows2.default, _typographicCopyright2.default, _typographicCurrency2.default, _typographicEllipses2.default, _typographicEmDashes2.default, _typographicEnDashes2.default, _typographicMathSymbols2.default, _typographicRegisteredTrademark2.default, _typographicSingleSpaces2.default, _typographicTrademark2.default);
    exports.default = base;
    module.exports = exports["default"];
  }
});

// app/lib/utils.js
var import_typographic_base = __toESM(require_index_es515());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\utils.js"
  );
  import.meta.hot.lastModified = "1696849699241.4507";
}
function missingClass(string, prefix) {
  if (!string) {
    return true;
  }
  const regex = new RegExp(` ?${prefix}`, "g");
  return string.match(regex) === null;
}
function formatText(input) {
  if (!input) {
    return;
  }
  if (typeof input !== "string") {
    return input;
  }
  return (0, import_typographic_base.default)(input, { locale: "en-us" }).replace(
    /\s([^\s<]+)\s*$/g,
    "\xA0$1"
  );
}
function isNewArrival(date, daysOld = 30) {
  return new Date(date).valueOf() > (/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - daysOld).valueOf();
}
function isDiscounted(price, compareAtPrice) {
  if (compareAtPrice?.amount > price?.amount) {
    return true;
  }
  return false;
}
var INPUT_STYLE_CLASSES = "appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline";
var getInputStyleClasses = (isError) => {
  return `${INPUT_STYLE_CLASSES} ${isError ? "border-red-500" : "border-primary/20"}`;
};
function statusMessage(status) {
  const translations = {
    ATTEMPTED_DELIVERY: "Attempted delivery",
    CANCELED: "Canceled",
    CONFIRMED: "Confirmed",
    DELIVERED: "Delivered",
    FAILURE: "Failure",
    FULFILLED: "Fulfilled",
    IN_PROGRESS: "In Progress",
    IN_TRANSIT: "In transit",
    LABEL_PRINTED: "Label printed",
    LABEL_PURCHASED: "Label purchased",
    LABEL_VOIDED: "Label voided",
    MARKED_AS_FULFILLED: "Marked as fulfilled",
    NOT_DELIVERED: "Not delivered",
    ON_HOLD: "On Hold",
    OPEN: "Open",
    OUT_FOR_DELIVERY: "Out for delivery",
    PARTIALLY_FULFILLED: "Partially Fulfilled",
    PENDING_FULFILLMENT: "Pending",
    PICKED_UP: "Displayed as Picked up",
    READY_FOR_PICKUP: "Ready for pickup",
    RESTOCKED: "Restocked",
    SCHEDULED: "Scheduled",
    SUBMITTED: "Submitted",
    UNFULFILLED: "Unfulfilled"
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}
var DEFAULT_LOCALE = Object.freeze({
  ...countries.default,
  pathPrefix: ""
});
function usePrefixPathWithLocale(path) {
  const [root] = useMatches();
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE;
  return `${selectedLocale.pathPrefix}${path.startsWith("/") ? path : "/" + path}`;
}
function useIsHomePath() {
  const { pathname } = useLocation();
  const [root] = useMatches();
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE;
  const strippedPathname = pathname.replace(selectedLocale.pathPrefix, "");
  return strippedPathname === "/";
}

export {
  missingClass,
  formatText,
  isNewArrival,
  isDiscounted,
  getInputStyleClasses,
  statusMessage,
  DEFAULT_LOCALE,
  usePrefixPathWithLocale,
  useIsHomePath
};
//# sourceMappingURL=/build/_shared/chunk-OMGXAGHL.js.map
