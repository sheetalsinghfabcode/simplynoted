import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function CustomComponent({product}){
console.log(product,'customComponent');
    return (
        <div className="flex flex-col gap-2">
      {/* <h2>Helloo{product.title}</h2> */}
      <Link
        // onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid gap-4')}>
          <div className="card-image aspect-[4/5] bg-primary/5">
            {/* {image && ( */}
              <Image
                className="object-cover w-full fadeIn"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                src={product.image?.src}
                // alt={image.altText || `Picture of ${product.title}`}
                // loading={loading}
              />
            {/* )} */}
            {/* <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice"
            >
              {cardLabel}
            </Text> */}
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
                {/* <Money withoutTrailingZeros data={price} /> */}
              </Text>
            </div>
          </div>
        </div>
      </Link>
    </div>
    )
}