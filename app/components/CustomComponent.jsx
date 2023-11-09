import clsx from 'clsx';
import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';
import { Text, Link, AddToCartButton, Button } from '~/components';
import { useState } from 'react';
import Loader from './modal/Loader';

export function CustomComponent({ product }) {
  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader ?
        <Loader loaderMessage="Loading Custom Products" />
        :
        <div className="flex flex-col gap-2">
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
                  className="w-full overflow-hidden whitespace-nowrap text-ellipsis "
                  as="h3"
                >
                  {product.title}
                </Text>
                <div className="flex gap-4">
                  <Text className="flex gap-4">
                  </Text>
                </div>
              </div>
            </div>
          </Link>
        </div>
      }
    </>
  )
}