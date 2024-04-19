import {useLoaderData} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import {useState, useEffect} from 'react';
import LoginModal from '~/components/modal/LoginModal';
import CardTypeSelection from '~/components/customisable-cards/CardTypeSelection';
import FlatCustomisableCard from '~/components/customisable-cards/FlatCustomisableCard';
import FoldedCustomisableCard from '~/components/customisable-cards/FoldedCustomisableCard';
import ShopifyCustomCardProductDetails from '~/components/customisable-cards/ShopifyCustomCardProductDetails';
import {seoPayload} from '~/lib/seo.server';
import {useStateContext} from '~/context/StateContext';

export async function loader({context, request}) {
  const customisableCardProductQuery = `#graphql
  query {
    product(handle:"customise-your-card"){
      title
      featuredImage{
        url
      }
      seo{
        title
      }
      vendor
      tags
      productType
      variants(first:10){
        edges{
          node{
            title
           metafields(identifiers:[
                 {namespace:"is_customised", key: "qrImage"}
                 {namespace:"shopify_id", key: "customer"}
                 {namespace:"is_customised", key: "flag"}
                 {namespace:"product", key: "variantDefaultPricing"}
                    
               
              ]){
                value
                key
              }
            price{
              amount
            }
          }
        }
      }
    }
  }`;
  const shopifyCustomisableCardProduct = await context.storefront.query(
    customisableCardProductQuery,
    {variable: {}},
  );
  const {product} = shopifyCustomisableCardProduct;

  const seo = seoPayload.Create_Custom({product, url: request.url});
  return defer({shopifyCustomisableCardProduct, seo});
}

export default function customisableCard() {
  const {shopifyCustomisableCardProduct} = useLoaderData();
  const [customerId, setCustomerId] = useState(null);
  const [isFlatCardType, setIsFlatCardType] = useState(true);
  const {isCardTypeSelectionPage, setIsCardTypeSelectionPage} =
    useStateContext();
  // To get rid of the modal glitch for split seconds on initial render.
  const [isInitialRender, setIsInitialRender] = useState(true);

  // This state contains selected variant option
  const [getSelectedProductVariant, setGetSelectedProductVariant] = useState(
    shopifyCustomisableCardProduct.product.variants.edges[0].node.title,
  );
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customerId');
    setCustomerId(storedCustomerId);
    setIsInitialRender(false);
  }, []);

  return (
    <>
      {!isInitialRender && !customerId && (
        <LoginModal
          show={!customerId && showModal}
          title="Create a Card"
          confirmText="Login"
          cancelText="Register"
          onCancel={() => setShowModal(false)}
          hasCancelIcon={true}
        />
      )}
      {isCardTypeSelectionPage ? (
        <CardTypeSelection
          isFlatCardType={isFlatCardType}
          setIsFlatCardType={setIsFlatCardType}
          setIsCardTypeSelectionPage={setIsCardTypeSelectionPage}
        />
      ) : isFlatCardType ? (
        <FlatCustomisableCard
          setIsCardTypeSelectionPage={setIsCardTypeSelectionPage}
          shopifyCustomisableCardProduct={shopifyCustomisableCardProduct}
          customerId={customerId}
        />
      ) : (
        <FoldedCustomisableCard
          setIsCardTypeSelectionPage={setIsCardTypeSelectionPage}
          shopifyCustomisableCardProduct={shopifyCustomisableCardProduct}
          customerId={customerId}
        />
      )}

      <ShopifyCustomCardProductDetails
        isFlatCardType={isFlatCardType}
        shopifyCustomisableCardProduct={shopifyCustomisableCardProduct}
        setGetSelectedProductVariant={setGetSelectedProductVariant}
      />
    </>
  );
}
