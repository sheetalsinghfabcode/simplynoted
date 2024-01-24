import {defer} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate} from '@remix-run/react';
import WalletTable from '../components/wallet/WalletTable';
import {useState, useEffect} from 'react';
import WalletPlan from '~/components/wallet/WalletPlan';
import WalletPurchase from '../components/wallet/WalletPurchase';
import Accordion from '~/components/wallet/Accordian';
import DynamicTitle from '~/components/Title';
import CircularLoader from '~/components/CircularLoder';

import {useStateContext} from '~/context/StateContext';

export async function loader({context}) {
  const StripeKey = context.env.STRIPE_KEY;
  const WalletData = await context.storefront.query(Wallet, {
    variants: {},
  });

  return defer({
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
  const [walletPlan, setWalletPlan] = useState(false);
  const [walletPurcase, setWalletPurchase] = useState(false);
  const [walletPayment, setWalletPayment] = useState(false);
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
  } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    customerID = localStorage.getItem('customerId');
    if (!customerID) {
      navigate('/account/login');
    }
  }, []);

  useEffect(() => {
    // Define the API URL
    const apiUrl = `https://api.simplynoted.com/stripe/customer-data?customerId=${customerID}`;

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
        console.error('Error fetching data:', error);
      });
    return () => {};
  }, []);

  return (
    <div className="w-full relative max-w-[1440px] mx-auto">
      {loader && (
        <div className="absolute top-[20%] z-[50] left-[50%]">
          <CircularLoader title="Loading Plans" color="#ef6e6e" />
        </div>
      )}

      {!walletPlan && !walletPurcase && !walletPayment && (
        <DynamicTitle dynamicButton title={'Simply Noted Plans'} />
      )}
      <div className={`${loader && 'opacity-40'}`}>
        {!walletPlan && !walletPurcase && !walletPayment && (
          <WalletTable
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
