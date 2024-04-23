import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {useEffect, useState} from 'react';
import Loader from './modal/Loader';
import DynamicButton from './DynamicButton';
import {getProductPlaceholder} from '~/lib/placeholders';
import {RiDeleteBin6Line} from 'react-icons/ri';
import ConfirmationModal from './modal/ConfirmationModal';

export function CustomComponent({product, offPrice, productPrice, customerId}) {
  const [loader, setLoader] = useState(false);
  const [stateval, setStateval] = useState('');
  const [showDeleteICon, setShowDeleteICon] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [valOfProdId, setValOfProdId] = useState(null);
  function deleteOrderBtn(id) {
    setDeleteModal(true);
    setValOfProdId(id);
  }
  async function deleteCustomCardAPI(id) {
    try {
      // setLoader(true)
      const res = await fetch(
        `https://api.simplynoted.com/api/customizedCard/deleteProduct?customerId=${customerId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({productId: id}),
        },
      );

      const json = await res.json();
      if (json.result) {
        setDeleteModal(false);
        setStateval(id);
        // setLoader(false)
      }
    } catch (error) {
      console.log(error, 'delete customCard ');
    }
  }
  // const cardProduct = product?.variants ? product : getProductPlaceholder();
  // if (!cardProduct?.variants?.nodes?.length) return null;
  // const firstVariant = flattenConnection(cardProduct.variants)[0];
  // let {image, price, compareAtPrice} = firstVariant;

  return (
    <>
      {loader ? (
        <Loader loaderMessage="Loading Custom Products" />
      ) : (
        <div
          className={`flex flex-col gap-2 bg-[white] ${
            product?.id === Number(stateval) && 'hidden'
          } shadow-lg relative`}
          onMouseEnter={() => setShowDeleteICon(true)}
          onMouseLeave={() => setShowDeleteICon(false)}
        >
          <Link to={`/custom/${product.handle}`} prefetch="intent">
            <div className={clsx('grid gap-4')}>
              <div className="card-image aspect-[5/4.7] bg-primary/5">
                <img
                  className="object-fit-inherit w-full fadeIn"
                  sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                  aspectRatio="5/5"
                  src={product.image?.src}
                />
              </div>
              <div className="grid my-[10px]">
                <Text
                  className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-center uppercase text-[14px] leading-loose text-[#001a5f] font-karla"
                  as="h2"
                >
                  {product.title}
                </Text>
                <Text className="flex w-full justify-center gap-4 leadimg-5 text-[15px] font-medium">
                  {offPrice > 0 ? (
                    <span className="text-[red]">
                      <span className="line-through text-[black] pr-[5px]">
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
                className="bg-[#001a5f] w-[100%] font-normal  text-[#fff] py-[14px] px-[8px] mb-[10px]"
                text="SINGLE CARD"
                onClickFunction={() => ''}
              />
            </Link>
            <Link to={`/custom/${product.handle}?select=Bulk`}>
              <DynamicButton
                className="bg-[#ef6e6e] w-[100%] font-normal text-[#fff] py-[14px] px-[8px]"
                text="BULK PURCHASE"
                onClickFunction={() => ''}
              />
            </Link>
          </div>
          {showDeleteICon && (
            <div
              className="hover:visible absolute w-[32px] h-[32px] p-[5px] border rounded-[15px] bg-white right-0 cursor-pointer"
              onClick={() => deleteOrderBtn(product.id)}
            >
              <RiDeleteBin6Line color="#3062a3" className="text-[20px]" />
            </div>
          )}
          <ConfirmationModal
            show={deleteModal}
            onCancel={() => setDeleteModal(false)}
            onConfirm={() => deleteCustomCardAPI(valOfProdId)}
            message="Are you sure you want to delete this order?"
            confirmText="Delete"
            cancelText="Cancel"
          />
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
