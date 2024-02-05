import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {useState} from 'react';
import Loader from './modal/Loader';
import DynamicButton from './DynamicButton';
import {getProductPlaceholder} from '~/lib/placeholders';

export function CustomComponent({product, offPrice, productPrice}) {
  const [loader, setLoader] = useState(false);

  // const cardProduct = product?.variants ? product : getProductPlaceholder();
  // if (!cardProduct?.variants?.nodes?.length) return null;
  // const firstVariant = flattenConnection(cardProduct.variants)[0];
  // let {image, price, compareAtPrice} = firstVariant;

  return (
    <>
      {loader ? (
        <Loader loaderMessage="Loading Custom Products" />
      ) : (
        <div className="flex flex-col gap-2 bg-[white]">
          <Link to={`/custom/${product.handle}`} prefetch="intent">
            <div className={clsx('grid gap-4')}>
              <div className="card-image aspect-[4/5] bg-primary/5">
                <Image
                  className="object-cover w-full fadeIn"
                  sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                  aspectRatio="4/5"
                  src={product.image?.src}
                />
              </div>
              <div className="grid gap-1">
                <Text
                  className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-center uppercase text-[14px] font-karla"
                  as="h3"
                >
                  {product.title}
                </Text>
                <Text className="flex w-full justify-center gap-4">
                  {offPrice > 0 ? (
                    <span className="text-[red]">
                      <span className="line-through text-[black]">
                        ${productPrice}
                      </span>
                      $
                      {(productPrice - (productPrice * offPrice) / 100).toFixed(
                        2,
                      )}
                    </span>
                  ) : (
                    <span className="text-[red]">$ {productPrice}</span>
                  )}
                  {/* <Money withoutTrailingZeros data={price} />
                {isDiscounted(price, compareAtPrice) && (
                  <CompareAtPrice
                    className={'opacity-50 text-center'}
                    data={compareAtPrice}
                  />
                )} */}
                </Text>
              </div>
            </div>
          </Link>
          <div>
            <Link to={`/custom/${product.handle}`}>
              <DynamicButton
                className="bg-[#001a5f] w-[100%] text-[#fff] py-[14px] px-[8px] mb-3"
                text="SINGLE CARD"
                onClickFunction={() => ''}
              />
            </Link>
            <Link to={`/custom/${product.handle}?select=Bulk`}>
              <DynamicButton
                className="bg-[#ef6e6e] w-[100%] text-[#fff] py-[14px] px-[8px]"
                text="BULK PURCHASE"
                onClickFunction={() => ''}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
// function CompareAtPrice({ data, className }) {
//   const { currencyNarrowSymbol, withoutTrailingZerosAndCurrency } =
//     useMoney(data);

//   const styles = clsx('strike', className);

//   return (
//     <span className={styles}>
//       {currencyNarrowSymbol}
//       {withoutTrailingZerosAndCurrency}
//     </span>
//   );
// }
