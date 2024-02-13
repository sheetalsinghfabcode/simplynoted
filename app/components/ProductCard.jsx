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
    <div className="flex flex-col gap-2 bg-[white] shadow-lg">
      {/* <h2>Helloo{product.title}</h2> */}
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image aspect-[5/5] bg-primary/5">
            {image && (
              <Image
                className="object-cover w-full fadeIn"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="5/5"
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
          <div className="grid my-[10px]">
            <Text
              className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-center font-bold uppercase text-[14px] leading-loose text-[#001a5f] font-karla"
              as="h2"
            >
              {product.title}
            </Text>
            <Text className="flex w-full justify-center gap-4 leadimg-5 text-[15px] font-medium">
              {offPrice > 0 ? (
                <span className="text-[red]">
                  <span className="line-through text-[black]">
                    ${price.amount}
                  </span>
                  ${(price.amount - (price.amount * offPrice) / 100).toFixed(2)}
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
            className="bg-[#001a5f] w-[100%] font-normal  text-[#fff] py-[14px] px-[8px] mb-[10px]"
            text="SINGLE CARD"
            onClickFunction={() => ''}
          />
        </Link>
        <Link to={`/products/${product.handle}?select=Bulk`}>
          <DynamicButton
            className="bg-[#ef6e6e] w-[100%] font-normal text-[#fff] py-[14px] px-[8px]"
            text="BULK PURCHASE"
            onClickFunction={() => ''}
          />
        </Link>
      </div>
  
    </div>
  );
}

