import {useState, useEffect} from 'react';
import {defer} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate} from '@remix-run/react';
import {STRIPE_PUBLISHABLE_KEY, SERVER_BASE_URL} from '~/data/config';
import WalletTable from '../components/wallet/WalletTable';
import WalletPlan from '~/components/wallet/WalletPlan';
import WalletPurchase from '../components/wallet/WalletPurchase';
import Accordion from '~/components/wallet/Accordian';
import DynamicTitle from '~/components/Title';
import CircularLoader from '~/components/CircularLoder';

import {useStateContext} from '~/context/StateContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { seoPayload } from '~/lib/seo.server';

export async function loader({request,context}) {
  const {page} = await context.storefront.query(Shopify_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  const StripeKey = STRIPE_PUBLISHABLE_KEY;
  const WalletData = await context.storefront.query(Wallet, {
    variants: {},
  });

  return defer({
    seo,
    WalletData,
    StripeKey,
  });
}
let customerID;

export default function SimplyNoted() {
  const {WalletData, StripeKey} = useLoaderData();

  const pricePerCard = WalletData.collection.products.edges.map(
    (price) =>
      price.node.metafields.find((value) => value.key === 'pricing').value,
  );

  const [stripeCollection, setStripeCollection] = useState([]);
  const [finalPrice, setFinalPrice] = useState(null);
  const [loader, setloader] = useState(true);

  const {
    selectedPlan,
    setSelectedPlan,
    amount,
    setAmount,
    subscription,
    setSubscription,
    packageProduct,
    setPackageProduct,
    subscriptionProduct,
    setSubscriptionProduct,
    subscriptionPriceId,
    setSubscriptionPriceId,
    subscriptionTitle,
    setSubscriptionTitle,
    walletPlan,
    setWalletPlan,
    walletPurcase,
    setWalletPurchase,
    walletPayment,
    setWalletPayment,
  } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    customerID = localStorage.getItem('customerId');
  }, []);

  useEffect(() => {
    // Define the API URL
    const apiUrl = `${SERVER_BASE_URL}/stripe/customer-data?customerId=${customerID}`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStripeCollection(data);
        setloader(false);
      })
      .catch((error) => {
        setloader(false);

        console.error('Error fetching data:', error);
      });
    return () => {};
  }, []);

  return (
    <div className=" w-full global-max-width-handler ">
      {/* {loader && (
        <div className="absolute top-[20%] z-[50] left-[50%]">
          <CircularLoader title="Loading Plans" color="#ef6e6e" />
        </div>
      )} */}
      <div className="flex px-[16px] md:mt-[30px] mt-[1px] md:px-[40px] justify-start items-center">
        <DynamicTitle className="" title={'Simply Noted Plans'} />
      </div>
      <div
        className={`${
          loader ? 'pointer-events-none opacity-40' : 'pointer-events-auto'
        }`}
      >
        {!walletPlan && !walletPurcase && !walletPayment && (
          <WalletTable
            customerID={customerID}
            WalletData={WalletData}
            pricePerCard={pricePerCard}
            setWalletPlan={setWalletPlan}
            stripeCollection={stripeCollection}
          />
        )}
        {walletPlan && (
          <WalletPlan
            setWalletPurchase={setWalletPurchase}
            setWalletPlan={setWalletPlan}
            WalletData={WalletData}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
            setAmount={setAmount}
            amount={amount}
            setSubscription={setSubscription}
            stripeCollection={stripeCollection}
            setPackageProduct={setPackageProduct}
            subscriptionTitle={subscriptionTitle}
            setSubscriptionProduct={setSubscriptionProduct}
            setSubscriptionTitle={setSubscriptionTitle}
            setSubscriptionPriceId={setSubscriptionPriceId}
          />
        )}
        {walletPurcase && (
          <WalletPurchase
            setWalletPurchase={setWalletPurchase}
            setWalletPlan={setWalletPlan}
            amount={amount}
            selectedPlan={selectedPlan}
            finalPrice={finalPrice}
            setFinalPrice={setFinalPrice}
            subscriptionTitle={subscriptionTitle}
            WalletData={WalletData}
            subscription={subscription}
            setWalletPayment={setWalletPayment}
          />
        )}

        {walletPayment && (
          <Accordion
            setWalletPurchase={setWalletPurchase}
            setWalletPayment={setWalletPayment}
            finalPrice={finalPrice}
            selectedPlan={selectedPlan}
            subscriptionTitle={subscriptionTitle}
            amount={amount}
            stripePayments={stripeCollection.payments}
            subscription={subscription}
            StripeKey={StripeKey}
            subscriptionProduct={subscriptionProduct}
            packageProduct={packageProduct}
            subscriptionPriceId={subscriptionPriceId}
          />
        )}
      </div>
    </div>
  );
}

const Wallet = `#graphql
  query
  {
    collection(id: "gid://shopify/Collection/271625027689"){
      title
      products(first:6){
        edges{
          node{
            id
            title
            description
            metafields(identifiers:[
               {namespace:"custom", key: "product_title"}
                    {namespace:"custom", key: "strip_year_link"}
                    {namespace:"custom", key: "pay_as_you_go"}
                    {namespace:"custom", key: "pricing"}
                    {namespace:"custom", key: "pricing_yearly"}
                    {namespace:"custom", key: "subscription_plan_price"}
                    {namespace:"custom", key: "subscription_plan_price_yearly"}
                    {namespace:"custom", key: "strip_link"}
                    {namespace:"custom", key: "subscription_plan_price_monthly"}
              
            ]){
              value
              key
            }
            variants(first:10){
              edges{
                node{
                  id
                  metafields(identifiers:[
                    {namespace: "custom", key: "variant_title"},
                    {namespace: "custom", key: "card_amount"},
                    {namespace: "custom", key: "description"},
                   ]){
                     value
                     key
                   }
                  title
                  price
                  {
                    amount
                  }
                }
              }
            }
         
            
          }
        }
      }
    }
  }`;

const Shopify_GRAPH_QL = `#graphql
query
{
  page(id:"gid://shopify/Page/97325056105"){
  title
  seo{
    title
    description
  }
}
}`;



