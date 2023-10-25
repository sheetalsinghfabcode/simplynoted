import {
  createHotContext
} from "/build/_shared/chunk-M5RZR2GW.js";

// app/lib/const.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\const.js"
  );
  import.meta.hot.lastModified = "1696849699239.0737";
}
var DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 4;
var ATTR_LOADING_EAGER = "eager";
function getImageLoadingPriority(index, maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : void 0;
}

export {
  getImageLoadingPriority
};
//# sourceMappingURL=/build/_shared/chunk-4MYYP63X.js.map
