import {defer} from '@shopify/remix-oxygen';
import {useLoaderData, Await} from '@remix-run/react';
import WalletTable from '../components/wallet/WalletTable';
import {useState, useEffect} from 'react';
import WalletPlan from '~/components/wallet/WalletPlan';
import WalletPurchase from '../components/wallet/WalletPurchase';
import {WalletPayment} from '~/components/WalletPayment';
import Accordion from '~/components/wallet/Accordian';
import Loader from '~/components/modal/Loader';
import {useNavigate} from '@remix-run/react';
import DynamicButton from '~/components/DynamicButton';


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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const [walletPayment, setWalletPayment] = useState(false);
  const [finalPrice, setFinalPrice] = useState(null);
  const [loader,setloader]= useState(true)

  const navigate = useNavigate();
  const goBack = () => navigate(-1)



  useEffect(() => {
    customerID = localStorage.getItem('customerId');
    if (!customerID) {
      navigate('/account/login');
    }
  }, []);

  console.log("selectedPlan",selectedPlan)

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
        console.log('data', data);
        setStripeCollection(data);
        setloader(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      return() =>{
      }
  }, []);

  return (
    <>
    {loader ? (<Loader
      loaderMessage="Loading Plans"
      />
      ):(
      <>
       {!walletPlan && !walletPurcase && !walletPayment && (
      <DynamicButton
        className="bg-[#EF6E6E] m-5 w-full max-w-[125px]"
        text="Prev"
        backArrow={true}
        onClickFunction={goBack}/>)}
      <div>
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
          StripeKey={StripeKey}
        />
      )}
    </div>
    </>)}
    
    </>
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
