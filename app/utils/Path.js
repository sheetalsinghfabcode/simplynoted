export const API_PATH = {
    CUSTOMER_DATA: 'stripe/customer-data?customerId=',
    DELETE_TEMPLATE:'api/storefront/messageTemplates/delete?customerId=',
    SAVED_TEMPLATE:'api/storefront/messageTemplates?customerId=',
    ADD_TEMPLATE:'api/storefront/messageTemplates?customerId=',
    GET_METAFIELDS:'api/storefront/product/product-metafields',
    GET_HANDLE_NAME: 'api/storefront/product?handleName=',
    GET_CUSTOM_CARDS:'api/storefront/product/customizable-cards?customerId=',
    GET_ADDRESS:'api/storefront/addresses?customerId=',
    GET_STRIPE_CUSTOMER_DATA:'stripe/customer-data?customerId=',
    CREATE_STRIPE_CUSTOMER:'stripe/create-customer?customerId=',
    ADD_NEW_CARD:'stripe/add-new-payment-method?customerId=',
    GET_DISCOUNT_COUPON:'api/storefront/shopify/coupon-details?code=',
    PURCHASE_API:'api/storefront/wallet-order?customerId=',
    GENRATE_API_KEY:'api/storefront/apiKeys?customerId='
}
