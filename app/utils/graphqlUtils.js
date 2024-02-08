// graphqlUtils.js
export async function fetchWalletData(context) {
  const query = `#graphql
    query {
      collection(id: "gid://shopify/Collection/271625027689") {
        title
        products(first: 6) {
          edges {
            node {
              id
              title
              description
              metafields(identifiers: [
                { namespace: "custom", key: "product_title" }
                { namespace: "custom", key: "strip_year_link" }
                { namespace: "custom", key: "pay_as_you_go" }
                { namespace: "custom", key: "pricing" }
                { namespace: "custom", key: "pricing_yearly" }
                { namespace: "custom", key: "subscription_plan_price" }
                { namespace: "custom", key: "subscription_plan_price_yearly" }
                { namespace: "custom", key: "strip_link" }
                { namespace: "custom", key: "subscription_plan_price_monthly" }
              ]) {
                value
                key
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    metafields(identifiers: [
                      { namespace: "custom", key: "variant_title" }
                      { namespace: "custom", key: "card_amount" }
                      { namespace: "custom", key: "description" }
                    ]) {
                      value
                      key
                    }
                    title
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await context.storefront.query(query);
    return response;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
}
