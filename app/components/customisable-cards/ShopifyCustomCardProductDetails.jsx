import {useEffect, useState} from 'react';
import FlatBlankCanvasImage from '../../../assets/Image/flat-blank-canvas.png';
import FoldedBlankCanvasImage from '../../../assets/Image/folded-blank-canvas.png';

export default function ShopifyCustomCardProductDetails({
  isFlatCardType,
  shopifyCustomisableCardProduct,
  setGetSelectedProductVariant,
}) {
  const [selectedCustomProductVariant, setSelectedCustomProductVariant] =
    useState(
      shopifyCustomisableCardProduct.product.variants.edges[0].node.title,
    );
  const [
    selectedCustomProductVariantPrice,
    setSelectedCustomProductVariantPrice,
  ] = useState(
    shopifyCustomisableCardProduct.product.variants.edges[0].node.price.amount,
  );
  const [hasScrolledYAxis, setHasScrolledYAxis] = useState(false);

  useEffect(() => {
    const newlySelectedProductVariantPrice =
      shopifyCustomisableCardProduct.product.variants.edges.find(
        (variant) => variant.node.title === selectedCustomProductVariant,
      ).node.price.amount;
    setSelectedCustomProductVariantPrice(newlySelectedProductVariantPrice);
    setGetSelectedProductVariant(selectedCustomProductVariant);
  }, [
    selectedCustomProductVariant,
    shopifyCustomisableCardProduct.product.variants.edges,
  ]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollDisplay);
    return () => window.removeEventListener('scroll', handleScrollDisplay);
  }, [hasScrolledYAxis]);

  function handleScrollDisplay() {
    if (window.scrollY > 0) {
      setHasScrolledYAxis(true);
    } else {
      setHasScrolledYAxis(false);
    }
  }

  return (
    <section
      className={`${
        hasScrolledYAxis
          ? 'fixed flex justify-evenly md:flex-row flex-col items-center md:h-[75px] h-[20%] md:p-0 p-[10px] md:gap-[30px]  w-full text-white bottom-0 left-0 bg-[#0f0f0f]'
          : 'hidden'
      }`}
      style={{zIndex: 999}}
    >
      <div className="lg:w-1/2 md:w-[35%] w-[80%] flex gap-4 justify-between md:justify-start">
      <h1 className='hidden' >Customise Your Card</h1>
        <div className="h-[50px] md:w-[72px] w-[66px]">
          <img
            src={isFlatCardType ? FlatBlankCanvasImage : FoldedBlankCanvasImage}
            alt="Shopify custom card blank canvas image."
            draggable="false"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">
            {shopifyCustomisableCardProduct.product.title}
          </span>
          <span>${selectedCustomProductVariantPrice}</span>
        </div>
      </div>

      <select
        id="variants"
        className="bg-[#414141] text-white p-2 md:w-[380px] w-[82%] rounded-md outline-none border-none focus:ring-0"
        value={selectedCustomProductVariant}
        onChange={(e) => setSelectedCustomProductVariant(e.target.value)}
      >
        {shopifyCustomisableCardProduct.product.variants.edges.map(
          (variant, index) => (
            <option
              key={`${variant.node.title}-${index}`}
              value={variant.node.title}
            >
              {variant.node.title}
            </option>
          ),
        )}
      </select>
    </section>
  );
}
