import {json, defer} from '@shopify/remix-oxygen';
import {useLoaderData, useLocation} from '@remix-run/react';
import {
  flattenConnection,
  AnalyticsPageType,
  Pagination,
  getPaginationVariables,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import Breadcrumbs from '../components/Breadcrumbs';

import {
  PageHeader,
  Section,
  Text,
  SortFilter,
  Grid,
  ProductCard,
  Button,
} from '~/components';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {getImageLoadingPriority} from '~/lib/const';
import {useEffect, useState, useRef, Fragment} from 'react';
import {useNavigate} from '@remix-run/react';
import DynamicButton from '~/components/DynamicButton';
import {CustomComponent} from '~/components/CustomComponent';
import LoginModal from '~/components/modal/LoginModal';
import Loader from '~/components/modal/Loader';
import DynamicTitle from '~/components/Title';
import CircularLoader from '~/components/CircularLoder';
import {getApi} from '~/utils/ApiService';
import {API_PATH} from '~/utils/Path';
import ConfirmationModal from '~/components/modal/ConfirmationModal';
import { useStateContext } from '~/context/StateContext';
export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });
  const variables = getPaginationVariables(request, {pageBy: 10});

  const {collectionHandle} = params;
  const handleLinkData = await context.storefront.query(HANDLE_QUERY, {
    variables: {},
  });
  invariant(collectionHandle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;
  const knownFilters = ['productVendor', 'productType'];
  const available = 'available';
  const variantOption = 'variantOption';
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));
  const filters = [];
  const appliedFilters = [];

  for (const [key, value] of searchParams.entries()) {
    if (available === key) {
      filters.push({available: value === 'true'});
      appliedFilters.push({
        label: value === 'true' ? 'In stock' : 'Out of stock',
        urlParam: {
          key: available,
          value,
        },
      });
    } else if (knownFilters.includes(key)) {
      filters.push({[key]: value});
      appliedFilters.push({label: value, urlParam: {key, value}});
    } else if (key.includes(variantOption)) {
      const [name, val] = value.split(':');
      filters.push({variantOption: {name, value: val}});
      appliedFilters.push({label: val, urlParam: {key, value}});
    }
  }

  // Builds min and max price filter since we can't stack them separately into
  // the filters array. See price filters limitations:
  // https://shopify.dev/custom-storefronts/products-collections/filter-products#limitations
  if (searchParams.has('minPrice') || searchParams.has('maxPrice')) {
    const price = {};
    if (searchParams.has('minPrice')) {
      price.min = Number(searchParams.get('minPrice')) || 0;
      appliedFilters.push({
        label: `Min: $${price.min}`,
        urlParam: {key: 'minPrice', value: searchParams.get('minPrice')},
      });
    }
    if (searchParams.has('maxPrice')) {
      price.max = Number(searchParams.get('maxPrice')) || 0;
      appliedFilters.push({
        label: `Max: $${price.max}`,
        urlParam: {key: 'maxPrice', value: searchParams.get('maxPrice')},
      });
    }
    filters.push({
      price,
    });
  }

  const {collection, collections} = await context.storefront.query(
    COLLECTION_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle: collectionHandle,
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );
  const myCollection = await context.storefront.query(MY_COLLECTION, {
    variables: {
      handle: collectionHandle,
    },
  });
  if (!collection) {
    throw new Response('collection', {status: 404});
  }

  const seo = seoPayload.collection({collection, url: request.url});

  return json({
    myCollection,
    collection,
    appliedFilters,
    handleLinkData,
    collectionHandle,
    collections: flattenConnection(collections),
    analytics: {
      pageType: AnalyticsPageType.collection,
      collectionHandle,
      resourceId: collection.id,
    },
    seo,
  });
}
let customerid;
export default function Collection() {
  const {birthdayAutomation,isbirthdayAutomated,setISBirthdayAutomated} = useStateContext()
  const navigate = useNavigate();
  const [handleName, setHandleName] = useState('');
  const [addingProductsData, setAddingProd] = useState([]);
  const [checkState, setCheckState] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [loginModal2, setLoginModal2] = useState(false);
  const [loader, setLoader] = useState(false);
  const [offSetVal, setOffSetVal] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [newOffset, setNewOffset] = useState('');
  const [offPrice, setOffPrice] = useState('');
  // const [isbirthdayAutomated,setISBirthdayAutomated] = useState(false)
  const [confirmModal,setConfirmModal] = useState(false)
  const locationRef = useLocation();
  const {
    collection,
    collections,
    appliedFilters,
    handleLinkData,
    myCollection,
    collectionHandle,
  } = useLoaderData();
  let myColletionData = myCollection.collection.products;
  
  myColletionData = myColletionData.nodes.filter(
    (item) => item.productType != 'customisable card',
  );
  let titleToExclude = "US Postage";
let index = myColletionData.findIndex(item => item.title === titleToExclude);
if (index !== -1) {
    myColletionData.splice(index, 1);
}
  let mainTags = [
    'best-sellers',
    'thank-you',
    'birthday',
    'anniversary',
    'business',
    'congratulations',
    'holidays',
    'just-because',
    'customisable-cards',
  ];
  let filterTag = handleLinkData.collections.edges;
  const data = filterTag.filter((item) => mainTags.includes(item.node.handle));

  useEffect(() => {
    setISBirthdayAutomated(false)
    if (locationRef.pathname !== '/collections/customisable-cards') {
      setCheckState(false);
      setAddingProd([]);
    }
    if(collectionHandle == 'birthday' && birthdayAutomation){
      setConfirmModal(true)
    }
  }, [locationRef.pathname]);
  async function changeHandle(e) {
    setLoader(true);
    setHandleName(e);
    if (e == 'customisable-cards') {
      customisedCard();
      setLoader(false);
    } else {
      navigate(`/collections/${e}`);
      setAddingProd([]);
      setCheckState(false);
      setLoader(false);
    }
  }

  function CreateCustomCard() {
    try {
      setLoader(true);

      if (customerid) {
        navigate('/customise-your-card');
        setLoader(false);
      } else {
        setLoginModal2(true);
        setLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function customisedCard() {
    try {
      setLoader(true);
      if (customerid) {
        navigate(`/collections/customisable-cards`);
        const res = await getApi(
          `${API_PATH.GET_CUSTOM_CARDS}${customerid}&offset=${offSetVal}`,
        );
        // fetch(
        //   `https://api.simplynoted.com/api/storefront/product/customizable-cards?customerId=${customerid}&offset=${offSetVal}`,
        // );
        const json = await res.json();
        let myData = await json.result.products;
        setCheckState(true);
        if (addingProductsData.length > 0) {
          setAddingProd(addingProductsData.concat(myData));
          setNewOffset(json.result.nextOffset);
          CustomeCard();
          setLoader(false);
          setLoadMore(json.result.moreProducts);
        } else {
          if (json.result) {
            setAddingProd(myData);
            setNewOffset(json.result.nextOffset);
            CustomeCard();
            setLoader(false);
            setLoadMore(json.result.moreProducts);
          }
        }
      } else {
        setLoginModal(true);
        setLoader(false);
      }
    } catch (error) {
      console.error(error, 'customiseCard---');
    }
  }
  function continueShopping() {
    navigate('/customise-your-card');
  }
  

  function CustomeCard() {
    return (
      <>
        {addingProductsData &&
          addingProductsData.map((product, index) => (
            <Fragment key={index}>
              {/* <h2>Hello</h2> */}
              <CustomComponent
                key={index}
                product={product}
                offPrice={offPrice}
                productPrice={product.variants[0].price}
                customerId={customerid}
                // loading={getImageLoadingPriority(i)}
              />
            </Fragment>
          ))}
      </>
    );
  }
  useEffect(() => {
    customerid = localStorage.getItem('customerId');
    let discountedCount = JSON.parse(localStorage.getItem('packageDiscount'));
    setOffPrice(discountedCount);
    if (collectionHandle == 'customisable-cards') {
      customisedCard();
    }
    // if(collectionHandle == 'birthday' && birthdayAutomation){
    //   setConfirmModal(true)
    // }
  }, []);
  function loadMoreCustomData() {
    setOffSetVal(newOffset);
  }
  useEffect(() => {
    if (offSetVal > 0) {
      customisedCard();
    }
  }, [offSetVal]);
  function onConfirmClick(){
    setISBirthdayAutomated(true)
    setConfirmModal(false)
    // localStorage.setItem("isBirthdayAutomated", "true")
  }

  return (
    <>
      <div className="global-max-width-handler">
        <DynamicTitle title={'Simply Noted'} title2={'cards'} className="" />

        <div className="xl:gap-2 gap-5 md:flex xl:flex-row flex-col md:justify-between grid xl:mt-[3rem] ">
          <div className="gap-5 flex xl:flex-row flex-col justify-center sm:items-center items-normal xl:order-none order-1">
            <DynamicButton
              className="btnShadow bg-[#001a5f] px-[20px] py-[16px]  text-[16px]  text-[#fff]  hover:bg-[#1B5299]"
              text="Create A Custom Card"
              onClickFunction={CreateCustomCard}
            />

            <DynamicButton
            // disabled={locationRef.pathname == '/collections/customisable-cards'}
              className={`btnShadow bg-[#EF6E6E] px-[20px]   py-[16px] text-[16px]  text-[#fff] hover:bg-[#1B5299]`}
              text="View My Custom Card"
              onClickFunction={() =>locationRef.pathname !== '/collections/customisable-cards'? customisedCard():''}
            />
          </div>
          <div className="flex md:flex-row flex-col gap-5 xl:justify-end justify-center items-center selectArrow sm:mt-[0px] md:mt-[15px] mt-[0px] ">
            <h2 className="md:text-[24px] text-[18px] text-[#001a5f]">
              Choose a card from our collection:
            </h2>
            <select
              name=""
              id=""
              className="!border-none md:w-[244px] w-[270px] capitalize text-[#508ee3] p-[15px] text-[18px] font-normal shadow-lg"
              onChange={(e) => changeHandle(e.target.value)}
            >
              <option className="w-full " selected disabled>
                {collectionHandle}
              </option>

              {data &&
                data.map((item, index) => (
                  <option
                    className="capitalize"
                    value={item.node.handle}
                    key={index}
                  >
                    {item.node.handle}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="mt-[32px]">
          {myColletionData.length === 0 && !checkState && (
            <CircularLoader color="#ef6e6e" />
          )}
          <Grid layout="products">
            {!checkState ? (
              <>
                {myColletionData &&
                  myColletionData.map((product, i) => (
                    <ProductCard
                      key={i}
                      product={product}
                      loading={getImageLoadingPriority(i)}
                      offPrice={offPrice}
                      isbirthdayAutomated={isbirthdayAutomated}
                    />
                  ))}
              </>
            ) : (
              <>
                <CustomeCard />
              </>
            )}
          </Grid>
          {collectionHandle == 'customisable-cards' &&
            addingProductsData &&
            addingProductsData.length == 0 &&
            checkState && (
              <>
                <div className="w-full h-full gap-2 mt-8 mb-8">
                  <div className="w-[90%]  m-auto mt-[4rem] mb-10 flex justify-center">
                    <div>
                      <h3 className="text-[black] font-karla sm:text-[40px] text-[24px] mb-4">
                        You don't have any custom card!
                      </h3>
                      <div className="flex justify-center">
                        <DynamicButton
                          className="bg-[#EF6E6E] m-5 w-full max-w-[225px]"
                          text="CREATE ONE"
                          onClickFunction={() => continueShopping()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          {loadMore && collectionHandle == 'customisable-cards' && (
            <div className="flex justify-center mt-[2rem]">
              <DynamicButton
                className="bg-[#EF6E6E] w-[200px] text-[#fff] p-2"
                text="Load More"
                onClickFunction={() => loadMoreCustomData()}
              />
            </div>
          )}
        </div>
        <LoginModal
          title={' Check your Custom Card'}
          show={loginModal}
          setLoginModal={setLoginModal}
          onCancel={() => setLoginModal(false)}
          confirmText="Login"
          cancelText="Register"
        />
        <LoginModal
          title={' Create Custom Card'}
          show={loginModal2}
          setLoginModal={setLoginModal2}
          onCancel={() => setLoginModal2(false)}
          confirmText="Login"
          cancelText="Register"
        />
        <ConfirmationModal
          show={confirmModal}
          title={'AUTOMATED BIRTHDAY CARDS'}
          onCancel={() => setConfirmModal(false) && setISBirthdayAutomated(!isbirthdayAutomated)}
          onConfirm={() => onConfirmClick()}
          message="Select a card and we’ll automatically send them to your recipients on their birthdays"
          confirmText="Get Started"
          cancelText="Cancel"
        />
      </div>
    </>
  );
}

const MY_COLLECTION = `#graphql
query
CollectionDetails(
  $handle: String!
)
{
collection(handle:$handle) {
  id
     handle
     title
     description
     seo {
       description
       title
     }
     products(first:250){
      nodes{
        ...ProductCard
  }
    }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
 `;

const COLLECTION_QUERY = `#graphql
  query
 
  CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

const HANDLE_QUERY = `#graphql
query
{
  collections(first: 15) {
    edges {
      node {
        handle
      }
    }
  }
}`;

function getSortValuesFromParam(sortParam) {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
