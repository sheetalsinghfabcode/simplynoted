import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import DynamicButton from './DynamicButton';
import {useEffect, useState} from 'react';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  offPrice,
}) {
  let cardLabel;
  const [productPrice, setproductPrice] = useState('');
  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;
  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  let {image, price, compareAtPrice} = firstVariant;
  // if (label) {
  //   cardLabel = label;
  // } else if (isDiscounted(price, compareAtPrice)) {
  //   cardLabel = 'Sale';
  // } else if (isNewArrival(product.publishedAt)) {
  //   cardLabel = 'New';
  // }
  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };
  return (
    <div className="flex flex-col gap-2 bg-[white]">
      {/* <h2>Helloo{product.title}</h2> */}
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image aspect-[4/5] bg-primary/5">
            {image && (
              <Image
                className="object-cover w-full fadeIn"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            {/* <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice"
            >
              {cardLabel}
            </Text> */}
          </div>
          <div className="grid">
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
                    {' '}
                    ${price.amount}
                  </span>{' '}
                  ${' '}
                  {(price.amount - (price.amount * offPrice) / 100).toFixed(2)}
                </span>
              ) : (
                <span className="text-[red]">$ {price.amount}</span>
              )}
              {/* <Money withoutTrailingZeros data={price} /> */}
              {/* {isDiscounted(price, compareAtPrice) && (
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
        <Link to={`/products/${product.handle}`}>
          <DynamicButton
            className="bg-[#001a5f] w-[100%] text-[#fff] py-[14px] px-[8px] mb-3"
            text="SINGLE CARD"
            onClickFunction={() => ''}
          />
        </Link>
        <Link to={`/products/${product.handle}?select=Bulk`}>
          <DynamicButton
            className="bg-[#ef6e6e] w-[100%] text-[#fff] py-[14px] px-[8px]"
            text="BULK PURCHASE"
            onClickFunction={() => ''}
          />
        </Link>
      </div>
      {/* {quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-2"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="flex items-center justify-center gap-2">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <Text as="span" className="flex items-center justify-center gap-2">
            Sold out
          </Text>
        </Button>
      )} */}
    </div>
  );
}

// function CompareAtPrice({data, className}) {
//   const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
//     useMoney(data);

//   const styles = clsx('strike', className);

//   return (
//     <span className={styles}>
//       {currencyNarrowSymbol}
//       {withoutTrailingZerosAndCurrency}
//     </span>
//   );
// }
