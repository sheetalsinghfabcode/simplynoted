import {Image} from '@shopify/hydrogen';
import CircularLoader from './CircularLoder';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media, className}) {
  if (!media.length) {
    return null;
  }
  let imageVar = [];
  imageVar.push(media[0]);
  return (
    <div
      className={`swimlane md:flex hiddenScroll p-0 md:overflow-x-auto md:grid-cols-2 md:w-[48%] w-full md:justify-start justify-center ${className}`}
    >
      {imageVar &&
        imageVar.map((med, i) => {
          const isFirst = i === 0;
          const isFourth = i === 3;
          const isFullWidth = i % 3 === 0;
          const image =
            med.__typename === 'MediaImage'
              ? {...med.image, altText: med.alt || 'Product image'}
              : null;
          const style = [
            isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
            isFirst || isFourth ? '' : 'md:aspect-[4/5]',
            'aspect-square snap-center card-image bg-white dark:bg-contrast/10  md:w-[575px] md:h-[340px]  w-full',
          ].join(' ');

          return (
            <div className={style} key={med.id || image?.id}>
              {image && (
                <Image
                  loading={i === 0 ? 'eager' : 'lazy'}
                  data={image}
                  aspectRatio={!isFirst && !isFourth ? '4/5' : undefined}
                  sizes={
                    isFirst || isFourth
                      ? '(min-width: 48em) 60vw, 90vw'
                      : '(min-width: 48em) 30vw, 90vw'
                  }
                  className="object-cover w-[550px] h-[400px] aspect-square fadeIn"
                />
              )}

              {!image && <CircularLoader color="#ef6e6e" />}
            </div>
          );
        })}
    </div>
  );
}
