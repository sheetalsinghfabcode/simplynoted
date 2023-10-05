import {
  createHotContext
} from "/build/_shared/chunk-QLMTPHJM.js";

// app/lib/const.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\const.js"
  );
  import.meta.hot.lastModified = "1696490276869.27";
}
var DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 4;
var ATTR_LOADING_EAGER = "eager";
function getImageLoadingPriority(index, maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : void 0;
}

export {
  getImageLoadingPriority
};
//# sourceMappingURL=/build/_shared/chunk-YJ4LR4QJ.js.map
