import clsx from 'clsx';
import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';
import { Text, Link, AddToCartButton, Button } from '~/components';
import { useState } from 'react';
import Loader from './modal/Loader';
import DynamicButton from './DynamicButton';


export function CustomComponent({ product }) {
  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader ?
        <Loader loaderMessage="Loading Custom Products" />
        :
        <div className="flex flex-col gap-2 bg-[white] items-center">
          <Link
            to={`/products/${product.handle}`}
            prefetch="intent"
          >
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
                {/* <Text className="flex w-full justify-center gap-4">
                <Money withoutTrailingZeros data={price} />
                {isDiscounted(price, compareAtPrice) && (
                  <CompareAtPrice
                    className={'opacity-50 text-center'}
                    data={compareAtPrice}
                  />
                )}
              </Text> */}
              </div>
              <div>
            <DynamicButton
                  className="bg-[#001a5f] w-[100%] text-[#fff] py-[14px] px-[8px] mb-3"
                  text="SINGLE CARD"
                  onClickFunction={() => ''}
                />
            <DynamicButton
                  className="bg-[#ef6e6e] w-[100%] text-[#fff] py-[14px] px-[8px]"
                  text="BULK PURCHASE"
                  onClickFunction={() => ''}
                />
            </div>
            </div>
          </Link>
        </div>
      }
    </>
  )
}
function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}